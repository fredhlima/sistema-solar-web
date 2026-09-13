// Premium: modelo freemium com persistência em localStorage (com fallback em memória para node)
export const RECURSOS_PREMIUM = ['missoes', 'eventos', 'quiz', 'voce-no-espaco', 'estacoes-mares'];

// "Provinha": itens liberados no free dentro de recursos premium — o usuário
// prova o sabor (Apollo 11, pacote de quiz dos planetas, peso na Terra/Lua)
// e o paywall vende o resto
export const ITENS_GRATIS = {
  missoes: ['apollo-11'],
  eventos: [],
  quiz: ['planetas'],
  'voce-no-espaco': ['terra', 'lua'],
  // Decisão do Fred (06/09/2026): Estações e Marés são os dois pagos. Antes
  // Estações entrava como "provinha" grátis; agora a provinha do pacote fica
  // por conta do quiz de Planetas e da Apollo 11.
  'estacoes-mares': [],
};

const CHAVE_STORAGE = 'sistema-solar-premium';

// ID da entitlement configurada no RevenueCat (dashboard) — todo pacote que
// libera o Pro precisa conceder esta entitlement. Já existia no dashboard
// (criada em sessão anterior, 10/09/2026) como "Solar System Pro"; NÃO é
// 'pro' — confirmado lendo Product catalog > Entitlements no RevenueCat.
const ENTITLEMENT_PRO = 'solar_system_pro';

// Key de API PÚBLICA de produção do app "Solar System (Play Store)" no
// RevenueCat (Project settings > Apps > Solar System (Play Store) > Public
// API Key). O app já está ligado ao Play Console via service account
// (revenuecat-service-account@sistema-solar-revenuecat.iam.gserviceaccount.com,
// 13/09/2026) — ver HANDOFF para os detalhes da conexão.
const REVENUECAT_API_KEY = 'goog_XvBJbvyapdFIyKzJZXrqnHYVgai';

// Acessa o plugin nativo do RevenueCat direto do bridge do Capacitor.
// Não importamos o pacote NPM @revenuecat/purchases-capacitor: seu build
// ESM (dist/esm/index.js) usa `export * from './definitions'` e
// `import('./web')` sem extensão `.js`, sintaxe válida só sob bundler — falha
// tanto em Node puro quanto em resolução ESM nativa de navegador (confirmado
// com `node -e "import('@revenuecat/purchases-capacitor')"` →
// "Cannot find module '.../dist/esm/definitions'"). O bridge nativo do
// Capacitor já registra o plugin em window.Capacitor.Plugins.Purchases
// independente de qualquer import JS, então acessamos direto — sem bundler,
// sem vendoring do pacote (nem da dependência transitiva
// @revenuecat/purchases-typescript-internal-esm).
function obterPurchasesPlugin() {
  return (typeof window !== 'undefined' && window.Capacitor?.Plugins?.Purchases) || null;
}

function estaNoAppNativo() {
  return typeof window !== 'undefined' && Boolean(window.Capacitor?.isNativePlatform?.());
}

class PlayBillingProvider {
  // Integração real com Play Billing via RevenueCat.
  // Produto: 'explorador_pro' — Entitlement: 'pro'
  constructor() {
    this._configurando = null;
  }

  async _garantirConfigurado() {
    const plugin = obterPurchasesPlugin();
    if (!plugin) {
      throw new Error('Plugin de compras não disponível (fora do app Android nativo)');
    }
    if (!this._configurando) {
      this._configurando = plugin.configure({ apiKey: REVENUECAT_API_KEY });
    }
    await this._configurando;
    return plugin;
  }

  _proAtivo(customerInfo) {
    return Boolean(customerInfo?.entitlements?.active?.[ENTITLEMENT_PRO]);
  }

  async statusAtivo() {
    const plugin = await this._garantirConfigurado();
    const { customerInfo } = await plugin.getCustomerInfo();
    return this._proAtivo(customerInfo);
  }

  async comprar() {
    const plugin = await this._garantirConfigurado();
    const { current } = await plugin.getOfferings();
    const pacote = current?.availablePackages?.[0];
    if (!pacote) {
      throw new Error('Nenhum pacote disponível nas ofertas do RevenueCat');
    }
    const { customerInfo } = await plugin.purchasePackage({ aPackage: pacote });
    return this._proAtivo(customerInfo);
  }

  async restaurar() {
    const plugin = await this._garantirConfigurado();
    const { customerInfo } = await plugin.restorePurchases();
    return this._proAtivo(customerInfo);
  }
}

const NATIVO = estaNoAppNativo();
const PROVIDER = NATIVO ? 'revenuecat' : 'mock';

// v1.0 (teste fechado da Play Store, 08/08/2026): fora do app Android nativo
// (showcase web, testes em node), NÃO existe compra real possível — manter
// tudo liberado ali evita anunciar um Pro que não pode ser cobrado.
//
// Dentro do app Android nativo, o billing real (RevenueCat/Play Billing,
// classe PlayBillingProvider acima) está integrado — o freemium volta a
// valer: `exigir()` e `exigirItem()` (paywall.js:183 registra a função por
// `definirPaywall`) passam a poder retornar false e abrir o paywall de
// verdade.
const TUDO_LIBERADO = !NATIVO;

export function criarPremium() {
  let estado = { ativo: false, transacaoId: null, data: null };
  const listeners = new Set();

  // Tenta ler do localStorage; fallback memória se indisponível (node, modo seguro)
  function lerStorage() {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE);
      if (salvo) {
        const parsed = JSON.parse(salvo);
        if (parsed && typeof parsed === 'object') {
          estado = parsed;
        }
      }
    } catch (e) {
      // localStorage indisponível ou inválido; mantém estado memória
    }
  }

  function salvarStorage() {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado));
    } catch (e) {
      // localStorage indisponível; estado continua apenas em memória
    }
  }

  function notificarListeners() {
    listeners.forEach(fn => {
      try {
        fn(estado.ativo);
      } catch (e) {
        console.error('Erro no listener aoMudar:', e);
      }
    });
  }

  // Carrega estado inicial
  lerStorage();

  // Fora do app nativo (showcase web, node) não existe billing real — o
  // provider fica null e comprar()/restaurar() usam o mock abaixo, como
  // sempre fizeram (TUDO_LIBERADO já libera tudo nesse caso, então esses
  // métodos só são chamados a partir de testes/depuração).
  const billing = PROVIDER === 'revenuecat' ? new PlayBillingProvider() : null;

  if (billing) {
    // Reconcilia com o status real da conta Play Store em segundo plano —
    // RevenueCat associa a compra ao usuário do Play Store automaticamente,
    // então quem já é Pro (reinstalou o app, limpou dados) não deveria
    // precisar clicar em "Restaurar compra" pra recuperar o acesso.
    billing.statusAtivo().then((proAtivo) => {
      if (proAtivo && estado.ativo !== true) {
        estado.ativo = true;
        estado.transacaoId = estado.transacaoId || `revenuecat-${Date.now()}`;
        estado.data = estado.data || new Date().toISOString();
        salvarStorage();
        notificarListeners();
      }
    }).catch((e) => {
      console.error('Falha ao verificar status do Play Billing:', e);
    });
  }

  return {
    get ativo() {
      if (TUDO_LIBERADO) return true;
      return estado.ativo === true;
    },

    recurso(id) {
      // true se id NÃO é premium, OU se premium está ativo
      if (TUDO_LIBERADO) return true;
      if (!RECURSOS_PREMIUM.includes(id)) {
        return true;
      }
      return estado.ativo === true;
    },

    exigir(id) {
      // true se recurso(id), senão abre paywall e retorna false
      if (this.recurso(id)) {
        return true;
      }
      // Abre paywall se fnAbrir foi registrada
      if (this._fnAbrir) {
        this._fnAbrir(id);
      }
      return false;
    },

    // Item específico dentro de um recurso premium (provinha):
    // liberado se o recurso todo está acessível OU o item está na lista grátis
    permitido(recursoId, itemId) {
      if (TUDO_LIBERADO) return true;
      if (this.recurso(recursoId)) return true;
      return (ITENS_GRATIS[recursoId] || []).includes(itemId);
    },

    exigirItem(recursoId, itemId) {
      if (this.permitido(recursoId, itemId)) return true;
      if (this._fnAbrir) {
        this._fnAbrir(recursoId);
      }
      return false;
    },

    async comprar() {
      if (billing) {
        // Play Billing real via RevenueCat: purchasePackage() já resolve
        // (ou rejeita, se o usuário cancelar/falhar) — sem timeout artificial.
        const proAtivo = await billing.comprar();
        estado.ativo = proAtivo;
        estado.transacaoId = proAtivo ? `revenuecat-${Date.now()}` : null;
        estado.data = proAtivo ? new Date().toISOString() : null;
        salvarStorage();
        notificarListeners();
        return { ok: proAtivo, transacaoId: estado.transacaoId };
      }
      // Mock: aguarda ~900ms, gera transacaoId
      return new Promise((resolve) => {
        setTimeout(() => {
          estado.ativo = true;
          estado.transacaoId = `mock-${Date.now()}`;
          estado.data = new Date().toISOString();
          salvarStorage();
          notificarListeners();
          resolve({ ok: true, transacaoId: estado.transacaoId });
        }, 900);
      });
    },

    async restaurar() {
      if (billing) {
        const proAtivo = await billing.restaurar();
        estado.ativo = proAtivo;
        estado.transacaoId = proAtivo ? (estado.transacaoId || `revenuecat-${Date.now()}`) : null;
        estado.data = proAtivo ? (estado.data || new Date().toISOString()) : null;
        salvarStorage();
        if (proAtivo) notificarListeners();
        return { ok: true, restaurado: proAtivo };
      }
      // Lê storage; se ativo, notifica e retorna {ok, restaurado: true}.
      // Comparação estrita (=== true), igual a `ativo`/`recurso()` acima —
      // um storage corrompido/parcial (ex.: {ativo:"true"} como string) não
      // deve reportar restauração bem-sucedida enquanto os outros métodos
      // continuam tratando o mesmo estado como inativo.
      lerStorage();
      if (estado.ativo === true) {
        notificarListeners();
        return { ok: true, restaurado: true };
      }
      return { ok: true, restaurado: false };
    },

    aoMudar(fn) {
      // Registra listener chamado após compra/restauração
      if (typeof fn === 'function') {
        listeners.add(fn);
      }
    },

    definirPaywall(fnAbrir) {
      // Paywall registra sua função de abertura
      this._fnAbrir = fnAbrir;
    },

    limpar() {
      // Apaga estado premium (testes)
      estado = { ativo: false, transacaoId: null, data: null };
      try {
        localStorage.removeItem(CHAVE_STORAGE);
      } catch (e) {
        // sem-op se localStorage indisponível
      }
      notificarListeners();
    },

    provider: PROVIDER
  };
}
