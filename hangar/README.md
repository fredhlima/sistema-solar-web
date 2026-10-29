# Hangar integrado

Origem: Fred Lima, Sistema Solar Web, revisão `479801bfcd98d1e1fcb722be3a4c3f5807b6b160`.
https://github.com/fredhlima/sistema-solar-web/tree/479801bfcd98d1e1fcb722be3a4c3f5807b6b160/hangar

Interface e exploração por componentes de Saturno V e Discovery preservadas. Adaptações: integração ao simulador via iframe, catálogo de 12 veículos, prévias dos GLBs recém-recebidos, módulo lunar atualizado, controles/layout no iPhone e descarte de recursos. Os dez veículos de prévia ainda não têm exploração completa por componentes.

O repositório original identifica Fred Lima como autor e usa CC BY-NC 4.0: https://creativecommons.org/licenses/by-nc/4.0/deed.pt_BR . Esta adaptação foi solicitada pelo proprietário dos dois repositórios. Assets de terceiros mantêm seus créditos e licenças próprios; veja `../modelos/CREDITOS.md` e os rodapés da experiência.

Dependências compartilhadas em `../lib/`; GLBs em `../modelos/`. Packs NASA locais preservam os construtores originais, sem depender de CDN. Abrir `index.html` por HTTP ou pelo aplicativo Capacitor.

## UX móvel e acesso (08/10/2026)

Catálogo em carrossel contínuo sem rolagem vertical da página, navegação por botões/deslize e retorno à nave anterior. Exploração usa regiões separadas para cena, seleção, painel rolável e barra; selecionar não abre leitura automaticamente. Prévia tem controles e informações recolhíveis.

Hubble gratuito, outras 11 naves Pro. `hangar-access.js` define IDs/destinos; o wrapper verifica o serviço premium central e cada página aguarda autorização antes de importar seu renderizador. A edição web demonstrativa mantém a política de acesso existente. Compra simulada exige bundle opt-in e autorização nativa Debug.

Auditorias: `tests/audit-hangar.mjs`, `tests/audit-hangar-premium.mjs` e `tests/validacao-hangar-acesso.mjs`.

Leitura lateral ampliada a 44% (máximo 440px). Um único Voltar recolhe o painel aberto, retorna ao catálogo e sai do Hangar conforme o contexto; botões X duplicados removidos.

## Modelos oficiais e desmontagem

Auditoria dos arquivos atuais: a geometria empacotada do Saturno V e Discovery deriva dos mesmos GLBs NASA recebidos em `modelos/saturno-v.glb` e `modelos/onibus-espacial.glb` (hashes de origem presentes em `apollo-nasa-data.js` e `shuttle-nasa-data.js`). O Saturno V original tem 22 malhas organizadas por grupos de superfície; o ônibus original tem uma malha externa. Isso não equivale a um interior desmontável pronto.

A experiência adapta a geometria em grupos exploráveis: Saturno V em 11 conjuntos; Discovery em 9, com componentes oficiais complementares e complementos didáticos identificados nos créditos. Preservar mapas/forma oficiais onde possível; partes ausentes do modelo original precisam de reconstrução artística identificada. Desmonte educativo não representa sequência real de voo nem componentes técnicos exatos.
