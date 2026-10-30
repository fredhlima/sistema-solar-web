import {ht, aplicarIdiomaHangar} from './hangar-i18n.js?v=303';
aplicarIdiomaHangar();
document.title=ht('Hangar · Sistema Solar');
import {aoMudarAtividade} from './app-bridge.js?v=303';
import { naveDisponivel, NAVES_1_0 } from '../../js/release-scope.js?v=303';
import * as T from 'three';
import { MODELOS_FUTUROS } from './hangar-future-models.js?v=3';
import { criarCarregador, carregarPreview, iluminarPreview, enquadrarPreview, liberarPreview } from './hangar-preview.js?v=3';
import { abrirNave } from './app-bridge.js?v=303';
const texto = (selector, key) => { const node = document.querySelector(selector); if (node) node.textContent = ht(key); };
const aria = (selector, key) => { const node = document.querySelector(selector); if (node) node.setAttribute('aria-label', ht(key)); };
for (const [selector,key] of Object.entries({'.catalog-title span':'Quatro naves para explorar','#catalog-all':'Todas as naves','#picker-title':'Todas as naves','#picker-hint':'Escolha uma para centralizar no Hangar.','.picker-close':'Fechar','#info-title':'Sobre o Hangar','#catalog-info .info-head button':'Concluir','.info-content p:nth-child(1)':'O Hangar reúne quatro naves: Hubble, Saturno V, Discovery e Módulo Lunar.','.info-content p:nth-child(2)':'A exploração do Hubble é gratuita. Saturno V, Discovery e Módulo Lunar fazem parte do Sistema Solar Pro. No Shuttle, Discovery é a nave usada no roteiro STS-31.','.footnote a':'Créditos dos modelos ↗','.saturn .eyebrow':'O CAMINHO ATÉ A LUA','.saturn h2':'Saturno V','.saturn .card-copy > p:not(.eyebrow)':'Três estágios, módulo lunar e a cápsula que trouxe os astronautas de volta.','.shuttle .eyebrow':'UM OBSERVATÓRIO A BORDO','.shuttle .card-copy > p:not(.eyebrow)':'Discovery, tanque externo e propulsores. Veja o Canadarm retirar o Hubble do compartimento.','.saturn .card-bottom b':'Explorar 3D ↗','.shuttle .card-bottom b':'Explorar 3D ↗'})) texto(selector,key);
document.querySelector('header .back').textContent = '‹ ' + ht('Voltar');
document.querySelector('.footnote').firstChild.textContent = ht('Modelos 3D cortesia da NASA. Este aplicativo não é afiliado à NASA nem endossado por ela.') + ' ';
for (const [selector,key] of Object.entries({'header .back':'Voltar ao Sistema Solar','.info-button':'Informações e créditos do Hangar','.fleet':'Veículos do Hangar','.gallery-navigation':'Navegação entre naves','#gallery-prev':'Nave anterior','#gallery-next':'Próxima nave','.picker-close':'Fechar seletor de naves','#catalog-ships-list':'Naves disponíveis','#catalog-info .info-head button':'Fechar informações'})) aria(selector,key);
const fleet = document.querySelector('.fleet');
const modelosCatalogo = Object.values(MODELOS_FUTUROS)
 .filter(item => naveDisponivel(item.id) && NAVES_1_0.includes(item.id));
const previews = modelosCatalogo.map((item, index) => {
 const card = document.createElement('a');
 card.className = `vehicle-card future ${item.id}`;
 const explorable = ['modulo-lunar','hubble','perseverance','ingenuity','cassini','jwst'].includes(item.id);
 card.href = `${explorable ? 'veiculo' : 'modelo-futuro'}.html?modelo=${item.id}`;
 card.innerHTML = `<div class="card-top"><span>${String(index + 3).padStart(2, '0')} / ${ht(item.missao)}</span></div><div class="illustration model-preview" aria-hidden="true"><span>${ht('PRÉVIA 3D · NASA')}</span></div><div class="card-copy"><h2>${ht(item.nome)}</h2><div class="card-bottom"><span>${explorable ? ht('Exploração por peças') : ht('Prévia 3D')}</span><b>${explorable ? ht('Explorar nave ↗') : ht('Ver modelo ↗')}</b></div></div>`;
 fleet.append(card);
 return { card, item };
});
const hubbleCard = fleet.querySelector('.vehicle-card.hubble');
if (hubbleCard) fleet.prepend(hubbleCard);
const cards = Array.from(fleet.querySelectorAll('.vehicle-card'));
for(const [index,card] of cards.entries()){const label=card.querySelector('.card-top > span');label.textContent=label.textContent.replace(/^\d{2}\s*\/\s*/,`${String(index+1).padStart(2,'0')} / `);}
const storageKey = 'hangar-catalogo-nave';
let savedId;
try { savedId = sessionStorage.getItem(storageKey); } catch {}
let selectedIndex = Math.max(0, cards.findIndex(card => new URL(card.href).searchParams.get('modelo') === savedId));
let suppressClick = false, scrollFrame;
for (const card of cards) {
 const id = new URL(card.href).searchParams.get('modelo');
 card.dataset.modelo = id;
 card.draggable = false;
 const badge = document.createElement('span');
 badge.className = `access-badge${id === 'hubble' ? '' : ' pro'}`;
 badge.textContent = id === 'hubble' ? ht('Grátis') : 'Pro';
 const top = card.querySelector('.card-top');
 if (top.children.length > 1) top.lastElementChild.remove();
 top.append(badge);
 if (id === 'saturno' || id === 'shuttle') card.querySelector('.card-bottom > span').textContent = ht('Exploração por peças');
 if (id === 'shuttle') card.querySelector('h2').textContent = 'Discovery';
 card.setAttribute('aria-label', `${card.querySelector('h2').textContent}, ${badge.textContent}, ${card.querySelector('.card-bottom > span').textContent}`);
 card.addEventListener('click', event => {
  event.preventDefault();
  if (suppressClick) { suppressClick = false; return; }
  selectedIndex = cards.indexOf(card);
  try { sessionStorage.setItem(storageKey, id); } catch {}
  abrirNave(id, card.getAttribute('href'));
 });
}
const previous = document.querySelector('#gallery-prev'), next = document.querySelector('#gallery-next');
function rememberSelection() {
 try { sessionStorage.setItem(storageKey, cards[selectedIndex].dataset.modelo); } catch {}
}
function updateSelection(index) {
 selectedIndex = Math.max(0, Math.min(cards.length - 1, index));
 cards.forEach((card, i) => {
  card.classList.toggle('current', i === selectedIndex);
  if (i === selectedIndex) card.setAttribute('aria-current', 'true');
  else card.removeAttribute('aria-current');
 });
 previous.disabled = selectedIndex === 0; next.disabled = selectedIndex === cards.length - 1;
 document.querySelector('#gallery-position').textContent = ht('Nave {n} de {total}',{n:selectedIndex+1,total:cards.length});
 rememberSelection();
 for (const preview of previews) {
  if (Math.abs(cards.indexOf(preview.card) - selectedIndex) <= 1 && !preview.queued) {
   preview.queued = true; queue.push(preview);
  }
 }
 queue.sort((a, b) => Math.abs(cards.indexOf(a.card) - selectedIndex) - Math.abs(cards.indexOf(b.card) - selectedIndex));
 renderQueue();
}
function centeredIndex() {
 const center = fleet.getBoundingClientRect().left + fleet.clientWidth / 2;
 let nearest = 0, distance = Infinity;
 cards.forEach((card, index) => {
  const r = card.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - center);
  if (d < distance) { nearest = index; distance = d; }
 });
 return nearest;
}
function centerCard(index, smooth = true, focus = false) {
 index = Math.max(0, Math.min(cards.length - 1, index));
 const card = cards[index], r = card.getBoundingClientRect(), f = fleet.getBoundingClientRect();
 fleet.scrollTo({left: fleet.scrollLeft + r.left + r.width / 2 - f.left - fleet.clientWidth / 2,
  behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant'});
 if (!smooth) updateSelection(index);
 if (focus) card.focus({preventScroll: true});
}
const picker = document.querySelector('#catalog-ships');
const pickerList = document.querySelector('#catalog-ships-list');
function miniatura(card, index) {
 const svg = card.querySelector('.illustration svg');
 const rendered = card.querySelector('.model-preview img');
 if (svg) {
  const clone = svg.cloneNode(true), ids = new Map();
  clone.querySelectorAll('[id]').forEach(node => { const old = node.id, next = `${old}-picker-${index}`; ids.set(old, next); node.id = next; });
  clone.querySelectorAll('*').forEach(node => {
   for (const attr of ['fill', 'stroke', 'filter', 'clip-path', 'mask']) {
    const value = node.getAttribute(attr);
    if (value) node.setAttribute(attr, value.replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${ids.get(id) || id})`));
   }
  });
  return clone;
 }
 if (rendered) { const img = rendered.cloneNode(); img.removeAttribute('width'); img.removeAttribute('height'); img.alt = ''; img.setAttribute('aria-hidden', 'true'); return img; }
 const fallback = document.createElement('span');
 fallback.className = 'picker-fallback'; fallback.setAttribute('aria-hidden', 'true');
 fallback.textContent = card.querySelector('h2').textContent.slice(0, 1);
 return fallback;
}
cards.forEach((card, index) => {
 const row = document.createElement('div'); row.setAttribute('role', 'listitem');
 const button = document.createElement('button');
 button.type = 'button'; button.className = 'picker-item';
 const name = card.querySelector('h2').textContent;
 button.dataset.modelo = card.dataset.modelo;
 const badge = card.querySelector('.access-badge').textContent;
 const kind = card.querySelector('.card-bottom > span').textContent;
 button.setAttribute('aria-label', `${name}, ${badge}, ${kind}`);
 const thumb = document.createElement('span'); thumb.className = 'picker-thumb'; thumb.append(miniatura(card, index));
 const copy = document.createElement('span'); copy.className = 'picker-copy';
 const title = document.createElement('span'); title.className = 'picker-name'; title.textContent = name;
 const detail = document.createElement('span'); detail.className = 'picker-detail';
 const access = document.createElement('span'); access.className = `picker-access${badge === 'Pro' ? ' pro' : ''}`;
 access.textContent = badge;
 const type = document.createElement('span'); type.className = 'picker-kind'; type.textContent = kind;
 detail.append(access, type); copy.append(title, detail); button.append(thumb, copy);
 button.addEventListener('click', () => {
  picker.close(); centerCard(index, false, true);
 });
 row.append(button); pickerList.append(row);
});
const pickerOpener = document.querySelector('#catalog-all');
pickerOpener.addEventListener('click', () => {
 pickerList.querySelectorAll('button').forEach((button, index) => {
  button.querySelector('.picker-thumb').replaceChildren(miniatura(cards[index], index));
  if (index === selectedIndex) button.setAttribute('aria-current', 'true');
  else button.removeAttribute('aria-current');
 });
 picker.showModal();
 pickerList.querySelector('[aria-current="true"]')?.scrollIntoView({block: 'nearest'});
});
picker.querySelector('.picker-close').addEventListener('click', () => picker.close());
picker.addEventListener('click', event => {
 if (event.target !== picker) return;
 const r = picker.getBoundingClientRect();
 if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) picker.close();
});
function resizeGallery() {
 const index = selectedIndex;
 const portrait = window.innerWidth < window.innerHeight;
 fleet.style.setProperty('--card-width', `${Math.min(680, fleet.clientWidth * (portrait ? .82 : .76))}px`);
 centerCard(index, false);
}
previous.addEventListener('click', () => centerCard(selectedIndex - 1));
next.addEventListener('click', () => centerCard(selectedIndex + 1));
fleet.addEventListener('scroll', () => {
 cancelAnimationFrame(scrollFrame);
 scrollFrame = requestAnimationFrame(() => updateSelection(centeredIndex()));
}, {passive: true});
fleet.addEventListener('keydown', event => {
 if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
 event.preventDefault(); centerCard(selectedIndex + (event.key === 'ArrowLeft' ? -1 : 1), true, true);
});
fleet.addEventListener('dragstart', event => event.preventDefault());
let gesture, guardTimer;
function guardClick() {
 suppressClick = true; clearTimeout(guardTimer);
 guardTimer = setTimeout(() => { suppressClick = false; }, 450);
}
fleet.addEventListener('pointerdown', event => {
 if (event.isPrimary) gesture = {x:event.clientX, y:event.clientY, id:event.pointerId, start:fleet.scrollLeft, mouse:event.pointerType === 'mouse', dragging:false};
});
fleet.addEventListener('pointermove', event => {
 if (!gesture || gesture.id !== event.pointerId) return;
 const dx = event.clientX - gesture.x;
 if (Math.abs(dx) > 8) { gesture.dragging = true; guardClick(); }
 if (gesture.mouse && gesture.dragging) {
  fleet.setPointerCapture(event.pointerId);
  fleet.style.scrollSnapType = 'none';
  fleet.scrollLeft = gesture.start - dx;
 }
});
fleet.addEventListener('pointerup', event => {
 if (!gesture || gesture.id !== event.pointerId) return;
 const {mouse, dragging} = gesture;
 gesture = null;
 fleet.style.scrollSnapType = '';
 if (dragging) {
  guardClick();
  if (mouse) centerCard(centeredIndex());
 }
});
fleet.addEventListener('pointercancel', () => {
 if (gesture?.dragging || gesture && !gesture.mouse) guardClick();
 gesture = null; fleet.style.scrollSnapType = '';
});
const info = document.querySelector('#catalog-info');
document.querySelector('.info-button').addEventListener('click', () => info.showModal());
info.querySelector('button').addEventListener('click', () => info.close());
info.addEventListener('click', event => { if (event.target === info) { const r = info.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) info.close(); } });
let renderer, carregador, running = false, disposed = false, active = true;
const queue = [];
async function renderQueue() {
 if (running || disposed || !active) return;
 running = true;
 while (queue.length && !disposed && active) {
  const { card, item } = queue.shift();
  let model;
  try {
   if (!renderer) {
    renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(600, 360); renderer.outputColorSpace = T.SRGBColorSpace;
    carregador = criarCarregador();
   }
   model = await carregarPreview(carregador.loader, item);
   if (disposed) break;
   if (!active) { queue.unshift({card,item}); break; }
   const scene = new T.Scene(), camera = new T.PerspectiveCamera(38, 600 / 360, .01, 100);
   iluminarPreview(scene); scene.add(model);
   enquadrarPreview(camera, model, 600 / 360);
   renderer.render(scene, camera);
   const img = document.createElement('img');
   img.draggable = false;
   img.src = renderer.domElement.toDataURL('image/png'); img.alt = ''; img.width = 600; img.height = 360;
   card.querySelector('.model-preview').replaceChildren(img);
   // Reutiliza a prévia já produzida; o seletor não inicia renderizações extras.
   pickerList.querySelectorAll('.picker-thumb')[cards.indexOf(card)]?.replaceChildren(miniatura(card, cards.indexOf(card)));
  } catch (error) {
   if(!disposed)card.querySelector('.model-preview').textContent = ht('PRÉVIA 3D DISPONÍVEL');
  } finally { if (model) liberarPreview(model); }
 }
 running = false;
}
const removerAtividade=aoMudarAtividade(value=>{active=value;if(active)renderQueue();});
window.addEventListener('resize', resizeGallery);
const resizeObserver = new ResizeObserver(resizeGallery);
resizeObserver.observe(fleet);
resizeGallery();
window.addEventListener('pagehide', event => {
 if (event.persisted) return;
 removerAtividade(); disposed = true; queue.length = 0; resizeObserver.disconnect(); cancelAnimationFrame(scrollFrame); clearTimeout(guardTimer); renderer?.dispose(); renderer?.forceContextLoss(); carregador?.dispose();
});
