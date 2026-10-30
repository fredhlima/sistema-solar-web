import { t, getIdioma } from './i18n.js?v=302';

// A política vem do mesmo pacote offline do aplicativo; nunca de um site externo.
export function abrirPrivacidade({ focoAoFechar = document.activeElement } = {}) {
  const existente = document.getElementById('politica-dialogo');
  if (existente) { existente.querySelector('button')?.focus(); return; }
  const overlay = document.createElement('div');
  overlay.className = 'politica-overlay';
  overlay.id = 'politica-dialogo';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'politica-titulo');
  const painel = document.createElement('section');
  painel.className = 'politica-painel';
  const cabecalho = document.createElement('header');
  const titulo = document.createElement('h2');
  titulo.id = 'politica-titulo'; titulo.textContent = t('politicaPrivacidade');
  const fechar = document.createElement('button');
  fechar.type = 'button'; fechar.textContent = t('politicaFechar');
  const conteudo = document.createElement('div');
  conteudo.className = 'politica-conteudo'; conteudo.tabIndex = 0;
  conteudo.setAttribute('aria-label', t('politicaPrivacidade'));
  cabecalho.append(titulo, fechar); painel.append(cabecalho, conteudo); overlay.append(painel);
  const anteriores = [...document.body.children].map(el => ({ el, inert: el.inert, hidden: el.getAttribute('aria-hidden') }));
  document.body.append(overlay);
  for (const { el } of anteriores) { el.inert = true; el.setAttribute('aria-hidden', 'true'); }
  let controlador;
  function concluir() {
    controlador?.abort(); overlay.remove();
    document.removeEventListener('keydown', teclado, true);
    document.removeEventListener('focusin', manterFoco, true);
    for (const { el, inert, hidden } of anteriores) {
      el.inert = inert;
      if (hidden === null) el.removeAttribute('aria-hidden'); else el.setAttribute('aria-hidden', hidden);
    }
    if (focoAoFechar?.isConnected) focoAoFechar.focus();
  }
  function manterFoco(event) { if (!overlay.contains(event.target)) fechar.focus(); }
  function teclado(event) {
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); concluir(); }
    if (event.key !== 'Tab') return;
    const itens = [...overlay.querySelectorAll('button, a[href], [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
    const primeiro = itens[0], ultimo = itens.at(-1);
    if (event.shiftKey && document.activeElement === primeiro) { event.preventDefault(); ultimo.focus(); }
    else if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primeiro.focus(); }
  }
  async function carregar() {
    controlador?.abort(); controlador = new AbortController();
    conteudo.setAttribute('aria-busy', 'true'); conteudo.textContent = t('politicaCarregando');
    try {
      const resposta = await fetch('privacidade.html', { signal: controlador.signal });
      if (!resposta.ok) throw new Error('policy unavailable');
      const html = new DOMParser().parseFromString(await resposta.text(), 'text/html');
      const secao = html.getElementById(`politica-${getIdioma()}`);
      if (!secao) throw new Error('policy language unavailable');
      if (!overlay.isConnected) return;
      conteudo.replaceChildren(secao.cloneNode(true));
      for (const link of conteudo.querySelectorAll('a[href]')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    } catch (error) {
      if (error.name === 'AbortError' || !overlay.isConnected) return;
      const aviso = document.createElement('p'); aviso.textContent = t('politicaErro');
      const tentar = document.createElement('button'); tentar.type = 'button'; tentar.textContent = t('politicaTentar'); tentar.onclick = carregar;
      conteudo.replaceChildren(aviso, tentar);
    } finally { conteudo.removeAttribute('aria-busy'); }
  }
  fechar.onclick = concluir;
  overlay.onclick = event => { if (event.target === overlay) concluir(); };
  document.addEventListener('keydown', teclado, true);
  document.addEventListener('focusin', manterFoco, true);
  fechar.focus(); carregar();
}
