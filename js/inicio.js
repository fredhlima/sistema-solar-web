// inicio.js — cartões do Início (Lote C da proposta integrada, seção 3.1).
// Módulo puro: não toca no DOM da página nem lê globais; recebe tudo por
// parâmetro. navegacao.js injeta aprendizado, eventos e as ações (abrir
// capítulo, painel de eventos, desafio, progresso) e coloca `el` no menu.
//
// Os elementos são criados uma vez; `atualizar()` só muda texto, atributos e
// visibilidade — assim o foco e o botão de origem de uma atividade continuam
// existindo quando a pessoa volta ao Início.

const SOL = 'sol';

export function montarInicio({
  t,
  aprendizado,
  percurso = [],
  ordem = [], // ids de capítulos na ordem das trilhas (sugestão depois do percurso essencial)
  eventos = null,
  capituloDoEvento = () => null,
  formatarData = (iso) => iso,
  hoje = () => {
    const d = new Date();
    const dois = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`;
  },
  acoes = {},
  progresso = () => null,
}) {
  const criar = (tag, texto, cls) => {
    const el = document.createElement(tag);
    if (texto) el.textContent = texto;
    if (cls) el.className = cls;
    return el;
  };
  const botao = (cls) => {
    const b = criar('button', null, cls);
    b.type = 'button';
    return b;
  };

  const el = criar('section', null, 'inicio');
  el.setAttribute('aria-label', t('inicioTitulo'));

  // 1. Cartão principal: continuar / começar
  const continuar = botao('inicio-cartao inicio-continuar');
  const contRotulo = criar('small', null, 'inicio-rotulo');
  const contTitulo = criar('strong');
  const contSub = criar('span', null, 'inicio-sub');
  continuar.append(contRotulo, contTitulo, contSub);

  // 2. No céu agora
  const ceu = criar('div', null, 'inicio-cartao inicio-ceu');
  const ceuTitulo = criar('small', t('inicioCeuAgora'), 'inicio-rotulo');
  const ceuNome = criar('strong');
  const ceuData = criar('span', null, 'inicio-sub');
  const ceuAcoes = criar('div', null, 'inicio-ceu-acoes');
  const ceuVer = botao('inicio-ceu-ver');
  ceuVer.textContent = t('inicioVer');
  const ceuCapitulo = botao('inicio-ceu-capitulo');
  ceuCapitulo.textContent = t('encaixeVerCapitulo');
  ceuAcoes.append(ceuVer, ceuCapitulo);
  const ceuVazio = criar('span', t('inicioCeuVazio'), 'inicio-sub inicio-ceu-vazio');
  ceu.append(ceuTitulo, ceuNome, ceuData, ceuVazio, ceuAcoes);

  // 3. Desafio rápido
  const desafio = botao('inicio-cartao inicio-desafio');
  desafio.append(criar('strong', t('inicioDesafio')), criar('span', t('inicioDesafioNota'), 'inicio-sub'));

  // 4. Seu progresso
  const prog = botao('inicio-cartao inicio-progresso');
  const progRotulo = criar('small', t('inicioProgresso'), 'inicio-rotulo');
  const progNivel = criar('strong');
  const progSub = criar('span', null, 'inicio-sub');
  prog.append(progRotulo, progNivel, progSub);

  el.append(continuar, ceu, desafio, prog);

  const estado = { continuar: null, ceu: null, capituloCeu: null };

  function escolherCapitulo() {
    const cat = aprendizado.catalogo();
    const porId = new Map(cat.map((r) => [r.id, r]));
    const resumo = (id) => aprendizado.resumo(id) || {};
    // 1. capítulo iniciado e não concluído, o de atividade mais recente
    const iniciado = cat
      .filter((r) => r.iniciado && !r.concluido)
      .sort((a, b) => (b.ultimaAtividade || 0) - (a.ultimaAtividade || 0))[0];
    if (iniciado) return { tipo: 'continuar', roteiro: iniciado };
    // 2. nada iniciado nem concluído: novato, começa pelo Sol
    const algumConcluido = cat.some((r) => r.concluido);
    if (!algumConcluido) {
      const sol = porId.get(SOL) || porId.get(percurso[0]);
      return sol ? { tipo: 'comecar', roteiro: sol } : null;
    }
    // 3. próximo do percurso essencial; 4. depois, o primeiro capítulo
    // grátis (ou, na falta, qualquer um) que ainda não foi concluído
    const proximoEssencial = percurso.map((id) => porId.get(id)).find((r) => r && !resumo(r.id).concluido);
    if (proximoEssencial) return { tipo: 'continuar', roteiro: proximoEssencial };
    const universo = ordem.length ? ordem.map((id) => porId.get(id)).filter(Boolean) : cat;
    const pendentes = universo.filter((r) => !r.concluido);
    const sugestao = pendentes.find((r) => !r.pro) || pendentes[0];
    return sugestao ? { tipo: 'continuar', roteiro: sugestao } : null; // tudo concluído: o cartão some
  }

  function proximoEvento() {
    if (!Array.isArray(eventos) || !eventos.length) return null;
    const dia = hoje();
    return eventos
      .filter((e) => e && e.dataISO >= dia)
      .sort((a, b) => (a.dataISO < b.dataISO ? -1 : a.dataISO > b.dataISO ? 1 : 0))[0] || null;
  }

  function atualizar() {
    // Cartão principal
    const escolha = escolherCapitulo();
    estado.continuar = escolha ? escolha.roteiro.id : null;
    continuar.hidden = !escolha;
    if (escolha) {
      const r = escolha.roteiro;
      const s = aprendizado.resumo(r.id) || {};
      if (escolha.tipo === 'comecar') {
        contRotulo.textContent = '';
        contTitulo.textContent = t('inicioComecar');
        contSub.textContent = '';
        continuar.setAttribute('aria-label', t('inicioComecar'));
      } else {
        contRotulo.textContent = t('inicioContinuar');
        contTitulo.textContent = r.titulo;
        contSub.textContent = s.iniciado && s.total ? `${s.passo + 1}/${s.total}` : '';
        continuar.setAttribute('aria-label', `${t('inicioContinuar')}: ${r.titulo}`);
      }
      contRotulo.hidden = !contRotulo.textContent;
      contSub.hidden = !contSub.textContent;
      continuar.dataset.capitulo = r.id;
      continuar.onclick = () => acoes.abrirCapitulo?.(r.id, continuar);
    } else {
      delete continuar.dataset.capitulo;
    }

    // No céu agora
    const temEventos = Array.isArray(eventos) && !!acoes.abrirEventos;
    ceu.hidden = !temEventos;
    const ev = temEventos ? proximoEvento() : null;
    estado.ceu = ev ? ev.id : null;
    ceuNome.hidden = ceuData.hidden = ceuAcoes.hidden = !ev;
    ceuVazio.hidden = !!ev;
    estado.capituloCeu = null;
    if (ev) {
      ceuNome.textContent = ev.nome;
      ceuData.textContent = formatarData(ev.dataISO);
      ceuVer.onclick = () => acoes.abrirEventos?.(ceuVer);
      const cap = capituloDoEvento(ev);
      estado.capituloCeu = cap;
      ceuCapitulo.hidden = !cap;
      ceuCapitulo.onclick = () => cap && acoes.abrirCapitulo?.(cap, ceuCapitulo);
    }

    // Desafio rápido
    desafio.hidden = !acoes.abrirDesafio;
    desafio.onclick = () => acoes.abrirDesafio?.(desafio);

    // Progresso
    const p = progresso();
    prog.hidden = !acoes.abrirProgresso || !p;
    if (p) {
      progNivel.textContent = `${p.icone ? p.icone + ' ' : ''}${p.nome || ''}`.trim();
      progSub.textContent = Number.isFinite(p.xp) ? `${p.xp} XP` : '';
    }
    prog.onclick = () => acoes.abrirProgresso?.(prog);
  }

  atualizar();
  return { el, atualizar, estado: () => ({ ...estado }) };
}
