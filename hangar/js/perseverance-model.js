import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

let template=null,preparation=null;
export async function prepararPerseverance(){
 if(template)return;if(preparation)return preparation;
 preparation=(async()=>{
  const draco=new DRACOLoader();draco.setDecoderPath(new URL('../../lib/draco/',import.meta.url).href);
  try{
   const loader=new GLTFLoader();loader.setDRACOLoader(draco);
   const {scene}=await loader.loadAsync(new URL('../../modelos/perseverance.glb',import.meta.url).href);
   scene.updateMatrixWorld(true);const frozen=new T.Group(),sourceGeometries=new Set();
   scene.traverse(mesh=>{if(!mesh.isMesh)return;const geometry=mesh.geometry.clone();
    if(mesh.isSkinnedMesh){mesh.skeleton.update();const attr=geometry.attributes.position,v=new T.Vector3();for(let i=0;i<attr.count;i++){v.fromBufferAttribute(attr,i);mesh.applyBoneTransform(i,v);attr.setXYZ(i,v.x,v.y,v.z);}geometry.deleteAttribute('skinIndex');geometry.deleteAttribute('skinWeight');}
    geometry.applyMatrix4(mesh.matrixWorld);geometry.computeBoundingBox();geometry.computeBoundingSphere();
    const copy=new T.Mesh(geometry,mesh.material);copy.name=mesh.name;frozen.add(copy);sourceGeometries.add(mesh.geometry);
   });sourceGeometries.forEach(g=>g.dispose());
   const box=new T.Box3().setFromObject(frozen),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
   const extent=Math.max(size.x,size.y,size.z);if(!Number.isFinite(extent)||extent<=0)throw Error('Rover vazio');
   const root=new T.Group();root.add(frozen);root.scale.setScalar(5/extent);
   frozen.position.sub(new T.Vector3(center.x,box.min.y,center.z));template=root;
  }finally{draco.dispose();}
 })();
 try{await preparation;}catch(e){preparation=null;throw e;}
}
export function criarRoverPerseverance(){
 const root=template.clone(true),textures=new Map();
 root.traverse(mesh=>{if(!mesh.isMesh)return;mesh.geometry=mesh.geometry.clone();
  const material=m=>{const copy=m.clone();for(const [k,v]of Object.entries(copy))if(v?.isTexture){if(!textures.has(v)){const tex=v.clone();tex.needsUpdate=true;textures.set(v,tex);}copy[k]=textures.get(v);}return copy;};
  mesh.material=Array.isArray(mesh.material)?mesh.material.map(material):material(mesh.material);
 });return root;
}
const fases={
 cruise:['cruise','backshell','heatshield'],entry:['backshell','heatshield'],
 parachute:['parachute','backshell','heatshield'],shield:['parachute','backshell','heatshield'],
 descent:['descent','rover'],skycrane:['descent','rover'],touchdown:['descent','rover'],science:['rover']
};

// Rover original NASA; demais sistemas são construções artísticas didáticas.
export function criarPerseverance(){
 if(!template)throw Error('Prepare o rover primeiro');
 const root=new T.Group(),groups=new Map(['cruise','backshell','heatshield','parachute','descent','rover'].map(id=>{const g=new T.Group();g.name=id;root.add(g);return[id,g];}));
 groups.get('rover').add(criarRoverPerseverance());
 const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.65,...extra});
 const white=mat(0xdce5ee),dark=mat(0x263746),gold=mat(0xb69542,{metalness:.4}),red=mat(0xb84935),blue=mat(0x253f70);
 const add=(id,geo,material,y=0)=>{const mesh=new T.Mesh(geo,material);mesh.position.y=y;groups.get(id).add(mesh);return mesh;};
 add('cruise',new T.CylinderGeometry(3.4,3.4,.65,48),gold);
 add('cruise',new T.CylinderGeometry(3.5,3.5,.08,48),blue,.38);
 for(let i=0;i<12;i++){const line=add('cruise',new T.BoxGeometry(.025,.015,6.8),white,.43);line.rotation.y=i*Math.PI/12;}
 add('backshell',new T.CylinderGeometry(1.7,3.6,3.8,48,1,true),white);
 add('backshell',new T.CylinderGeometry(1.7,1.7,.15,48),gold,1.9);
 add('heatshield',new T.CylinderGeometry(3.6,3.4,.38,48),dark);
 const cap=add('parachute',new T.SphereGeometry(5.5,40,20,0,Math.PI*2,0,Math.PI/2),white);cap.scale.y=.38;
 const ring=add('parachute',new T.TorusGeometry(3.4,.15,10,48),red,1.65);ring.rotation.x=Math.PI/2;
 const cords=new T.BufferGeometry();const points=[];for(let i=0;i<16;i++){const a=i*Math.PI/8;points.push(5.5*Math.cos(a),0,5.5*Math.sin(a),0,-7,0);}cords.setAttribute('position',new T.Float32BufferAttribute(points,3));groups.get('parachute').add(new T.LineSegments(cords,new T.LineBasicMaterial({color:0xc9d4df})));
 add('descent',new T.BoxGeometry(4.5,.75,3.8),gold);
 for(const x of [-2.1,2.1])for(const z of [-1.5,1.5])for(const dx of [-.3,.3]){const nozzle=add('descent',new T.CylinderGeometry(.18,.32,.7,16),dark,-.65);nozzle.position.x=x+dx;nozzle.position.z=z;}
 const tetherGeo=new T.BufferGeometry();tetherGeo.setAttribute('position',new T.Float32BufferAttribute(new Array(18).fill(0),3));
 const tethers=new T.LineSegments(tetherGeo,new T.LineBasicMaterial({color:0xe8efff}));root.add(tethers);tethers.visible=false;
 let phase=null,elapsed=0;const media=matchMedia('(prefers-reduced-motion: reduce)');
 const assembled={cruise:10,backshell:5,heatshield:2.9,parachute:17,descent:4.5,rover:0};
 const exploded={cruise:25,backshell:13,heatshield:-3,parachute:34,descent:8,rover:0};
 function animate(state,alpha,dt){
  const next=state.marsPhase||null;if(next!==phase){phase=next;elapsed=0;}
  if(phase)elapsed=dt===undefined?(media.matches?4:elapsed):Math.min(4,elapsed+dt);
  const t=elapsed/4,ease=t*t*(3-2*t),animated=['cruise','shield','skycrane','touchdown'].includes(phase);let moving=animated&&elapsed<4;
  for(const [id,g]of groups){
   g.visible=phase?fases[phase].includes(id):!state.isolated||state.selected===id;
   let y=(state.exploded&&!phase?exploded:assembled)[id],x=0;
   if(phase==='cruise'&&id==='cruise'){y=10+3*ease;x=4*ease;}
   if(phase==='shield'&&id==='heatshield')y=2.9-5*ease;
   if(['descent','skycrane','touchdown','science'].includes(phase)){
    if(id==='descent'){y=phase==='descent'?5:8;if(phase==='touchdown'){y=8+4*ease;x=9*ease;}}
    if(id==='rover')y=phase==='descent'?1.5:phase==='skycrane'?3*(1-ease):0;
   }
   const target=new T.Vector3(x,y,0);
   if(phase)g.position.copy(target);else{if(g.position.distanceTo(target)>.01)moving=true;g.position.lerp(target,alpha);}
  }
  tethers.visible=phase==='skycrane';
  if(tethers.visible){const a=tetherGeo.attributes.position;for(let i=0;i<3;i++){const x=[-1.4,1.4,0][i],z=[1,1,-1.2][i];a.setXYZ(i*2,x,7.5,z);a.setXYZ(i*2+1,x,groups.get('rover').position.y+2,z);}a.needsUpdate=true;tetherGeo.computeBoundingSphere();}
  root.updateMatrixWorld(true);return moving;
 }
 return {root,groups,panels:[],legs:[],animate};
}
