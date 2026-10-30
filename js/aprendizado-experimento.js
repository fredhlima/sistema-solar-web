import {criarLaboratorioEstacoes} from './estacoes-laboratorio.js?v=302';
import {criarLaboratorioMares} from './mares-laboratorio.js?v=302';
import {criarMissao} from './aprendizado-missao.js?v=1';
import {criarEscalas} from './aprendizado-escalas.js?v=302';
import {criarCometas} from './aprendizado-cometas.js?v=1';
import {criarLuz} from './aprendizado-luz.js?v=1';
import {criarHabitabilidade} from './aprendizado-habitabilidade.js?v=1';
import {criarExperimentoAvancado} from './aprendizado-avancado.js?v=1';
import {declinacaoSolar,duracaoDoDia} from './estacoes-calc.js?v=302';
import {mareCombinada,alturaRelativa,AMP_QUADRATURA} from './mares-calc.js?v=302';
import {faseLunarIdeal,luzLunar} from './fenomenos-calc.js?v=1';
const COPY={
 pt:{vista:'Vista da Terra',orbita:'Posições vistas de cima',sol:'Sol',terra:'Terra',lua:'Lua',angulo:'Posição da Lua',fases:['Nova','Quarto crescente','Cheia','Quarto minguante'],iluminada:'Disco iluminado',nota:'Desenho artístico e ideal, sem escala nem calendário real. Orientação convencional do disco; pode variar para quem observa. Fontes: NASA.'},
 en:{vista:'View from Earth',orbita:'Positions viewed from above',sol:'Sun',terra:'Earth',lua:'Moon',angulo:'Moon position',fases:['New','First quarter','Full','Last quarter'],iluminada:'Illuminated disc',nota:'Artistic ideal diagram, not to scale or a real calendar. Conventional disc orientation; it can vary for observers. Sources: NASA.'},
 es:{vista:'Vista desde la Tierra',orbita:'Posiciones vistas desde arriba',sol:'Sol',terra:'Tierra',lua:'Luna',angulo:'Posición de la Luna',fases:['Nueva','Cuarto creciente','Llena','Cuarto menguante'],iluminada:'Disco iluminado',nota:'Dibujo artístico ideal, sin escala ni calendario real. Orientación convencional del disco; puede variar para quien observa. Fuentes: NASA.'}
};
export function criarExperimento({host,config,idioma='pt',estadoSalvo,aoMudar,aoSelecionarCorpo}){
 if(config.tipo==='terra-ano')return criarLaboratorioEstacoes({host,config,idioma,estadoSalvo,aoMudar});
 if(config.tipo==='mares-oceano')return criarLaboratorioMares({host,config,idioma,estadoSalvo,aoMudar});
 if(config.tipo==='missao-espacial')return criarMissao({host,config,idioma,estadoSalvo,aoMudar});
 if(config.tipo==='escalas')return criarEscalas({host,config,idioma,estadoSalvo,aoMudar});
 if(config.tipo==='cometas')return criarCometas({host,config,idioma,estadoSalvo,aoMudar});
 if(config.tipo==='luz-observatorios')return criarLuz({host,config,idioma,estadoSalvo,aoMudar,aoSelecionarCorpo});
 if(config.tipo==='habitabilidade')return criarHabitabilidade({host,config,idioma,estadoSalvo,aoMudar,aoSelecionarCorpo});
 if(config.tipo==='assistencias')return criarExperimentoAvancado({host,config,idioma,estadoSalvo,aoMudar});
 const copy={...(COPY[idioma]||COPY.pt)},year=config.tipo==='terra-ano',tide=config.tipo==='mares-oceano',other=year||tide;
 const words={pt:{year:'Um ano na Terra',tide:'Marés: modelo de equilíbrio',angle:'Posição no ciclo',latitude:'Latitude',day:'Dia claro ideal',north:'Norte',south:'Sul',relative:'Amplitude relativa',months:['Março','Junho','Setembro','Dezembro'],note:'Desenho artístico ideal, sem escala ou calendário. Duração do dia sem refração; não prevê clima. Fonte: NASA.',tideNote:'Desenho artístico ideal, deformação ampliada. Não prevê alturas ou horários de maré locais. Fonte: NOAA.'},en:{year:'A year on Earth',tide:'Tides: equilibrium model',angle:'Position in cycle',latitude:'Latitude',day:'Ideal daylight',north:'North',south:'South',relative:'Relative amplitude',months:['March','June','September','December'],note:'Artistic ideal diagram, no scale or calendar. Daylight excludes refraction; no climate prediction. Source: NASA.',tideNote:'Artistic ideal diagram, exaggerated deformation. No local tide heights or times predicted. Source: NOAA.'},es:{year:'Un año en la Tierra',tide:'Mareas: modelo de equilibrio',angle:'Posición en el ciclo',latitude:'Latitud',day:'Luz diurna ideal',north:'Norte',south:'Sur',relative:'Amplitud relativa',months:['Marzo','Junio','Septiembre','Diciembre'],note:'Dibujo artístico ideal, sin escala ni calendario. Día sin refracción; no predice clima. Fuente: NASA.',tideNote:'Dibujo artístico ideal, deformación ampliada. No predice alturas ni horarios locales de mareas. Fuente: NOAA.'}}[idioma]||null;
 if(other){copy.vista=year?words.year:words.tide;copy.angulo=words.angle;copy.nota=year?words.note:words.tideNote;if(year)copy.fases=words.months;}
 const element=document.createElement('section');element.className='aprendizado-modelo aprendizado-experimento'+(year?' experimento-ano':'');element.setAttribute('aria-label',copy.vista);
 const canvas=document.createElement('canvas'),status=document.createElement('p'),controls=document.createElement('div'),label=document.createElement('label'),slider=document.createElement('input'),presets=document.createElement('div'),note=document.createElement('p');
 canvas.setAttribute('role','img');status.className='experimento-estado';controls.className='experimento-controles';presets.className='experimento-presets';note.className='experimento-nota';note.textContent=copy.nota;
 slider.type='range';slider.min=0;slider.max=360;slider.step=1;label.append(document.createTextNode(copy.angulo),slider);controls.append(status,presets,label);element.append(canvas,controls,note);host.append(element);
 let latitude=estadoSalvo?.latitude??config.latitude??40;let angle=estadoSalvo?.angulo??config.angulo??0,disposed=false;const ctx=canvas.getContext('2d'),disc=document.createElement('canvas');disc.width=disc.height=200;const dc=disc.getContext('2d');
 function circle(x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
 function text(value,x,y){ctx.fillStyle='#c6d9ec';ctx.font='12px -apple-system,sans-serif';ctx.textAlign='center';ctx.fillText(value,x,y);}
 function drawMoon(x,y,r){
  dc.clearRect(0,0,200,200);dc.fillStyle='#b7b5af';dc.beginPath();dc.arc(100,100,99,0,Math.PI*2);dc.fill();dc.save();dc.clip();
  for(let i=0;i<32;i++){const a=i*2.39996,rr=8+Math.sqrt(i/32)*88;dc.fillStyle=i%2?'#94938e':'#ccc9c2';dc.beginPath();dc.arc(100+Math.cos(a)*rr,100+Math.sin(a)*rr,3+i%7,0,Math.PI*2);dc.fill();}dc.restore();
  const pixels=dc.getImageData(0,0,200,200);for(let j=0;j<200;j++)for(let i=0;i<200;i++){const nx=(i-99.5)/99,ny=(j-99.5)/99;if(nx*nx+ny*ny>1)continue;const light=luzLunar(nx,ny,angle),factor=light<=0?.07:.35+.65*Math.sqrt(light),index=(j*200+i)*4;for(let c=0;c<3;c++)pixels.data[index+c]*=factor;}dc.putImageData(pixels,0,0);ctx.drawImage(disc,x-r,y-r,r*2,r*2);
 }
 function render(){if(disposed)return;
  const w=Math.max(200,element.clientWidth),h=Math.max(110,canvas.clientHeight),dpr=Math.min(devicePixelRatio,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  const portrait=w<360,moonX=portrait?w*.27:w*.25,mapX=portrait?w*.73:w*.72,y=h*.53,r=Math.min(h*.29,w*.18,72),orbit=Math.min(h*.27,w*.16,62);
  if(other){renderOther(w,h);return;}
  text(copy.vista,moonX,20);drawMoon(moonX,y,r);
  text(copy.orbita,mapX,20);ctx.strokeStyle='#445a71';ctx.beginPath();ctx.arc(mapX,y,orbit,0,Math.PI*2);ctx.stroke();circle(mapX,y,11,'#57a1c3');text(copy.terra,mapX,y+29);
  const a=angle*Math.PI/180,mx=mapX+orbit*Math.cos(a),my=y-orbit*Math.sin(a);circle(mx,my,6,'#c4c2bb');ctx.strokeStyle='#8bb6d377';ctx.setLineDash([3,4]);ctx.beginPath();ctx.moveTo(mapX,y);ctx.lineTo(mx,my);ctx.stroke();ctx.setLineDash([]);
  circle(Math.min(w-17,mapX+orbit+29),y,10,'#ffcc66');text(copy.sol,Math.min(w-19,mapX+orbit+29),y+29);
  const percent=Math.round(faseLunarIdeal(angle)*100);status.textContent=`${copy.iluminada}: ${percent}%`;canvas.setAttribute('aria-label',`${copy.vista}. ${copy.iluminada}: ${percent}%. ${copy.orbita}: ${angle}°.`);slider.value=angle;slider.setAttribute('aria-valuetext',`${angle}°, ${percent}%`);
  for(const [i,b]of [...presets.children].entries())b.setAttribute('aria-pressed',String(angle%360===i*90));aoMudar?.({angulo:angle});
 }
 function renderOther(w,h){
  const x=w*(year?.5:.4),y=h*(year?.53:.58),r=Math.min(h*(year?.25:.21),w*.16),a=angle*Math.PI/180;let summary;
  text(copy.vista,x,18);
  if(year){
   const orbit=Math.min(w*.33,h*.32);ctx.strokeStyle='#445a71';ctx.beginPath();ctx.ellipse(x,y,orbit,orbit*.48,0,0,Math.PI*2);ctx.stroke();circle(x,y,11,'#ffcc66');
   const ex=x+Math.cos(a)*orbit,ey=y+Math.sin(a)*orbit*.48,er=Math.min(18,r*.55);circle(ex,ey,er,'#408aac');ctx.strokeStyle='#d4e8f7';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ex-9,ey+25);ctx.lineTo(ex+9,ey-25);ctx.stroke();ctx.lineWidth=1;text(words.north,ex+12,ey-30);
   const dec=declinacaoSolar(angle),day=duracaoDoDia(latitude,dec),opposite=duracaoDoDia(-latitude,dec);summary=`${words.latitude}: ${latitude}° · ${words.day}: ${day.toFixed(1)} h / ${opposite.toFixed(1)} h (${-latitude}°)`;
   // Orbit projection keeps the axis parallel; illumination indicators use calculated declination.
   text(`☀ ${dec.toFixed(1)}°`,x,h-10);
  }else{
   const result=mareCombinada(angle,0),axis=result.eixoGraus*Math.PI/180;
   ctx.fillStyle='#49a4cf66';ctx.strokeStyle='#6ac5ed';ctx.beginPath();for(let i=0;i<=180;i++){const t=i*Math.PI/90,rr=r+alturaRelativa((t-axis)*180/Math.PI,result.amplitude)*r*.22,px=x+rr*Math.cos(t),py=y-rr*Math.sin(t);if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.closePath();ctx.fill();ctx.stroke();circle(x,y,r*.82,'#275a73');
   circle(x+Math.cos(a)*r*1.7,y-Math.sin(a)*r*1.7,6,'#ccc9c2');circle(Math.min(w-18,x+r*2.9),y,10,'#ffcc66');text(copy.terra,x,y+5);text(copy.lua,x+Math.cos(a)*r*1.7+19,y-Math.sin(a)*r*1.7+4);text(copy.sol,Math.min(w-18,x+r*2.9),y+25);
   summary=`${words.relative}: ${(result.amplitude/AMP_QUADRATURA).toFixed(2)} ×`;
  }
  status.textContent=summary;canvas.setAttribute('aria-label',`${copy.vista}. ${summary}. ${angle}°`);slider.value=angle;slider.setAttribute('aria-valuetext',`${angle}°, ${summary}`);for(const [i,b]of [...presets.children].entries())b.setAttribute('aria-pressed',String(angle%360===i*90));aoMudar?.({angulo:angle,latitude});
 }
 if(year){const latLabel=document.createElement('label'),lat=document.createElement('input');lat.type='range';lat.min=-80;lat.max=80;lat.step=1;lat.value=latitude;latLabel.append(document.createTextNode(words.latitude),lat);controls.append(latLabel);lat.oninput=()=>{latitude=Number(lat.value);render();};}
 for(const [i,name]of copy.fases.entries()){const b=document.createElement('button');b.type='button';b.textContent=name;b.onclick=()=>{angle=i*90;render();};presets.append(b);}
 slider.oninput=()=>{angle=Number(slider.value);render();};const observer=new ResizeObserver(render);observer.observe(element);render();
 return {element,inspect:()=>({tipo:config.tipo,angulo:angle,fracao:faseLunarIdeal(angle),latitude,dia:duracaoDoDia(latitude,declinacaoSolar(angle)),amplitude:mareCombinada(angle,0).amplitude}),dispose(){if(disposed)return;disposed=true;observer.disconnect();element.remove();}};
}
