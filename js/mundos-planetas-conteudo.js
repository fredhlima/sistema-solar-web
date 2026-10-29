export const MUNDOS_PLANETAS = [
  {
    id: 'sol',
    nome: { pt: 'Sol', en: 'Sun', es: 'Sol' },
    fontes: [{ nome: 'NASA Science — Our Sun: Facts', url: 'https://science.nasa.gov/sun/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Energia no núcleo', en: 'Energy in the core', es: 'Energía en el núcleo' },
        texto: {
          pt: 'No núcleo, a fusão une hidrogênio para formar hélio e libera a energia que alimenta o brilho do Sol.',
          en: 'In the core, fusion joins hydrogen to form helium and releases the energy that powers the Sun’s glow.',
          es: 'En el núcleo, la fusión une hidrógeno para formar helio y libera la energía que alimenta el brillo del Sol.'
        }
      },
      {
        titulo: { pt: 'Uma superfície aparente', en: 'An apparent surface', es: 'Una superficie aparente' },
        texto: {
          pt: 'A camada que vemos se chama fotosfera. Ela parece uma superfície, mas o Sol é feito de plasma e não tem chão sólido.',
          en: 'The layer we see is called the photosphere. It looks like a surface, but the Sun is plasma and has no solid ground.',
          es: 'La capa que vemos se llama fotosfera. Parece una superficie, pero el Sol es plasma y no tiene suelo sólido.'
        }
      },
      {
        titulo: { pt: 'Manchas magnéticas', en: 'Magnetic sunspots', es: 'Manchas magnéticas' },
        texto: {
          pt: 'Manchas solares são regiões um pouco mais frias da fotosfera, ligadas a trechos do campo magnético que emergem do interior.',
          en: 'Sunspots are regions of the photosphere that are a little cooler, linked to parts of the magnetic field rising from inside.',
          es: 'Las manchas solares son zonas algo más frías de la fotosfera, vinculadas a partes del campo magnético que emergen del interior.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'Que processo no núcleo produz a energia do Sol?', en: 'What process in the core produces the Sun’s energy?', es: '¿Qué proceso en el núcleo produce la energía del Sol?' },
      correta: { pt: 'Fusão de hidrogênio em hélio', en: 'Fusion of hydrogen into helium', es: 'Fusión de hidrógeno en helio' },
      incorreta: { pt: 'Combustão de oxigênio', en: 'Combustion of oxygen', es: 'Combustión de oxígeno' },
      explicacao: { pt: 'No núcleo, núcleos de hidrogênio se fundem e formam hélio, liberando energia.', en: 'In the core, hydrogen nuclei fuse to form helium and release energy.', es: 'En el núcleo, núcleos de hidrógeno se fusionan para formar helio y liberar energía.' }
    }
  },
  {
    id: 'mercurio',
    nome: { pt: 'Mercúrio', en: 'Mercury', es: 'Mercurio' },
    fontes: [{ nome: 'NASA Science — Mercury Facts', url: 'https://science.nasa.gov/mercury/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Gelo na sombra', en: 'Ice in the shadows', es: 'Hielo en la sombra' },
        texto: {
          pt: 'Há evidências de gelo de água em crateras profundas dos polos, em áreas que permanecem sempre na sombra.',
          en: 'Evidence points to water ice in deep polar craters, in areas that remain permanently shadowed.',
          es: 'Hay indicios de hielo de agua en cráteres profundos de los polos, en zonas que permanecen siempre en sombra.'
        }
      },
      {
        titulo: { pt: 'Marcas de impactos', en: 'Impact scars', es: 'Huellas de impactos' },
        texto: {
          pt: 'Sua superfície rochosa lembra a Lua e está marcada por crateras abertas por impactos de meteoritos e cometas.',
          en: 'Its rocky surface resembles the Moon and is marked by craters made by impacts from meteoroids and comets.',
          es: 'Su superficie rocosa recuerda a la Luna y está marcada por cráteres formados por impactos de meteoroides y cometas.'
        }
      },
      {
        titulo: { pt: 'Uma exosfera tênue', en: 'A thin exosphere', es: 'Una exosfera tenue' },
        texto: {
          pt: 'Mercúrio não tem uma atmosfera densa: sua exosfera fina contém átomos arrancados da superfície pelo vento solar e por impactos.',
          en: 'Mercury has no dense atmosphere: its thin exosphere contains atoms knocked off the surface by solar wind and impacts.',
          es: 'Mercurio no tiene una atmósfera densa: su tenue exosfera contiene átomos desprendidos de la superficie por el viento solar y los impactos.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'Onde pode existir gelo de água em Mercúrio?', en: 'Where may water ice exist on Mercury?', es: '¿Dónde puede existir hielo de agua en Mercurio?' },
      correta: { pt: 'Em crateras polares que ficam sempre na sombra', en: 'In polar craters that stay permanently shadowed', es: 'En cráteres polares que permanecen siempre en sombra' },
      incorreta: { pt: 'Em planícies expostas ao Sol o dia todo', en: 'On plains exposed to sunlight all day', es: 'En llanuras expuestas al Sol todo el día' },
      explicacao: { pt: 'Crateras profundas em sombra permanente podem ser frias o bastante para preservar gelo.', en: 'Deep craters in permanent shadow may be cold enough to preserve ice.', es: 'Los cráteres profundos en sombra permanente pueden ser lo bastante fríos para conservar hielo.' }
    }
  },
  {
    id: 'venus',
    nome: { pt: 'Vênus', en: 'Venus', es: 'Venus' },
    fontes: [{ nome: 'NASA Science — Venus Facts', url: 'https://science.nasa.gov/venus/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Calor preso', en: 'Trapped heat', es: 'Calor atrapado' },
        texto: {
          pt: 'Uma atmosfera muito espessa retém calor por um efeito estufa intenso, fazendo de Vênus o planeta mais quente do Sistema Solar.',
          en: 'A very thick atmosphere traps heat through an intense greenhouse effect, making Venus the hottest planet in the solar system.',
          es: 'Una atmósfera muy densa retiene calor mediante un intenso efecto invernadero y hace de Venus el planeta más caliente del sistema solar.'
        }
      },
      {
        titulo: { pt: 'Ar esmagador', en: 'Crushing air', es: 'Aire aplastante' },
        texto: {
          pt: 'A pressão na superfície é cerca de 93 vezes a pressão ao nível do mar na Terra; nuvens corrosivas cobrem o planeta.',
          en: 'Surface pressure is about 93 times Earth’s sea-level pressure, and corrosive clouds cover the planet.',
          es: 'La presión en la superficie es unas 93 veces la presión al nivel del mar en la Tierra, y nubes corrosivas cubren el planeta.'
        }
      },
      {
        titulo: { pt: 'Giro ao contrário', en: 'A backward spin', es: 'Giro al revés' },
        texto: {
          pt: 'Vênus gira lentamente no sentido oposto ao da maioria dos planetas; um dia de rotação dura mais que seu ano.',
          en: 'Venus spins slowly in the opposite direction from most planets; one rotation takes longer than its year.',
          es: 'Venus gira lentamente en sentido opuesto al de la mayoría de los planetas; una rotación dura más que su año.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'O que torna Vênus o planeta mais quente?', en: 'What makes Venus the hottest planet?', es: '¿Qué hace que Venus sea el planeta más caliente?' },
      correta: { pt: 'Sua atmosfera espessa retém calor', en: 'Its thick atmosphere traps heat', es: 'Su atmósfera densa retiene el calor' },
      incorreta: { pt: 'Ele está mais perto do Sol que Mercúrio', en: 'It is closer to the Sun than Mercury', es: 'Está más cerca del Sol que Mercurio' },
      explicacao: { pt: 'O efeito estufa intenso da atmosfera venusiana mantém muito calor junto à superfície.', en: 'Venus’s intense atmospheric greenhouse effect keeps a great deal of heat near the surface.', es: 'El intenso efecto invernadero de la atmósfera venusina mantiene mucho calor cerca de la superficie.' }
    }
  },
  {
    id: 'terra',
    nome: { pt: 'Terra', en: 'Earth', es: 'Tierra' },
    fontes: [{ nome: 'NASA Science — Facts About Earth', url: 'https://science.nasa.gov/earth/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Água líquida na superfície', en: 'Liquid water at the surface', es: 'Agua líquida en la superficie' },
        texto: {
          pt: 'A Terra é o único planeta conhecido do Sistema Solar com água líquida estável em sua superfície; oceanos cobrem grande parte do globo.',
          en: 'Earth is the only known planet in the solar system with stable liquid water on its surface; oceans cover much of the globe.',
          es: 'La Tierra es el único planeta conocido del sistema solar con agua líquida estable en la superficie; los océanos cubren gran parte del globo.'
        }
      },
      {
        titulo: { pt: 'Ar que nos envolve', en: 'Air around us', es: 'Aire que nos rodea' },
        texto: {
          pt: 'Perto do solo, o ar tem sobretudo nitrogênio e oxigênio. A atmosfera também ajuda a proteger a superfície de radiação e meteoroides.',
          en: 'Near the ground, air is mostly nitrogen and oxygen. The atmosphere also helps shield the surface from radiation and meteoroids.',
          es: 'Cerca del suelo, el aire contiene sobre todo nitrógeno y oxígeno. La atmósfera también ayuda a proteger la superficie de la radiación y los meteoroides.'
        }
      },
      {
        titulo: { pt: 'Um campo magnético protetor', en: 'A protective magnetic field', es: 'Un campo magnético protector' },
        texto: {
          pt: 'O movimento do ferro líquido no núcleo externo, junto à rotação do planeta, gera um campo magnético que interage com o vento solar.',
          en: 'The movement of liquid iron in the outer core, together with the planet’s rotation, generates a magnetic field that interacts with the solar wind.',
          es: 'El movimiento del hierro líquido en el núcleo externo, junto con la rotación del planeta, genera un campo magnético que interactúa con el viento solar.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'Quais gases compõem a maior parte do ar perto da superfície terrestre?', en: 'Which gases make up most of the air near Earth’s surface?', es: '¿Qué gases componen la mayor parte del aire cerca de la superficie terrestre?' },
      correta: { pt: 'Nitrogênio e oxigênio', en: 'Nitrogen and oxygen', es: 'Nitrógeno y oxígeno' },
      incorreta: { pt: 'Hidrogênio e hélio', en: 'Hydrogen and helium', es: 'Hidrógeno y helio' },
      explicacao: { pt: 'A atmosfera perto da superfície terrestre é composta principalmente de nitrogênio e oxigênio.', en: 'The atmosphere near Earth’s surface consists mainly of nitrogen and oxygen.', es: 'La atmósfera cerca de la superficie terrestre está compuesta principalmente de nitrógeno y oxígeno.' }
    },
    investigacao: {
      titulo: { pt: 'Compare evidências, não rótulos', en: 'Compare evidence, not labels', es: 'Compara evidencias, no etiquetas' },
      texto: { pt: 'Toque na Terra e em Marte para comparar as pistas textuais: uma descreve água observada hoje; a outra registra água no passado.', en: 'Tap Earth and Mars to compare the textual clues: one describes water observed today; the other records water in the past.', es: 'Toca la Tierra y Marte para comparar las pistas textuales: una describe agua observada hoy; la otra registra agua en el pasado.' },
      corpos: [
        { id: 'terra', rotulo: { pt: 'Terra: observação atual', en: 'Earth: present observation', es: 'Tierra: observación actual' }, pista: { pt: 'Há água líquida estável na superfície terrestre.', en: 'Stable liquid water exists at Earth’s surface.', es: 'Hay agua líquida estable en la superficie terrestre.' } },
        { id: 'marte', rotulo: { pt: 'Marte: registro do passado', en: 'Mars: record of the past', es: 'Marte: registro del pasado' }, pista: { pt: 'Vales, deltas, leitos de lagos antigos e certos minerais registram água no passado.', en: 'Valleys, deltas, ancient lakebeds, and certain minerals record water in the past.', es: 'Valles, deltas, antiguos lechos de lagos y ciertos minerales registran agua en el pasado.' } }
      ],
      pergunta: {
        texto: { pt: 'Qual enunciado separa uma observação atual de um registro do passado?', en: 'Which statement separates a present observation from a record of the past?', es: '¿Qué enunciado separa una observación actual de un registro del pasado?' },
        correta: { pt: 'A Terra tem água líquida estável na superfície; em Marte, formas de relevo e minerais registram água no passado.', en: 'Earth has stable liquid water at its surface; on Mars, landforms and minerals record water in the past.', es: 'La Tierra tiene agua líquida estable en la superficie; en Marte, las formas del terreno y los minerales registran agua en el pasado.' },
        incorreta: { pt: 'Os dois roteiros descrevem oceanos líquidos estáveis na superfície hoje.', en: 'Both lessons describe stable liquid oceans on the surface today.', es: 'Ambas lecciones describen océanos líquidos estables en la superficie hoy.' },
        explicacao: { pt: 'A comparação distingue água estável observada na Terra de evidências geológicas de água antiga em Marte.', en: 'The comparison distinguishes stable water observed on Earth from geological evidence of ancient water on Mars.', es: 'La comparación distingue el agua estable observada en la Tierra de las evidencias geológicas de agua antigua en Marte.' }
      },
      sintese: { pt: 'A Terra tem água líquida estável na superfície. Em Marte, vales, deltas, leitos de lagos antigos e minerais registram água no passado; as evidências descrevem situações diferentes.', en: 'Earth has stable liquid water at its surface. On Mars, valleys, deltas, ancient lakebeds, and minerals record water in the past; the evidence describes different situations.', es: 'La Tierra tiene agua líquida estable en la superficie. En Marte, valles, deltas, antiguos lechos de lagos y minerales registran agua en el pasado; las evidencias describen situaciones diferentes.' },
      fontes: [{ nome: 'NASA Science — Mars Facts', url: 'https://science.nasa.gov/mars/facts/' }]
    }
  },
  {
    id: 'marte',
    nome: { pt: 'Marte', en: 'Mars', es: 'Marte' },
    fontes: [{ nome: 'NASA Science — Mars Facts', url: 'https://science.nasa.gov/mars/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Pistas de um passado úmido', en: 'Clues to a watery past', es: 'Indicios de un pasado húmedo' },
        texto: {
          pt: 'Vales fluviais antigos, deltas, leitos de lagos e certos minerais mostram que água líquida moldou Marte no passado.',
          en: 'Ancient river valleys, deltas, lakebeds, and certain minerals show that liquid water shaped Mars in the past.',
          es: 'Valles fluviales antiguos, deltas, lechos de lagos y ciertos minerales muestran que el agua líquida moldeó Marte en el pasado.'
        }
      },
      {
        titulo: { pt: 'Um céu muito rarefeito', en: 'A very thin sky', es: 'Un cielo muy tenue' },
        texto: {
          pt: 'A atmosfera marciana é fina e composta principalmente de dióxido de carbono; por isso, o calor do Sol escapa com facilidade.',
          en: 'The Martian atmosphere is thin and made mostly of carbon dioxide, so heat from the Sun escapes easily.',
          es: 'La atmósfera marciana es tenue y está compuesta sobre todo de dióxido de carbono, por lo que el calor del Sol escapa fácilmente.'
        }
      },
      {
        titulo: { pt: 'Vermelho de ferrugem', en: 'Rust-red soil', es: 'Suelo rojo de óxido' },
        texto: {
          pt: 'O ferro nas rochas, no solo e na poeira enferruja; partículas suspensas ajudam Marte a parecer avermelhado de longe.',
          en: 'Iron in rocks, soil, and dust rusts; airborne particles help make Mars look reddish from afar.',
          es: 'El hierro de las rocas, el suelo y el polvo se oxida; las partículas suspendidas hacen que Marte se vea rojizo desde lejos.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'Que evidências indicam que Marte teve água líquida no passado?', en: 'What evidence suggests Mars had liquid water in the past?', es: '¿Qué pruebas indican que Marte tuvo agua líquida en el pasado?' },
      correta: { pt: 'Vales fluviais, deltas e leitos de lagos antigos', en: 'Ancient river valleys, deltas, and lakebeds', es: 'Valles fluviales, deltas y lechos de lagos antiguos' },
      incorreta: { pt: 'Dunas formadas apenas por ventos atuais', en: 'Dunes formed only by present-day winds', es: 'Dunas formadas únicamente por vientos actuales' },
      explicacao: { pt: 'Essas formas de relevo, junto a certos minerais, são sinais de água que correu e se acumulou no planeta.', en: 'These landforms, along with certain minerals, are signs of water that once flowed and pooled on the planet.', es: 'Estas formas del terreno, junto con ciertos minerales, son señales de agua que fluyó y se acumuló en el planeta.' }
    },
    investigacao: {
      titulo: { pt: 'Escolha uma pista para investigar', en: 'Choose a clue to investigate', es: 'Elige una pista para investigar' },
      texto: { pt: 'Compare dois locais de pesquisa em Marte e escolha o mais promissor para investigar marcas de água antiga.', en: 'Compare two research sites on Mars and choose the more promising place to investigate traces of ancient water.', es: 'Compara dos lugares de investigación en Marte y elige el más prometedor para estudiar huellas de agua antigua.' },
      corpos: [
        { id: 'marte', rotulo: { pt: 'Local A: delta e minerais', en: 'Site A: delta and minerals', es: 'Lugar A: delta y minerales' }, pista: { pt: 'Vales fluviais antigos, deltas, leitos de lagos e certos minerais indicam água líquida no passado.', en: 'Ancient river valleys, deltas, lakebeds, and certain minerals indicate liquid water in the past.', es: 'Valles fluviales antiguos, deltas, lechos de lagos y ciertos minerales indican agua líquida en el pasado.' } },
        { id: 'marte', rotulo: { pt: 'Local B: duna avermelhada', en: 'Site B: reddish dune', es: 'Lugar B: duna rojiza' }, pista: { pt: 'O ferro oxidado no solo e na poeira ajuda a explicar a cor avermelhada de Marte.', en: 'Oxidized iron in soil and dust helps explain Mars’s reddish color.', es: 'El hierro oxidado en el suelo y el polvo ayuda a explicar el color rojizo de Marte.' } }
      ],
      pergunta: {
        texto: { pt: 'Qual local é a melhor escolha para investigar água líquida antiga?', en: 'Which site is the better choice for investigating ancient liquid water?', es: '¿Qué lugar es la mejor elección para investigar agua líquida antigua?' },
        correta: { pt: 'O Local A, porque o delta e os minerais são pistas de água líquida no passado.', en: 'Site A, because the delta and minerals are clues to liquid water in the past.', es: 'El lugar A, porque el delta y los minerales son pistas de agua líquida en el pasado.' },
        incorreta: { pt: 'O Local B, porque a cor avermelhada por si só indica água antiga.', en: 'Site B, because the reddish color by itself indicates ancient water.', es: 'El lugar B, porque el color rojizo por sí solo indica agua antigua.' },
        explicacao: { pt: 'A paisagem e os minerais sustentam a conclusão sobre água antiga; a cor avermelhada vem do ferro oxidado.', en: 'Landforms and minerals support the conclusion about ancient water; the reddish color comes from oxidized iron.', es: 'Las formas del terreno y los minerales sostienen la conclusión sobre el agua antigua; el color rojizo proviene del hierro oxidado.' }
      },
      sintese: { pt: 'Vales, deltas, leitos de lagos antigos e minerais registram que água líquida moldou Marte no passado. A atmosfera atual é fina e majoritariamente de dióxido de carbono; o ferro oxidado ajuda a explicar a aparência avermelhada.', en: 'Valleys, deltas, ancient lakebeds, and minerals record that liquid water shaped Mars in the past. Its present atmosphere is thin and mostly carbon dioxide; oxidized iron helps explain the reddish appearance.', es: 'Valles, deltas, antiguos lechos de lagos y minerales registran que el agua líquida moldeó Marte en el pasado. Su atmósfera actual es fina y mayoritariamente de dióxido de carbono; el hierro oxidado ayuda a explicar el aspecto rojizo.' },
      fontes: []
    }
  },
  {
    id: 'jupiter',
    nome: { pt: 'Júpiter', en: 'Jupiter', es: 'Júpiter' },
    fontes: [{ nome: 'NASA Science — Jupiter Facts', url: 'https://science.nasa.gov/jupiter/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Um gigante sem chão firme', en: 'A giant without solid ground', es: 'Un gigante sin suelo firme' },
        texto: {
          pt: 'Júpiter é um gigante gasoso, composto sobretudo de hidrogênio e hélio, sem uma superfície sólida como a da Terra.',
          en: 'Jupiter is a gas giant made mostly of hydrogen and helium, without a solid surface like Earth’s.',
          es: 'Júpiter es un gigante gaseoso compuesto principalmente de hidrógeno y helio, sin una superficie sólida como la terrestre.'
        }
      },
      {
        titulo: { pt: 'Faixas de nuvens e uma grande tempestade', en: 'Cloud bands and a great storm', es: 'Bandas de nubes y una gran tormenta' },
        texto: {
          pt: 'Ventos opostos organizam nuvens em faixas. A Grande Mancha Vermelha é uma tempestade colossal observada há séculos.',
          en: 'Opposing winds organize clouds into bands. The Great Red Spot is a colossal storm observed for centuries.',
          es: 'Vientos opuestos organizan las nubes en bandas. La Gran Mancha Roja es una tormenta enorme observada desde hace siglos.'
        }
      },
      {
        titulo: { pt: 'Quatro luas famosas', en: 'Four famous moons', es: 'Cuatro lunas famosas' },
        texto: {
          pt: 'Io, Europa, Ganimedes e Calisto são as quatro grandes luas galileanas, observadas pela primeira vez por Galileu em 1610.',
          en: 'Io, Europa, Ganymede, and Callisto are the four large Galilean moons, first observed by Galileo in 1610.',
          es: 'Ío, Europa, Ganímedes y Calisto son las cuatro grandes lunas galileanas, observadas por primera vez por Galileo en 1610.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'Quais são as quatro grandes luas galileanas de Júpiter?', en: 'What are Jupiter’s four large Galilean moons?', es: '¿Cuáles son las cuatro grandes lunas galileanas de Júpiter?' },
      correta: { pt: 'Io, Europa, Ganimedes e Calisto', en: 'Io, Europa, Ganymede, and Callisto', es: 'Ío, Europa, Ganímedes y Calisto' },
      incorreta: { pt: 'Titã, Encélado, Reia e Dione', en: 'Titan, Enceladus, Rhea, and Dione', es: 'Titán, Encélado, Rea y Dione' },
      explicacao: { pt: 'Essas quatro luas foram observadas por Galileu e são conhecidas como satélites galileanos.', en: 'These four moons were observed by Galileo and are known as the Galilean satellites.', es: 'Estas cuatro lunas fueron observadas por Galileo y se conocen como satélites galileanos.' }
    }
  },
  {
    id: 'saturno',
    nome: { pt: 'Saturno', en: 'Saturn', es: 'Saturno' },
    fontes: [{ nome: 'NASA Science — Saturn Facts', url: 'https://science.nasa.gov/saturn/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Anéis de gelo e rocha', en: 'Rings of ice and rock', es: 'Anillos de hielo y roca' },
        texto: {
          pt: 'Seus anéis reúnem bilhões de fragmentos de gelo e rocha, desde grãos minúsculos até blocos enormes.',
          en: 'Its rings contain billions of pieces of ice and rock, from tiny grains to enormous chunks.',
          es: 'Sus anillos reúnen miles de millones de fragmentos de hielo y roca, desde granos diminutos hasta bloques enormes.'
        }
      },
      {
        titulo: { pt: 'Sem superfície sólida', en: 'No solid surface', es: 'Sin superficie sólida' },
        texto: {
          pt: 'Saturno é um gigante gasoso sem uma superfície verdadeira: gases e líquidos se adensam em suas profundezas.',
          en: 'Saturn is a gas giant with no true surface: gases and liquids grow denser deep inside.',
          es: 'Saturno es un gigante gaseoso sin una superficie verdadera: los gases y líquidos se vuelven más densos en su interior.'
        }
      },
      {
        titulo: { pt: 'Leve para seu tamanho', en: 'Light for its size', es: 'Ligero para su tamaño' },
        texto: {
          pt: 'Saturno tem densidade média menor que a da água, uma característica incomum para um planeta tão grande.',
          en: 'Saturn’s average density is lower than water’s, an unusual trait for such a large planet.',
          es: 'La densidad media de Saturno es menor que la del agua, algo inusual para un planeta tan grande.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'De que são feitos principalmente os anéis de Saturno?', en: 'What are Saturn’s rings made mostly of?', es: '¿De qué están hechos principalmente los anillos de Saturno?' },
      correta: { pt: 'Fragmentos de gelo e rocha', en: 'Pieces of ice and rock', es: 'Fragmentos de hielo y roca' },
      incorreta: { pt: 'Uma camada contínua de gás brilhante', en: 'A continuous layer of glowing gas', es: 'Una capa continua de gas brillante' },
      explicacao: { pt: 'Os anéis são formados por incontáveis pedaços de gelo e rocha que orbitam o planeta.', en: 'The rings are made of countless pieces of ice and rock orbiting the planet.', es: 'Los anillos están formados por innumerables fragmentos de hielo y roca que orbitan el planeta.' }
    }
  },
  {
    id: 'urano',
    nome: { pt: 'Urano', en: 'Uranus', es: 'Urano' },
    fontes: [{ nome: 'NASA Science — Uranus Facts', url: 'https://science.nasa.gov/uranus/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Um gigante de gelos quentes', en: 'A giant of hot ices', es: 'Un gigante de hielos calientes' },
        texto: {
          pt: 'Urano é um gigante gelado: grande parte de sua massa é um fluido quente e denso de água, metano e amônia sobre um núcleo rochoso.',
          en: 'Uranus is an ice giant: much of its mass is a hot, dense fluid of water, methane, and ammonia above a rocky core.',
          es: 'Urano es un gigante helado: gran parte de su masa es un fluido caliente y denso de agua, metano y amoníaco sobre un núcleo rocoso.'
        }
      },
      {
        titulo: { pt: 'Parece girar de lado', en: 'It seems to spin on its side', es: 'Parece girar de lado' },
        texto: {
          pt: 'Seu eixo é tão inclinado que Urano parece rolar ao redor do Sol; essa inclinação extrema produz estações muito longas.',
          en: 'Its axis is so tilted that Uranus seems to roll around the Sun; this extreme tilt creates very long seasons.',
          es: 'Su eje está tan inclinado que Urano parece rodar alrededor del Sol; esa inclinación extrema produce estaciones muy largas.'
        }
      },
      {
        titulo: { pt: 'Cor azul-esverdeada', en: 'A blue-green color', es: 'Un color azul verdoso' },
        texto: {
          pt: 'O metano na atmosfera absorve parte da luz vermelha e contribui para a aparência azul-esverdeada de Urano.',
          en: 'Methane in the atmosphere absorbs some red light and contributes to Uranus’s blue-green appearance.',
          es: 'El metano de la atmósfera absorbe parte de la luz roja y contribuye al aspecto azul verdoso de Urano.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'Quais materiais formam grande parte do interior de Urano?', en: 'Which materials make up much of Uranus’s interior?', es: '¿Qué materiales componen gran parte del interior de Urano?' },
      correta: { pt: 'Água, metano e amônia em fluido quente e denso', en: 'Water, methane, and ammonia in a hot, dense fluid', es: 'Agua, metano y amoníaco en un fluido caliente y denso' },
      incorreta: { pt: 'Apenas hidrogênio e hélio em estado gasoso', en: 'Only hydrogen and helium in a gaseous state', es: 'Solo hidrógeno y helio en estado gaseoso' },
      explicacao: { pt: 'Urano é classificado como gigante gelado por seu interior rico em água, metano e amônia.', en: 'Uranus is classified as an ice giant because its interior is rich in water, methane, and ammonia.', es: 'Urano se clasifica como gigante helado porque su interior es rico en agua, metano y amoníaco.' }
    }
  },
  {
    id: 'netuno',
    nome: { pt: 'Netuno', en: 'Neptune', es: 'Neptuno' },
    fontes: [{ nome: 'NASA Science — Neptune Facts', url: 'https://science.nasa.gov/neptune/facts/' }],
    fatos: [
      {
        titulo: { pt: 'Um gigante gelado sem chão', en: 'An icy giant without ground', es: 'Un gigante helado sin suelo' },
        texto: {
          pt: 'Netuno não tem superfície sólida: sua atmosfera se aprofunda e se mistura gradualmente a fluidos de água e outros gelos.',
          en: 'Neptune has no solid surface: its atmosphere deepens and gradually blends into fluids of water and other ices.',
          es: 'Neptuno no tiene una superficie sólida: su atmósfera se profundiza y se mezcla gradualmente con fluidos de agua y otros hielos.'
        }
      },
      {
        titulo: { pt: 'Ventos extremos', en: 'Extreme winds', es: 'Vientos extremos' },
        texto: {
          pt: 'A atmosfera escura e fria de Netuno é varrida por ventos que podem superar a velocidade do som.',
          en: 'Neptune’s dark, cold atmosphere is swept by winds that can exceed the speed of sound.',
          es: 'La atmósfera oscura y fría de Neptuno es azotada por vientos que pueden superar la velocidad del sonido.'
        }
      },
      {
        titulo: { pt: 'Tritão orbita ao contrário', en: 'Triton orbits backward', es: 'Tritón orbita al revés' },
        texto: {
          pt: 'A grande lua Tritão orbita no sentido contrário à rotação de Netuno, uma pista de que pode ter sido capturada.',
          en: 'The large moon Triton orbits opposite Neptune’s rotation, a clue that it may have been captured.',
          es: 'La gran luna Tritón orbita en sentido contrario a la rotación de Neptuno, una pista de que pudo ser capturada.'
        }
      }
    ],
    pergunta: {
      texto: { pt: 'O que o sentido da órbita de Tritão sugere?', en: 'What does Triton’s orbital direction suggest?', es: '¿Qué sugiere el sentido de la órbita de Tritón?' },
      correta: { pt: 'Que Netuno pode tê-lo capturado', en: 'That Neptune may have captured it', es: 'Que Neptuno pudo haberlo capturado' },
      incorreta: { pt: 'Que Tritão é o planeta que gira ao redor do Sol', en: 'That Triton is the planet orbiting the Sun', es: 'Que Tritón es el planeta que orbita alrededor del Sol' },
      explicacao: { pt: 'Tritão orbita contra a rotação de Netuno; essa órbita retrógrada sugere uma captura gravitacional.', en: 'Triton orbits against Neptune’s rotation; this retrograde orbit suggests gravitational capture.', es: 'Tritón orbita contra la rotación de Neptuno; esta órbita retrógrada sugiere una captura gravitatoria.' }
    }
  }
];
