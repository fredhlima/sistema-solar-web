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

class PlayBillingProvider {
  // Stub: documentação para integração futura com RevenueCat
  // Produto: 'explorador_pro'
  // Plugin: @revenuecat/purchases-capacitor
  // Para trocar para produção: criar classe real neste arquivo
  async comprar() {
    throw new Error('PlayBillingProvider não implementado; use mock para desenvolvimento');
  }
  async restaurar() {
    throw new Error('PlayBillingProvider não implementado; use mock para desenvolvimento');
  }
}

const PROVIDER = 'mock';

// v1.0 (teste fechado da Play Store, 08/08/2026): NÃO existe compra dentro do
// app. Enquanto o Play Billing real não está integrado, seria desonesto — e
// risco de reprovação — anunciar um Pro que não cobra nada (o PROVIDER acima
// ainda é 'mock', que gera transação falsa).
//
// Com este interruptor ligado, todo o conteúdo fica liberado e o paywall se
// torna inalcançável: `exigir()` e `exigirItem()` são os ÚNICOS pontos que o
// abrem (paywall.js:183 registra a função por `definirPaywall`), e ambos
// passam a retornar true. Os selos "PRO" também somem sozinhos, porque quiz,
// você-no-espaço, eventos e badges derivam a marcação do mesmo estado.
//
// Para reativar o freemium: ponha `false` aqui E integre o billing real
// (trocar PROVIDER, ver android/RELEASE.md e o HANDOFF de 08/08).
const TUDO_LIBERADO = true;

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
