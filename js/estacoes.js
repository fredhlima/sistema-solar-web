// Modo "Estações do Ano" — Fase 1 da SPEC-estacoes-e-mares.md.
//
// A pergunta que este modo responde é a que quase todo mundo sai da escola
// errando: por que existe verão e inverno. A resposta não é a distância ao
// Sol; é o ângulo com que a luz bate. Por isso a tela mostra, ao mesmo tempo,
// o eixo apontando sempre para o mesmo lado do espaço, a luz espalhando-se em
// mais ou menos chão, e os dois hemisférios vivendo estações opostas.
//
// Rigor deliberado (SPEC §4.2): a órbita é desenhada com a excentricidade
// VERDADEIRA (0,0167), que a olho nu é um círculo. É a elipse achatada dos
// livros didáticos que cria o mito da distância — reproduzi-la e desmenti-la
// por escrito seria ensinar o erro e corrigi-lo com legenda.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getIdioma } from './i18n.js?v=30';
import { criarPalco, aplicarTexturaReal, areaSegura, distanciaParaEnquadrar } from './palco.js?v=20';
import { criarTexturaCanvas } from './texturas.js?v=7';
import {
  diasDesdeJ2000, longitudeSolar, distanciaSolarUA, declinacaoSolar,
  duracaoDoDia, espalhamentoDaLuz, estacaoDoHemisferio, MARCOS, OBLIQUIDADE_TERRA,
} from './estacoes-calc.js?v=2';

const RAD = Math.PI / 180;
const UA_KM = 149.6e6;
const ANO_DIAS = 365.2422;

// Geometria do palco (unidades de cena, fora de escala por projeto)
//
// As proporções aqui são um compromisso declarado, não um descuido. Na
// realidade o Sol tem 109 raios da Terra e a órbita tem 23.481 — desenhar
// qualquer um dos dois de verdade apaga o outro da tela. O que se escolhe é
// QUANTO de cada erro se aceita.
//
// Rodada de 06/09/2026, a pedido do Fred ("mais distante e o Sol maior, para
// dar noção de proporção"): órbita de 10 para 13 e Sol de 3,4 para 4,3. Isso
// leva Sol:Terra de 2,1 para 2,7 e órbita:Terra de 6,3 para 8,1, ao custo de a
// Terra ficar com 77% do tamanho que tinha na tela — o teto é a legibilidade
// do eixo inclinado e do terminador, que são o assunto do modo. Os números
// reais aparecem no painel "Saiba mais", no tópico da escala.
const RAIO_ORBITA = 13;
// O Sol precisa ser claramente o corpo grande — mas há um teto GEOMÉTRICO que
// não tem a ver com estética: a câmera é inclinada, então a órbita projeta uma
// elipse de semi-eixo menor `RAIO_ORBITA · sen(elevação)`. Se o raio do Sol
// passa disso, a metade distante da órbita inteira fica ATRÁS dele e o planeta
// — o sujeito do modo — desaparece por meio ano.
// Com 5,5 e a câmera a 30° isso acontecia: menor = 4,99 contra 5,5 do Sol.
// Com 4,3, órbita 13 e a câmera a 48°, a folga é de 3,3 unidades até para
// Júpiter, o maior do seletor (semi-menor 11,1 contra 4,3 + 3,53 = 7,83).
const RAIO_SOL = 4.3;
const RAIO_TERRA = 1.6;

/**
 * Geometria do palco, exposta para os testes. Sem isto o teste acha cada corpo
 * pelo raio literal e todo ajuste didático de proporção reprova teste que não
 * tem defeito nenhum — foi o que aconteceu ao mexer no tamanho do Sol.
 */
export const GEOMETRIA = { RAIO_ORBITA, RAIO_SOL, RAIO_TERRA };

// Selo do módulo no cabeçalho: a luz do Sol chegando num planeta de eixo
// inclinado — a causa das estações num desenho só. As duas tentativas
// anteriores falharam em 20px: o eixo atravessando o disco lia como o símbolo
// de "proibido", e a órbita com o Sol no meio virava um olho.
const ICONE = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">'
  + '<circle cx="13" cy="12.5" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/>'
  + '<path d="M15.2 7.2 16.3 4.6M10.8 17.8 9.7 20.4" stroke="currentColor"'
  + ' stroke-width="1.6" stroke-linecap="round"/>'
  + '<path d="M2.4 9.5h3.2M2.4 12.5h3.2M2.4 15.5h3.2" stroke="currentColor"'
  + ' stroke-width="1.5" stroke-linecap="round" opacity=".75"/></svg>';

const TEXTOS = {
  pt: {
    titulo: 'Estações do Ano',
    subtitulo: 'Por que existe verão e inverno',
    norte: 'Hemisfério Norte',
    sul: 'Hemisfério Sul',
    primavera: 'Primavera', verao: 'Verão', outono: 'Outono', inverno: 'Inverno',
    latitude: 'Latitude',
    diaNoiteTitulo: 'Onde o Sol não se põe',
    faixaDeLuzAlt: 'Horas de luz por latitude. No polo norte {n} h, no equador {e} h, no polo sul {s} h.',
    solDaMeiaNoiteNorte: 'No Polo Norte o Sol não se põe. No Polo Sul, a noite não termina.',
    solDaMeiaNoiteSul: 'No Polo Sul o Sol não se põe. No Polo Norte, a noite não termina.',
    diaNoiteEquinocio: 'Perto dos equinócios, o dia e a noite duram quase o mesmo em toda parte.',
    verUmDia: 'Ver um dia',
    pararDia: 'Parar o dia',
    relogioDia: '{h} — {estado}',
    estaDeDia: 'de dia a {lat}',
    estaDeNoite: 'de noite a {lat}',
    luzTitulo: 'A luz que chega aí',
    rotuloAngulo: 'ângulo da luz',
    rotuloFaixa: 'luz por latitude',
    luzNota: 'A mesma luz espalhada por {n}× mais área aquece {n}× menos cada ponto.',
    luzPino: 'Sol a pino: máximo de energia por área.',
    luzSemSol: 'Hoje o Sol não nasce nesta latitude.',
    raioSolarAlt: 'Sol a {z} graus do zênite: a mesma luz se espalha por {e} vezes mais chão.',
    raioSolarAltNoite: 'O Sol não chega a nascer nesta latitude, nesta data.',
    distPerielio: 'Mais perto do Sol — e é verão no Brasil.',
    distAfelio: 'Mais longe do Sol — e é inverno no Brasil.',
    ondeTitulo: 'Onde você está',
    norteCurto: 'Norte',
    sulCurto: 'Sul',
    proximoMarcoAmanha: 'Próximo marco: {m}, amanhã.',
    linhaHemisferio: '{h}: {est} · {n} h de dia claro',
    eixoLinha: 'Eixo inclinado {o}°',
    distLinha: 'Sol a {d} milhões de km',
    saibaMais: 'Por que existe verão?',
    saibaMenos: 'Ocultar a explicação',
    topicoInclinacao: 'É a inclinação, não a distância',
    inclinacaoLongo: 'O eixo da Terra é inclinado {o}° e aponta sempre para o mesmo ponto do céu. Meio ano ele está voltado para o Sol, meio ano para o lado contrário. Quem está inclinado na direção do Sol recebe a luz de cima, concentrada; quem está do outro lado recebe a mesma luz espalhada por mais chão — e esquenta menos. Nada disso tem a ver com estar mais perto ou mais longe.',
    topicoPolos: 'Onde o Sol não se põe',
    polosLongo: 'Acima de 66,5° de latitude — os círculos polares — há dias em que o Sol não chega a se pôr, e outros em que não chega a nascer. É a inclinação do eixo levando um polo inteiro para dentro da luz e o outro para dentro da sombra.',
    topicoDistancia: 'A Terra chega a ficar mais perto?',
    topicoEscala: 'Esta tela não está em escala',
    escalaLongo: 'Aqui o Sol tem {s}× o raio da Terra e a órbita tem {o} raios — no céu de verdade são 109× e 23 mil. Não é descuido: desenhar a distância certa deixaria a Terra menor que um ponto, e desenhar o Sol no tamanho certo não deixaria caber mais nada. O que dá para escolher é quanto de cada erro se aceita, e o selo lá em cima avisa que existe um.',
    distanciaLongo: 'Chega, e o efeito é o contrário do que parece. Em 4 de janeiro a Terra está a {min} milhões de km do Sol; em 5 de julho, a {max}. São {dif} milhões de km de diferença — {pct}% — e {ene}% a mais de energia chegando em janeiro. Só que janeiro é VERÃO no hemisfério sul e INVERNO no norte, ao mesmo tempo. Se fosse a distância que manda, o ano inteiro seria igual nos dois lados.',
    distanciaBarras: 'Em cima, só o trecho entre a menor e a maior distância. Embaixo, o mesmo trecho na escala que começa do zero — os 5 milhões somem dentro dos 150.',
    rotuloJaneiro: 'jan',
    rotuloJulho: 'jul',
    rotuloHoje: 'hoje',
    proximoMarco: 'Próximo marco: {m}, em {d} dias.',
    proximoMarcoHoje: 'Próximo marco: {m} — é hoje.',
    marcoEquinocioMarco: 'equinócio de março',
    marcoSolsticioJunho: 'solstício de junho',
    marcoEquinocioSetembro: 'equinócio de setembro',
    marcoSolsticioDezembro: 'solstício de dezembro',
    anuncioEstado: 'Norte: {n}. Sul: {s}. Dia claro: {h} horas.',
    outroCorpo: 'Em outros planetas',
    passo1: 'A Terra gira inclinada. Seu eixo forma um ângulo de {obl} graus.',
    passo2: 'Essa inclinação não muda. Ao longo de toda a órbita, o eixo continua apontando para o mesmo ponto do céu.',
    passo3: 'Quando um hemisfério se inclina na direção do Sol, a luz chega de cima e aquece mais. Quando se inclina para o lado oposto, a luz chega inclinada e se espalha por mais área, aquecendo menos. É isso que produz o verão e o inverno.',
    passo4: 'Os dois hemisférios têm sempre estações opostas: quando é verão aqui, é inverno do outro lado.',
    passo5: 'E a distância? Em janeiro a Terra está mais perto do Sol, e é verão no Brasil. A distância não explica as estações.',
  },
  en: {
    titulo: 'Seasons of the Year',
    subtitulo: 'Why summer and winter exist',
    norte: 'Northern Hemisphere',
    sul: 'Southern Hemisphere',
    primavera: 'Spring', verao: 'Summer', outono: 'Autumn', inverno: 'Winter',
    latitude: 'Latitude',
    diaNoiteTitulo: 'Where the Sun never sets',
    faixaDeLuzAlt: 'Hours of daylight by latitude. North Pole {n} h, Equator {e} h, South Pole {s} h.',
    solDaMeiaNoiteNorte: 'At the North Pole the Sun never sets. At the South Pole, night never ends.',
    solDaMeiaNoiteSul: 'At the South Pole the Sun never sets. At the North Pole, night never ends.',
    diaNoiteEquinocio: 'Near the equinoxes, day and night last almost the same everywhere.',
    verUmDia: 'See one day',
    pararDia: 'Stop the day',
    relogioDia: '{h} — {estado}',
    estaDeDia: 'daytime at {lat}',
    estaDeNoite: 'nighttime at {lat}',
    luzTitulo: 'The light that reaches you',
    rotuloAngulo: 'angle of light',
    rotuloFaixa: 'light by latitude',
    luzNota: 'The same light spread over {n}× more area warms each point {n}× less.',
    luzPino: 'Sun overhead: maximum energy per area.',
    luzSemSol: 'Today the Sun does not rise at this latitude.',
    raioSolarAlt: 'Sun {z} degrees from the zenith: the same light spreads over {e} times more ground.',
    raioSolarAltNoite: 'The Sun does not rise at this latitude on this date.',
    distPerielio: 'Closer to the Sun — and it is summer in the southern hemisphere.',
    distAfelio: 'Farther from the Sun — and it is winter in the southern hemisphere.',
    ondeTitulo: 'Where you are',
    norteCurto: 'North',
    sulCurto: 'South',
    proximoMarcoAmanha: 'Next milestone: {m}, tomorrow.',
    linhaHemisferio: '{h}: {est} · {n} h of daylight',
    eixoLinha: 'Axis tilted {o}°',
    distLinha: 'Sun {d} million km away',
    saibaMais: 'Why is there summer?',
    saibaMenos: 'Hide the explanation',
    topicoInclinacao: 'It is the tilt, not the distance',
    inclinacaoLongo: 'The Earth’s axis is tilted {o}° and always points at the same spot in the sky. For half the year it leans towards the Sun, for the other half away from it. Whoever leans towards the Sun gets the light from above, concentrated; the other side gets the same light spread over more ground — and warms up less. None of this has to do with being closer or farther.',
    topicoPolos: 'Where the Sun never sets',
    polosLongo: 'Above 66.5° of latitude — the polar circles — there are days when the Sun never sets, and others when it never rises. It is the tilt of the axis carrying one whole pole into the light and the other into the shadow.',
    topicoDistancia: 'Does the Earth really get closer?',
    topicoEscala: 'This screen is not to scale',
    escalaLongo: 'Here the Sun is {s}× the Earth’s radius and the orbit is {o} radii — in the real sky it is 109× and 23 thousand. This is not carelessness: drawing the true distance would make the Earth smaller than a dot, and drawing the Sun at true size would leave room for nothing else. What you can choose is how much of each error to accept — and the badge above says one exists.',
    distanciaLongo: 'It does, and the effect is the opposite of what it seems. On 4 January the Earth is {min} million km from the Sun; on 5 July, {max}. That is {dif} million km of difference — {pct}% — and {ene}% more energy arriving in January. Except that January is SUMMER in the southern hemisphere and WINTER in the northern one, at the same time. If distance were in charge, the whole year would be the same on both sides.',
    distanciaBarras: 'On top, only the stretch between the closest and the farthest distance. Below, the same stretch on a scale that starts at zero — the 5 million vanish inside the 150.',
    rotuloJaneiro: 'Jan',
    rotuloJulho: 'Jul',
    rotuloHoje: 'today',
    proximoMarco: 'Next milestone: {m}, in {d} days.',
    proximoMarcoHoje: 'Next milestone: {m} — it is today.',
    marcoEquinocioMarco: 'March equinox',
    marcoSolsticioJunho: 'June solstice',
    marcoEquinocioSetembro: 'September equinox',
    marcoSolsticioDezembro: 'December solstice',
    anuncioEstado: 'North: {n}. South: {s}. Daylight: {h} hours.',
    outroCorpo: 'On other planets',
    passo1: 'Earth spins tilted. Its axis forms an angle of {obl} degrees.',
    passo2: 'This tilt does not change. Along the entire orbit, the axis keeps pointing at the same spot in the sky.',
    passo3: 'When a hemisphere tilts toward the Sun, light arrives from above and warms more. When it tilts away, light arrives slanted and spreads over more area, warming less. That is what produces summer and winter.',
    passo4: 'The two hemispheres always have opposite seasons: when it is summer here, it is winter on the other side.',
    passo5: 'And distance? In January Earth is closer to the Sun, and it is summer in the southern hemisphere. Distance does not explain the seasons.',
  },
  es: {
    titulo: 'Estaciones del Año',
    subtitulo: 'Por qué existen el verano y el invierno',
    norte: 'Hemisferio Norte',
    sul: 'Hemisferio Sur',
    primavera: 'Primavera', verao: 'Verano', outono: 'Otoño', inverno: 'Invierno',
    latitude: 'Latitud',
    diaNoiteTitulo: 'Donde el Sol no se pone',
    faixaDeLuzAlt: 'Horas de luz por latitud. Polo norte {n} h, Ecuador {e} h, Polo sur {s} h.',
    solDaMeiaNoiteNorte: 'En el Polo Norte el Sol no se pone. En el Polo Sur, la noche no termina.',
    solDaMeiaNoiteSul: 'En el Polo Sur el Sol no se pone. En el Polo Norte, la noche no termina.',
    diaNoiteEquinocio: 'Cerca de los equinoccios, el día y la noche duran casi lo mismo en todas partes.',
    verUmDia: 'Ver un día',
    pararDia: 'Parar el día',
    relogioDia: '{h} — {estado}',
    estaDeDia: 'de día a {lat}',
    estaDeNoite: 'de noche a {lat}',
    luzTitulo: 'La luz que llega ahí',
    rotuloAngulo: 'ángulo de la luz',
    rotuloFaixa: 'luz por latitud',
    luzNota: 'La misma luz repartida en {n}× más área calienta {n}× menos cada punto.',
    luzPino: 'Sol en lo alto: máxima energía por área.',
    luzSemSol: 'Hoy el Sol no sale en esta latitud.',
    raioSolarAlt: 'Sol a {z} grados del cenit: la misma luz se reparte por {e} veces más suelo.',
    raioSolarAltNoite: 'El Sol no llega a salir en esta latitud, en esta fecha.',
    distPerielio: 'Más cerca del Sol — y es verano en el hemisferio sur.',
    distAfelio: 'Más lejos del Sol — y es invierno en el hemisferio sur.',
    ondeTitulo: 'Dónde estás',
    norteCurto: 'Norte',
    sulCurto: 'Sur',
    proximoMarcoAmanha: 'Próximo hito: {m}, mañana.',
    linhaHemisferio: '{h}: {est} · {n} h de luz',
    eixoLinha: 'Eje inclinado {o}°',
    distLinha: 'Sol a {d} millones de km',
    saibaMais: '¿Por qué existe el verano?',
    saibaMenos: 'Ocultar la explicación',
    topicoInclinacao: 'Es la inclinación, no la distancia',
    inclinacaoLongo: 'El eje de la Tierra está inclinado {o}° y apunta siempre al mismo punto del cielo. Medio año está vuelto hacia el Sol, medio año hacia el lado contrario. Quien se inclina hacia el Sol recibe la luz desde arriba, concentrada; el otro lado recibe la misma luz repartida por más suelo — y se calienta menos. Nada de esto tiene que ver con estar más cerca o más lejos.',
    topicoPolos: 'Donde el Sol no se pone',
    polosLongo: 'Por encima de los 66,5° de latitud — los círculos polares — hay días en que el Sol no llega a ponerse, y otros en que no llega a salir. Es la inclinación del eje llevando un polo entero hacia la luz y el otro hacia la sombra.',
    topicoDistancia: '¿La Tierra llega a estar más cerca?',
    topicoEscala: 'Esta pantalla no está a escala',
    escalaLongo: 'Aquí el Sol tiene {s}× el radio de la Tierra y la órbita tiene {o} radios — en el cielo real son 109× y 23 mil. No es descuido: dibujar la distancia verdadera dejaría a la Tierra más pequeña que un punto, y dibujar el Sol a tamaño real no dejaría espacio para nada más. Lo que se puede elegir es cuánto de cada error se acepta, y el sello de arriba avisa que existe uno.',
    distanciaLongo: 'Sí, y el efecto es lo contrario de lo que parece. El 4 de enero la Tierra está a {min} millones de km del Sol; el 5 de julio, a {max}. Son {dif} millones de km de diferencia — {pct}% — y {ene}% más de energía llegando en enero. Solo que enero es VERANO en el hemisferio sur e INVIERNO en el norte, al mismo tiempo. Si mandara la distancia, el año entero sería igual en los dos lados.',
    distanciaBarras: 'Arriba, solo el tramo entre la menor y la mayor distancia. Abajo, el mismo tramo en la escala que empieza en cero — los 5 millones desaparecen dentro de los 150.',
    rotuloJaneiro: 'ene',
    rotuloJulho: 'jul',
    rotuloHoje: 'hoy',
    proximoMarco: 'Próximo hito: {m}, en {d} días.',
    proximoMarcoHoje: 'Próximo hito: {m} — es hoy.',
    marcoEquinocioMarco: 'equinoccio de marzo',
    marcoSolsticioJunho: 'solsticio de junio',
    marcoEquinocioSetembro: 'equinoccio de septiembre',
    marcoSolsticioDezembro: 'solsticio de diciembre',
    anuncioEstado: 'Norte: {n}. Sur: {s}. Luz del día: {h} horas.',
    outroCorpo: 'En otros planetas',
    passo1: 'La Tierra gira inclinada. Su eje forma un ángulo de {obl} grados.',
    passo2: 'Esa inclinación no cambia. A lo largo de toda la órbita, el eje sigue apuntando al mismo punto del cielo.',
    passo3: 'Cuando un hemisferio se inclina hacia el Sol, la luz llega desde arriba y calienta más. Cuando se inclina al lado opuesto, la luz llega inclinada y se reparte en más área, calentando menos. Eso es lo que produce el verano y el invierno.',
    passo4: 'Los dos hemisferios tienen siempre estaciones opuestas: cuando aquí es verano, al otro lado es invierno.',
    passo5: '¿Y la distancia? En enero la Tierra está más cerca del Sol, y es verano en el hemisferio sur. La distancia no explica las estaciones.',
  },
};

function te(chave) {
  const i = getIdioma();
  return (TEXTOS[i] && TEXTOS[i][chave]) || TEXTOS.pt[chave] || chave;
}

// Português e espanhol usam vírgula decimal; inglês, ponto. toFixed sempre
// devolve ponto, então o número precisa passar por aqui antes de ir à tela.
function num(valor, casas) {
  const texto = valor.toFixed(casas);
  return getIdioma() === 'en' ? texto : texto.replace('.', ',');
}

// Raio de cena de um corpo. A proporção real com o Sol (109×) não cabe em
// tela — a Terra viraria um pixel. A compressão por expoente 1/3 preserva a
// ORDEM (Júpiter > Netuno > Terra > Marte > Mercúrio) e a sensação de
// grandeza, sem fazer os pequenos sumirem. É exagero declarado, como o resto
// do palco: o selo "fora de escala" e o "ver em escala real" continuam lá.
function raioDeCena(corpo) {
  const razao = (corpo.raioKm || 6371) / 6371;
  return RAIO_TERRA * Math.pow(razao, 1 / 3);
}

// Direção de uma longitude eclíptica no plano da cena (Y = norte eclíptico).
function direcaoLongitude(lambdaGraus) {
  const a = lambdaGraus * RAD;
  return new THREE.Vector3(Math.cos(a), 0, -Math.sin(a));
}

export function iniciarEstacoes({ motor, dados, premium, aoProgresso }) {
  // DADOS é { corpos: [...] }, não um array — mesmo acesso de voce-no-espaco.js
  const corpos = (dados && dados.corpos) || [];
  const corpoTerra = corpos.find((c) => c.id === 'terra') || { id: 'terra', nome: 'Terra' };

  // Corpos oferecidos no extra "e nos outros planetas?" (SPEC §4.5). A
  // obliquidade vem de dados.js — nenhum dado novo entra por aqui.
  // Agora com os 8 planetas em ordem: mercurio, venus, terra, marte, jupiter, saturno, urano, netuno

  function construirCena(ctx) {
    const descartaveis = [];
    const reg = (x) => { descartaveis.push(x); return x; };

    let corpoAtual = corpoTerra;
    // A obliquidade vem de dados.js, a mesma que o motor usa — não de uma
    // constante local. Duas fontes de verdade para o mesmo número acabam
    // divergindo, e aqui ele aparece na tela.
    let obliquidade = corpoTerra.inclinacaoEixoGraus || OBLIQUIDADE_TERRA;
    let fatorCorpo = 1;                       // fator de escala do corpo (compressão por raiz cúbica)
    let latitude = -23;                       // default: Brasil (SPEC §4.3b)
    let dias = diasDesdeJ2000(ctx.dataInicial);
    let modoDia = false;                      // se o modo "Ver um dia" está ativo
    let anguloDia = 0;                        // ângulo de rotação diária em radianos
    let marcoProx = MARCOS[0];                // valor padrão
    let distDoMarco = 0;                      // distância em graus
    const marcosVistos = new Set();
    // A Terra é o sujeito do modo, não o Sol, e a câmera fica SEMPRE centrada
    // nela — não há mais o modo "solto", com o alvo na origem.
    //
    // Existia um alternador: tocar na Terra prendia a câmera, tocar no vazio
    // soltava. No celular ele virava um defeito. O `pointerdown` que abre uma
    // pinça de zoom quase nunca acerta o disco da Terra, que é pequeno, então
    // o gesto de dar zoom desprendia a câmera sem que ninguém pedisse: a cena
    // deslizava sozinha para recentrar no Sol no meio da pinça. Era o "fica
    // pulando de maneira involuntária" que o Fred descreveu.

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
    // Elevação de ~48°, não os ~30° de antes: quanto mais rasante a câmera, mais
// achatada a elipse da órbita e mais cedo o planeta some atrás do Sol. Ver a
// conta no comentário de RAIO_SOL.
    camera.position.set(0, 28, 25);

    const controls = new OrbitControls(camera, motor.canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 4;
    // 140, não 90: o enquadramento inicial já pede 67 num celular em paisagem
    // depois que a órbita cresceu para 13. Com o teto em 90 o OrbitControls
    // cortaria o afastamento pedido em telas mais estreitas e a cena entraria
    // com o Sol pela metade.
    controls.maxDistance = 140;
    // Sem arrastar o alvo: o pan tiraria a Terra do centro e o laço a puxaria
    // de volta no quadro seguinte — a câmera brigando com o dedo. Girar e dar
    // zoom continuam livres. Mesma decisão do modo Marés.
    controls.enablePan = false;

    // Enquadrar a órbita + corpo na faixa livre: se esse círculo cabe,
    // nenhum corpo pode cair sob o HUD em nenhum ponto do ano (SPEC §6.2).
    // RAIO_DA_CENA agora é dinâmico: depende do tamanho do corpo atual.
    /**
     * Raio da órbita do corpo atual. Não é fixo: um corpo maior precisa de
     * órbita mais larga para não passar POR TRÁS do Sol na metade distante.
     * A conta é a mesma do teto do Sol — a órbita projeta uma elipse de
     * semi-eixo menor `raio · sen(elevação)`, e o planeta some quando esse
     * valor fica abaixo de `RAIO_SOL + raio do planeta`. Júpiter, o maior do
     * seletor, é quem manda no ajuste; a Terra fica exatamente onde estava.
     */
    const orbitaDoCorpo = () => RAIO_ORBITA + raioDeCena(corpoAtual) - RAIO_TERRA;
    // Com a câmera centrada na Terra, o círculo que precisa caber não é a
    // órbita: é a distância até o Sol mais o disco dele, porque o Sol passa a
    // ser o objeto mais distante do centro da tela.
    const raioDaCena = () => orbitaDoCorpo() + RAIO_SOL;
    function enquadrar() {
      const overlay = document.getElementById('palco-estacoes');
      if (!overlay || overlay.hidden) return;
      const area = areaSegura(overlay);
      // A posição vem do CÁLCULO, não de `grupoTerra.position`: no primeiro
      // enquadramento o laço ainda não rodou e o grupo está na origem, o que
      // dava uma distância diferente durante o roteiro guiado e um salto
      // quando ele terminava.
      const centro = posicaoDaTerra(dias).pos;
      const dist = distanciaParaEnquadrar(camera, raioDaCena(), area, 32, centro);
      const dir = camera.position.clone().sub(centro).normalize();
      camera.position.copy(centro).addScaledVector(dir, dist);
      camera.updateProjectionMatrix();
      // Sem isto o alvo começa na origem e o lerp leva ~1 s para chegar na
      // Terra: a primeira coisa que a pessoa vê é a cena deslizando.
      controls.target.copy(grupoTerra.position);
      controls.update();
    }

    // ————— estrelas de fundo —————
    const posEstrelas = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(150 + Math.random() * 60);
      posEstrelas.set([v.x, v.y, v.z], i * 3);
    }
    const geoEstrelas = reg(new THREE.BufferGeometry());
    geoEstrelas.setAttribute('position', new THREE.BufferAttribute(posEstrelas, 3));
    const matEstrelas = reg(new THREE.PointsMaterial({ color: 0xaabbdd, size: 0.35, sizeAttenuation: true }));
    scene.add(new THREE.Points(geoEstrelas, matEstrelas));

    // ————— Sol —————
    const corpoSol = corpos.find((c) => c.id === 'sol') || { id: 'sol', aparencia: { tipo: 'estrela' } };
    const matSol = reg(new THREE.MeshBasicMaterial({
      map: reg(new THREE.CanvasTexture(criarTexturaCanvas(corpoSol))),
    }));
    const sol = new THREE.Mesh(reg(new THREE.SphereGeometry(RAIO_SOL, 48, 32)), matSol);
    scene.add(sol);
    // Mesma textura real da cena principal (texturas/sol.jpg), com o mesmo
    // tratamento de colorSpace e anisotropia.
    aplicarTexturaReal(motor.renderer, 'sol', matSol, reg);
    // Mesma iluminação da cena principal (motor3d._criarIluminacao): ambiente
    // fraca para o lado noturno continuar legível, e PointLight com decay 0.
    scene.add(new THREE.AmbientLight(0x46546e, 0.55));
    scene.add(new THREE.PointLight(0xffffff, 2.2, 0, 0));

    // ————— órbita, com a excentricidade VERDADEIRA (SPEC §4.2) —————
    const E_TERRA = 0.0167;
    const pontosOrbita = [];
    for (let i = 0; i <= 256; i++) {
      const lam = (i / 256) * 360;
      const r = orbitaDoCorpo() * (1 - E_TERRA * E_TERRA) / (1 + E_TERRA * Math.cos((lam - 282.94) * RAD));
      pontosOrbita.push(direcaoLongitude(lam + 180).multiplyScalar(r));
    }
    const geoOrbita = reg(new THREE.BufferGeometry().setFromPoints(pontosOrbita));
    const matOrbita = reg(new THREE.LineBasicMaterial({ color: 0x4a6fa8, transparent: true, opacity: 0.55 }));
    scene.add(new THREE.Line(geoOrbita, matOrbita));

    // ————— Terra —————
    const grupoTerra = new THREE.Group();
    // Nome só para o teste: é por ele que `validacao-palco.mjs` acha o planeta
    // para conferir que a câmera não o larga (o Sol é a maior esfera da cena,
    // então "a maior" não serve como regra aqui).
    grupoTerra.name = 'planeta-palco';
    scene.add(grupoTerra);

    const texTerra = reg(new THREE.CanvasTexture(criarTexturaCanvas(corpoTerra)));
    const matTerra = reg(new THREE.MeshStandardMaterial({ map: texTerra, roughness: 0.85, metalness: 0.02 }));
    const terra = new THREE.Mesh(reg(new THREE.SphereGeometry(RAIO_TERRA, 64, 48)), matTerra);
    grupoTerra.add(terra);

    // Nuvens da Terra: mesh irmão, escalado 1.015 para flutuar acima
    const geoNuvens = reg(new THREE.SphereGeometry(RAIO_TERRA * 1.015, 64, 48));
    const matNuvens = reg(new THREE.MeshStandardMaterial({
      color: 0xffffff,
      opacity: 0.85,
      transparent: true,
      roughness: 1,
      depthWrite: false,
    }));
    const nuvens = new THREE.Mesh(geoNuvens, matNuvens);
    grupoTerra.add(nuvens);
    // Carrega textura de nuvens se existir; se não, apenas não aplica (mesmo contrato de motor3d)
    const carregarNuvens = () => {
      const loader = new THREE.TextureLoader();
      loader.load('texturas/terra_nuvens.jpg?v=30', (texNuvens) => {
        texNuvens.colorSpace = THREE.SRGBColorSpace;
        texNuvens.anisotropy = motor.renderer.capabilities.getMaxAnisotropy();
        matNuvens.alphaMap = reg(texNuvens);
        matNuvens.needsUpdate = true;
      }, undefined, () => {
        // Erro no load: simplesmente não aplica (app não depende do arquivo)
      });
    };
    carregarNuvens();
    nuvens.visible = (corpoAtual.id === 'terra');

    // Textura real quando existir; o procedural acima é o fallback e o app
    // nunca depende do arquivo estar lá (mesmo contrato de motor3d).
    aplicarTexturaReal(motor.renderer, corpoTerra.id, matTerra, reg);

    // Eixo: fixo no mundo, nunca acompanha a órbita — é o ponto do modo.
    const geoEixo = reg(new THREE.CylinderGeometry(0.018, 0.018, RAIO_TERRA * 5, 8));
    const matEixo = reg(new THREE.MeshBasicMaterial({ color: 0xffd479 }));
    const eixo = new THREE.Mesh(geoEixo, matEixo);
    grupoTerra.add(eixo);

    // Terminador: círculo máximo perpendicular à direção Terra→Sol.
    const ptsTerm = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      ptsTerm.push(new THREE.Vector3(Math.cos(a) * RAIO_TERRA * 1.004, Math.sin(a) * RAIO_TERRA * 1.004, 0));
    }
    const geoTerm = reg(new THREE.BufferGeometry().setFromPoints(ptsTerm));
    const matTerm = reg(new THREE.LineBasicMaterial({ color: 0xffdca8, transparent: true, opacity: 0.85 }));
    const terminador = new THREE.Line(geoTerm, matTerm);
    grupoTerra.add(terminador);

    // ————— marcos do ano —————
    const geoMarco = reg(new THREE.SphereGeometry(0.22, 16, 12));
    const marcos = MARCOS.map((m) => {
      const mat = reg(new THREE.MeshBasicMaterial({ color: 0x9ec5ff, transparent: true, opacity: 0.75 }));
      const mesh = new THREE.Mesh(geoMarco, mat);
      mesh.position.copy(direcaoLongitude(m.lambda + 180).multiplyScalar(orbitaDoCorpo()));
      scene.add(mesh);
      return { ...m, mesh, mat };
    });

    // ————— HUD —————
    //
    // Um card por coluna, como nas Marés. Eram seis blocos (latitude, os dois
    // hemisférios, eixo, faixa de luz, ângulo da luz, distância) e em 393px de
    // altura o palco fechava quatro deles — inclusive o do ângulo da luz, que
    // é o diagrama que EXPLICA as estações. Fechado, o CSS esconde o `<svg>`:
    // era o "gráfico que sumiu" que o Fred relatou.
    //
    // Esquerda = onde você está (o controle e a leitura dele). Direita = o que
    // a luz faz aí. O aprofundamento — a faixa de luz por latitude e o mito da
    // distância — foi para o painel "Saiba mais", que é largo.
    const cardOnde = (() => {
      const el = document.createElement('div');
      el.className = 'palco-card';
      el.innerHTML = '<p class="palco-card-titulo"></p>'
        + '<input class="palco-lat" type="range" min="0" max="66" step="1" style="width:100%">'
        + '<div class="palco-card-valor"></div><p class="palco-card-nota"></p>';
      ctx.hudEsq.appendChild(el);
      return {
        raiz: el,
        titulo: el.querySelector('.palco-card-titulo'),
        valor: el.querySelector('.palco-card-valor'),
        nota: el.querySelector('.palco-card-nota'),
      };
    })();
    const inputLat = cardOnde.raiz.querySelector('.palco-lat');
    inputLat.value = String(Math.abs(latitude));
    inputLat.setAttribute('aria-label', te('latitude'));
    inputLat.oninput = () => { latitude = -Number(inputLat.value); atualizarHud(); };

    const cardLuz = criarCard(ctx.hudDir);
    // Este card carrega dois gráficos lado a lado; a largura padrão de coluna
    // (196px em modo dock) deixaria cada um com 83px. A coluna tem folga: no
    // menor alvo ela vai até 524px e o selo central termina em 458.
    cardLuz.raiz.classList.add('palco-card-largo');

    // ————— painel "Saiba mais" —————
    // Mesmo formato do painel das Marés (palco.css `.palco-explicacao`): janela
    // larga sobre a cena, com o gráfico à esquerda e duas colunas de texto.
    // É onde mora o que não cabe — nem deve caber — num card de coluna.
    let mostrarSaibaMais = false;
    const painel = (() => {
      const el = document.createElement('div');
      el.className = 'palco-card palco-explicacao';
      el.innerHTML = '<button class="palco-explicacao-fechar" type="button">'
        + '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">'
        + '<path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'
        + '</svg></button>'
        + '<p class="palco-card-titulo"></p>'
        + '<div class="palco-explicacao-corpo">'
        + '<div class="palco-card-valor"></div>'
        + '<div class="palco-card-nota"></div><div class="palco-card-nota"></div></div>';
      (document.getElementById('palco-estacoes') || document.body).appendChild(el);
      descartaveis.push({ dispose: () => el.remove() });
      return {
        raiz: el,
        titulo: el.querySelector('.palco-card-titulo'),
        valor: el.querySelector('.palco-card-valor'),
        nota: el.querySelectorAll('.palco-card-nota')[0],
        nota2: el.querySelectorAll('.palco-card-nota')[1],
      };
    })();
    painel.raiz.hidden = true;

    const btnSaibaMais = document.createElement('button');
    btnSaibaMais.className = 'palco-btn';
    btnSaibaMais.onclick = () => {
      mostrarSaibaMais = !mostrarSaibaMais;
      painel.raiz.hidden = !mostrarSaibaMais;
      atualizarHud();
    };
    painel.raiz.querySelector('.palco-explicacao-fechar').onclick = () => {
      mostrarSaibaMais = false;
      painel.raiz.hidden = true;
      atualizarHud();
    };

    // Botão "Ver um dia": modo que congela o ano e faz a Terra girar
    const btnVerDia = document.createElement('button');
    btnVerDia.className = 'palco-btn';
    btnVerDia.textContent = te('verUmDia');
    btnVerDia.style.minWidth = '88px';
    btnVerDia.onclick = () => {
      modoDia = !modoDia;
      btnVerDia.textContent = modoDia ? te('pararDia') : te('verUmDia');
      if (modoDia) {
        const dec = declinacaoSolar(longitudeSolar(dias), obliquidade);
        let nota = te('diaNoiteEquinocio');
        if (duracaoDoDia(85, dec) >= 23.9) nota = te('solDaMeiaNoiteNorte');
        else if (duracaoDoDia(-85, dec) >= 23.9) nota = te('solDaMeiaNoiteSul');
        ctx.anunciar(nota);
      } else {
        anguloDia = 0;
        atualizarHud();
      }
    };
    ctx.rodapeAcoes.appendChild(btnVerDia);
    ctx.rodapeAcoes.appendChild(btnSaibaMais);

    function criarCard(pai) {
      const el = document.createElement('div');
      el.className = 'palco-card';
      el.innerHTML = '<p class="palco-card-titulo"></p><div class="palco-card-valor"></div><p class="palco-card-nota"></p>';
      pai.appendChild(el);
      return {
        raiz: el,
        titulo: el.querySelector('.palco-card-titulo'),
        valor: el.querySelector('.palco-card-valor'),
        nota: el.querySelector('.palco-card-nota'),
      };
    }

    // ————— atualização por frame —————

    function posicaoDaTerra(n) {
      const lambda = longitudeSolar(n);
      const r = orbitaDoCorpo() * distanciaSolarUA(n);
      return { lambda, pos: direcaoLongitude(lambda + 180).multiplyScalar(r) };
    }

    function atualizar(dt, tocando) {
      // No modo dia, o ano congela; caso contrário, avança normalmente
      if (tocando && !modoDia) dias += dt * (ANO_DIAS / 24);   // um ano em ~24 s

      // No modo dia, a rotação diária avança; caso contrário, zera
      if (modoDia) {
        anguloDia += dt * (Math.PI * 2 / 8);   // uma volta em 8 s
      } else {
        anguloDia = 0;
      }

      const { lambda, pos } = posicaoDaTerra(dias);

      grupoTerra.position.copy(pos);

      // O eixo aponta sempre para a mesma direção no mundo — a inclinação não
      // "gira" com a órbita. A direção vem do motor (obliquidade + azimute IAU
      // de dados.js), a mesma regra que orienta o corpo na cena principal.
      const dirEixo = motor.poloDoCorpo(corpoAtual);
      eixo.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirEixo);

      // No modo dia, a Terra gira em torno de seu eixo
      if (modoDia) {
        const qEixo = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirEixo);
        eixo.quaternion.copy(qEixo);
        const qGiro = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), anguloDia);
        terra.quaternion.copy(qEixo).multiply(qGiro);
        nuvens.quaternion.copy(qEixo).multiply(
          new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), anguloDia * 1.03));
      } else {
        terra.quaternion.copy(eixo.quaternion);
        // Nuvens giram continuamente, independente do resto (velocidade constante)
        nuvens.rotation.y += dt * 0.06;
      }

      // Terminador de frente para o Sol
      terminador.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().negate().normalize());

      // Câmera segue o planeta com lerp suave (independente de FPS)
      // A câmera ACOMPANHA o alvo: aplica-se a ela o mesmo deslocamento do
      // alvo, preservando o afastamento e o ângulo que a pessoa escolheu. Sem
      // isso a câmera fica presa no lugar enquanto a Terra corre a órbita, e o
      // planeta muda de tamanho ao longo do ano — além de o enquadramento
      // calculado na abertura deixar de valer meia órbita depois.
      const alvo = grupoTerra.position;
      const alvoAnterior = controls.target.clone();
      controls.target.lerp(alvo, 1 - Math.pow(0.001, dt));
      camera.position.add(controls.target.clone().sub(alvoAnterior));
      controls.update();

      // `db < da`, não `>`. A comparação estava invertida desde a Fase 1 e o
      // reduce devolvia o marco MAIS DISTANTE: em λ=100° (dez dias depois do
      // solstício de junho) ele escolhia o solstício de dezembro, a 170°.
      // Três consequências, todas invisíveis até este modo passar a NOMEAR o
      // marco na tela: a bolinha destacada na órbita era a do lado oposto, o
      // texto anunciava o marco errado, e `distDoMarco` — sempre ≥ 90° — nunca
      // caía abaixo de 2, de modo que o progresso `estacoes-marco` jamais
      // disparava de dentro do modo.
      marcoProx = marcos.reduce((a, b) => {
        const da = Math.abs(((lambda - a.lambda + 540) % 360) - 180);
        const db = Math.abs(((lambda - b.lambda + 540) % 360) - 180);
        return db < da ? b : a;
      });
      marcos.forEach((m) => { m.mat.opacity = m === marcoProx ? 1 : 0.45; });

      // Chegar perto de um marco dentro do modo também conta para a badge —
      // não só clicar no evento correspondente no painel de Eventos.
      distDoMarco = Math.abs(((lambda - marcoProx.lambda + 540) % 360) - 180);
      if (distDoMarco < 2 && !marcosVistos.has(marcoProx.id)) {
        marcosVistos.add(marcoProx.id);
        if (aoProgresso) aoProgresso('estacoes-marco', { id: marcoProx.id });
      }

      atualizarHud(lambda, dias);
    }

    function atualizarHud(lambdaForcada, diasForcados) {
      const n = diasForcados !== undefined ? diasForcados : dias;
      const lambda = lambdaForcada !== undefined ? lambdaForcada : longitudeSolar(n);
      const dec = declinacaoSolar(lambda, obliquidade);

      // ————— coluna esquerda: onde você está —————
      const estN = estacaoDoHemisferio(lambda, 'norte');
      const estS = estacaoDoHemisferio(lambda, 'sul');
      const horasN = duracaoDoDia(Math.abs(latitude), dec);
      const horasS = duracaoDoDia(-Math.abs(latitude), dec);
      // Texto corrido, não o número grande do card: aqui o "valor" são duas
      // frases, e no corpo de 20px elas quebravam em quatro linhas.
      const linha = (h, est, horas) => `<div class="palco-linha">`
        + te('linhaHemisferio')
          .replace('{h}', `<b>${te(h)}</b>`)
          .replace('{est}', te(est))
          .replace('{n}', num(horas, 1))
        + `</div>`;

      cardOnde.titulo.textContent = te('ondeTitulo');
      cardOnde.valor.innerHTML =
        `<div class="palco-card-sub">${Math.abs(latitude)}° N / ${Math.abs(latitude)}° S</div>`
        + linha('norteCurto', estN, horasN)
        + linha('sulCurto', estS, horasS);

      // Mapeia o id do marco para a chave de texto correspondente
      const CHAVE_DO_MARCO = {
        'equinocio-marco': 'marcoEquinocioMarco',
        'solsticio-junho': 'marcoSolsticioJunho',
        'equinocio-setembro': 'marcoEquinocioSetembro',
        'solsticio-dezembro': 'marcoSolsticioDezembro',
      };
      const diasDoMarco = Math.round(distDoMarco * (ANO_DIAS / 360));
      const nomeMarco = te(CHAVE_DO_MARCO[marcoProx.id] || 'marcoEquinocioMarco');
      const textoMarco = diasDoMarco === 0
        ? te('proximoMarcoHoje').replace('{m}', nomeMarco)
        : diasDoMarco === 1
          ? te('proximoMarcoAmanha').replace('{m}', nomeMarco)
          : te('proximoMarco').replace('{m}', nomeMarco).replace('{d}', String(diasDoMarco));
      cardOnde.nota.textContent = corpoAtual === corpoTerra
        ? `${te('eixoLinha').replace('{o}', num(obliquidade, 2))} · ${textoMarco}`
        : `${corpoAtual.nome} — ${te('eixoLinha').replace('{o}', num(obliquidade, 2))}`;

      // ————— coluna direita: a luz que chega aí —————
      // O diagrama do raio solar é o miolo do modo: enquanto era o terceiro de
      // três cards numa coluna, nascia fechado no celular e não aparecia.
      const esp = espalhamentoDaLuz(latitude, dec);
      cardLuz.titulo.textContent = te('luzTitulo');
      // Os dois gráficos lado a lado, no mesmo card: o ângulo com que a luz
      // chega na SUA latitude, e como as horas de luz se distribuem por TODAS
      // elas. São as duas metades da mesma resposta — o que a inclinação faz
      // com você e o que ela faz com o planeta —, e ver as duas mudando juntas
      // ao arrastar a data é o que o gráfico sozinho no painel não dava.
      // Larguras 2fr/1,25fr no CSS: é a razão dos viewBox, então os dois saem
      // com a mesma altura sem letterbox.
      cardLuz.valor.innerHTML = '<div class="palco-graficos">'
        + `<div>${svgRaioSolar(Math.abs(latitude - dec), esp)}`
        + `<div class="palco-grafico-rotulo">${te('rotuloAngulo')}</div></div>`
        + `<div>${svgFaixaDeLuz(dec, true)}`
        + `<div class="palco-grafico-rotulo">${te('rotuloFaixa')}</div></div>`
        + '</div>';
      const ua = distanciaSolarUA(n);
      const milhoes = (ua * UA_KM) / 1e6;

      if (modoDia) {
        // No modo dia, a nota vira relógio: a hora e se é dia ou noite aí.
        const hora = ((anguloDia / (Math.PI * 2)) * 24) % 24;
        const hh = String(Math.floor(hora)).padStart(2, '0');
        const mm = String(Math.floor((hora % 1) * 60)).padStart(2, '0');
        const H = anguloDia - Math.PI;  // ângulo horário a partir do meio-dia
        const estaDeDia = Math.cos(H) > -Math.tan(latitude * RAD) * Math.tan(dec * RAD);
        // O relógio precisa dizer QUAL hemisfério, senão contradiz a linha
        // acima: o slider é de 0 a 66 sem sinal e a latitude interna é do
        // hemisfério sul (padrão Brasil).
        const rotuloLat = `${Math.abs(Math.round(latitude))}° ${latitude < 0 ? 'S' : 'N'}`;
        const estado = (estaDeDia ? te('estaDeDia') : te('estaDeNoite')).replace('{lat}', rotuloLat);
        const textoRelogio = te('relogioDia').replace('{h}', `${hh}h${mm}`).replace('{estado}', estado);
        cardLuz.nota.textContent = textoRelogio;
        ctx.anunciar(textoRelogio);
      } else {
        const luz = !isFinite(esp)
          ? te('luzSemSol')
          : esp < 1.05 ? te('luzPino') : te('luzNota').replace(/\{n\}/g, num(esp, 1));
        // A distância entra como uma linha, não como card: o assunto é o mito,
        // e o mito se desmonta no painel, com gráfico. Só para a Terra — com
        // Urano em cena, "é verão no Brasil" não quer dizer nada.
        // Periélio e afélio continuam sendo marco: a linha muda de texto e o
        // card acende, como fazia o card de distância antes de ser absorvido.
        const perto = ua < 0.9845;
        const longe = ua > 1.0155;
        const dist = `${te('distLinha').replace('{d}', num(milhoes, 1))}.`;
        const marcoDist = perto ? ` ${te('distPerielio')}` : longe ? ` ${te('distAfelio')}` : '';
        cardLuz.nota.textContent = corpoAtual === corpoTerra
          ? `${luz} ${dist}${marcoDist}`
          : luz;
        cardLuz.raiz.classList.toggle('palco-card-alerta',
          corpoAtual === corpoTerra && (perto || longe));
      }

      // ————— painel "Saiba mais" —————
      btnSaibaMais.textContent = mostrarSaibaMais ? te('saibaMenos') : te('saibaMais');
      // Fora do `if`: `validacao-palco.mjs` cobra que nenhum `.palco-card-titulo`
      // do palco esteja vazio, e o do painel existe no DOM mesmo fechado.
      painel.titulo.textContent = te('saibaMais');
      btnSaibaMais.hidden = corpoAtual !== corpoTerra;
      if (corpoAtual !== corpoTerra && mostrarSaibaMais) {
        mostrarSaibaMais = false;
        painel.raiz.hidden = true;
      }
      if (mostrarSaibaMais) {
        const topico = (chave) => `<p class="palco-topico">${te(chave)}</p>`;
        painel.valor.innerHTML = svgFaixaDeLuz(dec)
          + `<div class="palco-card-sub">${te('diaNoiteTitulo')}</div>`
          + svgDistanciaAnual(ua)
          + `<div class="palco-card-sub">${te('distanciaBarras')}</div>`;

        let notaPolar = te('diaNoiteEquinocio');
        if (duracaoDoDia(85, dec) >= 23.9) notaPolar = te('solDaMeiaNoiteNorte');
        else if (duracaoDoDia(-85, dec) >= 23.9) notaPolar = te('solDaMeiaNoiteSul');

        painel.nota.innerHTML = topico('topicoInclinacao')
          + `<p>${te('inclinacaoLongo').replace('{o}', num(obliquidade, 2))}</p>`
          + topico('topicoPolos')
          + `<p>${te('polosLongo')}</p><p>${notaPolar}</p>`;

        const minUA = 0.98329;
        const maxUA = 1.01671;
        const minKm = (minUA * UA_KM) / 1e6;
        const maxKm = (maxUA * UA_KM) / 1e6;
        painel.nota2.innerHTML = topico('topicoDistancia')
          + `<p>${te('distanciaLongo')
            .replace('{min}', num(minKm, 1))
            .replace('{max}', num(maxKm, 1))
            .replace('{dif}', num(maxKm - minKm, 1))
            .replace('{pct}', num((maxKm / minKm - 1) * 100, 1))
            .replace('{ene}', num(((maxUA / minUA) ** 2 - 1) * 100, 1))}</p>`
          + topico('topicoEscala')
          + `<p>${te('escalaLongo')
            .replace('{s}', num(RAIO_SOL / RAIO_TERRA, 1))
            .replace('{o}', num(RAIO_ORBITA / RAIO_TERRA, 0))}</p>`;
      }

      // Anúncio de estado: os hemisférios e a duração do dia
      if (ctx.anunciar && !modoDia) {
        ctx.anunciar(te('anuncioEstado')
          .replace('{n}', te(estN))
          .replace('{s}', te(estS))
          .replace('{h}', num(horasN, 1)));
      }

      const data = new Date(new Date('2000-01-01T12:00:00Z').getTime() + n * 86400000);
      ctx.legenda.textContent = data.toLocaleDateString(getIdioma() === 'pt' ? 'pt-BR' : getIdioma());
      ctx.scrubber.value = String(Math.round((((lambda % 360) + 360) % 360) / 360 * 1000));
    }

    // SVG da faixa de luz por latitude: mostra quantas horas de luz cada latitude
    // recebe na data atual, permitindo ver onde o Sol não se põe e onde a noite
    // não termina.
    /**
     * As duas barras da distância Terra-Sol.
     *
     * A de cima cobre só o trecho do periélio ao afélio: nela a variação
     * parece enorme. A de baixo é o MESMO trecho numa régua que começa do
     * zero, e aí os 5 milhões de km viram um risco fino dentro dos 150.
     *
     * É de propósito que o palco não exagera a órbita para mostrar isso: a
     * "órbita muito oval" é a concepção errada clássica sobre estações — a
     * mesma que este modo existe para desmontar. Um desenho oval ensinaria o
     * contrário do texto ao lado dele. A elipse da cena tem a excentricidade
     * verdadeira (0,0167), que é imperceptível de propósito.
     */
    function svgDistanciaAnual(uaHoje) {
      const MIN = 0.98329;
      const MAX = 1.01671;
      const t = Math.max(0, Math.min(1, (uaHoje - MIN) / (MAX - MIN)));
      const x0 = 6;
      const larg = 108;
      const xHoje = x0 + t * larg;
      // Na régua do zero, o trecho inteiro ocupa a fração (MAX−MIN)/MAX
      const inicioZero = x0 + (MIN / MAX) * larg;
      return `<svg viewBox="0 0 120 60" width="100%" height="60" role="img"
        aria-label="${te('distanciaBarras')}" xmlns="http://www.w3.org/2000/svg">
        <rect x="${x0}" y="8" width="${larg}" height="7" rx="3.5" fill="#1c2a44"/>
        <circle cx="${xHoje}" cy="11.5" r="4.5" fill="#ffd479" stroke="#0b101c" stroke-width="1.4"/>
        <text x="${x0}" y="6" font-size="6.5" fill="#93a0b8">${te('rotuloJaneiro')}</text>
        <text x="${x0 + larg}" y="6" font-size="6.5" fill="#93a0b8" text-anchor="end">${te('rotuloJulho')}</text>
        <text x="${xHoje}" y="25" font-size="6.5" fill="#ffd479" text-anchor="middle">${te('rotuloHoje')}</text>
        <rect x="${x0}" y="40" width="${larg}" height="7" rx="3.5" fill="#101a2e"/>
        <rect x="${inicioZero}" y="40" width="${x0 + larg - inicioZero}" height="7" rx="3.5" fill="#1c2a44"/>
        <text x="${x0}" y="57" font-size="6.5" fill="#93a0b8">0</text>
        <text x="${x0 + larg}" y="57" font-size="6.5" fill="#93a0b8" text-anchor="end">${num((MAX * UA_KM) / 1e6, 0)}</text>
      </svg>`;
    }

    /**
     * @param {number} dec  declinação solar do dia
     * @param {boolean} [compacto]  versão para o card da coluna: sem os
     *   rótulos, que a 83px de largura sairiam com 4px de altura. A leitura
     *   ali é a FORMA da mancha amarela e a linha laranja da sua latitude; os
     *   números ficam na versão grande, dentro do painel.
     */
    function svgFaixaDeLuz(dec, compacto = false) {
      // Para cada latitude, calcula a duração do dia
      const alturaSvg = 96;
      const larguraSvg = 120;
      const larguraBarra = 108;
      const areaY = 4;
      const areaAltura = 88;

      // Monta os <rect> de luz para cada latitude em passos de 4°
      let rects = '<rect x="6" y="4" width="108" height="88" fill="#101a2e"/>';
      for (let lat = 90; lat >= -90; lat -= 4) {
        const horas = duracaoDoDia(lat, dec);
        const larguraFaixa = (horas / 24) * larguraBarra;
        // Mapeia latitude: +90 → y=4, -90 → y=92
        const y = areaY + (90 - lat) / 180 * areaAltura;
        const altura = 2.2;
        rects += `<rect x="6" y="${y}" width="${larguraFaixa}" height="${altura}" fill="#ffd479"/>`;
      }

      // Linhas de referência tracejadas
      let linhas = '';
      // Equador (lat 0)
      const yEquador = areaY + (90 - 0) / 180 * areaAltura;
      linhas += `<line x1="6" y1="${yEquador}" x2="114" y2="${yEquador}" stroke="#4a6fa8" stroke-dasharray="2,2" stroke-width="0.5"/>`;

      // Círculos polares em +66.56 e -66.56
      const yNorte = areaY + (90 - 66.56) / 180 * areaAltura;
      const ySul = areaY + (90 - (-66.56)) / 180 * areaAltura;
      linhas += `<line x1="6" y1="${yNorte}" x2="114" y2="${yNorte}" stroke="#4a6fa8" stroke-dasharray="2,2" stroke-width="0.5"/>`;
      linhas += `<line x1="6" y1="${ySul}" x2="114" y2="${ySul}" stroke="#4a6fa8" stroke-dasharray="2,2" stroke-width="0.5"/>`;
      if (!compacto) {
        linhas += `<text x="116" y="${yNorte + 1}" font-size="7" fill="#93a0b8">66°</text>`;
        linhas += `<text x="116" y="${ySul + 1}" font-size="7" fill="#93a0b8">-66°</text>`;
      }

      // Marca na latitude escolhida pelo usuário
      const yUsuario = areaY + (90 - latitude) / 180 * areaAltura;
      const marcador = `<line x1="6" y1="${yUsuario}" x2="114" y2="${yUsuario}" stroke="#ff8a5c" stroke-width="1.2"/>`;

      // Eixo: N no topo, S embaixo
      const eixoTexto = compacto ? '' : `<text x="2" y="8" font-size="7" fill="#93a0b8">N</text>
        <text x="2" y="95" font-size="7" fill="#93a0b8">S</text>`;

      const ariaLabel = te('faixaDeLuzAlt')
        .replace('{n}', num(duracaoDoDia(85, dec), 0))
        .replace('{e}', num(duracaoDoDia(0, dec), 0))
        .replace('{s}', num(duracaoDoDia(-85, dec), 0));

      return `<svg viewBox="0 0 120 96" width="100%" height="96" role="img" aria-label="${ariaLabel}">
        ${rects}
        ${linhas}
        ${marcador}
        ${eixoTexto}
      </svg>`;
    }

    // Diagrama do ângulo da luz: dois feixes de mesma largura, um a pino e
    // outro no ângulo do dia, sobre a mesma superfície.
    function svgRaioSolar(zenitalGraus, espalhamento) {
      const z = Math.min(80, Math.max(0, zenitalGraus));
      const largura = 26;
      const espalhada = largura / Math.cos(z * RAD);
      const cx = 110;
      // Monta o aria-label descritivo. Se o espalhamento for Infinity (Sol não nasce),
      // usa a chave alternativa.
      const ariaLabel = !isFinite(espalhamento)
        ? te('raioSolarAltNoite')
        : te('raioSolarAlt')
          .replace('{z}', num(z, 0))
          .replace('{e}', num(espalhamento, 1));
      return `<svg viewBox="0 0 220 96" width="100%" height="80" role="img" aria-label="${ariaLabel}">
        <line x1="10" y1="80" x2="210" y2="80" stroke="#4a6fa8" stroke-width="2"/>
        <rect x="20" y="8" width="${largura}" height="60" fill="#ffd479" opacity="0.28"/>
        <rect x="20" y="72" width="${largura}" height="8" fill="#ffd479"/>
        <g transform="rotate(${z} ${cx} 80)">
          <rect x="${cx - largura / 2}" y="8" width="${largura}" height="64" fill="#7aa2ff" opacity="0.28"/>
        </g>
        <rect x="${cx - espalhada / 2}" y="72" width="${espalhada}" height="8" fill="#7aa2ff"/>
      </svg>`;
    }

    function aoScrubber(fracao) {
      // Move para a longitude solar pedida, mantendo o ano corrente.
      const alvo = fracao * 360;
      const atual = longitudeSolar(dias);
      let delta = ((alvo - atual + 540) % 360) - 180;
      dias += delta * (ANO_DIAS / 360);
      atualizarHud();
    }

    function irParaLambda(alvo) { aoScrubber((((alvo % 360) + 360) % 360) / 360); }

    function dispose() {
      controls.dispose();
      descartaveis.forEach((o) => { if (o && o.dispose) o.dispose(); });
      [ctx.hudEsq, ctx.hudDir].forEach((h) => { while (h.firstChild) h.removeChild(h.firstChild); });
    }

    // Adiado por dois RAF: o overlay ainda está hidden e os cards ainda não
    // têm texto quando construirCena roda, e medir aí devolveria uma área
    // segura falsa.
    //
    // Fica AQUI, na montagem, e não em `aoEntrarSandbox`. O sandbox só começa
    // quando o roteiro guiado termina — então enquadrar de lá deixava a
    // PRIMEIRA abertura, que é a que traz o roteiro de 5 passos, com a cena
    // sem enquadramento nenhum. É a mesma disciplina de `mares.js`.
    requestAnimationFrame(() => requestAnimationFrame(enquadrar));

    return {
      // Sem `escalaReal`: o palco esconde o botão quando a cena não o expõe. O
      // Fred pediu só a escala didática — o modo real deixava a Terra num
      // pixel e o argumento das estações não depende disso.
      scene, camera, atualizar, dispose, aoScrubber, irParaLambda,
      aoRedimensionar: (w, h) => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        enquadrar();
      },
      aoEntrarSandbox: () => {
        // Reenquadra ao sair do roteiro: o painel do roteiro não entra na área
        // segura, mas os cards do HUD podem ter mudado de altura no caminho.
        requestAnimationFrame(enquadrar);
        if (aoProgresso) aoProgresso('estacoes-abriu');
      },
      _marcos: marcos,
    };
  }

  function roteiro() {
    const obl = corpoTerra.inclinacaoEixoGraus || OBLIQUIDADE_TERRA;
    return [
      { texto: te('passo1').replace('{obl}', num(obl, 2)) },
      { texto: te('passo2') },
      { texto: te('passo3') },
      { texto: te('passo4') },
      { texto: te('passo5') },
    ];
  }

  const palco = criarPalco({
    motor,
    id: 'estacoes',
    titulo: () => te('titulo'),
    subtitulo: () => te('subtitulo'),
    icone: ICONE,
    construirCena,
    roteiro,
  });

  return {
    abrir: (opcoes) => palco.abrir(opcoes),
    fechar: () => palco.fechar(),
    get aberto() { return palco.aberto; },
  };
}
