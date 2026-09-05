// Palco: infraestrutura genérica dos modos didáticos que precisam de uma cena
// própria (Estações, Marés). Ver SPEC-estacoes-e-mares.md §2.
//
// A cena principal é fiel, e por isso não serve aqui: na escala didática a Lua
// já é um ponto, e o bojo de maré real é 1 parte em 25 milhões do raio da
// Terra. Ensinar esses fenômenos exige exagero deliberado — e exagero
// deliberado não pode contaminar o simulador, que é o ativo de rigor do app.
// Daí uma cena separada, com escala assumidamente falsa e sinalizada como tal.
//
// Este módulo não sabe nada sobre estações ou marés: cuida do overlay, do
// ciclo de vida, do scrubber, do selo de escala, do roteiro guiado e da
// acessibilidade. O conteúdo vem de quem chama, via `construirCena`.
import * as THREE from 'three';
import { getIdioma } from './i18n.js?v=30';

// Versão das texturas reais — a MESMA de motor3d._carregarTexturasReais.
// Se lá mudar, muda aqui: servir a mesma imagem sob dois ?v= diferentes faz o
// navegador baixar o arquivo duas vezes.
const V_TEXTURAS = 30;

/**
 * Aplica a textura real de um corpo sobre um material, com o mesmo tratamento
 * da cena principal (colorSpace sRGB e anisotropia máxima do dispositivo).
 * Se o arquivo não existir, o material fica com o que já tinha — a textura
 * procedural — e o app segue funcionando offline, como o motor faz.
 *
 * @param {THREE.WebGLRenderer} renderer  para ler a anisotropia suportada
 * @param {string} id                     id do corpo em dados.js ('sol', 'terra', 'lua')
 * @param {THREE.Material} material       material a receber o mapa
 * @param {function} [registrar]          recebe a textura, para o dispose do palco
 */
export function aplicarTexturaReal(renderer, id, material, registrar) {
  new THREE.TextureLoader().load(
    `texturas/${id}.jpg?v=${V_TEXTURAS}`,
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      material.map = tex;
      material.needsUpdate = true;
      if (registrar) registrar(tex);
    },
    undefined,
    () => { /* sem textura real: fica o procedural, como na cena principal */ },
  );
}

const TEXTOS = {
  pt: {
    voltar: 'Voltar',
    foraDeEscala: 'fora de escala',
    verEscalaReal: 'Ver em escala real',
    tocar: 'Reproduzir',
    pausar: 'Pausar',
    proximo: 'Próximo',
    pular: 'Pular',
    comecar: 'Explorar livremente',
    passo: 'Passo {n} de {t}',
    linhaDoTempo: 'Linha do tempo',
  },
  en: {
    voltar: 'Back',
    foraDeEscala: 'not to scale',
    verEscalaReal: 'See true scale',
    tocar: 'Play',
    pausar: 'Pause',
    proximo: 'Next',
    pular: 'Skip',
    comecar: 'Explore freely',
    passo: 'Step {n} of {t}',
    linhaDoTempo: 'Timeline',
  },
  es: {
    voltar: 'Volver',
    foraDeEscala: 'fuera de escala',
    verEscalaReal: 'Ver en escala real',
    tocar: 'Reproducir',
    pausar: 'Pausar',
    proximo: 'Siguiente',
    pular: 'Saltar',
    comecar: 'Explorar libremente',
    passo: 'Paso {n} de {t}',
    linhaDoTempo: 'Línea de tiempo',
  },
};

function tp(chave) {
  const idioma = getIdioma();
  return (TEXTOS[idioma] && TEXTOS[idioma][chave]) || TEXTOS.pt[chave] || chave;
}

// Respeita a preferência do sistema por menos movimento: sem animação
// automática, o scrubber vira o único motor do tempo (SPEC §7.4).
export function movimentoReduzido() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
}

// ————— área segura da cena —————
//
// O HUD é um overlay sobre a cena INTEIRA, mas a cena era enquadrada como se a
// tela toda estivesse livre. O resultado, medido no modo Marés: o Sol nascia
// dentro do card "Fase da Lua" e a Lua passava por trás da barra de controles.
//
// A saída não é empurrar cada corpo para fora do HUD um a um — isso troca um
// defeito por outro (o Sol puxado para dentro invadiria a órbita da Lua). É
// enquadrar a cena INTEIRA na faixa livre: se o círculo que contém tudo cabe,
// nenhum corpo pode cair sob a interface, venha de que direção vier.

/** Margem, em px, entre a cena e a borda de qualquer elemento da interface. */
const MARGEM_AREA_SEGURA = 10;

/**
 * Retângulo livre da tela, em NDC (x e y de −1 a 1, y para cima).
 *
 * O roteiro guiado NÃO entra na conta: é um painel temporário por cima da cena,
 * e descontá-lo faria o enquadramento saltar no instante em que o roteiro
 * terminasse.
 *
 * @param {HTMLElement} overlay  a raiz `.palco-overlay`
 */
export function areaSegura(overlay) {
  const L = window.innerWidth;
  const A = window.innerHeight;
  let esq = 0;
  let dir = L;
  let topo = 0;
  let base = A;

  // As colunas do HUD medidas pelos CARDS, não pelo contêiner: uma coluna sem
  // card tem retângulo de largura zero encostado na borda, e usá-lo comeria
  // metade da tela por nada.
  const uniao = (seletor, aplicar) => {
    overlay.querySelectorAll(seletor).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) aplicar(r);
    });
  };

  uniao('.palco-hud-esq .palco-card', (r) => { esq = Math.max(esq, r.right); });
  uniao('.palco-hud-dir .palco-card', (r) => { dir = Math.min(dir, r.left); });
  uniao('.palco-topo, .palco-selo', (r) => { topo = Math.max(topo, r.bottom); });
  uniao('.palco-rodape', (r) => { base = Math.min(base, r.top); });

  const m = MARGEM_AREA_SEGURA;
  const xEsq = Math.min(esq + m, L);
  const xDir = Math.max(dir - m, 0);
  const yTopo = Math.min(topo + m, A);
  const yBase = Math.max(base - m, 0);

  return {
    xMin: (xEsq / L) * 2 - 1,
    xMax: (xDir / L) * 2 - 1,
    yMin: 1 - (yBase / A) * 2,
    yMax: 1 - (yTopo / A) * 2,
  };
}

/**
 * Maior raio, até `raioDesejado`, em que o ponto `direcao · raio` no plano y=0
 * ainda projeta dentro da área segura.
 *
 * Serve para um corpo que só precisa indicar uma DIREÇÃO e pode ceder distância
 * — o Sol das Marés é o caso. Quem depende do raio para significar alguma coisa
 * (a órbita da Lua) não usa isto: usa `distanciaParaEnquadrar`.
 *
 * O chamador deve passar um `raioDesejado` já folgado do tamanho aparente do
 * corpo, e subtrair essa folga do resultado — aqui só se trata do centro.
 */
export function raioSeguro(camera, direcao, raioDesejado, area) {
  const ponto = new THREE.Vector3();
  const dentro = (t) => {
    ponto.copy(direcao).multiplyScalar(t).project(camera);
    return ponto.x >= area.xMin && ponto.x <= area.xMax
      && ponto.y >= area.yMin && ponto.y <= area.yMax;
  };
  if (dentro(raioDesejado)) return raioDesejado;
  let lo = 0;
  let hi = raioDesejado;
  for (let i = 0; i < 16; i++) {
    const meio = (lo + hi) / 2;
    if (dentro(meio)) lo = meio; else hi = meio;
  }
  return lo;
}

/**
 * Menor distância da câmera, na direção que ela já aponta, em que um círculo de
 * `raioMundo` no plano y=0 projeta INTEIRO dentro da área segura.
 *
 * Busca binária sobre amostras do círculo, e não álgebra de projeção fechada:
 * é monotônica (afastar a câmera só pode fazer o círculo caber mais), custa
 * ~18 iterações uma vez por abertura, e não tem como errar o espaço de
 * coordenadas — que é o erro clássico deste projeto.
 */
export function distanciaParaEnquadrar(camera, raioMundo, area, amostras = 32, centro = null) {
  if (!(area.xMax > area.xMin) || !(area.yMax > area.yMin)) {
    return camera.position.length();          // área degenerada: não mexe
  }

  // Quando o círculo está fora da origem, a câmera também tem de ser deslocada
  // A PARTIR DELE — senão a busca mede uma geometria que não é a que vai
  // existir, e o enquadramento muda sozinho conforme o alvo se move.
  const base = centro || new THREE.Vector3();
  const direcao = camera.position.clone().sub(base).normalize();
  const original = camera.position.clone();
  const ponto = new THREE.Vector3();

  const cabe = (distancia) => {
    camera.position.copy(base).addScaledVector(direcao, distancia);
    camera.updateMatrixWorld(true);
    for (let i = 0; i < amostras; i++) {
      const a = (i / amostras) * Math.PI * 2;
      ponto.set(Math.cos(a) * raioMundo, 0, Math.sin(a) * raioMundo);
      // O círculo pode não estar na origem: quando a câmera olha para um corpo
      // em órbita, o que precisa caber é um círculo em volta DELE. Enquadrar um
      // círculo da origem com a câmera apontada para outro ponto afasta a
      // câmera muito além do necessário — o erro custou 40% do tamanho da Terra
      // no modo Estações antes de ser medido.
      if (centro) ponto.add(centro);
      ponto.project(camera);
      if (ponto.x < area.xMin || ponto.x > area.xMax
        || ponto.y < area.yMin || ponto.y > area.yMax) return false;
    }
    return true;
  };

  let lo = raioMundo * 0.5;
  let hi = raioMundo * 20;
  const encontrou = cabe(hi);
  if (encontrou) {
    for (let i = 0; i < 18; i++) {
      const meio = (lo + hi) / 2;
      if (cabe(meio)) hi = meio; else lo = meio;
    }
  }

  camera.position.copy(original);
  camera.updateMatrixWorld(true);
  return encontrou ? hi : raioMundo * 20;
}

/**
 * Cria um palco. Devolve o controlador do modo.
 *
 * @param {object} cfg
 * @param {object} cfg.motor        instância de SistemaSolar3D
 * @param {string} cfg.id           identificador curto ('estacoes', 'mares')
 * @param {function} cfg.titulo     () => string, avaliada a cada abertura (idioma)
 * @param {function} cfg.construirCena  (palco) => { scene, camera, atualizar,
 *                                       aoRedimensionar, dispose, escalaReal? }
 * @param {function} [cfg.roteiro]  () => [{ texto, aoEntrar? }]
 */
export function criarPalco(cfg) {
  const { motor, id } = cfg;
  const CHAVE_VISTO = `sistema-solar-${id}-visto`;

  let overlay = null;
  let cena = null;              // o que construirCena devolveu
  let dataInicial = null;       // data do simulador antes de abrir (SPEC §3)
  let aberto = false;
  let tocando = true;
  let elementoFocoAnterior = null;
  let passos = [];
  let passoAtual = -1;

  // ————— construção do overlay (uma vez) —————

  function construirOverlay() {
    overlay = document.createElement('div');
    overlay.className = `palco-overlay palco-${id}`;
    overlay.id = `palco-${id}`;
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', `palco-${id}-titulo`);

    overlay.innerHTML = `
      <div class="palco-topo">
        <h2 class="palco-titulo" id="palco-${id}-titulo"></h2>
        <button class="palco-fechar botao-fechar-overlay" type="button">
          <span class="fechar-icone">✕</span><span class="fechar-texto">‹ </span>
        </button>
      </div>
      <div class="palco-hud palco-hud-esq"></div>
      <div class="palco-hud palco-hud-dir"></div>
      <div class="palco-selo" title=""></div>
      <div class="palco-rodape">
        <button class="palco-btn palco-play" type="button">⏸</button>
        <input class="palco-scrubber" type="range" min="0" max="1000" value="0" step="1">
        <div class="palco-legenda"></div>
        <div class="palco-rodape-acoes"></div>
        <button class="palco-btn palco-escala" type="button"></button>
      </div>
      <div class="palco-sr" role="status" aria-live="polite" aria-atomic="true"></div>
      <div class="palco-roteiro" hidden>
        <p class="palco-roteiro-texto"></p>
        <div class="palco-roteiro-acoes">
          <button class="palco-roteiro-pular" type="button"></button>
          <span class="palco-roteiro-passo"></span>
          <button class="palco-roteiro-proximo" type="button"></button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    ref.fechar = overlay.querySelector('.palco-fechar');
    ref.titulo = overlay.querySelector('.palco-titulo');
    ref.hudEsq = overlay.querySelector('.palco-hud-esq');
    ref.hudDir = overlay.querySelector('.palco-hud-dir');
    ref.selo = overlay.querySelector('.palco-selo');
    ref.play = overlay.querySelector('.palco-play');
    ref.scrubber = overlay.querySelector('.palco-scrubber');
    ref.legenda = overlay.querySelector('.palco-legenda');
    ref.rodapeAcoes = overlay.querySelector('.palco-rodape-acoes');
    ref.sr = overlay.querySelector('.palco-sr');
    ref.escala = overlay.querySelector('.palco-escala');
    ref.roteiro = overlay.querySelector('.palco-roteiro');
    ref.roteiroTexto = overlay.querySelector('.palco-roteiro-texto');
    ref.roteiroPular = overlay.querySelector('.palco-roteiro-pular');
    ref.roteiroPasso = overlay.querySelector('.palco-roteiro-passo');
    ref.roteiroProximo = overlay.querySelector('.palco-roteiro-proximo');

    ref.fechar.onclick = fechar;
    ref.play.onclick = alternarPlay;
    ref.escala.onclick = mostrarEscalaReal;
    ref.roteiroPular.onclick = encerrarRoteiro;
    ref.roteiroProximo.onclick = avancarRoteiro;

    ref.scrubber.addEventListener('input', () => {
      // Arrastar o tempo implica assumir o controle dele: seguir tocando
      // faria o scrubber "fugir" do dedo.
      if (tocando) alternarPlay();
      if (cena && cena.aoScrubber) cena.aoScrubber(Number(ref.scrubber.value) / 1000);
    });

    // Tab circula dentro do diálogo. Escape NÃO fica aqui: o overlay é
    // pointer-events:none e o foco pode estar no canvas atrás dele, então um
    // listener local perderia a tecla — ver aoTeclar, registrado no document.
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') prenderFoco(e);
    }, true);
  }

  // Escape em captura no document, pela mesma disciplina que main.js documenta
  // para o paywall: quem está por cima responde primeiro e impede que o painel
  // de baixo também reaja à mesma tecla.
  function aoTeclar(e) {
    if (e.key !== 'Escape' || !aberto) return;
    e.stopPropagation();
    e.preventDefault();
    fechar();
  }

  const ref = {};

  // Observador da legenda para sincronizar com aria-valuetext do scrubber
  let observadorLegenda = null;

  // Estado do anúncio com freio
  let ultimoAnuncio = '';
  let ultimoAnuncioEm = 0;

  // Foco preso dentro do diálogo enquanto ele existe (SPEC §7.4).
  function prenderFoco(e) {
    const focaveis = [...overlay.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])')]
      .filter((el) => !el.disabled && el.offsetParent !== null);
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  }

  // ————— acessibilidade —————

  /**
   * Anuncia um estado para leitores de tela. Só escreve se o texto MUDOU e se
   * passou pelo menos 1 s desde o último anúncio: os valores do HUD mudam a
   * cada quadro, e uma região aria-live atualizada 60×/s é inutilizável.
   */
  function anunciar(texto) {
    if (!texto || texto === ultimoAnuncio) return;
    const agora = Date.now();
    if (agora - ultimoAnuncioEm < 1000) return;
    ultimoAnuncio = texto;
    ultimoAnuncioEm = agora;
    ref.sr.textContent = texto;
  }

  /**
   * Ajusta o HUD ao espaço que existe, medindo em vez de adivinhar.
   *
   * Duas passadas. Na primeira, mede SEM o modo compacto: se alguma coluna
   * transborda, liga `.palco-compacto`, que esconde a prosa secundária dos
   * cards (o CSS decide o quê). Na segunda, marca com esmaecimento a coluna
   * que ainda assim sobra, para ficar claro que rola.
   *
   * Por que não um `@media (max-height:...)`: a altura que basta em português
   * não basta em espanhol, onde o mesmo texto ocupa mais linhas. E remover
   * sempre o compacto antes de medir evita a histerese — a decisão é tomada
   * do zero a cada resize, nunca em cima do estado anterior.
   */
  function marcarRolagemDoHud() {
    if (!overlay) return;
    const colunas = [ref.hudEsq, ref.hudDir].filter(Boolean);
    const transborda = () => colunas.some((h) => h.scrollHeight > h.clientHeight + 1);

    overlay.classList.remove('palco-compacto');
    if (transborda()) overlay.classList.add('palco-compacto');

    colunas.forEach((h) => {
      h.classList.toggle('palco-hud-rola', h.scrollHeight > h.clientHeight + 1);
    });
  }

  // ————— textos dependentes de idioma (reaplicados a cada abertura) —————

  function aplicarTextos() {
    ref.titulo.textContent = cfg.titulo();
    ref.fechar.setAttribute('aria-label', tp('voltar'));
    ref.fechar.querySelector('.fechar-texto').textContent = `‹ ${tp('voltar')}`;
    ref.scrubber.setAttribute('aria-label', tp('linhaDoTempo'));
    ref.selo.textContent = tp('foraDeEscala');
    ref.selo.title = tp('foraDeEscala');
    ref.escala.textContent = tp('verEscalaReal');
    ref.roteiroPular.textContent = tp('pular');
    ref.roteiroProximo.textContent = tp('proximo');
    atualizarBotaoPlay();
  }

  function atualizarBotaoPlay() {
    ref.play.textContent = tocando ? '⏸' : '▶';
    ref.play.setAttribute('aria-label', tocando ? tp('pausar') : tp('tocar'));
  }

  function alternarPlay() {
    tocando = !tocando;
    atualizarBotaoPlay();
  }

  // ————— "ver em escala real" (SPEC §7.2) —————
  //
  // O ida-e-volta é o ponto: em escala real o efeito literalmente some da tela,
  // e é isso que torna o exagero honesto em vez de mentiroso.
  let escalaRealAtiva = false;
  function mostrarEscalaReal() {
    if (!cena || !cena.escalaReal || escalaRealAtiva) return;
    escalaRealAtiva = true;
    ref.escala.disabled = true;
    const encerrar = cena.escalaReal();
    const legendaAnterior = ref.legenda.textContent;
    setTimeout(() => {
      if (typeof encerrar === 'function') encerrar();
      ref.legenda.textContent = legendaAnterior;
      ref.escala.disabled = false;
      escalaRealAtiva = false;
    }, movimentoReduzido() ? 6000 : 4500);
  }

  // ————— roteiro guiado (SPEC §4.4) —————

  function iniciarRoteiro() {
    passos = (cfg.roteiro && cfg.roteiro()) || [];
    if (!passos.length) return encerrarRoteiro();
    passoAtual = -1;
    ref.roteiro.hidden = false;
    avancarRoteiro();
  }

  function avancarRoteiro() {
    passoAtual++;
    if (passoAtual >= passos.length) return encerrarRoteiro();
    const p = passos[passoAtual];
    ref.roteiroTexto.textContent = p.texto;
    ref.roteiroPasso.textContent = tp('passo')
      .replace('{n}', String(passoAtual + 1))
      .replace('{t}', String(passos.length));
    ref.roteiroProximo.textContent = passoAtual === passos.length - 1 ? tp('comecar') : tp('proximo');
    if (p.aoEntrar) p.aoEntrar();
  }

  function encerrarRoteiro() {
    ref.roteiro.hidden = true;
    passoAtual = -1;
    try {
      localStorage.setItem(CHAVE_VISTO, '1');
    } catch (e) { /* modo privado: no máximo o roteiro reaparece */ }
    if (cena && cena.aoEntrarSandbox) cena.aoEntrarSandbox();
  }

  function jaViu() {
    try {
      return localStorage.getItem(CHAVE_VISTO) === '1';
    } catch (e) {
      return false;
    }
  }

  // ————— ciclo de vida —————

  function abrir(opcoes = {}) {
    if (aberto) return;
    if (!overlay) construirOverlay();

    elementoFocoAnterior = document.activeElement;
    dataInicial = motor.getDataSimulada();
    if (opcoes.data) motor.irParaData(opcoes.data);

    // Inicializa o estado do anúncio
    ultimoAnuncio = '';
    ultimoAnuncioEm = 0;

    cena = cfg.construirCena({
      motor,
      hudEsq: ref.hudEsq,
      hudDir: ref.hudDir,
      legenda: ref.legenda,
      scrubber: ref.scrubber,
      dataInicial: motor.getDataSimulada(),
      tocando: () => tocando && !movimentoReduzido(),
      anunciar,
      rodapeAcoes: ref.rodapeAcoes,
    });

    // Quem chega por uma data específica (um solstício no painel de Eventos)
    // veio ver AQUELE instante: começar tocando o faria escapar em segundos.
    tocando = !movimentoReduzido() && !opcoes.data;
    aplicarTextos();

    motor.montarPalco({
      scene: cena.scene,
      camera: cena.camera,
      atualizar: (dt) => cena.atualizar(dt, tocando && !movimentoReduzido()),
      aoRedimensionar: cena.aoRedimensionar,
    });

    // Observador da legenda para sincronizar com aria-valuetext
    observadorLegenda = new MutationObserver(() => {
      const t = ref.legenda.textContent || '';
      if (t && ref.scrubber.getAttribute('aria-valuetext') !== t) {
        ref.scrubber.setAttribute('aria-valuetext', t);
      }
    });
    observadorLegenda.observe(ref.legenda, { childList: true, characterData: true, subtree: true });

    document.addEventListener('keydown', aoTeclar, true);
    overlay.hidden = false;
    document.body.classList.add('com-palco');
    ref.fechar.focus();
    aberto = true;

    // Marca rolagem do HUD e registra listener de resize
    // Atrasa para permitir recálculo do layout (as medidas não são precisas se
    // chamado sincronamente).
    // Duas medições: uma no quadro seguinte, quando o HUD já foi preenchido
    // pelo primeiro `atualizar`, e outra meio segundo depois — os cards ainda
    // mudam de altura quando o texto final entra (fase da Lua, estação) e a
    // fonte termina de carregar. Sem a segunda, uma tela no limite decide o
    // compacto com base numa altura que ainda ia crescer.
    requestAnimationFrame(() => requestAnimationFrame(marcarRolagemDoHud));
    setTimeout(marcarRolagemDoHud, 500);
    window.addEventListener('resize', aoRedimensionarPalco);

    if (opcoes.roteiro === false || jaViu()) encerrarRoteiro();
    else iniciarRoteiro();
  }

  function aoRedimensionarPalco() {
    marcarRolagemDoHud();
  }

  function fechar() {
    if (!aberto) return;
    document.removeEventListener('keydown', aoTeclar, true);
    window.removeEventListener('resize', aoRedimensionarPalco);

    // Desliga o observador da legenda
    if (observadorLegenda) {
      observadorLegenda.disconnect();
      observadorLegenda = null;
    }

    motor.desmontarPalco();

    // Libera o que a cena alocou. O renderer é compartilhado e sobrevive:
    // vazar aqui degrada o app inteiro, não só este modo (SPEC §2.2).
    if (cena && cena.dispose) cena.dispose();
    cena = null;

    // Limpa o ponto de extensão do rodapé
    while (ref.rodapeAcoes.firstChild) {
      ref.rodapeAcoes.removeChild(ref.rodapeAcoes.firstChild);
    }

    // Devolve o simulador exatamente ao estado anterior (SPEC §3): o ISO
    // COMPLETO, não só a data. irParaData usa Date.parse, que aceita a hora —
    // truncar em 10 caracteres devolvia o usuário à meia-noite daquele dia.
    if (dataInicial) motor.irParaData(dataInicial.toISOString());

    overlay.hidden = true;
    document.body.classList.remove('com-palco');
    aberto = false;
    if (elementoFocoAnterior && elementoFocoAnterior.focus) elementoFocoAnterior.focus();
  }

  return { abrir, fechar, get aberto() { return aberto; } };
}
