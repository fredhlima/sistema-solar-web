import * as THREE from 'three';

const J2000_EPOCH = new Date('2000-01-01T12:00:00Z').getTime();

// Cria textura de sprite circular com glow (radial gradient)
function criarTexturaGlowCircular(cor) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  // Converter hex para rgba
  const r = parseInt(cor.slice(1, 3), 16);
  const g = parseInt(cor.slice(3, 5), 16);
  const b = parseInt(cor.slice(5, 7), 16);

  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
  grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.6)`);
  grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Cria textura de rótulo (sprite de texto)
function criarTexturaRotuloMissao(nome, cor) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = 'bold 48px Segoe UI, sans-serif';
  ctx.fillStyle = cor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(nome, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export class Trajetorias {
  constructor(motor, missoes) {
    this.motor = motor;
    this.missoes = missoes || [];
    this.scene = motor.scene;

    // Map: id missao -> {
    //   curva, linha, marcador, rotuloSprite,
    //   waypoints[], waypontDatas[],
    //   visible, geometryLinha, materialLinha,
    //   geometry marcador, ...
    // }
    this._trajetorias = new Map();
    this._visiveis = new Set();
    this._selecionada = null;
    this._callbackAtualizacao = null;
  }

  iniciar() {
    // Construir cada trajetória
    for (const missao of this.missoes) {
      this._construirTrajetoria(missao);
    }

    // Registrar callback de atualização no motor (chamado a cada frame com tempoDias)
    this._callbackAtualizacao = (tempoDias) => {
      this._atualizarMarcadores(tempoDias);
    };
    this.motor.adicionarAtualizacao(this._callbackAtualizacao);
  }

  _construirTrajetoria(missao) {
    const id = missao.id;

    // Coletar waypoints: posições dos corpos nas datas das paradas
    const waypoints = [];
    const waypointDatas = [];

    for (const parada of missao.paradas) {
      // Verificar se corpo existe
      const corpo = this.motor.dados.corpos.find(c => c.id === parada.corpo);
      if (!corpo) continue; // Pular parada com corpo inexistente (defensivo)

      // Obter posição do corpo na data da parada
      const posicao = this.motor.posicaoCorpoEm(parada.corpo, parada.data);
      if (posicao === null) continue; // Pular se posição falhar

      // Parada numa estrela (Parker Solar Probe → Sol): a posição do corpo é
      // o CENTRO da esfera visual (raio 9) — o waypoint ali enterra a linha,
      // o marcador e o rótulo dentro do Sol. Recua o ponto até logo fora da
      // superfície visual, na direção de aproximação (a linha "toca" o Sol).
      if (corpo.tipo === 'estrela' && waypoints.length > 0) {
        const anterior = waypoints[waypoints.length - 1];
        const aproximacao = posicao.clone().sub(anterior);
        const distAteCentro = aproximacao.length();
        const raioVisual = this.motor._calcularEscala(corpo).raio * 1.6;
        if (distAteCentro > raioVisual) {
          posicao.copy(anterior).addScaledVector(aproximacao, (distAteCentro - raioVisual) / distAteCentro);
        }
      }

      waypoints.push(posicao);
      waypointDatas.push({
        data: parada.data,
        rotulo: parada.rotulo
      });
    }

    // Defensivo: ignorar missão com menos de 2 waypoints
    if (waypoints.length < 2) {
      console.warn(`Missão ${id} tem menos de 2 waypoints válidos, ignorando`);
      return;
    }

    // Criar curva CatmullRomCurve3
    const curva = new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.5);

    // Se interestelar, adicionar 1 ponto extra prolongando ~60% do último segmento
    let curvaFinal = curva;
    if (missao.interestelar && waypoints.length >= 2) {
      const ultimoPonto = waypoints[waypoints.length - 1];
      const penultimoPonto = waypoints[waypoints.length - 2];

      // Direção do último segmento
      const direcao = ultimoPonto.clone().sub(penultimoPonto).normalize();

      // Comprimento total da curva (aproximado como soma das distâncias entre waypoints)
      let comprimentoTotal = 0;
      for (let i = 1; i < waypoints.length; i++) {
        comprimentoTotal += waypoints[i].distanceTo(waypoints[i - 1]);
      }

      // Prolongar em 60% do comprimento total
      const prolongamento = direcao.multiplyScalar(comprimentoTotal * 0.6);
      const pontoProlongado = ultimoPonto.clone().add(prolongamento);

      // Criar nova curva com o ponto adicional
      const waypointsProlongados = [...waypoints, pontoProlongado];
      curvaFinal = new THREE.CatmullRomCurve3(waypointsProlongados, false, 'catmullrom', 0.5);
    }

    // Criar linha: 200 segmentos
    const pontos = curvaFinal.getPoints(200);
    const geometryLinha = new THREE.BufferGeometry().setFromPoints(pontos);

    const cor = new THREE.Color(missao.cor);
    const materialLinha = new THREE.LineBasicMaterial({
      color: cor,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      linewidth: 1
    });

    const linha = new THREE.Line(geometryLinha, materialLinha);
    linha.visible = false; // Inicia oculto
    this.scene.add(linha);

    // Criar marcador: sprite circular com glow
    const texturaGlow = criarTexturaGlowCircular(missao.cor);
    const materialMarcador = new THREE.SpriteMaterial({
      map: texturaGlow,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false // evita "quadrado preto" bloqueando o que está atrás
    });
    // Comprimento aproximado para dimensionar o marcador (Apollo 11 é
    // minúscula perto das Voyagers — marcador fixo de 3u a engoliria)
    let comprimentoAprox = 0;
    for (let i = 1; i < waypoints.length; i++) {
      comprimentoAprox += waypoints[i].distanceTo(waypoints[i - 1]);
    }
    const escalaMarcador = Math.min(3, Math.max(0.8, comprimentoAprox * 0.04));

    const marcador = new THREE.Sprite(materialMarcador);
    marcador.scale.set(escalaMarcador, escalaMarcador, 1);
    marcador.visible = false; // Inicia oculto
    this.scene.add(marcador);

    // Criar rótulo (sprite de texto com o nome da missão)
    const texturaRotulo = criarTexturaRotuloMissao(missao.nome, missao.cor);
    const materialRotulo = new THREE.SpriteMaterial({
      map: texturaRotulo,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false
    });
    const rotuloSprite = new THREE.Sprite(materialRotulo);
    const escalaRotulo = Math.min(1, escalaMarcador / 1.6);
    rotuloSprite.scale.set(12 * escalaRotulo, 3 * escalaRotulo, 1);
    rotuloSprite.visible = false; // Inicia oculto
    this.scene.add(rotuloSprite);

    // Armazenar dados da trajetória
    this._trajetorias.set(id, {
      missao,
      curva: curvaFinal,
      curvaOriginal: curva,
      linha,
      geometryLinha,
      materialLinha,
      marcador,
      materialMarcador,
      rotuloSprite,
      materialRotulo,
      waypoints,
      waypointDatas,
      posicaoMarcadorAtual: null,
      visivel: false,
      selecionada: false,
      escalaMarcador,
      // Pré-computados para o loop de frame (evita realocar a cada quadro)
      temposDias: waypointDatas.map((d) => this._converterDataParaTempoDias(d.data)),
      tempoDiasUltimaParada: this._converterDataParaTempoDias(waypointDatas[waypointDatas.length - 1].data)
    });
  }

  reconstruir() {
    // Preservar estado para reaplicar após a reconstrução (SPEC V2-B)
    const visiveisAntes = [...this._visiveis];
    const selecionadaAntes = this._selecionada;

    // Remover todas as linhas, marcadores e rótulos da cena
    for (const [id, traj] of this._trajetorias.entries()) {
      traj.geometryLinha.dispose();
      traj.materialLinha.dispose();
      traj.materialMarcador.dispose();
      traj.materialRotulo.dispose();

      this.scene.remove(traj.linha);
      this.scene.remove(traj.marcador);
      this.scene.remove(traj.rotuloSprite);
    }

    this._trajetorias.clear();
    this._visiveis.clear();
    this._selecionada = null;

    // Reconstruir com as posições da escala atual
    for (const missao of this.missoes) {
      this._construirTrajetoria(missao);
    }

    for (const id of visiveisAntes) {
      this.setVisivel(id, true);
    }
    if (selecionadaAntes) {
      this.setSelecionada(selecionadaAntes);
    }
  }

  setVisivel(idMissao, bool) {
    const traj = this._trajetorias.get(idMissao);
    if (!traj) return;

    traj.visivel = bool;

    if (bool) {
      this._visiveis.add(idMissao);
      traj.linha.visible = true;
      traj.marcador.visible = true;
      traj.rotuloSprite.visible = true;
    } else {
      this._visiveis.delete(idMissao);
      traj.linha.visible = false;
      traj.marcador.visible = false;
      traj.rotuloSprite.visible = false;
    }
  }

  setSelecionada(idMissaoOuNull) {
    // Restaurar opacity de todos visíveis
    if (this._selecionada) {
      const trajAnt = this._trajetorias.get(this._selecionada);
      if (trajAnt && this._visiveis.has(this._selecionada)) {
        trajAnt.materialLinha.opacity = 0.55;
        trajAnt.selecionada = false;
      }
    }

    this._selecionada = idMissaoOuNull;

    if (idMissaoOuNull) {
      const traj = this._trajetorias.get(idMissaoOuNull);
      if (traj) {
        traj.materialLinha.opacity = 0.95;
        traj.selecionada = true;

        // Esmaiar as outras visíveis
        for (const id of this._visiveis) {
          if (id !== idMissaoOuNull) {
            const outraTraj = this._trajetorias.get(id);
            if (outraTraj) {
              outraTraj.materialLinha.opacity = 0.18;
            }
          }
        }
      }
    } else {
      // null: restaurar 0.55 em todas visíveis
      for (const id of this._visiveis) {
        const traj = this._trajetorias.get(id);
        if (traj) {
          traj.materialLinha.opacity = 0.55;
        }
      }
    }
  }

  get visiveis() {
    return this._visiveis;
  }

  // Posição mundial atual da "nave" (marcador) de uma missão — usada pelo
  // motor para seguir a nave com a câmera. Antes do lançamento, retorna o
  // ponto de partida da curva (a Terra na data do lançamento).
  posicaoDaNave(idMissao) {
    const traj = this._trajetorias.get(idMissao);
    if (!traj) return null;
    if (traj.marcador.visible) return traj.marcador.position.clone();
    return traj.curva.getPoint(0);
  }

  // Distância de câmera confortável para seguir a nave, proporcional ao
  // tamanho do marcador da missão
  distanciaCameraSugerida(idMissao) {
    const traj = this._trajetorias.get(idMissao);
    if (!traj) return 8;
    return Math.max(6, traj.escalaMarcador * 5);
  }

  _converterDataParaTempoDias(dataISO) {
    const ms = Date.parse(dataISO);
    if (!Number.isFinite(ms)) return 0;
    return (ms - J2000_EPOCH) / (24 * 3600 * 1000);
  }

  _atualizarMarcadores(tempoDias) {
    for (const [id, traj] of this._trajetorias.entries()) {
      if (!traj.visivel) continue;

      const { temposDias, curva, missao } = traj;
      // A curva pode ter 1 ponto a mais que as paradas (extensão interestelar);
      // o denominador do parâmetro u é SEMPRE o nº de pontos da curva - 1
      const nCurva = curva.points.length;
      const tempoDiasLancamento = temposDias[0];
      const tempoDiasFim = temposDias[temposDias.length - 1];

      // Antes do lançamento: marcador e rótulo ocultos (linha permanece)
      if (tempoDias < tempoDiasLancamento) {
        traj.marcador.visible = false;
        traj.rotuloSprite.visible = false;
        continue;
      }

      let u;
      if (tempoDias <= tempoDiasFim) {
        // Dentro do caminho conhecido: interpolação piecewise entre paradas
        u = (temposDias.length - 1) / (nCurva - 1);
        for (let i = 0; i < temposDias.length - 1; i++) {
          if (tempoDias >= temposDias[i] && tempoDias <= temposDias[i + 1]) {
            const frac = (tempoDias - temposDias[i]) / (temposDias[i + 1] - temposDias[i]);
            u = (i + frac) / (nCurva - 1);
            break;
          }
        }
      } else if (missao.interestelar && nCurva > temposDias.length) {
        // Extensão interestelar: avança da última parada ao fim da curva em
        // ~60% da duração total da missão (espelha os 60% de comprimento)
        const durExtensao = Math.max(1, (tempoDiasFim - tempoDiasLancamento) * 0.6);
        const frac = Math.min(1, (tempoDias - tempoDiasFim) / durExtensao);
        const uFim = (temposDias.length - 1) / (nCurva - 1);
        u = uFim + frac * (1 - uFim);
      } else {
        // Missão encerrada: fixa no último waypoint
        u = (temposDias.length - 1) / (nCurva - 1);
      }

      const posicaoMarcador = curva.getPoint(u);
      if (posicaoMarcador) {
        traj.marcador.position.copy(posicaoMarcador);
        traj.rotuloSprite.position.copy(posicaoMarcador);
        traj.rotuloSprite.position.y += traj.escalaMarcador + 1.2;

        traj.marcador.visible = true;
        traj.rotuloSprite.visible = true;
      }
    }
  }
}
