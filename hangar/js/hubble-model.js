import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

const IDS=['tube','equipment','solar-left','solar-right','aperture','camera'];
let template=null,preparation=null;

// The NASA asset is one object divided by texture, not by mechanism. Recover
// disconnected original surfaces by shared coordinates, without moving vertices,
// cutting triangles, changing UVs or constructing technical interiors.
function connectedSurfaces(geometry){
 const position=geometry.getAttribute('position'),index=geometry.index;
 const roots=new Int32Array(position.count);for(let i=0;i<roots.length;i++)roots[i]=i;
 const find=i=>{while(roots[i]!==i){roots[i]=roots[roots[i]];i=roots[i];}return i;};
 const join=(a,b)=>{roots[find(a)]=find(b);};
 const coordinates=new Map();
 for(let i=0;i<position.count;i++){
  const key=[position.getX(i),position.getY(i),position.getZ(i)].map(v=>Math.round(v*1000)).join(',');
  if(coordinates.has(key))join(i,coordinates.get(key));else coordinates.set(key,i);
 }
 const count=index?.count??position.count,vertex=i=>index?index.getX(i):i;
 for(let i=0;i<count;i+=3){join(vertex(i),vertex(i+1));join(vertex(i),vertex(i+2));}
 const surfaces=new Map(),point=new T.Vector3();
 for(let i=0;i<count;i+=3){
  const key=find(vertex(i));
  if(!surfaces.has(key))surfaces.set(key,{indices:[],box:new T.Box3()});
  const surface=surfaces.get(key);
  for(let j=0;j<3;j++){const v=vertex(i+j);surface.indices.push(v);surface.box.expandByPoint(point.fromBufferAttribute(position,v));}
 }
 return [...surfaces.values()];
}
function partFor(surface,material){
 const {box}=surface;
 if(material.name==='hbltel_wfc_1')return 'camera';
 if(box.min.y>258)return 'aperture';
 // Both original flexible solar arrays are perpendicular to the telescope axis;
 // connected support arms stay with their own array.
 if(box.max.x>105&&box.min.y>-40&&box.max.y<0)return 'solar-right';
 if(box.min.x< -105&&box.min.y>-40&&box.max.y<0)return 'solar-left';
 if(box.max.y<=-45)return 'equipment';
 return 'tube';
}

export async function prepararHubble(){
 if(template)return;
 if(preparation)return preparation;
 preparation=(async()=>{
  const draco=new DRACOLoader();draco.setDecoderPath(new URL('../../lib/draco/',import.meta.url).href);
  try{
   const loader=new GLTFLoader();loader.setDRACOLoader(draco);
   const {scene}=await loader.loadAsync(new URL('../../modelos/hubble.glb?v=1',import.meta.url).href);
   scene.updateMatrixWorld(true);
   const box=new T.Box3().setFromObject(scene),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
   if(!Number.isFinite(size.y)||size.y<=0)throw new Error('O modelo Hubble não possui dimensões válidas.');
   const scale=13/size.y,normalise=new T.Matrix4().makeScale(scale,scale,scale);
   normalise.setPosition(-center.x*scale,-box.min.y*scale,-center.z*scale);
   const root=new T.Group();root.name='NASA Hubble — conjuntos educativos';root.userData.source='NASA-3D-Resources';
   const groups=new Map(IDS.map(id=>{const group=new T.Group();group.name=id;root.add(group);return[id,group];}));
   const sourceGeometries=new Set(),sourceMaterials=new Set();let triangles=0,surfaces=0;
   scene.traverse(mesh=>{
    if(!mesh.isMesh)return;
    const world=mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
    const material=Array.isArray(mesh.material)?mesh.material[0]:mesh.material;
    const batches=new Map();
    for(const surface of connectedSurfaces(world)){
     const id=partFor(surface,material);if(!batches.has(id))batches.set(id,[]);
     batches.get(id).push(...surface.indices);surfaces++;
    }
    for(const [id,indices] of batches){
     const geometry=world.clone();geometry.setIndex(indices);geometry.clearGroups();geometry.applyMatrix4(normalise);
     // BufferGeometry bounds otherwise include unused vertices from other parts.
     const positions=geometry.getAttribute('position'),partBox=new T.Box3(),point=new T.Vector3();
     for(const index of indices)partBox.expandByPoint(point.fromBufferAttribute(positions,index));
     geometry.boundingBox=partBox;geometry.boundingSphere=partBox.getBoundingSphere(new T.Sphere());
     const copy=new T.Mesh(geometry,material.clone());copy.name=`${mesh.name} / ${id}`;copy.userData={part:id,source:'NASA-3D-Resources'};
     groups.get(id).add(copy);triangles+=indices.length/3;
    }
    world.dispose();sourceGeometries.add(mesh.geometry);sourceMaterials.add(material);
   });
   if([...groups.values()].some(g=>!g.children.length))throw new Error('Um conjunto do Hubble está vazio.');
   root.userData.segmentation={triangles,surfaces,method:'Conjuntos externos separados por superfícies conectadas originais, sem interiores reconstruídos.'};
   sourceGeometries.forEach(g=>g.dispose());sourceMaterials.forEach(m=>m.dispose());template=root;
  }finally{draco.dispose();}
 })();
 try{await preparation;}catch(error){preparation=null;throw error;}
}

export function criarHubble(){
 if(!template)throw new Error('Prepare o Hubble antes de criar a cena.');
 const root=template.clone(true),groups=new Map(root.children.map(g=>[g.name,g])),textures=new Map();
 root.traverse(mesh=>{
  if(!mesh.isMesh)return;
  mesh.geometry=mesh.geometry.clone();
  const material=mesh.material.clone();
  for(const [key,value] of Object.entries(material))if(value?.isTexture){
   if(!textures.has(value)){const texture=value.clone();texture.needsUpdate=true;textures.set(value,texture);}
   material[key]=textures.get(value);
  }
  mesh.material=material;
 });
 return {root,groups,panels:[],legs:[]};
}
