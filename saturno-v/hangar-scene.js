import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {PARTES,posicaoParte} from './saturno-v-data.js?v=2';
import {criarSaturnoV} from './saturno-v-model.js?v=1';

export function criarCena({canvas,viewport,labels,onSelect}){
 const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=T.SRGBColorSpace;
 renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(36,1,.1,2400);
 const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.minDistance=2;controls.maxDistance=1200;
 controls.enablePan=false;controls.autoRotateSpeed=.65;
 scene.add(new T.HemisphereLight(0xe1f1ff,0x596576,2.6));
 for(const [color,power,x,y,z]of [[0xffffff,3.5,60,140,100],[0xb6dbff,2.5,-65,100,-50],[0xffdcaa,1.4,50,20,-70]]){const l=new T.DirectionalLight(color,power);l.position.set(x,y,z);scene.add(l);}
 const {root,groups,panels,legs}=criarSaturnoV();scene.add(root);
 const grid=new T.GridHelper(160,32,0x39536a,0x233546);grid.position.y=-1.8;scene.add(grid);
 const floor=new T.Mesh(new T.CircleGeometry(14,80),new T.MeshStandardMaterial({color:0x263949,roughness:.8,metalness:.3}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.75;scene.add(floor);
 const labelMap=new Map();for(const p of PARTES){const el=document.createElement('span');el.className='piece-label';el.textContent=p.curto;labels.append(el);labelMap.set(p.id,el);}
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let state={selected:null,exploded:false,isolated:false},autoFit=true,pendingFit=true,rotate=false,last=performance.now(),raf;
 function visible(){return [...groups.values()].filter(g=>g.visible);}
 function boxOf(id){root.updateMatrixWorld(true);const box=new T.Box3();if(id)box.setFromObject(groups.get(id));else for(const g of visible())box.union(new T.Box3().setFromObject(g));return box;}
 function fit(id=null){
  const box=boxOf(id);if(box.isEmpty())return;
  const size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
  const direction=camera.position.clone().sub(controls.target).normalize();if(direction.lengthSq()<.1)direction.set(.3,.1,1).normalize();
  const target=center.clone();target.y+=size.y*.06;
  const right=new T.Vector3().crossVectors(camera.up,direction).normalize();
  if(right.lengthSq()<.01)right.set(1,0,0);
  const up=new T.Vector3().crossVectors(direction,right).normalize();
  const tanV=Math.tan(camera.fov*Math.PI/360),tanH=tanV*camera.aspect;
  let distance=7;
  // Fit every bounding-box corner in camera space. Unlike a sphere fit, this
  // keeps a tall narrow rocket large on portrait displays and safe after orbiting.
  for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
   const v=new T.Vector3(x,y,z).sub(target);
   distance=Math.max(distance,v.dot(direction)+Math.max(Math.abs(v.dot(right))/(tanH*.78),Math.abs(v.dot(up))/(tanV*.70)));
  }
  controls.target.copy(target);camera.position.copy(target).addScaledVector(direction,Math.max(7,distance));controls.update();
 }
 function updateGeometry(alpha){let moving=false;
  for(const [i,p]of PARTES.entries()){
   const g=groups.get(p.id),v=posicaoParte(p,i,state.exploded);const target=new T.Vector3(v.x,v.y,v.z);
   if(g.position.distanceTo(target)>.015){moving=true;g.position.lerp(target,alpha);}else g.position.copy(target);
   g.visible=!state.isolated||state.selected===p.id;
  }
  for(const {panel,a}of panels){const r=state.exploded?8:0;panel.position.lerp(new T.Vector3(Math.sin(a)*r,0,Math.cos(a)*r),alpha);}
  for(const leg of legs)leg.scale.x+=( (state.exploded?1:.5)-leg.scale.x)*alpha;
  grid.visible=floor.visible=!state.isolated;root.updateMatrixWorld(true);return moving;
 }
 function setState(next){
  const prev=state;state={...next};
  for(const [id,g]of groups)g.traverse(o=>{if(o.isMesh)o.material.emissive.setHex(state.selected===id?0x153348:0);});
  if(state.isolated||prev.isolated){updateGeometry(1);autoFit=true;pendingFit=true;}
  if(prev.exploded!==state.exploded){autoFit=true;pendingFit=true;if(media.matches)updateGeometry(1);}
 }
 controls.addEventListener('start',()=>{autoFit=false;});
 const ray=new T.Raycaster(),mouse=new T.Vector2();let down=null,pointers=new Set(),multi=false;
 canvas.addEventListener('pointerdown',e=>{pointers.add(e.pointerId);multi=pointers.size>1;down={x:e.clientX,y:e.clientY,id:e.pointerId};});
 canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);down=null;});
 canvas.addEventListener('pointerup',e=>{
  pointers.delete(e.pointerId);if(multi||!down||e.pointerId!==down.id||Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){if(!pointers.size)multi=false;return;}
  down=null;const rect=canvas.getBoundingClientRect();mouse.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(mouse,camera);
  const hit=ray.intersectObjects(visible(),true)[0];if(hit)onSelect(hit.object.userData.part);
 });
 function resize(){const w=viewport.clientWidth,h=viewport.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();pendingFit=true;}
 const observer=new ResizeObserver(resize);observer.observe(viewport);camera.position.set(36,65,210);controls.target.set(0,52,0);updateGeometry(1);resize();
 function placeLabels(){let lastY=-100;const rect=viewport.getBoundingClientRect();
  for(const p of [...PARTES].reverse()){
   const el=labelMap.get(p.id);el.hidden=!state.exploded||state.isolated;if(el.hidden)continue;
   const box=boxOf(p.id);const center=box.getCenter(new T.Vector3());center.x=box.max.x+2;center.project(camera);
   let x=(center.x*.5+.5)*rect.width,y=(-center.y*.5+.5)*rect.height;
   if(center.z>1||center.z< -1||y<145||y>rect.height-40){el.hidden=true;continue;}
   y=Math.max(y,lastY+17);lastY=y;el.hidden=y>rect.height-40;
   el.style.left=`${Math.min(rect.width-125,Math.max(8,x))}px`;el.style.top=`${y}px`;el.classList.toggle('active',p.id===state.selected);
  }
 }
 function tick(now){raf=requestAnimationFrame(tick);if(document.hidden){last=now;return;}const dt=Math.min((now-last)/1000,.05);last=now;
  const moving=updateGeometry(media.matches?1:1-Math.exp(-dt*7));
  if(pendingFit||(moving&&autoFit)){fit(state.isolated?state.selected:null);pendingFit=false;}
  controls.autoRotate=rotate&&!media.matches;controls.update();placeLabels();renderer.render(scene,camera);
 }
 raf=requestAnimationFrame(tick);
 return {
  setState,
  overview(){autoFit=true;pendingFit=true;},
  focus(){if(state.selected){autoFit=false;updateGeometry(1);fit(state.selected);}},
  zoom(factor){autoFit=false;camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);controls.update();},
  rotate(value){rotate=value;},
  dispose(){cancelAnimationFrame(raf);observer.disconnect();controls.dispose();root.traverse(o=>{o.geometry?.dispose();if(o.material){o.material.map?.dispose();o.material.dispose();}});renderer.dispose();},
  // Read-only diagnostic surface for local integration tests.
  inspect(){return {state:{...state},groups:[...groups].map(([id,g])=>({id,visible:g.visible,position:g.position.toArray()})),camera:camera.position.toArray(),target:controls.target.toArray(),calls:renderer.info.render.calls};},
  project(id){const box=boxOf(id),v=box.getCenter(new T.Vector3()).project(camera);return {x:(v.x*.5+.5)*viewport.clientWidth,y:(-v.y*.5+.5)*viewport.clientHeight};}
 };
}
