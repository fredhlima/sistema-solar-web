// Roteiro introdutório sobre como Hubble e Webb observam a luz.
// Imagens astronômicas são dados científicos processados, não fotografias a olho nu.
const ETAPAS_LUZ = [
  {
    titulo: { pt: 'A luz tem muitos comprimentos de onda', en: 'Light has many wavelengths', es: 'La luz tiene muchas longitudes de onda' },
    corpo: {
      pt: 'Nossos olhos veem só uma pequena faixa da luz. Telescópios podem medir outras faixas, como ultravioleta e infravermelho.',
      en: 'Our eyes see only a small range of light. Telescopes can measure other ranges, such as ultraviolet and infrared.',
      es: 'Nuestros ojos ven solo una pequeña parte de la luz. Los telescopios pueden medir otras bandas, como el ultravioleta y el infrarrojo.'
    },
    experimento: { tipo: 'luz-observatorios', vista: 'comparar' }
  },
  {
    titulo: { pt: 'Hubble observa uma faixa ampla', en: 'Hubble observes a broad range', es: 'Hubble observa una amplia banda' },
    corpo: {
      pt: 'O Hubble observa luz ultravioleta, visível e parte do infravermelho próximo. Ele não se limita à luz que vemos.',
      en: 'Hubble observes ultraviolet, visible, and some near-infrared light. It is not limited to the light we can see.',
      es: 'Hubble observa luz ultravioleta, visible y parte del infrarrojo cercano. No se limita a la luz que podemos ver.'
    },
    astro: 'hubble',
    experimento: { tipo: 'luz-observatorios', vista: 'hubble' }
  },
  {
    titulo: { pt: 'Webb foi feito para o infravermelho', en: 'Webb is built for infrared', es: 'Webb está diseñado para el infrarrojo' },
    corpo: {
      pt: 'O Webb observa principalmente infravermelho próximo e médio. Essa faixa complementa o que o Hubble mede.',
      en: 'Webb mainly observes near- and mid-infrared light. This range complements what Hubble measures.',
      es: 'Webb observa principalmente el infrarrojo cercano y medio. Esta banda complementa lo que mide Hubble.'
    },
    astro: 'jwst',
    experimento: { tipo: 'luz-observatorios', vista: 'webb' }
  },
  {
    titulo: { pt: 'Comprimento de onda não é zoom', en: 'Wavelength is not zoom', es: 'La longitud de onda no es zoom' },
    corpo: {
      pt: 'Cada faixa de luz traz pistas diferentes sobre um objeto. Comparar Hubble e Webb ajuda a estudar essas pistas em conjunto; não é apenas ampliar a mesma foto.',
      en: 'Each range of light carries different clues about an object. Comparing Hubble and Webb helps study those clues together; it is not simply zooming in on the same picture.',
      es: 'Cada banda de luz aporta pistas distintas sobre un objeto. Comparar Hubble y Webb ayuda a estudiar esas pistas en conjunto; no es simplemente ampliar la misma imagen.'
    },
    experimento: { tipo: 'luz-observatorios', vista: 'comparar' }
  },
  {
    titulo: { pt: 'A poeira pode esconder algumas estrelas', en: 'Dust can hide some stars', es: 'El polvo puede ocultar algunas estrellas' },
    corpo: {
      pt: 'A poeira cósmica pode bloquear parte da luz visível. Em certas regiões empoeiradas, o infravermelho atravessa melhor e mostra detalhes que essa poeira encobria.',
      en: 'Cosmic dust can block some visible light. In certain dusty regions, infrared passes through better and shows details that dust obscured.',
      es: 'El polvo cósmico puede bloquear parte de la luz visible. En algunas regiones polvorientas, el infrarrojo atraviesa mejor y muestra detalles que el polvo ocultaba.'
    },
    experimento: { tipo: 'luz-observatorios', vista: 'comparar' }
  },
  {
    titulo: { pt: 'M82: duas observações da mesma região', en: 'M82: two views of the same region', es: 'M82: dos vistas de la misma región' },
    corpo: {
      pt: 'Na comparação da galáxia M82, o Hubble mostra luz azulada associada à formação de estrelas e faixas de poeira. O Webb resolve muitas estrelas no centro e mostra grumos de poeira.',
      en: 'In the comparison of galaxy M82, Hubble shows bluish light associated with star formation and dust lanes. Webb resolves many stars in the center and shows clumps of dust.',
      es: 'En la comparación de la galaxia M82, Hubble muestra luz azulada asociada con la formación de estrellas y franjas de polvo. Webb distingue muchas estrellas en el centro y muestra grumos de polvo.'
    },
    experimento: { tipo: 'luz-observatorios', vista: 'comparar' }
  },
  {
    titulo: { pt: 'As cores ajudam a ler os dados', en: 'Colors help us read the data', es: 'Los colores ayudan a leer los datos' },
    corpo: {
      pt: 'Imagens como a de M82 combinam exposições feitas com filtros. Cores são atribuídas para representar essas faixas; não são necessariamente as cores que veríamos a olho nu.',
      en: 'Images such as M82 combine exposures made through filters. Colors are assigned to represent those ranges; they are not necessarily the colors we would see with our eyes.',
      es: 'Imágenes como la de M82 combinan exposiciones tomadas con filtros. Se asignan colores para representar esas bandas; no son necesariamente los que veríamos a simple vista.'
    },
    experimento: { tipo: 'luz-observatorios', vista: 'comparar' }
  },
  {
    titulo: { pt: 'Webb precisa ficar muito frio', en: 'Webb needs to stay very cold', es: 'Webb necesita mantenerse muy frío' },
    corpo: {
      pt: 'O próprio calor do observatório pode atrapalhar a medição do infravermelho. O escudo solar de várias camadas ajuda a manter o telescópio e seus instrumentos frios.',
      en: 'The observatory’s own heat can interfere with infrared measurements. Its layered sunshield helps keep the telescope and its instruments cold.',
      es: 'El calor del propio observatorio puede interferir con las mediciones infrarrojas. Su escudo solar de varias capas ayuda a mantener fríos el telescopio y sus instrumentos.'
    },
    astro: 'jwst',
    experimento: { tipo: 'luz-observatorios', vista: 'webb' }
  },
  {
    titulo: { pt: 'A luz distante pode chegar mais avermelhada', en: 'Distant light can arrive redshifted', es: 'La luz distante puede llegar desplazada al rojo' },
    corpo: {
      pt: 'Enquanto o Universo se expande, a luz de galáxias distantes pode ter seu comprimento de onda esticado. O infravermelho ajuda a estudar essa luz mais avermelhada.',
      en: 'As the universe expands, light from distant galaxies can have its wavelength stretched. Infrared helps study this redshifted light.',
      es: 'Mientras el universo se expande, la longitud de onda de la luz de galaxias lejanas puede estirarse. El infrarrojo ayuda a estudiar esa luz desplazada al rojo.'
    },
    astro: 'jwst',
    experimento: { tipo: 'luz-observatorios', vista: 'webb' }
  },
  {
    titulo: { pt: 'Uma dupla que amplia as pistas', en: 'A pair that adds more clues', es: 'Una pareja que aporta más pistas' },
    corpo: {
      pt: 'Hubble e Webb observam faixas que se sobrepõem e se complementam. Juntos, ajudam cientistas a formar uma visão mais ampla dos objetos cósmicos.',
      en: 'Hubble and Webb observe ranges that overlap and complement each other. Together, they help scientists build a broader view of cosmic objects.',
      es: 'Hubble y Webb observan bandas que se superponen y se complementan. Juntos ayudan a los científicos a obtener una visión más amplia de los objetos cósmicos.'
    },
    experimento: { tipo: 'luz-observatorios', vista: 'comparar' }
  }
];

const textosLuz = {
  pt: {
    titulo: 'Como Hubble e Webb veem a luz?',
    objetivo: 'Faixas de luz e observatórios',
    objetivoTexto: 'Compare o que Hubble e Webb observam e descubra como diferentes faixas de luz revelam pistas complementares. Este roteiro complementa o capítulo gratuito sobre Hubble.',
    perguntaTexto: 'Qual faixa o Webb observa principalmente?',
    opcao1: 'Infravermelho próximo e médio',
    opcao2: 'Somente luz visível',
    certo: 'Isso! O Webb foi otimizado para o infravermelho próximo e médio, em parceria complementar com o Hubble.',
    tentar: 'Lembre-se: o Webb foi projetado para estudar principalmente comprimentos de onda infravermelhos.',
    recapTexto: "Hubble e Webb revelam pistas complementares em diferentes faixas da luz. Em M82, o infravermelho ajuda a distinguir estrelas em regiões empoeiradas. As cores representam dados de filtros. O frio e o escudo solar ajudam Webb a medir o infravermelho; a expansão do Universo estica a luz distante.",
    fonte: 'NASA Science: Hubble vs. Webb; Webb FAQ; Hubble Instruments; M82 Hubble/Webb side-by-side.'
  },
  en: {
    titulo: 'How do Hubble and Webb see light?',
    objetivo: 'Ranges of light and observatories',
    objetivoTexto: 'Compare what Hubble and Webb observe and learn how different ranges of light reveal complementary clues. This route complements the free Hubble chapter.',
    perguntaTexto: 'Which range does Webb mainly observe?',
    opcao1: 'Near- and mid-infrared',
    opcao2: 'Visible light only',
    certo: 'That’s right! Webb is optimized for near- and mid-infrared light, complementing Hubble.',
    tentar: 'Remember: Webb was designed to study mainly infrared wavelengths.',
    recapTexto: "Hubble and Webb reveal complementary clues in different ranges of light. In M82, infrared helps distinguish stars in dusty regions. Colors represent filter data. Cold temperatures and the sunshield help Webb measure infrared; cosmic expansion stretches distant light.",
    fonte: 'NASA Science: Hubble vs. Webb; Webb FAQ; Hubble Instruments; M82 Hubble/Webb side-by-side.'
  },
  es: {
    titulo: '¿Cómo ven la luz Hubble y Webb?',
    objetivo: 'Bandas de luz y observatorios',
    objetivoTexto: 'Compara lo que observan Hubble y Webb y descubre cómo distintas bandas de luz revelan pistas complementarias. Este recorrido complementa el capítulo gratuito sobre Hubble.',
    perguntaTexto: '¿Qué banda observa principalmente Webb?',
    opcao1: 'Infrarrojo cercano y medio',
    opcao2: 'Solo luz visible',
    certo: '¡Eso es! Webb está optimizado para el infrarrojo cercano y medio, como complemento de Hubble.',
    tentar: 'Recuerda: Webb fue diseñado para estudiar principalmente longitudes de onda infrarrojas.',
    recapTexto: "Hubble y Webb revelan pistas complementarias en distintas bandas de luz. En M82, el infrarrojo ayuda a distinguir estrellas en regiones polvorientas. Los colores representan datos de filtros. El frío y el escudo solar ayudan a Webb a medir el infrarrojo; la expansión cósmica estira la luz distante.",
    fonte: 'NASA Science: Hubble vs. Webb; Webb FAQ; Hubble Instruments; M82 Hubble/Webb side-by-side.'
  }
};

export const ROTEIRO_LUZ = {
  id: 'hubble-webb-luz',
  versao: 1,
  pro: true,
  recurso: 'aprendizado',
  ambiente: 'universo',
  corpo: 'hubble',
  urlFonte: 'https://science.nasa.gov/mission/hubble/observatory/hubble-vs-webb/',
  fontesAdicionais: [{nome:'Webb FAQ',url:'https://science.nasa.gov/mission/webb/faqs-full/'},{nome:'Hubble instruments',url:'https://science.nasa.gov/mission/hubble/observatory/design/instruments/'},{nome:'M82 · NASA/ESA/CSA',url:'https://science.nasa.gov/asset/webb/m82-cigar-galaxy-hubble-webb-side-by-side/'}],
  textos: textosLuz,
  etapas: [
    ...ETAPAS_LUZ,
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
