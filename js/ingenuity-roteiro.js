// Roteiro didático do primeiro voo de Ingenuity, com peças agrupadas como no modelo NASA.
const ETAPAS_INGENUITY = [
  {
    titulo: {
      pt: 'A viagem leva Ingenuity até Marte',
      en: 'The journey carries Ingenuity to Mars',
      es: 'El viaje lleva a Ingenuity hasta Marte'
    },
    corpo: {
      pt: 'Ingenuity viaja preso à parte de baixo do rover Perseverance. Assim, o helicóptero atravessa o espaço protegido e chega a Marte junto com seu companheiro robótico.',
      en: 'Ingenuity rides attached beneath the Perseverance rover. The helicopter crosses space protected and reaches Mars with its robotic companion.',
      es: 'Ingenuity viaja sujeto a la parte inferior del rover Perseverance. Así, el helicóptero cruza el espacio protegido y llega a Marte junto a su compañero robótico.'
    },
    pecas: ['body', 'legs', 'solar'],
    helicopterPhase: 'transport'
  },
  {
    titulo: {
      pt: 'O helicóptero é destravado',
      en: 'The helicopter is unlocked',
      es: 'El helicóptero queda desbloqueado'
    },
    corpo: {
      pt: 'Em Marte, o rover descarta a proteção contra detritos. Depois, destrava o sistema que mantém Ingenuity sob seu corpo. A liberação acontece em etapas ao longo de vários dias.',
      en: 'On Mars, the rover discards the debris shield. Then it unlocks the system holding Ingenuity beneath its body. Deployment takes place in stages over several days.',
      es: 'En Marte, el rover desecha la protección contra escombros. Después, desbloquea el sistema que mantiene a Ingenuity bajo su cuerpo. El despliegue sucede por etapas durante varios días.'
    },
    pecas: ['body', 'legs'],
    helicopterPhase: 'unlock'
  },
  {
    titulo: {
      pt: 'As pernas se abrem',
      en: 'The legs unfold',
      es: 'Las patas se despliegan'
    },
    corpo: {
      pt: 'As quatro pernas se abrem para preparar o apoio no solo. O sistema gira o helicóptero para a vertical. A vista simplifica esse movimento; os mecanismos reais de liberação têm mais etapas.',
      en: 'Four legs unfold to prepare for ground support. The system rotates the helicopter upright. This view simplifies the motion; the real release mechanisms involve more steps.',
      es: 'Las cuatro patas se despliegan para preparar el apoyo en el suelo. El sistema gira el helicóptero a la vertical. Esta vista simplifica el movimiento; los mecanismos reales de liberación tienen más etapas.'
    },
    pecas: ['legs', 'body'],
    helicopterPhase: 'deploy'
  },
  {
    titulo: {
      pt: 'Ingenuity é solto perto do chão',
      en: 'Ingenuity is released near the ground',
      es: 'Ingenuity se suelta cerca del suelo'
    },
    corpo: {
      pt: 'O rover abaixa o helicóptero até perto da superfície. Na liberação real, Ingenuity cai os últimos 15 centímetros; uma animação didática pode simplificar esse suporte.',
      en: 'The rover lowers the helicopter close to the surface. In the real release, Ingenuity drops the final 15 centimeters; an educational animation may simplify that support.',
      es: 'El rover baja el helicóptero hasta cerca de la superficie. En la liberación real, Ingenuity cae los últimos 15 centímetros; una animación didáctica puede simplificar ese apoyo.'
    },
    pecas: ['body', 'legs'],
    helicopterPhase: 'release'
  },
  {
    titulo: {
      pt: 'O painel solar recebe luz',
      en: 'The solar panel receives sunlight',
      es: 'El panel solar recibe luz'
    },
    corpo: {
      pt: 'Depois de soltar Ingenuity, Perseverance se afasta para deixar o painel solar receber luz. A energia captada carrega as baterias do helicóptero.',
      en: 'After releasing Ingenuity, Perseverance drives away so sunlight can reach the solar panel. The collected energy charges the helicopter’s batteries.',
      es: 'Después de soltar a Ingenuity, Perseverance se aleja para que la luz llegue al panel solar. La energía captada carga las baterías del helicóptero.'
    },
    pecas: ['solar', 'body'],
    helicopterPhase: 'solar'
  },
  {
    titulo: {
      pt: 'As pás giram em sentidos opostos',
      en: 'The blades spin in opposite directions',
      es: 'Las palas giran en sentidos opuestos'
    },
    corpo: {
      pt: 'Os dois rotores coaxiais aceleram em sentidos opostos. Essa contrarrotação ajuda a equilibrar o helicóptero; a sequência e a velocidade da animação são didáticas.',
      en: 'The two coaxial rotors spin up in opposite directions. This counter-rotation helps balance the helicopter; the animation’s sequence and speed are educational.',
      es: 'Los dos rotores coaxiales aceleran en sentidos opuestos. Esta contrarrotación ayuda a equilibrar el helicóptero; la secuencia y velocidad de la animación son didácticas.'
    },
    pecas: ['rotorLower', 'rotorUpper', 'body'],
    helicopterPhase: 'spin'
  },
  {
    titulo: {
      pt: 'Um voo autônomo paira sobre Marte',
      en: 'An autonomous flight hovers above Mars',
      es: 'Un vuelo autónomo se mantiene sobre Marte'
    },
    corpo: {
      pt: 'Em 19 de abril de 2021, Ingenuity fez o primeiro voo motorizado e controlado em outro planeta. Pairou a 3 metros por cerca de 30 segundos; o voo inteiro durou 39,1 segundos. Não havia joystick em tempo real.',
      en: 'On April 19, 2021, Ingenuity made the first powered, controlled flight on another planet. It hovered at 3 meters for about 30 seconds; the full flight lasted 39.1 seconds. There was no real-time joystick control.',
      es: 'El 19 de abril de 2021, Ingenuity realizó el primer vuelo motorizado y controlado en otro planeta. Se mantuvo a 3 metros unos 30 segundos; el vuelo completo duró 39,1 segundos. No había control con joystick en tiempo real.'
    },
    pecas: ['rotorLower', 'rotorUpper', 'body'],
    helicopterPhase: 'hover'
  },
  {
    titulo: {
      pt: 'O helicóptero pousa com cuidado',
      en: 'The helicopter lands carefully',
      es: 'El helicóptero aterriza con cuidado'
    },
    corpo: {
      pt: 'Após o breve voo, Ingenuity desce e apoia as pernas no solo. A demonstração confirmou que um helicóptero pode voar na atmosfera fina de Marte.',
      en: 'After the brief flight, Ingenuity descends and rests on its legs. The demonstration confirmed that a helicopter can fly in Mars’s thin atmosphere.',
      es: 'Tras el breve vuelo, Ingenuity desciende y apoya las patas en el suelo. La demostración confirmó que un helicóptero puede volar en la tenue atmósfera de Marte.'
    },
    pecas: ['legs', 'body', 'rotorLower', 'rotorUpper'],
    helicopterPhase: 'land'
  }
];

const textos = {
  pt: {
    titulo: 'Ingenuity: um primeiro voo em Marte',
    objetivo: 'Como um helicóptero voa em Marte?',
    objetivoTexto: 'Acompanhe Ingenuity da viagem sob Perseverance ao primeiro voo motorizado e controlado em outro planeta. A Terra começa a 1 hora/s; ajuste o tempo na barra inferior.',
    modeloTitulo: 'Partes do helicóptero Ingenuity',
    modeloAjuda: 'NASA/Brian E. Kumanchik · apoio, cenário e movimentos artísticos. Arraste · pinça.',
    modeloErro: 'Vista 3D indisponível. Abra a ficha de uma peça para continuar.',
    chegada: 'O primeiro voo em outro planeta',
    chegadaTexto: 'Ingenuity voou em Marte em 19 de abril de 2021, como demonstração de tecnologia. Perseverance o levou até Jezero e ajudou a preparar o local; depois, executou voos autônomos, com comunicação retransmitida pelo rover.',
    perguntaTexto: 'Como Ingenuity controlava seus voos em Marte?',
    opcao1: 'Com comandos autônomos preparados antes do voo',
    opcao2: 'Com um piloto usando joystick em tempo real',
    certo: 'Isso! A distância entre Marte e a Terra impede o controle por joystick em tempo real. Ingenuity usava comandos preparados e executava o voo autonomamente.',
    tentar: 'Pense na distância entre a Terra e Marte: um comando não chegaria a tempo para pilotar cada movimento. Você pode tentar de novo.',
    recapTexto: 'Perseverance levou Ingenuity dobrado sob o rover. O sistema de entrega o baixou e o soltou perto do solo; o rover se afastou para liberar luz ao painel solar. Rotores coaxiais giram em sentidos opostos. Em 19 de abril de 2021, Ingenuity pairou por cerca de 30 segundos em seu primeiro voo, com controle autônomo. Movimentos e apoios desta animação são didáticos.',
    fonte: 'Fontes: NASA — primeiro voo, preparação e modelo 3D',
    peca_body: 'Corpo e eletrônica',
    peca_legs: 'Pernas de pouso',
    peca_rotorLower: 'Rotor inferior',
    peca_rotorUpper: 'Rotor superior',
    peca_solar: 'Painel solar'
  },
  en: {
    titulo: 'Ingenuity: a first flight on Mars',
    objetivo: 'How does a helicopter fly on Mars?',
    objetivoTexto: 'Follow Ingenuity from its ride beneath Perseverance to the first powered, controlled flight on another planet. Earth starts at 1 hour/s; adjust time in the bottom bar.',
    modeloTitulo: 'Parts of the Ingenuity helicopter',
    modeloAjuda: 'NASA/Brian E. Kumanchik · artistic support, scenery and motion. Drag · pinch.',
    modeloErro: '3D view unavailable. Open a part information page to continue.',
    chegada: 'The first flight on another planet',
    chegadaTexto: 'Ingenuity flew on Mars on April 19, 2021, as a technology demonstration. Perseverance carried it to Jezero and helped prepare the site; afterward, it flew autonomously while the rover relayed communications.',
    perguntaTexto: 'How did Ingenuity control its flights on Mars?',
    opcao1: 'With autonomous commands prepared before flight',
    opcao2: 'With a pilot using a real-time joystick',
    certo: 'Right! The distance between Mars and Earth rules out real-time joystick control. Ingenuity used prepared commands and carried out its flight autonomously.',
    tentar: 'Think about the distance between Earth and Mars: a command could not arrive in time to pilot every move. You can try again.',
    recapTexto: 'Perseverance carried Ingenuity folded beneath the rover. The delivery system lowered and released it near the ground; the rover moved away to let sunlight reach the solar panel. Coaxial rotors spin in opposite directions. On April 19, 2021, Ingenuity hovered for about 30 seconds on its first flight, under autonomous control. This animation’s motion and support are educational.',
    fonte: 'Sources: NASA — first flight, preparation and 3D model',
    peca_body: 'Body and electronics',
    peca_legs: 'Landing legs',
    peca_rotorLower: 'Lower rotor',
    peca_rotorUpper: 'Upper rotor',
    peca_solar: 'Solar panel'
  },
  es: {
    titulo: 'Ingenuity: un primer vuelo en Marte',
    objetivo: '¿Cómo vuela un helicóptero en Marte?',
    objetivoTexto: 'Sigue a Ingenuity desde su viaje bajo Perseverance hasta el primer vuelo motorizado y controlado en otro planeta. La Tierra comienza a 1 hora/s; ajusta el tiempo en la barra inferior.',
    modeloTitulo: 'Partes del helicóptero Ingenuity',
    modeloAjuda: 'NASA/Brian E. Kumanchik · apoyo, escenario y movimientos artísticos. Arrastra · pellizca.',
    modeloErro: 'Vista 3D no disponible. Abre la ficha de una pieza para continuar.',
    chegada: 'El primer vuelo en otro planeta',
    chegadaTexto: 'Ingenuity voló en Marte el 19 de abril de 2021 como demostración tecnológica. Perseverance lo llevó hasta Jezero y ayudó a preparar el lugar; después, voló de forma autónoma, con comunicaciones retransmitidas por el rover.',
    perguntaTexto: '¿Cómo controlaba Ingenuity sus vuelos en Marte?',
    opcao1: 'Con comandos autónomos preparados antes del vuelo',
    opcao2: 'Con un piloto usando un joystick en tiempo real',
    certo: '¡Eso es! La distancia entre Marte y la Tierra impide el control con joystick en tiempo real. Ingenuity usaba comandos preparados y ejecutaba el vuelo de forma autónoma.',
    tentar: 'Piensa en la distancia entre la Tierra y Marte: un comando no llegaría a tiempo para pilotar cada movimiento. Puedes intentarlo de nuevo.',
    recapTexto: 'Perseverance llevó a Ingenuity plegado bajo el rover. El sistema de entrega lo bajó y soltó cerca del suelo; el rover se alejó para que la luz llegara al panel solar. Los rotores coaxiales giran en sentidos opuestos. El 19 de abril de 2021, Ingenuity se mantuvo en vuelo unos 30 segundos en su primer vuelo, con control autónomo. Los movimientos y apoyos de esta animación son didácticos.',
    fonte: 'Fuentes: NASA — primer vuelo, preparación y modelo 3D',
    peca_body: 'Cuerpo y electrónica',
    peca_legs: 'Patas de aterrizaje',
    peca_rotorLower: 'Rotor inferior',
    peca_rotorUpper: 'Rotor superior',
    peca_solar: 'Panel solar'
  }
};

const ids = ['body', 'legs', 'rotorLower', 'rotorUpper', 'solar'];

export const ROTEIRO_INGENUITY = {
  id: 'ingenuity-voo',
  versao: 1,
  ambiente: 'hangar',
  nave: 'ingenuity',
  pro: true,
  textos,
  pecas: ids.map(id => ({ id, rotulo: `peca_${id}` })),
  urlFonte: 'https://www.nasa.gov/news-release/nasas-ingenuity-mars-helicopter-succeeds-in-historic-first-flight/',
  fontesAdicionais: [
    { nome: 'NASA · Preparação do primeiro voo', url: 'https://www.nasa.gov/news-release/nasa-ingenuity-mars-helicopter-prepares-for-first-flight/' },
    { nome: 'JPL · Ingenuity', url: 'https://www.jpl.nasa.gov/missions/ingenuity/' },
    { nome: 'NASA · Modelo 3D (NASA/Brian E. Kumanchik)', url: 'https://science.nasa.gov/3d-resources/ingenuity-mars-helicopter/' }
  ],
  etapas: [
    { titulo: 'objetivo', corpo: 'objetivoTexto', astro: 'terra' },
    ...ETAPAS_INGENUITY.map((etapa, i) => ({
      ...etapa,
      scenario: 'mars-ground',
      astro: i === 0 ? 'marte' : undefined,
      acao: true,
      pecas: etapa.pecas.map(id => ({ id }))
    })),
    { titulo: 'chegada', corpo: 'chegadaTexto', astro: 'marte' },
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
