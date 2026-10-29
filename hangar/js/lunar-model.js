import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

let template=null,preparation=null;
const IDS=['descent','ascent','legs','engine','antennas'];

// Original GLB names encode whole physical assemblies. No triangle cutting,
// interior reconstruction or replacement of NASA geometry is needed here.
function assemblyName(mesh){
 let candidate=null;
 for(let node=mesh;node;node=node.parent){
  const name=node.name.replace(/[\s_.]/g,'').toLowerCase();
  if(name.startsWith('group')||/^(pcylinder|polysurfa|pplane)/.test(name))candidate=name;
 }
 return candidate||mesh.name.replace(/[\s_.]/g,'').toLowerCase();
}
function partFor(name){
 if(name.startsWith('group13pc'))return 'engine';
 if(name.startsWith('group51'))return 'antennas';
 if(name.startsWith('group31')||name==='polysurfa1')return 'legs';
 if(name==='group13p2'||name==='pcylinder1'||name==='pcylinder1002'||name==='pcylinder3'||name==='pcylinder3002'||name==='pplane1'||name==='pplane2')return 'descent';
 return 'ascent';
}

export async function prepararModuloLunar(){
 if(template)return;
 if(preparation)return preparation;
 preparation=(async()=>{
  const draco=new DRACOLoader();draco.setDecoderPath(new URL('../../lib/draco/',import.meta.url).href);
  try{
   const loader=new GLTFLoader();loader.setDRACOLoader(draco);
   const {scene}=await loader.loadAsync(new URL('../../modelos/modulo-lunar.glb?v=2',import.meta.url).href);
   scene.updateMatrixWorld(true);
   const box=new T.Box3().setFromObject(scene),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
   if(!Number.isFinite(size.y)||size.y<=0)throw new Error('O modelo lunar não possui dimensões válidas.');
   const scale=7/size.y;
   const normalise=new T.Matrix4().makeScale(scale,scale,scale);
   normalise.setPosition(-center.x*scale,-box.min.y*scale,-center.z*scale);
   const root=new T.Group();root.name='NASA Apollo Lunar Module — conjuntos educativos';
   root.userData.source='NASA / Michael D. Carbajal';
   const groups=new Map(IDS.map(id=>{const group=new T.Group();group.name=id;root.add(group);return[id,group];}));
   const sourceGeometries=new Set(),sourceMaterials=new Set();let triangles=0,meshCount=0;
   scene.traverse(mesh=>{
    if(!mesh.isMesh)return;
    const id=partFor(assemblyName(mesh));
    const geometry=mesh.geometry.clone().applyMatrix4(normalise.clone().multiply(mesh.matrixWorld));
    geometry.computeBoundingBox();geometry.computeBoundingSphere();
    const materials=Array.isArray(mesh.material)?mesh.material.map(m=>m.clone()):mesh.material.clone();
    const copy=new T.Mesh(geometry,materials);copy.name=mesh.name;copy.userData={...mesh.userData,part:id,source:'NASA-3D-Resources'};
    groups.get(id).add(copy);
    triangles+=(geometry.index?.count??geometry.getAttribute('position').count)/3;meshCount++;
    sourceGeometries.add(mesh.geometry);for(const m of (Array.isArray(mesh.material)?mesh.material:[mesh.material]))sourceMaterials.add(m);
   });
   if([...groups.values()].some(g=>!g.children.length))throw new Error('Um conjunto do módulo lunar está vazio.');
   root.userData.segmentation={meshCount,triangles,method:'Agrupamento de malhas originais; vista explodida educativa, sem interiores inventados.'};
   sourceGeometries.forEach(g=>g.dispose());sourceMaterials.forEach(m=>m.dispose());
   template=root;
  }finally{draco.dispose();}
 })();
 try{await preparation;}catch(error){preparation=null;throw error;}
}

export function criarModuloLunar(){
 if(!template)throw new Error('Prepare o módulo lunar antes de criar a cena.');
 const root=template.clone(true),groups=new Map(root.children.map(g=>[g.name,g]));
 const textures=new Map();
 root.traverse(mesh=>{
  if(!mesh.isMesh)return;
  mesh.geometry=mesh.geometry.clone();
  const cloneMaterial=source=>{
   const material=source.clone();
   for(const [key,value] of Object.entries(material))if(value?.isTexture){
    if(!textures.has(value)){const texture=value.clone();texture.needsUpdate=true;textures.set(value,texture);}
    material[key]=textures.get(value);
   }
   return material;
  };
  mesh.material=Array.isArray(mesh.material)?mesh.material.map(cloneMaterial):cloneMaterial(mesh.material);
 });
 return {root,groups,panels:[],legs:[]};
}
