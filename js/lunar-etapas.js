// Etapas didáticas da jornada do módulo lunar da Apollo 11.
export const ETAPAS_LUNAR = [
  {
    titulo: { pt: 'O Eagle se separa do Columbia', en: 'Eagle separates from Columbia', es: 'Eagle se separa de Columbia' },
    corpo: {
      pt: 'Armstrong e Aldrin entram no Eagle e se separam do Columbia. Collins permanece na nave em órbita lunar, enquanto o módulo lunar inicia a descida.',
      en: 'Armstrong and Aldrin enter Eagle and separate from Columbia. Collins stays aboard the spacecraft in lunar orbit while the lunar module begins its descent.',
      es: 'Armstrong y Aldrin entran en Eagle y se separan de Columbia. Collins permanece en la nave en órbita lunar mientras el módulo lunar inicia el descenso.'
    },
    lunarPhase: 'separation', scenario: 'moon-orbit',
    pecas: ['descent', 'ascent', 'legs', 'antennas']
  },
  {
    titulo: { pt: 'O motor controla a descida', en: 'The engine controls the descent', es: 'El motor controla el descenso' },
    corpo: {
      pt: 'O motor do estágio de descida pode ser regulado. Ele reduz a velocidade do Eagle e ajuda os astronautas a escolher um local seguro para pousar.',
      en: 'The descent-stage engine can be throttled. It slows Eagle and helps the astronauts choose a safe place to land.',
      es: 'El motor de la etapa de descenso puede regularse. Reduce la velocidad de Eagle y ayuda a los astronautas a elegir un lugar seguro para aterrizar.'
    },
    lunarPhase: 'descent', scenario: 'moon-ground',
    pecas: ['descent', 'engine']
  },
  {
    titulo: { pt: 'As pernas tocam a Lua', en: 'The legs touch the Moon', es: 'Las patas tocan la Luna' },
    corpo: {
      pt: 'As quatro pernas largas apoiam o módulo no solo. O estágio de descida fica na Lua e serve de base para os astronautas saírem e explorarem.',
      en: 'The four wide legs support the module on the ground. The descent stage stays on the Moon and serves as a base for the astronauts to explore.',
      es: 'Las cuatro patas anchas sostienen el módulo en el suelo. La etapa de descenso queda en la Luna y sirve de base para que los astronautas exploren.'
    },
    lunarPhase: 'landed', scenario: 'moon-ground',
    pecas: ['descent', 'ascent', 'legs', 'engine', 'antennas'],
    visibleParts: ['descent', 'ascent', 'legs', 'engine', 'antennas']
  },
  {
    titulo: { pt: 'A escada leva à superfície', en: 'The ladder leads to the surface', es: 'La escalera lleva a la superficie' },
    corpo: {
      pt: 'Armstrong desce pela escada e pisa na Lua. Aldrin vem depois. Eles observam o terreno, tiram fotos e recolhem amostras para estudar na Terra.',
      en: 'Armstrong climbs down the ladder and steps onto the Moon. Aldrin follows. They observe the ground, take pictures, and collect samples to study on Earth.',
      es: 'Armstrong baja por la escalera y pisa la Luna. Aldrin lo sigue. Observan el terreno, toman fotos y recogen muestras para estudiarlas en la Tierra.'
    },
    lunarPhase: 'surface', scenario: 'moon-ground',
    pecas: ['descent', 'legs', 'antennas']
  },
  {
    titulo: { pt: 'Rádio e radar ajudam a missão', en: 'Radio and radar help the mission', es: 'La radio y el radar ayudan a la misión' },
    corpo: {
      pt: 'As antenas ajudam a enviar e receber sinais de rádio. O radar de encontro ajuda a medir a posição relativa do Columbia para o reencontro em órbita.',
      en: 'The antennas help send and receive radio signals. The rendezvous radar helps measure Columbia’s relative position for the meeting in orbit.',
      es: 'Las antenas ayudan a enviar y recibir señales de radio. El radar de encuentro ayuda a medir la posición relativa de Columbia para el reencuentro en órbita.'
    },
    lunarPhase: 'surface', scenario: 'moon-ground',
    pecas: ['descent', 'antennas']
  },
  {
    titulo: { pt: 'O estágio de subida decola', en: 'The ascent stage lifts off', es: 'La etapa de ascenso despega' },
    corpo: {
      pt: 'Após a exploração, o estágio de subida leva Armstrong e Aldrin de volta à órbita. A base, as pernas e o motor de descida permanecem na Lua.',
      en: 'After exploration, the ascent stage carries Armstrong and Aldrin back to orbit. The base, legs, and descent engine remain on the Moon.',
      es: 'Después de explorar, la etapa de ascenso lleva a Armstrong y Aldrin de vuelta a la órbita. La base, las patas y el motor de descenso permanecen en la Luna.'
    },
    lunarPhase: 'ascent', scenario: 'moon-ground',
    pecas: ['ascent', 'descent', 'legs', 'antennas'],
    lunarAscent: true
  },
  {
    titulo: { pt: 'Eagle reencontra Columbia', en: 'Eagle meets Columbia again', es: 'Eagle se reúne con Columbia' },
    corpo: {
      pt: 'O estágio de subida encontra e se acopla ao Columbia. Armstrong e Aldrin passam para a nave de Collins, levando as amostras e os registros da exploração.',
      en: 'The ascent stage meets and docks with Columbia. Armstrong and Aldrin move into Collins’s spacecraft, bringing the samples and records from their exploration.',
      es: 'La etapa de ascenso encuentra a Columbia y se acopla a ella. Armstrong y Aldrin pasan a la nave de Collins con las muestras y los registros de la exploración.'
    },
    lunarPhase: 'rendezvous', scenario: 'moon-orbit',
    pecas: ['ascent']
  },
  {
    titulo: { pt: 'A tripulação segue de volta', en: 'The crew begins the return', es: 'La tripulación inicia el regreso' },
    corpo: {
      pt: 'Com os três astronautas reunidos no Columbia, o estágio de subida é descartado antes da viagem de volta. O módulo de serviço prepara a partida rumo à Terra.',
      en: 'With all three astronauts together in Columbia, the ascent stage is jettisoned before the return trip. The service module prepares departure toward Earth.',
      es: 'Con los tres astronautas reunidos en Columbia, la etapa de ascenso se desecha antes del viaje de regreso. El módulo de servicio prepara la partida hacia la Tierra.'
    },
    lunarPhase: 'discard', scenario: 'moon-orbit',
    pecas: ['ascent']
  }
];
