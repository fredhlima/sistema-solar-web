// Módulo de carregamento e normalização da frota 3D realista
// Coordenação de 12 sondas/foguetes/rovers espaciais com normalização
// obrigatória (bboxes dispares — Hubble é 40× maior que os demais).

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// ============================================================================
// Declaração de dados — cada entrada foi medida e conferida no navegador
// ============================================================================

export const FROTA = {
  // Procedural desde a V8. O .glb do acervo NASA é uma CASCA ÚNICA: cortá-lo
  // por faixa de altura dava "módulos" que eram pedaços de tubo aberto, sem
  // tampa e sem forma própria — o Fred, olhando o desmonte: "cada módulo é
  // diferente e ele tem apenas triângulos". Construído com primitivas, cada
  // estágio nasce fechado, com o diâmetro certo e a saia de motores.
  'saturno-v': {
    procedural: 'saturno-v', nome: 'Saturno V',
    resumo: 'O foguete que levou pessoas à Lua. Voou 13 vezes e nunca perdeu uma tripulação.', tipo: 'foguete',
    alturaRealM: 110.6, eixoFrente: '+Y', missao: 'apollo-11', agencia: 'NASA',
    verticalNoHangar: true,
  },
  // Trocado para a variante (D) do acervo NASA: 22 texturas contra ZERO da (A),
  // que era usada antes e aparecia como plástico chapado. Nariz medido em +X.
  // A (A) declarava eixoFrente '+Z' quando o nariz estava de fato em −Z — o
  // modelo ficava invertido e o Hangar o punha de cabeça para baixo.
  'onibus-espacial': {
    arquivo: 'onibus-espacial.glb', nome: 'Ônibus Espacial',
    resumo: 'O primeiro veículo espacial reutilizável: subia como foguete e voltava planando para uma pista.', tipo: 'foguete',
    // Volta a 56,1 m: `pilha` completa o orbitador da NASA com o tanque
    // externo e os dois foguetes sólidos, construídos com primitivas. Antes o
    // modelo era só o orbitador (37,2 m) e o Fred notou: "ele só tem uma parte
    // do ônibus e faltam os foguetes de lançamento". As asas e a fuselagem
    // continuam vindo do .glb — forma orgânica não se faz com cilindro.
    alturaRealM: 56.1, eixoFrente: '+X', missao: null, agencia: 'NASA',
    verticalNoHangar: true, pilha: 'onibus',
  },
  'voyager': {
    arquivo: 'voyager.glb', nome: 'Voyager',
    resumo: 'A mais de 20 bilhões de quilômetros, é o objeto humano mais distante — e ainda responde.', tipo: 'sonda',
    alturaRealM: 13.0, eixoFrente: '+Z', missao: 'voyager-1', agencia: 'NASA',
  },
  'cassini': {
    arquivo: 'cassini.glb', nome: 'Cassini-Huygens',
    resumo: 'Passou 13 anos em Saturno e terminou mergulhando no planeta de propósito.', tipo: 'sonda',
    alturaRealM: 6.8, eixoFrente: '+X', missao: 'cassini', agencia: 'NASA/ESA',
  },
  'parker': {
    arquivo: 'parker.glb', nome: 'Parker Solar Probe',
    resumo: 'A nave que chega mais perto do Sol, e o objeto mais rápido já construído.', tipo: 'sonda',
    alturaRealM: 3.0, eixoFrente: '+Z', missao: 'parker', agencia: 'NASA',
  },
  'juno': {
    arquivo: 'juno.glb', nome: 'Juno',
    resumo: 'Orbita Júpiter para descobrir o que existe debaixo das nuvens.', tipo: 'sonda',
    alturaRealM: 20.0, eixoFrente: '+Y', missao: 'juno', agencia: 'NASA',
  },
  'rosetta': {
    arquivo: 'rosetta.glb', nome: 'Rosetta',
    resumo: 'A primeira a orbitar um cometa — e a deixar um módulo pousar nele.', tipo: 'sonda',
    alturaRealM: 32.0, eixoFrente: '+Z', missao: 'rosetta', agencia: 'ESA',
  },
  'perseverance': {
    arquivo: 'perseverance.glb', nome: 'Perseverance',
    resumo: 'Procura sinais de vida antiga em Marte e guarda amostras para trazer à Terra.', tipo: 'marte', classe: 'Rover',
    alturaRealM: 3.0, eixoFrente: '+Z', missao: 'perseverance', agencia: 'NASA',
  },
  'ingenuity': {
    arquivo: 'ingenuity.glb', nome: 'Ingenuity',
    resumo: 'Fez o primeiro voo motorizado em outro planeta. Devia fazer 5 voos; fez 72.', tipo: 'marte', classe: 'Helicóptero',
    alturaRealM: 1.2, eixoFrente: '+Z', missao: 'perseverance', agencia: 'NASA',
  },
  // Caso que engana o método óbvio: o eixo vertical do Módulo Lunar é o MENOR
  // da bounding box (5,01), não o maior — os 6,43 são o vão entre as pernas.
  // Medido: o raio cai de 3,22 em −Y (pernas abertas) para 1,80 em +Y, então o
  // topo é +Y e o eixoFrente já estava certo. Faltava só ficar de pé no Hangar.
  'modulo-lunar': {
    arquivo: 'modulo-lunar.glb', nome: 'Módulo Lunar',
    resumo: 'A única nave já feita para pousar em outro mundo com gente dentro.', tipo: 'sonda',
    alturaRealM: 7.0, eixoFrente: '+Y', missao: 'apollo-11', agencia: 'NASA',
    verticalNoHangar: true,
  },
  'hubble': {
    arquivo: 'hubble.glb', nome: 'Hubble',
    resumo: 'Mudou o que a humanidade sabia sobre a idade do universo.', tipo: 'telescopio',
    alturaRealM: 13.2, eixoFrente: '+Y', missao: null, agencia: 'NASA/ESA',
  },
  'jwst': {
    arquivo: 'jwst.glb', nome: 'James Webb',
    resumo: 'Enxerga a luz das primeiras galáxias, de mais de 13 bilhões de anos atrás.', tipo: 'telescopio',
    alturaRealM: 21.2, eixoFrente: '+Z', missao: null, agencia: 'NASA/ESA/CSA',
  },

  // Foguetes construídos com primitivas, em js/frota-foguetes.js. Não têm
  // arquivo: `procedural` guarda o id que o construtor entende.
  //
  // Por que não são modelos baixados: a NASA não publicou o SLS em glTF, e a
  // SpaceX é empresa privada — o conteúdo dela é protegido e as fotos passaram
  // a CC BY-NC em 2019, licença não comercial que não serve a um app com
  // paywall. Um modelo que nós construímos não carrega direito de terceiro.
  // De quebra, resolve o problema que travou o Saturno V: aqui cada componente
  // já nasce separado, sem precisar cortar malha por triângulo.
  'sls': {
    procedural: 'sls', nome: 'SLS Block 1',
    resumo: 'O foguete mais potente que a NASA já lançou — supera até o Saturno V na decolagem.', tipo: 'foguete',
    alturaRealM: 98.1, eixoFrente: '+X', missao: 'artemis-2', agencia: 'NASA',
    verticalNoHangar: true,
  },
  'falcon-9': {
    procedural: 'falcon-9', nome: 'Falcon 9',
    resumo: 'O primeiro foguete orbital que volta e pousa em pé, pronto para voar de novo.', tipo: 'foguete',
    alturaRealM: 70, eixoFrente: '+X', missao: null, agencia: 'SpaceX',
    verticalNoHangar: true,
  },
  'starship': {
    procedural: 'starship', nome: 'Starship',
    resumo: 'O maior foguete já construído, e o primeiro projetado para ser reaproveitado inteiro.', tipo: 'foguete',
    alturaRealM: 121, eixoFrente: '+X', missao: null, agencia: 'SpaceX',
    verticalNoHangar: true,
  },
};

// ============================================================================
// Singleton de loader com suporte a Draco (obrigatório para offline)
// ============================================================================

// Cache-busting dos .glb. Os módulos JS do projeto já usam ?v=N (ver CLAUDE.md),
// mas os MODELOS não tinham — e trocar o arquivo no servidor não chegava a quem
// já o tivesse em cache. Aconteceu de verdade: a troca do ônibus espacial pela
// variante texturizada não apareceu no navegador até forçar o parâmetro.
// Incremente ao substituir QUALQUER arquivo em modelos/.
const VERSAO_MODELOS = 2;

let loader = null;
let dracoLoader = null;

function inicializarLoaders() {
  if (loader) return;
  dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('./lib/draco/');
  loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
}

// ============================================================================
// Cache de modelos: guarda o gltf original, para poder clonar sem risco
// de que dois usos do mesmo modelo se interfiram.
// ============================================================================

const cache = new Map();
const promessasCarregamento = new Map();

// ============================================================================
// Normalização: centraliza, escala, rotaciona de modo que eixoFrente → +X
// ============================================================================

function normalizarModelo(gltf, eixoFrente) {
  const scene = gltf.scene;

  // Passo 1: calcular bbox
  const bbox = new THREE.Box3().setFromObject(scene);
  const centro = bbox.getCenter(new THREE.Vector3());
  const tamanhoOriginal = bbox.getSize(new THREE.Vector3());
  const maiorDimensao = Math.max(tamanhoOriginal.x, tamanhoOriginal.y, tamanhoOriginal.z);

  // Passo 2: centralizar NO SCENE ORIGINAL (em unidades originais)
  // CRÍTICO: em Three.js, a matriz de transformação compõe como M = T · R · S
  // (translação · rotação · escala), ou seja, translação é aplicada DEPOIS da escala.
  // Se aplicarmos ambas no mesmo objeto, a centralização fica errada.
  // Solução: centralizar no filho (scene) em unidades originais, escala/rotação no wrapper.
  scene.position.sub(centro);

  // Passo 3: criar wrapper e aplicar escala e rotação nele
  const wrapper = new THREE.Group();
  wrapper.add(scene);

  // Passo 3b: um grupo EXTERNO, com transformação identidade, é o que vai para
  // o chamador. Sem ele, o objeto devolvido carregaria a escala de normalização
  // (1/maiorDimensão) na própria propriedade `scale` — e qualquer chamador que
  // fizesse `modelo.scale.setScalar(k)`, o gesto mais natural do mundo, APAGARIA
  // a normalização e ressuscitaria o tamanho bruto do arquivo.
  //
  // Isso não é hipotético: aconteceu duas vezes nesta base. A Voyager saiu 17×
  // maior que o pretendido e o Hubble foi para 402 unidades numa cena em que a
  // Lua tem 1,15. Uma API que exige do chamador lembrar de usar
  // `multiplyScalar` em vez de `setScalar` é uma armadilha, não um contrato;
  // com o grupo externo, `setScalar(k)` simplesmente resulta em k unidades.
  const externo = new THREE.Group();
  externo.add(wrapper);
  gltf.scene = externo;

  // Passo 4: escalar uniformemente para que a maior dimensão seja 1.0
  if (maiorDimensao > 0) {
    wrapper.scale.multiplyScalar(1.0 / maiorDimensao);
  }

  // Passo 5: rotacionar de modo que eixoFrente aponte para +X
  // Rotações em múltiplos de 90° apenas — sem quaternions arbitrários.
  // Ordem de Euler: XYZ (padrão Three.js).
  if (eixoFrente !== '+X') {
    const rotacao = new THREE.Euler();
    switch (eixoFrente) {
      case '+Y':
        // +Y → +X: -π/2 ao redor de Z (ordem XYZ)
        rotacao.set(0, 0, -Math.PI / 2);
        break;
      case '+Z':
        // +Z → +X: π/2 ao redor de Y (ordem XYZ)
        rotacao.set(0, Math.PI / 2, 0);
        break;
      case '-X':
        // -X → +X: π ao redor de Y (ordem XYZ)
        rotacao.set(0, Math.PI, 0);
        break;
      case '-Y':
        // -Y → +X: π/2 ao redor de Z (ordem XYZ)
        rotacao.set(0, 0, Math.PI / 2);
        break;
      case '-Z':
        // -Z → +X: -π/2 ao redor de Y (ordem XYZ)
        rotacao.set(0, -Math.PI / 2, 0);
        break;
      default:
        throw new Error(`eixoFrente inválido: ${eixoFrente}`);
    }
    wrapper.quaternion.setFromEuler(rotacao);
  }

  // Passo 6: desabilitar sombras (cena do projeto não usa, ativar derrubaria
  // performance no celular).
  scene.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = false;
      o.receiveShadow = false;
    }
  });

  return gltf;
}

// ============================================================================
// Função pública: carregar modelo (com cache, clonagem, e compartilhamento
// de promessas para chamadas concorrentes).
// ============================================================================

export async function carregarModelo(id) {
  // Validação
  if (!FROTA.hasOwnProperty(id)) {
    throw new Error(`id de modelo inválido: '${id}'. Use uma das chaves em FROTA.`);
  }

  // Veículo procedural: não há arquivo para baixar, a geometria é construída
  // com primitivas. Sai do mesmo contrato dos demais (centrado na origem, 1,0
  // na maior dimensão, frente em +X), então o resto do app não precisa saber a
  // diferença. Import dinâmico para o módulo dos foguetes só entrar na memória
  // de quem realmente abrir um deles.
  if (FROTA[id].procedural) {
    const { construirFoguete } = await import('./frota-foguetes.js?v=5');
    return construirFoguete(FROTA[id].procedural);
  }

  inicializarLoaders();

  // Se já está sendo carregado, reutilizar a mesma promessa
  if (promessasCarregamento.has(id)) {
    const gltfOriginal = await promessasCarregamento.get(id);
    return await montarPilha(id, gltfOriginal.scene.clone(true));
  }

  // Se já está em cache, devolver clone
  if (cache.has(id)) {
    const gltfOriginal = cache.get(id);
    return await montarPilha(id, gltfOriginal.scene.clone(true));
  }

  // Carregar (e guardar a promessa para compartilhar com chamadas concorrentes)
  const promessaCarregamento = loader.loadAsync(`./modelos/${FROTA[id].arquivo}?v=${VERSAO_MODELOS}`)
    .then((gltf) => {
      // Normalizar o modelo original
      normalizarModelo(gltf, FROTA[id].eixoFrente);
      // Guardar em cache
      cache.set(id, gltf);
      // Remover a promessa do mapa de pendências
      promessasCarregamento.delete(id);
      return gltf;
    })
    .catch((erro) => {
      promessasCarregamento.delete(id);
      throw erro;
    });

  promessasCarregamento.set(id, promessaCarregamento);
  const gltfOriginal = await promessaCarregamento;
  return await montarPilha(id, gltfOriginal.scene.clone(true));
}

// Veículo híbrido: o .glb entrega a parte de forma orgânica e as primitivas
// completam o resto. Tem de rodar DEPOIS da normalização — construirPilhaOnibus
// dimensiona tanque e foguetes em unidades onde 1,0 é o comprimento do
// orbitador. Passar o modelo em metros crus encolhe o tanque 27 vezes.
async function montarPilha(id, modelo) {
  if (!FROTA[id].pilha) return modelo;
  const { construirPilhaOnibus } = await import('./frota-foguetes.js?v=5');
  return construirPilhaOnibus(modelo);
}

// ============================================================================
// Tamanho da nave na cena das trajetórias
// ============================================================================

// Escala fiel é impossível: a Voyager tem 13 m e a Terra 12.742 km — proporção
// de 1 para 980 mil. Com a Terra em 2,2 u a Voyager mediria 0,0000022 u.
//
// A primeira versão desta feature dimensionou a nave pela escala do MARCADOR
// (o sprite com glow), que é deliberadamente exagerado para ser achável de
// longe. O resultado: a Voyager saiu com 1,80 u — 82% do diâmetro da Terra e
// quase o DOBRO de Plutão. Um ponto brilhante grande o usuário lê como
// "marcador"; uma Voyager detalhada do mesmo tamanho ele lê como afirmação de
// tamanho, e a afirmação estava errada por 5 ordens de grandeza.
//
// Agora o tamanho vem da dimensão REAL do veículo, comprimida por raiz
// quadrada. A raiz existe porque a faixa real vai de 1,2 m (Ingenuity) a
// 110,6 m (Saturno V), quase 100×: proporção linear deixaria as sondas
// pequenas em tamanho sub-pixel mesmo de perto. A compressão preserva a ordem
// ("o Saturno V é o maior") sem tornar as menores invisíveis — é o mesmo
// recurso didático que o projeto já usa nas órbitas das luas.
const TAMANHO_MAIOR_NAVE_U = 0.09; // Saturno V: 1/10 do diâmetro de Fobos (0,90 u)
const MAIOR_ALTURA_REAL_M = 110.6; // Saturno V

export function tamanhoNaCena(id) {
  const v = FROTA[id];
  if (!v) return TAMANHO_MAIOR_NAVE_U;
  return TAMANHO_MAIOR_NAVE_U * Math.sqrt(v.alturaRealM / MAIOR_ALTURA_REAL_M);
}

// ============================================================================
// Função pública: verificar se um modelo está em cache
// ============================================================================

export function modeloEmCache(id) {
  return cache.has(id);
}

// ============================================================================
// Função pública: descartar frota (libera geometrias, texturas, loaders)
// ============================================================================

export function descartarFrota() {
  // Limpar cache
  for (const gltf of cache.values()) {
    // Three.js dispose de geometrias e materiais
    gltf.scene.traverse((o) => {
      if (o.isMesh) {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) {
            o.material.forEach((m) => m.dispose());
          } else {
            o.material.dispose();
          }
        }
      }
    });
  }
  cache.clear();
  promessasCarregamento.clear();

  // Limpar loaders
  if (dracoLoader) {
    dracoLoader.dispose();
    dracoLoader = null;
  }
  loader = null;
}
