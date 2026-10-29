import {TRILHAS, PERCURSO_ESSENCIAL} from './aprendizado-trilhas.js?v=301';
import { naveDisponivel } from './release-scope.js?v=301';
import { destinoNave } from '../hangar/js/hangar-access.js?v=301';
// A cena é o ponto de partida; Experiências é um menu contextual, sem barra permanente.
const TEXTOS={
 pt:{experiencias:'Experiências',aprender:'Aprender',hangar:'Hangar',hangarNota:'Naves em 3D · Hubble grátis',aprenderNota:'Descubra o espaço por assunto',fechar:'Fechar experiências',voltar:'Voltar às experiências',cena:'Só a cena',mostrar:'Mostrar controles',novo:'Começar · grátis',retomar:'Retomar',rever:'Rever roteiro',quiz:'Planetas grátis',pro:'Pro'},
 en:{experiencias:'Experiences',aprender:'Learn',hangar:'Hangar',hangarNota:'3D spacecraft · Free Hubble',aprenderNota:'Discover space by topic',fechar:'Close experiences',voltar:'Back to experiences',cena:'Scene only',mostrar:'Show controls',novo:'Start · free',retomar:'Resume',rever:'Review lesson',quiz:'Free planets',pro:'Pro'},
 es:{experiencias:'Experiencias',aprender:'Aprender',hangar:'Hangar',hangarNota:'Naves en 3D · Hubble gratis',aprenderNota:'Descubre el espacio por tema',fechar:'Cerrar experiencias',voltar:'Volver a experiencias',cena:'Solo la escena',mostrar:'Mostrar controles',novo:'Comenzar · gratis',retomar:'Retomar',rever:'Repasar recorrido',quiz:'Planetas gratis',pro:'Pro'}
};
export function iniciarNavegacao({motor,hangar,acoes,dock,aprendizado,premium,t,idioma='pt'}) {
 const copy=TEXTOS[idioma]||TEXTOS.pt;
 const percursoCopy={pt:{titulo:'Percurso essencial · grátis',capitulos:'capítulos concluídos',continuar:'Continuar',comecar:'Começar'},en:{titulo:'Essential path · free',capitulos:'chapters complete',continuar:'Continue',comecar:'Start'},es:{titulo:'Recorrido esencial · gratis',capitulos:'capítulos completados',continuar:'Continuar',comecar:'Comenzar'}}[idioma]||{titulo:'Percurso essencial · grátis',capitulos:'capítulos concluídos',continuar:'Continuar',comecar:'Começar'};
 const criar=(tag,text,cls)=>{const el=document.createElement(tag);if(text)el.textContent=text;if(cls)el.className=cls;return el;};
 const botao=(text,cls)=>{const b=criar('button',text,cls);b.type='button';return b;};
 const visivel=el=>!!el&&!el.hidden&&el.getClientRects().length>0&&getComputedStyle(el).display!=='none'&&getComputedStyle(el).visibility!=='hidden';
 let destino='universo',ultimaArea='universo',atividade=null,cinema=false,menuAberto=false,origem=null,observadorViewer;
 let guardando=false,iniciandoAtividade=false,restaurarTempo=null,naveSugerida=null,modoSugerido=null,retomarAposModo=null,retornoAtividade='experiencias',origemHangar='experiencias',retomarAposHangar=null,guiaSugerido=null,retornoEntreGuias=null;const retornosGuias=[];
 const entradas=[...document.querySelectorAll('#mdock-btn-xp,.experiencias-trigger')];
 const focarEntrada=()=>entradas.find(visivel)?.focus({preventScroll:true});
 const nav=criar('div',null,'experiencias-overlay');nav.id='destinations';nav.hidden=true;
 const menu=criar('section',null,'experiencias-painel');menu.setAttribute('role','dialog');menu.setAttribute('aria-modal','true');menu.setAttribute('aria-labelledby','experiences-title');
 const cabMenu=criar('header');const tituloMenu=criar('h1',copy.experiencias);tituloMenu.id='experiences-title';tituloMenu.tabIndex=-1;
 const fecharMenu=botao('×','experiencias-fechar');fecharMenu.setAttribute('aria-label',copy.fechar);fecharMenu.onclick=()=>fecharExperiencias();cabMenu.append(tituloMenu,fecharMenu);
 const conteudo=criar('div',null,'experiencias-conteudo'),destaques=criar('div',null,'experiencias-destaques'),grade=criar('div',null,'experiencias-grade');
 for(const [id,nome,nota,icone]of [['hangar',copy.hangar,copy.hangarNota,'✧'],['descobertas',copy.aprender,copy.aprenderNota,'◎']]){const b=botao();b.dataset.destination=id;const simbolo=criar('span',icone,'experiencias-icone');simbolo.setAttribute('aria-hidden','true');const texto=criar('span');texto.append(criar('strong',nome),criar('small',nota));b.append(simbolo,texto);b.onclick=()=>selecionar(id);destaques.append(b);}
 conteudo.append(destaques,grade);menu.append(cabMenu,conteudo);nav.append(menu);nav.onclick=e=>{if(e.target===nav)fecharExperiencias();};
 const painel=criar('div',null,'descobertas');painel.id='discoveries';painel.hidden=true;
 const biblioteca=criar('section',null,'aprendizado-biblioteca');biblioteca.setAttribute('role','dialog');biblioteca.setAttribute('aria-modal','true');biblioteca.setAttribute('aria-labelledby','discoveries-title');
 const cab=criar('header');const voltar=botao('‹','aprendizado-biblioteca-voltar');voltar.setAttribute('aria-label',copy.voltar);voltar.onclick=()=>abrirExperiencias();
 const titulo=criar('h1',copy.aprender);titulo.id='discoveries-title';titulo.tabIndex=-1;cab.append(voltar,titulo);
 const corpo=criar('div',null,'aprendizado-biblioteca-corpo'),listaGuias=criar('div',null,'roteiros-lista');const cartoesGuias=new Map();const roteiros=new Map(aprendizado.catalogo().map(r=>[r.id,r]));
 const grupos=new Map();
 const ordemTemas=['fundamentos','terra','lua','marte','observatorios','saturno','sondas-viagens'];
 const trilhasVisuais=[...TRILHAS].sort((a,b)=>{
  const ia=ordemTemas.indexOf(a.id),ib=ordemTemas.indexOf(b.id);
  return (ia<0?ordemTemas.length:ia)-(ib<0?ordemTemas.length:ib);
 });
 for(const trilha of trilhasVisuais){const secao=criar('section',null,'roteiros-trilha');secao.dataset.trilha=trilha.id;secao.dataset.grupo=trilha.grupo||'trilhas';const h=criar('h2',trilha.textos[idioma]?.titulo||trilha.textos.pt.titulo);h.id=`trilha-${trilha.id}`;secao.setAttribute('aria-labelledby',h.id);const lista=criar('div',null,'roteiros-trilha-lista');secao.append(h,criar('p',trilha.textos[idioma]?.descricao||trilha.textos.pt.descricao),lista);listaGuias.append(secao);grupos.set(trilha.id,lista);}
 const filtros=criar('div',null,'biblioteca-filtros'),categorias=criar('select');categorias.id='mundos-categoria';
 const nomesBiblioteca={pt:{trilhas:'Trilhas',mundos:'Mundos',categoria:'Categoria de mundos'},en:{trilhas:'Learning paths',mundos:'Worlds',categoria:'World category'},es:{trilhas:'Recorridos',mundos:'Mundos',categoria:'Categoría de mundos'}}[idioma]||{trilhas:'Trilhas',mundos:'Mundos',categoria:'Categoria de mundos'};
 let grupoBiblioteca='trilhas',categoriaMundos=TRILHAS.find(t=>t.grupo==='mundos')?.id;
 const percurso=criar('section',null,'roteiros-percurso'),percursoTitulo=criar('strong',percursoCopy.titulo),percursoProgresso=criar('span'),percursoBotao=botao(null,'roteiros-percurso-abrir');
 percurso.append(percursoTitulo,percursoProgresso,percursoBotao);
 categorias.setAttribute('aria-label',nomesBiblioteca.categoria);
 for(const t of TRILHAS.filter(t=>t.grupo==='mundos')){const option=criar('option',t.textos[idioma]?.titulo||t.textos.pt.titulo);option.value=t.id;categorias.append(option);}
 function filtrarBiblioteca(){for(const section of listaGuias.children)section.hidden=section.dataset.grupo!==grupoBiblioteca||(grupoBiblioteca==='mundos'&&section.dataset.trilha!==categoriaMundos);percurso.hidden=grupoBiblioteca!=='trilhas';for(const b of filtros.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.biblioteca===grupoBiblioteca));categorias.hidden=grupoBiblioteca!=='mundos';categorias.value=categoriaMundos;corpo.scrollTop=0;}
 for(const id of TRILHAS.some(t=>t.grupo==='mundos')?['trilhas','mundos']:['trilhas']){const b=botao(nomesBiblioteca[id]);b.dataset.biblioteca=id;b.onclick=()=>{grupoBiblioteca=id;filtrarBiblioteca();};filtros.append(b);}
 categorias.onchange=()=>{categoriaMundos=categorias.value;filtrarBiblioteca();};filtros.append(categorias);filtrarBiblioteca();
 const retomarGuia=botao(null,'roteiros-retomar');retomarGuia.id='resume-lesson';retomarGuia.hidden=true;
 const catalogo=aprendizado.catalogo();
 for(const id of TRILHAS.flatMap(trilha=>trilha.roteiros)){
  const roteiro=catalogo.find(r=>r.id===id);if(!roteiro)continue;
  const b=botao(null,'descobertas-sol');b.dataset.activity=roteiro.id;
  b.append(criar('strong',roteiro.titulo),criar('span',roteiro.descricao));const selo=criar('small');b.append(selo);
  b.onclick=()=>abrirAtividade(roteiro.id,b);cartoesGuias.set(roteiro.id,{botao:b,selo});(grupos.get(roteiro.trilha)||listaGuias).append(b);
 }
 corpo.append(percurso,retomarGuia,listaGuias);biblioteca.append(cab,filtros,corpo);painel.append(biblioteca);painel.onclick=e=>{if(e.target===painel)abrirExperiencias();};
 const atividades={
  quiz:{nome:t('btnQuiz'),acao:acoes.abrirQuiz,painel:'.quiz-overlay',nota:copy.quiz},
  comparador:{nome:t('btnTamanhos'),acao:acoes.abrirComparador,painel:'.comparador-overlay'},
  tour:{nome:t('btnTour'),acao:acoes.iniciarTour,painel:'.tour-card'},
  eventos:{nome:t('btnEventos'),acao:acoes.abrirEventos,painel:'.painel-eventos'},
  voce:{nome:t('btnVoce'),acao:acoes.abrirVoce,painel:'.voce-no-espaco-overlay'},
  estacoes:{nome:t('btnEstacoes'),acao:acoes.abrirEstacoes,painel:'#palco-estacoes',nota:copy.novo},
  mares:{nome:t('btnMares'),acao:acoes.abrirMares,painel:'#palco-mares',nota:copy.novo},
  ...Object.fromEntries(aprendizado.catalogo().map(r=>[r.id,{acao:()=>aprendizado.abrir(r.id,{voltar:retornoEntreGuias?.destino===r.id}),painel:'.aprendizado-sol',guia:true}]))
 };
 const selos=new Map();
 for(const [key,item]of Object.entries(atividades)){
  if(item.guia||!item.acao)continue;const b=botao();b.dataset.activity=key;b.append(criar('strong',item.nome));const nota=criar('small',item.nota);b.append(nota);if(item.recurso)selos.set(key,nota);b.onclick=()=>abrirAtividade(key,b);grade.append(b);
 }
 const tela=botao(copy.cena);tela.id='fullscreen-toggle';tela.onclick=()=>{menuAberto=false;cinema=true;render();sairCena.focus();};grade.append(tela);
 const sairCena=botao(copy.mostrar,'cena-mostrar-controles');sairCena.id='scene-exit';sairCena.hidden=true;sairCena.onclick=()=>{cinema=false;render();focarEntrada();};
 document.body.append(nav,painel,sairCena);document.body.classList.add('com-navegacao');
 for(const b of entradas){b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls',nav.id);b.onclick=()=>menuAberto?fecharExperiencias():abrirExperiencias();}
 const modoModal=()=>visivel(document.querySelector('.paywall-overlay'))||visivel(document.querySelector('.tutorial-overlay'))||!!hangar.frame?.contentDocument?.body?.classList.contains('reading-expanded')&&destino==='hangar';
 function render(){
  document.body.dataset.destino=destino;document.body.classList.toggle('nav-atividade',!!atividade);document.body.classList.toggle('nav-cinema',cinema);document.body.classList.toggle('nav-menu',menuAberto);
  document.body.classList.toggle('nav-guia',atividades[atividade]?.guia===true);
  nav.hidden=!menuAberto||!!atividade;painel.hidden=destino!=='descobertas'||!!atividade;sairCena.hidden=!cinema;
  for(const b of entradas)b.setAttribute('aria-expanded',String(menuAberto));
  const universo=destino!=='hangar'||!!atividade,ativo=(destino==='universo'&&!menuAberto)||!!atividade;
  document.querySelector('#cena').style.visibility=universo?'visible':'hidden';document.querySelector('#cena').inert=!ativo;
  motor.setAtivo(ativo);hangar.setAtivo(destino==='hangar'&&!atividade);
  atualizarGuias();for(const [key,selo]of selos)selo.textContent=premium.recurso(atividades[key].recurso)?'':copy.pro;
  bloquear();
 }
 function bloquear(){
  const modal=modoModal(),guia=document.querySelector('.aprendizado-sol');if(guia&&guia.inert!==modal)guia.inert=modal;
  nav.inert=modal||!!atividade;painel.inert=modal;
  const guiaAtivo=atividades[atividade]?.guia===true;
  const bloqueado=modal||menuAberto||!guiaAtivo&&(destino!=='universo'||!!atividade&&!document.body.classList.contains('quiz-encontrando'));
  for(const el of document.querySelectorAll('#mdock-btn-exp,#mdock-btn-xp'))el.inert=guiaAtivo||modal;
  for(const el of document.querySelectorAll('#mdock,.barra-acoes,.controles-tempo'))if(el.inert!==bloqueado)el.inert=bloqueado;
  if(document.body.classList.contains('nav-modal')!==modal)document.body.classList.toggle('nav-modal',modal);
 }
 function limparPaineis(){dock?.fecharPaineis();acoes.fecharPainelInfo?.();document.querySelector('.experiencias-itens')?.classList.remove('aberto');}
 function abrirExperiencias(){if(modoModal()||atividade)return false;limparPaineis();destino='universo';cinema=false;menuAberto=true;render();tituloMenu.focus({preventScroll:true});return true;}
 function fecharExperiencias(){menuAberto=false;render();focarEntrada();}
 function selecionar(next,forcar=false){
  if(!['universo','hangar','descobertas'].includes(next)||(!forcar&&(modoModal()||atividade)))return false;
  limparPaineis();if(next!=='hangar')retomarAposHangar=null;destino=next;menuAberto=false;cinema=false;if(next!=='descobertas')ultimaArea=next;
  if(next==='hangar'){origemHangar='experiencias';hangar.abrir();}render();if(next==='descobertas')titulo.focus({preventScroll:true});else if(next==='universo')focarEntrada();return true;
 }
 function sairHangar(){
  const retorno=retomarAposHangar;retomarAposHangar=null;
  if(retorno){selecionar('descobertas',true);abrirAtividade(retorno.guia,cartoesGuias.get(retorno.guia)?.botao);document.querySelector(retorno.peca?`.aprendizado-acao[data-peca="${retorno.peca}"]`:`.aprendizado-relacionado[data-nave="${retorno.nave}"]`)?.focus();}
  else if(origemHangar==='descobertas')selecionar('descobertas',true);else abrirExperiencias();
 }
 const permitirGuia=r=>r.recurso?premium.recurso(r.recurso):premium.permitido('hangar',r.nave);
 const exigirGuia=r=>r.recurso?premium.exigir(r.recurso,{roteiro:r.id}):premium.exigirItem('hangar',r.nave);
 function abrirAtividade(key,b){
  if(modoModal()||atividade)return;
  if(key==='estacoes')key='estacoes-guia';
  if(key==='mares')key='mares-guia';
  if(!atividades[key]?.acao)return false;
  const roteiro=roteiros.get(key);if(roteiro?.trilha?.startsWith('mundos-')){grupoBiblioteca='mundos';categoriaMundos=roteiro.trilha;filtrarBiblioteca();}if(roteiro?.pro&&!permitirGuia(roteiro)){guiaSugerido={id:key,origem:b};if(!exigirGuia(roteiro))return;guiaSugerido=null;}
  retornoAtividade=destino==='descobertas'?'descobertas':'experiencias';limparPaineis();origem=b;menuAberto=false;restaurarTempo=acoes.guardarTransporte();atividade=key;cinema=false;render();iniciandoAtividade=true;
  try{atividades[key].acao();}catch(error){console.warn('Atividade indisponível:',key,error);restaurarTempo?.();restaurarTempo=null;atividade=null;retornarAtividade();}finally{iniciandoAtividade=false;sincronizar();}
 }
 function retornarAtividade(){destino=retornoAtividade==='descobertas'?'descobertas':'universo';menuAberto=retornoAtividade==='experiencias';render();origem?.focus({preventScroll:true});}
 function sincronizar(){
  if(guardando||iniciandoAtividade)return;guardando=true;
  let naveLiberada=null,modoLiberado=null,guiaRetomar=null,focoCancelado=null,abrirGuia=null,focoRetomar=null;
  if(guiaSugerido&&!modoModal()){const r=roteiros.get(guiaSugerido.id);if(permitirGuia(r))abrirGuia=guiaSugerido;else focoCancelado=guiaSugerido.origem;guiaSugerido=null;}
  if(modoSugerido&&!modoModal()){if(premium.recurso('estacoes-mares'))modoLiberado=modoSugerido.id;else focoCancelado=modoSugerido.origem;modoSugerido=null;}
  if(naveSugerida&&!modoModal()){if(premium.permitido('hangar',naveSugerida.id))naveLiberada=naveSugerida.id;else focoCancelado=naveSugerida.origem;naveSugerida=null;}
  if(atividade&&!(atividade==='eventos'?document.querySelector('.painel-eventos')?.classList.contains('aberto'):visivel(document.querySelector(atividades[atividade].painel)))&&!modoModal()){
   const encerrada=atividade;restaurarTempo?.();restaurarTempo=null;atividade=null;
   if(retornoEntreGuias?.destino===encerrada){guiaRetomar=retornoEntreGuias.origem;focoRetomar=retornoEntreGuias.destino;retornosGuias.pop();retornoEntreGuias=retornosGuias.at(-1)||null;}else guiaRetomar=retomarAposModo;retomarAposModo=null;retornarAtividade();
  }
  bloquear();guardando=false;
  if(abrirGuia){if(abrirGuia.continuacaoDe)trocarGuia(abrirGuia.id,abrirGuia.continuacaoDe);else abrirAtividade(abrirGuia.id,abrirGuia.origem);}
  if(guiaRetomar){abrirAtividade(guiaRetomar,cartoesGuias.get(guiaRetomar)?.botao);if(focoRetomar)document.querySelector(`.aprendizado-sol [data-guia="${focoRetomar}"]`)?.focus();}
  if(modoLiberado)experimentarModo(modoLiberado);else if(naveLiberada)explorarNave(naveLiberada,{retomarGuia:true});else focoCancelado?.focus?.({preventScroll:true});
 }
 hangar.frame?.addEventListener('load',()=>{observadorViewer?.disconnect();const doc=hangar.frame.contentDocument;if(doc?.body){observadorViewer=new MutationObserver(bloquear);observadorViewer.observe(doc.body,{subtree:true,attributes:true,attributeFilter:['class','hidden','style']});}render();});
 const observer=new MutationObserver(sincronizar);observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['style','class','hidden']});
 function atualizarGuias(){for(const [id,{selo}]of cartoesGuias){const r=aprendizado.resumo(id);selo.textContent=r.concluido?copy.rever:r.iniciado?`${copy.retomar} · ${r.passo+1}/${r.total}`:roteiros.get(id)?.pro?`${copy.pro} · ${copy.aprender}`:copy.novo;}
 const concluido=PERCURSO_ESSENCIAL.filter(id=>aprendizado.resumo(id)?.concluido).length;
 const seguinte=PERCURSO_ESSENCIAL.find(id=>!aprendizado.resumo(id)?.concluido)||PERCURSO_ESSENCIAL[0];
 percursoProgresso.textContent=`${concluido}/${PERCURSO_ESSENCIAL.length} ${percursoCopy.capitulos}`;
 percursoBotao.textContent=`${concluido===PERCURSO_ESSENCIAL.length?copy.rever:concluido?percursoCopy.continuar:percursoCopy.comecar}: ${roteiros.get(seguinte)?.titulo} →`;
 percursoBotao.onclick=()=>abrirAtividade(seguinte,percursoBotao);
 const ultimo=aprendizado.catalogo().filter(r=>r.iniciado&&!r.concluido).sort((a,b)=>b.ultimaAtividade-a.ultimaAtividade)[0];retomarGuia.hidden=!ultimo;
 if(ultimo){const nomes={pt:{sol:'Sol',terra:'Terra',hubble:'Hubble',planetas:'Planetas',marte:'Marte',lua:'Lua',pequenos:'Asteroides e cometas'},en:{sol:'Sun',terra:'Earth',hubble:'Hubble',planetas:'Planets',marte:'Mars',lua:'Moon',pequenos:'Asteroids and comets'},es:{sol:'Sol',terra:'Tierra',hubble:'Hubble',planetas:'Planetas',marte:'Marte',lua:'Luna',pequenos:'Asteroides y cometas'}}[idioma]||{sol:'Sol',terra:'Terra',hubble:'Hubble',planetas:'Planetas',marte:'Marte',lua:'Lua',pequenos:'Asteroides e cometas'};retomarGuia.textContent=`${copy.retomar} ${(nomes[ultimo.id]||ultimo.titulo)} · ${ultimo.passo+1}/${ultimo.total}`;retomarGuia.setAttribute('aria-label',`${copy.retomar}: ${ultimo.titulo}`);retomarGuia.onclick=()=>abrirAtividade(ultimo.id,retomarGuia);}
}
 aprendizado.aoMudar(()=>{sincronizar();atualizarGuias();});premium.aoMudar?.(render);
 document.addEventListener('keydown',e=>{
  if(modoModal())return;
  if(e.key==='Tab'&&(menuAberto||destino==='descobertas')&&!atividade){const area=menuAberto?menu:biblioteca;const itens=[...area.querySelectorAll('button:not(:disabled),select:not(:disabled),input:not(:disabled),textarea:not(:disabled),a[href],[tabindex]:not([tabindex="-1"])')].filter(visivel),primeiro=itens[0],ultimo=itens[itens.length-1];if(e.shiftKey&&(document.activeElement===primeiro||!itens.includes(document.activeElement))){e.preventDefault();ultimo?.focus();}else if(!e.shiftKey&&(document.activeElement===ultimo||!itens.includes(document.activeElement))){e.preventDefault();primeiro?.focus();}}
  if(e.key!=='Escape')return;
  if(atividades[atividade]?.guia){e.stopImmediatePropagation();aprendizado.fechar();}
  else if(!atividade&&cinema){e.stopImmediatePropagation();sairCena.click();}
  else if(!atividade&&destino==='descobertas'){e.stopImmediatePropagation();abrirExperiencias();}
  else if(!atividade&&menuAberto){e.stopImmediatePropagation();fecharExperiencias();}
 },{capture:true});
 function explorarNave(id,{retomarGuia=false,peca=null}={}){
  if(!naveDisponivel(id)||!destinoNave(id)||modoModal()||(atividade&&!atividades[atividade]?.guia))return false;
  const retorno=retomarGuia&&atividades[atividade]?.guia?{guia:atividade,nave:id,peca}:null;
  const doGuia=destino==='descobertas'||!!atividades[atividade]?.guia;if(atividades[atividade]?.guia){guardando=true;aprendizado.fechar();restaurarTempo?.();restaurarTempo=null;atividade=null;guardando=false;}
  selecionar('hangar');origemHangar=doGuia?'descobertas':'experiencias';retomarAposHangar=retorno;const aberto=hangar.abrirNave(id,{peca});if(!aberto)retomarAposHangar=null;return aberto;
 }
 function trocarGuia(id,anterior){
  if(atividade!==anterior)return false;guardando=true;aprendizado.fechar();restaurarTempo?.();restaurarTempo=null;atividade=null;guardando=false;
  retornoEntreGuias={origem:anterior,destino:id};retornosGuias.push(retornoEntreGuias);abrirAtividade(id,cartoesGuias.get(id)?.botao);return true;
 }
 function continuarRoteiro(id){
  const anterior=atividade,roteiro=roteiros.get(anterior),proximo=roteiros.get(id);
  if(modoModal()||!roteiro||(roteiro.continuacao!==id&&roteiro.investigacao!==id&&!roteiro.aprofundamentos?.includes(id))||!proximo||!aprendizado.resumo().concluido)return false;
  if(proximo.pro&&!permitirGuia(proximo)){guiaSugerido={id,origem:document.activeElement,continuacaoDe:anterior};if(!exigirGuia(proximo))return false;guiaSugerido=null;}
  return trocarGuia(id,anterior);
 }
 function explorarPeca(id,peca){
  const roteiro=roteiros.get(atividade);if(modoModal()||!roteiro?.pro||roteiro.nave!==id||!roteiro.pecas?.some(p=>p.id===peca)||!premium.permitido('hangar',id))return false;
  return explorarNave(id,{retomarGuia:true,peca});
 }
 function recomendarNave(id){
  if(!naveDisponivel(id)||!destinoNave(id)||modoModal()||!atividades[atividade]?.guia||!aprendizado.resumo().concluido)return false;
  naveSugerida={id,origem:document.activeElement};if(premium.exigirItem('hangar',id)){naveSugerida=null;return explorarNave(id,{retomarGuia:true});}return false;
 }
 // Abrir uma simulação a partir de um roteiro conserva o passo e a assinatura.
 function experimentarModo(id){
  if(!['estacoes','mares'].includes(id)||modoModal()||!atividades[atividade]?.guia)return false;
  modoSugerido={id,origem:document.activeElement};
  if(!premium.exigir('estacoes-mares'))return false;
  modoSugerido=null;const guia=atividade;
  guardando=true;aprendizado.fechar();atividade=id;retomarAposModo=guia;guardando=false;
  render();iniciandoAtividade=true;
  try{atividades[id].acao({roteiro:false});}catch(error){console.warn('Simulação indisponível:',id,error);}
  finally{iniciandoAtividade=false;sincronizar();}return true;
 }
 function abrirTemaEstacoes(){if(modoModal()||atividade)return false;abrirAtividade('estacoes-guia',document.activeElement);return true;}
 function abrirTemaMares(){if(modoModal()||atividade)return false;abrirAtividade('mares-guia',document.activeElement);return true;}
 render();return {abrirTemaEstacoes,abrirTemaMares,selecionar,explorarNave,explorarPeca,continuarRoteiro,recomendarNave,sairHangar,experimentarModo,inspect:()=>({destino,atividade,cinema,ultimaArea,menuAberto}),voltar(){
  if(visivel(document.querySelector('.paywall-overlay'))||visivel(document.querySelector('.tutorial-overlay')))return false;
  if(destino==='hangar'){
   const doc=hangar.frame.contentDocument;
   if(doc?.body?.classList.contains('reading-expanded')||doc?.body?.classList.contains('panel-open')||doc?.body?.classList.contains('info-open')||doc?.querySelector('dialog[open]')){doc.dispatchEvent(new doc.defaultView.KeyboardEvent('keydown',{key:'Escape',code:'Escape',bubbles:true,cancelable:true}));return true;}
   const voltarNaves=doc?.querySelector('.app-header .back');if(voltarNaves)voltarNaves.click();else sairHangar();return true;
  }
  if(atividades[atividade]?.guia){aprendizado.fechar();return true;}if(atividade)return false;
  if(cinema){sairCena.click();return true;}if(destino==='descobertas'){abrirExperiencias();return true;}if(menuAberto){fecharExperiencias();return true;}return false;
 }};
}
