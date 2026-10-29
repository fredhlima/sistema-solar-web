export const MISSAO_VOYAGER = {
  id: 'voyager-viagem',
  nave: 'voyager',
  nome: {
    pt: 'Voyager: viagem entre gigantes',
    en: 'Voyager: a journey among giants',
    es: 'Voyager: viaje entre gigantes'
  },
  fontes: [
    { nome: 'NASA Science — Voyager Mission Overview', url: 'https://science.nasa.gov/mission/voyager/mission-overview/' },
    { nome: 'NASA Science — Voyager Fact Sheet', url: 'https://science.nasa.gov/mission/voyager/fact-sheet/' },
    { nome: 'NASA Science — Voyager Spacecraft', url: 'https://science.nasa.gov/mission/voyager/spacecraft/' },
    { nome: 'NASA Science — Voyager 1', url: 'https://science.nasa.gov/mission/voyager/voyager-1/' },
    { nome: 'NASA Science — Voyager 2', url: 'https://science.nasa.gov/mission/voyager/voyager-2/' },
    { nome: 'NASA JPL — How Do We Know When Voyager Reaches Interstellar Space?', url: 'https://www.jpl.nasa.gov/news/how-do-we-know-when-voyager-reaches-interstellar-space/' },
    { nome: 'NASA JPL — Voyager 2 Enters Interstellar Space', url: 'https://www.jpl.nasa.gov/news/nasas-voyager-2-probe-enters-interstellar-space/' },
    { nome: 'NASA Science — Voyager Golden Record', url: 'https://science.nasa.gov/image-detail/voyager-gold-record-front/' }
  ],
  etapas: [
    {
      titulo: { pt: 'Duas viajantes gêmeas', en: 'Two twin travelers', es: 'Dos viajeras gemelas' },
      texto: {
        pt: 'A NASA enviou duas sondas Voyager para explorar os planetas gigantes. A Voyager 2 partiu primeiro, em 20 de agosto de 1977. A Voyager 1 foi lançada em 5 de setembro, numa rota mais rápida.',
        en: 'NASA sent two Voyager spacecraft to explore the giant planets. Voyager 2 left first, on August 20, 1977. Voyager 1 launched on September 5 on a faster route.',
        es: 'La NASA envió dos sondas Voyager para explorar los planetas gigantes. Voyager 2 partió primero, el 20 de agosto de 1977. Voyager 1 se lanzó el 5 de septiembre por una ruta más rápida.'
      },
      alvo: 'terra', fase: 'lancamento'
    },
    {
      titulo: { pt: 'Uma máquina feita para escutar', en: 'A machine built to listen', es: 'Una máquina hecha para escuchar' },
      texto: {
        pt: 'Câmeras fotografavam os mundos; outros instrumentos mediam campos magnéticos, partículas e ondas. Uma grande antena enviava os dados por rádio à Terra. Assim, a equipe podia estudar lugares que nenhuma pessoa visitaria de perto.',
        en: 'Cameras photographed worlds; other instruments measured magnetic fields, particles, and waves. A large antenna sent data to Earth by radio. This let scientists study places no person could visit up close.',
        es: 'Las cámaras fotografiaban mundos; otros instrumentos medían campos magnéticos, partículas y ondas. Una gran antena enviaba los datos por radio a la Tierra. Así, el equipo estudiaba lugares que nadie podía visitar de cerca.'
      },
      alvo: 'sol', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Energia sem painéis solares', en: 'Power without solar panels', es: 'Energía sin paneles solares' },
      texto: {
        pt: 'Longe do Sol, a luz fica cada vez mais fraca. Cada Voyager usa três geradores RTG: eles transformam em eletricidade o calor produzido pela mudança natural do plutônio-238.',
        en: 'Far from the Sun, sunlight becomes increasingly weak. Each Voyager uses three RTGs: they turn heat from the natural decay of plutonium-238 into electricity.',
        es: 'Lejos del Sol, la luz se vuelve cada vez más débil. Cada Voyager usa tres generadores RTG: convierten en electricidad el calor producido por la desintegración natural del plutonio-238.'
      },
      alvo: 'sol', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Júpiter: nuvens e vulcões', en: 'Jupiter: clouds and volcanoes', es: 'Júpiter: nubes y volcanes' },
      texto: {
        pt: 'As duas sondas passaram por Júpiter em 1979. Observaram faixas de nuvens e luas variadas. A Voyager 1 também viu vulcões ativos em Io: foi a primeira vez que vulcões ativos foram observados além da Terra.',
        en: 'Both spacecraft flew past Jupiter in 1979. They observed bands of clouds and varied moons. Voyager 1 also saw active volcanoes on Io, the first active volcanoes observed beyond Earth.',
        es: 'Las dos sondas pasaron por Júpiter en 1979. Observaron bandas de nubes y lunas variadas. Voyager 1 también vio volcanes activos en Ío: fueron los primeros observados más allá de la Tierra.'
      },
      alvo: 'jupiter', fase: 'encontro'
    },
    {
      titulo: { pt: 'Saturno muda os caminhos', en: 'Saturn changes their paths', es: 'Saturno cambia sus rutas' },
      texto: {
        pt: 'As duas Voyager também visitaram Saturno. A gravidade do planeta ajudou a curvar suas trajetórias. A rota da Voyager 1 passou perto da lua Titã e seguiu para fora do plano dos planetas; por isso, ela não foi a Urano nem a Netuno.',
        en: 'Both Voyagers also visited Saturn. The planet’s gravity helped bend their paths. Voyager 1’s route passed near the moon Titan and headed out of the plane of the planets, so it did not go to Uranus or Neptune.',
        es: 'Las dos Voyager también visitaron Saturno. La gravedad del planeta ayudó a curvar sus rutas. Voyager 1 pasó cerca de la luna Titán y salió del plano de los planetas; por eso no fue a Urano ni a Neptuno.'
      },
      alvo: 'saturno', fase: 'encontro'
    },
    {
      titulo: { pt: 'Um empurrão da gravidade', en: 'A push from gravity', es: 'Un impulso de la gravedad' },
      texto: {
        pt: 'A Voyager 2 tinha uma rota diferente: depois de Saturno, a gravidade a encaminhou para mais dois planetas. Esse uso do movimento de um planeta para mudar a rota de uma sonda é chamado assistência gravitacional.',
        en: 'Voyager 2 had a different route: after Saturn, gravity sent it toward two more planets. Using a planet’s motion to change a spacecraft’s path is called a gravity assist.',
        es: 'Voyager 2 tenía otra ruta: después de Saturno, la gravedad la dirigió hacia dos planetas más. Usar el movimiento de un planeta para cambiar el rumbo de una sonda se llama asistencia gravitatoria.'
      },
      alvo: 'saturno', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Urano, visto de perto', en: 'Uranus, seen up close', es: 'Urano, visto de cerca' },
      texto: {
        pt: 'Em 1986, a Voyager 2 passou por Urano. Até hoje, ela é a única sonda que visitou esse planeta de perto. Suas imagens e medições revelaram novas pistas sobre as nuvens, o campo magnético e as luas de Urano.',
        en: 'In 1986, Voyager 2 flew past Uranus. It remains the only spacecraft to visit the planet up close. Its images and measurements revealed new clues about Uranus’s clouds, magnetic field, and moons.',
        es: 'En 1986, Voyager 2 pasó por Urano. Hasta hoy, es la única sonda que ha visitado el planeta de cerca. Sus imágenes y mediciones revelaron nuevas pistas sobre las nubes, el campo magnético y las lunas de Urano.'
      },
      alvo: 'urano', fase: 'encontro'
    },
    {
      titulo: { pt: 'Netuno: a última parada planetária', en: 'Neptune: the last planetary stop', es: 'Neptuno: la última parada planetaria' },
      texto: {
        pt: 'Em 1989, a Voyager 2 chegou a Netuno, a última parada planetária da viagem. Ela revelou detalhes dos anéis, descobriu luas e observou uma grande tempestade escura. Nenhuma outra sonda passou tão perto de Netuno.',
        en: 'In 1989, Voyager 2 reached Neptune, the journey’s last planetary stop. It revealed ring details, discovered moons, and observed a large dark storm. No other spacecraft has flown close to Neptune.',
        es: 'En 1989, Voyager 2 llegó a Neptuno, la última parada planetaria del viaje. Reveló detalles de los anillos, descubrió lunas y observó una gran tormenta oscura. Ninguna otra sonda se ha acercado tanto a Neptuno.'
      },
      alvo: 'netuno', fase: 'encontro'
    },
    {
      titulo: { pt: 'Uma mensagem para quem encontrar', en: 'A message for whoever finds it', es: 'Un mensaje para quien la encuentre' },
      texto: {
        pt: 'Cada sonda leva um Disco de Ouro: um disco de cobre revestido de ouro com sons, músicas, saudações e imagens da Terra. É uma cápsula do tempo feita como mensagem de boas-vindas, caso alguém o encontre um dia.',
        en: 'Each spacecraft carries a Golden Record: a gold-plated copper disc with sounds, music, greetings, and images from Earth. It is a time capsule made as a welcome message in case someone finds it one day.',
        es: 'Cada sonda lleva un Disco de Oro: un disco de cobre recubierto de oro con sonidos, música, saludos e imágenes de la Tierra. Es una cápsula del tiempo, un mensaje de bienvenida por si alguien lo encuentra algún día.'
      },
      alvo: 'sol', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Para além da bolha do Sol', en: 'Beyond the Sun’s bubble', es: 'Más allá de la burbuja del Sol' },
      texto: {
        pt: 'Muito depois dos planetas, a Voyager 1 cruzou a heliopausa em 2012; a Voyager 2 fez isso em 2018. Ali começa o espaço interestelar. Cruzar essa fronteira não significa sair do Sistema Solar, que se estende muito mais longe.',
        en: 'Long after the planets, Voyager 1 crossed the heliopause in 2012; Voyager 2 did so in 2018. Interstellar space begins there. Crossing that boundary does not mean leaving the solar system, which extends much farther.',
        es: 'Mucho después de los planetas, Voyager 1 cruzó la heliopausa en 2012; Voyager 2 lo hizo en 2018. Allí empieza el espacio interestelar. Cruzar esa frontera no significa salir del sistema solar, que se extiende mucho más lejos.'
      },
      alvo: 'sol', fase: 'interestelar'
    },
    {
      titulo: { pt: 'Hora de relembrar', en: 'Time to remember', es: 'Hora de recordar' },
      texto: {
        pt: 'Você acompanhou uma viagem feita por duas sondas e muitos mundos. Agora, descubra qual das Voyager chegou a Urano e Netuno.',
        en: 'You followed a journey made by two spacecraft and many worlds. Now find out which Voyager reached Uranus and Neptune.',
        es: 'Has seguido un viaje de dos sondas y muchos mundos. Ahora descubre cuál de las Voyager llegó a Urano y Neptuno.'
      },
      alvo: 'netuno', fase: 'recap'
    },
    {
      titulo: { pt: 'Uma viagem que continua', en: 'A journey that continues', es: 'Un viaje que continúa' },
      texto: {
        pt: 'A Voyager 2 foi lançada antes da Voyager 1. As duas visitaram Júpiter e Saturno; só a Voyager 2 passou por Urano e Netuno. Seus instrumentos estudaram mundos e espaço, os RTGs forneceram energia, e a antena enviou descobertas à Terra. As duas cruzaram a heliopausa, a fronteira da bolha do Sol, mas ainda estão dentro do Sistema Solar.',
        en: 'Voyager 2 launched before Voyager 1. Both visited Jupiter and Saturn; only Voyager 2 flew past Uranus and Neptune. Their instruments studied worlds and space, RTGs supplied power, and an antenna sent discoveries to Earth. Both crossed the heliopause, the edge of the Sun’s bubble, but remain within the solar system.',
        es: 'Voyager 2 se lanzó antes que Voyager 1. Ambas visitaron Júpiter y Saturno; solo Voyager 2 pasó por Urano y Neptuno. Sus instrumentos estudiaron mundos y espacio, los RTG dieron energía y una antena envió hallazgos a la Tierra. Ambas cruzaron la heliopausa, el borde de la burbuja solar, pero siguen dentro del sistema solar.'
      },
      alvo: 'sol', fase: 'recap'
    }
  ],
  pergunta: {
    texto: {
      pt: 'Qual Voyager visitou Urano e Netuno?',
      en: 'Which Voyager visited Uranus and Neptune?',
      es: '¿Cuál Voyager visitó Urano y Neptuno?'
    },
    correta: { pt: 'Voyager 2', en: 'Voyager 2', es: 'Voyager 2' },
    incorreta: { pt: 'Voyager 1', en: 'Voyager 1', es: 'Voyager 1' },
    explicacao: {
      pt: 'A Voyager 2 passou por Urano em 1986 e por Netuno em 1989. A rota da Voyager 1 passou por Júpiter e Saturno e seguiu para longe do plano dos planetas.',
      en: 'Voyager 2 flew past Uranus in 1986 and Neptune in 1989. Voyager 1’s route passed Jupiter and Saturn before heading away from the plane of the planets.',
      es: 'Voyager 2 pasó por Urano en 1986 y por Neptuno en 1989. La ruta de Voyager 1 pasó por Júpiter y Saturno antes de alejarse del plano de los planetas.'
    }
  },
  investigacao: {
    titulo: { pt: 'Visitar muitos mundos ou permanecer em órbita?', en: 'Visit many worlds or stay in orbit?', es: '¿Visitar muchos mundos o permanecer en órbita?' },
    texto: {
      pt: 'As Voyager aproveitaram o alinhamento dos planetas gigantes: sobrevoos e assistências gravitacionais permitiram visitar vários mundos e seguir adiante. Juno escolheu permanecer em órbita polar de Júpiter, repetindo passagens próximas para mapear regiões e acompanhar mudanças. Sobrevoos ampliam o alcance; orbitadores oferecem observações recorrentes, mas exigem inserção e operação prolongada. A rota ideal depende das prioridades da missão.',
      en: 'The Voyagers used the giant planets’ alignment: flybys and gravity assists let them visit several worlds and continue onward. Juno chose to remain in polar orbit around Jupiter, repeating close passes to map regions and monitor change. Flybys extend a mission’s reach; orbiters provide recurring observations but require insertion and extended operations. The best route depends on the mission’s priorities.',
      es: 'Las Voyager aprovecharon la alineación de los planetas gigantes: los sobrevuelos y las asistencias gravitatorias les permitieron visitar varios mundos y seguir adelante. Juno eligió permanecer en órbita polar alrededor de Júpiter, repitiendo pasos cercanos para cartografiar regiones y observar cambios. Los sobrevuelos amplían el alcance; los orbitadores ofrecen observaciones repetidas, pero requieren inserción y operaciones prolongadas. La ruta depende de los objetivos.'
    },
    corpos: [
      { id: 'jupiter', rotulo: { pt: 'Júpiter', en: 'Jupiter', es: 'Júpiter' }, pista: { pt: 'Uma passagem por Júpiter pode alterar a trajetória e ajudar uma sonda a continuar pelo sistema.', en: 'A Jupiter flyby can alter a trajectory and help a spacecraft continue through the system.', es: 'Un paso por Júpiter puede cambiar la trayectoria y ayudar a una sonda a continuar por el sistema.' } },
      { id: 'saturno', rotulo: { pt: 'Saturno', en: 'Saturn', es: 'Saturno' }, pista: { pt: 'A Voyager 2 usou sua rota de sobrevoos para seguir de Saturno a Urano e Netuno.', en: 'Voyager 2 used its flyby route to continue from Saturn to Uranus and Neptune.', es: 'Voyager 2 aprovechó su ruta de sobrevuelos para continuar desde Saturno hacia Urano y Neptuno.' } }
    ],
    pergunta: {
      texto: { pt: 'Uma missão tem pouco combustível e precisa passar por três planetas distantes, coletando um conjunto breve de dados em cada um, sem retornar a nenhum. Qual estratégia se ajusta melhor?', en: 'A mission has little fuel and must pass three distant planets, collecting a brief set of data at each without returning to any. Which strategy fits best?', es: 'Una misión tiene poco combustible y debe pasar por tres planetas lejanos, recoger algunos datos en cada uno y no regresar a ninguno. ¿Qué estrategia encaja mejor?' },
      correta: { pt: 'Planejar sobrevoos encadeados e usar assistências gravitacionais para mudar a rota entre os planetas.', en: 'Plan a sequence of flybys and use gravity assists to change course between planets.', es: 'Planificar una secuencia de sobrevuelos y usar asistencias gravitatorias para cambiar de rumbo entre los planetas.' },
      incorreta: { pt: 'Entrar em órbita em cada planeta e esperar para observar repetidamente antes de partir.', en: 'Enter orbit at every planet and wait for repeated observations before departing.', es: 'Entrar en órbita alrededor de cada planeta y esperar para observarlo repetidamente antes de partir.' },
      explicacao: { pt: 'Sobrevoos encadeados combinam encontros de curta duração com mudanças de trajetória causadas pela gravidade dos planetas. Entrar e sair de órbita em todos os alvos exigiria mais manobras e não atenderia à prioridade de seguir adiante com poucas medições em cada mundo.', en: 'Chained flybys combine short encounters with trajectory changes caused by planetary gravity. Entering and leaving orbit at every target would require more maneuvers and would not fit the priority of moving on after a few measurements at each world.', es: 'Los sobrevuelos encadenados combinan encuentros breves con cambios de trayectoria causados por la gravedad planetaria. Entrar y salir de órbita en cada objetivo requeriría más maniobras y no se ajustaría a la prioridad de continuar tras pocas mediciones en cada mundo.' }
    },
    sintese: {
      pt: 'As Voyager usaram encontros rápidos e assistências gravitacionais para alcançar vários planetas; Juno usa uma órbita polar para estudar Júpiter repetidamente. A rota determina quantos destinos são alcançados e por quanto tempo cada um pode ser observado.',
      en: 'The Voyagers used quick encounters and gravity assists to reach several planets; Juno uses a polar orbit to study Jupiter repeatedly. The route determines how many destinations are reached and how long each can be observed.',
      es: 'Las Voyager usaron encuentros rápidos y asistencias gravitatorias para llegar a varios planetas; Juno usa una órbita polar para estudiar Júpiter repetidamente. La ruta determina cuántos destinos se alcanzan y durante cuánto tiempo puede observarse cada uno.'
    },
    fontes: [
      { nome: 'NASA Science — Voyager Planetary Voyage', url: 'https://science.nasa.gov/mission/voyager/planetary-voyage/' },
      { nome: 'NASA Science — Voyager Mission Overview', url: 'https://science.nasa.gov/mission/voyager/mission-overview/' },
      { nome: 'NASA Science — Juno Orbits', url: 'https://science.nasa.gov/mission/juno/juno-orbits/' }
    ]
  }
};
