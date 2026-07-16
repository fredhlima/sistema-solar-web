export const MISSOES = [
  {
    id: 'apollo-11',
    nome: 'Apollo 11',
    cor: '#b8e0ff',
    descricao: 'A primeira missão tripulada a pousar na Lua. Neil Armstrong e Buzz Aldrin caminharam na superfície lunar em 20 de julho de 1969. Um dos maiores feitos da humanidade.',
    estado: 'Concluída — legado histórico',
    interestelar: false,
    // Missão de 8 dias: a 7 dias/s acabaria em ~1s. Segue no ritmo de 1 dia/s.
    velocidadeSeguir: 1,
    paradas: [
      { corpo: 'terra', data: '1969-07-16', rotulo: 'Lançamento de Cabo Canaveral' },
      { corpo: 'lua', data: '1969-07-20', rotulo: 'Pouso na Lua (Tranquilidade)' },
      { corpo: 'terra', data: '1969-07-24', rotulo: 'Retorno à Terra' }
    ]
  },
  {
    id: 'voyager-1',
    nome: 'Voyager 1',
    cor: '#ffb454',
    descricao: 'Sonda robótica que explorou Júpiter e Saturno, depois se tornou o objeto humano mais distante. Atualmente viaja pelo espaço interestelar com mensagens humanas a bordo.',
    estado: 'Ativa — espaço interestelar',
    interestelar: true,
    paradas: [
      { corpo: 'terra', data: '1977-09-05', rotulo: 'Lançamento' },
      { corpo: 'jupiter', data: '1979-03-05', rotulo: 'Sobrevoo de Júpiter' },
      { corpo: 'saturno', data: '1980-11-12', rotulo: 'Sobrevoo de Saturno' }
    ]
  },
  {
    id: 'voyager-2',
    nome: 'Voyager 2',
    cor: '#ff8a5c',
    descricao: 'Única sonda a visitar Netuno e Urano. Explorou os quatro planetas gigantes. Também segue em direção ao espaço interestelar, transmitindo dados ainda hoje.',
    estado: 'Ativa — espaço interestelar',
    interestelar: true,
    paradas: [
      { corpo: 'terra', data: '1977-08-20', rotulo: 'Lançamento' },
      { corpo: 'jupiter', data: '1979-07-09', rotulo: 'Sobrevoo de Júpiter' },
      { corpo: 'saturno', data: '1981-08-25', rotulo: 'Sobrevoo de Saturno' },
      { corpo: 'urano', data: '1986-01-24', rotulo: 'Sobrevoo de Urano' },
      { corpo: 'netuno', data: '1989-08-25', rotulo: 'Sobrevoo de Netuno' }
    ]
  },
  {
    id: 'new-horizons',
    nome: 'New Horizons',
    cor: '#5cc8ff',
    descricao: 'Sonda rápida que explorou Plutão em 2015, revelando um mundo complexo e belo. Continua viajando além de Plutão, estudando objetos do Cinturão de Kuiper.',
    estado: 'Ativa — além de Plutão',
    interestelar: true,
    paradas: [
      { corpo: 'terra', data: '2006-01-19', rotulo: 'Lançamento' },
      { corpo: 'jupiter', data: '2007-02-28', rotulo: 'Sobrevoo gravitacional de Júpiter' },
      { corpo: 'plutao', data: '2015-07-14', rotulo: 'Sobrevoo histórico de Plutão' }
    ]
  },
  {
    id: 'cassini',
    nome: 'Cassini-Huygens',
    cor: '#e0c878',
    descricao: 'A grande exploradora de Saturno. Usou a gravidade de Vênus, da Terra e de Júpiter como "estilingues" para ganhar velocidade — uma aula de física orbital. Orbitou Saturno por 13 anos e pousou a sonda Huygens em Titã.',
    estado: 'Concluída — mergulho final em Saturno (2017)',
    interestelar: false,
    // 13 anos orbitando Saturno (2004–2017); depois do Grand Finale o
    // marcador acompanha o planeta (a nave terminou dentro de Saturno).
    // Órbita representativa: periapse ~200.000 km, apoapse ~2,2 Mkm.
    orbitaCaptura: {
      corpo: 'saturno',
      dataInicio: '2004-07-01',
      dataFim: '2017-09-15',
      periKm: 200000,
      apoKm: 2200000,
      periodoDias: 20,
      inclinacaoGraus: 30
    },
    paradas: [
      { corpo: 'terra', data: '1997-10-15', rotulo: 'Lançamento' },
      { corpo: 'venus', data: '1998-04-26', rotulo: 'Estilingue em Vênus' },
      { corpo: 'venus', data: '1999-06-24', rotulo: 'Segundo estilingue em Vênus' },
      { corpo: 'terra', data: '1999-08-18', rotulo: 'Estilingue na Terra' },
      { corpo: 'jupiter', data: '2000-12-30', rotulo: 'Estilingue em Júpiter' },
      { corpo: 'saturno', data: '2004-07-01', rotulo: 'Chegada a Saturno' },
      { corpo: 'saturno', data: '2017-09-15', rotulo: 'Grand Finale — mergulho em Saturno' }
    ]
  },
  {
    id: 'rosetta',
    nome: 'Rosetta',
    cor: '#c78dff',
    descricao: 'Primeira missão a orbitar um cometa e pousar nele. Perseguiu o cometa 67P por 10 anos e liberou o módulo Philae — o primeiro pouso em um cometa da história.',
    estado: 'Concluída — pouso final no 67P (2016)',
    interestelar: false,
    paradas: [
      { corpo: 'terra', data: '2004-03-02', rotulo: 'Lançamento' },
      { corpo: 'marte', data: '2007-02-25', rotulo: 'Estilingue em Marte' },
      { corpo: 'terra', data: '2009-11-13', rotulo: 'Último estilingue na Terra' },
      { corpo: '67p', data: '2014-08-06', rotulo: 'Encontro com o cometa 67P' },
      { corpo: '67p', data: '2016-09-30', rotulo: 'Pouso final no cometa' }
    ]
  },
  {
    id: 'artemis-2',
    nome: 'Artemis 2',
    cor: '#8ef0c0',
    descricao: 'A primeira missão tripulada além da órbita baixa da Terra desde a Apollo 17 (1972). Quatro astronautas contornaram a Lua na nave Orion, abrindo caminho para o pouso da Artemis 3.',
    estado: 'Concluída — sobrevoo tripulado da Lua (2026)',
    interestelar: false,
    // Missão de 10 dias: mesma razão da Apollo 11 — 1 dia/s para dar pra ver.
    velocidadeSeguir: 1,
    paradas: [
      { corpo: 'terra', data: '2026-04-06', rotulo: 'Lançamento (SLS/Orion)' },
      { corpo: 'lua', data: '2026-04-10', rotulo: 'Sobrevoo tripulado da Lua' },
      { corpo: 'terra', data: '2026-04-16', rotulo: 'Retorno e amerissagem' }
    ]
  },
  {
    id: 'juno',
    nome: 'Juno',
    cor: '#ff9c42',
    descricao: 'Sonda movida a energia solar estudando a composição, campo magnético e estrutura interna de Júpiter. Recorde de painéis solares mais distantes do Sol em operação. Órbita polar excêntrica que evita os cinturões de radiação mais intensos.',
    estado: 'Ativa — orbitando Júpiter',
    interestelar: false,
    // Após a inserção, a nave passa a orbitar o planeta (ver orbitaCaptura em
    // trajetorias.js). Números reais: perijove ~75.600 km do centro, apojove
    // ~8,1 Mkm, período ~53 dias, órbita polar.
    orbitaCaptura: {
      corpo: 'jupiter',
      dataInicio: '2016-07-05',
      dataFim: null,
      periKm: 75600,
      apoKm: 8100000,
      periodoDias: 53,
      inclinacaoGraus: 90
    },
    paradas: [
      { corpo: 'terra', data: '2011-08-05', rotulo: 'Lançamento de Cabo Canaveral' },
      { corpo: 'terra', data: '2013-10-09', rotulo: 'Estilingue gravitacional na Terra' },
      { corpo: 'jupiter', data: '2016-07-05', rotulo: 'Inserção orbital em Júpiter' }
    ]
  },
  {
    id: 'parker',
    nome: 'Parker Solar Probe',
    cor: '#ffd23f',
    descricao: 'A sonda "toca" a atmosfera do Sol (coroa solar) com escudo térmico de carbono suportando ~1.377°C. Usou 7 sobrevoos de Vênus como estilingues gravitacionais para encolher a órbita — no 3D, cada volta da espiral mergulha mais perto do Sol, até o periélio recorde de 2024. Velocidade recorde de ~690.000 km/h, a mais rápida já construída por humanos.',
    estado: 'Ativa — a sonda mais próxima do Sol já construída',
    interestelar: false,
    // Trajetória dedicada: órbita kepleriana que encolhe a cada sobrevoo de
    // Vênus (ver _construirTrajetoriaEspiral em trajetorias.js). Datas dos 7
    // sobrevoos e periélios pós-sobrevoo (UA) são os reais da missão
    // (fontes: NASA/JHU APL, ver ROADMAP-AJUSTES.md seção 5).
    espiral: {
      dataLancamento: '2018-08-12',
      sobrevoos: [
        '2018-10-03', '2019-12-26', '2020-07-11', '2021-02-20',
        '2021-10-16', '2023-08-21', '2024-11-06'
      ],
      perieliosUA: [0.166, 0.130, 0.095, 0.074, 0.062, 0.053, 0.046],
      dataPerielioRecorde: '2024-12-24',
      dataFimLinha: '2025-06-01'
    },
    paradas: [
      { corpo: 'terra', data: '2018-08-12', rotulo: 'Lançamento de Cabo Canaveral' },
      { corpo: 'venus', data: '2018-10-03', rotulo: '1º estilingue em Vênus' },
      { corpo: 'venus', data: '2019-12-26', rotulo: '2º estilingue em Vênus' },
      { corpo: 'venus', data: '2020-07-11', rotulo: '3º estilingue em Vênus' },
      { corpo: 'venus', data: '2021-02-20', rotulo: '4º estilingue em Vênus' },
      { corpo: 'venus', data: '2021-10-16', rotulo: '5º estilingue em Vênus' },
      { corpo: 'venus', data: '2023-08-21', rotulo: '6º estilingue em Vênus' },
      { corpo: 'venus', data: '2024-11-06', rotulo: '7º e último estilingue em Vênus' },
      { corpo: 'sol', data: '2024-12-24', rotulo: 'Periélio recorde — mais perto do Sol na história' }
    ]
  },
  {
    id: 'perseverance',
    nome: 'Perseverance',
    cor: '#c1440e',
    descricao: 'Rover do tamanho de um carro procurando sinais de vida microbiana antiga em Marte. Coleta e guarda amostras de rocha marciana para uma futura missão de retorno à Terra. Carregou o pequeno helicóptero Ingenuity, primeiro voo motorizado em outro planeta (2021).',
    estado: 'Ativa — explorando a cratera Jezero em Marte',
    interestelar: false,
    paradas: [
      { corpo: 'terra', data: '2020-07-30', rotulo: 'Lançamento de Cabo Canaveral' },
      { corpo: 'marte', data: '2021-02-18', rotulo: 'Pouso na cratera Jezero' }
    ]
  }
];
