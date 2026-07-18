import { t, formatarDataLonga, formatarDataCurta, ordinal, trocarIdioma, getIdioma } from './i18n.js?v=17';

export function iniciarUI({ motor, dados, eventos, missoes, trajetorias, premium, abrirQuiz, abrirVoce }) {
  // Layout do painel: variante "ousada" escolhida pelo Fred (15/07/2026) —
  // rail vertical de Visualização + barra de comando central de Experiências.
  // O CSS segue escopado em .ux-ousada.
  document.body.classList.add('ux-ousada');
  // Freemium: sem objeto premium (ex.: versão web de showcase) tudo é liberado
  const premiumExigir = (recursoId) => !premium || premium.exigir(recursoId);
  const premiumTem = (recursoId) => !premium || premium.recurso(recursoId);
  const premiumPermitido = (recursoId, itemId) => !premium || premium.permitido(recursoId, itemId);
  const premiumExigirItem = (recursoId, itemId) => !premium || premium.exigirItem(recursoId, itemId);
  // XP do sistema de progressão (js/progresso.js escuta este evento)
  const progressoEvento = (tipo, extra) =>
    document.dispatchEvent(new CustomEvent('sim:progresso', { detail: { tipo, ...(extra || {}) } }));
  const criarSeloPro = () => {
    const selo = document.createElement('span');
    selo.className = 'premium-cadeado';
    selo.textContent = t('proBadge');
    selo.title = t('cadeadoTitulo');
    return selo;
  };
  if (premium) {
    premium.aoMudar((ativo) => {
      if (ativo) {
        document.querySelectorAll('.premium-cadeado').forEach((el) => el.remove());
      } else {
        // Desativação (premium.limpar(), usado em testes/reset): os selos PRO
        // são criados na montagem da UI — recarregar é o caminho honesto
        // para restaurar o estado visual bloqueado em toda a interface
        window.location.reload();
      }
    });
  }
  const root = document.getElementById('ui-root');

  // Estado da UI
  const estado = {
    painelInfoAberto: false,
    corpoSelecionado: null,
    emTour: false,
    paradaTourAtual: 0,
    dicaMostrada: false,
    escalaAtual: 'didatica',
    orbitasVisiveis: true,
    rotulosVisiveis: true,
    velocidadeAtual: 1,
    velocidadeAnterior: 1,
    indiceVelocidades: null, // será atribuído após VELOCIDADES ser definido
    painelEventosAberto: false,
    comparadorAberto: false,
    cardMissaoAberto: false,
    modoIncluirSolComparador: false,
    incluirSolComparador: false,
    missaoSelecionada: null,
  };

  // Efeito IKEA: favoritar astros cria um senso de posse ("minha coleção do
  // céu") já na exploração livre, antes de qualquer conta ou compra — o que a
  // pessoa ajudou a montar, ela valoriza mais. Persistido em localStorage;
  // marcador ★ na lista Explorar e botão no painel de cada astro.
  const CHAVE_FAVORITOS = 'sistema-solar-favoritos';
  let favoritos = new Set();
  try {
    const raw = localStorage.getItem(CHAVE_FAVORITOS);
    if (raw) favoritos = new Set(JSON.parse(raw));
  } catch (e) { /* sem storage: favoritos só em memória nesta sessão */ }

  function salvarFavoritos() {
    try { localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([...favoritos])); } catch (e) { /* segue */ }
  }
  function ehFavorito(id) { return favoritos.has(id); }
  function atualizarMarcadorFavorito(id) {
    const item = document.getElementById(`explorar-item-${id}`);
    if (!item) return;
    let marcador = item.querySelector('.explorar-fav-marcador');
    if (favoritos.has(id)) {
      if (!marcador) {
        marcador = document.createElement('span');
        marcador.className = 'explorar-fav-marcador';
        marcador.textContent = ' ★';
        item.appendChild(marcador);
      }
    } else if (marcador) {
      marcador.remove();
    }
  }
  // Reatribuída ao montar o painel Explorar; reconstrói a seção "Meus favoritos"
  let atualizarSecaoFavoritos = () => {};
  function alternarFavorito(id) {
    if (favoritos.has(id)) favoritos.delete(id); else favoritos.add(id);
    salvarFavoritos();
    atualizarMarcadorFavorito(id);
    atualizarSecaoFavoritos();
    return favoritos.has(id);
  }

  const VELOCIDADES = [-3650, -365, -90, -30, -7, -1, -1/24, 0, 1/24, 1, 7, 30, 90, 365, 3650];
  estado.indiceVelocidades = VELOCIDADES.indexOf(1); // index for 1 day/s (initial motor state)
  const PARADAS_TOUR = [
    'sol', 'mercurio', 'venus', 'terra', 'lua', 'marte',
    'cinturao-asteroides', 'jupiter', 'saturno', 'urano', 'netuno',
    'cinturao-kuiper', 'plutao', 'halley'
  ];

  // Mapear ordemDoSol para identificar luas de cada planeta
  const luasPorPlaneta = {};
  dados.corpos.forEach(corpo => {
    if (corpo.tipo === 'lua' && corpo.pai) {
      if (!luasPorPlaneta[corpo.pai]) {
        luasPorPlaneta[corpo.pai] = [];
      }
      luasPorPlaneta[corpo.pai].push(corpo);
    }
  });

  // Criar DOM principal
  criarTitulo();
  criarBarraAcoes();
  criarPainelExplorar();
  criarControleTempo();
  criarPainelInfo();
  criarTour();
  criarToastDica();

  // V2: componentes opcionais
  if (eventos) {
    criarPainelEventos();
  }
  criarComparadorTamanhos();
  if (missoes && trajetorias) {
    criarCardMissao();
  }

  // Register scale change callback if exists (to rebuild trajectories)
  if (trajetorias && motor.aoMudarEscala === undefined) {
    motor.aoMudarEscala = () => {
      trajetorias.reconstruir();
    };
  }

  // Register motor selection callback
  motor.aoSelecionar = (id) => {
    estado.corpoSelecionado = id;
    if (id) {
      abrirPainelInfo(id);
      atualizarSelecaoExplorar(id);
    } else {
      fecharPainelInfo();
    }
    // Evento DOM para módulos desacoplados (ex.: modo "encontrar" do quiz)
    document.dispatchEvent(new CustomEvent('sim:selecao', { detail: { id } }));
  };

  // Atalhos de teclado
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      // Não intercepta Espaço se o foco estiver num campo de digitação
      // (ex.: o campo de data inline) — senão a simulação pausaria sozinha
      const ae = document.activeElement;
      if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA')) return;
      e.preventDefault();
      alternarPausa();
    }
    if (e.code === 'Escape') {
      if (estado.emTour) {
        sairTour();
      } else if (estado.painelInfoAberto) {
        motor.selecionar(null);
        fecharPainelInfo();
        atualizarSelecaoExplorar(null);
      }
    }
    if (estado.emTour) {
      if (e.code === 'ArrowRight') {
        avancarTour();
      }
      if (e.code === 'ArrowLeft') {
        recuarTour();
      }
    }
  });

  // Time update loop
  let rafId = null;
  function atualizarTempo() {
    const dataSimulada = motor.getDataSimulada();
    const elemData = document.getElementById('tempo-data');
    if (elemData) {
      elemData.textContent = formatarDataLonga(dataSimulada);
    }
    rafId = requestAnimationFrame(atualizarTempo);
  }
  atualizarTempo();

  // ============ COMPONENTES ============

  function criarTitulo() {
    const div = document.createElement('div');
    div.className = 'titulo';
    div.innerHTML = `
      <h1 class="titulo-principal">${t('titulo')}</h1>
      <p class="titulo-secundario">${t('subtitulo')}</p>
      <div id="slot-progresso" class="titulo-slot-progresso"></div>
    `;
    root.appendChild(div);

    // iniciarProgresso() roda ANTES de iniciarUI() (ordem do main.js), então o
    // chip de nível já existe solto no root quando o slot nasce — adota ele.
    const chipExistente = document.querySelector('.progresso-chip');
    if (chipExistente) {
      div.querySelector('#slot-progresso').appendChild(chipExistente);
    }
  }

  function criarBarraAcoes() {
    const div = document.createElement('div');
    div.className = 'barra-acoes';

    const grupoExperiencias = document.createElement('div');
    grupoExperiencias.className = 'grupo-acoes grupo-experiencias';
    grupoExperiencias.setAttribute('role', 'group');
    grupoExperiencias.setAttribute('aria-label', t('grupoExperiencias'));

    const grupoVisualizacao = document.createElement('div');
    grupoVisualizacao.className = 'grupo-acoes grupo-visualizacao';
    grupoVisualizacao.setAttribute('role', 'group');
    grupoVisualizacao.setAttribute('aria-label', t('grupoVisualizacao'));

    const grupoUtilidades = document.createElement('div');
    grupoUtilidades.className = 'grupo-acoes grupo-utilidades';
    grupoUtilidades.setAttribute('role', 'group');
    grupoUtilidades.setAttribute('aria-label', t('grupoUtilidades'));

    // Seletor de idioma (grupo Utilidades)
    const seletorDiv = document.createElement('div');
    seletorDiv.className = 'seletor-idioma';

    const btnSeletor = document.createElement('button');
    btnSeletor.className = 'seletor-idioma-botao';
    btnSeletor.innerHTML = `🌐 ${getIdioma().toUpperCase()} ▾`;
    btnSeletor.onclick = () => {
      const menu = document.getElementById('seletor-idioma-menu');
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };
    seletorDiv.appendChild(btnSeletor);

    const menu = document.createElement('div');
    menu.className = 'seletor-idioma-menu';
    menu.id = 'seletor-idioma-menu';
    menu.style.display = 'none';

    const idiomas = [
      { codigo: 'pt', nome: 'Português' },
      { codigo: 'en', nome: 'English' },
      { codigo: 'es', nome: 'Español' }
    ];

    idiomas.forEach(idioma => {
      const item = document.createElement('button');
      item.className = 'seletor-idioma-item';
      if (idioma.codigo === getIdioma()) {
        item.classList.add('ativo');
      }
      item.textContent = idioma.nome;
      item.onclick = () => trocarIdioma(idioma.codigo);
      menu.appendChild(item);
    });

    seletorDiv.appendChild(menu);

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!seletorDiv.contains(e.target)) {
        menu.style.display = 'none';
      }
    });

    grupoUtilidades.appendChild(seletorDiv);

    // Gatilho do popover de experiências (só aparece em mobile, via CSS)
    const triggerExp = document.createElement('button');
    triggerExp.className = 'botao experiencias-trigger';
    triggerExp.innerHTML = '✦ ' + t('grupoExperiencias') + ' ▾';
    grupoExperiencias.appendChild(triggerExp);

    // Container para os itens do popover (no desktop usa display: contents)
    const itensExp = document.createElement('div');
    itensExp.className = 'experiencias-itens';
    grupoExperiencias.appendChild(itensExp);

    triggerExp.onclick = (e) => {
      e.stopPropagation();
      itensExp.classList.toggle('aberto');
    };

    // Fecha o popover ao clicar num item ou fora
    itensExp.addEventListener('click', () => itensExp.classList.remove('aberto'));
    document.addEventListener('click', (e) => {
      if (!grupoExperiencias.contains(e.target)) itensExp.classList.remove('aberto');
    });

    // Events button (Experiências)
    if (eventos) {
      const btnEventos = document.createElement('button');
      btnEventos.className = 'botao';
      btnEventos.id = 'btn-eventos';
      btnEventos.innerHTML = t('btnEventos');
      btnEventos.onclick = () => {
        progressoEvento('abriu-eventos');
        abrirPainelEventos();
      };
      itensExp.appendChild(btnEventos);
    }

    // Size Comparison button (Experiências)
    const btnComparador = document.createElement('button');
    btnComparador.className = 'botao';
    btnComparador.id = 'btn-comparador';
    btnComparador.innerHTML = t('btnTamanhos');
    btnComparador.onclick = () => {
      progressoEvento('abriu-comparador');
      abrirComparador();
    };
    itensExp.appendChild(btnComparador);

    // Quiz Espacial (Experiências)
    if (abrirQuiz) {
      const btnQuiz = document.createElement('button');
      btnQuiz.className = 'botao';
      btnQuiz.id = 'btn-quiz';
      btnQuiz.innerHTML = t('btnQuiz');
      btnQuiz.onclick = () => {
        progressoEvento('abriu-quiz');
        abrirQuiz();
      };
      itensExp.appendChild(btnQuiz);
    }

    // Você no Espaço (Experiências)
    if (abrirVoce) {
      const btnVoce = document.createElement('button');
      btnVoce.className = 'botao';
      btnVoce.id = 'btn-voce';
      btnVoce.innerHTML = t('btnVoce');
      btnVoce.onclick = () => {
        progressoEvento('abriu-voce');
        abrirVoce();
      };
      itensExp.appendChild(btnVoce);
    }

    // Tour button (Experiências) — com realce pulsante para atrair o primeiro
    // clique; para de pulsar depois que a pessoa já fez o tour uma vez
    const btnTour = document.createElement('button');
    btnTour.className = 'botao';
    btnTour.id = 'btn-tour';
    let tourVisto = false;
    try { tourVisto = localStorage.getItem('sistema-solar-tour-visto') === '1'; } catch (e) { /* sem storage */ }
    if (!tourVisto) btnTour.classList.add('tour-destaque');
    btnTour.innerHTML = t('btnTour');
    btnTour.onclick = () => {
      try { localStorage.setItem('sistema-solar-tour-visto', '1'); } catch (e) { /* sem storage */ }
      btnTour.classList.remove('tour-destaque');
      iniciarTour();
    };
    itensExp.appendChild(btnTour);

    // Toggle Escala (Visualização)
    const divEscala = document.createElement('div');
    divEscala.className = 'toggle-escala';
    divEscala.innerHTML = `
      <button class="toggle-escala-opcao ativo" data-escala="didatica">${t('escalaDidatica')}</button>
      <span class="toggle-escala-separador">◀▶</span>
      <button class="toggle-escala-opcao" data-escala="real">${t('escalaReal')}</button>
    `;
    divEscala.querySelectorAll('.toggle-escala-opcao').forEach(btn => {
      btn.onclick = (e) => {
        divEscala.querySelectorAll('.toggle-escala-opcao').forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        const novaEscala = btn.dataset.escala;
        estado.escalaAtual = novaEscala;
        motor.setEscala(novaEscala);
      };
    });
    grupoVisualizacao.appendChild(divEscala);

    // Orbits toggle (Visualização)
    const btnOrbitas = document.createElement('button');
    btnOrbitas.className = 'botao toggle-ativo';
    btnOrbitas.textContent = t('btnOrbitas');
    btnOrbitas.onclick = () => {
      estado.orbitasVisiveis = !estado.orbitasVisiveis;
      motor.setOrbitasVisiveis(estado.orbitasVisiveis);
      btnOrbitas.classList.toggle('toggle-ativo');
    };
    grupoVisualizacao.appendChild(btnOrbitas);

    // Labels toggle (Visualização)
    const btnRotulos = document.createElement('button');
    btnRotulos.className = 'botao toggle-ativo';
    btnRotulos.textContent = t('btnRotulos');
    btnRotulos.onclick = () => {
      estado.rotulosVisiveis = !estado.rotulosVisiveis;
      motor.setRotulosVisiveis(estado.rotulosVisiveis);
      btnRotulos.classList.toggle('toggle-ativo');
    };
    grupoVisualizacao.appendChild(btnRotulos);

    // Overview button (Visualização)
    const btnVisaoGeral = document.createElement('button');
    btnVisaoGeral.className = 'botao';
    btnVisaoGeral.innerHTML = t('btnVisaoGeral');
    btnVisaoGeral.onclick = () => motor.visaoGeral();
    grupoVisualizacao.appendChild(btnVisaoGeral);

    div.appendChild(grupoExperiencias);
    div.appendChild(grupoVisualizacao);
    div.appendChild(grupoUtilidades);
    root.appendChild(div);
  }

  function criarPainelExplorar() {
    const div = document.createElement('div');
    div.className = 'painel painel-explorar';
    div.id = 'painel-explorar';

    const cabecalho = document.createElement('div');
    cabecalho.className = 'explorar-cabecalho';
    cabecalho.innerHTML = `
      <h2 class="explorar-titulo">${t('explorar')}</h2>
    `;
    const btnColapsar = document.createElement('button');
    btnColapsar.className = 'explorar-botao-colapsar';

    // Estado persistido: painel recolhido vira uma barra mínima no canto,
    // para quem só quer navegar/olhar a cena sem a lista por cima
    const CHAVE_COLAPSO = 'sistema-solar-explorar-colapsado';
    let recolhido = false;
    try { recolhido = localStorage.getItem(CHAVE_COLAPSO) === '1'; } catch (e) { /* sem storage */ }

    function aplicarEstadoColapso() {
      div.classList.toggle('colapsado', recolhido);
      btnColapsar.innerHTML = recolhido ? '›' : '‹';
      btnColapsar.title = recolhido ? t('expandirMenu') : t('recolherMenu');
      btnColapsar.setAttribute('aria-label', btnColapsar.title);
      conteudo.style.display = recolhido ? 'none' : 'block';
    }

    btnColapsar.onclick = () => {
      recolhido = !recolhido;
      try { localStorage.setItem(CHAVE_COLAPSO, recolhido ? '1' : '0'); } catch (e) { /* sem storage */ }
      aplicarEstadoColapso();
    };
    cabecalho.appendChild(btnColapsar);
    div.appendChild(cabecalho);

    const conteudo = document.createElement('div');
    conteudo.className = 'explorar-conteudo';

    // Seção "Meus favoritos" no topo — reúne a coleção do usuário num lugar só
    // (Efeito IKEA: o que ele montou, ele valoriza). Reconstruída a cada
    // favoritar/desfavoritar via atualizarSecaoFavoritos().
    const grupoFav = document.createElement('div');
    grupoFav.className = 'explorar-grupo explorar-grupo-favoritos';
    conteudo.appendChild(grupoFav);
    atualizarSecaoFavoritos = function () {
      grupoFav.innerHTML = '';
      const titulo = document.createElement('h3');
      titulo.className = 'explorar-grupo-titulo';
      titulo.textContent = '★ ' + t('grupoFavoritos');
      grupoFav.appendChild(titulo);
      const temAlgum = dados.corpos.some(c => favoritos.has(c.id));
      if (!temAlgum) {
        const dica = document.createElement('div');
        dica.className = 'explorar-fav-vazio';
        dica.textContent = t('favVazioDica');
        grupoFav.appendChild(dica);
        return;
      }
      // Segue a ordem de dados.corpos para uma lista estável
      dados.corpos.forEach(corpo => {
        if (!favoritos.has(corpo.id)) return;
        const elem = document.createElement('div');
        elem.className = 'explorar-item explorar-item-fav';
        let label = corpo.nome;
        if (corpo.tipo === 'planeta' && corpo.ordemDoSol) label = `${ordinal(corpo.ordemDoSol)} ${corpo.nome}`;
        elem.textContent = label;
        const m = document.createElement('span');
        m.className = 'explorar-fav-marcador';
        m.textContent = ' ★';
        elem.appendChild(m);
        elem.onclick = () => { motor.focar(corpo.id); motor.aoSelecionar(corpo.id); };
        grupoFav.appendChild(elem);
      });
    };
    atualizarSecaoFavoritos();

    // Agrupar corpos
    const grupos = {
      [t('grupoEstrela')]: [],
      [t('grupoPlanetas')]: [],
      [t('grupoAnoes')]: [],
      [t('grupoCinturoes')]: [],
      [t('grupoAsteroides')]: [],
      [t('grupoCometas')]: [],
      [t('grupoTelescopios')]: [],
      [t('grupoMissoes')]: []
    };

    dados.corpos.forEach(corpo => {
      if (corpo.tipo === 'estrela') {
        grupos[t('grupoEstrela')].push(corpo);
      } else if (corpo.tipo === 'planeta') {
        grupos[t('grupoPlanetas')].push(corpo);
      } else if (corpo.tipo === 'planeta-anao') {
        grupos[t('grupoAnoes')].push(corpo);
      } else if (corpo.tipo === 'cinturao') {
        grupos[t('grupoCinturoes')].push(corpo);
      } else if (corpo.tipo === 'asteroide') {
        grupos[t('grupoAsteroides')].push(corpo);
      } else if (corpo.tipo === 'cometa') {
        grupos[t('grupoCometas')].push(corpo);
      } else if (corpo.tipo === 'sonda') {
        grupos[t('grupoTelescopios')].push(corpo);
      }
    });

    // Add missions if available (requires trajectories for toggles)
    if (missoes && trajetorias) {
      grupos[t('grupoMissoes')] = missoes;
    }

    Object.keys(grupos).forEach(grupoNome => {
      if (grupos[grupoNome].length === 0) return;

      const divGrupo = document.createElement('div');
      divGrupo.className = 'explorar-grupo';

      const titulo = document.createElement('h3');
      titulo.className = 'explorar-grupo-titulo';
      titulo.textContent = grupoNome;
      divGrupo.appendChild(titulo);

      grupos[grupoNome].forEach(item => {
        // Bodies have 'tipo' field; missions have 'cor' field
        const isMissao = grupoNome === t('grupoMissoes');

        if (isMissao) {
          // Mission item: colored dot + name + eye icon
          const divMissao = document.createElement('div');
          divMissao.className = 'explorar-item explorar-missao-item';
          divMissao.id = `explorar-item-${item.id}`;

          // Bolinha colorida
          const bolinha = document.createElement('div');
          bolinha.className = 'explorar-missao-bolinha';
          bolinha.style.backgroundColor = item.cor || '#5cc8ff';
          divMissao.appendChild(bolinha);

          // Name (clickable)
          const nomeElem = document.createElement('span');
          nomeElem.className = 'explorar-missao-nome';
          nomeElem.textContent = item.nome;
          // Provinha: Apollo 11 é grátis (premium.permitido resolve por item)
          nomeElem.onclick = () => {
            if (!premiumExigirItem('missoes', item.id)) return;
            abrirCardMissao(item.id);
            // Selecionar a missão já leva ao lançamento e segue a nave —
            // o botão "Seguir a nave" no card continua para re-acionar
            seguirMissao(item.id);
          };
          divMissao.appendChild(nomeElem);
          if (!premiumPermitido('missoes', item.id)) nomeElem.appendChild(criarSeloPro());

          // Eye icon toggle visibility
          const btnOlho = document.createElement('button');
          btnOlho.className = 'explorar-missao-btn-olho';
          btnOlho.innerHTML = '◉';
          btnOlho.title = 'Toggle mission visibility';
          btnOlho.onclick = (e) => {
            e.stopPropagation();
            if (!premiumExigirItem('missoes', item.id)) return;
            const jEstaVisivel = trajetorias.visiveis.has(item.id);
            trajetorias.setVisivel(item.id, !jEstaVisivel);
            atualizarIconeOlho(item.id, !jEstaVisivel);
          };
          btnOlho.id = `olho-missao-${item.id}`;
          divMissao.appendChild(btnOlho);

          divGrupo.appendChild(divMissao);
        } else {
          // Item de corpo (v1)
          const corpo = item;

          let label = corpo.nome;
          if (corpo.tipo === 'planeta' && corpo.ordemDoSol) {
            const ordinalStr = ordinal(corpo.ordemDoSol);
            label = `${ordinalStr} ${corpo.nome}`;
          }

          if (corpo.tipo === 'sonda') {
            // Sonda: layout flex com nome + botão de olho
            const elem = document.createElement('div');
            elem.className = 'explorar-item explorar-sonda-item';
            elem.id = `explorar-item-${corpo.id}`;

            const nomeElem = document.createElement('span');
            nomeElem.className = 'explorar-sonda-nome';
            nomeElem.textContent = label;
            nomeElem.onclick = () => {
              // Tornar visível se estava oculta, depois focar
              if (!motor.corpoVisivel(corpo.id)) {
                motor.setCorpoVisivel(corpo.id, true);
                atualizarIconeOlhoSonda(corpo.id, true);
              }
              motor.focar(corpo.id);
              motor.aoSelecionar(corpo.id);
            };
            elem.appendChild(nomeElem);

            const btnOlho = document.createElement('button');
            btnOlho.className = 'explorar-sonda-btn-olho';
            btnOlho.innerHTML = '◉';
            btnOlho.title = t('sondaOlhoTitulo');
            btnOlho.id = `olho-sonda-${corpo.id}`;
            btnOlho.onclick = (e) => {
              e.stopPropagation();
              const v = !motor.corpoVisivel(corpo.id);
              motor.setCorpoVisivel(corpo.id, v);
              atualizarIconeOlhoSonda(corpo.id, v);
            };
            elem.appendChild(btnOlho);

            divGrupo.appendChild(elem);
          } else {
            // Corpo normal: layout sem flex
            const elem = document.createElement('div');
            elem.className = 'explorar-item';
            elem.id = `explorar-item-${corpo.id}`;

            elem.textContent = label;
            if (ehFavorito(corpo.id)) {
              const m = document.createElement('span');
              m.className = 'explorar-fav-marcador';
              m.textContent = ' ★';
              elem.appendChild(m);
            }
            elem.onclick = () => {
              motor.focar(corpo.id);
              motor.aoSelecionar(corpo.id);
            };
            divGrupo.appendChild(elem);

            // Luas indentadas
            if (luasPorPlaneta[corpo.id]) {
              luasPorPlaneta[corpo.id].forEach(lua => {
                const itemLua = document.createElement('div');
                itemLua.className = 'explorar-item explorar-item-lua';
                itemLua.id = `explorar-item-${lua.id}`;
                itemLua.textContent = lua.nome;
                if (ehFavorito(lua.id)) {
                  const m = document.createElement('span');
                  m.className = 'explorar-fav-marcador';
                  m.textContent = ' ★';
                  itemLua.appendChild(m);
                }
                itemLua.onclick = () => {
                  motor.focar(lua.id);
                  motor.aoSelecionar(lua.id);
                };
                divGrupo.appendChild(itemLua);
              });
            }
          }
        }
      });

      conteudo.appendChild(divGrupo);
    });

    div.appendChild(conteudo);

    // Footer with credits
    const rodape = document.createElement('div');
    rodape.className = 'explorar-rodape';
    rodape.innerHTML = t('credito');
    div.appendChild(rodape);

    aplicarEstadoColapso();
    root.appendChild(div);

    // Inicializar sondas como ocultas por padrão (não poluem a visão da
    // Terra). Precisa vir DEPOIS do appendChild: atualizarIconeOlhoSonda
    // usa getElementById, que só enxerga elementos já no documento.
    for (const id of ['hubble', 'jwst']) {
      motor.setCorpoVisivel(id, false);
      atualizarIconeOlhoSonda(id, false);
    }
  }

  // Function to update mission eye icon
  function atualizarIconeOlho(idMissao, visivel) {
    const btn = document.getElementById(`olho-missao-${idMissao}`);
    if (btn) {
      btn.innerHTML = visivel ? '◉' : '◎';
    }
  }

  // Function to update probe/telescope eye icon
  function atualizarIconeOlhoSonda(idSonda, visivel) {
    const btn = document.getElementById(`olho-sonda-${idSonda}`);
    if (btn) {
      btn.innerHTML = visivel ? '◉' : '○';
    }
  }

  function atualizarSelecaoExplorar(id) {
    document.querySelectorAll('.explorar-item').forEach(item => {
      item.classList.remove('selecionado');
    });
    const item = document.getElementById(`explorar-item-${id}`);
    if (item) {
      item.classList.add('selecionado');
    }
  }

  function criarControleTempo() {
    const div = document.createElement('div');
    div.className = 'controles-tempo';

    const pill = document.createElement('div');
    pill.className = 'tempo-pill';

    const btnRecuar = document.createElement('button');
    btnRecuar.className = 'tempo-botao';
    btnRecuar.innerHTML = '⏮';
    btnRecuar.onclick = () => recuarVelocidade();

    const btnPausar = document.createElement('button');
    btnPausar.className = 'tempo-botao';
    btnPausar.innerHTML = '⏯';
    btnPausar.onclick = alternarPausa;

    const btnAvancar = document.createElement('button');
    btnAvancar.className = 'tempo-botao';
    btnAvancar.innerHTML = '⏭';
    btnAvancar.onclick = () => avancarVelocidade();

    // Slider de velocidade: esquerda = voltar no tempo, centro = pausa,
    // right = advance (same steps as ⏮/⏭ buttons)
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'tempo-slider';
    slider.id = 'tempo-slider';
    slider.min = '0';
    slider.max = String(VELOCIDADES.length - 1);
    slider.step = '1';
    slider.value = String(estado.indiceVelocidades);
    slider.title = t('tituloSlider');
    slider.oninput = () => {
      const idx = parseInt(slider.value, 10);
      estado.indiceVelocidades = idx;
      const novaVel = VELOCIDADES[idx];
      estado.velocidadeAtual = novaVel;
      if (novaVel !== 0) estado.velocidadeAnterior = novaVel;
      motor.setVelocidade(novaVel);
      atualizarLabelVelocidade();
    };

    const labelVelocidade = document.createElement('div');
    labelVelocidade.className = 'tempo-velocidade';
    labelVelocidade.id = 'tempo-velocidade';
    labelVelocidade.textContent = t('umDiaPorSegundo');

    const labelData = document.createElement('div');
    labelData.className = 'tempo-data';
    labelData.id = 'tempo-data';
    labelData.textContent = formatarDataLonga(new Date());
    labelData.title = t('irParaData');
    labelData.tabIndex = 0;
    labelData.setAttribute('role', 'button');

    // Campo de data nativo, sobreposto ao label ao clicar — deixa digitar ou
    // escolher no calendário do navegador uma data qualquer para ir direto.
    const inputData = document.createElement('input');
    inputData.type = 'date';
    inputData.className = 'tempo-data-input';
    inputData.id = 'tempo-data-input';
    inputData.style.display = 'none';

    const abrirInputData = () => {
      inputData.value = motor.getDataSimulada().toISOString().slice(0, 10);
      labelData.style.display = 'none';
      inputData.style.display = 'inline-block';
      inputData.focus();
      // showPicker exige gesto direto do usuário — este onclick/onkeydown é um
      if (typeof inputData.showPicker === 'function') {
        try { inputData.showPicker(); } catch (e) { /* navegador restringiu, o campo continua editável na mão */ }
      }
    };
    const fecharInputData = () => {
      inputData.style.display = 'none';
      labelData.style.display = '';
    };

    labelData.onclick = abrirInputData;
    labelData.onkeydown = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation(); // Espaço aqui abre o campo, não pausa a simulação
        abrirInputData();
      }
    };
    inputData.onchange = () => {
      if (inputData.value) motor.irParaData(inputData.value);
      fecharInputData();
    };
    inputData.onblur = fecharInputData;
    inputData.onkeydown = (e) => {
      // Não deixa Espaço/Escape do campo vazarem para os atalhos globais
      // (Espaço pausa a simulação; Escape fecha painéis abertos)
      e.stopPropagation();
      if (e.code === 'Escape') fecharInputData();
    };

    const btnHoje = document.createElement('button');
    btnHoje.className = 'botao tempo-botao-hoje';
    btnHoje.textContent = t('hoje');
    btnHoje.onclick = () => {
      motor.irParaHoje();
    };

    pill.appendChild(btnRecuar);
    pill.appendChild(btnPausar);
    pill.appendChild(btnAvancar);
    pill.appendChild(slider);
    pill.appendChild(labelVelocidade);
    pill.appendChild(labelData);
    pill.appendChild(inputData);
    pill.appendChild(btnHoje);

    div.appendChild(pill);
    root.appendChild(div);
  }

  function avancarVelocidade() {
    if (estado.indiceVelocidades < VELOCIDADES.length - 1) {
      estado.indiceVelocidades++;
      const novaVel = VELOCIDADES[estado.indiceVelocidades];
      estado.velocidadeAtual = novaVel;
      if (novaVel !== 0) estado.velocidadeAnterior = novaVel;
      motor.setVelocidade(novaVel);
      atualizarLabelVelocidade();
      atualizarSliderVelocidade();
    }
  }

  function recuarVelocidade() {
    if (estado.indiceVelocidades > 0) {
      estado.indiceVelocidades--;
      const novaVel = VELOCIDADES[estado.indiceVelocidades];
      estado.velocidadeAtual = novaVel;
      if (novaVel !== 0) estado.velocidadeAnterior = novaVel;
      motor.setVelocidade(novaVel);
      atualizarLabelVelocidade();
      atualizarSliderVelocidade();
    }
  }

  function alternarPausa() {
    if (estado.velocidadeAtual === 0) {
      estado.velocidadeAtual = estado.velocidadeAnterior;
      estado.indiceVelocidades = VELOCIDADES.indexOf(estado.velocidadeAnterior);
      motor.setVelocidade(estado.velocidadeAtual);
    } else {
      estado.velocidadeAnterior = estado.velocidadeAtual;
      estado.velocidadeAtual = 0;
      estado.indiceVelocidades = VELOCIDADES.indexOf(0);
      motor.setVelocidade(0);
    }
    atualizarLabelVelocidade();
    atualizarSliderVelocidade();
  }

  function atualizarSliderVelocidade() {
    const s = document.getElementById('tempo-slider');
    if (s) s.value = String(estado.indiceVelocidades);
  }

  function atualizarLabelVelocidade() {
    const elem = document.getElementById('tempo-velocidade');
    if (!elem) return;

    const vel = estado.velocidadeAtual;
    if (vel === 0) {
      elem.textContent = t('pausado');
    } else if (vel === 1/24) {
      elem.textContent = t('umaHoraPorSegundo');
    } else if (vel === 1) {
      elem.textContent = t('umDiaPorSegundo');
    } else if (vel > 1) {
      elem.textContent = t('diasPorSegundo', { n: vel });
    } else if (vel === -1/24) {
      elem.textContent = `−${t('umaHoraPorSegundo')}`;
    } else if (vel === -1) {
      elem.textContent = `−${t('umDiaPorSegundo')}`;
    } else {
      elem.textContent = `−${t('diasPorSegundo', { n: Math.abs(vel) })}`;
    }
  }

  function criarPainelInfo() {
    const div = document.createElement('div');
    div.className = 'painel painel-info';
    div.id = 'painel-info';

    const cabecalho = document.createElement('div');
    cabecalho.className = 'info-cabecalho';

    const divTitulo = document.createElement('div');
    divTitulo.style.flex = '1';

    const btnFechar = document.createElement('button');
    btnFechar.className = 'info-botao-fechar';
    btnFechar.innerHTML = '✕';
    btnFechar.onclick = () => {
      motor.selecionar(null);
      fecharPainelInfo();
      atualizarSelecaoExplorar(null);
    };

    cabecalho.appendChild(divTitulo);
    cabecalho.appendChild(btnFechar);
    div.appendChild(cabecalho);

    const conteudo = document.createElement('div');
    conteudo.className = 'info-conteudo';
    conteudo.id = 'info-conteudo-inner';
    div.appendChild(conteudo);

    root.appendChild(div);
  }

  function abrirPainelInfo(idCorpo) {
    const corpo = dados.corpos.find(c => c.id === idCorpo);
    if (!corpo) return;

    const painel = document.getElementById('painel-info');
    const conteudo = document.getElementById('info-conteudo-inner');

    painel.classList.add('aberto');
    estado.painelInfoAberto = true;

    // Clear previous content
    conteudo.innerHTML = '';

    // Montar info
    let html = '';

    // Chip tipo
    const tipoLabel = obterTipoLabel(corpo);
    if (tipoLabel) {
      html += `<div class="info-chip-tipo">${tipoLabel}</div>`;
    }

    // Nome + botão favoritar (Efeito IKEA — posse antes de conta/compra)
    const favAtivo = ehFavorito(corpo.id);
    html += `<h2 class="info-nome">${corpo.nome}</h2>`;
    html += `<button class="info-fav-btn${favAtivo ? ' ativo' : ''}" id="info-fav-btn" aria-pressed="${favAtivo}" title="${favAtivo ? t('favRemover') : t('favAdd')}">${favAtivo ? '★' : '☆'} <span class="info-fav-texto">${favAtivo ? t('favLabelAtivo') : t('favLabel')}</span></button>`;

    // Ordem do Sol
    if (corpo.ordemDoSol) {
      const ordinalStr = ordinal(corpo.ordemDoSol);
      html += `<p class="info-ordem">${t('planetaAPartirDoSol', { ordinal: ordinalStr })}</p>`;
    } else if (corpo.tipo === 'lua' && corpo.pai) {
      const pai = dados.corpos.find(c => c.id === corpo.pai);
      if (pai) {
        html += `<p class="info-ordem">${t('luaDe', { nome: pai.nome })}</p>`;
      }
    }

    // Resumo
    if (corpo.info?.resumo) {
      html += `<p class="info-resumo">${corpo.info.resumo}</p>`;
    }

    // Numbers grid
    if (corpo.info?.numeros && corpo.info.numeros.length > 0) {
      html += '<div class="info-grid">';
      corpo.info.numeros.forEach(num => {
        html += `
          <div class="info-numero">
            <div class="info-numero-rotulo">${num.rotulo}</div>
            <div class="info-numero-valor">${num.valor}</div>
          </div>
        `;
      });
      html += '</div>';
    }

    // Curiosidades
    if (corpo.info?.curiosidades && corpo.info.curiosidades.length > 0) {
      html += `<h3 class="info-curiosidades-titulo">${t('curiosidades')}</h3>`;
      html += '<ul class="info-curiosidades">';
      corpo.info.curiosidades.forEach(curiosidade => {
        html += `<li>${curiosidade}</li>`;
      });
      html += '</ul>';
    }

    // To feel the scale (comparisons) - V2
    if (corpo.info?.comparacoes && corpo.info.comparacoes.length > 0) {
      html += `<h3 class="info-comparacoes-titulo">${t('paraSentirEscala')}</h3>`;
      html += '<ul class="info-comparacoes">';
      corpo.info.comparacoes.forEach(comparacao => {
        html += `<li>${comparacao}</li>`;
      });
      html += '</ul>';
    }

    // Luas do corpo (se houver)
    if (luasPorPlaneta[corpo.id] && luasPorPlaneta[corpo.id].length > 0) {
      html += `<h3 class="info-luas-titulo">${t('luas')}</h3>`;
      html += '<div class="info-luas">';
      luasPorPlaneta[corpo.id].forEach(lua => {
        html += `<button class="info-lua-chip" data-id="${lua.id}">${lua.nome}</button>`;
      });
      html += '</div>';
    }

    // Learn more section (11+)
    if (corpo.info?.avancado) {
      html += '<div class="info-detalhes"><details>';
      html += `<summary>${t('saibaMais')}</summary>`;
      html += '<div class="info-detalhes-conteudo">';

      if (corpo.info.avancado.composicao) {
        html += `<div><strong style="color: #5cc8ff;">${t('composicao')}</strong> ${corpo.info.avancado.composicao}</div>`;
      }

      if (corpo.info.avancado.temperatura) {
        html += `<div><strong style="color: #5cc8ff;">${t('temperatura')}</strong> ${corpo.info.avancado.temperatura}</div>`;
      }

      if (corpo.info.avancado.missoes && corpo.info.avancado.missoes.length > 0) {
        html += `<div class="info-detalhes-secao-titulo">${t('missoesExploratorias')}</div>`;
        html += '<div class="info-detalhes-chips">';
        corpo.info.avancado.missoes.forEach(missao => {
          html += `<div class="info-detalhes-chip">${missao}</div>`;
        });
        html += '</div>';
      }

      if (corpo.info.avancado.texto) {
        html += `<p style="margin: 0; color: #e8edf7; font-size: 12px; line-height: 1.6;">${corpo.info.avancado.texto}</p>`;
      }

      html += '</div></details></div>';
    }

    conteudo.innerHTML = html;

    // Favoritar: alterna estado, persiste e atualiza o marcador na lista
    const favBtn = conteudo.querySelector('#info-fav-btn');
    if (favBtn) {
      favBtn.onclick = () => {
        const agora = alternarFavorito(corpo.id);
        favBtn.classList.toggle('ativo', agora);
        favBtn.setAttribute('aria-pressed', String(agora));
        favBtn.title = agora ? t('favRemover') : t('favAdd');
        favBtn.innerHTML = `${agora ? '★' : '☆'} <span class="info-fav-texto">${agora ? t('favLabelAtivo') : t('favLabel')}</span>`;
      };
    }

    // Chips de luas: focar e abrir o painel da lua clicada
    conteudo.querySelectorAll('.info-lua-chip').forEach(btn => {
      btn.onclick = () => {
        motor.focar(btn.dataset.id);
        motor.aoSelecionar(btn.dataset.id);
      };
    });
  }

  function fecharPainelInfo() {
    const painel = document.getElementById('painel-info');
    painel.classList.remove('aberto');
    estado.painelInfoAberto = false;
    estado.corpoSelecionado = null;
  }

  function obterTipoLabel(corpo) {
    if (corpo.tipo === 'estrela') return t('chipEstrela');
    if (corpo.tipo === 'planeta') return t('chipPlaneta');
    if (corpo.tipo === 'planeta-anao') return t('chipPlanetaAnao');
    if (corpo.tipo === 'lua') {
      const pai = dados.corpos.find(c => c.id === corpo.pai);
      if (pai) {
        return t('chipLuaDe', { nome: pai.nome.toUpperCase() });
      }
      return t('chipLua');
    }
    if (corpo.tipo === 'cinturao') return t('chipCinturao');
    if (corpo.tipo === 'asteroide') return t('chipAsteroide');
    if (corpo.tipo === 'cometa') return t('chipCometa');
    if (corpo.tipo === 'sonda') return t('chipSonda');
    return null;
  }

  function criarTour() {
    const div = document.createElement('div');
    div.className = 'tour-card';
    div.id = 'tour-card';
    div.style.display = 'none';

    div.innerHTML = `
      <div class="tour-corpo">
        <div class="tour-numero" id="tour-numero">PARADA 1 DE 14</div>
        <h2 class="tour-nome" id="tour-nome">Sol</h2>
        <p class="tour-texto" id="tour-texto">Description</p>
        <div class="tour-botoes">
          <button class="tour-botao" id="tour-btn-anterior">← Previous</button>
          <button class="tour-botao" id="tour-btn-proximo">Next →</button>
          <button class="tour-botao tour-botao-sair" id="tour-btn-sair">Sair</button>
        </div>
      </div>
    `;

    root.appendChild(div);

    document.getElementById('tour-btn-anterior').onclick = recuarTour;
    document.getElementById('tour-btn-proximo').onclick = avancarTour;
    document.getElementById('tour-btn-sair').onclick = sairTour;
  }

  function iniciarTour() {
    estado.emTour = true;
    estado.paradaTourAtual = 0;
    document.getElementById('painel-explorar').style.display = 'none';
    document.getElementById('tour-card').style.display = 'block';
    atualizarTour();
  }

  function avancarTour() {
    if (estado.paradaTourAtual < PARADAS_TOUR.length - 1) {
      estado.paradaTourAtual++;
      atualizarTour();
    } else {
      // Last stop - show Complete button
      concluirTour();
    }
  }

  function recuarTour() {
    if (estado.paradaTourAtual > 0) {
      estado.paradaTourAtual--;
      atualizarTour();
    }
  }

  function atualizarTour() {
    const idCorpo = PARADAS_TOUR[estado.paradaTourAtual];
    const corpo = dados.corpos.find(c => c.id === idCorpo);
    if (!corpo) return;

    motor.focar(corpo.id);

    const numElem = document.getElementById('tour-numero');
    const nomeElem = document.getElementById('tour-nome');
    const textoElem = document.getElementById('tour-texto');
    const btnProximo = document.getElementById('tour-btn-proximo');
    const btnAnterior = document.getElementById('tour-btn-anterior');

    numElem.textContent = t('paradaDe', { n: estado.paradaTourAtual + 1, m: PARADAS_TOUR.length });
    nomeElem.textContent = corpo.nome;

    let texto = '';
    if (corpo.info?.resumo) {
      texto = corpo.info.resumo;
    }
    if (corpo.info?.curiosidades && corpo.info.curiosidades.length > 0) {
      texto += ` ${corpo.info.curiosidades[0]}`;
    }
    textoElem.textContent = texto;

    btnAnterior.style.visibility = estado.paradaTourAtual === 0 ? 'hidden' : 'visible';
    btnProximo.textContent = estado.paradaTourAtual === PARADAS_TOUR.length - 1 ? t('concluir') : t('proximo');
  }

  function concluirTour() {
    progressoEvento('tour-completo');
    motor.visaoGeral();
    sairTour();
  }

  function sairTour() {
    estado.emTour = false;
    document.getElementById('tour-card').style.display = 'none';
    document.getElementById('painel-explorar').style.display = '';
  }

  function criarToastDica() {
    const div = document.createElement('div');
    div.className = 'toast-dica';
    div.id = 'toast-dica';
    div.textContent = t('toastDica');
    root.appendChild(div);

    estado.dicaMostrada = true;

    // Disappear after 8 seconds or on first click
    const timer = setTimeout(() => fecharToastDica(), 8000);

    document.addEventListener('click', (e) => {
      if (e.target !== div && !div.contains(e.target)) {
        clearTimeout(timer);
        fecharToastDica();
      }
    }, { once: true });
  }

  function fecharToastDica() {
    const toast = document.getElementById('toast-dica');
    if (toast) {
      toast.classList.add('saindo');
      setTimeout(() => toast.remove(), 220);
    }
  }

  // ============ V2: PAINEL EVENTOS ============

  function criarPainelEventos() {
    const div = document.createElement('div');
    div.className = 'painel painel-eventos';
    div.id = 'painel-eventos';

    const cabecalho = document.createElement('div');
    cabecalho.className = 'eventos-cabecalho';

    const titulo = document.createElement('h2');
    titulo.className = 'eventos-titulo';
    titulo.textContent = t('eventosTitulo');
    cabecalho.appendChild(titulo);

    const btnFechar = document.createElement('button');
    btnFechar.className = 'eventos-btn-fechar';
    btnFechar.innerHTML = '✕';
    btnFechar.onclick = fecharPainelEventos;
    cabecalho.appendChild(btnFechar);

    div.appendChild(cabecalho);

    const conteudo = document.createElement('div');
    conteudo.className = 'eventos-conteudo';
    conteudo.id = 'eventos-conteudo-inner';
    div.appendChild(conteudo);

    root.appendChild(div);
  }

  function abrirPainelEventos() {
    fecharComparador(); // Fecha comparador se aberto
    fecharCardMissao();
    if (estado.painelInfoAberto) {
      motor.selecionar(null);
      fecharPainelInfo();
      atualizarSelecaoExplorar(null);
    }

    const painel = document.getElementById('painel-eventos');
    const conteudo = document.getElementById('eventos-conteudo-inner');

    painel.classList.add('aberto');
    estado.painelEventosAberto = true;

    // Atualizar lista de eventos
    conteudo.innerHTML = '';

    if (!eventos || eventos.length === 0) {
      conteudo.innerHTML = `<p style="color: #93a0b8; font-size: 12px;">${t('semEventos')}</p>`;
      return;
    }

    const msSim = motor.getDataSimulada().getTime();

    // Next future event (calculated once, outside loop)
    const ordenados = [...eventos].sort((a, b) => Date.parse(a.dataISO) - Date.parse(b.dataISO));
    const proximoFuturo = ordenados.find(e => Date.parse(e.dataISO + 'T00:00:00Z') >= msSim) || null;

    ordenados.forEach(evento => {
      const msEvento = Date.parse(evento.dataISO + 'T00:00:00Z');

      const div = document.createElement('div');
      div.className = 'evento-item';

      const jaPassou = msEvento < msSim;
      if (jaPassou) {
        div.classList.add('evento-passado');
      }

      if (proximoFuturo && proximoFuturo.id === evento.id && !jaPassou) {
        div.classList.add('evento-proximo');
      }

      // Header: data + tipo
      const header = document.createElement('div');
      header.className = 'evento-header';

      const data = document.createElement('span');
      data.className = 'evento-data';
      data.textContent = formatarDataCurta(evento.dataISO);
      header.appendChild(data);

      const chip = document.createElement('span');
      chip.className = 'evento-chip';
      if (jaPassou) {
        chip.innerHTML = t('jaPassou');
        chip.style.background = 'rgba(120, 120, 120, 0.2)';
        chip.style.color = '#93a0b8';
      } else {
        const tipoLabel = t('tipoEvento_' + evento.tipo.replace('-', '_'));
        chip.textContent = tipoLabel;
      }
      header.appendChild(chip);

      div.appendChild(header);

      // Nome
      const nome = document.createElement('h3');
      nome.className = 'evento-nome';
      nome.textContent = evento.nome;
      div.appendChild(nome);

      // Descrição: só aparece nos eventos grátis — nos Pro, o card mostra
      // apenas o título (a descrição fica reservada a quem desbloqueou)
      if (evento.descricao && premiumTem('eventos')) {
        const desc = document.createElement('p');
        desc.className = 'evento-descricao';
        desc.textContent = evento.descricao;
        div.appendChild(desc);
      }

      // Go to date button — a viagem no tempo é a parte Pro dos eventos
      const btn = document.createElement('button');
      btn.className = 'botao evento-btn';
      btn.textContent = t('irParaData');
      btn.onclick = () => {
        if (!premiumExigir('eventos')) return;
        progressoEvento('evento-viagem', { id: evento.id });
        motor.irParaData(evento.dataISO);
        if (evento.corpoFoco) {
          motor.focar(evento.corpoFoco);
        }
      };
      if (!premiumTem('eventos')) btn.appendChild(criarSeloPro());
      div.appendChild(btn);

      conteudo.appendChild(div);
    });
  }

  function fecharPainelEventos() {
    const painel = document.getElementById('painel-eventos');
    if (painel) {
      painel.classList.remove('aberto');
      estado.painelEventosAberto = false;
    }
  }

  // ============ V2: COMPARADOR DE TAMANHOS ============

  function criarComparadorTamanhos() {
    const div = document.createElement('div');
    div.className = 'comparador-overlay';
    div.id = 'comparador-overlay';
    div.style.display = 'none';

    const painel = document.createElement('div');
    painel.className = 'comparador-painel';

    // Header
    const header = document.createElement('div');
    header.className = 'comparador-header';

    const titulo = document.createElement('h2');
    titulo.textContent = t('comparadorTitulo');
    titulo.style.margin = '0';
    titulo.style.color = '#e8edf7';
    titulo.style.fontSize = '18px';
    titulo.style.fontWeight = '600';
    header.appendChild(titulo);

    const btnFechar = document.createElement('button');
    btnFechar.className = 'comparador-btn-fechar';
    btnFechar.innerHTML = '✕';
    btnFechar.onclick = fecharComparador;
    header.appendChild(btnFechar);

    painel.appendChild(header);

    // Toggle Incluir Sol
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'comparador-toggle';

    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.gap = '8px';
    label.style.cursor = 'pointer';
    label.style.fontSize = '13px';
    label.style.color = '#e8edf7';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'comparador-incluir-sol';
    checkbox.checked = estado.incluirSolComparador;
    checkbox.onchange = () => {
      estado.incluirSolComparador = checkbox.checked;
      atualizarComparador();
    };
    label.appendChild(checkbox);

    const labelText = document.createElement('span');
    labelText.textContent = t('incluirSol');
    label.appendChild(labelText);

    toggleDiv.appendChild(label);
    painel.appendChild(toggleDiv);

    // Scroll horizontal de corpos
    const scroll = document.createElement('div');
    scroll.className = 'comparador-scroll';
    scroll.id = 'comparador-scroll';

    painel.appendChild(scroll);

    div.appendChild(painel);
    root.appendChild(div);
  }

  function abrirComparador() {
    fecharPainelEventos();
    fecharCardMissao();
    if (estado.painelInfoAberto) {
      motor.selecionar(null);
      fecharPainelInfo();
      atualizarSelecaoExplorar(null);
    }

    const overlay = document.getElementById('comparador-overlay');
    overlay.style.display = 'flex';
    estado.comparadorAberto = true;

    atualizarComparador();
  }

  function atualizarComparador() {
    const scroll = document.getElementById('comparador-scroll');
    scroll.innerHTML = '';

    // Corpos a mostrar: sol (se toggle ligado), 8 planetas, lua, plutao
    const idsCorpoCand = ['sol', 'mercurio', 'venus', 'terra', 'marte', 'jupiter', 'saturno', 'urano', 'netuno', 'lua', 'plutao'];
    const idsCorpo = estado.incluirSolComparador ? idsCorpoCand : idsCorpoCand.filter(id => id !== 'sol');

    // Single scale factor for largest body to fit in ~480px
    // PROPORTIONS between bodies are always preserved (truncating individual sizes
    // would make Jupiter and Saturn look the same)
    const corposComparador = idsCorpo.map(id => dados.corpos.find(c => c.id === id)).filter(Boolean);
    const diametroPxDe = c => ((c.raioKm || 6371) / 6371) * 56; // Terra = 56px
    const maiorPx = Math.max(...corposComparador.map(diametroPxDe));
    const fatorEscala = Math.min(1, 480 / maiorPx);

    idsCorpo.forEach(idCorpo => {
      const corpo = dados.corpos.find(c => c.id === idCorpo);
      if (!corpo) return;

      const div = document.createElement('div');
      div.className = 'comparador-corpo';

      const raioKm = corpo.raioKm || 6371;
      const diametroReal = Math.max(3, diametroPxDe(corpo) * fatorEscala);

      const circulo = document.createElement('div');
      circulo.className = 'comparador-circulo';
      circulo.style.width = diametroReal + 'px';
      circulo.style.height = diametroReal + 'px';

      // Radial gradient with appearance colors
      if (corpo.aparencia?.cores && corpo.aparencia.cores.length > 0) {
        const cores = corpo.aparencia.cores;
        const gradentStops = cores.map((cor, i) => `${cor} ${(i / (cores.length - 1)) * 100}%`).join(', ');
        circulo.style.background = `radial-gradient(circle, ${gradentStops})`;
      }

      circulo.onclick = () => {
        fecharComparador();
        motor.focar(idCorpo);
        motor.aoSelecionar(idCorpo);
      };

      div.appendChild(circulo);

      // Label and diameter
      const roteulo = document.createElement('div');
      roteulo.className = 'comparador-rotulo';
      roteulo.innerHTML = `<strong>${corpo.nome}</strong><br><span style="font-size: 11px; color: #93a0b8;">${Math.round(raioKm * 2).toLocaleString('pt-BR')} km</span>`;
      div.appendChild(roteulo);

      scroll.appendChild(div);
    });
  }

  function fecharComparador() {
    const overlay = document.getElementById('comparador-overlay');
    if (overlay) {
      overlay.style.display = 'none';
      estado.comparadorAberto = false;
    }
  }

  // ============ V2: MISSION CARD ============

  function criarCardMissao() {
    const div = document.createElement('div');
    div.className = 'card-missao';
    div.id = 'card-missao';
    div.style.display = 'none';

    div.innerHTML = `
      <div class="card-missao-corpo">
        <div class="card-missao-header">
          <h2 class="card-missao-nome" id="card-missao-nome">Mission</h2>
          <button class="card-missao-btn-fechar" id="card-missao-btn-fechar">✕</button>
        </div>
        <div class="card-missao-conteudo" id="card-missao-conteudo-inner">
        </div>
      </div>
    `;

    root.appendChild(div);

    document.getElementById('card-missao-btn-fechar').onclick = fecharCardMissao;
  }

  // Aplica um ritmo de tempo específico (dias/s) e reflete nos controles de
  // velocidade (slider, label). Usado ao começar a seguir uma missão e pelo
  // gatilho de "chegou na órbita final" (ver sim:orbita-capturada abaixo).
  function definirRitmo(diasPorSegundo) {
    const idx = VELOCIDADES.indexOf(diasPorSegundo);
    if (idx < 0) return;
    estado.indiceVelocidades = idx;
    estado.velocidadeAtual = diasPorSegundo;
    estado.velocidadeAnterior = diasPorSegundo;
    motor.setVelocidade(diasPorSegundo);
    atualizarLabelVelocidade();
    atualizarSliderVelocidade();
  }

  // Seguir a nave desde o lançamento: torna a trajetória visível, volta ao
  // dia do lançamento, trava a câmera no marcador (que viaja com o tempo) e
  // ajusta a velocidade para um ritmo em que dá pra VER a viagem acontecer.
  // Acionado ao selecionar a missão no menu E pelo botão do card.
  function seguirMissao(idMissao) {
    if (!trajetorias || !motor.seguirDinamico) return;
    const missao = missoes?.find(m => m.id === idMissao);
    if (!missao || !missao.paradas || missao.paradas.length === 0) return;

    trajetorias.setVisivel(idMissao, true);
    atualizarIconeOlho(idMissao, true);
    motor.irParaData(missao.paradas[0].data);
    motor.seguirDinamico(
      () => trajetorias.posicaoDaNave(idMissao),
      trajetorias.distanciaCameraSugerida(idMissao),
      idMissao
    );
    // Missões curtas (Apollo/Artemis, ~8-10 dias) declaram velocidadeSeguir: 1
    definirRitmo(missao.velocidadeSeguir || 7);
  }

  // Juno/Cassini (órbita de captura): durante o cruzeiro o usuário costuma
  // acelerar bastante pra ver a viagem passar rápido, mas isso fica ruim de
  // acompanhar assim que a nave entra na órbita final ao redor do planeta.
  // trajetorias.js dispara este evento UMA VEZ no instante da entrada (não a
  // cada frame) — baixamos para 1 dia/s aqui, e o usuário pode mudar de novo
  // livremente depois, sem o evento reimpor nada.
  if (trajetorias) {
    document.addEventListener('sim:orbita-capturada', () => {
      definirRitmo(1);
    });
  }

  function abrirCardMissao(idMissao) {
    fecharPainelEventos();
    fecharComparador();
    if (estado.painelInfoAberto) {
      motor.selecionar(null);
      fecharPainelInfo();
      atualizarSelecaoExplorar(null);
    }

    const missao = missoes?.find(m => m.id === idMissao);
    if (!missao) return;

    progressoEvento('missao-vista', { id: idMissao });

    const card = document.getElementById('card-missao');
    card.style.display = 'block';
    estado.cardMissaoAberto = true;
    estado.missaoSelecionada = idMissao;

    // Update content
    const nomeElem = document.getElementById('card-missao-nome');
    nomeElem.textContent = missao.nome;

    const conteudo = document.getElementById('card-missao-conteudo-inner');
    conteudo.innerHTML = '';

    // Estado
    if (missao.estado) {
      const estado = document.createElement('div');
      estado.className = 'card-missao-estado';
      estado.textContent = missao.estado;
      conteudo.appendChild(estado);
    }

    // Description
    if (missao.descricao) {
      const desc = document.createElement('p');
      desc.className = 'card-missao-descricao';
      desc.textContent = missao.descricao;
      conteudo.appendChild(desc);
    }

    // Timeline de paradas
    if (missao.paradas && missao.paradas.length > 0) {
      const timelineDiv = document.createElement('div');
      timelineDiv.className = 'card-missao-timeline';

      missao.paradas.forEach((parada, idx) => {
        const item = document.createElement('div');
        item.className = 'card-missao-parada';

        const rotulo = document.createElement('div');
        rotulo.className = 'card-missao-parada-rotulo';
        rotulo.textContent = parada.rotulo;
        item.appendChild(rotulo);

        const data = document.createElement('button');
        data.className = 'card-missao-parada-data';
        data.textContent = formatarDataCurta(parada.data);
        data.title = t('irParaData');
        data.onclick = () => motor.irParaData(parada.data);
        item.appendChild(data);

        timelineDiv.appendChild(item);
      });

      conteudo.appendChild(timelineDiv);
    }

    // Go to launch button
    if (missao.paradas && missao.paradas.length > 0) {
      const btn = document.createElement('button');
      btn.className = 'botao card-missao-btn-lancamento';
      btn.textContent = t('irParaLancamento');
      btn.onclick = () => {
        motor.irParaData(missao.paradas[0].data);
      };
      conteudo.appendChild(btn);

      // Seguir a nave: mesmo comportamento acionado ao selecionar a missão
      // no menu — o botão fica no card para re-acionar quando o usuário quiser
      if (trajetorias && motor.seguirDinamico) {
        const btnSeguir = document.createElement('button');
        btnSeguir.className = 'botao card-missao-btn-lancamento';
        btnSeguir.textContent = t('seguirNave');
        btnSeguir.onclick = () => seguirMissao(idMissao);
        conteudo.appendChild(btnSeguir);
      }
    }

    // Enable trajectory visibility (and reflect in side eye icon)
    if (trajetorias) {
      trajetorias.setVisivel(idMissao, true);
      trajetorias.setSelecionada(idMissao);
      atualizarIconeOlho(idMissao, true);
    }
  }

  function fecharCardMissao() {
    const card = document.getElementById('card-missao');
    if (card) {
      card.style.display = 'none';
      estado.cardMissaoAberto = false;
      if (estado.missaoSelecionada && trajetorias) {
        trajetorias.setSelecionada(null);
      }
      estado.missaoSelecionada = null;
    }
  }

  // ============ IMPROVED ESC CHAIN ============

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      // Order: comparator > mission card > events panel > info panel/tour (v1).
      // stopImmediatePropagation prevents v1 handler from closing ANOTHER panel
      // on same Esc (preventDefault doesn't block other listeners).
      if (estado.comparadorAberto) {
        fecharComparador();
        e.stopImmediatePropagation();
      } else if (estado.cardMissaoAberto) {
        fecharCardMissao();
        e.stopImmediatePropagation();
      } else if (estado.painelEventosAberto) {
        fecharPainelEventos();
        e.stopImmediatePropagation();
      }
      // Rest is handled by v1 handler
    }
  }, true); // capture phase para rodar antes do handler v1
}
