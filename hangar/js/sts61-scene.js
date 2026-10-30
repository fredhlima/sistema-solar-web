import * as T from 'three';
import {criarCena} from './hangar-scene.js?v=303';
import {criarShuttle} from './shuttle-model.js?v=8';
import {PARTES as PARTES_SHUTTLE, posicaoParte} from './shuttle-data.js?v=4';
import {ESTADOS_STS61,PARTES_STS61,estadoCenaSTS61,ARTE_STS61} from './sts61-scene-state.js?v=1';
export {ESTADOS_STS61,PARTES_STS61,estadoCenaSTS61,ARTE_STS61} from './sts61-scene-state.js?v=1';

// Scene states are an illustrated account of STS-61, never a reconstruction of telemetry.
// The source orbiter geometry is NASA's generic Shuttle (D); service props below are app art.
function material(color,emissive=0){return new T.MeshStandardMaterial({color,roughness:.48,metalness:.3,emissive,emissiveIntensity:.16,side:T.DoubleSide});}
function caixa(parent,w,h,d,color,x=0,y=0,z=0){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material(color));mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
function arteServico(id,color){
 const group=new T.Group();group.name=id;group.userData.part=id;group.userData.artistic=true;
 caixa(group,3.6,2.4,.28,0x1c3444);
 caixa(group,3.36,2.16,.09,color,0,0,.19);
 for(const x of [-1.2,0,1.2]){
  const ring=new T.Mesh(new T.TorusGeometry(.28,.07,8,20),material(0xe8eff2));
  ring.position.set(x,0,.29);group.add(ring);
 }
 group.traverse(object=>{if(object.isMesh)object.userData.part=id;});
 return group;
}
export function criarShuttleSTS61(){
 const base=criarShuttle(),{root,groups}=base;
 const support=new T.Group();support.name='suporte-de-servico-artistico';support.userData.artistic=true;root.add(support);
 const silver=material(0x829aaa),gold=material(0xd5b77a);
 const platform=new T.Mesh(new T.CylinderGeometry(2.8,2.8,.32,32),silver);support.add(platform);
 for(const x of [-1.9,1.9])for(const z of [-1.3,1.3]){const leg=new T.Mesh(new T.CylinderGeometry(.09,.09,5,8),gold);leg.position.set(x,-2.5,z);support.add(leg);}
 for(const [id,,color]of ARTE_STS61){const group=arteServico(id,color);groups.set(id,group);root.add(group);}
 const poses=new Map();
 function animate(state,alpha=1){
  const fase=state.sts61Phase||'launch',config=ESTADOS_STS61[fase];
  if(!config)throw new RangeError(`Fase STS-61 desconhecida: ${fase}`);
  // Reset only this private clone. STS-31 keeps its original animator and geometry.
  base.animate({exploded:false,isolated:false},1);
  const orbital=!['launch','booster-separation','tank-separation'].includes(fase);
  for(const [i,parte]of PARTES_SHUTTLE.entries()){
   const group=groups.get(parte.id),at=posicaoParte(parte,i,false);
   group.position.set(at.x,at.y,at.z-(orbital?7.5:0));
   group.rotation.set(0,0,0);
  }
  if(config.boosterSeparated){groups.get('srb-left').position.set(-14,-5,-4);groups.get('srb-right').position.set(14,-5,-4);}
  if(config.tankSeparated)groups.get('tank').position.set(0,5,-15);
  const hubble=groups.get('hubble');
  if(config.hubble==='solo')hubble.position.set(0,5,0);
  else if(config.hubble==='approach')hubble.position.set(12,15,10);
  else if(config.hubble==='servicing')hubble.position.set(-9,18,12);
  else if(config.hubble==='released')hubble.position.set(-12,17,7);
  base.setServicePose({doorsOpen:config.doorsOpen?1:0,armGrab:config.hubble==='servicing'||config.hubble==='released'?1:0,armLift:config.hubble==='servicing'?0.32:config.hubble==='released'?1:0,arraysOpen:config.hubble?1:0,apertureOpen:config.hubble==='released'?1:0});
  support.visible=!!config.support;support.position.set(-9,14,12);
  for(const [id]of ARTE_STS61)groups.get(id).position.set(-16,23,14);
  if(config.landed){
   for(const id of ['orbiter','engines','door-left','door-right']){const group=groups.get(id);group.position.set(0,6,0);group.rotation.z=-Math.PI/2;}
  }
  const visible=new Set(config.visible);
  for(const [id,group]of groups)group.visible=visible.has(id)&&(!state.isolated||state.selected===id);
  let moving=false;
  for(const group of [...groups.values(),support]){
   const previous=poses.get(group),target=group.position.clone(),rotation=group.quaternion.clone();
   if(previous&&alpha<1&&group.visible){
    group.position.copy(previous.position).lerp(target,alpha);
    group.quaternion.copy(previous.rotation).slerp(rotation,alpha);
    moving=group.position.distanceTo(target)>.01||group.quaternion.angleTo(rotation)>.001||moving;
   }
   poses.set(group,{position:group.position.clone(),rotation:group.quaternion.clone()});
  }
  root.userData.flight={mission:'STS-61',phase:fase,artisticService:true,hubbleOnLaunch:false};
  root.updateMatrixWorld(true);
  return moving;
 }
 animate(estadoCenaSTS61('launch'));
 return {...base,root,groups,animate};
}
export function criarCenaSTS61({canvas,viewport,labels,onSelect,fase='launch'}){
 const config=ESTADOS_STS61[fase];
 if(!config)throw new RangeError(`Fase STS-61 desconhecida: ${fase}`);
 return criarCena({canvas,viewport,labels,onSelect,partes:PARTES_STS61,buildModel:criarShuttleSTS61,scenario:config.scenario,initialState:estadoCenaSTS61(fase)});
}
