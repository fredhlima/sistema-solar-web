import { declinacaoSolar, duracaoDoDia } from './estacoes-calc.js?v=302';

const COPY = {
 pt: { essential:'Estações: compare os hemisférios', investigate:'Investigue a duração do dia', months:['Março','Junho','Setembro','Dezembro'], latitude:'Latitude', north:'N', south:'S', equator:'Equador', daylight:'de luz', night:'de noite', measure:'Registrar', empty:'Escolha uma situação e registre A. Mude o mês ou a latitude e registre B.', same:'A e B têm a mesma duração de luz.', more:'B tem {h} h a mais de luz que A.', less:'B tem {h} h a menos de luz que A.', changedBoth:'Você mudou mês e latitude. Para isolar um efeito, mude uma variável por vez.', changedNone:'Mude o mês ou a latitude para investigar outra situação.', note:'Modelo ideal: marcos do ano, sem calendário ou refração. Não prevê clima nem horários de nascer do Sol.', source:'Como o modelo funciona', reset:'Limpar comparação', june:'Junho: mais horas de luz no norte.', december:'Dezembro: mais horas de luz no sul.' },
 en: { essential:'Seasons: compare hemispheres', investigate:'Investigate day length', months:['March','June','September','December'], latitude:'Latitude', north:'N', south:'S', equator:'Equator', daylight:'daylight', night:'night', measure:'Record', empty:'Choose a situation and record A. Change the month or latitude and record B.', same:'A and B have the same day length.', more:'B has {h} h more daylight than A.', less:'B has {h} h less daylight than A.', changedBoth:'You changed month and latitude. Change one variable at a time to isolate its effect.', changedNone:'Change the month or latitude to investigate another situation.', note:'Ideal model: seasonal markers, no calendar or refraction. It predicts neither weather nor sunrise times.', source:'How the model works', reset:'Clear comparison', june:'June: more daylight in the north.', december:'December: more daylight in the south.' },
 es: { essential:'Estaciones: compara hemisferios', investigate:'Investiga la duración del día', months:['Marzo','Junio','Septiembre','Diciembre'], latitude:'Latitud', north:'N', south:'S', equator:'Ecuador', daylight:'de luz', night:'de noche', measure:'Registrar', empty:'Elige una situación y registra A. Cambia el mes o la latitud y registra B.', same:'A y B tienen la misma duración de luz.', more:'B tiene {h} h más de luz que A.', less:'B tiene {h} h menos de luz que A.', changedBoth:'Cambiaste mes y latitud. Cambia una variable a la vez para aislar su efecto.', changedNone:'Cambia el mes o la latitud para investigar otra situación.', note:'Modelo ideal: hitos del año, sin calendario ni refracción. No predice clima ni horas de salida del Sol.', source:'Cómo funciona el modelo', reset:'Borrar comparación', june:'Junio: más horas de luz en el norte.', december:'Diciembre: más horas de luz en el sur.' }
};
const angles=[0,90,180,270];
export function validarMedicao(value){
 return value && angles.includes(value.angulo) && Number.isFinite(value.latitude) && Math.abs(value.latitude)<=80
  ? {angulo:value.angulo,latitude:Math.round(value.latitude)} : null;
}
export function normalizarEstadoEstacoes(value={}){
 const pos=validarMedicao(value);
 return {...(pos||{}),medicoes:{a:validarMedicao(value.medicoes?.a),b:validarMedicao(value.medicoes?.b)}};
}
export function criarLaboratorioEstacoes({host,config,idioma='pt',estadoSalvo,aoMudar}){
 const lang=COPY[idioma]?idioma:'pt',c=COPY[lang],essential=config.modo==='essencial';
 const saved=normalizarEstadoEstacoes(estadoSalvo),fallback=validarMedicao(config)||{angulo:90,latitude:40};
 let angle=saved.angulo??fallback.angulo,latitude=essential?40:saved.latitude??fallback.latitude;
 if(essential&&!([90,270].includes(angle)))angle=90;
 const measures=essential?{a:null,b:null}:saved.medicoes;
 const e=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text)node.textContent=text;return node;};
 const element=e('section','aprendizado-modelo aprendizado-experimento estacoes-laboratorio');
 element.dataset.modo=essential?'essencial':'investigar';element.setAttribute('aria-label',essential?c.essential:c.investigate);
 const title=e('h3',null,essential?c.essential:c.investigate),chart=e('div','estacoes-luz'),presets=e('div','experimento-presets'),controls=e('div','estacoes-ajustes');
 element.append(title,chart,controls);controls.append(presets);
 const format=n=>n.toLocaleString(lang,{minimumFractionDigits:1,maximumFractionDigits:1});
 const place=lat=>lat===0?c.equator:`${Math.abs(lat)}° ${lat>0?c.north:c.south}`;
 const day=(lat=latitude,a=angle)=>duracaoDoDia(lat,declinacaoSolar(a));
 const buttons=new Map();
 for(const a of essential?[90,270]:angles){const b=e('button',null,c.months[a/90]);b.type='button';b.dataset.mes=a;b.onclick=()=>{angle=a;render(true);};presets.append(b);buttons.set(a,b);}
 let input,output,compare,clear;
 if(!essential){
  const label=e('label','estacoes-latitude');input=e('input');input.type='range';input.min=-80;input.max=80;input.step=1;input.dataset.latitude='';input.setAttribute('aria-label',c.latitude);output=e('span');label.append(output,input);controls.append(label);
  input.oninput=()=>{latitude=Number(input.value);render(true);};
  const actions=e('div','estacoes-registros');for(const key of ['a','b']){const b=e('button',null,`${c.measure} ${key.toUpperCase()}`);b.type='button';b.dataset.registrar=key;b.onclick=()=>{measures[key]={angulo:angle,latitude};render(true);};actions.append(b);}
  compare=e('div','estacoes-comparacao');compare.dataset.comparacao='';compare.setAttribute('role','status');compare.setAttribute('aria-live','polite');
  clear=e('button','estacoes-limpar',c.reset);clear.type='button';clear.onclick=()=>{measures.a=measures.b=null;render(true);};controls.append(actions,compare,clear);
 }
 const details=e('details','estacoes-nota');details.append(e('summary',null,c.source),e('p',null,c.note));element.append(details);host.append(element);
 function render(save=false){
  chart.replaceChildren();
  for(const lat of essential?[40,-40]:[latitude]){
   const hours=day(lat),row=e('div','estacoes-dia'),label=e('p');label.textContent=`${place(lat)} · ${format(hours)} h ${c.daylight}`;
   const bar=e('div','estacoes-dia-barra'),fill=e('span');fill.style.width=`${hours/24*100}%`;bar.append(fill);bar.setAttribute('role','img');bar.setAttribute('aria-label',`${format(hours)} h ${c.daylight}; ${format(24-hours)} h ${c.night}`);row.append(label,bar);chart.append(row);
  }
  if(essential)chart.append(e('p','estacoes-conclusao',angle===90?c.june:c.december));
  else{
   input.value=latitude;input.setAttribute('aria-valuetext',place(latitude));output.textContent=`${c.latitude}: ${place(latitude)}`;
   compare.replaceChildren();clear.hidden=!measures.a&&!measures.b;
   for(const key of ['a','b']){const m=measures[key];if(m)compare.append(e('p',null,`${key.toUpperCase()} · ${c.months[m.angulo/90]} · ${place(m.latitude)} · ${format(day(m.latitude,m.angulo))} h`));}
   const a=measures.a,b=measures.b;
   if(a&&b){const delta=day(b.latitude,b.angulo)-day(a.latitude,a.angulo);compare.append(e('strong',null,(Math.abs(delta)<.05?c.same:delta>0?c.more:c.less).replace('{h}',format(Math.abs(delta)))));
    if(a.angulo!==b.angulo&&a.latitude!==b.latitude)compare.append(e('p',null,c.changedBoth));
    else if(a.angulo===b.angulo&&a.latitude===b.latitude)compare.append(e('p',null,c.changedNone));
   }else compare.append(e('p',null,c.empty));
  }
  for(const [a,b]of buttons)b.setAttribute('aria-pressed',String(angle===a));
  if(save)aoMudar?.({angulo:angle,latitude,medicoes:{...measures}});
 }
 render();
 return{element,inspect:()=>({tipo:'terra-ano',modo:element.dataset.modo,angulo:angle,latitude,dia:day(),medicoes:structuredClone(measures)}),dispose(){element.remove();}};
}
