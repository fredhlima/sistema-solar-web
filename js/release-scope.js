// Candidato 1.0: disponibilidade editorial não concede acesso Pro.
export const ROTEIROS_1_0 = Object.freeze(['sol','planetas','pequenos','terra','estacoes-guia','mares-guia','lua','apollo11','marte','hubble','discovery-hubble','lua-fases','saturno-estagios','lunar-pouso','discovery-carga','endeavour-sts61',
  // Lote A (Onda 1): guias e mundos que passam a existir no catálogo; são Pro (o gratuito segue sendo o PERCURSO_ESSENCIAL).
  'cometas-guia','escalas-guia','assistencias-gravitacionais','habitabilidade','mundo-terra','mundo-lua','mundo-marte','mundo-europa','mundo-tita','mundo-encelado','mundo-67p','voyager-viagem','juno-jupiter','parker-sol','rosetta-cometa']);
export const NAVES_1_0 = Object.freeze(['hubble','saturno','shuttle','modulo-lunar']);
export const roteiroDisponivel = id => ROTEIROS_1_0.includes(id);
export const naveDisponivel = id => NAVES_1_0.includes(id);
// Lote A: Quiz, Eventos e Você no Espaço estão liberados em todas as plataformas.
export const recursoDisponivel = () => true;
