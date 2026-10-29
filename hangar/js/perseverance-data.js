// Fichas documentais. O afastamento das peças é uma vista didática, não uma sequência de voo.
export const FONTES={
 chegada:{nome:'NASA/JPL · Como Perseverance chegou a Marte',url:'https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/mission/spacecraft/getting_to_mars/'},
 pouso:{nome:'NASA · Perseverance pousa em Marte',url:'https://www.nasa.gov/news-release/touchdown-nasas-mars-perseverance-rover-safely-lands-on-red-planet/'},
 ciencia:{nome:'NASA · Objetivos científicos de Perseverance',url:'https://science.nasa.gov/mission/mars-2020-perseverance/science-objectives/'},
 rover:{nome:'NASA Science · Modelo 3D original do rover',url:'https://science.nasa.gov/3d-resources/mars-2020-perseverance-rover/'},
 ingenuity:{nome:'NASA/JPL · Ingenuity viajou sob o rover',url:'https://www.jpl.nasa.gov/news/press_kits/mars_2020/ingenuity/landing/mission/'}
};
export const RESUMO={
 introducao:'Seis conjuntos ajudaram Perseverance a cruzar o espaço, atravessar o céu marciano e pousar na cratera Jezero. Explore como cada um trabalhou.',
 credito:'O rover usa um modelo 3D original da NASA. Os outros cinco conjuntos são criações artísticas do app para explicar a chegada a Marte. Suas formas e separações são didáticas; não são modelos oficiais nem uma animação fiel da NASA.',
 fatos:[['Missão','Mars 2020 · rover Perseverance'],['Pouso','18/02/2021 · cratera Jezero'],['Mobilidade','6 rodas'],['Objetivo','Estudar rochas e procurar sinais de vida microbiana antiga; vida em Marte não foi confirmada']],
 fontes:['chegada','pouso','ciencia','rover']
};
export const PARTES=[
 {id:'cruise',curto:'Etapa de cruzeiro',nome:'Etapa de cruzeiro interplanetário',apelido:'A viajante entre os planetas',
  crianca:'Esta estrutura levou a cápsula com o rover de perto da Terra até Marte. Seus painéis solares forneciam energia durante a viagem.',
  analogia:'É como um veículo de transporte que carrega uma caixa preciosa até o destino.',destino:'Separou-se antes da entrada na atmosfera de Marte.',
  pergunta:'Qual conjunto ajudou a nave a viajar pelo espaço antes da chegada?',
  detalhes:'A etapa de cruzeiro guiava a trajetória com pequenos propulsores e mantinha comunicação com a Terra. Ela não pousou junto com o rover.',
  engenharia:'Correções de trajetória ajustavam o caminho ao longo da viagem interplanetária.',
  curiosidades:['A cápsula levava o rover e o estágio de descida dentro do escudo aerodinâmico.'],
  missoes:['Na missão Mars 2020, a etapa de cruzeiro foi descartada antes da entrada marciana.'],
  numeros:[['Destino','Marte'],['Energia na viagem','Painéis solares'],['Depois da viagem','Separação antes da entrada']],fontes:['chegada']},
 {id:'backshell',curto:'Casco traseiro',nome:'Aeroshell · casco traseiro',apelido:'A tampa que protege por cima',
  crianca:'O casco protegia o rover durante a descida. Ele também carregava o paraquedas, que ajudou a reduzir a velocidade.',
  analogia:'Pense na tampa resistente de uma cápsula que protege algo delicado.',destino:'Separou-se com o paraquedas antes da descida motorizada final.',
  pergunta:'Onde ficava preso o paraquedas antes de se abrir?',
  detalhes:'O casco traseiro fazia parte do aeroshell, junto com o escudo térmico. Na chegada, o paraquedas saiu dele; depois o casco e o paraquedas se separaram do estágio de descida.',
  engenharia:'O casco também protegia contra o aquecimento da entrada, embora o escudo térmico recebesse a maior parte do calor.',
  curiosidades:['O casco carregava antenas e pesos para ajudar a nave a voar na orientação correta.'],
  missoes:['No pouso de Perseverance, casco e paraquedas se afastaram cerca de um minuto antes do toque.'],
  numeros:[['Partes do aeroshell','Casco traseiro e escudo térmico'],['Acompanha','Paraquedas antes da separação'],['Destino final','Longe do rover']],fontes:['chegada']},
 {id:'heatshield',curto:'Escudo térmico',nome:'Escudo térmico do aeroshell',apelido:'O guarda-chuva contra o calor',
  crianca:'Ao entrar no ar de Marte, a nave ficou muito quente. Este escudo protegeu o rover e depois foi descartado.',
  analogia:'É como uma proteção que recebe o calor forte para o conteúdo não receber tudo.',destino:'Foi descartado depois da abertura do paraquedas e antes do pouso.',
  pergunta:'Qual peça recebe o maior aquecimento ao atravessar a atmosfera?',
  detalhes:'O escudo ficava na base do aeroshell. Seu material ablativo ajudava a afastar o calor produzido durante a entrada na atmosfera marciana.',
  engenharia:'Sensores MEDLI2 mediram condições de aquecimento no escudo e no casco para ajudar engenheiros a projetar futuras entradas.',
  curiosidades:['O escudo foi descartado antes que o radar ajudasse na navegação final até o local de pouso.'],
  missoes:['Perseverance pousou em Jezero após atravessar a atmosfera de Marte em fevereiro de 2021.'],
  numeros:[['Material','PICA'],['Função','Proteger contra o aquecimento'],['Separação','Depois da abertura do paraquedas']],fontes:['chegada','pouso']},
 {id:'parachute',curto:'Paraquedas',nome:'Paraquedas supersônico',apelido:'A grande vela que freia',
  crianca:'O paraquedas abriu durante a descida e diminuiu a velocidade da cápsula. Ele não levou o rover até o chão: os motores fizeram essa parte.',
  analogia:'Como uma vela enorme que usa o ar para frear uma queda.',destino:'Separou-se com o casco traseiro antes da descida motorizada.',
  pergunta:'O paraquedas pousa o rover sozinho ou apenas ajuda a frear?',
  detalhes:'A cápsula abriu o paraquedas após avaliar sua posição em relação ao alvo. O grande paraquedas reduziu a velocidade antes da etapa final com motores.',
  engenharia:'O acionamento chamado Range Trigger ajudou a escolher o momento de abrir o paraquedas conforme a posição da nave.',
  curiosidades:['O paraquedas tinha 21,5 metros de diâmetro.'],
  missoes:['Depois da frenagem, o escudo térmico foi descartado e a descida continuou com ajuda do radar.'],
  numeros:[['Diâmetro','21,5 m'],['Função','Diminuir a velocidade'],['Abertura','Na atmosfera de Marte']],fontes:['chegada']},
 {id:'descent',curto:'Estágio de descida',nome:'Estágio de descida motorizada',apelido:'O guindaste voador',
  crianca:'O estágio usou oito motores para pairar. Cabos baixaram o rover até o chão; depois foram cortados e o estágio voou para longe.',
  analogia:'É como um guindaste voador que desce uma carga com cordas.',destino:'Afastou-se e caiu a uma distância segura do rover.',
  pergunta:'Como o rover passou do estágio de descida até o chão?',
  detalhes:'Após o casco traseiro se afastar, o estágio motorizado reduziu a velocidade e pairou. Um conjunto de cabos baixou Perseverance, na manobra chamada sky crane.',
  engenharia:'Quando o rover tocou o solo, os cabos foram cortados; o estágio executou uma manobra de afastamento e caiu longe do rover.',
  curiosidades:['O estágio tinha oito motores para controlar a descida final.'],
  missoes:['A mesma manobra de guindaste aéreo também foi usada para pousar o rover Curiosity.'],
  numeros:[['Motores','8'],['Cabos de descida','Ligavam o rover ao estágio'],['Depois do pouso','Estágio se afasta']],fontes:['chegada','pouso']},
 {id:'rover',curto:'Rover Perseverance',nome:'Rover Perseverance',apelido:'O explorador de seis rodas',
  crianca:'Perseverance anda por Marte, estuda rochas e guarda amostras para possível estudo futuro na Terra. Ele procura sinais de vida antiga, mas vida em Marte ainda não foi confirmada.',
  analogia:'É um laboratório robótico com rodas, câmeras e ferramentas para examinar pedras.',destino:'Explora a cratera Jezero, em Marte.',
  pergunta:'O que Perseverance procura nas rochas antigas de Jezero?',
  detalhes:'O rover investiga a geologia e o antigo ambiente de Jezero, procura sinais que poderiam ter sido preservados em rochas e coleta amostras. Ingenuity viajou preso à parte de baixo do rover; sua história será explorada em outra etapa.',
  engenharia:'O rover tem seis rodas. O modelo usado aqui é o modelo 3D original NASA; o afastamento no Hangar é apenas didático.',
  curiosidades:['O pouso aconteceu em 18 de fevereiro de 2021.'],
  missoes:['Mars 2020 levou Perseverance e o helicóptero Ingenuity até Marte.'],
  numeros:[['Rodas','6'],['Pouso','18/02/2021'],['Local','Cratera Jezero']],fontes:['pouso','ciencia','rover','ingenuity']}
];
export function posicaoParte(p,index,explodido){
 const assembled={cruise:14,parachute:17,backshell:9,heatshield:3,descent:6,rover:0};
 const exploded={cruise:27,parachute:20,backshell:13,heatshield:-3,descent:8,rover:0};
 return{x:0,y:(explodido?exploded:assembled)[p.id]??0,z:0};
}
