export const MISSAO_ROSETTA = {
  id: 'rosetta-cometa',
  nave: 'rosetta',
  nome: {
    pt: 'Rosetta: encontro com um cometa',
    en: 'Rosetta: rendezvous with a comet',
    es: 'Rosetta: encuentro con un cometa'
  },
  fontes: [
    { nome: 'ESA — Rosetta operations', url: 'https://www.esa.int/Enabling_Support/Operations/Rosetta_operations' },
    { nome: 'ESA — Rosetta timeline', url: 'https://www.esa.int/Education/Teach_with_Rosetta/Rosetta_timeline' },
    { nome: 'ESA — Frequently asked questions', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Frequently_asked_questions' },
    { nome: 'ESA — Pioneering Philae completes main mission before hibernation', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Pioneering_Philae_completes_main_mission_before_hibernation' },
    { nome: 'ESA — Rosetta’s comet contains ingredients for life', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Rosetta_s_comet_contains_ingredients_for_life' },
    { nome: 'ESA — Rosetta’s last words: science descending to a comet', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Rosetta_s_last_words_science_descending_to_a_comet' }
  ],
  etapas: [
    {
      titulo: { pt: 'Partida rumo ao cometa', en: 'Off to the comet', es: 'Rumbo al cometa' },
      texto: {
        pt: 'Em 2 de março de 2004, um foguete Ariane 5 lançou Rosetta da Guiana Francesa. Para alcançar o cometa, a sonda usou a gravidade da Terra três vezes e a de Marte uma vez, como um impulso cuidadosamente planejado.',
        en: 'On March 2, 2004, an Ariane 5 rocket launched Rosetta from French Guiana. To reach the comet, the spacecraft used Earth’s gravity three times and Mars’s once, like a carefully planned push.',
        es: 'El 2 de marzo de 2004, un cohete Ariane 5 lanzó Rosetta desde la Guayana Francesa. Para llegar al cometa, la sonda usó tres veces la gravedad de la Tierra y una vez la de Marte, como un impulso bien planeado.'
      },
      alvo: 'terra', fase: 'lancamento'
    },
    {
      titulo: { pt: 'Paradas entre asteroides', en: 'Stops among asteroids', es: 'Paradas entre asteroides' },
      texto: {
        pt: 'No caminho, Rosetta passou pelos asteroides Steins, em 2008, e Lutetia, em 2010. As câmeras e os instrumentos aproveitaram esses encontros rápidos para observar rochas antigas antes de seguir viagem.',
        en: 'On the way, Rosetta flew past asteroids Steins in 2008 and Lutetia in 2010. Cameras and instruments used these brief encounters to study ancient rocks before continuing the journey.',
        es: 'En el camino, Rosetta pasó junto a los asteroides Steins, en 2008, y Lutetia, en 2010. Las cámaras y los instrumentos aprovecharon esos encuentros breves para observar rocas antiguas antes de continuar.'
      },
      alvo: 'sol', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Silêncio no espaço profundo', en: 'Quiet in deep space', es: 'Silencio en el espacio profundo' },
      texto: {
        pt: 'Em 2011, longe do Sol e com pouca energia, Rosetta entrou em hibernação. Seu relógio interno a despertou em 20 de janeiro de 2014. A equipe voltou a receber sinais e preparou a sonda para encontrar seu destino.',
        en: 'In 2011, far from the Sun and short on power, Rosetta entered hibernation. Its onboard clock woke it on January 20, 2014. The team received signals again and prepared the spacecraft to meet its destination.',
        es: 'En 2011, lejos del Sol y con poca energía, Rosetta entró en hibernación. Su reloj interno la despertó el 20 de enero de 2014. El equipo volvió a recibir señales y preparó la sonda para encontrar su destino.'
      },
      alvo: 'sol', fase: 'cruzeiro'
    },
    {
      titulo: { pt: 'Chegada a 67P', en: 'Arrival at 67P', es: 'Llegada a 67P' },
      texto: {
        pt: 'Em 6 de agosto de 2014, Rosetta chegou ao cometa 67P/Churyumov–Gerasimenko e começou a acompanhá-lo de perto. Foi a primeira missão a entrar em órbita de um cometa e estudá-lo enquanto viajava pelo espaço.',
        en: 'On August 6, 2014, Rosetta reached comet 67P/Churyumov–Gerasimenko and began following it closely. It was the first mission to orbit a comet and study it as it traveled through space.',
        es: 'El 6 de agosto de 2014, Rosetta llegó al cometa 67P/Churyumov–Gerasimenko y empezó a acompañarlo de cerca. Fue la primera misión en entrar en órbita de un cometa y estudiarlo mientras viajaba por el espacio.'
      },
      alvo: '67p', fase: 'encontro'
    },
    {
      titulo: { pt: 'Philae tenta pousar', en: 'Philae attempts a landing', es: 'Philae intenta aterrizar' },
      texto: {
        pt: 'Em 12 de novembro de 2014, Philae se separou de Rosetta e desceu até 67P. As âncoras não dispararam: o módulo tocou o chão, quicou duas vezes e parou à sombra de um penhasco. Rosetta continuou em órbita; Philae era o módulo de pouso.',
        en: 'On November 12, 2014, Philae separated from Rosetta and descended to 67P. Its anchoring harpoons did not fire: the lander touched down, bounced twice, and stopped in a cliff’s shadow. Rosetta stayed in orbit; Philae was the lander.',
        es: 'El 12 de noviembre de 2014, Philae se separó de Rosetta y descendió hasta 67P. Sus arpones de anclaje no se dispararon: el módulo tocó el suelo, rebotó dos veces y quedó a la sombra de un acantilado. Rosetta siguió en órbita; Philae era el módulo de aterrizaje.'
      },
      alvo: '67p', fase: 'descida'
    },
    {
      titulo: { pt: 'Acompanhando o Sol', en: 'Following the Sun', es: 'Siguiendo al Sol' },
      texto: {
        pt: 'Rosetta acompanhou 67P enquanto o cometa se aproximava do Sol e depois se afastava. Em agosto de 2015, o cometa passou pelo ponto mais próximo do Sol em sua órbita. A sonda observou como o calor mudava o cometa.',
        en: 'Rosetta followed 67P as the comet approached the Sun and then moved away. In August 2015, the comet reached the closest point to the Sun in its orbit. The spacecraft observed how sunlight changed the comet.',
        es: 'Rosetta acompañó a 67P mientras el cometa se acercaba al Sol y luego se alejaba. En agosto de 2015, el cometa pasó por el punto más cercano al Sol de su órbita. La sonda observó cómo el calor cambiaba el cometa.'
      },
      alvo: 'sol', fase: 'encontro'
    },
    {
      titulo: { pt: 'Um cometa que ganha atividade', en: 'A comet growing active', es: 'Un cometa cada vez más activo' },
      texto: {
        pt: 'Com mais calor, gelos na superfície e abaixo dela viraram gás e carregaram poeira para o espaço. Rosetta observou jatos e uma nuvem ao redor do núcleo, chamada coma. O cometa ficou mais ativo perto do Sol.',
        en: 'With more warmth, ices on and beneath the surface turned into gas and carried dust into space. Rosetta observed jets and a cloud around the nucleus called the coma. The comet grew more active near the Sun.',
        es: 'Con más calor, los hielos de la superficie y del subsuelo se volvieron gas y llevaron polvo al espacio. Rosetta observó chorros y una nube alrededor del núcleo, llamada coma. El cometa se volvió más activo cerca del Sol.'
      },
      alvo: '67p', fase: 'encontro'
    },
    {
      titulo: { pt: 'Moléculas interessantes', en: 'Interesting molecules', es: 'Moléculas interesantes' },
      texto: {
        pt: 'Instrumentos de Rosetta encontraram moléculas orgânicas e glicina, um aminoácido, na nuvem do cometa; também detectaram fósforo. São ingredientes importantes para a química da vida, mas encontrá-los não significa que havia vida no cometa.',
        en: 'Rosetta instruments found organic molecules and glycine, an amino acid, in the comet’s cloud; they also detected phosphorus. These are important ingredients for life’s chemistry, but finding them does not mean life existed on the comet.',
        es: 'Los instrumentos de Rosetta encontraron moléculas orgánicas y glicina, un aminoácido, en la nube del cometa; también detectaron fósforo. Son ingredientes importantes para la química de la vida, pero hallarlos no significa que hubiera vida en el cometa.'
      },
      alvo: '67p', fase: 'encontro'
    },
    {
      titulo: { pt: 'Dados até o fim', en: 'Science until the end', es: 'Ciencia hasta el final' },
      texto: {
        pt: 'Philae enviou dados após o pouso e hibernou em novembro de 2014. Voltou a se comunicar brevemente em 2015, antes de ficar em silêncio. Rosetta continuou observando 67P em órbita. O módulo estudava a superfície; o orbitador acompanhava o cometa.',
        en: 'Philae sent data after landing and hibernated in November 2014. It briefly communicated again in 2015 before falling silent. Rosetta kept observing 67P from orbit. The lander studied the surface; the orbiter followed the comet.',
        es: 'Philae envió datos tras aterrizar e hibernó en noviembre de 2014. Volvió a comunicarse brevemente en 2015 antes de quedar en silencio. Rosetta siguió observando 67P desde su órbita. El módulo estudiaba la superficie; el orbitador acompañaba al cometa.'
      },
      alvo: '67p', fase: 'superficie'
    },
    {
      titulo: { pt: 'A última descida', en: 'The final descent', es: 'El descenso final' },
      texto: {
        pt: 'Em 30 de setembro de 2016, a equipe guiou Rosetta numa descida controlada até 67P. A sonda tocou a superfície e encerrou suas operações e comunicações. A missão terminou no cometa que havia acompanhado por mais de dois anos.',
        en: 'On September 30, 2016, the team guided Rosetta on a controlled descent to 67P. The spacecraft touched the surface and ended its operations and communications. The mission finished on the comet it had followed for more than two years.',
        es: 'El 30 de septiembre de 2016, el equipo guio a Rosetta en un descenso controlado hasta 67P. La sonda tocó la superficie y terminó sus operaciones y comunicaciones. La misión concluyó en el cometa que había acompañado durante más de dos años.'
      },
      alvo: '67p', fase: 'superficie'
    },
    {
      titulo: { pt: 'Pergunta da missão', en: 'Mission question', es: 'Pregunta de la misión' },
      texto: { pt: 'Lembre das pistas coletadas no cometa.', en: 'Remember the clues gathered at the comet.', es: 'Recuerda las pistas recogidas en el cometa.' },
      alvo: '67p', fase: 'recap'
    },
    {
      titulo: { pt: 'Uma aventura em dupla', en: 'A two-spacecraft adventure', es: 'Una aventura de dos sondas' },
      texto: {
        pt: 'Rosetta partiu em 2004, usou a gravidade da Terra e de Marte e passou por Steins e Lutetia. Hibernou em 2011, despertou em 2014 e chegou a 67P em agosto. Philae pousou após dois saltos e parou à sombra. Rosetta observou a atividade do cometa e encontrou moléculas orgânicas, ingredientes químicos que não provam vida. Em 30 de setembro de 2016, desceu controladamente até 67P.',
        en: 'Launched in 2004, Rosetta used Earth’s and Mars’s gravity and flew past Steins and Lutetia. It hibernated in 2011, woke in 2014, and reached 67P in August. Philae landed after two bounces and stopped in shadow. Rosetta observed the comet’s activity and found organic molecules, chemical ingredients that do not prove life. On September 30, 2016, Rosetta made a controlled descent to 67P.',
        es: 'Lanzada en 2004, Rosetta usó la gravedad terrestre y marciana y pasó junto a Steins y Lutetia. Hibernó en 2011, despertó en 2014 y llegó a 67P en agosto. Philae aterrizó tras dos rebotes y quedó a la sombra. Rosetta observó la actividad del cometa y halló moléculas orgánicas, ingredientes químicos que no prueban vida. El 30 de septiembre de 2016, descendió controladamente hasta 67P.'
      },
      alvo: '67p', fase: 'recap'
    }
  ],
  pergunta: {
    texto: {
      pt: 'O que as moléculas orgânicas encontradas por Rosetta permitem concluir?',
      en: 'What can we conclude from the organic molecules Rosetta found?',
      es: '¿Qué podemos concluir de las moléculas orgánicas que encontró Rosetta?'
    },
    correta: {
      pt: 'O cometa contém ingredientes químicos importantes para a vida.',
      en: 'The comet contains chemical ingredients important for life.',
      es: 'El cometa contiene ingredientes químicos importantes para la vida.'
    },
    incorreta: {
      pt: 'Rosetta confirmou que havia seres vivos no cometa.',
      en: 'Rosetta confirmed that living things were on the comet.',
      es: 'Rosetta confirmó que había seres vivos en el cometa.'
    },
    explicacao: {
      pt: 'Rosetta detectou moléculas orgânicas, glicina e fósforo em 67P. São ingredientes que interessam aos estudos sobre a química da vida, mas a missão não encontrou evidência de seres vivos no cometa.',
      en: 'Rosetta detected organic molecules, glycine, and phosphorus at 67P. These ingredients matter to research on life’s chemistry, but the mission found no evidence of living things on the comet.',
      es: 'Rosetta detectó moléculas orgánicas, glicina y fósforo en 67P. Estos ingredientes interesan al estudio de la química de la vida, pero la misión no encontró pruebas de seres vivos en el cometa.'
    }
  },
  investigacao: {
    titulo: {
      pt: 'Duas sondas, duas escalas de investigação',
      en: 'Two spacecraft, two scales of investigation',
      es: 'Dos sondas, dos escalas de investigación'
    },
    texto: {
      pt: 'Rosetta acompanhou 67P em órbita por mais de dois anos, observando núcleo, coma e atividade durante a aproximação solar. Philae desceu à superfície e fez medições locais, como imagens e propriedades físicas do solo. A posição final sombreada limitou sua operação. Juntas, as sondas combinaram contexto global repetido com observações diretas de um ponto.',
      en: 'Rosetta followed 67P from orbit for more than two years, observing its nucleus, coma, and activity as it neared the Sun. Philae descended to the surface and made local measurements, including images and physical properties of the soil. Its final shadowed position limited operations. Together, the spacecraft paired repeated global context with direct observations at one location.',
      es: 'Rosetta acompañó a 67P desde órbita durante más de dos años y observó el núcleo, la coma y su actividad al acercarse al Sol. Philae descendió a la superficie y realizó mediciones locales, como imágenes y propiedades físicas del suelo. Su posición final en sombra limitó las operaciones. Juntas, las sondas combinaron contexto global repetido con observaciones directas de un lugar.'
    },
    corpos: [
      { id: '67p', rotulo: { pt: 'Cometa 67P', en: 'Comet 67P', es: 'Cometa 67P' }, pista: { pt: 'Rosetta mapeou o cometa em órbita; Philae mediu um ponto da superfície.', en: 'Rosetta mapped the comet from orbit; Philae measured one spot on the surface.', es: 'Rosetta cartografió el cometa desde órbita; Philae midió un punto de la superficie.' } },
      { id: 'sol', rotulo: { pt: 'Sol', en: 'Sun', es: 'Sol' }, pista: { pt: 'A atividade de 67P mudou com o aquecimento durante sua passagem perto do Sol.', en: '67P’s activity changed as it warmed during its passage near the Sun.', es: 'La actividad de 67P cambió al calentarse durante su paso cerca del Sol.' } }
    ],
    pergunta: {
      texto: { pt: 'Uma equipe quer saber se um novo cometa tem um ponto frágil no local de pouso e também como sua atividade muda por meses. Qual plano combina melhor as duas perguntas?', en: 'A team wants to know whether a new comet has a weak spot at a landing site and how its activity changes over months. Which plan best combines both questions?', es: 'Un equipo quiere saber si un cometa nuevo tiene un punto débil en el lugar de aterrizaje y cómo cambia su actividad durante meses. ¿Qué plan combina mejor ambas preguntas?' },
      correta: { pt: 'Enviar um módulo para medições locais e manter um orbitador observando o cometa repetidamente.', en: 'Send a lander for local measurements and keep an orbiter observing the comet repeatedly.', es: 'Enviar un módulo de aterrizaje para hacer mediciones locales y mantener un orbitador observando el cometa repetidamente.' },
      incorreta: { pt: 'Fazer apenas um sobrevoo rápido com imagens distantes, sem medições no local.', en: 'Make only one quick flyby with distant images and no local measurements.', es: 'Hacer solo un sobrevuelo rápido con imágenes lejanas y sin mediciones locales.' },
      explicacao: { pt: 'O módulo pode medir propriedades do ponto de contato, enquanto o orbitador compara regiões e acompanha mudanças ao longo do tempo. Um sobrevoo único pode revelar muito, mas não oferece a mesma combinação de contexto global e acompanhamento repetido.', en: 'A lander can measure properties at its contact point, while an orbiter compares regions and tracks change over time. A single flyby can reveal a great deal, but it does not provide the same combination of global context and repeated monitoring.', es: 'El módulo puede medir propiedades en el punto de contacto, mientras el orbitador compara regiones y sigue los cambios con el tiempo. Un solo sobrevuelo puede revelar mucho, pero no ofrece la misma combinación de contexto global y seguimiento repetido.' }
    },
    sintese: {
      pt: 'Rosetta e Philae mostram como uma visão orbital duradoura e medições locais podem se completar. O contato direto oferece detalhes do lugar; o orbitador ajuda a entender onde esse lugar se encaixa e como o cometa muda.',
      en: 'Rosetta and Philae show how long-term orbital views and local measurements can complement each other. Direct contact reveals details of one place; the orbiter helps explain where that place fits and how the comet changes.',
      es: 'Rosetta y Philae muestran cómo las vistas orbitales prolongadas y las mediciones locales se complementan. El contacto directo revela detalles de un lugar; el orbitador ayuda a entender dónde encaja y cómo cambia el cometa.'
    },
    fontes: [
      { nome: 'ESA — The Rosetta lander', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta/The_Rosetta_lander' },
      { nome: 'ESA — Science from the Orbiter', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Science_from_the_Orbiter' },
      { nome: 'ESA — Frequently asked questions', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Frequently_asked_questions' }
    ]
  }
};
