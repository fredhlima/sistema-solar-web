import {DOSSIES_HABITABILIDADE} from './habitabilidade-roteiro.js?v=1';
const COPY={
 pt:{titulo:'Investigue os mundos',observado:'O que observamos',interpretacao:'O que os dados sugerem',aberto:'O que falta descobrir',fonte:'Fonte científica',nota:'Habitabilidade é potencial para sustentar vida, não confirmação de vida nem segurança para humanos. Sem ranking ou probabilidades.'},
 en:{titulo:'Investigate the worlds',observado:'What we observe',interpretacao:'What the data suggest',aberto:'What remains unknown',fonte:'Scientific source',nota:'Habitability is potential to support life, not confirmed life or safety for humans. No ranking or probabilities.'},
 es:{titulo:'Investiga los mundos',observado:'Lo que observamos',interpretacao:'Lo que sugieren los datos',aberto:'Lo que falta descubrir',fonte:'Fuente científica',nota:'Habitabilidad es potencial para sostener vida, no vida confirmada ni seguridad humana. Sin ranking ni probabilidades.'}
};
export function criarHabitabilidade({host,config,idioma='pt',estadoSalvo,aoMudar,aoSelecionarCorpo}){
 const copy=COPY[idioma]||COPY.pt,element=document.createElement('section'),title=document.createElement('h3'),presets=document.createElement('div'),cards=document.createElement('div'),note=document.createElement('p');
 element.className='aprendizado-modelo aprendizado-experimento experimento-habitabilidade';element.setAttribute('aria-label',copy.titulo);title.textContent=copy.titulo;presets.className='experimento-presets';cards.className='habitabilidade-evidencias';cards.id='habitabilidade-evidencias';cards.tabIndex=0;cards.setAttribute('role','region');cards.setAttribute('aria-label',copy.titulo);note.className='experimento-nota';note.textContent=copy.nota;element.append(title,presets,cards,note);host.append(element);
 let mundo=estadoSalvo?.mundo??config.mundo??'marte',disposed=false;if(!DOSSIES_HABITABILIDADE[mundo])mundo='marte';
 function render(){if(disposed)return;const d=DOSSIES_HABITABILIDADE[mundo];cards.replaceChildren();
  const heading=document.createElement('h4');heading.textContent=d.nome[idioma]||d.nome.pt;cards.append(heading);
  for(const key of ['observado','interpretacao','aberto']){const card=document.createElement('article'),h=document.createElement('h5'),p=document.createElement('p');h.textContent=copy[key];p.textContent=d[key][idioma]||d[key].pt;card.append(h,p);cards.append(card);}
  const link=document.createElement('a');link.href=d.fonte;link.target='_blank';link.rel='noopener noreferrer';link.textContent=copy.fonte;cards.append(link);
  for(const b of presets.children)b.setAttribute('aria-pressed',String(b.dataset.mundo===mundo));aoMudar?.({mundo});
 }
 for(const [id,d]of Object.entries(DOSSIES_HABITABILIDADE)){const b=document.createElement('button');b.type='button';b.textContent=d.nome[idioma]||d.nome.pt;b.dataset.mundo=id;b.setAttribute('aria-controls',cards.id);b.onclick=()=>{mundo=id;render();aoSelecionarCorpo?.(id);};presets.append(b);}
 render();if(estadoSalvo?.mundo)aoSelecionarCorpo?.(mundo);
 return {element,inspect:()=>({tipo:config.tipo,mundo}),dispose(){if(disposed)return;disposed=true;element.remove();}};
}
