import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

const IDS=['bus','sunshield','primary','secondary','solar'];
const STAGES=['folded','solar','shield','tension','secondary','primary','ready'];
let template=null,preparation=null;

// The NASA GLB is a single merged mesh. These names keep its original
// material primitives together as educational groups; they do not describe
// independently articulated parts in the source asset.
function groupForMaterial(name=''){
 const material=name.toLowerCase();
 if(material.includes('foilbasepanel')||/^jwst-foillayer/.test(material))return 'sunshield';
 if(material.includes('solarpanel')||material==='sa_edge_gold')return 'solar';
 if(material==='jwst-mirror-sm')return 'primary';
 if(material.includes('topreflector')||material==='jwst-gold-fl')return 'secondary';
 return 'bus';
}

function materialClone(source){return source.clone();}

function materialForInstance(source,textures){
 const material=source.clone();
 for(const [key,value] of Object.entries(material))if(value?.isTexture){
  if(!textures.has(value)){
   const texture=value.clone();texture.needsUpdate=true;textures.set(value,texture);
  }
  material[key]=textures.get(value);
 }
 return material;
}

function primitiveGeometry(source,sourceIndices){
 const vertexMap=new Map(),vertices=[],indices=[];
 for(const sourceIndex of sourceIndices){
  let index=vertexMap.get(sourceIndex);
  if(index===undefined){index=vertices.length;vertexMap.set(sourceIndex,index);vertices.push(sourceIndex);}
  indices.push(index);
 }
 const result=new T.BufferGeometry();
 const copyAttribute=attribute=>{
  const interleaved=attribute.isInterleavedBufferAttribute;
  const data=interleaved?attribute.data.array:attribute.array;
  const stride=interleaved?attribute.data.stride:attribute.itemSize;
  const offset=interleaved?attribute.offset:0;
  const array=new data.constructor(vertices.length*attribute.itemSize);
  for(let i=0;i<vertices.length;i++)for(let c=0;c<attribute.itemSize;c++)array[i*attribute.itemSize+c]=data[vertices[i]*stride+offset+c];
  const copy=new T.BufferAttribute(array,attribute.itemSize,attribute.normalized);
  copy.name=attribute.name;copy.usage=attribute.usage;
  return copy;
 };
 for(const [name,attribute] of Object.entries(source.attributes))result.setAttribute(name,copyAttribute(attribute));
 for(const [name,attributes] of Object.entries(source.morphAttributes))result.morphAttributes[name]=attributes.map(copyAttribute);
 result.morphTargetsRelative=source.morphTargetsRelative;
 result.setIndex(indices);
 result.userData={...source.userData};
 return result;
}

export async function prepararWebb(){
 if(template)return;
 if(preparation)return preparation;
 preparation=(async()=>{
  const draco=new DRACOLoader();
  draco.setDecoderPath(new URL('../../lib/draco/',import.meta.url).href);
  try{
   const loader=new GLTFLoader();loader.setDRACOLoader(draco);
   const gltf=await loader.loadAsync(new URL('../../modelos/jwst.glb',import.meta.url).href),{scene}=gltf;
   const sourceJson=gltf.parser?.json||{};
   scene.updateMatrixWorld(true);
   const bounds=new T.Box3().setFromObject(scene),size=bounds.getSize(new T.Vector3());
   if(!Number.isFinite(size.x+size.y+size.z)||Math.max(size.x,size.y,size.z)<=0)throw Error('O modelo Webb não possui dimensões válidas.');
   const scale=9/Math.max(size.x,size.y,size.z),center=bounds.getCenter(new T.Vector3());
   const normalize=new T.Matrix4().makeScale(scale,scale,scale);
   normalize.setPosition(-center.x*scale,-bounds.min.y*scale,-center.z*scale);

   const root=new T.Group();root.name='NASA James Webb — conjuntos educativos';
   root.userData.source='NASA 3D Resources · jwst.glb';
   const groups=new Map(IDS.map(id=>{const group=new T.Group();group.name=id;group.userData.part=id;root.add(group);return[id,group];}));
   const sourceGeometries=new Set(),sourceMaterials=new Set(),templateMaterials=new Map();
   const groupMeshCounts=Object.fromEntries(IDS.map(id=>[id,0]));
   const triangleCounts=Object.fromEntries(IDS.map(id=>[id,0]));
   const materialGroups=[],unmappedMaterials=new Set();
   let sourceMeshCount=0,primitiveCount=0;

   scene.traverse(mesh=>{
    if(!mesh.isMesh)return;
    sourceMeshCount++;sourceGeometries.add(mesh.geometry);
    const original=mesh.geometry,index=original.index;
    const sourceGroups=original.groups.length?original.groups:[{start:0,count:index?.count??original.getAttribute('position')?.count??0,materialIndex:0}];
    for(const sourceGroup of sourceGroups){
     const sourceMaterial=Array.isArray(mesh.material)?mesh.material[sourceGroup.materialIndex]:mesh.material;
     if(!sourceMaterial)continue;
     sourceMaterials.add(sourceMaterial);
     const id=groupForMaterial(sourceMaterial.name);
     if(id==='bus'&&!/^(?:jwst-(?:black|bottom-box|bracket|bronze|gold|grey|instrument|silver)|blackpaint_lambert1|default|sc_post_pmli1?|sc_rad_smli1|whitepaint_lambert)$/i.test(sourceMaterial.name))unmappedMaterials.add(sourceMaterial.name||'(sem nome)');

     // Keep only the original primitive's indices. Positions, normals, UVs,
     // faces and material are copied without making cuts or adding geometry.
     const end=sourceGroup.start+sourceGroup.count,indices=[];
     if(index){for(let i=sourceGroup.start;i<end;i++)indices.push(index.getX(i));}
     else {for(let i=sourceGroup.start;i<end;i++)indices.push(i);}
     if(!indices.length)continue;
     const geometry=primitiveGeometry(original,indices);
     geometry.applyMatrix4(mesh.matrixWorld);geometry.applyMatrix4(normalize);

     geometry.computeBoundingBox();geometry.computeBoundingSphere();
     const materialKey=sourceMaterial;
     if(!templateMaterials.has(materialKey))templateMaterials.set(materialKey,materialClone(sourceMaterial));
     const part=new T.Mesh(geometry,templateMaterials.get(materialKey));
     part.name=`${mesh.name||'JWST mesh'} / ${sourceMaterial.name||'material'}`;
     part.userData={part:id,source:'NASA 3D Resources · jwst.glb',sourceNode:mesh.name||'',sourceMaterial:sourceMaterial.name||''};
     groups.get(id).add(part);
     groupMeshCounts[id]++;triangleCounts[id]+=indices.length/3;primitiveCount++;
     materialGroups.push({material:sourceMaterial.name||'(sem nome)',part:id,triangles:indices.length/3});
    }
   });
   if(IDS.some(id=>groupMeshCounts[id]===0))throw Error('O modelo Webb não contém todos os grupos educativos esperados.');
   sourceGeometries.forEach(geometry=>geometry.dispose());
   sourceMaterials.forEach(material=>material.dispose());
   const sourcePrimitiveCount=(sourceJson.meshes||[]).reduce((sum,mesh)=>sum+(mesh.primitives?.length||0),0);
   root.userData.segmentation={
    sourceNodes:(sourceJson.nodes||[]).length,
    sourceMeshes:(sourceJson.meshes||[]).length,
    runtimeMeshObjects:sourceMeshCount,
    sourceMaterials:(sourceJson.materials||[]).length,
    sourcePrimitiveCount,
    originalMaterialGroups:primitiveCount,
    groupMeshCounts,
    triangleCounts,
    materialGroups,
    unmappedMaterials:[...unmappedMaterials],
    normalization:{maxExtent:9,sourceSize:size.toArray(),scale},
    method:'Primitivas e materiais originais do GLB agrupados por nome. O arquivo fonte tem uma malha mesclada; nenhum mecanismo, recorte ou interior foi reconstruído.'
   };
   template=root;
  }finally{draco.dispose();}
 })();
 try{await preparation;}catch(error){preparation=null;throw error;}
}

function cloneTemplate(){
 const root=template.clone(true),textures=new Map();
 root.traverse(mesh=>{
  if(!mesh.isMesh)return;
  mesh.geometry=mesh.geometry.clone();
  mesh.material=Array.isArray(mesh.material)?mesh.material.map(material=>materialForInstance(material,textures)):materialForInstance(mesh.material,textures);
 });
 return root;
}

const compactScale={bus:1,solar:.14,sunshield:.12,secondary:.14,primary:.14};
const explodedOffsets={bus:[0,0,0],sunshield:[0,-2.5,0],primary:[0,2.5,0],secondary:[0,2,3],solar:[3,0,0]};
const stageScales={
 folded:{...compactScale},
 solar:{...compactScale,solar:1},
 shield:{...compactScale,solar:1,sunshield:.8},
 tension:{...compactScale,solar:1,sunshield:1},
 secondary:{...compactScale,solar:1,sunshield:1,secondary:1},
 primary:{...compactScale,solar:1,sunshield:1,secondary:1,primary:1},
 ready:Object.fromEntries(IDS.map(id=>[id,1]))
};

// These phases are compact scale cues for teaching, not a physical JWST
// deployment animation. The assembled phase preserves the original layout.
export function criarWebb(){
 if(!template)throw Error('Prepare o Webb antes de criar a cena.');
 const root=new T.Group(),native=cloneTemplate(),groups=new Map(native.children.map(group=>[group.name,group]));
 root.add(native);root.userData.source=native.userData.source;root.userData.segmentation=native.userData.segmentation;
 const media=matchMedia('(prefers-reduced-motion: reduce)');let phase=null,elapsed=0,fromScales=null;
 function animate(state,alpha,dt,frameDt){
  const requested=STAGES.includes(state.webbPhase)?state.webbPhase:null;
  const delta=frameDt??dt;
  if(requested!==phase){
   const previous=phase;phase=requested;elapsed=0;
   if(previous){fromScales=new Map([...groups].map(([id,group])=>[id,group.scale.x]));}
   else if(phase){
    const priorStage=STAGES[Math.max(0,STAGES.indexOf(phase)-1)];
    fromScales=new Map(IDS.map(id=>[id,stageScales[priorStage][id]]));
   }else fromScales=null;
  }
  if(phase)elapsed=media.matches?4:delta===undefined?elapsed:Math.min(4,elapsed+Math.max(0,delta));
  const t=phase?elapsed/4:1,e=t*t*(3-2*t);

  for(const [id,group] of groups){
   group.position.set(...(phase? [0,0,0] : state.exploded?explodedOffsets[id]:[0,0,0]));group.rotation.set(0,0,0);
   group.visible=phase?true:(!state.isolated||state.selected===id);
   const target=phase?stageScales[phase][id]:1;
   const start=phase?(fromScales?.get(id)??target):1;
   group.scale.setScalar(start+(target-start)*e);
  }
  if(phase){
   root.userData.flight={phase,progress:t,visibleIds:[...groups].filter(([,group])=>group.visible).map(([id])=>id),artistic:true,webb:true};
  }else delete root.userData.flight;
  root.updateMatrixWorld(true);
  return !!phase&&elapsed<4;
 }
 return {root,groups,panels:[],legs:[],floorY:0,animate};
}
