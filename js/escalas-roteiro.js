// Roteiro para comparar tamanhos e distâncias em escalas do Sistema Solar.
const ETAPAS_ESCALAS = [
  {
    titulo: { pt: 'Duas formas de comparar', en: 'Two ways to compare', es: 'Dos formas de comparar' },
    corpo: {
      pt: 'Os planetas são minúsculos perto dos espaços entre eles. Para enxergar os dois numa tela, vamos alternar entre uma vista de tamanhos e outra de distâncias.',
      en: 'Planets are tiny compared with the spaces between them. To see both on a screen, we’ll switch between a size view and a distance view.',
      es: 'Los planetas son diminutos comparados con los espacios entre ellos. Para ver ambas cosas en una pantalla, alternaremos entre una vista de tamaños y otra de distancias.'
    },
    experimento: { tipo: 'escalas', modo: 'tamanhos', solCm: 22, destaque: 'sol' }
  },
  {
    titulo: { pt: 'O Sol domina a escala de tamanhos', en: 'The Sun dominates the size scale', es: 'El Sol domina la escala de tamaños' },
    corpo: {
      pt: 'O diâmetro do Sol é cerca de 109 vezes o da Terra. As barras comparam diâmetros em linha; não mostram volume nem área de superfície.',
      en: 'The Sun’s diameter is about 109 times Earth’s. The bars compare diameters as lengths; they do not show volume or surface area.',
      es: 'El diámetro del Sol es unas 109 veces el de la Tierra. Las barras comparan diámetros como longitudes; no muestran volumen ni superficie.'
    },
    experimento: { tipo: 'escalas', modo: 'tamanhos', solCm: 10, destaque: 'sol' }
  },
  {
    titulo: { pt: 'Júpiter tem cerca de 11 Terras de largura', en: 'Jupiter is about 11 Earths wide', es: 'Júpiter mide unas 11 Tierras de diámetro' },
    corpo: {
      pt: 'Júpiter é o maior planeta: seu diâmetro equivale a cerca de 11 diâmetros terrestres. Compare as barras lineares e inclua o Sol para perceber a diferença.',
      en: 'Jupiter is the largest planet: its diameter is about 11 Earth diameters. Compare the linear bars, including the Sun, to see the difference.',
      es: 'Júpiter es el planeta más grande: su diámetro equivale a unos 11 diámetros terrestres. Compara las barras lineales, incluido el Sol, para notar la diferencia.'
    },
    experimento: { tipo: 'escalas', modo: 'tamanhos', solCm: 50, destaque: 'jupiter' }
  },
  {
    titulo: { pt: 'Uma Terra de dois milímetros', en: 'An Earth two millimeters wide', es: 'Una Tierra de dos milímetros' },
    corpo: {
      pt: 'Com o Sol do modelo ajustado para 22 cm, a Terra fica com cerca de 2 mm de diâmetro. O valor muda com o controle, mas a proporção entre os diâmetros permanece.',
      en: 'With the model Sun set to 22 cm, Earth is about 2 mm across. The value changes with the slider, while the proportion between diameters stays the same.',
      es: 'Con el Sol del modelo ajustado a 22 cm, la Tierra mide unos 2 mm de diámetro. El valor cambia con el control, pero la proporción entre diámetros se mantiene.'
    },
    experimento: { tipo: 'escalas', modo: 'tamanhos', solCm: 22, destaque: 'terra' }
  },
  {
    titulo: { pt: 'Mude a escala do modelo', en: 'Change the model scale', es: 'Cambia la escala del modelo' },
    corpo: {
      pt: 'Use o controle para escolher um diâmetro do Sol entre 10 e 100 cm. Os valores numéricos de tamanhos e distâncias acompanham a mesma proporção; as barras mantêm a escala relativa para continuarem legíveis.',
      en: 'Use the slider to set the model Sun’s diameter from 10 to 100 cm. Numeric size and distance values follow the same proportion; bars keep their relative scale so they remain readable.',
      es: 'Usa el control para elegir un diámetro del Sol de 10 a 100 cm. Los valores numéricos de tamaños y distancias mantienen la misma proporción; las barras conservan su escala relativa para seguir siendo legibles.'
    },
    experimento: { tipo: 'escalas', modo: 'tamanhos', solCm: 100, destaque: 'sol' }
  },
  {
    titulo: { pt: 'Agora, compare as distâncias médias', en: 'Now compare average distances', es: 'Ahora compara las distancias medias' },
    corpo: {
      pt: 'Esta vista usa barras para mostrar a distância heliocêntrica média dos oito planetas. Os comprimentos indicam distância, não o diâmetro dos planetas.',
      en: 'This view uses bars to show the eight planets’ mean heliocentric distances. Their lengths indicate distance, not planet diameter.',
      es: 'Esta vista usa barras para mostrar las distancias heliocéntricas medias de los ocho planetas. Sus longitudes indican distancia, no el diámetro de los planetas.'
    },
    experimento: { tipo: 'escalas', modo: 'distancias', solCm: 22, destaque: 'terra' }
  },
  {
    titulo: { pt: 'Uma unidade astronômica', en: 'One astronomical unit', es: 'Una unidad astronómica' },
    corpo: {
      pt: 'A distância média entre o Sol e a Terra é cerca de 150 milhões de quilômetros: uma unidade astronômica, ou 1 UA. Ela ajuda a expressar distâncias enormes com números menores.',
      en: 'The mean distance from the Sun to Earth is about 150 million kilometers: one astronomical unit, or 1 AU. It helps express enormous distances with smaller numbers.',
      es: 'La distancia media entre el Sol y la Tierra es de unos 150 millones de kilómetros: una unidad astronómica, o 1 UA. Ayuda a expresar distancias enormes con números menores.'
    },
    experimento: { tipo: 'escalas', modo: 'distancias', solCm: 50, destaque: 'terra' }
  },
  {
    titulo: { pt: 'Netuno está a cerca de 30 UA', en: 'Neptune is about 30 AU away', es: 'Neptuno está a unas 30 UA' },
    corpo: {
      pt: 'A distância média de Netuno ao Sol é aproximadamente 30 UA. Com o Sol do modelo em 22 cm, isso corresponde a cerca de 710 m — muito além do espaço da tela.',
      en: 'Neptune’s mean distance from the Sun is about 30 AU. With the model Sun at 22 cm, that corresponds to roughly 710 m—far beyond the screen.',
      es: 'La distancia media de Neptuno al Sol es de unas 30 UA. Con el Sol del modelo a 22 cm, equivale a unos 710 m, mucho más allá del espacio de la pantalla.'
    },
    experimento: { tipo: 'escalas', modo: 'distancias', solCm: 22, destaque: 'netuno' }
  },
  {
    titulo: { pt: 'As órbitas fazem as distâncias variar', en: 'Orbits make distances vary', es: 'Las órbitas hacen variar las distancias' },
    corpo: {
      pt: 'Planetas percorrem órbitas e sua distância ao Sol muda. As barras mostram distâncias médias, não posições atuais nem um mapa das órbitas.',
      en: 'Planets travel along orbits, so their distance from the Sun changes. The bars show mean distances, not current positions or a map of the orbits.',
      es: 'Los planetas recorren órbitas y su distancia al Sol cambia. Las barras muestran distancias medias, no posiciones actuales ni un mapa de las órbitas.'
    },
    experimento: { tipo: 'escalas', modo: 'distancias', solCm: 100, destaque: 'terra' }
  },
  {
    titulo: { pt: 'Uma proporção, duas vistas', en: 'One proportion, two views', es: 'Una proporción, dos vistas' },
    corpo: {
      pt: 'Ao alternar entre as vistas, lembre-se: usamos a mesma proporção para os números de tamanho e distância, mas cada gráfico compara apenas sua própria grandeza. Um modelo conjunto, com tamanhos e distâncias fiéis no mesmo espaço, precisaria ser imenso.',
      en: 'As you switch views, remember: the numbers for size and distance use the same proportion, but each chart compares only its own quantity. A combined model with faithful sizes and distances in one space would need to be enormous.',
      es: 'Al alternar entre las vistas, recuerda: los números de tamaño y distancia usan la misma proporción, pero cada gráfico compara solo su propia magnitud. Un modelo conjunto con tamaños y distancias fieles necesitaría muchísimo espacio.'
    },
    experimento: { tipo: 'escalas', modo: 'tamanhos', solCm: 22, destaque: 'terra' }
  }
];

const textosEscalas = {
  pt: {
    titulo: 'Tamanhos e distâncias no Sistema Solar',
    objetivo: 'Escalas do Sistema Solar',
    objetivoTexto: 'Compare diâmetros e distâncias médias dos planetas usando a mesma proporção em duas vistas.',
    perguntaTexto: 'O que acontece quando usamos a mesma proporção para tamanhos e distâncias?',
    opcao1: 'Os valores mudam juntos, mas tamanhos e distâncias são comparados em vistas separadas.',
    opcao2: 'As barras mostram ao mesmo tempo os diâmetros e as posições atuais dos planetas.',
    certo: 'Isso! A proporção transforma os valores do modelo, enquanto cada vista compara uma grandeza de cada vez.',
    tentar: 'Dica: uma vista compara diâmetros; a outra compara distâncias médias ao Sol.',
    recapTexto: 'O Sol tem cerca de 109 diâmetros terrestres, e Júpiter cerca de 11. A distância média Sol–Terra é 1 UA (aproximadamente 150 milhões de km); Netuno fica a cerca de 30 UA. Com o Sol de 22 cm, a Terra mede cerca de 2 mm e Netuno fica a aproximadamente 710 m. Distâncias variam ao longo das órbitas. As duas vistas usam a mesma proporção, mas comparam tamanho e distância separadamente; as barras não representam volumes, superfícies, posições atuais ou órbitas animadas.',
    fonte: 'NASA/JPL Education: Create a Solar System Scale Model With Spreadsheets; JPL Solar System Dynamics: Astrodynamic Parameters.'
  },
  en: {
    titulo: 'Sizes and distances in the Solar System',
    objetivo: 'Solar System scales',
    objetivoTexto: 'Compare planetary diameters and mean distances using the same proportion in two views.',
    perguntaTexto: 'What happens when we use the same proportion for sizes and distances?',
    opcao1: 'The values change together, while sizes and distances are compared in separate views.',
    opcao2: 'The bars show planetary diameters and current positions at the same time.',
    certo: 'That’s right! The proportion scales the model values, while each view compares one quantity at a time.',
    tentar: 'Hint: one view compares diameters; the other compares mean distances from the Sun.',
    recapTexto: 'The Sun is about 109 Earth diameters across, and Jupiter about 11. The mean Sun–Earth distance is 1 AU (about 150 million km); Neptune is about 30 AU away. With a 22 cm model Sun, Earth is about 2 mm across and Neptune is roughly 710 m away. Distances vary along orbits. Both views use the same proportion but compare size and distance separately; the bars do not represent volumes, surfaces, current positions, or animated orbits.',
    fonte: 'NASA/JPL Education: Create a Solar System Scale Model With Spreadsheets; JPL Solar System Dynamics: Astrodynamic Parameters.'
  },
  es: {
    titulo: 'Tamaños y distancias en el Sistema Solar',
    objetivo: 'Escalas del Sistema Solar',
    objetivoTexto: 'Compara los diámetros y las distancias medias de los planetas con la misma proporción en dos vistas.',
    perguntaTexto: '¿Qué ocurre cuando usamos la misma proporción para tamaños y distancias?',
    opcao1: 'Los valores cambian juntos, pero los tamaños y las distancias se comparan en vistas separadas.',
    opcao2: 'Las barras muestran a la vez los diámetros y las posiciones actuales de los planetas.',
    certo: '¡Así es! La proporción escala los valores del modelo, mientras cada vista compara una magnitud a la vez.',
    tentar: 'Pista: una vista compara diámetros; la otra compara las distancias medias al Sol.',
    recapTexto: 'El Sol mide unos 109 diámetros terrestres y Júpiter unos 11. La distancia media Sol–Tierra es 1 UA (unos 150 millones de km); Neptuno está a unas 30 UA. Con un Sol de 22 cm en el modelo, la Tierra mide unos 2 mm y Neptuno queda a unos 710 m. Las distancias varían a lo largo de las órbitas. Ambas vistas usan la misma proporción, pero comparan tamaño y distancia por separado; las barras no representan volúmenes, superficies, posiciones actuales ni órbitas animadas.',
    fonte: 'NASA/JPL Education: Create a Solar System Scale Model With Spreadsheets; JPL Solar System Dynamics: Astrodynamic Parameters.'
  }
};

export const ROTEIRO_ESCALAS = {
  id: 'escalas-guia',
  versao: 1,
  pro: true,
  recurso: 'aprendizado',
  ambiente: 'universo',
  corpo: 'terra',
  urlFonte: 'https://www.jpl.nasa.gov/edu/resources/lesson-plan/create-a-solar-system-scale-model-with-spreadsheets/',
  fontesAdicionais: [{ nome: 'JPL Solar System Dynamics · Astrodynamic Parameters', url: 'https://ssd.jpl.nasa.gov/astro_par.html' }],
  textos: textosEscalas,
  etapas: [
    ...ETAPAS_ESCALAS,
    { titulo: 'pergunta', corpo: 'perguntaTexto', pergunta: true },
    { titulo: 'recap', corpo: 'recapTexto', recap: true }
  ]
};
