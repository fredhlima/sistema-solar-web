// Licença assinada — validação 100% OFFLINE.
//
// Modelo decidido em 08/08/2026: a compra do consumidor final acontece por Play
// Billing dentro do app. Este módulo cobre o OUTRO canal — escolas, B2B e venda
// direta internacional — em que o pagamento ocorre no site (Pagar.me/Stripe) e
// o comprador recebe um token para colar no app.
//
// Por que token assinado e não conta de usuário: o público é criança. Login de
// menor aciona consentimento parental, LGPD para dados de menores e COPPA. Com
// token, o app continua sem coletar absolutamente nada e sem falar com servidor.
//
// Por que ECDSA P-256 e não Ed25519: o minSdk do app é 24 (Android 7) e o
// Capacitor usa a WebView do sistema. Ed25519 no WebCrypto só existe em
// WebViews recentes; P-256 é suportado universalmente há anos. A diferença de
// tamanho de assinatura é irrelevante aqui.
//
// O token NÃO é segredo e NÃO é criptografia: qualquer um consegue ler o
// conteúdo. O que a assinatura garante é que ninguém consegue FORJAR um. Contra
// compartilhamento a defesa é social (o e-mail do comprador fica gravado e
// visível no app), não técnica — checagem de assentos exigiria servidor, o que
// mataria o offline.

// Chave PÚBLICA de verificação (SPKI em base64). A privada NUNCA entra no app:
// vive só no Worker que emite as licenças.
// Trocar junto com a chave do servidor — ver scripts/licenca-cli.mjs.
export const CHAVE_PUBLICA_B64 = 'SUBSTITUIR_PELA_CHAVE_PUBLICA';

const b64urlParaBytes = (s) => {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=');
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

const bytesParaTexto = (b) => new TextDecoder().decode(b);

/**
 * Valida um token de licença offline.
 * @param {string} token  no formato `<payload-b64url>.<assinatura-b64url>`
 * @param {string} [chavePublicaB64]  sobrescreve a chave embutida (testes)
 * @returns {Promise<{valido: boolean, motivo?: string, dados?: object}>}
 */
export async function validarLicenca(token, chavePublicaB64 = CHAVE_PUBLICA_B64) {
  if (typeof token !== 'string' || !token.includes('.')) {
    return { valido: false, motivo: 'formato' };
  }
  const [payloadB64, assinaturaB64] = token.trim().split('.');
  if (!payloadB64 || !assinaturaB64) return { valido: false, motivo: 'formato' };

  let dados;
  try {
    dados = JSON.parse(bytesParaTexto(b64urlParaBytes(payloadB64)));
  } catch {
    return { valido: false, motivo: 'payload-ilegivel' };
  }

  let ok;
  try {
    const chave = await crypto.subtle.importKey(
      'spki',
      b64urlParaBytes(chavePublicaB64.replace(/-/g, '+').replace(/_/g, '/')),
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify'],
    );
    // Assina-se o payload em base64url TAL COMO VIAJA, não o JSON reserializado:
    // reserializar muda a ordem das chaves e quebra a assinatura.
    ok = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      chave,
      b64urlParaBytes(assinaturaB64),
      new TextEncoder().encode(payloadB64),
    );
  } catch (e) {
    return { valido: false, motivo: 'erro-cripto' };
  }

  if (!ok) return { valido: false, motivo: 'assinatura' };

  // Validade opcional (licença de escola pode ser anual). Sem `exp`, é perpétua.
  if (dados.exp) {
    const venc = Date.parse(dados.exp);
    if (Number.isFinite(venc) && Date.now() > venc) {
      return { valido: false, motivo: 'expirada', dados };
    }
  }

  if (dados.p !== 'pro') return { valido: false, motivo: 'produto-desconhecido', dados };

  return { valido: true, dados };
}

/** Texto de atribuição exibido no app — dissuasor social de compartilhamento. */
export function descricaoLicenca(dados) {
  if (!dados) return '';
  const quem = dados.e || '';
  const assentos = dados.n && dados.n > 1 ? ` · ${dados.n} licenças` : '';
  return quem ? `Licença de ${quem}${assentos}` : `Licença ativa${assentos}`;
}
