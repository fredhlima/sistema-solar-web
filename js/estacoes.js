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
import { criarPalco, aplicarTexturaReal, areaSegura, distanciaParaEnquadrar } from './palco.js?v=19';
import { criarTexturaCanvas } from './texturas.js?v=4';
import {
  diasDesdeJ2000, longitudeSolar, distanciaSolarUA, declinacaoSolar,
  duracaoDoDia, espalhamentoDaLuz, estacaoDoHemisferio, MARCOS, OBLIQUIDADE_TERRA,
} from './estacoes-calc.js?v=2';

const RAD = Math.PI / 180;
const UA_KM = 149.6e6;
const ANO_DIAS = 365.2422;

// Geometria do palco (unidades de cena, fora de escala por projeto)
// A razão órbita:Terra passou de 16,5:1 para 6,25:1; Sol:Terra de 2,6:1 para 1,375:1.
// Isso torna a Terra visível e seu eixo inclinado legível no didático, sem afetar
// a proporção Sol—Terra (Sol continua visivelmente maior).
// Sol agora é 5,5 (3,4× o raio da Terra, deixando folga na órbita).
const RAIO_ORBITA = 10;
// O Sol precisa ser claramente o corpo grande — mas há um teto GEOMÉTRICO que
// não tem a ver com estética: a câmera é inclinada, então a órbita projeta uma
// elipse de semi-eixo menor `RAIO_ORBITA · sen(elevação)`. Se o raio do Sol
// passa disso, a metade distante da órbita inteira fica ATRÁS dele e o planeta
// — o sujeito do modo — desaparece por meio ano.
// Com 5,5 e a câmera a 30° isso acontecia: menor = 4,99 contra 5,5 do Sol.
// 3,4 com a câmera a 48° dá folga até para Júpiter (3,4 + 3,53 = 6,93 < 7,43).
const RAIO_SOL = 3.4;
const RAIO_TERRA = 1.6;

/**
 * Geometria do palco, exposta para os testes. Sem isto o teste acha cada corpo
 * pelo raio literal e todo ajuste didático de proporção reprova teste que não
 * tem defeito nenhum — foi o que aconteceu ao mexer no tamanho do Sol.
 */
export const GEOMETRIA = { RAIO_ORBITA, RAIO_SOL, RAIO_TERRA };

const TEXTOS = {
  pt: {
    titulo: 'Estações do Ano',
    norte: 'Hemisfério Norte',
    sul: 'Hemisfério Sul',
    primavera: 'Primavera', verao: 'Verão', outono: 'Outono', inverno: 'Inverno',
    duracaoDia: 'Dia claro',
    horas: 'h',
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
    luzTitulo: 'Ângulo da luz solar',
    luzNota: 'A mesma luz espalhada por {n}× mais área aquece {n}× menos cada ponto.',
    luzPino: 'Sol a pino: máximo de energia por área.',
    luzSemSol: 'Hoje o Sol não nasce nesta latitude.',
    raioSolarAlt: 'Sol a {z} graus do zênite: a mesma luz se espalha por {e} vezes mais chão.',
    raioSolarAltNoite: 'O Sol não chega a nascer nesta latitude, nesta data.',
    distTitulo: 'Distância até o Sol',
    distMilhoes: 'milhões de km',
    distPerielio: 'Mais perto do Sol — e é verão no Brasil.',
    distAfelio: 'Mais longe do Sol — e é inverno no Brasil.',
    distNota: 'A distância varia apenas 3,4% ao longo do ano. Não é ela que produz as estações.',
    eixoTitulo: 'Inclinação do eixo',
    eixoNota: 'O eixo aponta sempre para o mesmo ponto do céu, o ano inteiro.',
    proximoMarco: 'Próximo marco: {m}, em {d} dias.',
    proximoMarcoHoje: 'Próximo marco: {m} — é hoje.',
    marcoEquinocioMarco: 'equinócio de março',
    marcoSolsticioJunho: 'solstício de junho',
    marcoEquinocioSetembro: 'equinócio de setembro',
    marcoSolsticioDezembro: 'solstício de dezembro',
    anuncioEstado: 'Norte: {n}. Sul: {s}. Dia claro: {h} horas.',
    outroCorpo: 'Em outros planetas',
    escalaLegenda: 'Tamanhos e distância em proporção real. A Terra é o ponto menor.',
    passo1: 'A Terra gira inclinada. Seu eixo forma um ângulo de {obl} graus.',
    passo2: 'Essa inclinação não muda. Ao longo de toda a órbita, o eixo continua apontando para o mesmo ponto do céu.',
    passo3: 'Quando um hemisfério se inclina na direção do Sol, a luz chega de cima e aquece mais. Quando se inclina para o lado oposto, a luz chega inclinada e se espalha por mais área, aquecendo menos. É isso que produz o verão e o inverno.',
    passo4: 'Os dois hemisférios têm sempre estações opostas: quando é verão aqui, é inverno do outro lado.',
    passo5: 'E a distância? Em janeiro a Terra está mais perto do Sol, e é verão no Brasil. A distância não explica as estações.',
  },
  en: {
    titulo: 'Seasons of the Year',
    norte: 'Northern Hemisphere',
    sul: 'Southern Hemisphere',
    primavera: 'Spring', verao: 'Summer', outono: 'Autumn', inverno: 'Winter',
    duracaoDia: 'Daylight',
    horas: 'h',
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
    luzTitulo: 'Angle of sunlight',
    luzNota: 'The same light spread over {n}× more area warms each point {n}× less.',
    luzPino: 'Sun overhead: maximum energy per area.',
    luzSemSol: 'Today the Sun does not rise at this latitude.',
    raioSolarAlt: 'Sun {z} degrees from the zenith: the same light spreads over {e} times more ground.',
    raioSolarAltNoite: 'The Sun does not rise at this latitude on this date.',
    distTitulo: 'Distance to the Sun',
    distMilhoes: 'million km',
    distPerielio: 'Closer to the Sun — and it is summer in the southern hemisphere.',
    distAfelio: 'Farther from the Sun — and it is winter in the southern hemisphere.',
    distNota: 'The distance varies only 3.4% across the year. It is not what produces the seasons.',
    eixoTitulo: 'Axial tilt',
    eixoNota: 'The axis points at the same spot in the sky, all year long.',
    proximoMarco: 'Next milestone: {m}, in {d} days.',
    proximoMarcoHoje: 'Next milestone: {m} — it is today.',
    marcoEquinocioMarco: 'March equinox',
    marcoSolsticioJunho: 'June solstice',
    marcoEquinocioSetembro: 'September equinox',
    marcoSolsticioDezembro: 'December solstice',
    anuncioEstado: 'North: {n}. South: {s}. Daylight: {h} hours.',
    outroCorpo: 'On other planets',
    escalaLegenda: 'Sizes and distance in true proportion. Earth is the smaller dot.',
    passo1: 'Earth spins tilted. Its axis forms an angle of {obl} degrees.',
    passo2: 'This tilt does not change. Along the entire orbit, the axis keeps pointing at the same spot in the sky.',
    passo3: 'When a hemisphere tilts toward the Sun, light arrives from above and warms more. When it tilts away, light arrives slanted and spreads over more area, warming less. That is what produces summer and winter.',
    passo4: 'The two hemispheres always have opposite seasons: when it is summer here, it is winter on the other side.',
    passo5: 'And distance? In January Earth is closer to the Sun, and it is summer in the southern hemisphere. Distance does not explain the seasons.',
  },
  es: {
    titulo: 'Estaciones del Año',
    norte: 'Hemisferio Norte',
    sul: 'Hemisferio Sur',
    primavera: 'Primavera', verao: 'Verano', outono: 'Otoño', inverno: 'Invierno',
    duracaoDia: 'Luz del día',
    horas: 'h',
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
    luzTitulo: 'Ángulo de la luz solar',
    luzNota: 'La misma luz repartida en {n}× más área calienta {n}× menos cada punto.',
    luzPino: 'Sol en lo alto: máxima energía por área.',
    luzSemSol: 'Hoy el Sol no sale en esta latitud.',
    raioSolarAlt: 'Sol a {z} grados del cenit: la misma luz se reparte por {e} veces más suelo.',
    raioSolarAltNoite: 'El Sol no llega a salir en esta latitud, en esta fecha.',
    distTitulo: 'Distancia al Sol',
    distMilhoes: 'millones de km',
    distPerielio: 'Más cerca del Sol — y es verano en el hemisferio sur.',
    distAfelio: 'Más lejos del Sol — y es invierno en el hemisferio sur.',
    distNota: 'La distancia varía solo 3,4% a lo largo del año. No es ella la que produce las estaciones.',
    eixoTitulo: 'Inclinación del eje',
    eixoNota: 'El eje apunta siempre al mismo punto del cielo, todo el año.',
    proximoMarco: 'Próximo hito: {m}, en {d} días.',
    proximoMarcoHoje: 'Próximo hito: {m} — es hoy.',
    marcoEquinocioMarco: 'equinoccio de marzo',
    marcoSolsticioJunho: 'solsticio de junio',
    marcoEquinocioSetembro: 'equinoccio de septiembre',
    marcoSolsticioDezembro: 'solsticio de diciembre',
    anuncioEstado: 'Norte: {n}. Sur: {s}. Luz del día: {h} horas.',
    outroCorpo: 'En otros planetas',
    escalaLegenda: 'Tamaños y distancia en proporción real. La Tierra es el punto menor.',
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
    let escalaRealAtiva = false;
    let marcoProx = MARCOS[0];                // valor padrão
    let distDoMarco = 0;                      // distância em graus
    const marcosVistos = new Set();
    // A Terra é o sujeito do modo, não o Sol: a câmera nasce centrada NELA.
    // Antes o alvo era a origem, e o planeta ficava correndo pela borda de uma
    // cena cujo centro era o Sol — o oposto do que o modo quer contar. Quem
    // preferir a vista do sistema inteiro toca no vazio e a câmera solta.
    let seguindo = true;
    const listanersDosque = [];               // registra listeners para remover em dispose()
    const ORIGEM = new THREE.Vector3();       // alvo de câmera quando não está seguindo

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
    controls.maxDistance = 90;

    // Raycaster para detectar clique no planeta
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let posicaoPointerDown = null;
    // Listener pointerdown: registra posição e testa se acertou o planeta
    const onPointerDown = (evt) => {
      const rect = motor.canvas.getBoundingClientRect();
      posicaoPointerDown = { x: evt.clientX, y: evt.clientY };
      ndc.x = ((evt.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((evt.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const intersecoes = raycaster.intersectObject(terra, false);
      seguindo = intersecoes.length > 0;
    };
    // Listener pointerup: valida se foi toque real (não arrasto > 6px)
    const onPointerUp = (evt) => {
      if (!posicaoPointerDown || !seguindo) {
        seguindo = false;
        posicaoPointerDown = null;
        return;
      }
      const distancia = Math.sqrt(
        Math.pow(evt.clientX - posicaoPointerDown.x, 2) +
        Math.pow(evt.clientY - posicaoPointerDown.y, 2)
      );
      if (distancia > 6) {
        seguindo = false;
      }
      posicaoPointerDown = null;
    };
    motor.canvas.addEventListener('pointerdown', onPointerDown);
    motor.canvas.addEventListener('pointerup', onPointerUp);
    listanersDosque.push({ el: motor.canvas, tipo: 'pointerdown', fn: onPointerDown });
    listanersDosque.push({ el: motor.canvas, tipo: 'pointerup', fn: onPointerUp });

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
    // Com a câmera centrada na Terra, o que precisa caber não é a órbita: é a
    // distância até o Sol mais o disco dele, porque o Sol passa a ser o objeto
    // mais distante do centro da tela. Solta (alvo na origem), volta a ser a
    // órbita inteira.
    // Centrada na Terra, o círculo que precisa caber é em volta DELA e tem o
    // raio da distância até o Sol mais o disco dele — o Sol é o objeto mais
    // longe do centro da tela. Solta, volta a ser a órbita inteira na origem.
    const raioDaCena = () => (seguindo
      ? orbitaDoCorpo() + RAIO_SOL
      : orbitaDoCorpo() + raioDeCena(corpoAtual) + 0.5);
    function enquadrar() {
      const overlay = document.getElementById('palco-estacoes');
      if (!overlay || overlay.hidden) return;
      const area = areaSegura(overlay);
      // A posição vem do CÁLCULO, não de `grupoTerra.position`: no primeiro
      // enquadramento o laço ainda não rodou e o grupo está na origem, o que
      // dava uma distância diferente durante o roteiro guiado e um salto
      // quando ele terminava.
      const centro = seguindo ? posicaoDaTerra(dias).pos : null;
      const dist = distanciaParaEnquadrar(camera, raioDaCena(), area, 32, centro);
      if (centro) {
        const dir = camera.position.clone().sub(centro).normalize();
        camera.position.copy(centro).addScaledVector(dir, dist);
      } else {
        camera.position.setLength(dist);
      }
      camera.updateProjectionMatrix();
      // Sem isto o alvo começa na origem e o lerp leva ~1 s para chegar na
      // Terra: a primeira coisa que a pessoa vê é a cena deslizando.
      if (seguindo) controls.target.copy(grupoTerra.position);
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
    // Latitude no topo da coluna esquerda (SPEC §3c: é o controle, não só leitura)
    const linhaLat = document.createElement('div');
    linhaLat.className = 'palco-card';
    linhaLat.innerHTML = `
      <p class="palco-card-titulo"></p>
      <input class="palco-lat" type="range" min="0" max="66" step="1" style="width:100%">
      <p class="palco-card-nota"></p>`;
    ctx.hudEsq.appendChild(linhaLat);
    const inputLat = linhaLat.querySelector('.palco-lat');
    inputLat.value = String(Math.abs(latitude));
    inputLat.setAttribute('aria-label', te('latitude'));
    inputLat.oninput = () => { latitude = -Number(inputLat.value); atualizarHud(); };

    // Dois hemisférios juntos em tela curta (SPEC §3c)
    const cardDuplo = document.createElement('div');
    cardDuplo.className = 'palco-card palco-card-duplo';
    ctx.hudEsq.appendChild(cardDuplo);
    // Vão ser preenchidos dinamicamente, então criarCard não faz sentido aqui;
    // montar manualmente para que o pai seja o card-duplo
    const criarHemisferio = (pai) => {
      const bloco = document.createElement('div');
      pai.appendChild(bloco);
      return {
        titulo: (() => { const e = document.createElement('p'); e.className = 'palco-card-titulo'; bloco.appendChild(e); return e; })(),
        valor: (() => { const e = document.createElement('div'); e.className = 'palco-card-valor'; bloco.appendChild(e); return e; })(),
        nota: (() => { const e = document.createElement('p'); e.className = 'palco-card-nota'; bloco.appendChild(e); return e; })(),
      };
    };
    const cardNorte = criarHemisferio(cardDuplo);
    const cardSul = criarHemisferio(cardDuplo);

    // HUD direita: faixa de luz, luz, distância, eixo
    const cardFaixaDeLuz = criarCard(ctx.hudDir);
    const cardLuz = criarCard(ctx.hudDir);
    const cardDist = criarCard(ctx.hudDir);
    // O card do eixo vai para a coluna ESQUERDA. Com a faixa de luz nova, a
    // direita ficou com 4 cards somando 305px contra 161px da esquerda, e em
    // tela baixa o card do eixo — que carrega o "próximo marco" — era o que
    // cortava. Equilibrar as duas colunas resolve sem esconder nada: 259 e
    // 207, contra ~260 disponíveis em 1000×460.
    const cardEixo = criarCard(ctx.hudEsq);

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
      const alvo = seguindo ? grupoTerra.position : ORIGEM;
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

      // Hemisférios, sempre simultâneos e simétricos
      preencherHemisferio(cardNorte, te('norte'), Math.abs(latitude), lambda, dec);
      preencherHemisferio(cardSul, te('sul'), -Math.abs(latitude), lambda, dec);

      linhaLat.querySelector('.palco-card-titulo').textContent = te('latitude');
      linhaLat.querySelector('.palco-card-nota').textContent = `${Math.abs(latitude)}° N / ${Math.abs(latitude)}° S`;

      // Card "Onde o Sol não se põe": faixa de luz por latitude
      cardFaixaDeLuz.titulo.textContent = te('diaNoiteTitulo');
      cardFaixaDeLuz.valor.innerHTML = svgFaixaDeLuz(dec);

      // A nota muda dependendo do estado
      if (modoDia) {
        // No modo dia, mostra a hora e o estado (dia/noite)
        const hora = ((anguloDia / (Math.PI * 2)) * 24) % 24;
        const hh = String(Math.floor(hora)).padStart(2, '0');
        const mm = String(Math.floor((hora % 1) * 60)).padStart(2, '0');
        const horaFormatada = `${hh}h${mm}`;

        // Calcula se está de dia ou noite usando a mesma fórmula de duracaoDoDia
        const H = anguloDia - Math.PI;  // ângulo horário a partir do meio-dia
        const estaDeDia = Math.cos(H) > -Math.tan(latitude * RAD) * Math.tan(dec * RAD);
        // O relógio precisa dizer QUAL hemisfério, senão ele contradiz o card
        // ao lado: o slider é de 0 a 66 sem sinal e a latitude interna é do
        // hemisfério sul (padrão Brasil), então "de noite na sua latitude"
        // aparecia ao lado de "Hemisfério Norte · Verão · 22,2 h de dia claro".
        // A física estava certa; faltava dizer de quem se estava falando.
        const rotuloLat = `${Math.abs(Math.round(latitude))}° ${latitude < 0 ? 'S' : 'N'}`;
        const estado = (estaDeDia ? te('estaDeDia') : te('estaDeNoite')).replace('{lat}', rotuloLat);

        const textoRelogio = te('relogioDia')
          .replace('{h}', horaFormatada)
          .replace('{estado}', estado);
        cardFaixaDeLuz.nota.className = 'palco-card-nota';
        cardFaixaDeLuz.nota.textContent = textoRelogio;

        ctx.anunciar(textoRelogio);
      } else {
        // Modo normal: nota explicativa
        cardFaixaDeLuz.nota.className = 'palco-card-nota palco-nota-longa';
        let nota = te('diaNoiteEquinocio');
        if (duracaoDoDia(85, dec) >= 23.9) nota = te('solDaMeiaNoiteNorte');
        else if (duracaoDoDia(-85, dec) >= 23.9) nota = te('solDaMeiaNoiteSul');
        cardFaixaDeLuz.nota.textContent = nota;
      }

      // A causa física: quanto a luz se espalha
      const esp = espalhamentoDaLuz(latitude, dec);
      cardLuz.titulo.textContent = te('luzTitulo');
      cardLuz.valor.innerHTML = svgRaioSolar(Math.abs(latitude - dec), esp);
      cardLuz.nota.className = 'palco-card-nota palco-nota-longa';
      cardLuz.nota.textContent = !isFinite(esp)
        ? te('luzSemSol')
        : esp < 1.05 ? te('luzPino') : te('luzNota').replace(/\{n\}/g, num(esp, 1));

      // Mito da distância — só faz sentido para a Terra. Com outro corpo no
      // palco, este card mostrava a distância TERRA-Sol e falava do Brasil,
      // enquanto a tela exibia Urano.
      const ehTerra = corpoAtual === corpoTerra;
      cardDist.raiz.hidden = !ehTerra;
      const ua = distanciaSolarUA(n);
      const milhoes = (ua * UA_KM) / 1e6;
      cardDist.titulo.textContent = te('distTitulo');
      cardDist.valor.textContent = `${num(milhoes, 1)} ${te('distMilhoes')}`;
      const perto = ua < 0.9845;
      const longe = ua > 1.0155;
      cardDist.nota.className = 'palco-card-nota palco-nota-longa';
      cardDist.nota.textContent = perto ? te('distPerielio') : longe ? te('distAfelio') : te('distNota');
      cardDist.raiz.classList.toggle('palco-card-alerta', perto || longe);

      cardEixo.titulo.textContent = te('eixoTitulo');
      cardEixo.valor.textContent = `${num(obliquidade, 2)}°`;

      // Mapeia o id do marco para a chave de texto correspondente
      const CHAVE_DO_MARCO = {
        'equinocio-marco': 'marcoEquinocioMarco',
        'solsticio-junho': 'marcoSolsticioJunho',
        'equinocio-setembro': 'marcoEquinocioSetembro',
        'solsticio-dezembro': 'marcoSolsticioDezembro',
      };

      // Calcula a distância em dias e monta o texto do próximo marco
      const diasDoMarco = Math.round(distDoMarco * (ANO_DIAS / 360));
      const nomeMarco = te(CHAVE_DO_MARCO[marcoProx.id] || 'marcoEquinocioMarco');
      const textoMarco = diasDoMarco === 0
        ? te('proximoMarcoHoje').replace('{m}', nomeMarco)
        : te('proximoMarco').replace('{m}', nomeMarco).replace('{d}', String(diasDoMarco));

      const notaEixo = corpoAtual === corpoTerra
        ? `${te('eixoNota')} · ${textoMarco}`
        : `${corpoAtual.nome} — ${te('eixoNota')}`;
      cardEixo.nota.textContent = notaEixo;

      // Anúncio de estado: os hemisférios e a duração do dia
      const estN = estacaoDoHemisferio(lambda, 'norte');
      const estS = estacaoDoHemisferio(lambda, 'sul');
      const horasN = duracaoDoDia(Math.abs(latitude), dec);
      if (ctx.anunciar) {
        ctx.anunciar(te('anuncioEstado')
          .replace('{n}', te(estN))
          .replace('{s}', te(estS))
          .replace('{h}', num(horasN, 1)));
      }

      // Enquanto "ver em escala real" está no ar, a legenda pertence a ele: o
      // loop roda a cada frame e sobrescrevia a mensagem antes de alguém ler.
      if (!escalaRealAtiva) {
        const data = new Date(new Date('2000-01-01T12:00:00Z').getTime() + n * 86400000);
        ctx.legenda.textContent = data.toLocaleDateString(getIdioma() === 'pt' ? 'pt-BR' : getIdioma());
      }
      ctx.scrubber.value = String(Math.round((((lambda % 360) + 360) % 360) / 360 * 1000));
    }

    function preencherHemisferio(card, rotulo, lat, lambda, dec) {
      const est = estacaoDoHemisferio(lambda, lat >= 0 ? 'norte' : 'sul');
      const horas = duracaoDoDia(lat, dec);
      card.titulo.textContent = rotulo;
      card.valor.textContent = te(est);
      card.nota.textContent = `${te('duracaoDia')}: ${num(horas, 1)} ${te('horas')}`;
    }

    // SVG da faixa de luz por latitude: mostra quantas horas de luz cada latitude
    // recebe na data atual, permitindo ver onde o Sol não se põe e onde a noite
    // não termina.
    function svgFaixaDeLuz(dec) {
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
      linhas += `<text x="116" y="${yNorte + 1}" font-size="7" fill="#93a0b8">66°</text>`;
      linhas += `<line x1="6" y1="${ySul}" x2="114" y2="${ySul}" stroke="#4a6fa8" stroke-dasharray="2,2" stroke-width="0.5"/>`;
      linhas += `<text x="116" y="${ySul + 1}" font-size="7" fill="#93a0b8">-66°</text>`;

      // Marca na latitude escolhida pelo usuário
      const yUsuario = areaY + (90 - latitude) / 180 * areaAltura;
      const marcador = `<line x1="6" y1="${yUsuario}" x2="114" y2="${yUsuario}" stroke="#ff8a5c" stroke-width="1.2"/>`;

      // Eixo: N no topo, S embaixo
      const eixoTexto = `<text x="2" y="8" font-size="7" fill="#93a0b8">N</text>
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

    // ————— "ver em escala real" (SPEC §7.2) —————
    function escalaReal() {
      if (escalaRealAtiva) return;
      escalaRealAtiva = true;
      // O raio efetivo do corpo agora é RAIO_TERRA × fatorCorpo (após a compressão)
      const escalaTerraReal = ((corpoAtual.raioKm || 6371) / UA_KM) * orbitaDoCorpo() / (RAIO_TERRA * fatorCorpo);
      const escalaSolReal = (695700 / UA_KM) * orbitaDoCorpo() / RAIO_SOL;
      terra.scale.setScalar(escalaTerraReal);
      nuvens.visible = false;
      eixo.visible = false;
      terminador.visible = false;
      sol.scale.setScalar(escalaSolReal);
      marcos.forEach((m) => { m.mesh.visible = false; });
      ctx.legenda.textContent = te('escalaLegenda');
      return () => {
        terra.scale.setScalar(1);
        nuvens.visible = (corpoAtual.id === 'terra');
        eixo.visible = true;
        terminador.visible = true;
        marcos.forEach((m) => { m.mesh.visible = true; });
        escalaRealAtiva = false;
      };
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
      // Remove listeners de pointerdown/pointerup para detecção de toque
      listanersDosque.forEach((l) => l.el.removeEventListener(l.tipo, l.fn));
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
      scene, camera, atualizar, dispose, escalaReal, aoScrubber, irParaLambda,
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
    construirCena,
    roteiro,
  });

  return {
    abrir: (opcoes) => palco.abrir(opcoes),
    fechar: () => palco.fechar(),
    get aberto() { return palco.aberto; },
  };
}
