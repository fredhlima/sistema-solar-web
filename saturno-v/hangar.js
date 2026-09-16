import {PARTES,FONTES} from './saturno-v-data.js?v=3';
import {criarCena} from './hangar-scene.js?v=2';

const $=s=>document.querySelector(s),buttons=new Map();
let state={selected:null,exploded:false,isolated:false},scene=null,rotating=false;
const mobile=matchMedia('(max-width: 680px)'),sheet=$('#selection-sheet');
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
 const aside=$('aside');if(getComputedStyle(aside).overflowY==='auto')aside.scrollTop=0;
}
function showDetail(value){
 const open=value&&mobile.matches;document.body.classList.toggle('detail-open',open);sheet.setAttribute('aria-hidden',String(mobile.matches&&!open));sheet.inert=mobile.matches&&!open;if(!open)sheet.style.transform='';
}
function syncDetailMode(){showDetail(document.body.classList.contains?.('detail-open'));if(!mobile.matches){sheet.inert=false;sheet.setAttribute('aria-hidden','false');}}
mobile.addEventListener('change',syncDetailMode);$('#close-detail').onclick=$('#sheet-backdrop').onclick=()=>showDetail(false);
let sheetDrag=null;const sheetHead=$('#sheet-head');
sheetHead.addEventListener('pointerdown',e=>{if(!mobile.matches)return;sheetDrag={start:e.clientY,dy:0};sheetHead.setPointerCapture?.(e.pointerId);});
sheetHead.addEventListener('pointermove',e=>{if(!sheetDrag)return;sheetDrag.dy=Math.max(0,e.clientY-sheetDrag.start);sheet.style.transform=`translateY(${sheetDrag.dy}px)`;});
sheetHead.addEventListener('pointerup',()=>{if(!sheetDrag)return;const close=sheetDrag.dy>80;sheetDrag=null;sheet.style.transform='';showDetail(!close);});
function sync(){
 const p=PARTES.find(p=>p.id===state.selected);
 $('#explode').textContent=state.exploded?'Montar foguete':'Separar as peças';$('#explode').setAttribute('aria-pressed',String(state.exploded));
 $('#isolate').textContent=state.isolated?'Voltar ao conjunto':'Ver só esta peça';$('#isolate').setAttribute('aria-pressed',String(state.isolated));
 $('#focus').disabled=$('#isolate').disabled=$('#pivot').disabled=!p||!scene;
 $('#view-label').textContent=state.isolated?'EXPLORANDO UMA PEÇA':state.exploded?'VISTA EXPLODIDA · PARA ESTUDAR':'FOGUETE MONTADO';
 $('#selected-label').textContent=p?p.nome:'Saturno V / Apollo 11';
 $('#scene-note').textContent=state.isolated?'Arraste em qualquer direção para explorar.':state.exploded?'Esta separação é didática. No voo, cada peça saía em um momento.':'O foguete que iniciou a primeira viagem de pouso na Lua.';
 for(const [id,b]of buttons)b.setAttribute('aria-pressed',String(id===state.selected));scene?.setState(state);
}
function select(id){const p=PARTES.find(p=>p.id===id);if(!p)return;state.selected=id;
 if(['lm','cm'].includes(id)&&!state.exploded)state.exploded=true;
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
try{scene=criarCena({canvas:$('#rocket'),viewport:$('#viewport'),labels:$('#piece-labels'),onSelect:select,onPivotChange:pivotChanged});sync();syncMotion();}
catch(error){console.warn('Hangar: WebGL indisponível.',error.message);failure();}
syncDetailMode();
$('#rocket').addEventListener('webglcontextlost',e=>{e.preventDefault();scene?.dispose();scene=null;failure();});
// Opt-in diagnostics only when explicitly requested by local tests.
if(new URLSearchParams(location.search).has('test'))window.__hangar={inspect:()=>scene?.inspect(),project:id=>scene?.project(id)};
