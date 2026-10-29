// Roteiro didático do Grand Finale da missão Cassini.
const ACOES_CASSINI = [
  {
    titulo: { pt: 'Titã redireciona Cassini', en: 'Titan redirects Cassini', es: 'Titán redirige a Cassini' },
    corpo: {
      pt: 'Em 22 de abril de 2017, Cassini fez uma passagem próxima por Titã. A gravidade da lua mudou a trajetória da nave e a colocou no caminho para a fase final.',
      en: 'On April 22, 2017, Cassini made a close flyby of Titan. The moon’s gravity changed the spacecraft’s path and set it on course for the final phase.',
      es: 'El 22 de abril de 2017, Cassini realizó un sobrevuelo cercano de Titán. La gravedad de la luna cambió la trayectoria de la nave y la encaminó hacia la fase final.'
    },
    pecas: ['orbiter'], cassiniPhase: 'titan', scenario: 'saturn-orbit'
  },
  {
    titulo: { pt: 'Começam as órbitas entre Saturno e os anéis', en: 'Orbits begin between Saturn and the rings', es: 'Comienzan las órbitas entre Saturno y los anillos' },
    corpo: {
      pt: 'A partir de 26 de abril, Cassini iniciou uma sequência de 22 órbitas que passavam pelo espaço entre o planeta e seus anéis.',
      en: 'Starting April 26, Cassini began a series of 22 orbits that passed through the space between the planet and its rings.',
      es: 'A partir del 26 de abril, Cassini inició una serie de 22 órbitas que pasaban por el espacio entre el planeta y sus anillos.'
    },
    pecas: ['orbiter'], cassiniPhase: 'gap', scenario: 'saturn-orbit'
  },
  {
    titulo: { pt: 'A nave coleta ciência de perto', en: 'The spacecraft gathers close-up science', es: 'La nave obtiene datos científicos de cerca' },
    corpo: {
      pt: 'Nas passagens finais, Cassini reuniu dados sobre Saturno e seu ambiente. A missão continuou enviando observações enquanto mergulhava cada vez mais perto do planeta.',
      en: 'During its final passes, Cassini gathered data about Saturn and its surroundings. The mission continued sending observations as it ventured closer to the planet.',
      es: 'Durante sus últimos pasos, Cassini reunió datos sobre Saturno y su entorno. La misión siguió enviando observaciones mientras se acercaba cada vez más al planeta.'
    },
    pecas: ['orbiter'], cassiniPhase: 'science', scenario: 'saturn-orbit'
  },
  {
    titulo: { pt: 'Os anéis também entram em foco', en: 'The rings come into focus too', es: 'Los anillos también entran en foco' },
    corpo: {
      pt: 'As órbitas do Grand Finale levaram Cassini junto às bordas dos anéis. As medições ajudaram a estudar os anéis de Saturno de perto.',
      en: 'The Grand Finale orbits carried Cassini close to the edges of the rings. Its measurements helped scientists study Saturn’s rings up close.',
      es: 'Las órbitas del Grand Finale llevaron a Cassini cerca de los bordes de los anillos. Sus mediciones ayudaron a estudiar de cerca los anillos de Saturno.'
    },
    pecas: ['orbiter'], cassiniPhase: 'rings', scenario: 'saturn-orbit'
  },
  {
    titulo: { pt: 'Última passagem distante por Titã', en: 'Final distant pass by Titan', es: 'Último paso distante por Titán' },
    corpo: {
      pt: 'Em 11 de setembro de 2017, Cassini fez sua última passagem distante por Titã. A trajetória da nave seguiu rumo ao encontro final com Saturno.',
      en: 'On September 11, 2017, Cassini made its final distant flyby of Titan. The spacecraft continued along its path toward the final encounter with Saturn.',
      es: 'El 11 de septiembre de 2017, Cassini realizó su último sobrevuelo distante de Titán. La nave continuó su trayectoria hacia el encuentro final con Saturno.'
    },
    pecas: ['orbiter'], cassiniPhase: 'farewell', scenario: 'saturn-orbit'
  },
  {
    titulo: { pt: 'Cassini entra na atmosfera de Saturno', en: 'Cassini enters Saturn’s atmosphere', es: 'Cassini entra en la atmósfera de Saturno' },
    corpo: {
      pt: 'Em 15 de setembro de 2017, Cassini mergulhou na atmosfera de Saturno. A entrada encerrou a jornada da nave.',
      en: 'On September 15, 2017, Cassini plunged into Saturn’s atmosphere. The entry brought the spacecraft’s journey to an end.',
      es: 'El 15 de septiembre de 2017, Cassini se sumergió en la atmósfera de Saturno. La entrada puso fin al recorrido de la nave.'
    },
    pecas: ['orbiter'], cassiniPhase: 'entry', scenario: 'saturn-sky'
  },
  {
    titulo: { pt: 'O sinal continua até se perder', en: 'The signal continues until contact is lost', es: 'La señal continúa hasta perderse' },
    corpo: {
      pt: 'Durante a descida, Cassini transmitiu dados científicos em tempo real enquanto conseguia apontar sua antena para a Terra. O sinal se perdeu quando a nave deixou de manter essa orientação.',
      en: 'During the plunge, Cassini sent real-time science data while it could keep its antenna pointed toward Earth. The signal was lost when the spacecraft could no longer maintain that pointing.',
      es: 'Durante el descenso, Cassini transmitió datos científicos en tiempo real mientras pudo mantener su antena apuntada hacia la Tierra. La señal se perdió cuando la nave ya no pudo conservar esa orientación.'
    },
    pecas: ['orbiter'], cassiniPhase: 'signal', scenario: 'saturn-sky'
  },
  {
    titulo: { pt: 'Os dados seguem a exploração', en: 'The data carry exploration forward', es: 'Los datos mantienen viva la exploración' },
    corpo: {
      pt: 'Cassini terminou a missão em Saturno para proteger futuras investigações de suas luas, especialmente Titã e Encélado, que podem oferecer ambientes habitáveis. Isso indica potencial de habitabilidade, não prova de vida.',
      en: 'Cassini ended its mission at Saturn to protect future studies of its moons, especially Titan and Enceladus, which may offer habitable environments. This points to potential habitability, not proof of life.',
      es: 'Cassini terminó su misión en Saturno para proteger futuras investigaciones de sus lunas, en especial Titán y Encélado, que podrían ofrecer entornos habitables. Esto señala un potencial de habitabilidad, no una prueba de vida.'
    },
    pecas: ['orbiter'], cassiniPhase: 'legacy', scenario: 'saturn-orbit'
  }
];

const textos = {
  pt: {
    titulo: 'Cassini: o Grand Finale', objetivo: 'Como Cassini encerrou sua missão em Saturno?',
    objetivoTexto: 'Acompanhe as órbitas finais da nave, sua entrada na atmosfera de Saturno e o último sinal enviado à Terra.',
    modeloTitulo: 'Nave Cassini', modeloAjuda: 'Modelo exterior original NASA · cena e movimentos: representação artística, sem escala e sem efemérides. Arraste · pinça.',
    modeloErro: 'Vista 3D indisponível. Abra a ficha da nave para continuar.',
    chegada: 'Cassini protege as luas de Saturno', chegadaTexto: 'A missão terminou na atmosfera de Saturno para evitar que a nave interferisse em futuras investigações de suas luas, incluindo Encélado, um mundo oceânico com potencial de habitabilidade. Isso não é prova de vida.',
    perguntaTexto: 'Por que Cassini terminou sua missão na atmosfera de Saturno?', opcao1: 'Para proteger futuras investigações de habitabilidade nas luas', opcao2: 'Para pousar a nave em Encélado',
    certo: 'Isso! O fim controlado da missão ajudou a proteger futuras investigações de Titã e Encélado.', tentar: 'Pense no cuidado com futuras investigações das luas de Saturno.',
    recapTexto: 'Em 22 de abril de 2017, uma passagem próxima por Titã mudou a trajetória de Cassini. A partir de 26 de abril, começaram 22 órbitas entre Saturno e seus anéis. Depois da última passagem distante por Titã em 11 de setembro, Cassini entrou na atmosfera de Saturno em 15 de setembro e enviou dados até a perda do sinal. O fim da missão protegeu futuras investigações de Titã e Encélado; potencial de habitabilidade não prova vida.',
    fonte: 'Fontes: NASA Science · Grand Finale',
    peca_orbiter: 'Orbitador Cassini'
  },
  en: {
    titulo: 'Cassini: the Grand Finale', objetivo: 'How did Cassini end its mission at Saturn?',
    objetivoTexto: 'Follow the spacecraft’s final orbits, its entry into Saturn’s atmosphere, and the last signal sent to Earth.',
    modeloTitulo: 'Cassini spacecraft', modeloAjuda: 'Original NASA exterior model · scene and motion: artistic representation, not to scale and without ephemerides. Drag · pinch.',
    modeloErro: '3D view unavailable. Open the spacecraft information page to continue.',
    chegada: 'Cassini protects Saturn’s moons', chegadaTexto: 'The mission ended in Saturn’s atmosphere to keep the spacecraft from interfering with future studies of its moons, including Enceladus, an ocean world with potential for habitability. This is not proof of life.',
    perguntaTexto: 'Why did Cassini end its mission in Saturn’s atmosphere?', opcao1: 'To protect future studies of habitability on the moons', opcao2: 'To land the spacecraft on Enceladus',
    certo: 'Right! Ending the mission at Saturn helped protect future studies of Titan and Enceladus.', tentar: 'Think about protecting future investigations of Saturn’s moons.',
    recapTexto: 'On April 22, 2017, a close flyby of Titan changed Cassini’s path. Starting April 26, 22 orbits began between Saturn and its rings. After its final distant pass by Titan on September 11, Cassini entered Saturn’s atmosphere on September 15 and sent data until contact was lost. Ending the mission protected future studies of Titan and Enceladus; potential habitability is not proof of life.',
    fonte: 'Sources: NASA Science · Grand Finale',
    peca_orbiter: 'Cassini orbiter'
  },
  es: {
    titulo: 'Cassini: el Grand Finale', objetivo: '¿Cómo terminó Cassini su misión en Saturno?',
    objetivoTexto: 'Sigue las últimas órbitas de la nave, su entrada en la atmósfera de Saturno y la última señal enviada a la Tierra.',
    modeloTitulo: 'Nave Cassini', modeloAjuda: 'Modelo exterior original de NASA · escena y movimientos: representación artística, sin escala y sin efemérides. Arrastra · pellizca.',
    modeloErro: 'Vista 3D no disponible. Abre la ficha de la nave para continuar.',
    chegada: 'Cassini protege las lunas de Saturno', chegadaTexto: 'La misión terminó en la atmósfera de Saturno para evitar que la nave interfiriera en futuras investigaciones de sus lunas, incluida Encélado, un mundo oceánico con potencial de habitabilidad. Esto no es una prueba de vida.',
    perguntaTexto: '¿Por qué Cassini terminó su misión en la atmósfera de Saturno?', opcao1: 'Para proteger futuras investigaciones de habitabilidad en las lunas', opcao2: 'Para aterrizar la nave en Encélado',
    certo: '¡Eso es! El final controlado de la misión ayudó a proteger futuras investigaciones de Titán y Encélado.', tentar: 'Piensa en el cuidado de futuras investigaciones de las lunas de Saturno.',
    recapTexto: 'El 22 de abril de 2017, un sobrevuelo cercano de Titán cambió la trayectoria de Cassini. A partir del 26 de abril comenzaron 22 órbitas entre Saturno y sus anillos. Tras el último paso distante por Titán el 11 de septiembre, Cassini entró en la atmósfera de Saturno el 15 de septiembre y envió datos hasta perder la señal. El final de la misión protegió futuras investigaciones de Titán y Encélado; el potencial de habitabilidad no prueba que haya vida.',
    fonte: 'Fuentes: NASA Science · Grand Finale',
    peca_orbiter: 'Orbitador Cassini'
  }
};

export const ROTEIRO_CASSINI_FINALE = {
  id: 'cassini-finale', versao: 1, ambiente: 'hangar', nave: 'cassini', pro: true, textos,
  pecas: [{ id: 'orbiter', rotulo: 'peca_orbiter' }],
  urlFonte: 'https://science.nasa.gov/mission/cassini/grand-finale/overview/',
  fontesAdicionais: [
    { nome: 'NASA Science · Cassini End of Mission Timeline', url: 'https://science.nasa.gov/mission/cassini/grand-finale/cassini-end-of-mission-timeline/' }
  ],
  etapas: [
    { titulo: 'objetivo', corpo: 'objetivoTexto', astro: 'saturno' },
    ...ACOES_CASSINI.map(e => ({ ...e, acao: true, pecas: e.pecas.map(id => ({ id })) })),
    { titulo: 'chegada', corpo: 'chegadaTexto', astro: 'encelado' },
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
