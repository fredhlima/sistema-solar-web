import {roteiroDisponivel, naveDisponivel} from './release-scope.js?v=301';
import {MISSAO_ROSETTA} from './rosetta-missao-conteudo.js?v=2';
import {MISSAO_JUNO} from './juno-missao-conteudo.js?v=2';
import {MISSAO_PARKER} from './parker-missao-conteudo.js?v=2';
import {criarRoteiroMissao} from './missao-roteiro.js?v=2';
import {MISSAO_VOYAGER} from './voyager-missao-conteudo.js?v=2';
import {ROTEIROS_MUNDOS} from './mundos-roteiros.js?v=301';
import {ROTEIRO_ESCALAS} from './escalas-roteiro.js?v=1';
import {ROTEIRO_COMETAS} from './cometas-roteiro.js?v=3';
import {ROTEIRO_LUZ} from './luz-roteiro.js?v=1';
import {ROTEIRO_HABITABILIDADE} from './habitabilidade-roteiro.js?v=1';
import {ROTEIRO_ASSISTENCIAS} from './assistencias-roteiro.js?v=1';
import {ROTEIRO_MARES_OCEANO} from './mares-oceano-roteiro.js?v=3';
import {ROTEIRO_MARES_ESSENCIAL} from './mares-essencial-roteiro.js?v=2';
import {ROTEIRO_TERRA_ANO} from './terra-ano-roteiro.js?v=3';
import {ROTEIRO_ESTACOES_ESSENCIAL} from './estacoes-essencial-roteiro.js?v=4';
import {ROTEIRO_FASES_LUA} from './lua-fases-roteiro.js?v=1';
import {ROTEIRO_WEBB} from './webb-roteiro.js?v=1';
import {ROTEIRO_CASSINI_FINALE} from './cassini-finale-roteiro.js?v=1';
import {ROTEIRO_HUYGENS} from './huygens-roteiro.js?v=1';
import {ROTEIRO_INGENUITY} from './ingenuity-roteiro.js?v=2';
import {ROTEIRO_PERSEVERANCE} from './perseverance-roteiro.js?v=2';
import { ROTEIRO_LUNAR } from './lunar-roteiro.js?v=2';
import { ETAPAS_DISCOVERY } from './discovery-etapas.js?v=1';
import { ETAPAS_APOLLO } from './apollo-etapas.js?v=2';
import { ROTEIRO_STS61 } from './sts61-roteiro.js?v=2';
import { ROTEIRO_ARTEMIS1 } from './artemis1-roteiro.js?v=2';
const ROTEIROS_COMPLETOS = {
 'artemis-1':ROTEIRO_ARTEMIS1,
 'endeavour-sts61':ROTEIRO_STS61,
 "rosetta-cometa":criarRoteiroMissao(MISSAO_ROSETTA),
 "juno-jupiter":criarRoteiroMissao(MISSAO_JUNO),
 "parker-sol":criarRoteiroMissao(MISSAO_PARKER),
 "voyager-viagem":criarRoteiroMissao(MISSAO_VOYAGER),
 ...ROTEIROS_MUNDOS,
 "escalas-guia":ROTEIRO_ESCALAS,
 "cometas-guia":ROTEIRO_COMETAS,
 "hubble-webb-luz":ROTEIRO_LUZ,
 "habitabilidade":ROTEIRO_HABITABILIDADE,
 "assistencias-gravitacionais":ROTEIRO_ASSISTENCIAS,
 "mares-oceano":ROTEIRO_MARES_OCEANO,
 "terra-ano":ROTEIRO_TERRA_ANO,
 "lua-fases":ROTEIRO_FASES_LUA,
 sol: { id:"sol", versao:1, corpo:"sol", ambiente:"universo", urlFonte:"https://science.nasa.gov/sun/facts/", textos:{
  pt: {
    titulo: 'Aprenda: o Sol',
    fechar: 'Fechar',
    passo: 'Passo',
    objetivo: 'Nossa estrela',
    objetivoTexto: 'Descubra por que o Sol é tão importante para o Sistema Solar e para a Terra.',
    observar: 'Encontre o Sol',
    observarTexto: 'Olhe a cena 3D e observe o Sol no centro do nosso sistema.',
    focar: 'Mostrar o Sol',
    explicacao: 'Uma estrela especial',
    explicacaoTexto: 'O Sol é uma estrela: uma enorme esfera de gás muito quente que libera luz e energia. A gravidade do Sol mantém planetas, asteroides e cometas em órbita.',
    pergunta: 'Vamos pensar',
    perguntaTexto: 'O que mantém os planetas em órbita ao redor do Sol?',
    opcao1: 'A gravidade do Sol',
    opcao2: 'O brilho dos planetas',
    certo: 'Isso! A gravidade do Sol mantém os planetas em órbita.',
    tentar: 'Ainda não. Pense na força que atrai os corpos com massa. Você pode tentar de novo ou continuar.',
    recap: 'O que descobrimos',
    recapTexto: 'O Sol é a estrela do nosso sistema. Sua gravidade mantém os corpos em órbita, e sua energia chega à Terra como luz e calor.',
    fonte: 'Fonte científica: NASA — Our Sun: Facts',
    anterior: 'Voltar',
    proximo: 'Próximo',
    concluir: 'Concluir',
    concluido: 'Roteiro concluído!',
    progresso: 'Progresso salvo neste dispositivo.', repetir:'Recomeçar', temporario:'Progresso disponível somente nesta sessão.', atualizado:'Este roteiro foi atualizado. Comece a nova versão.'
  },
  en: {
    titulo: 'Learn: the Sun', fechar: 'Close', passo: 'Step', objetivo: 'Our star',
    objetivoTexto: 'Discover why the Sun matters to our solar system and to Earth.',
    observar: 'Find the Sun', observarTexto: 'Look at the 3D scene and notice the Sun at the center of our system.', focar: 'Show the Sun',
    explicacao: 'A special star', explicacaoTexto: 'The Sun is a star: a huge sphere of very hot gas that releases light and energy. Its gravity keeps planets, asteroids, and comets in orbit.',
    pergunta: 'Let’s think', perguntaTexto: 'What keeps the planets in orbit around the Sun?', opcao1: 'The Sun’s gravity', opcao2: 'The planets’ glow',
    certo: 'That’s right! The Sun’s gravity keeps the planets in orbit.', tentar: 'Not quite. Think of the force that attracts bodies with mass. Try again or continue.',
    recap: 'What we discovered', recapTexto: 'The Sun is our system’s star. Its gravity keeps objects in orbit, and its energy reaches Earth as light and heat.',
    fonte: 'Science source: NASA — Our Sun: Facts', anterior: 'Back', proximo: 'Next', concluir: 'Finish', concluido: 'Lesson complete!', progresso: 'Progress is saved on this device.', repetir:'Start again', temporario:'Progress is available only in this session.', atualizado:'This lesson has been updated. Start the new version.'
  },
  es: {
    titulo: 'Aprende: el Sol', fechar: 'Cerrar', passo: 'Paso', objetivo: 'Nuestra estrella',
    objetivoTexto: 'Descubre por qué el Sol es tan importante para el sistema solar y la Tierra.',
    observar: 'Encuentra el Sol', observarTexto: 'Mira la escena 3D y observa el Sol en el centro de nuestro sistema.', focar: 'Mostrar el Sol',
    explicacao: 'Una estrella especial', explicacaoTexto: 'El Sol es una estrella: una enorme esfera de gas muy caliente que libera luz y energía. Su gravedad mantiene planetas, asteroides y cometas en órbita.',
    pergunta: 'Pensemos', perguntaTexto: '¿Qué mantiene a los planetas en órbita alrededor del Sol?', opcao1: 'La gravedad del Sol', opcao2: 'El brillo de los planetas',
    certo: '¡Así es! La gravedad del Sol mantiene a los planetas en órbita.', tentar: 'Aún no. Piensa en la fuerza que atrae los cuerpos con masa. Puedes intentarlo de nuevo o continuar.',
    recap: 'Lo que descubrimos', recapTexto: 'El Sol es la estrella de nuestro sistema. Su gravedad mantiene los cuerpos en órbita y su energía llega a la Tierra como luz y calor.',
    fonte: 'Fuente científica: NASA — Our Sun: Facts', anterior: 'Volver', proximo: 'Siguiente', concluir: 'Terminar', concluido: '¡Lección completada!', progresso: 'El progreso se guarda en este dispositivo.', repetir:'Comenzar de nuevo', temporario:'El progreso está disponible solo en esta sesión.', atualizado:'Este recorrido se ha actualizado. Empieza la nueva versión.'
  }
}},
 terra: {id:'terra',versao:1,relacionado:'saturno',corpo:'terra',ambiente:'universo',urlFonte:'https://science.nasa.gov/earth/facts/',textos:{
 pt:{titulo:'Terra: dias, noites e anos',objetivo:'Nosso planeta em movimento',objetivoTexto:'Descubra a diferença entre um dia e um ano observando a Terra.',observar:'Encontre a Terra',observarTexto:'Observe a parte iluminada pelo Sol e a parte escura. A cena usa tamanhos e velocidades didáticos; não serve para medir durações.',focar:'Mostrar a Terra',explicacao:'Dois movimentos diferentes',explicacaoTexto:'A Terra gira sobre si mesma: os lugares voltados para o Sol têm dia, e os outros têm noite. Uma volta da Terra ao redor do Sol completa um ano.',pergunta:'Vamos pensar',perguntaTexto:'Qual movimento provoca a alternância entre dia e noite?',opcao1:'A Terra gira sobre si mesma',opcao2:'A Terra completa uma órbita ao redor do Sol',certo:'Isso! A rotação faz um lugar passar da parte iluminada para a parte escura.',tentar:'Pense no movimento que faz um lugar ficar voltado para o Sol e depois virar para o outro lado. Você pode tentar de novo.',recap:'O que descobrimos',recapTexto:'Rotação: dia e noite. Uma órbita ao redor do Sol: um ano. As estações dependem da inclinação do eixo terrestre, não de estar mais perto do Sol.',relacionadoTitulo:'Explorar Saturno V · Pro',fonte:'Fonte científica: NASA — Earth Facts'},
 en:{titulo:'Earth: days, nights and years',objetivo:'Our moving planet',objetivoTexto:'Discover the difference between a day and a year by observing Earth.',observar:'Find Earth',observarTexto:'Observe the sunlit and dark sides. This scene uses teaching scales and speeds; it cannot measure durations.',focar:'Show Earth',explicacao:'Two different movements',explicacaoTexto:'Earth spins on its axis: places facing the Sun have day, and other places have night. One orbit around the Sun makes a year.',pergunta:'Let’s think',perguntaTexto:'Which movement causes day and night to alternate?',opcao1:'Earth spins on its axis',opcao2:'Earth completes an orbit around the Sun',certo:'Right! Rotation carries a place from the sunlit side to the dark side.',tentar:'Think of the movement that makes a place face the Sun and then turn away. You can try again.',recap:'What we discovered',recapTexto:'Rotation: day and night. One orbit around the Sun: a year. Seasons depend on Earth’s tilted axis, not being closer to the Sun.',relacionadoTitulo:'Explore Saturn V · Pro',fonte:'Science source: NASA — Earth Facts'},
 es:{titulo:'Tierra: días, noches y años',objetivo:'Nuestro planeta en movimiento',objetivoTexto:'Descubre la diferencia entre un día y un año observando la Tierra.',observar:'Encuentra la Tierra',observarTexto:'Observa el lado iluminado y el lado oscuro. La escena usa escalas y velocidades didácticas; no sirve para medir duraciones.',focar:'Mostrar la Tierra',explicacao:'Dos movimientos distintos',explicacaoTexto:'La Tierra gira sobre sí misma: los lugares que miran al Sol tienen día y los demás tienen noche. Una órbita alrededor del Sol completa un año.',pergunta:'Pensemos',perguntaTexto:'¿Qué movimiento alterna el día y la noche?',opcao1:'La Tierra gira sobre sí misma',opcao2:'La Tierra completa una órbita alrededor del Sol',certo:'¡Eso es! La rotación lleva un lugar del lado iluminado al lado oscuro.',tentar:'Piensa en el movimiento que hace que un lugar mire al Sol y luego se aleje de él. Puedes intentarlo de nuevo.',recap:'Lo que descubrimos',recapTexto:'Rotación: día y noche. Una órbita alrededor del Sol: un año. Las estaciones dependen del eje inclinado de la Tierra, no de estar más cerca del Sol.',relacionadoTitulo:'Explorar Saturno V · Pro',fonte:'Fuente científica: NASA — Earth Facts'}
 }}
,
 hubble:{id:'hubble',versao:1,relacionado:'shuttle',nave:'hubble',ambiente:'hangar',urlFonte:'https://science.nasa.gov/mission/hubble/observatory/design/optics/',textos:{
 pt:{titulo:'Hubble: luz do espaço',objetivo:'Um olhar para longe',objetivoTexto:'Descubra como um telescópio espacial recolhe a luz de objetos distantes.',observar:'Explore o Hubble',observarTexto:'Abra o modelo no Hangar. Observe o tubo, a abertura e os painéis solares. Depois volte a Aprender e retome este passo. O modelo mostra o exterior; os espelhos ficam por dentro.',focar:'Explorar Hubble · grátis',explicacao:'Espelhos e instrumentos',explicacaoTexto:'O espelho principal recolhe luz e a reflete para um espelho menor. A luz segue aos instrumentos para ser estudada. Acima da maior parte da atmosfera, o Hubble evita parte da distorção da luz.',pergunta:'Vamos pensar',perguntaTexto:'Qual é a função dos espelhos do Hubble?',opcao1:'Recolher e focar luz nos instrumentos',opcao2:'Produzir a luz das estrelas',certo:'Isso! Os espelhos direcionam luz aos instrumentos; não iluminam as estrelas.',tentar:'O telescópio recebe luz que já vem dos objetos. Pense no que os espelhos fazem com ela.',recap:'O que descobrimos',recapTexto:'O Hubble recolhe luz distante. Seus espelhos focam essa luz nos instrumentos. O modelo exterior ajuda a conhecer a nave; não simula o caminho óptico interno.',relacionadoTitulo:'Explorar Discovery · Pro',fonte:'Fonte científica: NASA — Hubble Optics'},
 en:{titulo:'Hubble: light from space',objetivo:'A distant view',objetivoTexto:'Discover how a space telescope collects light from distant objects.',observar:'Explore Hubble',observarTexto:'Open the Hangar model. Observe its tube, aperture and solar panels. Then return to Learn and resume this step. The model shows the exterior; the mirrors are inside.',focar:'Explore Hubble · free',explicacao:'Mirrors and instruments',explicacaoTexto:'The primary mirror collects light and reflects it to a smaller mirror. Light then reaches instruments for analysis. Above most of the atmosphere, Hubble avoids some distortion of light.',pergunta:'Let’s think',perguntaTexto:'What do Hubble’s mirrors do?',opcao1:'Collect and focus light on instruments',opcao2:'Produce the stars’ light',certo:'Right! Mirrors direct light to instruments; they do not illuminate stars.',tentar:'The telescope receives light already coming from objects. Think about what its mirrors do with it.',recap:'What we discovered',recapTexto:'Hubble collects distant light. Its mirrors focus that light on instruments. The exterior model helps us explore the spacecraft; it does not simulate the internal optical path.',relacionadoTitulo:'Explore Discovery · Pro',fonte:'Science source: NASA — Hubble Optics'},
 es:{titulo:'Hubble: luz del espacio',objetivo:'Una mirada lejana',objetivoTexto:'Descubre cómo un telescopio espacial recoge luz de objetos distantes.',observar:'Explora el Hubble',observarTexto:'Abre el modelo del Hangar. Observa el tubo, la abertura y los paneles solares. Luego vuelve a Aprender y retoma este paso. El modelo muestra el exterior; los espejos están dentro.',focar:'Explorar Hubble · gratis',explicacao:'Espejos e instrumentos',explicacaoTexto:'El espejo principal recoge luz y la refleja hacia un espejo menor. La luz llega a los instrumentos para ser estudiada. Por encima de la mayor parte de la atmósfera, Hubble evita parte de la distorsión de la luz.',pergunta:'Pensemos',perguntaTexto:'¿Qué hacen los espejos del Hubble?',opcao1:'Recogen y enfocan luz en los instrumentos',opcao2:'Producen la luz de las estrellas',certo:'¡Eso es! Los espejos dirigen luz a los instrumentos; no iluminan las estrellas.',tentar:'El telescopio recibe luz que ya viene de los objetos. Piensa en lo que hacen los espejos con ella.',recap:'Lo que descubrimos',recapTexto:'Hubble recoge luz distante. Sus espejos la enfocan en los instrumentos. El modelo exterior ayuda a conocer la nave; no simula el camino óptico interno.',relacionadoTitulo:'Explorar Discovery · Pro',fonte:'Fuente científica: NASA — Hubble Optics'}
 }}
 ,planetas:{id:'planetas',versao:1,ambiente:'universo',corpos:[{id:'terra',rotulo:'focarTerra'},{id:'jupiter',rotulo:'focarJupiter'}],urlFonte:'https://science.nasa.gov/solar-system/planets/',textos:{
 pt:{titulo:'Planetas: rochosos e gigantes',objetivo:'Mundos diferentes',objetivoTexto:'Conheça as famílias dos oito planetas e observe Terra e Júpiter.',observar:'Compare dois planetas',observarTexto:'Observe continentes na Terra e faixas de nuvens em Júpiter. Cada astro tem seu enquadramento: os tamanhos em tela não estão na proporção real.',focarTerra:'Terra',focarJupiter:'Júpiter',explicacao:'Três famílias',explicacaoTexto:'Mercúrio, Vênus, Terra e Marte são rochosos, com superfície sólida. Júpiter e Saturno são gigantes gasosos. Urano e Netuno são gigantes gelados. Os gigantes não têm uma superfície firme como a da Terra.',pergunta:'Vamos pensar',perguntaTexto:'Qual par reúne um planeta rochoso e um gigante gasoso?',opcao1:'Terra e Júpiter',opcao2:'Urano e Netuno',certo:'Isso! Terra é rochosa e Júpiter é um gigante gasoso. Urano e Netuno são gigantes gelados.',tentar:'Urano e Netuno pertencem à mesma família: gigantes gelados. Procure um par com Terra, que é rochosa.',recap:'O que descobrimos',recapTexto:'São quatro rochosos, dois gigantes gasosos e dois gigantes gelados. Terra e Júpiter ajudam a conhecer essas diferenças. As imagens mostram o exterior; não revelam os interiores nem permitem medir tamanhos reais.',fonte:'Fonte científica: NASA — About the Planets'},
 en:{titulo:'Planets: rocky worlds and giants',objetivo:'Different worlds',objetivoTexto:'Meet the families of the eight planets and observe Earth and Jupiter.',observar:'Compare two planets',observarTexto:'Notice Earth’s continents and Jupiter’s cloud bands. Each world is framed separately: sizes on screen do not show real proportions.',focarTerra:'Earth',focarJupiter:'Jupiter',explicacao:'Three families',explicacaoTexto:'Mercury, Venus, Earth and Mars are rocky planets with solid surfaces. Jupiter and Saturn are gas giants. Uranus and Neptune are ice giants. Giants do not have a firm surface like Earth’s.',pergunta:'Let’s think',perguntaTexto:'Which pair contains a rocky planet and a gas giant?',opcao1:'Earth and Jupiter',opcao2:'Uranus and Neptune',certo:'Right! Earth is rocky and Jupiter is a gas giant. Uranus and Neptune are ice giants.',tentar:'Uranus and Neptune belong to the same family: ice giants. Look for a pair containing Earth, a rocky planet.',recap:'What we discovered',recapTexto:'There are four rocky planets, two gas giants and two ice giants. Earth and Jupiter help us explore these differences. Images show the exterior; they do not reveal interiors or let us measure real sizes.',fonte:'Science source: NASA — About the Planets'},
 es:{titulo:'Planetas: rocosos y gigantes',objetivo:'Mundos diferentes',objetivoTexto:'Conoce las familias de los ocho planetas y observa la Tierra y Júpiter.',observar:'Compara dos planetas',observarTexto:'Observa continentes en la Tierra y bandas de nubes en Júpiter. Cada astro tiene su encuadre: los tamaños en pantalla no están en proporción real.',focarTerra:'Tierra',focarJupiter:'Júpiter',explicacao:'Tres familias',explicacaoTexto:'Mercurio, Venus, Tierra y Marte son rocosos, con superficie sólida. Júpiter y Saturno son gigantes gaseosos. Urano y Neptuno son gigantes helados. Los gigantes no tienen una superficie firme como la Tierra.',pergunta:'Pensemos',perguntaTexto:'¿Qué pareja reúne un planeta rocoso y un gigante gaseoso?',opcao1:'Tierra y Júpiter',opcao2:'Urano y Neptuno',certo:'¡Eso es! La Tierra es rocosa y Júpiter es un gigante gaseoso. Urano y Neptuno son gigantes helados.',tentar:'Urano y Neptuno pertenecen a la misma familia: gigantes helados. Busca una pareja con la Tierra, que es rocosa.',recap:'Lo que descubrimos',recapTexto:'Hay cuatro rocosos, dos gigantes gaseosos y dos gigantes helados. La Tierra y Júpiter ayudan a explorar esas diferencias. Las imágenes muestran el exterior; no revelan los interiores ni permiten medir tamaños reales.',fonte:'Fuente científica: NASA — About the Planets'}
 }}
 ,marte:{id:'marte',versao:1,corpo:'marte',ambiente:'universo',urlFonte:'https://science.nasa.gov/mars/facts/',textos:{
 pt:{titulo:'Marte: um mundo rochoso',objetivo:'Por que avermelhado?',objetivoTexto:'Conheça Marte e descubra o que dá ao planeta sua aparência avermelhada.',observar:'Observe Marte',observarTexto:'Observe as cores do modelo. A escala é didática; a imagem não revela a composição do solo.',focar:'Mostrar Marte',explicacao:'Rochas, poeira e robôs',explicacaoTexto:'Marte é rochoso e tem uma atmosfera fina. Minerais de ferro oxidados, como ferrugem, dão tons avermelhados ao solo e à poeira. Veículos robóticos exploram sua superfície.',pergunta:'Vamos pensar',perguntaTexto:'O que ajuda Marte a parecer avermelhado?',opcao1:'Ferro oxidado no solo e na poeira',opcao2:'Um planeta coberto de fogo',certo:'Isso! Minerais de ferro oxidados, como ferrugem, ajudam a dar a cor avermelhada.',tentar:'A cor não vem de fogo. Pense no que acontece com o ferro quando enferruja. Você pode tentar de novo.',recap:'O que descobrimos',recapTexto:'Marte é um mundo rochoso com atmosfera fina. O ferro oxidado ajuda a explicar suas cores. Robôs exploram a superfície; observar o modelo é um começo para conhecer o planeta.',fonte:'Fonte científica: NASA — Mars Facts'},
 en:{titulo:'Mars: a rocky world',objetivo:'Why reddish?',objetivoTexto:'Meet Mars and discover what gives the planet its reddish appearance.',observar:'Observe Mars',observarTexto:'Observe the model’s colors. The scale is for learning; the image does not reveal the soil’s composition.',focar:'Show Mars',explicacao:'Rocks, dust and robots',explicacaoTexto:'Mars is rocky and has a thin atmosphere. Oxidized iron minerals, like rust, give reddish tones to its soil and dust. Robotic vehicles explore its surface.',pergunta:'Let’s think',perguntaTexto:'What helps Mars look reddish?',opcao1:'Oxidized iron in soil and dust',opcao2:'A planet covered in fire',certo:'Right! Oxidized iron minerals, like rust, help give Mars its reddish color.',tentar:'The color does not come from fire. Think about what happens when iron rusts. You can try again.',recap:'What we discovered',recapTexto:'Mars is a rocky world with a thin atmosphere. Oxidized iron helps explain its colors. Robots explore its surface; observing the model is a start to learning about the planet.',fonte:'Science source: NASA — Mars Facts'},
 es:{titulo:'Marte: un mundo rocoso',objetivo:'¿Por qué rojizo?',objetivoTexto:'Conoce Marte y descubre qué le da al planeta su aspecto rojizo.',observar:'Observa Marte',observarTexto:'Observa los colores del modelo. La escala es didáctica; la imagen no revela la composición del suelo.',focar:'Mostrar Marte',explicacao:'Rocas, polvo y robots',explicacaoTexto:'Marte es rocoso y tiene una atmósfera fina. Los minerales de hierro oxidados, como el óxido, dan tonos rojizos al suelo y al polvo. Vehículos robóticos exploran su superficie.',pergunta:'Pensemos',perguntaTexto:'¿Qué ayuda a que Marte se vea rojizo?',opcao1:'Hierro oxidado en el suelo y el polvo',opcao2:'Un planeta cubierto de fuego',certo:'¡Eso es! Los minerales de hierro oxidados ayudan a dar el color rojizo.',tentar:'El color no viene del fuego. Piensa en lo que pasa cuando el hierro se oxida. Puedes intentarlo de nuevo.',recap:'Lo que descubrimos',recapTexto:'Marte es un mundo rocoso con atmósfera fina. El hierro oxidado ayuda a explicar sus colores. Robots exploran la superficie; observar el modelo es un comienzo para conocer el planeta.',fonte:'Fuente científica: NASA — Mars Facts'}
 }}
,lua:{
 "id": "lua",
 "versao": 1,
 "corpo": "lua",
 "ambiente": "universo",
 "urlFonte": "https://science.nasa.gov/moon/moon-phases/",
 "textos": {
  "pt": {
   "titulo": "Lua: luz e crateras",
   "objetivo": "Nossa vizinha no espaço",
   "objetivoTexto": "Observe a Lua e descubra de onde vem a luz que vemos no céu.",
   "observar": "Encontre a Lua",
   "observarTexto": "Procure crateras e regiões claras e escuras. A câmera pode girar ao redor do modelo; essa vista não representa as fases vistas da Terra.",
   "focar": "Mostrar a Lua",
   "explicacao": "Luz do Sol refletida",
   "explicacaoTexto": "A Lua orbita a Terra e reflete a luz do Sol. Suas fases mudam porque vemos diferentes porções do lado iluminado. A sombra da Terra pode escurecê-la durante um eclipse lunar.",
   "pergunta": "Vamos pensar",
   "perguntaTexto": "O que explica as fases da Lua?",
   "opcao1": "Vemos diferentes porções do lado iluminado pelo Sol",
   "opcao2": "A sombra da Terra cobre a Lua todos os meses",
   "certo": "Isso! As fases dependem da porção iluminada que vemos. A sombra da Terra está relacionada aos eclipses lunares.",
   "tentar": "Fases e eclipses são fenômenos diferentes. Pense na parte iluminada pelo Sol que conseguimos ver da Terra.",
   "recap": "O que descobrimos",
   "recapTexto": "A Lua reflete luz solar. As fases mostram diferentes porções do lado iluminado, vistas da Terra. Explore suas crateras no modelo; a câmera livre não é uma simulação das fases.",
   "fonte": "Fonte científica: NASA — Moon Phases"
  },
  "en": {
   "titulo": "Moon: light and craters",
   "objetivo": "Our neighbor in space",
   "objetivoTexto": "Observe the Moon and discover where the light we see in the sky comes from.",
   "observar": "Find the Moon",
   "observarTexto": "Look for craters and light and dark regions. The camera can orbit the model; this view does not represent the phases seen from Earth.",
   "focar": "Show the Moon",
   "explicacao": "Reflected sunlight",
   "explicacaoTexto": "The Moon orbits Earth and reflects sunlight. Its phases change because we see different portions of its sunlit side. Earth’s shadow can darken it during a lunar eclipse.",
   "pergunta": "Let’s think",
   "perguntaTexto": "What explains the Moon’s phases?",
   "opcao1": "We see different portions of the side lit by the Sun",
   "opcao2": "Earth’s shadow covers the Moon every month",
   "certo": "Right! Phases depend on the sunlit portion we see. Earth’s shadow is involved in lunar eclipses.",
   "tentar": "Phases and eclipses are different phenomena. Think about the sunlit portion we can see from Earth.",
   "recap": "What we discovered",
   "recapTexto": "The Moon reflects sunlight. Phases show different portions of its sunlit side, seen from Earth. Explore its craters in the model; the free camera does not simulate the phases.",
   "fonte": "Science source: NASA — Moon Phases"
  },
  "es": {
   "titulo": "Luna: luz y cráteres",
   "objetivo": "Nuestra vecina en el espacio",
   "objetivoTexto": "Observa la Luna y descubre de dónde viene la luz que vemos en el cielo.",
   "observar": "Encuentra la Luna",
   "observarTexto": "Busca cráteres y regiones claras y oscuras. La cámara puede girar alrededor del modelo; esta vista no representa las fases vistas desde la Tierra.",
   "focar": "Mostrar la Luna",
   "explicacao": "Luz solar reflejada",
   "explicacaoTexto": "La Luna orbita la Tierra y refleja la luz del Sol. Sus fases cambian porque vemos distintas porciones del lado iluminado. La sombra terrestre puede oscurecerla durante un eclipse lunar.",
   "pergunta": "Pensemos",
   "perguntaTexto": "¿Qué explica las fases de la Luna?",
   "opcao1": "Vemos distintas porciones del lado iluminado por el Sol",
   "opcao2": "La sombra terrestre cubre la Luna todos los meses",
   "certo": "¡Eso es! Las fases dependen de la porción iluminada que vemos. La sombra terrestre interviene en los eclipses lunares.",
   "tentar": "Fases y eclipses son fenómenos distintos. Piensa en la porción iluminada por el Sol que podemos ver desde la Tierra.",
   "recap": "Lo que descubrimos",
   "recapTexto": "La Luna refleja luz solar. Las fases muestran distintas porciones del lado iluminado, vistas desde la Tierra. Explora sus cráteres en el modelo; la cámara libre no simula las fases.",
   "fonte": "Fuente científica: NASA — Moon Phases"
  }
 }
}
,pequenos:{
 "id": "pequenos",
 "versao": 1,
 "ambiente": "universo",
 "corpos": [
  {
   "id": "vesta",
   "rotulo": "focarVesta"
  },
  {
   "id": "halley",
   "rotulo": "focarHalley"
  }
 ],
 "urlFonte": "https://science.nasa.gov/asteroids-comets-meteors/",
 "textos": {
  "pt": {
   "titulo": "Asteroides e cometas",
   "objetivo": "Pequenos mundos, grandes histórias",
   "objetivoTexto": "Conheça Vesta e Halley e descubra a diferença entre asteroides e cometas.",
   "observar": "Explore dois corpos",
   "observarTexto": "Observe Vesta e o núcleo de Halley. Cada corpo tem seu enquadramento. A cauda é estilizada; a cena não prevê sua aparência ou visibilidade no céu.",
   "focarVesta": "Vesta",
   "focarHalley": "Halley",
   "explicacao": "Rocha, gelo e poeira",
   "explicacaoTexto": "Asteroides são corpos principalmente rochosos. Cometas contêm gelo, rocha e poeira. Perto do Sol, o aquecimento pode liberar gás e poeira do cometa, formando uma cabeleira e caudas.",
   "pergunta": "Vamos pensar",
   "perguntaTexto": "O que pode formar as caudas de um cometa perto do Sol?",
   "opcao1": "Gás e poeira liberados pelo aquecimento",
   "opcao2": "Fumaça de um motor dentro do cometa",
   "certo": "Isso! O aquecimento solar libera material do cometa. Ele não precisa de um motor para formar caudas.",
   "tentar": "Cometas são corpos naturais. Pense no gelo e na poeira quando o cometa recebe mais calor do Sol.",
   "recap": "O que descobrimos",
   "recapTexto": "Vesta é um asteroide; Halley é um cometa. Gelo e aquecimento ajudam a explicar a atividade dos cometas. Os modelos são didáticos: tamanho, cauda e detalhes visuais não são uma previsão de observação.",
   "fonte": "Fonte científica: NASA — Asteroids, Comets & Meteors"
  },
  "en": {
   "titulo": "Asteroids and comets",
   "objetivo": "Small worlds, big stories",
   "objetivoTexto": "Meet Vesta and Halley and discover the difference between asteroids and comets.",
   "observar": "Explore two bodies",
   "observarTexto": "Observe Vesta and Halley’s nucleus. Each body is framed separately. The tail is stylized; the scene does not predict its appearance or visibility in the sky.",
   "focarVesta": "Vesta",
   "focarHalley": "Halley",
   "explicacao": "Rock, ice and dust",
   "explicacaoTexto": "Asteroids are mainly rocky bodies. Comets contain ice, rock and dust. Near the Sun, heating can release gas and dust from a comet, forming a coma and tails.",
   "pergunta": "Let’s think",
   "perguntaTexto": "What can form a comet’s tails near the Sun?",
   "opcao1": "Gas and dust released by heating",
   "opcao2": "Smoke from an engine inside the comet",
   "certo": "Right! Solar heating releases material from the comet. It does not need an engine to form tails.",
   "tentar": "Comets are natural bodies. Think about ice and dust when the comet receives more heat from the Sun.",
   "recap": "What we discovered",
   "recapTexto": "Vesta is an asteroid; Halley is a comet. Ice and heating help explain comet activity. The models are for learning: size, tail and visual details are not an observing forecast.",
   "fonte": "Science source: NASA — Asteroids, Comets & Meteors"
  },
  "es": {
   "titulo": "Asteroides y cometas",
   "objetivo": "Mundos pequeños, grandes historias",
   "objetivoTexto": "Conoce Vesta y Halley y descubre la diferencia entre asteroides y cometas.",
   "observar": "Explora dos cuerpos",
   "observarTexto": "Observa Vesta y el núcleo de Halley. Cada cuerpo tiene su encuadre. La cola es estilizada; la escena no predice su apariencia ni su visibilidad en el cielo.",
   "focarVesta": "Vesta",
   "focarHalley": "Halley",
   "explicacao": "Roca, hielo y polvo",
   "explicacaoTexto": "Los asteroides son cuerpos principalmente rocosos. Los cometas contienen hielo, roca y polvo. Cerca del Sol, el calentamiento puede liberar gas y polvo del cometa, formando una coma y colas.",
   "pergunta": "Pensemos",
   "perguntaTexto": "¿Qué puede formar las colas de un cometa cerca del Sol?",
   "opcao1": "Gas y polvo liberados por el calentamiento",
   "opcao2": "Humo de un motor dentro del cometa",
   "certo": "¡Eso es! El calentamiento solar libera material del cometa. No necesita un motor para formar colas.",
   "tentar": "Los cometas son cuerpos naturales. Piensa en el hielo y el polvo cuando el cometa recibe más calor del Sol.",
   "recap": "Lo que descubrimos",
   "recapTexto": "Vesta es un asteroide; Halley es un cometa. El hielo y el calentamiento ayudan a explicar la actividad de los cometas. Los modelos son didácticos: tamaño, cola y detalles visuales no son una previsión de observación.",
   "fonte": "Fuente científica: NASA — Asteroids, Comets & Meteors"
  }
 }
}
,"estacoes-guia":ROTEIRO_ESTACOES_ESSENCIAL,
"mares-guia":ROTEIRO_MARES_ESSENCIAL
,apollo11:{continuacao:'saturno-estagios',id:'apollo11',versao:1,ambiente:'universo',corpo:'lua',urlFonte:'https://www.nasa.gov/mission/apollo-11/',aprofundamentos:[{id:'saturno',rotulo:'explorarSaturno'},{id:'modulo-lunar',rotulo:'explorarModulo'}],textos:{
 pt:{continuacaoTitulo:'Aprender: estágios do Saturno V · Pro (opcional)',titulo:'Apollo 11: caminho até a Lua',objetivo:'Uma missão histórica',objetivoTexto:'Descubra como a Apollo 11 levou pessoas à Lua e trouxe sua tripulação de volta.',observar:'Observe a Lua',observarTexto:'Observe o modelo da Lua no app. Esta cena não reconstrói o local do pouso nem a rota da Apollo 11.',focar:'Mostrar a Lua',explicacao:'Três veículos, funções diferentes',explicacaoTexto:'O Saturno V lançou a missão. O módulo lunar Eagle levou Armstrong e Aldrin à superfície e sua parte superior voltou à órbita lunar. O módulo de comando Columbia ficou com Collins em órbita e levou a tripulação no retorno à Terra.',pergunta:'Vamos pensar',perguntaTexto:'Qual veículo pousou na Lua?',opcao1:'O módulo lunar Eagle',opcao2:'O Saturno V inteiro',certo:'Isso! O Eagle pousou na Lua. O Saturno V foi o foguete de lançamento.',tentar:'O Saturno V lançou a missão; pense no veículo feito para descer à superfície lunar.',recap:'O que descobrimos',recapTexto:'O Saturno V lançou a Apollo 11. Eagle pousou na Lua; sua parte superior retornou à órbita. Collins permaneceu no Columbia, que levou os três astronautas de volta à Terra.',explorarSaturno:'Explorar Saturno V · Pro (opcional)',explorarModulo:'Explorar módulo lunar · Pro (opcional)',fonte:'Fonte científica: NASA — Apollo 11'},
 en:{continuacaoTitulo:'Learn: Saturn V stages · Pro (optional)',titulo:'Apollo 11: the journey to the Moon',objetivo:'A historic mission',objetivoTexto:'Discover how Apollo 11 took people to the Moon and brought its crew home.',observar:'Observe the Moon',observarTexto:'Observe the Moon model in the app. This scene does not recreate Apollo 11’s landing site or route.',focar:'Show the Moon',explicacao:'Three vehicles, different jobs',explicacaoTexto:'The Saturn V launched the mission. The lunar module Eagle carried Armstrong and Aldrin to the surface; its upper stage returned to lunar orbit. The command module Columbia stayed in orbit with Collins and carried the crew on the return to Earth.',pergunta:'Let’s think',perguntaTexto:'Which vehicle landed on the Moon?',opcao1:'The lunar module Eagle',opcao2:'The entire Saturn V',certo:'Right! Eagle landed on the Moon. Saturn V was the launch rocket.',tentar:'Saturn V launched the mission. Think of the vehicle designed to descend to the lunar surface.',recap:'What we discovered',recapTexto:'Saturn V launched Apollo 11. Eagle landed on the Moon; its upper stage returned to orbit. Collins stayed in Columbia, which carried all three astronauts back to Earth.',explorarSaturno:'Explore Saturn V · Pro (optional)',explorarModulo:'Explore lunar module · Pro (optional)',fonte:'Science source: NASA — Apollo 11'},
 es:{continuacaoTitulo:'Aprender: etapas del Saturno V · Pro (opcional)',titulo:'Apollo 11: el viaje a la Luna',objetivo:'Una misión histórica',objetivoTexto:'Descubre cómo Apollo 11 llevó personas a la Luna y trajo de vuelta a su tripulación.',observar:'Observa la Luna',observarTexto:'Observa el modelo de la Luna en la app. Esta escena no reconstruye el lugar del alunizaje ni la ruta de Apollo 11.',focar:'Mostrar la Luna',explicacao:'Tres vehículos, funciones distintas',explicacaoTexto:'El Saturno V lanzó la misión. El módulo lunar Eagle llevó a Armstrong y Aldrin a la superficie; su etapa superior volvió a la órbita lunar. El módulo de mando Columbia permaneció en órbita con Collins y llevó a la tripulación de regreso a la Tierra.',pergunta:'Pensemos',perguntaTexto:'¿Qué vehículo alunizó?',opcao1:'El módulo lunar Eagle',opcao2:'El Saturno V completo',certo:'¡Eso es! Eagle alunizó en la Luna. Saturno V fue el cohete de lanzamiento.',tentar:'Saturno V lanzó la misión. Piensa en el vehículo diseñado para descender a la superficie lunar.',recap:'Lo que descubrimos',recapTexto:'Saturno V lanzó Apollo 11. Eagle alunizó; su etapa superior volvió a la órbita. Collins permaneció en Columbia, que llevó a los tres astronautas de regreso a la Tierra.',explorarSaturno:'Explorar Saturno V · Pro (opcional)',explorarModulo:'Explorar módulo lunar · Pro (opcional)',fonte:'Fuente científica: NASA — Apollo 11'}
}}
,'saturno-estagios':{id:'saturno-estagios',versao:1,ambiente:'hangar',nave:'saturno',pro:true,pecas:[{id:'sic',rotulo:'focarSic'},{id:'sii',rotulo:'focarSii'}],urlFonte:'https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/',textos:{
 pt:{titulo:'Saturno V: por que separar estágios?',objetivo:'Um foguete em etapas',objetivoTexto:'Vamos descobrir como os estágios ajudam um foguete a continuar subindo.',observar:'Observe os estágios',observarTexto:'Use os botões do primeiro e do segundo estágio para abrir o modelo das peças. Depois, volte ao roteiro.',focarSic:'Mostrar primeiro estágio',focarSii:'Mostrar segundo estágio',explicacao:'Cada parte tem sua vez',explicacaoTexto:'O estágio inferior dá o impulso inicial. Depois de gastar seus propelentes, ele é descartado. Assim, os estágios restantes continuam a viagem com menos massa para acelerar. O S-II, segundo estágio do Saturno V, continua a ascensão e acelera as partes restantes.',pergunta:'Vamos pensar',perguntaTexto:'Por que separar os estágios ajuda o foguete?',opcao1:'Para reduzir a massa que os estágios seguintes precisam acelerar',opcao2:'Porque todos os estágios pousam na Lua',certo:'Isso! Ao descartar um estágio usado, o próximo precisa acelerar menos massa.',tentar:'Pense no que acontece com a massa do foguete quando uma parte já usou seu propelente e é descartada.',recap:'O que descobrimos',recapTexto:'O primeiro estágio dá o impulso inicial e é descartado depois de usar seus propelentes. O S-II continua a ascensão e acelera as partes restantes; nenhum estágio do Saturno V pousa na Lua. O modelo e a separação são didáticos, não uma sequência real em tempo exato.',voltarRoteiro:'Voltar ao roteiro',fonte:'Fonte científica: NASA — What Was the Saturn V?'},
 en:{titulo:'Saturn V: why separate stages?',objetivo:'A rocket in stages',objetivoTexto:'Let’s discover how stages help a rocket keep climbing.',observar:'Observe the stages',observarTexto:'Use the first- and second-stage buttons to open the parts model. Then return to the lesson.',focarSic:'Show first stage',focarSii:'Show second stage',explicacao:'Each part has its turn',explicacaoTexto:'The lower stage provides the initial push. After using its propellants, it is discarded. The remaining stages can then continue with less mass to accelerate. The S-II, Saturn V’s second stage, continues the ascent and accelerates the remaining parts.',pergunta:'Let’s think',perguntaTexto:'Why does separating stages help a rocket?',opcao1:'It reduces the mass later stages need to accelerate',opcao2:'Because every stage lands on the Moon',certo:'Right! Once a used stage is discarded, the next stage has less mass to accelerate.',tentar:'Think about what happens to the rocket’s mass when a part has used its propellant and is discarded.',recap:'What we discovered',recapTexto:'The first stage provides the initial push and is discarded after using its propellants. The S-II continues the ascent and accelerates the remaining parts; no Saturn V stage lands on the Moon. The model and separation are educational, not an exact real-time sequence.',voltarRoteiro:'Back to the lesson',fonte:'Science source: NASA — What Was the Saturn V?'},
 es:{titulo:'Saturno V: ¿por qué separar etapas?',objetivo:'Un cohete por etapas',objetivoTexto:'Descubramos cómo las etapas ayudan a un cohete a seguir ascendiendo.',observar:'Observa las etapas',observarTexto:'Usa los botones de la primera y la segunda etapa para abrir el modelo de las piezas. Después, vuelve a la lección.',focarSic:'Mostrar primera etapa',focarSii:'Mostrar segunda etapa',explicacao:'Cada parte tiene su turno',explicacaoTexto:'La etapa inferior proporciona el impulso inicial. Después de consumir sus propelentes, se desprende. Así, las etapas restantes continúan con menos masa que acelerar. La S-II, segunda etapa del Saturno V, continúa el ascenso y acelera las partes restantes.',pergunta:'Pensemos',perguntaTexto:'¿Por qué ayuda separar las etapas del cohete?',opcao1:'Reduce la masa que las etapas siguientes deben acelerar',opcao2:'Porque todas las etapas aterrizan en la Luna',certo:'¡Eso es! Al desprenderse una etapa usada, la siguiente tiene menos masa que acelerar.',tentar:'Piensa qué ocurre con la masa del cohete cuando una parte ya usó su propelente y se desprende.',recap:'Lo que descubrimos',recapTexto:'La primera etapa da el impulso inicial y se desprende después de usar sus propelentes. La S-II continúa el ascenso y acelera las partes restantes; ninguna etapa del Saturno V aterriza en la Luna. El modelo y la separación son didácticos, no una secuencia real en tiempo exacto.',voltarRoteiro:'Volver a la lección',fonte:'Fuente científica: NASA — What Was the Saturn V?'}
}}
,'discovery-carga':{id:'discovery-carga',versao:1,ambiente:'hangar',nave:'shuttle',pro:true,pecas:[{id:'hubble',rotulo:'focarCarga'},{id:'arm',rotulo:'focarBraco'}],urlFonte:'https://science.nasa.gov/mission/hubble/observatory/missions-to-hubble/deployment/',textos:{
 pt:{titulo:'Discovery: carga e braço robótico',objetivo:'Uma carga em órbita',objetivoTexto:'Vamos explorar como o Discovery levou o Hubble e como os astronautas o moveram.',observar:'Explore a carga e o braço',observarTexto:'Use os botões para explorar a carga Hubble e o braço Canadarm no modelo. Depois, volte ao roteiro.',focarCarga:'Mostrar a carga Hubble',focarBraco:'Mostrar o braço Canadarm',explicacao:'O braço moveu o Hubble',explicacaoTexto:'O Discovery carregou o Hubble em seu compartimento de carga. Os astronautas operaram o Canadarm para pegar, mover e soltar o Hubble em órbita. O braço voltou com a nave, e o telescópio ficou em órbita.',pergunta:'Vamos pensar',perguntaTexto:'Quem moveu o Hubble para fora do compartimento de carga?',opcao1:'O Canadarm, operado pelos astronautas',opcao2:'Os motores principais',certo:'Isso! Os astronautas operaram o Canadarm para mover e soltar o Hubble em órbita.',tentar:'Pense no braço robótico que os astronautas controlavam a bordo do ônibus espacial.',recap:'O que descobrimos',recapTexto:'O Discovery levou o Hubble no compartimento de carga. Astronautas usaram o Canadarm para pegar, mover e soltar o telescópio em órbita. O braço voltou com a nave, enquanto o Hubble permaneceu no espaço. O modelo e a animação são didáticos, não mostram uma trajetória nem telemetria real.',voltarRoteiro:'Voltar ao roteiro',fonte:'Fonte científica: NASA — Hubble Deployment'},
 en:{titulo:'Discovery: cargo and robotic arm',objetivo:'Cargo in orbit',objetivoTexto:'Let’s explore how Discovery carried Hubble and how astronauts moved it.',observar:'Explore the cargo and arm',observarTexto:'Use the buttons to explore the Hubble cargo and Canadarm in the model. Then return to the lesson.',focarCarga:'Show Hubble cargo',focarBraco:'Show the Canadarm',explicacao:'The arm moved Hubble',explicacaoTexto:'Discovery carried Hubble in its payload bay. Astronauts operated Canadarm to grasp, move, and release Hubble in orbit. The arm returned with the shuttle, while the telescope stayed in orbit.',pergunta:'Let’s think',perguntaTexto:'Who moved Hubble out of the payload bay?',opcao1:'Canadarm, operated by the astronauts',opcao2:'The main engines',certo:'That’s right! The astronauts operated Canadarm to move and release Hubble in orbit.',tentar:'Think about the robotic arm the astronauts controlled aboard the space shuttle.',recap:'What we discovered',recapTexto:'Discovery carried Hubble in its payload bay. Astronauts used Canadarm to grasp, move, and release the telescope in orbit. The arm returned with the shuttle, while Hubble stayed in space. The model and animation are educational; they do not show a real trajectory or telemetry.',voltarRoteiro:'Back to the lesson',fonte:'Science source: NASA — Hubble Deployment'},
 es:{titulo:'Discovery: carga y brazo robótico',objetivo:'Carga en órbita',objetivoTexto:'Exploremos cómo Discovery llevó Hubble y cómo los astronautas lo movieron.',observar:'Explora la carga y el brazo',observarTexto:'Usa los botones para explorar la carga Hubble y el brazo Canadarm en el modelo. Después, vuelve a la lección.',focarCarga:'Mostrar la carga Hubble',focarBraco:'Mostrar el brazo Canadarm',explicacao:'El brazo movió Hubble',explicacaoTexto:'Discovery llevó Hubble en su bodega de carga. Los astronautas operaron Canadarm para sujetar, mover y soltar Hubble en órbita. El brazo regresó con el transbordador, mientras el telescopio quedó en órbita.',pergunta:'Pensemos',perguntaTexto:'¿Quién movió Hubble fuera de la bodega de carga?',opcao1:'Canadarm, operado por los astronautas',opcao2:'Los motores principales',certo:'¡Eso es! Los astronautas operaron Canadarm para mover y soltar Hubble en órbita.',tentar:'Piensa en el brazo robótico que los astronautas controlaban a bordo del transbordador espacial.',recap:'Lo que descubrimos',recapTexto:'Discovery llevó Hubble en su bodega de carga. Los astronautas usaron Canadarm para sujetar, mover y soltar el telescopio en órbita. El brazo regresó con el transbordador, mientras Hubble permaneció en el espacio. El modelo y la animación son didácticos; no muestran una trayectoria ni telemetría real.',voltarRoteiro:'Volver a la lección',fonte:'Fuente científica: NASA — Hubble Deployment'}
}},
'discovery-hubble':{continuacao:'discovery-carga',id:'discovery-hubble',versao:1,ambiente:'universo',corpo:'hubble',relacionado:'shuttle',urlFonte:'https://science.nasa.gov/mission/hubble/observatory/missions-to-hubble/',textos:{
 pt:{continuacaoTitulo:'Aprender: carga e braço robótico · Pro (opcional)',titulo:'Discovery e Hubble: uma missão em equipe',objetivo:'Uma visita importante',objetivoTexto:'Descubra como astronautas ajudaram o Hubble a funcionar melhor.',observar:'Observe o Hubble',observarTexto:'Encontre o Hubble na cena e observe seu modelo. Esta cena mostra o Hubble; não reconstrói o lançamento nem as missões de reparo.',focar:'Mostrar o Hubble',explicacao:'Uma equipe no espaço',explicacaoTexto:'Em abril de 1990, o ônibus espacial Discovery levou o Hubble ao espaço. Em cinco missões de manutenção, equipes de astronautas repararam o telescópio e trocaram instrumentos para mantê-lo atualizado.',pergunta:'Vamos pensar',perguntaTexto:'Para que serviram as missões de manutenção do Hubble?',opcao1:'Para reparar e atualizar o telescópio',opcao2:'Para levar o Hubble até a Lua',certo:'Isso! As equipes repararam o Hubble e trocaram instrumentos para ele continuar trabalhando.',tentar:'Pense no que uma equipe pode fazer para cuidar e melhorar um telescópio no espaço.',recap:'O que descobrimos',recapTexto:'O Discovery levou o Hubble ao espaço em 1990. Depois, astronautas fizeram cinco missões para reparar e atualizar o telescópio. A cena mostra o Hubble, não essas viagens.',relacionadoTitulo:'Explorar Discovery · Pro (opcional)',fonte:'Fonte científica: NASA — Hubble Servicing Missions'},
 en:{continuacaoTitulo:'Learn: cargo and robotic arm · Pro (optional)',titulo:'Discovery and Hubble: a team mission',objetivo:'An important visit',objetivoTexto:'Discover how astronauts helped Hubble work better.',observar:'Observe Hubble',observarTexto:'Find Hubble in the scene and observe its model. This scene shows Hubble; it does not recreate the launch or repair missions.',focar:'Show Hubble',explicacao:'A team in space',explicacaoTexto:'In April 1990, the space shuttle Discovery carried Hubble into space. On five servicing missions, astronaut crews repaired the telescope and replaced instruments to keep it up to date.',pergunta:'Let’s think',perguntaTexto:'What were Hubble’s servicing missions for?',opcao1:'To repair and update the telescope',opcao2:'To take Hubble to the Moon',certo:'Right! The crews repaired Hubble and replaced instruments so it could keep working.',tentar:'Think about what a team might do to care for and improve a telescope in space.',recap:'What we discovered',recapTexto:'Discovery carried Hubble into space in 1990. Later, astronauts made five missions to repair and update the telescope. The scene shows Hubble, not those trips.',relacionadoTitulo:'Explore Discovery · Pro (optional)',fonte:'Science source: NASA — Hubble Servicing Missions'},
 es:{continuacaoTitulo:'Aprender: carga y brazo robótico · Pro (opcional)',titulo:'Discovery y Hubble: una misión en equipo',objetivo:'Una visita importante',objetivoTexto:'Descubre cómo los astronautas ayudaron a que Hubble funcionara mejor.',observar:'Observa Hubble',observarTexto:'Encuentra Hubble en la escena y observa su modelo. Esta escena muestra Hubble; no reconstruye el lanzamiento ni las misiones de reparación.',focar:'Mostrar Hubble',explicacao:'Un equipo en el espacio',explicacaoTexto:'En abril de 1990, el transbordador espacial Discovery llevó Hubble al espacio. En cinco misiones de mantenimiento, equipos de astronautas repararon el telescopio y cambiaron instrumentos para mantenerlo actualizado.',pergunta:'Pensemos',perguntaTexto:'¿Para qué sirvieron las misiones de mantenimiento de Hubble?',opcao1:'Para reparar y actualizar el telescopio',opcao2:'Para llevar Hubble hasta la Luna',certo:'¡Eso es! Los equipos repararon Hubble y cambiaron instrumentos para que siguiera funcionando.',tentar:'Piensa en lo que un equipo puede hacer para cuidar y mejorar un telescopio en el espacio.',recap:'Lo que descubrimos',recapTexto:'Discovery llevó Hubble al espacio en 1990. Después, los astronautas hicieron cinco misiones para reparar y actualizar el telescopio. La escena muestra Hubble, no esos viajes.',relacionadoTitulo:'Explorar Discovery · Pro (opcional)',fonte:'Fuente científica: NASA — Misiones de servicio de Hubble'}
}}
};

// O roteiro Pro usa uma sequência própria; os demais mantêm seus cinco passos.
const saturno=ROTEIROS_COMPLETOS['saturno-estagios'];
saturno.versao=3;
saturno.fontesAdicionais=[{nome:'NASA · Apollo 11: missão',url:'https://www.nasa.gov/history/apollo-11-mission-overview/'},{nome:'NASA · Recuperação no Pacífico',url:'https://www.nasa.gov/history/50-years-ago-hornet-3-the-recovery-of-apollo-11/'}];
saturno.pecas=['sic','inter1','sii','inter2','sivb','iu','sla','lm','sm','cm','les'].map(id=>({id,rotulo:`peca_${id}`}));
const nomes={
 pt:['S-IC · primeiro estágio','Ligação S-IC / S-II','S-II · segundo estágio','Ligação S-II / S-IVB','S-IVB · terceiro estágio','Unidade de instrumentos','Adaptador lunar','Eagle · módulo lunar','Módulo de serviço','Columbia · cápsula','Torre de escape'],
 en:['S-IC · first stage','S-IC / S-II interstage','S-II · second stage','S-II / S-IVB interstage','S-IVB · third stage','Instrument unit','Lunar-module adapter','Eagle · lunar module','Service module','Columbia · capsule','Escape tower'],
 es:['S-IC · primera etapa','Unión S-IC / S-II','S-II · segunda etapa','Unión S-II / S-IVB','S-IVB · tercera etapa','Unidad de instrumentos','Adaptador lunar','Eagle · módulo lunar','Módulo de servicio','Columbia · cápsula','Torre de escape']
};
const novos={
 pt:{titulo:'Apollo 11 e Saturno V: da Terra à Lua e de volta',objetivo:'A aventura começa na Terra',objetivoTexto:'Acompanhe a missão e descubra o trabalho de cada componente. Observe a Terra a 1 hora/s; você pode mudar o ritmo na barra inferior. As vistas das peças são didáticas, sem simular o voo em escala real.',modeloTitulo:'Componente desta etapa',modeloAjuda:'Geometria-base NASA · Cápsula de recuperação adaptada, cenários, paraquedas e movimentos artísticos. Arraste · pinça.',modeloErro:'Vista 3D indisponível. Abra a ficha da peça para continuar.',retornoTerra:'De volta ao nosso planeta',retornoTexto:'Depois da reentrada, Columbia desce de paraquedas ao oceano com os três astronautas. Observe novamente a Terra a 1 hora/s ou ajuste a velocidade. Só a cápsula retorna intacta; os estágios do foguete e o módulo lunar têm outros destinos.',recapTexto:'S-IC, S-II e S-IVB trabalham em sequência. A unidade de instrumentos orienta o lançador, e os adaptadores ligam e protegem suas partes. Eagle pousa e seu estágio de subida reencontra Columbia; o módulo de serviço sustenta a viagem. Só Columbia retorna intacta à Terra. Estas vistas são didáticas, não uma reprodução exata do voo.',fonte:'Fontes: NASA — Saturn V e Apollo 11'},
 en:{titulo:'Apollo 11 and Saturn V: to the Moon and back',objetivo:'The adventure begins on Earth',objetivoTexto:'Follow the mission and discover each component’s job. Watch Earth at 1 hour/s; you can change the pace in the bottom bar. Parts views are educational and do not simulate the flight at real scale.',modeloTitulo:'Component for this step',modeloAjuda:'NASA base geometry · Adapted recovery capsule, artistic scenery, parachutes and motion. Drag · pinch.',modeloErro:'3D view unavailable. Open the part information to continue.',retornoTerra:'Back to our planet',retornoTexto:'After reentry, Columbia parachutes into the ocean with all three astronauts. Watch Earth again at 1 hour/s or adjust the speed. Only the capsule returns intact; the rocket stages and lunar module have different destinations.',recapTexto:'S-IC, S-II and S-IVB work in sequence. The instrument unit guides the launcher; adapters connect and protect its parts. Eagle lands and its ascent stage meets Columbia; the service module supports the journey. Only Columbia returns intact to Earth. These are educational views, not an exact flight reconstruction.',fonte:'Sources: NASA — Saturn V and Apollo 11'},
 es:{titulo:'Apollo 11 y Saturno V: a la Luna y de regreso',objetivo:'La aventura comienza en la Tierra',objetivoTexto:'Sigue la misión y descubre el trabajo de cada componente. Observa la Tierra a 1 hora/s; puedes cambiar el ritmo en la barra inferior. Las vistas son didácticas y no simulan el vuelo a escala real.',modeloTitulo:'Componente de esta etapa',modeloAjuda:'Geometría base NASA · Cápsula de recuperación adaptada, escenarios, paracaídas y movimientos artísticos. Arrastra · pellizca.',modeloErro:'Vista 3D no disponible. Abre la ficha de la pieza para continuar.',retornoTerra:'De vuelta a nuestro planeta',retornoTexto:'Tras la reentrada, Columbia desciende con paracaídas al océano con los tres astronautas. Observa otra vez la Tierra a 1 hora/s o ajusta la velocidad. Solo la cápsula regresa intacta; las etapas y el módulo lunar tienen otros destinos.',recapTexto:'S-IC, S-II y S-IVB trabajan en secuencia. La unidad de instrumentos guía el lanzador; los adaptadores conectan y protegen sus partes. Eagle aluniza y su etapa de ascenso se reúne con Columbia; el módulo de servicio sostiene el viaje. Solo Columbia regresa intacta a la Tierra. Son vistas didácticas, no una reconstrucción exacta del vuelo.',fonte:'Fuentes: NASA — Saturn V y Apollo 11'}
};
for(const lang of ['pt','en','es']){Object.assign(saturno.textos[lang],novos[lang]);saturno.pecas.forEach((p,i)=>saturno.textos[lang][p.rotulo]=nomes[lang][i]);}
saturno.urlFonte='https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/';
saturno.etapas=[{titulo:'objetivo',corpo:'objetivoTexto',astro:'terra',pecas:[{id:'sic'}],apolloPhase:'launch',scenario:'sky'},...ETAPAS_APOLLO.map(e=>({...e,astro:undefined,acao:true,pecas:e.pecas.map(id=>({id}))})),{titulo:'retornoTerra',corpo:'retornoTexto',astro:'terra'},{titulo:'pergunta',corpo:'perguntaTexto',pergunta:true},{titulo:'recap',corpo:'recapTexto',recap:true}];

const discovery=ROTEIROS_COMPLETOS['discovery-carga'];
discovery.versao=2;
discovery.pecas=['orbiter','tank','srb-left','srb-right','engines','door-left','door-right','arm','hubble'].map(id=>({id,rotulo:`peca_${id}`}));
const nomesDiscovery={pt:['Discovery · orbitador','Tanque externo','Propulsor esquerdo','Propulsor direito','Motores principais','Porta esquerda','Porta direita','Canadarm','Hubble · carga'],en:['Discovery · orbiter','External tank','Left booster','Right booster','Main engines','Left bay door','Right bay door','Canadarm','Hubble · payload'],es:['Discovery · orbitador','Tanque externo','Propulsor izquierdo','Propulsor derecho','Motores principales','Compuerta izquierda','Compuerta derecha','Canadarm','Hubble · carga']};
const textosDiscovery={
 pt:{titulo:'Discovery STS-31: levando o Hubble ao espaço',objetivo:'Um observatório sai da Terra',objetivoTexto:'Acompanhe a missão do lançamento ao deploy do Hubble e ao retorno do Discovery. A Terra começa em 1 hora/s; ajuste o ritmo na barra inferior. Os componentes aparecerão ao lado da história.',modeloTitulo:'Componentes da missão STS-31',modeloAjuda:'Arraste para girar · pinça para aproximar. Geometria NASA; carga e movimentos didáticos.',modeloErro:'Vista 3D indisponível. Abra as fichas das peças para continuar.',retornoTerra:'Missão entregue, tripulação em casa',retornoTexto:'Discovery retorna com sua tripulação, enquanto o Hubble fica em órbita. Veja a Terra a 1 hora/s ou escolha outro ritmo na barra. Os motores principais, o braço e as portas voltam com o orbitador; o tanque externo é destruído na reentrada.',recapTexto:'Os propulsores sólidos e os motores principais impulsionam a partida. O tanque alimenta os motores e depois é descartado. Em órbita, portas e radiadores dão acesso à carga e ajudam a controlar o calor. Canadarm ergue e libera o Hubble após as verificações. Discovery volta à Terra e pousa planando; Hubble continua em órbita. As vistas e a animação são didáticas.',fonte:'Fontes: NASA — STS-31 e Hubble; Agência Espacial Canadense — Canadarm'},
 en:{titulo:'Discovery STS-31: taking Hubble to space',objetivo:'An observatory leaves Earth',objetivoTexto:'Follow the mission from launch to Hubble deployment and Discovery’s return. Earth starts at 1 hour/s; adjust the pace in the bottom bar. Components appear alongside the story.',modeloTitulo:'STS-31 mission components',modeloAjuda:'Drag to orbit · pinch to zoom. NASA geometry; educational payload and motion.',modeloErro:'3D view unavailable. Open the part information to continue.',retornoTerra:'Payload delivered, crew home',retornoTexto:'Discovery returns with its crew while Hubble stays in orbit. Watch Earth at 1 hour/s or choose another pace. The main engines, arm and doors return with the orbiter; the external tank breaks up during reentry.',recapTexto:'Solid boosters and main engines power liftoff. The tank feeds the engines and is later jettisoned. In orbit, doors and radiators provide access to the payload and help manage heat. Canadarm lifts and releases Hubble after checks. Discovery returns and glides to a runway landing; Hubble stays in orbit. Views and animation are educational.',fonte:'Sources: NASA — STS-31 and Hubble; Canadian Space Agency — Canadarm'},
 es:{titulo:'Discovery STS-31: llevando el Hubble al espacio',objetivo:'Un observatorio sale de la Tierra',objetivoTexto:'Sigue la misión desde el lanzamiento hasta el despliegue del Hubble y el regreso del Discovery. La Tierra comienza a 1 hora/s; ajusta el ritmo en la barra inferior. Los componentes aparecen junto a la historia.',modeloTitulo:'Componentes de la misión STS-31',modeloAjuda:'Arrastra para girar · pellizca para acercar. Geometría NASA; carga y movimientos didácticos.',modeloErro:'Vista 3D no disponible. Abre las fichas de las piezas para continuar.',retornoTerra:'Carga entregada, tripulación en casa',retornoTexto:'Discovery regresa con su tripulación mientras el Hubble queda en órbita. Observa la Tierra a 1 hora/s o elige otro ritmo. Los motores principales, el brazo y las compuertas vuelven con el orbitador; el tanque externo se desintegra en la reentrada.',recapTexto:'Los propulsores sólidos y los motores principales impulsan el despegue. El tanque alimenta los motores y después se desecha. En órbita, las compuertas y radiadores dan acceso a la carga y ayudan a controlar el calor. Canadarm eleva y libera el Hubble tras las verificaciones. Discovery vuelve y aterriza planeando; Hubble sigue en órbita. Las vistas y la animación son didácticas.',fonte:'Fuentes: NASA — STS-31 y Hubble; Agencia Espacial Canadiense — Canadarm'}
};
for(const lang of ['pt','en','es']){Object.assign(discovery.textos[lang],textosDiscovery[lang]);discovery.pecas.forEach((p,i)=>discovery.textos[lang][p.rotulo]=nomesDiscovery[lang][i]);}
discovery.etapas=[{titulo:'objetivo',corpo:'objetivoTexto',astro:'terra'},...ETAPAS_DISCOVERY.map((e,i)=>({...e,acao:true,deploy:i===6,pecas:e.pecas.map(id=>({id}))})),{titulo:'retornoTerra',corpo:'retornoTexto',astro:'terra'},{titulo:'pergunta',corpo:'perguntaTexto',pergunta:true},{titulo:'recap',corpo:'recapTexto',recap:true}];
discovery.fontesAdicionais=[{url:'https://www.nasa.gov/mission/sts-31/',nome:'NASA · STS-31'},{url:'https://www.asc-csa.gc.ca/eng/canadarm/about.asp',nome:'CSA · Canadarm'}];

ROTEIROS_COMPLETOS['lunar-pouso']=ROTEIRO_LUNAR;
saturno.continuacao='lunar-pouso';
const conviteLunar={pt:'Explorar a descida e subida do Eagle · Pro',en:'Explore Eagle’s descent and ascent · Pro',es:'Explorar el descenso y ascenso de Eagle · Pro'};
for(const lang of ['pt','en','es'])saturno.textos[lang].continuacaoTitulo=conviteLunar[lang];

ROTEIROS_COMPLETOS['perseverance-pouso']=ROTEIRO_PERSEVERANCE;
ROTEIROS_COMPLETOS.marte.continuacao='perseverance-pouso';
const convitePerseverance={pt:'Acompanhar a chegada do Perseverance · Pro',en:'Follow Perseverance’s landing · Pro',es:'Seguir la llegada de Perseverance · Pro'};
for(const lang of ['pt','en','es'])ROTEIROS_COMPLETOS.marte.textos[lang].continuacaoTitulo=convitePerseverance[lang];

ROTEIROS_COMPLETOS['ingenuity-voo']=ROTEIRO_INGENUITY;
ROTEIROS_COMPLETOS['perseverance-pouso'].continuacao='ingenuity-voo';
for(const [lang,title]of Object.entries({pt:'Aprender: primeiro voo do Ingenuity · Pro (opcional)',en:'Learn: Ingenuity’s first flight · Pro (optional)',es:'Aprender: primer vuelo de Ingenuity · Pro (opcional)'}))ROTEIROS_COMPLETOS['perseverance-pouso'].textos[lang].continuacaoTitulo=title;

ROTEIROS_COMPLETOS['huygens-tita']=ROTEIRO_HUYGENS;

ROTEIROS_COMPLETOS['cassini-finale']=ROTEIRO_CASSINI_FINALE;

ROTEIROS_COMPLETOS['webb-desdobramento']=ROTEIRO_WEBB;

// O catálogo publicado é uma projeção: as definições originais permanecem intactas.
export const ROTEIROS = Object.fromEntries(
 Object.entries(ROTEIROS_COMPLETOS).filter(([id])=>roteiroDisponivel(id)).map(([id, original])=>{
  const roteiro={...original};
  if(id==='lua-fases'){roteiro.pro=false;delete roteiro.recurso;}
  if(roteiro.continuacao&&!roteiroDisponivel(roteiro.continuacao)) delete roteiro.continuacao;
  if(roteiro.investigacao&&!roteiroDisponivel(roteiro.investigacao)) delete roteiro.investigacao;
  if(roteiro.relacionado&&!naveDisponivel(roteiro.relacionado)) delete roteiro.relacionado;
  if(roteiro.aprofundamentos) roteiro.aprofundamentos=roteiro.aprofundamentos.filter(item=>naveDisponivel(item.id));
  return [id,roteiro];
 })
);
