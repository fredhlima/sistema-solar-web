import { ETAPAS_ARTEMIS1 } from './artemis1-etapas.js?v=1';
import { TEXTOS_PECAS_ARTEMIS1 } from './artemis1-pecas-textos.js?v=1';
import { ESTADOS_ARTEMIS1, PARTES_ARTEMIS1 } from '../hangar/js/artemis1-scene-state.js?v=2';

// Conteúdo e variante artística integrados; etapas usam IDs estáveis da missão histórica.
const textosARTEMIS1 = {
  pt: {
    titulo: 'Artemis I: testar a viagem antes de levar pessoas',
    tituloCurto: 'Artemis I · teste sem tripulação',
    objetivoTexto: 'Acompanhe Orion da decolagem ao retorno e compare o que gera eletricidade com o que produz empuxo.',
    perguntaTexto: 'Qual afirmação distingue corretamente os painéis solares do ICPS durante a partida para a Lua?',
    opcao1: 'Os painéis geram eletricidade; o motor do ICPS produz empuxo para mudar a trajetória',
    opcao2: 'Os painéis empurram Orion; o ICPS fornece eletricidade aos sistemas',
    certo: 'Isso! Os painéis solares fornecem energia elétrica. A queima do ICPS produziu empuxo e iniciou a trajetória translunar.',
    tentar: 'Pense na função de cada sistema: painéis captam luz para gerar eletricidade; motores queimam propelente para mudar o movimento da nave.',
    recapTexto: 'Artemis I testou Orion sem tripulação entre 16 de novembro e 11 de dezembro de 2022. O ICPS realizou a injeção translunar depois que os painéis solares abriram; Orion então se separou, sobrevoou a Lua, percorreu uma órbita retrógrada distante e voltou à Terra. O módulo de serviço se separou antes da reentrada; a cápsula desceu de paraquedas e amerissou no Pacífico. Não houve pouso lunar.',
    pergunta: 'Vamos pensar', recap: 'O que descobrimos',
    fonte: 'Fonte: NASA · Artemis I Mission Timeline'
  },
  en: {
    titulo: 'Artemis I: testing the journey before carrying people',
    tituloCurto: 'Artemis I · uncrewed test',
    objetivoTexto: 'Follow Orion from liftoff to return, and compare what generates electricity with what produces thrust.',
    perguntaTexto: 'Which statement correctly distinguishes the solar arrays from ICPS during departure for the Moon?',
    opcao1: 'The arrays generate electricity; the ICPS engine produces thrust to change the trajectory',
    opcao2: 'The arrays push Orion; ICPS supplies electricity to the spacecraft systems',
    certo: 'Right! The solar arrays supply electrical power. The ICPS burn produced thrust and began the translunar trajectory.',
    tentar: 'Think about each system’s job: arrays collect sunlight to generate electricity; engines burn propellant to change the spacecraft’s motion.',
    recapTexto: 'Artemis I tested Orion without a crew from November 16 to December 11, 2022. ICPS performed translunar injection after the solar arrays deployed; Orion then separated, flew by the Moon, traveled in a distant retrograde orbit, and returned to Earth. The service module separated before reentry; the capsule descended by parachute and splashed down in the Pacific. There was no lunar landing.',
    pergunta: 'Let’s think', recap: 'What we discovered',
    fonte: 'Source: NASA · Artemis I Mission Timeline'
  },
  es: {
    titulo: 'Artemis I: probar el viaje antes de llevar personas',
    tituloCurto: 'Artemis I · prueba sin tripulación',
    objetivoTexto: 'Sigue a Orion desde el despegue hasta el regreso y compara qué genera electricidad con qué produce empuje.',
    perguntaTexto: '¿Qué afirmación distingue correctamente los paneles solares del ICPS durante la partida hacia la Luna?',
    opcao1: 'Los paneles generan electricidad; el motor del ICPS produce empuje para cambiar la trayectoria',
    opcao2: 'Los paneles empujan a Orion; el ICPS suministra electricidad a los sistemas',
    certo: '¡Eso es! Los paneles solares suministran energía eléctrica. El encendido del ICPS produjo empuje e inició la trayectoria translunar.',
    tentar: 'Piensa en la función de cada sistema: los paneles captan luz para generar electricidad; los motores queman propelente para cambiar el movimiento de la nave.',
    recapTexto: 'Artemis I probó Orion sin tripulación entre el 16 de noviembre y el 11 de diciembre de 2022. El ICPS realizó la inyección translunar después de desplegarse los paneles solares; Orion se separó, sobrevoló la Luna, recorrió una órbita retrógrada distante y regresó a la Tierra. El módulo de servicio se separó antes de la reentrada; la cápsula descendió en paracaídas y amerizó en el Pacífico. No hubo alunizaje.',
    pergunta: 'Vamos a pensar', recap: 'Lo que descubrimos',
    fonte: 'Fuente: NASA · Artemis I Mission Timeline'
  }
};

export const ROTEIRO_ARTEMIS1 = {
  id: 'artemis-1',
  missao: 'artemis-1',
  versao: 1,
  pro: true,
  recurso: 'aprendizado',
  ambiente: 'universo',
  corpo: 'lua',
  estado: 'integrado',
  nave: 'sls',
  pecas: PARTES_ARTEMIS1.map(p=>({id:p.id,rotulo:`peca_${p.id.replaceAll('-','_')}`})),
  urlFonte: 'https://www.nasa.gov/reference/artemis-i-mission-timeline/',
  fontesAdicionais: [{ nome: 'NASA · Distant Retrograde Orbit', url: 'https://www.nasa.gov/missions/orion-will-go-the-distance-in-retrograde-orbit-during-artemis-i/' }],
  textos: Object.fromEntries(['pt','en','es'].map(lang=>[lang,{...textosARTEMIS1[lang],...TEXTOS_PECAS_ARTEMIS1[lang]}])),
  etapas: [
    ...ETAPAS_ARTEMIS1.map((etapa,i) => {
      const focos={
        'assembled-vehicle':['core','crew-module'],liftoff:['rs25','srb-left','srb-right'],
        'booster-separation':['srb-left','srb-right'],
        'fairings-and-tower-jettison':['fairing-left','fairing-right','las'],
        'core-stage-separation':['core','rs25','icps'],
        'solar-array-deployment':['solar-1','solar-2','service-module'],
        'translunar-injection':['icps','crew-module'],
        'orion-icps-separation':['crew-module','service-module','icps'],
        'powered-lunar-flyby':['service-module','crew-module'],
        'distant-retrograde-orbit':['crew-module','solar-1'],
        'lunar-orbit-tests':['solar-1','service-module','crew-module'],
        'distant-orbit-departure':['service-module','crew-module'],
        'return-flyby':['service-module','crew-module'],
        'service-module-separation':['service-module','crew-module'],
        'atmospheric-reentry':['crew-module'],
        'parachutes-splashdown':['crew-module','parachutes'],
        'compare-power-and-thrust':['solar-1','icps','service-module']
      }[etapa.id];
      return {...etapa,fase:etapa.id,scenario:ESTADOS_ARTEMIS1[etapa.id].scenario,
        ...(i===0?{astro:'terra'}:{}),pecas:focos.map(id=>({id}))};
    }),
    { id: 'applied-question', titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { id: 'mission-summary', titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
