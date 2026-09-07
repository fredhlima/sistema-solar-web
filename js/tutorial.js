import { t, tToque } from './i18n.js?v=30';

const CHAVE = 'sistema-solar-tutorial-visto';

// alvoMobile: seletores do dock mobile (js/mobile-dock.js). No celular deitado
// o chrome desktop fica display:none (spotlight não acharia nada), então cada
// passo mira o equivalente do dock quando body.modo-dock está ativo.
const PASSOS = [
  { alvo: null,                    alvoMobile: null,             titulo: 'tutorialTitulo1', texto: 'tutorialTexto1' },
  { alvo: '#painel-explorar',      alvoMobile: '#mdock-btn-exp',  titulo: 'tutorialTitulo2', texto: 'tutorialTexto2' },
  { alvo: '.grupo-experiencias',   alvoMobile: '#mdock-btn-xp',   titulo: 'tutorialTitulo3', texto: 'tutorialTexto3' },
  { alvo: '.grupo-visualizacao',   alvoMobile: '.mdock-gear',     titulo: 'tutorialTitulo4', texto: 'tutorialTexto4' },
  { alvo: '.controles-tempo',      alvoMobile: '.mdock-transporte', titulo: 'tutorialTitulo5', texto: 'tutorialTexto5' },
  { alvo: '.progresso-chip',       alvoMobile: '#mdock-nivel',    titulo: 'tutorialTitulo6', texto: 'tutorialTexto6' },
];

let passoAtual = 0;
let aberto = false;
let ouvinteTeclado = null;
let ouvinteTamanho = null;
let observadorAlvo = null;
let cardElement = null;
let focoElement = null;
let overlayElement = null;

// `definirRitmo`: mesma função usada para reduzir a velocidade ao seguir uma
// missão (ver ui.js) — reaproveitada aqui para deixar a simulação em 1h/s
// (em vez do 1 dia/s padrão) enquanto o tutorial guia a pessoa pela tela,
// para os astros se moverem devagar o bastante para dar pra acompanhar.
let definirRitmoRef = null;

export function iniciarTutorial({ definirRitmo } = {}) {
  definirRitmoRef = definirRitmo || null;
  // Criar botão "?" de rever tutorial
  const grupoUtilidades = document.querySelector('.grupo-utilidades');
  if (grupoUtilidades) {
    const botaoTutorial = document.createElement('button');
    botaoTutorial.className = 'botao botao-tutorial';
    // id para o dock do celular poder reabrir o tutorial clicando este botão
    // (mesmo padrão de proxy do #btn-musica): a .grupo-utilidades inteira fica
    // display:none no modo-dock, então sem essa ponte o tutorial era
    // irrecuperável no aparelho — que é justamente a plataforma da loja.
    botaoTutorial.id = 'btn-tutorial';
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

  // 1h/s (1/24 dia/s) em vez do 1 dia/s padrão: pedido do Fred (08/09/2026)
  // — nessa velocidade os astros ainda se movem, mas dá pra acompanhar
  // enquanto a atenção está no balão do tutorial, não na cena. Fica assim
  // depois que o tutorial fecha; o usuário ajusta pelos próprios controles
  // se quiser voltar ao ritmo padrão.
  definirRitmoRef?.(1 / 24);

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
  cardElement.querySelector('.tutorial-card-texto').textContent = tToque(passo.texto);

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
  const elementoAlvo = posicionarCard(passo);

  // O alvo pode mudar de TAMANHO depois de o balão já estar posicionado: o
  // chip do dock nasce "◆ Nível" e vira o nome do nível quando o progresso
  // sincroniza. Medido em 12 aberturas do tutorial no iPhone 15: numa delas o
  // passo 6 ficou ~1s com o balão sobre o destaque, até um resize qualquer
  // reposicionar. Reobservar o alvo fecha essa janela.
  observadorAlvo?.disconnect();
  observadorAlvo = null;
  if (elementoAlvo && window.ResizeObserver) {
    observadorAlvo = new ResizeObserver(() => posicionarCard(passo));
    observadorAlvo.observe(elementoAlvo);
  }
}

// Distâncias do balão: `FOLGA` é o vão entre o balão e o retângulo do foco
// (a seta ocupa 8 desses pixels), `MARGEM` é o respiro até a borda da tela.
const FOLGA = 16;
const MARGEM = 10;
// Ordem de preferência dos lados. Abaixo primeiro porque é onde o olho vai
// depois de ver o destaque; os lados horizontais entram quando não há altura,
// que é o caso do dock no celular deitado.
const LADOS = ['baixo', 'cima', 'direita', 'esquerda'];

/**
 * Coloca o balão num lado do alvo em que ele CABE e não cobre o alvo.
 *
 * A versão anterior não escolhia lado nenhum: em telas de até 1024px o CSS
 * fixava o card na base da tela, com `!important`, ocupando a largura inteira.
 * Em paisagem de celular isso é uma barra de 828×178 sobre o terço de baixo —
 * exatamente onde mora o dock, que é o alvo de quatro dos seis passos. Três
 * deles destacavam um botão que ficava atrás do próprio balão.
 */
function posicionarCard(passo) {
  const cardElement = document.querySelector('.tutorial-card');
  const focoElement = document.querySelector('.tutorial-foco');

  let elemento = null;
  let deveEstarCentrado = false;

  const noDock = document.body.classList.contains('modo-dock');
  const seletor = noDock ? passo.alvoMobile : passo.alvo;
  if (seletor) {
    elemento = document.querySelector(seletor);
  }

  if (!elemento || elemento.offsetWidth === 0 || !isElementVisible(elemento)) {
    deveEstarCentrado = true;
  }

  cardElement.classList.remove('seta-cima', 'seta-baixo', 'seta-esquerda', 'seta-direita');

  if (deveEstarCentrado) {
    focoElement.style.display = 'none';
    cardElement.classList.add('centrado');
    return null;
  }

  focoElement.style.display = 'block';
  cardElement.classList.remove('centrado');

  const rect = elemento.getBoundingClientRect();
  const padding = 8;
  // O retângulo do destaque é limitado à tela. Os botões do dock encostam na
  // borda de baixo, então os 8px de folga saíam do viewport e o anel do
  // destaque aparecia cortado, como um "U" aberto. Limitar também mantém a
  // conta dos lados honesta: o espaço livre passa a ser o espaço que existe.
  const alvo = {
    top: Math.max(2, rect.top - padding),
    left: Math.max(2, rect.left - padding),
    right: Math.min(window.innerWidth - 2, rect.right + padding),
    bottom: Math.min(window.innerHeight - 2, rect.bottom + padding),
  };
  focoElement.style.top = alvo.top + 'px';
  focoElement.style.left = alvo.left + 'px';
  focoElement.style.width = (alvo.right - alvo.left) + 'px';
  focoElement.style.height = (alvo.bottom - alvo.top) + 'px';

  // Medir o balão fora do posicionamento anterior, senão a largura vem do
  // lugar onde ele estava e o lado escolhido muda a cada passo sem motivo.
  const larg = cardElement.offsetWidth;
  const alt = cardElement.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const espaco = {
    baixo: vh - alvo.bottom - FOLGA - MARGEM,
    cima: alvo.top - FOLGA - MARGEM,
    direita: vw - alvo.right - FOLGA - MARGEM,
    esquerda: alvo.left - FOLGA - MARGEM,
  };
  const precisa = (lado) => (lado === 'baixo' || lado === 'cima' ? alt : larg);

  // O primeiro lado que comporta o balão inteiro. Se nenhum comportar (alvo
  // enorme numa tela pequena), fica o de maior folga relativa — melhor um
  // balão apertado num canto que um balão em cima do que ele aponta.
  let lado = LADOS.find((l) => espaco[l] >= precisa(l));
  if (!lado) {
    lado = LADOS.slice().sort((a, b) => espaco[b] / precisa(b) - espaco[a] / precisa(a))[0];
  }

  const centroX = (alvo.left + alvo.right) / 2;
  const centroY = (alvo.top + alvo.bottom) / 2;
  const limitar = (v, min, max) => Math.max(min, Math.min(v, max));

  let top;
  let left;
  if (lado === 'baixo' || lado === 'cima') {
    top = lado === 'baixo' ? alvo.bottom + FOLGA : alvo.top - FOLGA - alt;
    left = limitar(centroX - larg / 2, MARGEM, vw - larg - MARGEM);
  } else {
    left = lado === 'direita' ? alvo.right + FOLGA : alvo.left - FOLGA - larg;
    top = limitar(centroY - alt / 2, MARGEM, vh - alt - MARGEM);
  }
  // Só o eixo TRANSVERSAL é limitado. Limitar o eixo do lado escolhido é o que
  // fazia o card subir por cima do alvo quando ele era alto (painel Explorar
  // no desktop, 620px): a coordenada era empurrada de volta para dentro da
  // tela e caía sobre o próprio destaque.
  if (lado === 'baixo') top = Math.min(top, vh - alt - MARGEM);
  if (lado === 'cima') top = Math.max(top, MARGEM);
  if (lado === 'direita') left = Math.min(left, vw - larg - MARGEM);
  if (lado === 'esquerda') left = Math.max(left, MARGEM);

  cardElement.style.top = top + 'px';
  cardElement.style.left = left + 'px';

  // A seta aponta para o centro do alvo, presa à borda do balão voltada para
  // ele. Sem ela o balão é só uma caixa que apareceu perto de alguma coisa.
  const oposto = { baixo: 'cima', cima: 'baixo', direita: 'esquerda', esquerda: 'direita' };
  cardElement.classList.add('seta-' + oposto[lado]);
  if (lado === 'baixo' || lado === 'cima') {
    cardElement.style.setProperty('--seta', limitar(centroX - left, 18, larg - 18) + 'px');
  } else {
    cardElement.style.setProperty('--seta', limitar(centroY - top, 18, alt - 18) + 'px');
  }
  // Devolvido para mostrarPasso reobservar o alvo — ver o comentário lá.
  return elemento;
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
  observadorAlvo?.disconnect();
  observadorAlvo = null;

  overlayElement = null;
  cardElement = null;
  focoElement = null;
  ouvinteTeclado = null;
  ouvinteTamanho = null;
}
