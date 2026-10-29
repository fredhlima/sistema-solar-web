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
