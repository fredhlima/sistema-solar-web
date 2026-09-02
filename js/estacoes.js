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
import { criarPalco, aplicarTexturaReal } from './palco.js?v=6';
import { criarTexturaCanvas } from './texturas.js?v=4';
import {
  diasDesdeJ2000, longitudeSolar, distanciaSolarUA, declinacaoSolar,
  duracaoDoDia, espalhamentoDaLuz, estacaoDoHemisferio, MARCOS, OBLIQUIDADE_TERRA,
} from './estacoes-calc.js?v=2';

const RAD = Math.PI / 180;
const UA_KM = 149.6e6;
const ANO_DIAS = 365.2422;

// Geometria do palco (unidades de cena, fora de escala por projeto)
const RAIO_ORBITA = 14;
const RAIO_SOL = 2.2;
const RAIO_TERRA = 0.85;

const TEXTOS = {
  pt: {
    titulo: 'Estações do Ano',
    norte: 'Hemisfério Norte',
    sul: 'Hemisfério Sul',
    primavera: 'Primavera', verao: 'Verão', outono: 'Outono', inverno: 'Inverno',
    duracaoDia: 'Dia claro',
    horas: 'h',
    latitude: 'Latitude',
    luzTitulo: 'Ângulo da luz solar',
    luzNota: 'A mesma luz espalhada por {n}× mais área aquece {n}× menos cada ponto.',
    luzPino: 'Sol a pino: máximo de energia por área.',
    luzSemSol: 'Hoje o Sol não nasce nesta latitude.',
    distTitulo: 'Distância até o Sol',
    distMilhoes: 'milhões de km',
    distPerielio: 'Mais perto do Sol — e é verão no Brasil.',
    distAfelio: 'Mais longe do Sol — e é inverno no Brasil.',
    distNota: 'A distância varia apenas 3,4% ao longo do ano. Não é ela que produz as estações.',
    eixoTitulo: 'Inclinação do eixo',
    eixoNota: 'O eixo aponta sempre para o mesmo ponto do céu, o ano inteiro.',
    marcoEquinocioMarco: 'Equinócio de março',
    marcoSolsticioJunho: 'Solstício de junho',
    marcoEquinocioSetembro: 'Equinócio de setembro',
    marcoSolsticioDezembro: 'Solstício de dezembro',
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
    luzTitulo: 'Angle of sunlight',
    luzNota: 'The same light spread over {n}× more area warms each point {n}× less.',
    luzPino: 'Sun overhead: maximum energy per area.',
    luzSemSol: 'Today the Sun does not rise at this latitude.',
    distTitulo: 'Distance to the Sun',
    distMilhoes: 'million km',
    distPerielio: 'Closer to the Sun — and it is summer in the southern hemisphere.',
    distAfelio: 'Farther from the Sun — and it is winter in the southern hemisphere.',
    distNota: 'The distance varies only 3.4% across the year. It is not what produces the seasons.',
    eixoTitulo: 'Axial tilt',
    eixoNota: 'The axis points at the same spot in the sky, all year long.',
    marcoEquinocioMarco: 'March equinox',
    marcoSolsticioJunho: 'June solstice',
    marcoEquinocioSetembro: 'September equinox',
    marcoSolsticioDezembro: 'December solstice',
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
    luzTitulo: 'Ángulo de la luz solar',
    luzNota: 'La misma luz repartida en {n}× más área calienta {n}× menos cada punto.',
    luzPino: 'Sol en lo alto: máxima energía por área.',
    luzSemSol: 'Hoy el Sol no sale en esta latitud.',
    distTitulo: 'Distancia al Sol',
    distMilhoes: 'millones de km',
    distPerielio: 'Más cerca del Sol — y es verano en el hemisferio sur.',
    distAfelio: 'Más lejos del Sol — y es invierno en el hemisferio sur.',
    distNota: 'La distancia varía solo 3,4% a lo largo del año. No es ella la que produce las estaciones.',
    eixoTitulo: 'Inclinación del eje',
    eixoNota: 'El eje apunta siempre al mismo punto del cielo, todo el año.',
    marcoEquinocioMarco: 'Equinoccio de marzo',
    marcoSolsticioJunho: 'Solsticio de junio',
    marcoEquinocioSetembro: 'Equinoccio de septiembre',
    marcoSolsticioDezembro: 'Solsticio de diciembre',
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
  const CORPOS_EXTRA = ['terra', 'marte', 'urano', 'venus']
    .map((id) => corpos.find((c) => c.id === id))
    .filter(Boolean);

  function construirCena(ctx) {
    const descartaveis = [];
    const reg = (x) => { descartaveis.push(x); return x; };

    let corpoAtual = corpoTerra;
    // A obliquidade vem de dados.js, a mesma que o motor usa — não de uma
    // constante local. Duas fontes de verdade para o mesmo número acabam
    // divergindo, e aqui ele aparece na tela.
    let obliquidade = corpoTerra.inclinacaoEixoGraus || OBLIQUIDADE_TERRA;
    let latitude = -23;                       // default: Brasil (SPEC §4.3b)
    let dias = diasDesdeJ2000(ctx.dataInicial);
    let escalaRealAtiva = false;
    const marcosVistos = new Set();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 19, 33);

    const controls = new OrbitControls(camera, motor.canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 4;
    controls.maxDistance = 90;

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
      const r = RAIO_ORBITA * (1 - E_TERRA * E_TERRA) / (1 + E_TERRA * Math.cos((lam - 282.94) * RAD));
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
      mesh.position.copy(direcaoLongitude(m.lambda + 180).multiplyScalar(RAIO_ORBITA));
      scene.add(mesh);
      return { ...m, mesh, mat };
    });

    // ————— HUD —————
    const cardNorte = criarCard(ctx.hudEsq);
    const cardSul = criarCard(ctx.hudEsq);
    const cardLuz = criarCard(ctx.hudDir);
    const cardDist = criarCard(ctx.hudDir);
    const cardEixo = criarCard(ctx.hudDir);

    // Slider de latitude: move os dois hemisférios ao mesmo tempo, simétricos.
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

    // Extra multiplanetário (SPEC §4.5), fora do fluxo principal.
    const btnExtra = document.createElement('button');
    btnExtra.className = 'palco-btn';
    btnExtra.style.alignSelf = 'flex-end';
    btnExtra.textContent = te('outroCorpo');
    btnExtra.onclick = trocarCorpo;
    ctx.hudDir.appendChild(btnExtra);

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

    function trocarCorpo() {
      const i = CORPOS_EXTRA.indexOf(corpoAtual);
      corpoAtual = CORPOS_EXTRA[(i + 1) % CORPOS_EXTRA.length];
      obliquidade = corpoAtual.inclinacaoEixoGraus || 0;   // sempre de dados.js
      // O corpo mudou: a textura tem de acompanhar, senão Urano fica com a
      // cara da Terra.
      matTerra.map = reg(new THREE.CanvasTexture(criarTexturaCanvas(corpoAtual)));
      matTerra.needsUpdate = true;
      aplicarTexturaReal(motor.renderer, corpoAtual.id, matTerra, reg);
      atualizarHud();
    }

    // ————— atualização por frame —————

    function posicaoDaTerra(n) {
      const lambda = longitudeSolar(n);
      const r = RAIO_ORBITA * distanciaSolarUA(n);
      return { lambda, pos: direcaoLongitude(lambda + 180).multiplyScalar(r) };
    }

    function atualizar(dt, tocando) {
      if (tocando) dias += dt * (ANO_DIAS / 24);   // um ano em ~24 s
      const { lambda, pos } = posicaoDaTerra(dias);

      grupoTerra.position.copy(pos);

      // O eixo aponta sempre para a mesma direção no mundo — a inclinação não
      // "gira" com a órbita. A direção vem do motor (obliquidade + azimute IAU
      // de dados.js), a mesma regra que orienta o corpo na cena principal.
      const dirEixo = motor.poloDoCorpo(corpoAtual);
      eixo.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirEixo);
      terra.quaternion.copy(eixo.quaternion);

      // Terminador de frente para o Sol
      terminador.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().negate().normalize());

      const marcoProx = marcos.reduce((a, b) => {
        const da = Math.abs(((lambda - a.lambda + 540) % 360) - 180);
        const db = Math.abs(((lambda - b.lambda + 540) % 360) - 180);
        return db > da ? b : a;
      });
      marcos.forEach((m) => { m.mat.opacity = m === marcoProx ? 1 : 0.45; });

      // Chegar perto de um marco dentro do modo também conta para a badge —
      // não só clicar no evento correspondente no painel de Eventos.
      const distDoMarco = Math.abs(((lambda - marcoProx.lambda + 540) % 360) - 180);
      if (distDoMarco < 2 && !marcosVistos.has(marcoProx.id)) {
        marcosVistos.add(marcoProx.id);
        if (aoProgresso) aoProgresso('estacoes-marco', { id: marcoProx.id });
      }

      controls.update();
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

      // A causa física: quanto a luz se espalha
      const esp = espalhamentoDaLuz(latitude, dec);
      cardLuz.titulo.textContent = te('luzTitulo');
      cardLuz.valor.innerHTML = svgRaioSolar(Math.abs(latitude - dec));
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
      cardDist.nota.textContent = perto ? te('distPerielio') : longe ? te('distAfelio') : te('distNota');
      cardDist.raiz.classList.toggle('palco-card-alerta', perto || longe);

      cardEixo.titulo.textContent = te('eixoTitulo');
      cardEixo.valor.textContent = `${num(obliquidade, 2)}°`;
      cardEixo.nota.textContent = corpoAtual === corpoTerra
        ? te('eixoNota')
        : `${corpoAtual.nome} — ${te('eixoNota')}`;
      btnExtra.textContent = `${te('outroCorpo')} (${corpoAtual.nome})`;

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

    // Diagrama do ângulo da luz: dois feixes de mesma largura, um a pino e
    // outro no ângulo do dia, sobre a mesma superfície.
    function svgRaioSolar(zenitalGraus) {
      const z = Math.min(80, Math.max(0, zenitalGraus));
      const largura = 26;
      const espalhada = largura / Math.cos(z * RAD);
      const cx = 110;
      return `<svg viewBox="0 0 220 96" width="100%" height="80" role="img" aria-hidden="true">
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
      const escalaTerraReal = (6371 / UA_KM) * RAIO_ORBITA / RAIO_TERRA;
      const escalaSolReal = (695700 / UA_KM) * RAIO_ORBITA / RAIO_SOL;
      terra.scale.setScalar(escalaTerraReal);
      eixo.visible = false;
      terminador.visible = false;
      sol.scale.setScalar(escalaSolReal);
      marcos.forEach((m) => { m.mesh.visible = false; });
      ctx.legenda.textContent = te('escalaLegenda');
      return () => {
        terra.scale.setScalar(1);
        sol.scale.setScalar(1);
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
      descartaveis.forEach((o) => { if (o && o.dispose) o.dispose(); });
      [ctx.hudEsq, ctx.hudDir].forEach((h) => { while (h.firstChild) h.removeChild(h.firstChild); });
    }

    return {
      scene, camera, atualizar, dispose, escalaReal, aoScrubber, irParaLambda,
      aoRedimensionar: (w, h) => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      },
      aoEntrarSandbox: () => { if (aoProgresso) aoProgresso('estacoes-abriu'); },
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
