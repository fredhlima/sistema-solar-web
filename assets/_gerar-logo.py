"""Gera assets/logo.svg (fonte vetorial) e assets/logo.png a partir das MESMAS
constantes de geometria — um arquivo só, dois formatos, sem risco de os dois
saírem diferentes.

Por que Python e não Node como o _gerar-fontes.mjs: aquele depende de `sharp`,
que não está instalado. Aqui só precisa de PIL + numpy. Rode com:

    python assets/_gerar-logo.py

Contexto (03/08/2026): o logo.png anterior veio pronto do Gemini (commit
af7dfd2), sem fonte vetorial, e tinha os DOIS planetas na órbita interna com a
externa vazia. Pedido do Fred: azul na órbita de dentro, vermelho na de fora.
Órbitas são círculos concêntricos de propósito — com elipse rotacionada fica
ambíguo em qual anel cada planeta está, que é exatamente o defeito antigo.
"""

import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

# ---------------------------------------------------------------- geometria
LADO = 1024                  # espaço de coordenadas (igual ao icon-foreground.svg)
SUPER = 4                    # supersampling para antialias no PNG
SAIDA_PX = 256               # logo.png final (tamanho do arquivo antigo)

CX = CY = LADO / 2
RAIO_SOL = 170
RAIO_ORBITA_INTERNA = 300
RAIO_ORBITA_EXTERNA = 415
LARGURA_ORBITA = 13

# planetas: (raio, ângulo em graus, raio da órbita em que ele VIVE, cor, opacidade do anel)
PLANETA_AZUL = dict(raio=40, angulo=212, orbita=RAIO_ORBITA_INTERNA, cor=(74, 134, 208))
PLANETA_VERMELHO = dict(raio=46, angulo=42, orbita=RAIO_ORBITA_EXTERNA, cor=(221, 90, 78))

COR_ORBITA = (92, 200, 255)  # #5cc8ff, o azul de acento do app
FUNDO_CENTRO = (13, 21, 38)  # #0d1526
FUNDO_BORDA = (4, 6, 14)     # #04060e


def pos(planeta):
    """Ponto EXATO sobre a circunferência da órbita do planeta."""
    a = math.radians(planeta["angulo"])
    return (CX + planeta["orbita"] * math.cos(a), CY - planeta["orbita"] * math.sin(a))


# ---------------------------------------------------------------- SVG
def gerar_svg(caminho):
    ax, ay = pos(PLANETA_AZUL)
    vx, vy = pos(PLANETA_VERMELHO)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {LADO} {LADO}">
  <defs>
    <radialGradient id="fundo" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#0d1526"/>
      <stop offset="100%" stop-color="#04060e"/>
    </radialGradient>
    <radialGradient id="sol" cx="42%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#fff3d6"/>
      <stop offset="45%" stop-color="#ffc978"/>
      <stop offset="100%" stop-color="#ff9c3d"/>
    </radialGradient>
    <radialGradient id="brilho" cx="50%" cy="50%" r="50%">
      <stop offset="55%" stop-color="#ffb454" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ffb454" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="azul" cx="35%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#7fb4ea"/>
      <stop offset="100%" stop-color="#3a6cab"/>
    </radialGradient>
    <radialGradient id="vermelho" cx="35%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#f08276"/>
      <stop offset="100%" stop-color="#c4433a"/>
    </radialGradient>
  </defs>
  <rect width="{LADO}" height="{LADO}" fill="url(#fundo)"/>
  <circle cx="{CX:.0f}" cy="{CY:.0f}" r="{RAIO_SOL * 2.1:.0f}" fill="url(#brilho)"/>
  <!-- órbitas: círculos concêntricos, para não restar dúvida de qual planeta
       está em qual anel (o logo antigo tinha os dois no anel de dentro) -->
  <circle cx="{CX:.0f}" cy="{CY:.0f}" r="{RAIO_ORBITA_INTERNA}" fill="none"
          stroke="#5cc8ff" stroke-opacity="0.9" stroke-width="{LARGURA_ORBITA}"/>
  <circle cx="{CX:.0f}" cy="{CY:.0f}" r="{RAIO_ORBITA_EXTERNA}" fill="none"
          stroke="#5cc8ff" stroke-opacity="0.6" stroke-width="{LARGURA_ORBITA}"/>
  <circle cx="{CX:.0f}" cy="{CY:.0f}" r="{RAIO_SOL}" fill="url(#sol)"/>
  <!-- azul na órbita INTERNA -->
  <circle cx="{ax:.1f}" cy="{ay:.1f}" r="{PLANETA_AZUL['raio']}" fill="url(#azul)"/>
  <!-- vermelho na órbita EXTERNA -->
  <circle cx="{vx:.1f}" cy="{vy:.1f}" r="{PLANETA_VERMELHO['raio']}" fill="url(#vermelho)"/>
</svg>
"""
    with open(caminho, "w", encoding="utf-8") as f:
        f.write(svg)


# ---------------------------------------------------------------- PNG
def gradiente_radial(tam, centro, raio, cor_dentro, cor_fora):
    """Array RGB tam×tam com gradiente radial."""
    ys, xs = np.mgrid[0:tam, 0:tam]
    d = np.sqrt((xs - centro[0]) ** 2 + (ys - centro[1]) ** 2) / raio
    t = np.clip(d, 0, 1)[..., None]
    return (np.array(cor_dentro) * (1 - t) + np.array(cor_fora) * t).astype(np.uint8)


def disco_alpha(tam, centro, raio):
    """Máscara alpha (0..255) de um disco, com borda suave de ~1px."""
    ys, xs = np.mgrid[0:tam, 0:tam]
    d = np.sqrt((xs - centro[0]) ** 2 + (ys - centro[1]) ** 2)
    return (np.clip(raio - d, 0, 1) * 255).astype(np.uint8)


def gerar_png(caminho):
    T = LADO * SUPER
    e = SUPER  # fator de escala das coordenadas

    base = Image.fromarray(gradiente_radial(T, (T / 2, T * 0.45), T * 0.75,
                                            FUNDO_CENTRO, FUNDO_BORDA), "RGB")

    # brilho do sol: disco laranja borrado
    # glow contido: raio e intensidade baixos de propósito — com halo largo o
    # laranja mistura com o fundo e vira um anel marrom lamacento
    brilho = Image.new("L", (T, T), 0)
    ImageDraw.Draw(brilho).ellipse(
        [CX * e - RAIO_SOL * 1.18 * e, CY * e - RAIO_SOL * 1.18 * e,
         CX * e + RAIO_SOL * 1.18 * e, CY * e + RAIO_SOL * 1.18 * e], fill=95)
    brilho = brilho.filter(ImageFilter.GaussianBlur(RAIO_SOL * 0.30 * e))
    base = Image.composite(Image.new("RGB", (T, T), (255, 180, 84)), base, brilho)

    d = ImageDraw.Draw(base)

    def orbita(raio, opacidade):
        camada = Image.new("RGB", (T, T), tuple(int(c * opacidade) for c in COR_ORBITA))
        mascara = Image.new("L", (T, T), 0)
        ImageDraw.Draw(mascara).ellipse(
            [(CX - raio) * e, (CY - raio) * e, (CX + raio) * e, (CY + raio) * e],
            outline=int(255 * opacidade), width=int(LARGURA_ORBITA * e))
        return Image.composite(camada, base, mascara)

    base = orbita(RAIO_ORBITA_INTERNA, 0.90)
    base = orbita(RAIO_ORBITA_EXTERNA, 0.60)

    # sol
    sol = gradiente_radial(T, (CX * e - RAIO_SOL * 0.28 * e, CY * e - RAIO_SOL * 0.34 * e),
                           RAIO_SOL * 1.28 * e, (255, 223, 160), (255, 148, 52))
    base = Image.composite(Image.fromarray(sol, "RGB"), base,
                           Image.fromarray(disco_alpha(T, (CX * e, CY * e), RAIO_SOL * e), "L"))

    # planetas, cada um na SUA órbita
    for p, claro in ((PLANETA_AZUL, (127, 180, 234)), (PLANETA_VERMELHO, (240, 130, 118))):
        px, py = pos(p)
        r = p["raio"] * e
        corpo = gradiente_radial(T, (px * e - r * 0.3, py * e - r * 0.35), r * 1.6, claro, p["cor"])
        base = Image.composite(Image.fromarray(corpo, "RGB"), base,
                               Image.fromarray(disco_alpha(T, (px * e, py * e), r), "L"))

    base.resize((SAIDA_PX, SAIDA_PX), Image.LANCZOS).save(caminho)


if __name__ == "__main__":
    import os
    dir_assets = os.path.dirname(os.path.abspath(__file__))
    gerar_svg(os.path.join(dir_assets, "logo.svg"))
    gerar_png(os.path.join(dir_assets, "logo.png"))
    ax, ay = pos(PLANETA_AZUL)
    vx, vy = pos(PLANETA_VERMELHO)
    print(f"logo.svg + logo.png gerados ({SAIDA_PX}x{SAIDA_PX})")
    print(f"  azul     r={RAIO_ORBITA_INTERNA} (interna)  em ({ax:.1f}, {ay:.1f})")
    print(f"  vermelho r={RAIO_ORBITA_EXTERNA} (externa)  em ({vx:.1f}, {vy:.1f})")
