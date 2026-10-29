// Dados de desmonte dos veículos-herói: componentes, faixas geométricas, textos didáticos
// Exporta: COMPONENTES — mapa { veiculoId → { eixo, fator, partes } }
// Conteúdo fact-checked e conferido. Builders não devem alterar nem "melhorar" textos.

// Linha do tempo da Apollo 11: o que vai sendo descartado até sobrar a cápsula.
// De 111 metros e 2.900 toneladas na decolagem, volta um cone de 3,9 metros.
// `some` lista os ids de componente que deixam de existir AO ENTRAR no passo.
export const VIAGEM = {
  'saturno-v': [
    // ~90% e não 85%: somando o propelente por estágio (2.077 + 427 + 105 t)
    // sobre as ~2.900 t de decolagem dá 0,90.
    { texto: 'Decolagem. Duas mil e novecentas toneladas saem do chão — e quase 90% disso é só combustível.', some: [], destaque: 's-ic' },
    // Sem a notação "T+" da indústria: para quem tem 7 anos ela é jargão sem
    // tradução, e a regra desta casa é não deixar termo técnico sem explicação
    // na mesma frase. "Dois minutos e meio depois" diz a mesma coisa.
    { texto: 'Dois minutos e meio depois, o 1º estágio esgota o combustível e cai no Atlântico. A essa altura já subiu 68 km.', some: ['s-ic', 'f1'], destaque: 's-ii' },
    { texto: 'Aos três minutos, já fora da atmosfera, a torre de escape não serve mais para nada e é descartada.', some: ['les'], destaque: 's-ii' },
    // A órbita só se completa em T+11min49 (Apollo 11 Mission Report). Dizer
    // "em órbita" aos 9 minutos contradizia o próprio card do 3º estágio, que
    // diz ser ELE quem coloca a nave em órbita.
    { texto: 'Aos nove minutos o 2º estágio cai e o 3º assume. Três minutos depois, a nave entra em órbita da Terra.', some: ['s-ii'], destaque: 's-ivb' },
    { texto: 'Quase três horas depois da decolagem, o 3º estágio reacende e empurra a nave para a Lua. Depois é descartado; nas últimas missões, jogado na Lua de propósito para gerar tremores que os sismógrafos deixados lá pudessem medir.', some: ['s-ivb', 'iu', 'sla'], destaque: 'lm' },
    { texto: 'Órbita lunar — o Módulo Lunar desce com dois astronautas. Na decolagem de volta, a parte de baixo dele fica na Lua para sempre: é a plataforma que aparece nas fotos.', some: ['lm'], destaque: 'sm' },
    { texto: 'Chegando em casa — o Módulo de Serviço, com o motor e os tanques, é descartado e queima na atmosfera. Sobra só a cápsula.', some: ['sm'], destaque: 'cm' },
    { texto: 'De 111 metros e 2.900 toneladas, voltou este cone de 3,9 metros: a Columbia, com três pessoas dentro.', some: [], destaque: 'cm' },
  ],
};

// Os foguetes procedurais já nascem com as peças separadas e nomeadas
// `componente-<id>` — não precisam do corte por triângulo. `jaSeparado` avisa o
// Hangar para procurar os filhos em vez de recortar geometria.
export const COMPONENTES_PROCEDURAIS = {
  'sls': {
    jaSeparado: true, eixo: [1, 0, 0], fator: 0.9, vao: 0.14,
    partes: [
      { id: 'motores-rs25', nome: 'Motores RS-25', explicacao: 'Quatro motores que **já voaram no Ônibus Espacial** e foram reformados para voar de novo. Cada um deles tem histórico próprio de missões nas costas, décadas antes deste foguete existir.' },
      { id: 'core', nome: 'Estágio principal', explicacao: 'O corpo laranja de 65 metros, cheio de hidrogênio e oxigênio líquidos. A cor não é tinta: é a espuma que isola o frio lá dentro, deixada à mostra para economizar peso — a mesma escolha do tanque do Ônibus Espacial.' },
      { id: 'srb-sls', nome: 'Foguetes sólidos', explicacao: 'Os dois cilindros brancos ao lado. Uma vez acesos, não dá para desligar nem reduzir — queimam até acabar. São herdados do Ônibus Espacial, porém mais longos: cinco segmentos em vez de quatro.' },
      { id: 'icps', nome: 'Estágio superior', explicacao: 'Entra em ação já no vácuo, onde não existe ar nenhum, e dá o empurrão que tira a Orion da órbita da Terra e a manda para a Lua.' },
      { id: 'orion', nome: 'Nave Orion', explicacao: 'Onde a tripulação viaja. Feita para reentrar vindo da Lua, muito mais rápido do que quem volta da Estação Espacial — e por isso com um escudo térmico bem mais reforçado.' },
      { id: 'las-sls', nome: 'Torre de escape', explicacao: 'Mesmo princípio da torre do Saturno V, meio século depois: um foguete de emergência que arranca a cápsula para longe se algo der errado no lançamento.' },
    ],
  },
  'falcon-9': {
    jaSeparado: true, eixo: [1, 0, 0], fator: 0.9, vao: 0.12,
    partes: [
      { id: 'pernas', nome: 'Pernas de pouso', explicacao: 'Ficam dobradas contra o corpo na subida e abrem segundos antes de tocar o chão. São elas que fazem deste o primeiro foguete **orbital** a voltar e pousar em pé de forma rotineira.' },
      { id: 'merlin-1', nome: 'Nove motores Merlin', explicacao: 'Nove motores: oito em círculo e um bem no meio. Se um falhar, os outros oito compensam e a missão continua — coisa que já aconteceu de verdade em voo, e a carga chegou ao destino assim mesmo.' },
      // Não dizer "antes deles todo foguete era descartado": é falso e
      // contradiz o card dos motores do SLS, que voaram antes no Ônibus
      // Espacial. O que este foguete inaugurou foi o estágio que pousa
      // sozinho, de pé, e volta a voar em semanas.
      { id: 'estagio-1', nome: '1º estágio', explicacao: 'A parte que volta. Alguns destes já subiram e pousaram **mais de vinte vezes** — antes deles, nenhum estágio de foguete pousava sozinho, de pé, pronto para voar de novo em poucas semanas.' },
      { id: 'grid-fins', nome: 'Aletas de grade', explicacao: 'Grades de titânio que se abrem na descida e guiam o foguete pelo ar, como as penas na traseira de um dardo.' },
      { id: 'interestagio', nome: 'Interestágio', explicacao: 'O anel preto que segura os dois estágios juntos e os separa lá em cima, quando o primeiro esgota o combustível.' },
      { id: 'estagio-2', nome: '2º estágio', explicacao: 'Um motor só, que funciona apenas no vácuo. Coloca a carga na órbita final e não volta.' },
      { id: 'coifa', nome: 'Coifa', explicacao: 'A capa que protege a carga na travessia da atmosfera. Abre em duas metades que caem de paraquedas no mar — e também são pescadas e reaproveitadas.' },
    ],
  },
  'starship': {
    jaSeparado: true, eixo: [1, 0, 0], fator: 0.9, vao: 0.12,
    partes: [
      { id: 'raptor-booster', nome: 'Trinta e três motores', explicacao: 'É o maior número de motores já acesos juntos num foguete. Acender todos ao mesmo tempo, sem que um atrapalhe o outro, é boa parte do desafio.' },
      { id: 'super-heavy', nome: 'Propulsor Super Heavy', explicacao: 'O empurrão inicial. Em vez de pousar sobre pernas, ele volta para a própria torre de lançamento e é **agarrado no ar por dois braços mecânicos**.' },
      { id: 'grid-fins-sh', nome: 'Aletas de grade', explicacao: 'Guiam o propulsor na volta, mirando a torre que vai agarrá-lo.' },
      { id: 'raptor-nave', nome: 'Motores da nave', explicacao: 'Seis motores: três desenhados para o vácuo e três para a atmosfera, porque empurrar no vazio e empurrar no ar pedem bocais diferentes.' },
      { id: 'starship', nome: 'A nave', explicacao: 'Feita de aço inoxidável, sem pintura — daí o brilho. A ideia é que ela seja reabastecida em órbita por outra nave igual, e só então siga viagem.' },
      { id: 'flaps', nome: 'Abas', explicacao: 'Quatro abas que controlam a queda com a barriga voltada para baixo, como um paraquedista abrindo braços e pernas, até endireitar no último instante.' },
      { id: 'ogiva', nome: 'Ogiva', explicacao: 'A ponta que corta o ar na subida e abriga a carga ou a tripulação.' },
    ],
  },
};

export const COMPONENTES = {
  // Procedural desde a V8: as peças já nascem separadas e nomeadas, então
  // `jaSeparado` desvia do corte por triângulo. Os campos `de`/`ate` do corte
  // sumiram junto — não havia mais faixa a recortar.
  'saturno-v': {
    jaSeparado: true,
    eixo: [1, 0, 0],   // espalha ao longo do eixo longo (nariz em +X)
    fator: 0.9,        // fator de deslocamento
    vao: 0.12,
    partes: [
      {
        id: 'f1',
        nome: 'Motores F-1',
        explicacao: 'Cinco motores, os mais potentes já postos num foguete que voou. Juntos queimam **13 toneladas de combustível por segundo** — um caminhão-tanque inteiro a cada segundo, por dois minutos e meio. Cada bocal é largo o bastante para uma pessoa ficar em pé dentro dele.',
      },
      {
        id: 's-ic',
        nome: '1º estágio (S-IC)',
        explicacao: 'Dois tanques empilhados: querosene embaixo, oxigênio líquido em cima. Sozinho, este estágio é mais alto que um prédio de treze andares, e em dois minutos e meio ele esvazia tudo e cai no Atlântico. Levanta o foguete inteiro só até 68 km de altura — menos de um décimo do caminho até a Lua, mas a parte mais difícil, porque é onde o peso é maior.',
      },
      {
        id: 's-ii',
        nome: '2º estágio (S-II)',
        explicacao: 'Cinco motores movidos a hidrogênio líquido, guardado a **253 graus abaixo de zero**. É este estágio que leva a nave até a borda do espaço, quase na velocidade necessária para ficar em órbita.',
      },
      {
        id: 's-ivb',
        nome: '3º estágio (S-IVB)',
        explicacao: 'O único que acende duas vezes. Na primeira, coloca a nave em órbita da Terra, onde a tripulação passa algumas voltas conferindo tudo. Na segunda, queima por cerca de 5 minutos e joga a nave rumo à Lua a 39 mil km/h — a manobra tem nome próprio: injeção translunar.',
      },
      {
        id: 'iu',
        nome: 'Unidade de Instrumentos',
        explicacao: 'O cérebro do foguete, num anel de menos de um metro de altura encaixado logo acima do 3º estágio. Guardava o computador de bordo, os giroscópios que sabiam para onde o foguete apontava e o rádio que falava com a Terra. Esse computador tinha cerca de 100 mil bytes de memória — menos que uma única foto do seu celular — e mesmo assim guiou 111 metros de foguete até a Lua.',
      },
      {
        id: 'sla',
        nome: 'Adaptador do Módulo Lunar',
        explicacao: 'O cone que afina de 6,6 para 3,9 metros e fecha o topo do foguete. Por fora parece só uma carenagem; por dentro é a garagem do Módulo Lunar, que sobe dobrado aqui e só sai depois que a nave já está a caminho da Lua. As quatro paredes se abrem como pétalas para soltá-lo.',
      },
      {
        id: 'lm',
        nome: 'Módulo Lunar',
        explicacao: 'A Eagle viajava dobrada aqui dentro, de pernas recolhidas. Em alguns pontos a parede dela era mais fina que papel-alumínio: como nunca precisou aguentar ar, só o vácuo, cada grama foi economizada. São duas naves numa: a parte de baixo desce e fica na Lua para sempre, e só a de cima decola de volta.',
      },
      // Módulo de Serviço e Módulo de Comando são peças SEPARADAS de propósito.
      // Juntos, o clímax da Viagem ("voltou uma cápsula de 3,9 metros") ficava
      // dito mas não mostrado: o bloco exibido como "o que voltou" tinha o
      // dobro do tamanho da cápsula real, porque incluía o módulo de serviço,
      // que é descartado antes da reentrada. Proporção real: dos ~11,4 m do
      // conjunto, a cápsula é 3,9 m, ou seja o terço de cima.
      {
        id: 'sm',
        nome: 'Módulo de Serviço',
        explicacao: 'O cilindro atrás da cápsula, com o motor principal, os tanques de oxigênio e as células de combustível que geravam a energia. Acompanha a viagem inteira e é descartado minutos antes da reentrada — queima na atmosfera. Foi um tanque de oxigênio daqui que explodiu na Apollo 13.',
      },
      {
        id: 'cm',
        nome: 'Módulo de Comando',
        explicacao: 'O cone onde os três astronautas moraram por oito dias, num espaço parecido com o interior de um carro. Batizado de Columbia. É a única peça, entre os 111 metros que decolaram, que voltou à Terra — e voltou com o escudo queimado, entrando na atmosfera a 40 mil km/h.',
      },
      {
        id: 'les',
        nome: 'Torre de escape',
        explicacao: 'Uma haste fina no topo que é, ela mesma, um foguete de emergência: se algo desse errado no lançamento, arrancaria a cápsula com a tripulação para longe em menos de um segundo. Era mais potente que o foguete inteiro que levou o primeiro americano ao espaço. Aos 3 minutos de voo já não servia para nada e era descartada. Em nenhuma missão Apollo precisou ser usada.',
      },
    ],
  },

  // Híbrido: o .glb do acervo NASA é o ORBITADOR, e as outras duas peças da
  // pilha de lançamento são construídas com primitivas em frota-foguetes.js.
  //
  // Antes o desmonte fatiava o orbitador em cinco por nome de material (baía,
  // cabine, asas, motores, escudo). Saiu porque o Fred pediu a pilha inteira —
  // "ele só tem uma parte do ônibus e faltam os foguetes de lançamento" — e
  // porque cinco fatias do mesmo avião se sobrepunham na vista explodida. As
  // três peças de verdade se separam sem encavalar, e é o que o ônibus
  // realmente descartava a cada voo. O detalhe interno do orbitador é outro
  // nível de zoom, no roadmap.
  'onibus-espacial': {
    jaSeparado: true,
    eixo: [0, 0, 1],   // afasta as peças perpendicularmente ao corpo
    fator: 0.9,
    vao: 0.12,
    partes: [
      {
        id: 'orbitador',
        nome: 'Orbitador',
        explicacao: 'O avião. O porão de carga tem 18 metros — cabe um ônibus urbano inteiro —, e dali saíram satélites, o telescópio Hubble e boa parte da Estação Espacial. Na volta, sem motores e sem combustível para arremeter, ele vira um planador de 78 toneladas com uma única chance de acertar a pista. A barriga escura é coberta por **mais de 20 mil peças cerâmicas**, cada uma com formato próprio e um lugar só seu.',
      },
      {
        id: 'tanque',
        nome: 'Tanque externo',
        explicacao: 'O maior pedaço da pilha e o único que nunca voltava: alimentava os três motores do orbitador na subida e, já quase em órbita, era solto para queimar na atmosfera. O laranja não é tinta, é a espuma isolante à mostra. Os dois primeiros voos foram pintados de branco; descobriram que a tinta só somava uns 270 quilos de peso inútil e nunca mais pintaram.',
      },
      {
        id: 'srb',
        nome: 'Foguetes sólidos',
        explicacao: 'Os dois cilindros brancos que dão quase todo o empurrão dos dois primeiros minutos. Combustível sólido não tem torneira: uma vez aceso, não dá para desligar nem diminuir até acabar. Aos dois minutos eles se soltam, descem de paraquedas no Atlântico, são pescados por navios e voltam a voar depois de recondicionados.',
      },
    ],
  },

};

// Os cinco cards internos do orbitador, preservados fora do desmonte à espera
// do segundo nível de zoom. O corte aqui é por NOME DE MATERIAL: o autor do
// modelo já nomeou cada peça ("shut-bay-*", "cockpit side", "wingtop", "OMS
// pod", "belly"), e usar isso é exato onde adivinhar por posição seria frágil.
// A ORDEM É A PRIORIDADE — a primeira parte que casar leva a malha, então o
// casco genérico fica por último com um padrão que aceita tudo.
//
// Não está em COMPONENTES de propósito: aquele mapa é indexado por id de
// veículo, e não existe veículo chamado "orbitador". Os textos já passaram por
// revisão de fatos (as tais 20 mil peças cerâmicas aguentam ~1260 °C, não
// 1600 — esse é o bico e o bordo de ataque, que são de carbono-carbono).
export const COMPONENTES_ORBITADOR_DETALHE = {
  eixo: [0, 0, 1],
  fator: 2.2,
  partes: [
      {
        id: 'baia',
        material: /shut-bay|^bay |shut-cam|handrail/i,
        nome: 'Baía de carga',
        explicacao: 'O porão tem 18 metros de comprimento por 4,6 de largura — cabe um ônibus urbano inteiro. Daqui saíram satélites, o telescópio Hubble e os módulos que formaram a Estação Espacial. As portas abrem no espaço não só para carregar e descarregar: o lado de dentro delas é radiador. Sem abri-las, o ônibus superaquece com o próprio calor em poucas horas.',
      },
      {
        id: 'cabine',
        material: /cockpit|winodws|window|nose|glass|arrows/i,
        nome: 'Cabine de comando',
        explicacao: 'Dois andares, para até sete pessoas. Em cima ficam o comandante e o piloto, cercados por **mais de 2 mil mostradores, chaves e disjuntores**; embaixo, as camas, a comida e a escotilha de saída. As janelas têm três camadas de vidro: a de fora fica em brasa na volta para casa, enquanto a de dentro continua morna ao toque.',
      },
      {
        id: 'asas',
        material: /wing|tail|flap/i,
        nome: 'Asas e leme',
        explicacao: 'Só servem na volta. Na subida são peso morto que precisa ser carregado até a órbita. Na reentrada, com os motores desligados e sem combustível para arremeter, o ônibus vira um planador de 78 toneladas e tem uma única chance de acertar a pista. As asas medem 23,8 metros de ponta a ponta — o comprimento exato de uma quadra de tênis.',
      },
      {
        id: 'motores',
        material: /OMS|RCS|aft/i,
        nome: 'Motores e propulsores',
        explicacao: 'Os três motores principais na traseira só funcionam na subida, alimentados pelo tanque externo que fica para trás. Já em órbita, quem trabalha são os dois OMS, os casulos laterais que mudam a altura da órbita e fazem a frenagem para voltar. Os pequenos propulsores RCS giram a nave no vácuo — lá em cima não existe ar para as asas empurrarem.',
      },
      {
        id: 'escudo',
        material: /./,   // tudo o que sobrou: barriga, laterais, fuselagem
        nome: 'Escudo térmico',
        explicacao: 'A barriga escura é coberta por mais de **20 mil peças cerâmicas**, cada uma com formato próprio e um lugar só seu — não dá para trocar uma pela vizinha, e todas foram coladas à mão. Isolam tão bem que dá para segurar uma delas pelas bordas segundos depois de tirá-la de um forno em brasa. São o único motivo de o ônibus não derreter na volta.',
      },
  ],
};
