// Roteiro didático: habitabilidade indica condições possíveis, não vida detectada.
const ETAPAS_HABITABILIDADE = [
  {
    titulo: { pt: 'O que torna um mundo habitável?', en: 'What makes a world habitable?', es: '¿Qué hace habitable a un mundo?' },
    corpo: {
      pt: 'Na busca por vida como a conhecemos, cientistas procuram água líquida, química adequada, uma fonte de energia e ambientes que persistam por tempo suficiente. Encontrar esses ingredientes indica potencial, não vida confirmada.',
      en: 'In the search for life as we know it, scientists look for liquid water, suitable chemistry, an energy source, and environments that last long enough. Finding these ingredients indicates potential, not confirmed life.',
      es: 'En la búsqueda de vida tal como la conocemos, los científicos buscan agua líquida, química adecuada, una fuente de energía y ambientes que persistan el tiempo suficiente. Encontrar estos ingredientes indica potencial, no vida confirmada.'
    },
    astro: 'marte',
    experimento: { tipo: 'habitabilidade', mundo: 'marte' }
  },
  {
    titulo: { pt: 'Água não significa sempre a mesma coisa', en: 'Water does not always mean the same thing', es: 'Agua no siempre significa lo mismo' },
    corpo: {
      pt: 'A água líquida é importante para a vida terrestre, mas um mundo pode ter líquidos que não são água. Em Titã, por exemplo, lagos e rios na superfície são de metano e etano; a água da superfície permanece congelada.',
      en: 'Liquid water matters for life on Earth, but a world can have liquids that are not water. On Titan, for example, surface lakes and rivers are methane and ethane; surface water remains frozen.',
      es: 'El agua líquida es importante para la vida terrestre, pero un mundo puede tener líquidos que no son agua. En Titán, por ejemplo, los lagos y ríos de la superficie son de metano y etano; el agua superficial permanece congelada.'
    },
    astro: 'tita',
    experimento: { tipo: 'habitabilidade', mundo: 'tita' }
  },
  {
    titulo: { pt: 'Moléculas orgânicas não provam vida', en: 'Organic molecules do not prove life', es: 'Las moléculas orgánicas no prueban vida' },
    corpo: {
      pt: 'Moléculas orgânicas podem participar da química da vida, mas também podem surgir sem organismos. Sua presença ajuda a investigar a química de um mundo; sozinha, não confirma vida.',
      en: 'Organic molecules can take part in life’s chemistry, but they can also form without organisms. Their presence helps investigate a world’s chemistry; by itself, it does not confirm life.',
      es: 'Las moléculas orgánicas pueden participar en la química de la vida, pero también pueden formarse sin organismos. Su presencia ayuda a estudiar la química de un mundo; por sí sola, no confirma vida.'
    },
    astro: 'europa',
    experimento: { tipo: 'habitabilidade', mundo: 'europa' }
  },
  {
    titulo: { pt: 'A vida também precisa de energia', en: 'Life also needs energy', es: 'La vida también necesita energía' },
    corpo: {
      pt: 'A energia pode vir da luz ou de reações químicas. Sob uma crosta de gelo, onde a luz é escassa, interações entre água e rocha podem oferecer fontes químicas de energia.',
      en: 'Energy can come from light or chemical reactions. Beneath an icy crust, where light is scarce, interactions between water and rock may offer chemical energy sources.',
      es: 'La energía puede provenir de la luz o de reacciones químicas. Bajo una corteza de hielo, donde escasea la luz, las interacciones entre agua y roca pueden ofrecer fuentes de energía química.'
    },
    astro: 'encelado',
    experimento: { tipo: 'habitabilidade', mundo: 'encelado' }
  },
  {
    titulo: { pt: 'Titã: um interior ainda em estudo', en: 'Titan: an interior still under study', es: 'Titán: un interior aún en estudio' },
    corpo: {
      pt: 'Titã possui química orgânica rica. Uma reanálise dos dados da Cassini sugere misturas de gelo e água e bolsas líquidas no interior, em vez de um oceano global. São interpretações em estudo, não uma fotografia do interior nem evidência de vida.',
      en: 'Titan has rich organic chemistry. A reanalysis of Cassini data suggests mixtures of ice and water and liquid pockets inside, rather than a global ocean. These are interpretations under study, not a photograph of its interior or evidence of life.',
      es: 'Titán posee una rica química orgánica. Un nuevo análisis de datos de Cassini sugiere mezclas de hielo y agua y bolsas líquidas en el interior, en lugar de un océano global. Son interpretaciones en estudio, no una fotografía del interior ni evidencia de vida.'
    },
    astro: 'tita',
    experimento: { tipo: 'habitabilidade', mundo: 'tita' }
  },
  {
    titulo: { pt: 'Marte teve ambientes habitáveis no passado', en: 'Mars had habitable environments in the past', es: 'Marte tuvo ambientes habitables en el pasado' },
    corpo: {
      pt: 'Rochas e paisagens marcianas preservam sinais de rios, deltas e lagos antigos. Esses ambientes do passado poderiam sustentar vida microbiana, mas não demonstram que ela tenha existido.',
      en: 'Martian rocks and landscapes preserve signs of ancient rivers, deltas, and lakes. Those past environments could have supported microbial life, but they do not show that life existed.',
      es: 'Las rocas y paisajes marcianos conservan señales de antiguos ríos, deltas y lagos. Esos ambientes del pasado podrían haber sostenido vida microbiana, pero no demuestran que haya existido.'
    },
    astro: 'marte',
    experimento: { tipo: 'habitabilidade', mundo: 'marte' }
  },
  {
    titulo: { pt: 'Marte hoje é frio e seco na superfície', en: 'Mars today is cold and dry at the surface', es: 'Marte hoy es frío y seco en la superficie' },
    corpo: {
      pt: 'A superfície atual de Marte é fria, seca e exposta a condições difíceis para a vida como a conhecemos. A busca também examina rochas e ambientes protegidos; possíveis biossinais continuam sendo pistas que exigem mais estudo, não uma confirmação.',
      en: 'Mars’s present surface is cold, dry, and exposed to conditions that are difficult for life as we know it. The search also examines rocks and sheltered environments; potential biosignatures remain clues that require more study, not confirmation.',
      es: 'La superficie actual de Marte es fría, seca y está expuesta a condiciones difíciles para la vida tal como la conocemos. La búsqueda también estudia rocas y ambientes protegidos; los posibles bioindicadores siguen siendo pistas que requieren más estudio, no una confirmación.'
    },
    astro: 'marte',
    experimento: { tipo: 'habitabilidade', mundo: 'marte' }
  },
  {
    titulo: { pt: 'Europa: um oceano inferido sob o gelo', en: 'Europa: an inferred ocean beneath the ice', es: 'Europa: un océano inferido bajo el hielo' },
    corpo: {
      pt: 'A superfície de Europa é uma crosta de gelo; medições e características da superfície sustentam a inferência de um oceano salgado abaixo dela. Água, química e energia podem existir nesse ambiente, mas isso ainda não indica que seja habitado.',
      en: 'Europa’s surface is an icy crust; measurements and surface features support the inference of a salty ocean beneath it. Water, chemistry, and energy may exist in that environment, but this does not show that it is inhabited.',
      es: 'La superficie de Europa es una corteza de hielo; las mediciones y características superficiales respaldan la inferencia de un océano salado debajo. Allí podrían existir agua, química y energía, pero eso no indica que esté habitado.'
    },
    astro: 'europa',
    experimento: { tipo: 'habitabilidade', mundo: 'europa' }
  },
  {
    titulo: { pt: 'Encélado: jatos revelam água e química', en: 'Enceladus: jets reveal water and chemistry', es: 'Encélado: los chorros revelan agua y química' },
    corpo: {
      pt: 'A Cassini atravessou jatos de partículas e vapor de água lançados por Encélado; as análises também encontraram hidrogênio, ligado a possíveis fontes de energia química. São pistas sobre habitabilidade, não detecção de vida.',
      en: 'Cassini flew through jets of particles and water vapor released by Enceladus; analyses also found hydrogen, linked to possible sources of chemical energy. These are clues about habitability, not a detection of life.',
      es: 'Cassini atravesó chorros de partículas y vapor de agua expulsados por Encélado; los análisis también encontraron hidrógeno, relacionado con posibles fuentes de energía química. Son pistas sobre habitabilidad, no una detección de vida.'
    },
    astro: 'encelado',
    experimento: { tipo: 'habitabilidade', mundo: 'encelado' }
  },
  {
    titulo: { pt: 'Habitável não quer dizer habitado nem seguro', en: 'Habitable does not mean inhabited or safe', es: 'Habitable no significa habitado ni seguro' },
    corpo: {
      pt: '“Habitável” descreve condições que poderiam sustentar alguma forma de vida; “habitado” exigiria evidência de vida. Isso também não significa que um lugar seja seguro para humanos, e até agora não há confirmação de vida fora da Terra.',
      en: '“Habitable” describes conditions that could support some form of life; “inhabited” would require evidence of life. It also does not mean a place is safe for humans, and life beyond Earth has not been confirmed.',
      es: '“Habitable” describe condiciones que podrían sostener alguna forma de vida; “habitado” requeriría evidencias de vida. Tampoco significa que un lugar sea seguro para los humanos, y aún no se ha confirmado vida fuera de la Tierra.'
    },
    astro: 'tita',
    experimento: { tipo: 'habitabilidade', mundo: 'tita' }
  }
];

const textosHabitabilidade = {
  pt: {
    titulo: 'Quais mundos podem ser habitáveis?',
    objetivo: 'Água, química, energia e evidências',
    objetivoTexto: 'Compare as condições e as evidências de Marte, Europa, Encélado e Titã sem confundir potencial com vida detectada.',
    perguntaTexto: 'O que significa um mundo ser habitável?',
    opcao1: 'Ele pode ter condições para a vida, mas isso não confirma que seja habitado.',
    opcao2: 'Ele certamente tem vida e é seguro para pessoas.',
    certo: 'Isso! Habitabilidade indica condições possíveis; encontrar vida exige evidências próprias.',
    tentar: 'Separe as condições que poderiam sustentar vida da evidência de que ela realmente existe.',
    recapTexto: 'Na busca por vida como a conhecemos, água líquida, química, energia e ambientes persistentes são condições importantes, mas não provam que um mundo seja habitado. Marte teve ambientes aquosos no passado e hoje é frio e seco na superfície; possíveis biossinais ainda exigem estudo. Em Europa, o oceano sob o gelo é inferido. Em Encélado, os jatos analisados pela Cassini revelaram água e pistas de energia química. Titã tem lagos superficiais de metano e etano, não de água líquida; sua estrutura interna continua em estudo e um oceano global não está confirmado. Moléculas orgânicas também podem se formar sem vida. Habitável não significa habitado nem seguro para humanos; não há vida fora da Terra confirmada.',
    fonte: 'Fontes: NASA — Perseverance; Why Europa? Ingredients for Life; Ingredients for Life at Enceladus; estudo de Titã (17 dez. 2025).'
  },
  en: {
    titulo: 'Which worlds could be habitable?',
    objetivo: 'Water, chemistry, energy, and evidence',
    objetivoTexto: 'Compare the conditions and evidence on Mars, Europa, Enceladus, and Titan without confusing potential with detected life.',
    perguntaTexto: 'What does it mean for a world to be habitable?',
    opcao1: 'It may have conditions for life, but that does not confirm it is inhabited.',
    opcao2: 'It certainly has life and is safe for people.',
    certo: 'That’s right! Habitability points to possible conditions; finding life requires its own evidence.',
    tentar: 'Separate conditions that could support life from evidence that life actually exists there.',
    recapTexto: 'In the search for life as we know it, liquid water, chemistry, energy, and persistent environments are important conditions, but they do not prove a world is inhabited. Mars had watery environments in the past and is cold and dry at the surface today; potential biosignatures still need study. On Europa, the ocean beneath the ice is inferred. On Enceladus, jets analyzed by Cassini revealed water and clues to chemical energy. Titan has surface lakes of methane and ethane, not liquid water; its interior remains under study, and a global ocean is not confirmed. Organic molecules can also form without life. Habitable does not mean inhabited or safe for humans; life beyond Earth has not been confirmed.',
    fonte: 'Sources: NASA — Perseverance; Why Europa? Ingredients for Life; Ingredients for Life at Enceladus; Titan study (Dec. 17, 2025).'
  },
  es: {
    titulo: '¿Qué mundos podrían ser habitables?',
    objetivo: 'Agua, química, energía y evidencias',
    objetivoTexto: 'Compara las condiciones y evidencias de Marte, Europa, Encélado y Titán sin confundir potencial con vida detectada.',
    perguntaTexto: '¿Qué significa que un mundo sea habitable?',
    opcao1: 'Puede tener condiciones para la vida, pero eso no confirma que esté habitado.',
    opcao2: 'Sin duda tiene vida y es seguro para las personas.',
    certo: '¡Eso es! La habitabilidad indica condiciones posibles; encontrar vida requiere evidencias propias.',
    tentar: 'Distingue las condiciones que podrían sostener vida de las evidencias de que realmente exista.',
    recapTexto: 'En la búsqueda de vida tal como la conocemos, el agua líquida, la química, la energía y los ambientes persistentes son condiciones importantes, pero no prueban que un mundo esté habitado. Marte tuvo ambientes acuosos en el pasado y hoy es frío y seco en la superficie; los posibles bioindicadores aún requieren estudio. En Europa, se infiere un océano bajo el hielo. En Encélado, los chorros analizados por Cassini revelaron agua y pistas de energía química. Titán tiene lagos superficiales de metano y etano, no de agua líquida; su interior sigue en estudio y no está confirmado un océano global. Las moléculas orgánicas también pueden formarse sin vida. Habitable no significa habitado ni seguro para los humanos; no se ha confirmado vida fuera de la Tierra.',
    fonte: 'Fuentes: NASA — Perseverance; Why Europa? Ingredients for Life; Ingredients for Life at Enceladus; estudio de Titán (17 dic. 2025).'
  }
};

export const DOSSIES_HABITABILIDADE = Object.fromEntries([
  {
    id: 'marte',
    nome: { pt: 'Marte', en: 'Mars', es: 'Marte' },
    observado: {
      pt: 'Rochas preservam sinais de antigos rios, deltas e lagos; o ambiente atual da superfície é frio e seco.',
      en: 'Rocks preserve signs of ancient rivers, deltas, and lakes; today’s surface environment is cold and dry.',
      es: 'Las rocas conservan señales de antiguos ríos, deltas y lagos; el ambiente actual de la superficie es frío y seco.'
    },
    interpretacao: {
      pt: 'Ambientes antigos poderiam sustentar vida microbiana, e uma amostra contém possíveis biossinais ainda não confirmatórios.',
      en: 'Ancient environments could have supported microbial life, and one sample contains potential biosignatures that are not conclusive.',
      es: 'Los ambientes antiguos podrían haber sostenido vida microbiana, y una muestra contiene posibles bioindicadores que no son concluyentes.'
    },
    aberto: {
      pt: 'Não se sabe se Marte já teve vida; as pistas atuais exigem mais estudo.',
      en: 'It is unknown whether Mars ever had life; current clues need further study.',
      es: 'Se desconoce si Marte tuvo vida; las pistas actuales requieren más estudio.'
    },
    fonte: 'https://science.nasa.gov/mission/mars-2020-perseverance/'
  },
  {
    id: 'europa',
    nome: { pt: 'Europa', en: 'Europa', es: 'Europa' },
    observado: {
      pt: 'A superfície mostra gelo e fraturas; instrumentos também mediram sua resposta ao campo magnético de Júpiter.',
      en: 'Its surface shows ice and fractures; instruments also measured its response to Jupiter’s magnetic field.',
      es: 'Su superficie muestra hielo y fracturas; los instrumentos también midieron su respuesta al campo magnético de Júpiter.'
    },
    interpretacao: {
      pt: 'Um oceano subterrâneo e interações entre água e rocha podem oferecer água líquida, química e energia.',
      en: 'A subsurface ocean and water-rock interactions may offer liquid water, chemistry, and energy.',
      es: 'Un océano subterráneo y las interacciones entre agua y roca podrían ofrecer agua líquida, química y energía.'
    },
    aberto: {
      pt: 'A composição e a habitabilidade do oceano são investigadas; não há confirmação de vida.',
      en: 'The ocean’s composition and habitability are being investigated; life has not been confirmed.',
      es: 'Se investigan la composición y habitabilidad del océano; no se ha confirmado vida.'
    },
    fonte: 'https://science.nasa.gov/mission/europa-clipper/why-europa-ingredients-for-life/'
  },
  {
    id: 'encelado',
    nome: { pt: 'Encélado', en: 'Enceladus', es: 'Encélado' },
    observado: {
      pt: 'A Cassini analisou jatos com vapor de água e partículas de gelo, além de detectar hidrogênio associado à química do oceano.',
      en: 'Cassini analyzed jets containing water vapor and ice particles, and detected hydrogen linked to the ocean’s chemistry.',
      es: 'Cassini analizó chorros con vapor de agua y partículas de hielo, y detectó hidrógeno relacionado con la química del océano.'
    },
    interpretacao: {
      pt: 'Os dados indicam água líquida e uma possível fonte de energia química, ingredientes relevantes para habitabilidade.',
      en: 'The data indicate liquid water and a possible source of chemical energy, ingredients relevant to habitability.',
      es: 'Los datos indican agua líquida y una posible fuente de energía química, ingredientes relevantes para la habitabilidad.'
    },
    aberto: {
      pt: 'A Cassini não detectou vida; não se sabe se o oceano é habitado.',
      en: 'Cassini did not detect life; it is unknown whether the ocean is inhabited.',
      es: 'Cassini no detectó vida; se desconoce si el océano está habitado.'
    },
    fonte: 'https://science.nasa.gov/resource/ingredients-for-life-at-enceladus/'
  },
  {
    id: 'tita',
    nome: { pt: 'Titã', en: 'Titan', es: 'Titán' },
    observado: {
      pt: 'Lagos e rios superficiais são de metano e etano; os dados da Cassini foram reanalisados para estudar o interior.',
      en: 'Surface lakes and rivers are methane and ethane; Cassini data have been reanalyzed to study the interior.',
      es: 'Los lagos y ríos superficiales son de metano y etano; se han vuelto a analizar los datos de Cassini para estudiar el interior.'
    },
    interpretacao: {
      pt: 'Um estudo recente sugere camadas de gelo e misturas de gelo e água com pequenas bolsas de água, em vez de exigir um oceano global.',
      en: 'A recent study suggests layers of ice and slush with small pockets of water, rather than requiring a global ocean.',
      es: 'Un estudio reciente sugiere capas de hielo y mezclas de hielo y agua con pequeñas bolsas de agua, en vez de requerir un océano global.'
    },
    aberto: {
      pt: 'A estrutura interna continua incerta; os lagos de superfície não são água líquida e não há vida confirmada.',
      en: 'Its interior structure remains uncertain; surface lakes are not liquid water, and life has not been confirmed.',
      es: 'La estructura interna sigue siendo incierta; los lagos superficiales no son agua líquida y no se ha confirmado vida.'
    },
    fonte: 'https://www.nasa.gov/solar-system/planets/saturn/saturn-moons/titan/nasa-study-suggests-saturns-moon-titan-may-not-have-global-ocean/'
  }
].map(d=>[d.id,d]));

export const ROTEIRO_HABITABILIDADE = {
  id: 'habitabilidade',
  versao: 1,
  pro: true,
  recurso: 'aprendizado',
  ambiente: 'universo',
  corpo: 'marte',
  urlFonte: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
  fontesAdicionais: [
    { nome: 'NASA — Why Europa? Ingredients for Life', url: 'https://science.nasa.gov/mission/europa-clipper/why-europa-ingredients-for-life/' },
    { nome: 'NASA — Ingredients for Life at Enceladus', url: 'https://science.nasa.gov/resource/ingredients-for-life-at-enceladus/' },
    { nome: 'NASA — Titan May Not Have Global Ocean', url: 'https://www.nasa.gov/solar-system/planets/saturn/saturn-moons/titan/nasa-study-suggests-saturns-moon-titan-may-not-have-global-ocean/' }
  ],
  textos: textosHabitabilidade,
  etapas: [
    ...ETAPAS_HABITABILIDADE,
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
