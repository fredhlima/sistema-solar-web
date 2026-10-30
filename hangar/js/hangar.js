import {localizarMissoesLunar} from './lunar-localized.js?v=303';
import {localizarMissoesSaturno} from './saturn-localized.js?v=303';
import {localizarMissoesShuttle} from './shuttle-localized.js?v=303';
import {ht, getIdiomaHangar, aplicarIdiomaHangar} from './hangar-i18n.js?v=303';
import {localizarMissoesHubble} from './hubble-localized.js?v=303';
aplicarIdiomaHangar();
document.title=ht('Hangar · Explorar nave');
import {prepararModuloLunarAtual} from './apollo-nasa.js?v=3';
import {obterVeiculo} from './hangar-vehicles.js?v=303';
import {MISSOES_NAVE} from './hangar-mission-data.js?v=303';
import {criarCena} from './hangar-scene.js?v=303';

const $=s=>document.querySelector(s),buttons=new Map();
const textoUI = (selector, key) => { const node = document.querySelector(selector); if (node) node.textContent = ht(key); };
const ariaUI = (selector, key) => { const node = document.querySelector(selector); if (node) node.setAttribute('aria-label', ht(key)); };
for (const [selector,key] of Object.entries({'#mission-open':'Sobre a nave','#pivot-indicator span':'Novo centro','#pivot-label':'Conjunto inteiro','#isolate':'Ver peça','#mobile-selection':'Ler','#mobile-sheet-title':'Peças','#tools-panel > h3':'Visualização','#zoom-in':'+ Aproximar','#zoom-out':'− Afastar','#rotate':'Girar automaticamente','#focus':'Enquadrar peça','#pivot':'Girar ao redor da peça','#reveal':'Ver Hubble','#help':'Como navegar','.credits summary':'Fontes visuais e licenças','.credits > a':'Política de mídia da NASA ↗','#mobile-parts span':'Peças','#explode':'Separar peças','#overview':'Enquadrar','#mobile-more span':'Controles','.back span':'Naves'})) textoUI(selector,key);
for (const [selector,key] of Object.entries({'.back':'Voltar ao catálogo de naves','#rocket':'Modelo 3D. Arraste para girar ou use as setas do teclado. Faça pinça ou use mais e menos para aproximar e afastar. Use Peças para selecionar componentes.','#selection-bar':'Peça selecionada','#previous-part':'Peça anterior','#next-part':'Próxima peça','#zoom-in':'Aproximar câmera','#zoom-out':'Afastar câmera','#mobile-dock':'Controles principais'})) ariaUI(selector,key);
document.querySelector('.pivot-status > span').textContent=ht('Centro: ');
const listTitle=document.querySelector('.list-title'); listTitle.firstChild.textContent=ht('Escolha uma parte')+' ';
for(const p of document.querySelectorAll('#nav-help p')) { if(p.firstElementChild){const b=p.firstElementChild;b.textContent=ht(b.textContent); if(b.nextSibling) b.nextSibling.textContent=ht(b.nextSibling.textContent);}else p.textContent=ht(p.textContent); }
const vehicle=obterVeiculo(new URLSearchParams(location.search).get('modelo')),PARTES=vehicle.partes,FONTES=vehicle.fontes;
document.title=`${vehicle.nome} · Hangar`;
$('#vehicle-name').textContent=vehicle.nome;$('#mission-name').textContent=vehicle.missao;$('#vehicle-subtitle').textContent=vehicle.subtitulo;
$('#viewport').setAttribute('aria-label',ht('Modelo tridimensional · {name}',{name:vehicle.titulo}));
$('#part-count').textContent=ht('{n} conjuntos',{n:PARTES.length});
$('#parts').setAttribute('aria-label',ht('Componentes de {name}',{name:vehicle.nome}));
if(vehicle.id==='shuttle'){
 $('#visual-credit').textContent=ht('Fuselagem, janelas, portas e motores: Space Shuttle (D), NASA 3D Resources, adaptado para este hangar. Hubble, braço e conjunto de lançamento são modelos didáticos próprios. Os mapas originais da NASA incluem pinturas de outras épocas: a aparência não é uma réplica exata da STS-31 de 1990. Marcas NASA são protegidas e não indicam endosso do aplicativo.');
 const source=document.createElement('a');source.href='https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/Space%20Shuttle%20(D)';source.target='_blank';source.rel='noopener';source.textContent=ht('Modelo original da NASA ↗');$('.credits').append(source);
}else if(vehicle.visualCredit){
 $('#visual-credit').textContent=ht(vehicle.visualCredit);
 const source=document.createElement('a');source.href=vehicle.visualSource;source.target='_blank';source.rel='noopener';source.textContent=ht('Modelo original da NASA ↗');$('.credits').append(source);
}else{
 $('#visual-credit').textContent=ht('Casco do Saturn V e módulo lunar Eagle: NASA 3D Resources (módulo NASA/Michael D. Carbajal), adaptados para a vista explodida. Os mapas genéricos do foguete original foram substituídos por materiais e marcações inspirados no SA-506 da Apollo 11. Painéis do SLA e motores J-2 internos são complementos didáticos. Não há patrocínio ou aprovação da NASA.');
 const source=document.createElement('a');source.href='https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/Saturn%20V';source.target='_blank';source.rel='noopener';source.textContent=ht('Modelos originais da NASA ↗');$('.credits').append(source);
}
$('.intro .eyebrow').textContent=vehicle.destino;$('.intro h2').textContent=vehicle.intro;$('.intro>p:not(.eyebrow)').textContent=vehicle.descricao;
const stats=$('.stats');stats.replaceChildren();for(const [value,label]of vehicle.stats){const item=document.createElement('span'),b=document.createElement('b');b.textContent=value;item.append(b,document.createTextNode(label));stats.append(item);}
$('#vehicle-footer').replaceChildren(document.createTextNode(ht('Modelo didático, com proporções e detalhes aproximados. Esta animação não representa a sequência de voo. ')));
const missionLink=document.createElement('a');missionLink.href=vehicle.url;missionLink.target='_blank';missionLink.rel='noopener';missionLink.textContent=ht('Conheça a missão na NASA ↗');$('#vehicle-footer').append(missionLink);
$('#reveal').hidden=vehicle.id!=='shuttle';$('#reveal').onclick=()=>select('hubble');
let state={selected:null,exploded:false,isolated:false},scene=null,rotating=false,panelMode=null;
const panel=$('aside'),sheet=$('#selection-sheet');let returnFocus=null;
const readingButton=['hubble','saturno','shuttle','modulo-lunar','perseverance','ingenuity','cassini','jwst'].includes(vehicle.id)?element('button',ht('Ampliar leitura')):null;
let readingScroll=0;
function expandReading(expanded,focus=true){
 if(!readingButton)return;
 const scroll=$('.aside-scroll');
 if(expanded)readingScroll=scroll.scrollTop;
 document.body.classList.toggle('reading-expanded',expanded);
 readingButton.textContent=expanded?ht('Voltar ao modelo'):ht('Ampliar leitura');
 readingButton.setAttribute('aria-expanded',String(expanded));
 for(const selector of ['.app-header','#mobile-dock','#viewport','#selection-bar'])$(selector).inert=expanded;
 if(expanded){panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');}
 else{panel.removeAttribute('role');panel.removeAttribute('aria-modal');}
 if(!expanded)requestAnimationFrame(()=>{scroll.scrollTop=readingScroll;if(focus)readingButton.focus({preventScroll:true});});
 else $('#mobile-sheet-title').focus({preventScroll:true});
}
if(readingButton){
 readingButton.id='reading-toggle';readingButton.type='button';readingButton.hidden=true;
 readingButton.setAttribute('aria-expanded','false');readingButton.setAttribute('aria-controls','selection-sheet mission-panel');
 $('.panel-head').append(readingButton);
 readingButton.onclick=()=>expandReading(!document.body.classList.contains('reading-expanded'));
}
function element(tag,text,className){const el=document.createElement(tag);if(text)el.textContent=text;if(className)el.className=className;return el;}
if(vehicle.resumo){
 const overview=$('#mission-overview');overview.hidden=false;
 overview.append(element('h3',ht('Sobre esta missão')),element('p',vehicle.resumo.introducao));
 const facts=element('dl');for(const [name,value]of vehicle.resumo.fatos){const row=element('div');row.append(element('dt',name),element('dd',value));facts.append(row);}overview.append(facts);
 const sources=element('div',null,'sources');for(const key of vehicle.resumo.fontes){const f=FONTES[key],a=element('a',f.nome+' ↗');a.href=f.url;a.target='_blank';a.rel='noopener';sources.append(a);}overview.append(sources);
}
const localizeMission={hubble:localizarMissoesHubble,saturno:localizarMissoesSaturno,shuttle:localizarMissoesShuttle,'modulo-lunar':localizarMissoesLunar}[vehicle.id];
const mission=localizeMission?localizeMission(MISSOES_NAVE[vehicle.id],getIdiomaHangar()):MISSOES_NAVE[vehicle.id],missionDetail=$('#mission-detail');
if(mission){
 missionDetail.append(element('p',vehicle.missao,'eyebrow'),element('h2',vehicle.nome),element('p',mission.resumo),element('h3',ht('Curiosidades')));
 const curiosity=element('ul');for(const item of mission.curiosidades)curiosity.append(element('li',item));missionDetail.append(curiosity,element('h3',ht('Principais missões')));
 const timeline=element('ol',null,'mission-timeline');for(const item of mission.missoes){const li=element('li');li.append(element('h3',item.titulo),element('p',item.texto));timeline.append(li);}missionDetail.append(timeline);
 const sources=element('div',null,'sources');sources.append(element('h3',ht('Fontes')));for(const source of mission.fontes){const a=element('a',source.nome+' ↗');a.href=source.url;a.target='_blank';a.rel='noopener';sources.append(a);}missionDetail.append(sources);
}
for(const [i,p]of PARTES.entries()){
 const b=element('button');b.type='button';b.setAttribute('aria-pressed','false');b.append(element('span',String(i+1).padStart(2,'0')),document.createTextNode(p.curto));
 b.title=p.nome;b.dataset.part=p.id;b.onclick=()=>select(p.id);$('#parts').append(b);buttons.set(p.id,b);
}
function renderDetail(p){
 const detail=$('#detail');detail.replaceChildren(element('p',p.nome,'eyebrow'),element('h2',p.apelido),element('p',p.crianca),element('p',p.analogia,'analogy'),element('h3',ht('O que aconteceu com esta peça?')),element('p',p.destino));
 if(p.pergunta){const rotulo=ht('Para pensar');detail.append(element('h3',rotulo,'question-heading'),element('p',p.pergunta,'question'));}
 const advanced=element('details');advanced.id='advanced';advanced.append(element('summary',ht('Quero saber mais · dados técnicos')),element('p',p.detalhes));
 const dl=element('dl');for(const [name,value]of p.numeros){const row=element('div');row.append(element('dt',name),element('dd',value));dl.append(row);}advanced.append(dl);
 if(p.engenharia)advanced.append(element('h3',ht('Como a engenharia resolvia')),element('p',p.engenharia));
 for(const [title,items]of [[ht('Curiosidades'),p.curiosidades],[ht('Missões e momentos importantes'),p.missoes]])if(items?.length){const section=element('section',null,'advanced-section');section.append(element('h3',title));const list=element('ul');for(const item of items)list.append(element('li',item));section.append(list);advanced.append(section);}
 const sources=element('div',null,'sources');sources.append(element('h3',ht('Fontes para investigar')));
 for(const key of p.fontes){const f=FONTES[key],a=element('a',f.nome+' ↗');a.href=f.url;a.target='_blank';a.rel='noopener';sources.append(a);}advanced.append(sources);detail.append(advanced);
 if(['perseverance','ingenuity','cassini','jwst'].includes(vehicle.id))detail.append(element('p',vehicle.visualCredit,'sources'));
 document.body.classList.add('has-selection');
 $('.aside-scroll').scrollTop=0;
}
function showPanel(mode){
 if(mode==='detail'&&!state.selected)return;
 if(document.body.classList.contains('reading-expanded'))expandReading(false,false);
 if(readingButton)readingButton.hidden=!['detail','mission'].includes(mode);
 if(mode&&!panelMode)returnFocus=document.activeElement;
 panelMode=mode;panel.hidden=!mode;panel.inert=!mode;
 document.body.classList.toggle('panel-open',!!mode);
 for(const key of ['detail','parts','tools','mission'])document.body.classList.toggle(key+'-open',mode===key||(key==='detail'&&mode==='mission'));
 $('#parts-panel').hidden=mode!=='parts';sheet.hidden=mode!=='detail';$('#tools-panel').hidden=mode!=='tools';$('#mission-panel').hidden=mode!=='mission';$('#mission-open').setAttribute('aria-expanded',String(mode==='mission'));$('#mobile-selection').setAttribute('aria-expanded',String(mode==='detail'));
 $('#mobile-sheet-title').textContent=mode==='detail'?PARTES.find(p=>p.id===state.selected)?.curto:mode==='parts'?ht('Peças do veículo'):mode==='mission'?ht('Sobre a nave'):ht('Controles');
 $('#mobile-parts').setAttribute('aria-expanded',String(mode==='parts'));$('#mobile-more').setAttribute('aria-expanded',String(mode==='tools'));
 $('.aside-scroll').scrollTop=0;
 const back=$('.back');back.querySelector('span').textContent=back.dataset.guided?ht('Voltar ao roteiro'):mode?ht('Nave'):ht('Naves');back.setAttribute('aria-label',back.dataset.guided?ht('Voltar ao roteiro'):mode?ht('Voltar à nave'):ht('Voltar ao catálogo de naves'));
 if(mode)$('#mobile-sheet-title').focus({preventScroll:true});else (returnFocus?.isConnected&&!returnFocus.closest('[hidden]')?returnFocus:$('#mobile-parts')).focus({preventScroll:true});
}
$('.back').addEventListener('click',event=>{if(panelMode){event.preventDefault();if(document.body.classList.contains('reading-expanded'))expandReading(false);else showPanel(null);}});
document.addEventListener('keydown',e=>{
 if(e.key==='Tab'&&document.body.classList.contains('reading-expanded')){
  const items=[...panel.querySelectorAll('button,a[href],summary,[tabindex="0"]')].filter(el=>{
   if(el.disabled||el.closest('[hidden],[inert]')||!el.getClientRects().length)return false;
   for(let ancestor=el.parentElement;ancestor&&ancestor!==panel;ancestor=ancestor.parentElement)if(ancestor.matches('details:not([open])')&&!ancestor.querySelector(':scope > summary')?.contains(el))return false;
   return true;
  });
  const first=items[0],last=items.at(-1),inside=items.includes(document.activeElement);
  if(!inside||(e.shiftKey&&document.activeElement===first)||(!e.shiftKey&&document.activeElement===last)){e.preventDefault();(e.shiftKey?last:first)?.focus();}
 }
 if(e.key==='Escape'&&panelMode){e.preventDefault();e.stopImmediatePropagation();if(document.body.classList.contains('reading-expanded'))expandReading(false);else showPanel(null);}});
function sync(){
 const p=PARTES.find(p=>p.id===state.selected),index=PARTES.findIndex(p=>p.id===state.selected);
 $('#explode').textContent=state.exploded?ht('Montar'):ht('Separar');$('#explode').setAttribute('aria-pressed',String(state.exploded));
 $('#selection-bar').hidden=!p;$('#mobile-selection').disabled=!p;
 $('#isolate').textContent=state.isolated?ht('Conjunto'):ht('Ver peça');$('#isolate').setAttribute('aria-label',state.isolated?ht('Voltar ao conjunto'):ht('Isolar e enquadrar peça'));$('#isolate').setAttribute('aria-pressed',String(state.isolated));
 $('#focus').disabled=$('#isolate').disabled=$('#pivot').disabled=!p||!scene;
 $('#view-label').textContent=state.isolated?ht('EXPLORANDO UMA PEÇA'):state.exploded?ht('PEÇAS SEPARADAS'):ht('CONJUNTO MONTADO');
 $('#selected-label').textContent=p?.curto||vehicle.titulo;$('#selection-count').textContent=p?ht('{n} de {total}',{n:index+1,total:PARTES.length}):'';
 $('#scene-note').textContent=state.exploded?vehicle.separacao:vehicle.nota;
 for(const [id,b]of buttons)b.setAttribute('aria-pressed',String(id===state.selected));scene?.setState(state);
}
function select(id){const p=PARTES.find(p=>p.id===id);if(!p)return;state.selected=id;
 if((vehicle.revelar.includes(id)||(vehicle.id==='shuttle'&&id==='arm'))&&!state.exploded)state.exploded=true;
 renderDetail(p);sync();showPanel('detail');
}
function adjacent(step){const i=PARTES.findIndex(p=>p.id===state.selected);select(PARTES[(i+step+PARTES.length)%PARTES.length].id);}
$('#previous-part').onclick=()=>adjacent(-1);$('#next-part').onclick=()=>adjacent(1);
$('#explode').onclick=()=>{state.exploded=!state.exploded;state.isolated=false;sync();};
$('#mobile-parts').onclick=()=>showPanel(panelMode==='parts'?null:'parts');
$('#mobile-selection').onclick=()=>showPanel(panelMode==='detail'?null:'detail');
$('#mission-open').onclick=()=>showPanel(panelMode==='mission'?null:'mission');
$('#mobile-more').onclick=()=>showPanel(panelMode==='tools'?null:'tools');
$('#isolate').onclick=()=>{state.isolated=!state.isolated;if(state.isolated)state.exploded=true;showPanel(null);sync();requestAnimationFrame(()=>{if(state.isolated)scene?.focus();else scene?.overview();});};
$('#overview').onclick=()=>{state.isolated=false;showPanel(null);sync();scene?.overview();};
$('#focus').onclick=()=>{showPanel(null);requestAnimationFrame(()=>scene?.focus());};
$('#zoom-in').onclick=()=>scene?.zoom(.8);$('#zoom-out').onclick=()=>scene?.zoom(1.25);
$('#pivot').onclick=()=>{if(state.selected){showPanel(null);scene?.setPivot(state.selected);}};
$('#help').onclick=()=>{const open=$('#nav-help').hidden;$('#nav-help').hidden=!open;$('#help').setAttribute('aria-expanded',String(open));};
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function syncMotion(){if(reducedMotion.matches){rotating=false;scene?.rotate(false);$('#rotate').setAttribute('aria-pressed','false');}$('#rotate').disabled=reducedMotion.matches||!scene;}
reducedMotion.addEventListener('change',syncMotion);
$('#rotate').onclick=()=>{rotating=!rotating;$('#rotate').setAttribute('aria-pressed',String(rotating));scene?.rotate(rotating);};
$('#rocket').addEventListener('keydown',event=>{
 if(!scene)return;
 const turns={ArrowLeft:[-.15,0],ArrowRight:[.15,0],ArrowUp:[0,-.15],ArrowDown:[0,.15]};
 if(turns[event.key]){event.preventDefault();scene.orbit(...turns[event.key]);}
 else if(['+','=','-','_'].includes(event.key)){event.preventDefault();scene.zoom(['+','='].includes(event.key)?.85:1.15);}
});
function failure(){const box=$('#error');box.hidden=false;box.textContent=ht('A vista 3D não está disponível. Use Peças para explorar as histórias.');
 for(const selector of ['#explode','#overview','#zoom-in','#zoom-out','#rotate','#focus','#pivot','#isolate'])$(selector).disabled=true;
}
function pivotChanged({label,x,y,show}){$('#pivot-label').textContent=ht(label);if(!show)return;const el=$('#pivot-indicator');el.style.left=`${x}px`;el.style.top=`${y}px`;el.classList.remove('show');void el.offsetWidth;el.classList.add('show');}
try{if(vehicle.id==='saturno')await prepararModuloLunarAtual();await vehicle.prepare?.();scene=criarCena({canvas:$('#rocket'),viewport:$('#viewport'),labels:$('#piece-labels'),onSelect:select,onPivotChange:pivotChanged,partes:PARTES,positionForPart:vehicle.positionForPart,buildModel:vehicle.buildModel});sync();syncMotion();}
catch(error){console.warn('Hangar: WebGL indisponível.',error.message);sync();failure();}
showPanel(null);
const parteGuiada=new URLSearchParams(location.search).get('peca');
if(({hubble:['tube','equipment','solar-left','solar-right','aperture','camera'],saturno:['sic','inter1','sii','inter2','sivb','iu','sla','lm','sm','cm','les'],ingenuity:['body','legs','rotorLower','rotorUpper','solar'],perseverance:['cruise','backshell','heatshield','parachute','descent','rover'],'modulo-lunar':['descent','ascent','legs','engine','antennas'],shuttle:['orbiter','tank','srb-left','srb-right','engines','door-left','door-right','arm','hubble']}[vehicle.id]?.includes(parteGuiada))&&new URLSearchParams(location.search).get('roteiro')==='1'&&window.parent!==window){
 state.exploded=true;state.isolated=true;select(parteGuiada);
 const back=$('.app-header .back');const rotulo=ht('Voltar ao roteiro');back.dataset.guided='true';back.querySelector('span').textContent=rotulo;back.setAttribute('aria-label',rotulo);back.href='#';
 back.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();window.parent.postMessage({tipo:'hangar:fechar'},window.location.origin);},{capture:true});
}
$('#rocket').addEventListener('webglcontextlost',e=>{e.preventDefault();if(scene?.inspect().disposed)return;scene?.dispose();scene=null;failure();});
if(new URLSearchParams(location.search).has('test'))window.__hangar={inspect:()=>scene?.inspect(),project:id=>scene?.project(id)};
window.addEventListener('pagehide',()=>scene?.dispose(),{once:true});
