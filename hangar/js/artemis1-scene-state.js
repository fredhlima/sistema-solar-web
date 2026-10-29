// All geometry/poses are artistic teaching aids, not a technical reconstruction.
const ARRAYS=['solar-1','solar-2','solar-3','solar-4'];
const ORION=['service-module','crew-module',...ARRAYS];
const UPPER=['icps',...ORION];
const STACK=['core','rs25','srb-left','srb-right',...UPPER,'las','fairing-left','fairing-right'];
const S=(scenario,visible,extra={})=>({scenario,visible,arraysOpen:false,...extra});
export const ESTADOS_ARTEMIS1=Object.freeze({
 'assembled-vehicle':S('sky',STACK),
 liftoff:S('sky',STACK),
 'booster-separation':S('sky',STACK,{boostersSeparated:true}),
 'fairings-and-tower-jettison':S('sky',STACK.filter(id=>!id.startsWith('srb-')),{fairingsSeparated:true}),
 'core-stage-separation':S('earth',['core','rs25',...UPPER],{coreSeparated:true}),
 'solar-array-deployment':S('earth',UPPER,{arraysOpen:true}),
 'translunar-injection':S('earth',UPPER,{arraysOpen:true}),
 'orion-icps-separation':S('earth',UPPER,{arraysOpen:true,icpsSeparated:true}),
 'powered-lunar-flyby':S('moon-orbit',ORION,{arraysOpen:true}),
 'distant-retrograde-orbit':S('moon-orbit',ORION,{arraysOpen:true}),
 'lunar-orbit-tests':S('moon-orbit',ORION,{arraysOpen:true}),
 'distant-orbit-departure':S('moon-orbit',ORION,{arraysOpen:true}),
 'return-flyby':S('moon-orbit',ORION,{arraysOpen:true}),
 'service-module-separation':S('earth',ORION,{arraysOpen:true,serviceSeparated:true}),
 'atmospheric-reentry':S('earth',['crew-module']),
 'parachutes-splashdown':S('ocean',['crew-module','parachutes'],{parachutesOpen:true}),
 'compare-power-and-thrust':S('earth',UPPER,{arraysOpen:true,icpsSeparated:true})
});
export const PARTES_ARTEMIS1=[
 ['core','Estágio central'],['rs25','Quatro RS-25'],['srb-left','Propulsor esquerdo'],['srb-right','Propulsor direito'],
 ['icps','Estágio ICPS'],['service-module','Módulo de serviço'],['crew-module','Cápsula Orion'],['las','Torre de escape'],
 ['fairing-left','Carenagem esquerda'],['fairing-right','Carenagem direita'],
 ...ARRAYS.map((id,i)=>[id,`Painel solar ${i+1}`]),['parachutes','Paraquedas']
].map(([id,curto])=>({id,curto}));
export function estadoCenaArtemis1(phase){
 const config=ESTADOS_ARTEMIS1[phase];if(!config)throw new RangeError(`Fase Artemis I desconhecida: ${phase}`);
 return {artemis1Phase:phase,selected:phase==='assembled-vehicle'||phase==='liftoff'?'core':'crew-module',exploded:true,isolated:false};
}
