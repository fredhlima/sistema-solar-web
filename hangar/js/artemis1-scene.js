import * as T from 'three';
import {criarCena} from './hangar-scene.js?v=303';
import {criarArtemis1Modelo} from './artemis1-model.js?v=6';
import {ESTADOS_ARTEMIS1,PARTES_ARTEMIS1,estadoCenaArtemis1} from './artemis1-scene-state.js?v=2';
export {ESTADOS_ARTEMIS1,PARTES_ARTEMIS1,estadoCenaArtemis1} from './artemis1-scene-state.js?v=2';

// Independent artistic variant. No mutation of the fleet's SLS/Artemis II model.
export function criarArtemis1Guiado(){
 const model=criarArtemis1Modelo(),{root,groups}=model;
 const base=new Map([...groups].map(([id,g])=>[id,{position:g.position.clone(),rotation:g.quaternion.clone()}]));
 const serviceY=base.get('service-module').position.y;
 // Plumes are artistic event cues, excluded from picking and the fitted vehicle
 // bounds. A stable launch envelope lets the rocket rise without camera chasing.
 const launchBounds=new T.Box3();
 for(const [id,g]of groups)if(id!=='parachutes')launchBounds.union(new T.Box3().setFromObject(g));
 const launchEnvelope=launchBounds.clone();launchEnvelope.min.y-=12;launchEnvelope.max.y+=8;
 const exhaust=new T.Group();exhaust.name='empuxo-artistico';root.add(exhaust);
 const plumeGeometry=new T.ConeGeometry(1,1,20,1,true);
 const plumeMaterials=[new T.MeshBasicMaterial({color:0xffa43b,transparent:true,opacity:.5,depthWrite:false,side:T.DoubleSide}),new T.MeshBasicMaterial({color:0xffefc1,transparent:true,opacity:.85,depthWrite:false,side:T.DoubleSide})];
 const jets=[];
 for(const id of ['rs25','srb-left','srb-right']){
  groups.get(id).traverse(o=>{
   if(!o.isMesh||!/^bocal (RS-25|SRB)/.test(o.name))return;
   const bounds=new T.Box3().setFromObject(o),anchor=bounds.getCenter(new T.Vector3());anchor.y=bounds.min.y;
   const jet=new T.Group();jet.position.copy(anchor);exhaust.add(jet);
   const length=id==='rs25'?7:11,radius=(bounds.max.x-bounds.min.x)*.65;
   for(let i=0;i<2;i++){
    const flame=new T.Mesh(plumeGeometry,plumeMaterials[i]);
    const h=length*(i?.68:1);flame.scale.set(radius*(i?.55:1),h,radius*(i?.55:1));flame.position.y=-h/2;
    jet.add(flame);
   }
   jets.push({jet,anchor});
  });
 }
 exhaust.visible=false;
 let lastPhase=null,recoveryTime=0,launchTime=0;
 function animate(state={},alpha=1,dt=0,frameDt=dt){
  const phase=state.artemis1Phase||'assembled-vehicle',config=ESTADOS_ARTEMIS1[phase];
  if(!config)throw new RangeError(`Fase Artemis I desconhecida: ${phase}`);
  const reduced=state.reducedMotion||(typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  if(phase!==lastPhase){lastPhase=phase;recoveryTime=0;launchTime=0;}
  const elapsed=Number.isFinite(frameDt)?Math.max(0,Math.min(frameDt,1)):0;
  if(phase==='liftoff')launchTime=Math.min(5,launchTime+elapsed);
  const launchProgress=phase==='liftoff'?(reduced?1:launchTime/5):0;
  const rise=8*launchProgress*launchProgress;
  exhaust.visible=phase==='liftoff'&&!state.isolated;
  for(const {jet,anchor}of jets){jet.position.copy(anchor);jet.position.y+=rise;}
  if(phase==='parachutes-splashdown')recoveryTime=Math.min(6,recoveryTime+(Number.isFinite(frameDt)?Math.max(0,Math.min(frameDt,1)):0));
  const recoveryProgress=reduced?1:recoveryTime/6;
  const landed=phase==='parachutes-splashdown'&&recoveryProgress>=1;
  const blend=reduced?1:Math.max(0,Math.min(1,alpha));
  const visible=new Set(config.visible);
  const orbital=!['assembled-vehicle','liftoff','booster-separation','fairings-and-tower-jettison'].includes(phase);
  let moving=false;
  for(const [id,g]of groups){
   const initial=base.get(id),position=initial.position.clone(),rotation=initial.rotation.clone();
   if(phase==='liftoff')position.y+=rise;
   // Both sides of a separation must use the same orbital origin. Otherwise
   // recentering only Orion/ICPS places the ICPS inside the departing core.
   if(orbital&&!['srb-left','srb-right','las','fairing-left','fairing-right'].includes(id))position.y-=serviceY;
   if(config.boostersSeparated&&id.startsWith('srb-'))position.add(new T.Vector3(id==='srb-left'?-12:12,-12,0));
   if(config.fairingsSeparated){
    if(id==='las')position.y+=14;
    if(id.startsWith('fairing-'))position.add(new T.Vector3(id==='fairing-left'?-12:12,4,0));
   }
   if(config.coreSeparated&&['core','rs25'].includes(id))position.y-=25;
   if(config.icpsSeparated&&id==='icps')position.add(new T.Vector3(-9,-14,0));
   if(id.startsWith('solar-')&&config.arraysOpen){
    if(g.userData.deployedPosition)position.fromArray(g.userData.deployedPosition).add(new T.Vector3(0,-serviceY,0));
    if(g.userData.deployedRotation)rotation.setFromEuler(new T.Euler(...g.userData.deployedRotation));
   }
   if(config.serviceSeparated&&(id==='service-module'||id.startsWith('solar-')))position.add(new T.Vector3(-13,-12,-2));
   if(phase==='atmospheric-reentry'||phase==='parachutes-splashdown'){
    if(id==='crew-module'||id==='parachutes')position.y+=2-base.get('crew-module').position.y+serviceY;
   }
   if(phase==='parachutes-splashdown'&&(id==='crew-module'||id==='parachutes'))position.y+=18*(1-recoveryProgress);
   g.visible=!(id==='parachutes'&&landed)&&visible.has(id)&&(!state.isolated||state.selected===id);
   if(g.visible){
    g.position.lerp(position,blend);g.quaternion.slerp(rotation,blend);
    moving=g.position.distanceTo(position)>.005||g.quaternion.angleTo(rotation)>.001||moving;
   }else{g.position.copy(position);g.quaternion.copy(rotation);}
  }
  root.userData.flight={mission:'Artemis I',phase,artistic:true,crewed:false,lunarLanding:false,arraysOpen:config.arraysOpen,recoveryProgress,landed,launchProgress,exhaustVisible:exhaust.visible};
  root.updateMatrixWorld(true);return moving||(phase==='parachutes-splashdown'&&!landed)||(phase==='liftoff'&&launchProgress<1);
 }
 animate(estadoCenaArtemis1('assembled-vehicle'));
 return {...model,animate,framingBox(state){return state.artemis1Phase==='liftoff'?launchEnvelope.clone():null;}};
}
export function criarCenaArtemis1({canvas,viewport,labels,onSelect,phase='assembled-vehicle'}){
 const config=ESTADOS_ARTEMIS1[phase];if(!config)throw new RangeError(`Fase Artemis I desconhecida: ${phase}`);
 const scene=criarCena({canvas,viewport,labels,onSelect,partes:PARTES_ARTEMIS1,buildModel:criarArtemis1Guiado,scenario:config.scenario,initialState:estadoCenaArtemis1(phase),framing:{horizontal:.84,vertical:.80,offsetY:.08}});
 // A slightly elevated view reveals the four solar wings instead of their thin edges.
 scene.orbit(.2,-.42);scene.overview();
 return {...scene,setPhase(next){
  const config=ESTADOS_ARTEMIS1[next];if(!config)throw new RangeError(`Fase Artemis I desconhecida: ${next}`);
  scene.setState(estadoCenaArtemis1(next));scene.setScenario(config.scenario);
 }};
}
