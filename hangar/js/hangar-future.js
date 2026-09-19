import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {MODELOS_FUTUROS} from './hangar-future-models.js?v=1';
const $=s=>document.querySelector(s),id=new URLSearchParams(location.search).get('modelo'),item=MODELOS_FUTUROS[id]||MODELOS_FUTUROS.hubble;
document.title=`${item.nome} · Futuro do Hangar`;$('#model-name').textContent=item.nome;$('#mission').textContent=item.missao;$('#status').textContent=item.estado;$('#description').textContent=item.descricao;$('#source').href=item.fonte;
const canvas=$('#future-canvas'),viewport=$('#future-view');
try{
 const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=T.SRGBColorSpace;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.01,100);camera.position.set(3,2.1,4.5);scene.add(new T.HemisphereLight(0xc8e6ff,0x101522,2.1));const key=new T.DirectionalLight(0xffffff,3.4);key.position.set(3,4,5);scene.add(key);const rim=new T.DirectionalLight(0x5cc8ff,2);rim.position.set(-4,1,-3);scene.add(rim);
 const model=item.criar();model.scale.setScalar(item.id==='hubble'?1.25:1.45);scene.add(model);
 const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.minDistance=2;controls.maxDistance=9;controls.autoRotate=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.autoRotateSpeed=.7;
 const resize=()=>{const w=viewport.clientWidth,h=viewport.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};new ResizeObserver(resize).observe(viewport);resize();
 const loop=()=>{controls.update();renderer.render(scene,camera);requestAnimationFrame(loop)};loop();
 $('#reset').onclick=()=>{camera.position.set(3,2.1,4.5);controls.target.set(0,0,0);controls.update();};
}catch(e){$('#future-error').hidden=false;canvas.hidden=true;}
