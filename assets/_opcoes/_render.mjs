import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const nomes = ['a-orbitas', 'b-eclipse', 'c-sol', 'd-cometa', 'e-horizonte', 'f-halo'];

for (const nome of nomes) {
  const svg = readFileSync(join(dir, `${nome}.svg`));
  await sharp(svg).resize(512, 512).png().toFile(join(dir, `${nome}.png`));
}
console.log('renderizado:', nomes.join(', '));
