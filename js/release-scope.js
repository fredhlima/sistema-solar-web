// Candidato 1.0: disponibilidade editorial não concede acesso Pro.
export const ROTEIROS_1_0 = Object.freeze(['sol','planetas','pequenos','terra','estacoes-guia','mares-guia','lua','apollo11','marte','hubble','discovery-hubble','lua-fases','saturno-estagios','lunar-pouso','discovery-carga','endeavour-sts61',
  // Lote A (Onda 1): guias e mundos que passam a existir no catálogo; são Pro (o gratuito segue sendo o PERCURSO_ESSENCIAL).
  'cometas-guia','escalas-guia','assistencias-gravitacionais','habitabilidade','mundo-terra','mundo-lua','mundo-marte','mundo-europa','mundo-tita','mundo-encelado','mundo-67p','voyager-viagem','juno-jupiter','parker-sol','rosetta-cometa']);
export const NAVES_1_0 = Object.freeze(['hubble','saturno','shuttle','modulo-lunar']);
export const roteiroDisponivel = id => ROTEIROS_1_0.includes(id);
export const naveDisponivel = id => NAVES_1_0.includes(id);
// Lote A: Quiz, Eventos e Você no Espaço estão liberados em todas as plataformas.
export const recursoDisponivel = () => true;
// Monetização (Lote E): todo capítulo Pro de ROTEIROS_1_0 abre sem compra e deixa ler os primeiros passos.
// AMOSTRA_PASSOS_PRO é a única constante: número de passos que a pessoa lê antes do paywall (passos 1..N);
// avançar além do último passo da amostra, sem Pro, abre o paywall daquele capítulo.
export const AMOSTRA_PASSOS_PRO = 2;
// Exceção por decisão do dono (12/11/2026): Estações e Marés seguem 100% Pro, sem amostra.
export const SEM_AMOSTRA_PRO = Object.freeze(['estacoes-guia', 'mares-guia']);
export const temAmostraPro = id => !SEM_AMOSTRA_PRO.includes(id);
