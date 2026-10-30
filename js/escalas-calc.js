import {DADOS} from './dados.js?v=303';
export const UA_KM=149597870.7;
const ids=['sol','mercurio','venus','terra','marte','jupiter','saturno','urano','netuno'];
export const CORPOS_ESCALA=ids.map(id=>{const c=DADOS.corpos.find(c=>c.id===id);return{id,diametroKm:c.raioKm*2,distanciaKm:c.distanciaMediaKm};});
export function medidasEscala(solCm=22){const diametroSol=CORPOS_ESCALA[0].diametroKm,cm=Math.max(10,Math.min(100,Number(solCm)||22));return CORPOS_ESCALA.map(c=>({...c,diametroCm:c.diametroKm/diametroSol*cm,distanciaMetros:c.distanciaKm/diametroSol*cm/100,ua:c.distanciaKm/UA_KM}));}
