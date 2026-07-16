export const DADOS = { corpos: [
  {
    id: 'sol',
    nome: 'Sol',
    tipo: 'estrela',
    pai: null,
    raioKm: 696000,
    distanciaMediaKm: 0,
    periodoOrbitalDias: 0,
    periodoRotacaoHoras: 600,
    excentricidade: 0,
    inclinacaoOrbitaGraus: 0,
    inclinacaoEixoGraus: 7.25,
    retrogrado: false,
    anguloInicialGraus: 0,
    aparencia: {
      tipo: 'estrela',
      cores: ['#ffeb99', '#ffcd4d', '#ff9d00'],
      detalhes: {}
    },
    aneis: null,
    info: {
      resumo: 'O Sol é a estrela central do nosso sistema solar, responsável pela vida na Terra. É uma gigantesca esfera de plasma quente onde ocorrem reações nucleares contínuas. Toda a sua energia vem da fusão de hidrogênio em hélio.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.391.000 km' },
        { rotulo: 'Massa', valor: '1.989 × 10³⁰ kg' },
        { rotulo: 'Temperatura da superfície', valor: '5.500 °C' },
        { rotulo: 'Idade', valor: '4,6 bilhões de anos' },
        { rotulo: 'Composição', valor: '73% hidrogênio, 25% hélio, 2% outros' }
      ],
      curiosidades: [
        'O Sol é tão grande que caberiam 1,3 milhão de Terras dentro dele.',
        'A energia emitida pelo Sol a cada segundo equivale à queimada por toda humanidade em 1 milhão de anos.',
        'A gravidade do Sol é tão intensa que mantém planetas orbitando a mais de 4 bilhões de km de distância.',
        'O núcleo do Sol alcança 15 milhões de graus Celsius.',
        'Cada minuto, o Sol converte 600 milhões de toneladas de hidrogênio em hélio, convertendo apenas 4 milhões de toneladas de massa em energia — esse é o preço que pagamos pela vida na Terra.',
        'Se o Sol fosse do tamanho de uma moeda, a Estrela Sirius (a mais brilhante do céu noturno) seria invisível a olho nu — menos de um milímetro de tamanho.'
      ],
      comparacoes: [
        'Se o Sol fosse uma bola de futebol (22 cm), a Terra seria um grão de arroz a 23 metros de distância.',
        'A luz do Sol leva 8 minutos e 20 segundos para chegar à Terra — e 5 horas e 20 minutos até Plutão.',
        'O Sol é tão grande que caberiam 330.000 Terras dentro dele.'
      ],
      avancado: {
        composicao: 'Plasma de hidrogênio (73%), hélio (25%), traços de oxigênio, carbono, nitrogênio, ferro.',
        temperatura: 'Núcleo: ~15 milhões °C; superfície: 5.500 °C; coroa: 1-3 milhões °C.',
        missoes: ['SOHO (1995–presente)', 'Solar Dynamics Observatory (2010–presente)', 'Parker Solar Probe (2018–presente)'],
        texto: 'O Sol é uma estrela anã amarela de sequência principal, classe espectral G2V, no braço de Orion da Via Láctea. Sua estrutura inclui núcleo, zona radiativa, zona de convecção, fotosfera, cromosfera e coroa. A fusão nuclear converte 600 milhões de toneladas de hidrogênio em hélio a cada segundo. O período de rotação varia com a latitude (~25 dias no equador, ~35 nos polos). Distúrbios solares como manchas e erupções afetam clima e tecnologia terrestre.'
      }
    }
  },
  {
    id: 'mercurio',
    nome: 'Mercúrio',
    tipo: 'planeta',
    pai: 'sol',
    ordemDoSol: 1,
    raioKm: 2439.7,
    distanciaMediaKm: 57.909e6,
    periodoOrbitalDias: 87.97,
    periodoRotacaoHoras: 1407.5,
    excentricidade: 0.2056,
    inclinacaoOrbitaGraus: 7.005,
    inclinacaoEixoGraus: 0.03,
    retrogrado: false,
    anguloInicialGraus: 42,
    aparencia: {
      tipo: 'rochoso',
      cores: ['#8c7853', '#a0907d', '#6b6b6b'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Mercúrio é o planeta mais próximo do Sol e o menor do sistema solar. Tem uma superfície rochosa e árida coberta de crateras, e extremas oscilações de temperatura. Apesar de estar perto do Sol, não é o mais quente.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '4.879 km' },
        { rotulo: 'Distância do Sol', valor: '57,9 milhões km' },
        { rotulo: 'Duração do ano', valor: '87,97 dias' },
        { rotulo: 'Duração do dia', valor: '58,6 dias terrestres' },
        { rotulo: 'Temperatura', valor: '-173 °C a 427 °C' },
        { rotulo: 'Luas', valor: 'Nenhuma' }
      ],
      curiosidades: [
        'Um dia em Mercúrio dura 58,6 dias terrestres, mas um ano dura apenas 87,97 dias — um dia em Mercúrio é mais longo que seu ano!',
        'Apesar de ser o planeta mais próximo do Sol, Vênus é mais quente devido a sua densa atmosfera de CO₂.',
        'Mercúrio não tem atmosfera e sua superfície cria uma crosta de resfriamento dura e frágil.',
        'Tem o segundo maior gradiente térmico do sistema solar: de -173 °C na sombra a 427 °C na luz.',
        'Apesar de estar tão perto do Sol, Mercúrio tem gelo em seus polos — a sombra das crateras nunca esquenta o suficiente para derreter o gelo cósmico acumulado ao longo de bilhões de anos.',
        'Da superfície de Mercúrio, o Sol não se mexe no céu como na Terra — ele sobe, desce, sobe de novo e desce novamente porque a rotação do planeta está sincronizada com sua órbita de forma especial.'
      ],
      comparacoes: [
        'Mercúrio é pouco maior que a Lua — um avião levaria 1,5 dias para voar em volta dele a 800 km/h.',
        'Se o Sol fosse do tamanho de uma bola de futebol, Mercúrio seria um grão de mostarda a apenas 2,3 metros de distância.'
      ],
      avancado: {
        composicao: 'Silicatos rochosos, ferro, níquel; núcleo rico em ferro (75% da massa).',
        temperatura: 'Mínima -173 °C (regiões polares na sombra), máxima 427 °C (face iluminada).',
        missoes: ['Mariner 10 (1974–1975)', 'MESSENGER (2011–2015)', 'BepiColombo (2021–2025)'],
        texto: 'Mercúrio é o planeta terrestre mais denso e próximo do Sol, descoberto por astrônomos antigos. Sua órbita excentricada (0,2056) foi crucial para verificar a relatividade geral de Einstein. Possui um grande núcleo de ferro que gera um fraco campo magnético. A superfície exibe crateras de impacto, dorsal escarpada (Discover Rupes) e outras feições vulcânicas antigas. Praticamente sem atmosfera, toda radiação solar é absorvida diretamente.'
      }
    }
  },
  {
    id: 'venus',
    nome: 'Vênus',
    tipo: 'planeta',
    pai: 'sol',
    ordemDoSol: 2,
    raioKm: 6051.8,
    distanciaMediaKm: 108.209e6,
    periodoOrbitalDias: 224.7,
    periodoRotacaoHoras: -2807,
    excentricidade: 0.0068,
    inclinacaoOrbitaGraus: 3.395,
    inclinacaoEixoGraus: 177.36,
    retrogrado: false,
    anguloInicialGraus: 156,
    aparencia: {
      tipo: 'rochoso',
      cores: ['#e8d08f', '#f5e6a0', '#d4a574'],
      detalhes: { nuvens: true }
    },
    aneis: null,
    info: {
      resumo: 'Vênus é o planeta mais próximo da Terra e brilha intensamente no céu noturno. É coberto por densas nuvens ácidas e tem a atmosfera mais quente do sistema solar — quente o bastante para derreter chumbo. Ele gira de costas para o resto do sistema.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '12.103 km' },
        { rotulo: 'Distância do Sol', valor: '108,2 milhões km' },
        { rotulo: 'Duração do ano', valor: '224,7 dias' },
        { rotulo: 'Duração do dia', valor: '-243 dias (retrógrado)' },
        { rotulo: 'Temperatura média', valor: '462 °C' },
        { rotulo: 'Pressão atmosférica', valor: '92 vezes a da Terra' }
      ],
      curiosidades: [
        'Vênus gira de trás para frente (rotação retrógrada) em relação aos outros planetas.',
        'O planeta mais quente do sistema solar é Vênus, não Mercúrio, por causa do efeito estufa descontrolado.',
        'Um dia venusiano dura 243 dias terrestres, enquanto o ano venusiano dura 224,7 dias — o dia é mais longo que o ano!',
        'As nuvens de Vênus viajam ao redor do planeta inteiro a cada 4 dias, criando os ventos mais velozes do sistema solar (360 km/h).',
        'Se você fosse para Vênus, a pressão atmosférica te esmagaria como se estivesse 900 metros de profundidade no oceano terrestre — nenhum submarino conseguiria resistir.',
        'Um dia venusiano dura tanto que se você visitasse Vênus por 121,5 dias terrestres, o Sol estaria no mesmo lugar do céu onde você o deixou.'
      ],
      comparacoes: [
        'Vênus é quase gêmeo da Terra em tamanho — caberiam apenas 1,4 Terras dentro de Vênus.',
        'De avião a 800 km/h, levaria 38 horas para voar em volta do equador de Vênus.'
      ],
      avancado: {
        composicao: 'Silicatos rochosos com superfície vulcânica; atmosfera de CO₂ (96%), N₂ (3%), traços de H₂SO₄.',
        temperatura: 'Superfície: ~462 °C; superior da atmosfera: -75 °C; média mensurada: 462 °C.',
        missoes: ['Venera 1-16 (1961–1983, URSS)', 'Akatsuki (2015–presente)', 'DAVINCI (2028–planejado)'],
        texto: 'Vênus é o segundo planeta solar, similar em tamanho à Terra. Sua atmosfera densa de dióxido de carbono gera efeito estufa extremo mantendo 462 °C em superfície. Sua rotação retrógrada e lenta (243 dias) é anômala. Pode ter tido oceanos e ser habitável 2 bilhões de anos atrás. Vulcões cobrem ~70% da superfície; o vulcão Maat Mons é a maior estrutura vulcânica conhecida.'
      }
    }
  },
  {
    id: 'terra',
    nome: 'Terra',
    tipo: 'planeta',
    pai: 'sol',
    ordemDoSol: 3,
    raioKm: 6371,
    distanciaMediaKm: 149.6e6,
    periodoOrbitalDias: 365.25,
    periodoRotacaoHoras: 23.93,
    excentricidade: 0.0167,
    inclinacaoOrbitaGraus: 0,
    inclinacaoEixoGraus: 23.4,
    retrogrado: false,
    anguloInicialGraus: 288,
    aparencia: {
      tipo: 'terra',
      cores: ['#1e90ff', '#228b22', '#8b7355', '#ffffff'],
      detalhes: { calotas: true, nuvens: true }
    },
    aneis: null,
    info: {
      resumo: 'A Terra é nosso planeta natal, o único com vida conhecida no universo. Sua água líquida, atmosfera rica em oxigênio e temperatura moderada criam condições perfeitas para a vida. É um pequeno oásis azul flutuando no vácuo do espaço.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '12.742 km' },
        { rotulo: 'Distância do Sol', valor: '149,6 milhões km (1 UA)' },
        { rotulo: 'Duração do ano', valor: '365,25 dias' },
        { rotulo: 'Duração do dia', valor: '23,93 horas' },
        { rotulo: 'Temperatura média', valor: '15 °C' },
        { rotulo: 'Luas', valor: '1 (Lua)' }
      ],
      curiosidades: [
        'A Terra tem apenas 4,54 bilhões de anos, mas a vida começou há cerca de 3,8 bilhões de anos atrás.',
        'Nosso oceano cobre 71% da superfície e contém 97% da água do planeta. Os 3% de água doce estão principalmente nas calotas polares.',
        'A atmosfera terrestre tem 78% de nitrogênio e 21% de oxigênio; apenas 1% é outros gases (CO₂, argônio, etc).',
        'A Terra tem um campo magnético protetor que desvia o vento solar e nos protege de radiação cósmica.',
        'Você se move a 1.670 km/h no equador terrestre, mas não sente porque você está em queda livre ao redor do Sol, e tudo ao seu redor se move junto com você.',
        'Se comprimíssemos toda a água dos oceanos da Terra em um cubo sólido, ocuparia apenas 1.400 km de lado — pequeno o suficiente para caber dentro de um estado como a Califórnia.'
      ],
      comparacoes: [
        'A Terra orbita o Sol a 150 milhões de km — um avião a 800 km/h levaria 21 anos para cobrir essa distância.',
        'A luz do Sol leva 8 minutos para chegar à Terra; você vê o Sol como ele era 8 minutos atrás.',
        'Se você comprimisse toda a água dos oceanos da Terra em um cubo, ele teria apenas 1.386 km de lado.'
      ],
      avancado: {
        composicao: 'Crosta silicática (continentes e oceano), manto de silicatos, núcleo externo líquido de Fe-Ni, núcleo interno sólido.',
        temperatura: 'Superfície: média 15 °C (varia -89 °C a 54 °C); núcleo: ~5.200 °C.',
        missoes: ['Gemini, Apollo (1960s–1970s)', 'Challenger, shuttle (1981–2011)', 'ISS (1998–presente)'],
        texto: 'Terra é o terceiro planeta solar, único conhecido a abrigar vida complexa. Formou-se há 4,54 Ga com nucleossíntese solar. A tectônica de placas recicla a crosta e estabiliza o clima através do ciclo do carbono. O grande impacto que formou a Lua foi fundamental para seu dinamismo. Sua magnetosfera, gerada pelo núcleo líquido, protege da radiação solar. A biosfera integra atmosfera, hidrosfera e litosfera.'
      }
    }
  },
  {
    id: 'lua',
    nome: 'Lua',
    tipo: 'lua',
    pai: 'terra',
    raioKm: 1737.1,
    distanciaMediaKm: 384400,
    periodoOrbitalDias: 27.32,
    periodoRotacaoHoras: 655.7,
    excentricidade: 0.0549,
    inclinacaoOrbitaGraus: 5.145,
    inclinacaoEixoGraus: 6.68,
    retrogrado: false,
    anguloInicialGraus: 180,
    aparencia: {
      tipo: 'lua',
      cores: ['#c0c0c0', '#a9a9a9', '#808080'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'A Lua é o satélite natural da Terra e nosso vizinho mais próximo no espaço. Controla as marés do oceano e tornou a vida terrestre mais estável. É o único corpo celeste além da Terra visitado por humanos.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '3.474 km' },
        { rotulo: 'Distância da Terra', valor: '384.400 km' },
        { rotulo: 'Duração do mês', valor: '27,32 dias' },
        { rotulo: 'Duração do dia', valor: '29,5 dias (acoplado)' },
        { rotulo: 'Temperatura', valor: '-173 °C a 127 °C' },
        { rotulo: 'Composição', valor: 'Rocha silicática' }
      ],
      curiosidades: [
        'A Lua sempre mostra a mesma face para a Terra porque sua rotação está sincronizada com seu período orbital — isso é chamado de aprisionamento mareal.',
        'A Lua é responsável pelas marés dos oceanos. Sem ela, nossas marés seriam 30% menores e a vida teria evoluído muito diferente.',
        '12 humanos pisaram na Lua entre 1969 e 1972 durante as missões Apollo.',
        'A Lua se afasta da Terra a 3,8 cm por ano, e eventualmente deixará o sistema Terra-Lua.',
        'A Lua está mais perto de você do que qualquer outro corpo celeste — mas as sondas conseguem chegar a Plutão mais rapidamente do que voltar da Lua.',
        'Na Lua, você pesaria apenas 1/6 do que pesa na Terra — se você pesa 60 kg aqui, lá você pesaria apenas 10 kg, permitindo pulos gigantes de astronauta.'
      ],
      comparacoes: [
        'A Lua está a apenas 384.400 km — um avião a 800 km/h chegaria em 20 dias.',
        'Se a Terra fosse uma bola de futebol, a Lua seria uma bolinha de gude a 7 metros de distância.',
        'Caberiam 50 Luas dentro da Terra — ela é bem menor que nosso planeta.'
      ],
      avancado: {
        composicao: 'Basalto (maria/mares), anortosita (terras altas), regolito de silicatos, traços de ilmenita e olivina.',
        temperatura: 'Lado iluminado: até 127 °C; lado noturno: -173 °C; média -20 °C.',
        missoes: ['Apollo 11-17 (1969–1972)', 'Luna (USSR, 1959–1976)', 'Chang\'e (China, 2007–presente)', 'Chandrayaan (Índia, 2008–presente)'],
        texto: 'A Lua formou-se há ~4,51 Ga a partir de detritos do impacto que criou a Terra. Tem ~3,8 Ga de idade dinâmica (vulcanismo cessou ~3,0 Ga). Craterizada por bombardeio diferenciado, com ~380.000 crateras >1 km. Os mares (maria) são depósitos basálticos de vulcões extinto. Campo magnético residual em terras altas foi intenso quando havia dínamo lunar. Inclinação orbital de 5,145° vs eclíptica.'
      }
    }
  },
  {
    id: 'hubble',
    nome: 'Hubble',
    tipo: 'sonda',
    pai: 'terra',
    raioKm: 0.0066,
    distanciaMediaKm: 6911,
    // Período VISUAL estilizado (o real é 95 min = 0,0663 d — a ficha mostra
    // esse fato). Com o período real, na velocidade padrão de 1 dia/s o
    // Hubble avançaria ~90° de órbita POR FRAME (aliasing temporal): virava
    // vibração ao redor da Terra e poluía a visão Terra/Lua. 3 dias mantém
    // a leitura "muito mais rápido que a Lua" (27,3 d) com movimento suave.
    periodoOrbitalDias: 3,
    periodoOrbitalRealDias: 0.0663,
    periodoRotacaoHoras: 0,
    excentricidade: 0,
    inclinacaoOrbitaGraus: 28.5,
    retrogrado: false,
    anguloInicialGraus: 0,
    aparencia: {
      tipo: 'sonda',
      cores: ['#d8dce4', '#3a4a6b'],
      detalhes: { modelo: 'hubble' }
    },
    aneis: null,
    info: {
      resumo: 'O Hubble é o telescópio espacial mais famoso do mundo, lançado em 1990 em órbita baixa. Revolucionou nossa compreensão do universo com imagens incríveis de galáxias, nebulosas e estrelas. Serve como os "olhos" da humanidade no cosmos visível e ultravioleta.',
      numeros: [
        { rotulo: 'Comprimento', valor: '13,2 m' },
        { rotulo: 'Espelho principal', valor: '2,4 m' },
        { rotulo: 'Altitude orbital', valor: '540 km' },
        { rotulo: 'Uma volta na Terra', valor: '95 minutos' },
        { rotulo: 'Lançamento', valor: '24/04/1990' },
        { rotulo: 'Massa', valor: '11.000 kg' }
      ],
      curiosidades: [
        'O Hubble foi lançado no ônibus espacial Discovery em 1990 e coletou mais de 1,6 milhão de observações científicas até hoje!',
        'A primeira imagem do Hubble saiu completamente borrada por um defeito no espelho, mas astronautas o consertaram em 1993 com "óculos" especiais (COSTAR), deixando-o perfeito.',
        'O Hubble tem o tamanho de um ônibus escolar (13,2 metros) e flutua graciosamente em órbita a 540 km de altitude, cercado de estrelas.',
        'Imagens famosas do Hubble incluem os Pilares da Criação, o Campo Profundo que mostra milhares de galáxias, e a Nebulosa de Anel.',
        'O Hubble já foi consertado e melhorado por astronautas em 5 missões diferentes entre 1993 e 2009 — é como um avô que recebe visitas regulares!',
        'Sem o Hubble, não saberíamos que o universo está se expandindo acelerado, uma descoberta que rendeu Prêmio Nobel em 2011.'
      ],
      comparacoes: [
        'O Hubble é tão pequeno quanto um ônibus escolar, mas consegue ver objetos 400 bilhões de vezes mais fracos do que o olho humano.',
        'O espelho principal de 2,4 metros é menor que o de um telescópio terrestre grande, mas em órbita ele não sofre com a atmosfera distorcida.',
        'Ele orbita a Terra a 27.000 km/h, dando uma volta completa a cada 95 minutos — 15 vezes mais rápido que um avião.'
      ],
      avancado: {
        composicao: 'Estrutura de alumínio e grafite; espelho primário de vidro óptico revestido de alumínio e óxido de sílica; instrumentos CCD, espectrógrafos ultravioleta e visível.',
        temperatura: 'Lado ensolarado: ~50 °C; lado noturno: -40 °C (mantido por cobertores térmicos).',
        missoes: ['STS-31 lançamento (1990)', '5 missões de serviço (1993–2009)', 'Manutenção planejada (2020)'],
        texto: 'O Hubble é um telescópio refletor de 2,4 m em órbita terrestre baixa (~540 km), operado pela NASA, ESA e AURA desde 1990. Revolucionou astronomia observacional ao permitir imagens no visível e ultravioleta acima da atmosfera. Seu período orbital é 95 minutos, inclinação 28.5° (compatível com estação espacial). Um defeito no espelho primário foi corrigido pelo Space Shuttle em 1993 (missão STS-61). Tem cinco instrumentos principais: Advanced Camera for Surveys (ACS), Wide Field Camera 3 (WFC3), Cosmic Origins Spectrograph (COS), Space Telescope Imaging Spectrograph (STIS), Fine Guidance Sensors. Custou ~$2,5 bilhões na construção e revelou: expansão acelerada do universo, idade do universo (~13,8 Ga), primeiras estruturas em z>6, tasa de formação de estrelas ao longo do tempo cósmico. Esperança-de-vida estendida além de 2030.'
      }
    }
  },
  {
    id: 'jwst',
    nome: 'James Webb',
    tipo: 'sonda',
    pai: 'terra',
    raioKm: 0.0105,
    distanciaMediaKm: 1500000,
    periodoOrbitalDias: 365.25,
    periodoRotacaoHoras: 0,
    excentricidade: 0,
    inclinacaoOrbitaGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 288,
    aparencia: {
      tipo: 'sonda',
      cores: ['#e8c368', '#b389d9'],
      detalhes: { modelo: 'jwst' }
    },
    aneis: null,
    info: {
      resumo: 'O James Webb é o sucessor do Hubble, 100 vezes mais sensível, lançado em 2021. Está estacionado no ponto L2, a 1,5 milhão de quilômetros da Terra, enxergando no infravermelho. Consegue ver as primeiras galáxias nascidas após o Big Bang.',
      numeros: [
        { rotulo: 'Espelho principal', valor: '6,5 m (18 segmentos)' },
        { rotulo: 'Escudo solar', valor: '21 × 14 m' },
        { rotulo: 'Distância da Terra', valor: '1,5 milhão km (L2)' },
        { rotulo: 'Lançamento', valor: '25/12/2021' },
        { rotulo: 'Temperatura do lado frio', valor: '-233 °C' },
        { rotulo: 'Massa', valor: '6.200 kg' }
      ],
      curiosidades: [
        'O James Webb enxerga a luz das primeiras galáxias do universo, emitida há mais de 13,5 bilhões de anos — é como ter uma máquina do tempo óptica!',
        'Seu espelho é feito de 18 segmentos hexagonais de berílio recobertos de ouro, que refletem melhor a luz infravermelha.',
        'O escudo solar tem 5 camadas e é do tamanho de uma quadra de tênis (21 × 14 metros) — protege os instrumentos mantendo a temperatura a -233 °C.',
        'O Webb foi lançado num foguete Ariane 5 de Kourou (Guiana Francesa) e levou um mês para se desdobrar completamente no espaço.',
        'Fica no ponto de Lagrange L2, um lugar especial no espaço onde a gravidade da Terra e do Sol se equilibram, permitindo que fique sempre no mesmo lugar relativo a nós.',
        'É 100 vezes mais sensível que o Hubble e consegue detectar objetos tão fracamente brilhantes que seria como ver uma vaga-lume na Lua do ponto de vista da Terra!'
      ],
      comparacoes: [
        'Seu espelho de 6,5 metros é quase 3 vezes maior que o do Hubble, e é muito mais sensível à luz infravermelha.',
        'A distância de 1,5 milhão de km é quase 4 vezes a distância da Lua — mas consegue observar em conjunto com o Hubble para estudos complementares.',
        'Se o Hubble é como binóculos infravermelhos antigos, o Webb é como óculos de visão noturna de última geração alimentados por ficção científica!'
      ],
      avancado: {
        composicao: 'Espelho primário: 18 segmentos de berílio recobertos com ouro (100 nm) para ótima refletividade IR; escudo solar: 5 camadas de Kapton revestido de alumínio; sensor infravermelho (NIRCam, MIRI, NIRSpec, FQM).',
        temperatura: 'Lado frio (instrumentos): -233 °C (~40 K); lado quente (escudo): até 70 °C.',
        missoes: ['Lançamento Ariane 5 (25/12/2021)', 'Desdobramento orbital (~1 mês)', 'Início das operações científicas (2022)', 'Primeiras imagens (12/07/2022)'],
        texto: 'O James Webb Space Telescope (JWST) é um telescópio infravermelho orbitando o ponto de Lagrange L2 solar-terrestre (~1,5 Mkm), operado por NASA, ESA, CSA desde 2022. Espelho primário de ~6,5 m (18 segmentos hexagonais Be+Au), escudo solar de 5 camadas Kapton ~21×14 m. Instrumentos: NIRCam (0,6–5 μm), MIRI (5–28 μm), NIRSpec (0,6–5 μm espectroscopia), FQM. Sucessor do Hubble com sensibilidade ~100× melhor em IR. Período orbital ao redor de L2: 1 ano (365,25 d). Temperatura operacional crítica -233°C mantida por evaporação de água/metanol nos radiadores. Custou ~$10 bilhões (10× Hubble). Descobertas iniciais: primeiras galáxias (z~20), composição atmosférica de exoplanetas, formação de protoestrelas. Vida útil estimada de 10+ anos (propelente ~20 anos).'
      }
    }
  },
  {
    id: 'marte',
    nome: 'Marte',
    tipo: 'planeta',
    pai: 'sol',
    ordemDoSol: 4,
    raioKm: 3389.5,
    distanciaMediaKm: 227.923e6,
    periodoOrbitalDias: 686.98,
    periodoRotacaoHoras: 24.62,
    excentricidade: 0.0934,
    inclinacaoOrbitaGraus: 1.851,
    inclinacaoEixoGraus: 25.19,
    retrogrado: false,
    anguloInicialGraus: 85,
    aparencia: {
      tipo: 'rochoso',
      cores: ['#c1664a', '#a85544', '#8b4513'],
      detalhes: { calotas: true, crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Marte é o planeta vermelho, famoso por suas dunas avermelhadas e seus vulcões gigantes. É o alvo principal da exploração espacial humana por ter evidências de água passada. Um dia em Marte é quase igual ao da Terra.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '6.779 km' },
        { rotulo: 'Distância do Sol', valor: '227,9 milhões km' },
        { rotulo: 'Duração do ano', valor: '686,98 dias' },
        { rotulo: 'Duração do dia', valor: '24,62 horas' },
        { rotulo: 'Temperatura média', valor: '-65 °C' },
        { rotulo: 'Luas', valor: '2 (Fobos, Deimos)' }
      ],
      curiosidades: [
        'Marte tem o maior vulcão conhecido do sistema solar: Olympus Mons, com 21 km de altura e 600 km de largura — 4 vezes o Mount Everest!',
        'A Grande Rift de Marte (Valles Marineris) tem 4 km de profundidade e 4.000 km de comprimento — 10 vezes maior que o Grand Canyon.',
        'Marte tem calotas de gelo em seus polos feitas de CO₂ congelado e água.',
        'As estações em Marte duram quase um ano terrestre cada, e as poeiras vermelhas são óxido de ferro (ferrugem).',
        'Um dia em Marte dura 24,6 horas — quase igual ao nosso dia — por isso cientistas escolhem Marte para eventual colonização, pois nosso corpo se adapta melhor lá.',
        'Marte tem a maior cratera de impacto do sistema solar — a Bacia de Hellas tem 2.300 km de diâmetro e 9 km de profundidade.'
      ],
      comparacoes: [
        'Marte é metade do tamanho da Terra — caberiam 7 Marte dentro da Terra.',
        'De avião a 800 km/h, levaria 112 horas (4,7 dias) para voar em volta do equador de Marte.',
        'Viagem tripulada a Marte leva cerca de 6-9 meses — um avião levaria 35 anos para cobrir a mesma distância.'
      ],
      avancado: {
        composicao: 'Silicatos ferro-magnesiano, óxido de ferro (magnetita, hematita), poeiras vulcânicas (percolorato), gelo subsuperficial.',
        temperatura: 'Máxima em equador: 20 °C; mínima nos polos: -125 °C; média global: -65 °C.',
        missoes: ['Mariner 4 (1965)', 'Viking 1-2 (1976)', 'Mars Pathfinder (1997)', 'Curiosity (2012–presente)', 'Perseverance (2021–presente)'],
        texto: 'Marte é o quarto planeta solar. Formou-se há ~4,6 Ga mas perdeu seu campo magnético há ~4,0 Ga, permitindo erosão solar. Apresenta vulcões escudo (Olympus Mons, Arsia Mons), cânions (Valles Marineris), calotas polares de CO₂ e H₂O. Água liquida existiu até ~3,5 Ga; leitos de rios e delta de cratera preservam evidência. Atmosfera 95% CO₂, 2,7% N₂, traços de Ar. Densidade 3,93 g/cm³ indica núcleo de Fe-Ni.'
      }
    }
  },
  {
    id: 'fobos',
    nome: 'Fobos',
    tipo: 'lua',
    pai: 'marte',
    raioKm: 11.3,
    distanciaMediaKm: 9376,
    periodoOrbitalDias: 0.3189,
    periodoRotacaoHoras: 7.66,
    excentricidade: 0.0151,
    inclinacaoOrbitaGraus: 1.075,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 200,
    aparencia: {
      tipo: 'lua',
      cores: ['#8b7355', '#696969', '#4a4a4a'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Fobos é a maior e mais interna lua de Marte, um asteroide capturado de forma irregular. Orbita Marte tão perto que eventualmente colidirá com o planeta. É tão pequena que um humano poderia saltar para longe dela.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '22,6 km' },
        { rotulo: 'Distância de Marte', valor: '9.376 km' },
        { rotulo: 'Período orbital', valor: '0,319 dias (7,66 horas)' },
        { rotulo: 'Tipo', valor: 'Asteroide capturado' },
        { rotulo: 'Gravidade', valor: '0,0057 m/s²' },
        { rotulo: 'Composição', valor: 'Condrita carbonácea' }
      ],
      curiosidades: [
        'Fobos completa uma órbita ao redor de Marte em apenas 7,66 horas — menos tempo que um dia marciano!',
        'Fobos está se aproximando de Marte a 1,8 cm por ano e colidirá com Marte em cerca de 50 milhões de anos.',
        'A gravidade em Fobos é tão fraca que um humano com uma velocidade de 5 m/s saltaria para o espaço.',
        'Fobos é tão próxima de Marte que não está em todo o céu marciano — ela nasce e se põe várias vezes por dia.'
      ],
      avancado: {
        composicao: 'Condrita carbonácea tipo C, similar a asteroides do cinturão principal, matriz de silicatos com água.',
        temperatura: 'Superfície: estimada -4 a -112 °C.',
        missoes: ['Mariner 7 (1969)', 'Viking 1-2 (1976)', 'Rosetta OSIRIS (2015, voo próximo)', 'Tianwen-1 (2020–presente)', 'Sample Return (JAXA Perseverance, ~2030)'],
        texto: 'Fobos é uma lua retrógrada irregular, ~23 × 21 × 19 km, órbita excêntrica. Provavelmente um asteroide capturado ~4,5 Ga. Maré de Marte o estica; tidal locking sincronizado. Cratera de impacto Stickney (~10 km) e sistema de grooves radiantes. Campo preto em regime de captura levará colisão em ~50 Ma. Densidade ~1,88 g/cm³ sugere porosidade alta (~30%).'
      }
    }
  },
  {
    id: 'deimos',
    nome: 'Deimos',
    tipo: 'lua',
    pai: 'marte',
    raioKm: 6.2,
    distanciaMediaKm: 23463,
    periodoOrbitalDias: 1.2624,
    periodoRotacaoHoras: 30.3,
    excentricidade: 0.0002,
    inclinacaoOrbitaGraus: 0.93,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 315,
    aparencia: {
      tipo: 'lua',
      cores: ['#a9a9a9', '#808080', '#696969'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Deimos é a menor e mais externa lua de Marte, um asteroide também capturado. É tão minúscula e tão distante que mal brilha no céu marciano. Tem o aspecto de um asteroide puro e sem características.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '12,4 km' },
        { rotulo: 'Distância de Marte', valor: '23.463 km' },
        { rotulo: 'Período orbital', valor: '1,2624 dias' },
        { rotulo: 'Tipo', valor: 'Asteroide capturado' },
        { rotulo: 'Gravidade', valor: '0,003 m/s²' },
        { rotulo: 'Composição', valor: 'Condrita carbonácea' }
      ],
      curiosidades: [
        'Deimos está tão longe de Marte que pode permanecer no céu durante várias noites marcianas consecutivas.',
        'Deimos é tão pequena que seria fácil orbitar ao seu redor — sua velocidade orbital é apenas 5 metros por segundo.',
        'Ambas as luas de Marte foram descobertas por Asaph Hall em 1877 apenas 5 dias após a descoberta de Fobos.',
        'O sistema de luas de Marte deve ser um "fóssil capturado" de uma época de colisões no sistema solar primitivo.'
      ],
      avancado: {
        composicao: 'Condrita carbonácea tipo C, silicatos, possivelmente água gelada subsuperficial.',
        temperatura: 'Estimada -40 a -60 °C na superfície iluminada.',
        missoes: ['Mariner 7 (1969)', 'Viking 1-2 (1976)', 'Mariner 7 (close sobrevoo)', 'Rosetta (2015)', 'Tianwen-1 (2020)'],
        texto: 'Deimos é uma lua retrógrada pequena (~12 × 10 × 8 km), órbita quase circular (e = 0,0002). Capturada ~4,5 Ga junto com Fobos. Superfície lisa com poucos impactos (regeneração erosiva por micro-meteoritos). Densidade ~1,47 g/cm³, porosidade ~40%, similar a asteroides C. Não está em regime de captura mareal — crescimento de Marte é responsável pela órbita estável.'
      }
    }
  },
  {
    id: 'jupiter',
    nome: 'Júpiter',
    tipo: 'planeta',
    pai: 'sol',
    ordemDoSol: 5,
    raioKm: 69911,
    distanciaMediaKm: 778.57e6,
    periodoOrbitalDias: 4332.9,
    periodoRotacaoHoras: 9.93,
    excentricidade: 0.0489,
    inclinacaoOrbitaGraus: 1.304,
    inclinacaoEixoGraus: 3.13,
    retrogrado: false,
    anguloInicialGraus: 127,
    aparencia: {
      tipo: 'gasoso',
      cores: ['#d4a574', '#c1664a', '#a0633d'],
      detalhes: { bandas: 8, manchaVermelha: true }
    },
    aneis: null,
    info: {
      resumo: 'Júpiter é o planeta maior do sistema solar, uma gigantesca bola de gases girando tão rapidamente que é achatada nos polos. Sua Grande Mancha Vermelha é uma tempestade maior que a Terra. É cercado por luas incríveis incluindo vulcões ativos.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '139.822 km (11 Terras)' },
        { rotulo: 'Distância do Sol', valor: '778,6 milhões km' },
        { rotulo: 'Duração do ano', valor: '11,86 anos' },
        { rotulo: 'Duração do dia', valor: '9,93 horas' },
        { rotulo: 'Temperatura do núcleo', valor: '~24.000 K' },
        { rotulo: 'Luas', valor: '95+ (4 galileanas)' }
      ],
      curiosidades: [
        'Caberiam 1.300 Terras dentro de Júpiter, ou 5 bilhões de humanos — é verdadeiramente gigantesco.',
        'A Grande Mancha Vermelha de Júpiter é uma tempestade que dura pelo menos 350 anos, grande o bastante para engolir 3 Terras.',
        'Júpiter irradia mais energia do que recebe do Sol — tem um calor interno residual de sua formação.',
        'Um humano de 100 kg pesaria 250 kg na superfície das nuvens de Júpiter devido à gravidade intensíssima.',
        'A Grande Mancha Vermelha de Júpiter é tão grande que a Terra inteira caberia dentro dela — e essa tempestade é tão forte que os ventos alcançam 600 km/h.',
        'Júpiter leva 12 anos terrestres para dar uma volta ao redor do Sol — significa que você completa 12 aniversários enquanto Júpiter completa apenas 1 ano!'
      ],
      comparacoes: [
        'Se o Sol fosse uma bola de futebol, Júpiter seria uma laranja a 25 metros de distância.',
        'Caberiam 1.321 Terras dentro de Júpiter — é o rei dos planetas.',
        'Um avião levaria 150 dias para voar em volta do equador de Júpiter a 800 km/h.'
      ],
      avancado: {
        composicao: 'Hidrogênio molecular (H₂), hélio (He), traços de metano (CH₄), amônia (NH₃), água (H₂O), núcleo rochoso/gelado ~20-30 M⊕.',
        temperatura: 'Topo das nuvens: -110 °C; núcleo: ~24.000 K.',
        missoes: ['Pioneer 10-11 (1973–1974)', 'Voyager 1-2 (1979)', 'Galileo (1995–2003)', 'JUNO (2016–presente)', 'Europa Clipper (2024–presente)'],
        texto: 'Júpiter é o primeiro planeta gasoso, ~318 M⊕. Formou-se in situ ~4,5 Ga com núcleo de silicatos/gelos e envelope H₂/He primordial. Migração Grande ninguém (Grand Tack) moldou formação do sistema. Período rotação rápida (9,93h) causa achatamento equatorial. Banda/zona de nuvens alt/alt-nuvem em 80 níveis. Campo magnético Dipolar 4 G, maior magnetosfera do sistema solar. 95 luas descobertas, incluindo 4 galileanas; possível anel fraco.'
      }
    }
  },
  {
    id: 'io',
    nome: 'Io',
    tipo: 'lua',
    pai: 'jupiter',
    raioKm: 1821.6,
    distanciaMediaKm: 421700,
    periodoOrbitalDias: 1.769,
    periodoRotacaoHoras: 42.46,
    excentricidade: 0.0041,
    inclinacaoOrbitaGraus: 0.04,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 90,
    aparencia: {
      tipo: 'vulcanico',
      cores: ['#e8d060', '#ff8c00', '#5a3a1a'],
      detalhes: {}
    },
    aneis: null,
    info: {
      resumo: 'Io é a lua mais vulcânica do sistema solar, coberta de vulcões ativos que expelem enxofre. Sua superfície brilhante amarela e vermelha é devido a vulcões e composto de enxofre. Nenhum lugar é tão dinamicamente ativo quanto Io.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '3.643 km' },
        { rotulo: 'Distância de Júpiter', valor: '421.700 km' },
        { rotulo: 'Período orbital', valor: '1,769 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-143 °C (média)' },
        { rotulo: 'Vulcões ativos', valor: '400+' },
        { rotulo: 'Composição', valor: 'Silicatos com enxofre' }
      ],
      curiosidades: [
        'Io tem mais vulcões ativos que qualquer corpo do sistema solar — há sempre 5-10 erupções simultâneas.',
        'O aquecimento de maré (tidal heating) de Júpiter mantém Io tão quente que sua crosta é constantemente renovada.',
        'Os vulcões de Io ejetam enxofre até 500 km de altura, criando arcos que caem como uma chuva de enxofre.',
        'Io não tem crateras porque os vulcões cobrem as cicatrizes de impactos em apenas alguns milhões de anos.',
        'Os vulcões de Io são tão ativos que mudam o aspecto do satélite a cada poucos anos — mapas feitos há décadas estão desatualizados porque a superfície transformou-se completamente.',
        'Io é aquecido pelas marés de Júpiter — é como ter um forno interno colossal ligado 24 horas, criando ambiente mais vulcanicamente ativo que qualquer outro corpo.'
      ],
      avancado: {
        composicao: 'Silicatos vulcânicos (basalto), enxofre elementar, compostos de enxofre (SO₂, H₂S), derivativos tectônicos.',
        temperatura: 'Superfície: média -143 °C; hot spots vulcânicos: até 1.800 K.',
        missoes: ['Voyager 1-2 (1979)', 'Galileo (1995–2003)', 'New Horizons (2007, voo próximo)', 'JUNO (2016–presente)'],
        texto: 'Io é a 4ª lua galileana (primeira descoberta), vulcânica por excelência. Aquecimento de maré causado pela órbita ressonante 1:2:4 com Europa e Ganimedes genera 1,5 W/m² fluxo calórico interno — 25 vezes maior que a Terra. Vulcões em caldeiras de enxofre/SO₂ lançam plumas até 500 km. Nenhuma cratera > 50 km: superfície rejuvenivelada em ~1 Ma. Magnetosfera de Júpiter aprisionou neutrals sulfurados em toro de plasma.'
      }
    }
  },
  {
    id: 'europa',
    nome: 'Europa',
    tipo: 'lua',
    pai: 'jupiter',
    raioKm: 1560.8,
    distanciaMediaKm: 671100,
    periodoOrbitalDias: 3.551,
    periodoRotacaoHoras: 85.22,
    excentricidade: 0.009,
    inclinacaoOrbitaGraus: 0.47,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 210,
    aparencia: {
      tipo: 'gelado',
      cores: ['#e8e8e8', '#c0c0c0', '#4a7cda'],
      detalhes: {}
    },
    aneis: null,
    info: {
      resumo: 'Europa é uma das maiores luas de Júpiter e tem uma crosta de gelo liso com rachaduras. Sob o gelo há provavelmente um oceano de água morna — o melhor candidato para encontrar vida extraterrestre.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '3.122 km' },
        { rotulo: 'Distância de Júpiter', valor: '671.100 km' },
        { rotulo: 'Período orbital', valor: '3,551 dias' },
        { rotulo: 'Profundidade de gelo', valor: '~100 km' },
        { rotulo: 'Profundidade do oceano', valor: '~100 km (estimado)' },
        { rotulo: 'Temperatura da superfície', valor: '-220 °C' }
      ],
      curiosidades: [
        'Europa tem uma crosta de gelo tão lisa e jovem que tem quase nenhuma cratera — a superfície é constantemente renovada.',
        'Europa é considerada um dos melhores lugares para procurar vida extraterrestre por seu oceano subglacial de água líquida.',
        'As rachaduras em Europa (lineae) são causadas por forças de maré e podem ser fontes de calor para a vida.',
        'O oceano de Europa pode conter mais água do que todos os oceanos da Terra juntos.',
        'Cientistas acreditam que há mais água líquida em Europa (sob sua crosta de gelo) do que em todos os oceanos da Terra — e essa água pode conter vida!',
        'Europa tem rachaduras que se formam porque o gelo incha e se quebra constantemente — é como um congelador planetário, mas em escala extrema.'
      ],
      avancado: {
        composicao: 'Crosta de gelo de água H₂O (pura), silicatos rochosos no núcleo, possível oceano de agua líquida subsuperficial.',
        temperatura: 'Crosta: média -220 °C; possível oceano: estimado -10 a 0 °C.',
        missoes: ['Voyager 1-2 (1979)', 'Galileo (1995–2003)', 'New Horizons (2007, voo próximo)', 'Europa Clipper (2024–presente)'],
        texto: 'Europa é a 2ª lua galileana, tamanho similar à Lua. Crosta de gelo espesso (~100 km) sobre oceano subsuperficial (~100 km) de H₂O líquida sustentado por aquecimento tidal. Superfície jovem (~30 Ma): lineae (rachaduras), chaos (fraturamento), landers de gelo marrom (crio-vulcanismo). Sem magnetosfera própria; campo de Júpiter induz. Ocean composition: salmoura (NaCl, MgSO₄). Candidato primário de biosfera extraterrestre.'
      }
    }
  },
  {
    id: 'ganimedes',
    nome: 'Ganimedes',
    tipo: 'lua',
    pai: 'jupiter',
    raioKm: 2634.1,
    distanciaMediaKm: 1070400,
    periodoOrbitalDias: 7.154,
    periodoRotacaoHoras: 171.7,
    excentricidade: 0.0013,
    inclinacaoOrbitaGraus: 0.19,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 330,
    aparencia: {
      tipo: 'lua',
      cores: ['#8b7355', '#a0907d', '#696969'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Ganimedes é a maior lua do sistema solar, maior até que o planeta Mercúrio. Tem crateras e vales feitos de gelo antigo. Pensa-se que também tem um oceano subglacial. É fascinante por sua complexidade geológica.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '5.268 km (maior que Mercúrio)' },
        { rotulo: 'Distância de Júpiter', valor: '1.070.400 km' },
        { rotulo: 'Período orbital', valor: '7,154 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-110 a -120 °C' },
        { rotulo: 'Composição', valor: 'Gelo, rocha, traços de enxofre' },
        { rotulo: 'Oceano estimado', valor: '~100 km de profundidade' }
      ],
      curiosidades: [
        'Ganimedes é a maior lua do sistema solar, maior que o planeta Mercúrio, mas metade de Mercúrio em massa.',
        'Ganimedes tem auroras similares às da Terra, causadas pela interação de sua (fraca) magnetosfera com o plasma de Júpiter.',
        'A superfície de Ganimedes mostra dois tipos de terreno: terras altas antigas e craqueadas, e terras baixas mais jovens e suaves.',
        'Ganimedes pode ter um oceano subglacial contendo mais água que os oceanos terrestres.'
      ],
      avancado: {
        composicao: 'Gelo de água (crosta, ~100 km), rocha silicática (manto/núcleo), traços de enxofre e metano, possível oceano subsuperficial.',
        temperatura: 'Crosta: média -110 a -120 °C; possível oceano: estimado 0-10 °C.',
        missoes: ['Voyager 1-2 (1979)', 'Galileo (1995–2003)', 'JUNO (2016–presente)', 'Juice (2023–presente)'],
        texto: 'Ganimedes é a 3ª lua galileana, maior satélite natural conhecido (R = 2634 km, ~0,41 M_Lua). Formada in situ ~4,5 Ga, diferenciação em gelo/rocha/oceano/núcleo metálico pequeno. Crosta de gelo com 2 tipos terreno: terrae (paleocratered, ~4 Ga) e grooves sulcado (tectonismo ~3,5 Ga, padrão polar-terrestre). Magnetosfera induzida por Júpiter ~4 e-5 G de dipolo. Possível oceano por tidal heating.'
      }
    }
  },
  {
    id: 'calisto',
    nome: 'Calisto',
    tipo: 'lua',
    pai: 'jupiter',
    raioKm: 2410.3,
    distanciaMediaKm: 1882600,
    periodoOrbitalDias: 16.689,
    periodoRotacaoHoras: 400.5,
    excentricidade: 0.0074,
    inclinacaoOrbitaGraus: 0.19,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 45,
    aparencia: {
      tipo: 'lua',
      cores: ['#696969', '#4a4a4a', '#2f2f2f'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Calisto é a terceira maior lua de Júpiter e uma das superfícies mais antigas e craqueadas do sistema solar. Ao contrário de suas irmãs, não tem atividade tectônica — é um fóssil vivo do passado.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '4.821 km' },
        { rotulo: 'Distância de Júpiter', valor: '1.882.600 km' },
        { rotulo: 'Período orbital', valor: '16,689 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-110 a -220 °C' },
        { rotulo: 'Composição', valor: 'Gelo escuro e rocha' },
        { rotulo: 'Idade da superfície', valor: '~4 bilhões de anos' }
      ],
      curiosidades: [
        'Calisto é uma das superfícies mais craqueadas do sistema solar, preservando um registro de impacto de 4 bilhões de anos.',
        'Calisto não sofreu aquecimento tidal significativo (ao contrário de Io, Europa e Ganimedes), então sua superfície é um fóssil vivo.',
        'O maior impacto em Calisto é Gilgamesh, um anel de bacia multi-anelado com 1.600 km de diâmetro.',
        'Apesar da falta de atividade geológica, Calisto pode ter um oceano subsuperficial fraco mantido por decaimento radioativo.'
      ],
      avancado: {
        composicao: 'Gelo de água (crosta), rocha silicática, materiais escuros (carbono?), possível oceano subsuperficial fraco.',
        temperatura: 'Crosta: média -110 a -220 °C; possível oceano (especulativo): estimado -20 a -5 °C.',
        missoes: ['Voyager 1-2 (1979)', 'Galileo (1995–2003)', 'JUNO (2016–presente)', 'Juice (2023–presente)'],
        texto: 'Calisto é a 4ª lua galileana, não-ressonante orbitalmente (16,689 dias). Crosta diferenciada gelo/rocha, sem aquecimento tidal primário em contrastecom Io-Europa-Ganimedes ressonantes 1:2:4. Superfície antiga (~4,0 Ga): mantém catálogo de impactos pré-tardio-pesado bombardeio diferenciado. Estruturas multi-aneladas (Gilgamesh ~1600 km), pallimpsestos, escarpas radiantes. Possível oceano subsuperficial débil (~10 km profundidade estimada) por radiogênico aquecimento e depressão tidal residual.'
      }
    }
  },
  {
    id: 'saturno',
    nome: 'Saturno',
    tipo: 'planeta',
    pai: 'sol',
    ordemDoSol: 6,
    raioKm: 58232,
    distanciaMediaKm: 1434.45e6,
    periodoOrbitalDias: 10759.5,
    periodoRotacaoHoras: 10.7,
    excentricidade: 0.0565,
    inclinacaoOrbitaGraus: 2.485,
    inclinacaoEixoGraus: 26.73,
    retrogrado: false,
    anguloInicialGraus: 100,
    aparencia: {
      tipo: 'gasoso',
      cores: ['#d8c8a0', '#c9b896', '#a89880'],
      detalhes: { bandas: 5 }
    },
    aneis: {
      raioInternoFator: 1.25,
      raioExternoFator: 2.25,
      cores: ['#d8c8a8', '#8a7a60'],
      opacidade: 0.85
    },
    info: {
      resumo: 'Saturno é o planeta dos anéis, uma visão espetacular que criou magia em todos que o observaram. É um gigante gasoso como Júpiter, mas menos ativo. Seus anéis são feitos de bilhões de partículas de gelo e rocha.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '116.464 km (9 Terras)' },
        { rotulo: 'Distância do Sol', valor: '1.434,5 milhões km' },
        { rotulo: 'Duração do ano', valor: '29,46 anos' },
        { rotulo: 'Duração do dia', valor: '10,7 horas' },
        { rotulo: 'Densidade', valor: '0,687 g/cm³ (flutuaria na água)' },
        { rotulo: 'Luas', valor: '146 (2 principais: Titã, Encélado)' }
      ],
      curiosidades: [
        'Saturno é menos denso que a água — se colocado em uma banheira cósmica, ele flutuaria!',
        'Os anéis de Saturno são tão finos que uma escala de 10 km desenharia os anéis em relação ao planeta em tamanho real.',
        'A Grande Mancha Branca em Saturno é uma tempestade que ocorre a cada 28-30 anos e pode durar meses.',
        'Titã, a maior lua de Saturno, tem uma atmosfera densa e lagos de metano líquido — é o único corpo além da Terra com líquido em superfície.',
        'Os anéis de Saturno são feitos de pedaços de gelo de vários tamanhos, de milímetros a quilômetros — alguns são luas pequenas, outros são flocos de neve cósmica.',
        'Saturno rotaciona tão rápido que um dia lá dura apenas 10,7 horas, mas é tão achatado que seu diâmetro equatorial é 10% maior que seu diâmetro polar.'
      ],
      comparacoes: [
        'Saturno é 95 vezes mais massivo que a Terra — caberiam 764 Terras dentro dele.',
        'Os anéis de Saturno estão a 60.000-280.000 km do planeta — muito mais distantes que a Lua da Terra (384.400 km total).',
        'De avião a 800 km/h, levaria 37 anos para voar em volta do equador de Saturno.'
      ],
      avancado: {
        composicao: 'Hidrogênio (H₂), hélio (He), traços de metano (CH₄), amônia (NH₃), fosfina (PH₃), núcleo rochoso ~30 M⊕.',
        temperatura: 'Topo das nuvens: -140 °C; núcleo: estimado ~11.000 K.',
        missoes: ['Pioneer 11 (1979)', 'Voyager 1-2 (1980–1981)', 'Cassini-Huygens (2004–2017)', 'Prevista: Dragonfly (2027–2035)'],
        texto: 'Saturno é o 2º planeta gasoso, ~95 M⊕. Formou-se in situ ~4,5 Ga com migração dinâmica. Período rápido (10,7h) causa achatamento >Jupiter. Campo magnético axial 0,5 G (fraco), magnetosfera modesta. Anéis primários (A,B,C) espessura ~30 m, idade estimada 100-200 Ma (ou primitiva). Compostos de gelo H₂O, rocha, traços de CH₄/NH₃. Luas menores Mimas, Enceladus, Titã, Rhea, Iapetus. Titã (2575 km) tem atmosfera densa N₂/CH₄ e criolacunas. Enceladus tem plumas criovulcânicas (H₂O/NH₃).'
      }
    }
  },
  {
    id: 'tita',
    nome: 'Titã',
    tipo: 'lua',
    pai: 'saturno',
    raioKm: 2574.7,
    distanciaMediaKm: 1222000,
    periodoOrbitalDias: 15.945,
    periodoRotacaoHoras: 382.68,
    excentricidade: 0.0288,
    inclinacaoOrbitaGraus: 0.33,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 270,
    aparencia: {
      tipo: 'nevoa',
      cores: ['#f5a460', '#e0955a', '#c88448'],
      detalhes: {}
    },
    aneis: null,
    info: {
      resumo: 'Titã é a segunda maior lua do sistema solar e uma joia científica rara — tem uma atmosfera densa e chuva de metano. Sua superfície esconde lagos e mares de hidrocarbonetos líquidos. É mais complexa que qualquer planeta terrestre.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '5.150 km' },
        { rotulo: 'Distância de Saturno', valor: '1.222.000 km' },
        { rotulo: 'Período orbital', valor: '15,945 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-179 °C' },
        { rotulo: 'Pressão atmosférica', valor: '1,5 bar (maior que Terra!)' },
        { rotulo: 'Composição da atmosfera', valor: '98% N₂, 2% CH₄' }
      ],
      curiosidades: [
        'Titã é a única lua com uma atmosfera densa — é mais densa que a da Terra! Mas feita de nitrogênio e metano.',
        'Titã tem chuva de metano que cai em mares de metano/etano — é o único corpo além da Terra com líquido em superfície.',
        'Os lagos de Titã cobrem ~2% de superfície, concentrados nos polos, com tamanhos comparáveis aos nossos Grandes Lagos.',
        'Titã pode ter oceano subsuperficial de água-amônia, potencialmente habitável, em adição aos seus mares de hidrocarbonetos.',
        'Titã tem dinâmica hidrológica como a Terra — com chuva, rios e lagos — mas em vez de água, tudo é feito de metano e etano líquidos!',
        'Se você despejasse gasolina em um dos lagos de Titã, ela desapareceria porque se dissolveria no metano — como derramar água em água.'
      ],
      avancado: {
        composicao: 'Crosta de gelo de água, possível oceano subsuperficial de água-amônia, atmosfera N₂/CH₄, lagos/mares de metano-etano.',
        temperatura: 'Superfície: ~-179 °C; possível oceano: estimado -20 a 0 °C.',
        missoes: ['Voyager 1-2 (1980–1981)', 'Cassini-Huygens (2004–2017, Huygens landou em Titã)', 'Dragonfly (2027–2035)'],
        texto: 'Titã é a 2ª lua galileana (primeira descoberta por Christiaan Huygens 1655), raio 2.575 km. Atmosfera densa N₂/CH₄ (1,5 bar), efeito estufa CH₄ mantém -179 °C. Criosfera H₂O/NH₃. Lagos/mares de metano-etano norte polar (~2% superfície); feições fluviais; dunas equatoriais de tholins. Possível oceano subsuperficial 50-80 km profundidade H₂O-NH₃. Astrobiologia: ciclo metano análogo a ciclo de água na Terra; possível criovida em oceano.'
      }
    }
  },
  {
    id: 'encelado',
    nome: 'Encélado',
    tipo: 'lua',
    pai: 'saturno',
    raioKm: 252.1,
    distanciaMediaKm: 238000,
    periodoOrbitalDias: 1.370,
    periodoRotacaoHoras: 32.9,
    excentricidade: 0.0047,
    inclinacaoOrbitaGraus: 0.02,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 0,
    aparencia: {
      tipo: 'gelado',
      cores: ['#ffffff', '#e8e8e8', '#c0c0c0'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Encélado é uma pequena lua de Saturno coberta de gelo brilhante que esconde um segredo extraordinário — gelo quente é ejetado de suas rachaduras polares. Um oceano subsuperficial sob seu gelo a torna um candidato para vida extraterrestre.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '504 km' },
        { rotulo: 'Distância de Saturno', valor: '238.000 km' },
        { rotulo: 'Período orbital', valor: '1,370 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-200 °C a -85 °C' },
        { rotulo: 'Profundidade do oceano', valor: '~10-20 km' },
        { rotulo: 'Hidrotermais', valor: 'Prováveis em fundo oceânico' }
      ],
      curiosidades: [
        'Encélado ejeita plumas de água gelada de seus polos sul em velocidades de 2 km/s — é um gêiser gigante!',
        'A água que Encélado ejeita está em contato com minerais rochosos em seu fundo oceânico — potencial para vida.',
        'Encélado é uma das luas mais brilhantes do sistema solar — sua superfície é quase 100% gelo puro.',
        'Pequeno aquecimento tidal de Saturno é suficiente para manter um oceano líquido em Encélado — um milagre da ressonância orbital.'
      ],
      avancado: {
        composicao: 'Crosta de gelo de água puro, oceano subsuperficial H₂O líquida, núcleo rochoso, possíveis fontes hidrotermais.',
        temperatura: 'Crosta: média -200 °C; plumas: -120 °C; possível oceano: estimado 0-10 °C.',
        missoes: ['Voyager 2 (1981)', 'Cassini-Huygens (2004–2017)'],
        texto: 'Encélado é uma pequena lua (R = 252 km), crosta gelo, núcleo rochoso, oceano subsuperficial 10-20 km. Anomalia térmica polo sul: Tiger Stripes (rachaduras), fontes termais criovulcânicas ejetam H₂O a 2 km/s. Ressonância orbital 2:1 com Dione sustenta aquecimento tidal ~4 GW. Plumas contêm NaCl, SiO₂, H₂, CH₄ — sinais de quimiosíntese possível. Composição oceano: salmoura H₂O-NaCl. Candidato primário de astrobiologia.'
      }
    }
  },
  {
    id: 'mimas',
    nome: 'Mimas',
    tipo: 'lua',
    pai: 'saturno',
    raioKm: 198.3,
    distanciaMediaKm: 185520,
    periodoOrbitalDias: 0.9424,
    periodoRotacaoHoras: 22.62,
    excentricidade: 0.0196,
    inclinacaoOrbitaGraus: 1.57,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 45,
    aparencia: {
      tipo: 'lua',
      cores: ['#c0c0c0', '#a9a9a9', '#808080'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Mimas é a pequena lua de Saturno mais conhecida pela gigantesca cratera Herschel em seu lado virado. A cratera é tão grande que o impacto quase o destruiu — é como um rosto assustador observando o sistema solar.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '397 km' },
        { rotulo: 'Distância de Saturno', valor: '185.520 km' },
        { rotulo: 'Período orbital', valor: '0,9424 dias (22,6 horas)' },
        { rotulo: 'Cratera Herschel', valor: '139 km de diâmetro (35% de Mimas!)' },
        { rotulo: 'Profundidade de Herschel', valor: '10 km' },
        { rotulo: 'Temperatura da superfície', valor: '-200 °C' }
      ],
      curiosidades: [
        'Mimas é famosa pela cratera Herschel — uma cicatriz tão grande que se fosse mais profunda, teria destroçado Mimas completamente.',
        'A cratera Herschel cobre 35% do diâmetro de Mimas — é como você ter uma marca de impacto do tamanho da sua cabeça.',
        'A ressonância orbital de Mimas com Saturno cria uma lacuna nos anéis do planeta — um farol gravitacional.',
        'Mimas é tão pequena que você poderia escapar saltando — sua gravidade é apenas 0,0003 de uma "g" terrestre.'
      ],
      comparacoes: [
        'Mimas é menor que o estado de São Paulo — apenas 397 km de diâmetro.',
        'Um avião levaria 20 horas para voar em volta de Mimas a 800 km/h.'
      ],
      avancado: {
        composicao: 'Gelo de água (primário), possível núcleo rochoso pequeno.',
        temperatura: 'Superfície: estimada -200 °C.',
        missoes: ['Cassini-Huygens (2004–2017)', 'Dragonfly (2027–planejado)'],
        texto: 'Mimas é lua pequena (R = 198 km), membro família saturnina interna. Órbita ressonância 2:1 com Enceladus cria lacuna Cassini em anéis. Superfície dominada por cratera Herschel 139 km diâmetro (~10 km profundidade) — impacto antigo que quase o destruiu. Densidade 1,15 g/cm³ (gelo puro). Geologia congelada; sem atividade tectônica. Albedo 0,51 (brilhante). Apelido "Morte Negra" (Star Wars) por aparência.'
      }
    }
  },
  {
    id: 'reia',
    nome: 'Reia',
    tipo: 'lua',
    pai: 'saturno',
    raioKm: 764.3,
    distanciaMediaKm: 527108,
    periodoOrbitalDias: 4.518,
    periodoRotacaoHoras: 108.4,
    excentricidade: 0.0012,
    inclinacaoOrbitaGraus: 0.35,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 120,
    aparencia: {
      tipo: 'lua',
      cores: ['#a9a9a9', '#808080', '#696969'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Reia é a segunda maior lua de Saturno, coberta de crateras que mostram sua idade avançada. Sua superfície indica uma história de impactos antigos. Reia pode ter um anel fraco — o único satélite além de Saturno com anéis.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.529 km' },
        { rotulo: 'Distância de Saturno', valor: '527.108 km' },
        { rotulo: 'Período orbital', valor: '4,518 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-173 °C' },
        { rotulo: 'Composição', valor: 'Gelo, rocha' },
        { rotulo: 'Possível anel', valor: 'Detectado 2023 (proposto)' }
      ],
      curiosidades: [
        'Reia é tão grande que é 4 vezes maior que Marte — uma lua verdadeiramente colossal.',
        'Reia pode ter um anel próprio — seria o único satélite além de Saturno/Júpiter com anéis detectado até agora.',
        'A superfície de Reia mostra dois tipos de terreno: craqueado antigo e áreas mais suaves, sugerindo atividade geológica passada.',
        'Reia está longe o bastante que pode nunca ter sido visitada por sonda espacial em close-up.'
      ],
      comparacoes: [
        'Reia é metade do tamanho de Titã, mas maior que a Lua da Terra.',
        'Um avião levaria 63 horas para voar em volta de Reia a 800 km/h.'
      ],
      avancado: {
        composicao: 'Gelo de água (primário), rocha silicática, possível núcleo rochoso.',
        temperatura: 'Superfície: estimada -173 °C.',
        missoes: ['Cassini-Huygens (2004–2017)'],
        texto: 'Reia é lua grande (R = 764 km), 2ª maior saturnina. Órbita circular 4,518 dias. Superfície craterizada muito; regões terreno tipo (Yin-Yang boundary). Composição gelo+rocha. Densidade 1,24 g/cm³. Possível anel tênue detectado 2023 análise Cassini (poeira/detritos). Sem atividade geológica aparente. Albedo 0,35.'
      }
    }
  },
  {
    id: 'japeto',
    nome: 'Japeto',
    tipo: 'lua',
    pai: 'saturno',
    raioKm: 734.5,
    distanciaMediaKm: 3560820,
    periodoOrbitalDias: 79.33,
    periodoRotacaoHoras: 1904,
    excentricidade: 0.0283,
    inclinacaoOrbitaGraus: 27.47,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 200,
    aparencia: {
      tipo: 'lua',
      cores: ['#4a4a4a', '#2f2f2f', '#ffffff'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Japeto é uma lua extraordinária de Saturno — um lado é negro como carvão, o outro branco como neve. Uma cordilheira equatorial de 20 km de altura corre por seu meio, criando um padrão de "noz" único no sistema solar.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.469 km' },
        { rotulo: 'Distância de Saturno', valor: '3.560.820 km (distante!)' },
        { rotulo: 'Período orbital', valor: '79,33 dias' },
        { rotulo: 'Cordilheira equatorial', valor: '20 km de altura' },
        { rotulo: 'Temperatura da superfície', valor: '-180 °C' },
        { rotulo: 'Contraste de cores', valor: 'Lado negro vs branco extremo' }
      ],
      curiosidades: [
        'Japeto tem uma divisão dramática de cores — meio lado é escuro (albedo 0,04), meio lado é brilhante (albedo 0,5).',
        'A cordilheira equatorial de Japeto tem 20 km de altura — seria como os Alpes mas na linha do equador.',
        'O contraste visual de Japeto é único no sistema solar — parece literalmente como um "yin-yang" cósmico.',
        'Japeto está tão distante de Saturno que o planeta ocupa apenas um ponto de luz no céu.'
      ],
      comparacoes: [
        'Japeto é do tamanho da Califórnia — um objeto colossal em forma de noz.',
        'Um avião levaria 61 horas para voar em volta de Japeto a 800 km/h.'
      ],
      avancado: {
        composicao: 'Gelo de água (primário), possível matéria escura carbonácea importada, rocha.',
        temperatura: 'Superfície: estimada -180 °C.',
        missoes: ['Cassini-Huygens (2004–2017)'],
        texto: 'Iapetus (Japeto) é lua saturnina (R = 735 km), órbita excêntrica inclinada 27,47° (anômala vs outras luas). Característica única: contraste de cores extremo. Lado líder (em direção de órbita) escuro (albedo ~0,04, "Cassini Regio"); lado posterior brilhante (albedo ~0,5, "Roncevaux Terra"). Causa proposta: captura de poeira escura carbonácea (sem aquecimento, deposição seletiva). Cordilheira equatorial proeminente 20 km altitude; origem debatida (impacto antigo vs resfriamento diferencial).'
      }
    }
  },
  {
    id: 'urano',
    nome: 'Urano',
    tipo: 'planeta',
    pai: 'sol',
    ordemDoSol: 7,
    raioKm: 25362,
    distanciaMediaKm: 2873.46e6,
    periodoOrbitalDias: 30687,
    periodoRotacaoHoras: -17.24,
    excentricidade: 0.047,
    inclinacaoOrbitaGraus: 0.773,
    inclinacaoEixoGraus: 97.77,
    retrogrado: false,
    anguloInicialGraus: 228,
    aparencia: {
      tipo: 'gelado',
      cores: ['#4a9fd8', '#3a7fb8', '#2a6fa0'],
      detalhes: {}
    },
    aneis: {
      raioInternoFator: 2,
      raioExternoFator: 2.4,
      cores: ['#c0c0c0', '#808080'],
      opacidade: 0.25
    },
    info: {
      resumo: 'Urano é um planeta gelado azul que gira deitado — seu eixo aponta quase diretamente ao Sol. É o terceiro maior planeta e rola como uma bola no espaço. Sua atmosfera é fria e tem poucos traços visíveis.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '50.724 km (4 Terras)' },
        { rotulo: 'Distância do Sol', valor: '2.873,5 milhões km' },
        { rotulo: 'Duração do ano', valor: '84 anos' },
        { rotulo: 'Duração do dia', valor: '-17,24 horas (retrógrado)' },
        { rotulo: 'Temperatura do topo das nuvens', valor: '-224 °C' },
        { rotulo: 'Luas', valor: '27+ (Titania, Obéron, Miranda...)' }
      ],
      curiosidades: [
        'Urano gira de lado — seu eixo está inclinado 97,77 graus, quase horizontal! Provavelmente colidiu com outro corpo durante sua formação.',
        'Uma estação em Urano dura 21 anos terrestres (1/4 de seu ano de 84 anos) — imagina um verão de duas décadas!',
        'Urano é um planeta "pacífico" — a visível quantidade de atividade atmosférica é mínima comparada a Júpiter e Saturno.',
        'Urano tem um anel muito fraco e tênue, descoberto apenas em 1977 por ocultação estelar.',
        'Urano está tão longe que a luz do Sol leva 2,7 horas para chegar até lá — quando você observa Urano, vê como ele era 2,7 horas atrás.',
        'Urano e seus satélites formam um sistema onde quase todas as luas orbitam paralelas ao equador do planeta — diferente da maioria dos sistemas planetários.'
      ],
      comparacoes: [
        'Urano é 14 vezes mais massivo que a Terra — caberiam 63 Terras dentro dele.',
        'A luz do Sol leva 2 horas e 40 minutos para chegar a Urano — ele vive numa meia-escuridão.',
        'Se o Sol fosse uma lâmpada, Urano seria como um apartamento a 50 metros de distância com apenas a luz difusa.'
      ],
      avancado: {
        composicao: 'Gelos (H₂O, NH₃, CH₄), hidrogênio molecular, hélio, traços de metano (dá cor azul), núcleo rochoso ~20 M⊕.',
        temperatura: 'Topo das nuvens: -224 °C; núcleo: estimado ~4.200 K.',
        missoes: ['Voyager 2 (1986)', 'Prevista: Ariel (ESA 2030s, proposto)', 'Ice Giants Probe (NASA concept)'],
        texto: 'Urano é o 3º gigante gelado, ~14,5 M⊕. Formou-se além de linha gelo ~4,5 Ga, migração dinâmica Grande Tack pode ter alterado órbita. Inclinação axial extrema (97,77°) sugerida por colisão corpo de massa parecida com a da Terra durante formação. Rotação retrógrada -17,24h. Campo magnético inclinado 59° a eixo rotacional, ~0,23 G. Anéis fracos (ε, δ, γ, η, β, ζ, χ, ψ, φ, σ, π anel discovery). Luas: Miranda (geologia caótica), Ariel, Umbriel, Titânia, Obéron.'
      }
    }
  },
  {
    id: 'titania',
    nome: 'Titânia',
    tipo: 'lua',
    pai: 'urano',
    raioKm: 788.4,
    distanciaMediaKm: 435910,
    periodoOrbitalDias: 8.7,
    periodoRotacaoHoras: 208,
    excentricidade: 0.0011,
    inclinacaoOrbitaGraus: 0.10,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 120,
    aparencia: {
      tipo: 'lua',
      cores: ['#8b7355', '#a0907d', '#696969'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Titânia é a maior lua de Urano, coberta de crateras que conto uma história antiga de bombardeio. Tem vales profundos e falhas tectônicas, sugerindo atividade interna passada. É tão distante que luz do Sol é fraca.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.577 km' },
        { rotulo: 'Distância de Urano', valor: '435.910 km' },
        { rotulo: 'Período orbital', valor: '8,7 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-233 °C' },
        { rotulo: 'Composição', valor: 'Gelo de água, rocha' },
        { rotulo: 'Tipo de superfície', valor: 'Craqueada, vales' }
      ],
      curiosidades: [
        'Titânia tem feições geológicas que sugerem atividade tectônica passada — vales e falhas indicam contração/expansão do interior.',
        'Titânia é o 8º satélite maior do sistema solar, ligeiramente menor que a Lua da Terra.',
        'As crateras em Titânia são muito espaçadas — sua superfície é jovem e foi modificada por processos geológicos.',
        'Titânia recebe tão pouca luz solar que a iluminação é 900 vezes mais fraca que na Terra no meio-dia.'
      ],
      avancado: {
        composicao: 'Gelo de água (crosta), rocha silicática (manto), possível oceano subsuperficial.',
        temperatura: 'Superfície: estimada -233 °C; possível oceano (especulativo): -50 a -10 °C.',
        missoes: ['Voyager 2 (1986)', 'Prevista: Ariel (ESA 2030s, proposto)'],
        texto: 'Titânia é a maior lua de Urano (R = 788 km), maior 8º satélite do sistema solar. Crosta gelo H₂O, manto rochoso. Superfície mostrar craterizado: crateras múltiplas, vales lineares (Belmont Chasma, Rima Belinda), falhas tectônicas sugerem resfriamento global. Sem imagens de close-up pós-Voyager 2 (1986). Possível oceano subsuperficial especulativo, mas sem aquecimento tidal significativo. Densidade 1,71 g/cm³.'
      }
    }
  },
  {
    id: 'miranda',
    nome: 'Miranda',
    tipo: 'lua',
    pai: 'urano',
    raioKm: 235.8,
    distanciaMediaKm: 129390,
    periodoOrbitalDias: 1.413,
    periodoRotacaoHoras: 33.9,
    excentricidade: 0.0013,
    inclinacaoOrbitaGraus: 4.22,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 75,
    aparencia: {
      tipo: 'lua',
      cores: ['#696969', '#4a4a4a', '#2f2f2f'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Miranda é uma das luas mais bizarras do sistema solar — sua superfície é um caos de escarpas íngremes, vales profundos e diferentes tipos de terreno. Parece ter sido destroçada e remontada. É uma maravilha geológica.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '472 km' },
        { rotulo: 'Distância de Urano', valor: '129.390 km' },
        { rotulo: 'Período orbital', valor: '1,413 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-187 °C' },
        { rotulo: 'Composição', valor: 'Gelo com rocha incorporada' },
        { rotulo: 'Feição notável', valor: 'Chasma Verona (10 km funda)' }
      ],
      curiosidades: [
        'Miranda tem algumas das escarpas mais íngremes do sistema solar — alguns penhascos têm 10 km de altura!',
        'A geologia caótica de Miranda sugere que ela foi destroçada por um impacto maciço e depois se remontou — é um asteroide reconstituído.',
        'Miranda tem três tipos de terreno completamente diferentes lado a lado: craqueado, estriado e em terraços.',
        'Um humano em Miranda pularia 100 metros em um salto normal — a gravidade é tão fraca quanto um asteroide pequeno.'
      ],
      avancado: {
        composicao: 'Gelo de água (primário), rocha silicática embutida, composição similar a asteroides C.',
        temperatura: 'Superfície: estimada -187 °C.',
        missoes: ['Voyager 2 (1986)', 'Prevista: Ariel (ESA 2030s, proposto)'],
        texto: 'Miranda é a lua mais interna de Urano (R = 236 km), mais pequena que Titânia. Geologia extremamente caótica: terrenos de 3 tipos (Dunsinane, Sicilia, Fer-Tellus Regiones; Chasma Verona ~10 km fundo). Teoria: colidir massiço ~4 Ga com múltiplos fragmentos, reassembly gravitacional criou mosaico. Densidade ~1,2 g/cm³ (alto gelo/baixo rocha ratio). Ressonância orbital 3:1 com Umbriel pode ter excitado tidal aquecimento antigo.'
      }
    }
  },
  {
    id: 'ariel',
    nome: 'Ariel',
    tipo: 'lua',
    pai: 'urano',
    raioKm: 578.8,
    distanciaMediaKm: 191020,
    periodoOrbitalDias: 2.520,
    periodoRotacaoHoras: 60.5,
    excentricidade: 0.0012,
    inclinacaoOrbitaGraus: 0.31,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 160,
    aparencia: {
      tipo: 'lua',
      cores: ['#8b8b8b', '#696969', '#4a4a4a'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Ariel é uma das maiores luas de Urano, com uma superfície muito jovem em lugares — algumas regiões podem ter sofrido atividade geológica recente. Possui grandes vales e cânions que cortam sua crosta gelada.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.158 km' },
        { rotulo: 'Distância de Urano', valor: '191.020 km' },
        { rotulo: 'Período orbital', valor: '2,520 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-213 °C' },
        { rotulo: 'Tipo de superfície', valor: 'Craqueada, vales profundos' },
        { rotulo: 'Composição', valor: 'Gelo de água, rocha' }
      ],
      curiosidades: [
        'Ariel tem alguns dos vales mais profundos observados em satélites gelados — sistemas de falhas que cruzam o planeta todo.',
        'A superfície jovem de Ariel em lugares sugere atividade tectônica passada — talvez aquecimento tidal antigo.',
        'Ariel é menor que a Lua, mas sua atividade geológica a torna mais interessante que a maioria dos satélites.',
        'O nome Ariel vem de "A Tempestade" de Shakespeare, como todas as luas de Urano.'
      ],
      comparacoes: [
        'Ariel é do tamanho da Córsega — uma ilha cósmica de gelo.',
        'Um avião levaria 48 horas para voar em volta de Ariel a 800 km/h.'
      ],
      avancado: {
        composicao: 'Gelo de água, rocha silicática, possível oceano subsuperficial.',
        temperatura: 'Superfície: estimada -213 °C; possível oceano (especulativo): -50 a -10 °C.',
        missoes: ['Voyager 2 (1986)'],
        texto: 'Ariel é lua uraniana (R = 579 km). Superfície craterizada com padrão sistema extensional falhas/vales indicando passado tectônico. Canyon Kachina Vallis ~2000 km comprimento. Terreno jovem em regiões (< alguns Ga de idade). Possível oceano subsuperficial aquecimento tidal passado. Densidade 1,66 g/cm³. Albedo 0,40.'
      }
    }
  },
  {
    id: 'umbriel',
    nome: 'Umbriel',
    tipo: 'lua',
    pai: 'urano',
    raioKm: 584.7,
    distanciaMediaKm: 266300,
    periodoOrbitalDias: 4.144,
    periodoRotacaoHoras: 99.5,
    excentricidade: 0.0039,
    inclinacaoOrbitaGraus: 0.36,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 250,
    aparencia: {
      tipo: 'lua',
      cores: ['#4a4a4a', '#2f2f2f', '#1a1a1a'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Umbriel é a lua mais escura de Urano, aparentando ser um mundo antigo e inerte. Sua superfície é pouco diferenciada, sem as variedades de terreno vistas em outras luas. Seu nome vem de um personagem macabro da mitologia.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.170 km' },
        { rotulo: 'Distância de Urano', valor: '266.300 km' },
        { rotulo: 'Período orbital', valor: '4,144 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-210 °C' },
        { rotulo: 'Albedo', valor: '0,18 (muito escura!)' },
        { rotulo: 'Feições notáveis', valor: 'Pouquíssimas variações de terreno' }
      ],
      curiosidades: [
        'Umbriel é a lua mais escura do sistema solar — seu albedo é de apenas 0,18, tão escura quanto a superfície de Plutão.',
        'Umbriel aparenta ser geologicamente inerte — nenhuma evidência de atividade geológica recente como em Ariel.',
        'O contraste entre a escuridade de Umbriel e o brilho de Ariel é dramático — orbitam o mesmo planeta!',
        'Umbriel foi descoberto em 1787 mas permanece um dos satélites menos estudados do sistema solar.'
      ],
      comparacoes: [
        'Umbriel é do tamanho da Sicília — maior que a Lua, mas menor que Titã.',
        'Um avião levaria 49 horas para voar em volta de Umbriel a 800 km/h.'
      ],
      avancado: {
        composicao: 'Gelo de água, rocha silicática, material escuro (origem desconhecida).',
        temperatura: 'Superfície: estimada -210 °C.',
        missoes: ['Voyager 2 (1986)'],
        texto: 'Umbriel é lua uraniana (R = 585 km), satélite mais escuro sistema solar (albedo 0,18). Superfície old, craterizada, ausência feições tectônicas — estável. Composição similar a Ariel. Sem evidência atividade recente. Possível oceano subsuperficial especulativo. Densidade 1,39 g/cm³.'
      }
    }
  },
  {
    id: 'oberon',
    nome: 'Oberon',
    tipo: 'lua',
    pai: 'urano',
    raioKm: 761.4,
    distanciaMediaKm: 583520,
    periodoOrbitalDias: 13.463,
    periodoRotacaoHoras: 323.1,
    excentricidade: 0.0008,
    inclinacaoOrbitaGraus: 0.10,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 310,
    aparencia: {
      tipo: 'lua',
      cores: ['#8b7d6b', '#696159', '#4a4238'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Oberon é a segunda maior lua de Urano, coberta de crateras antigas que narram uma história de impactos passados. Sua superfície está craqueada mas congelada. Tem o aspecto de um mundo muito antigo e inerte no confim do sistema solar.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.523 km' },
        { rotulo: 'Distância de Urano', valor: '583.520 km' },
        { rotulo: 'Período orbital', valor: '13,463 dias' },
        { rotulo: 'Temperatura da superfície', valor: '-227 °C' },
        { rotulo: 'Composição', valor: 'Gelo, rocha' },
        { rotulo: 'Idade da superfície', valor: '>3,5 bilhões de anos' }
      ],
      curiosidades: [
        'Oberon é o satélite mais externo de Urano — é praticamente o guardião da borda do sistema uraniano.',
        'Oberon é maior que a Lua, mas sua superfície é muito menos estudada — apenas Voyager 2 o observou de perto.',
        'Os vulcões de gelo em Oberon sugerem que houve atividade geológica no passado distante.',
        'Oberon permanece congelado em escuridão — sua temperatura média é uma das mais frias do sistema solar.'
      ],
      comparacoes: [
        'Oberon é do tamanho de São Paulo — uma lua verdadeiramente grande.',
        'Um avião levaria 63 horas para voar em volta de Oberon a 800 km/h.'
      ],
      avancado: {
        composicao: 'Gelo de água, rocha silicática, possível vulcões de gelo (antigos).',
        temperatura: 'Superfície: estimada -227 °C; possível oceano (especulativo): -50 a -20 °C.',
        missoes: ['Voyager 2 (1986)'],
        texto: 'Oberon é lua uraniana (R = 761 km), 2ª maior saturnina. Superfície craterizada muito, indicando idade avançada (>3,5 Ga). Evidência possível criovulcanismo antigo (estruturas cone-like). Estruturas tectônicas limitadas. Albedo 0,34. Densidade 1,63 g/cm³. Possível oceano subsuperficial especulativo aquecimento radioativo.'
      }
    }
  },
  {
    id: 'netuno',
    nome: 'Netuno',
    tipo: 'planeta',
    pai: 'sol',
    ordemDoSol: 8,
    raioKm: 24622,
    distanciaMediaKm: 4495.1e6,
    periodoOrbitalDias: 60266,
    periodoRotacaoHoras: 16.1,
    excentricidade: 0.0113,
    inclinacaoOrbitaGraus: 1.77,
    inclinacaoEixoGraus: 28.32,
    retrogrado: false,
    anguloInicialGraus: 310,
    aparencia: {
      tipo: 'gelado',
      cores: ['#3a5fc8', '#1a4fa0', '#0a3f88'],
      detalhes: {}
    },
    aneis: null,
    info: {
      resumo: 'Netuno é o planeta mais distante do Sol, um gigante gelado azul profundo que vive em perpétua escuridão. Tem os ventos mais violentos do sistema solar apesar de receber tão pouca energia solar. É uma esfera de mistério e beleza.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '49.244 km (4 Terras)' },
        { rotulo: 'Distância do Sol', valor: '4.495,1 milhões km' },
        { rotulo: 'Duração do ano', valor: '165 anos' },
        { rotulo: 'Duração do dia', valor: '16,1 horas' },
        { rotulo: 'Temperatura do topo das nuvens', valor: '-220 °C' },
        { rotulo: 'Velocidade de ventos', valor: 'até 2.400 km/h' }
      ],
      curiosidades: [
        'Netuno é azul profundo porque sua atmosfera de metano absorve luz vermelha e reflete azul — como um oceano cósmico.',
        'Netuno tem os ventos mais rápidos do sistema solar, superiores a 2.400 km/h (Mach 2), mais rápido que o som!',
        'Netuno irradia mais calor do que recebe do Sol — como Júpiter, tem um calor interno residual.',
        'A Mancha Escura Grande de Netuno, um furacão gigante, desapareceu entre 1994 e 1998 — atmosfera dinâmica extrema.',
        'Netuno tem os ventos mais rápidos de qualquer planeta conhecido — a 2.400 km/h, foram detectados em direções opostas em diferentes latitudes do planeta.',
        'Netuno leva 165 anos terrestres para dar uma volta ao redor do Sol — desde sua descoberta em 1846, completou apenas 1,1 volta!'
      ],
      comparacoes: [
        'Netuno é 17 vezes mais massivo que a Terra — caberiam 57 Terras dentro dele.',
        'A luz do Sol leva 4 horas e 10 minutos para chegar a Netuno — você verá o Sol como era há 4 horas.',
        'Netuno está a 30 vezes mais longe do Sol que a Terra — viagem em velocidade de avião levaria 700 anos.'
      ],
      avancado: {
        composicao: 'Gelos (H₂O, NH₃, CH₄), hidrogênio molecular, hélio, traços de metano, núcleo rochoso ~20 M⊕.',
        temperatura: 'Topo das nuvens: -220 °C; núcleo: estimado ~4.000-5.000 K.',
        missoes: ['Voyager 2 (1989)', 'Prevista: Ice Giants Probe (NASA concept), ESA Clipper'],
        texto: 'Netuno é o 4º gigante gelado, ~17 M⊕. Descoberto 1846 por perturbações gravitacionais em Urano (cálculo Urbain Le Verrier). Migração Grande Tack pode ter deslocado-o além de Plutão durante formação. Campo magnético inclinado 47° a eixo rotacional, ~0,27 G. Atmosfera dinâmica com ventos >2400 km/h, plumas de nuvem, Grande Mancha Escura transiente. Luas: Tritão (retrógrada, criovulcânica), Proteu, outros. Anéis finos (Adams, Le Verrier, Galle).'
      }
    }
  },
  {
    id: 'tritao',
    nome: 'Tritão',
    tipo: 'lua',
    pai: 'netuno',
    raioKm: 1353.4,
    distanciaMediaKm: 354759,
    periodoOrbitalDias: -5.877,
    periodoRotacaoHoras: 141.1,
    excentricidade: 0.000016,
    inclinacaoOrbitaGraus: 156.86,
    inclinacaoEixoGraus: 0,
    retrogrado: true,
    anguloInicialGraus: 180,
    aparencia: {
      tipo: 'gelado',
      cores: ['#e8c8c8', '#d8a8a8', '#c88888'],
      detalhes: { crateras: false }
    },
    aneis: null,
    info: {
      resumo: 'Tritão é a maior lua de Netuno e uma raridade — sua órbita é retrógrada, sugerindo que era um objeto capturado. Sua superfície gelada tem geisers de nitrogênio em erupção contínua. É o lugar mais dinamicamente ativo além de Io.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '2.707 km' },
        { rotulo: 'Distância de Netuno', valor: '354.759 km' },
        { rotulo: 'Período orbital', valor: '-5,877 dias (retrógrado!)' },
        { rotulo: 'Temperatura de superfície', valor: '-235 °C' },
        { rotulo: 'Velocidade de geisers', valor: 'até 8 km/s' },
        { rotulo: 'Órbita', valor: 'Decaimento mareal → colisão em 3,6 bilhões de anos' }
      ],
      curiosidades: [
        'Tritão orbita Netuno de trás para frente (retrógrada) — é definitivamente um objeto capturado de Kuiper Belt.',
        'Tritão tem geisers de nitrogênio que ejetam material até 8 km para cima — o nitrogênio é destilado da crosta.',
        'Tritão está caindo em direção a Netuno a 4,5 cm por ano — em alguns bilhões de anos, será destruído pelas marés.',
        'Apesar de estar mais frio que qualquer outro corpo visitado pelas sondas espaciais, Tritão tem atividade geológica activa!',
        'Tritão é capaz de ter geisers porque tem nitrogênio congelado na superfície que aquece quando o Sol bate, liberando gás em jatos — é um fog gelado cósmico!',
        'Apesar de estar 30 vezes mais longe do Sol que a Terra, Tritão consegue produzir geisers — prova de processos geológicos ativos nos extremos do sistema solar.'
      ],
      avancado: {
        composicao: 'Gelo de nitrogênio, gelo de água, gelo de metano, rocha silicática, possível oceano subsuperficial.',
        temperatura: 'Superfície: ~-235 °C; geisers de nitrogênio: até -30 °C (relativa superfície); possível oceano: especulativo.',
        missoes: ['Voyager 2 (1989)', 'Prevista: Ice Giants Probe (NASA concept)'],
        texto: 'Tritão é a maior lua de Netuno (R = 1353 km), 7º satélite maior do sistema solar. Órbita retrógrada inclinada 156,86° indica captura objeto primordial Kuiper Belt ~3,8 Ga. Crosta de gelo N₂/H₂O/CH₄, mantle rochoso. Geyseres criogênicas de N₂ ejetam a 8 km/s, criovulcanismo. Superfície jovem, crateres raros. Possível oceano subsuperficial H₂O-NH₃ profundo 200-300 km. Decaimento marial ~4,5 cm/ano: Tritão colidirá Netuno em ~3,6 Ga, formando Saturno-como anéis.'
      }
    }
  },
  {
    id: 'cinturao-asteroides',
    nome: 'Cinturão de Asteroides',
    tipo: 'cinturao',
    pai: 'sol',
    raioKm: null,
    distanciaMediaKm: 412.5e6,
    periodoOrbitalDias: 1682,
    excentricidade: 0.15,
    inclinacaoOrbitaGraus: 10,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 0,
    raioInternoKm: 328.84e6,
    raioExternoKm: 492.6e6,
    aparencia: {
      tipo: 'cinturao',
      cores: ['#8b7355', '#a0907d', '#6b6b6b']
    },
    aneis: null,
    info: {
      resumo: 'O Cinturão de Asteroides é uma região entre Marte e Júpiter repleta de pequenos corpos rochosos e gelados. Não é um entulho de planeta destruído, mas remanescentes da formação inicial do sistema solar. Contém bilhões de asteroides.',
      numeros: [
        { rotulo: 'Raio interno', valor: '2,2 UA (328,8 milhões km)' },
        { rotulo: 'Raio externo', valor: '3,3 UA (492,6 milhões km)' },
        { rotulo: 'Espessura vertical', valor: '~0,5 UA (~75 milhões km)' },
        { rotulo: 'Número de asteroides', valor: '>6 milhões (diâmetro >100 m)' },
        { rotulo: 'Massa total', valor: '~4% da massa da Lua' },
        { rotulo: 'Asteroides numerados', valor: '>1 milhão' }
      ],
      curiosidades: [
        'Apesar de sua fama, o Cinturão de Asteroides é principalmente vazio — as espaçamentos entre asteroides são enormes.',
        'Se embalássemos todos os asteroides num planeta único, teria apenas ~950 km de diâmetro — menos que a Lua.',
        'Asteroides no Cinturão têm composição variada: silicatos (tipo S), carbonáceos (tipo C), metálicos (tipo M).',
        'Muitos asteroides têm órbitas ressonantes com Júpiter que as ejetam, criando as "lacunas de Kirkwood".'
      ],
      avancado: {
        composicao: 'Asteroides de tipo C (~75%, condritas carbonáceas), tipo S (~17%, silicatos), tipo M (~8%, metálicos), traços de água/gelo.',
        temperatura: 'Média estimada -100 a -200 °C dependendo da distância solar e albedo.',
        missoes: ['Dawn (Ceres 2015–2018)', 'Hayabusa2 (Ryugu 2018–2020)', 'OSIRIS-REx (Bennu 2018–2023)', 'Lucy (Troianos, 2021–2033)'],
        texto: 'O Cinturão de Asteroides orbita entre 2,2-3,3 UA, resíduo planetesimal não-acretado durante formação (hipótese Grand Tack). Ressonância orbital 2:1 e 3:1 com Júpiter ejetar planetesimais, deixando lacunas (Kirkwood). Composição variada: condritas C (H₂O+materiais voláteis), silicatos S (olivina/piroxênio), metálicos (Fe-Ni). Ceres maior objeto (913 km diâmetro). Distribuição de tamanho segue power-law Dohnanyi. Colisões frequentes produzem asteroides família. Idade ~4,55 Ga, alguns asteroides primitivos com idade meteorítica solar.'
      }
    }
  },
  {
    id: 'vesta',
    nome: 'Vesta',
    tipo: 'asteroide',
    pai: 'sol',
    raioKm: 263.3,
    distanciaMediaKm: 383.22e6,
    periodoOrbitalDias: 1325.4,
    excentricidade: 0.0889,
    inclinacaoOrbitaGraus: 7.133,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 60,
    aparencia: {
      tipo: 'rochoso',
      cores: ['#8b6f47', '#a0907d', '#696969'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Vesta é o segundo asteroide maior do cinturão de asteroides e o mais brilhante — é o único visível a olho nu. Tem uma cratera gigante no seu polo sul que quase o destruiu. Sua superfície conta a história antiga de colisões.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '527 km' },
        { rotulo: 'Distância do Sol', valor: '383,2 milhões km (2,56 UA)' },
        { rotulo: 'Período orbital', valor: '3,63 anos' },
        { rotulo: 'Magnitude visual', valor: '+3,2 a +8,5 (visível olho nu!)' },
        { rotulo: 'Composição', valor: 'Basalto, olivina, piroxênio' },
        { rotulo: 'Massa', valor: '~2,59 × 10²⁰ kg' }
      ],
      curiosidades: [
        'Vesta é o único asteroide do cinturão de asteroides visível a olho nu da Terra em condições ideais — é tão brilho!',
        'Vesta tem uma cratera gigante (Rheasilvia) no seu polo sul com 500 km de diâmetro — quase tão grande quanto Vesta inteira!',
        'Vesta é a origem dos meteoritos HED (howardites, eucrites, diogenites) — seus fragmentos caem na Terra.',
        'A sonda Dawn encontrou prova de criovulcanismo antigo em Vesta — resquícios de uma época molten.'
      ],
      avancado: {
        composicao: 'Basalto vulcânico primário (olivina/piroxênio), cortex diferenciado, núcleo metálico pequeno.',
        temperatura: 'Superfície: média estimada -100 a -150 °C (depende posição solar).',
        missoes: ['Dawn (2011–2012)', 'Apophis (ESA/JAXA, voo próximo 2029)'],
        texto: 'Vesta é o 2º asteroide maior (R = 263 km), classe V (vulcânico, basalto-howardita). Diferenciação térmica primitiva produziu núcleo metálico, manto basalto, cortex anortosita. Cratera Rheasilvia polo sul 500 km diâmetro (~1 Ga) ejetou hemisfério massa — origem família Vesta asteroides ~5-10% cinturão. Albedo alto (0,42). Rotação rápida 3,63 horas (precessão por YORP). Possível origem lunar/marciana contrária — provável acreção próxima a Sun/Júpiter Grande Tack.'
      }
    }
  },
  {
    id: 'palas',
    nome: 'Palas',
    tipo: 'asteroide',
    pai: 'sol',
    raioKm: 272.5,
    distanciaMediaKm: 414.51e6,
    periodoOrbitalDias: 1682.8,
    excentricidade: 0.2309,
    inclinacaoOrbitaGraus: 34.85,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 155,
    aparencia: {
      tipo: 'rochoso',
      cores: ['#696969', '#4a4a4a', '#2f2f2f'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Palas é o terceiro asteroide maior e tem uma órbita muito inclinada e excêntrica — é um revolucionário no cinturão. Sua composição carbonácea sugere origem distante, possivelmente capturada de Cinturão de Kuiper primitivo.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '545 km' },
        { rotulo: 'Distância do Sol', valor: '414,5 milhões km (2,77 UA)' },
        { rotulo: 'Período orbital', valor: '4,61 anos' },
        { rotulo: 'Inclinação orbital', valor: '34,85° (muito alta!)' },
        { rotulo: 'Excentricidade', valor: '0,23 (muito excêntrica)' },
        { rotulo: 'Composição', valor: 'Condrita carbonácea' }
      ],
      curiosidades: [
        'Palas tem uma órbita tão inclinada que nunca cruza a órbita de qualquer outro asteroide grande — é solitária.',
        'A órbita excêntrica e inclinada de Palas sugerem que ela foi capturada de uma região distante do sistema solar primitivo.',
        'Palas é principalmente carbonáceo — similar a asteroides do Cinturão de Kuiper, não típico do Cinturão de Asteroides.',
        'Palas nunca foi visitado por sonda espacial, permanecendo um mistério entre os asteroides.'
      ],
      avancado: {
        composicao: 'Condrita carbonácea tipo B/C, silicatos com água, compostos orgânicos, traços de metal.',
        temperatura: 'Superfície: estimada -120 a -180 °C.',
        missoes: ['Possível alvo de missão futura (ESA/JAXA)'],
        texto: 'Palas é o 3º asteroide maior (R = 273 km), classe B (condrita carbonácea). Órbita altamente inclinada (34,85°) e excêntrica (0,2309) sugerem formação in situ distante ou captura. Composição carbonácea atípica ao cinturão sugere origem além de linha neve. Densidade 2,68 g/cm³ indicativa de porosidade alta (~40%). Sem visita close-up; albedo 0,16 (escuro). Possível interior diferenciado aquecimento radiogênico; superfície antiga craterizada.'
      }
    }
  },
  {
    id: 'eros',
    nome: 'Eros',
    tipo: 'asteroide',
    pai: 'sol',
    raioKm: 8.4,
    distanciaMediaKm: 218.5e6,
    periodoOrbitalDias: 643.5,
    periodoRotacaoHoras: 5.27,
    excentricidade: 0.2226,
    inclinacaoOrbitaGraus: 10.83,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 75,
    aparencia: {
      tipo: 'rochoso',
      cores: ['#8b7d6b', '#696159', '#4a4238'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Eros é um asteroide próximo da Terra alongado em forma de batata, famoso por ser visitado pela sonda NEAR-Shoemaker. É um dos asteroides mais bem estudados e está na órbita que se aproxima perigosamente da Terra periodicamente.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '~16,8 km (alongado)' },
        { rotulo: 'Distância do Sol', valor: '218,5 milhões km' },
        { rotulo: 'Período orbital', valor: '1,76 anos' },
        { rotulo: 'Excentricidade', valor: '0,2226 (órbita excêntrica)' },
        { rotulo: 'Distância mínima Terra', valor: '~22,3 milhões km' },
        { rotulo: 'Tipo espectral', valor: 'S (silicato)' }
      ],
      curiosidades: [
        'Eros é um asteroide próximo da Terra (NEA) que se aproxima periodicamente — passará a ~22 milhões km em 2026.',
        'Eros tem forma muito alongada, como uma batata gigante — o resultado de bilhões de anos de colisões.',
        'A sonda NEAR-Shoemaker visitou Eros em 2000-2001, orbitando o asteroide e mapeando sua superfície em detalhes.',
        'Eros tem densidade relativamente baixa (~2,7 g/cm³) — pode ser um amontoado de escombros mantido junto por gravidade fraca.'
      ],
      comparacoes: [
        'Eros é minúsculo — apenas 16,8 km — menor que muitas ilhas da Terra.',
        'A gravidade em Eros é tão fraca que um humano saltaria facilmente para o espaço — é praticamente um asteroide puro.'
      ],
      avancado: {
        composicao: 'Silicatos (tipo S), possível matéria carbonácea, estrutura amontoado de escombros.',
        temperatura: 'Superfície: estimada -70 a -150 °C.',
        missoes: ['NEAR-Shoemaker (2000–2001)', 'Hayabusa (2005, voo próximo)', 'Possível alvo futuro de mineração'],
        texto: 'Eros é NEA (Near-Earth Asteroid), classe S (silicato). Semi-eixo maior 1,458 UA, excentricidade 0,2226, inclinação 10,83°. Forma alongada ~16,8 × 13,4 × 11,2 km resultado colisões. Densidade 2,67 g/cm³, velocidade escape 0,6 m/s. NEAR-Shoemaker (2000-2001): órbita 399 dias, mapeou, finalmente pousou surface. Superfície craqueada, regolito, possível subsuperfície coeso.'
      }
    }
  },
  {
    id: 'bennu',
    nome: 'Bennu',
    tipo: 'asteroide',
    pai: 'sol',
    raioKm: 0.245,
    distanciaMediaKm: 168e6,
    periodoOrbitalDias: 436.6,
    periodoRotacaoHoras: 4.3,
    excentricidade: 0.2037,
    inclinacaoOrbitaGraus: 6.035,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 130,
    aparencia: {
      tipo: 'rochoso',
      cores: ['#4a4a4a', '#2f2f2f', '#1a1a1a'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Bennu é um pequeno asteroide próximo da Terra escuro e misterioso, alvo da missão OSIRIS-REx da NASA. É potencialmente perigoso — existe risco pequeno de colidir com a Terra em 2182. A sonda coletou amostras em 2020.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '~490 metros' },
        { rotulo: 'Distância do Sol', valor: '168 milhões km' },
        { rotulo: 'Período orbital', valor: '1,196 anos' },
        { rotulo: 'Tipo espectral', valor: 'B (carbonáceo)' },
        { rotulo: 'Probabilidade colisão 2182', valor: '1 em 2.700 (muito baixa)' },
        { rotulo: 'Massa estimada', valor: '~73 trilhões de kg' }
      ],
      curiosidades: [
        'Bennu é perigoso — existe pequena chance (1 em 2.700) de colidir com a Terra em 2182, embora seja improvável.',
        'OSIRIS-REx coletou amostra de Bennu em 2020 — a primeira coleta de amostra de asteroide pelos EUA retornou em 2023.',
        'Bennu ejeita material de sua superfície — fenômeno raro em asteroides pequenos chamado outgassing.',
        'Bennu é tão pequeno que tem apenas 490 metros de diâmetro — menor que a altura do Monte Everest.'
      ],
      comparacoes: [
        'Bennu é minúsculo — apenas 490 metros — menor que muitos cânions da Terra.',
        'A gravidade em Bennu é tão fraca que você flutuaria — sua velocidade escape é apenas 0,3 m/s.'
      ],
      avancado: {
        composicao: 'Condrita carbonácea (tipo B), possível água, compostos orgânicos.',
        temperatura: 'Superfície: estimada -80 a -120 °C.',
        missoes: ['OSIRIS-REx (2018–2023, amostras retornadas)', 'Possível futuro de desvio orbital'],
        texto: 'Bennu é NEA, classe B (carbonáceo). Semi-eixo maior 1,126 UA, excentricidade 0,2037, inclinação 6,035°. Diâmetro ~490 m, densidade ~1.190 kg/m³. Forma de pião (spinning top). Outgassing detectado (ejeção de partículas). OSIRIS-REx (2018-2023): órbita, mapeamento, coleta amostras Touchand-Go (TAG), retorno 2023. Composição condrita carbonácea com água/matéria orgânica possível. Risco de impacto 2182 estimado 1/2700.'
      }
    }
  },
  {
    id: 'apofis',
    nome: 'Apófis',
    tipo: 'asteroide',
    pai: 'sol',
    raioKm: 0.185,
    distanciaMediaKm: 149.3e6,
    periodoOrbitalDias: 323.6,
    periodoRotacaoHoras: 30.87,
    excentricidade: 0.1912,
    inclinacaoOrbitaGraus: 3.393,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    // Fase calibrada para a anomalia verdadeira em 13/04/2029 apontar para a
    // Terra do simulador (era 45 arbitrário — Apófis passava longe na data).
    anguloInicialGraus: 2.63,
    // Encontro de 2029 roteirizado: perto da data, a posição kepleriana é
    // atraída até raspar a Terra (ver _aplicarAproximacao em motor3d.js)
    aproximacao: {
      alvo: 'terra',
      dataISO: '2029-04-13',
      janelaDias: 70,
      fatorRaioAlvo: 2.5
    },
    aparencia: {
      tipo: 'rochoso',
      cores: ['#696159', '#4a4238', '#2f2724'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Apófis é o asteroide próximo da Terra mais famoso — é o asteroide potencialmente perigoso mais estudado. Em 2004, inicialmente foi descrito como tendo pequena chance de colidir com a Terra em 2029, mas as observações refinadas eliminaram esse risco — quase por pouco!',
      numeros: [
        { rotulo: 'Diâmetro', valor: '~370 metros' },
        { rotulo: 'Distância do Sol', valor: '149,3 milhões km' },
        { rotulo: 'Período orbital', valor: '0,886 anos' },
        { rotulo: 'Tipo espectral', valor: 'Sq (silicato carbonáceo)' },
        { rotulo: 'Passagem próxima 2029', valor: '~31.600 km (dentro órbita da Lua!)' },
        { rotulo: 'Risco de impacto 2036-2099', valor: 'Praticamente nulo' }
      ],
      curiosidades: [
        'Apófis é o asteroide potencialmente perigoso mais famoso — em 2004, foi a primeira vez que um asteroide recebeu probabilidade Torino Scale > 0.',
        'Apófis passará extremamente perto da Terra em 29 de abril de 2029 — mais perto que alguns satélites de comunicação!',
        'Apófis foi observado intensivamente pelo Telescópio Espacial Chandra para refinar sua órbita — e o risco foi praticamente eliminado.',
        'A passagem de 2029 será um espetáculo astronômico — Apófis será brilhante o bastante para ver a olho nu durante o dia!'
      ],
      comparacoes: [
        'Apófis é ainda menor que Bennu — apenas 370 metros de diâmetro.',
        'Na passagem de 2029, Apófis passará mais perto que satélites de comunicação — um evento raro de perto de asteroide sem colisão.'
      ],
      avancado: {
        composicao: 'Silicato-carbonáceo, compostos orgânicos, possível água, metais.',
        temperatura: 'Superfície: estimada -40 a -80 °C.',
        missoes: ['Múltiplos observatórios (Chandra, Spitzer, radar)', 'RAMSES (2028–2034, ESA/JAXA—desvio orbital demonstração)'],
        texto: 'Apófis é NEA classe Sq (silicato-carbonáceo). Semi-eixo maior 1,099 UA, excentricidade 0,1912, inclinação 3,393°. Diâmetro ~370 m, massa ~7,8 × 10¹⁰ kg. Aproximação 2029: distância ~31.600 km (dentro geosynchronous). Observações Chandra/Spitzer/radar refinaram órbita, eliminaram risco impacto 2029-2099 (probabilidade <1 em 150.000). RAMSES (ESA/JAXA 2028) demonstrará defesa planetária desvio de órbita. Designado Torino Scale value em 2004; reduzido para zero.'
      }
    }
  },
  {
    id: 'plutao',
    nome: 'Plutão',
    tipo: 'planeta-anao',
    pai: 'sol',
    raioKm: 1188.3,
    distanciaMediaKm: 5913.52e6,
    periodoOrbitalDias: 90465,
    periodoRotacaoHoras: -153.3,
    excentricidade: 0.2488,
    inclinacaoOrbitaGraus: 17.16,
    inclinacaoEixoGraus: 119.6,
    retrogrado: false,
    anguloInicialGraus: 280,
    aparencia: {
      tipo: 'gelado',
      cores: ['#c8a8a8', '#a0906d', '#8b8680'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Plutão foi reclassificado de planeta a planeta-anão em 2006, um grande drama científico. Sua superfície é coberta de gelo de metano e nitrogênio. A sonda New Horizons revelou um mundo complexo com montanhas de gelo e vales.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '2.377 km' },
        { rotulo: 'Distância do Sol', valor: '5.913,5 milhões km (39,5 UA)' },
        { rotulo: 'Duração do ano', valor: '248 anos' },
        { rotulo: 'Duração do dia', valor: '-153,3 horas (retrógrado)' },
        { rotulo: 'Temperatura média', valor: '-230 °C' },
        { rotulo: 'Luas', valor: '5 (Caronte, Styx, Nix, Kerberos, Hydra)' }
      ],
      curiosidades: [
        'Plutão foi descoberto em 1930 e foi planeta durante 76 anos — até ser reclassificado em 2006 porque não "limpou sua órbita".',
        'A sonda New Horizons descobriu que Plutão é geologicamente complexo, com montanhas de gelo de água tão altas quanto os Alpes.',
        'Caronte, a maior lua de Plutão, orbita tão perto que o centro de massa está no espaço entre eles — um sistema binário.',
        'Plutão está se afastando do Sol no momento — sua órbita levará ~200 anos para se afastar após seu periélio em 1989.',
        'Plutão tem 5 luas e é menor que nossa Lua — se você estivesse em Plutão e pulasse bem forte, poderia escapar da gravidade dele completamente!',
        'A sonda New Horizons levou 9,5 anos para chegar a Plutão — se fosse um carro em estrada em velocidade de cruzeiro, viajaria a 700.000 km/h durante todo trajeto!'
      ],
      comparacoes: [
        'Plutão é menor que a Lua — caberiam 9 Plutões dentro da Terra.',
        'A luz do Sol leva 5 horas e 30 minutos para chegar a Plutão — você vive numa penumbra permanente.',
        'De avião a 800 km/h, levaria 28 horas para voar em volta do equador de Plutão.'
      ],
      avancado: {
        composicao: 'Gelo de nitrogênio, gelo de metano, gelo de água, rocha silicática, possível oceano subsuperficial.',
        temperatura: 'Superfície: ~-230 °C; possível oceano: especulativo, mas aquecimento radiogênico possível.',
        missoes: ['New Horizons (2015 sobrevoo, dados ainda sendo analisados)', 'Possível orbitador proposto'],
        texto: 'Plutão é planeta-anão, R = 1188 km, descoberto Clyde Tombaugh 1930. Órbita muito inclinada (17,16°) e excêntrica (0,2488), período 248 anos, periélio 1989. Ressonância orbital 3:2 com Netuno aprisionou em região estável (~39 UA). Reclassificação 2006 (não "limpou órbita") gerou debate. New Horizons (2015) revelou geologia complexa: coração Sputnik (N₂/CH₄ gelado, <100 Ma), montanhas gelo H₂O até 3 km altitude, vales, craters. Possível oceano subsuperficial aquecimento radioativo. Caronte (1186 km) sistema binário.'
      }
    }
  },
  {
    id: 'caronte',
    nome: 'Caronte',
    tipo: 'lua',
    pai: 'plutao',
    raioKm: 606,
    distanciaMediaKm: 19595,
    periodoOrbitalDias: 6.387,
    periodoRotacaoHoras: 153.3,
    excentricidade: 0,
    inclinacaoOrbitaGraus: 0,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 0,
    aparencia: {
      tipo: 'gelado',
      cores: ['#a0a0a0', '#808080', '#4a4a4a'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Caronte é a maior lua de Plutão e quase tão grande quanto Plutão — em verdade, orbitam um ao outro. É um sistema binário de corpos gelados que dançam juntos no escuro distante do sistema solar.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.212 km (51% do Plutão)' },
        { rotulo: 'Distância de Plutão', valor: '19.595 km' },
        { rotulo: 'Período orbital', valor: '6,387 dias' },
        { rotulo: 'Tipo de órbita', valor: 'Acoplado mutuamente' },
        { rotulo: 'Temperatura da superfície', valor: '-230 °C' },
        { rotulo: 'Composição', valor: 'Gelo de água, traços de outros gelos' }
      ],
      curiosidades: [
        'Caronte é tão grande em comparação a Plutão que eles orbitam um baricentro comum — um sistema binário verdadeiro, não planeta-lua.',
        'Caronte tem cristas polares escuras — possível criação de metano congelado migrado através da superfície.',
        'Caronte e Plutão mostram acoplamento de marés mútuo — sempre mostram a mesma face um ao outro, como a Lua à Terra.',
        'A descoberta de Caronte em 1978 permitiu aos astrônomos medir pela primeira vez a massa de Plutão com precisão.'
      ],
      avancado: {
        composicao: 'Gelo de água (cortex), rocha silicática, traços de gelo de metano/nitrogênio, possível oceano interior.',
        temperatura: 'Superfície: estimada -230 °C; possível oceano: especulativo.',
        missoes: ['New Horizons (2015 sobrevoo)', 'Possível orbitador ou módulo de pouso futuro'],
        texto: 'Caronte é a maior lua de Plutão (R = 606 km), 4º satélite maior do sistema solar. Razão massa Plutão:Caronte 8,3:1 (cf. Terra:Lua 81:1). Sistema binário verdadeiro: orbitam baricentro comum ~2000 km de Plutão. Acoplamento de marés mútuo sincronizado. Superfície de gelo H₂O com depósitos de gelo nitrogenado, cristas polares escuras (origem desconhecida), possível criovulcanismo antigo. Possível oceano subsuperficial H₂O-NH₃ sustentado por radioatividade (especulativo). New Horizons data indica geologia jovem em regiões (~4 Ma).'
      }
    }
  },
  {
    id: 'ceres',
    nome: 'Ceres',
    tipo: 'planeta-anao',
    pai: 'sol',
    raioKm: 473.3,
    distanciaMediaKm: 414.01e6,
    periodoOrbitalDias: 1681.5,
    periodoRotacaoHoras: 9.08,
    excentricidade: 0.0758,
    inclinacaoOrbitaGraus: 10.59,
    inclinacaoEixoGraus: 4,
    retrogrado: false,
    anguloInicialGraus: 240,
    aparencia: {
      tipo: 'rochoso',
      cores: ['#a0a0a0', '#8b8b8b', '#6b6b6b'],
      detalhes: { crateras: true }
    },
    aneis: null,
    info: {
      resumo: 'Ceres é o planeta-anão maior do Cinturão de Asteroides e constituir quase 1/3 da massa total do cinturão. Sua composição gelada e rochosa e possível oceano interior a tornam fascinante. A sonda Dawn a visitou em detalhes.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '947 km' },
        { rotulo: 'Distância do Sol', valor: '414 milhões km (2,77 UA)' },
        { rotulo: 'Período orbital', valor: '4,60 anos' },
        { rotulo: 'Duração do dia', valor: '9,08 horas' },
        { rotulo: 'Temperatura média', valor: '-38 °C' },
        { rotulo: 'Composição', valor: '~1/3 gelo, ~2/3 rocha' }
      ],
      curiosidades: [
        'Ceres constitui quase 1/3 da massa total do Cinturão de Asteroides — é o gravitacional rei do cinturão.',
        'Ceres tem um oceano subsuperficial global estimado em 200 km de profundidade — mais água que em todos os oceanos terrestres!',
        'Ceres foi inicialmente classificado como planeta, depois asteroide, agora planeta-anão — uma "Cinderela" da classificação planetária.',
        'A cratera Ahuna Montes em Ceres tem 4 km de altura — possível crioeruption criogênica antigo de uma mistura gelo-barro.'
      ],
      avancado: {
        composicao: 'Condritas carbonáceas, gelo de água (20-30% corpo), possível ocean subsuperficial global, núcleo rochoso diferenciado.',
        temperatura: 'Superfície: média -38 °C; possível oceano: estimado -20 a 0 °C.',
        missoes: ['Dawn (2015–2018)', 'Proposta futura de retorno de amostras'],
        texto: 'Ceres é planeta-anão, R = 473 km, maior objeto cinturão asteroides. Classe carbonácea G/Cgh (gelo H₂O primário ~20-30%). Diferenciação térmica produziu núcleo rochoso + camada gelo salmoura subsuperficial global 200 km profundidade (estimado). Possível criovulcanismo antigo (Ahuna Montes 4 km altura) indica aquecimento interior radioativo. Densidade 2,16 g/cm³ consistente modelo gelo+rocha. Dawn revelou superfície craterizada, cratera Kerwan (280 km), depósitos brilhantes (NaCl?). Órbita ressonância 2:1 com Júpiter.'
      }
    }
  },
  {
    id: 'eris',
    nome: 'Éris',
    tipo: 'planeta-anao',
    pai: 'sol',
    raioKm: 1163,
    distanciaMediaKm: 10151.9e6,
    periodoOrbitalDias: 203830,
    periodoRotacaoHoras: 25.9,
    excentricidade: 0.4406,
    inclinacaoOrbitaGraus: 44.04,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 150,
    aparencia: {
      tipo: 'gelado',
      cores: ['#e8d8d8', '#c0a8a8', '#8b7a7a'],
      detalhes: {}
    },
    aneis: null,
    info: {
      resumo: 'Éris é o planeta-anão mais distante e possivelmente mais massivo que Plutão. Sua descoberta em 2005 levou à reclassificação de Plutão de planeta a planeta-anão. Orbita numa região distante de gelo chamada Cinturão de Kuiper.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '2.326 km (ligeiramente menor que Plutão)' },
        { rotulo: 'Distância do Sol', valor: '10.151,9 milhões km (67,9 UA)' },
        { rotulo: 'Período orbital', valor: '558 anos' },
        { rotulo: 'Duração do dia', valor: '25,9 horas' },
        { rotulo: 'Temperatura da superfície', valor: '-240 °C' },
        { rotulo: 'Luas', valor: '1 (Dysnomia)' }
      ],
      curiosidades: [
        'Éris é o planeta-anão mais distante e foi descoberto acidentalmente em dados de 2003, confirmado em 2005.',
        'Éris é mais massivo que Plutão, apesar de ser ligeiramente menor — sua densidade sugere composição diferente.',
        'Éris tem uma lua, Dysnomia, descoberta em 2005 pouco após Éris.',
        'A descoberta de Éris provocou uma crise de identidade planetária — criou o termo "planeta-anão" em 2006.'
      ],
      avancado: {
        composicao: 'Gelo de metano primário, gelo de nitrogênio, gelo de monóxido de carbono, rocha silicática.',
        temperatura: 'Superfície: estimada -240 °C; possível oceano interior: extremamente especulativo.',
        missoes: ['Sem sonda planejada; observação por telescópios infravermelhos'],
        texto: 'Éris é planeta-anão, R = 1163 km, descoberto 2005 (Michael Brown et al. descoberta 2003 dados). Mais massivo que Plutão (~27% mais), densidade 2,52 g/cm³ sugere composição diferente (menos gelo, mais rocha). Órbita muito inclinada (44,04°) e excêntrica (0,4406), período 558 anos, periélio 2257 (próximo). Membro cinturão Kuiper "scattered disk". Gelo superficial metano primário, N₂, CO. Companheira Dysnomia (R ~350 km). Sem close-up imaging; faint aparência visual magnitude ~18.7.'
      }
    }
  },
  {
    id: 'haumea',
    nome: 'Haumea',
    tipo: 'planeta-anao',
    pai: 'sol',
    raioKm: 816,
    distanciaMediaKm: 6452.23e6,
    periodoOrbitalDias: 103774,
    periodoRotacaoHoras: 3.9,
    excentricidade: 0.1944,
    inclinacaoOrbitaGraus: 28.22,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 310,
    aparencia: {
      tipo: 'gelado',
      cores: ['#d8c8c0', '#b8a8a0', '#8b8680'],
      detalhes: {}
    },
    aneis: null,
    info: {
      resumo: 'Haumea é um planeta-anão alongado que gira extremamente rápido — uma revolução a cada 3,9 horas! Sua rotação rápida pode ter criado seu formato alongado de bola de rugby. Tem um sistema de anéis fraco ao seu redor.',
      numeros: [
        { rotulo: 'Diâmetro (elipsoide)', valor: '2.320 × 1.960 × 1.520 km' },
        { rotulo: 'Distância do Sol', valor: '6.452 milhões km (43,1 UA)' },
        { rotulo: 'Período orbital', valor: '284 anos' },
        { rotulo: 'Duração do dia', valor: '3,9 horas (EXTREMAMENTE rápido!)' },
        { rotulo: 'Temperatura da superfície', valor: '-228 °C' },
        { rotulo: 'Luas', valor: '2 (Hi\'iaka, Namaka)' }
      ],
      curiosidades: [
        'Haumea tem a rotação mais rápida de qualquer corpo maior do sistema solar — completa uma rotação a cada 3,9 horas!',
        'A rotação rápida de Haumea a deformou em uma forma alongada tipo bola de rugby — não é esférica como outros planetas-anões.',
        'Haumea tem um sistema de anéis fraco — o único planeta-anão com anéis, além de sua rotação extrema.',
        'Haumea foi nomeada em honra à deusa hawaiana, refletindo a descoberta do Observatório Keck no Havaí.'
      ],
      avancado: {
        composicao: 'Gelo de água cristalino (superfície), gelo de metano, rocha silicática, núcleo rochoso.',
        temperatura: 'Superfície: estimada -228 °C.',
        missoes: ['Sem sonda planejada; observações de telescópios infravermelhos continu'],
        texto: 'Haumea é planeta-anão, elipsoide R(a,b,c)=(960,749,600) km, descoberto 2004. Rotação ultra-rápida 3,915h causa deformação gravity-oblateness extrema. Órbita inclinada 28,22°, excêntrica 0,1944, período 283,8 anos, periélio ~2135. Possível impact ejeção anterior causou família Haumea (fragmentos cinturão Kuiper). Sistema anéis fraco descoberto 2017 (observação occultação). Luas Hi\'iaka (R ~310 km), Namaka (R ~85 km). Superfície gelo H₂O cristalino, métano, CO. Densidade 2,6 g/cm³.'
      }
    }
  },
  {
    id: 'makemake',
    nome: 'Makemake',
    tipo: 'planeta-anao',
    pai: 'sol',
    raioKm: 715,
    distanciaMediaKm: 6850.36e6,
    periodoOrbitalDias: 112823,
    periodoRotacaoHoras: 22.8,
    excentricidade: 0.1589,
    inclinacaoOrbitaGraus: 28.97,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 200,
    aparencia: {
      tipo: 'gelado',
      cores: ['#d8c8b0', '#a8987d', '#808070'],
      detalhes: {}
    },
    aneis: null,
    info: {
      resumo: 'Makemake é o terceiro planeta-anão maior, nomeado pela deidade Rapa Nui (Ilha de Páscoa). Tem uma órbita inclinada e é coberto de gelo de metano. É menos conhecido que Plutão e Éris mas igualmente fascinante.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '1.430 km' },
        { rotulo: 'Distância do Sol', valor: '6.850 milhões km (45,8 UA)' },
        { rotulo: 'Período orbital', valor: '309 anos' },
        { rotulo: 'Duração do dia', valor: '22,8 horas' },
        { rotulo: 'Temperatura da superfície', valor: '-230 °C' },
        { rotulo: 'Luas', valor: 'Possível 1 (S/2015 (136472) 1)' }
      ],
      curiosidades: [
        'Makemake é o terceiro planeta-anão maior em diâmetro, mas menos conhecido que Plutão e Éris.',
        'O nome Makemake vem da mitologia Rapa Nui (Ilha de Páscoa), refletindo sua descoberta em observatórios chilenos.',
        'Makemake mostrou um eclipse estelar em 2011, permitindo aos astrônomos medir seu tamanho e atmosfera pela primeira vez.',
        'Makemake tem uma possível pequena lua, descoberta em 2015, mas ainda não confirmada definitivamente.'
      ],
      avancado: {
        composicao: 'Gelo de metano (primário), gelo de nitrogênio, gelo de etano, traços de outras substâncias voláteis.',
        temperatura: 'Superfície: estimada -230 °C.',
        missoes: ['Sem sonda planejada; observações contínuas de telescópios'],
        texto: 'Makemake é planeta-anão, R = 715 km, descoberto 2005 (Michael Brown et al., confirmado 2007). Terceira ordem em tamanho (após Éris, Plutão), ~4º em massa. Órbita inclinada 28,97°, excêntrica 0,1589, período 309,9 anos, periélio ~2033. Superficie gelo metano (primário), N₂, CH₄, CO. Observação occultação estelar 2011 revelou possível atmosfera tênue/refração? ou sem atmosfera. Companheiro possível S/2015(136472)1 (R~160 km). Densidade 2,08 g/cm³ (gelo-dominado).'
      }
    }
  },
  {
    id: 'cinturao-kuiper',
    nome: 'Cinturão de Kuiper',
    tipo: 'cinturao',
    pai: 'sol',
    raioKm: null,
    distanciaMediaKm: 5977.5e6,
    periodoOrbitalDias: 309000,
    excentricidade: 0.2,
    inclinacaoOrbitaGraus: 1.86,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 270,
    raioInternoKm: 4483.6e6,
    raioExternoKm: 7471.4e6,
    aparencia: {
      tipo: 'cinturao',
      cores: ['#6b7a9a', '#5a6a8a', '#4a5a7a']
    },
    aneis: null,
    info: {
      resumo: 'O Cinturão de Kuiper é uma região vasta de gelo e rocha além de Netuno. Contém milhões de corpos gelados pequenos incluindo planetas-anões como Plutão. É origem dos cometas de período longo que ocasionalmente visitam o sistema solar interno.',
      numeros: [
        { rotulo: 'Raio interno', valor: '30 UA (4.488 milhões km)' },
        { rotulo: 'Raio externo', valor: '50 UA (7.480 milhões km)' },
        { rotulo: 'Espessura', valor: '~10 UA (~1.496 milhões km)' },
        { rotulo: 'Número de objetos', valor: '>100.000 (diâmetro >100 km)' },
        { rotulo: 'Massa total', valor: '~0,1 M_Terra' },
        { rotulo: 'Origem de cometas', valor: 'Período longo (>200 anos)' }
      ],
      curiosidades: [
        'O Cinturão de Kuiper é 200 vezes mais massivo que o Cinturão de Asteroides — um reservatório gigante de corpos gelados.',
        'Plutão é apenas o objeto mais bem conhecido do Cinturão de Kuiper — estima-se haver >100.000 objetos com diâmetro >100 km.',
        'Os cometas de período longo que ocasionalmente visitam o sistema solar interno originam do Cinturão de Kuiper.',
        'O Cinturão de Kuiper foi predito teoricamente por Gerard Kuiper em 1951 antes de ser diretamente observado em 1992.'
      ],
      avancado: {
        composicao: 'Gelos (H₂O, CH₄, N₂, CO, CO₂), rocha silicática, compostos orgânicos, possível água líquida interior.',
        temperatura: 'Média estimada -230 a -240 °C (aumenta próximo ao Sol na órbita).',
        missoes: ['New Horizons (Plutão 2015, continuação Cinturão Kuiper)', 'Lucy (Troianos 2021–2033, órbita Júpiter)'],
        texto: 'Cinturão Kuiper é região 30-50 UA (~4500-7500 Mkm), origem cometas período longo. Maior reservoir planetesimals primordiais gelado pós-Grande Tack migração. >100.000 objetos diâmetro >100 km estimados (população power-law). Composição: gelos primários H₂O, CH₄, N₂, CO, CO₂; rocha; compostos orgânicos. Órbita inclinação média ~1,86°. Origem: in situ formação 30-50 UA conforme formação disco solar. Destabilização dinâmica ~4,0 Ga por migração Gigante Planeta levou spray objetos em solo interplanetário (Grande Bombardeio Tardio). Plutão, Éris, Haumea, Makemake maiores membros conhecidos.'
      }
    }
  },
  {
    id: 'halley',
    nome: 'Cometa Halley',
    tipo: 'cometa',
    pai: 'sol',
    raioKm: 10.5,
    distanciaMediaKm: 2689.4e6,
    periodoOrbitalDias: 27375,
    periodoRotacaoHoras: 52,
    excentricidade: 0.9671,
    inclinacaoOrbitaGraus: 162.26,
    inclinacaoEixoGraus: 0,
    retrogrado: true,
    anguloInicialGraus: 90,
    aparencia: {
      tipo: 'cometa',
      cores: ['#8b7355', '#a0907d', '#e8d8d0']
    },
    aneis: null,
    info: {
      resumo: 'O Cometa Halley é o cometa mais famoso do sistema solar, retornando a cada 75-76 anos. Sua cauda gelada brilhante atravessa o céu noturno. Tem um núcleo rochoso que pode ser observado por satélites. Próxima passagem em 2061.',
      numeros: [
        { rotulo: 'Período orbital', valor: '75,3 anos (27.375 dias)' },
        { rotulo: 'Semieixo maior', valor: '17,8 UA (2.665 milhões km)' },
        { rotulo: 'Excentricidade', valor: '0,967 (órbita muito excêntrica)' },
        { rotulo: 'Tamanho do núcleo', valor: '~16 × 8 × 8 km' },
        { rotulo: 'Periélio (mais perto Sol)', valor: '0,586 UA (~88 milhões km)' },
        { rotulo: 'Afélio (mais longe Sol)', valor: '35,3 UA (~5.280 milhões km)' }
      ],
      curiosidades: [
        'O Cometa Halley é o único cometa de período longo visível a olho nu que retorna regularmente — até pessoas acima de 75 anos podem vê-lo duas vezes!',
        'Registros de avistamentos do Cometa Halley remontam a mais de 2.000 anos, incluindo referências em textos antigos chineses e babilônicos.',
        'Na Tapeçaria de Bayeux (1066 CE), o Cometa Halley é retratado — evidência de registros históricos muito longos.',
        'A próxima passagem do Cometa Halley será em 2061 — aqueles que o viram em 1986 podem novamente vê-lo em meia idade.',
        'O Cometa Halley viaja a 70 km/s em sua órbita — rápido o suficiente para sair do sistema solar se sua órbita mudasse um pouquinho.',
        'Cada vez que o Cometa Halley passa próximo do Sol, ele perde material e fica um pouco menor — eventualmente desaparecerá completamente em alguns milhões de anos.'
      ],
      avancado: {
        composicao: 'Núcleo rochoso (silicatos, ferro), gelo de água, gelo de metano, gelo de CO₂, poeira cometária, compostos orgânicos.',
        temperatura: 'Núcleo: ~-50 °C em repouso; durante passagem perto do Sol: sublimação de superfície.',
        missoes: ['Vega 1-2 (USSR, 1986)', 'Giotto (ESA, 1986)', 'Suisei, Sakigake (Japão, 1986)', 'Proposta futura de retorno de amostras'],
        texto: 'Cometa Halley é KBO (Kuiper Belt Object) capturado em órbita curta. Período 75,3 anos (1530–2061 d.C. registros). Órbita retrógrada (162,26°) sugeriu captura dinâmica. Semieixo maior 17,8 UA, excentricidade 0,9671 (periélio 0,586 UA, afélio 35,3 UA). Núcleo ~16×8 km. Sondas Vega 1-2/Giotto (1986) revelaram núcleo rochoso escuro, jatos de gás (H₂O, CO₂, CO), albedo 0,04. Ejeção matéria cria caudas de poeira/íons. Próxima passagem 2061; última 1986.'
      }
    }
  },
  {
    id: 'hale-bopp',
    nome: 'Cometa Hale-Bopp',
    tipo: 'cometa',
    pai: 'sol',
    raioKm: 18,
    distanciaMediaKm: 27817.5e6,
    periodoOrbitalDias: 337500,
    periodoRotacaoHoras: 48,
    excentricidade: 0.9951,
    inclinacaoOrbitaGraus: 89.43,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 270,
    aparencia: {
      tipo: 'cometa',
      cores: ['#a0907d', '#8b8680', '#e8d8d0']
    },
    aneis: null,
    info: {
      resumo: 'Hale-Bopp é um cometa gigantesco que visitou o sistema solar interno em 1997, brilhando visivelmente ao olho nu por meses. Sua próxima passagem não ocorrerá até o ano 4385 — é um visitante do distante passado trazendo histórias de bilhões de anos atrás.',
      numeros: [
        { rotulo: 'Período orbital', valor: '~2.533 anos (última 1997)' },
        { rotulo: 'Semieixo maior', valor: '186 UA (27.800 bilhões km)' },
        { rotulo: 'Excentricidade', valor: '0,9951 (próxima de parábola!)' },
        { rotulo: 'Tamanho do núcleo', valor: '~40 km de diâmetro' },
        { rotulo: 'Periélio em 1997', valor: '0,914 UA (entre Terra e Vênus)' },
        { rotulo: 'Próxima passagem', valor: 'Ano 4385' }
      ],
      curiosidades: [
        'Hale-Bopp foi o cometa mais brilhante do século XX — visível a olho nu de 1995 a 1998, período recorde.',
        'Hale-Bopp tem semieixo maior de 186 UA — sua órbita é quase parabólica, levará bilhões de anos para retornar (se retornar).',
        'A cauda de Hale-Bopp se estendia por bilhões de quilômetros — maior que o sistema solar interno!',
        'Muitas culturas antigas registraram cometas semelhantes — Hale-Bopp pode ter sido observado há milhares de anos se órbita foi diferente.'
      ],
      comparacoes: [
        'Hale-Bopp é um gigante — seu núcleo de 40 km de diâmetro é o maior cometa conhecido.',
        'Sua órbita se estende tão longe que em afélio está 10 vezes mais longe que Plutão.',
        'A cauda brilhante se estendia por milhões de km — visível a olho nu mesmo durante o dia em 1997.'
      ],
      avancado: {
        composicao: 'Núcleo rochoso/gelado (gelo de água, CO₂, CH₄), poeira cometária, compostos orgânicos primitivos.',
        temperatura: 'Núcleo em repouso: ~-230 °C; durante passagem (periélio): intensa sublimação.',
        missoes: ['Observações telescópicas múltiplas (Hubble, Chandra, etc.)', 'Sem sonda interplanetária planejada'],
        texto: 'Hale-Bopp é cometa gigantesco descoberto 1995 (Alan Hale, Thomas Bopp). Semi-eixo maior 186 UA, excentricidade 0,9951, período ~2.533 anos estimado (próxima passagem ~4385). Periélio 1997/04/01 a 0,914 UA (entre Terra/Vênus). Núcleo grande ~40 km diâmetro, albedo 0,5 (brilhante). Duas caudas distintas: pó (amarela) & iônica (azul). Magnitude pico -1,0 (visível dia em brilho). Decomposição orbital resultará em órbita muito alongada; eventual escape sistema solar possível (~50% chance).'
      }
    }
  },
  {
    id: '67p',
    nome: 'Cometa Churyumov-Gerasimenko',
    tipo: 'cometa',
    pai: 'sol',
    raioKm: 2.15,
    distanciaMediaKm: 519.5e6,
    periodoOrbitalDias: 2352.5,
    periodoRotacaoHoras: 12.4,
    excentricidade: 0.6399,
    inclinacaoOrbitaGraus: 7.028,
    inclinacaoEixoGraus: 0,
    retrogrado: false,
    anguloInicialGraus: 120,
    aparencia: {
      tipo: 'cometa',
      cores: ['#696159', '#4a4238', '#2f2724']
    },
    aneis: null,
    info: {
      resumo: 'Churyumov-Gerasimenko é um cometa pequeno e misterioso que foi visitado pela sonda Rosetta da ESA. Tem uma forma estranha de "pato de borracha" — dois lóbulos unidos. O pouso histórico da Rosetta em 2014 revelou sua superfície em detalhes extraordinários.',
      numeros: [
        { rotulo: 'Diâmetro', valor: '~4,3 km (alongado)' },
        { rotulo: 'Distância do Sol', valor: '519,5 milhões km' },
        { rotulo: 'Período orbital', valor: '6,44 anos' },
        { rotulo: 'Excentricidade', valor: '0,6399' },
        { rotulo: 'Tipo espectral', valor: 'Condrita carbonácea' },
        { rotulo: 'Massa estimada', valor: '~10 bilhões de toneladas' }
      ],
      curiosidades: [
        '67P/Churyumov-Gerasimenko tem forma única de "pato de borracha" — dois lóbulos de diferentes tamanhos conectados por pescoço.',
        'A sonda Rosetta orbitou 67P por 2 anos (2014-2016), revelando detalhes da superfície nunca antes vistos.',
        'Philae, o módulo de pouso da Rosetta, aterrou em 67P em 14 de novembro de 2014 — primeiro pouso em um cometa!',
        'Jatos de gás saem de rachaduras em 67P — a sonda Rosetta observou atividade cometária em tempo real.'
      ],
      comparacoes: [
        '67P é um pequeno cometa — apenas 4,3 km de diâmetro, menor que qualquer asteroide grande.',
        'A forma de "pato de borracha" é única — resultado de dois pequenos corpos se unindo no passado primitivo.',
        'Sua gravidade é tão fraca que uma bola de beisebol lançada orbitaria o cometa inteiro.'
      ],
      avancado: {
        composicao: 'Núcleo condrita carbonácea (gelo de água, poeira, compostos orgânicos primitivos), rocha.',
        temperatura: 'Superfície em repouso: ~-35 °C (mais quente que esperado); durante periélio: sublimação intensa.',
        missoes: ['Rosetta/Philae (2014–2016)', 'Primeira sonda a orbitar/pousar cometa'],
        texto: '67P/Churyumov-Gerasimenko é cometa periódico descoberto 1969. Semi-eixo maior 3,46 UA, excentricidade 0,6399, período 6,44 anos. Periélio próximo (último 2015/08/13). Forma bilobada ~4,3 × 4,1 × 3,3 km resultado fusão dois corpos primitivos. Rosetta (2014–2016) órbita & Philae pouso (2014/11/14, primeiro cometa). Superfície craqueada, jatos gas, depósitos brilhantes (gelo + sais). Densidade ~470 kg/m³ (amontoado solto). Composição original solar — objeto primitivo Cinturão Kuiper capturado.'
      }
    }
  }
] };
