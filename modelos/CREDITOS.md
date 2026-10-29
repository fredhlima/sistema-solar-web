## Cenários de missões — 11/10/2026

Céu/nuvens, terreno lunar/marciano, água, paraquedas e dispositivos de flutuação: criações artísticas procedurais do projeto, sem fotografia original do local de pouso. Modelos NASA originais e mapas planetários existentes preservados. [Escopo, referências NASA e limitações](../CENARIOS-MISSOES-GUIADAS.md). Não representa voo físico ou mecanismo de engenharia.

# Créditos e licenciamento dos modelos 3D da frota

Todos os modelos abaixo vêm do acervo público **NASA 3D Resources**
(<https://github.com/nasa/NASA-3D-Resources> / <https://science.nasa.gov/3d-resources/>).

## Situação legal

Conteúdo produzido pela NASA **não está sujeito a direito autoral nos Estados
Unidos** (obra de governo federal). O próprio repositório declara que os assets
são *"free and without copyright"*. Não é necessária licença, pagamento nem
autorização prévia para uso — inclusive comercial.

**Porém, três regras que NÃO são direito autoral continuam valendo:**

1. **A insígnia da NASA (o "meatball" circular) e o logotipo "worm" NÃO são de
   domínio público** — são protegidos por lei específica (14 CFR 1221). Eles
   aparecem pintados nas texturas dos modelos, o que é uso legítimo enquanto
   fizer parte da representação fiel do veículo. **Não podem** ser usados na
   identidade do app: ícone, splash, banner da Play Store ou material de
   marketing.
2. **Proibido sugerir endosso.** A NASA não endossa produtos comerciais. Como
   este app é freemium, a tela de créditos precisa trazer o aviso de
   não-afiliação (ver `AVISO` abaixo).
3. **Conteúdo de terceiros** dentro do acervo da NASA é marcado caso a caso.
   Todos os modelos usados aqui são de autoria NASA — nenhum tem marcação de
   terceiro.

## AVISO (texto obrigatório na tela de créditos, nos 3 idiomas)

> Modelos 3D cortesia da NASA (domínio público). Este aplicativo não é
> afiliado à NASA nem endossado por ela.

## Inventário

| Arquivo | Modelo original (NASA 3D Resources) | Autoria |
|---|---|---|
| `saturno-v.glb` | Saturn V | NASA / Michael D. Carbajal |
| `onibus-espacial.glb` | Space Shuttle (D) | NASA |
| `voyager.glb` | Voyager Probe (B) | NASA |
| `cassini.glb` | Cassini-Huygens (A) | NASA |
| `parker.glb` | Parker Solar Probe | NASA |
| `juno.glb` | Juno (A) | NASA |
| `rosetta.glb` | Rosetta | NASA |
| `perseverance.glb` | Mars 2020 Perseverance Rover | NASA |
| `ingenuity.glb` | Ingenuity Mars Helicopter | NASA |
| `modulo-lunar.glb` | Apollo Lunar Module | NASA / Michael D. Carbajal |
| `hubble.glb` | Hubble Space Telescope (A) | NASA |
| `jwst.glb` | James Webb Space Telescope (B) | NASA |

## Fontes que este projeto NÃO deve usar

**TurboSquid, CGTrader, Sketchfab pago e similares.** As licenças royalty-free
desses mercados proíbem redistribuir o arquivo do modelo em si. Como este app
serve os `.glb` por HTTP, qualquer visitante baixa o arquivo original com dois
cliques no DevTools — o que configuraria violação de licença por construção.
Só entram aqui assets de **domínio público** ou **CC0/CC-BY**.

Fonte alternativa aprovada, se precisar ampliar a frota:
**Smithsonian Open Access** (<https://3d.si.edu>) — scans de museu em CC0.

## Escolha de variante importa mais que tamanho de arquivo

O acervo publica várias versões do mesmo veículo — (A), (B), (C), (D) — e a
primeira seleção priorizou arquivos pequenos. Foi um erro: o **Space Shuttle
(A)** tinha 1,19 MB e **zero textura**, aparecendo como plástico chapado. O
**(D)** tem 2,36 MB, **22 texturas** e, de quebra, **19 mil triângulos contra
213 mil** — mais bonito e onze vezes mais leve de renderizar.

Ao avaliar uma variante, meça texturas e triângulos, não só bytes. A variante atual **Juno (A)** tem 14 texturas e aproximadamente 8,6 MB.

## Nota técnica

11 dos 12 arquivos exigem `KHR_draco_mesh_compression` e a maioria usa
`EXT_texture_webp`. Por isso o projeto carrega `DRACOLoader` com os
decodificadores locais em `lib/draco/` — **nunca** apontar
`setDecoderPath()` para um CDN: quebraria o funcionamento offline no Android.

## Experiência iOS atual

A interface e os construtores do Hangar foram adaptados do Sistema Solar Web de Fred Lima, revisão 479801bf… . Saturno V e Discovery preservam a exploração por peças dessa versão. O Saturno V combina geometria NASA adaptada com pintura e detalhes artísticos do app; o módulo lunar foi atualizado com o GLB NASA/Michael D. Carbajal. O ônibus mantém o orbitador NASA e os mecanismos de portas, Canadarm e Hubble da experiência original.

Os 12 GLBs do inventário estão no pacote. Dez têm prévia individual; exploração interna adicional será implementada incrementalmente. Os rodapés distinguem os créditos dos modelos originais e dos complementos artísticos.

## Módulo Lunar e Hubble — conjuntos didáticos (08/10/2026)

Os GLBs originais permanecem intactos. O Hangar agrupa suas malhas para selecionar, isolar e afastar conjuntos exteriores: cinco no Módulo Lunar (NASA / Michael D. Carbajal) e seis no Hubble (NASA). Geometria, UVs e materiais oficiais preservados; nenhuma reconstrução fictícia dos interiores. A explosão facilita a leitura e não simula a sequência de voo/manutenção. O Hubble é uma configuração histórica; o conjunto identificado como WFC na malha não é anunciado como uma representação da WFC3 atual. Fontes e ressalvas nas fichas e em Controles → Fontes visuais e licenças.

## Perseverance — chegada didática (11/10/2026)

O [rover original NASA](https://science.nasa.gov/3d-resources/mars-2020-perseverance-rover/) mantém suas malhas, materiais e texturas; o arquivo GLB não foi alterado. Cruzeiro, cobertura traseira, escudo térmico, paraquedas e estágio de descida são criações artísticas do aplicativo, inspiradas nas [referências NASA/JPL](https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/mission/spacecraft/getting_to_mars/). Os cabos e movimentos ilustram a sequência, sem simular voo físico, escala ou duração real. A distinção aparece nos rodapés do roteiro e das fichas. Detalhes em [PERSEVERANCE-POUSO-GUIADO.md](../PERSEVERANCE-POUSO-GUIADO.md).

## Ingenuity — conjuntos e primeiro voo (11/10/2026)

Geometria, materiais e texturas: [NASA/Brian E. Kumanchik](https://science.nasa.gov/3d-resources/ingenuity-mars-helicopter/). GLB original intacto, agrupado em corpo/eletrônica, pernas, rotor inferior, rotor superior e painel solar/antena. A ilustração reutiliza o rover NASA como contexto. Suporte de entrega e articulações/movimentos são criações artísticas e didáticas do aplicativo, sem reconstruir todos os mecanismos nem simular física/escala/tempo reais. Rodapés distinguem esses complementos das malhas oficiais. Ver [INGENUITY-VOO-GUIADO.md](../INGENUITY-VOO-GUIADO.md).

## Cassini–Huygens: exploração e descida em Titã

O arquivo `cassini.glb` original permanece intacto. Referência: [NASA 3D Resources — Cassini-Huygens](https://science.nasa.gov/3d-resources/cassini-huygens-a/). Geometrias por material são agrupadas em orbitador e exterior da sonda, sem alegar que correspondam a todas as peças de engenharia. Os grupos `foil_gold_h` e `tex_01_h` formam o exterior da Huygens; a geometria auxiliar do nó raiz não é exibida.

Interior didático de descida, escudo frontal, tampa traseira, três paraquedas, movimentos e ambientes de Titã são **criações artísticas**, não modelos oficiais desses sistemas. Separações e durações são simplificadas. Créditos aparecem na ficha e no roteiro, com fontes ESA/NASA; não há patrocínio ou aprovação das agências.

## Grand Finale da Cassini

Reutiliza o orbitador do GLB NASA, sem Huygens acoplada em 2017. Saturno usa a textura local existente; anéis em bandas, atmosfera, trajetórias e perda visual da nave são representações artísticas. Nenhuma simulação de efemérides, escala de voo ou separação real de componentes é alegada. Referências: [NASA — Grand Finale](https://science.nasa.gov/mission/cassini/grand-finale/overview/) e [cronologia final](https://science.nasa.gov/mission/cassini/grand-finale/cassini-end-of-mission-timeline/).

## Webb: exterior e abertura didática

O arquivo `jwst.glb` permanece intacto. Referência: [NASA 3D Resources — James Webb Space Telescope](https://science.nasa.gov/3d-resources/james-webb-space-telescope/). O app agrupa superfícies originais por materiais para estudar módulo de serviço, escudo, espelhos e painel solar; os grupos não são uma decomposição mecânica oficial.

Abertura por escalas, distâncias entre conjuntos e Terra contextual são **adaptações artísticas didáticas**. O recurso não fornece dobradiças de implantação: a animação não simula origami, tensionamento de cada membrana ou a rotação exata das asas. Aviso e fonte presentes na ficha/roteiro. Sem interiores reconstruídos ou patrocínio/aprovação das agências.
