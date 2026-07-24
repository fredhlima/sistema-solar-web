import { DADOS } from './dados.js?v=22';
import { SistemaSolar3D } from './motor3d.js?v=39';
import { iniciarUI } from './ui.js?v=35';
import { EVENTOS } from './eventos.js?v=9';
import { MISSOES } from './missoes.js?v=12';
import { Trajetorias } from './trajetorias.js?v=20';
import { carregarConteudoTraduzido, aplicarTraducoes, aplicarHtml, t } from './i18n.js?v=19';
import { criarPremium } from './premium.js?v=3';
import { iniciarPaywall } from './paywall.js?v=4';
import { iniciarQuiz } from './quiz.js?v=10';
import { iniciarVoceNoEspaco } from './voce-no-espaco.js?v=3';
import { iniciarProgresso } from './progresso.js?v=5';
import { iniciarMusica } from './musica.js?v=6';

// i18n: aplica o overlay do idioma ANTES de montar motor e UI
const traducao = await carregarConteudoTraduzido();
aplicarTraducoes(DADOS, EVENTOS, MISSOES, traducao);
aplicarHtml();

const canvas = document.getElementById('cena');
const motor = new SistemaSolar3D(canvas, DADOS);
motor.iniciar();

const trajetorias = new Trajetorias(motor, MISSOES);
trajetorias.iniciar();
motor.aoMudarEscala = () => trajetorias.reconstruir();

// Freemium: premium mockado (Play Billing/RevenueCat entra na casca nativa).
// O paywall inicia PRIMEIRO de propósito: seu listener de Esc (capture) fica
// à frente dos do quiz/você/UI, então Esc fecha o paywall que está por cima
// em vez do painel por baixo dele.
const premium = criarPremium();
iniciarPaywall({ premium, t });
// Caixa mutável: o quiz é criado antes da música (o botão ♫ da música só
// pode nascer depois de iniciarUI() montar .barra-acoes), então o quiz
// recebe um getter indireto que passa a apontar pro AudioContext real da
// música assim que ela iniciar — evita 2 AudioContext vivos ao mesmo tempo.
const audioCompartilhado = { obterCtx: () => null };
const quiz = iniciarQuiz({ motor, dados: DADOS, premium, obterCtxCompartilhado: () => audioCompartilhado.obterCtx() });
const voce = iniciarVoceNoEspaco({ dados: DADOS, premium });
const progresso = iniciarProgresso({ dados: DADOS });
iniciarUI({
  motor, dados: DADOS, eventos: EVENTOS, missoes: MISSOES, trajetorias, premium,
  abrirQuiz: quiz.abrir, abrirVoce: voce.abrir,
});
// Música de fundo: depois da UI, para o botão ♫ entrar na .barra-acoes
const musica = iniciarMusica();
audioCompartilhado.obterCtx = musica.obterCtx;

// Smart default (redução de fadiga de decisão): no PRIMEIRO acesso, em vez de
// deixar o usuário diante do sistema inteiro sem saber onde clicar entre 45
// astros, a câmera pousa gentilmente na Terra — nosso lar, o ponto de partida
// mais relacionável. Só na 1ª vez; depois respeita a exploração livre.
try {
  const CHAVE_VISTO = 'sistema-solar-visto';
  if (!localStorage.getItem(CHAVE_VISTO)) {
    localStorage.setItem(CHAVE_VISTO, '1');
    setTimeout(() => {
      // Não sequestra a câmera se o usuário já focou um astro nesses 1,6s
      // (clicou na lista/cena) — só pousa na Terra se nada foi escolhido.
      // Isso também torna benigno o caso de localStorage bloqueado (modo
      // privado): no máximo pousa na Terra por acesso, nunca por cima de algo.
      if (!motor.corpoFocado) motor.focar('terra');
    }, 1600);
  }
} catch (e) { /* sem localStorage: abre na visão geral, sem problema */ }

// Exposto para depuração no console do navegador
window.__motor = motor;
window.__trajetorias = trajetorias;
window.__premium = premium;
window.__progresso = progresso;
window.__musica = musica;

// Ponte de depuração via DOM (funciona mesmo em contextos JS isolados):
// dispare `document.dispatchEvent(new Event('sim:dump'))` e leia
// `document.documentElement.dataset.simDump`.
document.documentElement.dataset.simulador = 'ok';
document.addEventListener('sim:dump', () => {
  const corpos = {};
  for (const [id, f] of motor.corposFisicos.entries()) {
    const p = f.grupoOrbita.position;
    corpos[id] = {
      raio: Math.round((f.escala.raio || 0) * 100) / 100,
      dist: Math.round(Math.sqrt(p.x * p.x + p.z * p.z) * 10) / 10,
    };
  }
  document.documentElement.dataset.simDump = JSON.stringify({
    n: motor.corposFisicos.size,
    data: motor.getDataSimulada().toISOString().slice(0, 10),
    vel: motor.velocidade,
    escala: motor.escala,
    canvas: `${motor.renderer.domElement.width}x${motor.renderer.domElement.height}`,
    corpos,
  });
});
// Renderiza um frame sob demanda (mesmo com a aba oculta, sem rAF) e grava
// estatísticas de brilho em data-attribute — usado para verificação visual
// automatizada. Opcional: data-sim-frame-cam = {"focar":"terra"} aproxima a câmera.
document.addEventListener('sim:frame', () => {
  try {
    // Janela oculta inicializa o canvas com 0x0; força um tamanho para o teste
    if (motor.renderer.domElement.width === 0) {
      motor.renderer.setSize(1280, 720);
      motor.camera.aspect = 1280 / 720;
      motor.camera.updateProjectionMatrix();
    }
    const cfg = JSON.parse(document.documentElement.dataset.simFrameCam || 'null');
    if (cfg && cfg.focar) {
      const f = motor.corposFisicos.get(cfg.focar);
      if (f) {
        const p = f.grupoOrbita.position;
        const d = (cfg.dist || 6);
        motor.camera.position.set(p.x + d, p.y + d * 0.4, p.z + d);
        motor.camera.lookAt(p.x, p.y, p.z);
      }
    }
    motor.renderer.render(motor.scene, motor.camera);
    const c = motor.renderer.domElement;
    const mini = document.createElement('canvas');
    mini.width = 160;
    mini.height = 90;
    const mctx = mini.getContext('2d');
    mctx.drawImage(c, 0, 0, 160, 90);
    const px = mctx.getImageData(0, 0, 160, 90).data;
    let soma = 0;
    let claros = 0;
    for (let i = 0; i < px.length; i += 4) {
      const b = (px[i] + px[i + 1] + px[i + 2]) / 3;
      soma += b;
      if (b > 40) claros++;
    }
    document.documentElement.dataset.simFrameInfo = JSON.stringify({
      brilhoMedio: Math.round(soma / (px.length / 4)),
      pixelsClaros: claros,
      total: px.length / 4,
    });
  } catch (err) {
    document.documentElement.dataset.simFrameInfo = 'erro: ' + err.message;
  }
});

document.addEventListener('sim:cmd', (e) => {
  try {
    const { metodo, arg } = JSON.parse(document.documentElement.dataset.simCmd || '{}');
    const r = motor[metodo](arg);
    document.documentElement.dataset.simCmdResultado = JSON.stringify(r === undefined ? 'ok' : r);
  } catch (err) {
    document.documentElement.dataset.simCmdResultado = 'erro: ' + err.message;
  }
});
