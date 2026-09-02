// Modo "Marés" — Fase 2 da SPEC-estacoes-e-mares.md.
//
// O que este modo responde: por que o mar sobe e desce duas vezes por dia, e
// por que há maré alta TAMBÉM do lado oposto à Lua — a parte contraintuitiva,
// e a razão de o tema render mais que uma frase de livro.
//
// LIMITE DELIBERADO (SPEC §1): nenhuma altura em metros, nenhum horário de
// preamar de porto. A altura real depende dos constituintes harmônicos do
// lugar — com a mesma Lua, a Baía de Fundy tem ~16 m e o Mediterrâneo ~20 cm.
// Aqui se mostra a FORÇA relativa e o RITMO, que é o que a geometria permite.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getIdioma } from './i18n.js?v=30';
import { criarPalco } from './palco.js?v=5';
import { criarTexturaCanvas } from './texturas.js?v=4';
import {
  diasDesdeJ2000, longitudeSolar, longitudeLunar, elongacao, fracaoIluminada,
  nomeDaFase, mareCombinada, alturaRelativa, intervaloEntrePreamaresHoras,
  diaLunarHoras, formatarHoras, MES_SINODICO_DIAS, A_SOL, A_LUA,
} from './mares-calc.js?v=1';

const RAD = Math.PI / 180;

// Geometria do palco (unidades de cena, fora de escala por projeto)
const RAIO_TERRA = 2.0;
const RAIO_ORBITA_LUA = 9.0;
const RAIO_LUA = 0.8;
// Exagero do bojo. O real é ~0,5 m numa Terra de 12.742 km — 1 parte em 25
// milhões. Sem exagero não há o que ver; daí o selo e o "ver em escala real".
const EXAGERO_BOJO = 0.24;

const TEXTOS = {
  pt: {
    titulo: 'Marés',
    forcaTitulo: 'Força da maré',
    sizigia: 'Maré de sizígia — a mais forte',
    quadratura: 'Maré de quadratura — a mais fraca',
    intermediaria: 'Entre a mais forte e a mais fraca',
    faseTitulo: 'Fase da Lua',
    nova: 'Nova', quartoCrescente: 'Quarto crescente', cheia: 'Cheia',
    quartoMinguante: 'Quarto minguante', crescenteConcava: 'Crescente côncava',
    crescenteGibosa: 'Crescente gibosa', minguanteGibosa: 'Minguante gibosa',
    minguanteConcava: 'Minguante côncava',
    iluminada: 'iluminada',
    praiaTitulo: 'Sua praia',
    preamar: 'Maré alta',
    baixamar: 'Maré baixa',
    subindo: 'Enchendo',
    descendo: 'Vazando',
    ritmoTitulo: 'Ritmo',
    ritmoNota: 'Entre uma maré alta e a seguinte passam {i}. Não são 12 h porque, enquanto a Terra gira, a Lua também avança — a Terra precisa girar um pouco mais para reencontrá-la.',
    saibaMais: 'Saiba mais: as forças',
    saibaMenos: 'Ocultar as forças',
    forcasNota: 'Não é a gravidade da Lua que levanta a água: é a DIFERENÇA dela entre o lado próximo, o centro e o lado distante da Terra. Essa diferença cai com o cubo da distância. Por isso a Lua, muito menor, puxa a maré com o dobro da força do Sol.',
    razaoNota: 'Maré da Lua: {r}× a do Sol',
    escalaLegenda: 'Em escala real o bojo tem cerca de 0,5 m numa Terra de 12.742 km.',
    escalaNota: 'O mar sobe menos que a sua altura — e ainda assim move oceanos inteiros.',
    passo1: 'A Lua puxa a água da Terra. Do lado voltado para ela, o mar sobe.',
    passo2: 'E do lado oposto o mar também sobe. São dois bojos, não um.',
    passo3: 'A razão: a Lua não puxa a Terra inteira por igual. O lado próximo é puxado mais que o centro, e o centro mais que o lado distante. Essa diferença estica a água nas duas pontas.',
    passo4: 'A Terra gira por baixo dos dois bojos. Por isso a sua praia passa por duas marés altas a cada volta.',
    passo5: 'O Sol também puxa. Na lua nova e na cheia as duas forças se somam, e a maré fica mais forte. Nos quartos elas se opõem, e a maré fica mais fraca.',
  },
  en: {
    titulo: 'Tides',
    forcaTitulo: 'Tidal force',
    sizigia: 'Spring tide — the strongest',
    quadratura: 'Neap tide — the weakest',
    intermediaria: 'Between the strongest and the weakest',
    faseTitulo: 'Moon phase',
    nova: 'New', quartoCrescente: 'First quarter', cheia: 'Full',
    quartoMinguante: 'Last quarter', crescenteConcava: 'Waxing crescent',
    crescenteGibosa: 'Waxing gibbous', minguanteGibosa: 'Waning gibbous',
    minguanteConcava: 'Waning crescent',
    iluminada: 'lit',
    praiaTitulo: 'Your beach',
    preamar: 'High tide',
    baixamar: 'Low tide',
    subindo: 'Rising',
    descendo: 'Falling',
    ritmoTitulo: 'Rhythm',
    ritmoNota: 'Between one high tide and the next, {i} go by. Not 12 h, because while Earth turns the Moon also moves ahead — Earth has to turn a little further to meet it again.',
    saibaMais: 'Learn more: the forces',
    saibaMenos: 'Hide the forces',
    forcasNota: 'It is not the Moon’s gravity that lifts the water: it is the DIFFERENCE in it between the near side, the centre and the far side of Earth. That difference falls with the cube of distance. This is why the Moon, far smaller, pulls the tide twice as strongly as the Sun.',
    razaoNota: 'Moon’s tide: {r}× the Sun’s',
    escalaLegenda: 'At true scale the bulge is about 0.5 m on an Earth 12,742 km across.',
    escalaNota: 'The sea rises less than your own height — and still moves entire oceans.',
    passo1: 'The Moon pulls Earth’s water. On the side facing it, the sea rises.',
    passo2: 'And on the opposite side the sea rises too. There are two bulges, not one.',
    passo3: 'The reason: the Moon does not pull the whole Earth equally. The near side is pulled more than the centre, and the centre more than the far side. That difference stretches the water at both ends.',
    passo4: 'Earth turns underneath the two bulges. That is why your beach passes through two high tides each turn.',
    passo5: 'The Sun pulls as well. At new and full Moon the two forces add up and the tide is stronger. At the quarters they oppose each other and the tide is weaker.',
  },
  es: {
    titulo: 'Mareas',
    forcaTitulo: 'Fuerza de la marea',
    sizigia: 'Marea viva — la más fuerte',
    quadratura: 'Marea muerta — la más débil',
    intermediaria: 'Entre la más fuerte y la más débil',
    faseTitulo: 'Fase de la Luna',
    nova: 'Nueva', quartoCrescente: 'Cuarto creciente', cheia: 'Llena',
    quartoMinguante: 'Cuarto menguante', crescenteConcava: 'Creciente cóncava',
    crescenteGibosa: 'Creciente gibosa', minguanteGibosa: 'Menguante gibosa',
    minguanteConcava: 'Menguante cóncava',
    iluminada: 'iluminada',
    praiaTitulo: 'Tu playa',
    preamar: 'Marea alta',
    baixamar: 'Marea baja',
    subindo: 'Subiendo',
    descendo: 'Bajando',
    ritmoTitulo: 'Ritmo',
    ritmoNota: 'Entre una marea alta y la siguiente pasan {i}. No son 12 h porque, mientras la Tierra gira, la Luna también avanza — la Tierra debe girar un poco más para reencontrarla.',
    saibaMais: 'Saber más: las fuerzas',
    saibaMenos: 'Ocultar las fuerzas',
    forcasNota: 'No es la gravedad de la Luna la que levanta el agua: es la DIFERENCIA de ella entre el lado cercano, el centro y el lado lejano de la Tierra. Esa diferencia cae con el cubo de la distancia. Por eso la Luna, mucho menor, tira de la marea con el doble de fuerza que el Sol.',
    razaoNota: 'Marea de la Luna: {r}× la del Sol',
    escalaLegenda: 'En escala real el abultamiento mide unos 0,5 m en una Tierra de 12.742 km.',
    escalaNota: 'El mar sube menos que tu propia altura — y aun así mueve océanos enteros.',
    passo1: 'La Luna tira del agua de la Tierra. En el lado que la mira, el mar sube.',
    passo2: 'Y en el lado opuesto el mar también sube. Son dos abultamientos, no uno.',
    passo3: 'La razón: la Luna no tira de toda la Tierra por igual. El lado cercano recibe más tirón que el centro, y el centro más que el lado lejano. Esa diferencia estira el agua en los dos extremos.',
    passo4: 'La Tierra gira por debajo de los dos abultamientos. Por eso tu playa pasa por dos mareas altas en cada vuelta.',
    passo5: 'El Sol también tira. En luna nueva y llena las dos fuerzas se suman y la marea es más fuerte. En los cuartos se oponen y la marea es más débil.',
  },
};

function tm(chave) {
  const i = getIdioma();
  return (TEXTOS[i] && TEXTOS[i][chave]) || TEXTOS.pt[chave] || chave;
}

function num(valor, casas) {
  const t = valor.toFixed(casas);
  return getIdioma() === 'en' ? t : t.replace('.', ',');
}

function direcaoLongitude(graus) {
  const a = graus * RAD;
  return new THREE.Vector3(Math.cos(a), 0, -Math.sin(a));
}

export function iniciarMares({ motor, dados, premium, aoProgresso }) {
  const corpos = (dados && dados.corpos) || [];
  const corpoTerra = corpos.find((c) => c.id === 'terra') || { id: 'terra' };
  const corpoLua = corpos.find((c) => c.id === 'lua') || { id: 'lua' };

  function construirCena(ctx) {
    const descartaveis = [];
    const reg = (x) => { descartaveis.push(x); return x; };

    let dias = diasDesdeJ2000(ctx.dataInicial);
    let mostrarForcas = false;
    let escalaRealAtiva = false;
    let alturaAnterior = null;
    const marcosVistos = new Set();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
    // Vista de topo do polo norte, como a SPEC §5.1 pede: é o único ângulo em
    // que os dois bojos, a órbita da Lua e a direção do Sol se leem de uma vez.
    // Com a câmera inclinada, a Lua caía pelo rodapé quando estava do mesmo
    // lado que ela. O z mínimo evita a degenerescência do OrbitControls quando
    // a câmera fica exatamente sobre o alvo; girar continua livre pelo mouse.
    camera.position.set(0, 30, 0.01);

    const controls = new OrbitControls(camera, motor.canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 6;
    controls.maxDistance = 70;

    // Mesma iluminação da cena principal (motor3d._criarIluminacao)
    scene.add(new THREE.AmbientLight(0x46546e, 0.55));
    const luzSol = new THREE.DirectionalLight(0xffffff, 2.2);
    scene.add(luzSol);

    // ————— estrelas —————
    const pos = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(120 + Math.random() * 60);
      pos.set([v.x, v.y, v.z], i * 3);
    }
    const geoEstrelas = reg(new THREE.BufferGeometry());
    geoEstrelas.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geoEstrelas, reg(new THREE.PointsMaterial({ color: 0xaabbdd, size: 0.3 }))));

    // ————— Terra —————
    const matTerra = reg(new THREE.MeshStandardMaterial({
      map: reg(new THREE.CanvasTexture(criarTexturaCanvas(corpoTerra))),
      roughness: 0.9, metalness: 0.02,
    }));
    const terra = new THREE.Mesh(reg(new THREE.SphereGeometry(RAIO_TERRA, 64, 48)), matTerra);
    scene.add(terra);
    new THREE.TextureLoader().load('texturas/terra.jpg?v=30', (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      matTerra.map = t;
      matTerra.needsUpdate = true;
      reg(t);
    }, undefined, () => { /* fica o procedural */ });

    // ————— oceano: elipsoide prolato alinhado ao eixo dos bojos —————
    const oceano = new THREE.Mesh(
      reg(new THREE.SphereGeometry(RAIO_TERRA * 1.005, 64, 48)),
      reg(new THREE.MeshStandardMaterial({
        color: 0x5fb8ff, transparent: true, opacity: 0.6,
        roughness: 0.2, metalness: 0.15,
      })),
    );
    scene.add(oceano);

    // ————— Lua —————
    const matLua = reg(new THREE.MeshStandardMaterial({
      map: reg(new THREE.CanvasTexture(criarTexturaCanvas(corpoLua))), roughness: 0.95,
    }));
    const lua = new THREE.Mesh(reg(new THREE.SphereGeometry(RAIO_LUA, 32, 24)), matLua);
    scene.add(lua);
    new THREE.TextureLoader().load('texturas/lua.jpg?v=30', (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      matLua.map = t;
      matLua.needsUpdate = true;
      reg(t);
    }, undefined, () => {});

    // Órbita da Lua
    const ptsOrbita = [];
    for (let i = 0; i <= 128; i++) {
      ptsOrbita.push(direcaoLongitude((i / 128) * 360).multiplyScalar(RAIO_ORBITA_LUA));
    }
    scene.add(new THREE.Line(
      reg(new THREE.BufferGeometry().setFromPoints(ptsOrbita)),
      reg(new THREE.LineBasicMaterial({ color: 0x4a6fa8, transparent: true, opacity: 0.4 })),
    ));

    // Direção do Sol: seta na borda, já que o Sol não cabe no enquadramento
    const setaSol = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 3.0, 0xffd479, 0.9, 0.5,
    );
    scene.add(setaSol);

    // Marcador "sua praia"
    const praia = new THREE.Mesh(
      reg(new THREE.SphereGeometry(0.17, 16, 12)),
      reg(new THREE.MeshBasicMaterial({ color: 0xff8a5c })),
    );
    scene.add(praia);

    // ————— vetores de força diferencial (só no "Saiba mais") —————
    // Mostram o que a fórmula diz: para fora nas duas pontas, para dentro nos
    // lados. É a resposta rigorosa, e por isso fica fora da superfície.
    const setasForca = [];
    for (let i = 0; i < 12; i++) {
      const seta = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, 0x9ec5ff, 0.28, 0.16);
      seta.visible = false;
      scene.add(seta);
      setasForca.push(seta);
    }

    // ————— HUD —————
    const cardForca = criarCard(ctx.hudEsq);
    const cardFase = criarCard(ctx.hudEsq);
    const cardPraia = criarCard(ctx.hudDir);
    const cardRitmo = criarCard(ctx.hudDir);

    const btnForcas = document.createElement('button');
    btnForcas.className = 'palco-btn';
    btnForcas.style.alignSelf = 'flex-end';
    btnForcas.onclick = () => {
      mostrarForcas = !mostrarForcas;
      cardForcas.raiz.hidden = !mostrarForcas;
      atualizarHud();
    };
    ctx.hudDir.appendChild(btnForcas);
    const cardForcas = criarCard(ctx.hudDir);
    cardForcas.raiz.hidden = true;

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

    function atualizar(dt, tocando) {
      // Um dia lunar em ~14 s: rápido o bastante para ver os dois bojos
      // passarem, lento o bastante para acompanhar o medidor.
      if (tocando) dias += dt * (diaLunarHoras() / 24) / 14;

      const lamSol = longitudeSolar(dias);
      const lamLua = longitudeLunar(dias);
      const { amplitude, eixoGraus } = mareCombinada(lamLua, lamSol);

      const dirSol = direcaoLongitude(lamSol);
      luzSol.position.copy(dirSol).multiplyScalar(50);
      // Fica logo fora da órbita e aponta para dentro: indica de onde vem a
      // luz sem competir com a Terra pelo centro da tela.
      setaSol.setDirection(dirSol.clone().negate());
      setaSol.position.copy(dirSol).multiplyScalar(RAIO_ORBITA_LUA + 4.2);

      lua.position.copy(direcaoLongitude(lamLua).multiplyScalar(RAIO_ORBITA_LUA));

      // Oceano deformado: prolato ao longo do eixo dos bojos. O eixo é o do
      // conjunto Lua+Sol, não o da Lua — por isso em fase intermediária ele
      // fica ENTRE os dois.
      const e = EXAGERO_BOJO * amplitude;
      oceano.scale.set(1 + e, 1 - e / 2, 1 - e / 2);
      oceano.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), direcaoLongitude(eixoGraus));

      // Rotação da Terra e a praia sobre ela
      const anguloTerra = (dias * 360) / (23.9345 / 24);
      terra.rotation.y = -anguloTerra * RAD;
      const lonPraia = anguloTerra % 360;
      const dirPraia = direcaoLongitude(lonPraia);
      praia.position.copy(dirPraia).multiplyScalar(RAIO_TERRA * (1 + e * 1.05));

      // ψ: ângulo entre a praia e o eixo dos bojos
      const psi = ((lonPraia - eixoGraus) % 360 + 360) % 360;
      const altura = alturaRelativa(psi, amplitude);

      if (mostrarForcas) atualizarSetasForca(eixoGraus);

      controls.update();
      atualizarHud(lamSol, lamLua, amplitude, altura, psi);
      alturaAnterior = altura;
    }

    // As setas seguem o sinal do polinômio de Legendre: para fora perto dos
    // bojos, para dentro perto da maré baixa.
    function atualizarSetasForca(eixoGraus) {
      setasForca.forEach((seta, i) => {
        const ang = eixoGraus + (i * 360) / setasForca.length;
        const dir = direcaoLongitude(ang);
        const psi = (i * 360) / setasForca.length;
        const h = alturaRelativa(psi, 1);
        const paraFora = h >= 0;
        seta.position.copy(dir).multiplyScalar(RAIO_TERRA * 1.06);
        seta.setDirection(paraFora ? dir : dir.clone().negate());
        seta.setLength(0.35 + Math.abs(h) * 1.5, 0.28, 0.16);
        seta.setColor(paraFora ? 0x7ad4ff : 0x8a97b5);
        seta.visible = true;
      });
    }

    function atualizarHud(lamSol, lamLua, amplitude, altura, psi) {
      if (amplitude === undefined) {
        const s = longitudeSolar(dias);
        const l = longitudeLunar(dias);
        const m = mareCombinada(l, s);
        return atualizarHud(s, l, m.amplitude, alturaRelativa(0, m.amplitude), 0);
      }

      // Força da maré: sizígia, quadratura ou o meio do caminho
      const pctDoMaximo = (amplitude / (A_LUA + A_SOL)) * 100;
      cardForca.titulo.textContent = tm('forcaTitulo');
      cardForca.valor.textContent = `${num(pctDoMaximo, 0)}%`;
      const ehSizigia = amplitude > 1.38;
      const ehQuadratura = amplitude < 0.62;
      cardForca.nota.textContent = ehSizigia ? tm('sizigia') : ehQuadratura ? tm('quadratura') : tm('intermediaria');
      cardForca.raiz.classList.toggle('palco-card-alerta', ehSizigia || ehQuadratura);
      // Um marco por vez, como o modo Estações faz: progresso.js guarda os
      // ids distintos e a badge sai quando os dois apareceram.
      const marcoAtual = ehSizigia ? 'sizigia' : ehQuadratura ? 'quadratura' : null;
      if (marcoAtual && !marcosVistos.has(marcoAtual)) {
        marcosVistos.add(marcoAtual);
        if (aoProgresso) aoProgresso('mares-marco', { id: marcoAtual });
      }

      // Fase da Lua
      const fase = nomeDaFase(dias);
      cardFase.titulo.textContent = tm('faseTitulo');
      cardFase.valor.textContent = tm(fase);
      cardFase.nota.textContent = `${num(fracaoIluminada(dias) * 100, 0)}% ${tm('iluminada')}`;

      // Sua praia: medidor
      cardPraia.titulo.textContent = tm('praiaTitulo');
      cardPraia.valor.innerHTML = svgMedidor(altura);
      const subindo = alturaAnterior !== null && altura > alturaAnterior;
      const perto = Math.abs(altura) > amplitude * 0.75;
      if (!escalaRealAtiva) {
        cardPraia.nota.textContent = perto
          ? (altura > 0 ? tm('preamar') : tm('baixamar'))
          : (subindo ? tm('subindo') : tm('descendo'));
      }

      // Ritmo
      const intervalo = formatarHoras(intervaloEntrePreamaresHoras());
      cardRitmo.titulo.textContent = tm('ritmoTitulo');
      cardRitmo.valor.textContent = intervalo;
      cardRitmo.nota.textContent = tm('ritmoNota').replace('{i}', intervalo);

      // Saiba mais
      btnForcas.textContent = mostrarForcas ? tm('saibaMenos') : tm('saibaMais');
      cardForcas.titulo.textContent = tm('saibaMais');
      cardForcas.valor.textContent = tm('razaoNota').replace('{r}', num(A_LUA / A_SOL, 1));
      cardForcas.nota.textContent = tm('forcasNota');

      // Ver comentário equivalente em estacoes.js: com "ver em escala real"
      // ligado, a legenda é dele, não da data.
      if (!escalaRealAtiva) {
        const data = new Date(new Date('2000-01-01T12:00:00Z').getTime() + dias * 86400000);
        const idioma = getIdioma();
        ctx.legenda.textContent = data.toLocaleDateString(idioma === 'pt' ? 'pt-BR' : idioma);
      }
      ctx.scrubber.value = String(Math.round((elongacao(dias) / 360) * 1000));
    }

    // Medidor vertical: a altura relativa da maré na praia, agora.
    function svgMedidor(altura) {
      const max = A_LUA + A_SOL;
      const frac = Math.max(-1, Math.min(1, altura / max));
      const meio = 32;
      const h = Math.abs(frac) * 30;
      const y = frac >= 0 ? meio - h : meio;
      return `<svg viewBox="0 0 120 66" width="100%" height="64" role="img" aria-hidden="true">
        <line x1="10" y1="${meio}" x2="110" y2="${meio}" stroke="#4a6fa8" stroke-width="1.5" stroke-dasharray="3 3"/>
        <rect x="44" y="${y}" width="32" height="${Math.max(2, h)}" rx="3" fill="${frac >= 0 ? '#4d9fe0' : '#8a97b5'}"/>
      </svg>`;
    }

    function escalaReal() {
      if (escalaRealAtiva) return;
      escalaRealAtiva = true;
      // Bojo de ~0,5 m num raio de 6.371 km: 7,8e-8 do raio. Some da tela, e
      // é exatamente esse o argumento.
      oceano.scale.set(1, 1, 1);
      setasForca.forEach((s) => { s.visible = false; });
      ctx.legenda.textContent = tm('escalaLegenda');
      cardPraia.nota.textContent = tm('escalaNota');
      return () => {
        escalaRealAtiva = false;
        if (mostrarForcas) setasForca.forEach((s) => { s.visible = true; });
      };
    }

    function aoScrubber(fracao) {
      // O scrubber varre o mês sinódico: a fase da Lua, e com ela a força.
      const alvo = fracao * 360;
      const atual = elongacao(dias);
      const delta = ((alvo - atual + 540) % 360) - 180;
      dias += delta * (MES_SINODICO_DIAS / 360);
      atualizarHud();
    }

    function dispose() {
      controls.dispose();
      descartaveis.forEach((o) => { if (o && o.dispose) o.dispose(); });
      [ctx.hudEsq, ctx.hudDir].forEach((h) => { while (h.firstChild) h.removeChild(h.firstChild); });
    }

    return {
      scene, camera, atualizar, dispose, escalaReal, aoScrubber,
      aoRedimensionar: (w, h) => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      },
      aoEntrarSandbox: () => { if (aoProgresso) aoProgresso('mares-abriu'); },
    };
  }

  function roteiro() {
    return [1, 2, 3, 4, 5].map((i) => ({ texto: tm(`passo${i}`) }));
  }

  const palco = criarPalco({
    motor,
    id: 'mares',
    titulo: () => tm('titulo'),
    construirCena,
    roteiro,
  });

  return {
    abrir: (opcoes) => palco.abrir(opcoes),
    fechar: () => palco.fechar(),
    get aberto() { return palco.aberto; },
  };
}
