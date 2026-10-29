export const MISSAO_PARKER = {
  id: 'parker-sol',
  nave: 'parker',
  nome: {
    pt: 'Parker: mergulho no Sol',
    en: 'Parker: diving into the Sun',
    es: 'Parker: una zambullida en el Sol'
  },
  fontes: [
    { nome: 'NASA Science — Parker Solar Probe', url: 'https://science.nasa.gov/mission/parker-solar-probe/' },
    { nome: 'NASA — Parker Solar Probe Changed the Game Before it Even Launched', url: 'https://www.nasa.gov/solar-system/parker-solar-probe-changed-the-game-before-it-even-launched/' },
    { nome: 'NASA — Traveling to the Sun: Why Won’t Parker Solar Probe Melt?', url: 'https://www.nasa.gov/missions/parker-solar-probe/traveling-to-the-sun-why-wont-parker-solar-probe-melt/' },
    { nome: 'NASA — NASA Enters the Solar Atmosphere for the First Time', url: 'https://www.nasa.gov/solar-system/nasa-enters-the-solar-atmosphere-for-the-first-time-bringing-new-discoveries/' },
    { nome: 'NASA Science — Parker Solar Probe Makes History With Closest Pass to Sun', url: 'https://science.nasa.gov/missions/parker-solar-probe/nasas-parker-solar-probe-makes-history-with-closest-pass-to-sun/' },
    { nome: 'Johns Hopkins APL — The Coolest, Hottest Mission to the Sun', url: 'https://www.jhuapl.edu/news/news-releases/201009b-coolest-hottest-mission-sun' }
  ],
  etapas: [
    {
      titulo: { pt: 'Partida rumo à estrela', en: 'A launch toward a star', es: 'Salida hacia una estrella' },
      texto: {
        pt: 'Em 12 de agosto de 2018, um foguete Delta IV Heavy lançou a sonda Parker da Flórida. Sua missão: chegar perto do Sol e medir diretamente a região ao redor dele.',
        en: 'On August 12, 2018, a Delta IV Heavy rocket launched Parker from Florida. Its mission: get close to the Sun and measure the region around it directly.',
        es: 'El 12 de agosto de 2018, un cohete Delta IV Heavy lanzó a Parker desde Florida. Su misión: acercarse al Sol y medir directamente la región que lo rodea.'
      },
      alvo: 'terra', fase: 'lancamento'
    },
    {
      titulo: { pt: 'Voltas cada vez mais próximas', en: 'Progressively closer orbits', es: 'Órbitas cada vez más cercanas' },
      texto: {
        pt: 'Parker não foi em linha reta. Sua órbita alongada dá voltas ao redor do Sol e passa repetidamente perto de Vênus, que ajuda a moldar o caminho da sonda.',
        en: 'Parker did not travel in a straight line. Its stretched orbit loops around the Sun and repeatedly passes Venus, whose gravity helps shape the spacecraft’s path.',
        es: 'Parker no viajó en línea recta. Su órbita alargada da vueltas alrededor del Sol y pasa repetidamente cerca de Venus, cuya gravedad ayuda a cambiar su ruta.'
      },
      alvo: 'venus', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Vênus muda a órbita', en: 'Venus reshapes the orbit', es: 'Venus cambia la órbita' },
      texto: {
        pt: 'Em cada assistência gravitacional, Parker passa perto de Vênus. A gravidade do planeta altera a rota e reduz a energia orbital da sonda em torno do Sol, preparando uma passagem mais próxima.',
        en: 'At each gravity assist, Parker flies close to Venus. The planet’s gravity changes the route and reduces the probe’s orbital energy around the Sun, setting up a closer pass.',
        es: 'En cada asistencia gravitatoria, Parker pasa cerca de Venus. La gravedad del planeta cambia la ruta y reduce la energía orbital de la sonda alrededor del Sol, preparando un paso más cercano.'
      },
      alvo: 'venus', fase: 'encontro'
    },
    {
      titulo: { pt: 'Menos movimento de lado', en: 'Less sideways motion', es: 'Menos movimiento lateral' },
      texto: {
        pt: 'Para chegar tão perto do Sol, Parker precisa reduzir seu movimento lateral ao redor dele. A gravidade de Vênus ajuda a diminuir sua energia orbital e seu momento angular; assim, o periélio, ponto mais próximo do Sol, fica menor.',
        en: 'To get so close to the Sun, Parker must reduce its sideways motion around it. Venus’s gravity helps lower its orbital energy and angular momentum, bringing its perihelion—the closest point to the Sun—closer.',
        es: 'Para acercarse tanto al Sol, Parker debe reducir su movimiento lateral a su alrededor. La gravedad de Venus ayuda a bajar su energía orbital y su momento angular; así, el perihelio, su punto más cercano al Sol, queda más cerca.'
      },
      alvo: 'venus', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Um escudo de frente', en: 'A shield up front', es: 'Un escudo al frente' },
      texto: {
        pt: 'Um escudo grosso de material composto fica voltado para o Sol. Ele bloqueia a luz intensa e mantém a maior parte da sonda na sombra, protegendo os instrumentos durante cada encontro.',
        en: 'A thick composite shield faces the Sun. It blocks intense sunlight and keeps most of the spacecraft in shadow, protecting the instruments during each encounter.',
        es: 'Un escudo grueso de material compuesto mira hacia el Sol. Bloquea la luz intensa y mantiene a la mayor parte de la sonda en sombra, protegiendo los instrumentos en cada encuentro.'
      },
      alvo: 'sol', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Painéis que se refrescam', en: 'Solar panels that stay cool', es: 'Paneles solares que se enfrían' },
      texto: {
        pt: 'Parker usa painéis solares para obter energia. Ao se aproximar do Sol, eles se recolhem parcialmente atrás do escudo e um sistema com água circulante ajuda a mantê-los resfriados.',
        en: 'Parker uses solar panels for power. As it nears the Sun, they partly retract behind the shield, and a circulating-water system helps keep them cool.',
        es: 'Parker usa paneles solares para obtener energía. Al acercarse al Sol, se retraen parcialmente detrás del escudo y un sistema de agua circulante ayuda a enfriarlos.'
      },
      alvo: 'sol', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'A coroa não é uma superfície', en: 'The corona is not a solid surface', es: 'La corona no es una superficie sólida' },
      texto: {
        pt: 'A coroa é a camada mais externa da atmosfera solar: um gás muito rarefeito, não um chão sólido. Parker atravessa essa região, onde partículas e campos magnéticos viajam para o espaço.',
        en: 'The corona is the outermost layer of the Sun’s atmosphere: a very thin gas, not solid ground. Parker flies through it, where particles and magnetic fields stream into space.',
        es: 'La corona es la capa más externa de la atmósfera solar: un gas muy tenue, no un suelo sólido. Parker la atraviesa, donde partículas y campos magnéticos fluyen hacia el espacio.'
      },
      alvo: 'sol', fase: 'encontro'
    },
    {
      titulo: { pt: 'Temperatura não é calor', en: 'Temperature is not heat', es: 'Temperatura no es calor' },
      texto: {
        pt: 'A coroa pode ter partículas com temperatura de milhões de graus, mas é muito rarefeita. Temperatura descreve o movimento das partículas; calor é a energia que elas transferem. Como há poucas partículas, transferem menos energia à sonda.',
        en: 'The corona can have particles at millions of degrees, yet it is very thin. Temperature describes particle motion; heat is the energy they transfer. Because there are few particles, they transfer less energy to the probe.',
        es: 'La corona puede tener partículas a millones de grados, pero es muy tenue. La temperatura describe el movimiento de las partículas; el calor es la energía que transfieren. Como hay pocas partículas, transfieren menos energía a la sonda.'
      },
      alvo: 'sol', fase: 'encontro'
    },
    {
      titulo: { pt: 'Medir o vento solar', en: 'Measuring the solar wind', es: 'Medir el viento solar' },
      texto: {
        pt: 'Instrumentos medem partículas, campos magnéticos e luz da coroa. Essas pistas ajudam a investigar o vento solar: um fluxo contínuo de partículas que sai do Sol e atravessa o Sistema Solar.',
        en: 'Instruments measure particles, magnetic fields, and light from the corona. These clues help investigate the solar wind: a steady flow of particles streaming from the Sun across the solar system.',
        es: 'Los instrumentos miden partículas, campos magnéticos y luz de la corona. Estas pistas ayudan a estudiar el viento solar: un flujo continuo de partículas que sale del Sol y cruza el sistema solar.'
      },
      alvo: 'sol', fase: 'encontro'
    },
    {
      titulo: { pt: 'A primeira travessia', en: 'The first crossing', es: 'El primer cruce' },
      texto: {
        pt: 'Em 2021, Parker atravessou pela primeira vez a fronteira da coroa chamada superfície crítica de Alfvén. Ali, mediu partículas e campos magnéticos dentro da atmosfera do Sol.',
        en: 'In 2021, Parker crossed the corona’s boundary called the Alfvén critical surface for the first time. There, it measured particles and magnetic fields inside the Sun’s atmosphere.',
        es: 'En 2021, Parker cruzó por primera vez el límite de la corona llamado superficie crítica de Alfvén. Allí midió partículas y campos magnéticos dentro de la atmósfera del Sol.'
      },
      alvo: 'sol', fase: 'encontro'
    },
    {
      titulo: { pt: 'Desafio Parker', en: 'Parker challenge', es: 'Desafío Parker' },
      texto: {
        pt: 'Hora de testar a ideia central da viagem. O que as passagens por Vênus fazem para ajudar Parker a chegar mais perto do Sol?',
        en: 'Time to test the journey’s central idea. What do the Venus flybys do to help Parker get closer to the Sun?',
        es: 'Es hora de comprobar la idea central del viaje. ¿Qué hacen los pasos cerca de Venus para ayudar a Parker a acercarse al Sol?'
      },
      alvo: 'venus', fase: 'recap'
    },
    {
      titulo: { pt: 'Recorde perto do Sol', en: 'A record near the Sun', es: 'Un récord cerca del Sol' },
      texto: {
        pt: 'Em 24 de dezembro de 2024, Parker passou a cerca de 6,1 milhões de quilômetros acima da superfície solar, a maior aproximação já feita por uma nave. A sonda atravessou a coroa protegida pelo escudo, medindo partículas e campos para revelar como o Sol aquece essa atmosfera e lança o vento solar.',
        en: 'On December 24, 2024, Parker flew about 6.1 million kilometers above the Sun’s surface, the closest approach ever made by a spacecraft. Protected by its shield, it crossed the corona and measured particles and fields to reveal how the Sun heats this atmosphere and launches the solar wind.',
        es: 'El 24 de diciembre de 2024, Parker pasó a unos 6,1 millones de kilómetros sobre la superficie solar, el acercamiento mayor realizado por una nave. Protegida por su escudo, cruzó la corona y midió partículas y campos para descubrir cómo el Sol calienta esa atmósfera y lanza el viento solar.',
      },
      alvo: 'sol', fase: 'recap'
    }
  ],
  pergunta: {
    texto: {
      pt: 'Como as passagens perto de Vênus ajudam Parker a chegar mais perto do Sol?',
      en: 'How do the Venus flybys help Parker get closer to the Sun?',
      es: '¿Cómo ayudan los pasos cerca de Venus a que Parker se acerque al Sol?'
    },
    correta: {
      pt: 'A gravidade de Vênus reduz a energia orbital de Parker e aproxima seu periélio do Sol.',
      en: 'Venus’s gravity lowers Parker’s orbital energy and brings its perihelion closer to the Sun.',
      es: 'La gravedad de Venus reduce la energía orbital de Parker y acerca su perihelio al Sol.'
    },
    incorreta: {
      pt: 'Vênus empurra Parker para longe do Sol e aquece seu escudo.',
      en: 'Venus pushes Parker away from the Sun and heats its shield.',
      es: 'Venus aleja a Parker del Sol y calienta su escudo.'
    },
    explicacao: {
      pt: 'A gravidade de Vênus muda a trajetória de Parker e reduz sua energia orbital em torno do Sol. Nessa geometria de encontro, energia e momento angular mudam, levando a um periélio menor, o ponto mais próximo da órbita.',
      en: 'Venus’s gravity changes Parker’s trajectory and reduces its orbital energy around the Sun. In this flyby geometry, energy and angular momentum change, leading to a smaller perihelion, the closest point in its orbit.',
      es: 'La gravedad de Venus cambia la trayectoria de Parker y reduce su energía orbital alrededor del Sol. En esta geometría de encuentro, cambian la energía y el momento angular, dando lugar a un perihelio menor, el punto más cercano de su órbita.'
    }
  },
  investigacao: {
    titulo: { pt: 'Chegar perto para medir, olhar de longe para contextualizar', en: 'Measure up close, observe from afar for context', es: 'Medir de cerca, observar desde lejos para dar contexto' },
    texto: {
      pt: 'Parker combina imagens remotas e medições diretas. O escudo térmico mantém os instrumentos protegidos enquanto a sonda mede partículas e campos na coroa solar. A câmera WISPR usa o escudo para bloquear o brilho do Sol e registrar estruturas maiores antes da passagem. Imagens dão contexto; sensores revelam as propriedades locais do material encontrado.',
      en: 'Parker combines remote images with direct measurements. Its heat shield protects instruments as the spacecraft measures particles and fields in the solar corona. The WISPR camera uses the shield to block the Sun’s glare and image larger structures before the spacecraft passes through them. Images provide context; sensors reveal local properties of the material encountered.',
      es: 'Parker combina imágenes remotas con mediciones directas. Su escudo térmico protege los instrumentos mientras la sonda mide partículas y campos en la corona solar. La cámara WISPR usa el escudo para bloquear el resplandor del Sol y captar estructuras mayores antes de atravesarlas. Las imágenes aportan contexto; los sensores revelan propiedades locales del material encontrado.'
    },
    corpos: [
      { id: 'sol', rotulo: { pt: 'Sol e coroa', en: 'Sun and corona', es: 'Sol y corona' }, pista: { pt: 'Parker mede diretamente partículas e campos ao atravessar a atmosfera externa do Sol.', en: 'Parker directly measures particles and fields as it crosses the Sun’s outer atmosphere.', es: 'Parker mide directamente partículas y campos al cruzar la atmósfera exterior del Sol.' } },
      { id: 'venus', rotulo: { pt: 'Vênus', en: 'Venus', es: 'Venus' }, pista: { pt: 'A gravidade de Vênus ajuda a ajustar a órbita de Parker; o escudo protege os instrumentos no encontro solar.', en: 'Venus’s gravity helps adjust Parker’s orbit; the shield protects its instruments during solar encounters.', es: 'La gravedad de Venus ayuda a ajustar la órbita de Parker; el escudo protege sus instrumentos durante los encuentros solares.' } }
    ],
    pergunta: {
      texto: { pt: 'Uma equipe observa uma ejeção solar em imagens e quer descobrir a velocidade e o campo magnético do material quando ele passa pela sonda. Que desenho de missão é mais útil?', en: 'A team sees a solar eruption in images and wants to find the material’s speed and magnetic field as it passes the spacecraft. Which mission design is most useful?', es: 'Un equipo observa una eyección solar en imágenes y quiere conocer la velocidad y el campo magnético del material al pasar por la sonda. ¿Qué diseño de misión es más útil?' },
      correta: { pt: 'Combinar uma câmera que acompanhe a estrutura com sensores que façam medições diretas quando o material alcançar a sonda.', en: 'Combine a camera that tracks the structure with sensors that make direct measurements when the material reaches the spacecraft.', es: 'Combinar una cámara que siga la estructura con sensores que hagan mediciones directas cuando el material alcance la sonda.' },
      incorreta: { pt: 'Usar somente imagens distantes e deduzir todas as propriedades locais sem sensores.', en: 'Use only distant images and infer all local properties without sensors.', es: 'Usar solo imágenes lejanas y deducir todas las propiedades locales sin sensores.' },
      explicacao: { pt: 'A imagem pode mostrar de onde veio a estrutura e como ela se move em grande escala. Sensores in situ medem propriedades físicas do material no local. Relacionar os dois tipos de dado conecta o panorama à medição direta.', en: 'An image can show where the structure came from and how it moves on a large scale. In-situ sensors measure the material’s physical properties locally. Linking the two kinds of data connects the broad view with direct measurement.', es: 'La imagen puede mostrar de dónde viene la estructura y cómo se mueve a gran escala. Los sensores in situ miden localmente las propiedades físicas del material. Relacionar ambos tipos de datos conecta la vista general con la medición directa.' }
    },
    sintese: {
      pt: 'A estratégia de Parker integra proteção térmica, medições diretas e imagens remotas. As imagens acompanham estruturas maiores; os sensores medem o plasma quando a sonda o encontra. Juntos, esses dados ligam contexto e física local.',
      en: 'Parker’s strategy combines thermal protection, direct measurements, and remote images. Images track larger structures; sensors measure plasma when the spacecraft encounters it. Together, these data link context with local physics.',
      es: 'La estrategia de Parker integra protección térmica, mediciones directas e imágenes remotas. Las imágenes siguen estructuras mayores; los sensores miden el plasma cuando la sonda lo encuentra. Juntos, estos datos conectan el contexto con la física local.'
    },
    fontes: [
      { nome: 'NASA Science — Parker Solar Probe Instruments', url: 'https://science.nasa.gov/mission/parker-solar-probe/parker-solar-probe-instruments/' },
      { nome: 'NASA Science — Parker Solar Probe', url: 'https://science.nasa.gov/mission/parker-solar-probe/' },
      { nome: 'NASA Science — 10 Things to Know About Parker Solar Probe', url: 'https://science.nasa.gov/missions/parker-solar-probe/10-things-to-know-about-parker-solar-probe/' }
    ]
  }
};
