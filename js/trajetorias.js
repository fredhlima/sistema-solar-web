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
    if (missao.espiral) {
      this._construirTrajetoriaEspiral(missao);
      return;
    }
    const id = missao.id;

    // Missão com captura orbital (Juno/Cassini): o spline representa só o
    // cruzeiro até a inserção; depois a nave orbita o planeta. Paradas
    // posteriores à inserção (Grand Finale da Cassini) ficam fora do spline
    // — senão viram um arco falso ao longo da órbita do planeta.
    const cap = missao.orbitaCaptura || null;
    const tempoInicioCaptura = cap ? this._converterDataParaTempoDias(cap.dataInicio) : null;

    // Coletar waypoints: posições dos corpos nas datas das paradas
    const waypoints = [];
    const waypointDatas = [];
    // Missão que termina numa estrela (Parker → Sol): esfera de exclusão para
    // a linha e o marcador nunca entrarem na esfera visual do Sol
    let clampEstrela = null;

    for (const parada of missao.paradas) {
      // Parada após a inserção orbital: não entra no spline de cruzeiro
      if (cap && this._converterDataParaTempoDias(parada.data) > tempoInicioCaptura) continue;
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
        clampEstrela = { centro: posicao.clone(), raio: raioVisual };
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

    // Se interestelar, prolongar a rota além do último sobrevoo. A extensão é
    // ancorada no TEMPO REAL: a sonda segue na velocidade (visual) do último
    // trecho até a data atual + 25% de folga. O prolongamento fixo de 60%
    // anterior fazia o marcador congelar em ~2 anos (a Voyager 1 ficava
    // parada desde 1982 na cena, com o texto dizendo "atualmente viaja").
    let curvaFinal = curva;
    let durExtensaoDias = 0;
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

      const tUlt = this._converterDataParaTempoDias(waypointDatas[waypointDatas.length - 1].data);
      const tPen = this._converterDataParaTempoDias(waypointDatas[waypointDatas.length - 2].data);
      const velTrecho = ultimoPonto.distanceTo(penultimoPonto) / Math.max(1, tUlt - tPen);
      const hojeDias = (Date.now() - J2000_EPOCH) / 86400000;
      durExtensaoDias = Math.max(365, (hojeDias - tUlt) * 1.25);
      // Teto de comprimento: a escala didática comprime distâncias (√), então
      // a extrapolação linear estouraria a cena sem este limite
      const comprimentoExt = Math.min(velTrecho * durExtensaoDias, comprimentoTotal * 2.5);
      const pontoProlongado = ultimoPonto.clone().add(direcao.multiplyScalar(comprimentoExt));

      // Criar nova curva com o ponto adicional
      const waypointsProlongados = [...waypoints, pontoProlongado];
      curvaFinal = new THREE.CatmullRomCurve3(waypointsProlongados, false, 'catmullrom', 0.5);
    }

    // Criar linha: 200 segmentos
    const pontos = curvaFinal.getPoints(200);
    // A Catmull-Rom pode "mergulhar" dentro da esfera visual da estrela mesmo
    // com o waypoint final recuado — empurra cada ponto amostrado para fora
    if (clampEstrela) {
      for (const p of pontos) this._clampForaDaEsfera(p, clampEstrela);
    }
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

    // Órbita de captura ao redor do planeta (Juno/Cassini). A direção de
    // chegada do cruzeiro alinha a fase inicial da órbita (M0) para a nave
    // continuar se movendo "para a frente" na inserção, sem virada seca.
    let dirChegada = null;
    if (cap && waypoints.length >= 2) {
      dirChegada = waypoints[waypoints.length - 1].clone()
        .sub(waypoints[waypoints.length - 2]).normalize();
    }
    const captura = cap ? this._criarOrbitaCaptura(missao, cap, tempoInicioCaptura, dirChegada) : null;

    // Armazenar dados da trajetória
    this._trajetorias.set(id, {
      missao,
      captura,
      durExtensaoDias,
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
      clampEstrela,
      // Pré-computados para o loop de frame (evita realocar a cada quadro)
      temposDias: waypointDatas.map((d) => this._converterDataParaTempoDias(d.data)),
      tempoDiasUltimaParada: this._converterDataParaTempoDias(waypointDatas[waypointDatas.length - 1].data)
    });
  }

  // ————— Órbita de captura (Juno/Cassini) —————
  // Elipse kepleriana ao redor do planeta-alvo, com o planeta no foco. As
  // distâncias peri/apo (km reais) passam pelo MESMO mapeamento usado para
  // as luas do simulador (compressão didática ^0.6), então a órbita da nave
  // fica coerente com as luas na cena. A linha segue o planeta a cada frame.
  _criarOrbitaCaptura(missao, cap, tempoInicio, dirChegada) {
    const corpoPai = this.motor.dados.corpos.find((c) => c.id === cap.corpo);
    if (!corpoPai) return null;
    const raioPai = this.motor._calcularEscala(corpoPai).raio;

    // Espelha _calcularDistancia do motor para luas — manter em sincronia
    const mapear = (km) => this.motor.escala === 'didatica'
      ? raioPai + 2.2 + 4 * Math.pow(km / 384400, 0.6)
      : Math.max(raioPai * 1.6, (km / 149.6e6) * 70);

    const rPeri = mapear(cap.periKm);
    const rApo = mapear(cap.apoKm);
    const a = (rPeri + rApo) / 2;
    const e = (rApo - rPeri) / (rApo + rPeri);
    const b = a * Math.sqrt(1 - e * e);
    const incRad = ((cap.inclinacaoGraus || 0) * Math.PI) / 180;
    const rot = new THREE.Matrix4().makeRotationX(incRad);

    const pontos = [];
    for (let i = 0; i <= 128; i++) {
      const E = (i / 128) * Math.PI * 2;
      const p = new THREE.Vector3(a * (Math.cos(E) - e), 0, -b * Math.sin(E));
      p.applyMatrix4(rot);
      pontos.push(p);
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(pontos);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(missao.cor),
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    });
    const linha = new THREE.Line(geometry, material);
    linha.visible = false;
    this.scene.add(linha);

    // Fase inicial (M0) alinhada com a direção de CHEGADA do cruzeiro: em
    // tempoInicio a nave deve estar do lado da elipse para onde ela vinha
    // se movendo, para a inserção continuar "para a frente" em vez de
    // teleportar para o periapse (direção fixa da geometria). Busca a
    // anomalia excêntrica cuja direção radial casa com a de chegada.
    let M0 = 0;
    if (dirChegada) {
      // Desfaz a inclinação da elipse para comparar no plano orbital
      const dirPlano = dirChegada.clone().applyMatrix4(rot.clone().invert());
      const thetaAlvo = Math.atan2(-dirPlano.z, dirPlano.x);
      let melhorDif = Infinity;
      for (let i = 0; i < 256; i++) {
        const E = (i / 256) * Math.PI * 2;
        const theta = Math.atan2(b * Math.sin(E), a * (Math.cos(E) - e));
        let dif = Math.abs(theta - thetaAlvo);
        if (dif > Math.PI) dif = Math.PI * 2 - dif;
        if (dif < melhorDif) {
          melhorDif = dif;
          M0 = E - e * Math.sin(E);
        }
      }
    }

    return {
      linha, geometry, material, corpoPai,
      a, e, b, rot, M0,
      tempoInicio,
      tempoFim: cap.dataFim ? this._converterDataParaTempoDias(cap.dataFim) : Infinity,
      periodoDias: cap.periodoDias || 20,
      // Janela do blend de inserção: meio período orbital do centro do
      // planeta (fim do spline) até a órbita — vira uma espiral de inserção
      janelaInsercao: (cap.periodoDias || 20) * 0.5,
      // Inicializado pelo tempo ATUAL da simulação (não `false` fixo): assim,
      // trocar de escala (reconstruir() recria este objeto do zero) não
      // dispara sim:orbita-capturada de novo só porque a nave já estava na
      // órbita final quando o usuário trocou didática↔real.
      jaEntrouOrbita: this.motor.tempoDias >= tempoInicio
    };
  }

  // Posição LOCAL da nave na órbita de captura (relativa ao planeta)
  _posicaoCapturaLocal(captura, tempoDias) {
    const M = captura.M0 + (Math.PI * 2 * (tempoDias - captura.tempoInicio)) / captura.periodoDias;
    const TAU = Math.PI * 2;
    const Mn = ((M % TAU) + TAU) % TAU;
    const E = this._resolverKepler(Mn, captura.e);
    const p = new THREE.Vector3(
      captura.a * (Math.cos(E) - captura.e),
      0,
      -captura.b * Math.sin(E)
    );
    p.applyMatrix4(captura.rot);
    return p;
  }

  // ————— Trajetória espiral (Parker Solar Probe) —————
  // O spline por waypoints não representa uma espiral de múltiplas voltas.
  // Aqui a trajetória é gerada analiticamente: uma sequência de órbitas
  // keplerianas heliocêntricas cujo periélio encolhe a cada sobrevoo de
  // Vênus. O afélio fica ancorado na órbita de Vênus DO SIMULADOR (as
  // posições dos planetas são estilizadas — ancorar nos corpos da cena é o
  // que faz os estilingues acontecerem visualmente em cima de Vênus).

  // Distância heliocêntrica em UA -> unidades da cena. Espelha
  // _calcularDistancia do motor para corpos com pai 'sol' — manter em sincronia.
  _raioSimDeUA(ua) {
    return this.motor.escala === 'didatica' ? 70 * Math.sqrt(ua) : 70 * ua;
  }

  // Ângulo heliocêntrico (no plano orbital, antes da inclinação) de um corpo
  // do simulador num instante. Desfaz a rotação de inclinação do corpo.
  _anguloCorpoEm(corpo, tempoDias) {
    const pos = this.motor._calcularPosicao(corpo, false, tempoDias);
    const inc = ((corpo.inclinacaoOrbitaGraus || 0) * Math.PI) / 180;
    // Inverso exato do rotX(inc) que o motor aplica a corpos heliocêntricos
    const z = -pos.y * Math.sin(inc) + pos.z * Math.cos(inc);
    return Math.atan2(-z, pos.x);
  }

  _wrapPi(a) {
    const TAU = Math.PI * 2;
    let r = a % TAU;
    if (r > Math.PI) r -= TAU;
    if (r < -Math.PI) r += TAU;
    return r;
  }

  // Resolve Kepler como o motor (Newton-Raphson), com uma diferença DE
  // PROPÓSITO: preserva o número de voltas (E contínuo) em vez de normalizar
  // para [0,2π) — a espiral do Parker depende disso. Não "consertar".
  _resolverKepler(MRad, e) {
    // e === 0, não !e: !NaN também é true, e uma excentricidade NaN (ex.:
    // mismatch entre sobrevoos/perieliosUA) deve propagar um erro visível,
    // não virar "órbita circular" silenciosa.
    if (e === 0) return MRad;
    const TAU = Math.PI * 2;
    const voltas = Math.floor(MRad / TAU);
    let Mn = MRad - voltas * TAU;
    let E = e < 0.8 ? Mn : Math.PI;
    for (let i = 0; i < 30; i++) {
      const dE = (E - e * Math.sin(E) - Mn) / (1 - e * Math.cos(E));
      E -= dE;
      if (Math.abs(dE) < 1e-9) break;
    }
    return E + voltas * TAU;
  }

  _construirTrajetoriaEspiral(missao) {
    const esp = missao.espiral;
    const corpos = this.motor.dados.corpos;
    const venus = corpos.find((c) => c.id === 'venus');
    const terra = corpos.find((c) => c.id === 'terra');
    const sol = corpos.find((c) => c.tipo === 'estrela');
    if (!venus || !terra || !sol) {
      console.warn(`Missão ${missao.id}: corpos da espiral ausentes, ignorando`);
      return;
    }
    // Mesma guarda defensiva do caminho genérico (waypoints.length < 2): sem
    // isso, um dado futuro vazio/errado lançaria uma exceção não tratada
    // aqui dentro de iniciar() (chamado sem try/catch em main.js) e abortaria
    // a inicialização do app inteiro, não só desta missão.
    if (!missao.paradas || missao.paradas.length === 0) {
      console.warn(`Missão ${missao.id}: sem paradas, ignorando espiral`);
      return;
    }
    if (!esp.sobrevoos || !esp.perieliosUA || esp.sobrevoos.length !== esp.perieliosUA.length) {
      console.warn(`Missão ${missao.id}: sobrevoos e perieliosUA com tamanhos diferentes, ignorando espiral`);
      return;
    }

    const UA_KM = 149.6e6; // igual ao motor
    const uaVenus = venus.distanciaMediaKm / UA_KM;   // ~0.7233
    const uaTerra = terra.distanciaMediaKm / UA_KM;   // 1.0
    const incVenusRad = ((venus.inclinacaoOrbitaGraus || 0) * Math.PI) / 180;
    const raioSolVisual = this.motor._calcularEscala(sol).raio;
    const pisoRaio = raioSolVisual * 1.12; // a linha "toca" o Sol sem entrar

    const tLanc = this._converterDataParaTempoDias(esp.dataLancamento);
    const tVGA = esp.sobrevoos.map((d) => this._converterDataParaTempoDias(d));
    const thetaVenusEm = (t) => this._anguloCorpoEm(venus, t);

    // Verdadeira anomalia a partir da anomalia excêntrica
    const nuDeE = (E, e) =>
      2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));

    // ——— Montar fases ———
    // Cada fase: órbita (qUA, QUA) percorrida de afélio a afélio n vezes,
    // com deriva angular linear para o ponto final coincidir com Vênus.
    const fases = [];

    // Fase 0 — transferência Terra -> 1º sobrevoo de Vênus.
    // Elipse com afélio na Terra; avança até r = órbita de Vênus (entrada).
    {
      const q = esp.perieliosUA[0];
      const Q = uaTerra;
      const a = (q + Q) / 2;
      const e = (Q - q) / (Q + q);
      // E onde r volta a ser uaVenus no trecho pós-afélio (E em [π, 2π])
      const cosE = (1 - uaVenus / a) / e;
      const Efim = Math.PI * 2 - Math.acos(Math.max(-1, Math.min(1, cosE)));
      const Mfim = Efim - e * Math.sin(Efim);
      const thetaBase = this._anguloCorpoEm(terra, tLanc);
      const nuFim = nuDeE(Efim, e);
      const semDrift = thetaBase + (nuFim - Math.PI);
      const drift = this._wrapPi(thetaVenusEm(tVGA[0]) - semDrift);
      fases.push({
        t0: tLanc, t1: tVGA[0], q, Q, a, e,
        M0: Math.PI, M1: Mfim, thetaBase, drift,
        inc0: 0, inc1: incVenusRad
      });
    }

    // Fases 1..6 — entre sobrevoos consecutivos: afélio ancorado em Vênus,
    // n voltas inteiras (n ≈ duração / período kepleriano real da órbita).
    for (let i = 0; i < tVGA.length - 1; i++) {
      const q = esp.perieliosUA[i];
      const Q = uaVenus;
      const a = (q + Q) / 2;
      const e = (Q - q) / (Q + q);
      const periodoDias = 365.25 * Math.pow(a, 1.5); // 3ª lei de Kepler
      const dur = tVGA[i + 1] - tVGA[i];
      const n = Math.max(1, Math.round(dur / periodoDias));
      const thetaBase = thetaVenusEm(tVGA[i]);
      // fim sem deriva: afélio de novo => mesmo ângulo (mod 2π)
      const drift = this._wrapPi(thetaVenusEm(tVGA[i + 1]) - thetaBase);
      fases.push({
        t0: tVGA[i], t1: tVGA[i + 1], q, Q, a, e,
        M0: Math.PI, M1: Math.PI + Math.PI * 2 * n, thetaBase, drift,
        inc0: incVenusRad, inc1: incVenusRad
      });
    }

    // Fase final — órbita definitiva após o último sobrevoo, sem fim.
    // Se houver data de periélio de referência (recorde do Parker), a fase
    // é ancorada nela: M(dataPerielio) ≡ 0 (mod 2π). Perto do afélio o raio
    // quase não muda, então a continuidade com o sobrevoo se mantém.
    {
      const q = esp.perieliosUA[esp.perieliosUA.length - 1];
      const Q = uaVenus;
      const a = (q + Q) / 2;
      const e = (Q - q) / (Q + q);
      const periodoDias = 365.25 * Math.pow(a, 1.5); // ~88 dias (real!)
      const t0 = tVGA[tVGA.length - 1];
      let M0 = Math.PI;
      if (esp.dataPerielioRecorde) {
        const tPeri = this._converterDataParaTempoDias(esp.dataPerielioRecorde);
        const frac = (tPeri - t0) / periodoDias;
        M0 = Math.PI * 2 * (Math.ceil(frac) - frac);
      }
      // Compensa o M0 fora do afélio para a fase ainda COMEÇAR em Vênus
      const E0 = this._resolverKepler(M0, e);
      const nu0 = nuDeE(E0, e);
      const thetaBase = thetaVenusEm(t0) - (nu0 - Math.PI);
      fases.push({
        t0, t1: Infinity, q, Q, a, e,
        M0, periodoDias, thetaBase, drift: 0,
        inc0: incVenusRad, inc1: incVenusRad
      });
    }

    // Posição da sonda num instante (unidades da cena). null antes do lançamento.
    const _rotX = new THREE.Matrix4();
    const espiralFn = (tempoDias) => {
      if (tempoDias < tLanc) return null;
      let fase = fases[fases.length - 1];
      for (const f of fases) {
        if (tempoDias < f.t1) { fase = f; break; }
      }
      let M, tau;
      if (fase.t1 === Infinity) {
        tau = 1;
        M = fase.M0 + (Math.PI * 2 * (tempoDias - fase.t0)) / fase.periodoDias;
      } else {
        tau = (tempoDias - fase.t0) / (fase.t1 - fase.t0);
        M = fase.M0 + (fase.M1 - fase.M0) * tau;
      }
      // Anomalia verdadeira ACUMULADA (contínua através das voltas): resolve
      // Kepler na volta normalizada e soma as voltas completas de novo.
      // Com En ∈ [0, 2π), nuDeE devolve nu ∈ [0, 2π) monotônico em En.
      const TAU = Math.PI * 2;
      const voltas = Math.floor(M / TAU);
      const En = this._resolverKepler(M - voltas * TAU, fase.e);
      let nu = nuDeE(En, fase.e);
      if (nu < 0) nu += TAU;
      const rUA = fase.a * (1 - fase.e * Math.cos(En));
      const theta = fase.thetaBase + (nu + voltas * TAU - Math.PI) + fase.drift * tau;
      const r = Math.max(pisoRaio, this._raioSimDeUA(rUA));
      const pos = new THREE.Vector3(r * Math.cos(theta), 0, -r * Math.sin(theta));
      const inc = fase.inc0 + (fase.inc1 - fase.inc0) * tau;
      if (inc) {
        _rotX.makeRotationX(inc);
        pos.applyMatrix4(_rotX);
      }
      return pos;
    };

    // ——— Linha: amostragem temporal fina do caminho todo ———
    const tFim = esp.dataFimLinha
      ? this._converterDataParaTempoDias(esp.dataFimLinha)
      : tVGA[tVGA.length - 1] + 270;
    // Amostragem ADAPTATIVA: perto do periélio a sonda varre ângulos enormes
    // em horas (2ª lei de Kepler) — passo uniforme de dias deixaria quinas.
    // Bisseção até cada segmento ficar curto na cena.
    const passoDias = 1.25;
    const segMax = 1.8; // unidades de cena
    const pontos = [];
    const refinar = (t0, p0, t1, p1, prof) => {
      if (prof <= 0 || p0.distanceTo(p1) <= segMax) return;
      const tm = (t0 + t1) / 2;
      const pm = espiralFn(tm);
      refinar(t0, p0, tm, pm, prof - 1);
      pontos.push(pm);
      refinar(tm, pm, t1, p1, prof - 1);
    };
    let tPrev = tLanc;
    let pPrev = espiralFn(tLanc);
    pontos.push(pPrev);
    for (let t = tLanc + passoDias; t <= tFim; t += passoDias) {
      const p = espiralFn(t);
      refinar(tPrev, pPrev, t, p, 7);
      pontos.push(p);
      tPrev = t;
      pPrev = p;
    }

    const geometryLinha = new THREE.BufferGeometry().setFromPoints(pontos);
    const materialLinha = new THREE.LineBasicMaterial({
      color: new THREE.Color(missao.cor),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      linewidth: 1
    });
    const linha = new THREE.Line(geometryLinha, materialLinha);
    linha.visible = false;
    this.scene.add(linha);

    // Marcador e rótulo — mesmos sprites das trajetórias comuns
    const texturaGlow = criarTexturaGlowCircular(missao.cor);
    const materialMarcador = new THREE.SpriteMaterial({
      map: texturaGlow,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false
    });
    const escalaMarcador = 1.6;
    const marcador = new THREE.Sprite(materialMarcador);
    marcador.scale.set(escalaMarcador, escalaMarcador, 1);
    marcador.visible = false;
    this.scene.add(marcador);

    const texturaRotulo = criarTexturaRotuloMissao(missao.nome, missao.cor);
    const materialRotulo = new THREE.SpriteMaterial({
      map: texturaRotulo,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false
    });
    const rotuloSprite = new THREE.Sprite(materialRotulo);
    // escalaMarcador é fixo (1,6) neste método (espiral/captura), diferente do
    // método irmão onde ele varia por missão — por isso o rótulo usa escala
    // fixa direto, sem o Math.min(1, escalaMarcador/1.6) do outro método (que
    // aqui sempre avaliaria pra 1, código morto herdado por copy-paste).
    rotuloSprite.scale.set(12, 3, 1);
    rotuloSprite.visible = false;
    this.scene.add(rotuloSprite);

    const waypointDatas = missao.paradas.map((p) => ({ data: p.data, rotulo: p.rotulo }));
    this._trajetorias.set(missao.id, {
      missao,
      curva: null,
      curvaOriginal: null,
      linha,
      geometryLinha,
      materialLinha,
      marcador,
      materialMarcador,
      rotuloSprite,
      materialRotulo,
      waypoints: pontos,
      waypointDatas,
      posicaoMarcadorAtual: null,
      visivel: false,
      selecionada: false,
      escalaMarcador,
      clampEstrela: null,
      espiralFn,
      tempoDiasLancamento: tLanc,
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

      if (traj.captura) {
        traj.captura.geometry.dispose();
        traj.captura.material.dispose();
        this.scene.remove(traj.captura.linha);
      }
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
    if (traj.captura) traj.captura.linha.visible = bool;
  }

  // Opacidade da linha (e da elipse de captura junto, quando existir)
  _setOpacidadeLinha(traj, valor) {
    traj.materialLinha.opacity = valor;
    if (traj.captura) traj.captura.material.opacity = valor;
  }

  setSelecionada(idMissaoOuNull) {
    // Restaurar opacity de todos visíveis
    if (this._selecionada) {
      const trajAnt = this._trajetorias.get(this._selecionada);
      if (trajAnt && this._visiveis.has(this._selecionada)) {
        this._setOpacidadeLinha(trajAnt, 0.55);
        trajAnt.selecionada = false;
      }
    }

    this._selecionada = idMissaoOuNull;

    if (idMissaoOuNull) {
      const traj = this._trajetorias.get(idMissaoOuNull);
      if (traj) {
        this._setOpacidadeLinha(traj, 0.95);
        traj.selecionada = true;

        // Esmaiar as outras visíveis
        for (const id of this._visiveis) {
          if (id !== idMissaoOuNull) {
            const outraTraj = this._trajetorias.get(id);
            if (outraTraj) {
              this._setOpacidadeLinha(outraTraj, 0.18);
            }
          }
        }
      }
    } else {
      // null: restaurar 0.55 em todas visíveis
      for (const id of this._visiveis) {
        const traj = this._trajetorias.get(id);
        if (traj) {
          this._setOpacidadeLinha(traj, 0.55);
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
    if (traj.espiralFn) return traj.espiralFn(traj.tempoDiasLancamento);
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

  // Empurra o ponto (in-place) para fora da esfera {centro, raio} se estiver
  // dentro dela. Ponto exatamente no centro é caso degenerado: sobe no eixo Y.
  _clampForaDaEsfera(ponto, { centro, raio }) {
    const dir = ponto.clone().sub(centro);
    const dist = dir.length();
    if (dist >= raio) return;
    if (dist < 1e-6) dir.set(0, 1, 0);
    else dir.divideScalar(dist);
    ponto.copy(centro).addScaledVector(dir, raio);
  }

  _atualizarMarcadores(tempoDias) {
    for (const [id, traj] of this._trajetorias.entries()) {
      if (!traj.visivel) continue;

      // Trajetória espiral: posição analítica direta (sem spline)
      if (traj.espiralFn) {
        const pos = traj.espiralFn(tempoDias);
        if (!pos) {
          traj.marcador.visible = false;
          traj.rotuloSprite.visible = false;
          continue;
        }
        traj.marcador.position.copy(pos);
        traj.rotuloSprite.position.copy(pos);
        traj.rotuloSprite.position.y += traj.escalaMarcador + 1.2;
        traj.marcador.visible = true;
        traj.rotuloSprite.visible = true;
        continue;
      }

      // Órbita de captura: a elipse acompanha o planeta; após a inserção o
      // marcador orbita o planeta (e após o fim — Cassini — fica no planeta)
      if (traj.captura) {
        const posPlaneta = this.motor._calcularPosicao(traj.captura.corpoPai, false, tempoDias);
        traj.captura.linha.position.copy(posPlaneta);
        const dentroDaCaptura = tempoDias >= traj.captura.tempoInicio;
        // Disparo único ao ENTRAR na órbita final (não a cada frame dentro
        // dela) — pedido do Fred: a nave costuma ser vista em velocidade alta
        // durante o cruzeiro, mas isso fica ruim de acompanhar já na órbita
        // final. ui.js escuta este evento e baixa a velocidade uma vez; o
        // usuário pode mudar de novo depois sem o evento reimpor nada. Se o
        // tempo voltar pra antes da captura, o flag reseta pra poder disparar
        // de novo numa futura reentrada.
        //
        // Só dispara se a câmera estiver de fato SEGUINDO esta missão
        // (motor._seguirId === id) — visibilidade (traj.visivel, checado no
        // topo do loop) não é a mesma coisa: a trajetória pode estar visível
        // ao fundo enquanto o usuário olha outro astro, e nesse caso o
        // gatilho não deve mexer na velocidade dele.
        if (dentroDaCaptura && !traj.captura.jaEntrouOrbita && this.motor._seguirId === id) {
          traj.captura.jaEntrouOrbita = true;
          document.dispatchEvent(new CustomEvent('sim:orbita-capturada', { detail: { idMissao: id } }));
        } else if (!dentroDaCaptura && traj.captura.jaEntrouOrbita) {
          traj.captura.jaEntrouOrbita = false;
        }
        if (dentroDaCaptura) {
          const pos = posPlaneta.clone();
          // Fator do raio orbital: 0 = centro do planeta (onde o spline de
          // cruzeiro termina), 1 = sobre a elipse. Smoothstep na ENTRADA
          // (inserção em espiral, sem o teleporte de ~8u que existia) e na
          // SAÍDA após tempoFim (mergulho do Grand Finale da Cassini, que
          // tinha o mesmo salto seco de volta ao centro).
          let fator = 1;
          const dtIn = tempoDias - traj.captura.tempoInicio;
          if (dtIn < traj.captura.janelaInsercao) {
            const x = dtIn / traj.captura.janelaInsercao;
            fator = x * x * (3 - 2 * x);
          }
          if (tempoDias > traj.captura.tempoFim) {
            const x2 = Math.min(1, (tempoDias - traj.captura.tempoFim) / 3);
            fator *= 1 - x2 * x2 * (3 - 2 * x2);
          }
          if (fator > 0) {
            pos.addScaledVector(this._posicaoCapturaLocal(traj.captura, tempoDias), fator);
          }
          traj.marcador.position.copy(pos);
          traj.rotuloSprite.position.copy(pos);
          traj.rotuloSprite.position.y += traj.escalaMarcador + 1.2;
          traj.marcador.visible = true;
          traj.rotuloSprite.visible = true;
          continue;
        }
      }

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
        // Extensão interestelar ancorada no tempo real (ver _construirTrajetoria):
        // o marcador percorre a extensão até a data atual + 25% de folga, então
        // hoje ele está sempre em movimento, ~80% do prolongamento
        const durExtensao = traj.durExtensaoDias || Math.max(1, (tempoDiasFim - tempoDiasLancamento) * 0.6);
        const frac = Math.min(1, (tempoDias - tempoDiasFim) / durExtensao);
        const uFim = (temposDias.length - 1) / (nCurva - 1);
        u = uFim + frac * (1 - uFim);
      } else {
        // Missão encerrada: fixa no último waypoint
        u = (temposDias.length - 1) / (nCurva - 1);
      }

      const posicaoMarcador = curva.getPoint(u);
      if (posicaoMarcador) {
        // Nave nunca entra na esfera visual da estrela (Parker "encosta" no Sol)
        if (traj.clampEstrela) this._clampForaDaEsfera(posicaoMarcador, traj.clampEstrela);
        traj.marcador.position.copy(posicaoMarcador);
        traj.rotuloSprite.position.copy(posicaoMarcador);
        traj.rotuloSprite.position.y += traj.escalaMarcador + 1.2;

        traj.marcador.visible = true;
        traj.rotuloSprite.visible = true;
      }
    }
  }
}
