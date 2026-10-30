import { naveDisponivel } from '../../js/release-scope.js?v=303';

// Catálogo e destinos compartilham os mesmos IDs, sem aceitar URLs enviadas pelo iframe.
export const NAVES_HANGAR = Object.freeze([
  'saturno', 'shuttle', 'modulo-lunar', 'hubble', 'jwst', 'cassini',
  'voyager', 'parker', 'juno', 'rosetta', 'perseverance', 'ingenuity'
]);

export function destinoNave(id) {
  if (!NAVES_HANGAR.includes(id) || !naveDisponivel(id)) return null;
  return ['saturno', 'shuttle', 'modulo-lunar', 'hubble', 'perseverance', 'ingenuity', 'cassini', 'jwst'].includes(id)
    ? `hangar/veiculo.html?modelo=${id}`
    : `hangar/modelo-futuro.html?modelo=${id}`;
}

export function origemHangarValida(event, source) {
  return event.source === source && event.origin === window.location.origin;
}
