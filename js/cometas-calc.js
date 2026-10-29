// Elipse didática, a=1, e=0,55. Ângulo é anomalia excêntrica, não tempo.
export function geometriaCometa(angulo){
 const E=Number(angulo)*Math.PI/180,e=.55,b=Math.sqrt(1-e*e),x=e-Math.cos(E),y=b*Math.sin(E),r=Math.hypot(x,y),vx=Math.sin(E),vy=b*Math.cos(E),v=Math.hypot(vx,vy);
 return{x,y,distancia:r,cauda:{x:x/r,y:y/r},movimento:{x:vx/v,y:vy/v},intensidadeDidatica:(1.55-r)/1.1};
}
