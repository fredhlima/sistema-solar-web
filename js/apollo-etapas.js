// Etapas didáticas da Apollo 11: uma visão cronológica, sem reproduzir a
// sequência de eventos ou os tempos de voo em escala real.
export const ETAPAS_APOLLO = [
  {
    titulo: { pt: 'Decolagem do Saturno V', en: 'Saturn V liftoff', es: 'Despegue del Saturno V' },
    corpo: {
      pt: 'Os cinco motores do S-IC erguem o Saturno V e a Apollo 11. O foguete ganha velocidade enquanto sobe pela atmosfera.',
      en: 'The five S-IC engines lift Saturn V and Apollo 11. The rocket gains speed as it climbs through the atmosphere.',
      es: 'Los cinco motores del S-IC elevan el Saturno V y el Apollo 11. El cohete gana velocidad mientras asciende por la atmósfera.'
    },
    apolloPhase: 'launch', scenario: 'sky',
    pecas: ['sic'], astro: 'terra'
  },
  {
    titulo: { pt: 'Separação do primeiro estágio', en: 'First-stage separation', es: 'Separación de la primera etapa' },
    corpo: {
      pt: 'Depois de consumir seu propelente, o S-IC se desprende. O S-II assume a aceleração com menos massa para levar.',
      en: 'After using its propellant, the S-IC separates. The S-II takes over the acceleration with less mass to carry.',
      es: 'Después de consumir su propelente, el S-IC se separa. El S-II continúa la aceleración con menos masa que transportar.'
    },
    apolloPhase: 'first-separation', scenario: 'sky',
    pecas: ['sic', 'inter1', 'sii'], astro: 'terra'
  },
  {
    titulo: { pt: 'A torre de escape é descartada', en: 'The escape tower is jettisoned', es: 'Se desprende la torre de escape' },
    corpo: {
      pt: 'Fora da fase mais arriscada da subida, a torre que poderia afastar a cápsula em uma emergência já não é necessária.',
      en: 'Once the most critical part of ascent has passed, the tower that could pull the capsule away in an emergency is no longer needed.',
      es: 'Una vez superada la parte más crítica del ascenso, la torre que podía alejar la cápsula en una emergencia ya no es necesaria.'
    },
    apolloPhase: 'escape', scenario: 'earth',
    pecas: ['les', 'sii'], astro: 'terra'
  },
  {
    titulo: { pt: 'O segundo estágio continua a aceleração', en: 'The second stage continues acceleration', es: 'La segunda etapa continúa la aceleración' },
    corpo: {
      pt: 'O S-II continua acelerando o conjunto em grande altitude. Ao terminar seu trabalho, ele se separa e deixa o estágio superior continuar.',
      en: 'The S-II continues accelerating the stack at high altitude. When its work is done, it separates and lets the upper stage continue.',
      es: 'El S-II sigue acelerando el conjunto a gran altitud. Al terminar su trabajo, se separa y deja que continúe la etapa superior.'
    },
    apolloPhase: 'second-separation', scenario: 'earth',
    pecas: ['sii', 'inter2', 'sivb'], astro: 'terra'
  },
  {
    titulo: { pt: 'Órbita da Terra e sistemas de orientação', en: 'Earth orbit and guidance systems', es: 'Órbita terrestre y sistemas de guiado' },
    corpo: {
      pt: 'O S-IVB completa a colocação em órbita. A unidade de instrumentos (IU) acompanha e orienta o voo; uma nova queima depois prepara a viagem à Lua.',
      en: 'The S-IVB completes orbital insertion. The instrument unit (IU) monitors and guides the flight; a later burn prepares the journey to the Moon.',
      es: 'El S-IVB completa la inserción orbital. La unidad de instrumentos (IU) supervisa y guía el vuelo; una ignición posterior prepara el viaje a la Luna.'
    },
    apolloPhase: 'orbit', scenario: 'earth',
    pecas: ['sivb', 'iu'], astro: 'terra'
  },
  {
    titulo: { pt: 'Transposição e extração do módulo lunar', en: 'Transposition and lunar-module extraction', es: 'Transposición y extracción del módulo lunar' },
    corpo: {
      pt: 'O módulo de comando e serviço se desprende, gira e acopla ao LM guardado no adaptador SLA. Os painéis do adaptador são descartados.',
      en: 'The command and service module separates, turns around, and docks with the LM housed in the SLA adapter. The adapter panels are jettisoned.',
      es: 'El módulo de mando y servicio se separa, gira y se acopla al LM guardado en el adaptador SLA. Se desprenden los paneles del adaptador.'
    },
    apolloPhase: 'extraction', scenario: 'earth',
    pecas: ['sm', 'cm', 'sla', 'lm', 'sivb'], astro: 'terra'
  },
  {
    titulo: { pt: 'Viagem à Lua', en: 'Journey to the Moon', es: 'Viaje a la Luna' },
    corpo: {
      pt: 'Com o LM acoplado, a tripulação segue viagem dentro do conjunto Apollo. O motor do módulo de serviço pode corrigir a trajetória quando necessário.',
      en: 'With the LM docked, the crew travels inside the Apollo stack. The service-module engine can adjust the trajectory when needed.',
      es: 'Con el LM acoplado, la tripulación viaja dentro del conjunto Apollo. El motor del módulo de servicio puede corregir la trayectoria si hace falta.'
    },
    apolloPhase: 'cruise', scenario: 'earth',
    pecas: ['sm', 'cm', 'lm'], astro: 'lua'
  },
  {
    titulo: { pt: 'Entrada em órbita lunar', en: 'Lunar orbit insertion', es: 'Inserción en órbita lunar' },
    corpo: {
      pt: 'Ao chegar à Lua, o motor do módulo de serviço reduz a velocidade do conjunto. A gravidade lunar passa a manter a nave em órbita.',
      en: 'At the Moon, the service-module engine slows the spacecraft stack. Lunar gravity then keeps the vehicle in orbit.',
      es: 'Al llegar a la Luna, el motor del módulo de servicio reduce la velocidad del conjunto. La gravedad lunar mantiene la nave en órbita.'
    },
    apolloPhase: 'lunar-orbit', scenario: 'moon-orbit',
    pecas: ['sm', 'cm', 'lm'], astro: 'lua'
  },
  {
    titulo: { pt: 'O LM desce e pousa', en: 'The LM descends and lands', es: 'El LM desciende y aterriza' },
    corpo: {
      pt: 'Armstrong e Aldrin descem no Eagle. Collins fica em órbita no Columbia. O motor de descida freia o módulo até a superfície lunar.',
      en: 'Armstrong and Aldrin descend in Eagle. Collins stays in orbit in Columbia. The descent engine slows the module to the lunar surface.',
      es: 'Armstrong y Aldrin descienden en Eagle. Collins permanece en órbita en Columbia. El motor de descenso frena el módulo hasta la superficie lunar.'
    },
    apolloPhase: 'landing', scenario: 'moon-ground',
    pecas: ['lm'], astro: 'lua'
  },
  {
    titulo: { pt: 'Subida e reencontro', en: 'Ascent and rendezvous', es: 'Ascenso y reencuentro' },
    corpo: {
      pt: 'Depois da exploração, o estágio de subida do LM decola e encontra o módulo de comando em órbita. A base de descida fica na Lua; Armstrong e Aldrin reencontram Collins no Columbia.',
      en: 'After exploration, the LM ascent stage lifts off and meets the command module in orbit. The descent stage stays on the Moon; Armstrong and Aldrin rejoin Collins in Columbia.',
      es: 'Después de la exploración, la etapa de ascenso del LM despega y se reúne con el módulo de mando en órbita. La etapa de descenso queda en la Luna; Armstrong y Aldrin se reúnen con Collins en Columbia.'
    },
    apolloPhase: 'ascent', scenario: 'moon-ground',
    pecas: ['lm', 'sm', 'cm'], astro: 'lua'
  },
  {
    titulo: { pt: 'Injeção para a volta à Terra', en: 'Departure burn for Earth', es: 'Encendido de regreso a la Tierra' },
    corpo: {
      pt: 'O estágio de subida do LM é descartado antes da partida. Com a tripulação reunida, o módulo de serviço queima seu motor para deixar a órbita lunar.',
      en: 'The LM ascent stage is jettisoned before departure. With the crew reunited, the service module fires its engine to leave lunar orbit.',
      es: 'La etapa de ascenso del LM se separa antes de la partida. Con la tripulación reunida, el módulo de servicio enciende su motor para salir de la órbita lunar.'
    },
    apolloPhase: 'departure', scenario: 'moon-orbit',
    pecas: ['sm', 'cm', 'lm'], astro: 'lua'
  },
  {
    titulo: { pt: 'Retorno pelo espaço', en: 'Coast back through space', es: 'Trayecto de regreso por el espacio' },
    corpo: {
      pt: 'A nave segue em direção à Terra. Pequenas correções ajudam a alinhar a trajetória para a chegada e a entrada na atmosfera.',
      en: 'The spacecraft heads toward Earth. Small course corrections help line up its path for arrival and atmospheric entry.',
      es: 'La nave se dirige a la Tierra. Pequeñas correcciones ayudan a alinear la trayectoria para la llegada y la entrada en la atmósfera.'
    },
    apolloPhase: 'return', scenario: 'earth',
    pecas: ['sm', 'cm'], astro: 'terra'
  },
  {
    titulo: { pt: 'Separação e reentrada', en: 'Separation and reentry', es: 'Separación y reentrada' },
    corpo: {
      pt: 'O módulo de serviço se separa. A cápsula CM usa o escudo térmico para atravessar a atmosfera antes de abrir os paraquedas.',
      en: 'The service module separates. The CM capsule uses its heat shield to cross the atmosphere before opening the parachutes.',
      es: 'El módulo de servicio se separa. La cápsula CM usa su escudo térmico para atravesar la atmósfera antes de abrir los paracaídas.'
    },
    apolloPhase: 'reentry', scenario: 'earth',
    pecas: ['sm', 'cm'], astro: 'terra'
  },
  {titulo:{pt:'Três paraquedas sobre o Pacífico',en:'Three parachutes over the Pacific',es:'Tres paracaídas sobre el Pacífico'},corpo:{pt:'Depois da reentrada e da estabilização por paraquedas menores, três paraquedas principais laranja e brancos abrem e desaceleram Columbia sobre o mar. A vista simplifica o sistema completo.',en:'After reentry and stabilization by smaller drogue parachutes, three orange-and-white main parachutes open and slow Columbia over the ocean. This view simplifies the complete system.',es:'Tras la reentrada y la estabilización mediante paracaídas menores, tres paracaídas principales naranjas y blancos se abren y frenan Columbia sobre el mar. La vista simplifica el sistema completo.'},pecas:['cm'],astro:'terra',apolloPhase:'parachutes',scenario:'ocean'},
  {titulo:{pt:'Columbia flutua no mar',en:'Columbia floats at sea',es:'Columbia flota en el mar'},corpo:{pt:'A cápsula ameriza no Pacífico. Na Apollo 11 ela virou; bolsas infláveis a endireitaram. Depois, mergulhadores instalaram o colar de flutuação. A cena final reúne esses dispositivos, já sem os paraquedas, enquanto a tripulação aguarda o resgate.',en:'The capsule splashes down in the Pacific. Apollo 11 tipped over; inflatable bags righted it. Divers then fitted the flotation collar. The final scene combines these devices, with parachutes released, as the crew awaits recovery.',es:'La cápsula ameriza en el Pacífico. Apollo 11 se volcó; bolsas inflables la enderezaron. Después, buzos instalaron el collar de flotación. La escena final reúne estos dispositivos, sin los paracaídas, mientras la tripulación espera el rescate.'},pecas:['cm'],astro:'terra',apolloPhase:'floating',scenario:'ocean'}
];
