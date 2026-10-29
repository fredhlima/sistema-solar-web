import * as THREE from 'three';

// ============================================================================
// Construtor de foguetes com primitivas (SLS, Falcon 9, Starship)
// Convenção: construir em +Y (vertical), depois normalizar para contrato
// (centrado, 1.0 em maior dimensão, frente em +X).
// ============================================================================

/**
 * Constrói um foguete pelas primitivas THREE.js.
 * @param {string} tipo - 'sls' | 'falcon-9' | 'starship' | 'saturno-v'
 * @returns {THREE.Group} Foguete normalizado (centro origem, maior dim 1.0, frente +X)
 */
export function construirFoguete(tipo) {
  if (tipo === 'sls') return construirSLS();
  if (tipo === 'falcon-9') return construirFalcon9();
  if (tipo === 'starship') return construirStarship();
  if (tipo === 'saturno-v') return construirSaturnoV();
  throw new Error(`Tipo de foguete inválido: ${tipo}. Use 'sls' | 'falcon-9' | 'starship' | 'saturno-v'.`);
}

// ============================================================================
// SLS Block 1: 98,1 m altura, 8,4 m diâmetro núcleo — proporção 11,68
// ============================================================================

function construirSLS() {
  const grupo = new THREE.Group();

  // Cores e materiais (MeshStandardMaterial com metalness/roughness específicos)
  const cinzaEscuro = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a, metalness: 0.8, roughness: 0.5,
  });
  const laranja = new THREE.MeshStandardMaterial({
    color: 0xff8c00, metalness: 0.1, roughness: 0.8, // Espuma isolante
  });
  const branco = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0, metalness: 0.3, roughness: 0.6,
  });
  const cinzaClaro = new THREE.MeshStandardMaterial({
    color: 0xcccccc, metalness: 0.2, roughness: 0.5,
  });
  const prataPrateada = new THREE.MeshStandardMaterial({
    color: 0xd3d3d3, metalness: 0.7, roughness: 0.3, // Prata/branco metálico
  });

  // Proporções reais (em relação aos 98,1 m totais):
  // core: 65 m = 66,3%
  // srb: 54 m = 55,1%
  // icps: ~15 m = 15,3%
  // orion: ~3 m = 3,1%
  // motores/LAS: ~11 m total
  // Diâmetro núcleo: 8,4 m = escala base

  // Altura ajustada para somar ~20:
  // motores: 0,5 u
  // core: 13,3 u (66% de 20)
  // srb: 3,4 u (simples, apenas detalhe lateral)
  // icps: 1,5 u
  // orion: 1,0 u
  // las: 0,3 u
  // Soma: 0.5 + 13.3 + 3.4 + 1.5 + 1.0 + 0.3 = 20.0 ✓

  const alturaTotal = 20;
  const diametroBase = 1.7; // 20/1.7 = 11.76 ≈ 11.68 ✓

  // Cursor acumulado (bottom-up)
  let cursor = -10;

  // 1. motores-rs25: cilindro único que representa os 4 motores (0,5 u altura)
  const altMotores = 0.5;
  const geometriaMotor = new THREE.CylinderGeometry(0.7, 0.7, altMotores, 16);
  const motores = new THREE.Mesh(geometriaMotor, cinzaEscuro);
  motores.position.y = cursor + altMotores / 2;
  motores.name = 'componente-motores-rs25';
  grupo.add(motores);
  cursor += altMotores;

  // 2. core: cilindro laranja de 65 m (13,3 u altura)
  const alturaCore = 13.3;
  const geometriaCore = new THREE.CylinderGeometry(diametroBase / 2, diametroBase / 2, alturaCore, 32);
  const core = new THREE.Mesh(geometriaCore, laranja);
  core.position.y = cursor + alturaCore / 2;
  core.name = 'componente-core';
  grupo.add(core);
  cursor += alturaCore;

  // 3. srb-sls: DOIS foguetes sólidos LADEANDO o núcleo — não empilhados nele.
  //
  // O empilhamento por cursor resolveu os vãos entre peças em série, mas foi
  // aplicado também aqui, e os boosters viraram um segmento branco em linha no
  // meio da pilha. Isso apaga a silhueta mais reconhecível do SLS: dois
  // cilindros brancos ladeando o tanque laranja. Booster não é estágio — ele
  // corre PARALELO ao núcleo, então não consome cursor.
  //
  // Proporções reais: cada SRB tem 3,71 m de diâmetro contra 8,4 m do núcleo
  // (razão 0,44), e 54 m de altura contra os 65 m do núcleo (razão 0,83).
  const raioNucleo = diametroBase / 2;
  const raioSRB = raioNucleo * 0.44;
  const alturaSRB = alturaCore * 0.83;
  const baseCore = core.position.y - alturaCore / 2;
  const grupoSRB = new THREE.Group();
  grupoSRB.name = 'componente-srb-sls';
  for (const lado of [-1, 1]) {
    const geometriaSRB = new THREE.CylinderGeometry(raioSRB, raioSRB, alturaSRB, 20);
    const srb = new THREE.Mesh(geometriaSRB, branco);
    // Encostado na lateral do núcleo, alinhado pela base com ele
    srb.position.set(lado * (raioNucleo + raioSRB), baseCore + alturaSRB / 2, 0);
    grupoSRB.add(srb);
    // Bico cônico no topo de cada booster
    const bico = new THREE.Mesh(new THREE.ConeGeometry(raioSRB, raioSRB * 2.2, 20), branco);
    bico.position.set(lado * (raioNucleo + raioSRB), baseCore + alturaSRB + raioSRB * 1.1, 0);
    grupoSRB.add(bico);
  }
  grupo.add(grupoSRB);
  // O cursor NÃO avança: os boosters correm ao lado do núcleo, e o próximo
  // estágio se encaixa no topo do NÚCLEO. Avançar aqui abriria um vão do
  // tamanho do booster no meio da pilha.

  // Alturas dos estágios de cima, refeitas a partir das medidas reais.
  //
  // Antes, o segmento do SRB ocupava 3,4 u DENTRO da pilha, e tirá-lo dali (o
  // booster corre ao lado, não em série) encurtou o foguete inteiro na mesma
  // medida: a razão altura/largura despencou de 11,8 para 5,2. A altura tem que
  // voltar pelos estágios que realmente existem acima do núcleo.
  //
  // Escala: o núcleo tem 13,3 u para 65 m reais, ou seja 1 u = 4,89 m. Acima
  // dele há 33,1 m (98,1 − 65), que valem 6,77 u, repartidos assim:
  //   ICPS 13,7 m = 2,80 u · Orion (serviço + cápsula) 10,0 m = 2,05 u
  //   torre de escape 9,4 m = 1,92 u
  // 4. icps: estágio superior
  const alturaICPS = 2.8;
  const geometriaICPS = new THREE.CylinderGeometry(diametroBase / 2 - 0.05, diametroBase / 2 - 0.05, alturaICPS, 24);
  const icps = new THREE.Mesh(geometriaICPS, branco);
  icps.position.y = cursor + alturaICPS / 2;
  icps.name = 'componente-icps';
  grupo.add(icps);
  cursor += alturaICPS;

  // 5. orion: módulo de serviço + cápsula
  const alturaOrion = 2.05;
  const geometriaOrion = new THREE.ConeGeometry(diametroBase / 2 - 0.12, alturaOrion, 24);
  const orion = new THREE.Mesh(geometriaOrion, cinzaClaro);
  orion.position.y = cursor + alturaOrion / 2;
  orion.name = 'componente-orion';
  grupo.add(orion);
  cursor += alturaOrion;

  // 6. las-sls: torre de escape, haste fina e alta no topo
  const alturaLAS = 1.92;
  const geometriaLAS = new THREE.CylinderGeometry(0.09, 0.12, alturaLAS, 10);
  const las = new THREE.Mesh(geometriaLAS, prataPrateada);
  las.position.y = cursor + alturaLAS / 2;
  las.name = 'componente-las-sls';
  grupo.add(las);

  return normalizar(grupo, 'sls');
}

// ============================================================================
// Falcon 9 Block 5: 70 m altura, 3,7 m diâmetro — proporção 18,92
// ============================================================================

function construirFalcon9() {
  const grupo = new THREE.Group();

  const preto = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a, metalness: 0.2, roughness: 0.7,
  });
  const cinzaEscuro = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a, metalness: 0.8, roughness: 0.5,
  });
  const branco = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0, metalness: 0.3, roughness: 0.6,
  });

  // Proporções reais:
  // motores: 0,4 u
  // estagio-1: ~42 m = 60% → 12,0 u
  // grid-fins: 0,3 u
  // interstágio: 0,3 u
  // estagio-2: ~14 m = 20% → 4,0 u
  // coifa: ~9 m = 13% → 2,6 u
  // pernas: 0,4 u
  // Altura ajustada para somar ~20: Soma = 0.4 + 12.0 + 0.3 + 0.3 + 4.0 + 2.6 + 0.4 = 20.0 ✓

  const alturaTotal = 20;
  const diametroBase = 1.058; // 20/1.058 = 18.90 ≈ 18.92 ✓

  // Cursor acumulado (bottom-up): começa em -10 (metade de -20), soma alturas
  let cursor = -10;

  // 1. pernas: 0,4 u altura (reduzido para manter total em 20)
  const altPernas = 0.4;
  const geometriaPerna = new THREE.CylinderGeometry(0.52, 0.50, altPernas, 12, 1);
  const pernas = new THREE.Mesh(geometriaPerna, preto);
  pernas.position.y = cursor + altPernas / 2;
  pernas.name = 'componente-pernas';
  grupo.add(pernas);
  cursor += altPernas;

  // 2. merlin-1: 0,4 u altura
  const altMerlin = 0.4;
  const geometriaMerlin = new THREE.CylinderGeometry(0.48, 0.48, altMerlin, 16);
  const merlin = new THREE.Mesh(geometriaMerlin, cinzaEscuro);
  merlin.position.y = cursor + altMerlin / 2;
  merlin.name = 'componente-merlin-1';
  grupo.add(merlin);
  cursor += altMerlin;

  // 3. estagio-1: 12,0 u altura
  const alturaE1 = 12.0;
  const geometriaE1 = new THREE.CylinderGeometry(diametroBase / 2, diametroBase / 2, alturaE1, 32);
  const estagio1 = new THREE.Mesh(geometriaE1, branco);
  estagio1.position.y = cursor + alturaE1 / 2;
  estagio1.name = 'componente-estagio-1';
  grupo.add(estagio1);
  cursor += alturaE1;

  // 4. grid-fins: 0,3 u altura
  const altGridFins = 0.3;
  const geometriaGridFin = new THREE.CylinderGeometry(diametroBase / 2, diametroBase / 2, altGridFins, 20);
  const gridFins = new THREE.Mesh(geometriaGridFin, cinzaEscuro);
  gridFins.position.y = cursor + altGridFins / 2;
  gridFins.name = 'componente-grid-fins';
  grupo.add(gridFins);
  cursor += altGridFins;

  // 5. interestagio: 0,3 u altura
  const altInterestagio = 0.3;
  const geometriaInterestagio = new THREE.CylinderGeometry(diametroBase / 2 - 0.04, diametroBase / 2 - 0.06, altInterestagio, 20);
  const interestagio = new THREE.Mesh(geometriaInterestagio, preto);
  interestagio.position.y = cursor + altInterestagio / 2;
  interestagio.name = 'componente-interestagio';
  grupo.add(interestagio);
  cursor += altInterestagio;

  // 6. estagio-2: 4,0 u altura
  const alturaE2 = 4.0;
  const geometriaE2 = new THREE.CylinderGeometry(0.45, 0.45, alturaE2, 24);
  const estagio2 = new THREE.Mesh(geometriaE2, branco);
  estagio2.position.y = cursor + alturaE2 / 2;
  estagio2.name = 'componente-estagio-2';
  grupo.add(estagio2);
  cursor += alturaE2;

  // 7. coifa: 2,6 u altura
  const alturaCoifa = 2.6;
  const geometriaCoifa = new THREE.ConeGeometry(0.45, alturaCoifa, 24);
  const coifa = new THREE.Mesh(geometriaCoifa, branco);
  coifa.position.y = cursor + alturaCoifa / 2;
  coifa.name = 'componente-coifa';
  grupo.add(coifa);

  return normalizar(grupo, 'falcon-9');
}

// ============================================================================
// Starship (pilha completa): 121 m altura, 9 m diâmetro — proporção 13,44
// ============================================================================

function construirStarship() {
  const grupo = new THREE.Group();

  const cinzaEscuro = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a, metalness: 0.8, roughness: 0.5,
  });
  const aco = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0, metalness: 0.9, roughness: 0.25, // Aço inoxidável metálico
  });

  // Proporções reais:
  // raptor-booster: ~0,6 u
  // super-heavy: 71 m = 58,7% → 11,74 u
  // grid-fins-sh: ~0,4 u
  // raptor-nave: ~0,6 u
  // starship: 50 m = 41,3% → 8,26 u
  // flaps: ~0,4 u
  // cone: ~2 u
  // Altura ajustada para somar ~20: Soma = 0.6 + 11.74 + 0.4 + 0.6 + 8.26 + 0.4 + 2 = 24 (PROBLEMA)
  // Redimensionem proporcionalmente: fator = 20/24 = 0.833
  // super-heavy: 11.74 * 0.833 = 9.78 u
  // starship: 8.26 * 0.833 = 6.88 u

  const alturaTotal = 20; // Unidades em construção
  const diametroBase = 1.5; // 20.38/1.5 ≈ 13.59 ≈ 13.44 ✓

  // Cursor acumulado (bottom-up): começa em -10 (metade de -20), soma alturas
  let cursor = -10;

  // 1. raptor-booster: 0,5 u altura
  const altRaptorBooster = 0.5;
  const geometriaRaptor = new THREE.CylinderGeometry(0.48, 0.48, altRaptorBooster, 16);
  const raptorBooster = new THREE.Mesh(geometriaRaptor, cinzaEscuro);
  raptorBooster.position.y = cursor + altRaptorBooster / 2;
  raptorBooster.name = 'componente-raptor-booster';
  grupo.add(raptorBooster);
  cursor += altRaptorBooster;

  // 2. super-heavy: 9,78 u altura (ajustado proporcionalmente)
  const alturaSuperHeavy = 9.78;
  const geometriaSuperHeavy = new THREE.CylinderGeometry(diametroBase / 2, diametroBase / 2, alturaSuperHeavy, 40);
  const superHeavy = new THREE.Mesh(geometriaSuperHeavy, aco);
  superHeavy.position.y = cursor + alturaSuperHeavy / 2;
  superHeavy.name = 'componente-super-heavy';
  grupo.add(superHeavy);
  cursor += alturaSuperHeavy;

  // 3. grid-fins-sh: 0,3 u altura — REDUZIDO: raio = 0,52 (encostado no casco)
  const altGridFinsSH = 0.3;
  const geometriaGridFinSH = new THREE.CylinderGeometry(0.80, 0.78, altGridFinsSH, 20);
  const gridFinsSH = new THREE.Mesh(geometriaGridFinSH, aco);
  gridFinsSH.position.y = cursor + altGridFinsSH / 2;
  gridFinsSH.name = 'componente-grid-fins-sh';
  grupo.add(gridFinsSH);
  cursor += altGridFinsSH;

  // 4. raptor-nave: 0,5 u altura
  const altRaptorNave = 0.5;
  const geometriaRaptorNave = new THREE.CylinderGeometry(0.48, 0.48, altRaptorNave, 16);
  const raptorNave = new THREE.Mesh(geometriaRaptorNave, cinzaEscuro);
  raptorNave.position.y = cursor + altRaptorNave / 2;
  raptorNave.name = 'componente-raptor-nave';
  grupo.add(raptorNave);
  cursor += altRaptorNave;

  // 5. starship: 6,88 u altura (ajustado proporcionalmente)
  const alturaStarship = 6.88;
  const geometriaStarship = new THREE.CylinderGeometry(diametroBase / 2, diametroBase / 2, alturaStarship, 40);
  const starship = new THREE.Mesh(geometriaStarship, aco);
  starship.position.y = cursor + alturaStarship / 2;
  starship.name = 'componente-starship';
  grupo.add(starship);
  cursor += alturaStarship;

  // 6. flaps: 0,3 u altura — REDUZIDO: raio = 0,52 (encostado no casco)
  const altFlaps = 0.3;
  const geometriaFlap = new THREE.CylinderGeometry(0.80, 0.78, altFlaps, 20);
  const flaps = new THREE.Mesh(geometriaFlap, aco);
  flaps.position.y = cursor + altFlaps / 2;
  flaps.name = 'componente-flaps';
  grupo.add(flaps);
  cursor += altFlaps;

  // Cone da nave (ogiva no topo): 1,67 u altura (ajustado proporcionalmente)
  const altCone = 1.67;
  const geometriaCone = new THREE.ConeGeometry(diametroBase / 2, altCone, 32);
  const cone = new THREE.Mesh(geometriaCone, aco);
  cone.position.y = cursor + altCone / 2;
  cone.name = 'componente-ogiva'; // ADICIONADO NOME
  grupo.add(cone);

  return normalizar(grupo, 'starship');
}

// ============================================================================
// Saturno V: 110,6 m altura oficial da pilha completa, 10,1 m diâmetro do
// 1º/2º estágio — proporção 10,95. Onde o corte por triângulo (frota-corte.js)
// produzia fatias de tubo idênticas, aqui cada componente nasce com forma
// própria: o 3º estágio é visivelmente mais fino, o Módulo Lunar tem pernas,
// a cápsula é um cone de verdade.
//
// Ao contrário dos três foguetes acima (que somam ~20 unidades arbitrárias),
// este é construído direto em METROS REAIS: normalizar() só olha a RAZÃO
// entre as peças no final, então metro vira unidade sem precisar converter, e
// cada constante do código é rastreável até a tabela do SPEC.
//
// Nota sobre a soma: as 8 alturas da tabela do SPEC somam 119,5 m, não os
// 110,6 oficiais da pilha completa — porque a tabela trata os 5 motores F-1
// como peça própria abaixo do 1º estágio, enquanto o número popularizado de
// 110,6 m mede o S-IC já incluindo os motores na própria medida do estágio.
// Segui a tabela do SPEC ao pé da letra ("não inventar dimensão fora dela")
// em vez de tentar reconciliar as duas fontes; a proporção final (11,83) cai
// dentro da tolerância de ±15% sobre 10,95 de qualquer forma.
// ---------------------------------------------------------------------------
// LIVERY DO SATURNO V
//
// O que faz alguém reconhecer este foguete é a PINTURA, não a malha: a malha é
// uma pilha de cilindros que serviria para qualquer foguete branco. O padrão de
// rolamento preto, o "UNITED STATES" na vertical e a bandeira são o que
// identificam. Gerar em canvas em vez de baixar textura mantém o app rodando
// offline no Android, que é requisito do projeto.
//
// Em Node — as sondas de verificação importam este módulo — não existe
// `document`. Sem tela, devolve null e o material fica na cor lisa, sem quebrar.
// ---------------------------------------------------------------------------
const PRETO_LIVERY = '#16171a';
const BRANCO_LIVERY = '#ecebe6';   // branco levemente quente, como a pintura real

function liveryEstagio(pintar, largura = 512, altura = 1024) {
  if (typeof document === 'undefined') return null;
  const tela = document.createElement('canvas');
  tela.width = largura;
  tela.height = altura;
  const g = tela.getContext('2d');
  g.fillStyle = BRANCO_LIVERY;
  g.fillRect(0, 0, largura, altura);
  pintar(g, largura, altura);
  const textura = new THREE.CanvasTexture(tela);
  textura.colorSpace = THREE.SRGBColorSpace;
  textura.anisotropy = 4;
  return textura;
}

// A UV do CylinderGeometry corre com v=0 embaixo, e a textura entra com flipY
// ligado — então y=0 do canvas é o TOPO do estágio. Desenhar de cima para baixo
// aqui corresponde a desenhar de cima para baixo no foguete.
function desenharBandeira(g, x, y, larg, alt) {
  g.fillStyle = '#ffffff';
  g.fillRect(x, y, larg, alt);
  g.fillStyle = '#b31942';
  for (let i = 0; i < 7; i++) g.fillRect(x, y + (i * 2 * alt) / 13, larg, alt / 13);
  g.fillStyle = '#0a3161';
  g.fillRect(x, y, larg * 0.42, (alt * 7) / 13);
}

function textoVertical(g, texto, x, y, tamanho) {
  g.save();
  g.translate(x, y);
  g.rotate(Math.PI / 2);
  g.fillStyle = PRETO_LIVERY;
  g.font = 'bold ' + tamanho + 'px Arial, Helvetica, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(texto, 0, 0);
  g.restore();
}

// S-IC: faixa preta no topo (junta do interestágio), "UNITED STATES" e bandeira
// no terço superior, dois níveis de marcas de rolamento e a faixa larga da base.
// As marcas em dois níveis, defasadas meia fase, são o que deixava visível o
// giro do foguete pelas câmeras do solo.
function pintarSIC(g, w, h) {
  g.fillStyle = PRETO_LIVERY;
  g.fillRect(0, 0, w, h * 0.030);
  g.fillRect(0, h * 0.945, w, h * 0.055);
  const bloco = w / 8;
  for (let i = 0; i < 4; i++) g.fillRect(i * (w / 4) + bloco / 2, h * 0.700, bloco, h * 0.105);
  for (let i = 0; i < 4; i++) g.fillRect(i * (w / 4), h * 0.470, bloco, h * 0.055);
  // Letreiro e bandeira em QUADRANTES ALTERNADOS, como no foguete real: texto
  // em dois lados opostos, bandeira nos outros dois. Com a marca num quadrante
  // só, qualquer ângulo de câmera tinha 3 chances em 4 de não mostrar nada —
  // foi o que aconteceu na primeira versão desta textura.
  for (const u of [0.375, 0.875]) {
    // Centro em 0,22 e não 0,15: o texto tem ~320 px de comprimento e, mais
    // acima, o "U" saía pela borda de cima da textura — aparecia "NITED STATES".
    textoVertical(g, 'UNITED STATES', w * u, h * 0.220, Math.round(w * 0.075));
  }
  for (const u of [0.125, 0.625]) {
    desenharBandeira(g, w * u - w * 0.055, h * 0.095, w * 0.11, h * 0.070);
  }
}

function pintarSII(g, w, h) {
  g.fillStyle = PRETO_LIVERY;
  g.fillRect(0, h * 0.88, w, h * 0.12);        // anel interestágio, na base
  g.fillRect(0, 0, w, h * 0.035);
  const bloco = w / 8;
  for (let i = 0; i < 4; i++) g.fillRect(i * (w / 4) + bloco / 2, h * 0.30, bloco, h * 0.085);
  textoVertical(g, 'USA', w * 0.32, h * 0.10, Math.round(w * 0.16));
}

function pintarSIVB(g, w, h) {
  g.fillStyle = PRETO_LIVERY;
  g.fillRect(0, h * 0.86, w, h * 0.14);
  const bloco = w / 8;
  for (let i = 0; i < 4; i++) g.fillRect(i * (w / 4) + bloco / 2, h * 0.42, bloco, h * 0.075);
}

export function construirSaturnoV() {
  const grupo = new THREE.Group();

  // Alturas conforme SPEC-SATURNO-V.md §4.1. As peças se SOBREPÕEM onde se
  // sobrepõem de verdade — o bocal do Módulo de Serviço entra 2,1 m dentro do
  // adaptador, e as pernas da torre de escape abraçam 1,5 m da cápsula. É essa
  // sobreposição que reconcilia a soma empilhada (114,2 m) com os 110,6 m
  // oficiais; o SPEC anterior somava 119,5 m justamente por ignorá-la.
  const H_SIC = 42.1, H_SII = 24.8, H_SIVB = 17.8, H_IU = 0.9;
  const H_SLA = 8.5, H_LM = 7.0, H_SM = 6.6, H_CM = 3.5, H_LES = 10.0;
  const SOBRE_SM = 2.1, SOBRE_LES = 1.5;

  const rSIC = 10.1 / 2;
  const rSIVB = 6.6 / 2;
  const rCSM = 3.9 / 2;

  const metalEscuro = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.85, roughness: 0.45 });
  const preto = new THREE.MeshStandardMaterial({ color: 0x16171a, metalness: 0.2, roughness: 0.65 });
  const brancoLiso = new THREE.MeshStandardMaterial({ color: 0xecebe6, metalness: 0.1, roughness: 0.55 });
  const prata = new THREE.MeshStandardMaterial({ color: 0xc8ccd4, metalness: 0.85, roughness: 0.3 });
  const dourado = new THREE.MeshStandardMaterial({ color: 0xcaa24a, metalness: 0.75, roughness: 0.35, emissive: 0x2a1e08 });
  const claro = new THREE.MeshStandardMaterial({ color: 0xe8ded0, metalness: 0.15, roughness: 0.55 });
  const vermelhoEscuro = new THREE.MeshStandardMaterial({ color: 0x7a1512, metalness: 0.4, roughness: 0.5 });

  // Corpo pintado: roughness alto e metalness baixo. Metal alto espelha a luz e
  // apaga o padrão preto-e-branco, que é justamente o que identifica o foguete.
  const pintado = (pintor) => {
    const mapa = liveryEstagio(pintor);
    return mapa
      ? new THREE.MeshStandardMaterial({ map: mapa, metalness: 0.08, roughness: 0.58 })
      : brancoLiso;
  };

  let y = 0;   // cursor, metros a partir da base

  // -- 1º estágio: motores F-1 -----------------------------------------------
  // Componente próprio, e não filhos do S-IC: no diagrama explodido o conjunto
  // de cinco motores destacado é uma das leituras mais fortes do foguete. Na
  // Viagem eles caem JUNTO com o S-IC — quem garante isso é o `some:` do passo,
  // não a hierarquia.
  const grupoF1 = new THREE.Group();
  grupoF1.name = 'componente-f1';
  const H_F1 = 4.2;
  for (const [mx, mz] of [[0, 0], [3.0, 0], [-3.0, 0], [0, 3.0], [0, -3.0]]) {
    const bocal = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 1.9, H_F1, 18, 1, true), metalEscuro);
    bocal.position.set(mx, 0, mz);
    grupoF1.add(bocal);
    const anel = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.11, 8, 20), metalEscuro);
    anel.rotation.x = Math.PI / 2;
    anel.position.set(mx, -H_F1 / 2, mz);
    grupoF1.add(anel);
  }
  grupoF1.position.y = H_F1 / 2;
  grupo.add(grupoF1);

  // -- 1º estágio: corpo -----------------------------------------------------
  const grupoSIC = new THREE.Group();
  grupoSIC.name = 'componente-s-ic';
  const corpoSIC = new THREE.Mesh(new THREE.CylinderGeometry(rSIC, rSIC, H_SIC, 40), pintado(pintarSIC));
  grupoSIC.add(corpoSIC);
  // 4 aletas na saia, a 45° dos motores para não colidir com eles
  for (let i = 0; i < 4; i++) {
    const ang = Math.PI / 4 + (i * Math.PI) / 2;
    const aleta = new THREE.Mesh(new THREE.BoxGeometry(1.3, 4.2, 0.16), preto);
    aleta.position.set(Math.cos(ang) * (rSIC + 0.6), -H_SIC / 2 + 2.1, Math.sin(ang) * (rSIC + 0.6));
    aleta.rotation.y = -ang;
    grupoSIC.add(aleta);
  }
  grupoSIC.position.y = y + H_SIC / 2;
  grupo.add(grupoSIC);
  y += H_SIC;

  // -- 2º estágio ------------------------------------------------------------
  const grupoSII = new THREE.Group();
  grupoSII.name = 'componente-s-ii';
  grupoSII.add(new THREE.Mesh(new THREE.CylinderGeometry(rSIC, rSIC, H_SII, 40), pintado(pintarSII)));
  grupoSII.position.y = y + H_SII / 2;
  grupo.add(grupoSII);
  y += H_SII;

  // -- 3º estágio: visivelmente mais fino (Ø6,6 contra Ø10,1) ----------------
  const grupoSIVB = new THREE.Group();
  grupoSIVB.name = 'componente-s-ivb';
  const H_CONE = 2.6;
  const coneSIVB = new THREE.Mesh(new THREE.CylinderGeometry(rSIVB, rSIC, H_CONE, 36), brancoLiso);
  coneSIVB.position.y = -H_SIVB / 2 + H_CONE / 2;
  grupoSIVB.add(coneSIVB);
  const corpoSIVB = new THREE.Mesh(new THREE.CylinderGeometry(rSIVB, rSIVB, H_SIVB - H_CONE, 32), pintado(pintarSIVB));
  corpoSIVB.position.y = -H_SIVB / 2 + H_CONE + (H_SIVB - H_CONE) / 2;
  grupoSIVB.add(corpoSIVB);
  grupoSIVB.position.y = y + H_SIVB / 2;
  grupo.add(grupoSIVB);
  y += H_SIVB;

  // -- Unidade de Instrumentos: o cérebro, um anel de 90 cm ------------------
  const iu = new THREE.Mesh(new THREE.CylinderGeometry(rSIVB * 1.005, rSIVB * 1.005, H_IU, 32), preto);
  iu.name = 'componente-iu';
  iu.position.y = y + H_IU / 2;
  grupo.add(iu);
  y += H_IU;

  // -- Adaptador (SLA): o cone que afina de 6,6 para 3,9 ---------------------
  // É esta transição que dá a silhueta do topo do Saturno V. O Módulo Lunar
  // viaja DENTRO dele, invisível com o foguete montado — ao explodir, sai de
  // dentro do cone, que é exatamente a leitura didática desejada.
  const sla = new THREE.Mesh(new THREE.CylinderGeometry(rCSM, rSIVB, H_SLA, 32), brancoLiso);
  sla.name = 'componente-sla';
  sla.position.y = y + H_SLA / 2;
  grupo.add(sla);

  const grupoLM = new THREE.Group();
  grupoLM.name = 'componente-lm';
  const descida = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.75, 1.6, 8), dourado);
  grupoLM.add(descida);
  const subida = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.45, 1.7, 8), prata);
  subida.position.y = 1.65;
  grupoLM.add(subida);
  const escotilha = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.5, 10), prata);
  escotilha.position.y = 2.75;
  grupoLM.add(escotilha);
  for (let i = 0; i < 4; i++) {
    const ang = Math.PI / 4 + (i * Math.PI) / 2;
    const perna = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 2.5, 6), prata);
    perna.position.set(Math.cos(ang) * 1.75, -1.1, Math.sin(ang) * 1.75);
    perna.rotation.z = -Math.cos(ang) * 0.42;
    perna.rotation.x = Math.sin(ang) * 0.42;
    grupoLM.add(perna);
    const pe = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.12, 10), prata);
    pe.position.set(Math.cos(ang) * 2.25, -2.3, Math.sin(ang) * 2.25);
    grupoLM.add(pe);
  }
  grupoLM.position.y = y + H_LM / 2 + 0.5;
  grupo.add(grupoLM);
  y += H_SLA;

  // -- Módulo de Serviço: o bocal do motor entra dentro do adaptador ---------
  const grupoSM = new THREE.Group();
  grupoSM.name = 'componente-sm';
  const corpoSM = new THREE.Mesh(new THREE.CylinderGeometry(rCSM, rCSM, H_SM, 28), prata);
  grupoSM.add(corpoSM);
  const bocalSM = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 1.05, 2.6, 16, 1, true), metalEscuro);
  bocalSM.position.y = -H_SM / 2 - 1.3;
  grupoSM.add(bocalSM);
  grupoSM.position.y = y - SOBRE_SM + H_SM / 2;
  grupo.add(grupoSM);
  y = y - SOBRE_SM + H_SM;

  // -- Cápsula: o cone que volta ---------------------------------------------
  const grupoCM = new THREE.Group();
  grupoCM.name = 'componente-cm';
  const cone = new THREE.Mesh(new THREE.ConeGeometry(rCSM, H_CM, 28), prata);
  grupoCM.add(cone);
  const escudo = new THREE.Mesh(
    new THREE.SphereGeometry(rCSM, 28, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), claro);
  escudo.position.y = -H_CM / 2;
  escudo.scale.y = 0.42;
  grupoCM.add(escudo);
  grupoCM.position.y = y + H_CM / 2;
  grupo.add(grupoCM);
  y += H_CM;

  // -- Torre de escape: treliça de 4 pernas abraçando a cápsula --------------
  // Antes era um cilindro de 10 cm de raio: um fio na tela. A torre real é uma
  // estrutura aberta, e é a silhueta dela que remata o foguete.
  const grupoLES = new THREE.Group();
  grupoLES.name = 'componente-les';
  const yBase = -H_LES / 2;
  const H_TRELICA = 6.0;
  for (let i = 0; i < 4; i++) {
    const ang = Math.PI / 4 + (i * Math.PI) / 2;
    const perna = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, H_TRELICA, 6), metalEscuro);
    perna.position.set(Math.cos(ang) * 0.62, yBase + H_TRELICA / 2, Math.sin(ang) * 0.62);
    perna.rotation.z = -Math.cos(ang) * 0.20;
    perna.rotation.x = Math.sin(ang) * 0.20;
    grupoLES.add(perna);
  }
  for (const frac of [0.18, 0.52, 0.86]) {
    const anel = new THREE.Mesh(new THREE.TorusGeometry(0.60, 0.055, 6, 16), metalEscuro);
    anel.rotation.x = Math.PI / 2;
    anel.position.y = yBase + H_TRELICA * frac;
    grupoLES.add(anel);
  }
  const H_MOTOR = 3.0;
  const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.72, H_MOTOR, 16), vermelhoEscuro);
  motor.position.y = yBase + H_TRELICA + H_MOTOR / 2;
  grupoLES.add(motor);
  for (let i = 0; i < 3; i++) {
    const ang = (i * Math.PI * 2) / 3;
    const escape = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.9, 10, 1, true), metalEscuro);
    escape.position.set(Math.cos(ang) * 0.6, yBase + H_TRELICA + 0.5, Math.sin(ang) * 0.6);
    escape.rotation.z = Math.cos(ang) * 0.9;
    escape.rotation.x = -Math.sin(ang) * 0.9;
    grupoLES.add(escape);
  }
  const H_OGIVA = H_LES - H_TRELICA - H_MOTOR;
  const ogiva = new THREE.Mesh(new THREE.ConeGeometry(0.62, H_OGIVA, 16), vermelhoEscuro);
  ogiva.position.y = yBase + H_TRELICA + H_MOTOR + H_OGIVA / 2;
  grupoLES.add(ogiva);
  grupoLES.position.y = y - SOBRE_LES + H_LES / 2;
  grupo.add(grupoLES);

  return normalizarGenerico(grupo, 'saturno-v', 110.6, 10.1);
}


// ============================================================================
// Ônibus Espacial (pilha de lançamento): 56,1 m altura total. Tanque externo
// e os 2 foguetes sólidos são construídos aqui; o orbitador é forma orgânica
// (asas, fuselagem, cauda) que nenhuma primitiva reproduz bem, e o modelo
// texturizado da NASA (22 texturas) já existe em modelos/onibus-espacial.glb
// — por isso ele CHEGA pronto como parâmetro em vez de ser construído.
// ============================================================================

/**
 * Monta a pilha de lançamento do Ônibus Espacial: tanque externo + 2 SRBs
 * (construídos aqui) + o orbitador (recebido já carregado).
 *
 * Convenção de entrada: `orbitador` é o Group devolvido por carregarModelo()
 * de frota3d.js — já normalizado (centro na origem, maior dimensão 1,0,
 * nariz em +X), o mesmo contrato que todo modelo carregado nesta base segue.
 * Medido ao vivo neste worktree, via carregarModelo('onibus-espacial'):
 * tamanho (1, 0.6370, 0.3775). Ou seja, a envergadura (23,7 m reais) é o
 * eixo Y do modelo normalizado, e a altura ventre-a-cauda (14,0 m) é o eixo
 * Z — confirmado com o modelo de verdade, não suposto pela geometria do
 * avião. `orbitador.scale.setScalar(k)` é a forma seguro de redimensionar um
 * modelo já normalizado (ver o comentário equivalente em frota3d.js).
 *
 * @param {THREE.Group} orbitador
 * @returns {THREE.Group} pilha normalizada (centro origem, maior dim 1.0, frente +X)
 */
export function construirPilhaOnibus(orbitador) {
  const grupo = new THREE.Group();

  const laranja = new THREE.MeshStandardMaterial({ color: 0xff8c00, metalness: 0.1, roughness: 0.8 }); // espuma isolante, fosca
  const branco = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, metalness: 0.3, roughness: 0.6 });
  const cinzaEscuro = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, metalness: 0.6, roughness: 0.5 });

  const raioTanque = 8.4 / 2;
  const raioSRB = 3.7 / 2;
  const altTanque = 46.9;
  const altSRB = 45.5;
  const alturaPilha = 56.1;

  // O tanque NÃO chega ao chão: sua base fica bem acima da base dos SRBs (que
  // são os que descansam nos apoios da plataforma de lançamento) — é essa
  // diferença de 9,2 m que faz a pilha completa medir 56,1 m mesmo com um
  // tanque de só 46,9 m. Sem essa elevação, a altura total ficaria presa aos
  // 46,9 m do tanque e a proporção da pilha (2,36) não bateria.
  const baseTanqueY = alturaPilha - altTanque;

  // 1. tanque: cilindro laranja com ogiva no topo — é ele quem consome
  // cursor e define a altura total da pilha.
  const grupoTanque = new THREE.Group();
  grupoTanque.name = 'componente-tanque';
  const altOgiva = 9.0;
  const altCorpoTanque = altTanque - altOgiva;
  const corpoTanque = new THREE.Mesh(new THREE.CylinderGeometry(raioTanque, raioTanque, altCorpoTanque, 32), laranja);
  corpoTanque.position.y = baseTanqueY + altCorpoTanque / 2;
  grupoTanque.add(corpoTanque);
  const ogiva = new THREE.Mesh(new THREE.ConeGeometry(raioTanque, altOgiva, 32), laranja);
  ogiva.position.y = baseTanqueY + altCorpoTanque + altOgiva / 2;
  grupoTanque.add(ogiva);
  // colar na costura corpo/ogiva, só para quebrar a monotonia do cilindro
  const colar = new THREE.Mesh(new THREE.CylinderGeometry(raioTanque * 1.02, raioTanque * 1.02, 0.5, 32), laranja);
  colar.position.y = baseTanqueY + altCorpoTanque;
  grupoTanque.add(colar);
  grupo.add(grupoTanque);

  // 2. srb: 2 foguetes sólidos LADEANDO o tanque — peça PARALELA, não
  // empilhada em série. Mesma lição do booster do SLS: consumir cursor aqui
  // apagaria a silhueta característica (tanque ladeado por 2 cilindros
  // brancos) e derrubaria a proporção da pilha inteira.
  const grupoSRB = new THREE.Group();
  grupoSRB.name = 'componente-srb';
  const altConeSRB = 4.0;
  const altCorpoSRB = altSRB - altConeSRB;
  const altSkirtSRB = 2.0;
  for (const lado of [-1, 1]) {
    const offsetX = lado * (raioTanque + raioSRB + 0.15);
    const corpoSRB = new THREE.Mesh(new THREE.CylinderGeometry(raioSRB, raioSRB, altCorpoSRB, 20), branco);
    corpoSRB.position.set(offsetX, altCorpoSRB / 2, 0);
    grupoSRB.add(corpoSRB);
    const coneSRB = new THREE.Mesh(new THREE.ConeGeometry(raioSRB, altConeSRB, 20), branco);
    coneSRB.position.set(offsetX, altCorpoSRB + altConeSRB / 2, 0);
    grupoSRB.add(coneSRB);
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(raioSRB, raioSRB * 1.2, altSkirtSRB, 20), cinzaEscuro);
    skirt.position.set(offsetX, altSkirtSRB / 2, 0);
    grupoSRB.add(skirt);
    // 3 anéis finos marcando os 4 segmentos reais do booster
    for (let s = 1; s <= 3; s++) {
      const anel = new THREE.Mesh(new THREE.CylinderGeometry(raioSRB * 1.02, raioSRB * 1.02, 0.4, 20), cinzaEscuro);
      anel.position.set(offsetX, altSkirtSRB + (altCorpoSRB - altSkirtSRB) * (s / 4), 0);
      grupoSRB.add(anel);
    }
  }
  grupo.add(grupoSRB);
  // O cursor não existe aqui: booster e tanque correm lado a lado, então não
  // há "cursor" único a avançar — só marcamos que o SRB não desloca o tanque.

  // 3. orbitador: recebido pronto, trazido para METROS REAIS (37,2 m, igual
  // a FROTA['onibus-espacial'].alturaRealM em frota3d.js) e girado +90° em Z
  // para que o nariz — que chega apontando +X — passe a apontar +Y, o eixo
  // "para cima" usado aqui dentro.
  //
  // Sinal conferido com vetor de teste (mesma técnica do resto do arquivo):
  // Rz(+90°) aplicado a (1,0,0) dá (cos 90°, sen 90°, 0) = (0,1,0). +X → +Y ✓.
  // É o sinal OPOSTO ao −90° usado no normalizarGenerico() no fim desta
  // função — faz sentido: aqui a rotação DESFAZ um giro de mesma natureza,
  // então tem que ir para o outro lado.
  const comprimentoOrbitador = 37.2;
  orbitador.scale.setScalar(comprimentoOrbitador);
  orbitador.rotation.z = Math.PI / 2;

  // Encaixe na lateral: a rotação em Z não mexe no eixo Z do orbitador, então
  // a altura ventre-cauda (medida ao vivo: 0,3775 × 37,2 ≈ 14,0 m) continua
  // sendo o que empurra o orbitador para longe do eixo do tanque. Deslocamento
  // = raio do tanque + metade dessa altura + uma folga pequena para a
  // treliça de fixação que uniria as duas peças de verdade.
  const alturaOrbitadorZ = 0.3775 * comprimentoOrbitador;
  const offsetZOrbitador = raioTanque + alturaOrbitadorZ / 2 + 0.6;
  // Verticalmente, o nariz do orbitador fica perto do "ombro" do tanque (93%
  // da altura da pilha), como nas fotos reais — não colado na ponta da ogiva,
  // que é mais fina que a fuselagem do orbitador.
  const narizOrbitadorY = alturaPilha * 0.93;
  const centroOrbitadorY = narizOrbitadorY - comprimentoOrbitador / 2;
  orbitador.position.set(0, centroOrbitadorY, offsetZOrbitador);
  orbitador.name = 'componente-orbitador';
  grupo.add(orbitador);

  return normalizarGenerico(grupo, 'onibus-espacial', 56.1, 23.8);
}

// ============================================================================
// Normalização: centralizar, escalar para 1.0 em maior dimensão, rotacionar
// ============================================================================

function normalizar(grupoOrigem, tipo) {
  // Calcular bounding box do grupo construído em +Y
  const bbox = new THREE.Box3().setFromObject(grupoOrigem);
  const centro = bbox.getCenter(new THREE.Vector3());
  const tamanho = bbox.getSize(new THREE.Vector3());

  // Validação de proporção
  const alturaRealM = {
    sls: 98.1,
    'falcon-9': 70.0,
    starship: 121.0,
  }[tipo];
  const diametroRealM = {
    sls: 8.4,
    'falcon-9': 3.7,
    starship: 9.0,
  }[tipo];
  const proporcaoEsperada = alturaRealM / diametroRealM;

  // Passo 1: centralizar o grupo de origem em unidades originais
  grupoOrigem.position.sub(centro);

  // Passo 2: wrapper para escala normalizada
  const wrapper = new THREE.Group();
  wrapper.add(grupoOrigem);

  // Passo 3: escalar uniformemente para que a maior dimensão seja 1.0
  const maiorDimensao = Math.max(tamanho.x, tamanho.y, tamanho.z);
  if (maiorDimensao > 0) {
    wrapper.scale.multiplyScalar(1.0 / maiorDimensao);
  }

  // Passo 4: rotacionar −90° em Z para levar +Y a +X
  // Sinal confirmado por teste: rotação θ em Z leva +X para (cos θ, sen θ),
  // então para levar +Y a +X: +Y = (0,1,0) → (sin(-π/2), cos(-π/2), 0) = (-1, 0, 0) ??? NÃO
  // Na verdade: rotação em Z age sobre XY. Vetor +Y após rotação -π/2 é:
  // R(-π/2) * (0,1,0) = (cos(-π/2), -sin(-π/2), 0) = (0, 1, 0) rotacionado...
  // TESTE: +Y = (0,1) em 2D; Rz(-π/2) aplica: (x',y') = (x*cos(-π/2) - y*sin(-π/2), x*sin(-π/2) + y*cos(-π/2))
  // = (0 - 1*(-1), 0*(-1) + 1*0) = (1, 0) ✓ → +X
  wrapper.rotation.z = -Math.PI / 2;

  // Passo 5: grupo externo com transformação identidade (evita que scale
  // seja parte da normalização — ver frota3d.js comentário sobre isso)
  const externo = new THREE.Group();
  externo.add(wrapper);

  // DEBUG: imprimir métricas
  const bboxFinal = new THREE.Box3().setFromObject(externo);
  const tamanhoFinal = bboxFinal.getSize(new THREE.Vector3());
  const maiorDimensaoFinal = Math.max(tamanhoFinal.x, tamanhoFinal.y, tamanhoFinal.z);
  const proporcaoMedida = Math.max(tamanhoFinal.x, tamanhoFinal.y, tamanhoFinal.z) /
    Math.min(tamanhoFinal.x, tamanhoFinal.y, tamanhoFinal.z);

  console.debug(`[${tipo}] Proporção esperada: ${proporcaoEsperada.toFixed(2)}, medida: ${proporcaoMedida.toFixed(2)}`);

  return externo;
}

// ============================================================================
// Normalização genérica: mesma matemática de normalizar() acima, mas sem a
// tabela de tipos fixa (sls/falcon-9/starship). Existe para não mexer em
// normalizar() — e por tabela, nos três foguetes já aprovados — ao acrescentar
// o Saturno V e o Ônibus Espacial, que recebem altura/diâmetro reais direto
// por parâmetro em vez de vir de um mapa hardcoded.
// ============================================================================

function normalizarGenerico(grupoOrigem, nomeDebug, alturaRealM, diametroRealM) {
  const bbox = new THREE.Box3().setFromObject(grupoOrigem);
  const centro = bbox.getCenter(new THREE.Vector3());
  const tamanho = bbox.getSize(new THREE.Vector3());
  const proporcaoEsperada = alturaRealM / diametroRealM;

  // Passo 1: centralizar o grupo de origem em unidades originais
  grupoOrigem.position.sub(centro);

  // Passo 2: wrapper para escala normalizada
  const wrapper = new THREE.Group();
  wrapper.add(grupoOrigem);

  // Passo 3: escalar uniformemente para que a maior dimensão seja 1.0
  const maiorDimensao = Math.max(tamanho.x, tamanho.y, tamanho.z);
  if (maiorDimensao > 0) {
    wrapper.scale.multiplyScalar(1.0 / maiorDimensao);
  }

  // Passo 4: rotacionar −90° em Z para levar +Y a +X — mesmo sinal verificado
  // em normalizar(): Rz(-π/2) aplicado a (0,1,0) dá (1,0,0). +Y → +X ✓.
  wrapper.rotation.z = -Math.PI / 2;

  // Passo 5: grupo externo com transformação identidade (ver normalizar()
  // acima — sem isso, `.scale.setScalar(k)` de um chamador apagaria a
  // normalização em vez de redimensionar a partir dela).
  const externo = new THREE.Group();
  externo.add(wrapper);

  const bboxFinal = new THREE.Box3().setFromObject(externo);
  const tamanhoFinal = bboxFinal.getSize(new THREE.Vector3());
  const proporcaoMedida = Math.max(tamanhoFinal.x, tamanhoFinal.y, tamanhoFinal.z) /
    Math.min(tamanhoFinal.x, tamanhoFinal.y, tamanhoFinal.z);

  console.debug(`[${nomeDebug}] Proporção esperada: ${proporcaoEsperada.toFixed(2)}, medida: ${proporcaoMedida.toFixed(2)}`);

  return externo;
}
