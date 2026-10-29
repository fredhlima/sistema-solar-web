// Traduções en/es dos textos do Hangar (VIAGEM e COMPONENTES)
// Estrutura espelhada de VIAGEM e COMPONENTES/COMPONENTES_PROCEDURAIS de frota-componentes.js
// Exporta: TEXTOS_COMPONENTES, TEXTOS_VIAGEM
// Regras:
// - Tradução sem alterar fatos (números, datas, nomes próprios)
// - Formato de número: en usa ponto (110.6 m), es/pt usam vírgula (110,6 m)
// - Termos técnicos preservados com suas traduções canônicas
// - Ênfase (negrito) preservada onde estava

export const TEXTOS_VIAGEM = {
  en: [
    // Passo 1
    'Liftoff. Two thousand nine hundred tons leave the ground — and almost 90% of it is just fuel.',
    // Passo 2
    'Two and a half minutes later, the 1st stage runs out of fuel and falls into the Atlantic. By then it had climbed 68 km.',
    // Passo 3
    'At three minutes, now beyond the atmosphere, the launch escape tower is no longer needed and is jettisoned.',
    // Passo 4
    'At nine minutes the 2nd stage falls away and the 3rd takes over. Three minutes later, the spacecraft enters Earth orbit.',
    // Passo 5
    'Nearly three hours after liftoff, the 3rd stage reignites and pushes the spacecraft toward the Moon. Then it is jettisoned; on later missions, intentionally crashed into the Moon to create vibrations that seismographs left there could measure.',
    // Passo 6
    'Lunar orbit — the Lunar Module descends with two astronauts. On ascent back, its lower part stays on the Moon forever: it is the platform that appears in photographs.',
    // Passo 7
    'Coming home — the Service Module, with the engine and tanks, is jettisoned and burns up in the atmosphere. Only the capsule remains.',
    // Passo 8
    'From 111 meters and 2,900 tons, this cone of 3.9 meters returned: the Columbia, with three people inside.',
  ],
  es: [
    // Passo 1
    'Despegue. Dos mil novecientos toneladas salen del suelo — y casi el 90% de eso es solo combustible.',
    // Passo 2
    'Dos minutos y medio después, la primera etapa se queda sin combustible y cae al Atlántico. Para entonces ya había subido 68 km.',
    // Passo 3
    'A los tres minutos, ya fuera de la atmósfera, la torre de escape ya no sirve para nada y se descarta.',
    // Passo 4
    'A los nueve minutos la segunda etapa se separa y la tercera toma el relevo. Tres minutos después, la nave entra en órbita terrestre.',
    // Passo 5
    'Casi tres horas después del despegue, la tercera etapa se enciende de nuevo e impulsa la nave hacia la Luna. Luego se descarta; en las últimas misiones, se lanzaba intencionalmente a la Luna para generar vibraciones que los sismógrafos dejados allá pudieran medir.',
    // Passo 6
    'Órbita lunar — el Módulo Lunar desciende con dos astronautas. Al despegue de regreso, su parte inferior se queda en la Luna para siempre: es la plataforma que aparece en las fotografías.',
    // Passo 7
    'Regresando a casa — el Módulo de Servicio, con el motor y los tanques, se descarta y se quema en la atmósfera. Solo queda la cápsula.',
    // Passo 8
    'De 111 metros y 2.900 toneladas, volvió este cono de 3,9 metros: la Columbia, con tres personas dentro.',
  ],
};

export const TEXTOS_COMPONENTES = {
  en: {
    'saturno-v': {
      'f1': {
        nome: 'F-1 engines',
        explicacao: 'Five engines, the most powerful ever mounted on a rocket that flew. Together they burn **13 tons of fuel per second** — an entire fuel truck every second, for two and a half minutes. Each nozzle is wide enough for a person to stand inside.',
      },
      's-ic': {
        nome: '1st stage (S-IC)',
        explicacao: 'Two stacked tanks: kerosene below, liquid oxygen above. On its own, this stage is taller than a thirteen-storey building, and in two and a half minutes it empties everything and falls into the Atlantic. It lifts the whole rocket only to 68 km — less than a tenth of the way to the Moon, but the hardest part, because that is where the weight is greatest.',
      },
      's-ii': {
        nome: '2nd stage (S-II)',
        explicacao: 'Five engines burning liquid hydrogen, stored at **253 degrees below zero**. This stage carries the spacecraft to the edge of space, nearly reaching the speed needed to achieve orbit.',
      },
      's-ivb': {
        nome: '3rd stage (S-IVB)',
        explicacao: 'The only stage that fires twice. First, it places the spacecraft in Earth orbit, where the crew does several loops checking everything. Second, it burns for about 5 minutes and sends the spacecraft toward the Moon at 39,000 km/h — this maneuver has its own name: trans-lunar injection.',
      },
      'iu': {
        nome: 'Instrument Unit',
        explicacao: 'The brain of the rocket, a ring less than a meter tall mounted just above the 3rd stage. It housed the onboard computer, the gyroscopes that knew which direction the rocket was pointing, and the radio that talked to Earth. That computer had about 100,000 bytes of memory — less than a single photo from your phone — and yet it guided 111 meters of rocket to the Moon.',
      },
      'sla': {
        nome: 'Lunar Module Adapter',
        explicacao: 'The cone that narrows from 6.6 to 3.9 meters and closes off the top of the rocket. From outside it looks like a plain fairing; inside it is the garage of the Lunar Module, which rides up folded in here and only comes out once the spacecraft is already on its way to the Moon. Its four walls open like petals to release it.',
      },
      'lm': {
        nome: 'Lunar Module',
        explicacao: 'The Eagle traveled folded up inside here, with its legs tucked. In some places its walls were thinner than aluminum foil: since it never needed to withstand air, only the vacuum, every gram was saved. It is two spacecraft in one: the bottom part descends and stays on the Moon forever, while only the top part launches back.',
      },
      'sm': {
        nome: 'Service Module',
        explicacao: 'The cylinder behind the capsule, with the main engine, the oxygen tanks and the fuel cells that generated power. It accompanies the entire journey and is jettisoned minutes before reentry — it burns up in the atmosphere. It was an oxygen tank from here that exploded on Apollo 13.',
      },
      'cm': {
        nome: 'Command Module',
        explicacao: 'The cone where three astronauts lived for eight days, in a space like the inside of a car. Named Columbia. It is the only piece, among the 111 meters that launched, that returned to Earth — and it returned with the heat shield burned, entering the atmosphere at 40,000 km/h.',
      },
      'les': {
        nome: 'Launch escape tower',
        explicacao: 'A thin rod at the top that is itself an emergency rocket: if something went wrong at launch, it would pull the capsule with the crew away in less than a second. It was more powerful than the entire rocket that sent the first American to space. At 3 minutes of flight it was no longer needed and was jettisoned. On no Apollo mission did it ever need to be used.',
      },
    },
    'onibus-espacial': {
      'orbitador': {
        nome: 'Orbiter',
        explicacao: 'The aeroplane. The cargo hold is 18 meters long — an entire city bus would fit inside — and out of it came satellites, the Hubble telescope and much of the Space Station. On the way back, with no engines and no fuel for a second attempt, it becomes a 78-ton glider with a single chance to hit the runway. The dark belly is covered by **more than 20,000 ceramic tiles**, each with its own shape and one place only where it fits.',
      },
      'tanque': {
        nome: 'External tank',
        explicacao: 'The biggest piece of the stack and the only one that never came back: it fed the orbiter\'s three engines on the way up and, almost in orbit, was released to burn up in the atmosphere. The orange is not paint, it is the insulating foam left bare. The first two flights were painted white; they worked out the paint added some 270 kg of useless weight, and never painted one again.',
      },
      'srb': {
        nome: 'Solid rocket boosters',
        explicacao: 'The two white cylinders that give almost all the push of the first two minutes. Solid fuel has no tap: once lit, there is no shutting it down or turning it low until it runs out. At two minutes they let go, come down on parachutes into the Atlantic, are fished out by ships and fly again after being refurbished.',
      },
      'baia': {
        nome: 'Cargo bay',
        explicacao: 'The hold is 18 meters long by 4.6 meters wide — you could fit an entire city bus inside. From here came satellites, the Hubble telescope and the modules that formed the Space Station. The doors open into space not only to load and unload: the inside of the doors is a radiator. Without opening them, the shuttle overheats from its own heat in a few hours.',
      },
      'cabine': {
        nome: 'Command cabin',
        explicacao: 'Two decks, for up to seven people. On top are the commander and pilot, surrounded by **more than 2,000 displays, switches and circuit breakers**; below are the beds, the food and the exit hatch. The windows have three layers of glass: the outside one glows red-hot on the way home, while the inside one stays warm to the touch.',
      },
      'asas': {
        nome: 'Wings and rudder',
        explicacao: 'They only work on the way back. On ascent they are dead weight that must be carried to orbit. On reentry, with engines off and no fuel to try again, the shuttle becomes a 78-ton glider with only one chance to hit the runway right. The wings span 23.8 meters — exactly the length of a tennis court.',
      },
      'motores': {
        nome: 'Engines and thrusters',
        explicacao: 'The three main engines at the rear only work on ascent, powered by the external tank trailing behind. Once in orbit, the two OMS pods do the work, the lateral pods that change the orbit height and provide the braking thrust to come home. Small RCS thrusters spin the spacecraft in the vacuum — up there there is no air for the wings to push against.',
      },
      'escudo': {
        nome: 'Heat shield',
        explicacao: 'The dark underside is covered with more than **20,000 ceramic tiles**, each with its own shape and its own place — you cannot swap one for its neighbor, and all were glued by hand. They insulate so well that you can hold one by the edges seconds after pulling it from a white-hot oven. They are the only reason the shuttle does not melt on the way back.',
      },
    },
  },
  es: {
    'saturno-v': {
      'f1': {
        nome: 'Motores F-1',
        explicacao: 'Cinco motores, los más potentes jamás montados en un cohete que haya volado. Juntos queman **13 toneladas de combustible por segundo** — un camión cisterna completo cada segundo, durante dos minutos y medio. Cada boquilla es lo suficientemente ancha para que una persona quepa de pie dentro.',
      },
      's-ic': {
        nome: '1ª etapa (S-IC)',
        explicacao: 'Dos tanques apilados: queroseno abajo, oxígeno líquido arriba. Por sí sola, esta etapa es más alta que un edificio de trece pisos, y en dos minutos y medio lo vacía todo y cae al Atlántico. Levanta el cohete entero solo hasta los 68 km — menos de una décima parte del camino a la Luna, pero la parte más difícil, porque es donde el peso es mayor.',
      },
      's-ii': {
        nome: '2ª etapa (S-II)',
        explicacao: 'Cinco motores alimentados por hidrógeno líquido, almacenado a **253 grados bajo cero**. Esta etapa lleva la nave al borde del espacio, casi a la velocidad necesaria para entrar en órbita.',
      },
      's-ivb': {
        nome: '3ª etapa (S-IVB)',
        explicacao: 'La única que se enciende dos veces. Primero, coloca la nave en órbita terrestre, donde la tripulación hace varias vueltas verificándolo todo. Segundo, quema durante aproximadamente 5 minutos e impulsa la nave hacia la Luna a 39.000 km/h — esta maniobra tiene nombre propio: inyección translunar.',
      },
      'iu': {
        nome: 'Unidad de Instrumentos',
        explicacao: 'El cerebro del cohete, un anillo de menos de un metro de altura montado justo encima de la 3ª etapa. Albergaba la computadora de a bordo, los giroscopios que sabían hacia dónde apuntaba el cohete y la radio que hablaba con la Tierra. Esa computadora tenía aproximadamente 100.000 bytes de memoria — menos que una sola foto de tu teléfono — y sin embargo guió 111 metros de cohete hasta la Luna.',
      },
      'sla': {
        nome: 'Adaptador del Módulo Lunar',
        explicacao: 'El cono que se estrecha de 6,6 a 3,9 metros y cierra la parte superior del cohete. Por fuera parece solo un carenado; por dentro es el garaje del Módulo Lunar, que sube plegado aquí y solo sale cuando la nave ya va camino a la Luna. Sus cuatro paredes se abren como pétalos para soltarlo.',
      },
      'lm': {
        nome: 'Módulo Lunar',
        explicacao: 'El Eagle viajaba plegado aquí dentro, con sus patas retraídas. En algunos lugares sus paredes eran más delgadas que papel de aluminio: como nunca necesitó resistir aire, solo el vacío, cada gramo fue economizado. Es dos naves en una: la parte de abajo desciende y se queda en la Luna para siempre, mientras que solo la de arriba despega de regreso.',
      },
      'sm': {
        nome: 'Módulo de Servicio',
        explicacao: 'El cilindro detrás de la cápsula, con el motor principal, los tanques de oxígeno y las celdas de combustible que generaban energía. Acompaña todo el viaje y se descartar minutos antes de la reentrada — se quema en la atmósfera. Fue un tanque de oxígeno de aquí el que explotó en el Apolo 13.',
      },
      'cm': {
        nome: 'Módulo de Comando',
        explicacao: 'El cono donde tres astronautas vivieron durante ocho días, en un espacio como el interior de un automóvil. Bautizado como Columbia. Es la única pieza, entre los 111 metros que despegaron, que regresó a la Tierra — y volvió con el escudo térmico quemado, entrando en la atmósfera a 40.000 km/h.',
      },
      'les': {
        nome: 'Torre de escape',
        explicacao: 'Una vara delgada en la parte superior que es en sí misma un cohete de emergencia: si algo salía mal en el lanzamiento, arrancaría la cápsula con la tripulación lejos en menos de un segundo. Era más potente que el cohete completo que envió al primer estadounidense al espacio. A los 3 minutos de vuelo ya no servía para nada y se descartaba. En ninguna misión Apolo fue necesario usarla.',
      },
    },
    'onibus-espacial': {
      'orbitador': {
        nome: 'Orbitador',
        explicacao: 'El avión. La bodega de carga mide 18 metros — cabría un autobús urbano entero — y de ahí salieron satélites, el telescopio Hubble y buena parte de la Estación Espacial. A la vuelta, sin motores y sin combustible para un segundo intento, se convierte en un planeador de 78 toneladas con una sola oportunidad de acertar la pista. El vientre oscuro está cubierto por **más de 20 mil piezas cerámicas**, cada una con forma propia y un único lugar donde encaja.',
      },
      'tanque': {
        nome: 'Tanque externo',
        explicacao: 'La pieza más grande de la pila y la única que nunca volvía: alimentaba los tres motores del orbitador durante la subida y, ya casi en órbita, se soltaba para arder en la atmósfera. El naranja no es pintura, es la espuma aislante a la vista. Los dos primeros vuelos se pintaron de blanco; descubrieron que la pintura solo sumaba unos 270 kilos de peso inútil y nunca más pintaron uno.',
      },
      'srb': {
        nome: 'Cohetes sólidos',
        explicacao: 'Los dos cilindros blancos que dan casi todo el empuje de los dos primeros minutos. El combustible sólido no tiene grifo: una vez encendido, no se puede apagar ni bajar hasta que se acabe. A los dos minutos se sueltan, bajan en paracaídas al Atlántico, los pescan unos barcos y vuelven a volar tras ser reacondicionados.',
      },
      'baia': {
        nome: 'Bahía de carga',
        explicacao: 'El compartimiento tiene 18 metros de largo por 4,6 metros de ancho — cabrías un autobús urbano entero dentro. De aquí salieron satélites, el telescopio Hubble y los módulos que formaron la Estación Espacial. Las puertas se abren al espacio no solo para cargar y descargar: el interior de las puertas es un radiador. Sin abrirlas, el transbordador se sobrecalienta por su propio calor en pocas horas.',
      },
      'cabine': {
        nome: 'Cabina de mando',
        explicacao: 'Dos pisos, para hasta siete personas. En la parte superior están el comandante y el piloto, rodeados de **más de 2.000 indicadores, interruptores y disyuntores**; abajo están las camas, la comida y la escotilla de salida. Las ventanas tienen tres capas de vidrio: la exterior se pone al rojo vivo en el viaje de regreso, mientras que la interior permanece tibia al tacto.',
      },
      'asas': {
        nome: 'Alas y timón',
        explicacao: 'Solo funcionan en el viaje de regreso. En el ascenso son peso muerto que debe llevarse a órbita. En la reentrada, con motores apagados y sin combustible para intentar de nuevo, el transbordador se convierte en un planeador de 78 toneladas con una única oportunidad para acertar en la pista. Las alas tienen una envergadura de 23,8 metros — exactamente el largo de una cancha de tenis.',
      },
      'motores': {
        nome: 'Motores y propulsores',
        explicacao: 'Los tres motores principales en la parte trasera solo funcionan en el ascenso, alimentados por el tanque externo que va detrás. Una vez en órbita, trabajan los dos OMS, los cascos laterales que cambian la altura de la órbita y proporcionan el empuje de frenado para regresar. Pequeños propulsores RCS giran la nave en el vacío — allá arriba no hay aire para que las alas empujen.',
      },
      'escudo': {
        nome: 'Escudo térmico',
        explicacao: 'El vientre oscuro está cubierto por más de **20.000 baldosas cerámicas**, cada una con su propia forma y su propio lugar — no puedes cambiar una por su vecina, y todas fueron pegadas a mano. Aíslan tan bien que puedes sostener una por los bordes segundos después de sacarla de un horno al rojo blanco. Son la única razón por la que el transbordador no se funde en el viaje de regreso.',
      },
    },
  },
};

export const TEXTOS_COMPONENTES_PROCEDURAIS = {
  en: {
    'sls': {
      'motores-rs25': {
        nome: 'RS-25 engines',
        explicacao: 'Four engines that **already flew on the Space Shuttle** and were refurbished to fly again. Each one has its own history of missions behind it, decades before this rocket even existed.',
      },
      'core': {
        nome: 'Core stage',
        explicacao: 'The orange body 65 meters tall, full of liquid hydrogen and oxygen. The color is not paint: it is the foam that insulates the cold inside, left exposed to save weight — the same choice as the Space Shuttle\'s external tank.',
      },
      'srb-sls': {
        nome: 'Solid boosters',
        explicacao: 'The two white cylinders alongside. Once ignited, you cannot shut them down or reduce power — they burn until empty. They are inherited from the Space Shuttle, but longer: five segments instead of four.',
      },
      'icps': {
        nome: 'Upper stage',
        explicacao: 'Takes over already in the vacuum, where there is no air at all, and provides the thrust that pulls Orion out of Earth\'s orbit and sends it toward the Moon.',
      },
      'orion': {
        nome: 'Orion spacecraft',
        explicacao: 'Where the crew travels. Designed to reenter from the Moon, much faster than those returning from the Space Station — and for that reason with a much more reinforced heat shield.',
      },
      'las-sls': {
        nome: 'Launch escape tower',
        explicacao: 'Same principle as the Saturno V\'s tower, half a century later: an emergency rocket that yanks the capsule away if something goes wrong at launch.',
      },
    },
    'falcon-9': {
      'pernas': {
        nome: 'Landing legs',
        explicacao: 'They fold against the body on the way up and open seconds before touchdown. They make this the first **orbital** rocket to return and land upright on a routine basis.',
      },
      'merlin-1': {
        nome: 'Nine Merlin engines',
        explicacao: 'Nine engines: eight in a circle and one right in the middle. If one fails, the other eight can compensate and the mission continues — something that has actually happened in flight, and the payload reached its destination anyway.',
      },
      'estagio-1': {
        nome: '1st stage',
        explicacao: 'The part that comes back. Some of these have gone up and landed **more than twenty times** — before them, no rocket stage landed by itself, upright, ready to fly again in a few weeks.',
      },
      'grid-fins': {
        nome: 'Grid fins',
        explicacao: 'Titanium grids that open on descent and guide the rocket through the air, like the feathers on the tail of a dart.',
      },
      'interestagio': {
        nome: 'Interstage',
        explicacao: 'The black ring that holds the two stages together and separates them up there, when the first runs out of fuel.',
      },
      'estagio-2': {
        nome: '2nd stage',
        explicacao: 'A single engine that only works in the vacuum. It places the payload into final orbit and does not return.',
      },
      'coifa': {
        nome: 'Fairing',
        explicacao: 'The cover that protects the payload as it crosses the atmosphere. Opens in two halves that fall by parachute into the sea — and are also fished out and reused.',
      },
    },
    'starship': {
      'raptor-booster': {
        nome: 'Thirty-three engines',
        explicacao: 'The largest number of engines ever lit together on a rocket. Igniting them all at the same time, without one interfering with another, is most of the challenge.',
      },
      'super-heavy': {
        nome: 'Super Heavy booster',
        explicacao: 'The initial thrust. Instead of landing on legs, it returns to the launch tower itself and is **caught in mid-air by two mechanical arms**.',
      },
      'grid-fins-sh': {
        nome: 'Grid fins',
        explicacao: 'They guide the booster on the way back, aiming for the tower that will catch it.',
      },
      'raptor-nave': {
        nome: 'Ship engines',
        explicacao: 'Six engines: three designed for the vacuum and three for the atmosphere, because pushing in empty space and pushing in air demand different nozzles.',
      },
      'starship': {
        nome: 'The ship',
        explicacao: 'Made of stainless steel, unpainted — hence the shine. The idea is for it to be refueled in orbit by another identical ship, and only then continue the journey.',
      },
      'flaps': {
        nome: 'Flaps',
        explicacao: 'Four flaps that control the fall with the belly facing down, like a skydiver spreading arms and legs, until straightening at the last instant.',
      },
      'ogiva': {
        nome: 'Nose cone',
        explicacao: 'The point that cuts the air on the way up and houses the payload or the crew.',
      },
    },
  },
  es: {
    'sls': {
      'motores-rs25': {
        nome: 'Motores RS-25',
        explicacao: 'Cuatro motores que **ya volaron en el Transbordador Espacial** y fueron reacondicionados para volar de nuevo. Cada uno tiene su propio historial de misiones, décadas antes de que este cohete existiera.',
      },
      'core': {
        nome: 'Etapa principal',
        explicacao: 'El cuerpo naranja de 65 metros, lleno de hidrógeno y oxígeno líquidos. El color no es pintura: es la espuma que aísla el frío dentro, dejada al descubierto para ahorrar peso — la misma elección que el tanque externo del Transbordador Espacial.',
      },
      'srb-sls': {
        nome: 'Impulsores de combustible sólido',
        explicacao: 'Los dos cilindros blancos al lado. Una vez encendidos, no se pueden apagar ni reducir — queman hasta acabarse. Se heredan del Transbordador Espacial, pero más largos: cinco segmentos en lugar de cuatro.',
      },
      'icps': {
        nome: 'Etapa superior',
        explicacao: 'Entra en acción ya en el vacío, donde no existe aire en absoluto, y proporciona el empuje que saca a Orion de la órbita terrestre y la envía hacia la Luna.',
      },
      'orion': {
        nome: 'Nave Orion',
        explicacao: 'Donde viaja la tripulación. Diseñada para reentrar viniendo de la Luna, mucho más rápido que quien regresa de la Estación Espacial — y por eso con un escudo térmico mucho más reforzado.',
      },
      'las-sls': {
        nome: 'Torre de escape',
        explicacao: 'Mismo principio que la torre del Saturno V, medio siglo después: un cohete de emergencia que arranca la cápsula lejos si algo sale mal en el lanzamiento.',
      },
    },
    'falcon-9': {
      'pernas': {
        nome: 'Patas de aterrizaje',
        explicacao: 'Se pliegan contra el cuerpo en el ascenso y se abren segundos antes de tocar tierra. Hacen de este el primer cohete **orbital** en regresar y aterrizar en posición vertical de forma rutinaria.',
      },
      'merlin-1': {
        nome: 'Nueve motores Merlin',
        explicacao: 'Nueve motores: ocho en círculo y uno bien en el medio. Si uno falla, los otros ocho pueden compensar y la misión continúa — algo que ha sucedido de verdad en vuelo, y la carga llegó a su destino de todas formas.',
      },
      'estagio-1': {
        nome: '1ª etapa',
        explicacao: 'La parte que regresa. Algunos de estos han subido y aterrizado **más de veinte veces** — antes de ellos, ninguna etapa de cohete aterrizaba por sí sola, en posición vertical, lista para volar de nuevo en pocas semanas.',
      },
      'grid-fins': {
        nome: 'Aletas de malla',
        explicacao: 'Rejillas de titanio que se abren en el descenso y guían el cohete por el aire, como las plumas en la cola de un dardo.',
      },
      'interestagio': {
        nome: 'Interetapa',
        explicacao: 'El anillo negro que sostiene las dos etapas juntas y las separa allá arriba, cuando la primera se queda sin combustible.',
      },
      'estagio-2': {
        nome: '2ª etapa',
        explicacao: 'Un solo motor que solo funciona en el vacío. Coloca la carga en órbita final y no regresa.',
      },
      'coifa': {
        nome: 'Cofia',
        explicacao: 'La cubierta que protege la carga al cruzar la atmósfera. Se abre en dos mitades que caen en paracaídas al mar — y también se pescan y se reutilizan.',
      },
    },
    'starship': {
      'raptor-booster': {
        nome: 'Treinta y tres motores',
        explicacao: 'El número más grande de motores jamás encendidos juntos en un cohete. Encender todos al mismo tiempo, sin que uno interfiera con otro, es la mayor parte del desafío.',
      },
      'super-heavy': {
        nome: 'Impulsor Super Heavy',
        explicacao: 'El empuje inicial. En lugar de aterrizar sobre patas, regresa a la propia torre de lanzamiento y es **agarrado en el aire por dos brazos mecánicos**.',
      },
      'grid-fins-sh': {
        nome: 'Aletas de malla',
        explicacao: 'Guían el impulsor en el regreso, apuntando a la torre que lo atrapará.',
      },
      'raptor-nave': {
        nome: 'Motores de la nave',
        explicacao: 'Seis motores: tres diseñados para el vacío y tres para la atmósfera, porque empujar en el espacio vacío y empujar en el aire requieren boquillas diferentes.',
      },
      'starship': {
        nome: 'La nave',
        explicacao: 'Hecha de acero inoxidable, sin pintura — de ahí el brillo. La idea es que sea reabastecida en órbita por otra nave igual, y solo entonces continúe el viaje.',
      },
      'flaps': {
        nome: 'Aletas',
        explicacao: 'Cuatro aletas que controlan la caída con el vientre hacia abajo, como un paracaidista abriendo brazos y piernas, hasta enderezarse en el último instante.',
      },
      'ogiva': {
        nome: 'Ojiva',
        explicacao: 'La punta que corta el aire en el ascenso y alberga la carga o la tripulación.',
      },
    },
  },
};
