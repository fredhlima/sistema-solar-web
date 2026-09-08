import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { criarTexturaCanvas, criarTexturaAneis } from './texturas.js?v=4';

const J2000_EPOCH = new Date('2000-01-01T12:00:00Z').getTime();
const UA_KM = 149.6e6;

// Constantes de módulo para o spin em torno do eixo inclinado (evita
// alocação por frame em _atualizarFisica — ver uso mais abaixo).
const _EIXO_X = new THREE.Vector3(1, 0, 0);
const _EIXO_Y = new THREE.Vector3(0, 1, 0);
const _qSpinTmp = new THREE.Quaternion();

// Sprite circular suave compartilhado por estrelas e partículas dos cinturões
// (sem ele, THREE.Points desenha quadrados sólidos)
let _texturaPonto = null;
function texturaPontoCircular() {
  if (_texturaPonto) return _texturaPonto;
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.7)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  _texturaPonto = new THREE.CanvasTexture(c);
  // O <canvas> guarda os pixels PREMULTIPLICADOS internamente, e o navegador
  // aplica dithering no gradiente — na faixa de alpha quase zero (perto da
  // borda), cada canal RGB dithera para 0 ou 1 de forma independente. Com
  // premultiplyAlpha=false (padrão), o navegador desmultiplica (RGB ÷ alpha)
  // ao subir a textura pra GPU: um texel premultiplicado tipo (1,0,1,1) vira
  // (255,0,255) — magenta puro — pois a divisão por alpha≈0 amplifica o
  // lixo de dithering em cor saturada. Isso normalmente é invisível (alpha
  // ~0), mas o alphaTest do material + a interpolação bilinear com texels
  // vizinhos opacos deixam passar esse pixel-lixo, visto pelo Fred como
  // "confete" colorido nas estrelas e nas partículas dos cinturões.
  // premultiplyAlpha=true faz o navegador NÃO desmultiplicar — sem divisão,
  // sem amplificação — e com dados premultiplicados o mipmap automático
  // volta a ser matematicamente correto, então deixamos ele ligado (ajuda
  // a suavizar os pontos quando vistos de longe).
  _texturaPonto.premultiplyAlpha = true;
  return _texturaPonto;
}

export class SistemaSolar3D {
  constructor(canvas, dados) {
    this.canvas = canvas;
    this.dados = dados;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.tempoDias = (Date.now() - J2000_EPOCH) / (24 * 3600 * 1000);
    this._velocidade = 1;
    this._escala = 'didatica';
    this.corposFisicos = new Map();
    this.corposSelecionado = null;
    this.corpoFocado = null;
    this.offsetCameraFocado = new THREE.Vector3();
    this.orbitasVisiveis = true;
    this.rotulosVisiveis = true;
    this.aoSelecionar = null;
    this.tweenFoco = null;
    this.linhasOrbita = new Map();
    this.ultimaPosicaoMouse = { x: 0, y: 0 };
    this.inicialMouse = { x: 0, y: 0 };
    this._atualizacoesExtras = [];
    this.aoMudarEscala = null;
    // Alvo dinâmico (ex.: nave de uma missão): função que retorna a
    // posição atual do alvo a cada quadro, ou null
    this._seguirFn = null;
    // Id de quem está sendo seguido dinamicamente (ex.: id da missão), ou
    // null. Permite a quem disparar eventos por-frame (ex.: trajetorias.js)
    // checar "é ESTA a missão que a câmera está seguindo agora", não apenas
    // "está visível" — visibilidade e seguimento são conceitos diferentes.
    this._seguirId = null;
    // Palco (SPEC-estacoes-e-mares.md §2.2): cena alternativa renderizada pelo
    // MESMO renderer. Enquanto != null, o loop desvia antes da física — a cena
    // principal congela (tempoDias não avança) e nada dela é atualizado.
    this._palco = null;
    this._controlsAtivosAntesDoPalco = true;
  }

  iniciar() {
    this._criarRenderer();
    this._criarCena();
    this._criarCamara();
    this._criarControles();
    this._criarIluminacao();
    this._criarEstrelas();
    this._montarCorpos();
    this._configurarEventos();
    this._carregarTexturasReais();
    this._loop();
  }

  // Troca texturas procedurais por imagens reais quando existirem em
  // texturas/ (manifest.json lista os ids disponíveis). Sem rede ou sem a
  // pasta, o visual procedural permanece — o app nunca depende disso.
  // ?v= aqui evita servir um manifest.json/jpg em cache divergente do atual
  // (diferente do resto do projeto, este caminho não tinha cache-busting).
  async _carregarTexturasReais() {
    const V = 30;
    try {
      const resp = await fetch(`texturas/manifest.json?v=${V}`);
      if (!resp.ok) return;
      const ids = await resp.json();
      const loader = new THREE.TextureLoader();
      for (const id of ids) {
        const fisico = this.corposFisicos.get(id);
        if (!fisico || !fisico.mesh || !fisico.mesh.material || fisico.isCinturao) continue;
        loader.load(
          `texturas/${id}.jpg?v=${V}`,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
            fisico.mesh.material.map = tex;
            fisico.mesh.material.needsUpdate = true;
          },
          undefined,
          (erro) => console.warn(`Textura real de "${id}" falhou ao carregar, mantendo procedural:`, erro)
        );
      }

      // Nuvens da Terra: a camada era um véu branco uniforme (opacity 0.2
      // sem padrão nenhum) — a textura real (mapa de densidade de nuvens,
      // Solar System Scope CC BY 4.0, mesma família das demais) vira
      // alphaMap: branco=nuvem opaca, preto=céu limpo/transparente. Só a
      // FORMA das nuvens muda; a esfera de nuvens/rotação já existiam.
      const fisicoTerra = this.corposFisicos.get('terra');
      const meshNuvens = fisicoTerra?.grupoOrbita?.userData?.meshNuvens;
      if (meshNuvens) {
        loader.load(
          `texturas/terra_nuvens.jpg?v=${V}`,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
            meshNuvens.material.alphaMap = tex;
            meshNuvens.material.opacity = 0.85;
            meshNuvens.material.depthWrite = false;
            meshNuvens.material.needsUpdate = true;
          },
          undefined,
          (erro) => console.warn('Textura de nuvens da Terra falhou ao carregar, mantendo véu uniforme:', erro)
        );
      }
    } catch (e) {
      // offline ou pasta ausente: mantém texturas procedurais
    }
  }

  adicionarAtualizacao(fn) {
    this._atualizacoesExtras.push(fn);
  }

  // Resolve a equação de Kepler E - e·sin(E) = M por Newton-Raphson.
  // Espelhado em tests/validacao-fisica.mjs — mantenha os dois em sincronia.
  _resolverKepler(MRad, e) {
    // e === 0, não !e: !NaN também é true, e uma excentricidade NaN (dado
    // upstream inválido) deve propagar um erro visível, não virar "órbita
    // circular" silenciosa.
    if (e === 0) return MRad;
    const TAU = Math.PI * 2;
    let Mn = MRad % TAU;
    if (Mn < 0) Mn += TAU;
    let E = e < 0.8 ? Mn : Math.PI;
    for (let i = 0; i < 30; i++) {
      const dE = (E - e * Math.sin(E) - Mn) / (1 - e * Math.cos(E));
      E -= dE;
      if (Math.abs(dE) < 1e-9) break;
    }
    return E;
  }

  irParaData(dataISO) {
    const ms = Date.parse(dataISO);
    if (!Number.isFinite(ms)) return;
    this.tempoDias = (ms - J2000_EPOCH) / (24 * 3600 * 1000);
  }

  // Posição MUNDIAL de um corpo em uma data arbitrária, na escala atual
  posicaoCorpoEm(id, dataISO) {
    const corpo = this.dados.corpos.find((c) => c.id === id);
    if (!corpo) return null;
    const ms = Date.parse(dataISO);
    if (!Number.isFinite(ms)) return null;
    const tempo = (ms - J2000_EPOCH) / (24 * 3600 * 1000);
    return this._calcularPosicao(corpo, false, tempo);
  }

  _criarRenderer() {
    // logarithmicDepthBuffer: o near plane vai a 5e-5 (foco em corpos minúsculos como
    // Hubble/asteroides) enquanto far fica em 12000 — razão ~2,4e8, muito além do que
    // um depth buffer linear aguenta (~1e5-1e6). Sem isso, corpos distantes na mesma
    // cena (ex.: o Sol, visto depois de focar o Hubble) sofrem z-fighting severo
    // (textura "piscando"/ruído). Custo de performance é desprezível nesta cena.
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, logarithmicDepthBuffer: true });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
    this._ajustarTamanoRenderer();
  }

  _ajustarTamanoRenderer() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    if (this._palco && this._palco.aoRedimensionar) this._palco.aoRedimensionar(w, h);
    if (this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this._aplicarDeslocamentoVisao();
    }
  }

  // UX (dock mobile): quando um painel cobre a fração ESQUERDA da tela, desloca
  // a ótica para a direita para centralizar o astro na metade livre — sem zoom
  // nem mexer na cena. fracaoEsquerda 0 = sem deslocamento.
  setDeslocamentoVisao(fracaoEsquerda) {
    this._deslocVisaoFrac = fracaoEsquerda || 0;
    this._aplicarDeslocamentoVisao();
  }
  _aplicarDeslocamentoVisao() {
    if (!this.camera) return;
    const f = this._deslocVisaoFrac || 0;
    const w = window.innerWidth, h = window.innerHeight;
    if (f > 0) this.camera.setViewOffset(w, h, -f / 2 * w, 0, w, h);
    else if (this.camera.view) this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
  }

  _criarCena() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04060e);
  }

  _criarCamara() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(55, w / h, 0.05, 12000);
    this.camera.position.set(0, 260, 420);
  }

  _criarControles() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = false;
    this.controls.minDistance = 0.06; // acima do near plane (0,05); dá folga p/ o foco de corpos pequenos na escala real e um pouco mais de zoom manual
    this.controls.maxDistance = 3800;
    this.controls.target.set(0, 0, 0);
  }

  // Ajusta near plane e zoom mínimo ao corpo focado: com raios visuais que
  // variam ~6 ordens de magnitude entre as escalas (piso 0,0003 na Real até
  // Sol 9), valores fixos cortavam a esfera (near > distância da superfície,
  // virando "anel" — near plane fatiando a casca) ou deixavam atravessá-la
  // (minDistance < raio, a câmera entrando no corpo). Sem corpo focado, volta
  // aos padrões da visão geral.
  //
  // Piso do near escolhido (5e-5): no zoom máximo (minDistance = raio×1,35),
  // a distância da câmera até a superfície é minDistance − raio = 0,35×raio.
  // Para nunca cortar a esfera, near precisa ficar abaixo disso. O near
  // "ideal" (raio/50 = 0,02×raio) já garante isso com folga para qualquer
  // raio — mas o Math.max abaixo impõe um piso ABSOLUTO para o caso de
  // raio/50 ficar rente à precisão de ponto flutuante em corpos minúsculos.
  // O menor raio visual do sistema é o PISO_MINIMO de 0,0003 (asteroides/
  // núcleos de cometa); nesse caso 0,35×raio = 1,05e-4. Um piso absoluto de
  // 1e-4 já ficaria perigosamente perto desse limite (sem margem); 5e-5
  // fica com ~2x de folga abaixo de 1,05e-4 para TODO corpo do sistema
  // (o pior caso é justamente o PISO_MINIMO), então é o valor usado.
  _ajustarCameraParaCorpo(corpoId) {
    const fisico = corpoId ? this.corposFisicos.get(corpoId) : null;
    if (fisico && fisico.escala && !fisico.isCinturao) {
      const raio = fisico.escala.raio;
      // near bem menor que a menor distância de aproximação possível
      this.camera.near = Math.max(5e-5, raio / 50);
      this.controls.minDistance = raio * 1.35;
    } else {
      this.camera.near = 0.05;
      this.controls.minDistance = 0.06;
    }
    this.camera.updateProjectionMatrix();
  }

  _criarIluminacao() {
    // Light ambiente fraca (deixa o lado noturno visível, didático)
    const ambientLight = new THREE.AmbientLight(0x46546e, 0.55);
    this.scene.add(ambientLight);

    // PointLight do Sol — decay 0 (4º parâmetro!) para iluminar o sistema
    // inteiro sem atenuação física; com decay padrão 2 tudo fica preto
    const sunLight = new THREE.PointLight(0xffffff, 2.2, 0, 0);
    sunLight.position.set(0, 0, 0);
    this.scene.add(sunLight);
  }

  _criarEstrelas() {
    const numEstrelas = 2200;
    const posicoes = new Float32Array(numEstrelas * 3);
    const cores = new Float32Array(numEstrelas * 3);
    const tamanhos = new Float32Array(numEstrelas);

    for (let i = 0; i < numEstrelas; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 4000;

      posicoes[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posicoes[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posicoes[i * 3 + 2] = r * Math.cos(phi);

      const brilho = Math.random();
      const tempoQuente = Math.random() > 0.7;

      if (tempoQuente) {
        cores[i * 3] = 1;
        cores[i * 3 + 1] = 0.8;
        cores[i * 3 + 2] = 0.6;
      } else if (Math.random() > 0.8) {
        cores[i * 3] = 0.6;
        cores[i * 3 + 1] = 0.8;
        cores[i * 3 + 2] = 1;
      } else {
        cores[i * 3] = 1;
        cores[i * 3 + 1] = 1;
        cores[i * 3 + 2] = 1;
      }

      tamanhos[i] = brilho * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posicoes, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(cores, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(tamanhos, 1));

    const material = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      sizeAttenuation: false,
      map: texturaPontoCircular(),
      transparent: true,
      premultipliedAlpha: true,
      depthWrite: false,
    });

    const stars = new THREE.Points(geometry, material);
    this.scene.add(stars);
  }

  _montarCorpos() {
    const solGeometry = new THREE.SphereGeometry(1, 64, 64);
    this.geometriaBases = {
      solGeometry,
      planetaGeometry: new THREE.SphereGeometry(1, 64, 32),
    };

    for (const corpo of this.dados.corpos) {
      if (corpo.tipo === 'cinturao') {
        this._criarCinturao(corpo);
      } else if (corpo.tipo === 'cometa') {
        this._criarCometa(corpo);
      } else if (corpo.tipo === 'sonda') {
        this._criarSonda(corpo);
      } else {
        this._criarCorpo(corpo);
      }
    }

    // Montar hierarquia de órbitas (luas)
    for (const corpo of this.dados.corpos) {
      if (corpo.pai && corpo.pai !== 'sol') {
        const corpoPai = this.dados.corpos.find((c) => c.id === corpo.pai);
        const paiMesh = this.corposFisicos.get(corpo.pai);
        if (paiMesh && paiMesh.grupoOrbita) {
          const corpMesh = this.corposFisicos.get(corpo.id);
          if (corpMesh) {
            paiMesh.grupoOrbita.add(corpMesh.grupoOrbita);
          }
        }
      }
    }
  }

  _criarCorpo(corpo) {
    const escala = this._calcularEscala(corpo);
    // Usar relativo se é lua com pai não-sol
    const temPai = corpo.pai && corpo.pai !== 'sol';
    const posicao = this._calcularPosicao(corpo, temPai);

    // Grupo para órbita
    const grupoOrbita = new THREE.Group();
    grupoOrbita.position.copy(posicao);
    grupoOrbita.userData.corpo = corpo;

    // Mesh do corpo
    let geometry, material, mesh;

    if (corpo.tipo === 'estrela') {
      geometry = this.geometriaBases.solGeometry.clone();
      const texturaSol = new THREE.CanvasTexture(criarTexturaCanvas(corpo));
      texturaSol.colorSpace = THREE.SRGBColorSpace;
      texturaSol.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      material = new THREE.MeshBasicMaterial({ map: texturaSol });
      mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(escala.raio, escala.raio, escala.raio);

      // Glow do Sol
      this._adicionarGlowSol(grupoOrbita, escala.raio);
    } else {
      const textura = criarTexturaCanvas(corpo);
      const textureObj = new THREE.CanvasTexture(textura);
      textureObj.colorSpace = THREE.SRGBColorSpace;
      textureObj.magFilter = THREE.LinearFilter;
      textureObj.minFilter = THREE.LinearMipmapLinearFilter;
      textureObj.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

      geometry = this.geometriaBases.planetaGeometry.clone();
      material = new THREE.MeshStandardMaterial({
        map: textureObj,
        roughness: 0.9,
        metalness: 0.1,
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(escala.raio, escala.raio, escala.raio);

      // Nuvens da Terra
      if (corpo.aparencia.detalhes?.nuvens) {
        const meshNuvens = mesh.clone();
        meshNuvens.scale.multiplyScalar(1.015);
        const matNuvens = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          opacity: 0.2,
          transparent: true,
          roughness: 1,
        });
        meshNuvens.material = matNuvens;
        grupoOrbita.add(meshNuvens);
        grupoOrbita.userData.meshNuvens = meshNuvens;
      }

    }

    // Quaternion de inclinação axial: o spin diário precisa acontecer EM
    // TORNO do eixo inclinado (composição qTilt·qSpin por frame, em
    // _atualizarFisica). O eixo agora tem AZIMUTE próprio por planeta
    // (_poloCena) — antes todos os polos "caíam" para o mesmo lado do mundo
    // (Rz global); agora Marte e Saturno, com obliquidades parecidas,
    // inclinam para direções diferentes, como no céu real.
    let qTilt = null;
    if (corpo.tipo !== 'estrela' && corpo.inclinacaoEixoGraus) {
      qTilt = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        this._poloCena(corpo)
      );
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    grupoOrbita.add(mesh);

    // Anéis (Saturno/Urano)
    let anel = null;
    if (corpo.aneis) {
      anel = this._adicionarAneis(grupoOrbita, corpo, escala.raio);
    }

    // Hitbox invisível para picking
    const hitboxRaio = Math.max(escala.raio * 2.5, 1.2);
    const hitbox = new THREE.Mesh(
      new THREE.SphereGeometry(hitboxRaio, 16, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitbox.userData.corpo = corpo;
    grupoOrbita.add(hitbox);

    // Linha de órbita
    if (corpo.pai) {
      this._criarLinhaOrbita(corpo, grupoOrbita);
    }

    // Label/rótulo
    this._criarRotulo(corpo, grupoOrbita, escala.raio);

    // Agrupar no scene root (luas serão movidas após criação de todos)
    this.scene.add(grupoOrbita);

    this.corposFisicos.set(corpo.id, {
      grupoOrbita,
      mesh,
      anel,
      anelRaioBase: anel ? escala.raio : null,
      corpo,
      escala,
      periodoRotacao: corpo.periodoRotacaoHoras || 24,
      qTilt,
    });
  }

  _criarCometa(corpo) {
    // Pequeno núcleo + cauda
    const textura = criarTexturaCanvas(corpo);
    const textureObj = new THREE.CanvasTexture(textura);
    textureObj.colorSpace = THREE.SRGBColorSpace;
    const escala = this._calcularEscala(corpo);
    const temPai = corpo.pai && corpo.pai !== 'sol';
    const posicao = this._calcularPosicao(corpo, temPai);

    const grupoOrbita = new THREE.Group();
    grupoOrbita.position.copy(posicao);
    grupoOrbita.userData.corpo = corpo;

    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const material = new THREE.MeshStandardMaterial({
      map: textureObj,
      roughness: 1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(escala.raio, escala.raio, escala.raio);
    grupoOrbita.add(mesh);

    // Coma: halo brilhante ao redor do núcleo (mesmo recurso do glow do Sol)
    const corCauda = corpo.aparencia.cores?.[2] || '#e8d8d0';
    const tamanhoComa = escala.raio * 6;
    const coma = this._criarSpriteGlowColorido(corCauda, tamanhoComa);
    grupoOrbita.add(coma);

    // Cauda: sempre aponta para longe do Sol (atualizada por quadro).
    // Duas camadas (núcleo denso + halo largo e fraco) para dar profundidade.
    // IMPORTANTE: a geometria do cone é transladada para que a BASE (lado
    // largo) fique no núcleo (origem local) e o ÁPICE se estenda inteiro
    // para fora; sem isso, o cone fica centralizado na origem e metade dele
    // "vaza" para o lado voltado ao Sol — o defeito visual reportado.
    const grupoCauda = new THREE.Group();
    const comprimentoCauda = escala.raio * 26;
    grupoCauda.add(
      this._criarConeCauda(escala.raio * 4.2, comprimentoCauda, corCauda, 0.14),
      this._criarConeCauda(escala.raio * 1.8, comprimentoCauda * 0.65, corCauda, 0.26)
    );
    grupoCauda.userData.ehCauda = true;
    grupoOrbita.add(grupoCauda);
    const cauda = grupoCauda;

    const hitbox = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(escala.raio * 2.5, 1.2), 16, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitbox.userData.corpo = corpo;
    grupoOrbita.add(hitbox);

    this._criarLinhaOrbita(corpo, grupoOrbita);
    this._criarRotulo(corpo, grupoOrbita, escala.raio);

    this.scene.add(grupoOrbita);
    this.corposFisicos.set(corpo.id, {
      grupoOrbita,
      mesh,
      cauda,
      coma,
      tamanhoComa, // escala do sprite é ABSOLUTA — guardar a base p/ setEscala
      corpo,
      escala,
      periodoRotacao: corpo.periodoRotacaoHoras || 24,
    });
  }

  // Telescópios espaciais (V7): modelos 3D detalhados construídos com
  // primitivas (Hubble e JWST em _construirHubble/_construirJWST). O grupo
  // `mesh` tem ~1 unidade e é escalado por escala.raio, então setEscala()
  // funciona igual aos demais corpos (mesh.scale.set).
  _criarSonda(corpo) {
    const escala = this._calcularEscala(corpo);
    const temPai = corpo.pai && corpo.pai !== 'sol';
    const posicao = this._calcularPosicao(corpo, temPai);

    const grupoOrbita = new THREE.Group();
    grupoOrbita.position.copy(posicao);
    grupoOrbita.userData.corpo = corpo;

    const modelo = corpo.aparencia?.detalhes?.modelo;
    const mesh = modelo === 'jwst' ? this._construirJWST() : this._construirHubble();

    mesh.scale.set(escala.raio, escala.raio, escala.raio);
    grupoOrbita.add(mesh);

    // Hitbox para picking (mesma regra dos demais corpos)
    const hitbox = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(escala.raio * 2.5, 1.2), 16, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitbox.userData.corpo = corpo;
    grupoOrbita.add(hitbox);

    this._criarLinhaOrbita(corpo, grupoOrbita);
    this._criarRotulo(corpo, grupoOrbita, escala.raio);

    this.scene.add(grupoOrbita);
    this.corposFisicos.set(corpo.id, {
      grupoOrbita,
      mesh,
      corpo,
      escala,
      periodoRotacao: corpo.periodoRotacaoHoras || 0,
    });
  }

  // Hubble: telescópio prateado deitado (eixo X) com abertura aberta, faixa
  // térmica dourada, traseira arredondada, dois painéis solares azuis em asas
  // e uma antena de alto ganho. Retorna um THREE.Group de ~1,7u de extensão.
  _construirHubble() {
    const g = new THREE.Group();
    const prata = new THREE.MeshStandardMaterial({ color: 0xc8ccd4, metalness: 0.92, roughness: 0.26 });
    const metalEscuro = new THREE.MeshStandardMaterial({ color: 0x9aa0aa, metalness: 0.7, roughness: 0.4 });
    const boomMat = new THREE.MeshStandardMaterial({ color: 0x888e98, metalness: 0.7, roughness: 0.5 });

    // Corpo principal (tubo)
    const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 1.35, 32), prata);
    tubo.rotation.z = Math.PI / 2;
    g.add(tubo);

    // Faixa térmica dourada (manta multicamada) perto da traseira
    const faixa = new THREE.Mesh(
      new THREE.CylinderGeometry(0.352, 0.352, 0.26, 32),
      new THREE.MeshStandardMaterial({ color: 0xcaa24a, metalness: 0.85, roughness: 0.35, emissive: 0x2a1e08 })
    );
    faixa.rotation.z = Math.PI / 2;
    faixa.position.x = -0.4;
    g.add(faixa);

    // Anel/borda da abertura (light shield) na frente
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.34, 0.14, 32), metalEscuro);
    rim.rotation.z = Math.PI / 2;
    rim.position.x = 0.7;
    g.add(rim);

    // Interior escuro da abertura — o "olho" do telescópio
    const abertura = new THREE.Mesh(
      new THREE.CircleGeometry(0.3, 32),
      new THREE.MeshStandardMaterial({ color: 0x090b11, roughness: 1, metalness: 0, side: THREE.DoubleSide })
    );
    abertura.rotation.y = Math.PI / 2;
    abertura.position.x = 0.775;
    g.add(abertura);

    // Porta da abertura aberta, inclinada para cima (como o Hubble em órbita)
    const porta = new THREE.Mesh(new THREE.CircleGeometry(0.33, 32),
      new THREE.MeshStandardMaterial({ color: 0xd0d4dc, metalness: 0.8, roughness: 0.3, side: THREE.DoubleSide }));
    porta.position.set(0.86, 0.36, 0);
    porta.rotation.z = -0.95;
    g.add(porta);

    // Traseira arredondada (meia-esfera)
    const traseira = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), prata);
    traseira.rotation.z = -Math.PI / 2;
    traseira.position.x = -0.675;
    g.add(traseira);

    // Painéis solares — duas asas azuis em braços curtos
    const matPainel = new THREE.MeshStandardMaterial({
      color: 0x24305e, metalness: 0.5, roughness: 0.4, emissive: 0x0a1436, side: THREE.DoubleSide,
    });
    for (const lado of [-1, 1]) {
      const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8), boomMat);
      boom.position.z = lado * 0.5;
      g.add(boom);
      const painel = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.02, 0.55), matPainel);
      painel.position.z = lado * 0.98;
      g.add(painel);
    }

    // Antena de alto ganho: braço + prato
    const antBraco = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.34, 8), boomMat);
    antBraco.position.set(-0.15, -0.42, 0);
    g.add(antBraco);
    const prato = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2.2),
      new THREE.MeshStandardMaterial({ color: 0xdadfe6, metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide }));
    prato.position.set(-0.15, -0.6, 0);
    g.add(prato);

    return g;
  }

  // James Webb: espelho primário dourado em favo de mel (segmentos
  // hexagonais virados para cima — a ficha registra os 18 reais), espelho
  // secundário num tripé à frente e escudo solar de 5 camadas escalonadas
  // embaixo, sobre o barramento.
  _construirJWST() {
    const g = new THREE.Group();
    const ouro = new THREE.MeshStandardMaterial({
      color: 0xd9a938, metalness: 0.95, roughness: 0.2, emissive: 0x2a1c04,
    });

    // Favo de mel dourado: hexágonos no plano XZ (face para +Y), coordenadas
    // axiais "pointy-top" preenchendo o favo de raio 2 (contorno hexagonal
    // cheio, o visual icônico do espelho segmentado do Webb).
    const espelho = new THREE.Group();
    const hexGeo = new THREE.CylinderGeometry(0.155, 0.155, 0.05, 6);
    const sqrt3 = Math.sqrt(3);
    const passo = 0.172;
    for (let q = -2; q <= 2; q++) {
      for (let r = -2; r <= 2; r++) {
        const s = -q - r;
        if (Math.max(Math.abs(q), Math.abs(r), Math.abs(s)) > 2) continue; // fora do favo
        const x = passo * sqrt3 * (q + r / 2);
        const z = passo * 1.5 * r;
        const hex = new THREE.Mesh(hexGeo, ouro);
        hex.rotation.y = Math.PI / 6; // alinha "pointy-top" com a grade
        hex.position.set(x, 0, z);
        espelho.add(hex);
      }
    }
    espelho.position.y = 0.28;
    espelho.rotation.x = -0.32; // inclina o espelho para "olhar" adiante
    g.add(espelho);

    // Espelho secundário: tripé convergindo para um pequeno disco à frente
    const boomMat = new THREE.MeshStandardMaterial({ color: 0x9a9a9a, metalness: 0.6, roughness: 0.5 });
    const apiceY = 0.72, apiceZ = 0.62;
    for (const ang of [-0.5, 0, 0.5]) {
      const base = new THREE.Vector3(Math.sin(ang) * 0.5, 0.28, Math.cos(ang) * 0.5 - 0.1);
      const apice = new THREE.Vector3(0, apiceY, apiceZ);
      const dir = apice.clone().sub(base);
      const perna = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, dir.length(), 6), boomMat);
      perna.position.copy(base).addScaledVector(dir, 0.5);
      perna.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      g.add(perna);
    }
    const secundario = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.03, 24),
      new THREE.MeshStandardMaterial({ color: 0xe0b448, metalness: 0.95, roughness: 0.2, emissive: 0x2a1c04 }));
    secundario.position.set(0, apiceY, apiceZ);
    secundario.rotation.x = Math.PI / 2 + 0.32;
    g.add(secundario);

    // Escudo solar: 5 camadas em losango (kite), escalonadas e prateado-lilás
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.72, 0.28, 0.55 - t * 0.12),
        metalness: 0.75, roughness: 0.32, side: THREE.DoubleSide,
        emissive: 0x140f22,
      });
      const camada = new THREE.Mesh(new THREE.PlaneGeometry(1.7 - i * 0.06, 1.05 - i * 0.04), mat);
      camada.rotation.x = Math.PI / 2;
      camada.rotation.z = Math.PI / 4;      // losango (quadra de tênis)
      camada.position.y = -0.16 - i * 0.05;
      g.add(camada);
    }

    // Barramento (bus) do satélite, embaixo do escudo
    const bus = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.22, 0.34),
      new THREE.MeshStandardMaterial({ color: 0x3a3f4a, metalness: 0.6, roughness: 0.5 }));
    bus.position.y = -0.5;
    g.add(bus);

    return g;
  }

  _criarCinturao(corpo) {
    const numAsteroides = corpo.id === 'cinturao-asteroides' ? 3000 : 2500;
    const posicoes = new Float32Array(numAsteroides * 3);
    const cores = new Float32Array(numAsteroides * 3);
    const tamanhos = new Float32Array(numAsteroides);

    const escala = this._calcularEscala(corpo);
    const raioInterno = escala.distancia * 0.8;
    const raioExterno = escala.distancia * 1.2;

    for (let i = 0; i < numAsteroides; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = raioInterno + Math.random() * (raioExterno - raioInterno);
      const z = (Math.random() - 0.5) * (raioExterno - raioInterno) * 0.04;

      posicoes[i * 3] = r * Math.cos(theta);
      posicoes[i * 3 + 1] = z;
      posicoes[i * 3 + 2] = r * Math.sin(theta);

      if (corpo.id === 'cinturao-asteroides') {
        cores[i * 3] = 0.7;
        cores[i * 3 + 1] = 0.6;
        cores[i * 3 + 2] = 0.4;
      } else {
        cores[i * 3] = 0.6;
        cores[i * 3 + 1] = 0.8;
        cores[i * 3 + 2] = 1;
      }

      tamanhos[i] = Math.random() * 0.5 + 0.1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posicoes, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(cores, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(tamanhos, 1));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      sizeAttenuation: true,
      map: texturaPontoCircular(),
      transparent: true,
      alphaTest: 0.05,
      premultipliedAlpha: true,
      depthWrite: false,
    });

    // O Tour guiado aproxima a câmera do cinturão (ex.: parada de Marte,
    // ~5,4 unidades da partícula mais próxima). Com sizeAttenuation ligado,
    // o tamanho em tela cresce como 1/distância — perto do cinturão isso
    // projeta cada ponto como um círculo enorme e borrado ("balão"), em vez
    // de uma partícula. Fazemos o clamp de gl_PointSize (em pixels de
    // dispositivo) direto no vertex shader, depois que o three.js já
    // calculou o tamanho com atenuação — assim de longe o cinturão continua
    // com a atenuação normal (fica fino e bonito), e de perto o tamanho
    // simplesmente satura num teto pequeno, sem inflar.
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <logdepthbuf_vertex>',
        'gl_PointSize = min( gl_PointSize, 22.0 );\n\t#include <logdepthbuf_vertex>'
      );
    };

    const points = new THREE.Points(geometry, material);
    points.userData.corpo = corpo;
    this.scene.add(points);

    this._criarLinhaOrbita(corpo, points);
    this._criarRotulo(corpo, points, 0);
    // Rótulo do cinturão fica sobre o próprio anel, não no centro do sistema
    const rotuloCinturao = points.userData.rotuloSprite;
    if (rotuloCinturao) {
      rotuloCinturao.position.set(escala.distancia, 4, 0);
      // Cinturão fica um pouco maior que um rótulo comum, multiplicando a
      // escala já ajustada ao texto (nunca um valor absoluto — senão nomes
      // longos como "Cinturão de Asteroides" voltam a ficar cortados dentro
      // do sprite). O fator é 1,5×, não mais 2,6×: esse valor era calibrado
      // para uma escala-base FIXA de 10 (26 = 10 × 2,6); agora que a base já
      // varia com o texto (~16-19 para os nomes dos cinturões), reaplicar
      // 2,6× dava ~49 unidades — quase o dobro do tamanho antigo, invadindo
      // visualmente as órbitas vizinhas. 1,5× aproxima o tamanho visual de
      // antes (~26-28) mantendo a proporção ao texto.
      rotuloCinturao.scale.set(rotuloCinturao.scale.x * 1.5, rotuloCinturao.scale.y * 1.5, 1);
    }

    this.corposFisicos.set(corpo.id, {
      grupoOrbita: points,
      mesh: points,
      corpo,
      escala,
      distanciaCriacao: escala.distancia,
      isCinturao: true,
    });
  }

  _criarLinhaOrbita(corpo, grupo) {
    if (!corpo.pai || corpo.periodoOrbitalDias === 0) return;

    const pontos = [];
    const numSegmentos = 128;
    const a = this._calcularDistancia(corpo);
    const e = corpo.excentricidade || 0;

    for (let i = 0; i <= numSegmentos; i++) {
      const M = (i / numSegmentos) * Math.PI * 2;
      const E = M + e * Math.sin(M);
      const x = a * (Math.cos(E) - e);
      const z = -a * Math.sqrt(1 - e * e) * Math.sin(E);
      // Orientação ASSADA nos pontos com a MESMA cadeia da posição
      // (_aplicarFrameOrbital) — antes era linha.rotation.x, que não
      // acompanharia ω/Ω/frame do pai e faria a linha divergir da lua
      pontos.push(this._aplicarFrameOrbital(new THREE.Vector3(x, 0, z), corpo));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(pontos);
    const material = new THREE.LineBasicMaterial({
      color: 0x3d5a80,
      opacity: 0.35,
      transparent: true,
      linewidth: 1,
    });

    const linha = new THREE.LineLoop(geometry, material);

    // Attach ao pai ou ao scene
    if (corpo.pai === 'sol' || !corpo.pai) {
      this.scene.add(linha);
    } else {
      const paiMesh = this.corposFisicos.get(corpo.pai);
      if (paiMesh?.grupoOrbita) {
        paiMesh.grupoOrbita.add(linha);
      }
    }

    this.linhasOrbita.set(corpo.id, linha);
  }

  _criarRotulo(corpo, grupo, raio) {
    const FONTE = 'bold 40px Segoe UI, sans-serif';
    const ALTURA_PX = 64; // fixa: define o tamanho da fonte no mundo (não muda)
    const PADDING_PX = 28; // folga de cada lado, senão a fonte "bold" perde o traço

    // Mede o texto ANTES de fixar a largura do canvas — nomes longos (ex.:
    // "Cinturão de Asteroides", "Cometa Churyumov-Gerasimenko") estouravam a
    // largura fixa antiga (256px) e ficavam cortados na própria textura; o
    // scale.set() dos cinturões só ampliava essa imagem já cortada.
    const medidor = document.createElement('canvas').getContext('2d');
    medidor.font = FONTE;
    const larguraTexto = medidor.measureText(corpo.nome).width;
    const larguraPx = Math.max(120, Math.ceil(larguraTexto + PADDING_PX * 2));

    const canvas = document.createElement('canvas');
    canvas.width = larguraPx;
    canvas.height = ALTURA_PX;
    const ctx = canvas.getContext('2d');
    // Definir width/height acima reseta o estado do contexto — a fonte tem
    // que ser reaplicada depois, não antes.
    ctx.font = FONTE;
    ctx.fillStyle = '#e8edf7';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(corpo.nome, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    // depthWrite false: o retângulo do sprite não pode gravar profundidade,
    // senão bloqueia estrelas/órbitas atrás dele (quadrado preto)
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(material);
    // Mesma proporção px↔mundo do canvas original (256px = 10 unidades,
    // 64px = 2,5 unidades → 25,6 px/unidade nos dois eixos), preservada aqui
    // para a fonte manter sempre o mesmo tamanho aparente; só a largura do
    // sprite muda conforme o nome precisa.
    const PX_POR_UNIDADE = 25.6;
    sprite.scale.set(canvas.width / PX_POR_UNIDADE, canvas.height / PX_POR_UNIDADE, 1);
    sprite.userData.ehRotulo = true;
    sprite.position.y = raio || 0;
    // Ancoragem em espaço de sprite (constante em tela) — não aplique ao cinturão
    if (corpo.tipo !== 'cinturao') {
      sprite.center.set(0.5, -0.2);
    }

    grupo.add(sprite);
    grupo.userData.rotuloSprite = sprite;
  }

  _adicionarGlowSol(grupo, raioSol) {
    // Sprite ÚNICO cuja curva é a SOMA das duas camadas originais (4× e 7× o
    // raio do Sol, cada uma com as 3 paradas branco/dourado/laranja de
    // sempre), suavizada só onde a soma tinha uma quebra de inclinação.
    //
    // Achado do Fred em 07/09/2026 (print com anotação em vermelho): com as
    // 2 camadas originais lado a lado, dava pra ver um anel exatamente onde
    // o sprite interno (4×) termina. O valor da curva ali É contínuo (as
    // duas coisas somam suavemente até esse ponto) — o que muda de repente é
    // a INCLINAÇÃO: de um lado dois sprites caindo juntos, do outro só um.
    // O olho humano realça esse tipo de quebra de inclinação como se fosse
    // uma borda (banda de Mach) mesmo sem salto real de brilho. E explica
    // por que a versão com confete "parecia um gradiente só, sem anel": a
    // própria bagunça de cor do bug borrava essa transição.
    //
    // Em vez de aproximar com uma curva nova (tentativa anterior, ficou
    // "menos imponente"), somamos as DUAS curvas originais ponto a ponto ao
    // longo do mesmo raio físico — preserva a mesma "massa" de brilho — e
    // aplicamos uma média móvel só pra arredondar a quebra de inclinação.
    function alphaCamada(t) {
      if (t <= 0.5) return 0.8 + (0.3 - 0.8) * (t / 0.5);
      return 0.3 - 0.3 * ((t - 0.5) / 0.5);
    }
    function corCamada(t) {
      if (t <= 0.5) {
        const f = t / 0.5;
        return [255, 255 + (200 - 255) * f, 255 + (0 - 255) * f];
      }
      const f = (t - 0.5) / 0.5;
      return [255, 200 + (100 - 200) * f, 0];
    }

    const ALCANCE = 7; // raios do Sol — igual ao sprite externo de antes
    const N = 96;
    const JANELA = 7;
    // O array bruto ganha JANELA amostras de folga PRA CADA LADO, além do
    // intervalo 0..N — sem isso, a média móvel de baixo, perto de i=N (borda
    // do sprite), só teria pra somar os valores da própria cauda (que ainda
    // não chegou a zero) e nunca os "zeros futuros" que existem de verdade
    // fisicamente pra r>7. O resultado, medido na prática: o pico de
    // gradiente nunca chegava a alpha 0 na borda — sobrava uma faixa (bem
    // fraca, mas real) de opacidade uniforme até o quadrado do sprite, que
    // no additive blending contra o céu escuro aparecia como um contorno
    // quadrado visível ao redor do brilho (achado pelo Fred). Com a folga,
    // a média em i=N inclui os zeros de verdade e converge pra alpha 0.
    const bruto = [];
    for (let i = -JANELA; i <= N + JANELA; i++) {
      const r = (i / N) * ALCANCE;
      const aInterna = r > 0 && r <= 4 ? alphaCamada(r / 4) : 0;
      const aExterna = r > 0 && r <= 7 ? alphaCamada(r / 7) : 0;
      bruto.push(aInterna + aExterna);
    }
    // Média móvel só pra arredondar a quebra de inclinação em r=4 — janela
    // de ~±0.5 raio de cada lado, estreita o bastante pra não achatar o
    // resto da curva (que já era suave). Índice de bruto correspondente a
    // i=0 do intervalo visível é JANELA (por causa da folga acima).
    const suave = [];
    for (let i = 0; i <= N; i++) {
      let soma = 0;
      for (let k = -JANELA; k <= JANELA; k++) soma += bruto[i + JANELA + k];
      suave.push(soma / (2 * JANELA + 1));
    }
    suave[N] = 0; // garante alpha exatamente 0 na borda do sprite, sem depender de a média convergir sozinha

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const [r, g, b] = corCamada(t);
      const alpha = Math.min(1, suave[i]);
      grad.addColorStop(t, `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha.toFixed(3)})`);
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    // Canvas premultiplicado + dithering perto de alpha 0 + desmultiplicação
    // ao subir pra GPU amplificam o lixo de cada canal em cor saturada —
    // visto pelo Fred como pontos coloridos (ex. verde) no halo do Sol.
    // premultiplyAlpha=true evita a desmultiplicação (e a amplificação).
    texture.premultiplyAlpha = true;
    const material = new THREE.SpriteMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      premultipliedAlpha: true,
      depthWrite: false,
    });

    const sprite = new THREE.Sprite(material);
    const escala = raioSol * ALCANCE;
    sprite.scale.set(escala, escala, 1);

    grupo.add(sprite);
  }

  // Sprite de glow aditivo numa cor arbitrária (usado na coma dos cometas)
  _criarSpriteGlowColorido(cor, tamanho) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const c = new THREE.Color(cor);
    const r = Math.round(c.r * 255);
    const g = Math.round(c.g * 255);
    const b = Math.round(c.b * 255);

    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
    grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.35)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    // Mesma causa da textura de ponto/glow do Sol — canvas premultiplicado +
    // dithering perto de alpha 0 + desmultiplicação ao subir pra GPU
    // amplificam o lixo de cada canal em cor saturada na borda da coma.
    texture.premultiplyAlpha = true;
    const material = new THREE.SpriteMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      premultipliedAlpha: true,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(tamanho, tamanho, 1);
    return sprite;
  }

  // Cone da cauda do cometa, já transladado para que a base fique na
  // origem local (o núcleo) e o ápice se estenda inteiro em +Y — ver
  // comentário em _criarCometa sobre o defeito que isto corrige.
  _criarConeCauda(raioBase, comprimento, cor, opacidade) {
    const geometry = new THREE.ConeGeometry(raioBase, comprimento, 10, 1, true);
    geometry.translate(0, comprimento / 2, 0);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(cor),
      transparent: true,
      opacity: opacidade,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    return new THREE.Mesh(geometry, material);
  }

  _adicionarAneis(grupo, corpo, raioBase) {
    if (!corpo.aneis) return;

    const config = corpo.aneis;
    const raioInterno = raioBase * config.raioInternoFator;
    const raioExterno = raioBase * config.raioExternoFator;
    const seed = corpo.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

    const texturaAneis = criarTexturaAneis(raioInterno, raioExterno, config.cores, seed);
    const texture = new THREE.CanvasTexture(texturaAneis);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

    const geometry = new THREE.RingGeometry(raioInterno, raioExterno, 64);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: config.opacidade || 0.8,
      side: THREE.DoubleSide,
    });

    const ring = new THREE.Mesh(geometry, material);
    // Normal do anel = eixo de rotação do corpo (_poloCena, com azimute) —
    // anel sempre no plano equatorial do planeta, coplanar com o spin e,
    // após a migração de frames, com as órbitas das luas regulares.
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), this._poloCena(corpo));
    grupo.add(ring);
    return ring;
  }

  // Cadeia de ORIENTAÇÃO orbital — única fonte de verdade, usada pela
  // posição (_calcularPosicao), pela linha de órbita (_criarLinhaOrbita) e
  // pelo recomputo em setEscala; se divergirem, a lua "sai do trilho".
  // perifocal → ω (argPeriastroGraus, rot. Y) → i (inclinacaoOrbitaGraus,
  // rot. X = linha dos nós) → Ω (nodoAscendenteGraus, rot. Y) → frame
  // ('equadorPai': rotação que leva o norte da eclíptica ao polo do pai).
  // Com ω=Ω=0 e frame='ecliptica' (defaults), reproduz exatamente o rotX
  // legado — planetas, cometas e Apófis não mudam (guard: validacao-frames).
  _aplicarFrameOrbital(v, corpo) {
    const w = ((corpo.argPeriastroGraus || 0) * Math.PI) / 180;
    const i = ((corpo.inclinacaoOrbitaGraus || 0) * Math.PI) / 180;
    const O = ((corpo.nodoAscendenteGraus || 0) * Math.PI) / 180;
    if (w) v.applyAxisAngle(_EIXO_Y, w);
    if (i) v.applyAxisAngle(_EIXO_X, i);
    if (O) v.applyAxisAngle(_EIXO_Y, O);
    if (corpo.frameOrbita === 'equadorPai' && corpo.pai && corpo.pai !== 'sol') {
      v.applyQuaternion(this._quatEquadorPai(corpo.pai));
    }
    return v;
  }

  // Quaternion eclíptica→equador do pai, cacheado por pai (não muda em
  // runtime; azimute/obliquidade são estáticos)
  _quatEquadorPai(paiId) {
    if (!this._quatsEquador) this._quatsEquador = new Map();
    let q = this._quatsEquador.get(paiId);
    if (!q) {
      const pai = this.dados.corpos.find((c) => c.id === paiId);
      q = pai
        ? new THREE.Quaternion().setFromUnitVectors(_EIXO_Y, this._poloCena(pai))
        : new THREE.Quaternion();
      this._quatsEquador.set(paiId, q);
    }
    return q;
  }

  // Vetor-polo do corpo em coordenadas da cena (Y = norte da eclíptica).
  // Opção B do PLANO-EIXOS-ORBITAS.md: obliquidade (inclinacaoEixoGraus) +
  // azimute (azimutePoloGraus, direção no plano XZ para onde o polo se
  // inclina). Default de azimute = 180°, que reproduz EXATAMENTE o vetor do
  // Rz legado (polo em (−sin ε, cos ε, 0)) — corpos sem o campo novo não
  // mudam de visual. Azimutes reais (derivados dos polos IAU α₀/δ₀) ficam
  // em dados.js por planeta.
  _poloCena(corpo) {
    const obl = ((corpo.inclinacaoEixoGraus || 0) * Math.PI) / 180;
    const azGraus = corpo.azimutePoloGraus !== undefined ? corpo.azimutePoloGraus : 180;
    const az = (azGraus * Math.PI) / 180;
    return new THREE.Vector3(
      Math.sin(obl) * Math.cos(az),
      Math.cos(obl),
      Math.sin(obl) * Math.sin(az)
    ).normalize();
  }

  _configurarEventos() {
    window.addEventListener('resize', () => this._ajustarTamanoRenderer());

    let pointerDownPos = { x: 0, y: 0 };

    this.canvas.addEventListener('pointerdown', (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      this.ultimaPosicaoMouse = { x: e.clientX, y: e.clientY };
      this.inicialMouse = { x: e.clientX, y: e.clientY };
    });

    this.canvas.addEventListener('pointermove', (e) => {
      this.ultimaPosicaoMouse = { x: e.clientX, y: e.clientY };
    });

    this.canvas.addEventListener('pointerup', (e) => {
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Com o palco no ar o canvas pertence a ele: um clique não pode
      // selecionar um astro da cena principal por baixo do overlay.
      if (dist < 5 && !this._palco) {
        this._fazerPicking(e.clientX, e.clientY);
      }
    });
  }

  // ————— Palco (SPEC-estacoes-e-mares.md §2.2) —————
  //
  // Uma cena alternativa desenhada pelo MESMO renderer. Nunca um segundo
  // contexto WebGL: dois contextos vivos é o cenário clássico de CONTEXT_LOST
  // no Android de entrada, que é o público do app.
  //
  // O palco traz os próprios controles, ligados ao mesmo domElement, então os
  // da cena principal precisam sair de cena enquanto ele vive.
  montarPalco({ scene, camera, atualizar, aoRedimensionar }) {
    this._controlsAtivosAntesDoPalco = this.controls.enabled;
    this.controls.enabled = false;
    this._palco = { scene, camera, atualizar, aoRedimensionar };
    if (aoRedimensionar) aoRedimensionar(window.innerWidth, window.innerHeight);
  }

  desmontarPalco() {
    this._palco = null;
    this.controls.enabled = this._controlsAtivosAntesDoPalco;
  }

  get palcoAtivo() {
    return this._palco !== null;
  }

  // Direção do polo norte de rotação de um corpo, no referencial da cena.
  // Exposta para que um palco oriente o eixo pela MESMA regra da cena
  // principal (obliquidade + azimute IAU, ver PLANO-EIXOS-ORBITAS.md): se o
  // azimute de um corpo for corrigido em dados.js, os dois lugares mudam
  // juntos em vez de divergirem em silêncio.
  poloDoCorpo(corpo) {
    return this._poloCena(corpo);
  }

  _fazerPicking(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

    const objetos = [];
    this.scene.traverse((obj) => {
      if (obj.geometry && obj.userData.corpo) {
        objetos.push(obj);
      }
    });

    const intersects = raycaster.intersectObjects(objetos, true);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      const corpo = obj.userData.corpo;
      if (corpo) {
        this.selecionar(corpo.id);
        this.focar(corpo.id); // mesmo efeito de centralizar do menu Explorar
        if (this.aoSelecionar) {
          this.aoSelecionar(corpo.id);
        }
        return;
      }
    }

    this.selecionar(null);
    if (this.aoSelecionar) {
      this.aoSelecionar(null);
    }
  }

  selecionar(id) {
    // Limpar seleção anterior
    if (this.corposSelecionado) {
      const fisicoAnterior = this.corposFisicos.get(this.corposSelecionado);
      if (fisicoAnterior) {
        const linhaAntiga = this.linhasOrbita.get(this.corposSelecionado);
        if (linhaAntiga) {
          linhaAntiga.material.color.setHex(0x3d5a80);
          linhaAntiga.material.opacity = 0.35;
        }
      }
    }

    this.corposSelecionado = id;

    if (id) {
      const linhaNovaHex = this.linhasOrbita.get(id);
      if (linhaNovaHex) {
        linhaNovaHex.material.color.setHex(0x5cc8ff);
        linhaNovaHex.material.opacity = 0.9;
      }
    }
  }

  // Ponto "de onde olhar" para um corpo. Cinturões são uma nuvem de
  // partículas ancorada na origem (posição do Sol) — sua grupoOrbita.
  // getWorldPosition() sempre retorna ~(0,0,0), o que não representa o
  // anel. Usamos um ponto fixo sobre o próprio anel em vez disso.
  _alvoDoFoco(fisicoInfo) {
    if (fisicoInfo.corpo.tipo === 'cinturao') {
      return new THREE.Vector3(fisicoInfo.escala.distancia, 0, 0);
    }
    const alvo = new THREE.Vector3();
    fisicoInfo.grupoOrbita.getWorldPosition(alvo);
    return alvo;
  }

  focar(id) {
    const fisicoInfo = this.corposFisicos.get(id);
    if (!fisicoInfo) return;

    this._seguirFn = null; // focar um corpo cancela o seguimento de nave
    this._seguirId = null;
    this.corpoFocado = id;
    this._ajustarCameraParaCorpo(id);
    const ehCinturao = fisicoInfo.corpo.tipo === 'cinturao';

    const posInicial = this.camera.position.clone();
    const targetInicial = this.controls.target.clone();
    const tempoInicio = performance.now();
    const duracao = 1200;

    this.tweenFoco = () => {
      const progresso = Math.min(1, (performance.now() - tempoInicio) / duracao);
      const eased = progresso < 0.5
        ? 4 * progresso * progresso * progresso
        : 1 - Math.pow(-2 * progresso + 2, 3) / 2;

      // O corpo se move durante o tween: recalcular o alvo a cada quadro
      const alvo = this._alvoDoFoco(fisicoInfo);

      let posFinal;
      if (ehCinturao) {
        // Vista elevada em 3/4 proporcional ao raio do anel: mostra um bom
        // arco do cinturão (e o Sol ao fundo) em vez de "pousar" nele
        const raioAnel = fisicoInfo.escala.distancia;
        const distBase = raioAnel * 0.45;
        posFinal = alvo.clone().add(new THREE.Vector3(-distBase * 0.7, distBase * 0.65, distBase * 0.85));
      } else {
        const raioCorpo = fisicoInfo.escala.raio || 1;
        // Distância de foco proporcional ao corpo (enquadramento consistente).
        // O piso fixo de 2,5 servia na didática (raios ≥ 0,45), mas na escala
        // real os raios são minúsculos: a câmera travava a 2,5 e o corpo virava
        // um pontinho, exigindo muito zoom manual. Na real usamos um piso
        // relativo ao raio (raio + folga acima do near plane 0,05); a didática
        // mantém o 2,5 de sempre.
        const pisoFoco = this._escala === 'real' ? raioCorpo + 0.1 : 2.5;
        const distCamera = Math.max(raioCorpo * 5, pisoFoco);
        const direcao = posInicial.clone().sub(alvo);
        if (direcao.lengthSq() < 1e-6) direcao.set(0, 0.5, 1);
        direcao.normalize();
        posFinal = alvo.clone()
          .add(direcao.multiplyScalar(distCamera))
          .add(new THREE.Vector3(0, distCamera * 0.25, 0));
      }

      this.camera.position.lerpVectors(posInicial, posFinal, eased);
      this.controls.target.lerpVectors(targetInicial, alvo, eased);

      if (progresso >= 1) {
        this.tweenFoco = null;
        this._posSeguida = alvo.clone();
      }
    };
  }

  // Segue um alvo dinâmico arbitrário (ex.: o marcador da nave de uma
  // missão), reaproveitando o mesmo tween + seguimento dos corpos.
  // getPosicao: () => THREE.Vector3 | null (posição mundial atual do alvo)
  seguirDinamico(getPosicao, distCamera = 8, id = null) {
    const alvoInicial = typeof getPosicao === 'function' ? getPosicao() : null;
    if (!alvoInicial) return;

    this.corpoFocado = null;
    this._ajustarCameraParaCorpo(null);
    this._seguirFn = getPosicao;
    this._seguirId = id;

    const posInicial = this.camera.position.clone();
    const targetInicial = this.controls.target.clone();
    const tempoInicio = performance.now();
    const duracao = 1200;

    this.tweenFoco = () => {
      const progresso = Math.min(1, (performance.now() - tempoInicio) / duracao);
      const eased = progresso < 0.5
        ? 4 * progresso * progresso * progresso
        : 1 - Math.pow(-2 * progresso + 2, 3) / 2;

      const alvo = getPosicao() || alvoInicial;
      const direcao = posInicial.clone().sub(alvo);
      if (direcao.lengthSq() < 1e-6) direcao.set(0, 0.5, 1);
      direcao.normalize();
      const posFinal = alvo.clone()
        .add(direcao.multiplyScalar(distCamera))
        .add(new THREE.Vector3(0, distCamera * 0.3, 0));

      this.camera.position.lerpVectors(posInicial, posFinal, eased);
      this.controls.target.lerpVectors(targetInicial, alvo, eased);

      if (progresso >= 1) {
        this.tweenFoco = null;
        this._posSeguida = alvo.clone();
      }
    };
  }

  visaoGeral() {
    this.corpoFocado = null;
    this._ajustarCameraParaCorpo(null);
    this._seguirFn = null;
    this._seguirId = null;
    this._posSeguida = null;

    const posInicial = this.camera.position.clone();
    const targetInicial = this.controls.target.clone();
    const posFinal = new THREE.Vector3(0, 260, 420);
    const targetFinal = new THREE.Vector3(0, 0, 0);
    const tempoInicio = performance.now();
    const duracao = 1000;

    this.tweenFoco = () => {
      const progresso = Math.min(1, (performance.now() - tempoInicio) / duracao);
      const eased = progresso < 0.5
        ? 4 * progresso * progresso * progresso
        : 1 - Math.pow(-2 * progresso + 2, 3) / 2;
      this.camera.position.lerpVectors(posInicial, posFinal, eased);
      this.controls.target.lerpVectors(targetInicial, targetFinal, eased);
      if (progresso >= 1) this.tweenFoco = null;
    };
  }

  setVelocidade(diasPorSegundo) {
    this._ajustarPeriodosVisuais(diasPorSegundo);
    this._velocidade = diasPorSegundo;
  }

  get velocidade() {
    return this._velocidade;
  }

  // Corpos com periodoOrbitalRealDias (Hubble) usam o período REAL quando a
  // simulação roda devagar (|vel| < 1 dia/s) e o estilizado nas rápidas.
  // A troca ajusta _anguloBaseGraus para a posição não saltar (continuidade
  // de fase: M_novo(tempoAtual) === M_antigo(tempoAtual)).
  _ajustarPeriodosVisuais(novaVelocidade) {
    for (const corpo of this.dados.corpos) {
      if (!corpo.periodoOrbitalRealDias) continue;
      const pAntigo = corpo._periodoEfetivoDias || corpo.periodoOrbitalDias;
      const pNovo = (novaVelocidade !== 0 && Math.abs(novaVelocidade) < 1)
        ? corpo.periodoOrbitalRealDias
        : corpo.periodoOrbitalDias;
      if (pNovo === pAntigo) continue;
      const base = corpo._anguloBaseGraus ?? (corpo.anguloInicialGraus || 0);
      corpo._anguloBaseGraus = base + (360 * this.tempoDias) / pAntigo - (360 * this.tempoDias) / pNovo;
      corpo._periodoEfetivoDias = pNovo;
    }
  }

  setEscala(modo) {
    if (modo !== 'didatica' && modo !== 'real') return;
    this._escala = modo;

    // Recalcular todas as posições e tamanhos
    for (const [id, fisico] of this.corposFisicos.entries()) {
      const corpo = fisico.corpo;
      const novaEscala = this._calcularEscala(corpo);

      if (fisico.isCinturao) {
        // Cinturões: escala uniforme do anel de partículas (e do rótulo junto)
        const fator = novaEscala.distancia / fisico.distanciaCriacao;
        fisico.grupoOrbita.scale.setScalar(fator);
        fisico.escala = novaEscala;
        continue;
      }

      const temPai = corpo.pai && corpo.pai !== 'sol';
      fisico.grupoOrbita.position.copy(this._calcularPosicao(corpo, temPai));

      if (fisico.mesh) {
        fisico.mesh.scale.set(novaEscala.raio, novaEscala.raio, novaEscala.raio);
      }
      const nuvens = fisico.grupoOrbita.userData.meshNuvens;
      if (nuvens) {
        nuvens.scale.set(novaEscala.raio, novaEscala.raio, novaEscala.raio).multiplyScalar(1.015);
      }
      if (fisico.anel && fisico.anelRaioBase) {
        fisico.anel.scale.setScalar(novaEscala.raio / fisico.anelRaioBase);
      }
      const rotulo = fisico.grupoOrbita.userData.rotuloSprite;
      if (rotulo) {
        rotulo.position.y = novaEscala.raio;
      }

      // Cauda/coma do cometa: criadas com o raio DIDÁTICO e nunca eram
      // redimensionadas — na escala real o núcleo encolhe ao piso mas a
      // cauda ficava com ~13u (maior que o Júpiter real da cena; parecia
      // defeito). Fisicamente caudas são mesmo enormes, mas 25% (~0,05 UA)
      // mantém o cometa identificável sem engolir os planetas.
      if (fisico.cauda) {
        const fatorCauda = this._escala === 'real' ? 0.25 : 1;
        fisico.cauda.scale.setScalar(fatorCauda); // grupo: fator relativo à geometria
        if (fisico.coma && fisico.tamanhoComa) {
          // sprite: escala ABSOLUTA — recompõe a partir do tamanho-base
          const t = fisico.tamanhoComa * fatorCauda;
          fisico.coma.scale.set(t, t, 1);
        }
      }

      fisico.escala = novaEscala;
    }

    // Recalcular linhas de órbita
    for (const [id, linha] of this.linhasOrbita.entries()) {
      const corpo = this.dados.corpos.find((c) => c.id === id);
      if (corpo) {
        const a = this._calcularDistancia(corpo);
        const e = corpo.excentricidade || 0;

        const pontos = [];
        const numSegmentos = 128;

        for (let i = 0; i <= numSegmentos; i++) {
          const M = (i / numSegmentos) * Math.PI * 2;
          const E = M + e * Math.sin(M);
          const x = a * (Math.cos(E) - e);
          const z = -a * Math.sqrt(1 - e * e) * Math.sin(E);
          // Mesma cadeia de orientação da criação (fonte única de verdade)
          pontos.push(this._aplicarFrameOrbital(new THREE.Vector3(x, 0, z), corpo));
        }

        linha.geometry.setFromPoints(pontos);
      }
    }

    if (this.corpoFocado) {
      this.focar(this.corpoFocado);
    }

    if (this.aoMudarEscala) {
      this.aoMudarEscala(modo);
    }
  }

  get escala() {
    return this._escala;
  }

  // Sondas (Hubble/JWST) podem ser ocultadas individualmente para não poluir
  // a visão da Terra. Oculta o grupo do corpo, sua linha de órbita e rótulo.
  setCorpoVisivel(id, visivel) {
    const fisico = this.corposFisicos.get(id);
    if (!fisico) return;
    fisico.grupoOrbita.visible = visivel;
    const linha = this.linhasOrbita.get(id);
    if (linha) linha.visible = visivel && this.orbitasVisiveis;
    this._corposOcultos = this._corposOcultos || new Set();
    if (visivel) this._corposOcultos.delete(id); else this._corposOcultos.add(id);
  }

  corpoVisivel(id) {
    return !(this._corposOcultos && this._corposOcultos.has(id));
  }

  setOrbitasVisiveis(b) {
    this.orbitasVisiveis = b;
    for (const [id, linha] of this.linhasOrbita.entries()) {
      linha.visible = b && !this._corposOcultos?.has(id);
    }
  }

  setRotulosVisiveis(b) {
    this.rotulosVisiveis = b;
    if (!b) {
      for (const [, fisico] of this.corposFisicos.entries()) {
        if (fisico.grupoOrbita.userData.rotuloSprite) {
          fisico.grupoOrbita.userData.rotuloSprite.visible = false;
        }
      }
    }
    // Quando b === true, deixe o passe do frame decidir (não force visible = true)
  }

  getDataSimulada() {
    const tempoMs = J2000_EPOCH + this.tempoDias * 24 * 3600 * 1000;
    return new Date(tempoMs);
  }

  irParaHoje() {
    this.tempoDias = (Date.now() - J2000_EPOCH) / (24 * 3600 * 1000);
  }

  _calcularDistancia(corpo) {
    // Se é lua (tem pai não-sol)
    if (corpo.pai && corpo.pai !== 'sol') {
      const corpoPai = this.dados.corpos.find((c) => c.id === corpo.pai);
      if (corpoPai) {
        const raioPai = this._calcularEscala(corpoPai).raio;

        if (this._escala === 'didatica') {
          return raioPai + 2.2 + 4 * Math.pow(corpo.distanciaMediaKm / 384400, 0.6);
        } else {
          const distKm = corpo.distanciaMediaKm;
          const distReal = (distKm / UA_KM) * 70;
          return Math.max(raioPai * 1.6, distReal);
        }
      }
    }

    // Não é lua: usar fórmula de planeta
    const ua = corpo.distanciaMediaKm / UA_KM;
    if (this._escala === 'didatica') {
      return 70 * Math.sqrt(ua);
    } else {
      return 70 * ua;
    }
  }

  _calcularEscala(corpo) {
    const raioKm = corpo.raioKm;
    let raio;

    if (corpo.tipo === 'estrela') {
      raio = 9;
    } else if (this._escala === 'didatica') {
      if (raioKm) {
        raio = Math.max(0.45, 1.1 * Math.sqrt(raioKm / 6371));
      } else {
        raio = 0.5;
      }
    } else {
      // ESCALA REAL: raios proporcionais entre si, magnificados por FATOR_REAL
      // só para ficarem visíveis. O piso antigo (0,02) achatava Lua, Terra e
      // TODAS as luas ao mesmo tamanho — a Lua aparecia igual à Terra e Io
      // parecia 60% de Júpiter. Agora a Lua fica ~0,27× a Terra e Júpiter ~11×
      // a Terra, como na realidade.
      //
      // Luas usam uma régua PRÓPRIA: a proporção real delas com o SEU
      // planeta-pai, não os km absolutos do sistema todo. Um piso global em
      // km (0,004) colapsava tudo abaixo de ~1.700 km no mesmo tamanho —
      // Fobos (11 km) e Deimos (6 km) apareciam do MESMO tamanho um do outro,
      // e ~50% de Marte (real: 0,33% e 0,18%); Caronte ficava idêntico a
      // Plutão (real: 51%, não 100% — os dois batiam no piso). Calculando a
      // partir do raio JÁ renderizado do pai, a proporção real sobrevive
      // mesmo quando ambos são minúsculos em km absolutos.
      const FATOR_REAL = 5;
      // Piso baixado de 0,0015 para 0,0003: com 0,0015, Vesta (263 km), Ceres
      // (473 km) e todos os cometas/asteroides pequenos colapsavam no MESMO
      // tamanho (Vesta parecia igual a Bennu, ~1.000× menor na realidade). Com
      // o piso menor, Vesta/Palas/Ceres e os 5 planetas-anões se diferenciam
      // corretamente entre si; só corpos genuinamente minúsculos (<20 km:
      // Eros, Bennu, Apófis, núcleos de cometa) continuam no piso — o que é
      // correto, pois são mesmo comparáveis em tamanho na realidade. O zoom de
      // foco (ver focar()) escala com o raio, então focar um corpo pequeno
      // continua enchendo bem a tela mesmo com o raio menor.
      const PISO_MINIMO = 0.0003; // só evita corpos sub-pixel/inclicáveis
      if (corpo.tipo === 'lua' && corpo.pai) {
        const pai = this.dados.corpos.find((c) => c.id === corpo.pai);
        if (pai && pai.raioKm && raioKm) {
          const raioPaiRenderizado = this._calcularEscala(pai).raio;
          raio = Math.max(PISO_MINIMO, (raioKm / pai.raioKm) * raioPaiRenderizado);
        } else {
          raio = PISO_MINIMO;
        }
      } else if (raioKm) {
        raio = Math.max(PISO_MINIMO, (raioKm / UA_KM) * 70 * FATOR_REAL);
      } else {
        raio = 0.02;
      }
    }

    const distancia = this._calcularDistancia(corpo);
    return { raio, distancia };
  }

  _calcularPosicao(corpo, relativo = false, tempoDias = this.tempoDias) {
    if (corpo.tipo === 'estrela') {
      return new THREE.Vector3(0, 0, 0);
    }

    // Ângulo médio
    let M = (corpo._anguloBaseGraus ?? (corpo.anguloInicialGraus || 0)) + (360 * tempoDias) / (corpo._periodoEfetivoDias || corpo.periodoOrbitalDias);

    if (corpo.retrogrado) {
      M = -M;
    }

    const MRad = (M * Math.PI) / 180;
    const e = corpo.excentricidade || 0;

    // Anomalia excêntrica via Newton-Raphson — converge até para e≈0.99
    // (Halley e=0.967, Hale-Bopp e=0.995); o ponto-fixo anterior divergia
    const E = this._resolverKepler(MRad, e);

    const a = this._calcularDistancia(corpo);
    const b = a * Math.sqrt(1 - e * e);

    const x = a * (Math.cos(E) - e);
    const z = -b * Math.sin(E);

    let posicao = new THREE.Vector3(x, 0, z);

    // Orientação orbital (cadeia única: ω → i → Ω → frame do pai)
    this._aplicarFrameOrbital(posicao, corpo);

    // Se tem pai (lua) e não é relativo, somar posição do pai
    if (!relativo && corpo.pai && corpo.pai !== 'sol') {
      const corpoPai = this.dados.corpos.find((c) => c.id === corpo.pai);
      if (corpoPai) {
        const posPai = this._calcularPosicao(corpoPai, false, tempoDias);
        posicao.add(posPai);
      }
    }

    // Aproximação roteirizada (Apófis 13/04/2029): o modelo kepleriano
    // simplificado não tem efeméride para produzir o encontro real — perto
    // da data, a posição é atraída suavemente até raspar o corpo-alvo, e
    // volta à elipse depois. Funciona nas duas escalas.
    if (corpo.aproximacao) {
      posicao = this._aplicarAproximacao(corpo, posicao, tempoDias);
    }

    return posicao;
  }

  _aplicarAproximacao(corpo, posicao, tempoDias) {
    const ap = corpo.aproximacao;
    if (ap._tempoDias === undefined) {
      ap._tempoDias = (Date.parse(ap.dataISO) - J2000_EPOCH) / (24 * 3600 * 1000);
      ap._corpoAlvo = this.dados.corpos.find((c) => c.id === ap.alvo) || null;
    }
    if (!ap._corpoAlvo) return posicao;
    const dt = Math.abs(tempoDias - ap._tempoDias);
    if (dt >= ap.janelaDias) return posicao;

    const x = 1 - dt / ap.janelaDias;
    const s = x * x * (3 - 2 * x); // smoothstep: 0 na borda da janela, 1 na data
    const posAlvo = this._calcularPosicao(ap._corpoAlvo, false, tempoDias);
    const raioAlvo = this._calcularEscala(ap._corpoAlvo).raio;

    // Ponto rasante: na direção kepler->alvo, a poucos raios visuais do alvo
    const dir = posicao.clone().sub(posAlvo);
    const dLen = dir.length();
    if (dLen < 1e-6) dir.set(1, 0, 0);
    else dir.divideScalar(dLen);
    const rasante = posAlvo.clone().addScaledVector(dir, raioAlvo * (ap.fatorRaioAlvo || 2.5));

    return posicao.lerp(rasante, s);
  }

  _atualizarFisica() {
    for (const [id, fisico] of this.corposFisicos.entries()) {
      const corpo = fisico.corpo;

      if (corpo.tipo !== 'cinturao') {
        // Atualizar posição (usar relativo se é lua com pai não-sol)
        const temPai = corpo.pai && corpo.pai !== 'sol';
        const novaPos = this._calcularPosicao(corpo, temPai);
        fisico.grupoOrbita.position.copy(novaPos);

        // Atualizar rotação própria (tempoDias em dias, período em horas)
        if (fisico.mesh && corpo.periodoRotacaoHoras) {
          const rotacaoGraus = (360 * this.tempoDias * 24) / corpo.periodoRotacaoHoras;
          const spinRad = (rotacaoGraus * Math.PI) / 180;
          if (fisico.qTilt) {
            // qTilt · qSpin: gira em torno do próprio eixo inclinado
            fisico.mesh.quaternion
              .copy(fisico.qTilt)
              .multiply(_qSpinTmp.setFromAxisAngle(_EIXO_Y, spinRad));
          } else {
            fisico.mesh.rotation.y = spinRad;
          }

          // Nuvens (Terra): mesh clonado à parte — sem isto, ficava PARADO
          // enquanto a superfície girava por baixo (visível agora que a
          // textura tem padrão real, antes era um véu uniforme e não dava
          // pra notar). Acompanha a rotação da superfície + uma deriva
          // atmosférica leve e independente (~4°/dia, nuvens reais não
          // giram em lockstep perfeito com o solo).
          const nuvens = fisico.grupoOrbita.userData.meshNuvens;
          if (nuvens) {
            const derivaRad = (this.tempoDias * 4 * Math.PI) / 180;
            if (fisico.qTilt) {
              nuvens.quaternion
                .copy(fisico.qTilt)
                .multiply(_qSpinTmp.setFromAxisAngle(_EIXO_Y, spinRad + derivaRad));
            } else {
              nuvens.rotation.y = spinRad + derivaRad;
            }
          }
        }

        // Atualizar cauda do cometa
        if (fisico.cauda) {
          const posCorpo = new THREE.Vector3();
          fisico.grupoOrbita.getWorldPosition(posCorpo);
          const posSol = new THREE.Vector3(0, 0, 0);
          const direcaoCauda = posCorpo.clone().sub(posSol).normalize();

          fisico.cauda.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direcaoCauda);
        }
      } else if (fisico.isCinturao) {
        // Rotacionar cinturão
        fisico.mesh.rotation.y += 0.0001;
      }
    }

    // Seguir o corpo focado: desloca câmera e alvo pelo movimento do corpo,
    // preservando a órbita/zoom que o usuário fizer com o mouse
    if ((this.corpoFocado || this._seguirFn) && !this.tweenFoco && this._posSeguida) {
      let posAlvo = null;
      if (this._seguirFn) {
        posAlvo = this._seguirFn();
      } else {
        const fisicoFocado = this.corposFisicos.get(this.corpoFocado);
        if (fisicoFocado) posAlvo = this._alvoDoFoco(fisicoFocado);
      }
      if (posAlvo) {
        const delta = posAlvo.clone().sub(this._posSeguida);
        this.camera.position.add(delta);
        this.controls.target.copy(posAlvo);
        this._posSeguida.copy(posAlvo);
      }
    }

  }

  _atualizarRotulos() {
    const ALTURA_ROTULO_PX = 22;
    const FATOR_CINTURAO = 1.35;
    const RAIO_MIN_PX = 3;
    const MARGEM = { topo: 76, fundo: 72, lados: 8 };
    const FOLGA_COLISAO_PX = 2;
    // O corpo FOCADO cresce com o próprio corpo quando o usuário dá zoom além
    // do enquadramento padrão de focar() — senão o nome fica minúsculo do lado
    // de um planeta que ocupa a tela inteira (achado do Fred, 04/08/2026).
    // Cresce só a partir de raioPx ~150 (planeta já grande em tela) e satura em
    // ALTURA_FOCO_MAX_PX: o canvas-fonte do rótulo é rasterizado a 64px de
    // altura (ver _criarRotulo), então acima disso a fonte volta a borrar —
    // era exatamente o bug que a reforma de tamanho constante corrigiu.
    const FATOR_FOCO_PX = 0.15;
    const ALTURA_FOCO_MAX_PX = 44;

    // 1. Se rótulos desativados, ocultar tudo
    if (!this.rotulosVisiveis) {
      for (const [, fisico] of this.corposFisicos.entries()) {
        const sprite = fisico.grupoOrbita.userData.rotuloSprite;
        if (sprite) sprite.visible = false;
      }
      return;
    }

    // 2. Medir o canvas
    const larguraPx = this.renderer.domElement.clientWidth;
    const alturaPx = this.renderer.domElement.clientHeight;
    if (larguraPx === 0 || alturaPx === 0) return;

    // 3. Fator de conversão mundo↔pixel
    const tanMeioFov = Math.tan((this.camera.fov * Math.PI / 180) / 2);
    const mundoPorPixel = (d) => (2 * d * tanMeioFov) / alturaPx;

    // Reusar vetores para não alocar por frame: são 2 por corpo × 45 corpos ×
    // 60 fps se alocar aqui dentro (ver comentário de alocação na L9)
    if (!this._vetRotulo) this._vetRotulo = new THREE.Vector3();
    if (!this._vetRotuloNdc) this._vetRotuloNdc = new THREE.Vector3();
    const vetorPos = this._vetRotulo;
    const vetorNdc = this._vetRotuloNdc;

    const candidatos = [];
    const PRIORIDADES = {
      'estrela': 0,
      'planeta': 1,
      'planeta-anao': 2,
      'cometa': 3,
      'cinturao': 3,
      'lua': 4,
      'sonda': 4,
      'asteroide': 5,
    };

    // 4. Processar cada corpo
    for (const [id, fisico] of this.corposFisicos.entries()) {
      const sprite = fisico.grupoOrbita.userData.rotuloSprite;
      if (!sprite) continue;

      // 4.b - Respeitar corpos ocultos
      if (this._corposOcultos?.has(id)) {
        sprite.visible = false;
        continue;
      }

      // 4.c - Posição de mundo
      sprite.getWorldPosition(vetorPos);

      // 4.d - Distância à câmera
      const d = this.camera.position.distanceTo(vetorPos);
      const mpp = mundoPorPixel(d);

      // 4.e - Escala constante em tela (corpo focado: cresce com o raio
      // aparente, plano/lua/etc: fixa; cinturão: fixa, maior)
      const raioPx = (fisico.escala?.raio || 0) / mpp;
      let alvoPx;
      if (fisico.isCinturao) {
        alvoPx = ALTURA_ROTULO_PX * FATOR_CINTURAO;
      } else if (id === this.corpoFocado) {
        alvoPx = Math.min(ALTURA_FOCO_MAX_PX, Math.max(ALTURA_ROTULO_PX, raioPx * FATOR_FOCO_PX));
      } else {
        alvoPx = ALTURA_ROTULO_PX;
      }
      const alturaMundo = alvoPx * mpp;
      const proporcao = sprite.material.map.image.width / sprite.material.map.image.height;
      sprite.scale.set(alturaMundo * proporcao, alturaMundo, 1);

      // 4.f - Corpo pequeno demais (exceto cinturão e focado)
      if (!fisico.isCinturao && id !== this.corpoFocado && raioPx < RAIO_MIN_PX) {
        sprite.visible = false;
        continue;
      }

      // 4.g - Projeção para tela
      const ndcPos = vetorNdc.copy(vetorPos).project(this.camera);
      if (ndcPos.z > 1) {
        sprite.visible = false;
        continue;
      }

      const cx = (ndcPos.x * 0.5 + 0.5) * larguraPx;
      const cy = (-ndcPos.y * 0.5 + 0.5) * alturaPx;

      // Deslocar pelo center do sprite
      const cyAjustado = cy - (fisico.isCinturao ? 0 : alvoPx * 0.7);
      const larguraRetangulo = alvoPx * proporcao;

      // 4.h - Guardar candidato
      candidatos.push({
        sprite,
        id,
        x: cx,
        y: cyAjustado,
        w: larguraRetangulo,
        h: alvoPx,
        d,
        corpo: fisico.corpo,
        prioridade: PRIORIDADES[fisico.corpo.tipo] ?? 6,
      });
    }

    // 5 e 6. Ordenar por prioridade (crescente), depois por distância
    candidatos.sort((a, b) => {
      if (a.prioridade !== b.prioridade) return a.prioridade - b.prioridade;
      return a.d - b.d;
    });

    // 7. Percorrer candidatos, mantendo lista de colocados
    const colocados = [];
    for (const cand of candidatos) {
      const { sprite, x, y, w, h } = cand;

      // Verificar se cabe na área segura
      if (
        x - w / 2 < MARGEM.lados ||
        x + w / 2 > larguraPx - MARGEM.lados ||
        y - h / 2 < MARGEM.topo ||
        y + h / 2 > alturaPx - MARGEM.fundo
      ) {
        sprite.visible = false;
        continue;
      }

      // Verificar colisão com já colocados
      let colidiu = false;
      for (const colocado of colocados) {
        const dx = Math.abs(x - colocado.x);
        const dy = Math.abs(y - colocado.y);
        const minDx = (w + colocado.w) / 2 + FOLGA_COLISAO_PX;
        const minDy = (h + colocado.h) / 2 + FOLGA_COLISAO_PX;

        if (dx < minDx && dy < minDy) {
          colidiu = true;
          break;
        }
      }

      if (colidiu) {
        sprite.visible = false;
      } else {
        sprite.visible = true;
        colocados.push(cand);
      }
    }
  }

  _loop() {
    let ultimoTempo = performance.now();

    const render = () => {
      requestAnimationFrame(render);

      const agora = performance.now();
      const deltaSegundos = (agora - ultimoTempo) / 1000;
      ultimoTempo = agora;

      // Palco ativo: renderiza a cena alternativa e sai. A cena principal fica
      // intacta — inclusive tempoDias, que NÃO avança (ver SPEC §3: 10 minutos
      // no modo Estações não podem jogar o simulador anos à frente).
      if (this._palco) {
        this._palco.atualizar(deltaSegundos);
        this.renderer.render(this._palco.scene, this._palco.camera);
        return;
      }

      // velocidade está em dias/segundo
      this.tempoDias += this._velocidade * deltaSegundos;

      this._atualizarFisica();

      for (const fn of this._atualizacoesExtras) {
        fn(this.tempoDias);
      }

      if (this.tweenFoco) {
        this.tweenFoco();
      }

      this.controls.update();
      this._atualizarRotulos();
      this.renderer.render(this.scene, this.camera);
    };

    render();
  }
}
