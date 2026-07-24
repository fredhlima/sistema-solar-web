// Núcleo de internacionalização (pt = fonte; en/es = overlays com fallback).
// Contratos descritos na SPEC.md, seção EXPANSÃO V3.
import { UI_TEXTOS } from './traducoes-ui.js?v=18';

const IDIOMAS = ['pt', 'en', 'es'];
const CHAVE_STORAGE = 'sistema-solar-idioma';

function detectarIdioma() {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    if (salvo && IDIOMAS.includes(salvo)) return salvo;
  } catch (e) { /* storage indisponível */ }
  const nav = (navigator.language || 'pt').toLowerCase();
  if (nav.startsWith('en')) return 'en';
  if (nav.startsWith('es')) return 'es';
  return 'pt';
}

const idiomaAtual = detectarIdioma();

export function getIdioma() {
  return idiomaAtual;
}

export function trocarIdioma(codigo) {
  if (!IDIOMAS.includes(codigo) || codigo === idiomaAtual) return;
  try {
    localStorage.setItem(CHAVE_STORAGE, codigo);
  } catch (e) { /* segue sem persistir */ }
  window.location.reload();
}

export function t(chave, params) {
  const dic = UI_TEXTOS[idiomaAtual] || UI_TEXTOS.pt || {};
  const base = UI_TEXTOS.pt || {};
  let texto = dic[chave] !== undefined ? dic[chave] : base[chave];
  if (texto === undefined) texto = chave;
  if (params && typeof texto === 'string') {
    for (const [k, v] of Object.entries(params)) {
      texto = texto.split('{' + k + '}').join(String(v));
    }
  }
  return texto;
}

export function ordinal(n) {
  if (idiomaAtual === 'en') {
    const v = n % 100;
    if (v >= 11 && v <= 13) return n + 'th';
    return n + (['th', 'st', 'nd', 'rd'][n % 10] || 'th');
  }
  return n + 'º';
}

export function formatarDataLonga(date) {
  const meses = t('meses');
  const d = date.getDate();
  const m = Array.isArray(meses) ? meses[date.getMonth()] : '';
  const a = date.getFullYear();
  if (idiomaAtual === 'en') return `${m} ${d}, ${a}`;
  return `${d} de ${m} de ${a}`;
}

// Versão compacta (mês abreviado, sem "de"/vírgula) — usada no mobile para
// caber em 1 linha na barra de tempo, nos 3 idiomas.
export function formatarDataCompacta(date) {
  const meses = t('mesesCurtos');
  const d = date.getDate();
  const m = Array.isArray(meses) ? meses[date.getMonth()] : '';
  const a = date.getFullYear();
  if (idiomaAtual === 'en') return `${m} ${d} ${a}`;
  return `${d} ${m} ${a}`;
}

export function formatarDataCurta(iso) {
  const date = new Date(iso + 'T00:00:00Z');
  const meses = t('mesesCurtos');
  const d = date.getUTCDate();
  const m = Array.isArray(meses) ? meses[date.getUTCMonth()] : '';
  const a = date.getUTCFullYear();
  if (idiomaAtual === 'en') return `${m} ${d}, ${a}`;
  return `${d} ${m} ${a}`;
}

// Carrega o overlay de conteúdo do idioma atual (nada a fazer em pt)
export async function carregarConteudoTraduzido() {
  if (idiomaAtual === 'pt') return null;
  try {
    const mod = await import(`./traducoes-conteudo.${idiomaAtual}.js?v=8`);
    return mod.TRADUCAO || null;
  } catch (e) {
    console.warn('Tradução de conteúdo indisponível, mantendo pt:', e.message);
    return null;
  }
}

// Mescla o overlay sobre os dados PT (em memória, antes de motor/UI)
export function aplicarTraducoes(dados, eventos, missoes, trad) {
  if (!trad) return;

  for (const corpo of dados.corpos) {
    const tc = trad.corpos && trad.corpos[corpo.id];
    if (!tc) continue;
    if (tc.nome) corpo.nome = tc.nome;
    if (tc.info && corpo.info) {
      const i = corpo.info;
      const ti = tc.info;
      if (ti.resumo) i.resumo = ti.resumo;
      if (Array.isArray(ti.numeros) && ti.numeros.length) i.numeros = ti.numeros;
      if (Array.isArray(ti.curiosidades) && ti.curiosidades.length) i.curiosidades = ti.curiosidades;
      if (Array.isArray(ti.comparacoes) && ti.comparacoes.length) i.comparacoes = ti.comparacoes;
      if (ti.avancado && i.avancado) Object.assign(i.avancado, ti.avancado);
    }
  }

  if (Array.isArray(eventos)) {
    for (const ev of eventos) {
      const te = trad.eventos && trad.eventos[ev.id];
      if (!te) continue;
      if (te.nome) ev.nome = te.nome;
      if (te.descricao) ev.descricao = te.descricao;
    }
  }

  if (Array.isArray(missoes)) {
    for (const mi of missoes) {
      const tm = trad.missoes && trad.missoes[mi.id];
      if (!tm) continue;
      if (tm.nome) mi.nome = tm.nome;
      if (tm.descricao) mi.descricao = tm.descricao;
      if (tm.estado) mi.estado = tm.estado;
      if (Array.isArray(tm.paradas)) {
        tm.paradas.forEach((rotulo, i) => {
          if (mi.paradas[i] && rotulo) mi.paradas[i].rotulo = rotulo;
        });
      }
    }
  }
}

// Título da página e atributo lang
export function aplicarHtml() {
  document.documentElement.lang = t('htmlLang');
  document.title = t('tituloApp');
}
