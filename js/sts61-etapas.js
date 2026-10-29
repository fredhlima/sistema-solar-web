// STS-61: narrativa histórica. fase/scenario reservam contexto para a futura cena.
// Nenhuma etapa aciona modelos ou peças nesta entrega de conteúdo.
export const ETAPAS_STS61 = [
  {
    titulo: { pt: 'Uma imagem que precisava melhorar', en: 'An image that needed improvement', es: 'Una imagen que necesitaba mejorar' },
    corpo: {
      pt: 'Lançado em 1990, o Hubble produzia imagens menos nítidas que o esperado. Um erro na forma do espelho principal causava aberração esférica. A solução seria compensar esse erro com óptica corretiva nos instrumentos, mantendo o espelho no telescópio.',
      en: 'Launched in 1990, Hubble produced images less sharp than expected. An error in the shape of its primary mirror caused spherical aberration. The solution would compensate for that error with corrective optics for the instruments, keeping the mirror in the telescope.',
      es: 'Lanzado en 1990, Hubble producía imágenes menos nítidas de lo esperado. Un error en la forma del espejo principal causaba aberración esférica. La solución compensaría ese error mediante óptica correctiva para los instrumentos, conservando el espejo en el telescopio.'
    },
    fase: 'optical-problem', scenario: 'earth'
  },
  {
    titulo: { pt: '2 de dezembro de 1993: Endeavour parte', en: 'December 2, 1993: Endeavour lifts off', es: '2 de diciembre de 1993: Endeavour despega' },
    corpo: {
      pt: 'Sete astronautas partem do Centro Espacial Kennedy na missão STS-61. Endeavour leva ferramentas, instrumentos e equipamentos de manutenção. O Hubble já está em órbita; não viaja no compartimento de carga neste lançamento.',
      en: 'Seven astronauts leave Kennedy Space Center on mission STS-61. Endeavour carries tools, instruments and servicing equipment. Hubble is already in orbit; it is not riding in the payload bay on this launch.',
      es: 'Siete astronautas parten del Centro Espacial Kennedy en la misión STS-61. Endeavour lleva herramientas, instrumentos y equipos de mantenimiento. Hubble ya está en órbita; no viaja en el compartimento de carga en este lanzamiento.'
    },
    fase: 'launch', scenario: 'sky'
  },
  {
    titulo: { pt: 'Os propulsores sólidos se separam', en: 'The solid rocket boosters separate', es: 'Se separan los propulsores sólidos' },
    corpo: {
      pt: 'Após cerca de dois minutos, os dois propulsores sólidos se separam e descem de paraquedas até o oceano para recuperação. Endeavour continua subindo com os motores principais, ainda alimentados pelo tanque externo.',
      en: 'After about two minutes, the two solid rocket boosters separate and descend by parachute into the ocean for recovery. Endeavour keeps climbing with its main engines, still supplied by the external tank.',
      es: 'Tras unos dos minutos, los dos propulsores sólidos se separan y descienden en paracaídas al océano para recuperarlos. Endeavour sigue ascendiendo con los motores principales, todavía alimentados por el tanque externo.'
    },
    fase: 'booster-separation', scenario: 'sky'
  },
  {
    titulo: { pt: 'Tanque separado, rumo à órbita', en: 'Tank separated, heading for orbit', es: 'Tanque separado, rumbo a la órbita' },
    corpo: {
      pt: 'Ao fim da subida propulsada, os motores principais desligam e o tanque externo se separa. Ele não será recuperado. O orbitador prossegue e usa seus motores de manobra para ajustar a trajetória até a órbita de encontro com o Hubble.',
      en: 'At the end of powered ascent, the main engines shut down and the external tank separates. It will not be recovered. The orbiter continues and uses its maneuvering engines to adjust its path toward the orbit needed to rendezvous with Hubble.',
      es: 'Al terminar el ascenso propulsado, los motores principales se apagan y el tanque externo se separa. No se recuperará. El orbitador continúa y usa sus motores de maniobra para ajustar la trayectoria hacia la órbita de encuentro con Hubble.'
    },
    fase: 'tank-separation', scenario: 'earth'
  },
  {
    titulo: { pt: 'Encontrar o Hubble em órbita', en: 'Meeting Hubble in orbit', es: 'Encontrar a Hubble en órbita' },
    corpo: {
      pt: 'Com as portas de carga abertas, a tripulação prepara o braço robótico e verifica os equipamentos. Manobras cuidadosamente planejadas aproximam Endeavour do observatório. Encontrar o Hubble exige combinar posição e velocidade, não apenas apontar para ele.',
      en: 'With the payload bay doors open, the crew prepares the robotic arm and checks equipment. Carefully planned maneuvers bring Endeavour close to the observatory. Meeting Hubble requires matching position and velocity, not simply pointing toward it.',
      es: 'Con las compuertas de carga abiertas, la tripulación prepara el brazo robótico y comprueba los equipos. Maniobras cuidadosamente planificadas acercan Endeavour al observatorio. Encontrar a Hubble exige coordinar posición y velocidad, no solo apuntar hacia él.'
    },
    fase: 'rendezvous', scenario: 'earth'
  },
  {
    titulo: { pt: 'Capturar e fixar para o serviço', en: 'Capturing and securing Hubble for servicing', es: 'Capturar y sujetar a Hubble para el mantenimiento' },
    corpo: {
      pt: 'Claude Nicollier opera o Canadarm e captura o Hubble. O braço coloca o telescópio no suporte de manutenção do compartimento de carga. Assim, os astronautas podem trabalhar em seus equipamentos durante cinco atividades extraveiculares, chamadas EVAs.',
      en: 'Claude Nicollier operates Canadarm and captures Hubble. The arm places the telescope on the servicing support in the payload bay. Astronauts can then work on its equipment during five extravehicular activities, called EVAs.',
      es: 'Claude Nicollier maneja el Canadarm y captura a Hubble. El brazo coloca el telescopio en el soporte de mantenimiento del compartimento de carga. Así, los astronautas pueden trabajar en sus equipos durante cinco actividades extravehiculares, llamadas EVA.'
    },
    fase: 'capture', scenario: 'earth'
  },
  {
    titulo: { pt: 'EVA 1: recuperar o apontamento', en: 'EVA 1: restoring pointing control', es: 'EVA 1: recuperar la orientación' },
    corpo: {
      pt: 'Story Musgrave e Jeffrey Hoffman substituem duas unidades que contêm pares de giroscópios, além de componentes elétricos e fusíveis. Os giroscópios medem mudanças de orientação e ajudam o Hubble a manter a direção de observação. A primeira EVA prepara o observatório para trabalhar com precisão.',
      en: 'Story Musgrave and Jeffrey Hoffman replace two units containing pairs of gyroscopes, along with electrical components and fuses. Gyroscopes measure changes in orientation and help Hubble hold its observing direction. The first EVA prepares the observatory for precise work.',
      es: 'Story Musgrave y Jeffrey Hoffman sustituyen dos unidades que contienen pares de giroscopios, además de componentes eléctricos y fusibles. Los giroscopios miden cambios de orientación y ayudan a Hubble a mantener la dirección de observación. La primera EVA prepara el observatorio para trabajar con precisión.'
    },
    fase: 'eva-1', scenario: 'earth'
  },
  {
    titulo: { pt: 'EVA 2: renovar a energia', en: 'EVA 2: renewing the power supply', es: 'EVA 2: renovar la energía' },
    corpo: {
      pt: 'Kathryn Thornton e Thomas Akers trocam os dois painéis solares. Os novos reduzem vibrações que atrapalhavam o apontamento. Os antigos têm destinos diferentes: um, que não se recolheu corretamente, é liberado no espaço; o outro fica guardado para voltar à Terra.',
      en: 'Kathryn Thornton and Thomas Akers replace both solar arrays. The new ones reduce vibrations that disrupted pointing. The old arrays have different destinations: one, which failed to retract properly, is released into space; the other is stowed for return to Earth.',
      es: 'Kathryn Thornton y Thomas Akers sustituyen los dos paneles solares. Los nuevos reducen vibraciones que dificultaban la orientación. Los antiguos tienen destinos diferentes: uno, que no se recogió correctamente, se libera al espacio; el otro se guarda para regresar a la Tierra.'
    },
    fase: 'eva-2', scenario: 'earth'
  },
  {
    titulo: { pt: 'EVA 3: uma câmera com correção própria', en: 'EVA 3: a camera with its own correction', es: 'EVA 3: una cámara con corrección propia' },
    corpo: {
      pt: 'Hoffman e Musgrave retiram a câmera WFPC original e instalam a WFPC2. A nova câmera tem óptica corretiva própria, que compensa o erro do espelho principal para suas imagens. Eles também substituem dois magnetômetros, sensores que ajudam a determinar a orientação do telescópio.',
      en: 'Hoffman and Musgrave remove the original WFPC camera and install WFPC2. The new camera has its own corrective optics to compensate for the primary mirror error in its images. They also replace two magnetometers, sensors that help determine the telescope’s orientation.',
      es: 'Hoffman y Musgrave retiran la cámara WFPC original e instalan la WFPC2. La nueva cámara tiene óptica correctiva propia que compensa el error del espejo principal en sus imágenes. También sustituyen dos magnetómetros, sensores que ayudan a determinar la orientación del telescopio.'
    },
    fase: 'eva-3', scenario: 'earth'
  },
  {
    titulo: { pt: 'EVA 4: COSTAR para outros instrumentos', en: 'EVA 4: COSTAR for other instruments', es: 'EVA 4: COSTAR para otros instrumentos' },
    corpo: {
      pt: 'Thornton e Akers removem o fotômetro de alta velocidade, HSP, e instalam o COSTAR em seu lugar. Pequenos espelhos corretivos direcionam luz corrigida a outros três instrumentos. A WFPC2 já tem sua própria correção; o espelho principal do Hubble continua no telescópio.',
      en: 'Thornton and Akers remove the High Speed Photometer, HSP, and install COSTAR in its place. Small corrective mirrors direct corrected light to three other instruments. WFPC2 already has its own correction; Hubble’s primary mirror stays in the telescope.',
      es: 'Thornton y Akers retiran el fotómetro de alta velocidad, HSP, e instalan COSTAR en su lugar. Pequeños espejos correctores dirigen luz corregida hacia otros tres instrumentos. WFPC2 ya tiene su propia corrección; el espejo principal de Hubble permanece en el telescopio.'
    },
    fase: 'eva-4', scenario: 'earth'
  },
  {
    titulo: { pt: 'Ajustar a órbita antes da última EVA', en: 'Adjusting the orbit before the final EVA', es: 'Ajustar la órbita antes de la última EVA' },
    corpo: {
      pt: 'Com o Hubble ainda preso ao Endeavour, Kenneth Bowersox usa os propulsores do ônibus espacial para elevar um pouco e tornar mais circular a órbita do conjunto. A manobra ocorre antes da quinta EVA. O telescópio continua em órbita da Terra.',
      en: 'With Hubble still attached to Endeavour, Kenneth Bowersox uses the shuttle’s thrusters to raise and circularize their shared orbit slightly. This maneuver takes place before the fifth EVA. The telescope remains in Earth orbit.',
      es: 'Con Hubble todavía sujeto al Endeavour, Kenneth Bowersox usa los propulsores del transbordador para elevar un poco y hacer más circular la órbita del conjunto. La maniobra ocurre antes de la quinta EVA. El telescopio sigue en órbita terrestre.'
    },
    fase: 'orbit-boost', scenario: 'earth'
  },
  {
    titulo: { pt: 'EVA 5: abrir painéis e concluir os reparos', en: 'EVA 5: deploying arrays and completing repairs', es: 'EVA 5: desplegar paneles y completar las reparaciones' },
    corpo: {
      pt: 'Hoffman e Musgrave acionam manualmente a abertura dos novos painéis após uma tentativa por comando falhar. Trocam eletrônica de controle dos painéis, instalam uma conexão no espectrógrafo GHRS e proteções nos magnetômetros. A quinta EVA encerra os reparos externos.',
      en: 'Hoffman and Musgrave manually initiate deployment of the new arrays after a commanded attempt fails. They replace array control electronics, install a connection on the GHRS spectrograph and fit magnetometer covers. The fifth EVA completes the external repairs.',
      es: 'Hoffman y Musgrave activan manualmente el despliegue de los nuevos paneles tras fallar un intento por comando. Cambian la electrónica de control de los paneles, instalan una conexión en el espectrógrafo GHRS y cubiertas en los magnetómetros. La quinta EVA concluye las reparaciones externas.'
    },
    fase: 'eva-5', scenario: 'earth'
  },
  {
    titulo: { pt: 'Liberar o observatório', en: 'Releasing the observatory', es: 'Liberar el observatorio' },
    corpo: {
      pt: 'Nicollier usa o Canadarm para erguer o Hubble acima do compartimento. Após a abertura da tampa do telescópio por comando da Terra, o braço o libera. Endeavour se afasta devagar com seus sete tripulantes. O observatório permanece no espaço para verificações e novas observações.',
      en: 'Nicollier uses Canadarm to lift Hubble above the payload bay. After ground controllers command the telescope’s aperture door open, the arm releases it. Endeavour slowly backs away with its seven crew members. The observatory stays in space for checks and new observations.',
      es: 'Nicollier usa el Canadarm para elevar a Hubble sobre el compartimento de carga. Tras abrirse la tapa del telescopio por comando desde la Tierra, el brazo lo libera. Endeavour se aleja despacio con sus siete tripulantes. El observatorio permanece en el espacio para comprobaciones y nuevas observaciones.'
    },
    fase: 'release', scenario: 'earth'
  },
  {
    titulo: { pt: 'Preparar o retorno', en: 'Preparing for the return', es: 'Preparar el regreso' },
    corpo: {
      pt: 'A tripulação organiza a cabine, verifica os sistemas de voo e prepara o pouso. O braço é guardado e as portas do compartimento são fechadas para a reentrada. Instrumentos retirados voltam com Endeavour; o Hubble continua em órbita, fora do ônibus espacial.',
      en: 'The crew tidies the cabin, checks flight systems and prepares for landing. The arm is stowed and the payload bay doors are closed for reentry. Removed instruments return with Endeavour; Hubble remains in orbit, outside the shuttle.',
      es: 'La tripulación organiza la cabina, comprueba los sistemas de vuelo y prepara el aterrizaje. El brazo se guarda y se cierran las compuertas de carga para la reentrada. Los instrumentos retirados regresan con Endeavour; Hubble sigue en órbita, fuera del transbordador.'
    },
    fase: 'return-preparation', scenario: 'earth'
  },
  {
    titulo: { pt: 'Reentrada: atravessar a atmosfera', en: 'Reentry: crossing the atmosphere', es: 'Reentrada: atravesar la atmósfera' },
    corpo: {
      pt: 'Uma queima de frenagem permite que Endeavour retorne à atmosfera. A proteção térmica suporta o intenso aquecimento enquanto o orbitador perde velocidade. Mais abaixo, as asas e superfícies de controle permitem conduzir o voo planado até a pista.',
      en: 'A braking burn allows Endeavour to return to the atmosphere. Thermal protection withstands intense heating as the orbiter loses speed. Lower down, the wings and control surfaces allow the crew to guide its glide toward the runway.',
      es: 'Un encendido de frenado permite que Endeavour regrese a la atmósfera. La protección térmica soporta el intenso calentamiento mientras el orbitador pierde velocidad. Más abajo, las alas y superficies de control permiten dirigir el vuelo planeado hacia la pista.'
    },
    fase: 'reentry', scenario: 'earth'
  },
  {
    titulo: { pt: '13 de dezembro de 1993: pouso em Kennedy', en: 'December 13, 1993: landing at Kennedy', es: '13 de diciembre de 1993: aterrizaje en Kennedy' },
    corpo: {
      pt: 'Richard Covey conduz Endeavour a um pouso noturno no Centro Espacial Kennedy, na Flórida. A missão termina com a tripulação de volta à Terra. Após verificações, novas imagens confirmam a recuperação da capacidade óptica do Hubble: a manutenção em órbita havia funcionado.',
      en: 'Richard Covey guides Endeavour to a night landing at Kennedy Space Center in Florida. The mission ends with the crew back on Earth. After checks, new images confirm the recovery of Hubble’s optical performance: servicing in orbit had worked.',
      es: 'Richard Covey guía al Endeavour hasta un aterrizaje nocturno en el Centro Espacial Kennedy, Florida. La misión termina con la tripulación de vuelta en la Tierra. Tras las comprobaciones, nuevas imágenes confirman la recuperación de la capacidad óptica de Hubble: el mantenimiento en órbita había funcionado.'
    },
    fase: 'landing', scenario: 'runway'
  }
];
