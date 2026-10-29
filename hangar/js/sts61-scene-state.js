import {PARTES as PARTES_SHUTTLE} from './shuttle-data.js?v=4';

const STACK = ['orbiter','tank','srb-left','srb-right','engines'];
const ORBITER = ['orbiter','engines','door-left','door-right','arm'];
const SERVICING = [...ORBITER,'hubble'];
export const ESTADOS_STS61 = Object.freeze({
 'optical-problem': {scenario:'earth',visible:['hubble'],hubble:'solo'},
 launch: {scenario:'sky',visible:STACK},
 'booster-separation': {scenario:'sky',visible:STACK,boosterSeparated:true},
 'tank-separation': {scenario:'earth',visible:['orbiter','engines','tank'],tankSeparated:true},
 rendezvous: {scenario:'earth',visible:SERVICING,hubble:'approach',doorsOpen:true},
 capture: {scenario:'earth',visible:SERVICING,hubble:'servicing',doorsOpen:true,support:true},
 'eva-1': {scenario:'earth',visible:[...SERVICING,'service-gyro'],hubble:'servicing',doorsOpen:true,support:true},
 'eva-2': {scenario:'earth',visible:[...SERVICING,'service-arrays'],hubble:'servicing',doorsOpen:true,support:true},
 'eva-3': {scenario:'earth',visible:[...SERVICING,'service-wfpc2'],hubble:'servicing',doorsOpen:true,support:true},
 'eva-4': {scenario:'earth',visible:[...SERVICING,'service-costar'],hubble:'servicing',doorsOpen:true,support:true},
 'orbit-boost': {scenario:'earth',visible:SERVICING,hubble:'servicing',doorsOpen:true,support:true},
 'eva-5': {scenario:'earth',visible:[...SERVICING,'service-electronics'],hubble:'servicing',doorsOpen:true,support:true},
 release: {scenario:'earth',visible:SERVICING,hubble:'released',doorsOpen:true},
 'return-preparation': {scenario:'earth',visible:['orbiter','engines','door-left','door-right','arm']},
 reentry: {scenario:'earth',visible:['orbiter','engines','door-left','door-right']},
 landing: {scenario:'runway',visible:['orbiter','engines','door-left','door-right'],landed:true}
});

export const ARTE_STS61 = [
 ['service-gyro','EVA 1 · giroscópios (esquema)',0x80d9d8],
 ['service-arrays','EVA 2 · painéis (esquema)',0x71a9e8],
 ['service-wfpc2','EVA 3 · WFPC2 (esquema)',0xa690e4],
 ['service-costar','EVA 4 · COSTAR (esquema)',0xe9bc76],
 ['service-electronics','EVA 5 · eletrônica (esquema)',0x8fd0a2]
];
export const PARTES_STS61 = Object.freeze([
 ...PARTES_SHUTTLE.map(parte=>({...parte,curto:parte.id==='orbiter'?'Orbitador · Shuttle NASA':parte.id==='hubble'?'Hubble · em órbita':parte.curto})),
 ...ARTE_STS61.map(([id,curto])=>({id,curto}))
]);
export function estadoCenaSTS61(fase){
 const config=ESTADOS_STS61[fase];
 if(!config)throw new RangeError(`Fase STS-61 desconhecida: ${fase}`);
 return {sts61Phase:fase,selected:config.visible.includes('hubble')?'hubble':config.visible[0],exploded:true,isolated:false};
}
