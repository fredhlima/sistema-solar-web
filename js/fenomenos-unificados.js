// IDs antigos continuam aceitos sem alterar nem apagar seus dados armazenados.
const ALIASES = Object.freeze({estacoes:'estacoes-guia','terra-ano':'estacoes-guia',mares:'mares-guia','mares-oceano':'mares-guia'});
export const resolverFenomeno = id => ALIASES[id] || id;
export const modoDoFenomeno = id => ({'estacoes-guia':'estacoes','mares-guia':'mares'})[resolverFenomeno(id)] || null;

import {normalizarEstadoMares} from './mares-laboratorio.js?v=303';
import {forcaRelativaAMinima} from './mares-calc.js?v=303';

// O laboratório antigo guardava amplitude bruta: recalcule-a a partir dos
// parâmetros validados antes de expressá-la na régua usada pela cena 3D.
export function medicaoMareLegada(valor) {
 const medida=normalizarEstadoMares({medicoes:{a:valor}}).medicoes.a;
 return medida ? {...medida,razao:forcaRelativaAMinima(medida.amplitude)} : null;
}

export function historicoFenomeno(dados, idioma='pt') {
 let registro;
 try { registro=typeof dados==='string'?JSON.parse(dados):dados; } catch (_) { return null; }
 if(!registro || typeof registro!=='object' || typeof registro.concluido!=='boolean' ||
    !(registro.concluido || registro.iniciado===true || Number.isInteger(registro.passo)&&registro.passo>0)) return null;
 const estado=registro.concluido?'concluido':'iniciado';
 const textos={
  pt:{concluido:'Você já concluiu a investigação anterior; seus registros foram preservados. Explore agora a lição integrada.',iniciado:'Você iniciou a investigação anterior; seu progresso e seus registros foram preservados. Explore agora a lição integrada.'},
  en:{concluido:'You completed the previous investigation; your records have been preserved. Explore the integrated lesson now.',iniciado:'You started the previous investigation; your progress and records have been preserved. Explore the integrated lesson now.'},
  es:{concluido:'Ya completaste la investigación anterior; tus registros se han conservado. Explora ahora la lección integrada.',iniciado:'Iniciaste la investigación anterior; tu progreso y tus registros se han conservado. Explora ahora la lección integrada.'}
 };
 return {estado,texto:(textos[idioma]||textos.pt)[estado]};
}
