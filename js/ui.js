import { t, formatarDataLonga, formatarDataCurta, ordinal, trocarIdioma, getIdioma } from './i18n.js?v=5';

export function iniciarUI({ motor, dados, eventos, missoes, trajetorias, premium, abrirQuiz, abrirVoce }) {
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
    indiceVelocidades: 7, // index for 1 day/s (initial motor state)
    painelEventosAberto: false,
    comparadorAberto: false,
    cardMissaoAberto: false,
    modoIncluirSolComparador: false,
    incluirSolComparador: false,
    missaoSelecionada: null,
  };

  const VELOCIDADES = [-3650, -365, -90, -30, -7, -1, 0, 1, 7, 30, 90, 365, 3650];
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
    `;
    root.appendChild(div);
  }

  function criarBarraAcoes() {
    const div = document.createElement('div');
    div.className = 'barra-acoes';

    // Seletor de idioma (primeiro item)
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

    div.appendChild(seletorDiv);

    // Events button (if available)
    if (eventos) {
      const btnEventos = document.createElement('button');
      btnEventos.className = 'botao';
      btnEventos.id = 'btn-eventos';
      btnEventos.innerHTML = t('btnEventos');
      // Provinha: a LISTA de eventos é grátis (vitrine); só a ação de viajar
      // até a data é Pro — gate fica em cada botão "Ir para a data"
      btnEventos.onclick = () => {
        progressoEvento('abriu-eventos');
        abrirPainelEventos();
      };
      div.appendChild(btnEventos);
    }

    // Size Comparison button
    const btnComparador = document.createElement('button');
    btnComparador.className = 'botao';
    btnComparador.id = 'btn-comparador';
    btnComparador.innerHTML = t('btnTamanhos');
    btnComparador.onclick = () => {
      progressoEvento('abriu-comparador');
      abrirComparador();
    };
    div.appendChild(btnComparador);

    // Quiz Espacial (módulo js/quiz.js, injetado pelo main.js)
    if (abrirQuiz) {
      const btnQuiz = document.createElement('button');
      btnQuiz.className = 'botao';
      btnQuiz.id = 'btn-quiz';
      btnQuiz.innerHTML = t('btnQuiz');
      btnQuiz.onclick = () => {
        progressoEvento('abriu-quiz');
        abrirQuiz();
      };
      div.appendChild(btnQuiz);
    }

    // Você no Espaço (módulo js/voce-no-espaco.js)
    if (abrirVoce) {
      const btnVoce = document.createElement('button');
      btnVoce.className = 'botao';
      btnVoce.id = 'btn-voce';
      btnVoce.innerHTML = t('btnVoce');
      btnVoce.onclick = () => {
        progressoEvento('abriu-voce');
        abrirVoce();
      };
      div.appendChild(btnVoce);
    }

    // Tour button
    const btnTour = document.createElement('button');
    btnTour.className = 'botao';
    btnTour.innerHTML = t('btnTour');
    btnTour.onclick = iniciarTour;
    div.appendChild(btnTour);

    // Toggle Escala
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
    div.appendChild(divEscala);

    // Orbits toggle
    const btnOrbitas = document.createElement('button');
    btnOrbitas.className = 'botao toggle-ativo';
    btnOrbitas.textContent = t('btnOrbitas');
    btnOrbitas.onclick = () => {
      estado.orbitasVisiveis = !estado.orbitasVisiveis;
      motor.setOrbitasVisiveis(estado.orbitasVisiveis);
      btnOrbitas.classList.toggle('toggle-ativo');
    };
    div.appendChild(btnOrbitas);

    // Labels toggle
    const btnRotulos = document.createElement('button');
    btnRotulos.className = 'botao toggle-ativo';
    btnRotulos.textContent = t('btnRotulos');
    btnRotulos.onclick = () => {
      estado.rotulosVisiveis = !estado.rotulosVisiveis;
      motor.setRotulosVisiveis(estado.rotulosVisiveis);
      btnRotulos.classList.toggle('toggle-ativo');
    };
    div.appendChild(btnRotulos);

    // Overview button
    const btnVisaoGeral = document.createElement('button');
    btnVisaoGeral.className = 'botao';
    btnVisaoGeral.innerHTML = t('btnVisaoGeral');
    btnVisaoGeral.onclick = () => motor.visaoGeral();
    div.appendChild(btnVisaoGeral);

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
          const elem = document.createElement('div');
          elem.className = 'explorar-item';
          elem.id = `explorar-item-${corpo.id}`;

          let label = corpo.nome;
          if (corpo.tipo === 'planeta' && corpo.ordemDoSol) {
            const ordinalStr = ordinal(corpo.ordemDoSol);
            label = `${ordinalStr} ${corpo.nome}`;
          }

          elem.textContent = label;
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
              itemLua.onclick = () => {
                motor.focar(lua.id);
                motor.aoSelecionar(lua.id);
              };
              divGrupo.appendChild(itemLua);
            });
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
  }

  // Function to update mission eye icon
  function atualizarIconeOlho(idMissao, visivel) {
    const btn = document.getElementById(`olho-missao-${idMissao}`);
    if (btn) {
      btn.innerHTML = visivel ? '◉' : '◎';
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
    } else if (vel === 1) {
      elem.textContent = t('umDiaPorSegundo');
    } else if (vel > 1) {
      elem.textContent = t('diasPorSegundo', { n: vel });
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

    // Nome
    html += `<h2 class="info-nome">${corpo.nome}</h2>`;

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

        const data = document.createElement('div');
        data.className = 'card-missao-parada-data';
        data.textContent = formatarDataCurta(parada.data);
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

      // Seguir a nave: volta ao lançamento, trava a câmera no marcador da
      // missão (que segue viajando conforme o tempo avança) e ajusta a
      // velocidade para um ritmo em que dá para VER a viagem acontecer
      if (trajetorias && motor.seguirDinamico) {
        const btnSeguir = document.createElement('button');
        btnSeguir.className = 'botao card-missao-btn-lancamento';
        btnSeguir.textContent = t('seguirNave');
        btnSeguir.onclick = () => {
          trajetorias.setVisivel(idMissao, true);
          atualizarIconeOlho(idMissao, true);
          motor.irParaData(missao.paradas[0].data);
          motor.seguirDinamico(
            () => trajetorias.posicaoDaNave(idMissao),
            trajetorias.distanciaCameraSugerida(idMissao)
          );
          const idxRitmo = VELOCIDADES.indexOf(7);
          if (idxRitmo >= 0) {
            estado.indiceVelocidades = idxRitmo;
            estado.velocidadeAtual = 7;
            estado.velocidadeAnterior = 7;
            motor.setVelocidade(7);
            atualizarLabelVelocidade();
            atualizarSliderVelocidade();
          }
        };
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
