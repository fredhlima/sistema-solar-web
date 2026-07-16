import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { criarTexturaCanvas, criarTexturaAneis } from './texturas.js?v=4';

const J2000_EPOCH = new Date('2000-01-01T12:00:00Z').getTime();
const UA_KM = 149.6e6;

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
  async _carregarTexturasReais() {
    try {
      const resp = await fetch('texturas/manifest.json');
      if (!resp.ok) return;
      const ids = await resp.json();
      const loader = new THREE.TextureLoader();
      for (const id of ids) {
        const fisico = this.corposFisicos.get(id);
        if (!fisico || !fisico.mesh || !fisico.mesh.material || fisico.isCinturao) continue;
        loader.load(`texturas/${id}.jpg`, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
          fisico.mesh.material.map = tex;
          fisico.mesh.material.needsUpdate = true;
        });
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
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
    this._ajustarTamanoRenderer();
  }

  _ajustarTamanoRenderer() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    if (this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
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

      // Rotação do eixo
      if (corpo.inclinacaoEixoGraus) {
        mesh.rotation.z = (corpo.inclinacaoEixoGraus * Math.PI) / 180;
      }
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
      depthWrite: false,
    });

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
      pontos.push(new THREE.Vector3(x, 0, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(pontos);
    const material = new THREE.LineBasicMaterial({
      color: 0x3d5a80,
      opacity: 0.35,
      transparent: true,
      linewidth: 1,
    });

    const linha = new THREE.LineLoop(geometry, material);

    // Rotação por inclinação
    if (corpo.inclinacaoOrbitaGraus) {
      linha.rotation.x = (corpo.inclinacaoOrbitaGraus * Math.PI) / 180;
    }

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
    sprite.position.y = (raio || 1) + 2;

    grupo.add(sprite);
    grupo.userData.rotuloSprite = sprite;
  }

  _adicionarGlowSol(grupo, raioSol) {
    // Dois sprites aditivos para glow
    for (let i = 0; i < 2; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');

      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.5, 'rgba(255, 200, 0, 0.3)');
      grad.addColorStop(1, 'rgba(255, 100, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(material);
      const escala = raioSol * (4 + i * 3);
      sprite.scale.set(escala, escala, 1);

      grupo.add(sprite);
    }
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
    const material = new THREE.SpriteMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
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
    ring.rotation.x = Math.PI / 2.5;
    grupo.add(ring);
    return ring;
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

      if (dist < 5) {
        this._fazerPicking(e.clientX, e.clientY);
      }
    });
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
        rotulo.position.y = novaEscala.raio + 2;
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
          pontos.push(new THREE.Vector3(x, 0, z));
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
    for (const [, fisico] of this.corposFisicos.entries()) {
      if (fisico.grupoOrbita.userData.rotuloSprite) {
        fisico.grupoOrbita.userData.rotuloSprite.visible = b;
      }
    }
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

    // Rotação por inclinação
    if (corpo.inclinacaoOrbitaGraus) {
      const mat = new THREE.Matrix4();
      mat.makeRotationX((corpo.inclinacaoOrbitaGraus * Math.PI) / 180);
      posicao.applyMatrix4(mat);
    }

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
          fisico.mesh.rotation.y = (rotacaoGraus * Math.PI) / 180;
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

    // Visibilidade de rótulos de luas
    for (const [id, fisico] of this.corposFisicos.entries()) {
      const corpo = fisico.corpo;
      const sprite = fisico.grupoOrbita.userData.rotuloSprite;

      if (sprite && (corpo.tipo === 'lua' || corpo.tipo === 'sonda')) {
        const posCorpo = new THREE.Vector3();
        fisico.grupoOrbita.getWorldPosition(posCorpo);
        const distCamera = this.camera.position.distanceTo(posCorpo);
        sprite.visible = distCamera < 60 && this.rotulosVisiveis;
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
      this.renderer.render(this.scene, this.camera);
    };

    render();
  }
}
