// Roteiro didático das fases da Lua. Os ângulos representam posições ideais,
// sem escala de distâncias, inclinação orbital ou calendário real.
const ETAPAS_LUA_FASES = [
  {
    titulo: { pt: 'A Lua parece mudar', en: 'The Moon seems to change', es: 'La Luna parece cambiar' },
    corpo: {
      pt: 'Às vezes vemos um fino arco; em outras noites, um disco quase inteiro. A Lua não muda de forma: muda a parte iluminada que conseguimos ver da Terra.',
      en: 'Sometimes we see a thin arc; on other nights, almost a full disk. The Moon does not change shape: the part of its lit side we can see from Earth changes.',
      es: 'A veces vemos un arco fino; otras noches, casi un disco entero. La Luna no cambia de forma: cambia la parte iluminada que podemos ver desde la Tierra.'
    },
    experimento: { tipo: 'lua-fases', angulo: 0 }
  },
  {
    titulo: { pt: 'A luz vem do Sol', en: 'The light comes from the Sun', es: 'La luz viene del Sol' },
    corpo: {
      pt: 'A Lua não produz a luz que vemos: sua superfície reflete a luz do Sol. Em geral, o Sol ilumina metade da Lua; a outra metade fica na noite lunar.',
      en: 'The Moon does not make the light we see: its surface reflects sunlight. The Sun generally illuminates half of the Moon; the other half is in lunar night.',
      es: 'La Luna no produce la luz que vemos: su superficie refleja la luz solar. Por lo general, el Sol ilumina la mitad de la Luna; la otra mitad está en la noche lunar.'
    },
    experimento: { tipo: 'lua-fases', angulo: 0 }
  },
  {
    titulo: { pt: 'Lua nova: lado iluminado longe de nós', en: 'New Moon: the lit side faces away', es: 'Luna nueva: la parte iluminada queda lejos' },
    corpo: {
      pt: 'Perto da Lua nova, a Lua fica aproximadamente entre a Terra e o Sol. A face voltada para nós recebe pouca luz direta, embora a metade oposta esteja iluminada. Isso não significa que a sombra da Terra cobriu a Lua.',
      en: 'Near new Moon, the Moon is roughly between Earth and the Sun. The side facing us receives little direct sunlight, even though the far half is lit. This does not mean Earth’s shadow covered the Moon.',
      es: 'Cerca de la luna nueva, la Luna está aproximadamente entre la Tierra y el Sol. La cara que mira hacia nosotros recibe poca luz directa, aunque la mitad opuesta esté iluminada. Esto no significa que la sombra de la Tierra cubrió la Luna.'
    },
    experimento: { tipo: 'lua-fases', angulo: 0 }
  },
  {
    titulo: { pt: 'Lua crescente: um arco de luz', en: 'Waxing crescent: a bright arc', es: 'Luna creciente: un arco de luz' },
    corpo: {
      pt: 'Pouco depois da Lua nova, aparece um arco fino e a parte iluminada visível cresce noite após noite. O crescente é a porção iluminada que conseguimos ver, não uma sombra que avança.',
      en: 'Soon after new Moon, a thin arc appears and the visible lit portion grows night after night. The crescent is the portion of the lit half we can see, not a shadow moving across the Moon.',
      es: 'Poco después de la luna nueva aparece un arco fino y la parte iluminada visible crece noche tras noche. El creciente es la porción iluminada que podemos ver, no una sombra que avanza.'
    },
    experimento: { tipo: 'lua-fases', angulo: 45 }
  },
  {
    titulo: { pt: 'Quarto crescente: vemos metade', en: 'First quarter: we see half', es: 'Cuarto creciente: vemos la mitad' },
    corpo: {
      pt: 'Quando a Lua avança cerca de um quarto de volta desde a Lua nova, vemos metade do disco lunar iluminado. O Sol continua iluminando metade da Lua; mudou nosso ângulo de visão.',
      en: 'When the Moon moves about a quarter of an orbit past new Moon, we see half of its disk illuminated. The Sun still lights half of the Moon; our viewing angle has changed.',
      es: 'Cuando la Luna avanza cerca de un cuarto de su órbita desde la luna nueva, vemos iluminada la mitad del disco lunar. El Sol sigue iluminando la mitad de la Luna; cambió nuestro ángulo de visión.'
    },
    experimento: { tipo: 'lua-fases', angulo: 90 }
  },
  {
    titulo: { pt: 'Entre o quarto e a cheia', en: 'Between first quarter and full', es: 'Entre el cuarto y la llena' },
    corpo: {
      pt: 'Depois do quarto crescente, a porção iluminada visível da Terra aumenta. Chamamos essa aparência de gibosa crescente: vemos mais da metade, mas ainda não o disco todo.',
      en: 'After first quarter, the lit portion visible from Earth grows. This appearance is called waxing gibbous: we see more than half, but not yet the whole disk.',
      es: 'Después del cuarto creciente, aumenta la parte iluminada visible desde la Tierra. Esta apariencia se llama gibosa creciente: vemos más de la mitad, pero aún no todo el disco.'
    },
    experimento: { tipo: 'lua-fases', angulo: 135 }
  },
  {
    titulo: { pt: 'Lua cheia: vemos a face iluminada', en: 'Full Moon: we see the lit face', es: 'Luna llena: vemos la cara iluminada' },
    corpo: {
      pt: 'Perto da Lua cheia, a Terra fica aproximadamente entre o Sol e a Lua. A face lunar voltada para nós aparece iluminada. A Lua cheia comum não está na sombra da Terra.',
      en: 'Near full Moon, Earth is roughly between the Sun and Moon. The lunar face turned toward us appears lit. An ordinary full Moon is not in Earth’s shadow.',
      es: 'Cerca de la luna llena, la Tierra está aproximadamente entre el Sol y la Luna. La cara lunar que mira hacia nosotros aparece iluminada. Una luna llena común no está en la sombra de la Tierra.'
    },
    experimento: { tipo: 'lua-fases', angulo: 180 }
  },
  {
    titulo: { pt: 'Minguante: a parte visível diminui', en: 'Waning: the visible part shrinks', es: 'Menguante: disminuye la parte visible' },
    corpo: {
      pt: 'Após a cheia, vemos cada vez menos da metade iluminada. No quarto minguante, vemos novamente metade do disco; depois, resta um arco fino antes da próxima Lua nova.',
      en: 'After full Moon, we see less and less of the lit half. At last quarter, we again see half of the disk; later, only a thin arc remains before the next new Moon.',
      es: 'Después de la luna llena, vemos cada vez menos de la mitad iluminada. En el cuarto menguante volvemos a ver la mitad del disco; después queda un arco fino antes de la próxima luna nueva.'
    },
    experimento: { tipo: 'lua-fases', angulo: 270 }
  },
  {
    titulo: { pt: 'Fases não são eclipses', en: 'Phases are not eclipses', es: 'Las fases no son eclipses' },
    corpo: {
      pt: 'As fases resultam da luz solar refletida e da perspectiva de quem observa da Terra, não da sombra terrestre. Um eclipse lunar acontece só quando Sol, Terra e Lua se alinham o bastante para a Lua atravessar a sombra da Terra.',
      en: 'Phases come from reflected sunlight and the perspective of an observer on Earth, not Earth’s shadow. A lunar eclipse happens only when the Sun, Earth, and Moon align closely enough for the Moon to pass through Earth’s shadow.',
      es: 'Las fases se deben a la luz solar reflejada y a la perspectiva de quien observa desde la Tierra, no a la sombra terrestre. Un eclipse lunar ocurre solo cuando el Sol, la Tierra y la Luna se alinean lo suficiente para que la Luna atraviese la sombra terrestre.'
    },
    experimento: { tipo: 'lua-fases', angulo: 180 }
  },
  {
    titulo: { pt: 'Por que não há eclipse todo mês?', en: 'Why is there not an eclipse every month?', es: '¿Por qué no hay un eclipse cada mes?' },
    corpo: {
      pt: 'A órbita da Lua é inclinada cerca de 5° em relação ao plano da órbita terrestre. Por isso, na maioria das luas novas e cheias, os astros passam acima ou abaixo do alinhamento necessário. Este desenho ideal não está em escala e não mostra um calendário real.',
      en: 'The Moon’s orbit is tilted by about 5° relative to Earth’s orbital plane. So at most new and full Moons, the bodies pass above or below the alignment needed for an eclipse. This idealized diagram is not to scale and does not show a real calendar.',
      es: 'La órbita de la Luna está inclinada unos 5° respecto al plano orbital de la Tierra. Por eso, en la mayoría de las lunas nuevas y llenas, los astros pasan por encima o por debajo de la alineación necesaria. Este dibujo ideal no está a escala ni muestra un calendario real.'
    },
    experimento: { tipo: 'lua-fases', angulo: 270 }
  }
];

const textosLuaFases = {
  pt: {
    titulo: 'Por que a Lua muda de aparência?',
    objetivo: 'Luz, órbita e perspectiva',
    objetivoTexto: 'Investigue como a luz do Sol e a posição da Lua em sua órbita mudam a parte iluminada que vemos da Terra.',
    perguntaTexto: 'O que explica as fases da Lua?',
    opcao1: 'Vemos porções diferentes da metade da Lua iluminada pelo Sol',
    opcao2: 'A sombra da Terra cobre partes diferentes da Lua a cada semana',
    certo: 'Isso! A Lua reflete a luz solar; as fases dependem da parte iluminada que vemos da Terra.',
    tentar: 'Pense na luz do Sol refletida pela Lua e em como a posição da Lua muda nosso ponto de vista.',
    recapTexto: 'O Sol ilumina metade da Lua, cuja superfície reflete essa luz. Ao orbitar a Terra, a Lua muda a porção iluminada que vemos, formando as fases. Elas não são causadas pela sombra da Terra; essa sombra participa de um eclipse lunar quando há alinhamento suficiente. A órbita lunar é inclinada cerca de 5°. O desenho é idealizado, sem escala ou calendário real.',
    fonte: 'Fontes: NASA Science — Top Moon Questions; Eclipses and the Moon; Why Do Eclipses Happen?'
  },
  en: {
    titulo: 'Why does the Moon change its appearance?',
    objetivo: 'Light, orbit, and perspective',
    objetivoTexto: 'Explore how sunlight and the Moon’s position in its orbit change the lit portion we see from Earth.',
    perguntaTexto: 'What explains the phases of the Moon?',
    opcao1: 'We see different portions of the half of the Moon lit by the Sun',
    opcao2: 'Earth’s shadow covers different parts of the Moon each week',
    certo: 'Right! The Moon reflects sunlight; the phases depend on which part of its lit half we see from Earth.',
    tentar: 'Think about sunlight reflected by the Moon and how its position changes our viewpoint.',
    recapTexto: 'The Sun illuminates half of the Moon, whose surface reflects that light. As the Moon orbits Earth, the portion of its lit half that we see changes, creating the phases. They are not caused by Earth’s shadow; that shadow is involved in a lunar eclipse when the alignment is close enough. The Moon’s orbit is tilted by about 5°. This is an idealized diagram, without scale or a real calendar.',
    fonte: 'Sources: NASA Science — Top Moon Questions; Eclipses and the Moon; Why Do Eclipses Happen?'
  },
  es: {
    titulo: '¿Por qué cambia de aspecto la Luna?',
    objetivo: 'Luz, órbita y perspectiva',
    objetivoTexto: 'Explora cómo la luz solar y la posición de la Luna en su órbita cambian la parte iluminada que vemos desde la Tierra.',
    perguntaTexto: '¿Qué explica las fases de la Luna?',
    opcao1: 'Vemos distintas porciones de la mitad de la Luna iluminada por el Sol',
    opcao2: 'La sombra de la Tierra cubre distintas partes de la Luna cada semana',
    certo: '¡Eso es! La Luna refleja la luz solar; las fases dependen de qué parte iluminada vemos desde la Tierra.',
    tentar: 'Piensa en la luz solar reflejada por la Luna y en cómo su posición cambia nuestro punto de vista.',
    recapTexto: 'El Sol ilumina la mitad de la Luna, cuya superficie refleja esa luz. Al orbitar la Tierra, cambia la porción iluminada que vemos y se forman las fases. No las causa la sombra terrestre; esa sombra interviene en un eclipse lunar cuando la alineación es suficiente. La órbita lunar está inclinada unos 5°. El dibujo es idealizado, sin escala ni calendario real.',
    fonte: 'Fuentes: NASA Science — Top Moon Questions; Eclipses and the Moon; Why Do Eclipses Happen?'
  }
};

export const ROTEIRO_FASES_LUA = {
  id: 'lua-fases',
  versao: 1,
  pro: true,
  recurso: 'aprendizado',
  ambiente: 'universo',
  fenomeno: 'lua-fases',
  corpo: 'lua',
  urlFonte: 'https://science.nasa.gov/moon/top-moon-questions/',
  fontesAdicionais: [
    { nome: 'NASA Science — Eclipses and the Moon', url: 'https://science.nasa.gov/moon/eclipses/' },
    { nome: 'NASA Science — Why Do Eclipses Happen?', url: 'https://science.nasa.gov/eclipses/geometry/' }
  ],
  textos: textosLuaFases,
  etapas: [...ETAPAS_LUA_FASES,{titulo:"pergunta",corpo:"perguntaTexto",pergunta:true},{titulo:"recap",corpo:"recapTexto",recap:true}]
};
