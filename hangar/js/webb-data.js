// Fichas educativas das principais partes mostradas na sequência do Webb.
// As peças e sua separação visual são didáticas; não afirmam reproduzir cortes ou movimentos exatos.
export const FONTES = {
  mission: { nome: 'NASA Science · James Webb Space Telescope', url: 'https://science.nasa.gov/mission/webb/' },
  deployment: { nome: 'NASA Science · Implantação do Webb', url: 'https://science.nasa.gov/mission/webb/deployment/' },
  model: { nome: 'NASA Science · Modelo 3D do Webb', url: 'https://science.nasa.gov/3d-resources/james-webb-space-telescope/' },
  sunshield: { nome: 'NASA Science · Escudo solar do Webb', url: 'https://science.nasa.gov/mission/webb/webbs-sunshield/' },
  mirrors: { nome: 'NASA Science · Espelhos do Webb', url: 'https://science.nasa.gov/mission/webb/webbs-mirrors/' },
  orbit: { nome: 'NASA Science · Órbita do Webb', url: 'https://science.nasa.gov/mission/webb/orbit/' },
  instruments: { nome: 'NASA Science · Instrumentos do Webb', url: 'https://science.nasa.gov/mission/webb/instruments/' }
};

export const RESUMO = {
  introducao: 'O telescópio espacial James Webb foi lançado dobrado e abriu suas estruturas no espaço. O painel solar fornece energia, o escudo de cinco camadas ajuda a manter frios os espelhos e instrumentos, e os espelhos encaminham a luz até os instrumentos científicos.',
  credito: 'A NASA disponibiliza um recurso 3D do Webb. A geometria exterior original é preservada e agrupada por materiais; as cinco peças desta ficha são agrupamentos didáticos, não uma afirmação de que o observatório se separa fisicamente nessas partes. A sequência de abertura é uma aproximação educativa, não uma reprodução dos movimentos de engenharia.',
  fatos: [
    ['Lançamento', '25/12/2021'],
    ['Espelho primário', '18 segmentos · 6,5 m'],
    ['Escudo solar', '5 camadas'],
    ['Faixa observada', 'Infravermelho'],
    ['Destino operacional', 'Órbita ao redor do Sol, perto de L2']
  ],
  fontes: ['mission', 'deployment', 'model', 'sunshield', 'mirrors', 'orbit', 'instruments']
};

export const PARTES = [
  {
    id: 'bus', curto: 'Módulo de serviço', nome: 'Módulo de serviço', apelido: 'A base que dá suporte ao observatório',
    crianca: 'O módulo de serviço reúne sistemas que ajudam Webb a funcionar, como energia, comunicação, orientação e controle. Ele apoia a parte científica do observatório.',
    analogia: 'Como a mochila de equipamentos de um explorador: guarda recursos e sistemas que ajudam a missão a trabalhar.',
    destino: 'Permanece ligado ao observatório durante sua operação perto do ponto L2.',
    pergunta: 'Qual é o papel do módulo de serviço?',
    detalhes: 'O módulo de serviço, também chamado spacecraft bus, dá suporte aos sistemas da nave. A sequência didática pode mostrar cabos, antenas ou formas simplificadas; esses detalhes visuais não são um inventário de peças físicas separáveis.',
    engenharia: 'Agrupamento didático baseado no módulo de serviço do observatório. A forma e os limites da peça no app podem ser simplificados e não representam um corte técnico exato.',
    curiosidades: ['O painel solar fornece energia elétrica ao observatório.', 'Webb troca dados com equipes na Terra por comunicação de rádio.'],
    missoes: ['O lançamento ocorreu em 25 de dezembro de 2021; Webb segue em órbita ao redor do Sol perto de L2.'],
    numeros: [['Papel', 'Suporte aos sistemas da nave'], ['Lançamento', '25/12/2021'], ['Ambiente de operação', 'Órbita solar perto de L2']], fontes: ['mission', 'deployment', 'orbit']
  },
  {
    id: 'sunshield', curto: 'Escudo solar', nome: 'Escudo solar de cinco camadas', apelido: 'A sombra que mantém Webb frio',
    crianca: 'O escudo solar fica entre o Sol e os instrumentos. Suas cinco camadas ajudam a bloquear o calor, para que o telescópio possa observar sinais infravermelhos muito fracos.',
    analogia: 'Como várias camadas de sombra que reduzem o calor antes que ele chegue a instrumentos delicados.',
    destino: 'Permanece aberto durante as observações e protege o lado frio do observatório.',
    pergunta: 'Por que Webb precisa do escudo solar?',
    detalhes: 'As cinco membranas se desdobraram e foram tensionadas durante a implantação. O escudo ajuda a reduzir o aquecimento causado pelo Sol, pela Terra e pela Lua e também pelo próprio observatório.',
    engenharia: 'A implantação real envolveu muitas estruturas, cabos e mecanismos. A peça mostrada no app é um agrupamento didático; sua forma, separação e sequência visual são simplificadas.',
    curiosidades: ['O escudo tem cinco camadas.', 'Manter os instrumentos frios é importante para observar no infravermelho.'],
    missoes: ['A implantação do escudo solar ocorreu durante a primeira semana depois do lançamento.'],
    numeros: [['Camadas', '5'], ['Função', 'Reduzir calor e luz indesejados'], ['Ajuda a observar', 'Infravermelho']], fontes: ['sunshield', 'deployment', 'instruments']
  },
  {
    id: 'primary', curto: 'Espelho primário', nome: 'Espelho primário segmentado', apelido: 'O grande coletor de luz',
    crianca: 'O espelho principal coleta a luz que chega de estrelas, galáxias e outros alvos. Ele tem 18 segmentos hexagonais que foram alinhados para trabalhar como um único espelho.',
    analogia: 'Como vários pedaços de um mosaico que, alinhados com cuidado, formam uma única imagem refletora.',
    destino: 'Permanece apontado para os alvos científicos enquanto Webb observa.',
    pergunta: 'Quantos segmentos formam o espelho primário de Webb?',
    detalhes: 'O espelho primário mede cerca de 6,5 metros de ponta a ponta e é composto por 18 segmentos hexagonais. Depois da implantação, os segmentos foram ajustados para funcionar juntos como um espelho único.',
    engenharia: 'Os segmentos laterais foram dobrados para caber no foguete e abertos depois do lançamento. Esta peça didática representa o conjunto, sem alegar que segmentos individuais se separem como mostrado.',
    curiosidades: ['O espelho principal de Webb é maior do que caberia aberto no foguete.', 'A cor dourada vem de uma camada muito fina de ouro sobre os espelhos.'],
    missoes: ['As asas do espelho primário foram abertas em janeiro de 2022; o alinhamento óptico veio depois.'],
    numeros: [['Segmentos', '18 hexágonos'], ['Diâmetro', 'Cerca de 6,5 m'], ['Papel', 'Coletar luz']], fontes: ['mirrors', 'deployment', 'model']
  },
  {
    id: 'secondary', curto: 'Espelho secundário', nome: 'Espelho secundário', apelido: 'O refletor à frente do espelho principal',
    crianca: 'O espelho secundário recebe a luz refletida pelo espelho principal e a direciona para os instrumentos, que registram as observações.',
    analogia: 'Como um espelho pequeno que encaminha um feixe de luz para onde os sensores conseguem analisá-lo.',
    destino: 'Fica diante do espelho principal, sustentado por uma estrutura do telescópio.',
    pergunta: 'Para onde o espelho secundário encaminha a luz?',
    detalhes: 'A estrutura de suporte do espelho secundário se estendeu durante a implantação. O espelho ajuda a conduzir a luz coletada pelo primário para os instrumentos científicos.',
    engenharia: 'O tripé e os mecanismos de implantação são muito mais detalhados que esta representação. A distância e a separação visual da peça no app são artísticas e não estão em escala.',
    curiosidades: ['O espelho secundário fica à frente do espelho principal.', 'A implantação de Webb foi acompanhada e comandada por equipes na Terra.'],
    missoes: ['O suporte do espelho secundário foi implantado antes das asas laterais do espelho primário.'],
    numeros: [['Papel', 'Direcionar a luz'], ['Posição', 'Diante do espelho primário'], ['Destino da luz', 'Instrumentos científicos']], fontes: ['mirrors', 'deployment', 'instruments']
  },
  {
    id: 'solar', curto: 'Painel solar', nome: 'Painel solar', apelido: 'A fonte de eletricidade de Webb',
    crianca: 'O painel solar transforma luz do Sol em eletricidade para alimentar os sistemas do observatório. Ele foi uma das primeiras partes a se abrir depois do lançamento.',
    analogia: 'Como uma calculadora solar: usa a luz para produzir energia elétrica.',
    destino: 'Permanece aberto para fornecer energia durante a missão.',
    pergunta: 'O que o painel solar fornece ao observatório?',
    detalhes: 'O painel solar se implantou logo após a separação do estágio superior do foguete. Além dele, Webb também abriu sua antena de comunicação durante os primeiros passos da missão.',
    engenharia: 'A peça é apresentada como um agrupamento educativo do painel solar. Forma, articulações e movimentos simplificados não descrevem o mecanismo completo de implantação.',
    curiosidades: ['O painel solar foi uma das primeiras implantações depois do lançamento.', 'Ele ajuda a fornecer energia elétrica para a missão.'],
    missoes: ['Webb foi lançado dobrado e começou a implantação pouco depois de se separar do foguete.'],
    numeros: [['Papel', 'Fornecer eletricidade'], ['Implantação', 'Pouco depois do lançamento'], ['Fonte de energia', 'Luz solar']], fontes: ['deployment', 'mission']
  }
];

export function posicaoParte(p, index, explodido) {
  const offsets = {bus:[0,0,0],sunshield:[0,-2.5,0],primary:[0,2.5,0],secondary:[0,2,3],solar:[3,0,0]};
  const [x,y,z]=explodido?(offsets[p.id]||[0,0,0]):[0,0,0];return{x,y,z};
}
