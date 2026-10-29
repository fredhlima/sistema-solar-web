// Roteiro didático da implantação do telescópio espacial James Webb.
// A sequência visual é uma simplificação educativa, não uma reprodução dos movimentos de engenharia.
const ACOES_WEBB = [
  {
    titulo: { pt: 'Webb viaja dobrado', en: 'Webb travels folded', es: 'Webb viaja plegado' },
    corpo: {
      pt: 'O telescópio era grande demais para viajar aberto. Em 25 de dezembro de 2021, foi lançado dobrado dentro de um foguete Ariane 5.',
      en: 'The telescope was too large to travel unfolded. On December 25, 2021, it launched folded inside an Ariane 5 rocket.',
      es: 'El telescopio era demasiado grande para viajar desplegado. El 25 de diciembre de 2021, fue lanzado plegado dentro de un cohete Ariane 5.'
    }, pecas: ['bus', 'sunshield', 'primary', 'secondary', 'solar'], webbPhase: 'folded', scenario: 'earth'
  },
  {
    titulo: { pt: 'O painel solar se abre', en: 'The solar array opens', es: 'Se despliega el panel solar' },
    corpo: {
      pt: 'Logo após a separação do foguete, Webb abriu seu painel solar para gerar eletricidade. A antena também se preparou para a comunicação com a Terra.',
      en: 'Soon after separating from the rocket, Webb opened its solar array to generate electricity. Its antenna also prepared for communication with Earth.',
      es: 'Poco después de separarse del cohete, Webb desplegó su panel solar para generar electricidad. La antena también se preparó para comunicarse con la Tierra.'
    }, pecas: ['solar', 'bus'], webbPhase: 'solar', scenario: 'earth'
  },
  {
    titulo: { pt: 'O escudo solar se estende', en: 'The sunshield unfolds', es: 'Se despliega el parasol' },
    corpo: {
      pt: 'O escudo solar se abriu para separar o lado quente do lado frio do observatório. Ele protege os espelhos e instrumentos do calor e da luz do Sol, da Terra e da Lua.',
      en: 'The sunshield unfolded to separate the observatory’s warm and cold sides. It protects the mirrors and instruments from heat and light from the Sun, Earth, and Moon.',
      es: 'El parasol se desplegó para separar el lado caliente del lado frío del observatorio. Protege los espejos e instrumentos del calor y la luz del Sol, la Tierra y la Luna.'
    }, pecas: ['sunshield', 'bus', 'primary', 'secondary'], webbPhase: 'shield', scenario: 'earth'
  },
  {
    titulo: { pt: 'As cinco camadas ficam esticadas', en: 'The five layers are tensioned', es: 'Se tensan las cinco capas' },
    corpo: {
      pt: 'Cinco camadas finas foram esticadas uma a uma. Juntas, ajudam a manter os instrumentos muito frios, condição importante para observar luz infravermelha fraca.',
      en: 'Five thin layers were tensioned one by one. Together, they help keep the instruments very cold, an important condition for detecting faint infrared light.',
      es: 'Cinco capas delgadas se tensaron una por una. Juntas ayudan a mantener los instrumentos muy fríos, algo importante para detectar luz infrarroja tenue.'
    }, pecas: ['sunshield', 'bus'], webbPhase: 'tension', scenario: 'earth'
  },
  {
    titulo: { pt: 'O espelho secundário se posiciona', en: 'The secondary mirror moves into place', es: 'El espejo secundario se coloca' },
    corpo: {
      pt: 'A estrutura do espelho secundário se estendeu diante do espelho principal. A luz refletida pelo espelho principal segue para o secundário e depois para os instrumentos.',
      en: 'The secondary mirror’s support structure extended in front of the primary mirror. Light reflected by the primary travels to the secondary and then to the instruments.',
      es: 'La estructura del espejo secundario se extendió frente al espejo principal. La luz reflejada por el principal llega al secundario y luego a los instrumentos.'
    }, pecas: ['secondary', 'primary', 'bus'], webbPhase: 'secondary', scenario: 'earth'
  },
  {
    titulo: { pt: 'As asas do espelho principal se abrem', en: 'The primary mirror wings open', es: 'Se abren las alas del espejo principal' },
    corpo: {
      pt: 'As duas asas laterais se abriram e completaram o espelho principal de 6,5 metros, formado por 18 segmentos hexagonais. Depois, os segmentos foram alinhados com cuidado.',
      en: 'The two side wings opened, completing the 6.5-meter primary mirror made of 18 hexagonal segments. The segments were then carefully aligned.',
      es: 'Las dos alas laterales se desplegaron y completaron el espejo principal de 6,5 metros, formado por 18 segmentos hexagonales. Después, los segmentos se alinearon con cuidado.'
    }, pecas: ['primary', 'secondary', 'bus'], webbPhase: 'primary', scenario: 'earth'
  },
  {
    titulo: { pt: 'Webb pronto para esfriar e calibrar', en: 'Webb ready to cool and calibrate', es: 'Webb listo para enfriarse y calibrarse' },
    corpo: {
      pt: 'Com o escudo aberto, o telescópio esfriou. A equipe alinhou os espelhos e calibrou os instrumentos antes do início das observações científicas.',
      en: 'With the sunshield open, the telescope cooled down. The team aligned the mirrors and calibrated the instruments before science observations began.',
      es: 'Con el parasol abierto, el telescopio se enfrió. El equipo alineó los espejos y calibró los instrumentos antes de comenzar las observaciones científicas.'
    }, pecas: ['bus', 'sunshield', 'primary', 'secondary', 'solar'], webbPhase: 'ready', scenario: 'earth'
  }
];

const textos = {
  pt: {
    titulo: 'Webb: abrir para observar', objetivo: 'Como o telescópio Webb se abriu no espaço?',
    objetivoTexto: 'Acompanhe a implantação do Webb desde o lançamento dobrado até a preparação para observar o Universo em infravermelho.',
    modeloTitulo: 'Partes do telescópio Webb', modeloAjuda: 'Exterior NASA · abertura artística simplificada. Terra contextual, sem escala ou posição real de L2. Arraste · pinça.',
    modeloErro: 'Vista 3D indisponível. Abra a ficha de uma parte para continuar.',
    chegada: 'Webb observa perto do ponto L2', chegadaTexto: 'Webb opera em uma órbita ao redor do Sol, perto do ponto L2, a cerca de 1,5 milhão de quilômetros da Terra. Ele não fica parado nesse ponto nem orbita a Terra. Depois de esfriar, alinhar os espelhos e calibrar os instrumentos, começou as observações científicas.',
    perguntaTexto: 'Por que Webb usa um escudo solar de cinco camadas?', opcao1: 'Para manter os espelhos e instrumentos frios e protegidos do calor', opcao2: 'Para produzir luz infravermelha para as imagens',
    certo: 'Isso! O escudo ajuda a manter o telescópio frio para detectar sinais infravermelhos fracos.', tentar: 'Pense na temperatura necessária para observar sinais de calor muito distantes.',
    recapTexto: 'Lançado dobrado em 25 de dezembro de 2021, Webb abriu o painel solar, estendeu e tensionou seu escudo de cinco camadas, posicionou o espelho secundário e abriu as duas asas do espelho principal de 18 segmentos. Depois, esfriou, teve seus espelhos alinhados e instrumentos calibrados. Webb observa em órbita ao redor do Sol, perto de L2; não fica imóvel nesse ponto nem orbita a Terra. A animação é uma sequência didática simplificada, não uma reconstrução dos movimentos de engenharia.',
    fonte: 'Fontes: NASA Science · Webb',
    peca_bus: 'Módulo de serviço', peca_sunshield: 'Escudo solar', peca_primary: 'Espelho primário', peca_secondary: 'Espelho secundário', peca_solar: 'Painel solar'
  },
  en: {
    titulo: 'Webb: unfolding to observe', objetivo: 'How did the Webb telescope unfold in space?',
    objetivoTexto: 'Follow Webb’s deployment from its folded launch configuration to its preparation for observing the infrared universe.',
    modeloTitulo: 'Parts of the Webb telescope', modeloAjuda: 'NASA exterior · simplified artistic deployment. Earth gives context, without scale or actual L2 positioning. Drag · pinch.',
    modeloErro: '3D view unavailable. Open a part information page to continue.',
    chegada: 'Webb observes near the L2 point', chegadaTexto: 'Webb operates in an orbit around the Sun near the L2 point, about 1.5 million kilometers from Earth. It does not stay still at that point or orbit Earth. After cooling, mirror alignment, and instrument calibration, it began science observations.',
    perguntaTexto: 'Why does Webb use a five-layer sunshield?', opcao1: 'To keep its mirrors and instruments cool and shielded from heat', opcao2: 'To produce infrared light for its images',
    certo: 'Right! The sunshield helps keep the telescope cold so it can detect faint infrared signals.', tentar: 'Think about the temperature needed to observe very faint heat signals.',
    recapTexto: 'Launched folded on December 25, 2021, Webb opened its solar array, unfolded and tensioned its five-layer sunshield, positioned the secondary mirror, and opened both wings of its 18-segment primary mirror. It then cooled down while its mirrors were aligned and instruments calibrated. Webb observes in orbit around the Sun near L2; it does not stay still at that point or orbit Earth. This is a simplified educational sequence, not a reconstruction of the engineering motions.',
    fonte: 'Sources: NASA Science · Webb',
    peca_bus: 'Spacecraft bus', peca_sunshield: 'Sunshield', peca_primary: 'Primary mirror', peca_secondary: 'Secondary mirror', peca_solar: 'Solar array'
  },
  es: {
    titulo: 'Webb: desplegarse para observar', objetivo: '¿Cómo se desplegó el telescopio Webb en el espacio?',
    objetivoTexto: 'Sigue el despliegue de Webb desde su lanzamiento plegado hasta su preparación para observar el Universo en infrarrojo.',
    modeloTitulo: 'Partes del telescopio Webb', modeloAjuda: 'Exterior NASA · despliegue artístico simplificado. Tierra contextual, sin escala ni posición real de L2. Arrastra · pellizca.',
    modeloErro: 'Vista 3D no disponible. Abre la ficha de una parte para continuar.',
    chegada: 'Webb observa cerca del punto L2', chegadaTexto: 'Webb opera en una órbita alrededor del Sol, cerca del punto L2, a unos 1,5 millones de kilómetros de la Tierra. No permanece quieto en ese punto ni orbita la Tierra. Tras enfriarse, alinear los espejos y calibrar los instrumentos, comenzó sus observaciones científicas.',
    perguntaTexto: '¿Por qué Webb usa un parasol de cinco capas?', opcao1: 'Para mantener fríos los espejos y los instrumentos y protegerlos del calor', opcao2: 'Para producir luz infrarroja para sus imágenes',
    certo: '¡Eso es! El parasol ayuda a mantener frío el telescopio para detectar señales infrarrojas débiles.', tentar: 'Piensa en la temperatura necesaria para observar señales de calor muy tenues.',
    recapTexto: 'Lanzado plegado el 25 de diciembre de 2021, Webb desplegó el panel solar, extendió y tensó su parasol de cinco capas, colocó el espejo secundario y abrió las dos alas de su espejo principal de 18 segmentos. Después se enfrió mientras se alineaban los espejos y se calibraban los instrumentos. Webb observa en órbita alrededor del Sol, cerca de L2; no permanece quieto en ese punto ni orbita la Tierra. La animación es una secuencia educativa simplificada, no una reconstrucción de los movimientos de ingeniería.',
    fonte: 'Fuentes: NASA Science · Webb',
    peca_bus: 'Módulo de servicio', peca_sunshield: 'Parasol', peca_primary: 'Espejo primario', peca_secondary: 'Espejo secundario', peca_solar: 'Panel solar'
  }
};

const ids = ['bus', 'sunshield', 'primary', 'secondary', 'solar'];
export const ROTEIRO_WEBB = {
  id: 'webb-desdobramento', versao: 1, ambiente: 'hangar', nave: 'jwst', pro: true, textos,
  pecas: ids.map(id => ({ id, rotulo: `peca_${id}` })),
  urlFonte: 'https://science.nasa.gov/mission/webb/deployment/',
  fontesAdicionais: [
    { nome: 'NASA Science · James Webb Space Telescope 3D Model', url: 'https://science.nasa.gov/3d-resources/james-webb-space-telescope/' },
    { nome: 'NASA Science · Webb’s Sunshield', url: 'https://science.nasa.gov/mission/webb/webbs-sunshield/' },
    { nome: 'NASA Science · Webb’s Mirrors', url: 'https://science.nasa.gov/mission/webb/webbs-mirrors/' },
    { nome: 'NASA Science · Webb Orbit', url: 'https://science.nasa.gov/mission/webb/orbit/' }
  ],
  etapas: [
    { titulo: 'objetivo', corpo: 'objetivoTexto', astro: 'terra' },
    ...ACOES_WEBB.map(e => ({ ...e, acao: true, pecas: e.pecas.map(id => ({ id })) })),
    { titulo: 'chegada', corpo: 'chegadaTexto', astro: 'terra' },
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
