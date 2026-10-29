// Conteúdo da seção "Sobre a nave" do Hangar. Fontes primárias: NASA.
export const MISSOES_NAVE = {
 jwst:{resumo:'O Webb observa principalmente no infravermelho. Sua viagem inclui abertura, resfriamento e calibração antes das observações.',curiosidades:['O espelho principal reúne 18 segmentos hexagonais.','Cinco camadas do escudo reduzem o aquecimento pelos corpos próximos.','Webb orbita em torno de L2; não fica parado nesse ponto.'],missoes:[{titulo:'Lançamento · 2021',texto:'O observatório partiu em 25 de dezembro de 2021.'},{titulo:'Desdobramento · 2022',texto:'Escudo solar, espelho secundário e asas do primário foram abertos no espaço.'},{titulo:'Ciência no infravermelho',texto:'Após resfriamento e calibração, o telescópio passou a estudar objetos distantes e suas propriedades.'}],fontes:[{nome:'NASA · Desdobramento do Webb',url:'https://science.nasa.gov/mission/webb/deployment/'}]},

 cassini:{resumo:'Cassini estudou Saturno em órbita; Huygens desceu pela atmosfera de Titã e pousou em solo seco. A missão reuniu NASA, ESA e ASI.',curiosidades:['Cassini retransmitiu os dados de Huygens à Terra.','Huygens usou três paraquedas em sequência, não ao mesmo tempo.','O local de pouso mostrou seixos possivelmente compostos de gelo de água.'],missoes:[{titulo:'Cassini–Huygens · 1997',texto:'Lançamento e viagem conjunta ao sistema de Saturno.'},{titulo:'Huygens · 14/01/2005',texto:'Entrada na atmosfera, descida por paraquedas e pouso em Titã.'},{titulo:'Cassini em Saturno',texto:'A nave orbitadora continuou estudando o planeta, os anéis e suas luas.'}],fontes:[{nome:'NASA · Huygens',url:'https://science.nasa.gov/mission/cassini-huygens/'},{nome:'ESA · A sonda',url:'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Huygens_spacecraft'}]},
 ingenuity:{resumo:'Uma demonstração tecnológica mostrou que era possível voar na atmosfera fina de Marte. Perseverance transportou o helicóptero e retransmitiu suas comunicações.',curiosidades:['O primeiro voo durou 39,1 segundos, com cerca de 30 segundos pairando.','Os dois rotores giram em sentidos opostos.','O voo é autônomo: o atraso de comunicação impede joystick em tempo real.'],missoes:[{titulo:'Mars 2020 · 2021',texto:'Chegada com Perseverance, protegido sob o rover.'},{titulo:'Liberação em Jezero',texto:'Preparação das pernas, queda final de cerca de 15 cm e afastamento do rover para receber luz solar.'},{titulo:'Primeiro voo · 19/04/2021',texto:'Subida a 3 metros, voo pairado e pouso: primeiro voo motorizado e controlado em outro planeta.'}],fontes:[{nome:'NASA · Primeiro voo',url:'https://www.nasa.gov/news-release/nasas-ingenuity-mars-helicopter-succeeds-in-historic-first-flight/'},{nome:'NASA · Preparação',url:'https://www.nasa.gov/news-release/nasa-ingenuity-mars-helicopter-prepares-for-first-flight/'}]},
 perseverance:{resumo:'Mars 2020 levou Perseverance e Ingenuity a Jezero. O rover investiga rochas, ambientes antigos e possíveis sinais de vida passada; vida em Marte não foi confirmada.',curiosidades:['O rover pousou diretamente sobre suas seis rodas após ser abaixado por cabos.','O paraquedas freou parte da descida, mas os motores fizeram a aproximação final.','Ingenuity viajou preso à parte de baixo do rover.'],missoes:[{titulo:'Mars 2020 · 2020',texto:'Lançamento e viagem interplanetária com o estágio de cruzeiro.'},{titulo:'Jezero · 18/02/2021',texto:'Entrada, descida motorizada, sky crane e pouso.'},{titulo:'Exploração científica',texto:'Estudo de rochas e coleta de amostras para possível análise futura na Terra.'}],fontes:[{nome:'NASA · Pouso em Marte',url:'https://www.nasa.gov/news-release/touchdown-nasas-mars-perseverance-rover-safely-lands-on-red-planet/'},{nome:'NASA · Objetivos científicos',url:'https://science.nasa.gov/mission/mars-2020-perseverance/science-objectives/'}]},
 saturno: {
  resumo: 'O Saturn V levou as missões Apollo à Lua e lançou o Skylab. Seus três estágios colocavam a nave Apollo em órbita e, nas missões lunares, davam o impulso inicial rumo à Lua.',
  curiosidades: [
   'A unidade de instrumentos era um anel de menos de um metro de altura que orientava o foguete durante a subida.',
   'O segundo estágio usava hidrogênio e oxigênio líquidos, propelentes que precisavam permanecer muito frios.',
   'O motor J-2 do terceiro estágio podia ser desligado, esperar em órbita e reacender para a injeção translunar.',
   'O Saturn V descartava estágios vazios para ficar mais leve enquanto ganhava altitude.'
  ],
  missoes: [
   {titulo: 'Apollo 4 · 1967', texto: 'Primeiro teste de voo completo do Saturn V, sem tripulação.'},
   {titulo: 'Apollo 8 · 1968', texto: 'Primeiro voo tripulado do Saturn V e primeira viagem humana à órbita lunar.'},
   {titulo: 'Apollo 11 · 1969', texto: 'Lançou Columbia e Eagle para a missão do primeiro pouso humano na Lua.'},
   {titulo: 'Apollo 13 · 1970', texto: 'A anomalia na subida foi compensada e a nave seguiu para uma trajetória lunar.'},
   {titulo: 'Apollo 17 · 1972', texto: 'Última missão lunar tripulada do programa Apollo.'},
   {titulo: 'Skylab 1 · 1973', texto: 'Um Saturn V de dois estágios lançou a estação Skylab, cujo laboratório orbital foi construído a partir de um S-IVB adaptado.'}
  ],
  fontes: [
   {nome: 'NASA · O programa Apollo', url: 'https://www.nasa.gov/the-apollo-program/'},
   {nome: 'NASA · Apollo 4 e o primeiro Saturn V', url: 'https://www.nasa.gov/history/55-years-ago-apollo-4-the-first-flight-saturn-v-rolls-out-to-the-launch-pad/'},
   {nome: 'NASA · Skylab', url: 'https://www.nasa.gov/missions/skylab/' }
  ]
 },
 shuttle: {
  resumo: 'O Discovery foi o terceiro orbitador operacional do programa Space Shuttle. Em suas 39 missões, levou satélites, laboratórios e astronautas ao espaço, incluindo o telescópio espacial Hubble.',
  curiosidades: [
   'O orbitador voltava à Terra planando e pousava como uma aeronave, sem motores a jato.',
   'O Canadarm permitia mover cargas grandes no compartimento de carga, como o Hubble.',
   'As placas térmicas protegiam o orbitador do calor intenso da reentrada.',
   'O mesmo orbitador podia ser preparado e reutilizado em missões diferentes.'
  ],
  missoes: [
   {titulo: 'STS-41-D · 1984', texto: 'Voo de estreia do Discovery; a missão implantou três satélites de comunicação.'},
   {titulo: 'STS-31 · 1990', texto: 'Levou e liberou o telescópio espacial Hubble em órbita terrestre.'},
   {titulo: 'STS-95 · 1998', texto: 'Missão com o astronauta John Glenn, em seu retorno ao espaço.'},
   {titulo: 'STS-114 · 2005', texto: 'Primeira missão de retorno ao voo do programa Shuttle após a perda do Columbia.'},
   {titulo: 'STS-133 · 2011', texto: 'Última missão do Discovery; levou suprimentos e o módulo Leonardo à Estação Espacial Internacional.'}
  ],
  fontes: [
   {nome: 'NASA · Space Shuttle Discovery', url: 'https://www.nasa.gov/mission/space-shuttle-discovery/'},
   {nome: 'NASA · STS-31', url: 'https://www.nasa.gov/mission/sts-31/'},
   {nome: 'NASA · STS-133, missão final do Discovery', url: 'https://www.nasa.gov/history/15-years-ago-sts-133-discovery-concludes-its-final-mission/' }
  ]
 },
 'modulo-lunar': {
  resumo: 'O módulo lunar Apollo era uma nave de dois estágios: a base descia à Lua e permanecia lá; a cabine de subida trazia dois astronautas de volta à órbita lunar.',
  curiosidades: [
   'Os astronautas pilotavam em pé durante o pouso, sem assentos na cabine.',
   'Como operava no vácuo, o módulo lunar não precisava de forma aerodinâmica nem de asas.',
   'O estágio de descida ficava na Lua; somente o estágio de subida retornava à órbita.',
   'A aparência dourada externa é isolamento térmico, não uma estrutura feita de ouro.'
  ],
  missoes: [
   {titulo: 'Apollo 5 · 1968', texto: 'Teste não tripulado do módulo lunar e de seus sistemas de propulsão.'},
   {titulo: 'Apollo 9 · 1969', texto: 'Primeiro voo tripulado do módulo lunar, em órbita da Terra.'},
   {titulo: 'Apollo 10 · 1969', texto: 'Ensaio geral em órbita lunar para os procedimentos de pouso e encontro.'},
   {titulo: 'Apollo 11 · 1969', texto: 'Eagle levou Neil Armstrong e Buzz Aldrin à superfície da Lua.'},
   {titulo: 'Apollo 13 · 1970', texto: 'Aquarius serviu de abrigo para a tripulação depois da falha no módulo de serviço.'},
   {titulo: 'Apollo 17 · 1972', texto: 'Último pouso lunar tripulado do programa Apollo.'}
  ],
  fontes: [
   {nome: 'NASA · História e projeto do módulo lunar', url: 'https://www.nasa.gov/history/apollos-lunar-module-bridged-technological-leap-to-the-moon/'},
   {nome: 'NASA · Apollo 11', url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'},
   {nome: 'NASA · Locais dos pousos Apollo', url: 'https://science.nasa.gov/resource/apollo-landing-sites/' }
  ]
 },
 hubble: {
  resumo: 'O Hubble foi lançado em 1990 e projetado para receber manutenção em órbita. Astronautas o visitaram em missões do Space Shuttle para corrigir, renovar e ampliar suas capacidades científicas.',
  curiosidades: [
   'O Hubble forma imagens com espelhos, em vez de uma grande lente frontal.',
   'Rodas de reação ajudam a manter o telescópio apontado com precisão para o mesmo alvo.',
   'Painéis solares produzem energia, e baterias mantêm a operação durante a sombra da Terra.',
   'Além de imagens, seus instrumentos registram espectros para estudar propriedades da matéria.'
  ],
  missoes: [
   {titulo: 'Lançamento · 1990', texto: 'A STS-31 levou o Hubble ao espaço e o liberou em órbita terrestre.'},
   {titulo: 'Manutenção 1 · 1993', texto: 'A STS-61 instalou instrumentos e óptica corretiva para restaurar a qualidade planejada das imagens.'},
   {titulo: 'Manutenção 3B · 2002', texto: 'A STS-109 instalou a Advanced Camera for Surveys, painéis solares e outros equipamentos.'},
   {titulo: 'Manutenção 4 · 2009', texto: 'A STS-125 realizou a última manutenção, com novos instrumentos, reparos e componentes de suporte.'}
  ],
  fontes: [
   {nome: 'NASA · Missões de astronautas ao Hubble', url: 'https://science.nasa.gov/mission/hubble/observatory/missions-to-hubble/'},
   {nome: 'NASA · História do Hubble', url: 'https://science.nasa.gov/mission/hubble/overview/the-history-of-hubble/'},
   {nome: 'NASA · STS-125, última manutenção do Hubble', url: 'https://www.nasa.gov/history/15-years-ago-sts-125-the-final-hubble-servicing-mission/' }
  ]
 }
};
