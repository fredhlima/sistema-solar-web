import * as T from 'three';
import {PARTES} from './saturno-v-data.js?v=3';
import {criarPecaSaturnoNASA,criarModuloLunarNASA} from './apollo-nasa.js?v=2';

export function criarSaturnoV(){
 const white=new T.MeshStandardMaterial({color:0xe8e8df,roughness:.7,metalness:.04});
 const dark=new T.MeshStandardMaterial({color:0x171b1e,roughness:.63,metalness:.18});
 const silver=new T.MeshStandardMaterial({color:0x92999d,roughness:.36,metalness:.72});
 const root=new T.Group(),groups=new Map(),panels=[],legs=[];
 function add(g,geometry,material,x=0,y=0,z=0){const mesh=new T.Mesh(geometry,material.clone());mesh.position.set(x,y,z);g.add(mesh);return mesh;}
 function cyl(g,rt,rb,h,y,material=white,x=0,z=0){return add(g,new T.CylinderGeometry(rt,rb,h,48),material,x,y,z);}
 function engine(g,x,z,y,size){
  const profile=[[.92,-1.25],[.86,-1.04],[.65,-.55],[.37,.2],[.29,.65],[.38,1.12]].map(([r,h])=>new T.Vector2(r*size,h*size));
  const bell=add(g,new T.LatheGeometry(profile,48),silver,x,y,z);bell.userData.engine=true;bell.material.side=T.DoubleSide;
  cyl(g,.28*size,.28*size,.16*size,y+.7*size,dark,x,z);
 }
 function texture(draw,w=512,h=256){const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const context=canvas.getContext('2d');draw(context,w,h);const result=new T.CanvasTexture(canvas);result.colorSpace=T.SRGBColorSpace;return result;}
 function flagTexture(){return texture((ctx,w,h)=>{const stripe=h/13;for(let i=0;i<13;i++){ctx.fillStyle=i%2?'#f0eee7':'#a61e2c';ctx.fillRect(0,i*stripe,w,stripe+1);}ctx.fillStyle='#263a69';ctx.fillRect(0,0,w*.4,stripe*7);ctx.fillStyle='#fff';for(let row=0;row<9;row++)for(let col=0;col<(row%2?5:6);col++){const x=(col+.7+(row%2?.5:0))*w*.4/6.4,y=(row+.7)*stripe*7/9.4;ctx.fillRect(x-1.5,y-1.5,3,3);}});}
 function wordTexture(text,color='#b3242c',vertical=false){return texture((ctx,w,h)=>{ctx.fillStyle='rgba(0,0,0,0)';ctx.fillRect(0,0,w,h);ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${vertical?Math.floor(h/(text.length+1)):Math.floor(h*.48)}px Arial, sans-serif`;if(vertical)[...text].forEach((letter,i)=>ctx.fillText(letter,w/2,(i+.7)*h/text.length));else ctx.fillText(text,w/2,h/2);},vertical?160:512,vertical?720:180);}
 function decal(g,map,w,h,x,y,z,rotationY=0){const material=new T.MeshStandardMaterial({map,transparent:true,alphaTest:.02,roughness:.72,metalness:.02,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2});const mesh=add(g,new T.PlaneGeometry(w,h),material,x,y,z);mesh.rotation.y=rotationY;return mesh;}
 function paintArc(g,r,h,y,start,arc){const mesh=add(g,new T.CylinderGeometry(r+.018,r+.018,h,40,1,true,start,arc),dark,0,y);mesh.material.side=T.DoubleSide;return mesh;}
 const flag=flagTexture(),usa=wordTexture('USA','#b3242c',true),united=wordTexture('UNITED STATES','#22272a');

 for(const p of PARTES){
  const g=new T.Group();g.name=p.id;g.userData.part=p.id;g.position.y=p.base;root.add(g);groups.set(p.id,g);
  if(p.id==='sla'){
   for(let k=0;k<4;k++){
    const panel=new T.Group();const start=k*Math.PI/2+.014,arc=Math.PI/2-.028;
    const outer=add(panel,new T.CylinderGeometry(2,3.3,7,40,1,true,start,arc),white,0,3.5);outer.material.side=T.DoubleSide;
    const inner=add(panel,new T.CylinderGeometry(1.92,3.22,6.94,40,1,true,start,arc),dark,0,3.5);inner.material.side=T.DoubleSide;
    panel.userData.panel=k+1;g.add(panel);panels.push({panel,a:k*Math.PI/2+Math.PI/4});
   }
  }else if(p.id==='lm'){
   const model=criarModuloLunarNASA();model.position.set(0,.05,0);g.add(model);
  }else{
   g.add(criarPecaSaturnoNASA(p.id));
   if(p.id==='sii'){
    engine(g,0,0,1.0,.88);for(let k=0;k<4;k++){const a=k*Math.PI/2+Math.PI/4;engine(g,Math.cos(a)*2.8,Math.sin(a)*2.8,1.0,.88);}
   }
   if(p.id==='sivb')engine(g,0,0,.75,1.18);
   if(p.id==='sic'){
    for(let k=0;k<4;k++){paintArc(g,5.56,9,6.5,k*Math.PI/2-.24,.48);paintArc(g,5.56,3.7,39.8,k*Math.PI/2-.21,.42);}
    decal(g,flag,2.45,1.28,0,30.5,5.62);decal(g,usa,1.05,5,0,20.5,5.63);
   }
   if(p.id==='sii'){
    for(let k=0;k<4;k++){paintArc(g,5.56,3.2,2.1,k*Math.PI/2-.28,.56);paintArc(g,5.56,3.8,19.4,k*Math.PI/2-.24,.48);}
    decal(g,united,3.6,.75,0,12.4,5.62);
   }
   if(p.id==='sivb')for(let k=0;k<4;k++)paintArc(g,4.46,3.6,2.4,k*Math.PI/2-.3,.6);
   if(p.id==='cm'){decal(g,flag,.66,.35,-.4,1.85,1.42);decal(g,united,1.12,.38,.3,1.85,1.43);}
  }
  g.traverse(object=>{if(object.isMesh){object.userData.part=p.id;if(object.material.emissive)object.userData.baseEmissive=object.material.emissive.clone();}});
 }
 root.updateMatrixWorld(true);
 return {root,groups,panels,legs};
}
