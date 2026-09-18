import {obterVeiculo} from './hangar-vehicles.js?v=7';
import {criarCena} from './hangar-scene.js?v=6';

const $=s=>document.querySelector(s),buttons=new Map();
const vehicle=obterVeiculo(new URLSearchParams(location.search).get('modelo')),PARTES=vehicle.partes,FONTES=vehicle.fontes;
document.title=`${vehicle.nome} · Hangar`;
$('#vehicle-name').textContent=vehicle.nome;$('#mission-name').textContent=vehicle.missao;$('#vehicle-subtitle').textContent=vehicle.subtitulo;
$('#viewport').setAttribute('aria-label',`Modelo tridimensional · ${vehicle.titulo}`);
$('#part-count').textContent=`${PARTES.length} conjuntos`;
$('#parts').setAttribute('aria-label',`Componentes de ${vehicle.nome}`);
if(vehicle.id==='shuttle'){
 $('#visual-credit').textContent='Fuselagem, janelas, portas e motores: Space Shuttle (D), NASA 3D Resources, adaptado para este hangar. Hubble, braço e conjunto de lançamento são modelos didáticos próprios. Os mapas originais da NASA incluem pinturas de outras épocas: a aparência não é uma réplica exata da STS-31 de 1990. Marcas NASA são protegidas e não indicam endosso do aplicativo.';
 const source=document.createElement('a');source.href='https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/Space%20Shuttle%20(D)';source.target='_blank';source.rel='noopener';source.textContent='Modelo original da NASA ↗';$('.credits').append(source);
}else{
 $('#visual-credit').textContent='Casco do Saturn V e módulo lunar Eagle: NASA 3D Resources, adaptados para a vista explodida. Os mapas genéricos do foguete original foram substituídos por materiais e marcações inspirados no SA-506 da Apollo 11. Painéis do SLA e motores J-2 internos são complementos didáticos. Não há patrocínio ou aprovação da NASA.';
 const source=document.createElement('a');source.href='https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/Saturn%20V';source.target='_blank';source.rel='noopener';source.textContent='Modelos originais da NASA ↗';$('.credits').append(source);
}
$('.intro .eyebrow').textContent=vehicle.destino;$('.intro h2').textContent=vehicle.intro;$('.intro>p:not(.eyebrow)').textContent=vehicle.descricao;
const stats=$('.stats');stats.replaceChildren();for(const [value,label]of vehicle.stats){const item=document.createElement('span'),b=document.createElement('b');b.textContent=value;item.append(b,document.createTextNode(label));stats.append(item);}
$('#vehicle-footer').replaceChildren(document.createTextNode('Modelo didático, com proporções e detalhes aproximados. Esta animação não representa a sequência de voo. '));
const missionLink=document.createElement('a');missionLink.href=vehicle.url;missionLink.target='_blank';missionLink.rel='noopener';missionLink.textContent='Conheça a missão na NASA ↗';$('#vehicle-footer').append(missionLink);
$('#reveal').hidden=vehicle.id!=='shuttle';$('#reveal').onclick=()=>select('hubble');
let state={selected:null,exploded:false,isolated:false},scene=null,rotating=false;
const mobile=matchMedia('(max-width: 680px)'),sheet=$('#selection-sheet');
let returnFocus=null;
function element(tag,text,className){const el=document.createElement(tag);if(text)el.textContent=text;if(className)el.className=className;return el;}
for(const [i,p]of PARTES.entries()){
 const b=element('button');b.type='button';b.setAttribute('aria-pressed','false');b.append(element('span',String(i+1).padStart(2,'0')),document.createTextNode(p.curto));
 b.title=p.nome;b.dataset.part=p.id;b.onclick=()=>select(p.id);$('#parts').append(b);buttons.set(p.id,b);
}
function renderDetail(p){
 const detail=$('#detail');detail.replaceChildren(element('p',p.nome,'eyebrow'),element('h2',p.apelido),element('p',p.crianca),element('p',p.analogia,'analogy'),element('h3','O que aconteceu com esta peça?'),element('p',p.destino),element('p',p.pergunta,'question'));
 const advanced=element('details');advanced.id='advanced';advanced.append(element('summary','Quero saber mais · dados técnicos'),element('p',p.detalhes));
 const dl=element('dl');for(const [name,value]of p.numeros){const row=element('div');row.append(element('dt',name),element('dd',value));dl.append(row);}advanced.append(dl);
 const sources=element('div',null,'sources');sources.append(element('h3','Fontes para investigar'));
 for(const key of p.fontes){const f=FONTES[key],a=element('a',f.nome+' ↗');a.href=f.url;a.target='_blank';a.rel='noopener';sources.append(a);}advanced.append(sources);detail.append(advanced);
 document.body.classList.add('has-selection');
 sheet.scrollTop=0;if(!mobile.matches)$('.aside-scroll').scrollTop=0;
}
function showDetail(value){
 const open=Boolean(value&&mobile.matches),wasOpen=document.body.classList.contains('detail-open');
 if(open&&!wasOpen)returnFocus=document.activeElement;
 document.body.classList.toggle('detail-open',open);sheet.setAttribute('aria-hidden',String(mobile.matches&&!open));sheet.inert=mobile.matches&&!open;
 sheet.setAttribute('role',open?'dialog':'region');sheet.setAttribute('aria-modal',String(open));sheet.setAttribute('aria-label','Detalhes da peça selecionada');
 if(open&&!wasOpen)sheet.focus?.({preventScroll:true});
 if(!open){sheet.style.transform='';if(wasOpen)returnFocus?.focus?.({preventScroll:true});}
}
function syncDetailMode(){showDetail(document.body.classList.contains?.('detail-open'));if(!mobile.matches){sheet.inert=false;sheet.setAttribute('aria-hidden','false');}}
mobile.addEventListener('change',syncDetailMode);$('#close-detail').onclick=$('#sheet-backdrop').onclick=()=>showDetail(false);
let sheetDrag=null;const sheetHead=$('#sheet-head');
sheetHead.addEventListener('pointerdown',e=>{if(!mobile.matches)return;sheetDrag={start:e.clientY,dy:0};sheetHead.setPointerCapture?.(e.pointerId);});
sheetHead.addEventListener('pointermove',e=>{if(!sheetDrag)return;sheetDrag.dy=Math.max(0,e.clientY-sheetDrag.start);sheet.style.transform=`translateY(${sheetDrag.dy}px)`;});
sheetHead.addEventListener('pointerup',()=>{if(!sheetDrag)return;const close=sheetDrag.dy>80;sheetDrag=null;sheet.style.transform='';showDetail(!close);});
sheetHead.addEventListener('pointercancel',()=>{sheetDrag=null;sheet.style.transform='';});
sheet.addEventListener('keydown',e=>{if(!mobile.matches||!document.body.classList.contains('detail-open'))return;if(e.key==='Escape'){e.preventDefault();showDetail(false);}if(e.key==='Tab'){const items=[...sheet.querySelectorAll('button:not(:disabled),a,summary')].filter(el=>el.getClientRects().length);const first=items[0],last=items[items.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===sheet)){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}});
function sync(){
 const p=PARTES.find(p=>p.id===state.selected);
 $('#explode').textContent=state.exploded?'Montar conjunto':'Separar as peças';$('#explode').setAttribute('aria-pressed',String(state.exploded));
 $('#isolate').textContent=state.isolated?'Voltar ao conjunto':'Ver só esta peça';$('#isolate').setAttribute('aria-pressed',String(state.isolated));
 $('#focus').disabled=$('#isolate').disabled=$('#pivot').disabled=!p||!scene;
 $('#view-label').textContent=state.isolated?'EXPLORANDO UMA PEÇA':state.exploded?'VISTA EXPLODIDA · PARA ESTUDAR':'CONJUNTO MONTADO';
 $('#selected-label').textContent=p?p.nome:vehicle.titulo;
 $('#scene-note').textContent=state.isolated?'Arraste em qualquer direção para explorar.':state.exploded?vehicle.separacao:vehicle.nota;
 for(const [id,b]of buttons)b.setAttribute('aria-pressed',String(id===state.selected));scene?.setState(state);
}
function select(id){const p=PARTES.find(p=>p.id===id);if(!p)return;state.selected=id;
 if((vehicle.revelar.includes(id)||(vehicle.id==='shuttle'&&id==='arm'))&&!state.exploded)state.exploded=true;
 renderDetail(p);sync();showDetail(true);
}
$('#explode').onclick=()=>{state.exploded=!state.exploded;state.isolated=false;sync();};
$('#isolate').onclick=()=>{state.isolated=!state.isolated;if(state.isolated)state.exploded=true;sync();};
$('#overview').onclick=()=>{state.isolated=false;sync();scene?.overview();};
$('#focus').onclick=()=>scene?.focus();$('#zoom-in').onclick=()=>scene?.zoom(.8);$('#zoom-out').onclick=()=>scene?.zoom(1.25);
$('#pivot').onclick=()=>state.selected&&scene?.setPivot(state.selected);
function showHelp(value){$('#nav-help').hidden=!value;$('#help').setAttribute('aria-expanded',String(value));}
$('#help').onclick=()=>showHelp($('#nav-help').hidden);$('#close-help').onclick=()=>showHelp(false);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function syncMotion(){if(reducedMotion.matches){rotating=false;scene?.rotate(false);$('#rotate').setAttribute('aria-pressed','false');}$('#rotate').disabled=reducedMotion.matches||!scene;}
reducedMotion.addEventListener('change',syncMotion);
$('#rotate').onclick=()=>{rotating=!rotating;$('#rotate').setAttribute('aria-pressed',String(rotating));scene?.rotate(rotating);};
function failure(){const box=$('#error');box.hidden=false;box.textContent='A vista 3D não está disponível neste navegador. Você ainda pode explorar todas as peças e suas histórias na lista abaixo.';
 document.querySelectorAll('.toolbar button,.zoom button,.part-actions button').forEach(b=>b.disabled=true);
}
function pivotChanged({label,x,y,show}){$('#pivot-label').textContent=label;if(!show)return;const el=$('#pivot-indicator');el.style.left=`${x}px`;el.style.top=`${y}px`;el.classList.remove('show');void el.offsetWidth;el.classList.add('show');}
try{scene=criarCena({canvas:$('#rocket'),viewport:$('#viewport'),labels:$('#piece-labels'),onSelect:select,onPivotChange:pivotChanged,partes:PARTES,positionForPart:vehicle.positionForPart,buildModel:vehicle.buildModel});sync();syncMotion();}
catch(error){console.warn('Hangar: WebGL indisponível.',error.message);sync();failure();}
syncDetailMode();
$('#rocket').addEventListener('webglcontextlost',e=>{e.preventDefault();scene?.dispose();scene=null;failure();});
// Opt-in diagnostics only when explicitly requested by local tests.
if(new URLSearchParams(location.search).has('test'))window.__hangar={inspect:()=>scene?.inspect(),project:id=>scene?.project(id)};
