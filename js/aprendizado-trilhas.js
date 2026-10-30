import {roteiroDisponivel} from './release-scope.js?v=302';
import {TRILHAS_MUNDOS} from './mundos-trilhas.js?v=1';
const TRILHAS_COMPLETAS = [
 {id:'sondas-viagens',roteiros:['parker-sol','juno-jupiter','rosetta-cometa','voyager-viagem'],textos:{pt:{titulo:'Sondas e suas viagens',descricao:'Explore encontros, instrumentos e descobertas de missões espaciais.'},en:{titulo:'Spacecraft and their journeys',descricao:'Explore encounters, instruments, and discoveries from space missions.'},es:{titulo:'Sondas y sus viajes',descricao:'Explora encuentros, instrumentos y descubrimientos de misiones espaciales.'}}},
 ...TRILHAS_MUNDOS,
  {
    id: 'fundamentos',
    roteiros: ['sol', 'planetas', 'pequenos', 'cometas-guia', 'escalas-guia', 'assistencias-gravitacionais', 'habitabilidade'],
    textos: {
      pt: {
        titulo: 'Fundamentos do Sistema Solar',
        descricao: 'Conheça o Sol, os planetas e os pequenos corpos que compartilham nosso sistema.'
      },
      en: {
        titulo: 'Solar System Basics',
        descricao: 'Meet the Sun, the planets, and the small bodies that share our system.'
      },
      es: {
        titulo: 'Fundamentos del sistema solar',
        descricao: 'Conoce el Sol, los planetas y los cuerpos pequeños que comparten nuestro sistema.'
      }
    }
  },
  {
    id: 'terra',
    roteiros: ['terra', 'estacoes-guia', 'terra-ano', 'mares-guia', 'mares-oceano'],
    textos: {
      pt: {
        titulo: 'Terra em movimento',
        descricao: 'Explore a rotação, as estações e as marés na Terra.'
      },
      en: {
        titulo: 'Earth in Motion',
        descricao: 'Explore Earth’s rotation, seasons, and tides.'
      },
      es: {
        titulo: 'La Tierra en movimiento',
        descricao: 'Explora la rotación, las estaciones y las mareas de la Tierra.'
      }
    }
  },
  {
    id: 'lua',
    roteiros: ['lua', 'lua-fases', 'apollo11', 'saturno-estagios', 'lunar-pouso', 'artemis-1'],
    textos: {
      pt: {
        titulo: 'A Lua e a exploração espacial',
        descricao: 'Descubra a Lua, a missão Apollo 11 e etapas de voos espaciais.'
      },
      en: {
        titulo: 'The Moon and Space Exploration',
        descricao: 'Discover the Moon, Apollo 11, and stages of spaceflight.'
      },
      es: {
        titulo: 'La Luna y la exploración espacial',
        descricao: 'Descubre la Luna, la misión Apollo 11 y etapas de los vuelos espaciales.'
      }
    }
  },
  {
    id: 'marte',
    roteiros: ['marte', 'perseverance-pouso', 'ingenuity-voo'],
    textos: {
      pt: {
        titulo: 'Explorando Marte',
        descricao: 'Conheça Marte, o pouso do Perseverance e os voos do Ingenuity.'
      },
      en: {
        titulo: 'Exploring Mars',
        descricao: 'Learn about Mars, Perseverance’s landing, and Ingenuity’s flights.'
      },
      es: {
        titulo: 'Explorando Marte',
        descricao: 'Conoce Marte, el aterrizaje de Perseverance y los vuelos de Ingenuity.'
      }
    }
  },
 {id:'saturno',roteiros:['huygens-tita','cassini-finale'],textos:{pt:{titulo:'Saturno e suas luas',descricao:'Acompanhe Cassini e a descida da Huygens em Titã.'},en:{titulo:'Saturn and its moons',descricao:'Follow Cassini and Huygens’ descent to Titan.'},es:{titulo:'Saturno y sus lunas',descricao:'Sigue Cassini y el descenso de Huygens en Titán.'}}},
  {
    id: 'observatorios',
    roteiros: ['hubble', 'discovery-hubble', 'discovery-carga', 'endeavour-sts61', 'webb-desdobramento', 'hubble-webb-luz'],
    textos: {
      pt: {
        titulo: 'Observatórios e missões',
        descricao: 'Do lançamento do Hubble à manutenção STS-61 e ao Webb.'
      },
      en: {
        titulo: 'Observatories and Missions',
        descricao: 'From Hubble’s launch to STS-61 servicing and Webb.'
      },
      es: {
        titulo: 'Observatorios y misiones',
        descricao: 'Del lanzamiento de Hubble al mantenimiento STS-61 y a Webb.'
      }
    }
  }
];

// Remover trilhas vazias e referências adiadas sem alterar as definições originais.
export const TRILHAS = TRILHAS_COMPLETAS.map(trilha=>({...trilha,roteiros:trilha.roteiros.filter(roteiroDisponivel)})).filter(trilha=>trilha.roteiros.length);
const descricoesPublicadas={
 marte:{pt:'Conheça Marte e suas características.',en:'Learn about Mars and its features.',es:'Conoce Marte y sus características.'},
 observatorios:{pt:'Do lançamento do Hubble à manutenção STS-61.',en:'From Hubble’s launch to STS-61 servicing.',es:'Del lanzamiento de Hubble al mantenimiento STS-61.'}
};
for(const trilha of TRILHAS){
 const descricoes=descricoesPublicadas[trilha.id];
 if(descricoes) trilha.textos=Object.fromEntries(Object.entries(trilha.textos).map(([lang,texto])=>[lang,{...texto,descricao:descricoes[lang]}]));
}

// O percurso essencial é completo sem compra. As trilhas acima continuam sendo
// o catálogo por assunto; seus capítulos Pro são aprofundamentos opcionais.
export const PERCURSO_ESSENCIAL = Object.freeze([
  'sol', 'planetas', 'pequenos',
  'terra', 'estacoes-guia', 'mares-guia',
  'lua', 'lua-fases', 'apollo11', 'marte', 'hubble', 'discovery-hubble'
]);

const APROFUNDAMENTOS = Object.freeze({
  planetas: ['escalas-guia'],
  pequenos: ['cometas-guia'],
  'estacoes-guia': ['terra-ano'],
  'mares-guia': ['mares-oceano'],
  apollo11: ['saturno-estagios', 'lunar-pouso'],
  'saturno-estagios': ['artemis-1'],
  marte: ['perseverance-pouso', 'ingenuity-voo'],
  hubble: ['hubble-webb-luz'],
  'discovery-hubble': ['discovery-carga', 'endeavour-sts61', 'webb-desdobramento']
});

export function aprofundamentosDoRoteiro(id) {
  return roteiroDisponivel(id) ? (APROFUNDAMENTOS[id] || []).filter(roteiroDisponivel) : [];
}

export function trilhaDoRoteiro(id) {
  for (const trilha of TRILHAS) {
    const indice = trilha.roteiros.indexOf(id);
    if (indice !== -1) {
      return {
        trilha,
        indice,
        indiceEssencial: PERCURSO_ESSENCIAL.indexOf(id),
        proximo: PERCURSO_ESSENCIAL.includes(id)
          ? PERCURSO_ESSENCIAL[PERCURSO_ESSENCIAL.indexOf(id) + 1] ?? null
          : id==='saturno-estagios' ? null
          : trilha.roteiros[indice + 1] ?? null
      };
    }
  }

  return null;
}
