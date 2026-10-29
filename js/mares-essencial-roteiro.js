// O guia gratuito explica o fenômeno completo; o Pro abre uma investigação controlável.
const demonstracao = { tipo: 'mares-oceano', modo: 'essencial', angulo: 0, camada: 'ambos' };

const textos = {
  pt: {
    titulo: 'Marés: uma explicação essencial',
    objetivo: 'Entenda Lua, Sol e amplitude',
    objetivoTexto: 'Descubra por que o nível do mar sobe e desce e por que Lua nova, Lua cheia e quartos produzem amplitudes diferentes.',
    observar: 'Compare alinhamento e quadratura',
    observarTexto: 'A demonstração começa na Lua nova: Sol, Lua e Terra ficam quase alinhados e a amplitude combinada é maior. Toque no quarto para ver Sol e Lua em ângulo reto e uma amplitude menor. Esta explicação e a demonstração são gratuitas.',
    explicacao: 'Dois bojos em um modelo ideal',
    explicacaoTexto: 'A gravidade da Lua varia entre o lado próximo, o centro e o lado distante da Terra. Essa diferença, somada à resposta do sistema Terra–Lua, ajuda a representar dois bojos em um modelo de equilíbrio. O Sol também produz maré, menor que a lunar. Em Lua nova e cheia, os efeitos se reforçam: marés de sizígia têm maior amplitude. Nos quartos, parte do efeito solar se contrapõe ao lunar: marés de quadratura continuam existindo, com menor amplitude.',
    pergunta: 'Teste a ideia',
    perguntaTexto: 'O que tende a acontecer com a amplitude quando Sol, Terra e Lua quase se alinham?',
    opcao1: 'Ela aumenta, porque os efeitos de maré do Sol e da Lua se reforçam',
    opcao2: 'Ela diminui, porque os efeitos de maré do Sol e da Lua se contrapõem',
    certo: 'Isso! O alinhamento favorece marés de sizígia: altas um pouco mais altas e baixas um pouco mais baixas, em média.',
    tentar: 'Compare o alinhamento da Lua nova ou cheia com o ângulo reto dos quartos: quadratura reduz a amplitude, mas não elimina as marés.',
    recap: 'O que você já sabe',
    recapTexto: 'Marés são ondas longas influenciadas pela Lua e pelo Sol. A diferença da gravidade lunar através da Terra ajuda a explicar dois bojos no modelo ideal. Sizígia, perto da Lua nova e cheia, favorece maior amplitude; quadratura, nos quartos, favorece menor amplitude. Em muitas costas há duas marés altas por dia lunar, cerca de 24 h 50 min, mas nem toda costa segue esse padrão. Forma da costa, profundidade, fundo do mar e meteorologia mudam os resultados locais; este modelo não prevê horário nem altura para uma praia.',
    investigar: 'Investigar Lua, Sol e hora',
    fonte: 'Fontes: NOAA Ocean Service — What are spring and neap tides?; Frequency of Tides — The Lunar Day'
  },
  en: {
    titulo: 'Tides: an essential explanation',
    objetivo: 'Understand the Moon, Sun, and range',
    objetivoTexto: 'Discover why sea level rises and falls, and why new Moon, full Moon, and quarter phases produce different tidal ranges.',
    observar: 'Compare alignment and quadrature',
    observarTexto: 'The demonstration starts at new Moon: the Sun, Moon, and Earth are nearly aligned and the combined range is larger. Tap a quarter phase to see the Sun and Moon at right angles and a smaller range. This explanation and demonstration are free.',
    explicacao: 'Two bulges in an ideal model',
    explicacaoTexto: 'The Moon’s gravity varies between Earth’s near side, centre, and far side. That difference, together with the response of the Earth–Moon system, helps represent two bulges in an equilibrium model. The Sun also produces a tide, smaller than the lunar one. At new and full Moon, the effects reinforce each other: spring tides have a larger range. At quarter phases, part of the solar effect counteracts the lunar one: neap tides remain, with a smaller range.',
    pergunta: 'Test the idea',
    perguntaTexto: 'What tends to happen to tidal range when the Sun, Earth, and Moon nearly align?',
    opcao1: 'It increases, because the Sun’s and Moon’s tidal effects reinforce each other',
    opcao2: 'It decreases, because the Sun’s and Moon’s tidal effects oppose each other',
    certo: 'Right! Alignment favors spring tides: on average, high tides are a little higher and low tides a little lower.',
    tentar: 'Compare new or full Moon alignment with the right angle at quarter phases: quadrature reduces tidal range but does not remove tides.',
    recap: 'What you already know',
    recapTexto: 'Tides are long waves influenced by the Moon and Sun. The difference in lunar gravity across Earth helps explain two bulges in an ideal model. Spring tides, near new and full Moon, favor a larger range; neap tides, at the quarters, favor a smaller range. Many coasts have two high tides per lunar day, about 24 hours 50 minutes, but not every coast follows that pattern. Coastline shape, water depth, seafloor, and weather change local results; this model does not predict a beach’s tide time or height.',
    investigar: 'Investigate the Moon, Sun, and time',
    fonte: 'Sources: NOAA Ocean Service — What are spring and neap tides?; Frequency of Tides — The Lunar Day'
  },
  es: {
    titulo: 'Mareas: una explicación esencial',
    objetivo: 'Entiende la Luna, el Sol y la amplitud',
    objetivoTexto: 'Descubre por qué el nivel del mar sube y baja y por qué la luna nueva, la llena y los cuartos producen amplitudes diferentes.',
    observar: 'Compara alineación y cuadratura',
    observarTexto: 'La demostración comienza en luna nueva: el Sol, la Luna y la Tierra están casi alineados y la amplitud combinada es mayor. Toca un cuarto para ver al Sol y la Luna en ángulo recto y una amplitud menor. Esta explicación y demostración son gratuitas.',
    explicacao: 'Dos abultamientos en un modelo ideal',
    explicacaoTexto: 'La gravedad lunar varía entre el lado cercano, el centro y el lado lejano de la Tierra. Esa diferencia, junto con la respuesta del sistema Tierra-Luna, ayuda a representar dos abultamientos en un modelo de equilibrio. El Sol también produce marea, menor que la lunar. En luna nueva y llena, los efectos se refuerzan: las mareas vivas tienen mayor amplitud. En los cuartos, parte del efecto solar se contrapone al lunar: las mareas muertas siguen existiendo, con menor amplitud.',
    pergunta: 'Pon a prueba la idea',
    perguntaTexto: '¿Qué tiende a ocurrir con la amplitud cuando el Sol, la Tierra y la Luna casi se alinean?',
    opcao1: 'Aumenta, porque los efectos de marea del Sol y de la Luna se refuerzan',
    opcao2: 'Disminuye, porque los efectos de marea del Sol y de la Luna se contraponen',
    certo: '¡Eso es! La alineación favorece mareas vivas: en promedio, las altas son algo más altas y las bajas algo más bajas.',
    tentar: 'Compara la alineación de luna nueva o llena con el ángulo recto de los cuartos: la cuadratura reduce la amplitud, pero no elimina las mareas.',
    recap: 'Lo que ya sabes',
    recapTexto: 'Las mareas son ondas largas influidas por la Luna y el Sol. La diferencia de la gravedad lunar a través de la Tierra ayuda a explicar dos abultamientos en un modelo ideal. Las mareas vivas, cerca de luna nueva y llena, favorecen mayor amplitud; las muertas, en los cuartos, menor amplitud. Muchas costas tienen dos pleamares por día lunar, de unas 24 h 50 min, pero no todas siguen ese patrón. La forma de la costa, la profundidad, el fondo marino y el tiempo modifican los resultados locales; este modelo no predice la hora ni la altura de una playa.',
    investigar: 'Investigar Luna, Sol y hora',
    fonte: 'Fuentes: NOAA Ocean Service — What are spring and neap tides?; Frequency of Tides — The Lunar Day'
  }
};

export const ROTEIRO_MARES_ESSENCIAL = {
  id: 'mares-guia', versao: 2, investigacao: 'mares-oceano', pro: false, ambiente: 'universo', corpo: 'terra',
  urlFonte: 'https://oceanservice.noaa.gov/facts/springtide.html',
  fontesAdicionais: [
    { nome: 'NOAA Ocean Service — Frequency of Tides: The Lunar Day', url: 'https://oceanservice.noaa.gov/education/tutorial_tides/tides05_lunarday.html' },
    { nome: 'NOAA Ocean Service — Tidal Variations', url: 'https://oceanservice.noaa.gov/education/tutorial_tides/tides06_variations.html' }
  ],
  textos,
  etapas: [
    { titulo: 'objetivo', corpo: 'objetivoTexto', astro: 'terra' },
    { titulo: 'observar', corpo: 'observarTexto', astro: 'terra', experimento: demonstracao },
    { titulo: 'explicacao', corpo: 'explicacaoTexto', astro: 'terra' },
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
