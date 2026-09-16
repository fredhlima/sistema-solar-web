// Discovery / STS-31. Geometry is illustrative, not a flight simulation.
export const FONTES={
 missao:{nome:'NASA · Discovery / STS-31',url:'https://www.nasa.gov/mission/sts-31/'},
 voo:{nome:'NASA · Como o Shuttle voava',url:'https://www.nasa.gov/history/sts1/pages/how.html'},
 tanque:{nome:'NASA · Tanque externo',url:'https://www.nasa.gov/space-shuttle-recordation/external-tank/'},
 motores:{nome:'NASA · Motores principais',url:'https://www.nasa.gov/space-shuttle-recordation/engines/'},
 estrutura:{nome:'NASA · Conheça o Space Shuttle (PDF)',url:'https://www.nasa.gov/wp-content/uploads/2016/08/113009main_walkaround.pdf'},
 hubble:{nome:'NASA · Projeto do Hubble',url:'https://science.nasa.gov/mission/hubble/observatory/design/'}
};
export const PARTES=[
 {id:'orbiter',curto:'Discovery',nome:'Orbitador · Discovery',apelido:'A nave que volta planando',
  crianca:'Parece um avião, mas viajava ao espaço! Aqui ficavam os astronautas e a carga. Na STS-31, cinco pessoas levaram o Hubble para observar o Universo.',
  analogia:'Pense em um laboratório com asas e uma grande garagem nas costas.',destino:'Voltou à Terra e pousou em uma pista. Não foi até a Lua.',
  pergunta:'Encontre as janelas, as asas e a cauda. Onde você guardaria o Hubble?',
  detalhes:'Na missão STS-31, o Discovery partiu em 24/04/1990 e pousou em Edwards em 29/04. A tripulação foi Loren Shriver, Charles Bolden, Steven Hawley, Bruce McCandless e Kathryn Sullivan. A aproximação final era um planeio sem propulsão dos motores principais.',
  numeros:[['Missão','STS-31'],['Tripulantes nesta missão','5'],['Destino','Órbita da Terra']],fontes:['missao','voo'],base:0,altura:37,raio:12},
 {id:'tank',curto:'Tanque externo',nome:'Tanque externo · ET',apelido:'O grande reservatório laranja',
  crianca:'Ele guardava líquidos muito frios que alimentavam os motores da nave. Não tinha um motor próprio!',
  analogia:'É um reservatório que a nave leva por fora, para deixar mais espaço dentro.',destino:'Era solto e se desintegrava na atmosfera. Não era reutilizado.',pergunta:'Compare com os propulsores brancos: qual peça não tem saída de motor?',
  detalhes:'Compartimentos separados armazenavam hidrogênio líquido e oxigênio líquido. O tanque também unia estruturalmente o orbitador e os propulsores sólidos. A cor vem do isolamento de espuma, representado aqui por textura procedural.',
  numeros:[['Conteúdo','Hidrogênio + oxigênio líquidos'],['Motor próprio','Nenhum'],['Reutilização','Não']],fontes:['tanque'],base:0,altura:47,raio:4.2},
 ...[-1,1].map((side,i)=>({id:i?'srb-right':'srb-left',curto:`Propulsor ${i?'direito':'esquerdo'}`,nome:`Propulsor sólido · ${i?'direito':'esquerdo'} na vista frontal`,apelido:'Um dos dois ajudantes da largada',
  crianca:'Este foguete branco e seu parceiro davam um grande empurrão na partida. Dentro havia uma mistura sólida que queimava para produzir gases muito rápidos.',
  analogia:'São dois ajudantes que fazem a parte mais pesada do começo da viagem.',destino:'Após cerca de dois minutos, separavam-se e desciam de paraquedas ao oceano para recuperação.',pergunta:'Quantos propulsores sólidos você consegue encontrar no conjunto?',
  detalhes:'Os SRBs eram acesos no lançamento. Seu impulso não podia ser desligado como o de um motor de propelentes líquidos. As tubeiras móveis ajudavam a orientar a subida; após a recuperação, componentes eram preparados para novos voos.',
  numeros:[['Quantidade no conjunto','2'],['Propelente','Mistura sólida'],['Separação','≈ 2 minutos após a partida']],fontes:['voo','estrutura'],base:0,altura:45.5,raio:1.85,side})),
 {id:'engines',curto:'3 motores principais',nome:'Motores principais · SSME',apelido:'Três motores, um reservatório externo',
  crianca:'Estes três motores ficam atrás do Discovery. Recebiam os líquidos do tanque laranja e continuavam funcionando depois que os foguetes brancos se soltavam.',
  analogia:'São três motores bebendo de um reservatório que fica do lado de fora.',destino:'Voltavam à Terra presos à nave. No Hangar são afastados só para você estudar.',pergunta:'Olhe a nave por baixo: consegue contar três grandes saídas?',
  detalhes:'Os SSMEs queimavam hidrogênio e oxigênio. Operavam durante aproximadamente 8,5 minutos da subida. Não eram usados para o planeio de pouso nem para manobras orbitais, que empregavam outros propulsores.',
  numeros:[['Quantidade','3'],['Propelentes','Hidrogênio + oxigênio'],['Operação na subida','≈ 8,5 minutos']],fontes:['motores'],base:0,altura:4,raio:3},
 ...[-1,1].map((side,i)=>({id:i?'door-right':'door-left',curto:`Porta ${i?'direita':'esquerda'}`,nome:`Porta do compartimento · ${i?'direita':'esquerda'}`,apelido:'Uma tampa para proteger a carga',
  crianca:'Estas duas portas fechavam o grande compartimento nas costas da nave. No espaço, elas abriam para dar acesso à carga.',
  analogia:'Pense em duas tampas curvas de um estojo enorme.',destino:'Ficavam presas à nave e eram fechadas antes da volta. Aqui se afastam para facilitar a observação.',pergunta:'O que estava escondido quando as duas portas estavam fechadas?',
  detalhes:'O compartimento transportava satélites e equipamentos. No modelo, as portas são afastadas lateralmente; isso não reproduz seu movimento real em dobradiças. A animação não representa descarte durante o voo.',
  numeros:[['Portas','2'],['No voo real','Permanecem na nave']],fontes:['estrutura'],base:0,altura:18,raio:2.6,side})),
 {id:'hubble',curto:'Hubble · carga',nome:'Telescópio espacial · Hubble',apelido:'Um observatório dentro da nave',
  crianca:'Sim, o Hubble foi ao espaço dentro do Discovery! Depois de sair, passou a observar estrelas e galáxias acima da atmosfera.',
  analogia:'É como levar um observatório em uma mudança e instalá-lo no espaço.',destino:'Foi liberado em órbita em 25/04/1990. Não voltou com a tripulação.',pergunta:'Monte o conjunto e depois separe: onde o telescópio estava guardado?',
  detalhes:'Na STS-31, o braço robótico retirou o Hubble do compartimento. Aqui ele se afasta sem simular a operação completa. Seu corpo tem cerca de 13,2 m de comprimento; o espelho principal mede 2,4 m. Painéis solares transformam luz em eletricidade. A geometria dos painéis de 1990 é aproximada.',
  numeros:[['Lançamento','24/04/1990'],['Liberação','25/04/1990'],['Comprimento','≈ 13,2 m'],['Espelho principal','2,4 m']],fontes:['missao','hubble'],base:0,altura:13.2,raio:2.1}
];
export function posicaoParte(p,index,explodido){
 const a={orbiter:[0,0,7.5],tank:[0,8.5,0],'srb-left':[-6.2,0,0],'srb-right':[6.2,0,0],engines:[0,0,7.5],'door-left':[0,0,7.5],'door-right':[0,0,7.5],hubble:[0,12,7.5]};
 const b={orbiter:[0,0,16],tank:[0,18,-12],'srb-left':[-20,0,-3],'srb-right':[20,0,-3],engines:[0,-9,16],'door-left':[-9,8,20],'door-right':[9,8,20],hubble:[0,32,27]};
 const [x,y,z]=(explodido?b:a)[p.id];return {x,y,z};
}
