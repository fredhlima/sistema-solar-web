// Integra a experiência do Hangar e mantém o acesso Pro no app principal.
import { destinoNave, origemHangarValida } from '../hangar/js/hangar-access.js?v=301';
import { naveDisponivel } from './release-scope.js?v=301';
export function destinoHangarLocalizado(id, idioma = 'pt', peca = null) {
  const destino = destinoNave(id);
  if (!destino) return null;
  const partes = {
    hubble: ['tube','equipment','solar-left','solar-right','aperture','camera'],
    saturno: ['sic','inter1','sii','inter2','sivb','iu','sla','lm','sm','cm','les'],
    'modulo-lunar': ['descent','ascent','legs','engine','antennas'],
    shuttle: ['orbiter','tank','srb-left','srb-right','engines','door-left','door-right','arm','hubble']
  };
  const lang = ['pt','en','es'].includes(idioma) ? idioma : 'pt';
  return destino + `&idioma=${lang}` + (partes[id]?.includes(peca) ? `&peca=${peca}&roteiro=1` : '');
}
export function iniciarHangar({ premium, aoSair, idioma="pt" } = {}) {
  if (typeof document === 'undefined') return { abrir() {}, fechar() {} };
  const overlay = document.createElement('div');
  overlay.className = 'hangar-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Hangar');
  overlay.style.display = 'none';
  const frame = document.createElement('iframe');
  frame.className = 'hangar-frame';
  frame.title = {pt:'Hangar — exploração das naves',en:'Hangar — spacecraft exploration',es:'Hangar — exploración de naves'}[idioma] || 'Hangar';
  overlay.append(frame);
  document.body.append(overlay);
  let focoAnterior = null;
  let navePendente = null;
  let aberto = false, ativo = false;
  const catalogo = `hangar/index.html?v=301&idioma=${['pt','en','es'].includes(idioma)?idioma:'pt'}`;
  const permitido = id => premium?.permitido?.('hangar', id) === true;
  function navegar(id,peca=null) {
    if (!naveDisponivel(id)) return false;
    const destino = destinoHangarLocalizado(id, idioma, peca);
    if (destino) frame.src = destino;
    return Boolean(destino);
  }
  function enviarAtividade() {
    frame.contentWindow?.postMessage({tipo:'hangar:atividade',ativo:ativo && !document.hidden}, window.location.origin);
  }
  function setAtivo(valor) {
    ativo = Boolean(valor) && aberto;
    overlay.style.visibility = ativo ? 'visible' : 'hidden';
    overlay.style.pointerEvents = ativo ? 'auto' : 'none';
    overlay.inert = !ativo;
    enviarAtividade();
  }
  function fechar() {
    if (aoSair) { setAtivo(false); aoSair(); return; }
    descartar(); focoAnterior?.focus?.();
  }
  function descartar() {
    navePendente = null; aberto = false; ativo = false;
    overlay.style.display = 'none'; frame.src = 'about:blank';
  }
  function abrir() {
    focoAnterior = document.activeElement;
    if (!aberto) { aberto = true; frame.src = catalogo; overlay.style.display = 'block'; }
    setAtivo(true); frame.focus();
  }
  function abrirNave(id,{peca=null}={}) {
    if (!naveDisponivel(id) || !destinoNave(id)) return false;
    abrir();
    if (!exigir(id)) return false;
    if (peca || !frame.src.endsWith(destinoHangarLocalizado(id, idioma))) navegar(id,peca);
    return true;
  }
  function nomeNave() {
    return frame.contentDocument?.querySelector('#vehicle-name,#model-name')?.textContent?.trim() || 'Hangar';
  }
  function exigir(id) {
    // Free e Pro passam pela mesma regra do serviço de assinatura.
    if (!naveDisponivel(id) || !destinoNave(id)) return false;
    navePendente = id;
    if (premium?.exigirItem?.('hangar', id) === true) {
      navePendente = null;
      return true;
    }
    return false;
  }
  premium?.aoMudar?.(() => {
    if (!ativo || !navePendente || !permitido(navePendente)) return;
    const id = navePendente;
    navePendente = null;
    navegar(id);
  });
  function enviarMargens() {
    if(overlay.style.display==='none')return;
    // O iframe pode não herdar os insets nativos da WebView principal.
    const probe=document.createElement('div');
    probe.style.cssText='position:fixed;visibility:hidden;pointer-events:none;padding:var(--safe-top,env(safe-area-inset-top,0px)) var(--safe-right,env(safe-area-inset-right,0px)) var(--safe-bottom,env(safe-area-inset-bottom,0px)) var(--safe-left,env(safe-area-inset-left,0px))';
    overlay.append(probe);const css=getComputedStyle(probe);
    const insets=Object.fromEntries(['top','right','bottom','left'].map(side=>[side,parseFloat(css.getPropertyValue('padding-'+side))||0]));
    probe.remove();frame.contentWindow.postMessage({tipo:'hangar:margens',insets},window.location.origin);
  }
  frame.addEventListener('load',()=>{enviarMargens();enviarAtividade();});
  document.addEventListener('visibilitychange',enviarAtividade);
  window.addEventListener('resize',()=>requestAnimationFrame(enviarMargens));
  window.addEventListener('message', event => {
    if (!origemHangarValida(event, frame.contentWindow) || !aberto) return;
    if (!ativo && event.data?.tipo !== 'hangar:autorizar') return;
    const data = event.data;
    if (data?.tipo === 'hangar:fechar') { fechar(); return; }
    if (!naveDisponivel(data?.id) || !destinoNave(data?.id)) return;
    if (data.tipo === 'hangar:abrir') {
      if (exigir(data.id)) navegar(data.id);
    } else if (data.tipo === 'hangar:autorizar' && typeof data.pedidoId === 'string' && data.pedidoId.length <= 100) {
      const acesso = ativo ? exigir(data.id) : permitido(data.id);
      frame.contentWindow.postMessage({ tipo: 'hangar:autorizacao', pedidoId: data.pedidoId, permitido: acesso }, window.location.origin);
      if (!acesso) { if (!ativo) navePendente = null; frame.src = catalogo; }
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && ativo) {
      event.stopImmediatePropagation(); fechar();
    }
  }, { capture: true });
  return { abrir, abrirNave, fechar, setAtivo, descartar, nomeNave, frame, inspect:()=>({aberto,ativo}) };
}
