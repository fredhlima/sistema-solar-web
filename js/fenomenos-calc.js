// Experimentos ideais por ângulo; não são efemérides nem previsões locais.
export function faseLunarIdeal(angulo){return (1-Math.cos(angulo*Math.PI/180))/2;}
export function luzLunar(x,y,angulo){const z=Math.sqrt(Math.max(0,1-x*x-y*y)),a=angulo*Math.PI/180;return x*Math.sin(a)-z*Math.cos(a);}
