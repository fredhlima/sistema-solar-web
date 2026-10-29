import { mareCombinada, alturaRelativa } from './mares-calc.js?v=301';

const ANGULOS = [0, 90, 180, 270];
const CAMADAS = ['lua', 'sol', 'ambos'];
const DIA_LUNAR = 24.8;
const RAD = Math.PI / 180;

const COPY = {
  pt: {
    titulo: 'Laboratório de marés', fase: ['Lua nova', 'Quarto crescente', 'Lua cheia', 'Quarto minguante'],
    lua: 'Lua', sol: 'Sol', ambos: 'Lua + Sol', camada: 'Fontes da maré', hora: 'Hora no dia lunar',
    amplitude: 'Amplitude do modelo', unidade: 'unidades relativas', nivel: 'Nível relativo no ponto', registrar: 'Registrar', comparar: 'Comparação A/B',
    vazio: 'Registre A e B para comparar duas situações.', limpar: 'Limpar comparação',
    diferente: 'Amplitude {b} {sinal} que A ({a}).', igual: 'As amplitudes de A e B são iguais.',
    nota: 'Modelo ideal do ponto na Terra: um dia lunar dura cerca de 24,8 h e tem duas preamares. Costas reais variam com a forma do litoral e do fundo do mar; este modelo não prevê alturas nem horários locais.',
    diagrama: 'Forças de maré e eixo dos bojos', curva: 'Ciclo ideal da maré',
    forcaLua: 'Força da Lua', forcaSol: 'Força do Sol', resultante: 'Eixo resultante', terra: 'Terra',
    baixa: 'baixa-mar', alta: 'preamar', h: 'h', ponto: 'Ponto observado', horaValor: '{h} h',
    essent: 'Compare Lua nova e quarto: o Sol também influencia a maré.',
    pro: 'Investigue como fase, fonte e hora mudam a amplitude do modelo.',
  },
  en: {
    titulo: 'Tide laboratory', fase: ['New moon', 'First quarter', 'Full moon', 'Last quarter'],
    lua: 'Moon', sol: 'Sun', ambos: 'Moon + Sun', camada: 'Tide sources', hora: 'Hour in lunar day',
    amplitude: 'Model amplitude', unidade: 'relative units', nivel: 'Relative level at the point', registrar: 'Record', comparar: 'A/B comparison',
    vazio: 'Record A and B to compare two situations.', limpar: 'Clear comparison',
    diferente: 'Amplitude {b} is {sinal} than A ({a}).', igual: 'A and B have the same amplitude.',
    nota: 'Ideal model for a point on Earth: a lunar day lasts about 24.8 h and has two high tides. Real coasts vary with shoreline and seafloor shape; this model predicts no local heights or times.',
    diagrama: 'Tidal forces and bulge axis', curva: 'Ideal tide cycle',
    forcaLua: 'Moon force', forcaSol: 'Sun force', resultante: 'Resultant axis', terra: 'Earth',
    baixa: 'low tide', alta: 'high tide', h: 'h', ponto: 'Observed point', horaValor: '{h} h',
    essent: 'Compare new moon and quarter: the Sun also influences tides.',
    pro: 'Explore how phase, source, and hour change model amplitude.',
  },
  es: {
    titulo: 'Laboratorio de mareas', fase: ['Luna nueva', 'Cuarto creciente', 'Luna llena', 'Cuarto menguante'],
    lua: 'Luna', sol: 'Sol', ambos: 'Luna + Sol', camada: 'Fuentes de la marea', hora: 'Hora del día lunar',
    amplitude: 'Amplitud del modelo', unidade: 'unidades relativas', nivel: 'Nivel relativo en el punto', registrar: 'Registrar', comparar: 'Comparación A/B',
    vazio: 'Registra A y B para comparar dos situaciones.', limpar: 'Borrar comparación',
    diferente: 'La amplitud de B ({b}) es {sinal} que A ({a}).', igual: 'Las amplitudes de A y B son iguales.',
    nota: 'Modelo ideal de un punto en la Tierra: un día lunar dura unas 24,8 h y tiene dos pleamares. Las costas reales varían según la forma del litoral y del fondo marino; este modelo no predice alturas ni horarios locales.',
    diagrama: 'Fuerzas de marea y eje de los abultamientos', curva: 'Ciclo ideal de marea',
    forcaLua: 'Fuerza de la Luna', forcaSol: 'Fuerza del Sol', resultante: 'Eje resultante', terra: 'Tierra',
    baixa: 'bajamar', alta: 'pleamar', h: 'h', ponto: 'Punto observado', horaValor: '{h} h',
    essent: 'Compara luna nueva y cuarto: el Sol también influye en la marea.',
    pro: 'Investiga cómo la fase, la fuente y la hora cambian la amplitud del modelo.',
  },
};

function camadaValida(value) { return CAMADAS.includes(value) ? value : 'ambos'; }
function numeroFinito(value, fallback) { return Number.isFinite(Number(value)) ? Number(value) : fallback; }

function validarMedicao(value) {
  if (!value || !ANGULOS.includes(Number(value.angulo)) || !CAMADAS.includes(value.camada)) return null;
  const hora = Number(value.hora);
  if (!Number.isFinite(hora) || hora < 0 || hora > DIA_LUNAR) return null;
  const camada = value.camada;
  const { amplitude } = calcular(Number(value.angulo), camada, hora);
  return { angulo: Number(value.angulo), camada, hora: Math.round(hora * 10) / 10, amplitude };
}

export function normalizarEstadoMares(value = {}) {
  if (!value || typeof value !== 'object') value = {};
  const angulo = ANGULOS.includes(Number(value.angulo)) ? Number(value.angulo) : 0;
  const camada = camadaValida(value.camada);
  const hora = Math.round(Math.min(DIA_LUNAR, Math.max(0, numeroFinito(value.hora, 0))) * 10) / 10;
  return { angulo, camada, hora, medicoes: { a: validarMedicao(value.medicoes?.a), b: validarMedicao(value.medicoes?.b) } };
}

function calcular(angulo, camada, hora) {
  const lua = mareCombinada(angulo, 0, 1, 0);
  const sol = mareCombinada(angulo, 0, 0, 1);
  const combinada = mareCombinada(angulo, 0);
  const result = camada === 'lua' ? lua : camada === 'sol' ? sol : combinada;
  // O ponto gira sob o eixo resultante; a fase da Lua também muda a posição
  // dos bojos. A curva e o marcador devem usar o mesmo ângulo relativo.
  const psi = hora / DIA_LUNAR * 360 - result.eixoGraus;
  return { lua, sol, combinada, result, psi, nivel: alturaRelativa(psi, result.amplitude), amplitude: result.amplitude };
}

export function criarLaboratorioMares({ host, config, idioma = 'pt', estadoSalvo, aoMudar }) {
  const lang = COPY[idioma] ? idioma : 'pt';
  const c = COPY[lang];
  const modo = config?.modo === 'investigar' ? 'investigar' : 'essencial';
  const essencial = modo === 'essencial';
  const saved = normalizarEstadoMares({ ...config, ...estadoSalvo });
  let angulo = essencial ? ([0, 90].includes(saved.angulo) ? saved.angulo : 0) : saved.angulo;
  let camada = essencial ? 'ambos' : saved.camada;
  let hora = essencial ? 0 : saved.hora;
  let medicoes = essencial ? { a: null, b: null } : saved.medicoes;
  let disposed = false;

  const el = (tag, cls, content) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (content !== undefined) n.textContent = content;
    return n;
  };
  const svgEl = (tag, attrs = {}) => {
    const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, value] of Object.entries(attrs)) n.setAttribute(key, String(value));
    return n;
  };
  const element = el('section', 'aprendizado-modelo aprendizado-experimento mares-laboratorio');
  element.dataset.modo = modo;
  element.setAttribute('aria-label', c.titulo);
  const heading = el('h3', null, c.titulo);
  const intro = el('p', 'mares-intro', essencial ? c.essent : c.pro);
  const diagram = svgEl('svg', { viewBox: '0 0 440 240', role: 'img', 'aria-label': c.diagrama, class: 'mares-diagrama' });
  const chart = svgEl('svg', { viewBox: '0 0 440 132', role: 'img', 'aria-label': c.curva, class: 'mares-curva' });
  const legend = el('div', 'mares-legenda');
  const status = el('p', 'mares-estado');
  const controls = el('div', 'mares-controles');
  const phases = el('div', 'experimento-presets mares-fases');
  const sourceChoices = el('div', 'mares-camadas');
  let hourInput, hourOutput, compare, clear;
  element.append(heading, intro, controls, status, diagram, legend, chart);
  controls.append(phases);

  const phaseButtons = new Map();
  for (const a of (essencial ? [0, 90] : ANGULOS)) {
    const b = el('button', null, c.fase[a / 90]);
    b.type = 'button'; b.dataset.fase = String(a);
    b.addEventListener('click', () => { angulo = a; render(true); });
    phases.append(b); phaseButtons.set(a, b);
  }
  if (!essencial) {
    const layerTitle = el('span', 'mares-label', c.camada);
    controls.append(layerTitle, sourceChoices);
    for (const key of CAMADAS) {
      const b = el('button', null, c[key]);
      b.type = 'button'; b.dataset.camada = key;
      b.addEventListener('click', () => { camada = key; render(true); });
      sourceChoices.append(b);
    }
    const label = el('label', 'mares-hora');
    hourInput = el('input'); hourInput.type = 'range'; hourInput.min = '0'; hourInput.max = String(DIA_LUNAR); hourInput.step = '0.1'; hourInput.dataset.hora = '';
    hourOutput = el('output'); label.append(el('span', null, c.hora), hourInput, hourOutput); controls.append(label);
    hourInput.addEventListener('input', () => { hora = Number(hourInput.value); render(true); });

    const actions = el('div', 'mares-registros');
    for (const key of ['a', 'b']) {
      const b = el('button', null, `${c.registrar} ${key.toUpperCase()}`);
      b.type = 'button'; b.dataset.registrar = key;
      b.addEventListener('click', () => { medicoes[key] = snapshot(); render(true); });
      actions.append(b);
    }
    compare = el('div', 'mares-comparacao'); compare.dataset.comparacao = ''; compare.setAttribute('role', 'status'); compare.setAttribute('aria-live', 'polite');
    clear = el('button', 'mares-limpar', c.limpar); clear.type = 'button';
    clear.addEventListener('click', () => { medicoes = { a: null, b: null }; render(true); });
    element.append(actions, compare, clear);
  }
  const note = el('p', 'experimento-nota mares-nota', c.nota);
  element.append(note);
  host.append(element);

  function snapshot() {
    const amplitude = calcular(angulo, camada, hora).amplitude;
    return { angulo, camada, hora: Math.round(hora * 10) / 10, amplitude };
  }
  function fmt(n) { return n.toLocaleString(lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US', { maximumFractionDigits: 2 }); }
  function setText(node, value) { node.textContent = value; }

  function drawDiagram(model) {
    diagram.replaceChildren();
    const defs = svgEl('defs');
    for (const [id, color] of [['moon-arrow', '#a9d9ff'], ['sun-arrow', '#ffd16e'], ['result-arrow', '#69d9c2']]) {
      const marker = svgEl('marker', { id, markerWidth: 8, markerHeight: 8, refX: 6, refY: 3, orient: 'auto' });
      marker.append(svgEl('path', { d: 'M0,0 L0,6 L7,3 z', fill: color })); defs.append(marker);
    }
    diagram.append(defs);
    const cx = 220, cy = 99;
    diagram.append(svgEl('circle', { cx, cy, r: 49, class: 'mares-terra' }));
    const moonAngle = -angulo * RAD;
    const mx = cx + Math.cos(moonAngle) * 145, my = cy + Math.sin(moonAngle) * 74;
    const sx = 414, sy = 99;
    diagram.append(svgEl('circle', { cx: mx, cy: my, r: 19, class: 'mares-lua' }));
    diagram.append(svgEl('circle', { cx: sx, cy: sy, r: 15, class: 'mares-sol' }));
    const line = (x1, y1, x2, y2, cls, marker) => diagram.append(svgEl('line', { x1, y1, x2, y2, class: cls, 'marker-end': `url(#${marker})` }));
    const moonAxis = model.lua.eixoGraus * RAD, solAxis = model.sol.eixoGraus * RAD, resultAxis = model.result.eixoGraus * RAD;
    line(cx, cy, cx + Math.cos(moonAxis) * 68, cy - Math.sin(moonAxis) * 34, 'mares-vetor-lua', 'moon-arrow');
    line(cx, cy + 10, cx + Math.cos(solAxis) * 68, cy + 10 - Math.sin(solAxis) * 34, 'mares-vetor-sol', 'sun-arrow');
    line(cx, cy - 10, cx + Math.cos(resultAxis) * 90, cy - 10 - Math.sin(resultAxis) * 45, 'mares-vetor-resultante', 'result-arrow');
    const text = (value, x, y, cls = '') => { const t = svgEl('text', { x, y, class: cls }); t.textContent = value; diagram.append(t); };
    text(c.lua, mx, my + 34); text(c.sol, sx, sy + 30); text(c.terra, cx, cy + 4, 'mares-terra-label');
    text(c.forcaLua, 22, 26, 'mares-svg-label'); text(c.forcaSol, 157, 26, 'mares-svg-label'); text(c.resultante, 298, 26, 'mares-svg-label');
    // Dois bojos opostos: o polinômio de grau 2 tem máximos separados por 180°.
    for (const sign of [-1, 1]) diagram.append(svgEl('ellipse', { cx: cx + sign * Math.cos(resultAxis) * 51, cy: cy - sign * Math.sin(resultAxis) * 25, rx: 13, ry: 8, transform: `rotate(${-model.result.eixoGraus} ${cx + sign * Math.cos(resultAxis) * 51} ${cy - sign * Math.sin(resultAxis) * 25})`, class: 'mares-bojo' }));
    const pontoAngulo = hora / DIA_LUNAR * 360 * RAD;
    const px = cx + Math.cos(pontoAngulo) * 64, py = cy - Math.sin(pontoAngulo) * 34;
    diagram.append(svgEl('circle', { cx: px, cy: py, r: 6, class: 'mares-ponto' }));
    text(c.ponto, Math.min(380, Math.max(55, px)), Math.max(218, py - 11), 'mares-svg-small');
  }

  function drawChart(model) {
    chart.replaceChildren();
    const left = 38, right = 425, top = 18, bottom = 101;
    const line = (x1, y1, x2, y2, cls) => chart.append(svgEl('line', { x1, y1, x2, y2, class: cls }));
    line(left, top, left, bottom, 'mares-eixo'); line(left, bottom, right, bottom, 'mares-eixo');
    const yMin = -model.amplitude * .5, yMax = model.amplitude;
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const h = DIA_LUNAR * i / 80;
      const level = alturaRelativa(h / DIA_LUNAR * 360 - model.result.eixoGraus, model.amplitude);
      const x = left + (right - left) * h / DIA_LUNAR;
      const y = bottom - (level - yMin) / (yMax - yMin) * (bottom - top);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    chart.append(svgEl('polyline', { points: pts.join(' '), class: 'mares-curva-linha' }));
    const x = left + (right - left) * hora / DIA_LUNAR;
    const level = model.nivel;
    const y = bottom - (level - yMin) / (yMax - yMin) * (bottom - top);
    chart.append(svgEl('line', { x1: x, y1: top, x2: x, y2: bottom, class: 'mares-tempo-marcador' }));
    chart.append(svgEl('circle', { cx: x, cy: y, r: 5, class: 'mares-tempo-ponto' }));
    const text = (value, tx, ty, cls = '') => { const t = svgEl('text', { x: tx, y: ty, class: cls }); t.textContent = value; chart.append(t); };
    text('0', left, 119); text(`${fmt(DIA_LUNAR / 2)} ${c.h}`, (left + right) / 2, 119); text(`${fmt(DIA_LUNAR)} ${c.h}`, right, 119);
    text(c.alta, 7, 27, 'mares-chart-label'); text(c.baixa, 4, 96, 'mares-chart-label');
    chart.setAttribute('aria-label', `${c.curva}. ${c.horaValor.replace('{h}', fmt(hora))}; ${c.amplitude}: ${fmt(model.amplitude)} ${c.unidade}.`);
  }

  function render(save = false) {
    if (disposed) return;
    const model = calcular(angulo, camada, hora);
    drawDiagram(model); drawChart(model);
    legend.replaceChildren();
    for (const [key, color, label] of [['lua', '#a9d9ff', c.lua], ['sol', '#ffd16e', c.sol], ['ambos', '#69d9c2', c.resultante]]) {
      const item = el('span', `mares-legenda-${key}`); const swatch = el('i'); swatch.setAttribute('aria-hidden', 'true'); item.append(swatch, document.createTextNode(label)); legend.append(item);
    }
    status.textContent = `${c.amplitude}: ${fmt(model.amplitude)} ${c.unidade} · ${c.nivel}: ${fmt(model.nivel)}`;
    for (const [a, b] of phaseButtons) b.setAttribute('aria-pressed', String(angulo === a));
    if (!essencial) {
      for (const b of sourceChoices.children) b.setAttribute('aria-pressed', String(b.dataset.camada === camada));
      hourInput.value = String(hora);
      hourOutput.textContent = c.horaValor.replace('{h}', fmt(hora));
      hourInput.setAttribute('aria-label', `${c.hora}: ${fmt(hora)} ${c.h}`);
      hourInput.setAttribute('aria-valuetext', `${fmt(hora)} ${c.h}`);
      clear.hidden = !medicoes.a && !medicoes.b;
      compare.replaceChildren(el('strong', null, c.comparar));
      if (medicoes.a && medicoes.b) {
        const delta = medicoes.b.amplitude - medicoes.a.amplitude;
        const msg = Math.abs(delta) < .005 ? c.igual : c.diferente.replace('{b}', fmt(medicoes.b.amplitude)).replace('{a}', fmt(medicoes.a.amplitude)).replace('{sinal}', lang === 'en' ? (delta > 0 ? 'greater' : 'less') : lang === 'es' ? (delta > 0 ? 'mayor' : 'menor') : (delta > 0 ? 'maior' : 'menor'));
        compare.append(el('p', null, msg));
        for (const key of ['a', 'b']) {
          const m = medicoes[key];
          compare.append(el('p', null, `${key.toUpperCase()} · ${c.fase[m.angulo / 90]} · ${c[m.camada]} · ${fmt(m.hora)} ${c.h} · ${fmt(m.amplitude)} ${c.unidade}`));
        }
      } else compare.append(el('p', null, c.vazio));
    }
    if (save) aoMudar?.({ angulo, camada, hora, medicoes: { a: medicoes.a && { ...medicoes.a }, b: medicoes.b && { ...medicoes.b } } });
  }
  render();
  return {
    element,
    inspect: () => ({ tipo: 'mares-oceano', modo, angulo, camada, hora, amplitude: calcular(angulo, camada, hora).amplitude, nivel: calcular(angulo, camada, hora).nivel, medicoes: { a: medicoes.a && { ...medicoes.a }, b: medicoes.b && { ...medicoes.b } } }),
    dispose() { if (disposed) return; disposed = true; element.remove(); },
  };
}
