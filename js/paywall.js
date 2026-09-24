// Paywall: overlay com UI de compra mockada
// Exporta iniciarPaywall({ premium, t })

export function iniciarPaywall({ premium, t }) {
  if (typeof document === 'undefined') {
    // Em node (testes): lança erro apenas se chamado, não no import
    return {
      abrir: () => { throw new Error('Paywall: document não disponível em ambiente node'); }
    };
  }

  const root = document.getElementById('ui-root');
  if (!root) return {};

  // Cria DOM
  const overlay = document.createElement('div');
  overlay.className = 'paywall-overlay';
  overlay.innerHTML = `
    <div class="paywall-card">
      <button class="paywall-fechar botao-fechar-overlay" aria-label="${t('voltar')}"><span class="fechar-icone">✕</span><span class="fechar-texto">‹ ${t('voltar')}</span></button>
      <div class="paywall-badge">${t('proBadge')}</div>
      <h2 class="paywall-titulo">${t('paywallTitulo')}</h2>
      <p class="paywall-subtitulo">${t('paywallSubtitulo')}</p>
      <p class="paywall-contexto" hidden></p>

      <p class="paywall-reciprocidade">${t('paywallReciprocidade')}</p>

      <ul class="paywall-beneficios">
        <li>${t('paywallBeneficio1')}</li>
        <li>${t('paywallBeneficio2')}</li>
        <li>${t('paywallBeneficio3')}</li>
        <li>${t('paywallBeneficio4')}</li>
        <li>${t('paywallBeneficio5')}</li>
      </ul>

      <div class="paywall-preco">${t('paywallPreco')}</div>
      <div class="paywall-ancora">${t('paywallAncora')}</div>

      <p class="paywall-perda">${t('paywallPerda')}</p>

      <button id="paywall-comprar" class="paywall-comprar">${t('paywallComprar')}</button>
      <button id="paywall-restaurar" class="paywall-restaurar">${t('paywallRestaurar')}</button>

      ${premium?.provider === 'revenuecat' ? '' : `<div class="paywall-rodape">${t('paywallLegal')}</div>`}
    </div>
  `;
  root.appendChild(overlay);
  // Estado inicial explícito: a guarda do Esc lê o style inline, que sem
  // isto nasce '' e faria o paywall "parecer aberto" antes do primeiro uso
  overlay.style.display = 'none';

  const btnComprar = document.getElementById('paywall-comprar');
  const btnRestaurar = document.getElementById('paywall-restaurar');
  const btnFechar = overlay.querySelector('.paywall-fechar');
  const card = overlay.querySelector('.paywall-card');

  let estado = 'repouso'; // repouso | comprando | sucesso | erro | restaurando

  function atualizarUI() {
    const mensagem = card.querySelector('.paywall-mensagem');
    if (mensagem) mensagem.remove();

    if (estado === 'comprando') {
      btnComprar.disabled = true;
      btnComprar.textContent = t('paywallComprando');
    } else if (estado === 'sucesso') {
      btnComprar.disabled = true;
      btnComprar.textContent = t('paywallSucesso');
      btnComprar.style.color = '#7dde9a'; // Verde
    } else if (estado === 'erro') {
      btnComprar.disabled = false;
      btnComprar.textContent = t('paywallComprar');
      const msg = document.createElement('div');
      msg.className = 'paywall-mensagem paywall-erro';
      msg.textContent = t('paywallErro');
      card.insertBefore(msg, card.querySelector('.paywall-rodape'));
    } else if (estado === 'restaurando') {
      btnRestaurar.disabled = true;
      btnRestaurar.textContent = t('paywallComprando');
    } else if (estado === 'restaurado') {
      btnRestaurar.disabled = true;
      btnRestaurar.textContent = t('paywallRestaurado');
      btnRestaurar.style.color = '#7dde9a';
    } else if (estado === 'nadaRestaurar') {
      btnRestaurar.disabled = true;
      btnRestaurar.textContent = t('paywallNadaRestaurar');
    } else {
      // repouso
      btnComprar.disabled = false;
      btnComprar.textContent = t('paywallComprar');
      btnRestaurar.disabled = false;
      btnRestaurar.textContent = t('paywallRestaurar');
      // Limpa os inline dos estados de sucesso e devolve as cores ao CSS
      // (inline '#e8edf7' deixava o CTA ilegível sobre o fundo ciano)
      btnComprar.style.color = '';
      btnRestaurar.style.color = '';
    }
  }

  let timerFechar = null;

  function fechar() {
    clearTimeout(timerFechar);
    timerFechar = null;
    overlay.style.display = 'none';
    estado = 'repouso';
    atualizarUI();
  }

  btnComprar.addEventListener('click', async () => {
    if (estado !== 'repouso') return;
    estado = 'comprando';
    atualizarUI();

    try {
      const res = await premium.comprar();
      if (res.ok) {
        estado = 'sucesso';
        atualizarUI();
        timerFechar = setTimeout(() => fechar(), 1400);
      } else {
        estado = 'erro';
        atualizarUI();
      }
    } catch (e) {
      console.error('Erro ao comprar:', e);
      estado = 'erro';
      atualizarUI();
    }
  });

  btnRestaurar.addEventListener('click', async () => {
    if (estado !== 'repouso') return;
    estado = 'restaurando';
    atualizarUI();

    try {
      const res = await premium.restaurar();
      if (res.ok) {
        if (res.restaurado) {
          estado = 'restaurado';
        } else {
          estado = 'nadaRestaurar';
        }
        atualizarUI();
        timerFechar = setTimeout(() => fechar(), 1400);
      } else {
        estado = 'erro';
        atualizarUI();
      }
    } catch (e) {
      console.error('Erro ao restaurar:', e);
      estado = 'erro';
      atualizarUI();
    }
  });

  btnFechar.addEventListener('click', fechar);

  // Fechar ao clicar fora do card (no overlay)
  overlay.addEventListener('click', (evt) => {
    if (evt.target === overlay) fechar();
  });

  // Fechar com Esc — listener permanente com guarda de visibilidade; o
  // stopImmediatePropagation impede os handlers de Esc da UI de fecharem
  // outros painéis no mesmo toque enquanto o paywall está aberto
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && overlay.style.display === 'flex') {
      evt.stopImmediatePropagation();
      fechar();
    }
  }, { capture: true });

  const liBeneficios = Array.from(overlay.querySelectorAll('.paywall-beneficios li'));

  // Mapeamento recurso → índice do benefício correspondente (0-based)
  const RECURSO_BENEFICIO = {
    'quiz': 0,
    'missoes': 1,
    'eventos': 2,
    'voce-no-espaco': 3,
    'estacoes-mares': 4
  };

  // Função abrir
  async function abrir(idRecurso) {
    clearTimeout(timerFechar);
    timerFechar = null;
    overlay.style.display = 'flex';
    estado = 'repouso';

    // Atualiza contexto: se existe chave paywallContexto_<idRecurso>, mostra;
    // senão esconde. Converte hífens em underscores para acessar chave de tradução.
    const pContexto = overlay.querySelector('.paywall-contexto');
    if (idRecurso) {
      const chaveContexto = 'paywallContexto_' + idRecurso.replace(/-/g, '_');
      const textoContexto = t(chaveContexto);
      // Trata como ausente se voltar a própria chave ou vazio
      if (textoContexto && textoContexto !== chaveContexto) {
        pContexto.textContent = textoContexto;
        pContexto.hidden = false;
      } else {
        pContexto.hidden = true;
      }
    } else {
      pContexto.hidden = true;
    }

    // Reordena benefícios: o correspondente ao idRecurso vai pro topo com
    // destaque, os demais sem destaque em ordem original
    // Parte sempre da ordem ORIGINAL (liBeneficios, guardada na criação):
    // indexar pela ordem atual do DOM erraria o item a partir da 2ª abertura,
    // porque a abertura anterior já moveu um <li> para o topo.
    const ulBeneficios = overlay.querySelector('.paywall-beneficios');
    if (ulBeneficios) {
      liBeneficios.forEach(li => ulBeneficios.appendChild(li));
      // Sempre remove classe de destaque de todos
      Array.from(ulBeneficios.querySelectorAll('li')).forEach(li => {
        li.classList.remove('paywall-beneficio-destaque');
      });

      // Se há idRecurso válido, move o benefício correspondente pro topo
      if (idRecurso && RECURSO_BENEFICIO.hasOwnProperty(idRecurso)) {
        const indiceDestaque = RECURSO_BENEFICIO[idRecurso];
        const lis = liBeneficios;

        if (indiceDestaque < lis.length) {
          const liDestaque = lis[indiceDestaque];
          liDestaque.classList.add('paywall-beneficio-destaque');
          // Move pro início usando firstChild
          ulBeneficios.insertBefore(liDestaque, ulBeneficios.firstChild);
        }
      }
    }

    // Atualiza preço
    const divPreco = overlay.querySelector('.paywall-preco');
    if (premium.provider === 'revenuecat') {
      // Mostra placeholder enquanto carrega
      divPreco.textContent = t('paywallPrecoSemValor');
      try {
        const preco = await premium.precoLocal();
        if (preco) {
          const textoPreco = t('paywallPrecoLoja').replace('{preco}', preco);
          divPreco.textContent = textoPreco;
        }
      } catch (e) {
        console.error('Erro ao carregar preço local:', e);
        // Mantém o placeholder se falhar
      }
    } else {
      // Mock/navegador: mantém o texto padrão
      divPreco.textContent = t('paywallPreco');
    }

    atualizarUI();
  }

  // Registra função de abertura no premium
  premium.definirPaywall(abrir);

  return { abrir, fechar };
}
