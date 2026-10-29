// Roteiro didático sobre assistências gravitacionais. Os ângulos são escolhas
// idealizadas para a interação visual; não representam trajetórias de missões.
const ETAPAS_ASSISTENCIAS = [
  {
    titulo: { pt: 'Uma passagem pode mudar uma viagem', en: 'A flyby can change a journey', es: 'Un sobrevuelo puede cambiar un viaje' },
    corpo: {
      pt: 'Uma assistência gravitacional acontece quando uma nave passa perto de um planeta em movimento. A gravidade curva o caminho da nave e pode alterar sua velocidade em relação ao Sol.',
      en: 'A gravity assist happens when a spacecraft passes near a moving planet. Gravity bends the spacecraft’s path and can change its speed relative to the Sun.',
      es: 'Una asistencia gravitatoria ocurre cuando una nave pasa cerca de un planeta en movimiento. La gravedad curva el camino de la nave y puede cambiar su velocidad respecto al Sol.'
    },
    astro: 'jupiter',
    experimento: { tipo: 'assistencias', angulo: 30, efeito: 'ganhar' }
  },
  {
    titulo: { pt: 'A gravidade curva a trajetória', en: 'Gravity bends the path', es: 'La gravedad curva la trayectoria' },
    corpo: {
      pt: 'Ao se aproximar, a nave é atraída pelo planeta; ao se afastar, sua direção já mudou. A curva depende da geometria do encontro e da distância da passagem.',
      en: 'As it approaches, the spacecraft is pulled by the planet; as it departs, its direction has changed. The bend depends on the encounter geometry and flyby distance.',
      es: 'Al acercarse, la nave es atraída por el planeta; al alejarse, su dirección ya ha cambiado. La curva depende de la geometría del encuentro y de la distancia del sobrevuelo.'
    },
    experimento: { tipo: 'assistencias', angulo: 60, efeito: 'ganhar' }
  },
  {
    titulo: { pt: 'O referencial do planeta', en: 'The planet’s frame of reference', es: 'El sistema de referencia del planeta' },
    corpo: {
      pt: 'Imagine acompanhar a passagem junto com o planeta. No modelo ideal de um sobrevoo sem propulsão, a nave sai com a mesma rapidez de longe, |v∞|, que tinha ao chegar; mudou a direção, não essa rapidez.',
      en: 'Imagine following the flyby alongside the planet. In the ideal model of an unpowered flyby, the spacecraft leaves with the same far-away speed, |v∞|, that it had on arrival; its direction changed, not that speed.',
      es: 'Imagina seguir el sobrevuelo junto con el planeta. En el modelo ideal de un sobrevuelo sin propulsión, la nave sale con la misma rapidez lejana, |v∞|, que tenía al llegar; cambió la dirección, no esa rapidez.'
    },
    experimento: { tipo: 'assistencias', angulo: 90, efeito: 'planeta' }
  },
  {
    titulo: { pt: 'No referencial do Sol, a rapidez pode mudar', en: 'In the Sun’s frame, speed can change', es: 'En el sistema del Sol, la rapidez puede cambiar' },
    corpo: {
      pt: 'O planeta também se move ao redor do Sol. Somar o movimento do planeta à velocidade relativa da nave faz com que, no referencial solar, a nave possa sair mais rápida ou mais lenta.',
      en: 'The planet also moves around the Sun. Combining the planet’s motion with the spacecraft’s velocity relative to it means that, in the Sun’s frame, the spacecraft can leave faster or slower.',
      es: 'El planeta también se mueve alrededor del Sol. Al combinar el movimiento del planeta con la velocidad de la nave respecto a él, en el sistema solar la nave puede salir más rápida o más lenta.'
    },
    experimento: { tipo: 'assistencias', angulo: 90, efeito: 'ganhar' }
  },
  {
    titulo: { pt: 'A geometria decide ganhar ou perder energia', en: 'Geometry decides whether energy is gained or lost', es: 'La geometría determina si se gana o se pierde energía' },
    corpo: {
      pt: 'Passar por trás ou pela frente do planeta, em relação ao seu movimento, pode produzir resultados diferentes. Conforme a geometria, a nave ganha ou perde energia orbital em relação ao Sol.',
      en: 'Passing behind or in front of the planet relative to its motion can produce different outcomes. Depending on the geometry, the spacecraft gains or loses orbital energy relative to the Sun.',
      es: 'Pasar por detrás o por delante del planeta, respecto a su movimiento, puede producir resultados distintos. Según la geometría, la nave gana o pierde energía orbital respecto al Sol.'
    },
    experimento: { tipo: 'assistencias', angulo: 120, efeito: 'perder' }
  },
  {
    titulo: { pt: 'A energia é trocada, não criada', en: 'Energy is exchanged, not created', es: 'La energía se intercambia, no se crea' },
    corpo: {
      pt: 'Se a nave ganha energia orbital, o planeta perde uma quantidade correspondente; se a nave perde, o planeta ganha. Como o planeta é muito mais massivo, sua mudança de movimento é ínfima, mas a conservação de energia continua valendo.',
      en: 'If the spacecraft gains orbital energy, the planet loses a corresponding amount; if the spacecraft loses energy, the planet gains it. Because the planet is far more massive, its motion changes by an extremely tiny amount, while energy is still conserved.',
      es: 'Si la nave gana energía orbital, el planeta pierde una cantidad correspondiente; si la nave la pierde, el planeta la gana. Como el planeta tiene mucha más masa, su movimiento cambia de forma ínfima, pero la energía sigue conservándose.'
    },
    experimento: { tipo: 'assistencias', angulo: 60, efeito: 'planeta' }
  },
  {
    titulo: { pt: 'Uma ajuda para chegar mais longe', en: 'A boost to reach farther', es: 'Un impulso para llegar más lejos' },
    corpo: {
      pt: 'As Voyager passaram por Júpiter e usaram a assistência gravitacional para seguir em direção a Saturno. O encontro também mudou a direção do percurso, ajudando a moldar a viagem pelo Sistema Solar.',
      en: 'The Voyager spacecraft flew by Jupiter and used its gravity assist to continue toward Saturn. The encounter also changed their direction, helping shape their journeys through the solar system.',
      es: 'Las Voyager pasaron por Júpiter y usaron su asistencia gravitatoria para continuar hacia Saturno. El encuentro también cambió su dirección y ayudó a dar forma a su viaje por el sistema solar.'
    },
    experimento: { tipo: 'assistencias', angulo: 120, efeito: 'ganhar' }
  },
  {
    titulo: { pt: 'Cassini combinou várias passagens', en: 'Cassini combined several flybys', es: 'Cassini combinó varios sobrevuelos' },
    corpo: {
      pt: 'A caminho de Saturno, Cassini recebeu assistências de Vênus, da Terra e de Júpiter. Cada encontro foi escolhido para alterar a trajetória e a velocidade em relação ao Sol, economizando propelente.',
      en: 'On its way to Saturn, Cassini received gravity assists from Venus, Earth, and Jupiter. Each encounter was chosen to change its path and speed relative to the Sun while saving propellant.',
      es: 'Camino a Saturno, Cassini recibió asistencias gravitatorias de Venus, la Tierra y Júpiter. Cada encuentro se eligió para cambiar su trayectoria y velocidad respecto al Sol y ahorrar propelente.'
    },
    experimento: { tipo: 'assistencias', angulo: 90, efeito: 'ganhar' }
  },
  {
    titulo: { pt: 'Juno também usou a Terra', en: 'Juno also used Earth', es: 'Juno también usó la Tierra' },
    corpo: {
      pt: 'A sonda Juno fez um sobrevoo da Terra e usou sua gravidade para ganhar velocidade em relação ao Sol, seguindo rumo a Júpiter. Esses exemplos mostram como uma passagem planejada pode ajudar uma nave a alcançar seu destino.',
      en: 'The Juno spacecraft flew by Earth and used its gravity to gain speed relative to the Sun on its way to Jupiter. These examples show how a planned flyby can help a spacecraft reach its destination.',
      es: 'La sonda Juno sobrevoló la Tierra y usó su gravedad para ganar velocidad respecto al Sol rumbo a Júpiter. Estos ejemplos muestran cómo un sobrevuelo planificado puede ayudar a una nave a llegar a su destino.'
    },
    experimento: { tipo: 'assistencias', angulo: 30, efeito: 'ganhar' }
  },
  {
    titulo: { pt: 'Economiza combustível, mas exige navegação', en: 'It saves propellant, but still needs navigation', es: 'Ahorra propelente, pero requiere navegación' },
    corpo: {
      pt: 'Uma assistência pode reduzir o propelente necessário, mas não cria energia nem substitui a navegação. A equipe precisa planejar e medir o encontro; a nave ainda pode precisar de correções de trajetória.',
      en: 'A gravity assist can reduce the propellant needed, but it does not create energy or replace navigation. The team must plan and measure the encounter; the spacecraft may still need trajectory corrections.',
      es: 'Una asistencia puede reducir el propelente necesario, pero no crea energía ni sustituye la navegación. El equipo debe planificar y medir el encuentro; la nave aún puede necesitar correcciones de trayectoria.'
    },
    experimento: { tipo: 'assistencias', angulo: 120, efeito: 'perder' }
  }
];

const textosAssistencias = {
  pt: {
    titulo: 'Como funciona uma assistência gravitacional?',
    objetivo: 'Direção, energia e movimento dos planetas',
    objetivoTexto: 'Explore como uma passagem perto de um planeta em movimento pode mudar a trajetória e a velocidade de uma nave.',
    perguntaTexto: 'O que acontece numa assistência gravitacional ideal?',
    opcao1: 'A nave troca energia com o planeta em movimento e pode sair mais rápida ou mais lenta em relação ao Sol.',
    opcao2: 'O planeta cria energia para a nave, que sai mais rápida em qualquer passagem e não precisa de navegação.',
    certo: 'Isso! A direção muda; no referencial do planeta a rapidez de longe se conserva no modelo ideal, e no referencial do Sol a energia pode mudar conforme a geometria.',
    tentar: 'Pense em dois referenciais: acompanhando o planeta e observando o movimento em relação ao Sol.',
    recapTexto: 'A gravidade de um planeta em movimento curva a trajetória de uma nave. No modelo ideal, no referencial do planeta, a rapidez de longe |v∞| é igual antes e depois da passagem, embora a direção mude. No referencial do Sol, a nave pode ganhar ou perder energia orbital dependendo da geometria; essa energia é trocada com o planeta, cuja mudança de movimento é ínfima por sua grande massa. A assistência economiza propelente, mas não cria energia nem substitui a navegação e possíveis correções de trajetória. Exemplos incluem Voyager passando por Júpiter, Cassini usando Vênus, Terra e Júpiter, e Juno usando a Terra para seguir a Júpiter. Os ângulos desta interação são idealizados e não representam trajetórias reais de missões.',
    fonte: 'Fontes: NASA — Gravity Assists; A Gravity Assist Primer; Chapter 4: Trajectories.'
  },
  en: {
    titulo: 'How does a gravity assist work?',
    objetivo: 'Direction, energy, and planetary motion',
    objetivoTexto: 'Explore how a flyby of a moving planet can change a spacecraft’s path and speed.',
    perguntaTexto: 'What happens in an ideal gravity assist?',
    opcao1: 'The spacecraft exchanges energy with the moving planet and can leave faster or slower relative to the Sun.',
    opcao2: 'The planet creates energy for the spacecraft, which leaves faster after any flyby and needs no navigation.',
    certo: 'That’s right! Direction changes; in the planet’s frame, far-away speed is conserved in the ideal model, while in the Sun’s frame energy can change depending on geometry.',
    tentar: 'Think about two frames of reference: moving with the planet and observing motion relative to the Sun.',
    recapTexto: 'A moving planet’s gravity bends a spacecraft’s path. In the ideal model, in the planet’s frame, the far-away speed |v∞| is the same before and after the flyby, although the direction changes. In the Sun’s frame, the spacecraft can gain or lose orbital energy depending on geometry; this energy is exchanged with the planet, whose motion changes by an extremely tiny amount because of its large mass. A gravity assist saves propellant, but it does not create energy or replace navigation and possible trajectory corrections. Examples include Voyager flying by Jupiter, Cassini using Venus, Earth, and Jupiter, and Juno using Earth on its way to Jupiter. The angles in this interaction are idealized and do not represent real mission trajectories.',
    fonte: 'Sources: NASA — Gravity Assists; A Gravity Assist Primer; Chapter 4: Trajectories.'
  },
  es: {
    titulo: '¿Cómo funciona una asistencia gravitatoria?',
    objetivo: 'Dirección, energía y movimiento planetario',
    objetivoTexto: 'Explora cómo un sobrevuelo cerca de un planeta en movimiento puede cambiar la trayectoria y la velocidad de una nave.',
    perguntaTexto: '¿Qué ocurre en una asistencia gravitatoria ideal?',
    opcao1: 'La nave intercambia energía con el planeta en movimiento y puede salir más rápida o más lenta respecto al Sol.',
    opcao2: 'El planeta crea energía para la nave, que sale más rápida después de cualquier sobrevuelo y no necesita navegación.',
    certo: '¡Eso es! Cambia la dirección; en el sistema del planeta se conserva la rapidez lejana en el modelo ideal, mientras que en el del Sol la energía puede cambiar según la geometría.',
    tentar: 'Piensa en dos sistemas de referencia: acompañando al planeta y observando el movimiento respecto al Sol.',
    recapTexto: 'La gravedad de un planeta en movimiento curva la trayectoria de una nave. En el modelo ideal, en el sistema del planeta, la rapidez lejana |v∞| es la misma antes y después del sobrevuelo, aunque cambia la dirección. En el sistema del Sol, la nave puede ganar o perder energía orbital según la geometría; esa energía se intercambia con el planeta, cuyo movimiento cambia de forma ínfima debido a su gran masa. La asistencia ahorra propelente, pero no crea energía ni sustituye la navegación y las posibles correcciones de trayectoria. Algunos ejemplos son Voyager pasando por Júpiter, Cassini usando Venus, la Tierra y Júpiter, y Juno usando la Tierra rumbo a Júpiter. Los ángulos de esta interacción son idealizados y no representan trayectorias reales de misiones.',
    fonte: 'Fuentes: NASA — Gravity Assists; A Gravity Assist Primer; Chapter 4: Trajectories.'
  }
};

export const ROTEIRO_ASSISTENCIAS = {
  id: 'assistencias-gravitacionais',
  versao: 1,
  pro: true,
  recurso: 'aprendizado',
  ambiente: 'universo',
  corpo: 'jupiter',
  urlFonte: 'https://science.nasa.gov/mission/cassini/gravity-assists/',
  fontesAdicionais:[{nome:'NASA — A Gravity Assist Primer',url:'https://science.nasa.gov/learn/basics-of-space-flight/primer/'},{nome:'NASA — Chapter 4: Trajectories',url:'https://science.nasa.gov/learn/basics-of-space-flight/chapter4-1/'},{nome:'NASA — Earth From Juno',url:'https://www.nasa.gov/image-article/earth-from-juno/'}],
  textos: textosAssistencias,
  etapas: [
    ...ETAPAS_ASSISTENCIAS,
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
