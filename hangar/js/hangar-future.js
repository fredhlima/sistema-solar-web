import {aoMudarAtividade} from './app-bridge.js?v=303';
import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MODELOS_FUTUROS } from './hangar-future-models.js?v=3';
import { criarCarregador, carregarPreview, iluminarPreview, enquadrarPreview, liberarPreview } from './hangar-preview.js?v=3';
const $ = s => document.querySelector(s);
const id = new URLSearchParams(location.search).get('modelo');
const item = MODELOS_FUTUROS[id] || MODELOS_FUTUROS.hubble;
document.title = `${item.nome} · Hangar`;
$('#model-name').textContent = item.nome;
$('#mission').textContent = item.missao;
$('#status').textContent = item.estado;
$('#description').textContent = item.descricao;
$('#source').href = item.fonte;
$('#credit-author').textContent = `Autoria do modelo: ${item.autoria}.`;
const canvas = $('#future-canvas'), viewport = $('#future-view'), loading = $('#load-state');
let renderer, controls, model, frame, observer, removerAtividade, disposed=false;
const carregador = criarCarregador();
function dispose(){
 if(disposed)return;disposed=true;
 removerAtividade?.();cancelAnimationFrame(frame);observer?.disconnect();controls?.dispose();
 if(model){liberarPreview(model);model=null;}renderer?.dispose();renderer?.forceContextLoss();carregador.dispose();
}
window.addEventListener('pagehide',event=>{if(!event.persisted)dispose();});

try {
 renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
 renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
 renderer.outputColorSpace = T.SRGBColorSpace;
 const scene = new T.Scene(), camera = new T.PerspectiveCamera(38, 1, .01, 100);
 iluminarPreview(scene);
 model = await carregarPreview(carregador.loader, item, progress => {
  if(disposed)return;loading.textContent = progress.total ? `CARREGANDO · ${Math.round(progress.loaded / progress.total * 100)}%` : 'CARREGANDO MODELO NASA';
 });
 if(disposed){liberarPreview(model);model=null;throw new Error('Vista fechada durante carregamento');}
 scene.add(model);
 controls = new OrbitControls(camera, canvas);
 controls.enableDamping = true;
 controls.autoRotate = false;
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 controls.autoRotateSpeed = .7;
 let distancia = 5, manual=false;
 controls.addEventListener("start",()=>{manual=true;});
 const reset = () => {
  manual=false;
  distancia = enquadrarPreview(camera, model, camera.aspect);
  controls.target.set(0, 0, 0);
  controls.minDistance = .8; controls.maxDistance = distancia * 3;
  controls.update();
 };
 const resize = () => {
  const w = viewport.clientWidth, h = viewport.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();if(!manual)reset();
 };
 observer = new ResizeObserver(resize); observer.observe(viewport); resize();
 loading.textContent = 'MODELO OFICIAL · NASA 3D RESOURCES';
 const loop = () => { if(disposed)return;controls.update(); renderer.render(scene, camera); frame = requestAnimationFrame(loop); };
 removerAtividade=aoMudarAtividade(active=>{if(disposed)return;cancelAnimationFrame(frame);if(active)frame=requestAnimationFrame(loop);}); $('#reset').onclick = reset;
 $('#future-zoom-in').onclick=()=>{manual=true;camera.position.sub(controls.target).multiplyScalar(.8).add(controls.target);controls.update();};
 $('#future-zoom-out').onclick=()=>{manual=true;camera.position.sub(controls.target).multiplyScalar(1.25).add(controls.target);controls.update();};
 $('#future-rotate').disabled=reducedMotion.matches;
 $('#future-rotate').onclick=()=>{controls.autoRotate=!controls.autoRotate;$('#future-rotate').setAttribute('aria-pressed',String(controls.autoRotate));};
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)controls.autoRotate=false;$('#future-rotate').disabled=reducedMotion.matches;$('#future-rotate').setAttribute('aria-pressed',String(controls.autoRotate));});
} catch (error) {
 if(!disposed){
 loading.textContent = 'PRÉVIA INDISPONÍVEL';
 $('#future-error').hidden = false;
 $('#future-error').textContent = 'Não foi possível carregar o modelo 3D. Volte ao Hangar e tente novamente.';
 canvas.hidden = true;
 dispose();}
} finally { carregador.dispose(); }


function showInfo(open){$('#future-info').hidden=!open;document.body.classList.toggle('info-open',open);$('#show-info').setAttribute('aria-expanded',String(open));const back=$('header a');back.textContent=open?'‹ Nave':'‹ Naves';back.setAttribute('aria-label',open?'Voltar à nave':'Voltar ao catálogo');if(open)back.focus();else $('#show-info').focus();}
$('#show-info').onclick=()=>showInfo($('#future-info').hidden);$('header a').addEventListener('click',event=>{if(!$('#future-info').hidden){event.preventDefault();showInfo(false);}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#future-info').hidden){e.stopImmediatePropagation();showInfo(false);}});
