import {normalizarEstadoEstacoes} from './estacoes-laboratorio.js?v=303';
import {normalizarEstadoMares} from './mares-laboratorio.js?v=303';
import {criarExperimento} from './aprendizado-experimento.js?v=303';
import {trilhaDoRoteiro, aprofundamentosDoRoteiro, PERCURSO_ESSENCIAL} from './aprendizado-trilhas.js?v=303';
import { ROTEIROS } from './aprendizado-conteudo.js?v=303';
import { FAMILIA } from './aprendizado-familia-conteudo.js?v=3';
const etapasPadrao=[{titulo:'objetivo',corpo:'objetivoTexto'},{titulo:'observar',corpo:'observarTexto',acao:true},{titulo:'explicacao',corpo:'explicacaoTexto'},{titulo:'pergunta',corpo:'perguntaTexto',pergunta:true},{titulo:'recap',corpo:'recapTexto',recap:true}];
const total=id=>ROTEIROS[id].etapas?.length||5;
const COMUNS = ROTEIROS.sol.textos;

const pilotoRevisado=id=>['estacoes-guia','terra-ano','mares-guia','mares-oceano'].includes(id);
const mundoRevisado=id=>id.startsWith('mundo-')&&ROTEIROS[id]?.versao===2;
const missaoRevisada=id=>ROTEIROS[id]?.versao===2&&ROTEIROS[id]?.etapas?.[10]?.corpos?.length>0;
const transferenciaRevisada=id=>mundoRevisado(id)||missaoRevisada(id);
const guiaEssencial=id=>id==='estacoes-guia'||id==='mares-guia';
const normalizarExperimento=(id,valor)=>id==='estacoes-guia'||id==='terra-ano'?normalizarEstadoEstacoes(valor):normalizarEstadoMares(valor);
const novoEstado = () => ({ordemResposta:Math.random()<.5,passo:0,concluido:false,iniciado:false,ultimaAtividade:0,resposta:null,tentativas:0});
const chave = id => `sistema-solar-aprendizado-${id}`;
export function iniciarAprendizado({ acoes = {}, idioma = 'pt' } = {}) {
 const lang=['pt','en','es'].includes(idioma)?idioma:'pt';
 const estados=new Map(),ouvintes=new Set();let idAtual='sol',raiz=null,focoAnterior=null,revisando=false,voltarDisponivel=false;
 const chaveFamilia='sistema-solar-aprendizado-em-familia';
 let emFamilia=false;
 try{emFamilia=localStorage.getItem(chaveFamilia)==='1';}catch(_){}
 const modoCopy={pt:{leitura:'Leitura',padrao:'Padrão',familia:'Em família',convite:'Para conversar',pergunta:'Perguntem juntos'},en:{leitura:'Reading',padrao:'Standard',familia:'Together',convite:'Explore together',pergunta:'Talk about it'},es:{leitura:'Lectura',padrao:'Estándar',familia:'En familia',convite:'Para conversar',pergunta:'Pregunten juntos'}}[lang];
 let ritmoMissaoIniciado=false;
 let preparacaoApollo=null,experimento=null;const experimentosSalvos=new Map();
 let cena=null,preview=null,etapaVisual=null,geracao=0,selecionarVisual=null,modeloKey=null;
 const rotuloVoltar={pt:'Voltar ao roteiro anterior',en:'Back to previous lesson',es:'Volver a la lección anterior'}[lang];
 const trilhaCopy={pt:{capitulo:'Capítulo',essencial:'Percurso essencial',continuarGratis:'Continuar grátis',aprofundar:'Investigar mais com Pro (opcional)',proximo:'Próximo roteiro',fim:'Percurso essencial concluído. Você pode rever os capítulos ou escolher outro tema em Aprender.',fimPro:'Trilha concluída. Você pode rever os capítulos ou escolher outro tema em Aprender.'},en:{capitulo:'Chapter',essencial:'Essential path',continuarGratis:'Continue for free',aprofundar:'Explore further with Pro (optional)',proximo:'Next lesson',fim:'Essential path complete. Review the chapters or choose another topic in Learn.',fimPro:'Trail complete. Review the chapters or choose another topic in Learn.'},es:{capitulo:'Capítulo',essencial:'Recorrido esencial',continuarGratis:'Continuar gratis',aprofundar:'Investigar más con Pro (opcional)',proximo:'Siguiente recorrido',fim:'Recorrido esencial completado. Repasa los capítulos o elige otro tema en Aprender.',fimPro:'Ruta completada. Repasa los capítulos o elige otro tema en Aprender.'}}[lang];
 const teclado={pt:"Teclado: setas giram o modelo; mais e menos ajustam o zoom. Use os botões de componentes para selecionar peças.",en:"Keyboard: arrow keys rotate the model; plus and minus adjust zoom. Use the component buttons to select parts.",es:"Teclado: las flechas giran el modelo; más y menos ajustan el zoom. Usa los botones de componentes para seleccionar piezas."}[lang];
 const revisao={pt:{rever:'Rever a pergunta',titulo:'Revisão opcional',resumo:'Voltar ao resumo'},en:{rever:'Review the question',titulo:'Optional review',resumo:'Back to recap'},es:{rever:'Repasar la pregunta',titulo:'Repaso opcional',resumo:'Volver al resumen'}}[lang];
 function carregar(id){
  if(estados.has(id))return estados.get(id);
  let estado=novoEstado(),atualizado=false,persistente=true;
  try{const salvo=JSON.parse(localStorage.getItem(chave(id))||'null');
   if(salvo){atualizado=salvo.versao!==ROTEIROS[id].versao;
    if(!atualizado&&Number.isInteger(salvo.passo)&&salvo.passo>=0&&salvo.passo<total(id)&&typeof salvo.concluido==='boolean')estado={passo:salvo.passo,concluido:salvo.concluido,iniciado:salvo.iniciado===true||salvo.passo>0||salvo.concluido,ultimaAtividade:Number.isFinite(salvo.ultimaAtividade)&&salvo.ultimaAtividade>=0?salvo.ultimaAtividade:0,resposta:['sim','nao'].includes(salvo.resposta)?salvo.resposta:null,tentativas:Number.isInteger(salvo.tentativas)&&salvo.tentativas>=0&&salvo.tentativas<=10000?salvo.tentativas:0,revisaoPendente:transferenciaRevisada(id)&&salvo.revisaoPendente===true,ordemResposta:typeof salvo.ordemResposta==='boolean'?salvo.ordemResposta:Math.random()<.5};
   }
  }catch(_){}
  if(pilotoRevisado(id)){
   try{const salvo=JSON.parse(localStorage.getItem(chave(id))||'null');
    if(salvo?.versao===1&&ROTEIROS[id].versao===2){
     estado={...novoEstado(),iniciado:salvo.iniciado===true||salvo.concluido===true||salvo.passo>0,concluido:salvo.concluido===true,passo:salvo.concluido===true?total(id)-1:guiaEssencial(id)&&Number.isInteger(salvo.passo)?Math.max(0,Math.min(total(id)-1,salvo.passo)):0,ultimaAtividade:Number.isFinite(salvo.ultimaAtividade)?Math.max(0,salvo.ultimaAtividade):0};
    }else if(salvo?.versao===ROTEIROS[id].versao){
     estado.ordemResposta=typeof salvo.ordemResposta==='boolean'?salvo.ordemResposta:Math.random()<.5;
     estado.experimentos={};
     for(let i=0;i<total(id);i++)if(salvo.experimentos?.[i])estado.experimentos[i]=normalizarExperimento(id,salvo.experimentos[i]);
     estado.medicoes=normalizarExperimento(id,{medicoes:salvo.medicoes}).medicoes;
    }
   }catch(_){}
  }
  if(mundoRevisado(id)){
   try{const salvo=JSON.parse(localStorage.getItem(chave(id))||'null');
    if(salvo?.versao===1&&ROTEIROS[id].versao===2&&Number.isInteger(salvo.passo)&&salvo.passo>=0&&salvo.passo<8&&typeof salvo.concluido==='boolean'){
     estado={...novoEstado(),iniciado:salvo.iniciado===true||salvo.concluido||salvo.passo>0,concluido:salvo.concluido,passo:salvo.concluido?total(id)-1:Math.min(salvo.passo,6),ultimaAtividade:Number.isFinite(salvo.ultimaAtividade)?Math.max(0,salvo.ultimaAtividade):0,revisaoPendente:salvo.concluido};
    }
   }catch(_){}
  }
  if(missaoRevisada(id)){
   try{const salvo=JSON.parse(localStorage.getItem(chave(id))||'null');
    if(salvo?.versao===1&&Number.isInteger(salvo.passo)&&salvo.passo>=0&&salvo.passo<12&&typeof salvo.concluido==='boolean'){
     estado={...novoEstado(),iniciado:salvo.iniciado===true||salvo.concluido||salvo.passo>0,concluido:salvo.concluido,passo:salvo.concluido?total(id)-1:Math.min(salvo.passo,10),ultimaAtividade:Number.isFinite(salvo.ultimaAtividade)?Math.max(0,salvo.ultimaAtividade):0,revisaoPendente:salvo.concluido};
    }
   }catch(_){}
  }
  const registro={estado,atualizado,persistente};estados.set(id,registro);return registro;
 }
 const resumo=(id=idAtual)=>{if(typeof id!=='string'||!Object.prototype.hasOwnProperty.call(ROTEIROS,id))return null;return {...carregar(id).estado,id,total:total(id)};};
 const catalogo=()=>Object.values(ROTEIROS).sort((a,b)=>Number(a.pro===true)-Number(b.pro===true)).map(r=>({id:r.id,ambiente:r.ambiente,titulo:r.textos[lang].titulo,descricao:r.textos[lang].objetivoTexto,pro:r.pro===true,nave:r.nave,recurso:r.recurso,pecas:r.pecas?.map(p=>({id:p.id})),continuacao:trilhaDoRoteiro(r.id)?.proximo??null,investigacao:r.investigacao??null,aprofundamentos:aprofundamentosDoRoteiro(r.id),trilha:trilhaDoRoteiro(r.id)?.trilha.id,...resumo(r.id)}));
 const notificar=()=>ouvintes.forEach(fn=>fn(resumo()));
 function salvar(){const r=carregar(idAtual);r.estado.ultimaAtividade=Date.now();try{localStorage.setItem(chave(idAtual),JSON.stringify({versao:ROTEIROS[idAtual].versao,...r.estado}));}catch(_){r.persistente=false;}notificar();}
 function renderizar(){
  if(!raiz)return;const roteiro=ROTEIROS[idAtual],registro=carregar(idAtual),estado=registro.estado;
  const texto=k=>roteiro.textos[lang][k]??COMUNS[lang][k]??k;
  const mostrarResumo=estado.concluido&&!revisando;
  const resumoAnterior=mostrarResumo&&(registro.atualizado&&(pilotoRevisado(idAtual)||transferenciaRevisada(idAtual))||estado.revisaoPendente===true);
  const textoResumo=resumoAnterior?{pt:'Você concluiu a versão anterior. Seu progresso foi preservado; recomece se quiser explorar as novas atividades.',en:'You completed the previous version. Your progress is preserved; start again to explore the new activities.',es:'Completaste la versión anterior. Tu progreso se conserva; vuelve a empezar para explorar las nuevas actividades.'}[lang]:texto('recapTexto');
  const aprofundamentos=roteiro.aprofundamentos|| (roteiro.relacionado?[{id:roteiro.relacionado,rotulo:'relacionadoTitulo'}]:[]);
  const trilha=trilhaDoRoteiro(idAtual),proximo=ROTEIROS[trilha?.proximo],essencial=trilha?.indiceEssencial>=0;
  const continuar=proximo?`<button class="aprendizado-continuar" type="button" data-guia="${proximo.id}">${essencial?trilhaCopy.continuarGratis:trilhaCopy.proximo}: ${proximo.textos[lang].titulo}${proximo.pro?' · Pro':''} →</button>`:`<p class="aprendizado-trilha-fim">${essencial?trilhaCopy.fim:trilhaCopy.fimPro}</p>`;
  const opcionais=[...new Set([...aprofundamentosDoRoteiro(idAtual),...(roteiro.investigacao?[roteiro.investigacao]:[])])].map(id=>ROTEIROS[id]).filter(Boolean);
  const conviteInvestigacao=opcionais.length?`<div class="aprendizado-opcionais"><p>${trilhaCopy.aprofundar}</p>${opcionais.map(r=>`<button class="aprendizado-aprofundar" type="button" data-guia="${r.id}">${r.textos[lang].titulo} · Pro →</button>`).join('')}</div>`:'';
 const respostas=(pilotoRevisado(idAtual)||transferenciaRevisada(idAtual))&&estado.ordemResposta?['nao','sim']:['sim','nao'];
 const convites=aprofundamentos.length?`<div class="aprendizado-aprofundamentos">${aprofundamentos.map(n=>`<button class="aprendizado-relacionado" type="button" data-nave="${n.id}">${texto(n.rotulo)}</button>`).join('')}</div>`:'';
 const TOTAL=total(idAtual),etapas=roteiro.etapas||etapasPadrao;
 const dados=etapas[revisando?etapas.findIndex(e=>e.pergunta):estado.passo];
 const rotulo=k=>typeof k==='object'?k[lang]:texto(k);
  const conteudoFamilia=FAMILIA[idAtual]?.[lang];
  const familiaAtiva=emFamilia&&!!conteudoFamilia;
  const passoFamilia=conteudoFamilia?.etapas[estado.passo];
  const seletorModo=conteudoFamilia?`<div class="aprendizado-modo"><span>${modoCopy.leitura}</span><button class="aprendizado-modo-botao" type="button" aria-pressed="${familiaAtiva}">${familiaAtiva?modoCopy.familia:modoCopy.padrao}</button></div>`:'';
  const conviteFamilia=familiaAtiva&&passoFamilia?`<aside class="aprendizado-familia" aria-label="${modoCopy.convite}"><strong>${modoCopy.convite} · ${conteudoFamilia.tituloCurto}</strong><p>${passoFamilia.convite}</p><span>${modoCopy.pergunta}: ${passoFamilia.pergunta}</span></aside>`:'';
  const pecas=dados.pecas||roteiro.pecas,corpos=dados.corpos||roteiro.corpos;
 if(preview)preview.remove();
  const fonte=`<p class="aprendizado-fonte"><a href="${roteiro.urlFonte}" target="_blank" rel="noopener noreferrer">${texto('fonte')}</a>${roteiro.fontesAdicionais?.map(f=>` · <a href="${f.url}" target="_blank" rel="noopener noreferrer">${f.nome}</a>`).join('')||''}</p>`;
  raiz.dataset.roteiro=idAtual;
  raiz.innerHTML=`<section class="aprendizado-painel" role="region" aria-label="${texto('titulo')}">
   <header class="aprendizado-cabecalho"><div>${trilha?`<p class="aprendizado-trilha-posicao">${essencial?trilhaCopy.essencial:trilha.trilha.textos[lang].titulo} · ${trilhaCopy.capitulo} ${essencial?trilha.indiceEssencial+1:trilha.indice+1}/${essencial?PERCURSO_ESSENCIAL.length:trilha.trilha.roteiros.length}</p>`:''}<span class="aprendizado-kicker">${roteiro.textos[lang].tituloCurto||texto('titulo')}</span><h2 aria-describedby="aprendizado-etapa">${revisando?revisao.titulo:mostrarResumo?texto('concluido'):rotulo(dados.titulo)}</h2></div><button class="aprendizado-fechar" type="button" aria-label="${texto('fechar')}">×</button></header>
   <div class="aprendizado-conteudo" tabindex="0">${voltarDisponivel?`<button class="aprendizado-retorno" type="button">‹ ${rotuloVoltar}</button>`:''}${seletorModo}${registro.atualizado||estado.revisaoPendente?`<p role="status">${pilotoRevisado(idAtual)||transferenciaRevisada(idAtual)?{pt:'Conteúdo atualizado. Seu percurso anterior foi preservado; novos desafios estão disponíveis.',en:'Updated content. Your previous journey is preserved; new challenges are available.',es:'Contenido actualizado. Tu recorrido anterior se conserva; hay nuevos desafíos disponibles.'}[lang]:texto('atualizado')}</p>`:''}
    ${mostrarResumo?`${conviteFamilia}<p>${textoResumo}</p><button class="aprendizado-revisar" type="button">${revisao.rever}</button>${fonte}${conviteInvestigacao}${continuar}${convites}`:`${conviteFamilia}<p>${rotulo(dados.corpo)}</p>${dados.acao?pecas?`<div class="aprendizado-observar">${pecas.map(peca=>`<button class="aprendizado-acao" type="button" data-peca="${peca.id}">${rotulo(peca.rotulo||roteiro.pecas.find(p=>p.id===peca.id)?.rotulo)}</button>`).join('')}</div>`:corpos?`<div class="aprendizado-observar">${corpos.map((corpo,i)=>`<button class="aprendizado-acao" type="button" data-observar="${i}">${rotulo(corpo.rotulo)}</button>`).join('')}</div>${dados.corpos?'<p class="aprendizado-pista" aria-live="polite"></p>':''}`:`<button class="aprendizado-acao" type="button">${texto('focar')}</button>`:''}${dados.pergunta?`<div class="aprendizado-respostas">${respostas.map(r=>`<button type="button" data-resposta="${r}">${texto(r==='sim'?'opcao1':'opcao2')}</button>`).join('')}</div><p class="aprendizado-feedback" aria-live="polite"></p>`:''}${dados.recap?fonte:''}`}
   </div>${roteiro.mundo?`<p class="aprendizado-mundos-fonte"><a href="${roteiro.urlFonte}" target="_blank" rel="noopener noreferrer">${texto('fonte')}</a> · ${texto('notaVisual')}</p>`:''}<footer class="aprendizado-rodape"><span id="aprendizado-etapa">${revisando?revisao.titulo:mostrarResumo?texto(registro.persistente?'progresso':'temporario'):`${texto('passo')} ${estado.passo+1} / ${TOTAL}`}</span><div>
    ${mostrarResumo?`<button class="aprendizado-repetir" type="button">${texto('repetir')}</button>`:''}
    ${!estado.concluido&&estado.passo>0?`<button class="aprendizado-voltar" type="button">${texto('anterior')}</button>`:''}
    <button class="aprendizado-avancar" type="button">${revisando?revisao.resumo:texto(mostrarResumo?'fechar':estado.passo===TOTAL-1?'concluir':'proximo')}</button></div></footer></section>`;
  atualizarVisual(dados,mostrarResumo||revisando);
  raiz.querySelector('.aprendizado-fechar').onclick=fechar;
  raiz.querySelector('.aprendizado-retorno')?.addEventListener('click',fechar);
  raiz.querySelector('.aprendizado-modo-botao')?.addEventListener('click',()=>{emFamilia=!emFamilia;try{localStorage.setItem(chaveFamilia,emFamilia?'1':'0');}catch(_){}renderizar();raiz.querySelector('.aprendizado-modo-botao')?.focus({preventScroll:true});});
  raiz.querySelector('.aprendizado-continuar')?.addEventListener('click',e=>acoes.continuarRoteiro?.(e.currentTarget.dataset.guia));
  raiz.querySelectorAll('.aprendizado-aprofundar').forEach(b=>b.addEventListener('click',e=>acoes.continuarRoteiro?.(e.currentTarget.dataset.guia)));
  raiz.querySelector('.aprendizado-revisar')?.addEventListener('click',()=>{revisando=true;renderizar();});
  raiz.querySelectorAll('.aprendizado-relacionado').forEach(b=>b.addEventListener('click',()=>acoes.recomendarNave?.(b.dataset.nave)));
  raiz.querySelector('.aprendizado-repetir')?.addEventListener('click',()=>{registro.estado={...novoEstado(),iniciado:true};registro.atualizado=false;salvar();renderizar();});
  const titulo=raiz.querySelector('h2');titulo.tabIndex=-1;titulo.focus({preventScroll:true});
  raiz.querySelectorAll('.aprendizado-acao').forEach((botao,i)=>botao.addEventListener('click',()=>{if(botao.dataset.peca){acoes.explorarPeca?.(roteiro.nave,botao.dataset.peca);}else if(dados.corpos){if(!roteiro.nave)acoes.focarCorpo?.(corpos[i].id);const pista=raiz.querySelector('.aprendizado-pista');if(pista&&corpos[i].pista){pista.textContent=rotulo(corpos[i].pista);for(const b of raiz.querySelectorAll('[data-observar]'))b.setAttribute('aria-pressed',String(b===botao));}}else if(roteiro.modo){acoes.experimentarModo?.(roteiro.modo);}else if(roteiro.nave){fechar();acoes.explorarNave?.(roteiro.nave);}else acoes.focarCorpo?.(roteiro.corpo);}));
  function mostrarFeedback(){
   const feedback=raiz.querySelector('.aprendizado-feedback');if(!feedback)return;
   feedback.textContent=estado.resposta?texto(estado.resposta==='sim'?'certo':'tentar'):'';
   if(estado.resposta)feedback.dataset.correto=String(estado.resposta==='sim');
   for(const b of raiz.querySelectorAll('[data-resposta]'))b.setAttribute('aria-pressed',String(b.dataset.resposta===estado.resposta));
  }
  raiz.querySelectorAll('[data-resposta]').forEach(b=>b.onclick=()=>{estado.resposta=b.dataset.resposta;estado.tentativas=Math.min(10000,estado.tentativas+1);salvar();mostrarFeedback();raiz.querySelector('.aprendizado-feedback').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});mostrarFeedback();
  raiz.querySelector('.aprendizado-voltar')?.addEventListener('click',()=>{estado.passo--;salvar();renderizar();});
  raiz.querySelector('.aprendizado-avancar').onclick=()=>{if(revisando){revisando=false;renderizar();raiz.querySelector('.aprendizado-revisar')?.focus({preventScroll:true});return;}if(estado.concluido)return fechar();if(estado.passo<TOTAL-1)estado.passo++;else{estado.concluido=true;estado.revisaoPendente=false;}registro.atualizado=false;salvar();renderizar();};
 }
 async function atualizarVisual(dados,ocultar){
  const roteiro=ROTEIROS[idAtual],sts61=roteiro.missao==='sts61',artemis=roteiro.missao==='artemis-1',leituraPecas=sts61||artemis;
  const visualKey=`${idAtual}:${carregar(idAtual).estado.passo}:${ocultar}`;
  if(!ocultar&&dados.astro&&etapaVisual!==visualKey&&(!leituraPecas||!ritmoMissaoIniciado)){acoes.focarCorpo?.(dados.astro);if(leituraPecas)ritmoMissaoIniciado=true;}
  etapaVisual=visualKey;
  if(dados.experimento&&!ocultar){
   descartarCena();const key=`${idAtual}:${carregar(idAtual).estado.passo}`;
   const estadoGuia=carregar(idAtual).estado,passo=estadoGuia.passo,piloto=pilotoRevisado(idAtual);
   const estadoSalvo=piloto?{...(estadoGuia.experimentos?.[passo]||{}),medicoes:estadoGuia.medicoes}:experimentosSalvos.get(key);
   experimento=criarExperimento({host:raiz,config:dados.experimento,idioma:lang,estadoSalvo,aoSelecionarCorpo:acoes.focarCorpo,aoMudar:estado=>{
    if(piloto){const validado=normalizarExperimento(idAtual,estado);estadoGuia.experimentos??={};estadoGuia.experimentos[passo]=validado;estadoGuia.medicoes=validado.medicoes;salvar();}
    else experimentosSalvos.set(key,estado);
   }});return;
  }
  experimento?.dispose();experimento=null;
  const key=`${idAtual}:${carregar(idAtual).estado.passo}:${ocultar}`;
  if(roteiro.etapas&&!ocultar&&dados.astro&&etapaVisual!==key)acoes.focarCorpo?.(dados.astro);
  etapaVisual=key;
  if(!roteiro.etapas||ocultar||!dados.pecas?.length){descartarCena();return;}
  const nextModeloKey=artemis?'artemis-1':`${roteiro.missao||''}:${roteiro.nave}:${dados.deploy===true}:${dados.lunarAscent===true}:${dados.marsPhase||''}:${dados.helicopterPhase||''}:${dados.apolloPhase||''}:${dados.lunarPhase||''}:${dados.huygensPhase||''}:${dados.cassiniPhase||''}:${dados.webbPhase||''}:${dados.scenario||''}`;
  if(modeloKey!==nextModeloKey){descartarCena();modeloKey=nextModeloKey;}
  if(!preview){
   preview=document.createElement('section');preview.className='aprendizado-modelo';preview.setAttribute('aria-label',roteiro.textos[lang].modeloTitulo);
   preview.innerHTML=`<canvas tabindex="0" aria-label="${roteiro.textos[lang].modeloAjuda} ${teclado}"></canvas><div class="aprendizado-modelo-labels" hidden></div><div class="aprendizado-modelo-pecas"></div><p class="aprendizado-modelo-nota">${roteiro.textos[lang].modeloAjuda}</p>`;
  }
  preview.querySelector('canvas').onkeydown=event=>{
   if(!cena)return;
   const turns={ArrowLeft:[-.15,0],ArrowRight:[.15,0],ArrowUp:[0,-.15],ArrowDown:[0,.15]};
   if(turns[event.key]){event.preventDefault();cena.orbit(...turns[event.key]);}
   else if(['+','=','-','_'].includes(event.key)){event.preventDefault();cena.zoom(['+','='].includes(event.key)?.85:1.15);}
  };
  raiz.append(preview);
  if(leituraPecas){
   preview.dataset.missao=artemis?'artemis-1':'sts61';preview.querySelector('.aprendizado-modelo-nota').hidden=true;
   let leitura=raiz.querySelector('.aprendizado-peca-leitura');
   if(!leitura){leitura=document.createElement('aside');leitura.className='aprendizado-peca-leitura';leitura.setAttribute('aria-live','polite');leitura.innerHTML='<strong></strong><p></p>';const nota=document.createElement('p');nota.className='aprendizado-sts61-fonte';nota.textContent=roteiro.textos[lang].modeloAjuda;if(artemis){const fonte=document.createElement('a');fonte.href=roteiro.urlFonte;fonte.target='_blank';fonte.rel='noopener noreferrer';fonte.textContent=' · NASA: Artemis I';nota.append(fonte);}raiz.querySelector('.aprendizado-conteudo').append(leitura,nota);}
   if(!preview.querySelector('.aprendizado-modelo-ferramentas')){
    const tools=document.createElement('div');tools.className='aprendizado-modelo-ferramentas';
    const copy={pt:['Afastar','Aproximar','Centralizar'],en:['Zoom out','Zoom in','Center view'],es:['Alejar','Acercar','Centrar vista']}[lang];
    ['−','+','↺'].forEach((label,i)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-label',copy[i]);b.onclick=()=>i===2?cena?.overview():cena?.zoom(i===0?1.2:.83);tools.append(b);});preview.append(tools);
   }
  }
  const chips=preview.querySelector('.aprendizado-modelo-pecas');chips.innerHTML=dados.pecas.map(p=>`<button type="button" data-modelo-peca="${p.id}">${roteiro.textos[lang][roteiro.pecas.find(x=>x.id===p.id).rotulo]}</button>`).join('');
  const selecionar=(id,porToque=false)=>{
   if(leituraPecas){
    const peca=roteiro.pecas.find(p=>p.id===id);if(!peca)return;
    cena?.setState({selected:id,sts61Phase:sts61?dados.fase:undefined,artemis1Phase:artemis?dados.fase:undefined,exploded:true,isolated:false});
    if(artemis)cena?.setScenario(dados.scenario);
    preview.dataset.selecionada=id;
    for(const b of chips.children)b.setAttribute('aria-pressed',String(b.dataset.modeloPeca===id));
    const leitura=raiz.querySelector('.aprendizado-peca-leitura');
    leitura.querySelector('strong').textContent=roteiro.textos[lang][peca.rotulo];
    leitura.querySelector('p').textContent=roteiro.textos[lang][`leitura_${id.replaceAll('-','_')}`];
    if(porToque){const visivel=!artemis||cena?.inspect().groups.find(g=>g.id===id)?.visible!==false;if(visivel&&!id.startsWith('service-'))cena?.focus();if(artemis&&!visivel)leitura.querySelector('p').textContent+=' '+({pt:'A cena agora mostra a cápsula após a amerissagem.',en:'The scene now shows the capsule after splashdown.',es:'La escena ahora muestra la cápsula después del amerizaje.'}[lang]);leitura.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
    return;
   }
   const fase=dados.marsPhase||dados.helicopterPhase||dados.apolloPhase||dados.lunarPhase||dados.huygensPhase||dados.cassiniPhase||dados.webbPhase,examinar=!!fase&&id!==dados.pecas[0].id;cena?.setState({selected:id,webbPhase:examinar?null:dados.webbPhase,cassiniPhase:examinar?null:dados.cassiniPhase,huygensPhase:examinar?null:dados.huygensPhase,apolloPhase:examinar?null:dados.apolloPhase,lunarPhase:examinar?null:dados.lunarPhase,marsPhase:examinar?null:dados.marsPhase,helicopterPhase:examinar?null:dados.helicopterPhase,exploded:true,isolated:fase?examinar:!dados.deploy&&!dados.visibleParts&&!dados.lunarAscent,lunarAscent:dados.lunarAscent===true,visibleParts:dados.deploy?['orbiter','arm','hubble','door-left','door-right','engines']:dados.visibleParts||null});preview.dataset.selecionada=id;for(const b of chips.children)b.setAttribute('aria-pressed',String(b.dataset.modeloPeca===id));};
  selecionarVisual=selecionar;
  chips.querySelectorAll('button').forEach(b=>b.onclick=()=>selecionar(b.dataset.modeloPeca,true));
  selecionar(dados.pecas[0].id);
  if(cena){selecionar(dados.pecas[0].id);return;}
  const token=++geracao;
  try{
   const {criarCena}=await import('../hangar/js/hangar-scene.js?v=303');
   let opcoes={};
   if(artemis){
    const {PARTES_ARTEMIS1,criarArtemis1Guiado}=await import('../hangar/js/artemis1-scene.js?v=303');
    opcoes={partes:PARTES_ARTEMIS1.map(p=>({...p,curto:roteiro.textos[lang][roteiro.pecas.find(x=>x.id===p.id)?.rotulo]||p.curto})),buildModel:criarArtemis1Guiado,framing:{horizontal:.84,vertical:.80,offsetY:.08}};
   }else if(sts61){
    const {PARTES_STS61,criarShuttleSTS61}=await import('../hangar/js/sts61-scene.js?v=303');
    opcoes={partes:PARTES_STS61.map(p=>({...p,curto:roteiro.textos[lang][roteiro.pecas.find(x=>x.id===p.id)?.rotulo]||p.curto})),buildModel:criarShuttleSTS61};
   }else if(roteiro.nave==='jwst'){
    const [{PARTES,posicaoParte},{prepararWebb,criarWebb}]=await Promise.all([import('../hangar/js/webb-data.js?v=1'),import('../hangar/js/webb-model.js?v=1')]);await prepararWebb();opcoes={partes:PARTES,positionForPart:posicaoParte,buildModel:criarWebb};
   }else if(roteiro.nave==='cassini'){
    const [{PARTES,posicaoParte},{prepararCassini,criarCassini}]=await Promise.all([import('../hangar/js/cassini-data.js?v=1'),import('../hangar/js/cassini-model.js?v=2')]);await prepararCassini();opcoes={partes:PARTES,positionForPart:posicaoParte,buildModel:criarCassini};
   }else if(roteiro.nave==='shuttle'){
    const [{PARTES,posicaoParte},{criarShuttle}]=await Promise.all([import('../hangar/js/shuttle-data.js?v=4'),import('../hangar/js/shuttle-model.js?v=8')]);
    opcoes={partes:PARTES,positionForPart:posicaoParte,buildModel:()=>{const modelo=criarShuttle(),animar=modelo.animate;modelo.animate=(state,alpha,dt)=>{const moving=animar(state,alpha,dt);if(state.visibleParts)for(const [id,g]of modelo.groups)g.visible=g.visible&&state.visibleParts.includes(id);return moving;};return modelo;}};
   }else if(roteiro.nave==='ingenuity'){
    const [{PARTES,posicaoParte},{prepararIngenuity,criarIngenuity}]=await Promise.all([import('../hangar/js/ingenuity-data.js?v=1'),import('../hangar/js/ingenuity-model.js?v=1')]);
    await prepararIngenuity();opcoes={partes:PARTES,positionForPart:posicaoParte,buildModel:criarIngenuity};
   }else if(roteiro.nave==='perseverance'){
    const [{PARTES,posicaoParte},{prepararPerseverance,criarPerseverance}]=await Promise.all([import('../hangar/js/perseverance-data.js?v=1'),import('../hangar/js/perseverance-model.js?v=2')]);
    await prepararPerseverance();opcoes={partes:PARTES,positionForPart:posicaoParte,buildModel:criarPerseverance};
   }else if(roteiro.nave==='modulo-lunar'){
    const [{PARTES},{prepararModuloLunar},{criarModuloLunarGuiado}]=await Promise.all([import('../hangar/js/lunar-data.js?v=1'),import('../hangar/js/lunar-model.js?v=1'),import('../hangar/js/lunar-guide-model.js?v=2')]);
    await prepararModuloLunar();opcoes={partes:PARTES,buildModel:criarModuloLunarGuiado};
   }else{
    const [{prepararModuloLunarAtual},{prepararModuloLunar},{criarApolloGuiado}]=await Promise.all([import('../hangar/js/apollo-nasa.js?v=3'),import('../hangar/js/lunar-model.js?v=1'),import('../hangar/js/apollo-guide-model.js?v=2')]);if(!preparacaoApollo)preparacaoApollo=prepararModuloLunarAtual().catch(error=>{preparacaoApollo=null;throw error;});await Promise.all([preparacaoApollo,prepararModuloLunar()]);opcoes={buildModel:criarApolloGuiado};
   }
   if(token!==geracao||!preview||raiz.hidden)return;
   cena=criarCena({...opcoes,scenario:dados.scenario,initialState:{artemis1Phase:artemis?dados.fase:undefined,sts61Phase:sts61?dados.fase:undefined,selected:dados.pecas[0].id,exploded:true,isolated:false,webbPhase:dados.webbPhase,cassiniPhase:dados.cassiniPhase,huygensPhase:dados.huygensPhase,apolloPhase:dados.apolloPhase,lunarPhase:dados.lunarPhase,marsPhase:dados.marsPhase,helicopterPhase:dados.helicopterPhase,lunarAscent:dados.lunarAscent===true,visibleParts:dados.visibleParts||null},canvas:preview.querySelector('canvas'),viewport:preview,labels:preview.querySelector('.aprendizado-modelo-labels'),onSelect:id=>selecionarVisual?.(id,true)});if(artemis){cena.orbit(.2,-.42);cena.overview();}selecionar(dados.pecas[0].id);
  }catch(error){if(token===geracao&&preview){const nota=preview.querySelector('.aprendizado-modelo-nota');nota.hidden=false;nota.textContent=roteiro.textos[lang].modeloErro;}}
 }
 function descartarCena(){experimento?.dispose();experimento=null;geracao++;selecionarVisual=null;modeloKey=null;cena?.dispose();cena=null;preview?.remove();preview=null;}
 function abrir(id='sol',{voltar=false}={}){
  if(typeof id!=='string'||!Object.prototype.hasOwnProperty.call(ROTEIROS,id))return false;
  if(ROTEIROS[id].pro&&acoes.permitirRoteiro?.(ROTEIROS[id].nave,ROTEIROS[id].recurso)!==true)return false;
  if(!raiz){raiz=document.createElement('div');raiz.className='aprendizado-sol';raiz.hidden=true;document.body.append(raiz);}
  if(raiz.hidden)focoAnterior=document.activeElement;
  idAtual=id;ritmoMissaoIniciado=false;revisando=false;voltarDisponivel=voltar;carregar(id).estado.iniciado=true;salvar();raiz.hidden=false;if(ROTEIROS[id].mundo)acoes.focarCorpo?.(ROTEIROS[id].corpo);renderizar();notificar();return true;
 }
 function fechar(){descartarCena();etapaVisual=null;revisando=false;if(raiz)raiz.hidden=true;notificar();focoAnterior?.focus?.({preventScroll:true});}
 function aoMudar(fn){if(typeof fn!=='function')return()=>{};ouvintes.add(fn);return()=>ouvintes.delete(fn);}
 return {abrir,fechar,resumo,catalogo,aoMudar,inspectExperimento:()=>experimento?.inspect()||null,inspectModelo:()=>cena?.inspect()||null};
}
