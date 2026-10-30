import {getIdiomaHangar} from './hangar-i18n.js?v=303';
import { destinoNave, origemHangarValida } from './hangar-access.js?v=303';
import { naveDisponivel } from '../../js/release-scope.js?v=303';

const integrado = window.parent !== window;
let numeroPedido = 0;
let areaAtiva = true;
const ouvintesAtividade = new Set();
export function aoMudarAtividade(fn) {
  ouvintesAtividade.add(fn); fn(areaAtiva && !document.hidden);
  return () => ouvintesAtividade.delete(fn);
}
function atualizarAtividade() { for (const fn of ouvintesAtividade) fn(areaAtiva && !document.hidden); }
document.addEventListener('visibilitychange', atualizarAtividade);
const publicar = data => window.parent.postMessage(data, window.location.origin);

export function abrirNave(id, href) {
  if (!naveDisponivel(id) || !destinoNave(id)) return false;
  if (integrado) publicar({ tipo: 'hangar:abrir', id });
  else {
    const destino = new URL(destinoNave(id).replace(/^hangar\//, ''), window.location.href);
    destino.searchParams.set('idioma', getIdiomaHangar());
    window.location.href = destino.href;
  }
  return true;
}

// Executado antes de importar o renderizador, inclusive em navegação direta.
export async function autorizarNave(id) {
  if (!naveDisponivel(id) || !destinoNave(id)) {
    window.location.replace('index.html');
    return false;
  }
  if (!integrado) {
    // A edição web permanece aberta; destinos nativos precisam do wrapper.
    return !window.Capacitor?.isNativePlatform?.() || window.__premium?.permitido?.('hangar', id) === true;
  }
  return new Promise(resolve => {
    const pedidoId = window.crypto?.randomUUID?.() || `hangar-${Date.now()}-${++numeroPedido}`;
    let timer;
    const concluir = permitido => {
      clearTimeout(timer);
      window.removeEventListener('message', responder);
      resolve(permitido);
    };
    const responder = event => {
      if (!origemHangarValida(event, window.parent)) return;
      if (event.data?.tipo === 'hangar:autorizacao' && event.data.pedidoId === pedidoId)
        concluir(event.data.permitido === true);
    };
    window.addEventListener('message', responder);
    timer = setTimeout(() => concluir(false), 8000);
    publicar({ tipo: 'hangar:autorizar', id, pedidoId });
  });
}

if (integrado) {
  window.addEventListener('message',event=>{
    if(!origemHangarValida(event,window.parent))return;
    if(event.data?.tipo==='hangar:atividade' && typeof event.data.ativo==='boolean'){areaAtiva=event.data.ativo;atualizarAtividade();return;}
    if(event.data?.tipo==='hangar:cinema'&&typeof event.data.ativo==='boolean'){document.body.classList.toggle('navegacao-cinema',event.data.ativo);return;}
    if(event.data?.tipo!=='hangar:margens')return;
    for(const side of ['top','right','bottom','left']){
      const value=event.data.insets?.[side];
      if(Number.isFinite(value)&&value>=0&&value<=120)document.documentElement.style.setProperty('--safe-'+side,value+'px');
    }
  });
  document.querySelectorAll('a[href="../index.html?v=303"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      publicar({ tipo: 'hangar:fechar' });
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !document.body.classList.contains('panel-open') && !document.body.classList.contains('info-open') && !document.querySelector('dialog[open]'))
      publicar({ tipo: 'hangar:fechar' });
  }, { capture: true });
}

// Preserve the selected language on local catalog and app return links.
for (const link of document.querySelectorAll('a[href]')) {
  const url = new URL(link.getAttribute('href'), window.location.href);
  if (url.origin === window.location.origin && url.pathname.endsWith('/index.html')) {
    url.searchParams.set('idioma', getIdiomaHangar());
    link.href = url.href;
  }
}
