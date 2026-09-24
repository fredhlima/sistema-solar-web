// Pedido de avaliação na Play Store (In-App Review API do Google)
// Exporta criarAvaliacao()
//
// Revisão Q5 (24/09/2026): o app não pedia avaliação nenhuma. Regras do Google
// (developer.android.com/guide/playcore/in-app-review): chamar só depois de um
// momento positivo, sem perguntar nada antes ("gostou do app?") e sem botão
// "avaliar" — o próprio Google limita quantas vezes o cartão aparece e pode
// não mostrar nada, sem avisar. Por isso aqui não há retorno para a interface.
//
// Quando pedimos: numa conquista ou subida de nível (quem chama é o
// progresso), só a partir do 2º dia de uso, no máximo uma vez por sessão e
// com 90 dias de intervalo. Fora do app nativo (showcase web) não faz nada.

const CHAVE = 'sistema-solar-avaliacao';
const DIAS_MINIMOS_DE_USO = 2;
const INTERVALO_MS = 90 * 24 * 60 * 60 * 1000;
// espera o toast de conquista aparecer antes do cartão do Google
const ATRASO_MS = 2500;

function obterPlugin() {
  if (typeof window === 'undefined') return null;
  if (!window.Capacitor?.isNativePlatform?.()) return null;
  return window.Capacitor?.Plugins?.InAppReview || null;
}

function ler() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && Array.isArray(salvo.dias)) return salvo;
  } catch (e) {
    // localStorage indisponível ou inválido: recomeça a contagem
  }
  return { dias: [], ultimoPedido: 0 };
}

function salvar(estado) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch (e) {
    // sem localStorage a contagem de dias nunca passa de 1: nunca pede
  }
}

export function criarAvaliacao({ agora = () => Date.now() } = {}) {
  const estado = ler();
  // Registra o dia de hoje (data local, AAAA-MM-DD); guarda só os 10 últimos
  const d = new Date(agora());
  const hoje = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (!estado.dias.includes(hoje)) {
    estado.dias = [...estado.dias, hoje].slice(-10);
    salvar(estado);
  }
  let pedidoNestaSessao = false;

  function podePedir() {
    return !pedidoNestaSessao
      && estado.dias.length >= DIAS_MINIMOS_DE_USO
      && agora() - (estado.ultimoPedido || 0) >= INTERVALO_MS;
  }

  // Chamada num momento positivo. Devolve true se o pedido foi disparado.
  function pedirSeOportuno() {
    const plugin = obterPlugin();
    if (!plugin || !podePedir()) return false;
    pedidoNestaSessao = true;
    estado.ultimoPedido = agora();
    salvar(estado);
    setTimeout(() => {
      Promise.resolve()
        .then(() => plugin.requestReview())
        .catch((e) => console.warn('Pedido de avaliação falhou:', e));
    }, ATRASO_MS);
    return true;
  }

  return { pedirSeOportuno, podePedir };
}
