// Música de fundo espacial — ambient generativo via Web Audio (zero assets).
// Pads em acordes lentos com crossfade + sub-grave + "estrelinhas" pentatônicas
// com eco. Sonhador e inspirador, sem loop perceptível (a geração é contínua
// e os brilhos são aleatórios). Liga/desliga pelo botão ♫ na barra de ações;
// preferência persistida. O AudioContext só nasce/resume em gesto do usuário
// (política de autoplay); com a aba oculta o contexto é suspenso (bateria).
import { getIdioma } from './i18n.js?v=19';

const CHAVE_STORAGE = 'sistema-solar-musica';

const TEXTOS = {
  pt: { musicaTitulo: 'Música de fundo' },
  en: { musicaTitulo: 'Background music' },
  es: { musicaTitulo: 'Música de fondo' },
};

// Progressão sonhadora (Cmaj9 → Am add9 → Fmaj7 → G add9), voicings quentes.
// Cada acorde: [sub-grave, ...notas do pad]
const ACORDES = [
  { sub: 65.41, notas: [130.81, 196.0, 329.63, 493.88, 587.33] },   // Cmaj9
  { sub: 55.0, notas: [110.0, 164.81, 261.63, 392.0, 493.88] },     // Am(add9)
  { sub: 43.65, notas: [87.31, 130.81, 220.0, 329.63, 392.0] },     // Fmaj7
  { sub: 49.0, notas: [98.0, 146.83, 246.94, 440.0, 587.33] },      // G(add9)
];
// Estrelinhas: pentatônica de dó maior, registro agudo
const PENTATONICA = [1046.5, 1174.66, 1318.51, 1567.98, 1760.0, 2093.0];

const DURACAO_ACORDE = 14;   // segundos por acorde
const SOBREPOSICAO = 3;      // crossfade entre acordes

export function iniciarMusica() {
  let ctx = null;
  let master = null;
  let filtroPads = null;
  let delayBrilho = null;
  let tocando = false;
  let timerAgenda = null;
  let indiceAcorde = 0;
  let proximaTroca = 0;
  let proximoBrilho = 0;
  const nosAtivos = new Set();

  function tt(chave) {
    const dic = TEXTOS[getIdioma()] || TEXTOS.pt;
    return dic[chave] || TEXTOS.pt[chave] || chave;
  }

  function lerPreferencia() {
    try { return localStorage.getItem(CHAVE_STORAGE) !== 'off'; } catch (e) { return true; }
  }
  function salvarPreferencia(ligada) {
    try { localStorage.setItem(CHAVE_STORAGE, ligada ? 'on' : 'off'); } catch (e) { /* segue */ }
  }

  function montarGrafo() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    master = ctx.createGain();
    master.gain.value = 0.14;
    master.connect(ctx.destination);

    // Filtro compartilhado dos pads, com LFO lento no cutoff (respiração)
    filtroPads = ctx.createBiquadFilter();
    filtroPads.type = 'lowpass';
    filtroPads.frequency.value = 950;
    filtroPads.Q.value = 0.4;
    filtroPads.connect(master);

    // LFO vive por todo o ciclo de vida do ctx (não é uma "nota" transiente) —
    // fica fora de nosAtivos de propósito: desligar() para todo nó desse set,
    // e um oscilador do Web Audio só pode ser iniciado uma vez. Se o LFO
    // fosse parado a cada toggle ♫ off→on, a respiração do filtro morreria
    // para sempre depois do primeiro toggle (montarGrafo só roda 1x por ctx).
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGanho = ctx.createGain();
    lfoGanho.gain.value = 320;
    lfo.connect(lfoGanho).connect(filtroPads.frequency);
    lfo.start();

    // Eco espacial das estrelinhas
    delayBrilho = ctx.createDelay(1.5);
    delayBrilho.delayTime.value = 0.45;
    const retorno = ctx.createGain();
    retorno.gain.value = 0.35;
    delayBrilho.connect(retorno).connect(delayBrilho);
    const molhado = ctx.createGain();
    molhado.gain.value = 0.5;
    delayBrilho.connect(molhado).connect(master);
  }

  // Um pad = 2 osciladores levemente desafinados por nota, envelope longo
  function agendarAcorde(acorde, t) {
    const fim = t + DURACAO_ACORDE + SOBREPOSICAO;
    for (const freq of acorde.notas) {
      for (const detune of [-4, 4]) {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        osc.detune.value = detune;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.05, t + SOBREPOSICAO);
        g.gain.setValueAtTime(0.05, fim - 4);
        g.gain.exponentialRampToValueAtTime(0.0001, fim);
        osc.connect(g).connect(filtroPads);
        osc.start(t);
        osc.stop(fim + 0.1);
        nosAtivos.add(osc);
        osc.onended = () => nosAtivos.delete(osc);
      }
    }
    // Sub-grave: seno puro no fundamental
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = acorde.sub;
    const gSub = ctx.createGain();
    gSub.gain.setValueAtTime(0.0001, t);
    gSub.gain.exponentialRampToValueAtTime(0.06, t + SOBREPOSICAO);
    gSub.gain.setValueAtTime(0.06, fim - 4);
    gSub.gain.exponentialRampToValueAtTime(0.0001, fim);
    sub.connect(gSub).connect(master);
    sub.start(t);
    sub.stop(fim + 0.1);
    nosAtivos.add(sub);
    sub.onended = () => nosAtivos.delete(sub);
  }

  function agendarBrilho(t) {
    const freq = PENTATONICA[Math.floor(Math.random() * PENTATONICA.length)];
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.035, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    osc.connect(g);
    g.connect(master);
    g.connect(delayBrilho);
    osc.start(t);
    osc.stop(t + 1.7);
    nosAtivos.add(osc);
    osc.onended = () => nosAtivos.delete(osc);
  }

  // Agendador com lookahead: mantém a fila ~2s à frente do relógio de áudio
  function tickAgenda() {
    const agora = ctx.currentTime;
    while (proximaTroca < agora + 2) {
      agendarAcorde(ACORDES[indiceAcorde % ACORDES.length], proximaTroca);
      indiceAcorde++;
      proximaTroca += DURACAO_ACORDE;
    }
    while (proximoBrilho < agora + 2) {
      agendarBrilho(Math.max(proximoBrilho, agora + 0.05));
      proximoBrilho += 2.5 + Math.random() * 4.5;
    }
  }

  function ligar() {
    try {
      if (!ctx) montarGrafo();
      if (ctx.state === 'suspended') ctx.resume();
      tocando = true;
      master.gain.setTargetAtTime(0.14, ctx.currentTime, 0.5);
      indiceAcorde = 0;
      proximaTroca = ctx.currentTime + 0.1;
      proximoBrilho = ctx.currentTime + 3;
      tickAgenda();
      timerAgenda = setInterval(tickAgenda, 500);
    } catch (e) {
      console.warn('Música indisponível neste dispositivo:', e.message);
      tocando = false;
    }
  }

  function desligar() {
    tocando = false;
    if (timerAgenda) { clearInterval(timerAgenda); timerAgenda = null; }
    if (!ctx) return;
    // Fade-out suave e depois corta os osciladores agendados
    master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3);
    const fim = ctx.currentTime + 1.2;
    for (const no of nosAtivos) {
      try { no.stop(fim); } catch (e) { /* já parado */ }
    }
    nosAtivos.clear();
  }

  // Botão ♫ na barra de ações (mesmo visual dos demais botões)
  const barra = document.querySelector('.barra-acoes .grupo-utilidades') || document.querySelector('.barra-acoes');
  const btn = document.createElement('button');
  btn.className = 'botao';
  btn.id = 'btn-musica';
  btn.title = tt('musicaTitulo');
  let ligada = lerPreferencia();

  function atualizarBotao() {
    btn.textContent = ligada ? '♫' : '♪';
    btn.classList.toggle('toggle-ativo', ligada);
  }
  atualizarBotao();

  btn.onclick = () => {
    ligada = !ligada;
    salvarPreferencia(ligada);
    if (ligada) ligar(); else desligar();
    atualizarBotao();
  };
  if (barra) barra.appendChild(btn);

  // Autoplay: se a preferência é "ligada", começa no primeiro gesto
  if (ligada) {
    const aoPrimeiroGesto = () => {
      if (ligada && !tocando) ligar();
    };
    document.addEventListener('pointerdown', aoPrimeiroGesto, { once: true });
    document.addEventListener('click', aoPrimeiroGesto, { once: true });
    document.addEventListener('keydown', aoPrimeiroGesto, { once: true });
  }

  // Aba oculta: suspende o áudio (bateria); visível de novo: retoma
  document.addEventListener('visibilitychange', () => {
    if (!ctx || !tocando) return;
    if (document.hidden) ctx.suspend();
    else ctx.resume();
  });

  return {
    get tocando() { return tocando; },
    // Permite que outros módulos (ex.: js/quiz.js) reaproveitem este mesmo
    // AudioContext em vez de abrir o próprio — evita 2 contextos de áudio
    // vivos ao mesmo tempo. Retorna null se a música nunca foi iniciada.
    obterCtx: () => ctx,
  };
}
