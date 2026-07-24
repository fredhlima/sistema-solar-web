// Quiz espacial com pacotes de perguntas, medalhas e persistência
// Exporta: iniciarQuiz({ motor, dados, premium }) -> { abrir }

import { getIdioma } from './i18n.js';
import { QUIZ_PACOTES } from './quiz-dados.js?v=4';

const TEXTOS = {
  pt: {
    tituloQuiz: 'Quiz Espacial',
    tela_pacotes_titulo: 'Escolha um pacote de perguntas',
    contador: '{n}/{total}',
    encontre: 'ENCONTRE',
    tente_de_novo: 'Tente de novo',
    revelar: 'Revelar',
    continuar: 'Continuar',
    resultado_titulo: 'Resultado',
    resultado_pts: '{pts}/{max} pontos',
    resultado_pct: '{pct}%',
    medalha_ouro: 'Ouro',
    medalha_prata: 'Prata',
    medalha_bronze: 'Bronze',
    repetir: 'Repetir',
    voltar: 'Voltar',
    melhor: 'Melhor: {pct}%',
    acerto: 'Correto!',
    erro: 'Incorreto!',
    revelado: 'Aqui está!',
    cadeado: 'Recurso Pro',
  },
  en: {
    tituloQuiz: 'Space Quiz',
    tela_pacotes_titulo: 'Choose a question package',
    contador: '{n}/{total}',
    encontre: 'FIND',
    tente_de_novo: 'Try again',
    revelar: 'Reveal',
    continuar: 'Continue',
    resultado_titulo: 'Result',
    resultado_pts: '{pts}/{max} points',
    resultado_pct: '{pct}%',
    medalha_ouro: 'Gold',
    medalha_prata: 'Silver',
    medalha_bronze: 'Bronze',
    repetir: 'Repeat',
    voltar: 'Back',
    melhor: 'Best: {pct}%',
    acerto: 'Correct!',
    erro: 'Incorrect!',
    revelado: 'Here it is!',
    cadeado: 'Pro Feature',
  },
  es: {
    tituloQuiz: 'Quiz Espacial',
    tela_pacotes_titulo: 'Elige un paquete de preguntas',
    contador: '{n}/{total}',
    encontre: 'ENCUENTRA',
    tente_de_novo: 'Intenta de nuevo',
    revelar: 'Revelar',
    continuar: 'Continuar',
    resultado_titulo: 'Resultado',
    resultado_pts: '{pts}/{max} puntos',
    resultado_pct: '{pct}%',
    medalha_ouro: 'Oro',
    medalha_prata: 'Plata',
    medalha_bronze: 'Bronce',
    repetir: 'Repetir',
    voltar: 'Volver',
    melhor: 'Mejor: {pct}%',
    acerto: '¡Correcto!',
    erro: '¡Incorrecto!',
    revelado: '¡Aquí está!',
    cadeado: 'Función Pro',
  },
};

function tt(chave, params) {
  const idioma = getIdioma();
  const dic = TEXTOS[idioma] || TEXTOS.pt || {};
  const base = TEXTOS.pt || {};
  let texto = dic[chave] !== undefined ? dic[chave] : base[chave];
  if (texto === undefined) texto = chave;
  if (params && typeof texto === 'string') {
    for (const [k, v] of Object.entries(params)) {
      texto = texto.split('{' + k + '}').join(String(v));
    }
  }
  return texto;
}

export function iniciarQuiz({ motor, dados, premium, obterCtxCompartilhado }) {
  if (typeof document === 'undefined') {
    return {
      abrir: () => { throw new Error('Quiz: document não disponível em node'); }
    };
  }

  const root = document.getElementById('ui-root');
  if (!root) return {};

  // Cache de dados para defesa contra malformações
  const corposMap = new Map();
  if (dados && dados.corpos && Array.isArray(dados.corpos)) {
    for (const corpo of dados.corpos) {
      if (corpo && corpo.id) {
        corposMap.set(corpo.id, corpo);
      }
    }
  }

  // Estado do quiz
  let estadoAtual = 'pacotes'; // pacotes | multipla | encontrar | resultado
  let pacoteAtual = null;
  let perguntaIndex = 0;
  let pontuacao = 0;
  let tentativas = {}; // { perguntaId: { erros: n, acertou: bool, pts: n } }

  // Cria overlay principal (oculto)
  const overlay = document.createElement('div');
  overlay.className = 'quiz-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <div class="quiz-card">
      <button class="quiz-fechar botao-fechar-overlay" aria-label="${tt('voltar')}"><span class="fechar-icone">✕</span><span class="fechar-texto">‹ ${tt('voltar')}</span></button>
      <div id="quiz-conteudo"></div>
    </div>
  `;
  root.appendChild(overlay);

  const conteudo = overlay.querySelector('#quiz-conteudo');
  const btnFechar = overlay.querySelector('.quiz-fechar');

  // ========== Guardar localStorage com try/catch ==========
  function lerStorage() {
    try {
      const json = localStorage.getItem('sistema-solar-quiz');
      return json ? JSON.parse(json) : {};
    } catch (e) {
      return {};
    }
  }

  function salvarStorage(dados) {
    try {
      localStorage.setItem('sistema-solar-quiz', JSON.stringify(dados));
    } catch (e) {
      // silenciosamente falha (storage indisponível)
    }
  }

  // Modo "encontrar": o overlay vira card compacto inferior e libera a cena
  // 3D para cliques (pointer-events none no overlay, auto só no card — CSS)
  function setModoEncontrar(ativo) {
    overlay.classList.toggle('modo-encontrar', ativo);
  }

  // XP do sistema de progressão (js/progresso.js escuta este evento)
  function progressoEvento(tipo, extra) {
    document.dispatchEvent(new CustomEvent('sim:progresso', { detail: { tipo, ...(extra || {}) } }));
  }

  // Celebração de acerto: chime sintetizado (Web Audio, zero assets — o
  // AudioContext nasce no clique do usuário, então autoplay não bloqueia)
  // + explosão de partículas nas cores do app a partir do elemento acertado
  // Reaproveita o AudioContext da música de fundo quando ela já estiver
  // tocando (evita 2 contextos vivos ao mesmo tempo, que dobra o trabalho de
  // áudio do navegador); só cria um contexto próprio como fallback se a
  // música estiver desligada/não tiver iniciado ainda.
  let audioCtx = null;
  function ctxAudio() {
    const compartilhado = obterCtxCompartilhado ? obterCtxCompartilhado() : null;
    if (compartilhado) {
      if (compartilhado.state === 'suspended') compartilhado.resume();
      return compartilhado;
    }
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  // Nota curta: ataque rápido + decaimento exponencial
  function nota(ctx, freq, t, dur, tipo, vol) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = tipo;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }
  function tocarAcerto() {
    try {
      const ctx = ctxAudio();
      const t0 = ctx.currentTime;
      // "Moeda" de videogame: B5 → E6, rápido e brilhante
      nota(ctx, 987.77, t0, 0.12, 'square', 0.05);
      nota(ctx, 1318.51, t0 + 0.08, 0.32, 'square', 0.06);
      nota(ctx, 2637.02, t0 + 0.08, 0.26, 'sine', 0.05);
    } catch (e) { /* sem áudio no dispositivo: celebração segue muda */ }
  }
  // Fanfarra da tela de resultado: arpejo subindo + acorde final brilhante
  function tocarFanfarra() {
    try {
      const ctx = ctxAudio();
      const t0 = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        nota(ctx, f, t0 + i * 0.07, 0.18, 'square', 0.045);
      });
      [1046.5, 1318.51, 1567.98].forEach((f) => {
        nota(ctx, f, t0 + 0.32, 0.75, 'triangle', 0.07);
      });
      nota(ctx, 2093.0, t0 + 0.32, 0.5, 'sine', 0.04);
    } catch (e) { /* sem áudio no dispositivo */ }
  }

  function celebrar(elemento) {
    tocarAcerto();
    if (!elemento) return;
    const r = elemento.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const cores = ['#5cc8ff', '#7dde9a', '#ffb454', '#a5e3ff'];
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div');
      p.className = 'quiz-particula';
      const ang = (Math.PI * 2 * i) / 16 + Math.random() * 0.4;
      const dist = 50 + Math.random() * 70;
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.background = cores[i % cores.length];
      p.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      p.style.setProperty('--dy', (Math.sin(ang) * dist - 30) + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  // Barra de progresso do pacote (sob o contador "N/16")
  function criarBarraProgresso() {
    const trilho = document.createElement('div');
    trilho.className = 'quiz-progresso-trilho';
    const fill = document.createElement('div');
    fill.className = 'quiz-progresso-preenchido';
    const total = pacoteAtual?.perguntas?.length || 1;
    fill.style.width = Math.round((perguntaIndex / total) * 100) + '%';
    trilho.appendChild(fill);
    return trilho;
  }

  // ========== Renderizar tela de pacotes ==========
  function mostrarPacotes() {
    estadoAtual = 'pacotes';
    setModoEncontrar(false);
    conteudo.innerHTML = '';

    const titulo = document.createElement('h2');
    titulo.className = 'quiz-titulo-pacotes';
    titulo.textContent = tt('tela_pacotes_titulo');
    conteudo.appendChild(titulo);

    const grid = document.createElement('div');
    grid.className = 'quiz-grid-pacotes';

    const storage = lerStorage();

    if (!QUIZ_PACOTES || !Array.isArray(QUIZ_PACOTES)) {
      conteudo.appendChild(grid); // Grid vazio se dados ruim
      return;
    }

    for (const pacote of QUIZ_PACOTES) {
      if (!pacote || typeof pacote !== 'object') continue; // Pule pacotes malformados

      const id = pacote.id || 'sem-id';
      const nome = pacote.nome || {};
      const idioma = getIdioma();
      const nomePacote = nome[idioma] || nome.pt || id;

      // Verifica permissão
      const permitido = !premium || premium.permitido('quiz', id);

      const card = document.createElement('div');
      card.className = 'quiz-pacote-card';
      if (!permitido) card.classList.add('bloqueado');

      const icone = document.createElement('div');
      icone.className = 'quiz-pacote-icone';
      icone.textContent = pacote.icone || '◐';
      card.appendChild(icone);

      const nomeEl = document.createElement('div');
      nomeEl.className = 'quiz-pacote-nome';
      nomeEl.textContent = nomePacote;
      card.appendChild(nomeEl);

      const metadata = document.createElement('div');
      metadata.className = 'quiz-pacote-metadata';

      const melhorPct = storage[id]?.melhorPct ?? null;
      const medalha = storage[id]?.medalha ?? null;

      if (melhorPct !== null) {
        const medalhaEl = document.createElement('div');
        medalhaEl.className = `quiz-medalha quiz-medalha-${medalha}`;
        medalhaEl.textContent = '●'; // círculo cheio
        metadata.appendChild(medalhaEl);

        const pctEl = document.createElement('div');
        pctEl.className = 'quiz-melhor-pct';
        pctEl.textContent = tt('melhor', { pct: melhorPct });
        metadata.appendChild(pctEl);
      } else {
        const vazio = document.createElement('div');
        vazio.className = 'quiz-medalha quiz-medalha-vazio';
        vazio.textContent = '○'; // círculo vazio
        metadata.appendChild(vazio);
      }

      if (!permitido) {
        const selo = document.createElement('div');
        selo.className = 'quiz-selo-pro';
        selo.textContent = 'PRO';
        metadata.appendChild(selo);
      }

      card.appendChild(metadata);

      card.addEventListener('click', () => {
        if (!permitido) {
          // Abre paywall
          if (premium && premium.exigirItem) {
            premium.exigirItem('quiz', id);
          }
          return;
        }
        entrarPacote(pacote);
      });

      grid.appendChild(card);
    }

    conteudo.appendChild(grid);
  }

  // ========== Entrar em um pacote ==========
  function entrarPacote(pacote) {
    if (!pacote || !Array.isArray(pacote.perguntas)) {
      // Pacote malformado, volta
      mostrarPacotes();
      return;
    }

    pacoteAtual = pacote;
    perguntaIndex = 0;
    pontuacao = 0;
    tentativas = {};

    mostrarProximaPergunta();
  }

  // ========== Mostrar próxima pergunta ==========
  function mostrarProximaPergunta() {
    if (!pacoteAtual || !Array.isArray(pacoteAtual.perguntas)) {
      mostrarPacotes();
      return;
    }

    if (perguntaIndex >= pacoteAtual.perguntas.length) {
      mostrarResultado();
      return;
    }

    const pergunta = pacoteAtual.perguntas[perguntaIndex];
    if (!pergunta || typeof pergunta !== 'object') {
      // Pergunta malformada, pula
      perguntaIndex++;
      mostrarProximaPergunta();
      return;
    }

    if (pergunta.tipo === 'multipla') {
      mostrarMultipla(pergunta);
    } else if (pergunta.tipo === 'encontrar') {
      mostrarEncontrar(pergunta);
    } else {
      // Tipo desconhecido, pula
      perguntaIndex++;
      mostrarProximaPergunta();
    }
  }

  // ========== Mostrar pergunta múltipla ==========
  function mostrarMultipla(pergunta) {
    estadoAtual = 'multipla';
    setModoEncontrar(false);
    conteudo.innerHTML = '';

    const idioma = getIdioma();
    const texto = pergunta.texto ? (pergunta.texto[idioma] || pergunta.texto.pt || '') : '';
    const opcoes = pergunta.opcoes ? (pergunta.opcoes[idioma] || pergunta.opcoes.pt || []) : [];
    const corretaIndex = pergunta.corretaIndex ?? -1;

    if (!texto || !Array.isArray(opcoes) || opcoes.length === 0 || corretaIndex < 0) {
      // Pergunta malformada
      perguntaIndex++;
      mostrarProximaPergunta();
      return;
    }

    // Contador
    const contador = document.createElement('div');
    contador.className = 'quiz-contador';
    contador.textContent = tt('contador', { n: perguntaIndex + 1, total: pacoteAtual.perguntas.length });
    conteudo.appendChild(contador);
    conteudo.appendChild(criarBarraProgresso());

    // Texto
    const textoEl = document.createElement('div');
    textoEl.className = 'quiz-texto-pergunta';
    textoEl.textContent = texto;
    conteudo.appendChild(textoEl);

    // Botões de opção
    const opcoesDiv = document.createElement('div');
    opcoesDiv.className = 'quiz-opcoes';

    const tentativa = tentativas[pergunta.id] || { erros: 0, acertou: false, pts: 0 };

    for (let i = 0; i < opcoes.length; i++) {
      const opcao = opcoes[i];
      const btnOpcao = document.createElement('button');
      btnOpcao.className = 'quiz-opcao';
      btnOpcao.textContent = opcao;
      btnOpcao.disabled = tentativa.acertou;

      btnOpcao.addEventListener('click', () => {
        if (tentativa.acertou) return;

        if (i === corretaIndex) {
          // Acerto: 10 pts na 1ª tentativa, 5 nas seguintes
          tentativa.acertou = true;
          tentativa.pts = tentativa.erros === 0 ? 10 : 5;
          pontuacao += tentativa.pts;
          tentativas[pergunta.id] = tentativa;
          progressoEvento('quiz-acerto', { pts: tentativa.pts });

          btnOpcao.classList.add('correto');
          celebrar(btnOpcao);
          conteudo.querySelector('.quiz-aviso-erro')?.remove();

          const explicacao = pergunta.explicacao ? (pergunta.explicacao[idioma] || pergunta.explicacao.pt || '') : '';
          mostrarExplicacao(true, explicacao);

          // Só o acerto encerra a pergunta
          for (const btn of opcoesDiv.querySelectorAll('.quiz-opcao')) {
            btn.disabled = true;
          }
        } else {
          // Erro: desabilita SÓ a opção errada — o jogador tenta de novo
          // (a explicação não aparece aqui: entregaria a resposta)
          tentativa.erros++;
          tentativas[pergunta.id] = tentativa;

          btnOpcao.classList.add('erro');
          btnOpcao.disabled = true;

          if (!conteudo.querySelector('.quiz-aviso-erro')) {
            const aviso = document.createElement('div');
            aviso.className = 'quiz-aviso-erro';
            aviso.textContent = tt('tente_de_novo');
            opcoesDiv.after(aviso);
          }
        }
      });

      opcoesDiv.appendChild(btnOpcao);
    }

    conteudo.appendChild(opcoesDiv);
  }

  function mostrarExplicacao(correto, texto) {
    const div = document.createElement('div');
    div.className = `quiz-explicacao ${correto ? 'correto' : 'erro'}`;

    const titulo = document.createElement('div');
    titulo.className = 'quiz-explicacao-titulo';
    titulo.textContent = correto ? tt('acerto') : tt('erro');
    div.appendChild(titulo);

    if (texto) {
      const conteudoExp = document.createElement('div');
      conteudoExp.className = 'quiz-explicacao-conteudo';
      conteudoExp.textContent = texto;
      div.appendChild(conteudoExp);
    }

    const btnContinuar = document.createElement('button');
    btnContinuar.className = 'quiz-btn-continuar';
    btnContinuar.textContent = tt('continuar');
    btnContinuar.addEventListener('click', () => {
      perguntaIndex++;
      mostrarProximaPergunta();
    });
    div.appendChild(btnContinuar);

    conteudo.appendChild(div);
  }

  // ========== Mostrar pergunta encontrar ==========
  let listeningForSelecao = false;
  // Fecha o listener 'sim:selecao' da pergunta 'encontrar' anterior — sem
  // isso, revelar a resposta (em vez de acertar) deixava um listener zumbi
  // que reagia (com o alvoId ERRADO) ao clique da pergunta seguinte
  let listenerEncontrarAtivo = null;

  function mostrarEncontrar(pergunta) {
    estadoAtual = 'encontrar';
    listeningForSelecao = true;
    setModoEncontrar(true);

    conteudo.innerHTML = '';

    const idioma = getIdioma();
    const texto = pergunta.texto ? (pergunta.texto[idioma] || pergunta.texto.pt || '') : '';
    const dica = pergunta.dica ? (pergunta.dica[idioma] || pergunta.dica.pt || '') : '';
    const alvoId = pergunta.alvoId || '';

    if (!texto || !alvoId || !corposMap.has(alvoId)) {
      // Pergunta malformada ou alvo não existe
      listeningForSelecao = false;
      perguntaIndex++;
      mostrarProximaPergunta();
      return;
    }

    // Card compacto inferior
    const contador = document.createElement('div');
    contador.className = 'quiz-contador';
    contador.textContent = tt('contador', { n: perguntaIndex + 1, total: pacoteAtual.perguntas.length });
    conteudo.appendChild(contador);
    conteudo.appendChild(criarBarraProgresso());

    const card = document.createElement('div');
    card.className = 'quiz-encontrar-card';

    const titulo = document.createElement('div');
    titulo.className = 'quiz-encontrar-titulo';
    titulo.textContent = tt('encontre');
    card.appendChild(titulo);

    const textoEl = document.createElement('div');
    textoEl.className = 'quiz-encontrar-texto';
    textoEl.textContent = texto;
    card.appendChild(textoEl);

    const dicaEl = document.createElement('div');
    dicaEl.className = 'quiz-encontrar-dica';
    dicaEl.textContent = dica;
    card.appendChild(dicaEl);

    conteudo.appendChild(card);

    const tentativa = tentativas[pergunta.id] || { erros: 0, acertou: false, pts: 0, revelarUsado: false };

    // Fecha qualquer listener de uma pergunta 'encontrar' anterior antes de
    // registrar o novo (ver comentário na declaração de listenerEncontrarAtivo)
    if (listenerEncontrarAtivo) {
      document.removeEventListener('sim:selecao', listenerEncontrarAtivo);
      listenerEncontrarAtivo = null;
    }

    // Listener para selecao de corpo
    function aoSelecionarCorpo(evt) {
      if (!listeningForSelecao) {
        document.removeEventListener('sim:selecao', aoSelecionarCorpo);
        return;
      }

      const idSelecionado = evt.detail?.id;

      // Clique que não acertou NENHUM astro (raycaster vazio) não é uma
      // resposta errada — é o usuário navegando/mirando. Ignorar em vez de
      // penalizar (evita punir quase-acertos e cliques de navegação).
      if (idSelecionado == null) return;

      if (idSelecionado === alvoId) {
        // Acerto
        listeningForSelecao = false;
        document.removeEventListener('sim:selecao', aoSelecionarCorpo);
        listenerEncontrarAtivo = null;

        tentativa.acertou = true;
        tentativa.pts = tentativa.erros === 0 ? 10 : 5;
        pontuacao += tentativa.pts;
        tentativas[pergunta.id] = tentativa;
        progressoEvento('quiz-acerto', { pts: tentativa.pts });

        card.classList.add('encontrar-correto');
        celebrar(card);
        const explicacao = pergunta.explicacao ? (pergunta.explicacao[idioma] || pergunta.explicacao.pt || '') : '';
        mostrarExplicacaoEncontrar(true, explicacao);
      } else {
        // Erro
        tentativa.erros++;
        tentativas[pergunta.id] = tentativa;

        card.classList.add('encontrar-erro');

        if (tentativa.erros >= 2 && !tentativa.revelarUsado) {
          // Mostra botão revelar
          mostrarBotaoRevelar(pergunta, alvoId, card);
        } else if (tentativa.erros < 2) {
          // Tenta de novo
          setTimeout(() => {
            card.classList.remove('encontrar-erro');
          }, 600);
        }
      }
    }

    document.addEventListener('sim:selecao', aoSelecionarCorpo);
    listenerEncontrarAtivo = aoSelecionarCorpo;
  }

  function mostrarBotaoRevelar(pergunta, alvoId, card) {
    const tentativa = tentativas[pergunta.id];
    if (tentativa.revelarUsado) return;
    if (card.querySelector('.quiz-btn-revelar')) return; // já exibido — não empilhar outro

    const btnRevelar = document.createElement('button');
    btnRevelar.className = 'quiz-btn-revelar';
    btnRevelar.textContent = tt('revelar');
    btnRevelar.addEventListener('click', () => {
      tentativa.revelarUsado = true;
      tentativa.pts = 0; // Revelar = 0 pontos
      tentativas[pergunta.id] = tentativa;

      listeningForSelecao = false;

      motor.focar(alvoId);

      const idioma = getIdioma();
      const explicacao = pergunta.explicacao ? (pergunta.explicacao[idioma] || pergunta.explicacao.pt || '') : '';
      mostrarExplicacaoEncontrar(false, explicacao, true);

      btnRevelar.remove();
    });

    card.appendChild(btnRevelar);
  }

  function mostrarExplicacaoEncontrar(correto, texto, revelado = false) {
    const div = document.createElement('div');
    div.className = `quiz-explicacao ${correto ? 'correto' : 'erro'}`;

    const titulo = document.createElement('div');
    titulo.className = 'quiz-explicacao-titulo';
    if (correto) {
      titulo.textContent = tt('acerto');
    } else if (revelado) {
      titulo.textContent = tt('revelado');
    } else {
      titulo.textContent = tt('tente_de_novo');
    }
    div.appendChild(titulo);

    if (texto) {
      const conteudoExp = document.createElement('div');
      conteudoExp.className = 'quiz-explicacao-conteudo';
      conteudoExp.textContent = texto;
      div.appendChild(conteudoExp);
    }

    const btnContinuar = document.createElement('button');
    btnContinuar.className = 'quiz-btn-continuar';
    btnContinuar.textContent = tt('continuar');
    btnContinuar.addEventListener('click', () => {
      perguntaIndex++;
      mostrarProximaPergunta();
    });
    div.appendChild(btnContinuar);

    conteudo.appendChild(div);
  }

  // ========== Mostrar resultado final ==========
  function mostrarResultado() {
    listeningForSelecao = false;
    estadoAtual = 'resultado';
    setModoEncontrar(false);

    conteudo.innerHTML = '';

    // Calcula medalha — máximo dinâmico: 10 pts por pergunta do pacote
    const maxPts = (pacoteAtual?.perguntas?.length || 8) * 10;
    const pct = Math.round((pontuacao / maxPts) * 100);
    let medalha = 'bronze';
    if (pct >= 90) medalha = 'ouro';
    else if (pct >= 70) medalha = 'prata';

    // Persiste resultado
    const storage = lerStorage();
    const id = pacoteAtual.id || 'sem-id';
    const melhor = storage[id] ? storage[id].melhorPct : null;

    if (melhor === null || pct > melhor) {
      storage[id] = { melhorPct: pct, medalha };
      salvarStorage(storage);
    }

    progressoEvento('quiz-pacote', { pacoteId: id, pct, medalha: pct >= 50 ? medalha : null });

    tocarFanfarra();

    const titulo = document.createElement('h2');
    titulo.className = 'quiz-resultado-titulo';
    titulo.textContent = tt('resultado_titulo');
    conteudo.appendChild(titulo);

    const medalhaEl = document.createElement('div');
    medalhaEl.className = `quiz-medalha-resultado quiz-medalha-${medalha}`;
    medalhaEl.textContent = '●';
    conteudo.appendChild(medalhaEl);

    const pts = document.createElement('div');
    pts.className = 'quiz-resultado-pts';
    pts.textContent = tt('resultado_pts', { pts: pontuacao, max: maxPts });
    conteudo.appendChild(pts);

    const pctEl = document.createElement('div');
    pctEl.className = 'quiz-resultado-pct';
    pctEl.textContent = tt('resultado_pct', { pct });
    conteudo.appendChild(pctEl);

    const btnRepetir = document.createElement('button');
    btnRepetir.className = 'quiz-btn-resultado';
    btnRepetir.textContent = tt('repetir');
    btnRepetir.addEventListener('click', () => {
      entrarPacote(pacoteAtual);
    });
    conteudo.appendChild(btnRepetir);

    const btnVoltar = document.createElement('button');
    btnVoltar.className = 'quiz-btn-resultado quiz-btn-secundario';
    btnVoltar.textContent = tt('voltar');
    btnVoltar.addEventListener('click', () => {
      mostrarPacotes();
    });
    conteudo.appendChild(btnVoltar);
  }

  // ========== Fechar quiz ==========
  function fechar() {
    listeningForSelecao = false;
    if (listenerEncontrarAtivo) {
      document.removeEventListener('sim:selecao', listenerEncontrarAtivo);
      listenerEncontrarAtivo = null;
    }
    setModoEncontrar(false);
    overlay.style.display = 'none';
  }

  btnFechar.addEventListener('click', fechar);

  // Fechar ao clicar fora do card (nunca em modo encontrar — ali o clique
  // fora do card É o gameplay: selecionar astros na cena 3D)
  overlay.addEventListener('click', (evt) => {
    if (evt.target === overlay && !overlay.classList.contains('modo-encontrar')) fechar();
  });

  // Fechar com Esc
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && overlay.style.display === 'flex') {
      evt.stopImmediatePropagation();
      fechar();
    }
  }, { capture: true });

  // ========== Função abrir ==========
  function abrir() {
    overlay.style.display = 'flex';
    mostrarPacotes();
  }

  // Após comprar o Pro, se a tela de pacotes estiver aberta, atualiza os
  // selos/bloqueios sem exigir fechar e reabrir o quiz (mesmo padrão de
  // ui.js e voce-no-espaco.js)
  if (premium) {
    premium.aoMudar(() => {
      if (estadoAtual === 'pacotes') mostrarPacotes();
    });
  }

  return { abrir };
}
