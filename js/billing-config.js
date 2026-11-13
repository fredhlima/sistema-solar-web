// Desativado no fonte. O empacotamento Debug opt-in pode gerar true em www/.
// Também exige o sinal nativo compilado sob #if DEBUG; Release nunca o injeta.
export const IOS_COMPRAS_TESTE = false;

// Somente chaves PÚBLICAS do SDK. Nunca coloque chaves secretas ou arquivos .p8 aqui.
// O build injeta REVENUECAT_IOS_API_KEY em www/; vazio mantém compras iOS indisponíveis.
export const REVENUECAT_API_KEYS = Object.freeze({
  android: 'goog_XvBJbvyapdFIyKzJZXrqnHYVgai',
  ios: '',
});

export function obterChaveRevenueCat(plataforma) {
  const chave = REVENUECAT_API_KEYS[plataforma];
  const prefixo = { android: 'goog_', ios: 'appl_' }[plataforma];
  if (!prefixo || !chave?.startsWith(prefixo)) {
    throw new Error(`Compras não configuradas para ${plataforma || 'plataforma desconhecida'}`);
  }
  return chave;
}

// Preço de lançamento (decisão do dono, 12/11/2026): preencha com a data ISO 'AAAA-MM-DD' em que o preço sobe
// (último dia do preço de lançamento, no fuso local de quem usa o app). Enquanto for null, ou depois dessa data,
// o paywall não mostra rótulo nenhum. O app só exibe o rótulo "Preço de lançamento"; o valor vem sempre da loja
// e nunca aparece riscado ou escrito no código. O preço em si é agendado no App Store Connect e na Play Console.
export const PRECO_LANCAMENTO_ATE = null;

// true somente com data válida e hoje (data local) <= data. `hoje` e `ate` existem para teste.
export function precoDeLancamentoAtivo(hoje = new Date(), ate = PRECO_LANCAMENTO_ATE) {
  if (typeof ate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(ate)) return false;
  const pad = n => String(n).padStart(2, '0');
  const dataLocal = `${hoje.getFullYear()}-${pad(hoje.getMonth() + 1)}-${pad(hoje.getDate())}`;
  return dataLocal <= ate;
}
