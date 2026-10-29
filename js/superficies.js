// Representações artísticas, NÃO mapas cartográficos/shape models de sondas.
// Ruído e feições amostrados na esfera 3D: sem emenda UV ou pinçamento polar.
// Perfis e referências: texturas/README.md. Sem side effects de import.
export const PERFIS_SUPERFICIE = {
  titania: { cores: ['#938a83', '#c8c0b8', '#514d49'], crateras: 64, fraturas: 3 },
  miranda: { cores: ['#99968f', '#d3cec1', '#565653'], crateras: 34, coronas: true },
  ariel: { cores: ['#b2b1ad', '#e0ddd4', '#777773'], crateras: 24, fraturas: 7 },
  umbriel: { cores: ['#575652', '#83817a', '#2f302f'], crateras: 80, anelClaro: true },
  oberon: { cores: ['#8c827c', '#bdb4aa', '#514943'], crateras: 78, fraturas: 2 },
  tritao: { cores: ['#c4b4ad', '#ebe1d3', '#9b7e79'], crateras: 0, celular: true, calota: true },
  caronte: { cores: ['#aaa9a7', '#d4d0c8', '#656662'], crateras: 42, fraturas: 3, poloVermelho: true },
  vesta: { cores: ['#938b80', '#c2b9a8', '#57554f'], crateras: 64, baciaSul: true },
  palas: { cores: ['#666969', '#979a96', '#363a3c'], crateras: 88 },
  eros: { cores: ['#968674', '#c4b6a0', '#5c534b'], crateras: 52, pedregulhos: 18 },
  bennu: { cores: ['#48494a', '#737573', '#27282a'], crateras: 8, pedregulhos: 110 },
  apofis: { cores: ['#817668', '#ada08c', '#494440'], crateras: 48, pedregulhos: 32 },
  halley: { cores: ['#211b17', '#665d50', '#0b0908'], crateras: 18, pedregulhos: 28, gelo: true },
  'hale-bopp': { cores: ['#24201b', '#766b5a', '#100d0b'], crateras: 24, pedregulhos: 22, gelo: true },
  '67p': { cores: ['#272521', '#716b5e', '#100e0c'], crateras: 26, pedregulhos: 46, gelo: true, fraturas: 4 },
};

// Eixos relativos estilizados; a geometria é normalizada pelo volume.
// Só corpos reconhecidamente não esféricos: luas grandes continuam redondas.
export const PERFIS_FORMA = {
  fobos: { eixos: [1.25, 1.05, 0.9], relevo: 0.11, cratera: true },
  deimos: { eixos: [1.3, 1, 0.85], relevo: 0.08 },
  vesta: { eixos: [1.08, 0.88, 1], relevo: 0.045, baciaSul: true },
  palas: { eixos: [1.06, 0.91, 1], relevo: 0.06 },
  eros: { eixos: [2.4, 0.8, 0.75], relevo: 0.14, cintura: 0.14 },
  bennu: { eixos: [1, 0.9, 1], relevo: 0.055, piao: true },
  apofis: { eixos: [1.85, 0.85, 0.8], relevo: 0.12, cintura: 0.32 },
  haumea: { eixos: [1.65, 0.7, 1], relevo: 0 },
  '67p': { eixos: [1.65, 0.9, 0.8], relevo: 0.095, cintura: 0.57, lobos: true },
};

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const suavizar = t => t * t * (3 - 2 * t);
const gauss = t => Math.exp(-t * t);
function hash(x, y, z, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 2147483647) ^ seed;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
const seedCorpo = id => [...id].reduce((s, c) => Math.imul(s ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
function ruido(x, y, z, seed) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const u = suavizar(x - ix), v = suavizar(y - iy), w = suavizar(z - iz);
  const lerp = (a, b, t) => a + (b - a) * t;
  const plano = dz => lerp(
    lerp(hash(ix, iy, iz + dz, seed), hash(ix + 1, iy, iz + dz, seed), u),
    lerp(hash(ix, iy + 1, iz + dz, seed), hash(ix + 1, iy + 1, iz + dz, seed), u), v);
  return lerp(plano(0), plano(1), w) * 2 - 1;
}

export function deformarSuperficie(id, x, y, z) {
  const p = PERFIS_FORMA[id];
  if (!p) return [x, y, z];
  const seed = seedCorpo(id);
  let r = 1 + p.relevo * (ruido(x * 3, y * 3, z * 3, seed) + 0.35 * ruido(x * 8, y * 8, z * 8, seed));
  if (p.baciaSul) r *= 1 - 0.18 * gauss((y + 0.88) / 0.26);
  if (p.cratera) r *= 1 - 0.2 * Math.exp(-((x - 0.5) ** 2 + (y - 0.35) ** 2 + (z - 0.79) ** 2) / 0.07);
  const normalizar = Math.cbrt(p.eixos.reduce((a, b) => a * b, 1));
  let cintura = 1 - (p.cintura || 0) * gauss((x + 0.07) / 0.3);
  if (p.lobos) cintura *= 1 - 0.15 * x; // cabeça menor que corpo, pescoço contínuo
  if (p.piao) cintura *= 1 + 0.18 * gauss(y / 0.25) - 0.13 * Math.abs(y);
  return [x * r * p.eixos[0] / normalizar * (p.piao ? cintura : 1),
    y * r * p.eixos[1] / normalizar * (p.piao ? 1 : cintura),
    z * r * p.eixos[2] / normalizar * cintura];
}

function rgb(hex) { return [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)); }
function preparar(id) {
  const p = PERFIS_SUPERFICIE[id], seed = seedCorpo(id);
  const feicoes = [];
  for (let i = 0; i < p.crateras + (p.pedregulhos || 0); i++) {
    const y = hash(i, 0, 0, seed) * 2 - 1;
    const a = hash(i, 1, 0, seed) * Math.PI * 2, r = Math.sqrt(1 - y * y);
    const pedra = i >= p.crateras;
    const raio = pedra ? 0.014 + hash(i, 2, 0, seed) * 0.035 : 0.025 + hash(i, 2, 0, seed) ** 3 * 0.14;
    feicoes.push({ x: r * Math.cos(a), y, z: r * Math.sin(a), raio, limite: Math.cos(raio), pedra });
  }
  return { p, seed, feicoes, cores: p.cores.map(rgb) };
}
const preparados = new Map();

// Ponto unitário na superfície. Exportado para validar emendas/polos sem DOM.
export function amostrarSuperficie(id, x, y, z) {
  if (!PERFIS_SUPERFICIE[id]) return null;
  if (!preparados.has(id)) preparados.set(id, preparar(id));
  const { p, seed, feicoes, cores } = preparados.get(id);
  const grande = ruido(x * 4, y * 4, z * 4, seed);
  const medio = ruido(x * 15, y * 15, z * 15, seed + 17);
  const fino = ruido(x * 65, y * 65, z * 65, seed + 31);
  let tom = grande * 0.58 + medio * 0.26 + fino * 0.16;
  let relevo = 1 + fino * 0.055;
  for (const f of feicoes) {
    const dot = x * f.x + y * f.y + z * f.z;
    if (dot < f.limite) continue;
    const d = Math.sqrt(clamp((1 - dot) / (1 - f.limite)));
    if (f.pedra) relevo += (1 - d) * 0.38;
    else relevo += 0.26 * gauss((d - 0.83) / 0.11) - 0.3 * (1 - suavizar(d));
  }
  if (p.fraturas) {
    for (let i = 0; i < p.fraturas; i++) {
      const a = i * 2.399 + (seed % 100) / 50;
      const linha = x * Math.cos(a) + z * Math.sin(a) + y * 0.22 + medio * 0.08;
      relevo -= 0.23 * gauss(linha / 0.015);
    }
  }
  if (p.coronas) {
    const faixa = Math.abs(ruido(x * 2.8, y * 2.8, z * 2.8, seed + 81));
    const degrau = Math.sin(faixa * 95 + medio * 0.8);
    if (faixa < 0.34) { tom += degrau * 0.16; relevo += degrau * 0.13; }
  }
  if (p.celular) relevo += Math.exp(-Math.abs(medio) * 38) * 0.22;
  if (p.baciaSul) relevo -= 0.22 * gauss((y + 0.92) / 0.22);
  if (p.gelo) tom = Math.max(tom, clamp((medio - 0.35) * 2) * 0.7);
  const alvo = cores[tom >= 0 ? 1 : 2];
  const mistura = clamp(Math.abs(tom) * 1.6);
  let cor = cores[0].map((c, i) => (c + (alvo[i] - c) * mistura) * relevo);
  if (p.calota) {
    const k = suavizar(clamp((-y - 0.48 + grande * 0.1) / 0.28));
    cor = cor.map((c, i) => c + ([236, 224, 215][i] - c) * k);
  }
  if (p.poloVermelho) {
    const k = suavizar(clamp((y - 0.63 + grande * 0.1) / 0.24));
    cor = cor.map((c, i) => c + ([100, 57, 43][i] - c) * k);
  }
  if (p.anelClaro) {
    const d = Math.hypot(x - 0.2, y - 0.74, z - 0.642);
    const k = gauss((d - 0.13) / 0.018) * 0.75;
    cor = cor.map(c => c + (194 - c) * k);
  }
  return cor.map(c => Math.round(clamp(c, 0, 255)));
}

export function criarTexturaSuperficie(corpo, largura = 512) {
  if (!PERFIS_SUPERFICIE[corpo.id]) return null;
  const canvas = document.createElement('canvas');
  canvas.width = largura; canvas.height = largura / 2;
  const ctx = canvas.getContext('2d'), imagem = ctx.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    const latitude = y / (canvas.height - 1) * Math.PI;
    const sy = Math.cos(latitude), r = Math.sin(latitude);
    for (let x = 0; x < canvas.width; x++) {
      const longitude = x / (canvas.width - 1) * Math.PI * 2;
      const cor = amostrarSuperficie(corpo.id, -r * Math.cos(longitude), sy, r * Math.sin(longitude));
      const i = (y * canvas.width + x) * 4;
      imagem.data.set([...cor, 255], i);
    }
  }
  ctx.putImageData(imagem, 0, 0);
  return canvas;
}
