// Fichas de estudo da descida de Huygens. Geometria de montagem apenas ilustrativa.
export const FONTES = {
  spacecraft: { nome: 'ESA · A sonda Huygens', url: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Huygens_spacecraft' },
  timeline: { nome: 'ESA · Cronologia da descida', url: 'https://www.esa.int/About_Us/ESOC/Timeline_for_Huygens_descent' },
  mission: { nome: 'NASA Science · Cassini-Huygens', url: 'https://science.nasa.gov/mission/cassini-huygens/' },
  landing: { nome: 'ESA · Huygens pousa em Titã', url: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Europe_reaches_new_frontier_Huygens_lands_on_Titan' }
};

export const RESUMO = {
  introducao: 'Cassini transportou Huygens até Titã. A sonda entrou na atmosfera, desceu com paraquedas e enviou dados à nave em órbita, que os retransmitiu à Terra.',
  credito: 'O modelo exterior da nave Cassini-Huygens é original da NASA. O interior da sonda, os escudos, os paraquedas e suas divisões são representações artísticas do app; não reproduzem separações físicas exatas nem a escala e a sequência completas do voo.',
  fatos: [
    ['Sonda', 'Huygens · ESA'],
    ['Diâmetro', '2,7 m'],
    ['Pouso', '14/01/2005 · Titã'],
    ['Comunicação', 'Huygens → Cassini → Terra'],
    ['Paraquedas', 'Piloto, principal e menor']
  ],
  fontes: ['spacecraft', 'timeline', 'mission', 'landing']
};

export const PARTES = [
  {
    id: 'orbiter', curto: 'Orbitador Cassini', nome: 'Nave orbitadora Cassini', apelido: 'A companheira que retransmite',
    crianca: 'Cassini levou Huygens até Saturno e depois ficou em órbita. Durante a descida e na superfície, recebeu os sinais da sonda e os enviou à Terra.',
    analogia: 'Como uma torre de comunicação no espaço, que recebe uma mensagem de longe e a encaminha.',
    destino: 'Permaneceu em órbita de Saturno; encerrou a missão em 2017 mergulhando na atmosfera do planeta.',
    pergunta: 'Por que Huygens enviava seus dados para Cassini?',
    detalhes: 'A antena de Huygens transmitia à Cassini enquanto a nave passava pela região de Titã. Cassini armazenava e retransmitia os dados para as equipes na Terra. Huygens não enviava diretamente à Terra os dados da descida.',
    engenharia: 'A geometria externa mostrada vem do modelo NASA/Cassini-Huygens. A animação agrupa a nave como uma única peça e não detalha suas antenas e instrumentos.',
    curiosidades: ['Cassini e Huygens foram construídas por NASA e ESA em parceria.', 'A nave Cassini continuou a explorar Saturno por mais de 13 anos em órbita.'],
    missoes: ['Cassini liberou Huygens em dezembro de 2004 e retransmitiu os dados da descida em janeiro de 2005.'],
    numeros: [['Papel na descida', 'Retransmitir dados'], ['Destino', 'Órbita de Saturno'], ['Fim da missão', '2017']], fontes: ['mission', 'landing']
  },
  {
    id: 'probe', curto: 'Sonda Huygens', nome: 'Módulo de descida Huygens', apelido: 'Uma visitante em Titã',
    crianca: 'Huygens atravessou a atmosfera de Titã sob paraquedas, estudou o ambiente e pousou em solo seco. Mesmo depois de tocar o chão, continuou enviando informações.',
    analogia: 'Uma cápsula robótica que desce com cuidado e conta o que encontra pelo caminho.',
    destino: 'Pousou em Titã e transmitiu dados à Cassini por cerca de 72 minutos após o pouso.',
    pergunta: 'Huygens pousou em um lago de metano?',
    detalhes: 'A sonda de 2,7 metros carregava instrumentos para estudar a atmosfera e a superfície. O pouso ocorreu em solo seco. Imagens mostraram pedras e seixos de gelo de água; não eram evidência de um lago de água líquida.',
    engenharia: 'A carcaça externa usa o modelo original NASA. Interior, instrumentos visíveis e divisões do módulo nesta vista são artísticos e não representam cortes físicos exatos.',
    curiosidades: ['Huygens foi a primeira sonda a pousar na superfície de Titã.', 'A superfície é muito fria; o gelo de água pode formar rochas e seixos.'],
    missoes: ['Cassini-Huygens: lançamento em 1997, chegada a Saturno em 2004 e pouso de Huygens em 2005.'],
    numeros: [['Diâmetro', '2,7 m'], ['Pouso', '14/01/2005'], ['Transmissão após o pouso', 'Cerca de 72 min']], fontes: ['spacecraft', 'landing', 'mission']
  },
  {
    id: 'heatshield', curto: 'Escudo frontal', nome: 'Escudo térmico frontal', apelido: 'A proteção da entrada',
    crianca: 'Os escudos protegeram Huygens durante a entrada em alta velocidade na atmosfera. Depois, foram liberados para a sonda continuar descendo e usar seus instrumentos.',
    analogia: 'Uma camada resistente que protege uma carga enquanto ela atravessa uma região difícil.',
    destino: 'Foram liberados durante a descida e não permaneceram com a sonda na superfície.',
    pergunta: 'Quando os escudos cumpriram sua função principal?',
    detalhes: 'O conjunto de proteção envolvia o módulo de descida. Na sequência real, a proteção frontal foi liberada depois da abertura do paraquedas principal; a carenagem traseira foi removida antes, com ajuda do paraquedas piloto.',
    engenharia: 'Esta ficha mostra o escudo frontal; o casco traseiro tem uma ficha própria. As formas e divisões visíveis são simplificações artísticas, sem simular materiais ablativos ou uma separação física detalhada.',
    curiosidades: ['O escudo frontal protegia a face da sonda voltada para o fluxo durante a entrada.', 'O casco traseiro também levava o sistema de paraquedas.'],
    missoes: ['Huygens atravessou a atmosfera de Titã em 14 de janeiro de 2005.'],
    numeros: [['Conjunto', 'Escudo frontal'], ['Função', 'Proteção na entrada'], ['Descarte', 'Durante a descida']], fontes: ['spacecraft', 'timeline']
  },
  {
    id: 'backshell', curto: 'Casco traseiro', nome: 'Casco traseiro da sonda', apelido: 'A tampa que sai primeiro',
    crianca: 'O casco traseiro fazia parte da proteção de Huygens e guardava o sistema de paraquedas. O paraquedas piloto ajudou a removê-lo após a entrada.',
    analogia: 'Como a tampa de uma embalagem protetora que precisa sair para revelar o objeto de dentro.',
    destino: 'Foi removido durante a descida, antes da abertura do paraquedas principal.',
    pergunta: 'O que ajudou a remover o casco traseiro?',
    detalhes: 'Após a entrada atmosférica, o paraquedas piloto foi aberto e a cobertura traseira foi retirada. A sonda então prosseguiu para a sequência do paraquedas principal.',
    engenharia: 'O casco é uma peça didática simplificada. Sua forma, encaixes e separação no modelo não descrevem a estrutura original com precisão física.',
    curiosidades: ['O paraquedas piloto fazia parte da sequência de abertura, não era o paraquedas que sustentou a maior parte da descida.'],
    missoes: ['Na cronologia de Huygens, a remoção do casco precedeu a abertura do paraquedas principal.'],
    numeros: [['Momento de liberação', 'Após a entrada'], ['Sistema associado', 'Paraquedas piloto'], ['Permanece no pouso?', 'Não']], fontes: ['timeline', 'spacecraft']
  },
  {
    id: 'pilot', curto: 'Paraquedas piloto', nome: 'Paraquedas piloto', apelido: 'O primeiro a abrir',
    crianca: 'Este paraquedas abriu primeiro e ajudou a remover o casco traseiro. Depois, outro paraquedas maior freou a maior parte da descida.',
    analogia: 'Um pequeno ajudante que começa a sequência para uma vela maior entrar em ação.',
    destino: 'Atuou no início da descida sob paraquedas e não pousou com o módulo.',
    pergunta: 'O paraquedas piloto era o maior dos três?',
    detalhes: 'A cronologia da ESA descreve a abertura do paraquedas piloto e a remoção da cobertura traseira antes da abertura do paraquedas principal.',
    engenharia: 'A forma mostrada é uma substituição artística; tamanho, tecido, linhas e inflação não reproduzem o equipamento real.',
    curiosidades: ['A sequência incluiu três paraquedas: piloto, principal e um menor usado depois.'],
    missoes: ['O piloto iniciou a sequência de desaceleração após a entrada de Huygens.'],
    numeros: [['Posição na sequência', 'Primeiro'], ['Ajuda a remover', 'Casco traseiro'], ['Sistema', 'Paraquedas']], fontes: ['timeline', 'spacecraft']
  },
  {
    id: 'main', curto: 'Paraquedas principal', nome: 'Paraquedas principal', apelido: 'A grande vela da descida',
    crianca: 'O paraquedas principal freou Huygens enquanto a sonda atravessava a atmosfera. Mais tarde, foi substituído por um paraquedas menor.',
    analogia: 'Uma vela aberta no ar, que aumenta a resistência e ajuda a desacelerar.',
    destino: 'Foi substituído pelo paraquedas menor durante a descida.',
    pergunta: 'O paraquedas principal ficou aberto até o pouso?',
    detalhes: 'Depois da abertura do principal, a proteção frontal foi liberada para expor os instrumentos. Aproximadamente 15 minutos depois, o principal foi substituído por um paraquedas menor.',
    engenharia: 'A animação representa a troca com peças separadas para facilitar a observação. O tamanho e a geometria do paraquedas são artísticos.',
    curiosidades: ['A descida durou mais de duas horas entre entrada atmosférica e chegada à superfície.'],
    missoes: ['O paraquedas principal desacelerou Huygens antes da fase final sob o paraquedas menor.'],
    numeros: [['Função', 'Frear a descida'], ['Depois', 'Troca por paraquedas menor'], ['Tempo até a troca', 'Cerca de 15 min']], fontes: ['timeline', 'landing']
  },
  {
    id: 'drogue', curto: 'Paraquedas menor', nome: 'Paraquedas menor da descida', apelido: 'A vela para a etapa final',
    crianca: 'Depois de cerca de 15 minutos sob o paraquedas principal, Huygens passou a descer com um paraquedas menor até a superfície.',
    analogia: 'Uma vela menor que mantém o movimento controlado quando a etapa anterior termina.',
    destino: 'Acompanhou a fase final da descida; não ficou unido à sonda como uma parte do módulo.',
    pergunta: 'Por que trocar o paraquedas principal por um menor?',
    detalhes: 'A troca encurtava a descida e ajudava a conservar a energia das baterias para as observações na superfície. A designação aqui é descritiva; a sequência oficial da ESA chama essa peça de paraquedas menor.',
    engenharia: 'O termo "drogue" é um rótulo didático usado pelo app. A peça é uma representação artística e não uma reconstrução dimensional exata.',
    curiosidades: ['Huygens continuou coletando dados durante a descida e após o pouso, até o sinal deixar de ser recebido.'],
    missoes: ['A sonda pousou em solo seco de Titã em 14 de janeiro de 2005.'],
    numeros: [['Abertura', 'Após cerca de 15 min sob o principal'], ['Papel', 'Fase final da descida'], ['Pouso', 'Solo seco em Titã']], fontes: ['timeline', 'landing']
  }
];

export function posicaoParte(p, index, explodido) {
  const offsets = { orbiter: 0, probe: 0, heatshield: 1, backshell: 2, pilot: 3, main: 4, drogue: 5 };
  if (p.id === 'orbiter') return { x: explodido ? 17 : 0, y: 2, z: 0 };
  return { x: 0, y: explodido ? (offsets[p.id] ?? index) * 5 : 0, z: 0 };
}
