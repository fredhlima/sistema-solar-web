// mobile-dock.js — UI paralela de celular/tablet em PAISAGEM (dock inferior estilo
// "liquid glass"). Só aparece em toque+paisagem; o desktop/web fica intacto.
// Reusa o motor real e o "saco de ações" do ui.js (nada de simulação falsa).
//
// FASE 1: dock + título + nível/engrenagem + HUD + transporte + calendário +
// settings + tela "gire o celular" + esconder chrome desktop no modo dock/girar.
// Painéis Explorar/Experiências são SHELLS vazios nesta fase (conteúdo = Fase 2).
import { t, trocarIdioma, getIdioma } from './i18n.js?v=22';

const MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MESF = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const pad2 = (n) => String(n).padStart(2, '0');
const fmtData = (d) => `${d.getDate()} ${MES[d.getMonth()]} ${d.getFullYear()} ▾`;

const SVG_LOGO = `<svg viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="mdock-ps-sun" cx="42%" cy="38%" r="65%"><stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#ffe9b8"/><stop offset="100%" stop-color="#ff9d4d"/></radialGradient>
    <radialGradient id="mdock-ps-blue" cx="38%" cy="34%" r="70%"><stop offset="0%" stop-color="#9fd0ff"/><stop offset="100%" stop-color="#2f5fae"/></radialGradient>
    <radialGradient id="mdock-ps-red" cx="38%" cy="34%" r="70%"><stop offset="0%" stop-color="#ff9a7a"/><stop offset="100%" stop-color="#b0472e"/></radialGradient>
  </defs>
  <g stroke="#5cc8ff" fill="none" stroke-linecap="round">
    <ellipse cx="512" cy="512" rx="300" ry="270" stroke-opacity="0.35" stroke-width="10" transform="rotate(-18 512 512)"/>
    <ellipse cx="512" cy="512" rx="410" ry="360" stroke-opacity="0.2" stroke-width="10" transform="rotate(12 512 512)"/>
  </g>
  <circle cx="512" cy="512" r="150" fill="url(#mdock-ps-sun)"/>
  <circle cx="815" cy="405" r="66" fill="url(#mdock-ps-blue)"/>
  <circle cx="245" cy="650" r="54" fill="url(#mdock-ps-red)"/>
</svg>`;

const SVG_GEAR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`;

const SVG_EXPLORAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#5cc8ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.2 5.2-5.2 2.2 2.2-5.2z"/></svg>`;
const SVG_XP = `<svg viewBox="0 0 24 24" fill="#5cc8ff"><path d="M12 2l1.7 6.1L20 10l-6.3 1.9L12 18l-1.7-6.1L4 10l6.3-1.9z"/></svg>`;
const SVG_BUSCA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.2-4.2"/></svg>`;
const SVG_TOUR = `<svg viewBox="0 0 24 24" fill="none" stroke="#5cc8ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21V4"/><path d="M6 4h11l-2 3.2 2 3.2H6"/></svg>`;
const SVG_EVENTOS = `<svg viewBox="0 0 24 24" fill="none" stroke="#5cc8ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16M8 3v4M16 3v4"/></svg>`;
const SVG_COMPARAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#5cc8ff" stroke-width="1.6"><circle cx="8" cy="14" r="3.5"/><circle cx="16.5" cy="11" r="6"/></svg>`;
const SVG_QUIZ = `<svg viewBox="0 0 24 24" fill="none" stroke="#5cc8ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8.7 9a3.3 3.3 0 016.4-1.1c.8 2-1 3.1-2 4-.7.6-1.1 1.2-1.1 2.2"/><circle cx="12" cy="18.4" r=".95" fill="currentColor" stroke="none"/></svg>`;
const SVG_VOCE = `<svg viewBox="0 0 24 24" fill="none" stroke="#5cc8ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c2.8 2 4.2 4.8 4.2 8.6L12 15.5 7.8 11.6C7.8 7.8 9.2 5 12 3z"/><path d="M8.6 14.5l-2 4M15.4 14.5l2 4"/><circle cx="12" cy="9" r="1.2"/></svg>`;

const GRUPOS_EXTRA = [
  ['planeta-anao', 'grupoAnoes', 'Anões'],
  ['cinturao', 'grupoCinturoes', 'Cinturões'],
  ['asteroide', 'grupoAsteroides', 'Asteroides'],
  ['cometa', 'grupoCometas', 'Cometas'],
  ['sonda', 'grupoTelescopios', 'Sondas'],
];
const normalizar = (s) => (s || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export function iniciarMobileDock({ motor, dados, missoes, acoes, abrirProgresso }) {
  // ---------- gating (exatamente conforme SPEC) ----------
  const mqDock = matchMedia('(pointer: coarse) and (orientation: landscape)');
  const mqGirar = matchMedia('(pointer: coarse) and (orientation: portrait) and (max-width: 900px)');
  function aplicarModo() {
    document.body.classList.toggle('modo-dock', mqDock.matches);
    document.body.classList.toggle('modo-girar', mqGirar.matches);
  }
  mqDock.addEventListener('change', aplicarModo);
  mqGirar.addEventListener('change', aplicarModo);
  aplicarModo();

  // ---------- tela "gire o celular" ----------
  const girar = document.createElement('div');
  girar.id = 'mdock-girar';
  girar.setAttribute('aria-hidden', 'true');
  girar.innerHTML = `
    <img class="mdock-girar-logo" src="assets/logo.png" alt="">
    <div class="mdock-girar-icone">📱</div>
    <span class="mdock-girar-tag">${t('titulo') || 'SISTEMA SOLAR'}</span>
    <h2 class="mdock-girar-titulo">${t('mdockGirarTitulo')}</h2>
    <p class="mdock-girar-sub">${t('mdockGirarSub')}</p>
  `;
  document.body.appendChild(girar);

  // ---------- dock ----------
  const mdock = document.createElement('div');
  mdock.id = 'mdock';
  mdock.innerHTML = `
    <div class="mdock-scrim-cena" id="mdock-scrim-cena" hidden></div>
    <div class="mdock-hud mdock-hud-l"></div>
    <div class="mdock-hud mdock-hud-r"></div>

    <div class="mdock-titulo">
      <div class="mdock-titulo-logo">${SVG_LOGO}</div>
      <div>
        <div class="mdock-titulo-principal">${t('titulo') || 'SISTEMA SOLAR'}</div>
        <div class="mdock-titulo-sub">${t('subtitulo') || 'Simulador Interativo'}</div>
      </div>
    </div>

    <div class="mdock-topo-dir">
      <span class="mdock-nivel" id="mdock-nivel">◆ Nível</span>
      <button class="mdock-gear" id="mdock-gear" title="${t('mdockConfig')}">${SVG_GEAR}</button>
    </div>

    <div class="mdock-settings" id="mdock-settings" hidden>
      <div class="mdock-scrim" id="mdock-settings-scrim"></div>
      <div class="mdock-settings-painel">
        <div class="mdock-settings-titulo">${t('mdockConfig')}</div>
        <div class="mdock-settings-linha">
          <span>${t('btnOrbitas')}</span>
          <div class="mdock-toggle" id="mdock-tg-orbitas"><div class="mdock-toggle-bolinha"></div></div>
        </div>
        <div class="mdock-settings-linha">
          <span>${t('btnRotulos')}</span>
          <div class="mdock-toggle" id="mdock-tg-rotulos"><div class="mdock-toggle-bolinha"></div></div>
        </div>
        <div class="mdock-settings-linha">
          <span>${t('escalaReal')}</span>
          <div class="mdock-toggle" id="mdock-tg-escala"><div class="mdock-toggle-bolinha"></div></div>
        </div>
        <div class="mdock-settings-linha" id="mdock-linha-musica">
          <span>${t('mdockMusica')}</span>
          <div class="mdock-toggle" id="mdock-tg-musica"><div class="mdock-toggle-bolinha"></div></div>
        </div>
        <div class="mdock-settings-linha">
          <span>${t('mdockIdioma')}</span>
          <div class="mdock-idiomas">
            <span class="mdock-idioma-op" id="mdock-lang-pt">PT</span>
            <span class="mdock-idioma-op" id="mdock-lang-en">EN</span>
            <span class="mdock-idioma-op" id="mdock-lang-es">ES</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mdock-painel mdock-painel-l" id="mdock-painel-exp" hidden>
      <div class="mdock-painel-cabeca" id="mdock-painel-exp-fechar">
        <span>${SVG_EXPLORAR}${t('explorar')}</span><span class="mdock-seta">▾</span>
      </div>
      <div class="mdock-painel-corpo mdock-shell"></div>
    </div>

    <div class="mdock-painel mdock-painel-r" id="mdock-painel-xp" hidden>
      <div class="mdock-painel-cabeca" id="mdock-painel-xp-fechar">
        <span>${SVG_XP}${t('grupoExperiencias')}</span><span class="mdock-seta">▾</span>
      </div>
      <div class="mdock-painel-corpo mdock-shell"></div>
    </div>

    <div class="mdock-cal" id="mdock-cal" hidden>
      <div class="mdock-cal-cabeca">
        <span class="mdock-cal-nav" id="mdock-cal-prev">‹</span>
        <span class="mdock-cal-mes" id="mdock-cal-mes"></span>
        <span class="mdock-cal-nav" id="mdock-cal-next">›</span>
      </div>
      <div class="mdock-cal-semana">
        <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
      </div>
      <div class="mdock-cal-dias" id="mdock-cal-dias"></div>
      <button class="mdock-cal-hoje" id="mdock-cal-hoje">${t('hoje')}</button>
    </div>

    <div class="mdock-bar">
      <div class="mdock-sec mdock-sec-exp" id="mdock-btn-exp">${SVG_EXPLORAR}<span>${t('explorar')}</span> <span class="mdock-seta-sec" id="mdock-exp-seta">▴</span></div>
      <div class="mdock-divisor"></div>
      <div class="mdock-sec mdock-transporte">
        <span class="mdock-transp-btn" id="mdock-back" title="⏮">⏮</span>
        <span class="mdock-transp-play" id="mdock-play" title="▶/⏸">⏸</span>
        <span class="mdock-transp-btn" id="mdock-fwd" title="⏭">⏭</span>
        <input class="mdock-slider" id="mdock-slider" type="range" min="0" max="14" step="1" value="9" title="${t('tituloSlider')}">
        <span class="mdock-speed" id="mdock-speed" title="${t('tituloSlider')}"></span>
        <span class="mdock-data" id="mdock-date" title="${t('irParaData')}"></span>
      </div>
      <div class="mdock-divisor"></div>
      <div class="mdock-sec mdock-sec-xp" id="mdock-btn-xp">${SVG_XP}<span>${t('grupoExperiencias')}</span> <span class="mdock-seta-sec" id="mdock-xp-seta">▴</span></div>
    </div>
  `;
  document.body.appendChild(mdock);

  // ---------- estado local ----------
  const estado = { panel: null, calOpen: false, calY: 0, calM: 0, settingsOpen: false, sel: null, tab: 'resumo', busca: '' };
  const $ = (id) => document.getElementById(id);
  let expAssinatura = null;
  let selMotorAnterior = undefined;

  function fecharTudo() {
    estado.panel = null;
    estado.calOpen = false;
    estado.settingsOpen = false;
    render();
  }

  function togglePainel(nome) {
    estado.panel = estado.panel === nome ? null : nome;
    estado.calOpen = false;
    render();
  }

  // ---------- transporte ----------
  $('mdock-back').onclick = () => { acoes.recuarVelocidade(); render(); };
  $('mdock-fwd').onclick = () => { acoes.avancarVelocidade(); render(); };
  $('mdock-play').onclick = () => { acoes.alternarPausa(); render(); };
  $('mdock-speed').onclick = () => { acoes.avancarVelocidade(); render(); };
  $('mdock-slider').addEventListener('change', (e) => {
    const real = document.getElementById('tempo-slider');
    const atual = real ? parseInt(real.value, 10) : 9;
    const v = parseInt(e.target.value, 10);
    const passo = v > atual ? acoes.avancarVelocidade : acoes.recuarVelocidade;
    for (let i = 0; i < Math.abs(v - atual); i++) passo();
    render();
  });
  $('mdock-date').onclick = () => {
    estado.calOpen = !estado.calOpen;
    estado.panel = null;
    if (estado.calOpen) {
      const cur = acoes.getDataSimulada();
      estado.calY = cur.getFullYear();
      estado.calM = cur.getMonth();
    }
    render();
  };

  // ---------- calendário ----------
  $('mdock-cal-prev').onclick = () => { estado.calM--; if (estado.calM < 0) { estado.calM = 11; estado.calY--; } render(); };
  $('mdock-cal-next').onclick = () => { estado.calM++; if (estado.calM > 11) { estado.calM = 0; estado.calY++; } render(); };
  $('mdock-cal-hoje').onclick = () => {
    acoes.irParaData(new Date().toISOString().slice(0, 10));
    estado.calOpen = false;
    render();
  };

  // ---------- painéis ----------
  $('mdock-btn-exp').onclick = () => togglePainel('exp');
  $('mdock-btn-xp').onclick = () => togglePainel('xp');
  $('mdock-painel-exp-fechar').onclick = () => togglePainel('exp');
  $('mdock-painel-xp-fechar').onclick = () => togglePainel('xp');
  // Tocar a cena (scrim) fecha o painel/calendário aberto
  $('mdock-scrim-cena').onclick = fecharTudo;

  // ---------- Explorar: lista agrupada (mesma taxonomia de criarPainelExplorar) ----------
  function montarLista(shell) {
    const buscaWrap = document.createElement('div');
    buscaWrap.className = 'mdock-busca-wrap';
    buscaWrap.innerHTML = SVG_BUSCA;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'mdock-busca';
    input.placeholder = t('mdockBuscar');
    input.value = estado.busca;
    input.oninput = (e) => { estado.busca = e.target.value; renderListaCorpo(); };
    buscaWrap.appendChild(input);
    shell.appendChild(buscaWrap);

    const lista = document.createElement('div');
    lista.className = 'mdock-lista';
    shell.appendChild(lista);

    function selecionarNaCena(corpo) {
      motor.focar(corpo.id);
      motor.aoSelecionar(corpo.id);
    }

    function linhaGrupo(titulo, cor) {
      const h = document.createElement('div');
      h.className = 'mdock-grupo-titulo';
      if (cor) h.style.color = cor;
      h.textContent = titulo;
      lista.appendChild(h);
    }
    function linhaItem(corpo, { numero, lua } = {}) {
      const el = document.createElement('div');
      el.className = 'mdock-item' + (lua ? ' mdock-item-lua' : '');
      el.textContent = numero ? `${numero}º ${corpo.nome}` : corpo.nome;
      if (acoes.ehFavorito(corpo.id)) {
        const m = document.createElement('span');
        m.className = 'mdock-item-fav';
        m.textContent = ' ★';
        el.appendChild(m);
      }
      el.onclick = () => selecionarNaCena(corpo);
      lista.appendChild(el);
    }

    function renderListaCorpo() {
      lista.innerHTML = '';
      const termo = normalizar(estado.busca);
      const passa = (c) => !termo || normalizar(c.nome).includes(termo);

      const favs = dados.corpos.filter((c) => acoes.ehFavorito(c.id) && passa(c));
      if (favs.length) { linhaGrupo('★ ' + (t('grupoFavoritos') || 'Meus favoritos'), '#ffcf6b'); favs.forEach((c) => linhaItem(c)); }

      const estrelas = dados.corpos.filter((c) => c.tipo === 'estrela' && passa(c));
      if (estrelas.length) { linhaGrupo(t('grupoEstrela') || 'Estrela'); estrelas.forEach((c) => linhaItem(c)); }

      const luasPorPai = {};
      dados.corpos.forEach((c) => { if (c.tipo === 'lua' && c.pai) (luasPorPai[c.pai] ||= []).push(c); });
      const planetas = dados.corpos.filter((c) => c.tipo === 'planeta').sort((a, b) => (a.ordemDoSol || 0) - (b.ordemDoSol || 0));
      const linhasPlanetas = [];
      planetas.forEach((p) => {
        if (passa(p)) linhasPlanetas.push(() => linhaItem(p, { numero: p.ordemDoSol }));
        (luasPorPai[p.id] || []).filter(passa).forEach((l) => linhasPlanetas.push(() => linhaItem(l, { lua: true })));
      });
      if (linhasPlanetas.length) { linhaGrupo(t('grupoPlanetas') || 'Planetas'); linhasPlanetas.forEach((fn) => fn()); }

      GRUPOS_EXTRA.forEach(([tipo, chave, fallback]) => {
        const itens = dados.corpos.filter((c) => c.tipo === tipo && passa(c));
        if (itens.length) { linhaGrupo(t(chave) || fallback); itens.forEach((c) => linhaItem(c)); }
      });

      // Missões espaciais (vêm do array `missoes`, não de dados.corpos): bolinha
      // colorida + nome + selo PRO; clicar abre o card e segue a nave.
      const mis = (missoes || []).filter((m) => passa(m));
      if (mis.length) {
        linhaGrupo(t('grupoMissoes') || 'Missões espaciais');
        mis.forEach((m) => {
          const el = document.createElement('div');
          el.className = 'mdock-item mdock-item-missao';
          const dot = document.createElement('span');
          dot.className = 'mdock-missao-dot';
          dot.style.background = m.cor || '#5cc8ff';
          el.appendChild(dot);
          el.appendChild(document.createTextNode(m.nome));
          if (acoes.missaoPro && acoes.missaoPro(m.id)) {
            const pro = document.createElement('span');
            pro.className = 'mdock-item-pro';
            pro.textContent = t('proBadge') || 'PRO';
            el.appendChild(pro);
          }
          el.onclick = () => { estado.panel = null; render(); acoes.abrirMissao(m.id); };
          lista.appendChild(el);
        });
      }

      if (!lista.children.length) {
        const vazio = document.createElement('div');
        vazio.className = 'mdock-lista-vazia';
        vazio.textContent = t('mdockVazio');
        lista.appendChild(vazio);
      }
    }
    renderListaCorpo();
  }

  // ---------- Explorar: ficha do astro selecionado (4 abas) ----------
  function montarFicha(shell, id) {
    const corpo = dados.corpos.find((c) => c.id === id);
    if (!corpo) { estado.sel = null; montarLista(shell); return; }

    const voltar = document.createElement('div');
    voltar.className = 'mdock-voltar';
    voltar.innerHTML = `<span class="mdock-voltar-seta">‹</span><span>${t('mdockVoltar')}</span>`;
    voltar.onclick = () => { estado.sel = null; expAssinatura = null; shell.innerHTML = ''; montarLista(shell); };
    shell.appendChild(voltar);

    const cab = document.createElement('div');
    cab.className = 'mdock-ficha-cab';
    // Sem swatch do astro: ele já aparece no motor 3D ao lado (pedido do Fred).
    const infoDiv = document.createElement('div');
    infoDiv.className = 'mdock-ficha-info';
    const nome = document.createElement('div');
    nome.className = 'mdock-ficha-nome';
    nome.textContent = corpo.nome;
    infoDiv.appendChild(nome);
    const pill = document.createElement('span');
    pill.className = 'mdock-ficha-pill';
    pill.textContent = acoes.tipoLabel(corpo);
    infoDiv.appendChild(pill);
    cab.appendChild(infoDiv);
    const btnFav = document.createElement('button');
    btnFav.className = 'mdock-ficha-fav';
    const setFavIcone = () => {
      const on = acoes.ehFavorito(corpo.id);
      btnFav.textContent = on ? '★' : '☆';
      btnFav.classList.toggle('on', on);
    };
    setFavIcone();
    btnFav.onclick = () => { acoes.alternarFavorito(corpo.id); setFavIcone(); };
    cab.appendChild(btnFav);
    shell.appendChild(cab);

    const abas = document.createElement('div');
    abas.className = 'mdock-abas';
    const conteudo = document.createElement('div');
    conteudo.className = 'mdock-aba-conteudo';

    function linhaComIcone(container, cls, icone, iconeCls, texto) {
      const l = document.createElement('div');
      l.className = cls;
      const i = document.createElement('span');
      i.className = iconeCls;
      i.textContent = icone;
      const s = document.createElement('span');
      s.textContent = texto;
      l.appendChild(i);
      l.appendChild(s);
      container.appendChild(l);
    }
    function subsecao(titulo, montarConteudo) {
      const wrap = document.createElement('div');
      wrap.className = 'mdock-av-secao';
      const h = document.createElement('div');
      h.className = 'mdock-subtitulo mdock-subtitulo-ciano';
      h.textContent = titulo;
      wrap.appendChild(h);
      montarConteudo(wrap);
      conteudo.appendChild(wrap);
    }

    function renderAba() {
      abas.querySelectorAll('.mdock-aba').forEach((b) => b.classList.toggle('ativa', b.dataset.tab === estado.tab));
      conteudo.innerHTML = '';
      const inf = corpo.info || {};
      if (estado.tab === 'resumo') {
        const p = document.createElement('div');
        p.className = 'mdock-resumo-txt';
        p.textContent = inf.resumo || '';
        conteudo.appendChild(p);
        if (inf.comparacoes?.length) {
          const h = document.createElement('div');
          h.className = 'mdock-subtitulo';
          h.textContent = t('mdockComparacoes');
          conteudo.appendChild(h);
          inf.comparacoes.forEach((c) => linhaComIcone(conteudo, 'mdock-linha-diamante', '◆', 'mdock-diamante', c));
        }
      } else if (estado.tab === 'numeros') {
        (inf.numeros || []).forEach((n) => {
          const l = document.createElement('div');
          l.className = 'mdock-numero-linha';
          const r = document.createElement('span');
          r.className = 'mdock-numero-rotulo';
          r.textContent = n.rotulo;
          const v = document.createElement('span');
          v.className = 'mdock-numero-valor';
          v.textContent = n.valor;
          l.appendChild(r);
          l.appendChild(v);
          conteudo.appendChild(l);
        });
      } else if (estado.tab === 'curio') {
        (inf.curiosidades || []).forEach((c) => linhaComIcone(conteudo, 'mdock-linha-estrela', '★', 'mdock-estrela-amb', c));
      } else if (estado.tab === 'avancado') {
        const av = inf.avancado || {};
        if (av.composicao) subsecao(t('mdockComposicao'), (w) => { const p = document.createElement('div'); p.className = 'mdock-av-texto'; p.textContent = av.composicao; w.appendChild(p); });
        if (av.temperatura) subsecao(t('mdockTemperatura'), (w) => { const p = document.createElement('div'); p.className = 'mdock-av-texto'; p.textContent = av.temperatura; w.appendChild(p); });
        if (av.missoes?.length) subsecao(t('mdockMissoes'), (w) => av.missoes.forEach((m) => linhaComIcone(w, 'mdock-linha-triangulo', '▸', 'mdock-triangulo', m)));
        if (av.texto) subsecao(t('mdockDetalhes'), (w) => { const p = document.createElement('div'); p.className = 'mdock-av-texto'; p.textContent = av.texto; w.appendChild(p); });
      }
    }

    [['resumo', 'mdockTabResumo'], ['numeros', 'mdockTabNumeros'], ['curio', 'mdockTabCurio'], ['avancado', 'mdockTabAvancado']].forEach(([key, chave]) => {
      const b = document.createElement('span');
      b.className = 'mdock-aba';
      b.dataset.tab = key;
      b.textContent = t(chave);
      b.onclick = () => { estado.tab = key; renderAba(); };
      abas.appendChild(b);
    });
    shell.appendChild(abas);
    shell.appendChild(conteudo);
    renderAba();
  }

  // ---------- Explorar: alterna lista/ficha conforme estado ----------
  function syncPainelExp() {
    const shell = document.querySelector('#mdock-painel-exp .mdock-shell');
    if (!shell) return;
    const assinatura = estado.panel === 'exp' ? (estado.sel ? 'ficha:' + estado.sel : 'lista') : 'fechado';
    if (assinatura === expAssinatura) return;
    expAssinatura = assinatura;
    shell.innerHTML = '';
    if (estado.panel !== 'exp') return;
    if (estado.sel) montarFicha(shell, estado.sel); else montarLista(shell);
  }

  // ---------- Experiências: 5 botões (conteúdo estático) ----------
  function montarExperiencias(shell) {
    const wrap = document.createElement('div');
    wrap.className = 'mdock-xp-lista';
    [
      { label: t('btnTour'), icone: SVG_TOUR, tour: true, acao: acoes.iniciarTour },
      { label: t('btnEventos'), icone: SVG_EVENTOS, acao: acoes.abrirEventos },
      { label: t('btnTamanhos'), icone: SVG_COMPARAR, acao: acoes.abrirComparador },
      { label: t('btnQuiz'), icone: SVG_QUIZ, acao: acoes.abrirQuiz },
      { label: t('btnVoce'), icone: SVG_VOCE, acao: acoes.abrirVoce },
    ].forEach((it) => {
      const b = document.createElement('button');
      b.className = 'mdock-xp-btn' + (it.tour ? ' mdock-xp-btn-tour' : '');
      b.innerHTML = it.icone;
      const span = document.createElement('span');
      span.textContent = it.label;
      b.appendChild(span);
      b.onclick = () => { estado.panel = null; render(); it.acao(); };
      wrap.appendChild(b);
    });
    shell.appendChild(wrap);
  }
  montarExperiencias(document.querySelector('#mdock-painel-xp .mdock-shell'));

  // ---------- sincronização com a seleção da cena 3D (sim:selecao) ----------
  document.addEventListener('sim:selecao', (e) => {
    const id = e.detail?.id ?? null;
    if (id) {
      estado.sel = id;
      estado.tab = 'resumo';
      estado.panel = 'exp';
      estado.calOpen = false;
      estado.settingsOpen = false;
    } else if (estado.panel === 'exp') {
      estado.sel = null;
    }
    render();
  });

  // ---------- nível / engrenagem ----------
  $('mdock-nivel').onclick = () => abrirProgresso();
  $('mdock-gear').onclick = () => {
    estado.settingsOpen = !estado.settingsOpen;
    estado.panel = null;
    estado.calOpen = false;
    render();
  };
  $('mdock-settings-scrim').onclick = () => { estado.settingsOpen = false; render(); };

  // ---------- settings: toggles ----------
  $('mdock-tg-orbitas').onclick = () => { const v = acoes.estadoVis(); acoes.setOrbitas(!v.orbitas); render(); };
  $('mdock-tg-rotulos').onclick = () => { const v = acoes.estadoVis(); acoes.setRotulos(!v.rotulos); render(); };
  $('mdock-tg-escala').onclick = () => { const v = acoes.estadoVis(); acoes.setEscala(v.escala === 'real' ? 'didatica' : 'real'); render(); };
  $('mdock-tg-musica').onclick = () => { document.getElementById('btn-musica')?.click(); render(); };
  $('mdock-lang-pt').onclick = () => trocarIdioma('pt');
  $('mdock-lang-en').onclick = () => trocarIdioma('en');
  $('mdock-lang-es').onclick = () => trocarIdioma('es');

  // ---------- render (imperativo: reflete estado atual no DOM) ----------
  function render() {
    // Poll de segurança: cobre seleção feita diretamente via motor.selecionar()
    // (ex.: console/testes) sem passar pelo evento sim:selecao.
    const selMotor = motor.corposSelecionado ?? null;
    if (selMotor !== selMotorAnterior) {
      selMotorAnterior = selMotor;
      if (selMotor) { estado.sel = selMotor; estado.tab = 'resumo'; estado.panel = 'exp'; }
      else if (estado.panel === 'exp') { estado.sel = null; }
    }

    // cola o painel no topo real do dock (altura varia por conteúdo/idioma).
    // Setado no <body> (não em #mdock) porque .card-missao vive em #ui-root,
    // um IRMÃO de #mdock — só herda a variável de um ancestral comum.
    const barEl = document.querySelector('.mdock-bar');
    if (barEl) document.body.style.setProperty('--mdock-bar-h', barEl.offsetHeight + 'px');

    // nível (proxy do chip oculto de progresso.js)
    const icone = document.querySelector('.progresso-chip-icone')?.textContent?.trim();
    const nomeNivel = document.querySelector('.progresso-chip-nome')?.textContent?.trim();
    $('mdock-nivel').textContent = (icone && nomeNivel) ? `${icone} ${nomeNivel}` : '◆ Nível';

    // dock bar
    $('mdock-painel-exp').hidden = estado.panel !== 'exp';
    $('mdock-painel-xp').hidden = estado.panel !== 'xp';
    $('mdock-cal').hidden = !estado.calOpen;
    $('mdock-settings').hidden = !estado.settingsOpen;
    // Explorar (e o card de missão, que abre na mesma janela — ver mobile.css)
    // ocupam ~46% da esquerda: desloca a ótica pra centralizar o astro/nave
    // focado na metade livre (sem zoom, sem mexer na cena/dados). O card de
    // missão é do ui.js (display:block/none, sem passar por estado.panel).
    const cardMissaoEl = $('card-missao');
    const cardMissaoVisivel = !!cardMissaoEl && getComputedStyle(cardMissaoEl).display !== 'none';
    if (motor.setDeslocamentoVisao) motor.setDeslocamentoVisao((estado.panel === 'exp' || cardMissaoVisivel) ? 0.46 : 0);
    // scrim de cena aparece quando um painel ou o calendário está aberto
    $('mdock-scrim-cena').hidden = !(estado.panel || estado.calOpen);
    $('mdock-btn-exp').classList.toggle('ativo', estado.panel === 'exp');
    $('mdock-btn-xp').classList.toggle('ativo', estado.panel === 'xp');
    $('mdock-exp-seta').textContent = estado.panel === 'exp' ? '▾' : '▴';
    $('mdock-xp-seta').textContent = estado.panel === 'xp' ? '▾' : '▴';
    $('mdock-date').classList.toggle('ativo', estado.calOpen);

    // painel explorar (lista/ficha)
    syncPainelExp();

    // transporte
    const et = acoes.estadoTempo();
    $('mdock-play').textContent = et.pausado ? '▶' : '⏸';
    $('mdock-speed').textContent = et.rotulo.startsWith('−') ? '◀ ' + et.rotulo.slice(1) : et.rotulo;
    $('mdock-date').textContent = fmtData(acoes.getDataSimulada());
    const realSlider = document.getElementById('tempo-slider');
    if (realSlider) $('mdock-slider').value = realSlider.value;

    // calendário
    if (estado.calOpen) {
      $('mdock-cal-mes').textContent = `${MESF[estado.calM]} ${estado.calY}`;
      const dias = $('mdock-cal-dias');
      dias.innerHTML = '';
      const primeiro = new Date(estado.calY, estado.calM, 1).getDay();
      const totalDias = new Date(estado.calY, estado.calM + 1, 0).getDate();
      const cur = acoes.getDataSimulada();
      const hoje = new Date();
      for (let i = 0; i < primeiro; i++) dias.appendChild(document.createElement('div'));
      for (let d = 1; d <= totalDias; d++) {
        const cel = document.createElement('div');
        cel.textContent = String(d);
        cel.className = 'mdock-cal-dia';
        if (cur.getFullYear() === estado.calY && cur.getMonth() === estado.calM && cur.getDate() === d) cel.classList.add('sel');
        else if (hoje.getFullYear() === estado.calY && hoje.getMonth() === estado.calM && hoje.getDate() === d) cel.classList.add('hoje');
        cel.onclick = () => {
          acoes.irParaData(`${estado.calY}-${pad2(estado.calM + 1)}-${pad2(d)}`);
          estado.calOpen = false;
          render();
        };
        dias.appendChild(cel);
      }
    }

    // settings
    if (estado.settingsOpen) {
      const v = acoes.estadoVis();
      $('mdock-tg-orbitas').classList.toggle('on', v.orbitas);
      $('mdock-tg-rotulos').classList.toggle('on', v.rotulos);
      $('mdock-tg-escala').classList.toggle('on', v.escala === 'real');
      const btnMusica = document.getElementById('btn-musica');
      $('mdock-linha-musica').hidden = !btnMusica;
      if (btnMusica) $('mdock-tg-musica').classList.toggle('on', btnMusica.classList.contains('toggle-ativo'));
      const lang = getIdioma();
      $('mdock-lang-pt').classList.toggle('sel', lang === 'pt');
      $('mdock-lang-en').classList.toggle('sel', lang === 'en');
      $('mdock-lang-es').classList.toggle('sel', lang === 'es');
    }
  }

  render();
  setInterval(render, 500);
}
