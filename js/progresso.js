// Progressão: níveis + badges com XP
// Exporta iniciarProgresso({ dados })

import { getIdioma } from './i18n.js';

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
    badgeSabeTudoDesc: 'Ouro em todos os 5 pacotes',
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
    badgeSabeTudoDesc: 'Gold in all 5 quiz packs',
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
    badgeSabeTudoDesc: 'Oro en los 5 paquetes',
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
    condicao: (estado) => {
      const ouroCount = Object.values(estado.medalhasPorPacote).filter(m => m === 'ouro').length;
      return ouroCount >= 5;
    }
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
    condicao: (estado) => estado.missoesVistas.length >= 7
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
    if (json) return JSON.parse(json);
  } catch (e) {
    console.warn('Progresso: localStorage indisponível, usando memória', e);
  }
  return criarEstadoVazio();
}

function criarEstadoVazio() {
  return {
    xp: 0,
    corposVisitados: [],
    missoesVistas: [],
    eventosViajados: [],
    medalhasPorPacote: {},
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

export function iniciarProgresso({ dados }) {
  if (typeof document === 'undefined') {
    return {
      abrir: () => { throw new Error('Progresso: document não disponível em ambiente node'); }
    };
  }

  const root = document.getElementById('ui-root');
  if (!root) return {};

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
          <span class="progresso-contador-valor"><strong class="progresso-ouro-atual">0</strong>/<strong class="progresso-ouro-total">5</strong></span>
        </div>
        <div class="progresso-contador">
          <span class="progresso-contador-label">${tt('paineisConquistasMissoes')}</span>
          <span class="progresso-contador-valor"><strong class="progresso-missoes-atual">0</strong>/<strong class="progresso-missoes-total">7</strong></span>
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
  root.appendChild(chip);

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
      const elem = document.createElement('div');
      elem.className = `progresso-badge ${conquistada ? 'conquistada' : 'futura'}`;
      elem.title = tt(badge.desc);
      elem.innerHTML = `
        <div class="progresso-badge-icone">${badge.icone}</div>
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

    if (tipo === 'quiz-acerto') {
      xpGanho = evt.detail.pts || 0;
    } else if (tipo === 'quiz-pacote') {
      xpGanho = 20;
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

  // Toast
  let toastCount = 0;
  function mostrarToast(mensagem) {
    if (toastCount >= 2) return; // Máximo 2 toasts
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
      }, 250);
    }, 3000);
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
