import {vetoresAssistencia} from './assistencias-calc.js?v=1';
const COPY={
 pt:{titulo:'Velocidades vistas do Sol',antes:'Entrada distante',depois:'Saída distante',planeta:'Planeta →',ganhar:'Ganhar energia',perder:'Perder energia',referencial:'Ver do planeta',angulo:'Desvio',velocidade:'Velocidade',energia:'Δ energia',nota:'Diagrama artístico de vetores, em unidades do modelo. Sem escala, órbita calculada ou trajetória real de missão. Fonte: NASA.'},
 en:{titulo:'Velocities in the Sun’s frame',antes:'Far incoming',depois:'Far outgoing',planeta:'Planet →',ganhar:'Gain energy',perder:'Lose energy',referencial:'Planet frame',angulo:'Deflection',velocidade:'Speed',energia:'Δ energy',nota:'Artistic vector diagram, in model units. No scale, calculated orbit or real mission trajectory. Source: NASA.'},
 es:{titulo:'Velocidades desde el Sol',antes:'Entrada lejana',depois:'Salida lejana',planeta:'Planeta →',ganhar:'Ganar energía',perder:'Perder energía',referencial:'Desde el planeta',angulo:'Desvío',velocidade:'Velocidad',energia:'Δ energía',nota:'Diagrama artístico de vectores, en unidades del modelo. Sin escala, órbita calculada ni trayectoria real de misión. Fuente: NASA.'}
};
export function criarExperimentoAvancado({host,config,idioma='pt',estadoSalvo,aoMudar}) {
 const copy=COPY[idioma]||COPY.pt,element=document.createElement('section');
 element.className='aprendizado-modelo aprendizado-experimento experimento-assistencias';element.setAttribute('aria-label',copy.titulo);
 const legend=document.createElement('p');legend.className='experimento-legenda';const labels={pt:['Nave vista do planeta','Planeta visto do Sol','Nave vista do Sol'],en:['Spacecraft in planet frame','Planet in Sun frame','Spacecraft in Sun frame'],es:['Nave desde el planeta','Planeta desde el Sol','Nave desde el Sol']}[idioma]||['u','V','v'];for(const [i,t]of labels.entries()){const span=document.createElement('span');span.textContent=t;span.style.color=['#83c9ff','#ffc575','#9fe1b0'][i];legend.append(span);}
 const canvas=document.createElement('canvas'),status=document.createElement('p'),controls=document.createElement('div'),presets=document.createElement('div'),label=document.createElement('label'),slider=document.createElement('input'),note=document.createElement('p');
 canvas.setAttribute('role','img');status.className='experimento-estado';controls.className='experimento-controles';presets.className='experimento-presets';note.className='experimento-nota';note.textContent=copy.nota;
 slider.type='range';slider.min=20;slider.max=140;slider.step=1;label.append(document.createTextNode(copy.angulo),slider);controls.append(legend,status,presets,label);element.append(canvas,controls,note);host.append(element);
 let angulo=estadoSalvo?.angulo??config.angulo??60,efeito=estadoSalvo?.efeito??config.efeito??'ganhar',disposed=false;
 const ctx=canvas.getContext('2d');
 function arrow(x,y,dx,dy,color){ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dx,y-dy);ctx.stroke();const a=Math.atan2(-dy,dx);ctx.beginPath();ctx.moveTo(x+dx,y-dy);ctx.lineTo(x+dx-8*Math.cos(a-.5),y-dy-8*Math.sin(a-.5));ctx.lineTo(x+dx-8*Math.cos(a+.5),y-dy-8*Math.sin(a+.5));ctx.closePath();ctx.fill();}
 function text(value,x,y){ctx.fillStyle='#d6eafa';ctx.font='12px -apple-system,sans-serif';ctx.textAlign='center';ctx.fillText(value,x,y);}
 function render(){if(disposed)return;const w=canvas.clientWidth,h=Math.max(80,canvas.clientHeight),dpr=Math.min(devicePixelRatio,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  const v=vetoresAssistencia(angulo,efeito),solar=efeito!=='planeta',scale=Math.min(w*.12,h*.26),y=h*.68;
  text(solar?copy.titulo:copy.referencial,w/2,16);
  for(const [x,u,s,t]of [[w*.23,v.entrada,v.solarEntrada,copy.antes],[w*.65,v.saida,v.solarSaida,copy.depois]]){ctx.fillStyle='#d6eafa';ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();arrow(x,y,u.x*scale,u.y*scale,'#83c9ff');if(solar){arrow(x+u.x*scale,y-u.y*scale,scale,0,'#ffc575');arrow(x,y,s.x*scale,s.y*scale,'#9fe1b0');}text(t,x+scale*.35,h-8);}
  for(const [i,span]of [...legend.children].entries())span.hidden=!solar&&i>0;
  status.textContent=`${copy.velocidade}: ${v.velocidadeEntrada.toFixed(2)} → ${v.velocidadeSaida.toFixed(2)} · ${copy.energia}: ${v.deltaEnergia.toFixed(2)}`;
  canvas.setAttribute('aria-label',`${solar?copy.titulo:copy.referencial}. ${status.textContent}`);slider.value=angulo;slider.setAttribute('aria-valuetext',`${angulo}°`);
  for(const b of presets.children)b.setAttribute('aria-pressed',String(b.dataset.efeito===efeito));aoMudar?.({angulo,efeito});
 }
 for(const [id,name]of [['ganhar',copy.ganhar],['perder',copy.perder],['planeta',copy.referencial]]){const b=document.createElement('button');b.type='button';b.textContent=name;b.dataset.efeito=id;b.onclick=()=>{efeito=id;render();};presets.append(b);}
 slider.oninput=()=>{angulo=Number(slider.value);render();};const observer=new ResizeObserver(render);observer.observe(element);render();
 return {element,inspect:()=>({tipo:config.tipo,angulo,efeito,...vetoresAssistencia(angulo,efeito)}),dispose(){if(disposed)return;disposed=true;observer.disconnect();element.remove();}};
}
