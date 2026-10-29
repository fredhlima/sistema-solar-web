// Etapas didáticas da chegada de Perseverance a Marte e de sua missão em Jezero.
export const ETAPAS_PERSEVERANCE = [
  {
    titulo: {
      pt: 'A etapa de cruzeiro chega ao fim',
      en: 'The cruise stage reaches its end',
      es: 'La etapa de crucero llega a su fin'
    },
    corpo: {
      pt: 'Após a viagem entre planetas, a etapa de cruzeiro libera a cápsula que protege o rover. Ela é descartada antes da entrada na atmosfera de Marte.',
      en: 'After the interplanetary journey, the cruise stage releases the capsule that protects the rover. It is discarded before atmospheric entry at Mars.',
      es: 'Tras el viaje interplanetario, la etapa de crucero libera la cápsula que protege al rover. Se desecha antes de entrar en la atmósfera de Marte.'
    },
    pecas: ['cruise', 'backshell', 'heatshield'],
    marsPhase: 'cruise', scenario: 'mars-orbit'
  },
  {
    titulo: {
      pt: 'O escudo térmico enfrenta a atmosfera',
      en: 'The heat shield meets the atmosphere',
      es: 'El escudo térmico entra en la atmósfera'
    },
    corpo: {
      pt: 'A cápsula, formada pelo backshell e pelo escudo térmico, protege o rover e o estágio de descida. O ar comprimido e aquecido à frente da cápsula transfere calor ao escudo.',
      en: 'The capsule, made of the backshell and heat shield, protects the rover and descent stage. Compressed, heated air ahead of the capsule transfers heat to the shield.',
      es: 'La cápsula, formada por el backshell y el escudo térmico, protege al rover y a la etapa de descenso. El aire comprimido y caliente delante de la cápsula transfiere calor al escudo.'
    },
    pecas: ['backshell', 'heatshield', 'rover', 'descent'],
    marsPhase: 'entry', scenario: 'mars-orbit'
  },
  {
    titulo: {
      pt: 'O paraquedas abre em velocidade supersônica',
      en: 'The parachute opens at supersonic speed',
      es: 'El paracaídas se abre a velocidad supersónica'
    },
    corpo: {
      pt: 'Ainda muito rápida, a cápsula abre um grande paraquedas supersônico. Ele freia a descida enquanto o backshell continua ligado ao rover e ao estágio de descida.',
      en: 'Still moving very fast, the capsule deploys a large supersonic parachute. It slows the fall while the backshell remains attached to the rover and descent stage.',
      es: 'Aún a gran velocidad, la cápsula despliega un gran paracaídas supersónico. Este frena la caída mientras el backshell sigue unido al rover y a la etapa de descenso.'
    },
    pecas: ['backshell', 'parachute', 'rover', 'descent'],
    marsPhase: 'parachute', scenario: 'mars-ground'
  },
  {
    titulo: {
      pt: 'O escudo sai e o rover escolhe o terreno',
      en: 'The shield drops as the rover maps the ground',
      es: 'Se desprende el escudo y el rover analiza el terreno'
    },
    corpo: {
      pt: 'O escudo térmico é descartado. O radar mede altura e velocidade. A navegação relativa ao terreno compara imagens do solo para escolher um local seguro na cratera Jezero.',
      en: 'The heat shield is jettisoned. Radar measures height and speed. Terrain-relative navigation compares ground images to help select a safe landing site in Jezero Crater.',
      es: 'Se desprende el escudo térmico. El radar mide altura y velocidad. La navegación relativa al terreno compara imágenes del suelo para elegir un lugar seguro en el cráter Jezero.'
    },
    pecas: ['heatshield', 'backshell', 'rover'],
    marsPhase: 'shield', scenario: 'mars-ground'
  },
  {
    titulo: {
      pt: 'A etapa de descida assume o controle',
      en: 'The descent stage takes control',
      es: 'La etapa de descenso toma el control'
    },
    corpo: {
      pt: 'Perto do solo, o backshell e o paraquedas se separam. A etapa de descida, com motores-foguete, sustenta o rover e reduz a velocidade para preparar a manobra final.',
      en: 'Near the ground, the backshell and parachute separate. The rocket-powered descent stage supports the rover and slows down to prepare for the final maneuver.',
      es: 'Cerca del suelo, el backshell y el paracaídas se separan. La etapa de descenso, impulsada por cohetes, sostiene al rover y frena para preparar la maniobra final.'
    },
    pecas: ['backshell', 'parachute', 'descent', 'rover'],
    marsPhase: 'descent', scenario: 'mars-ground'
  },
  {
    titulo: {
      pt: 'O sky crane baixa o rover por cabos',
      en: 'The sky crane lowers the rover on cables',
      es: 'La grúa aérea baja el rover con cables'
    },
    corpo: {
      pt: 'Pairando acima da superfície, a etapa de descida desenrola cabos e abaixa Perseverance devagar. O rover chega às rodas, sem precisar pousar sobre pernas ou uma plataforma.',
      en: 'Hovering above the surface, the descent stage unwinds cables and slowly lowers Perseverance. The rover reaches the ground on its wheels, without landing on legs or a platform.',
      es: 'Suspendida sobre la superficie, la etapa de descenso desenrolla cables y baja lentamente a Perseverance. El rover llega sobre sus ruedas, sin aterrizar sobre patas ni una plataforma.'
    },
    pecas: ['descent', 'rover'],
    marsPhase: 'skycrane', scenario: 'mars-ground'
  },
  {
    titulo: {
      pt: 'Perseverance pousa; a etapa se afasta',
      en: 'Perseverance lands; the descent stage flies away',
      es: 'Perseverance aterriza; la etapa se aleja'
    },
    corpo: {
      pt: 'Quando o rover toca o solo, os cabos são cortados. A etapa de descida voa para longe e cai a uma distância segura, deixando Perseverance em Marte.',
      en: 'When the rover touches down, the cables are cut. The descent stage flies away and crashes at a safe distance, leaving Perseverance on Mars.',
      es: 'Cuando el rover toca el suelo, se cortan los cables. La etapa de descenso se aleja y cae a una distancia segura, dejando a Perseverance en Marte.'
    },
    pecas: ['descent', 'rover'],
    marsPhase: 'touchdown', scenario: 'mars-ground'
  },
  {
    titulo: {
      pt: 'Jezero abre o próximo capítulo',
      en: 'Jezero begins the next chapter',
      es: 'Jezero abre el próximo capítulo'
    },
    corpo: {
      pt: 'Em Jezero, Perseverance busca sinais de vida microbiana passada e coleta amostras para possível estudo na Terra; vida não foi comprovada. O rover também levou Ingenuity, que iniciou a exploração aérea de Marte.',
      en: 'At Jezero, Perseverance searches for signs of past microbial life and collects samples for possible study on Earth; life has not been confirmed. The rover also carried Ingenuity, which began exploring Mars by air.',
      es: 'En Jezero, Perseverance busca señales de vida microbiana pasada y recoge muestras para estudiarlas quizá en la Tierra; no se ha comprobado vida. El rover también llevó Ingenuity, que comenzó a explorar Marte desde el aire.'
    },
    pecas: ['rover'],
    marsPhase: 'science', scenario: 'mars-ground'
  }
];
