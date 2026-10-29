// Roteiro cronológico da missão STS-31. Peças referenciam IDs de shuttle-data.js.
export const ETAPAS_DISCOVERY = [
  {
    titulo: { pt: '24 de abril: Discovery parte', en: 'April 24: Discovery lifts off', es: '24 de abril: Discovery despega' },
    corpo: {
      pt: 'Cinco astronautas e o Hubble partem do Centro Espacial Kennedy. Os três motores principais recebem propelente do tanque externo; os dois propulsores sólidos dão o empurrão inicial.',
      en: 'Five astronauts and Hubble leave Kennedy Space Center. The three main engines draw propellant from the external tank; the two solid rocket boosters provide the initial push.',
      es: 'Cinco astronautas y el Hubble parten del Centro Espacial Kennedy. Los tres motores principales reciben propelente del tanque externo; los dos cohetes sólidos dan el impulso inicial.'
    }, pecas: ['orbiter', 'tank', 'engines', 'srb-left', 'srb-right', 'hubble']
  },
  {
    titulo: { pt: 'Os propulsores se separam', en: 'The boosters separate', es: 'Se separan los propulsores' },
    corpo: {
      pt: 'Após cerca de dois minutos, os dois propulsores sólidos se soltam e descem de paraquedas para recuperação no oceano. O Discovery continua subindo com os motores principais.',
      en: 'After about two minutes, the two solid rocket boosters separate and descend by parachute for recovery at sea. Discovery keeps climbing with its main engines.',
      es: 'Tras unos dos minutos, los dos cohetes sólidos se separan y descienden en paracaídas para recuperarse en el océano. Discovery sigue ascendiendo con sus motores principales.'
    }, pecas: ['orbiter', 'tank', 'engines', 'srb-left', 'srb-right']
  },
  {
    titulo: { pt: 'Motores desligados; tanque solto', en: 'Main engines off; tank released', es: 'Motores principales apagados; tanque liberado' },
    corpo: {
      pt: 'Cerca de oito minutos e meio após a partida, os motores principais desligam. O tanque externo vazio é descartado e se desintegra na reentrada; o orbitador segue com o Hubble.',
      en: 'About eight and a half minutes after liftoff, the main engines shut down. The empty external tank is jettisoned and breaks up during reentry; the orbiter continues with Hubble.',
      es: 'Unos ocho minutos y medio después del despegue, se apagan los motores principales. El tanque externo vacío se desecha y se desintegra en la reentrada; el orbitador continúa con el Hubble.'
    }, pecas: ['orbiter', 'tank', 'engines', 'hubble']
  },
  {
    titulo: { pt: 'Ajuste de órbita', en: 'Orbit adjustment', es: 'Ajuste de órbita' },
    corpo: {
      pt: 'No espaço, pequenas queimas dos motores OMS, nas laterais da cauda do orbitador, ajustam a órbita. O Discovery e o Hubble ficam ao redor da Terra: não seguem para a Lua.',
      en: 'In space, brief burns of the OMS engines beside the orbiter’s tail adjust its orbit. Discovery and Hubble circle Earth; they are not heading to the Moon.',
      es: 'En el espacio, breves encendidos de los motores OMS junto a la cola del orbitador ajustan la órbita. Discovery y el Hubble giran alrededor de la Tierra; no van a la Luna.'
    }, pecas: ['orbiter', 'hubble']
  },
  {
    titulo: { pt: 'Portas abertas, calor controlado', en: 'Payload bay doors open', es: 'Compuertas abiertas, calor controlado' },
    corpo: {
      pt: 'Já em órbita, a tripulação abre as duas portas do compartimento. Suas faces internas têm radiadores que ajudam a liberar calor para o espaço enquanto o Hubble é preparado.',
      en: 'Once in orbit, the crew opens both payload bay doors. Radiators on their inner surfaces help release heat to space while Hubble is prepared.',
      es: 'Ya en órbita, la tripulación abre las dos compuertas de carga. Sus caras interiores tienen radiadores que ayudan a liberar calor al espacio mientras preparan el Hubble.'
    }, pecas: ['orbiter', 'door-left', 'door-right', 'hubble']
  },
  {
    titulo: { pt: 'O Canadarm segura o Hubble', en: 'Canadarm holds Hubble', es: 'Canadarm sujeta el Hubble' },
    corpo: {
      pt: 'Controlado por astronautas dentro da cabine, o braço robótico canadense prende o Hubble e o ergue do compartimento. O braço permite mover uma carga grande com cuidado no espaço.',
      en: 'Operated by astronauts inside the cabin, the Canadian robotic arm grips Hubble and lifts it from the bay. The arm lets the crew carefully move a large payload in space.',
      es: 'Manejado por astronautas desde la cabina, el brazo robótico canadiense sujeta el Hubble y lo levanta del compartimento. Permite mover con cuidado una carga grande en el espacio.'
    }, pecas: ['orbiter', 'door-left', 'door-right', 'arm', 'hubble']
  },
  {
    titulo: { pt: '25 de abril: Hubble é liberado', en: 'April 25: Hubble is released', es: '25 de abril: se libera el Hubble' },
    corpo: {
      pt: 'Os painéis solares e as antenas são abertos enquanto o braço ainda segura o Hubble. Após as verificações, o Canadarm libera o telescópio em órbita em 25 de abril de 1990.',
      en: 'The solar arrays and antennas are deployed while the arm still holds Hubble. After checks, Canadarm releases the telescope into orbit on April 25, 1990.',
      es: 'Los paneles solares y las antenas se abren mientras el brazo aún sujeta el Hubble. Tras las verificaciones, Canadarm libera el telescopio en órbita el 25 de abril de 1990.'
    }, pecas: ['orbiter', 'arm', 'hubble']
  },
  {
    titulo: { pt: 'Discovery se afasta', en: 'Discovery moves away', es: 'Discovery se aleja' },
    corpo: {
      pt: 'O Discovery se afasta e acompanha o Hubble em órbita paralela por cerca de dois dias, caso a equipe precise ajudar. O telescópio então continua sua missão sozinho.',
      en: 'Discovery moves away and follows Hubble in a parallel orbit for about two days, in case the crew needs to help. The telescope then continues its mission alone.',
      es: 'Discovery se aleja y acompaña al Hubble en una órbita paralela durante unos dos días, por si la tripulación debe ayudar. Después, el telescopio continúa solo su misión.'
    }, pecas: ['orbiter', 'arm', 'hubble']
  },
  {
    titulo: { pt: 'Portas fechadas para a volta', en: 'Doors close for the return', es: 'Compuertas cerradas para el regreso' },
    corpo: {
      pt: 'Com a carga entregue, os astronautas recolhem o braço e fecham as portas do compartimento. O orbitador fica configurado para deixar a órbita e atravessar a atmosfera.',
      en: 'With the payload delivered, the astronauts stow the arm and close the bay doors. The orbiter is configured to leave orbit and pass through the atmosphere.',
      es: 'Con la carga entregada, los astronautas guardan el brazo y cierran las compuertas. El orbitador queda preparado para salir de órbita y atravesar la atmósfera.'
    }, pecas: ['orbiter', 'door-left', 'door-right', 'arm']
  },
  {
    titulo: { pt: 'De órbita à atmosfera', en: 'From orbit to the atmosphere', es: 'De la órbita a la atmósfera' },
    corpo: {
      pt: 'Uma queima dos motores OMS reduz a velocidade orbital e inicia o retorno. O orbitador encontra ar cada vez mais denso; as asas ajudam a guiá-lo e a proteção térmica protege o ventre, o nariz e as bordas das asas do aquecimento.',
      en: 'An OMS burn reduces orbital speed and begins the return. The orbiter meets denser air; its wings help guide it, while thermal protection shields the underside, nose and wing edges from heating.',
      es: 'Un encendido de los motores OMS reduce la velocidad orbital e inicia el regreso. El orbitador encuentra aire más denso; sus alas ayudan a guiarlo y la protección térmica protege el vientre, la nariz y los bordes de las alas del calentamiento.'
    }, pecas: ['orbiter']
  },
  {
    titulo: { pt: '29 de abril: pouso em Edwards', en: 'April 29: landing at Edwards', es: '29 de abril: aterrizaje en Edwards' },
    corpo: {
      pt: 'O Discovery plana sem motores principais e pousa na Base Aérea de Edwards, na Califórnia, em 29 de abril de 1990. A STS-31 termina após cinco dias de missão.',
      en: 'Discovery glides without its main engines and lands at Edwards Air Force Base in California on April 29, 1990. The five-day STS-31 mission is complete.',
      es: 'Discovery planea sin sus motores principales y aterriza en la Base Aérea Edwards, en California, el 29 de abril de 1990. Termina la misión STS-31 de cinco días.'
    }, pecas: ['orbiter']
  }
];
