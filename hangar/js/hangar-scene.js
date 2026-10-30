import {criarAmbienteMissao} from './mission-environment.js?v=303';
import {aoMudarAtividade} from './app-bridge.js?v=303';
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {PARTES,posicaoParte} from './saturno-v-data.js?v=4';
import {criarSaturnoV} from './saturno-v-model.js?v=5';

export function criarCena({canvas,viewport,labels,onSelect,onPivotChange,partes=PARTES,positionForPart=posicaoParte,buildModel=criarSaturnoV,scenario=null,initialState=null,framing=null}){
 const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=T.SRGBColorSpace;
 renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(36,1,.1,2400);
 const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.minDistance=2;controls.maxDistance=1200;
 controls.enablePan=true;controls.autoRotateSpeed=.65;
 const groundScenario=['moon-ground','mars-ground','titan-ground'].includes(typeof scenario==='string'?scenario:scenario?.id);
 scene.add(new T.HemisphereLight(0xe1f1ff,0x596576,groundScenario?.45:2.6));
 for(const [color,power,x,y,z]of [[0xffffff,3.5,60,140,100],[0xb6dbff,2.5,-65,100,-50],[0xffdcaa,1.4,50,20,-70]]){const l=new T.DirectionalLight(color,groundScenario?power*.22:power);l.position.set(x,y,z);scene.add(l);}
 const {root,groups,panels,legs,animate,framingBox,contextGroups=[],floorY=-1.75}=buildModel();scene.add(root);
 const grid=new T.GridHelper(160,32,0x39536a,0x233546);grid.position.y=floorY-.05;scene.add(grid);
 const floor=new T.Mesh(new T.CircleGeometry(14,80),new T.MeshStandardMaterial({color:0x263949,roughness:.8,metalness:.3}));floor.rotation.x=-Math.PI/2;floor.position.y=floorY;scene.add(floor);
 if(animate&&initialState)animate(initialState,1);
 let ambiente=scenario?criarAmbienteMissao({scene,root,camera,scenario,floorY:0}):null;
 const labelMap=new Map();for(const p of partes){const el=document.createElement('span');el.className='piece-label';el.textContent=p.curto;labels.append(el);labelMap.set(p.id,el);}
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let state=initialState||{selected:null,exploded:false,isolated:false},autoFit=true,pendingFit=true,rotate=false,last=performance.now(),raf,cameraGoal=null,firstFit=true,active=true,disposed=false;
 function visible(){return [...groups.values()].filter(g=>g.visible);}
 function boxOf(id){
  root.updateMatrixWorld(true);const box=new T.Box3();
  const objects=id?[groups.get(id)]:[...visible(),...contextGroups.filter(g=>g.visible)];
  for(const g of objects)g?.traverse(o=>{
   if(!o.geometry)return;for(let a=o;a;a=a.parent)if(!a.visible)return;
   if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();
   if(o.geometry.boundingBox)box.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld));
  });return box;
 }

 function fit(id=null){
  const box=(!id&&framingBox?.(state))||boxOf(id);if(box.isEmpty())return;
  const size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
  const direction=camera.position.clone().sub(controls.target).normalize();if(direction.lengthSq()<.1)direction.set(.3,.1,1).normalize();
  const target=center.clone();target.y+=size.y*(ambiente?0:.06);
  const right=new T.Vector3().crossVectors(camera.up,direction).normalize();
  if(right.lengthSq()<.01)right.set(1,0,0);
  const up=new T.Vector3().crossVectors(direction,right).normalize();
  // Optional space above the subject for an experience's overlay controls.
  if(framing?.offsetY)target.addScaledVector(up,size.y*framing.offsetY);
  const tanV=Math.tan(camera.fov*Math.PI/360),tanH=tanV*camera.aspect;
  let distance=7;
  // Fit every bounding-box corner in camera space. Unlike a sphere fit, this
  // keeps a tall narrow rocket large on portrait displays and safe after orbiting.
  for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
   const v=new T.Vector3(x,y,z).sub(target);
   distance=Math.max(distance,v.dot(direction)+Math.max(Math.abs(v.dot(right))/(tanH*(framing?.horizontal||.78)),Math.abs(v.dot(up))/(tanV*(framing?.vertical||(ambiente?.62:.70)))));
  }
  const position=target.clone().addScaledVector(direction,Math.max(7,distance));
  if(firstFit||media.matches){controls.target.copy(target);camera.position.copy(position);controls.update();firstFit=false;cameraGoal=null;}
  else cameraGoal={target,position};
 }
 function screenPoint(point){const rect=viewport.getBoundingClientRect(),v=point.clone().project(camera);return {x:(v.x*.5+.5)*rect.width,y:(-v.y*.5+.5)*rect.height};}
 function partName(id){return partes.find(p=>p.id===id)?.curto||'Conjunto inteiro';}
 function announcePivot(label,point,show=true){onPivotChange?.({label,show,...screenPoint(point)});}
 function setPivotPoint(point,label,show=true){
  // Preserve the view direction and distance, so choosing a pivot never causes
  // the disorienting jump common in CAD viewers.
  cameraGoal=null;const offset=camera.position.clone().sub(controls.target);controls.target.copy(point);camera.position.copy(point).add(offset);controls.update();autoFit=false;pendingFit=false;announcePivot(label,point,show);
 }
 function setPivot(id,point=null){const group=groups.get(id);if(!group)return;root.updateMatrixWorld(true);setPivotPoint(point||new T.Box3().setFromObject(group).getCenter(new T.Vector3()),partName(id));}
 function updateGeometry(alpha,dt,frameDt){let moving=false;
  if(animate){grid.visible=floor.visible=!state.isolated&&!ambiente;return animate(state,alpha,dt,frameDt);}
  for(const [i,p]of partes.entries()){
   const g=groups.get(p.id),v=positionForPart(p,i,state.exploded);const target=new T.Vector3(v.x,v.y,v.z);
   if(g.position.distanceTo(target)>.015){moving=true;g.position.lerp(target,alpha);}else g.position.copy(target);
   g.visible=!state.isolated||state.selected===p.id;
  }
  for(const {panel,a}of panels){const r=state.exploded?8:0;panel.position.lerp(new T.Vector3(Math.sin(a)*r,0,Math.cos(a)*r),alpha);}
  for(const leg of legs)leg.scale.x+=( (state.exploded?1:.5)-leg.scale.x)*alpha;
  grid.visible=floor.visible=!state.isolated&&!ambiente;root.updateMatrixWorld(true);return moving;
 }
 function setState(next){
  const prev=state;state={...next};
  for(const [id,g]of groups)g.traverse(o=>{if(o.isMesh)for(const m of (Array.isArray(o.material)?o.material:[o.material]))m.emissive?.setHex(state.selected===id?0x153348:0);});
  if(state.isolated!==prev.isolated||(state.isolated&&prev.selected!==state.selected)){updateGeometry(1);autoFit=true;pendingFit=true;onPivotChange?.({label:state.isolated?partName(state.selected):'Conjunto inteiro',show:false});}
  if(prev.exploded!==state.exploded){autoFit=true;pendingFit=true;onPivotChange?.({label:state.isolated?partName(state.selected):'Conjunto inteiro',show:false});if(media.matches)updateGeometry(1);}
  if(prev.sts61Phase!==state.sts61Phase||prev.artemis1Phase!==state.artemis1Phase){autoFit=true;pendingFit=true;if(media.matches)updateGeometry(1);}
 }
 controls.addEventListener('start',()=>{autoFit=false;pendingFit=false;cameraGoal=null;});
 const ray=new T.Raycaster(),mouse=new T.Vector2();let down=null,pointers=new Set(),multi=false,lastTap=null;
 function hitAt(e){const rect=canvas.getBoundingClientRect();mouse.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(mouse,camera);return ray.intersectObjects(visible(),true)[0];}
 function touchHit(e){const direct=hitAt(e);if(direct||e.pointerType==='mouse')return direct;
  for(const [dx,dy] of [[0,-8],[8,0],[0,8],[-8,0]]){const hit=hitAt({clientX:e.clientX+dx,clientY:e.clientY+dy});if(hit)return hit;}return null;
 }
 canvas.addEventListener('pointerdown',e=>{pointers.add(e.pointerId);multi=pointers.size>1;down={x:e.clientX,y:e.clientY,id:e.pointerId};});
 canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);down=null;});
 canvas.addEventListener('pointerup',e=>{
  pointers.delete(e.pointerId);if(multi||!down||e.pointerId!==down.id||Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){if(!pointers.size)multi=false;return;}
  down=null;const hit=touchHit(e);if(!hit)return;const id=hit.object.userData.part,now=performance.now();onSelect(id);
  if(e.pointerType&&e.pointerType!=='mouse'&&lastTap&&lastTap.id===id&&now-lastTap.time<360&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<24){setPivot(id,hit.point);lastTap=null;}else lastTap={id,time:now,x:e.clientX,y:e.clientY};
 });
 canvas.addEventListener('dblclick',e=>{const hit=hitAt(e);if(hit){onSelect(hit.object.userData.part);setPivot(hit.object.userData.part,hit.point);}});
 function resize(){const w=viewport.clientWidth,h=viewport.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();pendingFit=autoFit;}
 const observer=new ResizeObserver(resize);observer.observe(viewport);camera.position.set(36,65,210);controls.target.set(0,52,0);updateGeometry(1);resize();
 function placeLabels(){let lastY=-100;const rect=viewport.getBoundingClientRect();
  for(const p of [...partes].reverse()){
   const el=labelMap.get(p.id);el.hidden=!groups.get(p.id)?.visible||!state.exploded||state.isolated||(matchMedia('(pointer:coarse), (max-width:680px)').matches&&p.id!==state.selected);if(el.hidden)continue;
   const box=boxOf(p.id);const center=box.getCenter(new T.Vector3());center.x=box.max.x+2;center.project(camera);
   let x=(center.x*.5+.5)*rect.width,y=(-center.y*.5+.5)*rect.height;
   if(center.z>1||center.z< -1||y<32||y>rect.height-32){el.hidden=true;continue;}
   y=Math.max(y,lastY+22);lastY=y;el.hidden=y>rect.height-32;
   el.style.left=`${Math.min(rect.width-125,Math.max(8,x))}px`;el.style.top=`${y}px`;el.classList.toggle('active',p.id===state.selected);
  }
 }
 function tick(now){if(disposed||!active)return;raf=requestAnimationFrame(tick);const frameDt=Math.min((now-last)/1000,1),dt=Math.min(frameDt,.05);last=now;
  const moving=updateGeometry(media.matches?1:1-Math.exp(-dt*7),media.matches?undefined:dt,media.matches?undefined:frameDt);
  if(pendingFit||(moving&&autoFit)){fit(state.isolated?state.selected:null);pendingFit=false;}
  if(cameraGoal){const alpha=1-Math.exp(-dt*10);camera.position.lerp(cameraGoal.position,alpha);controls.target.lerp(cameraGoal.target,alpha);if(camera.position.distanceTo(cameraGoal.position)<.01&&controls.target.distanceTo(cameraGoal.target)<.01)cameraGoal=null;}
  controls.autoRotate=rotate&&!media.matches;controls.update();ambiente?.update(media.matches?0:dt);placeLabels();renderer.render(scene,camera);
 }
 const removerAtividade=aoMudarAtividade(value=>{
  if(disposed)return;active=value;cancelAnimationFrame(raf);last=performance.now();
  if(active)raf=requestAnimationFrame(tick);
 });
 return {
  setState,
  setScenario(next){
   if(disposed||next===scenario)return;
   updateGeometry(1);ambiente?.dispose();scene.background=null;scenario=next;
   ambiente=next?criarAmbienteMissao({scene,root,camera,scenario:next,floorY:0}):null;
   autoFit=true;pendingFit=true;
  },
  overview(){autoFit=true;pendingFit=true;onPivotChange?.({label:'Conjunto inteiro',show:false});},
  focus(){if(state.selected){autoFit=false;pendingFit=false;updateGeometry(1);fit(state.selected);announcePivot(partName(state.selected),controls.target);}},
  setPivot,
  zoom(factor){cameraGoal=null;pendingFit=false;autoFit=false;camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);controls.update();},
  orbit(yaw,pitch){if(disposed)return;cameraGoal=null;pendingFit=false;autoFit=false;const offset=camera.position.clone().sub(controls.target),spherical=new T.Spherical().setFromVector3(offset);spherical.theta+=yaw;spherical.phi+=pitch;spherical.makeSafe();camera.position.copy(controls.target).add(offset.setFromSpherical(spherical));controls.update();},
  rotate(value){rotate=value;},
  dispose(){if(disposed)return;disposed=true;active=false;ambiente?.dispose();removerAtividade();cancelAnimationFrame(raf);observer.disconnect();controls.dispose();const geometries=new Set(),materials=new Set(),textures=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of (Array.isArray(o.material)?o.material:[o.material])){materials.add(m);for(const value of Object.values(m))if(value?.isTexture)textures.add(value);}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.forceContextLoss();scene.clear();for(const el of labelMap.values())el.remove();},
  // Read-only diagnostic surface for local integration tests.
  inspect(){return {disposed,environment:ambiente?.inspect()||null,flight:root.userData.flight?{...root.userData.flight}:null,active,state:{...state},groups:[...groups].map(([id,g])=>({id,visible:g.visible,position:g.position.toArray(),rotation:g.rotation.toArray()})),context:contextGroups.map(g=>({id:g.name,visible:g.visible,position:g.position.toArray()})),camera:camera.position.toArray(),target:controls.target.toArray(),calls:renderer.info.render.calls};},
  project(id){const box=boxOf(id),v=box.getCenter(new T.Vector3()).project(camera);return {x:(v.x*.5+.5)*viewport.clientWidth,y:(-v.y*.5+.5)*viewport.clientHeight};}
 };
}
