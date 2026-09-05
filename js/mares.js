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
import { criarPalco, aplicarTexturaReal, areaSegura, distanciaParaEnquadrar } from './palco.js?v=19';
import { criarTexturaCanvas } from './texturas.js?v=4';
import {
  diasDesdeJ2000, longitudeSolar, longitudeLunar, elongacao, fracaoIluminada,
  nomeDaFase, mareCombinada, alturaRelativa, intervaloEntrePreamaresHoras,
  diaLunarHoras, formatarHoras, MES_SINODICO_DIAS, A_SOL, A_LUA,
  classificarMare, AMP_QUADRATURA, AMP_SIZIGIA, forcaRelativaAMinima, curvaDaPraia,
} from './mares-calc.js?v=3';

const RAD = Math.PI / 180;

// Geometria do palco (unidades de cena, fora de escala por projeto)
// A Terra é o sujeito e o Sol precisa parecer o corpo grande — as duas coisas
// puxam para lados opostos, porque o que cabe na tela é o círculo INTEIRO da
// cena. A saída foi reescalar tudo em vez de escolher: com a órbita da Lua
// mais justa, sobra raio para a Terra E para o Sol dentro do mesmo círculo.
const RAIO_TERRA = 3.0;
const RAIO_ORBITA_LUA = 8.0;
const RAIO_LUA = 0.75;
// O Sol tinha raio 1,6 — MENOR que a Terra (2,0). Numa cena onde ele é a
// segunda força de maré, isso lia errado: parecia um corpo de porte igual ou
// menor. O real é 109× o raio da Terra e não cabe em tela nenhuma; 3,4 é o
// exagero que ainda cabe e já mostra quem é o corpo grande.
const RAIO_SOL = 4.0;
// Distância e tamanho do Sol — um compromisso MEDIDO, não escolhido a olho.
//
// O fato que rege isto: o Sol está 389× mais longe que a Lua e é 400× maior.
// As duas razões quase se cancelam, então vistos da Terra os dois têm
// praticamente o mesmo tamanho — 0,533° contra 0,518° — e é isso que torna
// possível um eclipse total.
//
// Reproduzir essa razão aqui é possível, e foi testado: com o Sol a 36 u a
// proporção sai exata (1,03×). Mas o enquadramento tem de caber a cena
// inteira, e a Terra cai para 7,5% do raio dela — no celular, 26 px. Um
// modo sobre marés em que a Terra é um ponto não ensina nada.
//
// O que foi feito, então: o Sol vai o mais longe que a legibilidade permite,
// e o quanto se perde fica escrito no card em vez de escondido.
//
//   antes:  raio 5,0 a 14,2 u  →  Sol 3,62× a Lua  (Terra em 15,6% da cena)
//   agora:  raio 4,0 a 26,0 u  →  Sol 1,63× a Lua  (Terra em 10,0%)
//   real:                          Sol 1,03× a Lua
//
// A distância continua FIXA. Antes era recalculada por quadro contra a área
// livre da tela e, como a projeção muda quando a câmera gira, o Sol deslizava
// para perto e para longe enquanto o usuário arrastava — parecia bug porque era.
const KM_LUA_ORBITA = 384400;
const KM_LUA_RAIO = 1737.4;
const KM_SOL_ORBITA = 149.6e6;
const KM_SOL_RAIO = 696000;

const RAIO_ORBITA_SOL = 26.0;

/** Quantas vezes o Sol da cena parece maior que a Lua, contra 1,03 do céu real. */
const FIDELIDADE_SOL = (Math.atan(RAIO_SOL / RAIO_ORBITA_SOL) / Math.atan(RAIO_LUA / RAIO_ORBITA_LUA));

/** Quantas vezes a distância Sol–Terra foi encurtada para caber na tela. */
const COMPRESSAO_SOL = (KM_SOL_ORBITA / KM_LUA_ORBITA) / (RAIO_ORBITA_SOL / RAIO_ORBITA_LUA);
// Exagero do bojo. O real é ~0,5 m numa Terra de 12.742 km — 1 parte em 25
// milhões. Sem exagero não há o que ver; daí o selo e o "ver em escala real".
const EXAGERO_BOJO = 0.24;
/** Raio da casca de água. Constante própria porque o marcador da praia
    precisa dela para pousar exatamente sobre a superfície do oceano. */
const RAIO_OCEANO = RAIO_TERRA * 1.005;

/**
 * A geometria do palco, exposta para os testes.
 *
 * Sem isto, `validacao-palco.mjs` precisa achar cada corpo pelo raio literal
 * (`g.radius === 1.6`) — e todo ajuste didático de proporção quebra testes que
 * não têm nada de errado. Com a constante exportada, o teste pergunta em vez
 * de adivinhar.
 */
export const GEOMETRIA = {
  RAIO_TERRA, RAIO_ORBITA_LUA, RAIO_LUA, RAIO_SOL, RAIO_ORBITA_SOL, EXAGERO_BOJO,
  RAIO_OCEANO,
};

const TEXTOS = {
  pt: {
    titulo: 'Marés',
    mareTitulo: 'A maré agora',
    ritmoCurto: 'maré alta a cada {i}',
    sizigia: 'Maré de sizígia — a mais forte',
    quadratura: 'Maré de quadratura — a mais fraca',
    intermediaria: 'Entre a mais forte e a mais fraca',
    nova: 'Nova', quartoCrescente: 'Quarto crescente', cheia: 'Cheia',
    quartoMinguante: 'Quarto minguante', crescenteConcava: 'Crescente côncava',
    crescenteGibosa: 'Crescente gibosa', minguanteGibosa: 'Minguante gibosa',
    minguanteConcava: 'Minguante côncava',
    iluminada: 'iluminada',
    praiaTitulo: 'Sua praia',
    praiaLegenda: 'o ponto laranja girando com a Terra',
    escalaForca: 'vezes a maré mais fraca do mês',
    reguaMorta: 'morta',
    reguaViva: 'viva',
    legendaLua: 'Lua',
    legendaSol: 'Sol',
    notaSoLua: 'Só a força da Lua. Sozinha, ela já estica o oceano nas duas pontas — os dois bojos são dela.',
    notaSoSol: 'Só a força do Sol. Faz a mesma coisa que a Lua, com 46% da força — por isso ele muda a maré, mas não manda nela.',
    camada_lua: 'Só a Lua',
    camada_sol: 'Só o Sol',
    camada_ambos: 'Os dois',
    irSizigia: 'Ir para lua nova',
    irSizigiaCurto: 'Lua nova',
    irQuadratura: 'Ir para o quarto',
    irQuadraturaCurto: 'Quarto',
    solEscala: 'O Sol está {d}× mais longe e {t}× maior que a Lua. Aqui foi aproximado {c}× para caber na tela: no céu real os dois parecem do mesmo tamanho, e é por isso que há eclipses totais.',
    eixosNota: 'As linhas mostram para onde cada um puxa. Quando apontam junto, a maré é forte.',
    curvaNota: 'A curva cobre 26 horas na sua praia, com o agora no meio: duas marés altas e duas baixas.',
    preamar: 'Maré alta',
    baixamar: 'Maré baixa',
    subindo: 'Enchendo',
    descendo: 'Vazando',
    ritmoNota: 'Entre uma maré alta e a seguinte passam {i}. Não são 12 h porque, enquanto a Terra gira, a Lua também avança — a Terra precisa girar um pouco mais para reencontrá-la.',
    saibaMais: 'Por que dois bojos?',
    saibaMenos: 'Ocultar a explicação',
    forcasNota: 'Não é a gravidade da Lua que levanta a água: é a DIFERENÇA dela entre o lado próximo, o centro e o lado distante da Terra. Essa diferença cai com o cubo da distância. Por isso a Lua, muito menor, puxa a maré com o dobro da força do Sol.',
    puxaoPerto: 'perto',
    puxaoCentro: 'centro',
    puxaoLonge: 'longe',
    bojoOpostoTitulo: 'O bojo do lado oposto',
    bojoOpostoCurto: 'A Lua puxa o lado PRÓXIMO mais forte que o centro, e o centro mais forte que o lado DISTANTE.',
    bojoOpostoLongo: 'Do lado próximo, a água é puxada para longe da Terra. Do lado distante acontece o contrário: a TERRA é puxada para longe da água, que fica para trás. Nos dois casos sobra água nas pontas — dois bojos, não um. Não é a Lua levantando o mar dos dois lados: é ela esticando a Terra inteira.',
    razaoNota: 'Maré da Lua: {r}× a do Sol',
    passo1: 'A Lua puxa a água da Terra. Do lado voltado para ela, o mar sobe.',
    passo2: 'E do lado oposto o mar também sobe. São dois bojos, não um.',
    passo3: 'A razão: a Lua não puxa a Terra inteira por igual. O lado próximo é puxado mais que o centro, e o centro mais que o lado distante. Essa diferença estica a água nas duas pontas.',
    passo4: 'A Terra gira por baixo dos dois bojos. Por isso a sua praia passa por duas marés altas a cada volta.',
    passo5: 'O Sol também puxa. Na lua nova e na cheia as duas forças se somam, e a maré fica mais forte. Nos quartos elas se opõem, e a maré fica mais fraca.',
  },
  en: {
    titulo: 'Tides',
    mareTitulo: 'The tide now',
    ritmoCurto: 'high tide every {i}',
    sizigia: 'Spring tide — the strongest',
    quadratura: 'Neap tide — the weakest',
    intermediaria: 'Between the strongest and the weakest',
    nova: 'New', quartoCrescente: 'First quarter', cheia: 'Full',
    quartoMinguante: 'Last quarter', crescenteConcava: 'Waxing crescent',
    crescenteGibosa: 'Waxing gibbous', minguanteGibosa: 'Waning gibbous',
    minguanteConcava: 'Waning crescent',
    iluminada: 'lit',
    praiaTitulo: 'Your beach',
    praiaLegenda: 'the orange dot turning with Earth',
    escalaForca: 'times the month’s weakest tide',
    reguaMorta: 'neap',
    reguaViva: 'spring',
    legendaLua: 'Moon',
    legendaSol: 'Sun',
    notaSoLua: 'The Moon’s pull alone. By itself it already stretches the ocean at both ends — both bulges are hers.',
    notaSoSol: 'The Sun’s pull alone. It does the same as the Moon with 46% of the force — enough to change the tide, not to rule it.',
    camada_lua: 'Moon only',
    camada_sol: 'Sun only',
    camada_ambos: 'Both',
    irSizigia: 'Go to new Moon',
    irSizigiaCurto: 'New Moon',
    irQuadratura: 'Go to first quarter',
    irQuadraturaCurto: 'Quarter',
    solEscala: 'The Sun is {d}× farther and {t}× larger than the Moon. Here it was brought {c}× closer to fit: in the real sky the two look the same size, which is why total eclipses happen.',
    eixosNota: 'The lines show where each one pulls. When they point together, the tide is strong.',
    curvaNota: 'The curve covers 26 hours at your beach, with now in the middle: two high tides and two low ones.',
    preamar: 'High tide',
    baixamar: 'Low tide',
    subindo: 'Rising',
    descendo: 'Falling',
    ritmoNota: 'Between one high tide and the next, {i} go by. Not 12 h, because while Earth turns the Moon also moves ahead — Earth has to turn a little further to meet it again.',
    saibaMais: 'Why two bulges?',
    saibaMenos: 'Hide the explanation',
    forcasNota: 'It is not the Moon’s gravity that lifts the water: it is the DIFFERENCE in it between the near side, the centre and the far side of Earth. That difference falls with the cube of distance. This is why the Moon, far smaller, pulls the tide twice as strongly as the Sun.',
    puxaoPerto: 'near',
    puxaoCentro: 'centre',
    puxaoLonge: 'far',
    bojoOpostoTitulo: 'The bulge on the far side',
    bojoOpostoCurto: 'The Moon pulls the NEAR side harder than the centre, and the centre harder than the FAR side.',
    bojoOpostoLongo: 'On the near side, the water is pulled away from Earth. On the far side the opposite happens: the EARTH is pulled away from the water, which is left behind. Either way water piles up at both ends — two bulges, not one. It is not the Moon lifting the sea on both sides: it is the Moon stretching the whole Earth.',
    razaoNota: 'Moon’s tide: {r}× the Sun’s',
    passo1: 'The Moon pulls Earth’s water. On the side facing it, the sea rises.',
    passo2: 'And on the opposite side the sea rises too. There are two bulges, not one.',
    passo3: 'The reason: the Moon does not pull the whole Earth equally. The near side is pulled more than the centre, and the centre more than the far side. That difference stretches the water at both ends.',
    passo4: 'Earth turns underneath the two bulges. That is why your beach passes through two high tides each turn.',
    passo5: 'The Sun pulls as well. At new and full Moon the two forces add up and the tide is stronger. At the quarters they oppose each other and the tide is weaker.',
  },
  es: {
    titulo: 'Mareas',
    mareTitulo: 'La marea ahora',
    ritmoCurto: 'marea alta cada {i}',
    sizigia: 'Marea viva — la más fuerte',
    quadratura: 'Marea muerta — la más débil',
    intermediaria: 'Entre la más fuerte y la más débil',
    nova: 'Nueva', quartoCrescente: 'Cuarto creciente', cheia: 'Llena',
    quartoMinguante: 'Cuarto menguante', crescenteConcava: 'Creciente cóncava',
    crescenteGibosa: 'Creciente gibosa', minguanteGibosa: 'Menguante gibosa',
    minguanteConcava: 'Menguante cóncava',
    iluminada: 'iluminada',
    praiaTitulo: 'Tu playa',
    praiaLegenda: 'el punto naranja girando con la Tierra',
    escalaForca: 'veces la marea más débil del mes',
    reguaMorta: 'muerta',
    reguaViva: 'viva',
    legendaLua: 'Luna',
    legendaSol: 'Sol',
    notaSoLua: 'Solo la fuerza de la Luna. Ella sola ya estira el océano en los dos extremos — los dos abultamientos son suyos.',
    notaSoSol: 'Solo la fuerza del Sol. Hace lo mismo que la Luna con el 46% de la fuerza — cambia la marea, pero no manda en ella.',
    camada_lua: 'Solo la Luna',
    camada_sol: 'Solo el Sol',
    camada_ambos: 'Los dos',
    irSizigia: 'Ir a luna nueva',
    irSizigiaCurto: 'Luna nueva',
    irQuadratura: 'Ir al cuarto',
    irQuadraturaCurto: 'Cuarto',
    solEscala: 'El Sol está {d}× más lejos y es {t}× mayor que la Luna. Aquí fue acercado {c}× para caber: en el cielo real los dos se ven del mismo tamaño, y por eso hay eclipses totales.',
    eixosNota: 'Las líneas muestran hacia dónde tira cada uno. Cuando apuntan juntas, la marea es fuerte.',
    curvaNota: 'La curva cubre 26 horas en tu playa, con el ahora en el medio: dos mareas altas y dos bajas.',
    preamar: 'Marea alta',
    baixamar: 'Marea baja',
    subindo: 'Subiendo',
    descendo: 'Bajando',
    ritmoNota: 'Entre una marea alta y la siguiente pasan {i}. No son 12 h porque, mientras la Tierra gira, la Luna también avanza — la Tierra debe girar un poco más para reencontrarla.',
    saibaMais: '¿Por qué dos abultamientos?',
    saibaMenos: 'Ocultar la explicación',
    forcasNota: 'No es la gravedad de la Luna la que levanta el agua: es la DIFERENCIA de ella entre el lado cercano, el centro y el lado lejano de la Tierra. Esa diferencia cae con el cubo de la distancia. Por eso la Luna, mucho menor, tira de la marea con el doble de fuerza que el Sol.',
    puxaoPerto: 'cerca',
    puxaoCentro: 'centro',
    puxaoLonge: 'lejos',
    bojoOpostoTitulo: 'El abultamiento del lado opuesto',
    bojoOpostoCurto: 'La Luna tira del lado CERCANO más fuerte que del centro, y del centro más que del lado LEJANO.',
    bojoOpostoLongo: 'En el lado cercano, el agua es atraída lejos de la Tierra. En el lado lejano pasa lo contrario: es la TIERRA la que es atraída lejos del agua, que se queda atrás. En ambos casos sobra agua en las puntas — dos abultamientos, no uno. No es la Luna levantando el mar de los dos lados: es ella estirando la Tierra entera.',
    razaoNota: 'Marea de la Luna: {r}× la del Sol',
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
    // Camada de bojo em exibição: 'ambos' (o real), 'lua' ou 'sol'.
    // Ver as duas forças isoladas e depois somadas é o que explica a maré
    // viva e a morta — em quadratura uma cancela a outra porque estão a 90°,
    // e em sizígia se somam porque apontam junto. Com os dois sempre
    // sobrepostos, o usuário vê só o resultado e tem de acreditar na conta.
    let camada = 'ambos';
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
    camera.position.set(0, 36, 0.01);

    const controls = new OrbitControls(camera, motor.canvas);
    // A Terra é o assunto deste modo, e fica fixa no centro: arrastar move a
    // câmera EM VOLTA dela (girar, ver de cima, ver de lado) e a roda aproxima
    // ou afasta, mas nada tira a Terra do meio. Sem isto, um arrasto lateral
    // empurrava o planeta para fora do quadro e a cena perdia o sujeito —
    // liberdade que não servia a nada aqui.
    controls.enablePan = false;
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 6;
    controls.maxDistance = 120;

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
    aplicarTexturaReal(motor.renderer, 'terra', matTerra, reg);

    // ————— oceano: elipsoide prolato alinhado ao eixo dos bojos —————
    const oceano = new THREE.Mesh(
      reg(new THREE.SphereGeometry(RAIO_OCEANO, 64, 48)),
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
    aplicarTexturaReal(motor.renderer, 'lua', matLua, reg);

    // Órbita da Lua
    const ptsOrbita = [];
    for (let i = 0; i <= 128; i++) {
      ptsOrbita.push(direcaoLongitude((i / 128) * 360).multiplyScalar(RAIO_ORBITA_LUA));
    }
    scene.add(new THREE.Line(
      reg(new THREE.BufferGeometry().setFromPoints(ptsOrbita)),
      reg(new THREE.LineBasicMaterial({ color: 0x4a6fa8, transparent: true, opacity: 0.4 })),
    ));

    // O Sol, de verdade. Na proporção real ele estaria a 390× a distância da
    // Lua e nunca caberia aqui — então entra na borda da cena, sob o mesmo
    // selo "fora de escala" que vale para todo o palco. Sem ele, a metade
    // solar da história (sizígia e quadratura) não tinha o que apontar.
    const corpoSol = corpos.find((c) => c.id === 'sol') || { id: 'sol', aparencia: { tipo: 'estrela' } };
    const matSol = reg(new THREE.MeshBasicMaterial({
      map: reg(new THREE.CanvasTexture(criarTexturaCanvas(corpoSol))),
    }));
    const sol = new THREE.Mesh(reg(new THREE.SphereGeometry(RAIO_SOL, 48, 32)), matSol);
    scene.add(sol);
    aplicarTexturaReal(motor.renderer, 'sol', matSol, reg);

    // Raios do Sol até a Terra: mostram de onde vem a segunda força de maré
    const geoRaios = reg(new THREE.BufferGeometry());
    geoRaios.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6 * 3), 3));
    const raiosSol = new THREE.LineSegments(
      geoRaios,
      reg(new THREE.LineBasicMaterial({ color: 0xffd479, transparent: true, opacity: 0.35 })),
    );
    scene.add(raiosSol);

    // Eixos das DUAS contribuições, para sizígia e quadratura ficarem visíveis
    // em vez de só numéricas: em lua nova/cheia os dois se sobrepõem, nos
    // quartos ficam a 90°. O comprimento é proporcional à amplitude de cada.
    function criarEixoBojo(cor, opacidade) {
      const g = reg(new THREE.BufferGeometry());
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(2 * 3), 3));
      const linha = new THREE.Line(g, reg(new THREE.LineBasicMaterial({
        color: cor, transparent: true, opacity: opacidade,
      })));
      scene.add(linha);
      return { linha, g };
    }
    const eixoLua = criarEixoBojo(0x9ec5ff, 0.9);
    const eixoSolBojo = criarEixoBojo(0xffd479, 0.85);

    function atualizarEixoBojo(alvo, longitude, amplitude) {
      const d = direcaoLongitude(longitude);
      const r = RAIO_TERRA * (1.15 + amplitude * 1.05);
      const pos = alvo.g.attributes.position;
      pos.setXYZ(0, -d.x * r, 0, -d.z * r);
      pos.setXYZ(1, d.x * r, 0, d.z * r);
      pos.needsUpdate = true;
    }

    // Marcador "sua praia"
    const praia = new THREE.Mesh(
      reg(new THREE.SphereGeometry(RAIO_TERRA * 0.085, 16, 12)),
      reg(new THREE.MeshBasicMaterial({ color: 0xff8a5c })),
    );
    scene.add(praia);

    // Enquadramento. A primeira versão mandava caber o círculo inteiro,
    // incluindo o Sol no raio fixo de 12,6 — e a câmera recuava de 36 para
    // 43,9, encolhendo a Terra em 22%. A Terra é o SUJEITO da cena: os dois
    // bojos são o que se veio ver, e a 60 px de diâmetro eles somem.
    //
    // O que precisa caber de verdade é a órbita da Lua, cujo raio significa
    // alguma coisa. O Sol só indica uma DIREÇÃO: pode ceder distância e se
    // acomodar na borda livre, desde que nunca entre na órbita da Lua.
    // Tudo o que precisa caber: o Sol no seu raio fixo, mais o disco dele.
    // Como a câmera nasce de topo puro — o ângulo em que este círculo projeta
    // MAIOR —, enquadrar aqui cobre o pior caso: girar depois só achata a
    // elipse, nunca aumenta. Por isso nada precisa ser recalculado por quadro.
    const RAIO_DA_CENA = RAIO_ORBITA_SOL + RAIO_SOL;

    let areaAtual = null;

    function enquadrar() {
      const overlay = document.getElementById('palco-mares');
      if (!overlay || overlay.hidden) return;
      areaAtual = areaSegura(overlay);
      camera.position.setLength(distanciaParaEnquadrar(camera, RAIO_DA_CENA, areaAtual));
      camera.updateProjectionMatrix();
      controls.update();
    }

    // ————— vetores de força diferencial (só no "Saiba mais") —————
    // Mostram o que a fórmula diz: para fora nas duas pontas, para dentro nos
    // lados. É a resposta rigorosa, e por isso fica fora da superfície.
    const setasForca = [];
    for (let i = 0; i < 12; i++) {
      const seta = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, 0x9ec5ff, RAIO_TERRA * 0.14, RAIO_TERRA * 0.08);
      seta.visible = false;
      scene.add(seta);
      setasForca.push(seta);
    }

    // ————— HUD —————
    // Um card por coluna, não quatro.
    //
    // Com "Força da maré" + "Fase da Lua" à esquerda e "Sua praia" + "Ritmo" à
    // direita, o celular ficava com quatro caixas espremidas e o texto de cada
    // uma cortado. Fase e força são a MESMA informação vista de dois ângulos
    // (a fase determina o ângulo entre Lua e Sol, que determina a força), e o
    // ritmo é uma leitura da curva da praia. Juntando, cada coluna tem um card
    // compacto — e todo o texto explicativo migra para o painel "Saiba mais",
    // que é largo e tem espaço para ele.
    const cardMare = criarCard(ctx.hudEsq);
    const cardPraia = criarCard(ctx.hudDir);

    // ————— seletor de camada —————
    // Três estados em vez de um interruptor: o usuário isola cada força e
    // depois vê a soma. É a diferença entre "confie na conta" e "veja por quê".
    const seletorCamada = document.createElement('div');
    seletorCamada.className = 'palco-segmentado';
    seletorCamada.setAttribute('role', 'group');
    const botoesCamada = ['lua', 'sol', 'ambos'].map((qual) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'palco-segmento';
      b.dataset.camada = qual;
      b.onclick = () => {
        camada = qual;
        atualizarHud();
      };
      seletorCamada.appendChild(b);
      return b;
    });
    ctx.hudEsq.appendChild(seletorCamada);

    // ————— atalhos de fase —————
    // Dois toques valem mais que três frases: em lua nova as linhas coincidem
    // e a maré vai ao máximo; no quarto elas cruzam a 90° e vai ao mínimo.
    //
    // Moram no RODAPÉ, não na coluna: os dois pulam no tempo, exatamente como
    // a barra de datas ao lado deles. Na coluna, eram um terceiro bloco
    // empilhado sobre o card — em paisagem de celular sobrava altura para dois,
    // e o card da maré é que fechava para caber.
    const atalhos = document.createElement('div');
    atalhos.className = 'palco-atalhos';
    const btnSizigia = document.createElement('button');
    const btnQuadratura = document.createElement('button');
    [btnSizigia, btnQuadratura].forEach((b) => {
      b.type = 'button';
      b.className = 'palco-btn palco-btn-pequeno';
      atalhos.appendChild(b);
    });
    btnSizigia.onclick = () => irParaElongacao(0);
    btnQuadratura.onclick = () => irParaElongacao(90);
    ctx.rodapeAcoes.appendChild(atalhos);

    /** Move o tempo até a Lua estar na elongação pedida (0 = nova, 90 = quarto). */
    function irParaElongacao(alvoGraus) {
      const atual = elongacao(dias);
      const delta = ((alvoGraus - atual + 540) % 360) - 180;
      dias += delta * (MES_SINODICO_DIAS / 360);
      atualizarHud();
    }

    const btnForcas = document.createElement('button');
    btnForcas.className = 'palco-btn';
    btnForcas.onclick = () => {
      mostrarForcas = !mostrarForcas;
      cardForcas.raiz.hidden = !mostrarForcas;
      atualizarHud();
    };
    ctx.rodapeAcoes.appendChild(btnForcas);
    // A explicação NÃO é um card de coluna: com diagrama e texto ela passa de
    // 330px e era sempre a última da pilha, então cortava — justamente a
    // resposta que a pessoa acabou de pedir. Vira painel central sobre a cena,
    // como o roteiro guiado, onde há espaço. Mantém a classe `palco-card` para
    // herdar o fundo e o contraste (e para os testes acharem por ela).
    const cardForcas = (() => {
      const el = document.createElement('div');
      el.className = 'palco-card palco-explicacao';
      // Botão de fechar no próprio painel: com ele aberto sobre a cena, o
      // caminho de saída tem de estar onde o olho já está, e não só na barra
      // de baixo. O botão do rodapé continua funcionando.
      el.innerHTML = '<button class="palco-explicacao-fechar" type="button">'
        + '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">'
        + '<path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'
        + '</svg></button>'
        + '<p class="palco-card-titulo"></p>'
        + '<div class="palco-explicacao-corpo">'
        + '<div class="palco-card-valor"></div><p class="palco-card-nota"></p></div>';
      (document.getElementById('palco-mares') || document.body).appendChild(el);
      descartaveis.push({ dispose: () => el.remove() });
      return {
        raiz: el,
        titulo: el.querySelector('.palco-card-titulo'),
        valor: el.querySelector('.palco-card-valor'),
        nota: el.querySelector('.palco-card-nota'),
      };
    })();
    cardForcas.raiz.hidden = true;
    cardForcas.raiz.querySelector('.palco-explicacao-fechar').onclick = () => {
      mostrarForcas = false;
      cardForcas.raiz.hidden = true;
      atualizarHud();
    };

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
      // A maré da camada escolhida. 'lua' e 'sol' passam a MESMA longitude nos
      // dois argumentos, o que zera a contribuição do outro corpo sem precisar
      // de um segundo caminho de cálculo — é a mesma função de sempre.
      const mare = camada === 'lua' ? mareCombinada(lamLua, lamLua, 1, 0)
        : camada === 'sol' ? mareCombinada(lamSol, lamSol, 0, 1)
          : mareCombinada(lamLua, lamSol);
      const { amplitude, eixoGraus } = mare;

      const dirSol = direcaoLongitude(lamSol);
      luzSol.position.copy(dirSol).multiplyScalar(50);
      // O Sol fica na borda; os raios ligam ele à Terra, para a segunda
      // força de maré ter de onde vir na tela.
      const posSol = dirSol.clone().multiplyScalar(RAIO_ORBITA_SOL);
      sol.position.copy(posSol);
      const pr = geoRaios.attributes.position;
      for (let i = 0; i < 3; i++) {
        const desloc = new THREE.Vector3(-dirSol.z, 0, dirSol.x).multiplyScalar((i - 1) * RAIO_SOL * 0.62);
        const a = posSol.clone().add(desloc).addScaledVector(dirSol, -RAIO_SOL);
        const bb = desloc.clone().addScaledVector(dirSol, RAIO_TERRA * 1.4);
        pr.setXYZ(i * 2, a.x, a.y, a.z);
        pr.setXYZ(i * 2 + 1, bb.x, bb.y, bb.z);
      }
      pr.needsUpdate = true;

      lua.position.copy(direcaoLongitude(lamLua).multiplyScalar(RAIO_ORBITA_LUA));

      // Oceano deformado: prolato ao longo do eixo dos bojos. O eixo é o do
      // conjunto Lua+Sol, não o da Lua — por isso em fase intermediária ele
      // fica ENTRE os dois. Em escala real, não há exagero — o oceano fica
      // esférico.
      const e = EXAGERO_BOJO * amplitude;
      oceano.scale.set(1 + e, 1 - e / 2, 1 - e / 2);
      oceano.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), direcaoLongitude(eixoGraus));

      // Rotação da Terra e a praia sobre ela.
      //
      // O sinal importa e estava errado: uma rotação de +θ em Y leva um ponto
      // de (1,0,0) para (cos θ, 0, −sin θ), que é exatamente direcaoLongitude(θ)
      // — a mesma fórmula que posiciona a praia. Com `-anguloTerra` o globo
      // girava para um lado e o marcador para o outro.
      const anguloTerra = (dias * 360) / (23.9345 / 24);
      terra.rotation.y = anguloTerra * RAD;
      const lonPraia = anguloTerra % 360;
      const dirPraia = direcaoLongitude(lonPraia);
      // ψ: ângulo entre a praia e o eixo dos bojos
      const psi = ((lonPraia - eixoGraus) % 360 + 360) % 360;
      const altura = alturaRelativa(psi, amplitude);

      // O marcador tem de ficar SOBRE a água, e a água é um elipsoide.
      //
      // Antes ele era posto num raio fixo — RAIO_TERRA × (1 + e), a altura do
      // BOJO — independentemente de onde estivesse. Onde a maré está alta isso
      // coincide com a superfície; a 90° dali o oceano está em (1 − e/2) e o
      // marcador ficava boiando acima dele. E como `e` depende da amplitude,
      // trocar de camada (só a Lua / só o Sol / os dois) mudava o tamanho da
      // discrepância — foi assim que o defeito apareceu.
      //
      // O raio de um elipsoide de semi-eixos a e b, na direção que faz ângulo
      // ψ com o eixo maior, é ab / √((b·cosψ)² + (a·sinψ)²). Usando o mesmo a
      // e b que deformam a malha do oceano, o marcador fica exatamente na
      // superfície para qualquer exagero e qualquer camada.
      const psiRad = psi * RAD;
      const semiMaior = RAIO_OCEANO * (1 + e);
      const semiMenor = RAIO_OCEANO * (1 - e / 2);
      const raioNaPraia = (semiMaior * semiMenor) / Math.hypot(
        semiMenor * Math.cos(psiRad),
        semiMaior * Math.sin(psiRad),
      );
      praia.position.copy(dirPraia).multiplyScalar(raioNaPraia);

      // Cada corpo puxa por si; o oceano responde à soma. Ver os três ao
      // mesmo tempo é o que explica a maré viva e a morta.
      atualizarEixoBojo(eixoLua, lamLua, A_LUA);
      atualizarEixoBojo(eixoSolBojo, lamSol, A_SOL);

      // Com a escala real no ar, TUDO que é exagero tem de sumir: o bojo, as
      // setas e as linhas de eixo (cujo comprimento é proporcional ao exagero).
      // Senão o botão que existe pra provar honestidade vira a prova do contrário.
      if (mostrarForcas) atualizarSetasForca(eixoGraus);
      else setasForca.forEach((s) => { s.visible = false; });

      // A linha de cada corpo só aparece quando a força dele está em cena
      eixoLua.linha.visible = camada !== 'sol';
      eixoSolBojo.linha.visible = camada !== 'lua';

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
        const comprimento = RAIO_TERRA * (0.175 + Math.abs(h) * 0.75);

        if (paraFora) {
          // Seta para fora: nasce na superfície, aponta para fora
          seta.position.copy(dir).multiplyScalar(RAIO_TERRA * 1.06);
          seta.setDirection(dir);
        } else {
          // Seta para dentro: a cauda passa a estar deslocada para fora e o
          // corpo termina na superfície, apontando para o centro. Assim a seta
          // inteira fica FORA do globo opaco, não invisível dentro dele.
          seta.position.copy(dir).multiplyScalar(RAIO_TERRA * 1.06 + comprimento);
          seta.setDirection(dir.clone().negate());
        }

        seta.setLength(comprimento, RAIO_TERRA * 0.14, RAIO_TERRA * 0.08);
        seta.setColor(paraFora ? 0x7ad4ff : 0x8a97b5);
        seta.visible = true;
      });
    }

    // Régua horizontal mostrando a escala de força da maré de quadratura (morta)
    // até sizígia (viva), com o marcador na posição atual.
    /**
     * Diagrama da resposta: por que há bojo do lado oposto.
     *
     * Duas linhas. Em cima, os TRÊS puxões da Lua sobre pontos diferentes da
     * Terra, com comprimentos decrescentes — perto, centro, longe. Embaixo, o
     * resultado: a Terra esticada nas duas pontas. Separar as duas linhas foi
     * deliberado; desenhar as setas por cima do globo deixava tudo ilegível
     * num card de 260px.
     */
    function svgTresPuxoes() {
      const puxoes = [
        { x: 8, comp: 30, rot: tm('puxaoPerto') },
        { x: 8, comp: 21, rot: tm('puxaoCentro') },
        { x: 8, comp: 13, rot: tm('puxaoLonge') },
      ];
      const linhas = puxoes.map((s, k) => {
        const y = 10 + k * 13;
        return `<line x1="${s.x}" y1="${y}" x2="${s.x + s.comp}" y2="${y}" stroke="#9ec5ff" stroke-width="2.2"/>
          <path d="M${s.x + s.comp} ${y} l-5 -3.5 v7 z" fill="#9ec5ff"/>
          <text x="${s.x + 36}" y="${y + 3}" font-size="8" fill="#93a0b8">${s.rot}</text>`;
      }).join('');
      return `<svg viewBox="0 0 120 82" width="100%" height="82" role="img"
        aria-label="${tm('bojoOpostoCurto')}">
        ${linhas}
        <circle cx="96" cy="23" r="6" fill="#cbd5e8"/>
        <text x="96" y="40" font-size="8" fill="#93a0b8" text-anchor="middle">${tm('legendaLua')}</text>
        <line x1="6" y1="52" x2="114" y2="52" stroke="#25324a" stroke-width="1"/>
        <ellipse cx="46" cy="67" rx="26" ry="12" fill="none" stroke="#5fb8ff" stroke-width="1.6"/>
        <circle cx="46" cy="67" r="11" fill="none" stroke="#4a6fa8" stroke-width="1.4"/>
        <circle cx="100" cy="67" r="5" fill="#cbd5e8"/>
      </svg>`;
    }

    function svgRegua(amplitude) {
      const t = Math.max(0, Math.min(1, (forcaRelativaAMinima(amplitude) - 1) / (AMP_SIZIGIA / AMP_QUADRATURA - 1)));
      const x = 6 + t * 108;
      return `<svg viewBox="0 0 120 26" width="100%" height="26" xmlns="http://www.w3.org/2000/svg">
        <line x1="6" y1="9" x2="114" y2="9" stroke="#3a4a68" stroke-width="3" stroke-linecap="round"/>
        <circle cx="${x}" cy="9" r="5" fill="#7aa2ff" stroke="#0b101c" stroke-width="1.5"/>
        <text x="6" y="24" font-size="9" fill="#93a0b8">${tm('reguaMorta')}</text>
        <text x="114" y="24" font-size="9" fill="#93a0b8" text-anchor="end">${tm('reguaViva')}</text>
      </svg>`;
    }

    // Curva da maré ao longo de 26 horas, mostrando dois ciclos de alta/baixa.
    function svgCurvaMare(dias, altura, amplitude) {
      const pontos = curvaDaPraia(dias, 26, 96);
      if (pontos.length === 0) return '';

      // Mapeia coordenadas dos pontos para a viewport SVG
      const maxAmplitude = AMP_SIZIGIA;
      const xs = pontos.map((p, i) => 4 + (i / (pontos.length - 1)) * 112);
      const ys = pontos.map((p) => {
        const frac = Math.max(-1, Math.min(1, p.altura / maxAmplitude));
        return 30 - (frac * 24);
      }).map((y) => Math.max(4, Math.min(56, y)));

      // Cria a polilinha da curva
      let points = '';
      for (let i = 0; i < xs.length; i++) {
        points += `${xs[i]},${ys[i]} `;
      }

      // Encontra o ponto mais próximo de t=0 (agora) no array
      let indiceCentro = Math.round(pontos.length / 2);
      let melhorI = indiceCentro;
      let melhorDist = Math.abs(pontos[indiceCentro].h);
      for (let i = 0; i < pontos.length; i++) {
        const dist = Math.abs(pontos[i].h);
        if (dist < melhorDist) {
          melhorDist = dist;
          melhorI = i;
        }
      }

      // Encontra os dois maiores máximos locais em y (mínimos em altura, já que y cresce para baixo)
      const maximos = [];
      for (let i = 1; i < ys.length - 1; i++) {
        if (ys[i] < ys[i - 1] && ys[i] < ys[i + 1]) {
          maximos.push(i);
        }
      }
      maximos.sort((a, b) => ys[a] - ys[b]);
      const marcarX = maximos.slice(0, 2).map((i) => xs[i]);

      // Determina o estado atual para o aria-label
      const subindoAgora = alturaAnterior !== null && altura > alturaAnterior;
      const pertoAgora = Math.abs(altura) > amplitude * 0.75;
      const estadoLabel = pertoAgora
        ? (altura > 0 ? tm('preamar') : tm('baixamar'))
        : (subindoAgora ? tm('subindo') : tm('descendo'));

      // SVG
      let svg = `<svg viewBox="0 0 120 60" width="100%" height="60" role="img" aria-label="${estadoLabel}. ${num(forcaRelativaAMinima(amplitude), 1)} ${tm('escalaForca')}" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="30" x2="116" y2="30" stroke="#3a4a68" stroke-width="1" stroke-dasharray="3 3"/>
        <polyline points="${points.trim()}" fill="none" stroke="#4d9fe0" stroke-width="2" stroke-linejoin="round"/>`;

      // Marcador do ponto atual (instante central) em laranja
      svg += `<circle cx="${xs[melhorI]}" cy="${ys[melhorI]}" r="3.5" fill="#ff8a5c"/>`;

      // Marcas nos maiores máximos
      for (const mx of marcarX) {
        svg += `<line x1="${mx}" y1="4" x2="${mx}" y2="56" stroke="#4d9fe0" stroke-width="1" opacity="0.35"/>`;
      }

      svg += '</svg>';
      return svg;
    }

    function atualizarHud(lamSol, lamLua, amplitude, altura, psi) {
      if (amplitude === undefined) {
        const s = longitudeSolar(dias);
        const l = longitudeLunar(dias);
        const m = mareCombinada(l, s);
        return atualizarHud(s, l, m.amplitude, alturaRelativa(0, m.amplitude), 0);
      }

      // Força da maré: classificação usando a mesma régua que a fase lunar
      // para que os dois rótulos nunca se contradigam (mudança 1).
      const classe = classificarMare(dias);
      const classeTexto = classe === 'sizigia' ? tm('sizigia')
        : classe === 'quadratura' ? tm('quadratura') : tm('intermediaria');

      cardMare.titulo.textContent = tm('mareTitulo');

      const fase = nomeDaFase(dias);
      const notaCamada = camada === 'lua' ? tm('notaSoLua')
        : camada === 'sol' ? tm('notaSoSol') : null;

      cardMare.valor.innerHTML = `<div>${num(forcaRelativaAMinima(amplitude), 1)}×</div>`
        + `<div class="palco-card-sub">${tm('escalaForca')}</div>`
        + svgRegua(amplitude)
        + `<div class="palco-legenda-cores" title="${tm('eixosNota')}">`
        + `<span><i style="background:#9ec5ff"></i>${tm('legendaLua')}</span>`
        + `<span><i style="background:#ffd479"></i>${tm('legendaSol')}</span>`
        + `</div>`;

      // Uma linha, não um parágrafo: a classificação da maré e a fase que a
      // explica. O resto do texto vive no painel "Saiba mais".
      cardMare.nota.textContent = notaCamada
        || `${classeTexto} · ${tm(fase)}, ${num(fracaoIluminada(dias) * 100, 0)}% ${tm('iluminada')}`;

      cardMare.raiz.classList.toggle('palco-card-alerta',
        !notaCamada && (classe === 'sizigia' || classe === 'quadratura'));

      // Um marco por vez, como o modo Estações faz: progresso.js guarda os
      // ids distintos e a badge sai quando os dois apareceram.
      const marcoAtual = classe === 'sizigia' ? 'sizigia' : classe === 'quadratura' ? 'quadratura' : null;
      if (marcoAtual && !marcosVistos.has(marcoAtual)) {
        marcosVistos.add(marcoAtual);
        if (aoProgresso) aoProgresso('mares-marco', { id: marcoAtual });
      }

      // Sua praia: curva de 26 horas com dois ciclos (mudança 4)
      // Bolinha na mesma cor do marcador na cena: sem isso, o ponto laranja
      // girando não se identifica com o card que mostra a maré dele.
      // Bolinha e nome num span só: soltos, viravam dois itens do flex do
      // título e o `space-between` mandava um para cada ponta do card.
      cardPraia.titulo.innerHTML =
        `<span><span style="color:#ff8a5c">●</span> ${tm('praiaTitulo')}</span>`
        + `<span class="palco-titulo-extra">— ${tm('praiaLegenda')}</span>`;
      cardPraia.valor.innerHTML = svgCurvaMare(dias, altura, amplitude);
      const subindo = alturaAnterior !== null && altura > alturaAnterior;
      const perto = Math.abs(altura) > amplitude * 0.75;
      const estado = perto
        ? (altura > 0 ? tm('preamar') : tm('baixamar'))
        : (subindo ? tm('subindo') : tm('descendo'));
      const intervalo = formatarHoras(intervaloEntrePreamaresHoras());
      // O ritmo era um card só para si, mas é uma leitura desta mesma curva:
      // as duas cristas que aparecem no gráfico estão a 12h25 uma da outra.
      cardPraia.nota.innerHTML = `<div class="palco-nota-longa">${tm('curvaNota')}</div>`
        + `${estado} · ${tm('ritmoCurto').replace('{i}', intervalo)}`;

      // Saiba mais
      botoesCamada.forEach((b) => {
        b.textContent = tm(`camada_${b.dataset.camada}`);
        const ativo = b.dataset.camada === camada;
        b.classList.toggle('ativo', ativo);
        b.setAttribute('aria-pressed', String(ativo));
      });
      // No rodapé, ao lado da barra de datas, o rótulo curto basta — e o longo
      // continua no aria-label, para quem ouve a tela em vez de ver.
      btnSizigia.textContent = tm('irSizigiaCurto');
      btnSizigia.setAttribute('aria-label', tm('irSizigia'));
      btnQuadratura.textContent = tm('irQuadraturaCurto');
      btnQuadratura.setAttribute('aria-label', tm('irQuadratura'));

      btnForcas.textContent = mostrarForcas ? tm('saibaMenos') : tm('saibaMais');
      cardForcas.titulo.textContent = tm('bojoOpostoTitulo');
      // O diagrama é a resposta; o texto só a põe em palavras. Três setas de
      // comprimentos diferentes sobre a Terra e a Lua mostram o mecanismo
      // inteiro: o puxão cai com a distância, e é a DIFERENÇA entre eles que
      // sobra. Sem isto, "o outro bojo" ficava sendo uma afirmação a decorar.
      cardForcas.valor.innerHTML = svgTresPuxoes()
        + `<div class="palco-card-sub">${tm('bojoOpostoCurto')}</div>`
        + `<div style="font-size:15px;font-weight:600">${tm('razaoNota').replace('{r}', num(A_LUA / A_SOL, 1))}</div>`;
      // O essencial — diagrama + frase curta — fica sempre. Os dois parágrafos
      // de aprofundamento são `palco-nota-longa`: somem em tela baixa, onde
      // senão o card corta justamente no meio da resposta.
      // O painel recebeu o texto que antes espremia os cards das colunas: a
      // explicação das linhas coloridas, o ritmo de 12h25 e a escala do Sol.
      // Aqui há largura para eles; lá não havia.
      cardForcas.nota.innerHTML = `<p style="margin:0 0 6px">${tm('bojoOpostoLongo')}</p>`
        + `<p style="margin:0 0 6px">${tm('forcasNota')}</p>`
        + `<p style="margin:0 0 6px">${tm('eixosNota')}</p>`
        + `<p style="margin:0 0 6px">${tm('ritmoNota').replace('{i}', formatarHoras(intervaloEntrePreamaresHoras()))}</p>`
        + `<p style="margin:0">${tm('solEscala')
          .replace('{d}', num(KM_SOL_ORBITA / KM_LUA_ORBITA, 0))
          .replace('{t}', num(KM_SOL_RAIO / KM_LUA_RAIO, 0))
          .replace('{c}', num(COMPRESSAO_SOL, 0))
          .replace('{f}', num(FIDELIDADE_SOL, 1))}</p>`;

      // Ver comentário equivalente em estacoes.js: com "ver em escala real"
      // ligado, a legenda é dele, não da data.
      {
        const data = new Date(new Date('2000-01-01T12:00:00Z').getTime() + dias * 86400000);
        const idioma = getIdioma();
        ctx.legenda.textContent = data.toLocaleDateString(idioma === 'pt' ? 'pt-BR' : idioma);
      }
      ctx.scrubber.value = String(Math.round((elongacao(dias) / 360) * 1000));

      // Mudança 5: anuncia o estado da maré a cada frame (com freio de 1s embutido)
      if (ctx.anunciar) {
        const classe = classificarMare(dias);
        const classeTexto = classe === 'sizigia' ? tm('sizigia')
          : classe === 'quadratura' ? tm('quadratura') : tm('intermediaria');
        const subindoAgora = alturaAnterior !== null && altura > alturaAnterior;
        const pertoAgora = Math.abs(altura) > amplitude * 0.75;
        const estadoAgora = pertoAgora
          ? (altura > 0 ? tm('preamar') : tm('baixamar'))
          : (subindoAgora ? tm('subindo') : tm('descendo'));
        ctx.anunciar(`${estadoAgora}. ${classeTexto}.`);
      }
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

    // Adiado: quando construirCena roda, o overlay ainda está hidden e os
    // cards ainda não têm texto — medir aí devolveria uma área segura falsa.
    requestAnimationFrame(() => requestAnimationFrame(enquadrar));

    return {
      scene, camera, atualizar, dispose, aoScrubber,
      aoRedimensionar: (w, h) => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        enquadrar();
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
