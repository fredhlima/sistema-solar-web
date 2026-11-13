// Restaurar compra fora da tela de compra (Ajustes do dock e da barra desktop).
// A restauração automática ao abrir já existe em premium.js (billing.statusAtivo); este botão cobre o
// caso manual (nova conta/aparelho) e é obrigatório na App Store. Só existe com loja ou compra de teste:
// no showcase web (provider 'mock') tudo já está liberado e não há o que restaurar.
export function restauracaoDisponivel(premium) {
  return !!premium && typeof premium.restaurar === 'function' && premium.provider && premium.provider !== 'mock';
}

// Liga o botão e a linha de resultado. Estados: ocupado (botão desabilitado + "Processando…") e resultado
// (restaurado / nada a restaurar / erro), reaproveitando as chaves de texto do paywall.
export function ligarRestaurar({ premium, t, botao, rotulo, status }) {
  let ocupado = false;
  const mostrar = (chave) => { status.textContent = chave ? t(chave) : ''; status.hidden = !chave; };
  const pintar = () => { rotulo.textContent = ocupado ? t('paywallComprando') : t('paywallRestaurar'); botao.disabled = ocupado; botao.setAttribute('aria-busy', String(ocupado)); };
  status.setAttribute('role', 'status');
  status.hidden = true;
  pintar();
  botao.addEventListener('click', async () => {
    if (ocupado) return;
    ocupado = true; mostrar(null); pintar();
    let chave = 'paywallErro';
    try {
      const res = await premium.restaurar();
      chave = !res?.ok ? 'paywallErro' : res.restaurado ? 'paywallRestaurado' : 'paywallNadaRestaurar';
    } catch (e) {
      console.warn('Restauração não concluída:', e);
    }
    ocupado = false; pintar(); mostrar(chave);
  });
  return { atualizar: pintar };
}
