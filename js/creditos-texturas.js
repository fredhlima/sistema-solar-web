// Proveniência dos arquivos, conferida contra o histórico Git e o catálogo SSS.
// Nunca chamar uma composição/mapa ilustrativo de fotografia original.
export const CREDITOS_TEXTURAS = {};
for (const id of ['titania', 'miranda', 'ariel', 'umbriel', 'oberon', 'tritao', 'caronte',
  'vesta', 'palas', 'eros', 'bennu', 'apofis', 'halley', 'hale-bopp', '67p']) {
  CREDITOS_TEXTURAS[id] = { chave: 'texturaArteApp', fonte: 'Sistema Solar' };
}
for (const id of ['sol', 'mercurio', 'venus', 'terra', 'lua', 'marte', 'jupiter', 'saturno', 'urano', 'netuno']) {
  CREDITOS_TEXTURAS[id] = { chave: 'texturaFonte', fonte: 'Solar System Scope · NASA · CC BY 4.0' };
}
// O próprio Solar System Scope lista estes quatro mapas como "Fictional".
for (const id of ['ceres', 'eris', 'haumea', 'makemake']) {
  CREDITOS_TEXTURAS[id] = { chave: 'texturaArteFonte', fonte: 'Solar System Scope · CC BY 4.0' };
}
for (const id of ['ganimedes', 'calisto', 'fobos', 'deimos']) {
  CREDITOS_TEXTURAS[id] = { chave: 'texturaFonte', fonte: 'Askaniy Anpilogov · NASA/JPL/USGS/Björn Jónsson · Wikimedia Commons · CC BY-SA 3.0' };
}
for (const [id, fonte] of Object.entries({
  tita: 'NASA/JPL-Caltech/Space Science Institute · Cassini (PIA19658)',
  io: 'NASA/JPL/USGS · Galileo/Voyager (PIA09257)',
  europa: 'NASA/JPL/USGS · Voyager/Galileo',
  mimas: 'NASA/JPL/Space Science Institute · Cassini/Voyager (PIA12780)',
  reia: 'NASA/JPL-Caltech/Space Science Institute · Cassini (PIA18438)',
  encelado: 'NASA/JPL-Caltech/Space Science Institute · Cassini (PIA18435)',
  japeto: 'NASA/JPL-Caltech/Space Science Institute · Cassini (PIA18436)',
  plutao: 'NASA/JHUAPL/SwRI · New Horizons · composição Wikimedia Commons (CC BY-SA 4.0)',
})) CREDITOS_TEXTURAS[id] = { chave: 'texturaFonte', fonte };
