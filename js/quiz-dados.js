export const QUIZ_PACOTES = [
  {
    id: 'planetas',
    icone: '◐',
    nome: { pt: 'Planetas', en: 'Planets', es: 'Planetas' },
    perguntas: [
      {
        id: 'planetas-1',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o planeta mais próximo do Sol?',
          en: 'Which is the closest planet to the Sun?',
          es: '¿Cuál es el planeta más cercano al Sol?'
        },
        opcoes: {
          pt: ['Vênus', 'Mercúrio', 'Terra', 'Marte'],
          en: ['Venus', 'Mercury', 'Earth', 'Mars'],
          es: ['Venus', 'Mercurio', 'Tierra', 'Marte']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Mercúrio é o 1º planeta solar. Apesar de estar próximo ao Sol, Vênus é mais quente porque sua atmosfera grossa cria um efeito estufa gigante.',
          en: 'Mercury is the 1st planet from the Sun. Even though it is closest, Venus is actually hotter because its thick atmosphere creates a runaway greenhouse effect.',
          es: 'Mercurio es el 1er planeta desde el Sol. Aunque está más cerca, Venus es realmente más caliente porque su atmósfera densa causa un efecto invernadero descontrolado.'
        }
      },
      {
        id: 'planetas-2',
        tipo: 'multipla',
        texto: {
          pt: 'Qual planeta é conhecido como o "planeta vermelho"?',
          en: 'Which planet is known as the "red planet"?',
          es: '¿Cuál planeta es conocido como el "planeta rojo"?'
        },
        opcoes: {
          pt: ['Vênus', 'Marte', 'Júpiter', 'Netuno'],
          en: ['Venus', 'Mars', 'Jupiter', 'Neptune'],
          es: ['Venus', 'Marte', 'Júpiter', 'Neptuno']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Marte é vermelho por causa do óxido de ferro (ferrugem) em sua superfície. É o quarto planeta e alvo principal da exploração espacial futura.',
          en: 'Mars is red because of iron oxide (rust) covering its surface. It is the 4th planet and the primary target for future human space exploration.',
          es: 'Marte es rojo por el óxido de hierro (herrumbre) que cubre su superficie. Es el 4º planeta y el objetivo principal de la futura exploración espacial.'
        }
      },
      {
        id: 'planetas-3',
        tipo: 'multipla',
        texto: {
          pt: 'Quantas luas tem Saturno? (aproximadamente)',
          en: 'How many moons does Saturn have? (approximately)',
          es: '¿Cuántas lunas tiene Saturno? (aproximadamente)'
        },
        opcoes: {
          pt: ['8', '30', '95', '146'],
          en: ['8', '30', '95', '146'],
          es: ['8', '30', '95', '146']
        },
        corretaIndex: 3,
        explicacao: {
          pt: 'Saturno tem 146 luas conhecidas! Destas, as mais famosas são Titã (a única com atmosfera densa) e Encélado (que dispara água gelada).',
          en: 'Saturn has 146 known moons! Among these, the most famous are Titan (the only one with a dense atmosphere) and Enceladus (which shoots out frozen water).',
          es: 'Saturno tiene 146 lunas conocidas. Entre ellas, las más famosas son Titán (la única con atmósfera densa) y Encélado (que dispara agua congelada).'
        }
      },
      {
        id: 'planetas-4',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o planeta maior do sistema solar?',
          en: 'Which is the largest planet in our solar system?',
          es: '¿Cuál es el planeta más grande del sistema solar?'
        },
        opcoes: {
          pt: ['Saturno', 'Netuno', 'Júpiter', 'Urano'],
          en: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
          es: ['Saturno', 'Neptuno', 'Júpiter', 'Urano']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Júpiter é o rei dos planetas! Caberiam 1.300 Terras dentro dele. Tem uma Grande Mancha Vermelha que é uma tempestade colossal durando séculos.',
          en: 'Jupiter is the king of planets! 1,300 Earths could fit inside it. It has a Great Red Spot which is a colossal storm lasting for centuries.',
          es: 'Júpiter es el rey de los planetas. Caberían 1.300 Tierras dentro de él. Tiene una Gran Mancha Roja que es una tormenta colosal durando siglos.'
        }
      },
      {
        id: 'planetas-5',
        tipo: 'multipla',
        texto: {
          pt: 'Qual desses planetas tem anéis?',
          en: 'Which of these planets has rings?',
          es: '¿Cuál de estos planetas tiene anillos?'
        },
        opcoes: {
          pt: ['Netuno', 'Júpiter', 'Saturno', 'Urano'],
          en: ['Neptune', 'Jupiter', 'Saturn', 'Uranus'],
          es: ['Neptuno', 'Júpiter', 'Saturno', 'Urano']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Saturno é famoso por seus anéis espetaculares feitos de gelo e rocha. Na verdade, todos os gigantes gasosos têm anéis, mas os de Saturno são os mais visíveis.',
          en: 'Saturn is famous for its spectacular rings made of ice and rock. Actually, all gas giants have rings, but Saturn\'s are the most visible.',
          es: 'Saturno es famoso por sus anillos espectaculares hechos de hielo y roca. De hecho, todos los gigantes gaseosos tienen anillos, pero los de Saturno son los más visibles.'
        }
      },
      {
        id: 'planetas-6',
        tipo: 'multipla',
        texto: {
          pt: 'Quanto tempo a Terra leva para orbitar o Sol?',
          en: 'How long does it take Earth to orbit the Sun?',
          es: '¿Cuánto tiempo tarda la Tierra en orbitar el Sol?'
        },
        opcoes: {
          pt: ['365,25 dias', '270 dias', '450 dias', '730 dias'],
          en: ['365.25 days', '270 days', '450 days', '730 days'],
          es: ['365,25 días', '270 días', '450 días', '730 días']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'A Terra leva exatamente 365,25 dias para dar uma volta completa ao redor do Sol. Esse quarto de dia extra é por isso que temos anos bissextos a cada 4 anos.',
          en: 'Earth takes exactly 365.25 days to complete one orbit around the Sun. That extra quarter day is why we have leap years every 4 years.',
          es: 'La Tierra tarda exactamente 365,25 días en completar una órbita alrededor del Sol. Ese cuarto de día extra es por eso que tenemos años bisiestos cada 4 años.'
        }
      },
      {
        id: 'planetas-7',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o planeta mais quente do sistema solar.',
          en: 'Find the hottest planet in our solar system.',
          es: 'Encuentra el planeta más caliente del sistema solar.'
        },
        alvoId: 'venus',
        dica: {
          pt: 'É o segundo planeta, conhecido como a "Estrela da Manhã".',
          en: 'It is the 2nd planet, known as the "Morning Star".',
          es: 'Es el 2º planeta, conocido como la "Estrella de la Mañana".'
        },
        explicacao: {
          pt: 'Vênus é mais quente que Mercúrio apesar de estar mais longe do Sol, porque sua atmosfera densa de CO₂ aprisionou o calor num efeito estufa extremo. Sua temperatura alcança 462°C.',
          en: 'Venus is hotter than Mercury despite being farther from the Sun because its thick CO₂ atmosphere traps heat in an extreme greenhouse effect reaching 462°C.',
          es: 'Venus es más caliente que Mercurio a pesar de estar más lejos del Sol porque su atmósfera densa de CO₂ atrapa el calor en un efecto invernadero extremo de 462°C.'
        }
      },
      {
        id: 'planetas-8',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o planeta com o maior vulcão do sistema solar.',
          en: 'Find the planet with the largest volcano in our solar system.',
          es: 'Encuentra el planeta con el volcán más grande del sistema solar.'
        },
        alvoId: 'marte',
        dica: {
          pt: 'É o quarto planeta, e tem o vulcão Olympus Mons com 21 km de altura.',
          en: 'It is the 4th planet, and has Olympus Mons volcano rising 21 km high.',
          es: 'Es el 4º planeta, y tiene el volcán Olympus Mons que se eleva 21 km de altura.'
        },
        explicacao: {
          pt: 'Marte tem Olympus Mons, um vulcão escudo com 21 km de altura e 600 km de largura — 4 vezes maior que o Monte Everest! É o maior vulcão conhecido do sistema solar.',
          en: 'Mars has Olympus Mons, a shield volcano 21 km high and 600 km wide — 4 times taller than Mount Everest! It is the largest known volcano in the solar system.',
          es: 'Marte tiene el Olympus Mons, un volcán escudo de 21 km de altura y 600 km de ancho — ¡4 veces más alto que el Monte Everest! Es el volcán más grande conocido del sistema solar.'
        }
      },
      {
        id: 'planetas-9',
        tipo: 'multipla',
        texto: {
          pt: 'Qual planeta tem seu eixo inclinado mais de 90 graus, girando praticamente deitado?',
          en: 'Which planet is tilted more than 90 degrees, spinning practically on its side?',
          es: '¿Cuál planeta está inclinado más de 90 grados, girando prácticamente de lado?'
        },
        opcoes: {
          pt: ['Saturno', 'Urano', 'Netuno', 'Marte'],
          en: ['Saturn', 'Uranus', 'Neptune', 'Mars'],
          es: ['Saturno', 'Urano', 'Neptuno', 'Marte']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Urano tem inclinação axial de 98 graus — gira praticamente deitado! Ninguém tem certeza por quê, mas acredita-se que um impacto gigante no passado virou o planeta de lado.',
          en: 'Uranus has an axial tilt of 98 degrees — it spins practically on its side! No one is sure why, but scientists believe a giant collision long ago knocked the planet sideways.',
          es: 'Urano tiene una inclinación axial de 98 grados — ¡gira prácticamente de lado! Nadie está seguro de por qué, pero se cree que una colisión gigante en el pasado volcó el planeta.'
        }
      },
      {
        id: 'planetas-10',
        tipo: 'multipla',
        texto: {
          pt: 'Qual desses planetas tem a órbita mais oval (excêntrica)?',
          en: 'Which of these planets has the most oval-shaped orbit?',
          es: '¿Cuál de estos planetas tiene la órbita más ovalada?'
        },
        opcoes: {
          pt: ['Vênus', 'Marte', 'Mercúrio', 'Terra'],
          en: ['Venus', 'Mars', 'Mercury', 'Earth'],
          es: ['Venus', 'Marte', 'Mercurio', 'Tierra']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Marte tem excentricidade 0,0934 — sua órbita é bem mais oval que a da Terra (0,0167). Isto significa que Marte está às vezes bem mais perto do Sol e outras vezes bem mais longe.',
          en: 'Mars has an eccentricity of 0.0934 — its orbit is much more oval than Earth\'s (0.0167). This means Mars is sometimes much closer to the Sun and other times much farther away.',
          es: 'Marte tiene una excentricidad de 0,0934 — su órbita es mucho más ovalada que la de la Tierra (0,0167). Esto significa que Marte está a veces mucho más cerca del Sol y otras veces mucho más lejos.'
        }
      },
      {
        id: 'planetas-11',
        tipo: 'multipla',
        texto: {
          pt: 'Em qual planeta um dia (rotação) é mais longo que um ano (órbita)?',
          en: 'On which planet is a day longer than a year?',
          es: '¿En cuál planeta un día es más largo que un año?'
        },
        opcoes: {
          pt: ['Mercúrio', 'Vênus', 'Terra', 'Marte'],
          en: ['Mercury', 'Venus', 'Earth', 'Mars'],
          es: ['Mercurio', 'Venus', 'Tierra', 'Marte']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Vênus gira tão lentamente (243 dias terrestres para um dia) que seu ano (224,7 dias) é mais curto que seu dia! É um dos fatos mais estranhos do sistema solar.',
          en: 'Venus rotates so slowly (243 Earth days for one day) that its year (224.7 days) is shorter than its day! It is one of the strangest facts in our solar system.',
          es: 'Venus gira tan lentamente (243 días terrestres para un día) que su año (224,7 días) es más corto que su día. ¡Es uno de los hechos más extraños del sistema solar!'
        }
      },
      {
        id: 'planetas-12',
        tipo: 'multipla',
        texto: {
          pt: 'Qual planeta é o MENOS denso, tão pouco denso que flutuaria na água?',
          en: 'Which planet is the LEAST dense, so light it would float in water?',
          es: '¿Cuál planeta es el MENOS denso, tan ligero que flotaría en agua?'
        },
        opcoes: {
          pt: ['Júpiter', 'Saturno', 'Netuno', 'Urano'],
          en: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'],
          es: ['Júpiter', 'Saturno', 'Neptuno', 'Urano']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Saturno é menos denso que a água! Tem apenas 0,687 g/cm³. Se você tivesse uma banheira cósmica gigantesca, Saturno flutuaria como um brinquedo flutuador.',
          en: 'Saturn is less dense than water! It has only 0.687 g/cm³. If you had a giant cosmic bathtub, Saturn would float like a bath toy.',
          es: 'Saturno es menos denso que el agua. Solo tiene 0,687 g/cm³. Si tuvieras una bañera cósmica gigante, Saturno flotaría como un juguete flotante.'
        }
      },
      {
        id: 'planetas-13',
        tipo: 'multipla',
        texto: {
          pt: 'Qual planeta completa uma órbita ao redor do Sol em apenas 88 dias?',
          en: 'Which planet completes an orbit around the Sun in just 88 days?',
          es: '¿Cuál planeta completa una órbita alrededor del Sol en solo 88 días?'
        },
        opcoes: {
          pt: ['Vênus', 'Mercúrio', 'Terra', 'Marte'],
          en: ['Venus', 'Mercury', 'Earth', 'Mars'],
          es: ['Venus', 'Mercurio', 'Tierra', 'Marte']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Mercúrio é o mais rápido — orbita o Sol em apenas 87,97 dias. Por isso os romanos o chamaram de "Mercúrio", o mensageiro dos deuses, por se mover tão rapidamente pelo céu.',
          en: 'Mercury is the fastest — it orbits the Sun in only 87.97 days. That is why the Romans named it "Mercury," the messenger god, because of how quickly it moves across the sky.',
          es: 'Mercurio es el más rápido — orbita el Sol en solo 87,97 días. Por eso los romanos lo llamaron "Mercurio", el mensajero de los dioses, por su rápido movimiento por el cielo.'
        }
      },
      {
        id: 'planetas-14',
        tipo: 'multipla',
        texto: {
          pt: 'Qual planeta leva quase 30 anos para dar uma volta completa ao redor do Sol?',
          en: 'Which planet takes almost 30 years to complete one orbit around the Sun?',
          es: '¿Cuál planeta tarda casi 30 años en completar una órbita alrededor del Sol?'
        },
        opcoes: {
          pt: ['Júpiter', 'Saturno', 'Urano', 'Netuno'],
          en: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
          es: ['Júpiter', 'Saturno', 'Urano', 'Neptuno']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Saturno leva 29,46 anos para orbitar o Sol. Isto significa que uma pessoa que nasceu quando Saturno passava em um ponto da órbita estaria quase com 30 anos quando o planeta voltaria ao mesmo lugar!',
          en: 'Saturn takes 29.46 years to orbit the Sun. This means a person born when Saturn was at a certain position would be almost 30 years old when it returned to that same spot!',
          es: 'Saturno tarda 29,46 años en orbitar el Sol. Esto significa que una persona nacida cuando Saturno pasaba por un punto estaría casi 30 años cuando el planeta volvería al mismo lugar.'
        }
      },
      {
        id: 'planetas-15',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o planeta mais distante do Sol no sistema solar.',
          en: 'Find the most distant planet from the Sun in our solar system.',
          es: 'Encuentra el planeta más lejano del Sol en el sistema solar.'
        },
        alvoId: 'netuno',
        dica: {
          pt: 'É o oitavo e último planeta, conhecido por seus fortes ventos azuis.',
          en: 'It is the 8th and last planet, known for its strong blue winds.',
          es: 'Es el 8º y último planeta, conocido por sus fuertes vientos azules.'
        },
        explicacao: {
          pt: 'Netuno está a ~30 UA do Sol — 30 vezes mais longe que a Terra! Está tão longe que a luz do Sol leva 4 horas e 20 minutos para chegar lá. Seus ventos são os mais rápidos do sistema solar, alcançando 2.100 km/h.',
          en: 'Neptune is ~30 AU from the Sun — 30 times farther than Earth! It is so distant that sunlight takes 4 hours and 20 minutes to reach it. Its winds are the fastest in the solar system, reaching 2,100 km/h.',
          es: 'Neptuno está a ~30 UA del Sol — ¡30 veces más lejos que la Tierra! Está tan lejano que la luz solar tarda 4 horas y 20 minutos en llegar. Sus vientos son los más rápidos del sistema solar, alcanzando 2.100 km/h.'
        }
      },
      {
        id: 'planetas-16',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o planeta que orbita o Sol mais rapidamente.',
          en: 'Find the planet that orbits the Sun the fastest.',
          es: 'Encuentra el planeta que orbita el Sol más rápidamente.'
        },
        alvoId: 'mercurio',
        dica: {
          pt: 'É o primeiro planeta, o mais próximo do Sol, e completa uma órbita em apenas 88 dias.',
          en: 'It is the 1st planet, the closest to the Sun, and completes an orbit in just 88 days.',
          es: 'Es el 1er planeta, el más cercano al Sol, y completa una órbita en solo 88 días.'
        },
        explicacao: {
          pt: 'Mercúrio orbita o Sol a uma velocidade média de 47,87 km/s — impressionante! Quanto mais perto do Sol, mais rápido precisa se mover para manter a órbita. Mercúrio é o campeão de velocidade orbital.',
          en: 'Mercury orbits the Sun at an average speed of 47.87 km/s — impressive! The closer to the Sun, the faster an object must move to maintain orbit. Mercury is the champion of orbital speed.',
          es: 'Mercurio orbita el Sol a una velocidad promedio de 47,87 km/s — ¡impresionante! Cuanto más cerca del Sol, más rápido debe moverse un objeto para mantener la órbita. Mercurio es el campeón de velocidad orbital.'
        }
      }
    ]
  },
  {
    id: 'luas',
    icone: '◑',
    nome: { pt: 'Luas', en: 'Moons', es: 'Lunas' },
    perguntas: [
      {
        id: 'luas-1',
        tipo: 'multipla',
        texto: {
          pt: 'Qual lua é conhecida por ter vulcões ativos?',
          en: 'Which moon is known for having active volcanoes?',
          es: '¿Cuál luna es conocida por tener volcanes activos?'
        },
        opcoes: {
          pt: ['Europa', 'Titã', 'Io', 'Encelado'],
          en: ['Europa', 'Titan', 'Io', 'Enceladus'],
          es: ['Europa', 'Titán', 'Ío', 'Encélado']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Io é a lua mais vulcânica do sistema solar! Tem 400+ vulcões ativos, alguns disparando enxofre a 500 km de altura. É tão ativa que sua superfície é constantemente renovada.',
          en: 'Io is the most volcanic moon in the solar system! It has 400+ active volcanoes, some ejecting sulfur 500 km high. It is so active its surface is constantly renewed.',
          es: 'Ío es la luna más volcánica del sistema solar. Tiene 400+ volcanes activos, algunos eyectando azufre 500 km de altura. Es tan activa que su superficie se renueva constantemente.'
        }
      },
      {
        id: 'luas-2',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é a lua do nosso planeta chamada de "noiva das marés"?',
          en: 'Which is our planet\'s moon called the "bride of the tides"?',
          es: '¿Cuál es la luna de nuestro planeta llamada la "novia de las mareas"?'
        },
        opcoes: {
          pt: ['Fobos', 'Lua', 'Titã', 'Deimos'],
          en: ['Phobos', 'Moon', 'Titan', 'Deimos'],
          es: ['Fobos', 'Luna', 'Titán', 'Deimos']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'A Lua controla as marés dos nossos oceanos! Sem ela, as marés seriam 30% menores e a vida teria evoluído muito diferente. Ela também aparenta estar parada porque está "acoplada" à Terra.',
          en: 'The Moon controls our ocean tides! Without it, tides would be 30% smaller and life would have evolved very differently. It also appears still because it is tidally locked to Earth.',
          es: 'La Luna controla las mareas de nuestros océanos. Sin ella, las mareas serían 30% menores y la vida hubiera evolucionado muy diferente. También parece estar parada porque está acoplada a la Tierra.'
        }
      },
      {
        id: 'luas-3',
        tipo: 'multipla',
        texto: {
          pt: 'Titã é a lua de qual planeta?',
          en: 'Titan is the moon of which planet?',
          es: 'Titán es la luna de cuál planeta?'
        },
        opcoes: {
          pt: ['Júpiter', 'Urano', 'Saturno', 'Netuno'],
          en: ['Jupiter', 'Uranus', 'Saturn', 'Neptune'],
          es: ['Júpiter', 'Urano', 'Saturno', 'Neptuno']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Titã é a segunda maior lua do sistema solar. É extraordinária porque é a única lua com uma atmosfera densa e tem chuva de metano que cai em mares de metano líquido!',
          en: 'Titan is the 2nd largest moon in the solar system. It is extraordinary because it is the only moon with a dense atmosphere and has methane rain falling into liquid methane seas!',
          es: 'Titán es la 2ª luna más grande del sistema solar. Es extraordinaria porque es la única luna con una atmósfera densa y tiene lluvia de metano cayendo en mares de metano líquido.'
        }
      },
      {
        id: 'luas-4',
        tipo: 'multipla',
        texto: {
          pt: 'Quantos anos dura o período orbital de Fobos (lua de Marte)?',
          en: 'How long is Phobos\' orbital period (moon of Mars)?',
          es: '¿Cuál es el período orbital de Fobos (luna de Marte)?'
        },
        opcoes: {
          pt: ['0,3 dias', '2,3 dias', '7,3 dias', '15,9 dias'],
          en: ['0.3 days', '2.3 days', '7.3 days', '15.9 days'],
          es: ['0,3 días', '2,3 días', '7,3 días', '15,9 días']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'Fobos orbita Marte em apenas 7,66 horas (≈ 0,32 dias) — mais rápido que um dia marciano! Ela está se aproximando e eventualmente colidirá com Marte em alguns milhões de anos.',
          en: 'Phobos orbits Mars in just 7.66 hours (≈ 0.32 days) — faster than a Martian day! It is slowly approaching and will eventually crash into Mars in millions of years.',
          es: 'Fobos orbita Marte en solo 7,66 horas (≈ 0,32 días) — ¡más rápido que un día marciano! Se está acercando lentamente y eventualmente chocará con Marte en millones de años.'
        }
      },
      {
        id: 'luas-5',
        tipo: 'multipla',
        texto: {
          pt: 'Qual lua de Júpiter é considerada um bom lugar para procurar vida extraterrestre?',
          en: 'Which Jupiter moon is considered a good place to search for alien life?',
          es: '¿Cuál luna de Júpiter es considerada un buen lugar para buscar vida extraterrestre?'
        },
        opcoes: {
          pt: ['Io', 'Calisto', 'Europa', 'Ganimedes'],
          en: ['Io', 'Callisto', 'Europa', 'Ganymede'],
          es: ['Ío', 'Calisto', 'Europa', 'Ganimedes']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Europa tem uma crosta de gelo liso com rachaduras. Sob o gelo há provavelmente um oceano de água morna — um candidato perfeito para vida microbiana extraterrestre!',
          en: 'Europa has a smooth icy crust with cracks. Beneath the ice there is likely a warm ocean of liquid water — a perfect candidate for extraterrestrial microbial life!',
          es: 'Europa tiene una corteza de hielo liso con grietas. Bajo el hielo probablemente hay un océano de agua cálida — ¡un candidato perfecto para vida microbiana extraterrestre!'
        }
      },
      {
        id: 'luas-6',
        tipo: 'multipla',
        texto: {
          pt: 'Encélado dispara o quê para o espaço?',
          en: 'What does Enceladus shoot into space?',
          es: '¿Qué dispara Encélado hacia el espacio?'
        },
        opcoes: {
          pt: ['Lava quente', 'Água gelada', 'Gás metano', 'Poeira dourada'],
          en: ['Hot lava', 'Frozen water', 'Methane gas', 'Golden dust'],
          es: ['Lava caliente', 'Agua congelada', 'Gas metano', 'Polvo dorado']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Encélado dispara plumas de água gelada de seus polos sul em velocidades de 2 km/s — é um gêiser cósmico! A água está em contato com minerais rochosos em seu fundo oceânico.',
          en: 'Enceladus shoots plumes of frozen water from its south poles at speeds of 2 km/s — it is a cosmic geyser! The water touches rocky minerals on its ocean floor.',
          es: 'Encélado dispara penachos de agua congelada desde sus polos sur a velocidades de 2 km/s — ¡es un géiser cósmico! El agua toca minerales rocosos en su fondo oceánico.'
        }
      },
      {
        id: 'luas-7',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre a maior lua do sistema solar.',
          en: 'Find the largest moon in our solar system.',
          es: 'Encuentra la luna más grande del sistema solar.'
        },
        alvoId: 'ganimedes',
        dica: {
          pt: 'É uma lua de Júpiter, maior que o planeta Mercúrio!',
          en: 'It is a Jupiter moon, larger than the planet Mercury!',
          es: 'Es una luna de Júpiter, ¡más grande que el planeta Mercurio!'
        },
        explicacao: {
          pt: 'Ganimedes é a maior lua do sistema solar (5.268 km de diâmetro) — maior que Mercúrio! Tem auroras como a Terra, causadas pela interação com o campo magnético de Júpiter.',
          en: 'Ganymede is the largest moon in the solar system (5,268 km diameter) — larger than Mercury! It has auroras like Earth, caused by Jupiter\'s magnetic field interaction.',
          es: 'Ganimedes es la luna más grande del sistema solar (diámetro 5.268 km) — ¡más grande que Mercurio! Tiene auroras como la Tierra, causadas por la interacción del campo magnético de Júpiter.'
        }
      },
      {
        id: 'luas-8',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre a única lua do planeta Terra.',
          en: 'Find the only moon of planet Earth.',
          es: 'Encuentra la única luna del planeta Tierra.'
        },
        alvoId: 'lua',
        dica: {
          pt: 'É nosso vizinho mais próximo, que influencia as marés dos oceanos.',
          en: 'It is our nearest neighbor, which influences the tides of our oceans.',
          es: 'Es nuestro vecino más cercano, que influye en las mareas de nuestros océanos.'
        },
        explicacao: {
          pt: 'A Lua é nosso satélite natural único. Formou-se a partir de detritos de um gigantesco impacto há 4,51 bilhões de anos. Está se afastando da Terra a 3,8 cm por ano.',
          en: 'The Moon is our unique natural satellite. It formed from debris of a giant impact 4.51 billion years ago. It is moving away from Earth at 3.8 cm per year.',
          es: 'La Luna es nuestro único satélite natural. Se formó a partir de escombros de un impacto gigante hace 4.51 mil millones de años. Se aleja de la Tierra 3,8 cm por año.'
        }
      },
      {
        id: 'luas-9',
        tipo: 'multipla',
        texto: {
          pt: 'Qual lua de Netuno tem uma órbita retrógrada, girando para trás?',
          en: 'Which moon of Neptune has a retrograde orbit, spinning backwards?',
          es: '¿Cuál luna de Neptuno tiene una órbita retrógrada, girando hacia atrás?'
        },
        opcoes: {
          pt: ['Tritão', 'Proteu', 'Nereida', 'Tétis'],
          en: ['Triton', 'Proteus', 'Nereid', 'Tethys'],
          es: ['Tritón', 'Proteo', 'Nereida', 'Tetis']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'Tritão é única lua importante com órbita retrógrada — orbita Netuno ao contrário da maioria dos corpos. Isto significa que Tritão foi provavelmente capturada do Cinturão de Kuiper e está lentamente espiralando em direção a Netuno.',
          en: 'Triton is the only major moon with a retrograde orbit — it orbits Neptune backwards compared to most bodies. This means Triton was likely captured from the Kuiper Belt and is slowly spiraling toward Neptune.',
          es: 'Tritón es la única luna importante con órbita retrógrada — orbita Neptuno al contrario que la mayoría de los cuerpos. Esto significa que Tritón probablemente fue capturada del Cinturón de Kuiper y se está espiralizando lentamente hacia Neptuno.'
        }
      },
      {
        id: 'luas-10',
        tipo: 'multipla',
        texto: {
          pt: 'Quantas luas conhecidas tem o planeta Urano?',
          en: 'How many known moons does the planet Uranus have?',
          es: '¿Cuántas lunas conocidas tiene el planeta Urano?'
        },
        opcoes: {
          pt: ['5 lunas', '15 lunas', '27+ lunas', '95+ lunas'],
          en: ['5 moons', '15 moons', '27+ moons', '95+ moons'],
          es: ['5 lunas', '15 lunas', '27+ lunas', '95+ lunas']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Urano tem 27 lunas conhecidas! As 5 maiores (Titânia, Oberão, Umbriel, Ariel e Miranda) têm nomes de personagens de Shakespeare. Muitas das luas menores foram descobertas mais recentemente por telescópios espaciais.',
          en: 'Uranus has 27 known moons! The 5 largest (Titania, Oberon, Umbriel, Ariel, and Miranda) are named after Shakespeare characters. Many of the smaller moons were discovered more recently by space telescopes.',
          es: 'Urano tiene 27 lunas conocidas. Los 5 más grandes (Titania, Oberón, Umbriel, Ariel y Miranda) llevan nombres de personajes de Shakespeare. Muchas de las lunas más pequeñas fueron descubiertas recientemente por telescopios espaciales.'
        }
      },
      {
        id: 'luas-11',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é a lua mais antiga do sistema solar em termos de superfície craqueada?',
          en: 'Which is the oldest moon in the solar system in terms of cratered surface?',
          es: '¿Cuál es la luna más antigua del sistema solar en términos de superficie craqueada?'
        },
        opcoes: {
          pt: ['Calisto', 'Lua da Terra', 'Titã', 'Encélado'],
          en: ['Callisto', 'Earth\'s Moon', 'Titan', 'Enceladus'],
          es: ['Calisto', 'Luna de la Tierra', 'Titán', 'Encélado']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'Calisto preserva sua superfície antiga de ~4 bilhões de anos sem mudanças significativas. Diferente de suas irmãs (Io, Europa, Ganimedes), Calisto não sofreu aquecimento tidal que renovaria sua crosta, então é um fóssil vivo do passado.',
          en: 'Callisto preserves its ancient surface of ~4 billion years with few changes. Unlike its siblings (Io, Europa, Ganymede), Callisto did not experience tidal heating that would renew its crust, making it a living fossil of the past.',
          es: 'Calisto preserva su antigua superficie de ~4 mil millones de años sin grandes cambios. A diferencia de sus hermanas (Ío, Europa, Ganimedes), Calisto no experimentó el calentamiento tidal que renovaría su corteza, siendo un fósil vivo del pasado.'
        }
      },
      {
        id: 'luas-12',
        tipo: 'multipla',
        texto: {
          pt: 'Qual lua de Saturno dispara água gelada de seus polos?',
          en: 'Which moon of Saturn shoots frozen water from its poles?',
          es: '¿Cuál luna de Saturno dispara agua congelada de sus polos?'
        },
        opcoes: {
          pt: ['Titã', 'Mimas', 'Encélado', 'Reia'],
          en: ['Titan', 'Mimas', 'Enceladus', 'Rhea'],
          es: ['Titán', 'Mimas', 'Encélado', 'Rea']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Encélado dispara plumas de água gelada de seu polo sul em velocidades de 2 km/s. As moléculas de água sobem direto para o espaço, criando um halo translúcido ao redor de Saturno. A água pode conter vida!',
          en: 'Enceladus shoots plumes of frozen water from its south pole at speeds of 2 km/s. Water molecules shoot straight into space, creating a translucent halo around Saturn. The water may contain life!',
          es: 'Encélado dispara penachos de agua congelada de su polo sur a velocidades de 2 km/s. Las moléculas de agua se disparan directamente al espacio, creando un halo translúcido alrededor de Saturno. ¡El agua puede contener vida!'
        }
      },
      {
        id: 'luas-13',
        tipo: 'multipla',
        texto: {
          pt: 'Qual lua jovem de Saturno é famosa pela gigantesca cratera Herschel?',
          en: 'Which young moon of Saturn is famous for the giant Herschel crater?',
          es: '¿Cuál luna joven de Saturno es famosa por el cráter gigante Herschel?'
        },
        opcoes: {
          pt: ['Mimas', 'Titã', 'Febe', 'Encélado'],
          en: ['Mimas', 'Titan', 'Phoebe', 'Enceladus'],
          es: ['Mimas', 'Titán', 'Febe', 'Encélado']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'Mimas é famosa pelo cráter Herschel — tão grande que cobre 35% do diâmetro de Mimas! O impacto quase destruiu a pequena lua inteira. Se tivesse sido um pouco maior, Mimas teria se desintegrado.',
          en: 'Mimas is famous for the Herschel crater — so large it covers 35% of Mimas\' diameter! The impact nearly destroyed the tiny moon entirely. If it had been slightly larger, Mimas would have shattered.',
          es: 'Mimas es famosa por el cráter Herschel — ¡tan grande que cubre el 35% del diámetro de Mimas! El impacto casi destruyó la pequeña luna por completo. Si hubiera sido un poco más grande, Mimas se hubiera desintegrado.'
        }
      },
      {
        id: 'luas-14',
        tipo: 'multipla',
        texto: {
          pt: 'Qual lua de Marte orbita tão perto que será destruída em alguns milhões de anos?',
          en: 'Which moon of Mars orbits so close that it will be destroyed in a few million years?',
          es: '¿Cuál luna de Marte orbita tan cerca que será destruida en algunos millones de años?'
        },
        opcoes: {
          pt: ['Deimos', 'Fobos', 'Caronte', 'Miranda'],
          en: ['Deimos', 'Phobos', 'Charon', 'Miranda'],
          es: ['Deimos', 'Fobos', 'Caronte', 'Miranda']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Fobos está se aproximando de Marte a 1,8 cm por ano! Num futuro de ~50 milhões de anos, as forças de maré de Marte a despedaçarão, criando um anel de detritos ao redor do planeta.',
          en: 'Phobos is approaching Mars at 1.8 cm per year! In roughly 50 million years, Mars\' tidal forces will tear it apart, creating a ring of debris around the planet.',
          es: 'Fobos se acerca a Marte a 1,8 cm por año. En unos 50 millones de años, las fuerzas de marea de Marte la despedazarán, creando un anillo de escombros alrededor del planeta.'
        }
      },
      {
        id: 'luas-15',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre a lua com atmosfera densa e lagos de metano em sua superfície.',
          en: 'Find the moon with a dense atmosphere and methane lakes on its surface.',
          es: 'Encuentra la luna con atmósfera densa y lagos de metano en su superficie.'
        },
        alvoId: 'tita',
        dica: {
          pt: 'É a segunda maior lua do sistema solar, lua de Saturno, com chuva de metano.',
          en: 'It is the 2nd largest moon in the solar system, a moon of Saturn, with methane rain.',
          es: 'Es la 2ª luna más grande del sistema solar, una luna de Saturno, con lluvia de metano.'
        },
        explicacao: {
          pt: 'Titã é um mundo extraordinário — a única lua com atmosfera densa feita de nitrogênio e metano. Tem chuva de metano que cai em lagos e mares de hidrocarbonetos líquidos. É tão complexa quanto qualquer planeta terrestre!',
          en: 'Titan is an extraordinary world — the only moon with a dense atmosphere made of nitrogen and methane. It has methane rain falling into lakes and seas of liquid hydrocarbons. It is as complex as any terrestrial planet!',
          es: 'Titán es un mundo extraordinario — la única luna con una atmósfera densa hecha de nitrógeno y metano. Tiene lluvia de metano cayendo en lagos y mares de hidrocarburos líquidos. ¡Es tan compleja como cualquier planeta terrestre!'
        }
      },
      {
        id: 'luas-16',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre a lua gelada de Júpiter com um possível oceano subsuperficial de água líquida.',
          en: 'Find the icy moon of Jupiter with a possible subsurface ocean of liquid water.',
          es: 'Encuentra la luna helada de Júpiter con un posible océano subsuperficial de agua líquida.'
        },
        alvoId: 'europa',
        dica: {
          pt: 'É a segunda maior lua de Júpiter, com crosta de gelo liso e rachaduras.',
          en: 'It is the 2nd largest moon of Jupiter, with a smooth icy crust and cracks.',
          es: 'Es la 2ª luna más grande de Júpiter, con corteza de hielo liso y grietas.'
        },
        explicacao: {
          pt: 'Europa é coberta por gelo liso com poucas crateras — sinal de uma superfície jovem. Sob o gelo há provavelmente um oceano de água morna contendo mais água que todos os oceanos da Terra juntos! É nosso melhor candidato para vida extraterrestre.',
          en: 'Europa is covered by smooth ice with few craters — a sign of a young surface. Beneath the ice there is likely a warm ocean of liquid water containing more water than all Earth\'s oceans combined! It is our best candidate for extraterrestrial life.',
          es: 'Europa está cubierta por hielo liso con pocas cráteres — signo de una superficie joven. Bajo el hielo probablemente hay un océano de agua tibia que contiene más agua que todos los océanos de la Tierra juntos. ¡Es nuestro mejor candidato para vida extraterrestre!'
        }
      }
    ]
  },
  {
    id: 'recordes-do-sistema-solar',
    icone: '★',
    nome: { pt: 'Recordes do Sistema Solar', en: 'Solar System Records', es: 'Récords del Sistema Solar' },
    perguntas: [
      {
        id: 'recordes-1',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o corpo mais distante do Sol que orbita regularmente?',
          en: 'What is the farthest body that regularly orbits the Sun?',
          es: '¿Cuál es el cuerpo más lejano del Sol que orbita regularmente?'
        },
        opcoes: {
          pt: ['Plutão', 'Netuno', 'Eris', 'Makemake'],
          en: ['Pluto', 'Neptune', 'Eris', 'Makemake'],
          es: ['Plutón', 'Neptuno', 'Eris', 'Makemake']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Eris é o planeta-anão mais distante, descoberto em 2005. Sua órbita excentricada o coloca às vezes mais perto do Sol que Plutão! Tem uma pequena lua chamada Disnomia.',
          en: 'Eris is the most distant dwarf planet, discovered in 2005. Its eccentric orbit sometimes brings it closer to the Sun than Pluto! It has a small moon called Dysnomia.',
          es: 'Eris es el planeta enano más lejano, descubierto en 2005. Su órbita excéntrica a veces lo acerca más al Sol que Plutón. ¡Tiene una pequeña luna llamada Disnomia!'
        }
      },
      {
        id: 'recordes-2',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é a temperatura mais alta encontrada no sistema solar?',
          en: 'What is the highest temperature found in the solar system?',
          es: '¿Cuál es la temperatura más alta encontrada en el sistema solar?'
        },
        opcoes: {
          pt: ['Núcleo do Sol: 15 milhões °C', 'Superfície de Io: 1.800 K', 'Atmosfera de Vênus: 462 °C', 'Núcleo de Júpiter: 24.000 K'],
          en: ['Sun\'s core: 15 million °C', 'Io\'s surface: 1,800 K', 'Venus\' atmosphere: 462 °C', 'Jupiter\'s core: 24,000 K'],
          es: ['Núcleo del Sol: 15 millones °C', 'Superficie de Ío: 1.800 K', 'Atmósfera de Venus: 462 °C', 'Núcleo de Júpiter: 24.000 K']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'O núcleo do Sol alcança ~15 milhões de graus Celsius! A fusão nuclear contínua converte 600 milhões de toneladas de hidrogênio em hélio a cada segundo.',
          en: 'The Sun\'s core reaches ~15 million degrees Celsius! Continuous nuclear fusion converts 600 million tons of hydrogen into helium every second.',
          es: 'El núcleo del Sol alcanza ~15 millones de grados Celsius. La fusión nuclear continua convierte 600 millones de toneladas de hidrógeno en helio cada segundo.'
        }
      },
      {
        id: 'recordes-3',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o maior impacto de cratera observado no sistema solar?',
          en: 'What is the largest impact crater basin observed in the solar system?',
          es: '¿Cuál es la cuenca de impacto más grande observada en el sistema solar?'
        },
        opcoes: {
          pt: ['Gilgamesh (Calisto)', 'Aitken (Lua)', 'Valles Marineris (Marte)', 'Stickney (Fobos)'],
          en: ['Gilgamesh (Callisto)', 'Aitken (Moon)', 'Valles Marineris (Mars)', 'Stickney (Phobos)'],
          es: ['Gilgamesh (Calisto)', 'Aitken (Luna)', 'Valles Marineris (Marte)', 'Stickney (Fobos)']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'O impacto Aitken na Lua é um dos maiores conhecidos, com 2.500 km de diâmetro! Gilgamesh em Calisto tem 1.600 km. Ambos são cicatrizes gigantescas do passado tumultuoso do sistema solar.',
          en: 'The Aitken impact on the Moon is one of the largest known, 2,500 km across! Gilgamesh on Callisto spans 1,600 km. Both are giant scars from the solar system\'s tumultuous past.',
          es: 'El impacto Aitken en la Luna es uno de los más grandes conocidos, ¡2.500 km de diámetro! Gilgamesh en Calisto mide 1.600 km. Ambos son cicatrices gigantes del pasado tumultuoso del sistema solar.'
        }
      },
      {
        id: 'recordes-4',
        tipo: 'multipla',
        texto: {
          pt: 'Qual planeta tem a rotação mais rápida?',
          en: 'Which planet has the fastest rotation?',
          es: '¿Cuál planeta tiene la rotación más rápida?'
        },
        opcoes: {
          pt: ['Saturno: 10,7 horas', 'Júpiter: 9,93 horas', 'Netuno: 16 horas', 'Urano: 17 horas'],
          en: ['Saturn: 10.7 hours', 'Jupiter: 9.93 hours', 'Neptune: 16 hours', 'Uranus: 17 hours'],
          es: ['Saturno: 10,7 horas', 'Júpiter: 9,93 horas', 'Neptuno: 16 horas', 'Urano: 17 horas']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Júpiter gira incrivelmente rápido: um dia em Júpiter dura apenas 9,93 horas! Sua rotação rápida causa achatamento nos polos — ele parece um pouco "achatado".',
          en: 'Jupiter spins incredibly fast: a day on Jupiter is only 9.93 hours! Its rapid rotation causes polar flattening — it looks slightly "squashed".',
          es: 'Júpiter gira increíblemente rápido: ¡un día en Júpiter dura solo 9,93 horas! Su rotación rápida causa achatamiento polar — se ve un poco "aplastado".'
        }
      },
      {
        id: 'recordes-5',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o corpo mais denso do sistema solar (exeto o próprio Sol)?',
          en: 'What is the densest body in the solar system (except the Sun itself)?',
          es: '¿Cuál es el cuerpo más denso del sistema solar (excepto el propio Sol)?'
        },
        opcoes: {
          pt: ['Mercúrio', 'Terra', 'Lua', 'Júpiter'],
          en: ['Mercury', 'Earth', 'Moon', 'Jupiter'],
          es: ['Mercurio', 'Tierra', 'Luna', 'Júpiter']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'Mercúrio tem a maior densidade porque é feito principalmente de ferro — sua massa se concentra em um núcleo de ferro que ocupa 75% da massa total do planeta!',
          en: 'Mercury has the highest density because it is mostly made of iron — its mass is concentrated in an iron core that makes up 75% of the planet\'s total mass!',
          es: 'Mercurio tiene la mayor densidad porque está hecho principalmente de hierro — su masa se concentra en un núcleo de hierro que ocupa el 75% de la masa total del planeta.'
        }
      },
      {
        id: 'recordes-6',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o planeta menos denso?',
          en: 'Which is the least dense planet?',
          es: '¿Cuál es el planeta menos denso?'
        },
        opcoes: {
          pt: ['Netuno', 'Urano', 'Saturno', 'Marte'],
          en: ['Neptune', 'Uranus', 'Saturn', 'Mars'],
          es: ['Neptuno', 'Urano', 'Saturno', 'Marte']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Saturno é tão pouco denso que flutuaria na água! Sua densidade é apenas 0,687 g/cm³. Se você tivesse uma banheira cósmica gigantesca, Saturno boiaria como um brinquedo.',
          en: 'Saturn is so low density that it would float in water! Its density is only 0.687 g/cm³. If you had a giant cosmic bathtub, Saturn would float like a toy.',
          es: 'Saturno es tan poco denso que flotaría en el agua. Su densidad es solo 0,687 g/cm³. Si tuvieras una bañera cósmica gigantesca, Saturno flotaría como un juguete.'
        }
      },
      {
        id: 'recordes-7',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o cometa mais famoso, que retorna a cada 76 anos.',
          en: 'Find the most famous comet, which returns every 76 years.',
          es: 'Encuentra el cometa más famoso, que regresa cada 76 años.'
        },
        alvoId: 'halley',
        dica: {
          pt: 'Seu nome é de um astrônomo inglês. Volta em 2061.',
          en: 'It is named after an English astronomer. It returns in 2061.',
          es: 'Lleva el nombre de un astrónomo inglés. Regresa en 2061.'
        },
        explicacao: {
          pt: 'O Cometa Halley é o mais famoso, visitando a Terra a cada 75-76 anos. Sua última visita foi em 1986; a próxima será em 2061. Tem uma órbita altamente excêntrica.',
          en: 'Halley\'s Comet is the most famous, visiting Earth every 75-76 years. Its last visit was in 1986; the next will be in 2061. It has a highly eccentric orbit.',
          es: 'El Cometa Halley es el más famoso, visitando la Tierra cada 75-76 años. Su última visita fue en 1986; la próxima será en 2061. Tiene una órbita altamente excéntrica.'
        }
      },
      {
        id: 'recordes-8',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o maior cinturão de asteroides do sistema solar.',
          en: 'Find the largest asteroid belt in our solar system.',
          es: 'Encuentra el cinturón de asteroides más grande del sistema solar.'
        },
        alvoId: 'cinturao-asteroides',
        dica: {
          pt: 'Fica entre Marte e Júpiter, preenchido com fragmentos rochosos.',
          en: 'It lies between Mars and Jupiter, filled with rocky fragments.',
          es: 'Se encuentra entre Marte y Júpiter, lleno de fragmentos rocosos.'
        },
        explicacao: {
          pt: 'O Cinturão de Asteroides entre Marte e Júpiter contém milhões de fragmentos rochosos. Nunca foi um planeta que explodiu — é o resultado dos primeiros bilhões de anos do sistema solar caótico.',
          en: 'The Asteroid Belt between Mars and Jupiter contains millions of rocky fragments. It was never an exploded planet — it is the result of the solar system\'s chaotic first few billion years.',
          es: 'El Cinturón de Asteroides entre Marte y Júpiter contiene millões de fragmentos rocosos. Nunca fue un planeta que explotó — es el resultado de los primeros caóticos mil millones de años del sistema solar.'
        }
      },
      {
        id: 'recordes-9',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é a maior lua do sistema solar?',
          en: 'What is the largest moon in the solar system?',
          es: '¿Cuál es la luna más grande del sistema solar?'
        },
        opcoes: {
          pt: ['Titã', 'Ganimedes', 'Calisto', 'Triton'],
          en: ['Titan', 'Ganymede', 'Callisto', 'Triton'],
          es: ['Titán', 'Ganimedes', 'Calisto', 'Tritón']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Ganimedes é a maior lua do sistema solar, com 5.268 km de diâmetro — maior que o planeta Mercúrio! É uma das luas galileanas de Júpiter e tem auroras como a Terra.',
          en: 'Ganymede is the largest moon in the solar system, 5,268 km across — larger than the planet Mercury! It is one of Jupiter\'s Galilean moons and has auroras like Earth.',
          es: 'Ganimedes es la luna más grande del sistema solar, con 5.268 km de diámetro — ¡más grande que el planeta Mercurio! Es una de las lunas galileanas de Júpiter y tiene auroras como la Tierra.'
        }
      },
      {
        id: 'recordes-10',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o menor planeta do sistema solar?',
          en: 'What is the smallest planet in the solar system?',
          es: '¿Cuál es el planeta más pequeño del sistema solar?'
        },
        opcoes: {
          pt: ['Mercúrio', 'Marte', 'Terra', 'Plutão'],
          en: ['Mercury', 'Mars', 'Earth', 'Pluto'],
          es: ['Mercurio', 'Marte', 'Tierra', 'Plutón']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'Mercúrio é o menor dos 8 planetas, com apenas 4.879 km de diâmetro. Plutão era considerado o 9º planeta, mas foi reclassificado como planeta-anão em 2006. Mercúrio é pouco maior que a Lua, mas muito mais denso.',
          en: 'Mercury is the smallest of the 8 planets, with only 4,879 km diameter. Pluto was once considered the 9th planet but was reclassified as a dwarf planet in 2006. Mercury is only slightly larger than the Moon, but much denser.',
          es: 'Mercurio es el planeta más pequeño de los 8, con solo 4.879 km de diámetro. Plutón fue considerado el 9º planeta pero fue reclasificado como planeta enano en 2006. Mercurio es solo un poco más grande que la Luna, pero mucho más denso.'
        }
      },
      {
        id: 'recordes-11',
        tipo: 'multipla',
        texto: {
          pt: 'Qual corpo tem a maior excentricidade (órbita mais ovalada)?',
          en: 'Which body has the greatest eccentricity (most oval orbit)?',
          es: '¿Cuál cuerpo tiene la mayor excentricidad (órbita más ovalada)?'
        },
        opcoes: {
          pt: ['Cometa Halley', 'Plutão', 'Mercúrio', 'Marte'],
          en: ['Halley\'s Comet', 'Pluto', 'Mercury', 'Mars'],
          es: ['Cometa Halley', 'Plutón', 'Mercurio', 'Marte']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'O Cometa Halley tem excentricidade 0,967 — uma órbita muito oval! Fica às vezes tão perto do Sol quanto Vênus e outras vezes tão longe quanto Netuno. Isto o torna um dos objetos mais extremos do sistema solar.',
          en: 'Halley\'s Comet has an eccentricity of 0.967 — a very oval orbit! It gets as close to the Sun as Venus and as far as Neptune. This makes it one of the most extreme objects in the solar system.',
          es: 'El Cometa Halley tiene una excentricidad de 0,967 — ¡una órbita muy ovalada! Se acerca tan cerca del Sol como Venus y se aleja tanto como Neptuno. Esto lo hace uno de los objetos más extremos del sistema solar.'
        }
      },
      {
        id: 'recordes-12',
        tipo: 'multipla',
        texto: {
          pt: 'Qual corpo celeste orbita o Sol COM o período mais longo?',
          en: 'Which celestial body orbits the Sun with the longest period?',
          es: '¿Cuál cuerpo celeste orbita el Sol con el período más largo?'
        },
        opcoes: {
          pt: ['Netuno', 'Plutão', 'Eris', 'Makemake'],
          en: ['Neptune', 'Pluto', 'Eris', 'Makemake'],
          es: ['Neptuno', 'Plutón', 'Eris', 'Makemake']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Eris é um planeta-anão tão longe do Sol que leva 559 anos para completar uma órbita! Descoberto em 2005, Eris é ligeiramente maior que Plutão e está entre os corpos mais distantes conhecidos do sistema solar.',
          en: 'Eris is a dwarf planet so far from the Sun that it takes 559 years to complete one orbit! Discovered in 2005, Eris is slightly larger than Pluto and is one of the most distant known bodies in the solar system.',
          es: 'Eris es un planeta enano tan lejano del Sol que tarda 559 años en completar una órbita. Descubierto en 2005, Eris es ligeramente más grande que Plutón y es uno de los cuerpos más lejanos conocidos del sistema solar.'
        }
      },
      {
        id: 'recordes-13',
        tipo: 'multipla',
        texto: {
          pt: 'Qual corpo tem o maior número de luas/satélites conhecidos?',
          en: 'Which body has the most known moons/satellites?',
          es: '¿Cuál cuerpo tiene el mayor número de lunas/satélites conocidos?'
        },
        opcoes: {
          pt: ['Júpiter', 'Saturno', 'Urano', 'Netuno'],
          en: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
          es: ['Júpiter', 'Saturno', 'Urano', 'Neptuno']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Saturno tem 146 luas conhecidas — o recorde do sistema solar! A maioria são pequenas, descobertas nos últimos anos por telescópios espaciais. As 5 principais (Titã, Encélado, Rheia, Dione, Tétis) são mundos complexos por si só.',
          en: 'Saturn has 146 known moons — the solar system record! Most are small, discovered in recent years by space telescopes. The 5 largest (Titan, Enceladus, Rhea, Dione, Tethys) are complex worlds in their own right.',
          es: 'Saturno tiene 146 lunas conocidas — ¡el récord del sistema solar! La mayoría son pequeñas, descubiertas en años recientes por telescopios espaciales. Las 5 principales (Titán, Encélado, Rea, Dione, Tetis) son mundos complejos por derecho propio.'
        }
      },
      {
        id: 'recordes-14',
        tipo: 'multipla',
        texto: {
          pt: 'Qual corpo tem o menor tamanho mas densidade altíssima (estrela de nêutrons-like)?',
          en: 'Which body has the smallest size but extremely high density?',
          es: '¿Cuál cuerpo tiene el tamaño más pequeño pero densidad altísima?'
        },
        opcoes: {
          pt: ['Plutão', 'Ceres', 'Mercúrio', 'Nenhum (o Sol é o mais denso)'],
          en: ['Pluto', 'Ceres', 'Mercury', 'None (the Sun is densest)'],
          es: ['Plutón', 'Ceres', 'Mercurio', 'Ninguno (el Sol es el más denso)']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Mercúrio é o corpo mais denso do sistema solar (exceto o Sol) com 5,43 g/cm³. Apesar de ser pequeno (4.879 km), tem um núcleo de ferro gigante que representa 75% de sua massa. É como um núcleo de planeta embrulhado em uma fina casca de rocha.',
          en: 'Mercury is the densest body in the solar system (except the Sun) with 5.43 g/cm³. Despite being small (4,879 km), it has a giant iron core representing 75% of its mass. It is like a planet\'s core wrapped in a thin shell of rock.',
          es: 'Mercurio es el cuerpo más denso del sistema solar (excepto el Sol) con 5,43 g/cm³. A pesar de ser pequeño (4.879 km), tiene un núcleo de hierro gigante que representa el 75% de su masa. Es como un núcleo planetario envuelto en una capa delgada de roca.'
        }
      },
      {
        id: 'recordes-15',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o planeta-anão localizado no Cinturão de Asteroides.',
          en: 'Find the dwarf planet located in the Asteroid Belt.',
          es: 'Encuentra el planeta enano ubicado en el Cinturón de Asteroides.'
        },
        alvoId: 'ceres',
        dica: {
          pt: 'É o maior corpo do Cinturão de Asteroides, também a priori um planeta.',
          en: 'It is the largest body in the Asteroid Belt, also once considered a planet.',
          es: 'Es el cuerpo más grande del Cinturón de Asteroides, también una vez considerado un planeta.'
        },
        explicacao: {
          pt: 'Ceres é o maior objeto do Cinturão de Asteroides, com 940 km de diâmetro. Foi o primeiro asteróide descoberto (1801) e por 150 anos foi considerado o 8º planeta. Hoje é classificado como planeta-anão, assim como Plutão.',
          en: 'Ceres is the largest object in the Asteroid Belt, 940 km across. It was the first asteroid discovered (1801) and was considered the 8th planet for 150 years. Today it is classified as a dwarf planet, like Pluto.',
          es: 'Ceres es el objeto más grande del Cinturón de Asteroides, con 940 km de diámetro. Fue el primer asteroide descubierto (1801) y se consideró el 8º planeta durante 150 años. Hoy se clasifica como planeta enano, como Plutón.'
        }
      },
      {
        id: 'recordes-16',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o segundo maior cinturão de objetos gelados do sistema solar.',
          en: 'Find the 2nd largest belt of icy objects in the solar system.',
          es: 'Encuentra el 2º cinturón más grande de objetos helados del sistema solar.'
        },
        alvoId: 'cinturao-kuiper',
        dica: {
          pt: 'Fica além de Netuno, contendo cometas e plutinos (corpos tipo Plutão).',
          en: 'It lies beyond Neptune, containing comets and plutinos (Pluto-like bodies).',
          es: 'Se encuentra más allá de Neptuno, conteniendo cometas y plutinos (cuerpos tipo Plutón).'
        },
        explicacao: {
          pt: 'O Cinturão de Kuiper estende-se de ~30 UA (órbita de Netuno) a ~55 UA. Contém milhares de objetos gelados maiores que 100 km, incluindo Plutão, Eris, Makemake e Haumea. É a fonte dos cometas de período longo.',
          en: 'The Kuiper Belt extends from ~30 AU (Neptune\'s orbit) to ~55 AU. It contains thousands of icy objects larger than 100 km, including Pluto, Eris, Makemake, and Haumea. It is the source of long-period comets.',
          es: 'El Cinturón de Kuiper se extiende desde ~30 UA (órbita de Neptuno) hasta ~55 UA. Contiene miles de objetos helados mayores de 100 km, incluyendo Plutón, Eris, Makemake y Haumea. Es la fuente de cometas de período largo.'
        }
      }
    ]
  },
  {
    id: 'missoes-espaciais',
    icone: '◆',
    nome: { pt: 'Missões Espaciais', en: 'Space Missions', es: 'Misiones Espaciales' },
    perguntas: [
      {
        id: 'missoes-1',
        tipo: 'multipla',
        texto: {
          pt: 'Qual foi a primeira missão tripulada a pousar na Lua?',
          en: 'What was the first crewed mission to land on the Moon?',
          es: '¿Cuál fue la primera misión tripulada en aterrizar en la Luna?'
        },
        opcoes: {
          pt: ['Apolo 10', 'Apolo 11', 'Apolo 12', 'Artemis 2'],
          en: ['Apollo 10', 'Apollo 11', 'Apollo 12', 'Artemis 2'],
          es: ['Apollo 10', 'Apollo 11', 'Apollo 12', 'Artemis 2']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Apollo 11 pousou em 20 de julho de 1969. Neil Armstrong foi o primeiro humano a caminhar na Lua, seguido por Buzz Aldrin. Foi um dos maiores feitos da humanidade!',
          en: 'Apollo 11 landed on July 20, 1969. Neil Armstrong was the first human to walk on the Moon, followed by Buzz Aldrin. It was one of humanity\'s greatest achievements!',
          es: 'Apollo 11 aterrizó el 20 de julio de 1969. Neil Armstrong fue el primer humano en caminar en la Luna, seguido por Buzz Aldrin. ¡Fue uno de los mayores logros de la humanidad!'
        }
      },
      {
        id: 'missoes-2',
        tipo: 'multipla',
        texto: {
          pt: 'Qual sonda foi a primeira a visitar Netuno?',
          en: 'Which probe was the first to visit Neptune?',
          es: '¿Cuál sonda fue la primera en visitar Neptuno?'
        },
        opcoes: {
          pt: ['Voyager 1', 'Voyager 2', 'New Horizons', 'Pioneer 11'],
          en: ['Voyager 1', 'Voyager 2', 'New Horizons', 'Pioneer 11'],
          es: ['Voyager 1', 'Voyager 2', 'New Horizons', 'Pioneer 11']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Voyager 2 passou por Netuno em 25 de agosto de 1989, revelando um mundo de ventosidades e cores azuis. Voyager 1 visitou apenas Júpiter e Saturno, mas foi mais longe no espaço.',
          en: 'Voyager 2 flew by Neptune on August 25, 1989, revealing a world of winds and blue colors. Voyager 1 visited only Jupiter and Saturn, but went farther into space.',
          es: 'Voyager 2 pasó por Neptuno el 25 de agosto de 1989, revelando un mundo de vientos y colores azules. Voyager 1 visitó solo Júpiter y Saturno, pero fue más lejos al espacio.'
        }
      },
      {
        id: 'missoes-3',
        tipo: 'multipla',
        texto: {
          pt: 'A missão Cassini-Huygens pousou a sonda Huygens em qual lua?',
          en: 'The Cassini-Huygens mission landed the Huygens probe on which moon?',
          es: '¿La misión Cassini-Huygens aterrizó la sonda Huygens en cuál luna?'
        },
        opcoes: {
          pt: ['Europa', 'Titã', 'Encélado', 'Mimas'],
          en: ['Europa', 'Titan', 'Enceladus', 'Mimas'],
          es: ['Europa', 'Titán', 'Encélado', 'Mimas']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Huygens pousou em Titã em 2005, revelando lagos de metano líquido! Cassini depois orbitou Saturno por 13 anos, fazendo descobertas incríveis sobre plumas de água gelada em Encélado.',
          en: 'Huygens landed on Titan in 2005, revealing liquid methane lakes! Cassini then orbited Saturn for 13 years, making incredible discoveries about frozen water plumes on Enceladus.',
          es: 'Huygens aterrizó en Titán en 2005, ¡revelando lagos de metano líquido! Cassini luego orbitó Saturno durante 13 años, haciendo descubrimientos increíbles sobre plumas de agua congelada en Encélado.'
        }
      },
      {
        id: 'missoes-4',
        tipo: 'multipla',
        texto: {
          pt: 'Qual sonda visitou Plutão e depois continuou no Cinturão de Kuiper?',
          en: 'Which probe visited Pluto and then continued into the Kuiper Belt?',
          es: '¿Cuál sonda visitó Plutón y luego continuó al Cinturón de Kuiper?'
        },
        opcoes: {
          pt: ['Voyager 2', 'New Horizons', 'Rosetta', 'Cassini'],
          en: ['Voyager 2', 'New Horizons', 'Rosetta', 'Cassini'],
          es: ['Voyager 2', 'New Horizons', 'Rosetta', 'Cassini']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'New Horizons foi lançada em 2006 e sobrevoou Plutão em 14 de julho de 2015, revelando um mundo muito mais complexo e interessante que o esperado — com montanhas de gelo, vulcões de criomagma e muito mais!',
          en: 'New Horizons launched in 2006 and flew by Pluto on July 14, 2015, revealing a far more complex and interesting world than expected — with ice mountains, cryovolcanoes and much more!',
          es: 'New Horizons se lanzó en 2006 y pasó por Plutón el 14 de julio de 2015, ¡revelando un mundo mucho más complejo e interesante de lo esperado — con montañas de hielo, crivolcanes y mucho más!'
        }
      },
      {
        id: 'missoes-5',
        tipo: 'multipla',
        texto: {
          pt: 'Qual foi a primeira sonda a orbitar e pousar em um cometa?',
          en: 'What was the first probe to orbit and land on a comet?',
          es: '¿Cuál fue la primera sonda en orbitar y aterrizar en un cometa?'
        },
        opcoes: {
          pt: ['Voyager 1', 'Rosetta', 'New Horizons', 'Cassini'],
          en: ['Voyager 1', 'Rosetta', 'New Horizons', 'Cassini'],
          es: ['Voyager 1', 'Rosetta', 'New Horizons', 'Cassini']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Rosetta orbitou o cometa 67P por 2 anos e liberou o módulo Philae que pousou no cometa — o primeiro pouso em um cometa da história! A sonda capturou imagens incríveis de um mundo congelado.',
          en: 'Rosetta orbited comet 67P for 2 years and released the Philae lander which touched down on the comet — the first landing on a comet in history! The probe captured amazing images of an icy world.',
          es: 'Rosetta orbitó el cometa 67P durante 2 años y liberó el módulo Philae que aterrizó en el cometa — ¡el primer aterrizaje en un cometa en la historia! La sonda capturó imágenes asombrosas de un mundo helado.'
        }
      },
      {
        id: 'missoes-6',
        tipo: 'multipla',
        texto: {
          pt: 'Em que ano o Voyager 1 foi lançado?',
          en: 'In what year was Voyager 1 launched?',
          es: '¿En qué año fue lanzado el Voyager 1?'
        },
        opcoes: {
          pt: ['1975', '1977', '1979', '1981'],
          en: ['1975', '1977', '1979', '1981'],
          es: ['1975', '1977', '1979', '1981']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Voyager 1 foi lançada em 5 de setembro de 1977 — 2 semanas DEPOIS que sua irmã Voyager 2! Mesmo assim, Voyager 1 se tornou o objeto humano mais distante do espaço.',
          en: 'Voyager 1 launched on September 5, 1977 — 2 weeks AFTER its sister Voyager 2! Yet Voyager 1 became the most distant human object in space.',
          es: 'Voyager 1 se lanzó el 5 de septiembre de 1977 — ¡2 semanas DESPUÉS que su hermana Voyager 2! Sin embargo, Voyager 1 se convirtió en el objeto humano más distante del espacio.'
        }
      },
      {
        id: 'missoes-7',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o corpo visitado pela missão Apollo 11.',
          en: 'Find the celestial body visited by Apollo 11.',
          es: 'Encuentra el cuerpo celeste visitado por Apollo 11.'
        },
        alvoId: 'lua',
        dica: {
          pt: 'É nosso satélite natural, onde Neil Armstrong caminhou.',
          en: 'It is our natural satellite, where Neil Armstrong walked.',
          es: 'Es nuestro satélite natural, donde Neil Armstrong caminó.'
        },
        explicacao: {
          pt: 'Apollo 11 pousou em uma região chamada Mar da Tranquilidade. Neil Armstrong foi o primeiro humano na Lua, Buzz Aldrin foi o segundo. Voltaram para a Terra após histórico sucesso em julho de 1969.',
          en: 'Apollo 11 landed in a region called the Sea of Tranquility. Neil Armstrong was the first human on the Moon, Buzz Aldrin was the second. They returned to Earth after historic success in July 1969.',
          es: 'Apollo 11 aterrizó en una región llamada Mar de la Tranquilidad. Neil Armstrong fue el primer humano en la Luna, Buzz Aldrin fue el segundo. Regresaron a la Tierra después del histórico éxito en julio de 1969.'
        }
      },
      {
        id: 'missoes-8',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o planeta-anão explorado pela missão New Horizons.',
          en: 'Find the dwarf planet explored by the New Horizons mission.',
          es: 'Encuentra el planeta enano explorado por la misión New Horizons.'
        },
        alvoId: 'plutao',
        dica: {
          pt: 'Foi reclassificado em 2006. New Horizons o sobrevoou em 2015.',
          en: 'It was reclassified in 2006. New Horizons flew by it in 2015.',
          es: 'Fue reclasificado en 2006. New Horizons pasó por él en 2015.'
        },
        explicacao: {
          pt: 'New Horizons sobrevoou Plutão a 12.500 km de distância, revelando um mundo com montanhas de gelo de nitrogênio, vulcões de criomagma e uma complexidade geológica surpreendente.',
          en: 'New Horizons flew by Pluto at 12,500 km distance, revealing a world with nitrogen ice mountains, cryovolcanoes and surprising geological complexity.',
          es: 'New Horizons pasó por Plutón a 12.500 km de distancia, revelando un mundo con montañas de hielo de nitrógeno, crivolcanes y una complejidad geológica sorprendente.'
        }
      },
      {
        id: 'missoes-9',
        tipo: 'multipla',
        texto: {
          pt: 'Qual dos Voyagers se tornou o objeto humano mais distante do espaço?',
          en: 'Which Voyager became the most distant human-made object in space?',
          es: '¿Cuál Voyager se convirtió en el objeto humano más distante del espacio?'
        },
        opcoes: {
          pt: ['Voyager 1', 'Voyager 2', 'Ambos igualmente distantes', 'New Horizons'],
          en: ['Voyager 1', 'Voyager 2', 'Both equally distant', 'New Horizons'],
          es: ['Voyager 1', 'Voyager 2', 'Ambos igualmente distantes', 'New Horizons']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'Voyager 1, lançada 2 semanas depois de Voyager 2, se tornou o objeto mais distante porque sua trajetória foi mais rápida. Atualmente está a ~24 bilhões de km do Sol (160 UA) e ainda transmite dados de volta à Terra!',
          en: 'Voyager 1, launched 2 weeks after Voyager 2, became the most distant because its trajectory was faster. It is now ~24 billion km from the Sun (160 AU) and still sends data back to Earth!',
          es: 'Voyager 1, lanzada 2 semanas después de Voyager 2, se convirtió en la más distante porque su trayectoria fue más rápida. Ahora está a ~24 mil millones de km del Sol (160 UA) ¡y aún envía datos a la Tierra!'
        }
      },
      {
        id: 'missoes-10',
        tipo: 'multipla',
        texto: {
          pt: 'Em que ano o Voyager 2 sobrevoou Netuno e revelou esse mundo azul?',
          en: 'In what year did Voyager 2 fly by Neptune and reveal that blue world?',
          es: '¿En qué año el Voyager 2 pasó por Neptuno y reveló ese mundo azul?'
        },
        opcoes: {
          pt: ['1985', '1987', '1989', '1991'],
          en: ['1985', '1987', '1989', '1991'],
          es: ['1985', '1987', '1989', '1991']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Voyager 2 sobrevoou Netuno em 25 de agosto de 1989. Foi a única sonda a visitar Netuno até hoje! Revelou Tritão, uma lua gelada com gêiseres, e muito mais sobre esse gigante azul e distante.',
          en: 'Voyager 2 flew by Neptune on August 25, 1989. It remains the only probe to visit Neptune! It revealed Triton, an icy moon with geysers, and much more about that distant blue giant.',
          es: 'Voyager 2 pasó por Neptuno el 25 de agosto de 1989. ¡Sigue siendo la única sonda que visita Neptuno! Reveló Tritón, una luna helada con géiseres, y mucho más sobre ese gigante azul lejano.'
        }
      },
      {
        id: 'missoes-11',
        tipo: 'multipla',
        texto: {
          pt: 'Qual sonda pousou em Titã, a lua de Saturno com atmosfera densa?',
          en: 'Which probe landed on Titan, the moon of Saturn with a dense atmosphere?',
          es: '¿Cuál sonda aterrizó en Titán, la luna de Saturno con atmósfera densa?'
        },
        opcoes: {
          pt: ['Cassini', 'Huygens', 'Rosetta', 'New Horizons'],
          en: ['Cassini', 'Huygens', 'Rosetta', 'New Horizons'],
          es: ['Cassini', 'Huygens', 'Rosetta', 'New Horizons']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Huygens pousou em Titã em 14 de janeiro de 2005 — o primeiro pouso em uma lua além da Terra! Cassini foi o orbitador que o levou. Huygens revelou lagos e mares de metano líquido na superfície gelada de Titã.',
          en: 'Huygens landed on Titan on January 14, 2005 — the first landing on a moon beyond Earth! Cassini was the orbiter that carried it. Huygens revealed lakes and seas of liquid methane on Titan\'s icy surface.',
          es: 'Huygens aterrizó en Titán el 14 de enero de 2005 — ¡el primer aterrizaje en una luna más allá de la Tierra! Cassini fue el orbitador que lo transportó. Huygens reveló lagos y mares de metano líquido en la superficie helada de Titán.'
        }
      },
      {
        id: 'missoes-12',
        tipo: 'multipla',
        texto: {
          pt: 'Quantos anos a sonda Cassini orbitou Saturno antes do seu "Grand Finale"?',
          en: 'How many years did the Cassini probe orbit Saturn before its "Grand Finale"?',
          es: '¿Cuántos años orbitó Cassini a Saturno antes de su "Gran Final"?'
        },
        opcoes: {
          pt: ['7 anos', '10 anos', '13 anos', '20 anos'],
          en: ['7 years', '10 years', '13 years', '20 years'],
          es: ['7 años', '10 años', '13 años', '20 años']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Cassini orbitou Saturno por 13 anos (2004-2017), fazendo descobertas revolucionárias! No "Grand Finale" de 2017, foi deliberadamente mergulhada em Saturno para destruí-la, evitando contaminação da frágil lua Encélado.',
          en: 'Cassini orbited Saturn for 13 years (2004-2017), making revolutionary discoveries! In the 2017 "Grand Finale," it was deliberately plunged into Saturn to destroy it, avoiding contamination of the fragile moon Enceladus.',
          es: 'Cassini orbitó Saturno durante 13 años (2004-2017), haciendo descubrimientos revolucionarios. En la "Gran Final" de 2017, fue deliberadamente sumergida en Saturno para destruirla, evitando la contaminación de la frágil luna Encélado.'
        }
      },
      {
        id: 'missoes-13',
        tipo: 'multipla',
        texto: {
          pt: 'Qual missão usou "estilingues" gravitacionais de Vênus, Terra e Júpiter para ganhar velocidade?',
          en: 'Which mission used gravitational "slingshots" from Venus, Earth, and Jupiter for speed?',
          es: '¿Cuál misión usó "estilingues" gravitacionales de Venus, Tierra y Júpiter para ganar velocidad?'
        },
        opcoes: {
          pt: ['Voyager 2', 'Cassini-Huygens', 'New Horizons', 'Rosetta'],
          en: ['Voyager 2', 'Cassini-Huygens', 'New Horizons', 'Rosetta'],
          es: ['Voyager 2', 'Cassini-Huygens', 'New Horizons', 'Rosetta']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Cassini usou uma série de estilingues gravitacionais para ganhar velocidade suficiente e chegar a Saturno. Passou por Vênus (2×), Terra (1×) e Júpiter (1×), ganhando velocidade com cada passagem. É uma aula de física orbital!',
          en: 'Cassini used a series of gravitational slingshots to gain enough speed to reach Saturn. It passed Venus (2×), Earth (1×), and Jupiter (1×), gaining speed with each pass. It\'s a lesson in orbital physics!',
          es: 'Cassini usó una serie de estilingues gravitacionales para ganar suficiente velocidad para llegar a Saturno. Pasó Venus (2×), Tierra (1×) y Júpiter (1×), ganando velocidad en cada paso. ¡Es una lección de física orbital!'
        }
      },
      {
        id: 'missoes-14',
        tipo: 'multipla',
        texto: {
          pt: 'Qual foi a primeira missão tripulada a deixar a órbita baixa da Terra desde 1972?',
          en: 'What was the first crewed mission to leave low Earth orbit since 1972?',
          es: '¿Cuál fue la primera misión tripulada en dejar la órbita baja de la Tierra desde 1972?'
        },
        opcoes: {
          pt: ['Artemis 1', 'Artemis 2', 'Axiom-1', 'Crew Dragon Demo-2'],
          en: ['Artemis 1', 'Artemis 2', 'Axiom-1', 'Crew Dragon Demo-2'],
          es: ['Artemis 1', 'Artemis 2', 'Axiom-1', 'Crew Dragon Demo-2']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Artemis 2 foi lançada em 2026, levando 4 astronautas ao redor da Lua. Foi a primeira missão tripulada além da órbita baixa em 54 anos, reavivando a exploração lunar humana e preparando o caminho para Artemis 3 (pouso na Lua).',
          en: 'Artemis 2 launched in 2026, taking 4 astronauts around the Moon. It was the first crewed mission beyond low Earth orbit in 54 years, reviving human lunar exploration and paving the way for Artemis 3 (lunar landing).',
          es: 'Artemis 2 se lanzó en 2026, llevando 4 astronautas alrededor de la Luna. Fue la primera misión tripulada más allá de la órbita baja en 54 años, reviviendo la exploración lunar humana y allanando el camino para Artemis 3 (aterrizaje lunar).'
        }
      },
      {
        id: 'missoes-15',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o planeta explorado por mais robôs do que qualquer outro.',
          en: 'Find the planet explored by more robots than any other.',
          es: 'Encuentra el planeta explorado por más robots que ningún otro.'
        },
        alvoId: 'marte',
        dica: {
          pt: 'Sojourner, Spirit, Curiosity e Perseverance pousaram na sua superfície vermelha.',
          en: 'Sojourner, Spirit, Curiosity and Perseverance landed on its red surface.',
          es: 'Sojourner, Spirit, Curiosity y Perseverance aterrizaron en su superficie roja.'
        },
        explicacao: {
          pt: 'Marte é o planeta mais visitado por robôs: já recebeu mais de 10 pousos bem-sucedidos. Os rovers procuram sinais de água antiga e preparam o caminho para futuros astronautas.',
          en: 'Mars is the planet most visited by robots: it has hosted more than 10 successful landings. The rovers search for signs of ancient water and pave the way for future astronauts.',
          es: 'Marte es el planeta más visitado por robots: ya recibió más de 10 aterrizajes exitosos. Los rovers buscan señales de agua antigua y preparan el camino para futuros astronautas.'
        }
      },
      {
        id: 'missoes-16',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o gigante que deu o empurrão de gravidade às sondas Voyager.',
          en: 'Find the giant that gave the Voyager probes their gravity boost.',
          es: 'Encuentra al gigante que dio el empujón de gravedad a las sondas Voyager.'
        },
        alvoId: 'jupiter',
        dica: {
          pt: 'As duas Voyagers passaram por ele em 1979 e usaram sua força como estilingue. É o maior planeta.',
          en: 'Both Voyagers flew past it in 1979 and used its pull as a slingshot. It is the largest planet.',
          es: 'Las dos Voyager pasaron junto a él en 1979 y usaron su fuerza como honda. Es el planeta más grande.'
        },
        explicacao: {
          pt: 'Júpiter funcionou como um estilingue gravitacional: sua enorme gravidade acelerou as Voyagers rumo a Saturno e além, economizando anos de viagem e combustível. Essa manobra é usada até hoje.',
          en: 'Jupiter worked as a gravitational slingshot: its huge gravity accelerated the Voyagers toward Saturn and beyond, saving years of travel and fuel. This maneuver is still used today.',
          es: 'Júpiter funcionó como una honda gravitacional: su enorme gravedad aceleró a las Voyager hacia Saturno y más allá, ahorrando años de viaje y combustible. Esta maniobra se usa hasta hoy.'
        }
      }
    ]
  },
  {
    id: 'sol-e-cometas',
    icone: '◇',
    nome: { pt: 'Sol e Cometas', en: 'Sun and Comets', es: 'Sol y Cometas' },
    perguntas: [
      {
        id: 'sol-1',
        tipo: 'multipla',
        texto: {
          pt: 'Quanto tempo leva para a luz do Sol chegar até a Terra?',
          en: 'How long does it take for sunlight to reach Earth?',
          es: '¿Cuánto tiempo tarda la luz del Sol en llegar a la Tierra?'
        },
        opcoes: {
          pt: ['3 minutos', '8 minutos', '15 minutos', '1 hora'],
          en: ['3 minutes', '8 minutes', '15 minutes', '1 hour'],
          es: ['3 minutos', '8 minutos', '15 minutos', '1 hora']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'A luz solar leva 8 minutos e 20 segundos para chegar à Terra. Isto significa que você está sempre vendo o Sol como ele era 8 minutos atrás!',
          en: 'Sunlight takes 8 minutes and 20 seconds to reach Earth. This means you are always seeing the Sun as it was 8 minutes ago!',
          es: 'La luz solar tarda 8 minutos y 20 segundos en llegar a la Tierra. Esto significa que siempre estás viendo el Sol como era hace 8 minutos.'
        }
      },
      {
        id: 'sol-2',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é a composição primária do Sol?',
          en: 'What is the primary composition of the Sun?',
          es: '¿Cuál es la composición primaria del Sol?'
        },
        opcoes: {
          pt: ['100% hélio', '73% hidrogênio, 25% hélio', '50% hidrogênio, 50% hélio', '90% oxigênio, 10% carbono'],
          en: ['100% helium', '73% hydrogen, 25% helium', '50% hydrogen, 50% helium', '90% oxygen, 10% carbon'],
          es: ['100% helio', '73% hidrógeno, 25% helio', '50% hidrógeno, 50% helio', '90% oxígeno, 10% carbono']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'O Sol é 73% hidrogênio e 25% hélio. No núcleo, reações nucleares contínuas transformam hidrogênio em hélio, liberando uma tremenda quantidade de energia.',
          en: 'The Sun is 73% hydrogen and 25% helium. In the core, continuous nuclear reactions transform hydrogen into helium, releasing tremendous energy.',
          es: 'El Sol es 73% hidrógeno y 25% helio. En el núcleo, reacciones nucleares continuas transforman hidrógeno en helio, liberando una tremenda cantidad de energía.'
        }
      },
      {
        id: 'sol-3',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o diâmetro do Sol em comparação com a Terra?',
          en: 'What is the Sun\'s diameter compared to Earth\'s?',
          es: '¿Cuál es el diámetro del Sol en comparación con la Tierra?'
        },
        opcoes: {
          pt: ['10 vezes maior', '50 vezes maior', '100 vezes maior', '1.300.000 vezes maior'],
          en: ['10 times larger', '50 times larger', '100 times larger', '1,300,000 times larger'],
          es: ['10 veces más grande', '50 veces más grande', '100 veces más grande', '1.300.000 veces más grande']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'O Sol tem um diâmetro ~109 vezes maior que a Terra (1.391.000 km vs 12.742 km). Caberiam 1,3 milhão de Terras dentro do Sol! É realmente gigantesco.',
          en: 'The Sun is ~109 times wider than Earth (1,391,000 km vs 12,742 km). 1.3 million Earths would fit inside the Sun! It is truly gigantic.',
          es: 'El Sol es ~109 veces más ancho que la Tierra (1.391.000 km vs 12.742 km). ¡1,3 millones de Tierras cabrían dentro del Sol! Es realmente gigantesco.'
        }
      },
      {
        id: 'sol-4',
        tipo: 'multipla',
        texto: {
          pt: 'O que é um cometa?',
          en: 'What is a comet?',
          es: '¿Qué es un cometa?'
        },
        opcoes: {
          pt: ['Uma estrela cadente de verdade', 'Um asteroide queimando na atmosfera', 'Um corpo gelado com órbita alongada que forma cauda perto do Sol', 'Um fragmento do interior do Sol'],
          en: ['A real shooting star', 'An asteroid burning in the atmosphere', 'An icy body with an elongated orbit that forms a tail near the Sun', 'A fragment from inside the Sun'],
          es: ['Una verdadera estrella fugaz', 'Un asteroide quemándose en la atmósfera', 'Un cuerpo helado con órbita alargada que forma cola cerca del Sol', 'Un fragmento del interior del Sol']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Um cometa é um corpo gelado (núcleo de rocha + gelo) que orbita o Sol em órbitas muito alongadas. Quando se aproxima do Sol, a radiação solar aquece o gelo, liberando gás e poeira que formam a bela cauda.',
          en: 'A comet is an icy body (rocky core + ice) orbiting the Sun in highly elongated orbits. When approaching the Sun, solar radiation heats the ice, releasing gas and dust that form the beautiful tail.',
          es: 'Un cometa es un cuerpo helado (núcleo rocoso + hielo) que orbita el Sol en órbitas muy alargadas. Cuando se acerca al Sol, la radiación solar calienta el hielo, liberando gas y polvo que forman la hermosa cola.'
        }
      },
      {
        id: 'sol-5',
        tipo: 'multipla',
        texto: {
          pt: 'Para qual lado a cauda de um cometa sempre aponta?',
          en: 'Which direction does a comet\'s tail always point?',
          es: '¿Hacia cuál lado siempre apunta la cola de un cometa?'
        },
        opcoes: {
          pt: ['Na direção do movimento da órbita', 'Para a frente, conforme se move', 'Sempre para longe do Sol', 'Sempre para o Sol'],
          en: ['In the direction of orbital motion', 'Straight ahead as it moves', 'Always away from the Sun', 'Always toward the Sun'],
          es: ['En la dirección del movimiento orbital', 'Hacia adelante conforme se mueve', 'Siempre lejos del Sol', 'Siempre hacia el Sol']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'A cauda de um cometa SEMPRE aponta para longe do Sol, devido ao vento solar (radiação de partículas do Sol). Isso significa que quando o cometa se afasta do Sol, ele navega com a cauda na frente!',
          en: 'A comet\'s tail ALWAYS points away from the Sun, due to solar wind (radiation from the Sun). This means when the comet moves away from the Sun, it travels with the tail leading!',
          es: 'La cola de un cometa SIEMPRE apunta lejos del Sol, debido al vento solar (radiación del Sol). Esto significa que cuando el cometa se aleja del Sol, ¡viaja con la cola adelante!'
        }
      },
      {
        id: 'sol-6',
        tipo: 'multipla',
        texto: {
          pt: 'Quantos anos são necessários para o Cometa Halley completar uma órbita completa?',
          en: 'How many years does it take Halley\'s Comet to complete one orbit?',
          es: '¿Cuántos años tarda el Cometa Halley en completar una órbita?'
        },
        opcoes: {
          pt: ['27 anos', '50 anos', '76 anos', '150 anos'],
          en: ['27 years', '50 years', '76 years', '150 years'],
          es: ['27 años', '50 años', '76 años', '150 años']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'O Cometa Halley volta a cada 75-76 anos. A última vez que visitou foi em 1986. Se você o viu naquela época, terá que esperar até 2061 para vê-lo novamente!',
          en: 'Halley\'s Comet returns every 75-76 years. It last visited in 1986. If you saw it then, you\'ll have to wait until 2061 to see it again!',
          es: 'El Cometa Halley regresa cada 75-76 años. La última vez que visitó fue en 1986. ¡Si lo viste entonces, tendrás que esperar hasta 2061 para verlo de nuevo!'
        }
      },
      {
        id: 'sol-7',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o centro de energia do sistema solar.',
          en: 'Find the energy center of our solar system.',
          es: 'Encuentra el centro de energía de nuestro sistema solar.'
        },
        alvoId: 'sol',
        dica: {
          pt: 'É a estrela central que aquece todos os planetas e dá vida à Terra.',
          en: 'It is the central star that heats all planets and gives life to Earth.',
          es: 'Es la estrella central que calienta todos los planetas y da vida a la Tierra.'
        },
        explicacao: {
          pt: 'O Sol é uma estrela anã amarela que converteu 600 milhões de toneladas de hidrogênio em hélio a cada segundo desde sua formação há 4,6 bilhões de anos.',
          en: 'The Sun is a yellow dwarf star converting 600 million tons of hydrogen into helium every second since its formation 4.6 billion years ago.',
          es: 'El Sol es una estrella enana amarilla que convierte 600 millones de toneladas de hidrógeno en helio cada segundo desde su formación hace 4,6 mil millones de años.'
        }
      },
      {
        id: 'sol-8',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o cometa mais famoso, que visita a Terra a cada 76 anos.',
          en: 'Find the most famous comet, which visits Earth every 76 years.',
          es: 'Encuentra el cometa más famoso, que visita la Tierra cada 76 años.'
        },
        alvoId: 'halley',
        dica: {
          pt: 'Sua próxima passagem será em 2061. Procure a cauda brilhante em órbita alongada.',
          en: 'Its next visit will be in 2061. Look for the bright tail on a stretched orbit.',
          es: 'Su próximo paso será en 2061. Busca la cola brillante en una órbita alargada.'
        },
        explicacao: {
          pt: 'O Halley é o único cometa brilhante que pode ser visto duas vezes numa vida humana. Em 1986, uma frota de sondas — incluindo a europeia Giotto — voou até ele e fotografou seu núcleo de perto pela primeira vez.',
          en: 'Halley is the only bright comet that can be seen twice in a human lifetime. In 1986, a fleet of probes — including Europe\'s Giotto — flew to it and photographed its nucleus up close for the first time.',
          es: 'El Halley es el único cometa brillante que puede verse dos veces en una vida humana. En 1986, una flota de sondas — incluida la europea Giotto — voló hasta él y fotografió su núcleo de cerca por primera vez.'
        }
      },
      {
        id: 'sol-9',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o período de rotação (ciclo de manchas solares) do Sol?',
          en: 'What is the rotation period (solar cycle of sunspots) of the Sun?',
          es: '¿Cuál es el período de rotación (ciclo de manchas solares) del Sol?'
        },
        opcoes: {
          pt: ['10-15 anos', '22-25 anos', '50-60 anos', '100+ anos'],
          en: ['10-15 years', '22-25 years', '50-60 years', '100+ years'],
          es: ['10-15 años', '22-25 años', '50-60 años', '100+ años']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'O ciclo solar é de ~22 anos (pode variar 20-25 anos). Durante esse ciclo, o número de manchas solares varia. Um ciclo máximo significa muitas manchas e atividade solar intensa; um mínimo significa poucas manchas e clima solar calmo.',
          en: 'The solar cycle is ~22 years (can vary 20-25 years). During this cycle, the number of sunspots varies. A solar maximum means many spots and intense solar activity; a minimum means few spots and calm solar weather.',
          es: 'El ciclo solar es de ~22 años (puede variar 20-25 años). Durante este ciclo, varía el número de manchas solares. Un máximo solar significa muchas manchas y actividad solar intensa; un mínimo significa pocas manchas y clima solar tranquilo.'
        }
      },
      {
        id: 'sol-10',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é a principal fonte de energia do Sol?',
          en: 'What is the primary source of energy of the Sun?',
          es: '¿Cuál es la principal fuente de energía del Sol?'
        },
        opcoes: {
          pt: ['Decomposição química', 'Fusão nuclear de hidrogênio em hélio', 'Reações de fissão', 'Fricção interna'],
          en: ['Chemical decay', 'Nuclear fusion of hydrogen to helium', 'Fission reactions', 'Internal friction'],
          es: ['Descomposición química', 'Fusión nuclear de hidrógeno en helio', 'Reacciones de fisión', 'Fricción interna']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'O Sol faz fusão nuclear no seu núcleo, transformando 600 milhões de toneladas de hidrogênio em hélio a cada segundo! Isso libera uma quantidade colossal de energia que aquece o planeta e dá vida à Terra.',
          en: 'The Sun undergoes nuclear fusion in its core, converting 600 million tons of hydrogen to helium every second! This releases a colossal amount of energy that heats the planet and gives life to Earth.',
          es: 'El Sol realiza fusión nuclear en su núcleo, ¡convirtiendo 600 millones de toneladas de hidrógeno en helio cada segundo! Esto libera una cantidad colosal de energía que calienta el planeta y da vida a la Tierra.'
        }
      },
      {
        id: 'sol-11',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é a temperatura do núcleo do Sol?',
          en: 'What is the temperature of the Sun\'s core?',
          es: '¿Cuál es la temperatura del núcleo del Sol?'
        },
        opcoes: {
          pt: ['~1 milhão °C', '~5,5 milhões °C', '~15 milhões °C', '~100 milhões °C'],
          en: ['~1 million °C', '~5.5 million °C', '~15 million °C', '~100 million °C'],
          es: ['~1 millón °C', '~5,5 millones °C', '~15 millones °C', '~100 millones °C']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'O núcleo do Sol alcança ~15 milhões de graus Celsius! A superfície é apenas 5.500 °C, enquanto a coroa (atmosfera externa) é paradoxalmente ainda mais quente — 1 a 3 milhões °C. Isto ainda é um mistério científico!',
          en: 'The Sun\'s core reaches ~15 million degrees Celsius! The surface is only 5,500 °C, while the corona (outer atmosphere) is paradoxically even hotter — 1 to 3 million °C. This is still a scientific mystery!',
          es: 'El núcleo del Sol alcanza ~15 millones de grados Celsius. La superficie es solo 5.500 °C, mientras que la corona (atmósfera exterior) es paradójicamente aún más caliente — 1 a 3 millones °C. ¡Esto sigue siendo un misterio científico!'
        }
      },
      {
        id: 'sol-12',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é a idade atual do Sol?',
          en: 'What is the current age of the Sun?',
          es: '¿Cuál es la edad actual del Sol?'
        },
        opcoes: {
          pt: ['~2 bilhões de anos', '~4,6 bilhões de anos', '~8 bilhões de anos', '~13,8 bilhões de anos'],
          en: ['~2 billion years', '~4.6 billion years', '~8 billion years', '~13.8 billion years'],
          es: ['~2 mil millones de años', '~4,6 mil millones de años', '~8 mil millones de años', '~13,8 mil millones de años']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'O Sol tem ~4,6 bilhões de anos e ainda é jovem — está no meio de sua vida. Tem ~5 bilhões de anos à esquerda antes de se transformar em uma gigante vermelha e depois em uma anã branca.',
          en: 'The Sun is ~4.6 billion years old and is still young — it is in the middle of its life. It has ~5 billion years left before it becomes a red giant and then a white dwarf.',
          es: 'El Sol tiene ~4,6 mil millones de años y aún es joven — está en la mitad de su vida. Tiene ~5 mil millones de años restantes antes de convertirse en una gigante roja y luego en una enana blanca.'
        }
      },
      {
        id: 'sol-13',
        tipo: 'multipla',
        texto: {
          pt: 'O que são as "manchas solares"?',
          en: 'What are "sunspots"?',
          es: '¿Qué son las "manchas solares"?'
        },
        opcoes: {
          pt: ['Depósitos de poeira e gás', 'Áreas mais frias que a superfície do Sol', 'Vulcões solares', 'Crateras de impacto'],
          en: ['Deposits of dust and gas', 'Areas cooler than the Sun\'s surface', 'Solar volcanoes', 'Impact craters'],
          es: ['Depósitos de polvo y gas', 'Áreas más frías que la superficie del Sol', 'Volcanes solares', 'Cráteres de impacto']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Manchas solares são áreas do Sol ~1.500 °C mais frias que a fotosfera (superfície), causadas por intenso campo magnético que inibe o transporte de calor. Apesar de serem "frias", ainda são incrivelmente quentes e brilham intensamente!',
          en: 'Sunspots are areas of the Sun ~1,500 °C cooler than the photosphere (surface), caused by intense magnetic fields that inhibit heat transport. Despite being "cool," they are still incredibly hot and shine brightly!',
          es: 'Las manchas solares son áreas del Sol ~1.500 °C más frías que la fotosfera (superficie), causadas por campos magnéticos intensos que inhiben el transporte de calor. ¡A pesar de ser "frías", siguen siendo increíblemente calientes y brillan intensamente!'
        }
      },
      {
        id: 'sol-14',
        tipo: 'multipla',
        texto: {
          pt: 'Qual cometa tem o período orbital mais longo entre os cometas periódicos?',
          en: 'Which comet has the longest orbital period among periodic comets?',
          es: '¿Cuál cometa tiene el período orbital más largo entre los cometas periódicos?'
        },
        opcoes: {
          pt: ['Halley', 'Hale-Bopp', 'Cometa Encke', 'Cometa d\'Arrest'],
          en: ['Halley', 'Hale-Bopp', 'Encke\'s Comet', 'd\'Arrest Comet'],
          es: ['Halley', 'Hale-Bopp', 'Cometa Encke', 'Cometa d\'Arrest']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Hale-Bopp leva 2.533 anos para completar uma órbita! Foi avistado em 1997 e não voltará até 4.385 d.C. Tem uma órbita muito mais excêntrica e alongada que a de Halley, passando bem distante do Sol.',
          en: 'Hale-Bopp takes 2,533 years to complete an orbit! It was seen in 1997 and won\'t return until 4,385 A.D. It has a much more eccentric and elongated orbit than Halley, passing far from the Sun.',
          es: 'Hale-Bopp tarda 2.533 años en completar una órbita. Fue visto en 1997 y no regresará hasta el año 4.385. Tiene una órbita mucho más excéntrica y alargada que la de Halley, pasando muy lejos del Sol.'
        }
      },
      {
        id: 'sol-15',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o planeta que sente o calor do Sol mais de perto.',
          en: 'Find the planet that feels the Sun\'s heat from closest up.',
          es: 'Encuentra el planeta que siente el calor del Sol más de cerca.'
        },
        alvoId: 'mercurio',
        dica: {
          pt: 'É o menor planeta e o mais veloz: dá a volta no Sol em apenas 88 dias.',
          en: 'It is the smallest and fastest planet: it circles the Sun in just 88 days.',
          es: 'Es el planeta más pequeño y veloz: da la vuelta al Sol en solo 88 días.'
        },
        explicacao: {
          pt: 'Mercúrio recebe até 7 vezes mais luz solar que a Terra. De dia ferve a 430 °C e de noite congela a −180 °C — a maior variação de temperatura de todo o sistema solar.',
          en: 'Mercury receives up to 7 times more sunlight than Earth. By day it bakes at 430°C and by night it freezes at −180°C — the biggest temperature swing in the entire solar system.',
          es: 'Mercurio recibe hasta 7 veces más luz solar que la Tierra. De día hierve a 430 °C y de noche se congela a −180 °C — la mayor variación de temperatura de todo el sistema solar.'
        }
      },
      {
        id: 'sol-16',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o maior cinturão de objetos gelados e origem dos cometas.',
          en: 'Find the largest belt of icy objects and source of comets.',
          es: 'Encuentra el cinturón más grande de objetos helados y fuente de cometas.'
        },
        alvoId: 'cinturao-kuiper',
        dica: {
          pt: 'Fica além de Netuno, contendo Plutão, Haumea, Makemake, e muitos cometas.',
          en: 'It lies beyond Neptune, containing Pluto, Haumea, Makemake, and many comets.',
          es: 'Se encuentra más allá de Neptuno, conteniendo Plutón, Haumea, Makemake y muchos cometas.'
        },
        explicacao: {
          pt: 'O Cinturão de Kuiper estende-se de ~30 a ~55 UA, contendo milhares de corpos gelados. É a origem dos cometas de período longo que às vezes são desviados em direção ao Sol por perturbações gravitacionais. Um mundo remoto ainda sendo explorado.',
          en: 'The Kuiper Belt extends from ~30 to ~55 AU, containing thousands of icy bodies. It is the origin of long-period comets that are sometimes diverted toward the Sun by gravitational disturbances. A remote world still being explored.',
          es: 'El Cinturón de Kuiper se extiende de ~30 a ~55 UA, conteniendo miles de cuerpos helados. Es el origen de cometas de período largo que a veces son desviados hacia el Sol por perturbaciones gravitacionales. Un mundo remoto aún siendo explorado.'
        }
      }
    ]
  },
  {
    id: 'telescopios',
    icone: '◈',
    nome: { pt: 'Telescópios e Sondas', en: 'Telescopes and Probes', es: 'Telescopios y Sondas' },
    perguntas: [
      {
        id: 'telescopios-1',
        tipo: 'multipla',
        texto: {
          pt: 'Em que ano o Telescópio Espacial Hubble foi lançado?',
          en: 'In what year was the Hubble Space Telescope launched?',
          es: '¿En qué año fue lanzado el Telescopio Espacial Hubble?'
        },
        opcoes: {
          pt: ['1985', '1990', '1995', '2000'],
          en: ['1985', '1990', '1995', '2000'],
          es: ['1985', '1990', '1995', '2000']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Hubble foi lançado em 1990 e revolucionou a astronomia! Tinha um defeito no espelho no início, mas foi reparado em 1993 e desde então tem feito milhões de observações incríveis da galáxia.',
          en: 'Hubble launched in 1990 and revolutionized astronomy! It had a mirror defect initially, but was repaired in 1993 and has since made millions of incredible observations of the universe.',
          es: 'Hubble se lanzó en 1990 y revolucionó la astronomía. Tenía un defecto en el espejo al principio, pero fue reparado en 1993 y desde entonces ha hecho millones de observaciones increíbles del universo.'
        }
      },
      {
        id: 'telescopios-2',
        tipo: 'multipla',
        texto: {
          pt: 'Qual é o diâmetro do espelho do Telescópio Hubble?',
          en: 'What is the diameter of the Hubble Space Telescope\'s mirror?',
          es: '¿Cuál es el diámetro del espejo del Telescopio Hubble?'
        },
        opcoes: {
          pt: ['1,2 m', '2,4 m', '4,0 m', '6,5 m'],
          en: ['1.2 m', '2.4 m', '4.0 m', '6.5 m'],
          es: ['1,2 m', '2,4 m', '4,0 m', '6,5 m']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'O espelho primário de Hubble tem 2,4 metros de diâmetro. Apesar de parecer pequeno comparado aos telescópios terrestres gigantes, sua posição no espaço sem distorção atmosférica o torna incrivelmente poderoso.',
          en: 'Hubble\'s primary mirror is 2.4 meters in diameter. Although small compared to giant ground-based telescopes, its position in space without atmospheric distortion makes it incredibly powerful.',
          es: 'El espejo primario de Hubble tiene 2,4 metros de diámetro. Aunque parece pequeño comparado con telescopios terrestres gigantes, su posición en el espacio sin distorsión atmosférica lo hace increíblemente poderoso.'
        }
      },
      {
        id: 'telescopios-3',
        tipo: 'multipla',
        texto: {
          pt: 'Aproximadamente quantas observações o Hubble realizou até agora?',
          en: 'Approximately how many observations has Hubble made so far?',
          es: '¿Aproximadamente cuántas observaciones ha realizado Hubble hasta ahora?'
        },
        opcoes: {
          pt: ['500 mil', '500 milhões', '1,6 milhões', '10 milhões'],
          en: ['500,000', '500 million', '1.6 million', '10 million'],
          es: ['500 mil', '500 millones', '1,6 millones', '10 millones']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Hubble já realizou mais de 1,6 milhões de observações! Cada observação fornece dados que os astrônomos estudam para entender galáxias, nebulosas, supernovas e muito mais.',
          en: 'Hubble has made over 1.6 million observations! Each observation provides data that astronomers study to understand galaxies, nebulae, supernovas, and much more.',
          es: 'Hubble ha realizado más de 1,6 millones de observaciones. Cada observación proporciona datos que los astrónomos estudian para entender galaxias, nebulosas, supernovas y mucho más.'
        }
      },
      {
        id: 'telescopios-4',
        tipo: 'multipla',
        texto: {
          pt: 'O James Webb Space Telescope foi lançado em qual ano?',
          en: 'In what year was the James Webb Space Telescope launched?',
          es: '¿En qué año fue lanzado el Telescopio Espacial James Webb?'
        },
        opcoes: {
          pt: ['2019', '2020', '2021', '2022'],
          en: ['2019', '2020', '2021', '2022'],
          es: ['2019', '2020', '2021', '2022']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'James Webb foi lançado em 2021 e está posicionado no ponto L2, a 1,5 milhão de km de distância! É o sucessor de Hubble e enxerga principalmente em infravermelho, permitindo observar as galáxias mais antigas do universo.',
          en: 'James Webb launched in 2021 and is positioned at Lagrange point L2, 1.5 million km away! It is Hubble\'s successor and sees primarily in infrared, allowing observation of the universe\'s oldest galaxies.',
          es: 'James Webb se lanzó en 2021 y está posicionado en el punto L2, ¡a 1,5 millones de km de distancia! Es el sucesor de Hubble y ve principalmente en infrarrojo, permitiendo observar las galaxias más antiguas del universo.'
        }
      },
      {
        id: 'telescopios-5',
        tipo: 'multipla',
        texto: {
          pt: 'Quantos segmentos hexagonais tem o espelho do James Webb?',
          en: 'How many hexagonal segments does the James Webb mirror have?',
          es: '¿Cuántos segmentos hexagonales tiene el espejo de James Webb?'
        },
        opcoes: {
          pt: ['6 segmentos', '12 segmentos', '18 segmentos', '24 segmentos'],
          en: ['6 segments', '12 segments', '18 segments', '24 segments'],
          es: ['6 segmentos', '12 segmentos', '18 segmentos', '24 segmentos']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'O espelho de James Webb é feito de 18 segmentos hexagonais de ouro e berílio! Cada segmento pode ser ajustado individualmente para manter o foco. O espelho total é de 6,5 metros — 2,7 vezes maior que Hubble.',
          en: 'James Webb\'s mirror consists of 18 hexagonal segments of gold and beryllium! Each segment can be adjusted individually to maintain focus. The total mirror is 6.5 meters — 2.7 times larger than Hubble.',
          es: 'El espejo de James Webb consta de 18 segmentos hexagonales de oro y berilio. ¡Cada segmento puede ajustarse individualmente para mantener el enfoque! El espejo total es de 6,5 metros — 2,7 veces más grande que Hubble.'
        }
      },
      {
        id: 'telescopios-6',
        tipo: 'multipla',
        texto: {
          pt: 'Voyager 1 e 2 foram lançadas em qual década?',
          en: 'Which decade were Voyager 1 and 2 launched?',
          es: '¿En cuál década fueron lanzadas las Voyager 1 y 2?'
        },
        opcoes: {
          pt: ['1960s', '1970s', '1980s', '1990s'],
          en: ['1960s', '1970s', '1980s', '1990s'],
          es: ['Años 60', 'Años 70', 'Años 80', 'Años 90']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Ambas Voyagers foram lançadas em 1977 — Voyager 2 em agosto e Voyager 1 em setembro. Foram as primeiras a visitar Júpiter e Saturno e continuam em operação hoje, enviando dados do espaço interestelar!',
          en: 'Both Voyagers launched in 1977 — Voyager 2 in August and Voyager 1 in September. They were the first to visit Jupiter and Saturn and continue operating today, sending data from interstellar space!',
          es: 'Ambas Voyagers se lanzaron en 1977 — Voyager 2 en agosto y Voyager 1 en septiembre. Fueron las primeras en visitar Júpiter y Saturno y aún continúan en operación hoy, ¡enviando datos desde el espacio interestelar!'
        }
      },
      {
        id: 'telescopios-7',
        tipo: 'multipla',
        texto: {
          pt: 'Qual Voyager foi a única a visitar Urano e Netuno?',
          en: 'Which Voyager was the only one to visit Uranus and Neptune?',
          es: '¿Cuál Voyager fue la única en visitar Urano y Neptuno?'
        },
        opcoes: {
          pt: ['Voyager 1', 'Voyager 2', 'Ambas igualmente', 'Pioneer 10'],
          en: ['Voyager 1', 'Voyager 2', 'Both equally', 'Pioneer 10'],
          es: ['Voyager 1', 'Voyager 2', 'Ambas igualmente', 'Pioneer 10']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Voyager 2 é a ÚNICA sonda que visitou os quatro gigantes gasosos: Júpiter (1979), Saturno (1981), Urano (1986) e Netuno (1989). Voyager 1 visitou apenas Júpiter e Saturno, mas foi mais rápido e agora está mais distante.',
          en: 'Voyager 2 is the ONLY probe to visit all four gas giants: Jupiter (1979), Saturn (1981), Uranus (1986), and Neptune (1989). Voyager 1 visited only Jupiter and Saturn, but went faster and is now farther away.',
          es: 'Voyager 2 es la ÚNICA sonda que visitó los cuatro gigantes gaseosos: Júpiter (1979), Saturno (1981), Urano (1986) y Neptuno (1989). Voyager 1 visitó solo Júpiter y Saturno, pero fue más rápido y ahora está más lejos.'
        }
      },
      {
        id: 'telescopios-8',
        tipo: 'multipla',
        texto: {
          pt: 'A sonda New Horizons sobrevoou Plutão em qual ano?',
          en: 'In what year did New Horizons fly by Pluto?',
          es: '¿En qué año la sonda New Horizons pasó por Plutón?'
        },
        opcoes: {
          pt: ['2010', '2013', '2015', '2017'],
          en: ['2010', '2013', '2015', '2017'],
          es: ['2010', '2013', '2015', '2017']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'New Horizons sobrevoou Plutão em 14 de julho de 2015, revelando um mundo muito mais complexo do que imaginado — com montanhas de gelo de nitrogênio, vulcões de criomagma e uma grande bacia em forma de coração!',
          en: 'New Horizons flew by Pluto on July 14, 2015, revealing a world far more complex than imagined — with nitrogen ice mountains, cryovolcanoes, and a large heart-shaped basin!',
          es: 'New Horizons pasó por Plutón el 14 de julio de 2015, revelando un mundo mucho más complejo de lo imaginado — ¡con montañas de hielo de nitrógeno, crivolcanes y una gran cuenca en forma de corazón!'
        }
      },
      {
        id: 'telescopios-9',
        tipo: 'multipla',
        texto: {
          pt: 'Quantos anos a sonda Cassini orbitou Saturno?',
          en: 'How many years did Cassini orbit Saturn?',
          es: '¿Cuántos años orbitó Cassini a Saturno?'
        },
        opcoes: {
          pt: ['7 anos', '10 anos', '13 anos', '20 anos'],
          en: ['7 years', '10 years', '13 years', '20 years'],
          es: ['7 años', '10 años', '13 años', '20 años']
        },
        corretaIndex: 2,
        explicacao: {
          pt: 'Cassini orbitou Saturno de 2004 a 2017 — 13 anos de exploração! Descobriu plumas de água gelada em Encélado, lagos de metano em Titã, e no final foi deliberadamente mergulhada em Saturno no "Grand Finale".',
          en: 'Cassini orbited Saturn from 2004 to 2017 — 13 years of exploration! It discovered frozen water plumes on Enceladus, methane lakes on Titan, and finally deliberately plunged into Saturn in the "Grand Finale".',
          es: 'Cassini orbitó Saturno de 2004 a 2017 — ¡13 años de exploración! Descubrió penachos de agua congelada en Encélado, lagos de metano en Titán, y finalmente se sumergió deliberadamente en Saturno en la "Gran Final".'
        }
      },
      {
        id: 'telescopios-10',
        tipo: 'multipla',
        texto: {
          pt: 'Qual sonda foi a primeira a orbitar e pousar em um cometa?',
          en: 'Which probe was the first to orbit and land on a comet?',
          es: '¿Cuál sonda fue la primera en orbitar y aterrizar en un cometa?'
        },
        opcoes: {
          pt: ['Voyager 2', 'Rosetta', 'New Horizons', 'Cassini'],
          en: ['Voyager 2', 'Rosetta', 'New Horizons', 'Cassini'],
          es: ['Voyager 2', 'Rosetta', 'New Horizons', 'Cassini']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Rosetta foi a primeira e única sonda a orbitar um cometa (67P/Churyumov-Gerasimenko). Liberou o módulo de pouso Philae que tocou a superfície do cometa — um feito histórico de engenharia!',
          en: 'Rosetta was the first and only probe to orbit a comet (67P/Churyumov-Gerasimenko). It released the Philae lander which touched the comet\'s surface — a historic feat of engineering!',
          es: 'Rosetta fue la primera y única sonda en orbitar un cometa (67P/Churyumov-Gerasimenko). Liberó el módulo Philae que tocó la superficie del cometa — ¡un logro histórico de la ingeniería!'
        }
      },
      {
        id: 'telescopios-11',
        tipo: 'multipla',
        texto: {
          pt: 'Apollo 11 pousou na Lua em qual data histórica?',
          en: 'On what historic date did Apollo 11 land on the Moon?',
          es: '¿En cuál fecha histórica Apollo 11 aterrizó en la Luna?'
        },
        opcoes: {
          pt: ['20 de julho de 1969', '21 de julho de 1969', '20 de julho de 1972', '1º de agosto de 1969'],
          en: ['July 20, 1969', 'July 21, 1969', 'July 20, 1972', 'August 1, 1969'],
          es: ['20 de julio de 1969', '21 de julio de 1969', '20 de julio de 1972', '1º de agosto de 1969']
        },
        corretaIndex: 0,
        explicacao: {
          pt: 'Apollo 11 pousou em 20 de julho de 1969 no Mar da Tranquilidade. Neil Armstrong foi o primeiro a caminhar na Lua, seguido por Buzz Aldrin. Michael Collins permaneceu em órbita no módulo de comando.',
          en: 'Apollo 11 landed on July 20, 1969 in the Sea of Tranquility. Neil Armstrong was the first to walk on the Moon, followed by Buzz Aldrin. Michael Collins remained in orbit in the Command Module.',
          es: 'Apollo 11 aterrizó el 20 de julio de 1969 en el Mar de la Tranquilidad. Neil Armstrong fue el primero en caminar en la Luna, seguido por Buzz Aldrin. Michael Collins permaneció en órbita en el módulo de comando.'
        }
      },
      {
        id: 'telescopios-12',
        tipo: 'multipla',
        texto: {
          pt: 'Artemis 2 é uma missão que deve levar astronautas aonde?',
          en: 'Artemis 2 is a mission that will take astronauts where?',
          es: '¿Artemis 2 es una misión que llevará a los astronautas a dónde?'
        },
        opcoes: {
          pt: ['Pouso direto na Lua', 'Órbita ao redor da Lua (sobrevoo)', 'Marte', 'Estação Espacial Internacional'],
          en: ['Direct landing on the Moon', 'Orbit around the Moon (flyby)', 'Mars', 'International Space Station'],
          es: ['Aterrizaje directo en la Luna', 'Órbita alrededor de la Luna (sobrevolo)', 'Marte', 'Estación Espacial Internacional']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Artemis 2 (lançada em 2026) é um sobrevoo tripulado da Lua, não um pouso. Levará 4 astronautas ao redor da Lua e de volta. É a primeira missão tripulada além da órbita baixa desde 1972, reabrindo a era de exploração lunar!',
          en: 'Artemis 2 (launching in 2026) is a crewed lunar flyby, not a landing. It will take 4 astronauts around the Moon and back. It\'s the first crewed mission beyond low Earth orbit since 1972, reopening the age of lunar exploration!',
          es: 'Artemis 2 (lanzada en 2026) es un sobrevolo lunar tripulado, no un aterrizaje. Llevará 4 astronautas alrededor de la Luna y de regreso. ¡Es la primera misión tripulada más allá de la órbita baja desde 1972, reabriendo la era de exploración lunar!'
        }
      },
      {
        id: 'telescopios-13',
        tipo: 'multipla',
        texto: {
          pt: 'Qual sonda estuda Júpiter e é movida principalmente por energia solar?',
          en: 'Which probe studies Jupiter and is powered primarily by solar energy?',
          es: '¿Cuál sonda estudia a Júpiter y es impulsada principalmente por energía solar?'
        },
        opcoes: {
          pt: ['Cassini', 'Juno', 'New Horizons', 'Voyager 1'],
          en: ['Cassini', 'Juno', 'New Horizons', 'Voyager 1'],
          es: ['Cassini', 'Juno', 'New Horizons', 'Voyager 1']
        },
        corretaIndex: 1,
        explicacao: {
          pt: 'Juno é a primeira sonda a Júpiter movida por painéis solares — uma façanha tecnológica! Desde 2016, orbita Júpiter, estudando sua atmosfera, campos magnéticos e estrutura interna profunda.',
          en: 'Juno is the first Jupiter probe powered by solar panels — a technological feat! Since 2016, it has orbited Jupiter, studying its atmosphere, magnetic fields, and deep interior structure.',
          es: 'Juno es la primera sonda a Júpiter impulsada por paneles solares — ¡un logro tecnológico! Desde 2016, orbita Júpiter, estudiando su atmósfera, campos magnéticos y estructura interna profunda.'
        }
      },
      {
        id: 'telescopios-encontrar-1',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o telescópio espacial que revolucionou a astronomia em 1990.',
          en: 'Find the space telescope that revolutionized astronomy in 1990.',
          es: 'Encuentra el telescopio espacial que revolucionó la astronomía en 1990.'
        },
        alvoId: 'hubble',
        dica: {
          pt: 'Seu nome é de um famoso astrônomo americano. Orbita a Terra a ~540 km de altitude.',
          en: 'It is named after a famous American astronomer. It orbits Earth at ~540 km altitude.',
          es: 'Lleva el nombre de un famoso astrónomo americano. Orbita la Tierra a ~540 km de altitud.'
        },
        explicacao: {
          pt: 'O Telescópio Espacial Hubble foi um divisor de águas na astronomia, permitindo observações nunca antes possíveis. Com seu espelho de 2,4 m acima da atmosfera, trouxe clareza a questões que confundiam astrônomos há séculos.',
          en: 'The Hubble Space Telescope was a game-changer in astronomy, enabling observations never before possible. With its 2.4 m mirror above Earth\'s atmosphere, it brought clarity to questions that had puzzled astronomers for centuries.',
          es: 'El Telescopio Espacial Hubble fue un cambio de juego en la astronomía, permitiendo observaciones nunca antes posibles. Con su espejo de 2,4 m sobre la atmósfera terrestre, aportó claridad a preguntas que habían desconcertado a los astrónomos durante siglos.'
        }
      },
      {
        id: 'telescopios-encontrar-2',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o telescópio mais avançado que observa principalmente em infravermelho.',
          en: 'Find the most advanced telescope that observes primarily in infrared.',
          es: 'Encuentra el telescopio más avanzado que observa principalmente en infrarrojo.'
        },
        alvoId: 'jwst',
        dica: {
          pt: 'Lançado em 2021, seu nome é de um ex-diretor da NASA. Está no ponto L2 a 1,5 milhão de km de distância.',
          en: 'Launched in 2021, it is named after a former NASA administrator. It is at Lagrange point L2, 1.5 million km away.',
          es: 'Lanzado en 2021, lleva el nombre de un ex-administrador de la NASA. Está en el punto L2 a 1,5 millones de km de distancia.'
        },
        explicacao: {
          pt: 'James Webb é o sucessor de Hubble e uma maravilha tecnológica. Seu espelho de 6,5 m feito de 18 segmentos hexagonais e sua visão infravermelha permitem ver as galáxias mais distantes e antigas do universo!',
          en: 'James Webb is Hubble\'s successor and a technological marvel. Its 6.5 m mirror made of 18 hexagonal segments and infrared vision allow it to see the most distant and ancient galaxies in the universe!',
          es: 'James Webb es el sucesor de Hubble y una maravilla tecnológica. Su espejo de 6,5 m hecho de 18 segmentos hexagonales y su visión infrarroja le permiten ver las galaxias más distantes y antiguas del universo.'
        }
      },
      {
        id: 'telescopios-encontrar-3',
        tipo: 'encontrar',
        texto: {
          pt: 'Encontre o gigante gasoso que foi explorado pela missão Cassini-Huygens durante 13 anos.',
          en: 'Find the gas giant that was explored by the Cassini-Huygens mission for 13 years.',
          es: 'Encuentra el gigante gaseoso que fue explorado por la misión Cassini-Huygens durante 13 años.'
        },
        alvoId: 'saturno',
        dica: {
          pt: 'É famoso por seus anéis espectaculares. Cassini orbitou este planeta de 2004 a 2017.',
          en: 'It is famous for its spectacular rings. Cassini orbited this planet from 2004 to 2017.',
          es: 'Es famoso por sus anillos espectaculares. Cassini orbitó este planeta de 2004 a 2017.'
        },
        explicacao: {
          pt: 'Saturno foi explorado por Cassini-Huygens, revelando mundos fascinantes ao seu redor. A sonda Huygens pousou em Titã, revelando lagos de metano; Cassini descobriu plumas de água gelada em Encélado e muito mais durante 13 anos de exploração.',
          en: 'Saturn was explored by Cassini-Huygens, revealing fascinating worlds around it. The Huygens probe landed on Titan, revealing methane lakes; Cassini discovered frozen water plumes on Enceladus and much more over 13 years of exploration.',
          es: 'Saturno fue explorado por Cassini-Huygens, revelando mundos fascinantes a su alrededor. La sonda Huygens aterrizó en Titán, revelando lagos de metano; Cassini descubrió penachos de agua congelada en Encélado y mucho más durante 13 años de exploración.'
        }
      }
    ]
  }
];

