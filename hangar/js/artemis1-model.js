import * as T from 'three';

// Modelo didático autoral, com proporções esquemáticas inspiradas na configuração
// SLS Block 1 / Orion de Artemis I. Não representa um desenho técnico nem usa
// geometria, textura ou material baixado de fontes externas.
// Eixo longitudinal: +Y. Escala uniforme baseada no diâmetro do core (7,04 u).
// As dimensões de referência são usadas como proporções didáticas, não como CAD.
const SCALE = 7.04 / 27.6;
const DIM = {
  coreDiameter: 27.6 * SCALE,
  coreWithEnginesHeight: 212 * SCALE,
  boosterDiameter: 12 * SCALE,
  boosterHeight: 177 * SCALE,
  icpsHeight: 45 * SCALE,
  serviceHeight: 15.7 * SCALE,
  crewDiameter: 16.5 * SCALE,
  crewHeight: 11 * SCALE,
  lasHeight: 50 * SCALE,
};
const STACK = {
  coreBottom: -36.5,
  coreTop: -36.5 + DIM.coreWithEnginesHeight - 4.6,
  engineBottom: -36.5 - 4.6,
};
STACK.icpsBottom = STACK.coreTop + 3.4;
STACK.icpsTop = STACK.icpsBottom + DIM.icpsHeight;
STACK.serviceBottom = STACK.icpsTop;
STACK.serviceTop = STACK.serviceBottom + DIM.serviceHeight;
STACK.crewBottom = STACK.serviceTop;
STACK.crewTop = STACK.crewBottom + DIM.crewHeight;
STACK.lasTop = STACK.engineBottom + 322.4 * SCALE;

const mats = {
  foam: new T.MeshStandardMaterial({ color: 0xd8782d, roughness: .88 }),
  foamLight: new T.MeshStandardMaterial({ color: 0xf09a4e, roughness: .82 }),
  white: new T.MeshStandardMaterial({ color: 0xe9e7df, roughness: .62, metalness: .12 }),
  whiteShade: new T.MeshStandardMaterial({ color: 0xc9c9c2, roughness: .7, metalness: .16 }),
  dark: new T.MeshStandardMaterial({ color: 0x303942, roughness: .58, metalness: .65 }),
  steel: new T.MeshStandardMaterial({ color: 0x9aa6ad, roughness: .34, metalness: .78 }),
  silver: new T.MeshStandardMaterial({ color: 0xc4cbd0, roughness: .3, metalness: .72 }),
  gold: new T.MeshStandardMaterial({ color: 0xb78a51, roughness: .5, metalness: .62 }),
  black: new T.MeshStandardMaterial({ color: 0x171c21, roughness: .52, metalness: .38 }),
  glass: new T.MeshStandardMaterial({ color: 0x182c3d, roughness: .2, metalness: .72 }),
  cell: new T.MeshStandardMaterial({ color: 0x183d69, roughness: .38, metalness: .48 }),
  cellLine: new T.MeshStandardMaterial({ color: 0x86a8c6, roughness: .42, metalness: .45 }),
};

function mesh(group, geometry, material, id, name) {
  const object = new T.Mesh(geometry, material);
  object.name = name || id;
  object.userData.part = id;
  object.userData.artistic = true;
  group.add(object);
  return object;
}

function cylinder(group, id, rt, rb, h, y, material, segments = 32, x = 0, z = 0) {
  const m = mesh(group, new T.CylinderGeometry(rt, rb, h, segments), material, id);
  m.position.set(x, y, z);
  return m;
}

function torus(group, id, radius, tube, y, material, x = 0, z = 0, radial = 8, tubular = 64) {
  const m = mesh(group, new T.TorusGeometry(radius, tube, radial, tubular), material, id);
  m.rotation.x = Math.PI / 2;
  m.position.set(x, y, z);
  return m;
}

function box(group, id, w, h, d, x, y, z, material, name) {
  const m = mesh(group, new T.BoxGeometry(w, h, d), material, id, name);
  m.position.set(x, y, z);
  return m;
}

function makeGroup(root, groups, id) {
  const group = new T.Group();
  group.name = id;
  group.userData.part = id;
  group.userData.artistic = true;
  root.add(group);
  groups.set(id, group);
  return group;
}

function setArtisticMetadata(group, id) {
  group.traverse(object => {
    object.userData.artistic = true;
    object.userData.part = id;
  });
}

function buildCore(group) {
  // Tanque principal com leve redução visual nas extremidades e faixas de junta.
  const coreRadius = DIM.coreDiameter / 2;
  const tankHeight = STACK.coreTop - STACK.coreBottom;
  const tankCenter = (STACK.coreTop + STACK.coreBottom) / 2;
  cylinder(group, 'core', coreRadius - .04, coreRadius, tankHeight, tankCenter, mats.foam, 40);
  cylinder(group, 'core', coreRadius, coreRadius - .04, .55, STACK.coreTop - .1, mats.foamLight, 40);
  cylinder(group, 'core', coreRadius - .04, coreRadius, .55, STACK.coreBottom + .1, mats.foamLight, 40);
  for (const y of [STACK.coreBottom + 1.8, -30, -17, -4, STACK.coreTop - 1.6]) {
    torus(group, 'core', 3.49, .095, y, y > 20 ? mats.whiteShade : mats.foamLight, 0, 0, 6, 48);
  }
  // Painéis longitudinais discretos ajudam a ler o grande tanque sem excesso de linhas.
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI * 2 / 12;
    const rib = box(group, 'core', .045, tankHeight - 5, .035, Math.sin(a) * 3.505, tankCenter, Math.cos(a) * 3.505, mats.foamLight);
    rib.rotation.y = a;
  }
  // Intertank e pequenas janelas/placas de serviço estilizadas.
  cylinder(group, 'core', coreRadius + .04, coreRadius + .04, .42, STACK.coreTop - .55, mats.whiteShade, 40);
  // LVSA: adaptador cônico entre core e ICPS; fica no grupo do core no descarte.
  const lvsaHeight = STACK.icpsBottom - STACK.coreTop;
  const lvsa = mesh(group, new T.CylinderGeometry(2.28, 3.52, lvsaHeight, 40, 1, true), mats.whiteShade, 'core', 'adaptador LVSA');
  lvsa.position.y = (STACK.icpsBottom + STACK.coreTop) / 2;
  torus(group, 'core', 3.48, .1, STACK.coreTop + .08, mats.silver, 0, 0, 6, 48);
  for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
    const p = box(group, 'core', .56, 1.4, .1, Math.sin(a) * 3.56, tankCenter, Math.cos(a) * 3.56, mats.whiteShade, 'placa de serviço');
    p.rotation.y = a;
  }
}

function buildBooster(group, id, side) {
  const x = side * 5.13;
  const r = DIM.boosterDiameter / 2;
  const lower = STACK.coreBottom - .8;
  const totalHeight = DIM.boosterHeight;
  const noseHeight = 2.15;
  const nozzleHeight = 1.0;
  const bodyHeight = totalHeight - noseHeight - nozzleHeight;
  cylinder(group, id, r, r, bodyHeight, lower + nozzleHeight + bodyHeight / 2, mats.white, 28, x);
  cylinder(group, id, r * .99, r, .75, lower + nozzleHeight + .38, mats.whiteShade, 28, x);
  cylinder(group, id, r, r * .99, .7, lower + nozzleHeight + bodyHeight - .35, mats.whiteShade, 28, x);
  const nozzle = mesh(group, new T.CylinderGeometry(.42, .85, nozzleHeight, 24, 1, true), mats.dark, id, 'bocal SRB');
  nozzle.position.set(x, lower + nozzleHeight / 2, 0);
  torus(group, id, .78, .07, lower + .08, mats.silver, x, 0, 6, 24);
  // Nariz ogival e filetes de caso em bandas visuais.
  const nose = mesh(group, new T.ConeGeometry(r, noseHeight, 28), mats.white, id, 'nariz ogival SRB');
  nose.position.set(x, lower + nozzleHeight + bodyHeight + noseHeight / 2, 0);
  for (const y of [lower + 4, lower + 15, lower + 26, lower + 37]) {
    cylinder(group, id, r * 1.012, r * 1.012, .2, y, mats.whiteShade, 28, x);
  }
  const attach = box(group, id, .2, 33, .32, side * 3.58, lower + 17, .15, mats.dark, 'faixa de fixação ao núcleo');
  attach.rotation.z = side * -.035;
}

function buildEngines(group) {
  // Quatro RS-25 em arranjo quadrado; bocais distintos e abertos na extremidade.
  const engineTop = STACK.coreBottom + .2;
  const engineBottom = STACK.coreBottom - 4.6;
  cylinder(group, 'rs25', 2.52, 2.62, .62, engineTop - .31, mats.dark, 32);
  const positions = [[-.92, -.92], [.92, -.92], [-.92, .92], [.92, .92]];
  positions.forEach(([x, z], i) => {
    const bell = mesh(group, new T.CylinderGeometry(.46, .94, 3.8, 24, 1, true), mats.steel, 'rs25', `bocal RS-25 ${i + 1}`);
    bell.position.set(x, engineBottom + 1.9, z);
    const throat = mesh(group, new T.CylinderGeometry(.45, .52, .22, 20), mats.black, 'rs25', `garganta RS-25 ${i + 1}`);
    throat.position.set(x, engineBottom + 3.95, z);
    torus(group, 'rs25', .77, .055, engineBottom + .28, mats.silver, x, z, 6, 24);
  });
  for (const x of [-1.85, 1.85]) {
    for (const z of [-1.85, 1.85]) {
      const strut = mesh(group, new T.CylinderGeometry(.09, .09, 2.15, 8), mats.gold, 'rs25', 'suporte de motor');
      strut.position.set(x * .55, engineTop + .35, z * .55);
      strut.rotation.z = x * .12;
    }
  }
}

function buildICPS(group) {
  const bodyHeight = DIM.icpsHeight - 2.9;
  const bodyCenter = STACK.icpsBottom + 1.45 + bodyHeight / 2;
  // RL10 exposto sob o estágio, com boca escura e anel metálico legível.
  const rl10 = mesh(group, new T.CylinderGeometry(.42, .92, 1.55, 24, 1, true), mats.steel, 'icps', 'bocal RL10');
  rl10.position.y = STACK.icpsBottom + .55;
  cylinder(group, 'icps', .4, .46, .2, STACK.icpsBottom + 1.28, mats.black, 20);
  torus(group, 'icps', .72, .07, STACK.icpsBottom - .22, mats.silver, 0, 0, 6, 28);
  cylinder(group, 'icps', 2.35, 2.35, 1.05, STACK.icpsBottom + 1.45, mats.dark, 32);
  cylinder(group, 'icps', 2.38, 2.4, bodyHeight, bodyCenter, mats.white, 36);
  cylinder(group, 'icps', 2.42, 2.38, .48, STACK.icpsTop - .24, mats.silver, 36);
  for (const y of [STACK.icpsBottom + 2, STACK.icpsTop - 1.1]) torus(group, 'icps', 2.4, .11, y, mats.gold, 0, 0, 8, 48);
  // Faixas de instrumentação e linha helicoidal apenas sugerida por módulos espaçados.
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    const p = box(group, 'icps', .22, 2.2, .1, Math.sin(a) * 2.41, (STACK.icpsBottom + STACK.icpsTop) / 2, Math.cos(a) * 2.41, i % 2 ? mats.whiteShade : mats.steel);
    p.rotation.y = a;
  }
  cylinder(group, 'icps', .86, 2.35, 1.15, STACK.icpsTop + .55, mats.whiteShade, 32);
}

function buildService(group) {
  const center = (STACK.serviceTop + STACK.serviceBottom) / 2;
  cylinder(group, 'service-module', 2.02, 2.12, DIM.serviceHeight - .32, center, mats.whiteShade, 36);
  cylinder(group, 'service-module', 2.08, 2.08, .32, STACK.serviceBottom + .16, mats.dark, 36);
  cylinder(group, 'service-module', 1.98, 2.02, .32, STACK.serviceTop - .16, mats.silver, 36);
  torus(group, 'service-module', 2.05, .1, STACK.serviceBottom + .8, mats.gold, 0, 0, 8, 48);
  torus(group, 'service-module', 2.02, .08, STACK.serviceTop - .55, mats.dark, 0, 0, 8, 48);
  // Quatro painéis/radiadores fixos no corpo dão leitura do módulo sem competir com arrays.
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 4;
    const panel = box(group, 'service-module', .42, 3.15, .07, Math.sin(a) * 2.06, center, Math.cos(a) * 2.06, i % 2 ? mats.white : mats.whiteShade);
    panel.rotation.y = a;
  }
  // Propulsores de orientação estilizados.
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    const thruster = mesh(group, new T.CylinderGeometry(.12, .17, .36, 10), mats.dark, 'service-module', 'propulsor de orientação');
    thruster.position.set(Math.sin(a) * 2.08, center, Math.cos(a) * 2.08);
    thruster.rotation.z = Math.cos(a) * .3;
    thruster.rotation.x = Math.sin(a) * .3;
  }
}

function buildCrew(group) {
  // Perfil baixo e truncado: escudo largo, cone e cobertura de acoplamento.
  const r = DIM.crewDiameter / 2;
  const base = STACK.crewBottom;
  cylinder(group, 'crew-module', r, r, .32, base + .16, mats.dark, 36);
  const shield = mesh(group, new T.CylinderGeometry(r, r * .93, .42, 36), mats.dark, 'crew-module', 'escudo térmico Orion');
  shield.position.y = base + .48;
  const hullBottom = base + .69, hullTop = STACK.crewTop - .28;
  cylinder(group, 'crew-module', r * .47, r * .98, hullTop - hullBottom, (hullTop + hullBottom) / 2, mats.white, 36);
  cylinder(group, 'crew-module', r * .43, r * .47, .28, STACK.crewTop - .14, mats.whiteShade, 36);
  torus(group, 'crew-module', r * .94, .1, base + .72, mats.silver, 0, 0, 8, 48);
  // Pequenas janelas e proteção térmica superficial.
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 4;
    const w = mesh(group, new T.CircleGeometry(.19, 20), mats.glass, 'crew-module', 'janela');
    w.position.set(Math.sin(a) * r * .69, base + 1.75, Math.cos(a) * r * .69);
    w.rotation.y = a;
  }
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    const tile = box(group, 'crew-module', .18, .42, .045, Math.sin(a) * (r - .04), base + .42, Math.cos(a) * (r - .04), i % 2 ? mats.black : mats.dark, 'segmento de escudo térmico');
    tile.rotation.y = a;
  }
}

function buildLAS(group) {
  // Cobertura protetora troncocônica sobre a Orion, parte do LAS e ejetada com ele.
  const shroudBottom = STACK.lasTop - DIM.lasHeight;
  const shroudTop = STACK.crewTop + 1.15;
  // Keep the protective skirt wide up to the capsule's shoulder. A single
  // long cone would narrow below the heat shield and cut through Orion.
  const shoulder = STACK.crewBottom + .8;
  const skirt = mesh(group, new T.CylinderGeometry(DIM.crewDiameter * .55, DIM.crewDiameter * .55, shoulder - shroudBottom, 32, 1, true), mats.white, 'las', 'saia protetora da Orion');
  skirt.position.y = (shoulder + shroudBottom) / 2;
  const shroud = mesh(group, new T.CylinderGeometry(.72, DIM.crewDiameter * .55, shroudTop - shoulder, 32, 1, true), mats.white, 'las', 'cobertura protetora da Orion');
  shroud.position.y = (shroudTop + shoulder) / 2;
  torus(group, 'las', DIM.crewDiameter * .55, .09, shroudBottom + .08, mats.whiteShade, 0, 0, 6, 36);
  const towerBase = shroudTop;
  const towerTop = STACK.lasTop;
  cylinder(group, 'las', .67, .72, .42, towerBase, mats.dark, 24);
  cylinder(group, 'las', .13, .18, towerTop - towerBase - 1.0, (towerTop + towerBase) / 2 + .25, mats.whiteShade, 16);
  // Quatro treliças verticais e duas aletas diagonais da torre de escape.
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2;
    const x = Math.sin(a) * .42;
    const z = Math.cos(a) * .42;
    const rail = box(group, 'las', .12, towerTop - towerBase - .6, .12, x, (towerTop + towerBase) / 2, z, mats.white);
    rail.rotation.y = a;
    const fin = box(group, 'las', .7, .18, .12, Math.sin(a) * .22, towerBase + .7, Math.cos(a) * .22, mats.whiteShade);
    fin.rotation.y = a;
  }
  const nose = mesh(group, new T.ConeGeometry(.38, 1.35, 16), mats.white, 'las', 'ponta da torre de escape');
  nose.position.y = towerTop - .6;
  for (const y of [towerBase + .35, towerTop - 1.4]) torus(group, 'las', .54, .07, y, mats.silver, 0, 0, 6, 24);
}

function buildFairingHalf(group, id, start) {
  // Casco dividido em duas meias conchas que podem ser ocultadas separadamente.
  const shell = mesh(group, new T.CylinderGeometry(2.28, 2.35, 5.55, 24, 1, true, start, Math.PI), mats.white, id, 'meia carenagem');
  shell.position.y = STACK.serviceTop - 1.9;
  const top = mesh(group, new T.TorusGeometry(2.28, .055, 6, 32, Math.PI), mats.whiteShade, id, 'borda superior da carenagem');
  top.rotation.x = Math.PI / 2;
  top.position.y = STACK.serviceTop + .875;
  top.rotation.z = start;
  const bottom = mesh(group, new T.TorusGeometry(2.35, .055, 6, 32, Math.PI), mats.whiteShade, id, 'borda inferior da carenagem');
  bottom.rotation.x = Math.PI / 2;
  bottom.position.y = STACK.serviceTop - 4.675;
  bottom.rotation.z = start;
  // Reforço longitudinal de borda, legível quando a metade se abre.
  for (const a of [start, start + Math.PI]) {
    const seam = box(group, id, .095, 5.5, .09, Math.sin(a) * 2.31, STACK.serviceTop - 1.9, Math.cos(a) * 2.31, mats.whiteShade, 'costura da carenagem');
    seam.rotation.y = a;
  }
}

function buildSolarArray(group, id, index) {
  // Pose de montagem: dobrado axialmente contra o módulo de serviço, sob as
  // carenagens. O principal pode mover/rotacionar cada grupo para a pose aberta.
  const angle = index * Math.PI / 2;
  const radius = 2.0;
  // O eixo local +X aponta radialmente para fora, coerente com a pose aberta.
  group.position.set(Math.cos(angle) * radius, (STACK.serviceTop + STACK.serviceBottom) / 2, -Math.sin(angle) * radius);
  // Folded wing width is tangential, beneath the launch shroud.
  group.rotation.y = angle + Math.PI / 2;
  group.userData.pose = 'folded';
  group.userData.deployHint = 'Para abrir: girar em torno de Z cerca de 90° e deslocar para fora do corpo.';
  group.userData.deployedPosition = [Math.cos(angle) * 4.8, (STACK.serviceTop + STACK.serviceBottom) / 2, -Math.sin(angle) * 4.8];
  group.userData.deployedRotation = new T.Euler().setFromRotationMatrix(new T.Matrix4().makeBasis(
    new T.Vector3(Math.sin(angle),0,Math.cos(angle)),
    new T.Vector3(Math.cos(angle),0,-Math.sin(angle)),new T.Vector3(0,1,0)
  )).toArray().slice(0,3);
  const w = 1.42, h = 5.2, d = .085;
  box(group, id, w, h, d, 0, 0, 0, mats.dark, 'moldura do painel dobrado');
  box(group, id, w - .12, h - .18, .035, 0, 0, .055, mats.cell, 'superfície fotovoltaica');
  // A single line buffer suggests cells without hundreds of tiny draw calls.
  const vertices=[];
  for(let row=0;row<=16;row++){
    const y=-2.5+row*5/16;vertices.push(-.65,y,.085,.65,y,.085);
  }
  for(let col=0;col<=4;col++){
    const x=-.65+col*1.3/4;vertices.push(x,-2.5,.085,x,2.5,.085);
  }
  const gridGeometry=new T.BufferGeometry();gridGeometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));
  group.add(new T.LineSegments(gridGeometry,new T.LineBasicMaterial({color:0x7d9ab0})));
  for (const x of [-.69, .69]) box(group, id, .045, h + .08, .06, x, 0, .09, mats.silver, 'trilho do painel');
  for (const y of [-2.64, 2.64]) box(group, id, 1.5, .09, .1, 0, y, .08, mats.silver, 'travessa do painel');
}

function buildParachutes(group, id, index) {
  const angle=index*Math.PI*2/3, x=Math.sin(angle)*5.8,z=Math.cos(angle)*5.8;
  const pod=new T.Group();pod.name=`paraquedas-${index+1}`;group.add(pod);
  const anchorY = STACK.crewTop + .05, canopyY = anchorY + 15.2;
  pod.position.set(x,canopyY,z);
  for(let gore=0;gore<12;gore++){
    const canopy=mesh(pod,new T.SphereGeometry(3.4,3,10,gore*Math.PI/6,Math.PI/6,0,Math.PI/2),gore%2?mats.foamLight:mats.white,id,'cúpula artística Orion');
    canopy.scale.y=.65;
  }
  const vertices=[];
  for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    vertices.push(x+Math.sin(a)*3.4,canopyY,z+Math.cos(a)*3.4,0,anchorY,0);
  }
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));
  const lines=new T.LineSegments(geometry,new T.LineBasicMaterial({color:0xe2d9c9}));group.add(lines);
}

/** Cria o modelo esquemático e artístico de Artemis I. */
export function criarArtemis1Modelo() {
  const root = new T.Group();
  root.name = 'artemis-i-model';
  root.userData.artistic = true;
  root.userData.dimensions = { height: 322.4 * SCALE, axis: '+Y', centered: true, scaleTechnical: false };
  const groups = new Map();

  buildCore(makeGroup(root, groups, 'core'));
  buildEngines(makeGroup(root, groups, 'rs25'));
  buildBooster(makeGroup(root, groups, 'srb-left'), 'srb-left', -1);
  buildBooster(makeGroup(root, groups, 'srb-right'), 'srb-right', 1);
  buildICPS(makeGroup(root, groups, 'icps'));
  buildService(makeGroup(root, groups, 'service-module'));
  buildCrew(makeGroup(root, groups, 'crew-module'));
  buildLAS(makeGroup(root, groups, 'las'));
  buildFairingHalf(makeGroup(root, groups, 'fairing-left'), 'fairing-left', Math.PI / 2);
  buildFairingHalf(makeGroup(root, groups, 'fairing-right'), 'fairing-right', -Math.PI / 2);
  for (let i = 0; i < 4; i++) buildSolarArray(makeGroup(root, groups, `solar-${i + 1}`), `solar-${i + 1}`, i);
  const parachutes = makeGroup(root, groups, 'parachutes');
  parachutes.userData.pose = 'packed';
  parachutes.userData.anchorOffset = [0, .65, 0];
  parachutes.userData.deployHint = 'Três cúpulas Orion recolhidas, ancoradas junto ao topo da cápsula; elevar o grupo para exibi-las.';
  for (let i = 0; i < 3; i++) buildParachutes(parachutes, 'parachutes', i);

  // Pose de lançamento: arrays stowed sob as conchas, paraquedas recolhidos.
  groups.get('fairing-left').visible = true;
  groups.get('fairing-right').visible = true;
  groups.get('parachutes').visible = false;
  const materialClones=new Map();
  for (const [id, group] of groups) {
    const center=new T.Box3().setFromObject(group).getCenter(new T.Vector3());
    // Arrays already have a deployment pivot and metadata expressed in root coordinates.
    if(!id.startsWith('solar-')){
      for(const child of group.children)child.position.sub(center);
      group.position.copy(center);
    }
    setArtisticMetadata(group,id);
    group.traverse(object=>{
      if(!object.material)return;
      const clone=m=>{if(!materialClones.has(m))materialClones.set(m,m.clone());return materialClones.get(m);};
      object.material=Array.isArray(object.material)?object.material.map(clone):clone(object.material);
    });
  }
  root.updateMatrixWorld(true);
  return { root, groups };
}
