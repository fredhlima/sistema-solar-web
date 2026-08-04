// Progressão: níveis + badges com XP
// Exporta iniciarProgresso({ dados })

import { getIdioma } from './i18n.js';
// só a lista de itens grátis: as badges derivam daqui se são alcançáveis sem Pro,
// em vez de repetir a regra de negócio (se ITENS_GRATIS mudar, o selo acompanha)
import { ITENS_GRATIS } from './premium.js';

// Textos localizados (pt/en/es)
const TEXTOS = {
  pt: {
    // Níveis
    nivel0: 'Iniciante',
    nivel1: 'Explorador do Céu',
    nivel2: 'Astronauta em Formação',
    nivel3: 'Astronauta',
    nivel4: 'Viajante Espacial',
    nivel5: 'Comandante da Frota',
    nivel6: 'Dominador do Sistema Solar',
    // Badges
    badgePrimeiroPasso: 'Primeiro Passo',
    badgePrimeiroPassoDesc: 'Focou no primeiro corpo',
    badgeLuaCheia: 'Lua Cheia',
    badgeLuaCheiaDesc: 'Visitou a Lua',
    badgeFamiliaCompleta: 'Família Completa',
    badgeFamiliaCompletaDesc: 'Visitou os 8 planetas',
    badgeColecionador: 'Colecionador',
    badgeColecionadorDesc: 'Visitou todos os corpos',
    badgeCacadorCometas: 'Caçador de Cometas',
    badgeCacadorCometasDesc: 'Encontrou Halley, Hale-Bopp e 67P',
    badgeAnelOuro: 'Anel de Ouro',
    badgeAnelOuroDesc: 'Conquistou primeira medalha ouro',
    badgeSabeTudo: 'Sabe Tudo',
    badgeSabeTudoDesc: 'Ouro em todos os pacotes',
    badgeExigePro: 'PRO',
    badgeExigeProDica: 'precisa do Explorador Pro',
    badgeMaratonista: 'Maratonista',
    badgeMaratonistaDesc: 'Completou o tour guiado',
    badgeViajanteTempo: 'Viajante do Tempo',
    badgeViajanteTempoDesc: 'Viajou para um evento histórico',
    badgeEngenheiroEspacial: 'Engenheiro Espacial',
    badgeEngenheiroEspacialDesc: '7 missões espaciais conhecidas',
    badgeOlhoNoCeu: 'Olho no Céu',
    badgeOlhoNoCeuDesc: 'Visitou o Hubble e o James Webb',
    // UI
    niveisSubiuNivel: 'Subiu de nível: {nivel}',
    niveisNovaConquista: 'Nova conquista: {badge}',
    paineisConquistasXpPercent: 'XP',
    paineisConquistasCorposVisitados: 'Corpos visitados',
    paineisConquistasPacotesOuro: 'Pacotes ouro',
    paineisConquistasMissoes: 'Missões vistas',
    fechaBotao: 'Fechar',
  },
  en: {
    // Níveis
    nivel0: 'Beginner',
    nivel1: 'Sky Explorer',
    nivel2: 'Astronaut in Training',
    nivel3: 'Astronaut',
    nivel4: 'Space Voyager',
    nivel5: 'Fleet Commander',
    nivel6: 'Master of the Solar System',
    // Badges
    badgePrimeiroPasso: 'First Step',
    badgePrimeiroPassoDesc: 'Focused on the first celestial body',
    badgeLuaCheia: 'Full Moon',
    badgeLuaCheiaDesc: 'Visited the Moon',
    badgeFamiliaCompleta: 'Complete Family',
    badgeFamiliaCompletaDesc: 'Visited all 8 planets',
    badgeColecionador: 'Collector',
    badgeColecionadorDesc: 'Visited every celestial body',
    badgeCacadorCometas: 'Comet Hunter',
    badgeCacadorCometasDesc: 'Found Halley, Hale-Bopp and 67P',
    badgeAnelOuro: 'Golden Ring',
    badgeAnelOuroDesc: 'Won first gold medal',
    badgeSabeTudo: 'Knows All',
    badgeSabeTudoDesc: 'Gold in every quiz pack',
    badgeExigePro: 'PRO',
    badgeExigeProDica: 'needs Explorer Pro',
    badgeMaratonista: 'Marathon Runner',
    badgeMaratonistaDesc: 'Completed the guided tour',
    badgeViajanteTempo: 'Time Traveler',
    badgeViajanteTempoDesc: 'Traveled to a historic event',
    badgeEngenheiroEspacial: 'Space Engineer',
    badgeEngenheiroEspacialDesc: '7 space missions discovered',
    badgeOlhoNoCeu: 'Eye on the Sky',
    badgeOlhoNoCeuDesc: 'Visited Hubble and James Webb',
    // UI
    niveisSubiuNivel: 'Leveled up: {nivel}',
    niveisNovaConquista: 'New achievement: {badge}',
    paineisConquistasXpPercent: 'XP',
    paineisConquistasCorposVisitados: 'Bodies visited',
    paineisConquistasPacotesOuro: 'Gold packs',
    paineisConquistasMissoes: 'Missions discovered',
    fechaBotao: 'Close',
  },
  es: {
    // Níveis
    nivel0: 'Principiante',
    nivel1: 'Explorador del Cielo',
    nivel2: 'Astronauta en Formación',
    nivel3: 'Astronauta',
    nivel4: 'Viajero Espacial',
    nivel5: 'Comandante de la Flota',
    nivel6: 'Dominador del Sistema Solar',
    // Badges
    badgePrimeiroPasso: 'Primer Paso',
    badgePrimeiroPassoDesc: 'Enfocó el primer cuerpo',
    badgeLuaCheia: 'Luna Llena',
    badgeLuaCheiaDesc: 'Visitó la Luna',
    badgeFamiliaCompleta: 'Familia Completa',
    badgeFamiliaCompletaDesc: 'Visitó los 8 planetas',
    badgeColecionador: 'Coleccionista',
    badgeColecionadorDesc: 'Visitó todos los cuerpos',
    badgeCacadorCometas: 'Cazador de Cometas',
    badgeCacadorCometasDesc: 'Encontró Halley, Hale-Bopp y 67P',
    badgeAnelOuro: 'Anillo de Oro',
    badgeAnelOuroDesc: 'Ganó primera medalla de oro',
    badgeSabeTudo: 'Lo Sabe Todo',
    badgeSabeTudoDesc: 'Oro en todos los paquetes',
    badgeExigePro: 'PRO',
    badgeExigeProDica: 'necesita Explorador Pro',
    badgeMaratonista: 'Maratonista',
    badgeMaratonistaDesc: 'Completó el tour guiado',
    badgeViajanteTempo: 'Viajero del Tiempo',
    badgeViajanteTempoDesc: 'Viajó a un evento histórico',
    badgeEngenheiroEspacial: 'Ingeniero Espacial',
    badgeEngenheiroEspacialDesc: '7 misiones espaciales conocidas',
    badgeOlhoNoCeu: 'Ojo en el Cielo',
    badgeOlhoNoCeuDesc: 'Visitó el Hubble y el James Webb',
    // UI
    niveisSubiuNivel: 'Subió de nivel: {nivel}',
    niveisNovaConquista: 'Nuevo logro: {badge}',
    paineisConquistasXpPercent: 'XP',
    paineisConquistasCorposVisitados: 'Cuerpos visitados',
    paineisConquistasPacotesOuro: 'Paquetes oro',
    paineisConquistasMissoes: 'Misiones descubiertas',
    fechaBotao: 'Cerrar',
  }
};

function tt(chave, params) {
  const idioma = getIdioma();
  const dic = TEXTOS[idioma] || TEXTOS.pt;
  let texto = dic[chave] !== undefined ? dic[chave] : chave;
  if (params && typeof texto === 'string') {
    for (const [k, v] of Object.entries(params)) {
      texto = texto.split('{' + k + '}').join(String(v));
    }
  }
  return texto;
}

// Configuração de níveis: XP necessário para atingir cada nível.
// Ícone sobe em "prestígio" junto com o nível (pegada -> binóculo -> capacete
// -> astronauta -> nave -> frota -> coroa de domínio do sistema solar).
const NIVEIS = [
  { xp: 0, nome: 'nivel0', icone: '◈' },
  { xp: 60, nome: 'nivel1', icone: '◔' },
  { xp: 150, nome: 'nivel2', icone: '⊕' },
  { xp: 300, nome: 'nivel3', icone: '☉' },
  { xp: 500, nome: 'nivel4', icone: '✦' },
  { xp: 750, nome: 'nivel5', icone: '⚚' },
  { xp: 1000, nome: 'nivel6', icone: '★' }
];

// Totais do jogo, preenchidos por iniciarProgresso a partir dos dados reais.
// Ficam no módulo porque as condições de badge abaixo são avaliadas fora do
// closure de iniciarProgresso. Os valores de reserva existem só para o caso de
// alguém chamar verificarBadges sem ter iniciado a UI (testes em node).
let totalPacotesQuiz = 6;
let totalMissoesJogo = 10;

// Quantas missões a badge "Engenheiro Espacial" pede. Constante para a condição
// e o teste de "exige Pro" nunca saírem de sincronia.
const MISSOES_PARA_ENGENHEIRO = 7;

// Configuração de badges
const BADGES = [
  {
    id: 'primeiro-passo',
    nome: 'badgePrimeiroPasso',
    desc: 'badgePrimeiroPassoDesc',
    icone: '◉',
    condicao: (estado) => estado.corposVisitados.length >= 1
  },
  {
    id: 'lua-cheia',
    nome: 'badgeLuaCheia',
    desc: 'badgeLuaCheiaDesc',
    icone: '◐',
    condicao: (estado) => estado.corposVisitados.includes('lua')
  },
  {
    id: 'familia-completa',
    nome: 'badgeFamiliaCompleta',
    desc: 'badgeFamiliaCompletaDesc',
    icone: '★',
    condicao: (estado, dados) => {
      const planetas = dados.corpos.filter(c => c.tipo === 'planeta');
      return planetas.every(p => estado.corposVisitados.includes(p.id));
    }
  },
  {
    id: 'colecionador',
    nome: 'badgeColecionador',
    desc: 'badgeColecionadorDesc',
    icone: '◆',
    condicao: (estado, dados) => estado.corposVisitados.length === dados.corpos.length
  },
  {
    id: 'cacador-de-cometas',
    nome: 'badgeCacadorCometas',
    desc: 'badgeCacadorCometasDesc',
    icone: '☄',
    condicao: (estado) => {
      const cometas = ['halley', 'hale-bopp', '67p'];
      return cometas.every(id => estado.corposVisitados.includes(id));
    }
  },
  {
    id: 'anel-de-ouro',
    nome: 'badgeAnelOuro',
    desc: 'badgeAnelOuroDesc',
    icone: '◎',
    condicao: (estado) => {
      for (const med of Object.values(estado.medalhasPorPacote)) {
        if (med === 'ouro') return true;
      }
      return false;
    }
  },
  {
    id: 'sabe-tudo',
    nome: 'badgeSabeTudo',
    desc: 'badgeSabeTudoDesc',
    icone: '◇',
    // "Todos os pacotes", derivado — antes era `>= 5` fixo, num jogo que já tem
    // 6 pacotes; a badge era conquistável faltando um pacote e o texto dizia
    // "todos os 5". Agora acompanha sozinha quando entrar um pacote novo.
    condicao: (estado) => {
      const ouroCount = Object.values(estado.medalhasPorPacote).filter(m => m === 'ouro').length;
      return ouroCount >= totalPacotesQuiz;
    },
    // exige ouro em TODOS os pacotes, mas nem todo pacote é grátis
    exigePro: () => (ITENS_GRATIS.quiz || []).length < totalPacotesQuiz
  },
  {
    id: 'maratonista',
    nome: 'badgeMaratonista',
    desc: 'badgeMaratonistaDesc',
    icone: '⊙',
    condicao: (estado) => estado.unicos['tour-completo'] === true
  },
  {
    id: 'viajante-do-tempo',
    nome: 'badgeViajanteTempo',
    desc: 'badgeViajanteTempoDesc',
    icone: '◑',
    condicao: (estado) => estado.eventosViajados.length >= 1
  },
  {
    id: 'engenheiro-espacial',
    nome: 'badgeEngenheiroEspacial',
    desc: 'badgeEngenheiroEspacialDesc',
    icone: '⚙',
    condicao: (estado) => estado.missoesVistas.length >= MISSOES_PARA_ENGENHEIRO,
    // só Apollo 11 é grátis: sem Pro não há como ver 7 missões
    exigePro: () => (ITENS_GRATIS.missoes || []).length < MISSOES_PARA_ENGENHEIRO
  },
  {
    id: 'olho-no-ceu',
    nome: 'badgeOlhoNoCeu',
    desc: 'badgeOlhoNoCeuDesc',
    icone: '✧',
    condicao: (estado) => estado.corposVisitados.includes('hubble') && estado.corposVisitados.includes('jwst')
  }
];

// Carrega estado do localStorage
function carregarEstado() {
  try {
    const json = localStorage.getItem('sistema-solar-progresso');
    if (json) return migrar(JSON.parse(json));
  } catch (e) {
    console.warn('Progresso: localStorage indisponível, usando memória', e);
  }
  return criarEstadoVazio();
}

// Completa estado salvo por versões anteriores. `pacotesConcluidos` nasceu junto
// com o fim do XP refarmável: quem já jogava tem `medalhasPorPacote` preenchido,
// e usar essas chaves como semente evita dar a ele mais um pagamento integral
// por pacotes que ele já tinha concluído.
function migrar(estado) {
  if (!estado || typeof estado !== 'object') return criarEstadoVazio();
  if (!Array.isArray(estado.pacotesConcluidos)) {
    estado.pacotesConcluidos = Object.keys(estado.medalhasPorPacote || {});
  }
  return estado;
}

function criarEstadoVazio() {
  return {
    // Efeito Gradiente de Meta (endowed progress, Nunes & Drèze): o novato
    // já começa com uma fração do 1º nível preenchida em vez de uma barra
    // vazia — a sensação de "já comecei" gera momentum e reduz o abandono
    // inicial. 15/60 XP ≈ 25% da barra de Iniciante. Só vale para estado
    // novo; quem já tem progresso salvo carrega o próprio XP intacto.
    xp: 15,
    corposVisitados: [],
    missoesVistas: [],
    eventosViajados: [],
    medalhasPorPacote: {},
    // pacotes de quiz já concluídos ao menos uma vez — repetição paga simbólico
    pacotesConcluidos: [],
    unicos: {},
    badges: []
  };
}

// Persiste no localStorage
function salvarEstado(estado) {
  try {
    localStorage.setItem('sistema-solar-progresso', JSON.stringify(estado));
  } catch (e) {
    console.warn('Progresso: não foi possível salvar no localStorage', e);
  }
}

// Calcula nível atual dado XP
function calcularNivel(xp) {
  let nivel = 0;
  for (let i = NIVEIS.length - 1; i >= 0; i--) {
    if (xp >= NIVEIS[i].xp) {
      nivel = i;
      break;
    }
  }
  return nivel;
}

// Retorna {nível, xpAtual, xpProximo, percentualBarra}
function calcularProgresso(xp) {
  const nivel = calcularNivel(xp);
  const xpAtual = NIVEIS[nivel].xp;
  const xpProximo = nivel + 1 < NIVEIS.length ? NIVEIS[nivel + 1].xp : NIVEIS[nivel].xp + 1000;
  const dentro = xp - xpAtual;
  const falta = xpProximo - xpAtual;
  const percentual = falta > 0 ? Math.min(100, (dentro / falta) * 100) : 100;
  return { nivel, xpAtual, xpProximo, percentualBarra: percentual };
}

// Adiciona XP e retorna badges ganhos nesta chamada
function adicionarXp(estado, quantidade, dados) {
  const nivelAntes = calcularNivel(estado.xp);
  estado.xp += quantidade;
  const nivelDepois = calcularNivel(estado.xp);

  const badges = [];

  // Checa todos os badges
  for (const badge of BADGES) {
    if (!estado.badges.includes(badge.id)) {
      if (badge.condicao(estado, dados)) {
        estado.badges.push(badge.id);
        badges.push(badge);
      }
    }
  }

  const subiu = nivelAntes !== nivelDepois;
  return { badges, subiu, nivelAntes, nivelDepois };
}

// `missoes` e `pacotesQuiz` entram para que os totais do painel de Conquistas
// venham dos DADOS, não de números escritos à mão — que é como o painel passou a
// mostrar "/5 pacotes" (são 6) e "/7 missões" (são 10), fazendo quem visse as 10
// missões ler "10/7". Ambos são opcionais: sem eles o contador se esconde, o que
// é melhor do que mentir.
export function iniciarProgresso({ dados, missoes, pacotesQuiz, premium }) {
  if (typeof document === 'undefined') {
    return {
      abrir: () => { throw new Error('Progresso: document não disponível em ambiente node'); }
    };
  }

  const root = document.getElementById('ui-root');
  if (!root) return {};

  // Quem comprou o Pro alcança tudo — nenhum selo de "exige Pro" aparece.
  const premiumAtivo = () => !!(premium && premium.ativo);

  // Totais reais do jogo, para os contadores e para a badge "Sabe Tudo"
  const totalMissoes = Array.isArray(missoes) ? missoes.length : 0;
  const totalPacotes = Array.isArray(pacotesQuiz) ? pacotesQuiz.length : 0;
  if (totalPacotes) totalPacotesQuiz = totalPacotes;
  if (totalMissoes) totalMissoesJogo = totalMissoes;

  // Estado
  const estado = carregarEstado();

  // Cria DOM (overlay + chip)
  const overlay = document.createElement('div');
  overlay.className = 'progresso-overlay';
  overlay.innerHTML = `
    <div class="progresso-card">
      <button class="progresso-fechar" aria-label="${tt('fechaBotao')}">✕</button>
      <div class="progresso-header">
        <h2 class="progresso-nivel-nome">${tt(`nivel${calcularNivel(estado.xp)}`)}</h2>
        <div class="progresso-xp-info">
          <div class="progresso-xp-barra">
            <div class="progresso-xp-preenchido"></div>
          </div>
          <span class="progresso-xp-texto"></span>
        </div>
      </div>

      <div class="progresso-badges-grid"></div>

      <div class="progresso-contadores">
        <div class="progresso-contador">
          <span class="progresso-contador-label">${tt('paineisConquistasCorposVisitados')}</span>
          <span class="progresso-contador-valor"><strong class="progresso-visitados-atual">0</strong>/<strong class="progresso-visitados-total">43</strong></span>
        </div>
        <div class="progresso-contador">
          <span class="progresso-contador-label">${tt('paineisConquistasPacotesOuro')}</span>
          <span class="progresso-contador-valor"><strong class="progresso-ouro-atual">0</strong>/<strong class="progresso-ouro-total">—</strong></span>
        </div>
        <div class="progresso-contador">
          <span class="progresso-contador-label">${tt('paineisConquistasMissoes')}</span>
          <span class="progresso-contador-valor"><strong class="progresso-missoes-atual">0</strong>/<strong class="progresso-missoes-total">—</strong></span>
        </div>
      </div>
    </div>
  `;
  overlay.style.display = 'none';
  root.appendChild(overlay);

  // Chip de nível (fixo)
  const chip = document.createElement('div');
  chip.className = 'progresso-chip';
  chip.innerHTML = `
    <span class="progresso-chip-icone">◆</span>
    <span class="progresso-chip-nome"></span>
    <div class="progresso-chip-barra">
      <div class="progresso-chip-preenchido"></div>
    </div>
  `;
  const slotChip = document.getElementById('slot-progresso');
  (slotChip || root).appendChild(chip);

  // Container para toasts
  const toastsContainer = document.createElement('div');
  toastsContainer.className = 'progresso-toasts';
  root.appendChild(toastsContainer);

  // Atualiza UI com estado atual
  function atualizarUI() {
    const prog = calcularProgresso(estado.xp);
    const nivelAtual = NIVEIS[prog.nivel].nome;

    // Header do painel
    overlay.querySelector('.progresso-nivel-nome').textContent = tt(nivelAtual);
    overlay.querySelector('.progresso-xp-preenchido').style.width = prog.percentualBarra + '%';
    overlay.querySelector('.progresso-xp-texto').textContent = `${estado.xp} / ${prog.xpProximo} XP`;

    // Chip de nível
    chip.querySelector('.progresso-chip-nome').textContent = tt(nivelAtual);
    chip.querySelector('.progresso-chip-icone').textContent = NIVEIS[prog.nivel].icone;
    chip.querySelector('.progresso-chip-preenchido').style.width = prog.percentualBarra + '%';

    // Badges
    const badgesGrid = overlay.querySelector('.progresso-badges-grid');
    badgesGrid.innerHTML = '';
    for (const badge of BADGES) {
      const conquistada = estado.badges.includes(badge.id);
      // Badge que o jogador free NÃO consegue alcançar por mais que se esforce
      // (exige conteúdo Pro) ganha selo. Antes ela aparecia igual às outras, com
      // a dica de como obter e sem dizer que dependia de compra — criança free
      // perseguindo meta impossível. A meta continua visível de propósito (é bom
      // gancho de conversão), só deixou de ser desonesta.
      const proInalcancavel = !conquistada && !premiumAtivo() && badge.exigePro && badge.exigePro();
      const elem = document.createElement('div');
      elem.className = `progresso-badge ${conquistada ? 'conquistada' : 'futura'}${proInalcancavel ? ' exige-pro' : ''}`;
      elem.title = proInalcancavel ? `${tt(badge.desc)} — ${tt('badgeExigeProDica')}` : tt(badge.desc);
      elem.innerHTML = `
        <div class="progresso-badge-icone">${badge.icone}</div>
        ${proInalcancavel ? `<div class="progresso-badge-pro">${tt('badgeExigePro')}</div>` : ''}
        <div class="progresso-badge-nome">${tt(badge.nome)}</div>
        ${!conquistada ? `<div class="progresso-badge-dica">${tt(badge.desc)}</div>` : ''}
      `;
      badgesGrid.appendChild(elem);
    }

    // Contadores
    const ouroCount = Object.values(estado.medalhasPorPacote).filter(m => m === 'ouro').length;
    overlay.querySelector('.progresso-visitados-atual').textContent = estado.corposVisitados.length;
    overlay.querySelector('.progresso-visitados-total').textContent = dados.corpos.length;
    overlay.querySelector('.progresso-ouro-atual').textContent = ouroCount;
    overlay.querySelector('.progresso-missoes-atual').textContent = estado.missoesVistas.length;
    // Totais derivados dos dados — nunca escritos à mão (ver comentário em
    // iniciarProgresso). `totalPacotes`/`totalMissoes` vêm do closure.
    overlay.querySelector('.progresso-ouro-total').textContent = totalPacotes || '—';
    overlay.querySelector('.progresso-missoes-total').textContent = totalMissoes || '—';
  }

  // Listeners
  function onSelecao(evt) {
    if (!evt.detail || !evt.detail.id) return;
    const id = evt.detail.id;
    if (!estado.corposVisitados.includes(id)) {
      estado.corposVisitados.push(id);
      const res = adicionarXp(estado, 2, dados);
      salvarEstado(estado);
      atualizarUI();
      mostrarGanhoXp(2);
      if (res.subiu) mostrarToast(`${tt('niveisSubiuNivel', { nivel: tt(NIVEIS[res.nivelDepois].nome) })}`);
      for (const badge of res.badges) {
        mostrarToast(`${tt('niveisNovaConquista', { badge: tt(badge.nome) })}`);
      }
    }
  }

  function onProgresso(evt) {
    if (!evt.detail || !evt.detail.tipo) return;
    const tipo = evt.detail.tipo;

    let xpGanho = 0;
    const badgesAntigos = new Set(estado.badges);

    // Repetir um pacote de quiz pagava XP integral, indefinidamente — dava para
    // inflar o nível refazendo o mesmo pacote e os limiares perdiam o sentido.
    // Agora a primeira conclusão de cada pacote paga cheio e as repetições pagam
    // um valor simbólico: o botão "Repetir" continua existindo (rever pergunta é
    // bom para aprender), só deixou de ser uma máquina de XP.
    const jaConcluiu = (id) => !!id && Array.isArray(estado.pacotesConcluidos) && estado.pacotesConcluidos.includes(id);
    const XP_REPETICAO_ACERTO = 1;
    const XP_REPETICAO_PACOTE = 5;

    if (tipo === 'quiz-acerto') {
      xpGanho = jaConcluiu(evt.detail.pacoteId) ? XP_REPETICAO_ACERTO : (evt.detail.pts || 0);
    } else if (tipo === 'quiz-pacote') {
      const repetindo = jaConcluiu(evt.detail.pacoteId);
      xpGanho = repetindo ? XP_REPETICAO_PACOTE : 20;
      if (!repetindo && evt.detail.pacoteId) {
        if (!Array.isArray(estado.pacotesConcluidos)) estado.pacotesConcluidos = [];
        estado.pacotesConcluidos.push(evt.detail.pacoteId);
      }
      const pacoteId = evt.detail.pacoteId;
      const medalha = evt.detail.medalha; // 'bronze', 'prata', 'ouro' ou null (pct<50)
      const medalhaAnterior = estado.medalhasPorPacote[pacoteId];
      // A medalha registrada só SOBE de nível — refazer o pacote com nota
      // baixa (medalha null) não pode apagar a conquista nem repagar bônus
      const RANK_MEDALHA = { bronze: 1, prata: 2, ouro: 3 };
      if ((RANK_MEDALHA[medalha] || 0) > (RANK_MEDALHA[medalhaAnterior] || 0)) {
        estado.medalhasPorPacote[pacoteId] = medalha;
        // Bônus na 1ª vez que atinge cada medalha por pacote
        if (medalha === 'bronze') xpGanho += 10;
        else if (medalha === 'prata') xpGanho += 20;
        else if (medalha === 'ouro') xpGanho += 30;
      }
    } else if (tipo === 'tour-completo') {
      if (!estado.unicos['tour-completo']) {
        xpGanho = 25;
        estado.unicos['tour-completo'] = true;
      }
    } else if (['abriu-comparador', 'abriu-voce', 'abriu-quiz', 'abriu-eventos'].includes(tipo)) {
      if (!estado.unicos[tipo]) {
        xpGanho = 10;
        estado.unicos[tipo] = true;
      }
    } else if (tipo === 'missao-vista') {
      const id = evt.detail.id;
      if (id && !estado.missoesVistas.includes(id)) {
        xpGanho = 5;
        estado.missoesVistas.push(id);
      }
    } else if (tipo === 'evento-viagem') {
      const id = evt.detail.id;
      if (id && !estado.eventosViajados.includes(id)) {
        xpGanho = 5;
        estado.eventosViajados.push(id);
      }
    }

    if (xpGanho > 0) {
      const res = adicionarXp(estado, xpGanho, dados);
      salvarEstado(estado);
      atualizarUI();
      mostrarGanhoXp(xpGanho);

      if (res.subiu) {
        mostrarToast(`${tt('niveisSubiuNivel', { nivel: tt(NIVEIS[res.nivelDepois].nome) })}`);
      }

      // Mostra novos badges
      for (const badge of res.badges) {
        if (!badgesAntigos.has(badge.id)) {
          mostrarToast(`${tt('niveisNovaConquista', { badge: tt(badge.nome) })}`);
        }
      }
    }
  }

  document.addEventListener('sim:selecao', onSelecao);
  document.addEventListener('sim:progresso', onProgresso);

  // Toast — no máximo 2 na tela ao mesmo tempo, mas o excedente ENFILEIRA em vez
  // de ser descartado. Antes era `if (toastCount >= 2) return`, e o melhor
  // momento do jogo era justamente o que perdia feedback: fechar um pacote com
  // ouro dispara subida de nível + 2 badges de uma vez, e o 3º sumia calado.
  const MAX_TOASTS = 2;
  let toastCount = 0;
  const filaToasts = [];

  function mostrarToast(mensagem) {
    if (toastCount >= MAX_TOASTS) { filaToasts.push(mensagem); return; }
    toastCount++;

    const toast = document.createElement('div');
    toast.className = 'progresso-toast';
    toast.textContent = mensagem;
    toastsContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('progresso-toast-sair');
      setTimeout(() => {
        toast.remove();
        toastCount--;
        if (filaToasts.length) mostrarToast(filaToasts.shift());
      }, 250);
    }, 3000);
  }

  // "+N XP" efêmero ancorado no chip de nível (ou no #mdock-nivel, no celular).
  // Antes, ganhar XP não produzia NADA visível além da barra mudando de largura:
  // para o público 7+ esse é o motor do loop, e ele estava mudo.
  function mostrarGanhoXp(quantidade) {
    if (!(quantidade > 0)) return;
    // O dock é montado SEMPRE, inclusive no desktop, onde fica oculto com
    // largura 0 — por isso a âncora se escolhe pelo que está de fato visível,
    // não pela mera existência do elemento.
    const candidatos = document.body.classList.contains('modo-dock')
      ? ['#mdock-nivel', '.progresso-chip']
      : ['.progresso-chip', '#mdock-nivel'];
    let ancora = null;
    let r = null;
    for (const sel of candidatos) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const caixa = el.getBoundingClientRect();
      if (caixa.width > 0 && caixa.height > 0) { ancora = el; r = caixa; break; }
    }
    if (!ancora) return;

    const el = document.createElement('div');
    el.className = 'progresso-ganho-xp';
    el.textContent = `+${quantidade} XP`;
    // posicionado em coordenadas de viewport para não depender do layout do
    // ancestral (o chip do desktop e o do dock vivem em contêineres diferentes)
    el.style.left = `${r.left + r.width / 2}px`;
    el.style.top = `${r.bottom + 4}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }

  // Listeners de UI
  const btnFechar = overlay.querySelector('.progresso-fechar');
  const card = overlay.querySelector('.progresso-card');

  function fechar() {
    overlay.style.display = 'none';
  }

  function abrir() {
    overlay.style.display = 'flex';
    atualizarUI();
  }

  btnFechar.addEventListener('click', fechar);

  overlay.addEventListener('click', (evt) => {
    if (evt.target === overlay) fechar();
  });

  chip.addEventListener('click', abrir);

  // Esc listener com guarda de display
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && overlay.style.display === 'flex') {
      evt.stopImmediatePropagation();
      fechar();
    }
  }, { capture: true });

  // Renderização inicial
  atualizarUI();

  return { abrir, fechar };
}
