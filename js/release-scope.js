// Candidato 1.0: disponibilidade editorial não concede acesso Pro.
export const ROTEIROS_1_0 = Object.freeze(['sol','planetas','pequenos','terra','estacoes-guia','mares-guia','lua','apollo11','marte','hubble','discovery-hubble','lua-fases','saturno-estagios','lunar-pouso','discovery-carga','endeavour-sts61','terra-ano','mares-oceano']);
export const NAVES_1_0 = Object.freeze(['hubble','saturno','shuttle','modulo-lunar']);
export const roteiroDisponivel = id => ROTEIROS_1_0.includes(id);
export const naveDisponivel = id => NAVES_1_0.includes(id);
export const recursoDisponivel = id => !['quiz','eventos','voce'].includes(id);
