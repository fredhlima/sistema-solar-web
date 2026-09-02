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
import { getIdioma } from './i18n.js?v=30';

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

    overlay.innerHTML = `
      <div class="palco-topo">
        <h2 class="palco-titulo"></h2>
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
        <button class="palco-btn palco-escala" type="button"></button>
      </div>
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

  // ————— textos dependentes de idioma (reaplicados a cada abertura) —————

  function aplicarTextos() {
    ref.titulo.textContent = cfg.titulo();
    ref.fechar.setAttribute('aria-label', tp('voltar'));
    ref.fechar.querySelector('.fechar-texto').textContent = `‹ ${tp('voltar')}`;
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

    cena = cfg.construirCena({
      motor,
      hudEsq: ref.hudEsq,
      hudDir: ref.hudDir,
      legenda: ref.legenda,
      scrubber: ref.scrubber,
      dataInicial: motor.getDataSimulada(),
      tocando: () => tocando && !movimentoReduzido(),
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

    document.addEventListener('keydown', aoTeclar, true);
    overlay.hidden = false;
    document.body.classList.add('com-palco');
    ref.fechar.focus();
    aberto = true;

    if (opcoes.roteiro === false || jaViu()) encerrarRoteiro();
    else iniciarRoteiro();
  }

  function fechar() {
    if (!aberto) return;
    document.removeEventListener('keydown', aoTeclar, true);
    motor.desmontarPalco();

    // Libera o que a cena alocou. O renderer é compartilhado e sobrevive:
    // vazar aqui degrada o app inteiro, não só este modo (SPEC §2.2).
    if (cena && cena.dispose) cena.dispose();
    cena = null;

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
