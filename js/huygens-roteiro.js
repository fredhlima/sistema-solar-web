// Roteiro didático da descida de Huygens em Titã.
const ETAPAS_HUYGENS = [
  {
    titulo: { pt: 'Cassini leva Huygens até Titã', en: 'Cassini carries Huygens to Titan', es: 'Cassini lleva a Huygens hasta Titán' },
    corpo: {
      pt: 'A sonda Huygens viajou acoplada à nave Cassini. Em 25 de dezembro de 2004, separou-se para seguir em direção a Titã. Cassini permaneceu em órbita de Saturno.',
      en: 'The Huygens probe travelled attached to the Cassini spacecraft. On December 25, 2004, it separated and continued toward Titan. Cassini remained in orbit around Saturn.',
      es: 'La sonda Huygens viajó acoplada a la nave Cassini. El 25 de diciembre de 2004, se separó para seguir hacia Titán. Cassini permaneció en órbita de Saturno.'
    },
    pecas: ['orbiter', 'probe'], huygensPhase: 'paired', scenario: 'titan-orbit'
  },
  {
    titulo: { pt: 'A sonda se separa da Cassini', en: 'The probe separates from Cassini', es: 'La sonda se separa de Cassini' },
    corpo: {
      pt: 'Depois da viagem conjunta, Huygens iniciou seu caminho independente até Titã. Cassini funcionou como retransmissora: a sonda enviaria seus dados para Cassini, que os encaminharia à Terra.',
      en: 'After travelling together, Huygens began its independent journey to Titan. Cassini served as a relay: the probe sent its data to Cassini, which forwarded them to Earth.',
      es: 'Después del viaje conjunto, Huygens inició su camino independiente hacia Titán. Cassini funcionó como retransmisora: la sonda enviaría sus datos a Cassini, que los transmitiría a la Tierra.'
    },
    pecas: ['probe', 'orbiter'], huygensPhase: 'release', scenario: 'titan-orbit'
  },
  {
    titulo: { pt: 'Huygens encontra a atmosfera', en: 'Huygens meets the atmosphere', es: 'Huygens encuentra la atmósfera' },
    corpo: {
      pt: 'Em 14 de janeiro de 2005, Huygens entrou na atmosfera espessa de Titã. O escudo térmico protegeu a sonda durante a entrada; esta animação representa a sequência de forma simplificada.',
      en: 'On January 14, 2005, Huygens entered Titan’s thick atmosphere. The heat shield protected the probe during entry; this animation presents the sequence in simplified form.',
      es: 'El 14 de enero de 2005, Huygens entró en la densa atmósfera de Titán. El escudo térmico protegió la sonda durante la entrada; esta animación representa la secuencia de forma simplificada.'
    },
    pecas: ['probe', 'heatshield', 'backshell'], huygensPhase: 'entry', scenario: 'titan-sky'
  },
  {
    titulo: { pt: 'O paraquedas piloto é aberto', en: 'The pilot parachute opens', es: 'Se abre el paracaídas piloto' },
    corpo: {
      pt: 'Depois da entrada, o paraquedas piloto ajudou a remover o casco traseiro. A sequência abriu caminho para o paraquedas principal e para a continuação da descida.',
      en: 'After entry, the pilot parachute helped remove the rear cover. This sequence cleared the way for the main parachute and the rest of the descent.',
      es: 'Después de la entrada, el paracaídas piloto ayudó a retirar la cubierta trasera. La secuencia abrió paso al paracaídas principal y al resto del descenso.'
    },
    pecas: ['pilot', 'backshell', 'probe'], huygensPhase: 'pilot', scenario: 'titan-sky'
  },
  {
    titulo: { pt: 'O paraquedas principal freia a descida', en: 'The main parachute slows the descent', es: 'El paracaídas principal frena el descenso' },
    corpo: {
      pt: 'O paraquedas principal reduziu a velocidade de Huygens na atmosfera de Titã. A sonda desceu suspensa sob ele enquanto seus instrumentos coletavam dados.',
      en: 'The main parachute slowed Huygens in Titan’s atmosphere. The probe descended beneath it while its instruments collected data.',
      es: 'El paracaídas principal redujo la velocidad de Huygens en la atmósfera de Titán. La sonda descendió suspendida bajo él mientras sus instrumentos recogían datos.'
    },
    pecas: ['main', 'probe'], huygensPhase: 'main', scenario: 'titan-sky'
  },
  {
    titulo: { pt: 'O escudo frontal é liberado', en: 'The front shield is released', es: 'Se libera el escudo frontal' },
    corpo: {
      pt: 'Com a descida controlada pelo paraquedas, o escudo frontal foi liberado para expor os instrumentos. O escudo já havia cumprido sua função durante a entrada atmosférica.',
      en: 'With the parachute controlling the descent, the front shield was released to expose the instruments. It had already served its purpose during atmospheric entry.',
      es: 'Con el paracaídas controlando el descenso, se liberó el escudo frontal para dejar expuestos los instrumentos. Ya había cumplido su función durante la entrada atmosférica.'
    },
    pecas: ['heatshield', 'probe', 'main'], huygensPhase: 'shield', scenario: 'titan-sky'
  },
  {
    titulo: { pt: 'Um paraquedas menor mantém a descida', en: 'A smaller parachute continues the descent', es: 'Un paracaídas más pequeño continúa el descenso' },
    corpo: {
      pt: 'Cerca de 15 minutos após a abertura do principal, Huygens passou a descer sob um paraquedas menor. A troca ajudou a encurtar o tempo de descida e preservar energia para a missão na superfície.',
      en: 'About 15 minutes after the main parachute opened, Huygens continued beneath a smaller parachute. The change shortened the descent and conserved power for the surface mission.',
      es: 'Unos 15 minutos después de abrirse el principal, Huygens continuó bajo un paracaídas más pequeño. El cambio acortó el descenso y conservó energía para la misión en la superficie.'
    },
    pecas: ['main', 'drogue', 'probe'], huygensPhase: 'drogue', scenario: 'titan-sky'
  },
  {
    titulo: { pt: 'Huygens pousa em solo seco', en: 'Huygens lands on dry ground', es: 'Huygens aterriza en suelo seco' },
    corpo: {
      pt: 'Huygens chegou à superfície em solo seco, numa região escura de Titã, em 14 de janeiro de 2005. As imagens mostraram terreno com pedras e seixos de gelo de água; isso não significa que havia água líquida ali.',
      en: 'Huygens reached the surface on dry ground in a dark region of Titan on January 14, 2005. Images showed terrain with rocks and water-ice pebbles; this does not mean liquid water was present there.',
      es: 'Huygens llegó a la superficie sobre suelo seco, en una región oscura de Titán, el 14 de enero de 2005. Las imágenes mostraron terreno con rocas y guijarros de hielo de agua; esto no significa que hubiera agua líquida allí.'
    },
    pecas: ['probe', 'drogue'], huygensPhase: 'landed', scenario: 'titan-ground'
  },
  {
    titulo: { pt: 'Cassini retransmite os dados', en: 'Cassini relays the data', es: 'Cassini retransmite los datos' },
    corpo: {
      pt: 'Na superfície, Huygens continuou enviando informações para Cassini. A nave em órbita retransmitiu os dados à Terra; Huygens não transmitia diretamente para a Terra nesta etapa.',
      en: 'On the surface, Huygens continued sending information to Cassini. The spacecraft in orbit relayed the data to Earth; Huygens did not transmit directly to Earth during this phase.',
      es: 'En la superficie, Huygens siguió enviando información a Cassini. La nave en órbita retransmitió los datos a la Tierra; Huygens no transmitía directamente a la Tierra en esta etapa.'
    },
    pecas: ['probe', 'orbiter'], huygensPhase: 'relay', scenario: 'titan-ground'
  }
];

const textos = {
  pt: {
    titulo: 'Huygens: uma descida em Titã', objetivo: 'Como uma sonda pousou em Titã?',
    objetivoTexto: 'Acompanhe Huygens da viagem com Cassini até a superfície da maior lua de Saturno. A Terra começa a 1 hora/s; ajuste o tempo na barra inferior.',
    modeloTitulo: 'Partes da sonda Huygens', modeloAjuda: 'Exterior: modelo original NASA/Cassini-Huygens · interior, escudos, paraquedas e movimentos: representação artística. Arraste · pinça.',
    modeloErro: 'Vista 3D indisponível. Abra a ficha de uma peça para continuar.',
    chegada: 'Uma sonda na superfície de Titã', chegadaTexto: 'Huygens pousou em Titã em 14 de janeiro de 2005, após descer de paraquedas pela atmosfera. Cassini recebeu os dados e os retransmitiu à Terra.',
    perguntaTexto: 'Como os dados de Huygens chegaram à Terra depois do pouso?', opcao1: 'Cassini recebeu e retransmitiu os dados', opcao2: 'Huygens enviou os dados diretamente à Terra',
    certo: 'Isso! Huygens enviava os dados para Cassini, que os retransmitia à Terra.', tentar: 'Lembre que Huygens estava na superfície e Cassini continuava em órbita de Saturno.',
    recapTexto: 'Cassini levou Huygens até Titã e a sonda se separou antes da descida. Após entrar na atmosfera, Huygens usou paraquedas em sequência, liberou seus escudos e pousou em solo seco. Na superfície, enviou dados para Cassini, que os retransmitiu à Terra. A animação é didática: somente o modelo exterior da nave é original; interior e divisões são representações artísticas.',
    fonte: 'Fontes: ESA e NASA · Cassini-Huygens',
    peca_orbiter: 'Orbitador Cassini', peca_probe: 'Sonda Huygens', peca_heatshield: 'Escudos térmicos', peca_backshell: 'Casco traseiro', peca_pilot: 'Paraquedas piloto', peca_main: 'Paraquedas principal', peca_drogue: 'Paraquedas menor'
  },
  en: {
    titulo: 'Huygens: a descent on Titan', objetivo: 'How did a probe land on Titan?',
    objetivoTexto: 'Follow Huygens from its journey with Cassini to the surface of Saturn’s largest moon. Earth starts at 1 hour/s; adjust time in the bottom bar.',
    modeloTitulo: 'Parts of the Huygens probe', modeloAjuda: 'Exterior: original NASA/Cassini-Huygens model · interior, shields, parachutes and motion: artistic representation. Drag · pinch.',
    modeloErro: '3D view unavailable. Open a part information page to continue.',
    chegada: 'A probe on Titan’s surface', chegadaTexto: 'Huygens landed on Titan on January 14, 2005, after descending by parachute through its atmosphere. Cassini received the data and relayed them to Earth.',
    perguntaTexto: 'How did Huygens data reach Earth after landing?', opcao1: 'Cassini received and relayed the data', opcao2: 'Huygens sent the data directly to Earth',
    certo: 'Right! Huygens sent data to Cassini, which relayed them to Earth.', tentar: 'Remember that Huygens was on the surface while Cassini remained in orbit around Saturn.',
    recapTexto: 'Cassini carried Huygens to Titan, and the probe separated before descent. After entering the atmosphere, Huygens used parachutes in sequence, released its shields, and landed on dry ground. On the surface it sent data to Cassini, which relayed them to Earth. This is an educational animation: only the spacecraft exterior model is original; the interior and divisions are artistic representations.',
    fonte: 'Sources: ESA and NASA · Cassini-Huygens',
    peca_orbiter: 'Cassini orbiter', peca_probe: 'Huygens probe', peca_heatshield: 'Heat shields', peca_backshell: 'Rear cover', peca_pilot: 'Pilot parachute', peca_main: 'Main parachute', peca_drogue: 'Smaller parachute'
  },
  es: {
    titulo: 'Huygens: un descenso en Titán', objetivo: '¿Cómo aterrizó una sonda en Titán?',
    objetivoTexto: 'Sigue a Huygens desde su viaje con Cassini hasta la superficie de la mayor luna de Saturno. La Tierra comienza a 1 hora/s; ajusta el tiempo en la barra inferior.',
    modeloTitulo: 'Partes de la sonda Huygens', modeloAjuda: 'Exterior: modelo original NASA/Cassini-Huygens · interior, escudos, paracaídas y movimientos: representación artística. Arrastra · pellizca.',
    modeloErro: 'Vista 3D no disponible. Abre la ficha de una pieza para continuar.',
    chegada: 'Una sonda en la superficie de Titán', chegadaTexto: 'Huygens aterrizó en Titán el 14 de enero de 2005, tras descender en paracaídas por su atmósfera. Cassini recibió los datos y los retransmitió a la Tierra.',
    perguntaTexto: '¿Cómo llegaron los datos de Huygens a la Tierra después del aterrizaje?', opcao1: 'Cassini recibió y retransmitió los datos', opcao2: 'Huygens envió los datos directamente a la Tierra',
    certo: '¡Eso es! Huygens enviaba los datos a Cassini, que los retransmitía a la Tierra.', tentar: 'Recuerda que Huygens estaba en la superficie y Cassini seguía en órbita de Saturno.',
    recapTexto: 'Cassini llevó a Huygens hasta Titán y la sonda se separó antes del descenso. Tras entrar en la atmósfera, Huygens utilizó paracaídas en secuencia, liberó sus escudos y aterrizó sobre suelo seco. En la superficie envió datos a Cassini, que los retransmitió a la Tierra. La animación es didáctica: solo el modelo exterior de la nave es original; el interior y las divisiones son representaciones artísticas.',
    fonte: 'Fuentes: ESA y NASA · Cassini-Huygens',
    peca_orbiter: 'Orbitador Cassini', peca_probe: 'Sonda Huygens', peca_heatshield: 'Escudos térmicos', peca_backshell: 'Cubierta trasera', peca_pilot: 'Paracaídas piloto', peca_main: 'Paracaídas principal', peca_drogue: 'Paracaídas menor'
  }
};

const ids = ['orbiter', 'probe', 'heatshield', 'backshell', 'pilot', 'main', 'drogue'];
export const ROTEIRO_HUYGENS = {
  id: 'huygens-tita', versao: 1, ambiente: 'hangar', nave: 'cassini', pro: true, textos,
  pecas: ids.map(id => ({ id, rotulo: `peca_${id}` })),
  urlFonte: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Huygens_spacecraft',
  fontesAdicionais: [
    { nome: 'ESA · Cronologia da descida de Huygens', url: 'https://www.esa.int/About_Us/ESOC/Timeline_for_Huygens_descent' },
    { nome: 'NASA Science · Cassini-Huygens', url: 'https://science.nasa.gov/mission/cassini-huygens/' },
    { nome: 'ESA · Huygens pousa em Titã', url: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Europe_reaches_new_frontier_Huygens_lands_on_Titan' }
  ],
  etapas: [
    { titulo: 'objetivo', corpo: 'objetivoTexto', astro: 'terra' },
    ...ETAPAS_HUYGENS.map(e => ({ ...e, acao: true, pecas: e.pecas.map(id => ({ id })) })),
    { titulo: 'chegada', corpo: 'chegadaTexto', astro: 'tita' },
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
