// Artemis I: conteúdo narrativo preparado, ainda fora do catálogo.
// IDs identificam marcos de leitura; fase é descritiva e não aciona uma cena.
export const ETAPAS_ARTEMIS1 = [
  {
    id: 'assembled-vehicle', fase: 'preparacao',
    titulo: { pt: 'Um voo de teste sem tripulação', en: 'An uncrewed test flight', es: 'Un vuelo de prueba sin tripulación' },
    corpo: {
      pt: 'Em 16 de novembro de 2022, o SLS lançou a cápsula Orion sem astronautas. O teste verificou a viagem ao redor da Lua e o retorno à Terra antes de futuras missões tripuladas.',
      en: 'On November 16, 2022, SLS launched the Orion capsule without astronauts. The test checked a journey around the Moon and back to Earth ahead of future crewed missions.',
      es: 'El 16 de noviembre de 2022, el SLS lanzó la cápsula Orion sin astronautas. La prueba examinó un viaje alrededor de la Luna y el regreso a la Tierra antes de futuras misiones tripuladas.'
    }
  },
  {
    id: 'liftoff', fase: 'lancamento',
    titulo: { pt: 'Decolagem do SLS', en: 'SLS lifts off', es: 'Despegue del SLS' },
    corpo: {
      pt: 'O foguete decolou do Centro Espacial Kennedy. Motores e propulsores forneceram o empuxo para vencer a gravidade e iniciar a subida.',
      en: 'The rocket lifted off from Kennedy Space Center. Engines and boosters provided thrust to overcome gravity and begin the climb.',
      es: 'El cohete despegó del Centro Espacial Kennedy. Los motores y propulsores dieron el empuje necesario para vencer la gravedad e iniciar el ascenso.'
    }
  },
  {
    id: 'booster-separation', fase: 'subida',
    titulo: { pt: 'Os propulsores sólidos se separam', en: 'The solid boosters separate', es: 'Se separan los propulsores sólidos' },
    corpo: {
      pt: 'Depois de fornecer empuxo na subida inicial, os dois propulsores sólidos se separaram. O foguete continuou acelerando com os motores do estágio central.',
      en: 'After providing thrust during the early climb, the two solid rocket boosters separated. The rocket kept accelerating with the core stage engines.',
      es: 'Tras aportar empuje durante el ascenso inicial, se separaron los dos propulsores sólidos. El cohete siguió acelerando con los motores de la etapa central.'
    }
  },
  {
    id: 'fairings-and-tower-jettison', fase: 'subida',
    titulo: { pt: 'Carenagens e torre são descartadas', en: 'Fairings and tower are jettisoned', es: 'Se desechan las cubiertas y la torre' },
    corpo: {
      pt: 'Já fora das partes mais densas da atmosfera, as carenagens que protegiam os painéis solares e a torre de escape foram descartadas. Elas já tinham cumprido sua função durante o lançamento.',
      en: 'Once clear of the denser atmosphere, the fairings that protected the solar arrays and the launch abort tower were jettisoned. They had completed their launch role.',
      es: 'Al salir de las capas más densas de la atmósfera, se desecharon las cubiertas que protegían los paneles solares y la torre de escape. Ya habían cumplido su función durante el lanzamiento.'
    }
  },
  {
    id: 'core-stage-separation', fase: 'subida',
    titulo: { pt: 'O estágio central se separa', en: 'The core stage separates', es: 'Se separa la etapa central' },
    corpo: {
      pt: 'Quando o estágio central terminou sua queima, ele se separou do conjunto. Orion continuou ligada ao estágio superior ICPS, que ainda faria uma manobra importante.',
      en: 'When the core stage finished its burn, it separated from the stack. Orion remained attached to the upper ICPS stage, which still had an important maneuver to perform.',
      es: 'Cuando la etapa central terminó su encendido, se separó del conjunto. Orion siguió unida a la etapa superior ICPS, que aún debía realizar una maniobra importante.'
    }
  },
  {
    id: 'solar-array-deployment', fase: 'orbita-terrestre',
    titulo: { pt: 'Os painéis solares se abrem', en: 'The solar arrays deploy', es: 'Se despliegan los paneles solares' },
    corpo: {
      pt: 'Os quatro painéis da Orion se abriram enquanto a cápsula ainda estava ligada ao ICPS. Eles convertem luz solar em eletricidade para os sistemas da nave; não fornecem o empuxo da viagem.',
      en: 'Orion’s four solar arrays deployed while the capsule was still attached to ICPS. They turn sunlight into electricity for the spacecraft systems; they do not provide the thrust for the journey.',
      es: 'Los cuatro paneles solares de Orion se desplegaron mientras la cápsula aún estaba unida al ICPS. Transforman la luz solar en electricidad para los sistemas de la nave; no proporcionan el empuje del viaje.'
    }
  },
  {
    id: 'translunar-injection', fase: 'partida-para-lua',
    titulo: { pt: 'ICPS aponta a viagem para a Lua', en: 'ICPS sends Orion toward the Moon', es: 'El ICPS encamina a Orion hacia la Luna' },
    corpo: {
      pt: 'O estágio ICPS acionou o motor para a injeção translunar: uma queima que colocou o conjunto numa trajetória rumo à Lua. Os painéis já estavam abertos antes dessa manobra.',
      en: 'The ICPS stage fired its engine for translunar injection: a burn that placed the stack on a path toward the Moon. The solar arrays were already deployed before this maneuver.',
      es: 'La etapa ICPS encendió su motor para la inyección translunar: una maniobra que puso al conjunto en trayectoria hacia la Luna. Los paneles solares ya estaban desplegados antes de esa maniobra.'
    }
  },
  {
    id: 'orion-icps-separation', fase: 'cruzeiro',
    titulo: { pt: 'Orion se separa do ICPS', en: 'Orion separates from ICPS', es: 'Orion se separa del ICPS' },
    corpo: {
      pt: 'Após a queima que iniciou a rota lunar, Orion se separou do ICPS. A cápsula e o módulo de serviço seguiram juntos; o estágio superior ficou para trás.',
      en: 'After the burn that began the lunar route, Orion separated from ICPS. The capsule and service module continued together; the upper stage stayed behind.',
      es: 'Tras la maniobra que inició la ruta lunar, Orion se separó del ICPS. La cápsula y el módulo de servicio continuaron juntos; la etapa superior quedó atrás.'
    }
  },
  {
    id: 'powered-lunar-flyby', fase: 'sobrevoo-lunar',
    titulo: { pt: 'Sobrevoo propulsado da Lua', en: 'A powered flyby of the Moon', es: 'Sobrevuelo propulsado de la Luna' },
    corpo: {
      pt: 'Orion passou perto da Lua e usou uma queima do módulo de serviço para ajustar o percurso. A gravidade lunar também ajudou a conduzir a nave para a próxima etapa.',
      en: 'Orion passed near the Moon and used a service module burn to adjust its course. Lunar gravity also helped guide the spacecraft into the next part of the mission.',
      es: 'Orion pasó cerca de la Luna y usó un encendido del módulo de servicio para ajustar su trayectoria. La gravedad lunar también ayudó a llevar la nave a la siguiente etapa.'
    }
  },
  {
    id: 'distant-retrograde-orbit', fase: 'orbita-lunar',
    titulo: { pt: 'Uma órbita retrógrada distante', en: 'A distant retrograde orbit', es: 'Una órbita retrógrada distante' },
    corpo: {
      pt: 'A nave entrou numa órbita ampla ao redor da Lua, chamada retrógrada distante. Orion a percorreu no sentido oposto ao da Lua ao redor da Terra. A missão permaneceu em voo, sem pousar.',
      en: 'The spacecraft entered a wide orbit around the Moon called a distant retrograde orbit. Orion traveled around it in the opposite direction to the Moon’s motion around Earth. The mission remained in flight, without landing.',
      es: 'La nave entró en una órbita amplia alrededor de la Luna llamada retrógrada distante. Orion la recorrió en sentido opuesto al movimiento de la Luna alrededor de la Tierra. La misión permaneció en vuelo, sin alunizar.'
    }
  },
  {
    id: 'lunar-orbit-tests', fase: 'testes',
    titulo: { pt: 'Testes longe da Terra', en: 'Testing far from Earth', es: 'Pruebas lejos de la Tierra' },
    corpo: {
      pt: 'Durante vários dias, a equipe acompanhou Orion e verificou sistemas, comunicação e navegação. A missão testava a nave e suas operações; não levava astronautas nem um módulo de pouso lunar.',
      en: 'For several days, teams tracked Orion and checked its systems, communications and navigation. The mission tested the spacecraft and its operations; it carried no astronauts or lunar lander.',
      es: 'Durante varios días, los equipos siguieron a Orion y comprobaron sus sistemas, comunicaciones y navegación. La misión probó la nave y sus operaciones; no llevaba astronautas ni un módulo de alunizaje.'
    }
  },
  {
    id: 'distant-orbit-departure', fase: 'retorno',
    titulo: { pt: 'Saída da órbita lunar', en: 'Leaving lunar orbit', es: 'Salida de la órbita lunar' },
    corpo: {
      pt: 'Uma queima do módulo de serviço tirou Orion da órbita retrógrada distante. A nave iniciou então o caminho de volta, aproveitando a geometria do sobrevoo lunar.',
      en: 'A service module burn took Orion out of the distant retrograde orbit. The spacecraft then began its return, using the geometry of the lunar flyby.',
      es: 'Un encendido del módulo de servicio sacó a Orion de la órbita retrógrada distante. La nave inició entonces el regreso, aprovechando la geometría del sobrevuelo lunar.'
    }
  },
  {
    id: 'return-flyby', fase: 'retorno',
    titulo: { pt: 'Sobrevoo para voltar à Terra', en: 'A flyby on the way home', es: 'Sobrevuelo de regreso a la Tierra' },
    corpo: {
      pt: 'Orion passou novamente perto da Lua. Uma queima do módulo de serviço e a gravidade lunar ajustaram a trajetória de volta à Terra, sem pouso lunar.',
      en: 'Orion passed near the Moon again. A service module burn and lunar gravity shaped its return path to Earth, without a lunar landing.',
      es: 'Orion volvió a pasar cerca de la Luna. Un encendido del módulo de servicio y la gravedad lunar ajustaron la trayectoria de regreso a la Tierra, sin alunizaje.'
    }
  },
  {
    id: 'service-module-separation', fase: 'preparacao-reentrada',
    titulo: { pt: 'O módulo de serviço se separa', en: 'The service module separates', es: 'Se separa el módulo de servicio' },
    corpo: {
      pt: 'Antes da reentrada, o módulo de serviço europeu se separou da cápsula. A cápsula Orion, que protege o espaço habitável e tem o escudo térmico, continuou em direção à atmosfera.',
      en: 'Before reentry, the European service module separated from the capsule. The Orion capsule, which protects the crew compartment and carries the heat shield, continued toward the atmosphere.',
      es: 'Antes de la reentrada, el módulo de servicio europeo se separó de la cápsula. La cápsula Orion, que protege el espacio habitable y lleva el escudo térmico, continuó hacia la atmósfera.'
    }
  },
  {
    id: 'atmospheric-reentry', fase: 'reentrada',
    titulo: { pt: 'A cápsula reentra na atmosfera', en: 'The capsule reenters the atmosphere', es: 'La cápsula reingresa en la atmósfera' },
    corpo: {
      pt: 'A cápsula entrou na atmosfera em alta velocidade. Seu escudo térmico ajudou a protegê-la do aquecimento enquanto a atmosfera reduzia sua velocidade.',
      en: 'The capsule entered the atmosphere at high speed. Its heat shield helped protect it from heating as the atmosphere slowed it down.',
      es: 'La cápsula entró en la atmósfera a gran velocidad. Su escudo térmico ayudó a protegerla del calentamiento mientras la atmósfera reducía su velocidad.'
    }
  },
  {
    id: 'parachutes-splashdown', fase: 'recuperacao',
    titulo: { pt: 'Paraquedas e amerissagem', en: 'Parachutes and splashdown', es: 'Paracaídas y amerizaje' },
    corpo: {
      pt: 'Paraquedas reduziram a velocidade final. Em 11 de dezembro de 2022, Orion amerissou no oceano Pacífico e foi recuperada. Foi o fim de um voo sem tripulação, não um pouso na Lua.',
      en: 'Parachutes slowed the capsule for its final descent. On December 11, 2022, Orion splashed down in the Pacific Ocean and was recovered. This ended an uncrewed flight, not a Moon landing.',
      es: 'Los paracaídas frenaron la cápsula durante el descenso final. El 11 de diciembre de 2022, Orion amerizó en el océano Pacífico y fue recuperada. Terminó un vuelo sin tripulación, no un alunizaje.'
    }
  },
  {
    id: 'compare-power-and-thrust', fase: 'comparacao',
    titulo: { pt: 'Eletricidade e empuxo têm funções diferentes', en: 'Electricity and thrust do different jobs', es: 'La electricidad y el empuje cumplen funciones distintas' },
    corpo: {
      pt: 'Os painéis captam luz e geram eletricidade para os sistemas de Orion. Um motor, ao queimar propelente, produz empuxo e muda o movimento da nave. Energia elétrica mantém equipamentos; propulsão altera a trajetória.',
      en: 'Solar arrays collect sunlight and generate electricity for Orion’s systems. An engine burns propellant to produce thrust and change the spacecraft’s motion. Electrical power runs equipment; propulsion changes the trajectory.',
      es: 'Los paneles captan luz y generan electricidad para los sistemas de Orion. Un motor quema propelente para producir empuje y cambiar el movimiento de la nave. La electricidad alimenta equipos; la propulsión cambia la trayectoria.'
    }
  }
];
