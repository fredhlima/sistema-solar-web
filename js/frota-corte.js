// Corte de um modelo 3D em componentes, no nível do TRIÂNGULO.
//
// Por que isto existe: os modelos da NASA não têm estágios como peças
// separadas. Medido no Saturno V (52 malhas, espaço normalizado com o eixo
// longo em X de −0,5 a +0,5): três malhas atravessam o foguete INTEIRO — uma
// delas ocupa de −0,468 a 0,439. O casco é uma peça só, e os 35 objetos
// concentrados na base são os motores F-1.
//
// Isso condena a abordagem óbvia de "classificar cada malha pela faixa em que
// o centro dela cai": uma malha É o foguete todo, então ela cai numa faixa só e
// as outras ficam vazias. Foi exatamente o que aconteceu — 3 componentes em vez
// de 7, e nenhum ajuste de faixa resolveria.
//
// A saída é atribuir cada TRIÂNGULO ao componente onde está o seu baricentro e
// montar uma geometria nova por componente. A fronteira fica irregular em no
// máximo a largura de um triângulo, o que nesta escala é invisível.

import * as THREE from 'three';

// Índice do eixo a partir do vetor de máscara: [1,0,0] -> 0 (X)
function indiceDoEixo(eixo) {
  if (eixo[0]) return 0;
  if (eixo[1]) return 1;
  return 2;
}

// Constrói uma geometria com o MESMO buffer de vértices da original e apenas um
// índice diferente. Compartilhar os atributos (em vez de copiar vértices) é o
// que mantém o custo de memória perto de zero: as 7 partes do Saturno V somadas
// não ocupam mais espaço de vértice que o modelo inteiro ocupava antes.
function geometriaComIndice(original, indices) {
  const g = new THREE.BufferGeometry();
  for (const nome of Object.keys(original.attributes)) {
    g.setAttribute(nome, original.attributes[nome]);
  }
  const Tipo = indices.some((i) => i > 65535) ? Uint32Array : Uint16Array;
  g.setIndex(new THREE.BufferAttribute(new Tipo(indices), 1));

  // A caixa delimitadora tem que ser calculada À MÃO, sobre os vértices que o
  // índice realmente usa.
  //
  // `computeBoundingBox()` do Three mede o ATRIBUTO position inteiro e ignora o
  // índice. Como estas geometrias compartilham o buffer de vértices do modelo
  // original (é o que as torna baratas), o método embutido devolveria a caixa
  // do foguete inteiro para CADA peça. Foi o que aconteceu: os 7 componentes
  // relatavam o mesmo centro e o mesmo tamanho, o deslocamento de explosão
  // calculado a partir deles dava zero, e as peças mal se separavam.
  const pos = original.attributes.position;
  const caixa = new THREE.Box3();
  const v = new THREE.Vector3();
  for (let i = 0; i < indices.length; i++) {
    caixa.expandByPoint(v.fromBufferAttribute(pos, indices[i]));
  }
  g.boundingBox = caixa;
  g.boundingSphere = caixa.getBoundingSphere(new THREE.Sphere());
  return g;
}

/**
 * Corta `modelo` em componentes.
 *
 * @param {THREE.Object3D} modelo  Grupo devolvido por carregarModelo() — já
 *   normalizado (centrado na origem, 1,0 unidade na maior dimensão).
 * @param {Array} partes  [{ id, de, ate, ... }] faixas ao longo do eixo, OU
 *   [{ id, regra(v) -> bool, ... }] para corte por regra livre.
 * @param {number[]} eixo  Máscara do eixo do corte por faixa, ex.: [1,0,0].
 * @returns {Array} [{ parte, grupo, triangulos }] apenas para componentes não vazios.
 */
export function cortarEmComponentes(modelo, partes, eixo = [1, 0, 0]) {
  const iEixo = indiceDoEixo(eixo);
  const porRegra = typeof partes[0]?.regra === 'function';

  // As faixas valem no espaço LOCAL DO MODELO. Sem atualizar as matrizes antes
  // de ler, matrixWorld das malhas ainda é identidade e os baricentros saem nas
  // coordenadas brutas do arquivo (o Saturno V ia a y≈6,7 em vez de 0,5).
  modelo.updateMatrixWorld(true);
  const paraLocal = new THREE.Matrix4().copy(modelo.matrixWorld).invert();

  const originais = [];
  modelo.traverse((o) => { if (o.isMesh) originais.push(o); });

  // id do componente -> lista de malhas novas
  const porComponente = new Map(partes.map((p) => [p.id, []]));
  let trianglosTotais = 0;
  let trianglosAtribuidos = 0;

  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const centro = new THREE.Vector3();

  for (const malha of originais) {
    const geo = malha.geometry;
    const pos = geo.attributes.position;
    if (!pos) continue;

    // Caminho exato: quando o modelo traz nomes de material com significado, a
    // malha inteira vai para o componente cujo padrão casa. É melhor que
    // qualquer corte geométrico — o autor do modelo já disse o que é cada peça.
    // O orbitador do Ônibus é assim ("shut-bay-*", "cockpit side", "wingtop",
    // "OMS pod"); o Saturno V não é (só "blinn1SG", "blinn2SG"), e por isso
    // continua dependendo do corte por faixa.
    const parteMat = escolherPorMaterial(partes, malha);
    if (parteMat) {
      const nTriMat = (geo.index ? geo.index.count : pos.count) / 3;
      trianglosTotais += nTriMat;
      trianglosAtribuidos += nTriMat;
      porComponente.get(parteMat.id).push({ malha, geo, indices: null });
      continue;
    }

    // Malha com múltiplos materiais usa `geometry.groups`, e recortá-la exigiria
    // refazer os grupos. Nenhum dos veículos com desmonte cai neste caso; se um
    // cair, ela vai inteira para o componente do próprio centro, em vez de sumir.
    const multiMaterial = Array.isArray(malha.material);

    const idx = geo.index;
    const nTri = (idx ? idx.count : pos.count) / 3;
    trianglosTotais += nTri;

    // Matriz malha -> espaço local do modelo
    const paraModelo = new THREE.Matrix4().multiplyMatrices(paraLocal, malha.matrixWorld);

    if (multiMaterial) {
      centro.copy(geo.boundingBox ? geo.boundingBox.getCenter(new THREE.Vector3())
        : (geo.computeBoundingBox(), geo.boundingBox.getCenter(new THREE.Vector3())));
      centro.applyMatrix4(paraModelo);
      const p = escolherParte(partes, centro, iEixo, porRegra);
      if (p) porComponente.get(p.id).push({ malha, geo, indices: null });
      continue;
    }

    // Balde de índices por componente
    const baldes = new Map(partes.map((p) => [p.id, []]));

    for (let t = 0; t < nTri; t++) {
      const i0 = idx ? idx.getX(t * 3) : t * 3;
      const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
      const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      a.fromBufferAttribute(pos, i0);
      b.fromBufferAttribute(pos, i1);
      c.fromBufferAttribute(pos, i2);
      centro.copy(a).add(b).add(c).multiplyScalar(1 / 3).applyMatrix4(paraModelo);

      const p = escolherParte(partes, centro, iEixo, porRegra);
      if (!p) continue;
      const balde = baldes.get(p.id);
      balde.push(i0, i1, i2);
      trianglosAtribuidos++;
    }

    for (const [idParte, indices] of baldes) {
      if (indices.length === 0) continue;
      porComponente.get(idParte).push({ malha, geo, indices });
    }
  }

  // Monta os grupos na cena
  const resultado = [];
  for (const parte of partes) {
    const pedacos = porComponente.get(parte.id);
    if (!pedacos || pedacos.length === 0) continue;

    const grupo = new THREE.Group();
    grupo.name = `componente-${parte.id}`;
    // O grupo entra na hierarquia ANTES de receber as malhas, para que a
    // transformação local calculada abaixo já valha contra o pai definitivo.
    modelo.add(grupo);

    let tri = 0;
    for (const { malha, geo, indices } of pedacos) {
      const novaGeo = indices ? geometriaComIndice(geo, indices) : geo;
      tri += indices ? indices.length / 3 : (geo.index ? geo.index.count : geo.attributes.position.count) / 3;
      const nova = new THREE.Mesh(novaGeo, malha.material);
      // Reproduz a posição da malha original, mas expressa em relação ao grupo
      // (que é filho do modelo): mundo da original -> local do modelo.
      nova.matrixAutoUpdate = true;
      const m = new THREE.Matrix4().multiplyMatrices(paraLocal, malha.matrixWorld);
      m.decompose(nova.position, nova.quaternion, nova.scale);
      nova.castShadow = false;
      nova.receiveShadow = false;
      grupo.add(nova);
    }

    resultado.push({ parte, grupo, triangulos: Math.round(tri) });
  }

  // As malhas originais saem de cena — o que se vê agora são os recortes.
  for (const malha of originais) {
    if (malha.parent) malha.parent.remove(malha);
  }

  resultado.__diagnostico = {
    trianglosTotais: Math.round(trianglosTotais),
    trianglosAtribuidos: Math.round(trianglosAtribuidos),
    componentes: resultado.length,
  };
  return resultado;
}

// Casa a malha pelo NOME DO MATERIAL, quando as partes declaram `material`.
// A ordem das partes é a prioridade: a primeira que casar vence, então padrões
// mais específicos devem vir antes dos genéricos.
function escolherPorMaterial(partes, malha) {
  const mat = malha.material;
  if (!mat || Array.isArray(mat)) return null;
  const nome = mat.name || '';
  if (!nome) return null;
  for (const p of partes) {
    if (p.material && p.material.test(nome)) return p;
  }
  return null;
}

function escolherParte(partes, v, iEixo, porRegra) {
  if (porRegra) {
    for (const p of partes) if (p.regra(v)) return p;
    return null;
  }
  const x = v.getComponent(iEixo);
  for (const p of partes) if (x >= p.de && x < p.ate) return p;
  // Fora de todas as faixas por arredondamento na borda: cai na mais próxima,
  // para nenhum triângulo sumir do modelo.
  let melhor = null, dist = Infinity;
  for (const p of partes) {
    const d = x < p.de ? p.de - x : x > p.ate ? x - p.ate : 0;
    if (d < dist) { dist = d; melhor = p; }
  }
  return melhor;
}
