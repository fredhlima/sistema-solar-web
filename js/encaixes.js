// encaixes.js — ligações entre áreas (Lote D da proposta integrada).
// Funções puras, sem side-effect de import. Cada mapeamento lista candidatos em
// ordem de preferência e devolve o primeiro capítulo liberado na 1.0, ou null.
import { roteiroDisponivel } from './release-scope.js?v=314';

const primeiro = (lista) => lista.find(roteiroDisponivel) || null;

// Evento do céu -> capítulo que explica o fenômeno
export function capituloDoEvento(ev) {
  if (!ev || typeof ev !== 'object') return null;
  const foco = ev.corpoFoco;
  switch (ev.tipo) {
    case 'estacao': return primeiro(['estacoes-guia', 'terra']);
    case 'eclipse': return primeiro(['lua-fases', 'lua']);
    case 'chuva-meteoros': return primeiro(['cometas-guia', 'pequenos']);
    case 'cometa': return primeiro(['cometas-guia', 'pequenos']);
    case 'oposicao': return primeiro(foco === 'marte' ? ['marte', 'planetas'] : ['planetas']);
    case 'conjuncao': return primeiro(['planetas']);
    case 'marco':
      if (foco === 'lua') return primeiro(['lua', 'lua-fases']);
      if (foco === 'apofis') return primeiro(['pequenos']);
      return primeiro(['planetas']);
    default: return null;
  }
}

// Missão com trajetória (js/missoes.js) -> capítulo da sonda
const MISSAO_CAPITULO = {
  'apollo-11': ['apollo11'],
  'voyager-1': ['voyager-viagem'],
  'voyager-2': ['voyager-viagem'],
  'new-horizons': ['pequenos'],
  cassini: ['cassini-finale', 'mundo-encelado', 'mundo-tita'],
  rosetta: ['rosetta-cometa', 'mundo-67p'],
  'artemis-2': ['artemis1', 'lua'],
  juno: ['juno-jupiter', 'mundo-europa'],
  parker: ['parker-sol', 'sol'],
  perseverance: ['perseverance-pouso', 'mundo-marte', 'marte'],
};
export function capituloDaMissao(id) {
  return primeiro(MISSAO_CAPITULO[id] || []);
}

// Trilha (js/aprendizado-trilhas.js; 'essencial' = PERCURSO_ESSENCIAL) -> pacote de quiz
const TRILHA_PACOTE = {
  essencial: 'planetas',
  fundamentos: 'sol-e-cometas',
  terra: 'estacoes',
  lua: 'luas',
  marte: 'planetas',
  observatorios: 'telescopios',
  'sondas-viagens': 'missoes-espaciais',
  'mundos-planetas': 'planetas',
  'mundos-luas-proximas': 'luas',
  'mundos-jupiter': 'luas',
  'mundos-saturno': 'luas',
  'mundos-cometas': 'sol-e-cometas',
};
export function pacoteDaTrilha(trilhaId) {
  return TRILHA_PACOTE[trilhaId] || null;
}

// Pacote do desafio rápido do Início: o pacote grátis
export const PACOTE_DESAFIO = 'planetas';
