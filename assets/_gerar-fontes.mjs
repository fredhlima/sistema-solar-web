// Gera os PNGs-fonte que o @capacitor/assets precisa para produzir todos
// os ícones/splash de todas as densidades Android automaticamente.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const svgForeground = readFileSync(join(dir, 'icon-foreground.svg'));

// icon-foreground.png: o desenho, com respiro (safe zone do ícone adaptativo)
await sharp(svgForeground).resize(1024, 1024).png().toFile(join(dir, 'icon-foreground.png'));

// icon-background.png: fundo sólido no tom escuro do app
await sharp({
  create: { width: 1024, height: 1024, channels: 4, background: '#04060e' },
})
  .png()
  .toFile(join(dir, 'icon-background.png'));

// icon.png: versão combinada (ícone legado/Play Store, sem transparência)
await sharp({ create: { width: 1024, height: 1024, channels: 4, background: '#04060e' } })
  .composite([{ input: join(dir, 'icon-foreground.png') }])
  .png()
  .toFile(join(dir, 'icon.png'));

// splash.png: tela de abertura — fundo escuro liso (o app já tem sua própria
// animação de estrelas; splash minimalista evita "flash" de conteúdo)
await sharp({ create: { width: 2732, height: 2732, channels: 4, background: '#04060e' } })
  .composite([
    {
      input: await sharp(svgForeground).resize(560, 560).png().toBuffer(),
      gravity: 'center',
    },
  ])
  .png()
  .toFile(join(dir, 'splash.png'));

console.log('fontes geradas: icon.png, icon-foreground.png, icon-background.png, splash.png');
