// Vetores assintóticos ideais: Vplaneta=1 e |v∞|=1 em unidades do modelo.
// Não integra órbita, distância mínima, atração durante o encontro ou efemérides.
export function vetoresAssistencia(angulo,efeito='ganhar') {
 const a=Math.max(0,Math.min(180,Number(angulo)||0))*Math.PI/360;
 const side=efeito==='perder'?-1:1;
 const entrada={x:-side*Math.sin(a),y:Math.cos(a)},saida={x:side*Math.sin(a),y:Math.cos(a)};
 const planeta={x:1,y:0};
 const solarEntrada={x:entrada.x+1,y:entrada.y},solarSaida={x:saida.x+1,y:saida.y};
 const modulo=v=>Math.hypot(v.x,v.y);
 const energia=v=>(v.x*v.x+v.y*v.y)/2;
 return {entrada,saida,planeta,solarEntrada,solarSaida,velocidadeEntrada:modulo(efeito==='planeta'?entrada:solarEntrada),velocidadeSaida:modulo(efeito==='planeta'?saida:solarSaida),deltaEnergia:efeito==='planeta'?0:energia(solarSaida)-energia(solarEntrada)};
}
