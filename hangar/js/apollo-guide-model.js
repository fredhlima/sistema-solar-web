import * as T from 'three';
import {PARTES} from './saturno-v-data.js?v=4';
import {criarSaturnoV} from './saturno-v-model.js?v=5';
import {criarModuloLunar} from './lunar-model.js?v=1';

const PHASES=[
 'launch','first-separation','escape','second-separation','orbit','extraction',
 'cruise','lunar-orbit','landing','ascent','departure','return','reentry','parachutes','floating'
];
const BASE=new Map(PARTES.map(p=>[p.id,p.base]));
const DROP=new Map([
 ['first-separation',['sic','inter1']],
 ['escape',['les']],
 ['second-separation',['sii','inter2']]
]);
const clamp01=n=>Math.max(0,Math.min(1,n));
const smooth=n=>{n=clamp01(n);return n*n*(3-2*n);};

function reducedMotionPreferred(){return typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;}

// The display CM mesh includes a tall cylindrical attachment. Keep it for
// the assembled vehicle, but remove that display extension for recovery views.
// This is an artistic adaptation; the original NASA asset stays unchanged.
function prepararCapsulaRecuperacao(cm){
 const attachments=[];
 cm.traverse(mesh=>{
  if(!mesh.isMesh||mesh.userData.sourceMaterial===undefined)return;
  const geometry=mesh.geometry,positions=geometry.getAttribute('position'),index=geometry.index;
  const lower=[],upper=[],count=index?.count||positions.count;
  for(let i=0;i<count;i+=3){
   const triangle=[0,1,2].map(k=>index?index.getX(i+k):i+k);
   (triangle.every(v=>positions.getY(v)<=1.78)?lower:upper).push(...triangle);
  }
  if(!lower.length||!upper.length)return;
  const lowerGeometry=geometry.clone();lowerGeometry.setIndex(lower);mesh.geometry=lowerGeometry.toNonIndexed();lowerGeometry.dispose();mesh.geometry.computeBoundingBox();mesh.geometry.computeBoundingSphere();
  const upperGeometry=geometry.clone();upperGeometry.setIndex(upper);const extensionGeometry=upperGeometry.toNonIndexed();upperGeometry.dispose();extensionGeometry.computeBoundingBox();extensionGeometry.computeBoundingSphere();
  const extension=new T.Mesh(extensionGeometry,mesh.material.clone());extension.name='CM display attachment';extension.userData.part='cm';
  mesh.add(extension);attachments.push(extension);
 });
 const cap=new T.Mesh(new T.CircleGeometry(.49,32),new T.MeshStandardMaterial({color:0xaeb4b7,roughness:.38,metalness:.58,side:T.DoubleSide}));
 cap.rotation.x=-Math.PI/2;cap.position.y=1.776;cap.name='CM recovery upper deck';cap.userData.part='cm';cm.add(cap);
 return recovery=>{for(const attachment of attachments)attachment.visible=!recovery;cap.visible=recovery;};
}

function criarParaquedas(){
 const rigging=[],rimRadius=1.45*Math.sin(Math.PI*.54),rimY=1.45*Math.cos(Math.PI*.54)*.72;
 const root=new T.Group();root.name='Apollo 11 main parachutes';root.userData.flightAsset='parachutes';
 const palette=[
  new T.MeshStandardMaterial({color:0xf2e7d2,roughness:.9,side:T.DoubleSide}),
  new T.MeshStandardMaterial({color:0xe36b2d,roughness:.88,side:T.DoubleSide})
 ];
 const lineMat=new T.LineBasicMaterial({color:0xe7dfce,transparent:true,opacity:.9});
 for(let i=0;i<3;i++){
  const a=i*Math.PI*2/3+Math.PI/6,px=Math.cos(a)*2.65,pz=Math.sin(a)*2.65;
  const canopy=new T.Group();canopy.name=`Apollo 11 main parachute ${i+1}`;canopy.position.set(px,7.15,pz);root.add(canopy);
  // Alternating orange and natural-white gores make the Apollo main-canopy pattern legible.
  for(let gore=0;gore<12;gore++){
   const mesh=new T.Mesh(new T.SphereGeometry(1.45,1,12,gore*Math.PI/6,Math.PI/6,0,Math.PI*.54),palette[gore%2].clone());
   mesh.scale.y=.72;mesh.name=`Canopy gore ${gore+1}`;canopy.add(mesh);
  }
  const positions=[];
  for(let k=0;k<12;k++){
   const theta=k*Math.PI*2/12;
   positions.push(px+Math.cos(theta)*rimRadius,7.15+rimY,pz+Math.sin(theta)*rimRadius, Math.cos(a)*.42,1.776,Math.sin(a)*.42);
  }
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  const lines=new T.LineSegments(geo,lineMat);lines.name=`Main parachute suspension lines ${i+1}`;root.add(lines);
  rigging.push({canopy,lines,px,pz,a});
 }
 // Inflate each canopy in place: risers stay anchored on the CM upper deck.
 root.userData.setInflation=progress=>{
  const radial=.08+.92*progress,vertical=.3+.7*progress;
  for(const {canopy,lines,px,pz} of rigging){
   canopy.scale.set(radial,vertical,radial);
   const vertices=lines.geometry.getAttribute('position');
   for(let k=0;k<12;k++){
    const theta=k*Math.PI*2/12;
    vertices.setXYZ(k*2,px+Math.cos(theta)*rimRadius*radial,7.15+rimY*vertical,pz+Math.sin(theta)*rimRadius*radial);
   }
   vertices.needsUpdate=true;lines.geometry.computeBoundingSphere();
  }
 };
 return root;
}

function raioCasco(cm,y,angle){
 cm.updateWorldMatrix(true,true);
 const ray=new T.Raycaster(cm.localToWorld(new T.Vector3(0,y,0)),new T.Vector3(Math.cos(angle),0,Math.sin(angle)).transformDirection(cm.matrixWorld));
 const hit=ray.intersectObject(cm,true)[0];
 if(!hit)throw new Error('Apollo flotation has no hull attachment');
 const point=cm.worldToLocal(hit.point.clone());return Math.hypot(point.x,point.z);
}
function criarFlutuacao(cm){
 const root=new T.Group();root.name='Apollo flotation collar and uprighting bags';root.userData.flightAsset='flotation';
 const orange=new T.MeshStandardMaterial({color:0xe87527,roughness:.68,metalness:.02});
 const collar=new T.Mesh(new T.TorusGeometry(raioCasco(cm,.45,0)+.18,.28,12,64),orange.clone());
 collar.name='Orange flotation collar';collar.rotation.x=Math.PI/2;collar.position.y=.45;root.add(collar);
 for(let i=0;i<3;i++){
  const a=i*Math.PI*2/3;
  const bag=new T.Mesh(new T.SphereGeometry(.48,20,14),orange.clone());
  bag.name=`Uprighting bag ${i+1}`;bag.scale.set(1.25,.72,.85);
  const radius=raioCasco(cm,1.68,a)+.54;
  bag.rotation.y=-a;bag.position.set(Math.cos(a)*radius,1.68,Math.sin(a)*radius);root.add(bag);
 }
 return root;
}

// Wraps the display model in a mission timeline. The original PARTES map stays
// intact so the hangar can continue selecting and isolating each Apollo piece.
export function criarApolloGuiado(){
 const model=criarSaturnoV(),{root,groups}=model;
 let elapsedPhase=null,phaseElapsed=0,ascentElapsed=0,flightClock=0;
 const lm=groups.get('lm'),sm=groups.get('sm'),cm=groups.get('cm');

 // Keep the Apollo CSM pieces individually selectable inside one transform so
 // transposition can move and rotate the complete spacecraft together.
 const csm=new T.Group();csm.name='Apollo command and service module';csm.userData.flightAsset='csm';
 root.remove(sm,cm);root.add(csm);csm.add(sm,cm);
 sm.position.set(0,0,0);cm.position.set(0,7,0);

 // The NASA mesh resources are shared by the cached Saturn-V model. Detaching
 // this placeholder does not create disposable per-instance geometry; disposing
 // it here would invalidate the shared NASA model used by later hangar entries.
 for(const child of [...lm.children])lm.remove(child);
 const lunar=criarModuloLunar();
 lunar.root.name='Apollo lunar module / grouped NASA assemblies';
 lm.add(lunar.root);

 const setRecoveryCapsule=prepararCapsulaRecuperacao(cm);
 const parachutes=criarParaquedas(),flotation=criarFlutuacao(cm);
 cm.add(parachutes,flotation);
 const contextGroups=[parachutes,flotation];
 const phaseSet=new Set(PHASES);

 function animate(state={},alpha=0,dt=0,frameDt=dt){
  const phase=phaseSet.has(state.apolloPhase)?state.apolloPhase:'launch';
  const delta=Number.isFinite(frameDt)?Math.max(0,Math.min(frameDt,1)):0;
  if(phase!==elapsedPhase){elapsedPhase=phase;phaseElapsed=0;}
  phaseElapsed=Math.min(4,phaseElapsed+delta);
  if(phase==='ascent')ascentElapsed=Math.min(4,ascentElapsed+delta);else ascentElapsed=0;
  flightClock+=delta;
  const reduced=reducedMotionPreferred()||!!(state.reducedMotion||state.reducedmotion||state.reduceMotion);
  const progress=reduced?1:phaseElapsed/4;
  const s=smooth(progress);
  const ascentProgress=reduced?1:ascentElapsed/4;
  const ascentS=smooth(ascentProgress);
  const selected=state.selected??state.selectedPart;
  const isolated=!!state.isolated;
  const phaseVisible=new Set();
  const allIds=[...BASE.keys()];
  const setVisible=ids=>ids.forEach(id=>phaseVisible.add(id));

  if(phase==='launch')setVisible(allIds);
  else if(phase==='first-separation')setVisible(['sic','inter1','sii','inter2','sivb','iu','sla','lm','sm','cm','les']);
  else if(phase==='escape')setVisible(['sii','inter2','sivb','iu','sla','lm','sm','cm','les']);
  else if(phase==='second-separation')setVisible(['sii','inter2','sivb','iu','sla','lm','sm','cm']);
  else if(phase==='orbit')setVisible(['sivb','iu','sla','lm','sm','cm']);
  else if(phase==='extraction')setVisible(['sivb','iu','sla','lm','sm','cm']);
  else if(['cruise','lunar-orbit'].includes(phase))setVisible(['lm','sm','cm']);
  else if(['landing','ascent'].includes(phase))setVisible(['lm']);
  else if(phase==='departure')setVisible(['lm','sm','cm']);
  else if(['return','reentry'].includes(phase))setVisible(['sm','cm']);
  else setVisible(['cm']);

  const discarded=new Set();
  if(phase==='first-separation'&&progress>=1)DROP.get(phase).forEach(id=>discarded.add(id));
  if(['escape','second-separation','orbit','extraction','cruise','lunar-orbit','landing','ascent','departure','return','reentry','parachutes','floating'].includes(phase))['sic','inter1'].forEach(id=>discarded.add(id));
  if(phase==='escape'&&progress>=1)discarded.add('les');
  if(['second-separation','orbit','extraction','cruise','lunar-orbit','landing','ascent','departure','return','reentry','parachutes','floating'].includes(phase))discarded.add('les');
  if(phase==='second-separation'&&progress>=1)['sii','inter2'].forEach(id=>discarded.add(id));
  if(['orbit','extraction','cruise','lunar-orbit','landing','ascent','departure','return','reentry','parachutes','floating'].includes(phase))['sii','inter2'].forEach(id=>discarded.add(id));
  if(phase==='extraction'&&progress>=1)['sivb','iu','sla'].forEach(id=>discarded.add(id));
  if(['cruise','lunar-orbit','landing','ascent','departure','return','reentry','parachutes','floating'].includes(phase))['sivb','iu','sla'].forEach(id=>discarded.add(id));
  if(phase==='reentry'&&progress>=1)discarded.add('sm');
  if(['parachutes','floating'].includes(phase))discarded.add('sm');

  // The rocket rises gently after ignition. The offset stays with the early
  // staging views, then the separated spacecraft are positioned around origin.
  const launchLift=phase==='launch'?12*s:['first-separation','escape','second-separation','orbit'].includes(phase)?12:0;
  for(const [id,g] of groups){
   if(!BASE.has(id))continue;
   let y=BASE.get(id)+launchLift,x=0,z=0;
   const dropPhase=[...DROP].find(([,ids])=>ids.includes(id))?.[0];
   if(dropPhase===phase){
    const order=DROP.get(phase).indexOf(id),local=phase==='second-separation'?progress:clamp01((progress*4-order*2)/2);
    y-=18*smooth(local);
   }
   if(id==='les'&&phase==='escape')y-=12*s;
   if(id==='lm'){
    if(phase==='extraction'){x=0;y=BASE.get('lm')*(1-s);g.rotation.z=0;}
    else if(['cruise','lunar-orbit'].includes(phase)){x=0;y=0;g.rotation.z=0;}
    else if(phase==='landing'){x=0;y=12*(1-s);g.rotation.z=0;}
    else if(phase==='ascent'){x=0;y=0;g.rotation.z=0;}
    else if(phase==='departure'){x=0;y=17.5+12*s;g.rotation.z=Math.PI;}
    else {g.rotation.z=0;}
   }
   if(id==='sla'&&phase==='extraction')y=85+6*s;
   g.position.set(x,y,z);
   const selectedLunar=isolated&&id==='lm'&&['descent','ascent','legs','engine','antennas'].includes(selected);
   const selectedMatch=selected===id||selected===g.userData.part||selectedLunar;
   let visible=isolated?selectedMatch:phaseVisible.has(id);
   if(discarded.has(id)&&progress>=1&&!(isolated&&selectedMatch))visible=false;
   g.visible=visible;
  }

  if(phase==='launch'){
   csm.position.set(0,BASE.get('sm')+12*s,0);csm.rotation.z=0;
   sm.position.set(0,0,0);cm.position.set(0,7,0);
  }else if(['first-separation','escape','second-separation','orbit'].includes(phase)){
   csm.position.set(0,BASE.get('sm')+12,0);csm.rotation.z=0;
   sm.position.set(0,0,0);cm.position.set(0,7,0);
  }else if(phase==='extraction'){
   csm.position.set(14*Math.sin(Math.PI*s),BASE.get('sm')+(17.5-BASE.get('sm'))*s,0);
   csm.rotation.z=Math.PI*s;
   sm.position.set(0,0,0);cm.position.set(0,7,0);
  }else if(['cruise','lunar-orbit'].includes(phase)){
   csm.position.set(0,17.5,0);csm.rotation.z=Math.PI;
   sm.position.set(0,0,0);cm.position.set(0,7,0);
  }else if(phase==='return'||phase==='departure'){
   csm.position.set(0,0,0);csm.rotation.z=0;
   sm.position.set(0,0,0);cm.position.set(0,7,0);
  }else if(phase==='reentry'){
   csm.position.set(0,0,0);csm.rotation.z=0;
   sm.position.set(0,-12*s,0);cm.position.set(0,7*(1-s),0);
  }else{
   csm.position.set(0,0,0);csm.rotation.z=0;
   sm.position.set(0,0,0);cm.position.set(0,0,0);
   if(phase==='floating'&&!reduced)cm.position.y=.16*Math.sin(flightClock*1.8);
  }
  const csmVisible=!isolated&&(phaseVisible.has('sm')||phaseVisible.has('cm'));
  csm.visible=csmVisible||isolated&&(selected==='sm'||selected==='cm');
  sm.visible=isolated?selected==='sm':phaseVisible.has('sm')&&!(phase==='reentry'&&progress>=1);
  cm.visible=isolated?selected==='cm':phaseVisible.has('cm');
  if(isolated){
   for(const [id,g]of groups)if(BASE.has(id))g.visible=selected===id;
   csm.visible=selected==='sm'||selected==='cm';
   sm.visible=selected==='sm';cm.visible=selected==='cm';
  }

  const lunarIds=['descent','ascent','legs','engine','antennas'];
  for(const [id,g]of lunar.groups){
   let visible=['extraction','cruise','lunar-orbit','landing','ascent'].includes(phase);
   if(phase==='departure')visible=id==='ascent'||id==='antennas';
   if(isolated)visible=selected==='lm'||selected===id;
   let y=0;
   if(phase==='ascent'&&(id==='ascent'||id==='antennas'))y=6*ascentS;
   if(phase==='departure'&&progress>=1)lm.visible=false;
   g.position.set(0,y,0);g.visible=visible;
  }
  if(isolated&&selected==='lm')lm.visible=true;
  if(isolated&&lunarIds.includes(selected))lm.visible=true;

  for(const panel of model.panels){
   if(phase==='extraction'){
    panel.panel.position.set(Math.cos(panel.a)*s*7,s*2,Math.sin(panel.a)*s*7);
    panel.panel.rotation.y=s*.18;
   }else{panel.panel.position.set(0,0,0);panel.panel.rotation.y=0;}
  }

  setRecoveryCapsule(['reentry','parachutes','floating'].includes(phase));
  const deployed=phase==='parachutes';
  const wantChutes=deployed&&!isolated;
  parachutes.visible=wantChutes;
  parachutes.position.set(0,0,0);parachutes.scale.setScalar(1);parachutes.userData.setInflation(s);
  flotation.visible=phase==='floating'&&!isolated;
  const phaseIndex=PHASES.indexOf(phase);
  root.userData.flight={
   phase,phaseIndex,progress:clamp01(progress),parachutes:wantChutes?3:0,
   flotation:phase==='floating'&&!isolated,reducedMotion:reduced,
   discarded:[...discarded].filter(id=>progress>=1),
   visibleParts:[...BASE.keys()].filter(id=>groups.get(id)?.visible)
  };
  root.updateMatrixWorld(true);
  return !reduced&&phaseElapsed<4&&['launch','first-separation','escape','second-separation','extraction','landing','ascent','departure','reentry','parachutes'].includes(phase);
 }

 model.lunarGroups=lunar.groups;
 model.contextGroups=contextGroups;
 model.animate=animate;
 return model;
}
