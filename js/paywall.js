import { NAVES_1_0, ROTEIROS_1_0 } from './release-scope.js?v=314';
import { ROTEIROS } from './aprendizado-conteudo.js?v=314';
import { ITENS_GRATIS } from './premium.js?v=306';
import { MISSOES } from './missoes.js?v=13';
import { QUIZ_PACOTES } from './quiz-dados.js?v=9';
import { precoDeLancamentoAtivo, dataLancamentoEfetiva } from './billing-config.js?v=4';
import { getIdioma } from './i18n.js?v=317';

const AVISO_TESTE = {
  pt: 'Compra simulada de teste: libera o Pro neste aparelho, sem cobrança.',
  en: 'Simulated test purchase: unlocks Pro on this device, with no charge.',
  es: 'Compra simulada de prueba: activa Pro en este dispositivo, sin cobro.',
};
// IDs conhecidos; nomes e textos são localizados. Nenhum texto recebido do iframe é renderizado.
const NAVES_COMPLETAS = NAVES_1_0;
const NAVES_PREVIAS = [];
// Benefícios da 1.0 (máx. 5). Os números vêm dos dados, não de texto escrito à mão:
// capítulos Pro de ROTEIROS_1_0, missões Pro (todas menos as grátis) e pacotes de quiz.
const CAPITULOS_PRO = ROTEIROS_1_0.filter(id => ROTEIROS[id]?.pro === true).length;
const MISSOES_PRO = MISSOES.length - (ITENS_GRATIS.missoes || []).length;
const BENEFICIOS = [
  { key: 'paywallBen_capitulos', params: { n: CAPITULOS_PRO } },
  { key: 'paywallBen_modos3d' },
  { key: 'paywallBen_naves' },
  { key: 'paywallBen_missoes', params: { m: MISSOES_PRO, q: QUIZ_PACOTES.length } },
  { key: 'paywallBen_extras' },
];
// Qual benefício aparece destacado (e primeiro) conforme o recurso que abriu o paywall.
const RECURSO_BENEFICIO = { aprendizado: 0, 'estacoes-mares': 1, hangar: 2, missoes: 3, quiz: 3, eventos: 4, 'voce-no-espaco': 4 };
// Contextos aceitos pelo paywall são IDs internos; nenhum texto vindo do roteiro é renderizado.
const CONTEXTOS_ROTEIRO = {
  'terra-ano': 'paywallContextoRoteiro_terra_ano',
  'mares-oceano': 'paywallContextoRoteiro_mares_oceano',
};

export function iniciarPaywall({ premium, t }) {
  if (typeof document === 'undefined') return { abrir: () => { throw new Error('Paywall: document não disponível em ambiente node'); } };
  const root = document.body;
  if (!root) return {};
  const testeIOS = premium?.provider === 'teste-ios';
  const loja = premium?.provider === 'revenuecat';
  const overlay = document.createElement('div');
  overlay.className = 'paywall-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <section class="paywall-card" role="dialog" aria-modal="true" aria-labelledby="paywall-titulo" tabindex="-1">
      <header class="paywall-cabecalho">
        <button class="paywall-fechar botao-fechar-overlay" aria-label="${t('paywallFechar')}">‹ ${t('paywallFechar')}</button>
        <span class="paywall-badge">${t('proBadge')}</span>
      </header>
      <div class="paywall-conteudo">
        <div class="paywall-apresentacao">
          <h2 id="paywall-titulo" class="paywall-titulo">${t('paywallTitulo')}</h2>
          <p class="paywall-subtitulo">${t('paywallSubtitulo')}</p>
          <p class="paywall-contexto" hidden></p>
          <p class="paywall-reciprocidade">${t('paywallReciprocidade')}</p>
        </div>
        <ul class="paywall-beneficios">${BENEFICIOS.map(({ key, params }) => `<li>${t(key, params)}</li>`).join('')}</ul>
      </div>
      <footer class="paywall-decisao">
        <div class="paywall-preco" aria-live="polite"></div>
        <div class="paywall-lancamento" hidden>${t('paywallLancamento')}</div>
        <div class="paywall-ancora" ${testeIOS ? 'hidden' : ''}>${t('paywallAncora')}</div>
        <button class="paywall-preco-repetir" hidden>${t('paywallPrecoRepetir')}</button>
        <div class="paywall-mensagem" role="status" hidden></div>
        <div class="paywall-acoes">
          <button id="paywall-comprar" class="paywall-comprar"></button>
          <button id="paywall-restaurar" class="paywall-restaurar">${t('paywallRestaurar')}</button>
        </div>
        ${loja || testeIOS ? '' : `<div class="paywall-rodape">${t('paywallLegal')}</div>`}
      </footer>
    </section>`;
  root.appendChild(overlay);
  const card = overlay.querySelector('.paywall-card');
  const btnComprar = overlay.querySelector('#paywall-comprar');
  const btnRestaurar = overlay.querySelector('#paywall-restaurar');
  const btnFechar = overlay.querySelector('.paywall-fechar');
  const btnPreco = overlay.querySelector('.paywall-preco-repetir');
  const mensagem = overlay.querySelector('.paywall-mensagem');
  const divPreco = overlay.querySelector('.paywall-preco');
  const divLancamento = overlay.querySelector('.paywall-lancamento');
  const liBeneficios = Array.from(overlay.querySelectorAll('.paywall-beneficios li'));
  let estado = 'repouso', preco = null, precoCarregando = false, sessao = 0, timerFechar = null, focoAnterior = null, ofertaProativa = false;
  const aberto = () => overlay.style.display === 'flex';
  const ocupado = () => estado === 'comprando' || estado === 'restaurando';
  const avisoTeste = () => AVISO_TESTE[getIdioma()] || AVISO_TESTE.pt;

  function atualizarUI() {
    const concluido = estado === 'sucesso' || estado === 'restaurado';
    btnComprar.disabled = ocupado() || concluido || (loja && !preco);
    btnRestaurar.disabled = ocupado() || concluido;
    btnPreco.disabled = ocupado() || precoCarregando;
    card.setAttribute('aria-busy', String(ocupado()));
    btnComprar.textContent = estado === 'comprando' ? t('paywallComprando')
      : estado === 'sucesso' ? t('paywallSucesso')
      : testeIOS ? t('paywallComprarTeste')
      : loja && preco ? t('paywallComprarPreco', { preco }) : t('paywallComprar');
    btnRestaurar.textContent = estado === 'restaurando' ? t('paywallComprando')
      : estado === 'restaurado' ? t('paywallRestaurado') : t('paywallRestaurar');
    const keys = { erro: 'paywallErro', cancelado: 'paywallCancelado', pendente: 'paywallPendente', nadaRestaurar: 'paywallNadaRestaurar' };
    mensagem.hidden = !keys[estado];
    mensagem.textContent = keys[estado] ? t(keys[estado]) : '';
    mensagem.classList.toggle('paywall-erro', estado === 'erro');
    btnPreco.hidden = !loja || precoCarregando || Boolean(preco);
    // Rótulo de lançamento: só com data futura (painel do RevenueCat ou build, ver billing-config.js);
    // nunca mostra valor antigo ou riscado.
    divLancamento.hidden = !precoDeLancamentoAtivo(new Date(), dataLancamentoEfetiva(premium.lancamentoAteRemoto?.()));
    divPreco.textContent = testeIOS ? avisoTeste()
      : loja ? precoCarregando ? t('paywallPrecoSemValor') : preco ? t('paywallPrecoLoja', { preco }) : t('paywallPrecoIndisponivel')
      : t('paywallPreco');
  }

  function fechar() {
    clearTimeout(timerFechar);
    timerFechar = null;
    sessao++; // Respostas antigas de preço/compra não podem modificar outra abertura.
    overlay.style.display = 'none';
    estado = 'repouso';
    // Fechar sem comprar uma oferta proativa a encerra pela sessão (premium.ofertaProativaPermitida).
    if (ofertaProativa && !premium.recurso('aprendizado')) {
      premium.registrarRecusaProativa?.();
      // Adiado: o painel do capítulo ainda está inert até a navegação reagir ao fechamento do paywall.
      setTimeout(() => document.dispatchEvent(new CustomEvent('sim:oferta-recusada')), 0);
    }
    ofertaProativa = false;
    focoAnterior?.focus?.();
    // O painel de baixo ainda está inert até a navegação reagir ao fechamento; se o foco não pegou, tenta de novo logo depois.
    const retorno = focoAnterior;
    if (retorno?.isConnected) setTimeout(() => { if (!aberto() && (overlay.contains(document.activeElement) || !document.activeElement || document.activeElement === document.body)) retorno.focus?.(); }, 0);
  }

  async function carregarPreco() {
    if (!loja || precoCarregando) return;
    const atual = sessao;
    precoCarregando = true;
    atualizarUI();
    let valor = null;
    try { valor = await premium.precoLocal(); }
    catch (e) { console.warn('Preço da loja indisponível:', e); }
    if (atual !== sessao || !aberto()) return;
    preco = typeof valor === 'string' && valor.trim() ? valor : null;
    precoCarregando = false;
    atualizarUI();
  }
  btnPreco.addEventListener('click', carregarPreco);

  async function executar(acao) {
    if (ocupado() || ['sucesso', 'restaurado'].includes(estado) || (acao === 'comprar' && loja && !preco)) return;
    const atual = sessao;
    estado = acao === 'comprar' ? 'comprando' : 'restaurando';
    atualizarUI();
    try {
      const res = await premium[acao]();
      if (atual !== sessao || !aberto()) return;
      estado = !res.ok ? 'erro' : acao === 'comprar' ? 'sucesso' : res.restaurado ? 'restaurado' : 'nadaRestaurar';
    } catch (e) {
      if (atual !== sessao || !aberto()) return;
      // Códigos do SDK RevenueCat instalado; cancelar não é uma falha de compra.
      const code = String(e?.code ?? '');
      estado = e?.userCancelled === true || code === '1' ? 'cancelado' : code === '20' ? 'pendente' : 'erro';
      if (estado === 'erro') console.warn('Compra/restauração não concluída:', e);
    }
    atualizarUI();
    if (estado === 'sucesso' || estado === 'restaurado') timerFechar = setTimeout(fechar, 1400);
  }
  btnComprar.addEventListener('click', () => executar('comprar'));
  btnRestaurar.addEventListener('click', () => executar('restaurar'));
  btnFechar.addEventListener('click', fechar);
  overlay.addEventListener('click', evt => { if (evt.target === overlay) fechar(); });
  document.addEventListener('keydown', evt => {
    if (!aberto()) return;
    if (evt.key === 'Escape') { evt.stopImmediatePropagation(); fechar(); }
    if (evt.key === 'Tab') {
      const alvos = [...card.querySelectorAll('button:not(:disabled)')].filter(el => !el.hidden);
      const primeiro = alvos[0], ultimo = alvos[alvos.length - 1];
      if (evt.shiftKey && (document.activeElement === primeiro || document.activeElement === card)) { evt.preventDefault(); ultimo?.focus(); }
      else if (!evt.shiftKey && (document.activeElement === ultimo || !card.contains(document.activeElement))) { evt.preventDefault(); primeiro?.focus(); }
    }
  }, { capture: true });

  function abrir(idRecurso, itemId, contextoEstruturado) {
    clearTimeout(timerFechar);
    timerFechar = null;
    if (!aberto()) focoAnterior = document.activeElement;
    sessao++;
    ofertaProativa = contextoEstruturado?.proativo === true;
    overlay.style.display = 'flex';
    estado = 'repouso';
    precoCarregando = false;
    const contexto = overlay.querySelector('.paywall-contexto');
    const titulo = overlay.querySelector('.paywall-titulo');
    titulo.textContent = t('paywallTitulo');
    const chave = typeof idRecurso === 'string' ? 'paywallContexto_' + idRecurso.replace(/-/g, '_') : '';
    const texto = chave ? t(chave) : '';
    contexto.textContent = texto && texto !== chave ? texto : '';
    if (idRecurso === 'aprendizado') {
      const roteiro = contextoEstruturado && typeof contextoEstruturado === 'object'
        ? contextoEstruturado.roteiro
        : null;
      const chaveRoteiro = Object.prototype.hasOwnProperty.call(CONTEXTOS_ROTEIRO, roteiro)
        ? CONTEXTOS_ROTEIRO[roteiro]
        : null;
      const chaveAprendizado = chaveRoteiro || 'paywallContexto_aprendizado';
      const textoAprendizado = t(chaveAprendizado);
      contexto.textContent = textoAprendizado !== chaveAprendizado ? textoAprendizado : '';
    }
    if (idRecurso === 'hangar' && [...NAVES_COMPLETAS, ...NAVES_PREVIAS].includes(itemId)) {
      const nave = t('paywallNave_' + itemId.replace(/-/g, '_'));
      titulo.textContent = nave;
      contexto.textContent = t(NAVES_COMPLETAS.includes(itemId) ? 'paywallNaveCompleta' : 'paywallNavePrevia', { nave });
    }
    // Amostra de capítulo Pro (Lote E): o contexto é o capítulo que a pessoa estava lendo.
    // Só o título localizado do próprio app entra no texto (via textContent), com limite de tamanho.
    if (contextoEstruturado?.amostra === true && typeof contextoEstruturado.titulo === 'string' && contextoEstruturado.titulo.length <= 120) {
      contexto.textContent = t('paywallContextoAmostra', { capitulo: contextoEstruturado.titulo });
    }
    contexto.hidden = !contexto.textContent;
    const ul = overlay.querySelector('.paywall-beneficios');
    liBeneficios.forEach(li => { li.classList.remove('paywall-beneficio-destaque'); ul.appendChild(li); });
    if (Object.prototype.hasOwnProperty.call(RECURSO_BENEFICIO, idRecurso)) {
      const li = liBeneficios[RECURSO_BENEFICIO[idRecurso]];
      li.classList.add('paywall-beneficio-destaque');
      ul.prepend(li);
    }
    // A tela responde imediatamente, sem esperar a rede para permitir a saída.
    atualizarUI();
    btnFechar.focus();
    if (loja) void carregarPreco();
  }
  premium.definirPaywall(abrir);
  return { abrir, fechar };
}
