import {criarModuloLunar} from './lunar-model.js?v=1';

// Original NASA assemblies remain intact. Timings and paths are educational.
export function criarModuloLunarGuiado(){
 const modelo=criarModuloLunar();let elapsed=0,lastPhase=null;
 modelo.floorY=0;
 modelo.animate=(state,alpha,dt,frameDt=dt)=>{
  const phase=state.lunarPhase||(state.lunarAscent?'ascent':null);
  if(phase!==lastPhase){elapsed=0;lastPhase=phase;}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)elapsed=4;else if(frameDt!==undefined)elapsed=Math.min(4,elapsed+frameDt);
  const t=elapsed/4,smooth=t*t*(3-2*t);
  const flight=['separation','descent','ascent','discard'].includes(phase);
  for(const [id,g]of modelo.groups){
   const upper=id==='ascent'||id==='antennas';let y=0,x=0;
   if(!state.isolated){
    if(phase==='separation')x=2*smooth;
    if(phase==='descent')y=6*(1-smooth);
    if(phase==='ascent'&&upper)y=6*smooth;
    if(phase==='rendezvous')y=0;
    if(phase==='discard')x=5*smooth;
   }
   g.position.set(x,y,0);
   g.visible=state.isolated?id===state.selected:phase==='rendezvous'||phase==='discard'?upper:!state.visibleParts||state.visibleParts.includes(id);
  }
  modelo.root.userData.flight={phase,progress:smooth};
  modelo.root.updateMatrixWorld(true);return !state.isolated&&flight&&elapsed<4;
 };
 return modelo;
}
