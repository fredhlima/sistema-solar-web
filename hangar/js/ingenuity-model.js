import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {prepararPerseverance,criarRoverPerseverance} from './perseverance-model.js?v=2';

let template=null,preparation=null;
const ids=['body','legs','rotorLower','rotorUpper','solar'];
function conjunto(mesh){
 for(let o=mesh;o;o=o.parent){
  if(/^leg_0[1-4]$/.test(o.name))return 'legs';
  if(o.name==='rotors_01')return 'rotorUpper';
  if(o.name==='rotors_02')return 'rotorLower';
  if(o.name==='solar_panel')return 'solar';
 }
 return 'body';
}
export async function prepararIngenuity(){
 if(template)return;if(preparation)return preparation;
 preparation=(async()=>{
  const draco=new DRACOLoader();draco.setDecoderPath(new URL('../../lib/draco/',import.meta.url).href);
  try{
   const loader=new GLTFLoader();loader.setDRACOLoader(draco);
   const [{scene}]=await Promise.all([loader.loadAsync(new URL('../../modelos/ingenuity.glb',import.meta.url).href),prepararPerseverance()]);
   scene.updateMatrixWorld(true);
   const box=new T.Box3().setFromObject(scene),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
   const scale=5/Math.max(size.x,size.y,size.z),offset=new T.Vector3(center.x,box.min.y,center.z);
   if(!Number.isFinite(scale)||scale<=0)throw Error('Modelo Ingenuity vazio');
   const root=new T.Group(),groups=new Map(ids.map(id=>{const g=new T.Group();g.name=id;root.add(g);return[id,g];}));
   const sourceGeometries=new Set(),jointMap=new Map();let count=0;
   const normalize=v=>v.sub(offset).multiplyScalar(scale);
   scene.traverse(mesh=>{
    if(!mesh.isMesh)return;const id=conjunto(mesh),geometry=mesh.geometry.clone();geometry.applyMatrix4(mesh.matrixWorld);geometry.translate(-offset.x,-offset.y,-offset.z);geometry.scale(scale,scale,scale);
    const copy=new T.Mesh(geometry,mesh.material);copy.userData={part:id,source:'NASA/Brian E. Kumanchik'};copy.name=mesh.name;
    if(id==='legs'){
     let node=mesh;while(node&&!/^leg_0[1-4]$/.test(node.name))node=node.parent;
     if(!jointMap.has(node.name)){const joint=new T.Group();joint.name=node.name;joint.position.copy(normalize(node.getWorldPosition(new T.Vector3())));const radial=new T.Vector3(joint.position.x,0,joint.position.z).normalize();joint.userData.axis=[radial.z,0,-radial.x];jointMap.set(node.name,joint);groups.get('legs').add(joint);}
     const joint=jointMap.get(node.name);geometry.translate(-joint.position.x,-joint.position.y,-joint.position.z);joint.add(copy);
    }else groups.get(id).add(copy);
    sourceGeometries.add(mesh.geometry);count++;
   });
   for(const id of ids)if(!groups.get(id).children.length)throw Error('Conjunto Ingenuity ausente: '+id);
   for(const id of ['rotorLower','rotorUpper']){const g=groups.get(id),b=new T.Box3().setFromObject(g),pivot=b.getCenter(new T.Vector3());pivot.x=0;pivot.z=0;g.position.copy(pivot);g.userData.home=pivot.toArray();g.children.forEach(m=>m.geometry.translate(-pivot.x,-pivot.y,-pivot.z));}
   root.userData.segmentation={meshCount:count,groups:ids.length,legJoints:jointMap.size};sourceGeometries.forEach(g=>g.dispose());template=root;
  }finally{draco.dispose();}
 })();
 try{await preparation;}catch(error){preparation=null;throw error;}
}
function clonar(){
 const root=template.clone(true),textures=new Map();
 root.traverse(m=>{if(!m.isMesh)return;m.geometry=m.geometry.clone();const material=source=>{const copy=source.clone();for(const [k,v]of Object.entries(copy))if(v?.isTexture){if(!textures.has(v)){const t=v.clone();t.needsUpdate=true;textures.set(v,t);}copy[k]=textures.get(v);}return copy;};m.material=Array.isArray(m.material)?m.material.map(material):material(m.material);});return root;
}
// Malhas NASA intactas. Articulações, suporte e tempo são ilustrações educativas.
export function criarIngenuity(){
 if(!template)throw Error('Prepare Ingenuity primeiro');
 const root=new T.Group(),rig=clonar(),groups=new Map(rig.children.map(g=>[g.name,g]));root.add(rig);
 const carrier=new T.Group();carrier.name='perseverance-context';carrier.add(criarRoverPerseverance());carrier.scale.setScalar(2.3);root.add(carrier);carrier.visible=false;
 const support=new T.Group();support.name='delivery-art';const bar=new T.Mesh(new T.BoxGeometry(2.2,.15,.3),new T.MeshStandardMaterial({color:0x839bb2,roughness:.7}));support.add(bar);root.add(support);support.visible=false;
 const homes=new Map([...groups].map(([id,g])=>[id,g.position.clone()])),media=matchMedia('(prefers-reduced-motion: reduce)');
 let phase=null,elapsed=0,rotorAngle=0;
 const displacement={body:[0,0,0],legs:[0,-2,0],rotorLower:[0,2,0],rotorUpper:[0,4,0],solar:[0,6,0]};
 function animate(state,alpha,dt){
  const next=state.helicopterPhase||null;if(next!==phase){phase=next;elapsed=0;rotorAngle=0;}
  if(phase)elapsed=media.matches?4:dt===undefined?elapsed:Math.min(4,elapsed+dt);
  const t=elapsed/4,e=t*t*(3-2*t),moving=phase&&elapsed<4;
  const delivery=['transport','unlock','deploy','release','solar'].includes(phase);
  carrier.visible=delivery&&!state.isolated;support.visible=['transport','unlock','deploy'].includes(phase)&&!state.isolated;
  carrier.position.set(phase==='solar'?10*e:0,0,0);support.position.set(0,2.6,0);
  let height=0,angle=0,fold=0;
  if(phase==='transport'){height=2;angle=-Math.PI/2;fold=1;}
  if(phase==='unlock'){height=2;angle=-Math.PI/2*(1-e);fold=1;}
  if(phase==='deploy'){height=.64;fold=1-e;}
  if(phase==='release')height=.64*(1-e);
  if(phase==='hover')height=3*e;
  if(phase==='land')height=3*(1-e);
  rig.position.y=height;rig.rotation.z=angle;
  const spinning=['spin','hover','land'].includes(phase)&&!media.matches;
  if(spinning&&dt!==undefined)rotorAngle=(rotorAngle+dt*10*(phase==='land'?1-e:1))%(Math.PI*2);
  for(const [id,g]of groups){
   g.visible=!state.isolated||state.selected===id;
   const target=homes.get(id).clone();if(!phase&&state.exploded)target.add(new T.Vector3(...displacement[id]));
   if(phase)g.position.copy(target);else g.position.lerp(target,alpha);
   if(id==='rotorLower'||id==='rotorUpper')g.rotation.y=spinning?rotorAngle*(id==='rotorUpper'?-1:1):0;
  }
  for(const joint of groups.get('legs').children)joint.quaternion.setFromAxisAngle(new T.Vector3(...joint.userData.axis),fold*Math.PI/3);
  if(!phase){rig.position.y=0;rig.rotation.z=0;}
  root.userData.flight={phase,height,fold,angle,rotorAngle};root.updateMatrixWorld(true);
  return !!moving||spinning||(!phase&&[...groups].some(([id,g])=>g.position.distanceTo(homes.get(id).clone().add(state.exploded?new T.Vector3(...displacement[id]):new T.Vector3()))>.01));
 }
 return {root,groups,panels:[],legs:[],contextGroups:[carrier,support],floorY:-.05,animate};
}
