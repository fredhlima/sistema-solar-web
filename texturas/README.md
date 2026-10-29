# Cobertura de superfícies

Os 41 corpos sólidos do catálogo têm mapa JPEG local no `manifest.json`.
Hubble/JWST usam modelos com materiais próprios; os dois cinturões são
partículas, portanto não recebem um mapa esférico.

## Novos mapas (07/10/2026)

15 mapas equiretangulares 1024 × 512, originais e procedurais: Titânia,
Miranda, Ariel, Umbriel, Oberon, Tritão, Caronte, Vesta, Palas, Eros, Bennu,
Apófis, Halley, Hale-Bopp e 67P. São **representações artísticas didáticas**,
não mosaicos de fotografias nem reconstruções topográficas medidas. Feições
e cores evocam observações; sua posição e escala são ilustrativas. Áreas
desconhecidas não são apresentadas como cartografia real.

O gerador `js/superficies.js` amostra ruído, crateras, rochas e fraturas na
esfera 3D, evitando emendas de longitude e descontinuidades nos polos.
Esse mesmo gerador funciona como fallback offline se o JPEG não carregar.
Exportação reproduzível: servir a raiz e executar
`node scripts/gerar-superficies.mjs`, com Chromium/Playwright disponíveis.
Os 15 JPEGs acrescentam aproximadamente 1,6 MB ao bundle.

| Corpos | Tratamento visual |
| --- | --- |
| Titânia, Oberon | Gelo/rocha em cinza, crateras e fraturas |
| Miranda | Terrenos em faixas e regiões de relevo caótico |
| Ariel | Superfície clara com vales e crateras menos numerosos |
| Umbriel | Terreno escuro craterizado e anel claro ilustrativo |
| Tritão | Tons suaves, calota e terreno celular, sem crateras artificiais abundantes |
| Caronte | Gelo cinza, fraturas e depósito avermelhado no polo norte |
| Vesta, Palas | Regolito craterizado; bacia sul em Vesta |
| Eros, Apófis | Rocha irregular com crateras e blocos |
| Bennu | Regolito carbonáceo escuro, abundância de pedregulhos |
| Cometas | Núcleos escuros, depressões, blocos e pequenas áreas claras |

## Formatos

Nove perfis em `PERFIS_FORMA`: Fobos, Deimos, Vesta, Palas, Eros, Bennu,
Apófis, Haumea e 67P. Elipsoides com relevo orgânico, pião com saliência
equatorial em Bennu, pescoço e lóbulos de tamanhos diferentes em 67P.
Apófis tem uma cintura ilustrativa, seguindo a possibilidade sugerida por
radar, não uma forma definitivamente medida por sonda.
Halley e Hale-Bopp mantêm a deformação de núcleo e as caudas já existentes.
Luas grandes e planetas conservam seu formato arredondado. Não se mudam
raios astronômicos, órbitas, períodos ou colisões por causa do visual.
Os eixos elipsoidais são normalizados por seu produto; relevo e pescoços
são estilizados, não uma solução de volume físico exato.

## Referências de aparência e forma

- [NASA — luas de Urano](https://science.nasa.gov/uranus/moons/)
- [NASA — Miranda](https://science.nasa.gov/uranus/moons/miranda/)
- [NASA — Caronte, polo vermelho](https://science.nasa.gov/blogs/new-horizons/2015/09/09/new-horizons-probes-the-mystery-of-charons-red-pole/)
- [USGS — atlas de luas geladas](https://pubs.usgs.gov/imap/2596/plate-2.pdf)
- [NASA — Vesta](https://science.nasa.gov/mission/dawn/science/vesta/)
- [NASA — cores de Eros](https://science.nasa.gov/resource/the-subtle-colors-of-eros/)
- [NASA — Bennu](https://science.nasa.gov/solar-system/asteroids/101955-bennu/facts/)
- [NASA — Apófis](https://science.nasa.gov/solar-system/asteroids/apophis-facts/)
- [NASA — Haumea](https://science.nasa.gov/dwarf-planets/haumea/)
- [ESA — lóbulos de 67P](https://www.esa.int/content/view/full/447802)
- Halley: parâmetros da representação já documentados em `SPEC-cometas.md`.
  Hale-Bopp: núcleo não resolvido em mapa fotográfico; acabamento ilustrativo.

Nenhuma imagem das referências foi copiada para gerar estes novos mapas.
Eles seguem a licença do projeto. Os 26 mapas anteriores mantêm suas origens:
Solar System Scope (CC BY 4.0), NASA/JPL/USGS e composições de Wikimedia
Commons/Askaniy Anpilogov (CC BY-SA 3.0/4.0), conforme o histórico Git.
`js/creditos-texturas.js` registra a atribuição por corpo, exibida no rodapé
da ficha nos três idiomas. Não se atribuem as ilustrações novas à NASA.
O catálogo Solar System Scope também classifica os mapas de Ceres, Éris,
Haumea e Makemake como **Fictional**; estes quatro recebem aviso artístico
com atribuição ao Solar System Scope. Os demais mapas dessa coleção são
baseados em dados NASA, com ajustes de cores e possíveis áreas completadas.
