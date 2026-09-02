// Cálculos das estações — funções puras, SEM dependência de Three.js, DOM ou
// i18n, para que `tests/validacao-estacoes.mjs` possa importá-las em node.
// Ver SPEC-estacoes-e-mares.md §4.3 e §11.2.
//
// As fórmulas de posição solar são as de baixa precisão do Astronomical
// Almanac (precisão ~0,01° entre 1950 e 2050) — muito além do necessário para
// um diorama didático, e sem tabela nenhuma embarcada.

export const J2000_EPOCH = new Date('2000-01-01T12:00:00Z').getTime();
export const OBLIQUIDADE_TERRA = 23.44;

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

/** Dias (fracionários) desde J2000 para uma data. */
export function diasDesdeJ2000(data) {
  return (data.getTime() - J2000_EPOCH) / 86400000;
}

/**
 * Longitude eclíptica aparente do Sol, em graus [0,360).
 * Vale 0° no equinócio de março, 90° no solstício de junho — é o ângulo que
 * parametriza o ano inteiro no palco.
 */
export function longitudeSolar(n) {
  const L = 280.460 + 0.9856474 * n;            // longitude média
  const g = (357.528 + 0.9856003 * n) * RAD;    // anomalia média
  const lambda = L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g);
  return ((lambda % 360) + 360) % 360;
}

/** Distância Terra–Sol em UA. */
export function distanciaSolarUA(n) {
  const g = (357.528 + 0.9856003 * n) * RAD;
  return 1.00014 - 0.01671 * Math.cos(g) - 0.00014 * Math.cos(2 * g);
}

/**
 * Declinação do Sol, em graus. É a latitude onde o Sol fica a pino ao
 * meio-dia — e a causa direta das estações.
 */
export function declinacaoSolar(lambdaGraus, obliquidadeGraus = OBLIQUIDADE_TERRA) {
  const s = Math.sin(obliquidadeGraus * RAD) * Math.sin(lambdaGraus * RAD);
  return Math.asin(Math.max(-1, Math.min(1, s))) * DEG;
}

/**
 * Duração do dia claro, em horas, para uma latitude e uma declinação.
 * Devolve 24 no sol da meia-noite e 0 na noite polar.
 */
export function duracaoDoDia(latGraus, decGraus) {
  const cosH = -Math.tan(latGraus * RAD) * Math.tan(decGraus * RAD);
  if (cosH <= -1) return 24;
  if (cosH >= 1) return 0;
  return (2 / 15) * Math.acos(cosH) * DEG;
}

/**
 * Quantas vezes a mesma energia solar se espalha, ao meio-dia, comparada com
 * o Sol a pino. É a explicação física das estações: não é a distância, é o
 * ângulo — a mesma luz cobrindo mais chão aquece menos cada pedaço dele.
 * Devolve Infinity quando o Sol não chega a nascer.
 */
export function espalhamentoDaLuz(latGraus, decGraus) {
  const zenital = Math.abs(latGraus - decGraus);
  if (zenital >= 90) return Infinity;
  return 1 / Math.cos(zenital * RAD);
}

/**
 * Estação no hemisfério, a partir da longitude solar. 'norte' | 'sul'.
 *
 * TOLERÂNCIA_MARCO existe por um motivo concreto: o solstício de junho de 2026
 * cai às 08:24 UTC, então à meia-noite daquele dia λ ainda é 89,66° — e sem a
 * tolerância o app abriria o evento "Solstício de junho" anunciando PRIMAVERA.
 * Tecnicamente correto, didaticamente péssimo: ninguém ensina que o verão
 * começa às 08h24. Aqui o dia inteiro do marco pertence à estação que ele
 * inaugura, que é como a data é ensinada e como o painel de Eventos a mostra.
 */
const TOLERANCIA_MARCO = 1.0;   // ~1 dia de longitude solar

export function estacaoDoHemisferio(lambdaGraus, hemisferio) {
  const l = ((lambdaGraus + TOLERANCIA_MARCO) % 360 + 360) % 360;
  // Do ponto de vista do hemisfério norte: 0-90 primavera, 90-180 verão,
  // 180-270 outono, 270-360 inverno. O sul é o oposto exato.
  const indiceNorte = Math.floor(l / 90);
  const indice = hemisferio === 'sul' ? (indiceNorte + 2) % 4 : indiceNorte;
  return ['primavera', 'verao', 'outono', 'inverno'][indice];
}

/** Os 4 marcos do ano, pela longitude solar que os define. */
export const MARCOS = [
  { id: 'equinocio-marco', lambda: 0 },
  { id: 'solsticio-junho', lambda: 90 },
  { id: 'equinocio-setembro', lambda: 180 },
  { id: 'solsticio-dezembro', lambda: 270 },
];
