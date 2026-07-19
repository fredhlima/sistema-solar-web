import { t } from './i18n.js?v=19';

const CHAVE = 'sistema-solar-tutorial-visto';

const PASSOS = [
  { alvo: null,                    titulo: 'tutorialTitulo1', texto: 'tutorialTexto1' },
  { alvo: '#painel-explorar',      titulo: 'tutorialTitulo2', texto: 'tutorialTexto2' },
  { alvo: '.grupo-experiencias',   titulo: 'tutorialTitulo3', texto: 'tutorialTexto3' },
  { alvo: '.grupo-visualizacao',   titulo: 'tutorialTitulo4', texto: 'tutorialTexto4' },
  { alvo: '.controles-tempo',      titulo: 'tutorialTitulo5', texto: 'tutorialTexto5' },
  { alvo: '.progresso-chip',       titulo: 'tutorialTitulo6', texto: 'tutorialTexto6' },
];

let passoAtual = 0;
let aberto = false;
let ouvinteTeclado = null;
let ouvinteTamanho = null;
let cardElement = null;
let focoElement = null;
let overlayElement = null;

export function iniciarTutorial() {
  // Criar botão "?" de rever tutorial
  const grupoUtilidades = document.querySelector('.grupo-utilidades');
  if (grupoUtilidades) {
    const botaoTutorial = document.createElement('button');
    botaoTutorial.className = 'botao botao-tutorial';
    botaoTutorial.textContent = '?';
    botaoTutorial.title = t('tutorialRever');
    botaoTutorial.setAttribute('aria-label', t('tutorialRever'));
    botaoTutorial.addEventListener('click', () => abrir());
    grupoUtilidades.appendChild(botaoTutorial);
  }

  // Verificar se já foi visto. O flag é RE-checado no disparo: em abas de
  // fundo o navegador atrasa timers, e o usuário pode já ter concluído o
  // tutorial (ex.: via botão ?) — sem o re-check, o timer atrasado reabriria
  // o overlay por cima do que ele estiver fazendo (visto acontecer por cima
  // do Tour guiado).
  try {
    if (!localStorage.getItem(CHAVE)) {
      setTimeout(() => {
        try {
          if (!localStorage.getItem(CHAVE)) abrir();
        } catch (e) { abrir(); }
      }, 2600);
    }
  } catch (e) {
    // localStorage bloqueado, ignora
  }

  return { abrir };
}

function abrir() {
  // Se já está aberto, ignora
  if (aberto || document.querySelector('.tutorial-overlay')) {
    return;
  }

  aberto = true;
  passoAtual = 0;

  // Criar overlay
  overlayElement = document.createElement('div');
  overlayElement.className = 'tutorial-overlay';

  focoElement = document.createElement('div');
  focoElement.className = 'tutorial-foco';
  overlayElement.appendChild(focoElement);

  cardElement = document.createElement('div');
  cardElement.className = 'tutorial-card';
  cardElement.setAttribute('role', 'dialog');
  cardElement.setAttribute('aria-modal', 'true');

  cardElement.innerHTML = `
    <h3 class="tutorial-card-titulo"></h3>
    <p class="tutorial-card-texto"></p>
    <div class="tutorial-dots"></div>
    <div class="tutorial-botoes">
      <button class="tutorial-btn-pular">${t('tutorialPular')}</button>
      <button class="tutorial-btn-anterior">${t('tutorialAnterior')}</button>
      <button class="tutorial-btn-proximo">${t('tutorialProximo')}</button>
    </div>
  `;

  overlayElement.appendChild(cardElement);
  document.body.appendChild(overlayElement);
  document.body.classList.add('tutorial-ativo');

  // Criar pontos
  const containerDots = cardElement.querySelector('.tutorial-dots');
  PASSOS.forEach(() => {
    const dot = document.createElement('span');
    dot.className = 'tutorial-dot';
    containerDots.appendChild(dot);
  });

  // Event listeners dos botões
  cardElement.querySelector('.tutorial-btn-pular').addEventListener('click', fechar);
  cardElement.querySelector('.tutorial-btn-anterior').addEventListener('click', () => {
    if (passoAtual > 0) {
      passoAtual--;
      mostrarPasso();
    }
  });
  cardElement.querySelector('.tutorial-btn-proximo').addEventListener('click', () => {
    if (passoAtual < PASSOS.length - 1) {
      passoAtual++;
      mostrarPasso();
    }
  });

  // Teclado
  ouvinteTeclado = (e) => {
    if (e.key === 'ArrowRight' && passoAtual < PASSOS.length - 1) {
      e.stopPropagation();
      passoAtual++;
      mostrarPasso();
    } else if (e.key === 'ArrowLeft' && passoAtual > 0) {
      e.stopPropagation();
      passoAtual--;
      mostrarPasso();
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      fechar();
    }
  };
  document.addEventListener('keydown', ouvinteTeclado, true);

  // Resize listener
  ouvinteTamanho = () => mostrarPasso();
  window.addEventListener('resize', ouvinteTamanho);

  mostrarPasso();
}

function mostrarPasso() {
  const passo = PASSOS[passoAtual];
  const cardElement = document.querySelector('.tutorial-card');
  const focoElement = document.querySelector('.tutorial-foco');

  // Atualizar título e texto
  cardElement.querySelector('.tutorial-card-titulo').textContent = t(passo.titulo);
  cardElement.querySelector('.tutorial-card-texto').textContent = t(passo.texto);

  // Atualizar pontos
  const dots = cardElement.querySelectorAll('.tutorial-dot');
  dots.forEach((dot, idx) => {
    if (idx === passoAtual) {
      dot.classList.add('ativo');
    } else {
      dot.classList.remove('ativo');
    }
  });

  // Atualizar botões
  const btnAnterior = cardElement.querySelector('.tutorial-btn-anterior');
  const btnProximo = cardElement.querySelector('.tutorial-btn-proximo');
  const containerBotoes = cardElement.querySelector('.tutorial-botoes');

  // Primeiro passo: esconder anterior
  if (passoAtual === 0) {
    btnAnterior.style.visibility = 'hidden';
  } else {
    btnAnterior.style.visibility = 'visible';
  }

  // Último passo: trocar próximo por tour e livre
  if (passoAtual === PASSOS.length - 1) {
    btnProximo.style.display = 'none';

    // Verificar se já criamos os botões
    if (!cardElement.querySelector('.tutorial-btn-tour')) {
      const btnTour = document.createElement('button');
      btnTour.className = 'tutorial-btn-tour';
      btnTour.textContent = t('tutorialFazerTour');
      btnTour.addEventListener('click', () => {
        fechar();
        setTimeout(() => {
          document.getElementById('btn-tour')?.click();
        }, 100);
      });

      const btnLivre = document.createElement('button');
      btnLivre.className = 'tutorial-btn-livre';
      btnLivre.textContent = t('tutorialExplorarSozinho');
      btnLivre.addEventListener('click', fechar);

      containerBotoes.appendChild(btnTour);
      containerBotoes.appendChild(btnLivre);
    }
  } else {
    btnProximo.style.display = '';
    // Remover botões de tour/livre se existirem
    cardElement.querySelector('.tutorial-btn-tour')?.remove();
    cardElement.querySelector('.tutorial-btn-livre')?.remove();
  }

  // Posicionar
  posicionarCard(passo);
}

function posicionarCard(passo) {
  const cardElement = document.querySelector('.tutorial-card');
  const focoElement = document.querySelector('.tutorial-foco');

  let elemento = null;
  let deveEstarCentrado = false;

  if (passo.alvo) {
    elemento = document.querySelector(passo.alvo);
  }

  if (!elemento || elemento.offsetWidth === 0 || !isElementVisible(elemento)) {
    deveEstarCentrado = true;
  }

  if (deveEstarCentrado) {
    focoElement.style.display = 'none';
    cardElement.classList.add('centrado');
  } else {
    focoElement.style.display = 'block';
    cardElement.classList.remove('centrado');

    const rect = elemento.getBoundingClientRect();
    const padding = 8;

    // Atualizar foco
    focoElement.style.top = (rect.top - padding) + 'px';
    focoElement.style.left = (rect.left - padding) + 'px';
    focoElement.style.width = (rect.width + padding * 2) + 'px';
    focoElement.style.height = (rect.height + padding * 2) + 'px';

    // Posicionar card
    const cardHeight = cardElement.offsetHeight;
    const cardWidth = cardElement.offsetWidth;
    const espacoAbaixo = window.innerHeight - (rect.bottom + 16);

    let top;
    if (espacoAbaixo > 220) {
      // Colocar abaixo
      top = rect.bottom + 16;
    } else {
      // Colocar acima
      top = rect.top - cardHeight - 16;
    }
    // Alvos altos (ex.: painel Explorar) empurrariam o card pra fora da
    // tela nos dois ramos — clampa pra dentro do viewport.
    top = Math.max(12, Math.min(top, window.innerHeight - cardHeight - 12));

    // Posição horizontal (centrar no alvo, com bounds)
    const left = Math.max(
      12,
      Math.min(
        window.innerWidth - cardWidth - 12,
        rect.left + rect.width / 2 - cardWidth / 2
      )
    );

    cardElement.style.top = top + 'px';
    cardElement.style.left = left + 'px';
  }
}

function isElementVisible(element) {
  const rect = element.getBoundingClientRect();
  // Mínimo de 24px em cada eixo: um painel colapsado (ex.: Explorar com
  // conteúdo recolhido) reporta rect degenerado de ~2px e o spotlight
  // ancoraria num risco invisível — melhor cair no card centralizado.
  return rect.width >= 24 && rect.height >= 24;
}

function fechar() {
  if (!aberto) return;

  aberto = false;

  // Salvar no localStorage
  try {
    localStorage.setItem(CHAVE, '1');
  } catch (e) {
    // localStorage bloqueado
  }

  // Remover overlay
  overlayElement?.remove();

  // Remover classe do body
  document.body.classList.remove('tutorial-ativo');

  // Remover listeners
  if (ouvinteTeclado) {
    document.removeEventListener('keydown', ouvinteTeclado, true);
  }
  if (ouvinteTamanho) {
    window.removeEventListener('resize', ouvinteTamanho);
  }

  overlayElement = null;
  cardElement = null;
  focoElement = null;
  ouvinteTeclado = null;
  ouvinteTamanho = null;
}
