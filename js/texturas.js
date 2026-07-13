/**
 * Gerador de texturas procedurais para o simulador do sistema solar.
 * Todas as texturas são criadas via Canvas 2D, sem imagens externas.
 */

/**
 * Pseudo-aleatório determinístico baseado em string (hash simples).
 */
function seededRandom(seed, index = 0) {
  const s = (seed + index) * 73856093 ^ (seed + index + 1) * 19349663;
  return ((s ^ (s >> 15)) & 0xffffff) / 0xffffff;
}

function hexParaRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function misturarCores(a, b, t) {
  const k = Math.max(0, Math.min(1, t));
  return {
    r: a.r + (b.r - a.r) * k,
    g: a.g + (b.g - a.g) * k,
    b: a.b + (b.b - a.b) * k,
  };
}

/**
 * Ruído Perlin simplificado (interpolação + gradiente).
 */
function perlinNoise(x, y, seed) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const u = fade(xf);
  const v = fade(yf);

  const grad = (ix, iy) => {
    const angle = seededRandom(seed, ix * 73 + iy * 97) * Math.PI * 2;
    return Math.cos(angle) * (xf - (ix & 1)) + Math.sin(angle) * (yf - (iy & 1));
  };

  const g00 = grad(xi, yi);
  const g10 = grad(xi + 1, yi);
  const g01 = grad(xi, yi + 1);
  const g11 = grad(xi + 1, yi + 1);

  const nx0 = g00 * (1 - u) + g10 * u;
  const nx1 = g01 * (1 - u) + g11 * u;
  return nx0 * (1 - v) + nx1 * v;
}

/**
 * Cria canvas com textura de estrela: gradiente radial branco-amarelo com granulação.
 */
function criarTexturaEstrela(canvas, ctx, seed) {
  const w = canvas.width;
  const h = canvas.height;

  // Gradiente radial centrado
  const gradiente = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  gradiente.addColorStop(0, '#ffffff');
  gradiente.addColorStop(0.4, '#ffff99');
  gradiente.addColorStop(0.8, '#ffcc33');
  gradiente.addColorStop(1, '#ff9900');
  ctx.fillStyle = gradiente;
  ctx.fillRect(0, 0, w, h);

  // Adicionar granulação com noise
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const px = (i / 4) % w;
    const py = Math.floor((i / 4) / w);
    const noise = perlinNoise(px / 100, py / 100, seed) * 0.3;
    data[i] = Math.min(255, data[i] + noise * 50);
    data[i + 1] = Math.min(255, data[i + 1] + noise * 40);
    data[i + 2] = Math.min(255, data[i + 2] + noise * 20);
  }
  ctx.putImageData(imgData, 0, 0);
}

/**
 * Cria textura de planeta gasoso com bandas horizontais, manchas e ruído.
 */
function criarTexturaGasoso(canvas, ctx, corpo, seed) {
  const w = canvas.width;
  const h = canvas.height;
  const cores = corpo.aparencia.cores || ['#6666ff', '#5555dd', '#4444cc'];
  const detalhes = corpo.aparencia.detalhes || {};
  const numBandas = detalhes.bandas || 6;

  // Fundo com gradiente suave
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, cores[0]);
  grad.addColorStop(0.5, cores[1]);
  grad.addColorStop(1, cores[2] || cores[0]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Bandas horizontais com ondulação
  for (let band = 0; band < numBandas; band++) {
    const bandH = h / numBandas;
    const bandY = band * bandH;
    const bandColor = cores[band % cores.length];

    ctx.fillStyle = bandColor;
    ctx.globalAlpha = 0.5;

    for (let y = bandY; y < bandY + bandH; y++) {
      const undulacao = Math.sin(y / 40 + band * 0.5) * 3 + perlinNoise(y / 50, band, seed) * 5;
      ctx.fillRect(0, y + undulacao, w, 1);
    }
  }

  ctx.globalAlpha = 1;

  // Mancha vermelha (Júpiter)
  if (detalhes.manchaVermelha) {
    ctx.fillStyle = 'rgba(200, 80, 60, 0.6)';
    const manchaX = w * 0.65;
    const manchaY = h * 0.6;
    const manchaW = w * 0.25;
    const manchaH = h * 0.15;
    ctx.beginPath();
    ctx.ellipse(manchaX, manchaY, manchaW, manchaH, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(150, 50, 40, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Ruído fino para textura
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 30;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 0.8));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.6));
  }
  ctx.putImageData(imgData, 0, 0);
}

/**
 * Cria textura rochosa com manchas e crateras.
 */
function criarTexturaRochosa(canvas, ctx, corpo, seed) {
  const w = canvas.width;
  const h = canvas.height;
  const cores = corpo.aparencia.cores || ['#888888', '#999999', '#aaaaaa'];
  const detalhes = corpo.aparencia.detalhes || {};

  // Cor base
  ctx.fillStyle = cores[0];
  ctx.fillRect(0, 0, w, h);

  // Manchas irregulares com Perlin
  for (let y = 0; y < h; y += 20) {
    for (let x = 0; x < w; x += 20) {
      const noise = perlinNoise(x / 150, y / 150, seed);
      if (noise > 0.3) {
        const cor = cores[1 + Math.floor(noise * (cores.length - 1))];
        ctx.fillStyle = cor;
        ctx.fillRect(x, y, 20, 20);
      }
    }
  }

  // Crateras
  if (detalhes.crateras) {
    const numCrateras = 80;
    for (let i = 0; i < numCrateras; i++) {
      const cx = seededRandom(seed, i * 2) * w;
      const cy = seededRandom(seed, i * 2 + 1) * h;
      const raio = seededRandom(seed, i * 3) * 12 + 2;

      // Sombra escura interior
      ctx.fillStyle = `rgba(50, 50, 50, 0.7)`;
      ctx.beginPath();
      ctx.arc(cx, cy, raio, 0, Math.PI * 2);
      ctx.fill();

      // Borda clara
      ctx.strokeStyle = `rgba(150, 150, 150, 0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Calotas
  if (detalhes.calotas) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(0, 0, w, h * 0.15);
    ctx.fillRect(0, h * 0.85, w, h * 0.15);
  }
}

/**
 * Cria textura terrestre: oceano azul, continentes verdes/marrons, calotas brancas.
 */
function criarTexturaTerra(canvas, ctx, corpo, seed) {
  const w = canvas.width;
  const h = canvas.height;

  // Oceano base
  ctx.fillStyle = '#1a4d7a';
  ctx.fillRect(0, 0, w, h);

  // Continentes (ruído)
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const n = perlinNoise(x / 80, y / 80, seed);

      let r, g, b;
      if (n < 0.3) {
        // Oceano
        r = 26; g = 77; b = 122;
      } else if (n < 0.6) {
        // Terra verde
        r = 50; g = 120; b = 40;
      } else if (n < 0.75) {
        // Terra marrom
        r = 139; g = 90; b = 43;
      } else {
        // Calotas brancas
        r = 240; g = 248; b = 255;
      }

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Nuvens (véu translúcido)
  if (corpo.aparencia.detalhes?.nuvens) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 40; i++) {
      const x = seededRandom(seed, i * 5) * w;
      const y = seededRandom(seed, i * 5 + 1) * h;
      const r = seededRandom(seed, i * 5 + 2) * 30 + 10;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/**
 * Cria textura gelada: gradiente suave com faixas tênues.
 */
function criarTexturaGelada(canvas, ctx, corpo, seed) {
  const w = canvas.width;
  const h = canvas.height;
  const cores = corpo.aparencia.cores || ['#b0e0ff', '#80d0ff', '#5fc0ff'];
  const detalhes = corpo.aparencia.detalhes || {};

  // Gigantes gelados (Urano/Netuno) têm atmosfera, não superfície sólida:
  // poucas bandas largas e suaves, com bordas onduladas orgânicas. A versão
  // anterior desenhava uma linha a cada 3px cobrindo quase toda a esfera —
  // na prática um efeito de "veneziana"/scanline, não bandas de nuvens.
  if (corpo.tipo === 'planeta') {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, cores[0]);
    grad.addColorStop(0.5, cores[1] || cores[0]);
    grad.addColorStop(1, cores[2] || cores[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const numBandas = 7;
    for (let i = 0; i < numBandas; i++) {
      const yBase = (i + 0.5) * (h / numBandas);
      const espessura = (h / numBandas) * (0.4 + seededRandom(seed, i) * 0.25);
      const clara = perlinNoise(i * 3, seed, seed) > 0;
      ctx.fillStyle = clara ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)';

      ctx.beginPath();
      for (let x = 0; x <= w; x += 16) {
        const onda = Math.sin(x / 130 + i * 1.7 + seed) * espessura * 0.18;
        const yy = yBase + onda - espessura / 2;
        x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      for (let x = w; x >= 0; x -= 16) {
        const onda = Math.sin(x / 130 + i * 1.7 + seed) * espessura * 0.18;
        ctx.lineTo(x, yBase + onda + espessura / 2);
      }
      ctx.closePath();
      ctx.fill();
    }
    return;
  }

  // Planetas-anões e luas geladas: superfície sólida com manchas de albedo
  // (regiões claras/escuras, como observado em Plutão, Éris, Caronte reais)
  // e uma grande região bem clara ocasional (tipo Sputnik Planitia). A
  // mistura é proporcional à intensidade do ruído (não uma troca abrupta
  // de cor) para evitar manchas escuras "em blocos" com contraste alto
  // demais — ficava especialmente forte em corpos com tons próximos entre
  // si, como o cinza de Caronte.
  const corBase = hexParaRgb(cores[0]);
  const corClara = hexParaRgb(cores[1] || cores[0]);
  const corEscura = hexParaRgb(cores[2] || cores[1] || cores[0]);

  const bloco = 6;
  for (let y = 0; y < h; y += bloco) {
    for (let x = 0; x < w; x += bloco) {
      const nGrande = perlinNoise(x / 260, y / 260, seed);
      const nPequeno = perlinNoise(x / 90, y / 90, seed + 500);
      const n = nGrande * 0.7 + nPequeno * 0.3;

      let cor;
      if (n > 0.55) {
        cor = { r: 245, g: 240, b: 232 };
      } else if (n >= 0) {
        cor = misturarCores(corBase, corClara, Math.min(1, n / 0.5) * 0.8);
      } else {
        cor = misturarCores(corBase, corEscura, Math.min(1, -n / 0.5) * 0.55);
      }
      ctx.fillStyle = `rgb(${Math.round(cor.r)}, ${Math.round(cor.g)}, ${Math.round(cor.b)})`;
      ctx.fillRect(x, y, bloco, bloco);
    }
  }

  if (detalhes.crateras) {
    const numCrateras = 45;
    for (let i = 0; i < numCrateras; i++) {
      const cx = seededRandom(seed, i * 2) * w;
      const cy = seededRandom(seed, i * 2 + 1) * h;
      const raio = seededRandom(seed, i * 3) * 10 + 2;

      ctx.fillStyle = 'rgba(30, 30, 35, 0.5)';
      ctx.beginPath();
      ctx.arc(cx, cy, raio, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

/**
 * Cria textura de lua rochosa: manchas de albedo com as 3 cores do corpo
 * (mistura proporcional ao ruído, como nos corpos gelados) e crateras em
 * tons DERIVADOS da cor do corpo — a versão antiga usava só um gradiente
 * diagonal de 2 cores, ignorava cores[2], ignorava a flag
 * detalhes.crateras (sempre desenhava 120) e pintava crateras num cinza
 * fixo que destoava de luas coloridas.
 */
function criarTexturaLua(canvas, ctx, corpo, seed) {
  const w = canvas.width;
  const h = canvas.height;
  const cores = corpo.aparencia.cores || ['#cccccc', '#aaaaaa', '#888888'];
  const detalhes = corpo.aparencia.detalhes || {};

  const corBase = hexParaRgb(cores[0]);
  const corClara = hexParaRgb(cores[1] || cores[0]);
  const corEscura = hexParaRgb(cores[2] || cores[1] || cores[0]);

  // Manchas de albedo (terrenos claros/escuros, como maria e terrae lunares)
  const bloco = 5;
  for (let y = 0; y < h; y += bloco) {
    for (let x = 0; x < w; x += bloco) {
      const nGrande = perlinNoise(x / 220, y / 220, seed);
      const nPequeno = perlinNoise(x / 70, y / 70, seed + 300);
      const n = nGrande * 0.65 + nPequeno * 0.35;

      let cor;
      if (n >= 0) {
        cor = misturarCores(corBase, corClara, Math.min(1, n / 0.5) * 0.85);
      } else {
        cor = misturarCores(corBase, corEscura, Math.min(1, -n / 0.5) * 0.7);
      }
      ctx.fillStyle = `rgb(${Math.round(cor.r)}, ${Math.round(cor.g)}, ${Math.round(cor.b)})`;
      ctx.fillRect(x, y, bloco, bloco);
    }
  }

  // Crateras apenas quando os dados pedem — em tons relativos ao corpo
  if (detalhes.crateras) {
    const sombra = misturarCores(corEscura, { r: 0, g: 0, b: 0 }, 0.45);
    const borda = misturarCores(corClara, { r: 255, g: 255, b: 255 }, 0.35);
    const numCrateras = 90;
    for (let i = 0; i < numCrateras; i++) {
      const cx = seededRandom(seed, i * 2) * w;
      const cy = seededRandom(seed, i * 2 + 1) * h;
      const raio = seededRandom(seed, i * 3) * 9 + 1.5;

      ctx.fillStyle = `rgba(${Math.round(sombra.r)}, ${Math.round(sombra.g)}, ${Math.round(sombra.b)}, 0.55)`;
      ctx.beginPath();
      ctx.arc(cx, cy, raio, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(${Math.round(borda.r)}, ${Math.round(borda.g)}, ${Math.round(borda.b)}, 0.4)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

/**
 * Io: superfície vulcânica ativa — mosaico de enxofre (amarelos/laranjas)
 * com caldeiras escuras de centro incandescente. Sem crateras de impacto:
 * o vulcanismo constante as apaga.
 */
function criarTexturaVulcanica(canvas, ctx, corpo, seed) {
  const w = canvas.width;
  const h = canvas.height;
  const cores = corpo.aparencia.cores || ['#e8d060', '#ff8c00', '#5a3a1a'];
  const corBase = hexParaRgb(cores[0]);
  const corQuente = hexParaRgb(cores[1] || cores[0]);
  const corEscura = hexParaRgb(cores[2] || cores[1] || cores[0]);

  // Planícies de enxofre em tons manchados
  const bloco = 5;
  for (let y = 0; y < h; y += bloco) {
    for (let x = 0; x < w; x += bloco) {
      const n = perlinNoise(x / 130, y / 130, seed) * 0.6 + perlinNoise(x / 45, y / 45, seed + 200) * 0.4;
      let cor;
      if (n > 0.15) {
        cor = misturarCores(corBase, { r: 250, g: 245, b: 220 }, Math.min(1, n) * 0.5);
      } else if (n < -0.15) {
        cor = misturarCores(corBase, corQuente, Math.min(1, -n) * 0.8);
      } else {
        cor = corBase;
      }
      ctx.fillStyle = `rgb(${Math.round(cor.r)}, ${Math.round(cor.g)}, ${Math.round(cor.b)})`;
      ctx.fillRect(x, y, bloco, bloco);
    }
  }

  // Caldeiras vulcânicas: anel escuro com "lava" no centro
  const numVulcoes = 22;
  for (let i = 0; i < numVulcoes; i++) {
    const cx = seededRandom(seed, i * 4) * w;
    const cy = seededRandom(seed, i * 4 + 1) * h;
    const raio = seededRandom(seed, i * 4 + 2) * 16 + 5;

    ctx.fillStyle = `rgba(${corEscura.r}, ${corEscura.g}, ${corEscura.b}, 0.75)`;
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.fill();

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, raio * 0.5);
    grad.addColorStop(0, 'rgba(255, 90, 30, 0.9)');
    grad.addColorStop(1, 'rgba(255, 90, 30, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, raio * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Titã: atmosfera de névoa alaranjada opaca — nada da superfície é
 * visível, só um véu suave com leve gradiente e faixas tênues (como nas
 * fotos reais da Voyager/Cassini). Sem crateras nem manchas duras.
 */
function criarTexturaNevoa(canvas, ctx, corpo, seed) {
  const w = canvas.width;
  const h = canvas.height;
  const cores = corpo.aparencia.cores || ['#f5a460', '#e0955a', '#c88448'];

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, cores[2] || cores[0]); // polo norte um pouco mais escuro
  grad.addColorStop(0.35, cores[0]);
  grad.addColorStop(0.65, cores[0]);
  grad.addColorStop(1, cores[1] || cores[0]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Variações muito suaves de névoa em escala grande
  const bloco = 8;
  for (let y = 0; y < h; y += bloco) {
    for (let x = 0; x < w; x += bloco) {
      const n = perlinNoise(x / 300, y / 180, seed);
      if (Math.abs(n) < 0.2) continue;
      ctx.fillStyle = n > 0 ? 'rgba(255, 240, 220, 0.045)' : 'rgba(120, 70, 30, 0.045)';
      ctx.fillRect(x, y, bloco, bloco);
    }
  }
}

/**
 * Cria textura de núcleo de cometa: rocha escura com manchas de gelo/geada
 * e crateras — usa as cores definidas em dados.js (antes eram ignoradas
 * e o núcleo saía sempre cinza uniforme, independente do corpo).
 */
function criarTexturaCometa(canvas, ctx, corpo, seed) {
  const w = canvas.width;
  const h = canvas.height;
  const cores = corpo.aparencia.cores || ['#8b7355', '#a0907d', '#e8d8d0'];

  ctx.fillStyle = cores[0];
  ctx.fillRect(0, 0, w, h);

  const bloco = 4;
  for (let y = 0; y < h; y += bloco) {
    for (let x = 0; x < w; x += bloco) {
      const n = perlinNoise(x / 70, y / 70, seed);
      if (n > 0.25) {
        ctx.fillStyle = cores[2] || cores[0]; // geada/gelo exposto
      } else if (n < -0.2) {
        ctx.fillStyle = cores[1] || cores[0]; // rocha mais escura
      } else {
        continue;
      }
      ctx.fillRect(x, y, bloco, bloco);
    }
  }

  const numCrateras = 25;
  for (let i = 0; i < numCrateras; i++) {
    const cx = seededRandom(seed, i * 2) * w;
    const cy = seededRandom(seed, i * 2 + 1) * h;
    const raio = seededRandom(seed, i * 3) * 14 + 3;

    ctx.fillStyle = 'rgba(15, 12, 10, 0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Cria textura radial para anéis (faixas concêntricas com densidade
 * variável e uma "divisão" tipo Cassini).
 *
 * O RingGeometry do Three.js mapeia UV pela posição do vértice dentro da
 * caixa delimitadora do anel (que tem lado 2×raioExterno) — então um
 * vértice na borda interna (raioInterno) cai, em espaço de textura, na
 * fração raioInterno/raioExterno do raio. A versão antiga usava um corte
 * fixo de 30% independente disso: para anéis finos em relação ao raio
 * externo (Urano: interno/externo ≈ 0,83) isso escondia quase todo o
 * padrão de faixas fora da parte realmente visível do anel, sobrando só
 * uma fatia mínima — por isso o anel de Urano parecia quase liso.
 */
export function criarTexturaAneis(raioInterno, raioExterno, cores, seed = 0) {
  const w = 512;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  const cx = w / 2;
  const cy = h / 2;
  const rMax = Math.min(w, h) / 2;
  const fracInterno = raioInterno / raioExterno;

  const cor1 = hexParaRgb(cores[0]);
  const cor2 = hexParaRgb(cores[1] || cores[0]);
  const cor3 = hexParaRgb(cores[2] || cores[1] || cores[0]);
  const posDivisao = 0.4 + seededRandom(seed, 900) * 0.2;
  const numFaixas = 26;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const r = Math.sqrt(dx * dx + dy * dy) / rMax;
      const idx = (y * w + x) * 4;

      if (r < fracInterno || r > 1) {
        data[idx + 3] = 0;
        continue;
      }

      const frac = (r - fracInterno) / (1 - fracInterno);
      const ruido = perlinNoise(frac * 30 + seed, seededRandom(seed, 1) * 50, seed);

      const faixaIdx = Math.floor(frac * numFaixas);
      const tomFaixa = (faixaIdx % 3) / 2; // 0, 0.5, 1 alternando 3 tons

      let cor = misturarCores(cor1, cor2, tomFaixa);
      cor = misturarCores(cor, cor3, Math.max(0, ruido) * 0.35);

      // Densidade (alfa) varia por faixa e ruído — mais "poeira translúcida"
      // que faixas opacas uniformes
      let alfa = 0.55 + tomFaixa * 0.25 + ruido * 0.15;

      // Divisão tipo Cassini: faixa estreita bem mais transparente
      if (Math.abs(frac - posDivisao) < 0.02) {
        alfa *= 0.12;
      }
      alfa = Math.max(0, Math.min(1, alfa));

      data[idx] = cor.r;
      data[idx + 1] = cor.g;
      data[idx + 2] = cor.b;
      data[idx + 3] = Math.round(alfa * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

/**
 * Função pública principal: cria textura Canvas para um corpo.
 * @param {Object} corpo - Objeto com {aparencia, id, etc}
 * @returns {HTMLCanvasElement} Canvas 1024x512
 */
export function criarTexturaCanvas(corpo) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const tipo = corpo.aparencia?.tipo || 'rochoso';
  const seed = corpo.id ? corpo.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : 0;

  switch (tipo) {
    case 'estrela':
      criarTexturaEstrela(canvas, ctx, seed);
      break;
    case 'gasoso':
      criarTexturaGasoso(canvas, ctx, corpo, seed);
      break;
    case 'rochoso':
      criarTexturaRochosa(canvas, ctx, corpo, seed);
      break;
    case 'terra':
      criarTexturaTerra(canvas, ctx, corpo, seed);
      break;
    case 'gelado':
      criarTexturaGelada(canvas, ctx, corpo, seed);
      break;
    case 'lua':
      criarTexturaLua(canvas, ctx, corpo, seed);
      break;
    case 'vulcanico':
      criarTexturaVulcanica(canvas, ctx, corpo, seed);
      break;
    case 'nevoa':
      criarTexturaNevoa(canvas, ctx, corpo, seed);
      break;
    case 'cometa':
      criarTexturaCometa(canvas, ctx, corpo, seed);
      break;
    case 'cinturao':
      // Cinturões usam anel de partículas, não textura esférica
      criarTexturaRochosa(canvas, ctx, corpo, seed);
      break;
    default:
      ctx.fillStyle = '#999999';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  return canvas;
}
