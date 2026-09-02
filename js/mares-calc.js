// Cálculos das marés — funções puras, SEM dependência de Three.js, DOM ou
// i18n, para que `tests/validacao-mares.mjs` possa importá-las em node.
// Ver SPEC-estacoes-e-mares.md §5.2 e §11.2.
//
// LIMITE DELIBERADO (SPEC §1): nada aqui devolve altura em metros nem horário
// de preamar de um porto. A altura real depende dos constituintes harmônicos
// daquele lugar — com a mesma Lua, a Baía de Fundy tem ~16 m e o Mediterrâneo
// ~20 cm. O que se calcula é a FORÇA relativa (adimensional) e o RITMO.
import { diasDesdeJ2000, longitudeSolar } from './estacoes-calc.js?v=2';

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

export { diasDesdeJ2000, longitudeSolar };

// —— Constantes físicas, para derivar a razão Sol/Lua em vez de embutir 0,46 ——
export const MASSA_LUA_KG = 7.342e22;
export const MASSA_SOL_KG = 1.989e30;
export const DIST_LUA_M = 3.844e8;
export const DIST_SOL_M = 1.496e11;

/**
 * Amplitude da maré de um corpo, relativa à da Lua.
 *
 * A força de maré é DIFERENCIAL: não é a gravidade do corpo, é o quanto ela
 * muda entre o lado próximo, o centro e o lado distante da Terra. Por isso cai
 * com 1/r³, e não com 1/r² — e por isso a Lua, muito menor, vence o Sol.
 */
export function amplitudeRelativa(massaKg, distanciaM) {
  const doCorpo = massaKg / Math.pow(distanciaM, 3);
  const daLua = MASSA_LUA_KG / Math.pow(DIST_LUA_M, 3);
  return doCorpo / daLua;
}

export const A_LUA = 1;
export const A_SOL = amplitudeRelativa(MASSA_SOL_KG, DIST_SOL_M);   // ≈ 0,46

// —— Movimento da Lua (fórmulas de baixa precisão, erro ~1°) ——

/** Longitude eclíptica da Lua, em graus [0,360). */
export function longitudeLunar(n) {
  const L = 218.316 + 13.176396 * n;                 // longitude média
  const M = (134.963 + 13.064993 * n) * RAD;         // anomalia média
  const F = (93.272 + 13.229350 * n) * RAD;          // argumento da latitude
  const lambda = L + 6.289 * Math.sin(M) - 1.274 * Math.sin(M - 2 * F);
  return ((lambda % 360) + 360) % 360;
}

/**
 * Diferença de longitude entre a Lua e o Sol, em graus [0,360).
 * É a fase da Lua: 0° = nova, 90° = quarto crescente, 180° = cheia.
 */
export function elongacao(n) {
  return ((longitudeLunar(n) - longitudeSolar(n)) % 360 + 360) % 360;
}

/** Fração iluminada do disco lunar, de 0 (nova) a 1 (cheia). */
export function fracaoIluminada(n) {
  return (1 - Math.cos(elongacao(n) * RAD)) / 2;
}

/** Nome da fase, em 8 divisões. */
export function nomeDaFase(n) {
  const d = elongacao(n);
  const i = Math.floor(((d + 22.5) % 360) / 45);
  return ['nova', 'crescenteConcava', 'quartoCrescente', 'crescenteGibosa',
    'cheia', 'minguanteGibosa', 'quartoMinguante', 'minguanteConcava'][i];
}

/**
 * Composição das marés da Lua e do Sol.
 *
 * A maré é um harmônico de grau 2 — dois bojos, simetria de 180° — então cada
 * contribuição entra como um vetor de ÂNGULO DUPLO. Somados, dão a amplitude
 * resultante e a direção do eixo dos bojos. É por isso que a maré de sizígia
 * não é a simples soma 1 + 0,46: é |v|, com os dois vetores alinhados.
 *
 * Devolve { amplitude, eixoGraus }, com eixoGraus na mesma convenção de
 * longitude eclíptica usada no resto do app.
 */
export function mareCombinada(lambdaLua, lambdaSol) {
  const x = A_LUA * Math.cos(2 * lambdaLua * RAD) + A_SOL * Math.cos(2 * lambdaSol * RAD);
  const y = A_LUA * Math.sin(2 * lambdaLua * RAD) + A_SOL * Math.sin(2 * lambdaSol * RAD);
  const amplitude = Math.hypot(x, y);
  const eixoGraus = ((Math.atan2(y, x) * DEG) / 2 + 360) % 360;
  return { amplitude, eixoGraus };
}

/** Atalho: a maré combinada numa data. */
export function mareEm(n) {
  return mareCombinada(longitudeLunar(n), longitudeSolar(n));
}

/**
 * Altura relativa da maré num ponto, pelo polinômio de Legendre de grau 2.
 * ψ é o ângulo entre o ponto e o eixo dos bojos.
 *
 * Máxima em ψ=0° E em ψ=180°: os DOIS bojos saem da mesma fórmula. É a
 * resposta rigorosa para "por que tem maré alta também do lado oposto à Lua".
 */
export function alturaRelativa(psiGraus, amplitude = 1) {
  const c = Math.cos(psiGraus * RAD);
  return amplitude * (3 * c * c - 1) / 2;
}

// —— Ritmo ——

export const DIA_SIDERAL_HORAS = 23.9345;
export const MES_SINODICO_DIAS = 29.530589;
const TAXA_LUA_GRAUS_HORA = 13.176396 / 24;

/**
 * Intervalo entre duas preamares, em horas. Não é 12 h porque, enquanto a
 * Terra gira, a Lua também avança na órbita: a Terra precisa girar um pouco
 * mais para reencontrá-la. Derivado, não embutido — o teste confere que dá
 * os ~12h25min conhecidos.
 */
export function intervaloEntrePreamaresHoras() {
  const taxaTerra = 360 / DIA_SIDERAL_HORAS;
  return 180 / (taxaTerra - TAXA_LUA_GRAUS_HORA);
}

/** Duração do dia lunar, em horas (~24h50min). */
export function diaLunarHoras() {
  return 2 * intervaloEntrePreamaresHoras();
}

/** Formata horas decimais como "12h25". */
export function formatarHoras(horas) {
  const h = Math.floor(horas);
  const m = Math.round((horas - h) * 60);
  return `${h}h${String(m).padStart(2, '0')}`;
}
