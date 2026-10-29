// Roteiro introdutório sobre atividade e caudas de cometas.
const ETAPAS_COMETAS = [
  {
    titulo: { pt: 'Um cometa é feito de gelo, poeira e rocha', en: 'A comet is made of ice, dust, and rock', es: 'Un cometa está hecho de hielo, polvo y roca' },
    corpo: {
      pt: 'Cometas são pequenos corpos que preservam materiais antigos do Sistema Solar. Seu núcleo reúne gelos, poeira e material rochoso.',
      en: 'Comets are small bodies that preserve ancient material from the solar system. Their nuclei contain ice, dust, and rocky material.',
      es: 'Los cometas son cuerpos pequeños que conservan materiales antiguos del sistema solar. Sus núcleos reúnen hielo, polvo y material rocoso.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 180 }
  },
  {
    titulo: { pt: 'O núcleo é a parte sólida', en: 'The nucleus is the solid part', es: 'El núcleo es la parte sólida' },
    corpo: {
      pt: 'O núcleo é a parte central do cometa. Longe do Sol, seus gelos ficam congelados e o cometa pode parecer apenas um ponto escuro e pequeno.',
      en: 'The nucleus is the comet’s central body. Far from the Sun, its ice stays frozen and the comet may look like a small, dark object.',
      es: 'El núcleo es la parte central del cometa. Lejos del Sol, sus hielos permanecen congelados y el cometa puede parecer un objeto pequeño y oscuro.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 270 }
  },
  {
    titulo: { pt: 'A aproximação do Sol muda tudo', en: 'Moving closer to the Sun changes things', es: 'Acercarse al Sol lo cambia todo' },
    corpo: {
      pt: 'Ao se aproximar do Sol, o cometa recebe mais energia. O aquecimento faz parte do gelo passar diretamente de sólido a gás: isso é sublimação.',
      en: 'As a comet approaches the Sun, it receives more energy. Heating makes some ice turn directly from solid into gas: this is sublimation.',
      es: 'Al acercarse al Sol, el cometa recibe más energía. El calentamiento hace que parte del hielo pase directamente de sólido a gas: eso es sublimación.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 315 }
  },
  {
    titulo: { pt: 'Surge a coma', en: 'The coma appears', es: 'Aparece la coma' },
    corpo: {
      pt: 'O gás que escapa do núcleo, junto com poeira, forma uma nuvem ao redor dele chamada coma. Ela pode crescer muito quando o cometa se aquece.',
      en: 'Gas escaping from the nucleus, along with dust, forms a cloud around it called the coma. It can grow very large as the comet warms.',
      es: 'El gas que escapa del núcleo, junto con polvo, forma una nube a su alrededor llamada coma. Puede crecer mucho cuando el cometa se calienta.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 350 }
  },
  {
    titulo: { pt: 'Gás e poeira formam duas caudas', en: 'Gas and dust form two tails', es: 'El gas y el polvo forman dos colas' },
    corpo: {
      pt: 'O material liberado pode formar uma cauda de íons e outra de poeira. Elas respondem de modos diferentes à luz e às partículas que vêm do Sol.',
      en: 'Released material can form an ion tail and a dust tail. They respond differently to sunlight and particles flowing from the Sun.',
      es: 'El material liberado puede formar una cola de iones y otra de polvo. Responden de manera distinta a la luz y a las partículas que llegan del Sol.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 0 }
  },
  {
    titulo: { pt: 'A cauda de íons aponta para longe do Sol', en: 'The ion tail points away from the Sun', es: 'La cola de iones apunta en dirección opuesta al Sol' },
    corpo: {
      pt: 'O vento solar e o campo magnético interplanetário empurram os gases ionizados. Por isso, a cauda de íons costuma ser fina e quase reta, apontando para longe do Sol.',
      en: 'The solar wind and interplanetary magnetic field push the ionized gas. That is why the ion tail is usually thin and nearly straight, pointing away from the Sun.',
      es: 'El viento solar y el campo magnético interplanetario empujan el gas ionizado. Por eso, la cola de iones suele ser fina y casi recta, apuntando en dirección opuesta al Sol.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 37 }
  },
  {
    titulo: { pt: 'A cauda de poeira pode se curvar', en: 'The dust tail can curve', es: 'La cola de polvo puede curvarse' },
    corpo: {
      pt: 'A pressão da luz solar empurra os grãos de poeira. Como eles também seguem suas próprias órbitas, a cauda de poeira costuma ser mais larga e curva.',
      en: 'Sunlight pushes dust grains away. Because they also follow their own orbits, the dust tail is usually broader and curved.',
      es: 'La presión de la luz solar empuja los granos de polvo. Como también siguen sus propias órbitas, la cola de polvo suele ser más ancha y curva.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 74 }
  },
  {
    titulo: { pt: 'As caudas não ficam sempre atrás do movimento', en: 'Tails do not always trail behind the motion', es: 'Las colas no siempre quedan detrás del movimiento' },
    corpo: {
      pt: 'As duas caudas apontam, em geral, para longe do Sol, não simplesmente para trás do caminho do cometa. Antes e depois da passagem mais próxima do Sol, essa direção pode parecer diferente em relação ao movimento.',
      en: 'Both tails generally point away from the Sun, not simply backward along the comet’s path. Before and after the comet’s closest approach, their direction can look different relative to its motion.',
      es: 'Las dos colas suelen apuntar en dirección opuesta al Sol, no simplemente detrás del recorrido del cometa. Antes y después de su mayor acercamiento al Sol, esa dirección puede verse distinta respecto a su movimiento.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 296 }
  },
  {
    titulo: { pt: 'Halley volta ao Sistema Solar interno', en: 'Halley returns to the inner solar system', es: 'Halley vuelve al sistema solar interior' },
    corpo: {
      pt: 'O cometa Halley passou perto do Sol em 1986 e é esperado novamente em 2061. Sua órbita leva cerca de 76 anos, embora o intervalo varie um pouco pelas influências gravitacionais dos planetas.',
      en: 'Comet Halley passed near the Sun in 1986 and is expected again in 2061. Its orbit takes about 76 years, though the interval varies slightly due to the planets’ gravity.',
      es: 'El cometa Halley pasó cerca del Sol en 1986 y se espera de nuevo en 2061. Su órbita tarda unos 76 años, aunque el intervalo varía un poco por la gravedad de los planetas.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 180 }
  },
  {
    titulo: { pt: 'Explore um modelo didático', en: 'Explore a teaching model', es: 'Explora un modelo didáctico' },
    corpo: {
      pt: 'Arraste o controle para comparar posições e a orientação das caudas. É uma ilustração artística: tamanhos e distâncias não estão em escala, não há calendário da órbita e o modelo não prevê a atividade real do cometa.',
      en: 'Drag the control to compare positions and tail directions. It is an artistic illustration: sizes and distances are not to scale, it has no orbital calendar, and it does not predict the comet’s real activity.',
      es: 'Arrastra el control para comparar posiciones y la orientación de las colas. Es una ilustración artística: los tamaños y las distancias no están a escala, no hay calendario orbital y el modelo no predice la actividad real del cometa.'
    },
    astro: 'halley',
    experimento: { tipo: 'cometas', angulo: 0 }
  }
];

const textosCometas = {
  pt: {
    titulo: 'Como funcionam os cometas?',
    objetivo: 'Núcleo, coma e caudas',
    objetivoTexto: 'Explore como o Sol ativa os cometas e orienta suas duas caudas.',
    perguntaTexto: 'O que faz as caudas de um cometa apontarem para longe do Sol?',
    opcao1: 'O vento solar e a pressão da luz solar',
    opcao2: 'O cometa sempre se move com as caudas atrás dele',
    certo: 'Isso! O vento solar conduz os íons e a luz solar empurra a poeira. As caudas apontam para longe do Sol, não necessariamente para trás do movimento.',
    tentar: 'Pense no que o vento solar faz com os íons e na pressão da luz sobre os grãos de poeira.',
    recapTexto: 'Cometas têm núcleos de gelo, poeira e rocha. Perto do Sol, a sublimação cria uma coma e alimenta caudas de íons e de poeira, que apontam para longe do Sol. O retorno do Halley é esperado em 2061. O modelo é artístico, sem escala, calendário orbital ou previsão de atividade.',
    fonte: 'NASA Science: fatos sobre cometas'
  },
  en: {
    titulo: 'How do comets work?',
    objetivo: 'Nucleus, coma, and tails',
    objetivoTexto: 'Explore how the Sun activates comets and shapes their two tails.',
    perguntaTexto: 'What makes a comet’s tails point away from the Sun?',
    opcao1: 'The solar wind and sunlight pressure',
    opcao2: 'The comet always moves with its tails behind it',
    certo: 'That’s right! The solar wind carries ions away, while sunlight pushes dust. Tails point away from the Sun, not necessarily behind the comet’s motion.',
    tentar: 'Think about what the solar wind does to ions and how sunlight pushes dust grains.',
    recapTexto: 'Comets have nuclei of ice, dust, and rock. Near the Sun, sublimation creates a coma and feeds ion and dust tails that point away from the Sun. Halley is expected to return in 2061. The model is artistic, with no scale, orbital calendar, or activity forecast.',
    fonte: 'NASA Science: comet facts'
  },
  es: {
    titulo: '¿Cómo funcionan los cometas?',
    objetivo: 'Núcleo, coma y colas',
    objetivoTexto: 'Explora cómo el Sol activa los cometas y orienta sus dos colas.',
    perguntaTexto: '¿Qué hace que las colas de un cometa apunten en dirección opuesta al Sol?',
    opcao1: 'El viento solar y la presión de la luz solar',
    opcao2: 'El cometa siempre avanza con las colas detrás',
    certo: '¡Eso es! El viento solar arrastra los iones y la luz solar empuja el polvo. Las colas apuntan en dirección opuesta al Sol, no necesariamente detrás del movimiento.',
    tentar: 'Piensa en lo que el viento solar hace a los iones y en cómo la luz empuja los granos de polvo.',
    recapTexto: 'Los cometas tienen núcleos de hielo, polvo y roca. Cerca del Sol, la sublimación crea una coma y alimenta las colas de iones y polvo, que apuntan en dirección opuesta al Sol. Se espera el regreso de Halley en 2061. El modelo es artístico, sin escala, calendario orbital ni predicción de actividad.',
    fonte: 'NASA Science: datos sobre cometas'
  }
};

export const ROTEIRO_COMETAS = {
  id: 'cometas-guia',
  versao: 1,
  pro: true,
  recurso: 'aprendizado',
  ambiente: 'universo',
  corpo: 'halley',
  urlFonte: 'https://science.nasa.gov/solar-system/comets/facts/',
  fontesAdicionais: [
    { nome: 'NASA · 1P/Halley', url: 'https://science.nasa.gov/solar-system/comets/1p-halley/' },
    { nome: 'NASA · Caudas de cometas', url: 'https://science.nasa.gov/learn/basics-of-space-flight/chapter1-3/' },
    { nome: 'ESA Rosetta · Caudas gêmeas', url: 'https://blogs.esa.int/rosetta/?p=6038' }
  ],
  textos: textosCometas,
  etapas: [
    ...ETAPAS_COMETAS,
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
