import { PARTES } from './saturno-v-data.js';
import { MISSOES_NAVE } from './hangar-mission-data.js?v=302';

// Only presentation text belongs here; source keys, URLs and IDs stay intact.
const TEXT = {
  en: {
    'Saturno V':'Saturn V', 'MISSÃO APOLLO 11':'APOLLO 11 MISSION',
    'Hangar interativo · 1969':'Interactive hangar · 1969', 'Saturno V / Apollo 11':'Saturn V / Apollo 11',
    'DESTINO: LUA':'DESTINATION: MOON', 'Um foguete. Muitas descobertas.':'One rocket. Many discoveries.',
    'Apollo 11 é a missão. Saturno V é o foguete que a lançou. Só o módulo lunar pousou na Lua.':'Apollo 11 was the mission. Saturn V was the rocket that launched it. Only the lunar module landed on the Moon.',
    'O foguete que iniciou a primeira viagem de pouso na Lua.':'The rocket that launched the first journey to land on the Moon.',
    'Esta separação é didática. No voo, cada peça saía em um momento.':'This separation is educational. During flight, each part separated at a different time.',
    'altura real':'actual height', 'astronautas':'astronauts', 'primeiro pouso':'first landing',
    'NASA · A missão Apollo 11':'NASA · Apollo 11 mission', 'NASA · Conheça o Saturno V':'NASA · Discover Saturn V',
    'NASA · O programa Apollo':'NASA · The Apollo program', 'NASA · Apollo 4 e o primeiro Saturn V':'NASA · Apollo 4 and the first Saturn V',
    'O Saturn V levou as missões Apollo à Lua e lançou o Skylab. Seus três estágios colocavam a nave Apollo em órbita e, nas missões lunares, davam o impulso inicial rumo à Lua.':'Saturn V carried Apollo missions to the Moon and launched Skylab. Its three stages put the Apollo spacecraft into orbit and, on lunar missions, provided the initial push toward the Moon.',
    'A unidade de instrumentos era um anel de menos de um metro de altura que orientava o foguete durante a subida.':'The instrument unit was a ring less than one meter tall that guided the rocket during ascent.',
    'O segundo estágio usava hidrogênio e oxigênio líquidos, propelentes que precisavam permanecer muito frios.':'The second stage used liquid hydrogen and oxygen, propellants that had to remain very cold.',
    'O motor J-2 do terceiro estágio podia ser desligado, esperar em órbita e reacender para a injeção translunar.':'The third stage J-2 engine could shut down, wait in orbit, and restart for translunar injection.',
    'O Saturn V descartava estágios vazios para ficar mais leve enquanto ganhava altitude.':'Saturn V discarded empty stages to become lighter as it gained altitude.',
    'Primeiro teste de voo completo do Saturn V, sem tripulação.':'First complete, uncrewed flight test of Saturn V.',
    'Primeiro voo tripulado do Saturn V e primeira viagem humana à órbita lunar.':'First crewed Saturn V flight and first human journey to lunar orbit.',
    'Lançou Columbia e Eagle para a missão do primeiro pouso humano na Lua.':'Launched Columbia and Eagle on the mission of the first human Moon landing.',
    'A anomalia na subida foi compensada e a nave seguiu para uma trajetória lunar.':'The ascent anomaly was compensated for and the spacecraft continued on a lunar trajectory.',
    'Última missão lunar tripulada do programa Apollo.':'The Apollo program’s final crewed lunar mission.',
    'Um Saturn V de dois estágios lançou a estação Skylab, cujo laboratório orbital foi construído a partir de um S-IVB adaptado.':'A two-stage Saturn V launched Skylab, whose orbital workshop was built from a modified S-IVB.',
    'Primeiro estágio · S-IC':'First stage · S-IC','Interestágio S-IC / S-II':'S-IC / S-II interstage','Segundo estágio · S-II':'Second stage · S-II','Interestágio S-II / S-IVB':'S-II / S-IVB interstage','Terceiro estágio · S-IVB':'Third stage · S-IVB','Unidade de instrumentos':'Instrument unit','Adaptador do módulo lunar':'Lunar module adapter','Módulo lunar · Eagle':'Lunar module · Eagle','Módulo de serviço':'Service module','Módulo de comando · Columbia':'Command module · Columbia','Torre de escape':'Launch escape tower',
    '1º estágio':'1st stage','2º estágio':'2nd stage','3º estágio':'3rd stage','Anel de ligação':'Connecting ring','Anel de transição':'Transition ring','Instrumentos':'Instruments','Proteção do Eagle':'Eagle protection','Módulo lunar':'Lunar module','Cápsula Columbia':'Columbia capsule',
    'Motores':'Engines','Motor':'Engine','Altura real':'Actual height','Combustível':'Fuel','Querosene RP-1 + oxigênio líquido':'RP-1 kerosene + liquid oxygen','Hidrogênio + oxigênio líquidos':'Liquid hydrogen + oxygen','Tipo':'Type','Estrutura de ligação':'Connecting structure','Tripulantes':'Crew members','Nenhum':'None','Forma':'Shape','Tronco de cone':'Truncated cone','Função':'Function','União e proteção do motor':'Connection and engine protection','Na Apollo 11':'On Apollo 11','Duas queimas principais':'Two main burns','Formato':'Shape','Anel de equipamentos':'Equipment ring','Painéis':'Panels','Sigla':'Abbreviation','SLA · adaptador do módulo lunar':'SLA · lunar module adapter','Partes principais':'Main parts','Descida + subida':'Descent + ascent','Pouso':'Landing','20 de julho de 1969':'July 20, 1969','Nenhum nesta seção':'None in this section','Conjunto com a cápsula':'Assembly with the capsule','Nome':'Name','Retorno':'Return','24 de julho de 1969':'July 24, 1969','Propelente':'Propellant','Sólido':'Solid','Uso':'Use','Emergência no início do voo':'Emergency early in flight'
  },
  es: {
    'Saturno V':'Saturno V', 'MISSÃO APOLLO 11':'MISIÓN APOLO 11',
    'Hangar interativo · 1969':'Hangar interactivo · 1969', 'Saturno V / Apollo 11':'Saturno V / Apolo 11',
    'DESTINO: LUA':'DESTINO: LUNA', 'Um foguete. Muitas descobertas.':'Un cohete. Muchos descubrimientos.',
    'Apollo 11 é a missão. Saturno V é o foguete que a lançou. Só o módulo lunar pousou na Lua.':'Apolo 11 es la misión. Saturno V es el cohete que la lanzó. Solo el módulo lunar aterrizó en la Luna.',
    'O foguete que iniciou a primeira viagem de pouso na Lua.':'El cohete que inició el primer viaje de alunizaje.',
    'Esta separação é didática. No voo, cada peça saía em um momento.':'Esta separación es didáctica. En vuelo, cada pieza se separaba en un momento distinto.',
    'altura real':'altura real', 'astronautas':'astronautas', 'primeiro pouso':'primer alunizaje',
    'NASA · A missão Apollo 11':'NASA · La misión Apolo 11', 'NASA · Conheça o Saturno V':'NASA · Conoce el Saturno V',
    'NASA · O programa Apollo':'NASA · El programa Apolo', 'NASA · Apollo 4 e o primeiro Saturn V':'NASA · Apolo 4 y el primer Saturn V',
    'O Saturn V levou as missões Apollo à Lua e lançou o Skylab. Seus três estágios colocavam a nave Apollo em órbita e, nas missões lunares, davam o impulso inicial rumo à Lua.':'El Saturn V llevó las misiones Apolo a la Luna y lanzó Skylab. Sus tres etapas colocaban la nave Apolo en órbita y, en las misiones lunares, daban el impulso inicial hacia la Luna.',
    'A unidade de instrumentos era um anel de menos de um metro de altura que orientava o foguete durante a subida.':'La unidad de instrumentos era un anillo de menos de un metro de altura que guiaba el cohete durante el ascenso.',
    'O segundo estágio usava hidrogênio e oxigênio líquidos, propelentes que precisavam permanecer muito frios.':'La segunda etapa usaba hidrógeno y oxígeno líquidos, propelentes que debían permanecer muy fríos.',
    'O motor J-2 do terceiro estágio podia ser desligado, esperar em órbita e reacender para a injeção translunar.':'El motor J-2 de la tercera etapa podía apagarse, esperar en órbita y volver a encenderse para la inyección translunar.',
    'O Saturn V descartava estágios vazios para ficar mais leve enquanto ganhava altitude.':'El Saturn V descartaba etapas vacías para reducir su peso mientras ganaba altura.',
    'Primeiro teste de voo completo do Saturn V, sem tripulação.':'Primera prueba de vuelo completo del Saturn V, sin tripulación.',
    'Primeiro voo tripulado do Saturn V e primeira viagem humana à órbita lunar.':'Primer vuelo tripulado del Saturn V y primer viaje humano a la órbita lunar.',
    'Lançou Columbia e Eagle para a missão do primeiro pouso humano na Lua.':'Lanzó Columbia y Eagle para la misión del primer alunizaje humano.',
    'A anomalia na subida foi compensada e a nave seguiu para uma trajetória lunar.':'La anomalía durante el ascenso fue compensada y la nave siguió una trayectoria lunar.',
    'Última missão lunar tripulada do programa Apollo.':'Última misión lunar tripulada del programa Apolo.',
    'Um Saturn V de dois estágios lançou a estação Skylab, cujo laboratório orbital foi construído a partir de um S-IVB adaptado.':'Un Saturn V de dos etapas lanzó Skylab, cuyo taller orbital se construyó a partir de un S-IVB modificado.',
    'Primeiro estágio · S-IC':'Primera etapa · S-IC','Interestágio S-IC / S-II':'Interetapa S-IC / S-II','Segundo estágio · S-II':'Segunda etapa · S-II','Interestágio S-II / S-IVB':'Interetapa S-II / S-IVB','Terceiro estágio · S-IVB':'Tercera etapa · S-IVB','Unidade de instrumentos':'Unidad de instrumentos','Adaptador do módulo lunar':'Adaptador del módulo lunar','Módulo lunar · Eagle':'Módulo lunar · Eagle','Módulo de serviço':'Módulo de servicio','Módulo de comando · Columbia':'Módulo de mando · Columbia','Torre de escape':'Torre de escape',
    '1º estágio':'1.ª etapa','2º estágio':'2.ª etapa','3º estágio':'3.ª etapa','Anel de ligação':'Anillo de conexión','Anel de transição':'Anillo de transición','Instrumentos':'Instrumentos','Proteção do Eagle':'Protección del Eagle','Módulo lunar':'Módulo lunar','Cápsula Columbia':'Cápsula Columbia',
    'Motores':'Motores','Motor':'Motor','Altura real':'Altura real','Combustível':'Combustible','Querosene RP-1 + oxigênio líquido':'Queroseno RP-1 + oxígeno líquido','Hidrogênio + oxigênio líquidos':'Hidrógeno + oxígeno líquidos','Tipo':'Tipo','Estrutura de ligação':'Estructura de conexión','Tripulantes':'Tripulantes','Nenhum':'Ninguno','Forma':'Forma','Tronco de cone':'Tronco de cono','Função':'Función','União e proteção do motor':'Unión y protección del motor','Na Apollo 11':'En Apolo 11','Duas queimas principais':'Dos encendidos principales','Formato':'Forma','Anel de equipamentos':'Anillo de equipos','Painéis':'Paneles','Sigla':'Sigla','SLA · adaptador do módulo lunar':'SLA · adaptador del módulo lunar','Partes principais':'Partes principales','Descida + subida':'Descenso + ascenso','Pouso':'Alunizaje','20 de julho de 1969':'20 de julio de 1969','Nenhum nesta seção':'Ninguno en esta sección','Conjunto com a cápsula':'Conjunto con la cápsula','Nome':'Nombre','Retorno':'Regreso','24 de julho de 1969':'24 de julio de 1969','Propelente':'Propelente','Sólido':'Sólido','Uso':'Uso','Emergência no início do voo':'Emergencia al inicio del vuelo'
  }
};

// Field-aligned translations for the long educational cards.
const PART_TEXT = {
  sic: {
    en: {
      funcao: 'Lift the rocket off the pad and through the densest part of the atmosphere.',
      detalhes: 'Five F-1 engines burned RP-1 kerosene and liquid oxygen. The four outer engines helped steer the vehicle.',
      destino: 'It separated after using its propellants and fell into the ocean.',
      apelido: 'The giant that starts the journey',
      crianca: 'Five enormous engines lift the rocket off the ground. They work together to overcome gravity and begin the journey.',
      analogia: 'Like the first team in a relay race, it starts the race and passes the task on.',
      pergunta: 'Rotate the piece and look underneath. Can you find the five engines?',
      engenharia: 'Turbopumps supplied propellants to the five F-1 engines. The four outer engines could tilt to control pitch, yaw, and roll; the center engine remained fixed.',
      curiosidades: ['At launch, this stage carried most of the vehicle’s mass.', 'The center engine shut down before the outer engines to limit acceleration near the end of the burn.'],
      missoes: ['Apollo 4 (1967): first complete Saturn V flight, using the “all-up” strategy.', 'Apollo 8 (1968): first crewed Saturn V and first human journey to lunar orbit.', 'Apollo 11 (1969): launched the spacecraft that made the first human Moon landing.']
    },
    es: {
      funcao: 'Levantar el cohete de la plataforma y atravesar la parte más densa de la atmósfera.',
      detalhes: 'Cinco motores F-1 quemaban queroseno RP-1 y oxígeno líquido. Los cuatro motores exteriores ayudaban a orientar el vehículo.',
      destino: 'Se separaba al consumir sus propelentes y caía al océano.',
      apelido: 'El gigante que inicia el viaje',
      crianca: 'Cinco motores enormes levantan el cohete del suelo. Trabajan juntos para vencer la gravedad y comenzar el viaje.',
      analogia: 'Como el primer equipo de una carrera de relevos, inicia la carrera y pasa la tarea al siguiente.',
      pergunta: 'Gira la pieza y mira debajo. ¿Puedes encontrar los cinco motores?',
      engenharia: 'Las turbobombas suministraban propelentes a los cinco motores F-1. Los cuatro motores exteriores podían inclinarse para controlar cabeceo, guiñada y alabeo; el central permanecía fijo.',
      curiosidades: ['En el lanzamiento, esta etapa llevaba la mayor parte de la masa del vehículo.', 'El motor central se apagaba antes que los exteriores para limitar la aceleración cerca del final del encendido.'],
      missoes: ['Apolo 4 (1967): primer vuelo completo del Saturn V, con la estrategia “all-up”.', 'Apolo 8 (1968): primer Saturn V tripulado y primer viaje humano a la órbita lunar.', 'Apolo 11 (1969): lanzó el conjunto que realizó el primer alunizaje humano.']
    }
  },
  inter1: {
    en: {
      funcao: 'Connect the first and second stages and transmit forces during ascent.',
      detalhes: 'The structure surrounded the S-II engine area. Separation freed the next stage to continue accelerating.',
      destino: 'It was discarded during the lower-stage separation sequence.',
      apelido: 'The bridge between two giants',
      crianca: 'This ring joins the first two stages. It also surrounds the second-stage engines while the rocket is assembled.',
      analogia: 'Think of a connector holding two large blocks together. It is not a fuel tank.',
      pergunta: 'When you separate it, can you see that this ring is hollow?',
      engenharia: 'Besides transferring structural loads, the section kept clearance for the five J-2 engines. Separation used coordinated events so the S-II could ignite without hitting the discarded stage.',
      curiosidades: ['The hollow shape shown in Hangar was not living space.', 'An apparently simple structure had to withstand enormous vibrations and forces during ascent.'],
      missoes: ['Apollo 6 helped reveal vibration problems before crewed lunar flights.', 'Apollo 8 confirmed the assembly on a crewed mission to the Moon.']
    },
    es: {
      funcao: 'Conectar la primera y segunda etapas y transmitir esfuerzos durante el ascenso.',
      detalhes: 'La estructura rodeaba la zona de motores del S-II. La separación liberaba la siguiente etapa para continuar la aceleración.',
      destino: 'Se descartaba durante la secuencia de separación de las etapas inferiores.',
      apelido: 'El puente entre dos gigantes',
      crianca: 'Este anillo une las dos primeras etapas. También rodea los motores de la segunda etapa mientras el cohete está montado.',
      analogia: 'Piensa en una pieza de conexión que mantiene unidos dos bloques grandes. No es un tanque de combustible.',
      pergunta: 'Al separarlo, ¿puedes ver que este anillo es hueco?',
      engenharia: 'Además de transmitir cargas estructurales, la sección mantenía espacio para los cinco J-2. La separación usaba eventos coordinados para que el S-II pudiera encenderse sin golpear la etapa descartada.',
      curiosidades: ['La forma hueca que aparece en el Hangar no era espacio habitable.', 'Una estructura aparentemente simple debía soportar enormes vibraciones y fuerzas durante el ascenso.'],
      missoes: ['Apolo 6 ayudó a revelar problemas de vibración antes de los vuelos lunares tripulados.', 'Apolo 8 confirmó el conjunto en una misión tripulada a la Luna.']
    }
  }
};
Object.assign(PART_TEXT, {
  sii: {
    en: {
      funcao: 'Continue accelerating after the first stage separates.',
      detalhes: 'Five J-2 engines used liquid hydrogen and oxygen. The cryogenic tanks required thermal insulation.',
      destino: 'It was discarded before the third stage completed orbital insertion.',
      apelido: 'The team that continues the climb',
      crianca: 'When the first part finishes its work, these five engines continue accelerating the spacecraft. The rocket becomes lighter as it leaves used parts behind.',
      analogia: 'It is like taking off an empty backpack to run with less weight.',
      pergunta: 'Are these engines the same size as those on the first stage?',
      engenharia: 'It was built with two cryogenic tanks separated by a common bulkhead, reducing mass. Five J-2 engines burned liquid hydrogen and oxygen at high altitude.',
      curiosidades: ['Liquid hydrogen occupies a large volume and must stay extremely cold.', 'On Apollo 13, the center engine shut down early; the other four burned longer and the mission reached its planned trajectory.'],
      missoes: ['Apollo 6: two J-2 engines shut down early, leading to important changes before the next crewed mission.', 'Apollo 13: demonstrated the guidance system’s ability to compensate for an anomaly during ascent.']
    },
    es: {
      funcao: 'Continuar la aceleración después de la separación de la primera etapa.',
      detalhes: 'Cinco motores J-2 utilizaban hidrógeno y oxígeno líquidos. Los tanques criogénicos requerían aislamiento térmico.',
      destino: 'Se descartaba antes de que la tercera etapa completara la inserción orbital.',
      apelido: 'El equipo que continúa el ascenso',
      crianca: 'Cuando la primera parte termina su trabajo, estos cinco motores siguen acelerando la nave. El cohete se vuelve más ligero al dejar atrás las piezas usadas.',
      analogia: 'Es como quitarse una mochila vacía para correr con menos peso.',
      pergunta: '¿Son estos motores del mismo tamaño que los de la primera etapa?',
      engenharia: 'Se construyó con dos tanques criogénicos separados por un mamparo común para reducir la masa. Cinco motores J-2 quemaban hidrógeno y oxígeno líquidos a gran altitud.',
      curiosidades: ['El hidrógeno líquido ocupa mucho volumen y debe permanecer extremadamente frío.', 'En Apolo 13, el motor central se apagó antes de lo previsto; los otros cuatro quemaron durante más tiempo y la misión alcanzó la trayectoria prevista.'],
      missoes: ['Apolo 6: dos motores J-2 se apagaron pronto, lo que produjo cambios importantes antes de la siguiente misión tripulada.', 'Apolo 13: mostró la capacidad del sistema de guiado para compensar una anomalía durante el ascenso.']
    }
  },
  inter2: {
    en: {
      funcao: 'Transition between the large diameter of the S-II and the narrower S-IVB.',
      detalhes: 'The conical section protected the third-stage engine area and formed part of the separation structure.',
      destino: 'It remained with the lower stage when the S-IVB separated.',
      apelido: 'From wide to narrow',
      crianca: 'This tapered connection joins the wide part of the rocket to the narrower part above it.',
      analogia: 'It resembles an adapter between two pipes of different sizes, but its function here is structural.',
      pergunta: 'Which of the two openings is larger?',
      engenharia: 'The conical transition distributed loads between stages of different diameters and surrounded the S-IVB J-2 engine until separation.',
      curiosidades: ['It remained attached to the S-II, not the third stage.', 'Its cone transitioned from about 10 m to 6.6 m in diameter.'],
      missoes: ['Apollo 4 and Apollo 6 validated separation on uncrewed flights.', 'From Apollo 8 onward, the same architecture carried crews toward the Moon.']
    },
    es: {
      funcao: 'Hacer la transición entre el gran diámetro del S-II y el S-IVB más estrecho.',
      detalhes: 'La sección cónica protegía la zona del motor de la tercera etapa y formaba parte de la estructura de separación.',
      destino: 'Permanecía con la etapa inferior cuando se separaba el S-IVB.',
      apelido: 'De lo ancho a lo estrecho',
      crianca: 'Esta conexión estrecha une la parte ancha del cohete con la parte más estrecha que queda encima.',
      analogia: 'Recuerda a un adaptador entre dos tubos de distintos tamaños, pero aquí su función es estructural.',
      pergunta: '¿Cuál de las dos aberturas es mayor?',
      engenharia: 'La transición cónica distribuía las cargas entre etapas de distintos diámetros y rodeaba el motor J-2 del S-IVB hasta la separación.',
      curiosidades: ['Permanecía unida al S-II, no a la tercera etapa.', 'Su cono pasaba de unos 10 m a 6,6 m de diámetro.'],
      missoes: ['Apolo 4 y Apolo 6 validaron la separación en vuelos no tripulados.', 'A partir de Apolo 8, la misma arquitectura llevó tripulaciones hacia la Luna.']
    }
  }
});

Object.assign(PART_TEXT, {
 sivb: {
  en: {
   funcao:'Complete insertion into Earth orbit and propel the spacecraft toward the Moon.',
   detalhes:'Its single J-2 engine could be restarted. On Apollo 11, a second burn produced translunar injection.',
   destino:'On Apollo 11, the third stage entered an orbit around the Sun after Eagle was extracted.',
   apelido:'The final push toward the Moon',
   crianca:'Its engine first helps the spacecraft enter Earth orbit. Then it starts again to send the spacecraft toward the Moon.',
   analogia:'It is an engine that saves fuel for a second task.',
   pergunta:'There is only one engine here. Why does it not have to lift the entire rocket from the pad?',
   engenharia:'The J-2 had to shut down after orbital insertion, wait, and restart in space. Propellant settling systems helped bring liquids to the engine inlets before reignition.',
   curiosidades:['It was both the third stage of the rocket and the “departure” for the Moon.', 'On later missions, some S-IVBs were sent to collide with the Moon and produce signals measured by seismometers.'],
   missoes:['Apollo 8: first crewed translunar injection.', 'Apollo 11: the second burn sent Columbia and Eagle toward the Moon.', 'Skylab 1: a version of the S-IVB was converted into the Skylab orbital laboratory.']
  },
  es: {
   funcao:'Completar la entrada en órbita terrestre e impulsar la nave hacia la Luna.',
   detalhes:'Su único motor J-2 podía volver a encenderse. En Apolo 11, un segundo encendido produjo la inyección translunar.',
   destino:'En Apolo 11, la tercera etapa siguió hacia una órbita alrededor del Sol después de extraer el Eagle.',
   apelido:'El último impulso hacia la Luna',
   crianca:'Su motor primero ayuda a la nave a entrar en órbita terrestre. Después vuelve a encenderse para ponerla rumbo a la Luna.',
   analogia:'Es un motor que guarda combustible para una segunda tarea.',
   pergunta:'Aquí solo hay un motor. ¿Por qué no necesita levantar todo el cohete desde la plataforma?',
   engenharia:'El J-2 debía apagarse tras la inserción orbital, esperar y volver a encenderse en el espacio. Los sistemas de asentamiento de propelente ayudaban a llevar los líquidos a las entradas del motor antes del reencendido.',
   curiosidades:['Era a la vez la tercera etapa del cohete y la “salida” hacia la Luna.', 'En misiones posteriores, algunos S-IVB fueron enviados a chocar contra la Luna para producir señales medidas por sismómetros.'],
   missoes:['Apolo 8: primera inyección translunar tripulada.', 'Apolo 11: el segundo encendido puso a Columbia y Eagle rumbo a la Luna.', 'Skylab 1: una versión del S-IVB se convirtió en el laboratorio orbital Skylab.']
  }
 },
 iu: {
  en: {
   funcao:'Guide and control the rocket during ascent.',
   detalhes:'This ring housed navigation systems, flight computer, telemetry, and electronic equipment. It was not a crew compartment.',
   destino:'It accompanied the third stage.',
   apelido:'The rocket’s navigator',
   crianca:'Inside this ring are devices that help the rocket know where it is going and how to correct its course. There are no astronauts here.',
   analogia:'It is an automatic navigation center with sensors and a computer.',
   pergunta:'Did you imagine such a small ring could help guide such a large rocket?',
   engenharia:'An inertial platform measured vehicle motion. The launch vehicle digital computer processed guidance and sent commands to the engines, while telemetry transmitted rocket status to the ground.',
   curiosidades:['The launch vehicle’s “brain” formed a ring less than one meter tall.', 'It guided Saturn V autonomously; the crew monitored it but did not pilot every ascent maneuver.'],
   missoes:['Apollo 4 validated the complete Saturn V guidance system.', 'On Apollo 13, guidance compensated for the early loss of the S-II center engine.']
  },
  es: {
   funcao:'Guiar y controlar el cohete durante el ascenso.',
   detalhes:'Este anillo alojaba sistemas de navegación, computadora de vuelo, telemetría y equipos electrónicos. No era un compartimento para la tripulación.',
   destino:'Acompañaba a la tercera etapa.',
   apelido:'El navegador del cohete',
   crianca:'Dentro de este anillo hay aparatos que ayudan al cohete a saber hacia dónde va y cómo corregir el rumbo. Aquí no hay astronautas.',
   analogia:'Es una central de navegación automática con sensores y computadora.',
   pergunta:'¿Imaginabas que un anillo tan pequeño podía ayudar a guiar un cohete tan grande?',
   engenharia:'Una plataforma inercial medía el movimiento del vehículo. La computadora digital del lanzador procesaba la orientación y enviaba órdenes a los motores, mientras la telemetría transmitía el estado del cohete a tierra.',
   curiosidades:['El “cerebro” del lanzador formaba un anillo de menos de un metro de altura.', 'Guiaba el Saturn V de forma autónoma; la tripulación vigilaba, pero no pilotaba cada maniobra del ascenso.'],
   missoes:['Apolo 4 validó el sistema completo de guiado del Saturn V.', 'En Apolo 13, el sistema de guiado compensó la pérdida anticipada del motor central del S-II.']
  }
 }
});

Object.assign(PART_TEXT, {
 sla: {
  en: {
   funcao:'Support the Apollo spacecraft and house the lunar module during launch.',
   detalhes:'After translunar injection, the command and service module moved away, turned, and docked with Eagle. The SLA panels were jettisoned; they were not reusable doors. The opening in Hangar is an illustration for studying the parts.',
   destino:'Its panels were discarded. The exploded view moves them aside to reveal the lunar module.',
   apelido:'The lunar module’s garage',
   crianca:'Four panels protect Eagle during ascent. They are removed in space so the spacecraft can retrieve the lunar module.',
   analogia:'It is like protective packaging that also helps support the spacecraft above it.',
   pergunta:'Separate the pieces. Which spacecraft was hidden inside this protection?',
   engenharia:'The adapter supported the CSM above and surrounded the lunar module. After translunar injection, four panels were jettisoned to allow the transposition, docking, and extraction maneuver.',
   curiosidades:['Eagle traveled folded inside this section, invisible during launch.', 'The opening shown here is educational: the panels did not close again.'],
   missoes:['Apollo 9 performed the first complete crewed test of the lunar module in Earth orbit.', 'Apollo 10 rehearsed almost the entire sequence Apollo 11 would execute in lunar orbit.']
  },
  es: {
   funcao:'Sostener la nave Apolo y alojar el módulo lunar durante el lanzamiento.',
   detalhes:'Después de la inyección translunar, el conjunto de mando y servicio se alejaba, giraba y se acoplaba al Eagle. Los paneles del SLA se eyectaban; no eran puertas reutilizables. La apertura en el Hangar es una ilustración para estudiar las piezas.',
   destino:'Sus paneles se descartaban. La vista desglosada los aparta para revelar el módulo lunar.',
   apelido:'El garaje del módulo lunar',
   crianca:'Cuatro paneles protegen al Eagle durante el ascenso. Se retiran en el espacio para que la nave pueda recuperar el módulo lunar.',
   analogia:'Es como un embalaje protector que también ayuda a sostener la nave que está encima.',
   pergunta:'Separa las piezas. ¿Qué nave estaba escondida dentro de esta protección?',
   engenharia:'El adaptador sostenía el CSM encima y rodeaba el módulo lunar. Después de la inyección translunar, cuatro paneles se eyectaban para permitir la maniobra de transposición, acoplamiento y extracción.',
   curiosidades:['El Eagle viajó plegado dentro de esta sección, invisible durante el lanzamiento.', 'La apertura que se ve aquí es didáctica: los paneles no volvían a cerrarse.'],
   missoes:['Apolo 9 realizó en órbita terrestre la primera prueba tripulada completa del módulo lunar.', 'Apolo 10 ensayó en órbita lunar casi toda la secuencia que ejecutaría Apolo 11.']
  }
 },
 lm: {
  en: {
   funcao:'Carry two astronauts from lunar orbit to the surface and return them to orbit.',
   detalhes:'The descent stage carried an engine, propellants, and landing gear. The ascent stage contained a pressurized cabin and its own engine. Eagle had no shield for reentry into Earth’s atmosphere. Its exterior appearance is an educational approximation.',
   destino:'The descent stage stayed on the Moon. The ascent stage returned to orbit to rendezvous with the command module.',
   apelido:'Eagle: the Moon’s visitor',
   crianca:'This spacecraft carried Neil Armstrong and Buzz Aldrin to the Moon’s surface. Michael Collins remained in orbit in Columbia.',
   analogia:'The golden base is for landing. The upper cabin takes off from the Moon and reunites with the other spacecraft.',
   pergunta:'Find the legs and the ladder. Which part stayed on the Moon?',
   engenharia:'The descent stage had landing gear, a throttleable engine, and an equipment platform. The ascent stage carried a cabin, guidance computer, and its own engine to return to lunar orbit.',
   curiosidades:['Eagle was designed only for a vacuum, so it did not need an aerodynamic shape.', 'There were no seats: Armstrong and Aldrin piloted standing up during landing.'],
   missoes:['Apollo 9: first crewed lunar module flight.', 'Apollo 11: Eagle made the first human Moon landing.', 'Apollo 13: Aquarius served as a lifeboat after the service module failure.']
  },
  es: {
   funcao:'Llevar a dos astronautas desde la órbita lunar a la superficie y devolverlos a órbita.',
   detalhes:'La etapa de descenso llevaba motor, propelentes y tren de aterrizaje. La etapa de ascenso contenía una cabina presurizada y su propio motor. El Eagle no tenía escudo para reentrar en la atmósfera terrestre. Su aspecto exterior es una aproximación didáctica.',
   destino:'La etapa de descenso quedaba en la Luna. La de ascenso volvía a órbita para reencontrarse con el módulo de mando.',
   apelido:'Eagle: el visitante de la Luna',
   crianca:'Esta es la nave que llevó a Neil Armstrong y Buzz Aldrin al suelo lunar. Michael Collins permaneció en órbita en el Columbia.',
   analogia:'La base dorada sirve para aterrizar. La cabina superior despega de la Luna y se reencuentra con la otra nave.',
   pergunta:'Encuentra las patas y la escalera. ¿Qué parte quedó en la Luna?',
   engenharia:'La etapa de descenso tenía tren de aterrizaje, motor regulable y plataforma de equipos. La de ascenso llevaba cabina, computadora de guiado y un motor propio para regresar a la órbita lunar.',
   curiosidades:['El Eagle fue diseñado solo para el vacío, por lo que no necesitaba una forma aerodinámica.', 'No había asientos: Armstrong y Aldrin pilotaron de pie durante el alunizaje.'],
   missoes:['Apolo 9: primer vuelo tripulado del módulo lunar.', 'Apolo 11: el Eagle realizó el primer alunizaje humano.', 'Apolo 13: el Aquarius sirvió como bote salvavidas tras la falla del módulo de servicio.']
  }
 }
});

Object.assign(PART_TEXT, {
 sm: {
  en: {
   funcao:'Provide propulsion, electrical power, and life-support resources.',
   detalhes:'The SPS engine made large velocity changes. Small RCS thrusters controlled orientation. Fuel cells generated electricity from hydrogen and oxygen; radiators helped remove heat.',
   destino:'It separated from the capsule before reentry; it did not return intact.',
   apelido:'The spacecraft’s supply backpack',
   crianca:'It carries the Apollo spacecraft’s main engine and resources for the journey, such as oxygen and equipment that produces electricity.',
   analogia:'It is a backpack for a long adventure, carrying power and supplies for the capsule.',
   pergunta:'Find the large engine and the small thrusters on the sides.',
   engenharia:'The SPS engine made major corrections and entered and exited lunar orbit. Four RCS thruster clusters controlled orientation; fuel cells combined hydrogen and oxygen to generate electricity and water.',
   curiosidades:['It did almost all the Apollo spacecraft’s propulsion work after Saturn V finished its mission.', 'Before reentry, it was discarded, leaving only the capsule with its heat shield.'],
   missoes:['Apollo 8: its engine put the first crew into lunar orbit and brought them back.', 'Apollo 13: an oxygen tank explosion in this module changed the landing mission into a rescue.']
  },
  es: {
   funcao:'Proporcionar propulsión, energía eléctrica y recursos de soporte vital.',
   detalhes:'El motor SPS realizaba grandes cambios de velocidad. Pequeños propulsores RCS controlaban la orientación. Las pilas de combustible producían electricidad con hidrógeno y oxígeno; los radiadores ayudaban a eliminar el calor.',
   destino:'Se separaba de la cápsula antes de la reentrada; no regresaba intacto.',
   apelido:'La mochila de recursos de la nave',
   crianca:'Lleva el motor principal de la nave Apolo y recursos para el viaje, como oxígeno y equipos que producen electricidad.',
   analogia:'Es la mochila de una larga aventura, con energía y suministros para la cápsula.',
   pergunta:'Encuentra el motor grande y los pequeños propulsores en los laterales.',
   engenharia:'El motor SPS realizaba grandes correcciones y la entrada y salida de la órbita lunar. Cuatro grupos de propulsores RCS controlaban la orientación; las pilas de combustible combinaban hidrógeno y oxígeno para generar electricidad y agua.',
   curiosidades:['Realizaba casi todo el trabajo de propulsión de la nave Apolo después de que el Saturn V terminara su misión.', 'Antes de la reentrada se descartaba para dejar solo la cápsula con su escudo térmico.'],
   missoes:['Apolo 8: su motor colocó a la primera tripulación en órbita lunar y la trajo de regreso.', 'Apolo 13: la explosión de un tanque de oxígeno en este módulo cambió la misión de alunizaje por una de rescate.']
  }
 },
 cm: {
  en: {
   funcao:'House the three astronauts and protect them during atmospheric reentry.',
   detalhes:'The conical capsule contained controls, seats, a hatch, and a heat shield at its base. Parachutes reduced its speed before splashdown.',
   destino:'It was the only part of the crewed assembly that returned intact to Earth.',
   apelido:'The home that returns to Earth',
   crianca:'The three astronauts travel in this capsule on the way out and back. Its heat shield protects the crew from intense heat when entering the atmosphere.',
   analogia:'It is a small home with a protective base. Parachutes help it land in the ocean.',
   pergunta:'Rotate the capsule. Can you see the dark shield at its base?',
   engenharia:'The blunt shape created a shock wave that carried some heat away from the capsule. An ablative shield wore away in a controlled manner; then main parachutes reduced its speed for splashdown.',
   curiosidades:['It was the only part of Saturn V/Apollo that returned whole to Earth.', 'Its interior had roughly the space of a large car for three astronauts and equipment.'],
   missoes:['Apollo 7: first crewed flight of the Apollo command module.', 'Apollo 8: first crewed capsule to return from the Moon.', 'Apollo 11: Columbia brought Armstrong, Aldrin, and Collins back to the Pacific.']
  },
  es: {
   funcao:'Alojar a los tres astronautas y protegerlos durante la reentrada en la atmósfera.',
   detalhes:'La cápsula cónica contenía controles, asientos, escotilla y escudo térmico en la base. Los paracaídas reducían la velocidad antes del amerizaje.',
   destino:'Era la única parte del conjunto tripulado que regresaba intacta a la Tierra.',
   apelido:'La casa que vuelve a la Tierra',
   crianca:'Los tres astronautas viajan en esta cápsula a la ida y a la vuelta. Su escudo térmico protege a la tripulación del calor intenso al entrar en la atmósfera.',
   analogia:'Es una pequeña casa con una base protectora. Los paracaídas ayudan a aterrizar en el océano.',
   pergunta:'Gira la cápsula. ¿Puedes ver el escudo oscuro en la base?',
   engenharia:'La forma roma creaba una onda de choque que alejaba parte del calor de la cápsula. Un escudo ablativo se consumía de forma controlada; después, los paracaídas principales reducían la velocidad para el amerizaje.',
   curiosidades:['Era la única parte del Saturn V/Apolo que regresaba entera a la Tierra.', 'Su interior tenía aproximadamente el espacio de un automóvil grande para tres astronautas y equipos.'],
   missoes:['Apolo 7: primer vuelo tripulado del módulo de mando Apolo.', 'Apolo 8: primera cápsula tripulada en regresar de la Luna.', 'Apolo 11: el Columbia trajo a Armstrong, Aldrin y Collins de vuelta al Pacífico.']
  }
 },
 les: {
  en: {
   funcao:'Quickly pull the command capsule away in an emergency early in flight.',
   detalhes:'A solid-fuel rocket mounted on a truss tower could pull the capsule away from the launcher. The cover protected the command module.',
   destino:'It was discarded when no longer needed. It did not travel to the Moon.',
   apelido:'The emergency rescue',
   crianca:'If a serious problem occurred early in ascent, this small rocket could pull the capsule away from the large rocket.',
   analogia:'It is a rescue system prepared before departure, even if it is never needed.',
   pergunta:'Why is it above the capsule instead of below it?',
   engenharia:'Fast-response solid motors would pull the command module up and away. Another motor would orient the assembly, and the capsule would then use its parachutes.',
   curiosidades:['The system was tested on towers and on Little Joe II flights.', 'It never had to be activated on an Apollo mission with astronauts.'],
   missoes:['Pad Abort Tests 1 and 2 demonstrated escape from the ground.', 'The Little Joe II series tested rescue under different flight conditions.']
  },
  es: {
   funcao:'Alejar rápidamente la cápsula de mando en caso de emergencia al inicio del vuelo.',
   detalhes:'Un cohete de combustible sólido, montado en una torre de celosía, podía alejar la cápsula del lanzador. La cubierta protegía el módulo de mando.',
   destino:'Se descartaba cuando dejaba de ser necesaria. No llegaba a la Luna.',
   apelido:'El rescate de emergencia',
   crianca:'Si ocurría un problema grave al comienzo del ascenso, este pequeño cohete podía alejar la cápsula del cohete grande.',
   analogia:'Es un sistema de rescate preparado antes de salir, aunque no sea necesario usarlo.',
   pergunta:'¿Por qué está encima de la cápsula y no debajo?',
   engenharia:'Los motores sólidos de respuesta rápida tirarían del módulo de mando hacia arriba y lejos. Otro motor orientaría el conjunto y la cápsula usaría entonces sus paracaídas.',
   curiosidades:['El sistema se probó en torres y en vuelos Little Joe II.', 'Nunca tuvo que activarse en una misión Apolo con astronautas.'],
   missoes:['Las pruebas Pad Abort 1 y 2 demostraron el escape desde tierra.', 'La serie Little Joe II probó el rescate en diferentes condiciones de vuelo.']
  }
 }
});

for (const part of PARTES) {
  const translations = PART_TEXT[part.id];
  if (!translations) continue;
  for (const language of ['en', 'es']) {
    for (const [field, translated] of Object.entries(translations[language])) {
      if (Array.isArray(translated)) part[field].forEach((text, index) => { TEXT[language][text] = translated[index]; });
      else TEXT[language][part[field]] = translated;
    }
  }
}

function translateTree(value, language) {
  if (typeof value === 'string') return TEXT[language][value] ?? value;
  if (Array.isArray(value)) return value.map(item => translateTree(item, language));
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateTree(item, language)]));
}

export function localizarSaturno(vehicle, idioma) {
  if (!vehicle || vehicle.id !== 'saturno' || idioma === 'pt' || !TEXT[idioma]) return vehicle;
  return translateTree(vehicle, idioma);
}

export function localizarMissoesSaturno(data = MISSOES_NAVE.saturno, idioma) {
  if (idioma === 'pt' || !TEXT[idioma]) return data;
  return translateTree(data, idioma);
}
