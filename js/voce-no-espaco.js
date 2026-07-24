import { getIdioma } from './i18n.js';

// Texts (pt/en/es)
const TEXTOS = {
  pt: {
    titulo: 'Você no Espaço',
    pesoLabel: 'Seu peso na Terra (kg)',
    idadeLabel: 'Sua idade (anos)',
    peso: 'Peso',
    idade: 'Idade',
    pulo: 'Pulo',
    anosEm: 'anos em',
    cm: 'cm',
    m: 'm',
    pro: 'PRO',
    aprenderMais: 'Toque para desbloquear',
    voltar: 'Voltar'
  },
  en: {
    titulo: 'You in Space',
    pesoLabel: 'Your weight on Earth (kg)',
    idadeLabel: 'Your age (years)',
    peso: 'Weight',
    idade: 'Age',
    pulo: 'Jump height',
    anosEm: 'years on',
    cm: 'cm',
    m: 'm',
    pro: 'PRO',
    aprenderMais: 'Tap to unlock',
    voltar: 'Back'
  },
  es: {
    titulo: 'Tú en el Espacio',
    pesoLabel: 'Tu peso en la Tierra (kg)',
    idadeLabel: 'Tu edad (años)',
    peso: 'Peso',
    idade: 'Edad',
    pulo: 'Salto',
    anosEm: 'años en',
    cm: 'cm',
    m: 'm',
    pro: 'PRO',
    aprenderMais: 'Toca para desbloquear',
    voltar: 'Volver'
  }
};

// Phrases
const FRASES = {
  terra: {
    pt: 'Seu planeta natal — o lar!',
    en: 'Your home planet — where you belong!',
    es: 'Tu planeta de origen — tu hogar!'
  },
  lua: {
    pt: 'Cada passo vira um salto de astronauta.',
    en: 'Every step becomes an astronaut\'s leap.',
    es: 'Cada paso se convierte en un salto de astronauta.'
  },
  sol: {
    pt: 'Você seria instantaneamente vaporizando!',
    en: 'You would vaporize instantly!',
    es: 'Serías vaporizado al instante!'
  },
  mercurio: {
    pt: 'Gravidade fraca — você saltaria bem alto.',
    en: 'Weak gravity — you\'d jump very high.',
    es: 'Gravedad débil — saltarías muy alto.'
  },
  venus: {
    pt: 'Quase como a Terra, mas muito mais quente!',
    en: 'Almost like Earth, but much hotter!',
    es: 'Casi como la Tierra, pero mucho más caliente!'
  },
  marte: {
    pt: 'Um terço da gravidade da Terra — facilmente adaptável.',
    en: 'One-third Earth\'s gravity — easily manageable.',
    es: 'Un tercio de la gravedad de la Tierra — manejable.'
  },
  jupiter: {
    pt: 'Você mal conseguiria levantar da cama!',
    en: 'You\'d barely lift off the ground!',
    es: 'Apenas podrías levantarte!'
  },
  saturno: {
    pt: 'Gravidade moderada — surpreendentemente confortável.',
    en: 'Moderate gravity — surprisingly comfortable.',
    es: 'Gravedad moderada — sorprendentemente cómoda.'
  },
  urano: {
    pt: 'Quase igual à Terra — um gigante gelado.',
    en: 'Nearly Earth-like — an ice giant.',
    es: 'Casi como la Tierra — un gigante de hielo.'
  },
  netuno: {
    pt: 'Ligeiramente mais forte que a Terra.',
    en: 'Slightly stronger than Earth\'s.',
    es: 'Ligeramente más fuerte que la Tierra.'
  },
  plutao: {
    pt: 'Você saltaria para longe e flutuaria para o espaço!',
    en: 'You\'d jump away and float into space!',
    es: 'Saltarías y flotarías hacia el espacio!'
  }
};

// Gravity table (m/s2)
const GRAVIDADES = {
  sol: 274,
  mercurio: 3.7,
  venus: 8.87,
  terra: 9.81,
  lua: 1.62,
  marte: 3.71,
  jupiter: 24.79,
  saturno: 10.44,
  urano: 8.87,
  netuno: 11.15,
  plutao: 0.62
};

// Ordem dos corpos a exibir
const CORPOS_ORDEM = [
  'terra', 'lua', 'sol', 'mercurio', 'venus', 'marte',
  'jupiter', 'saturno', 'urano', 'netuno', 'plutao'
];

// Translation helper with fallback
function tt(chave) {
  const idioma = getIdioma();
  return TEXTOS[idioma]?.[chave] ?? TEXTOS.pt[chave] ?? chave;
}

// Format number with decimal comma for pt/es
function formatarNumero(n) {
  const idioma = getIdioma();
  if (idioma === 'pt' || idioma === 'es') {
    return String(n).replace('.', ',');
  }
  return String(n);
}

// Load persisted data from localStorage
function carregarDados() {
  try {
    const salvo = localStorage.getItem('sistema-solar-voce');
    if (salvo) {
      const dados = JSON.parse(salvo);
      return { peso: dados.peso ?? 30, idade: dados.idade ?? 8 };
    }
  } catch (e) {
    // localStorage unavailable or invalid JSON
  }
  return { peso: 30, idade: 8 };
}

// Persist data to localStorage
function salvarDados(peso, idade) {
  try {
    localStorage.setItem('sistema-solar-voce', JSON.stringify({ peso, idade }));
  } catch (e) {
    // localStorage unavailable
  }
}

export function iniciarVoceNoEspaco({ dados, premium }) {
  if (typeof document === 'undefined') {
    // In node (tests): throws error only if called, not on import
    return {
      abrir: () => { throw new Error('VoceNoEspaco: document não disponível em ambiente node'); }
    };
  }

  const root = document.getElementById('ui-root');
  if (!root) return {};

  const { peso: pesoCarro, idade: idadeCarro } = carregarDados();

  // Cria DOM
  const overlay = document.createElement('div');
  overlay.className = 'voce-no-espaco-overlay';
  overlay.innerHTML = `
    <div class="voce-no-espaco-card">
      <button class="voce-no-espaco-fechar botao-fechar-overlay" aria-label="${tt('voltar')}"><span class="fechar-icone">✕</span><span class="fechar-texto">‹ ${tt('voltar')}</span></button>
      <h2 class="voce-no-espaco-titulo">${tt('titulo')}</h2>

      <div class="voce-no-espaco-controles">
        <div class="voce-no-espaco-controle">
          <label for="voce-peso-input">${tt('pesoLabel')}</label>
          <input type="number" id="voce-peso-input" min="10" max="150" step="0.1" value="${pesoCarro}">
          <input type="range" id="voce-peso-range" min="10" max="150" step="0.1" value="${pesoCarro}">
        </div>
        <div class="voce-no-espaco-controle">
          <label for="voce-idade-input">${tt('idadeLabel')}</label>
          <input type="number" id="voce-idade-input" min="1" max="100" step="0.1" value="${idadeCarro}">
          <input type="range" id="voce-idade-range" min="1" max="100" step="0.1" value="${idadeCarro}">
        </div>
      </div>

      <div class="voce-no-espaco-grid" id="voce-grid">
        <!-- Preenchido por JS -->
      </div>
    </div>
  `;
  root.appendChild(overlay);
  overlay.style.display = 'none';

  const inputPeso = document.getElementById('voce-peso-input');
  const rangePeso = document.getElementById('voce-peso-range');
  const inputIdade = document.getElementById('voce-idade-input');
  const rangeIdade = document.getElementById('voce-idade-range');
  const btnFechar = overlay.querySelector('.voce-no-espaco-fechar');
  const grid = document.getElementById('voce-grid');

  // Estado
  let pesoAtual = pesoCarro;
  let idadeAtual = idadeCarro;
  let bloqueiosPorCorpo = {};

  // Map: premium undefined = all unlocked; premium set = check permits
  const temPremium = premium !== undefined;

  // Check if body is permitted
  function ePermitido(corpoId) {
    if (!temPremium) return true; // Sem premium, tudo liberado
    return premium.permitido('voce-no-espaco', corpoId);
  }

  // Calcular dados de um corpo
  function calcularCorpo(corpoId) {
    const corpo = dados.corpos.find(c => c.id === corpoId);
    if (!corpo) return null;

    const g = GRAVIDADES[corpoId];
    if (!g) return null; // Corpo sem gravidade tabelada

    const peso = pesoAtual * (g / 9.81);
    const pulo30cm = 30 * (9.81 / g); // cm
    let pulo = pulo30cm; // em cm

    let idadeAno = null;
    if (corpo.periodoOrbitalDias && corpo.periodoOrbitalDias > 0 && corpoId !== 'sol') {
      idadeAno = idadeAtual * 365.25 / corpo.periodoOrbitalDias;
    }

    return { peso, pulo, idadeAno };
  }

  // Reconstruir grid
  function reconstruirGrid() {
    grid.innerHTML = '';

    for (const corpoId of CORPOS_ORDEM) {
      const corpo = dados.corpos.find(c => c.id === corpoId);
      if (!corpo) continue; // Body not found in data

      const permitido = ePermitido(corpoId);
      const calc = calcularCorpo(corpoId);
      if (!calc) continue; // Corpo sem gravidade

      const card = document.createElement('div');
      card.className = 'voce-no-espaco-card-item';
      if (!permitido) card.classList.add('voce-no-espaco-bloqueado');

      // Fundo com cores do corpo
      const cores = corpo.aparencia?.cores || [];
      if (cores.length > 0) {
        const cor1 = cores[0];
        const cor2 = cores[Math.min(1, cores.length - 1)];
        card.style.background = `linear-gradient(135deg, ${cor1}22 0%, ${cor2}11 100%)`;
      }

      let conteudo = `
        <div class="voce-no-espaco-nome">${corpo.nome}</div>
        <div class="voce-no-espaco-dados">
          <div class="voce-no-espaco-linha">
            <span class="voce-no-espaco-rotulo">${tt('peso')}:</span>
            <span class="voce-no-espaco-valor">${formatarNumero(calc.peso.toFixed(1))} kg</span>
          </div>
      `;

      if (calc.idadeAno !== null) {
        const idadeAnoStr = calc.idadeAno < 1
          ? formatarNumero(calc.idadeAno.toFixed(2))
          : formatarNumero(calc.idadeAno.toFixed(1));
        conteudo += `
          <div class="voce-no-espaco-linha">
            <span class="voce-no-espaco-rotulo">${tt('idade')}:</span>
            <span class="voce-no-espaco-valor">${idadeAnoStr} ${tt('anosEm')} ${corpo.nome}</span>
          </div>
        `;
      }

      const pulo = calc.pulo;
      let puloTexto;
      if (pulo >= 100) {
        const puloM = (pulo / 100).toFixed(1);
        puloTexto = `${formatarNumero(puloM)} ${tt('m')}`;
      } else {
        puloTexto = `${Math.round(pulo)} ${tt('cm')}`;
      }

      conteudo += `
          <div class="voce-no-espaco-linha">
            <span class="voce-no-espaco-rotulo">${tt('pulo')}:</span>
            <span class="voce-no-espaco-valor">${puloTexto}</span>
          </div>
      `;

      conteudo += `
          <div class="voce-no-espaco-frase">${FRASES[corpoId]?.[getIdioma()] ?? FRASES[corpoId]?.pt ?? ''}</div>
        </div>
      `;

      if (!permitido) {
        conteudo += `
          <div class="voce-no-espaco-bloqueio">
            <div class="voce-no-espaco-selo">${tt('pro')}</div>
            <div class="voce-no-espaco-hint">${tt('aprenderMais')}</div>
          </div>
        `;
      }

      card.innerHTML = conteudo;

      // Evento clique no card bloqueado
      if (!permitido) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          premium.exigirItem('voce-no-espaco', corpoId);
        });
      }

      grid.appendChild(card);
      bloqueiosPorCorpo[corpoId] = !permitido;
    }
  }

  // Sincronizar inputs
  function sincronizarInputs(peso, idade) {
    inputPeso.value = peso;
    rangePeso.value = peso;
    inputIdade.value = idade;
    rangeIdade.value = idade;
  }

  // Recalcular (chamado ao mudar inputs)
  function recalcular() {
    // Checagem explícita de NaN (não `|| padrao`) — peso/idade digitados
    // como 0 são valores válidos e não devem virar o padrão silenciosamente
    const peso = parseFloat(inputPeso.value);
    const idade = parseFloat(inputIdade.value);
    pesoAtual = Number.isNaN(peso) ? 30 : peso;
    idadeAtual = Number.isNaN(idade) ? 8 : idade;
    sincronizarInputs(pesoAtual, idadeAtual);
    salvarDados(pesoAtual, idadeAtual);
    reconstruirGrid();
  }

  // Listeners de input
  inputPeso.addEventListener('input', recalcular);
  rangePeso.addEventListener('input', () => {
    pesoAtual = parseFloat(rangePeso.value) || 30;
    sincronizarInputs(pesoAtual, idadeAtual);
    salvarDados(pesoAtual, idadeAtual);
    reconstruirGrid();
  });

  inputIdade.addEventListener('input', recalcular);
  rangeIdade.addEventListener('input', () => {
    idadeAtual = parseFloat(rangeIdade.value) || 8;
    sincronizarInputs(pesoAtual, idadeAtual);
    salvarDados(pesoAtual, idadeAtual);
    reconstruirGrid();
  });

  // Fechar
  function fechar() {
    overlay.style.display = 'none';
  }

  btnFechar.addEventListener('click', fechar);

  // Clique fora do card
  overlay.addEventListener('click', (evt) => {
    if (evt.target === overlay) fechar();
  });

  // Esc com listener permanente e guarda de visibilidade
  const handleEsc = (evt) => {
    if (evt.key === 'Escape' && overlay.style.display === 'flex') {
      evt.stopImmediatePropagation();
      fechar();
    }
  };
  document.addEventListener('keydown', handleEsc, { capture: true });

  // Register premium change listener
  if (temPremium) {
    premium.aoMudar((ativo) => {
      if (ativo) {
        // Premium ativado — remover bloqueios
        reconstruirGrid();
      }
    });
  }

  // Construir grid inicial
  reconstruirGrid();

  // Open function
  function abrir() {
    overlay.style.display = 'flex';
  }

  return { abrir, fechar };
}
