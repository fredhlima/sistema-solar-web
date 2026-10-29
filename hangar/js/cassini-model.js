import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

let template=null,preparation=null;
const ids=['orbiter','probe','heatshield','backshell','pilot','main','drogue'];
const fases={
 paired:['orbiter','probe'],release:['orbiter','probe'],entry:['probe','heatshield','backshell'],
 pilot:['probe','heatshield','backshell','pilot'],main:['probe','heatshield','main'],
 shield:['probe','heatshield','main'],drogue:['probe','drogue'],landed:['probe'],relay:['probe']
};

export async function prepararCassini(){
 if(template)return;if(preparation)return preparation;
 preparation=(async()=>{
  const draco=new DRACOLoader();draco.setDecoderPath(new URL('../../lib/draco/',import.meta.url).href);
  try{
   const loader=new GLTFLoader();loader.setDRACOLoader(draco);
   const {scene}=await loader.loadAsync(new URL('../../modelos/cassini.glb',import.meta.url).href);
   scene.updateMatrixWorld(true);
   const sourceGeometries=new Set(),records=[];let sourceCount=0;
   scene.traverse(mesh=>{
    if(!mesh.isMesh||mesh.name==='_root')return;
    const geometry=mesh.geometry.clone();geometry.applyMatrix4(mesh.matrixWorld);geometry.computeBoundingBox();
    records.push({name:mesh.name,geometry,material:mesh.material});sourceGeometries.add(mesh.geometry);sourceCount++;
   });
   if(!records.length)throw Error('Modelo Cassini vazio');
   const bounds=new T.Box3();for(const record of records)bounds.union(record.geometry.boundingBox);
   const size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());
   const extent=Math.max(size.x,size.y,size.z),scale=9/extent;
   if(!Number.isFinite(scale)||scale<=0)throw Error('Modelo Cassini inválido');
   const root=new T.Group(),groups=new Map(ids.map(id=>{const group=new T.Group();group.name=id;root.add(group);return[id,group];}));
   const nativeBounds=new T.Box3(),nativeRecords=[];
   for(const record of records){
    const isProbe=['foil_gold_h','tex_01_h'].includes(record.name);
    const geometry=record.geometry;geometry.translate(-center.x,-bounds.min.y,-center.z);geometry.scale(scale,scale,scale);geometry.computeBoundingBox();geometry.computeBoundingSphere();
    const group=groups.get(isProbe?'probe':'orbiter');
    if(isProbe){nativeBounds.union(geometry.boundingBox);nativeRecords.push({geometry,material:record.material,name:record.name});}
    else {const mesh=new T.Mesh(geometry,record.material);mesh.name=record.name;mesh.userData={source:'NASA Cassini-Huygens'};group.add(mesh);}
   }
   if(!nativeRecords.length)throw Error('Malha Huygens foil_gold_h ausente');
   const anchor=nativeBounds.getCenter(new T.Vector3()),probeNative=new T.Group();probeNative.name='probeNative';
   for(const record of nativeRecords){record.geometry.translate(-anchor.x,-anchor.y,-anchor.z);const mesh=new T.Mesh(record.geometry,record.material);mesh.name=record.name;mesh.userData={source:'NASA Cassini-Huygens',sealed:true};probeNative.add(mesh);}
   probeNative.position.copy(anchor);groups.get('probe').add(probeNative);
   const nativeSize=nativeBounds.getSize(new T.Vector3());
   const thinAxis=nativeSize.x<=nativeSize.y&&nativeSize.x<=nativeSize.z?new T.Vector3(1,0,0):nativeSize.y<=nativeSize.z?new T.Vector3(0,1,0):new T.Vector3(0,0,1);
   probeNative.userData.flightQuaternion=new T.Quaternion().setFromUnitVectors(thinAxis,new T.Vector3(0,1,0));
   probeNative.userData.assembledPosition=anchor.toArray();
   groups.get('probe').userData.nativeBounds={min:nativeBounds.min.toArray(),max:nativeBounds.max.toArray(),size:nativeSize.toArray()};
   sourceGeometries.forEach(geometry=>geometry.dispose());
   root.userData.segmentation={meshCount:sourceCount,groups:ids.length,probeMesh:'foil_gold_h',probeMeshes:['foil_gold_h','tex_01_h'],helperMeshHidden:'_root',normalization:9};
   template=root;
  }finally{draco.dispose();}
 })();
 try{await preparation;}catch(error){preparation=null;throw error;}
}

function cloneNative(){
 const root=template.clone(true),textures=new Map();
 root.traverse(mesh=>{
  if(!mesh.isMesh)return;mesh.geometry=mesh.geometry.clone();
  const cloneMaterial=source=>{const copy=source.clone();for(const [key,value]of Object.entries(copy))if(value?.isTexture){if(!textures.has(value)){const texture=value.clone();texture.needsUpdate=true;textures.set(value,texture);}copy[key]=textures.get(value);}return copy;};
  mesh.material=Array.isArray(mesh.material)?mesh.material.map(cloneMaterial):cloneMaterial(mesh.material);
 });
 return root;
}

// O GLB NASA permanece intacto: os estágios separados e o interior são uma visualização artística.
export function criarCassini(){
 if(!template)throw Error('Prepare Cassini primeiro');
 const root=new T.Group(),rig=cloneNative(),groups=new Map(rig.children.map(group=>[group.name,group]));root.add(rig);
 const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.66,...extra});
 const gold=mat(0xb89448,{metalness:.48}),white=mat(0xdce4e8),dark=mat(0x273747),foil=mat(0x8d6a36,{metalness:.55,roughness:.45}),red=mat(0x9d4036);
 const add=(id,geometry,material,position=[0,0,0])=>{const mesh=new T.Mesh(geometry,material);mesh.position.set(...position);mesh.userData.artistic=true;groups.get(id).add(mesh);return mesh;};
 const native=groups.get('probe').getObjectByName('probeNative');
 const nativeSize=new T.Vector3(...groups.get('probe').userData.nativeBounds.size),radius=Math.max(.42,Math.min(1.25,Math.max(nativeSize.x,nativeSize.y,nativeSize.z)*.28));
 const bodyY=-radius*1.08;
 add('probe',new T.CylinderGeometry(radius*.92,radius,radius*.45,32),gold,[0,bodyY,0]);
 add('probe',new T.CylinderGeometry(radius*1.03,radius*.96,radius*.15,32),white,[0,bodyY-radius*.30,0]);
 add('probe',new T.SphereGeometry(radius*.3,24,16),dark,[0,bodyY-radius*.38,0]);
 groups.get('probe').children.at(-1).scale.y=.3;
 add('probe',new T.CylinderGeometry(radius*1.03,radius*1.03,radius*.08,32),gold,[0,bodyY+radius*.28,0]);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;const sensor=add('probe',new T.BoxGeometry(radius*.12,radius*.05,radius*.18),white,[Math.cos(a)*radius*.8,bodyY+radius*.34,Math.sin(a)*radius*.8]);sensor.rotation.y=-a;}
 const shield=add('heatshield',new T.CylinderGeometry(radius*1.75,radius*1.75,radius*.3,48),foil,[0,bodyY-radius*1.55,0]);shield.rotation.x=0;
 const backshell=add('backshell',new T.CylinderGeometry(radius*1.28,radius*1.72,radius*1.5,48,1,true),white,[0,bodyY+radius*1.42,0]);
 add('backshell',new T.CylinderGeometry(radius*1.28,radius*1.28,radius*.14,48),gold,[0,bodyY+radius*2.2,0]);
 const pilotShell=add('pilot',new T.SphereGeometry(radius*1.42,32,16,0,Math.PI*2,0,Math.PI/2),red,[0,bodyY+radius*2.22,0]);pilotShell.scale.y=.72;
 const mainShell=add('main',new T.SphereGeometry(radius*2.45,64,24,0,Math.PI*2,0,Math.PI/2),white,[0,bodyY+radius*5.2,0]);mainShell.scale.y=.48;
 const drogueShell=add('drogue',new T.SphereGeometry(radius*1.12,32,16,0,Math.PI*2,0,Math.PI/2),white,[0,bodyY+radius*3.25,0]);drogueShell.scale.y=.58;
 const makeCords=(id,count,r,topY,bottomY,color=0xd8e0e5)=>{
  const points=[];for(let i=0;i<count;i++){const a=i*Math.PI*2/count;points.push(r*Math.cos(a),topY,r*Math.sin(a),0,bottomY,0);}
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(points,3));
  groups.get(id).add(new T.LineSegments(geometry,new T.LineBasicMaterial({color})));return geometry;
 };
 const pilotCords=makeCords('pilot',12,radius*1.38,bodyY+radius*2.22,bodyY+radius*.8,0xd7d5ce);
 const mainCords=makeCords('main',16,radius*2.4,bodyY+radius*5.2,bodyY+radius*.9);
 const drogueCords=makeCords('drogue',12,radius*1.08,bodyY+radius*3.25,bodyY+radius*.9);
 const assembled=new Map([...groups].map(([id,group])=>[id,group.position.clone()]));
 const exploded={orbiter:[0,0,0],probe:[0,0,0],heatshield:[0,-3.3,0],backshell:[0,3.2,0],pilot:[3,3.5,0],main:[0,7,0],drogue:[-3,4,0]};
 const media=matchMedia('(prefers-reduced-motion: reduce)');let phase=null,elapsed=0;
 function animate(state,alpha,dt,frameDt){
  const finale=state.cassiniPhase||null;
  const next=finale?`finale:${finale}`:state.huygensPhase||null;if(next!==phase){phase=next;elapsed=0;}
  const delta=frameDt??dt;
  if(phase)elapsed=media.matches?4:delta===undefined?elapsed:Math.min(4,elapsed+Math.max(0,delta));
  if(finale){
   const t=elapsed/4,e=t*t*(3-2*t);
   for(const [id,g] of groups){g.visible=id==='orbiter';g.scale.setScalar(1);g.position.set(0,0,0);g.rotation.set(0,0,0);}
   const orbiter=groups.get('orbiter');
   // Compressed camera-space cues, not ephemerides or physical flight dynamics.
   if(['titan','gap','farewell'].includes(finale)){orbiter.position.x=-1.6+3.2*e;orbiter.position.y=Math.sin(e*Math.PI)*.7;orbiter.rotation.y=-.25+.5*e;}
   if(['science','rings'].includes(finale))orbiter.rotation.y=.3*e;
   if(['entry','signal'].includes(finale)){orbiter.position.set(1.2*e,-1.1*e,0);orbiter.rotation.z=-.18*e;}
   if(finale==='signal')orbiter.scale.setScalar(1-.97*e);
   if(finale==='legacy')orbiter.visible=false;
   root.userData.flight={phase:finale,progress:t,parachutes:0,landed:false,artistic:true,finale:true,signalLost:finale==='signal'&&t===1,orbiterVisible:orbiter.visible};
   root.updateMatrixWorld(true);return elapsed<4;
  }
  for(const g of groups.values())g.rotation.set(0,0,0);
  const t=elapsed/4,e=t*t*(3-2*t),landed=['landed','relay'].includes(phase);
  const nativeHome=new T.Vector3(...native.userData.assembledPosition);
  const flightRotation=native.userData.flightQuaternion;
  const floorOffset=radius*1.56;
  const heights={paired:0,release:0,entry:12,pilot:10,main:8,shield:7,drogue:5,landed:floorOffset+3*(1-e),relay:floorOffset};
  const y=heights[phase]??0;
  for(const [id,g]of groups){
   g.scale.setScalar(1);g.position.set(0,0,0);
   g.visible=phase?fases[phase].includes(id):(!state.isolated||state.selected===id);
   if(phase){
    if(phase==='entry'&&id!=='probe')g.visible=false;
    if(id==='orbiter'){if(phase==='release')g.position.x=-6*e;}
    else g.position.y=y;
    if(id==='probe'&&phase==='release')g.position.x=3*e;
    if(id==='backshell'&&phase==='pilot'){g.position.y+=5*e;g.position.x=2*e;g.visible=e<.98;}
    if(id==='heatshield'&&phase==='shield'){g.position.y-=5*e;g.position.x=2*e;g.visible=e<.98;}
    if(['pilot','main','drogue'].includes(id))g.scale.setScalar(.12+.88*e);
   }else if(state.exploded)g.position.set(...exploded[id]);
   if(!phase&&['heatshield','backshell','pilot','main','drogue'].includes(id))g.visible=g.visible&&(state.exploded||state.isolated);
  }
  const sealed=!phase||['paired','release','entry'].includes(phase);
  native.visible=sealed;
  native.position.copy(phase==='entry'?new T.Vector3():nativeHome);
  native.quaternion.copy(phase==='entry'?flightRotation:new T.Quaternion());
  for(const child of groups.get('probe').children)if(child!==native)child.visible=!sealed;
  // Isolated probe shows the original exterior; explanatory parts have their own IDs.
  const parachutes=['pilot','main','shield','drogue'].includes(phase)?1:0;
  root.userData.flight={phase,progress:phase?t:0,parachutes,landed,artistic:true};
  root.updateMatrixWorld(true);
  return !!phase&&elapsed<4;
 }

  return {root,groups,panels:[],legs:[],floorY:0,animate};
}
