import * as T from 'three';
import {PARTES} from './saturno-v-data.js?v=2';

export function criarSaturnoV(){
const white=new T.MeshStandardMaterial({color:0xe9e9df,roughness:.55,metalness:.12});
const black=new T.MeshStandardMaterial({color:0x121a21,roughness:.65,metalness:.2});
const silver=new T.MeshStandardMaterial({color:0xadb5bc,roughness:.32,metalness:.8});
const gold=new T.MeshStandardMaterial({color:0xc49b48,roughness:.48,metalness:.65});
const windowMat=new T.MeshStandardMaterial({color:0x08273b,metalness:.75,roughness:.12});
const root=new T.Group();const groups=new Map(),panels=[],legs=[];
function add(g,geometry,material,x=0,y=0,z=0){const m=new T.Mesh(geometry,material.clone());m.position.set(x,y,z);g.add(m);return m;}
function cyl(g,rt,rb,h,y,mat=white,x=0,z=0){return add(g,new T.CylinderGeometry(rt,rb,h,48),mat,x,y,z);}
function rod(g,a,b,r=.08,mat=silver){const aa=new T.Vector3(...a),bb=new T.Vector3(...b),d=bb.clone().sub(aa);const m=cyl(g,r,r,d.length(),0,mat);m.position.copy(aa.add(bb).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m;}
function engine(g,x,z,y,size){
 const profile=[[.92,-1.25],[.86,-1.04],[.65,-.55],[.37,.2],[.29,.65],[.38,1.12]].map(([r,h])=>new T.Vector2(r*size,h*size));
 const bell=add(g,new T.LatheGeometry(profile,36),silver,x,y,z);bell.userData.engine=true;bell.material.side=T.DoubleSide;
 cyl(g,.28*size,.28*size,.16*size,y+.7*size,black,x,z);
 for(let j=0;j<8;j++){const t=j/8;const r=(.9-.58*t)*size;const hoop=add(g,new T.TorusGeometry(r,.02*size,6,36),silver,x,y+(-1.2+1.65*t)*size,z);hoop.rotation.x=Math.PI/2;}
}
function label(g,text,r,y){const c=document.createElement('canvas');c.width=256;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#eeeede';ctx.fillRect(0,0,256,128);ctx.fillStyle='#121a21';ctx.font='bold 44px sans-serif';ctx.textAlign='center';ctx.fillText(text,128,80);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const mat=new T.MeshStandardMaterial({map:tex,roughness:.7});add(g,new T.PlaneGeometry(r*1.25,r*.62),mat,0,y,r+.025);}
for(const [index,p]of PARTES.entries()){
 const g=new T.Group();g.userData.part=p.id;g.position.y=p.base;root.add(g);groups.set(p.id,g);
 if(['sic','sii','sivb'].includes(p.id)){
  const h=p.altura,r=p.raio;cyl(g,r,r,h-3,(h+3)/2);
  for(const y of [3.3,h-1.5])cyl(g,r+.025,r+.025,1.5,y,black);
  for(let k=0;k<40;k++){const a=k*Math.PI*2/40;rod(g,[(r+.035)*Math.cos(a),3.3,(r+.035)*Math.sin(a)],[(r+.035)*Math.cos(a),8,(r+.035)*Math.sin(a)],.055,white);}
  if(p.id==='sivb')engine(g,0,0,2,1.35);else{engine(g,0,0,1.5,p.id==='sic'?1.25:.9);for(let k=0;k<4;k++){const a=k*Math.PI/2+Math.PI/4;engine(g,Math.cos(a)*2.9,Math.sin(a)*2.9,1.5,p.id==='sic'?1.25:.9);}}
  for(let k=0;k<4;k++){const stripe=add(g,new T.BoxGeometry(.1,9,1.65),black,r, h-7,0);stripe.position.set(Math.cos(k*Math.PI/2)*(r+.02),h-7,Math.sin(k*Math.PI/2)*(r+.02));stripe.rotation.y=-k*Math.PI/2;}
  label(g,p.id==='sic'?'USA':p.id==='sii'?'S-II':'S-IVB',r,h*.55);
  if(p.id==='sic')for(let k=0;k<4;k++){const shape=new T.Shape();shape.moveTo(0,0);shape.lineTo(2.5,0);shape.lineTo(0,5);shape.closePath();const fin=add(g,new T.ExtrudeGeometry(shape,{depth:.14,bevelEnabled:false}),silver);fin.position.set(4.8*Math.cos(k*Math.PI/2),.5,4.8*Math.sin(k*Math.PI/2));fin.rotation.y=-k*Math.PI/2;}
 }else if(p.id.startsWith('inter')){const ring=add(g,new T.CylinderGeometry(p.id==='inter2'?3.3:5,5,p.altura,48,1,true),white,0,p.altura/2);ring.material.side=T.DoubleSide;for(let y=.4;y<p.altura;y+=.5){const radius=p.id==='inter2'?5-1.7*y/p.altura:5;const hoop=add(g,new T.TorusGeometry(radius,.045,6,64),silver,0,y);hoop.rotation.x=Math.PI/2;}
 }else if(p.id==='iu'){cyl(g,3.3,3.3,1,.5,black);for(let i=0;i<8;i++){const a=i*Math.PI/4;add(g,new T.BoxGeometry(.45,.45,.25),silver,3.3*Math.sin(a),.5,3.3*Math.cos(a));}
 }else if(p.id==='sla'){
  for(let k=0;k<4;k++){const panel=new T.Group();const shell=new T.CylinderGeometry(2,3.3,9,20,1,true,k*Math.PI/2+.018,Math.PI/2-.036);const m=add(panel,shell,white,0,4.5);m.material.side=T.DoubleSide;g.add(panel);panels.push({panel,a:k*Math.PI/2+Math.PI/4});}
 }else if(p.id==='lm'){
  add(g,new T.CylinderGeometry(2.1,2.1,2,8),gold,0,1.3);
  for(let k=0;k<32;k++){const a=k*Math.PI/16;rod(g,[2.08*Math.cos(a),.45,2.08*Math.sin(a)],[2.1*Math.cos(a+.035),2.15,2.1*Math.sin(a+.035)],.025,gold);}engine(g,0,0,.3,.5);
  add(g,new T.CylinderGeometry(1.55,1.8,2.6,6),silver,0,3.5);add(g,new T.BoxGeometry(2.5,1.6,1.4),silver,0,3.4,.8);cyl(g,.8,1.4,1,5.2,silver);
  for(const x of [-1.65,1.65]){const tank=add(g,new T.SphereGeometry(.65,16,12),silver,x,3.5);tank.scale.y=1.4;}
  add(g,new T.BoxGeometry(.7,.9,.08),black,0,2.95,1.54);
  for(const x of [-.45,.45])rod(g,[x,2.8,1.7],[x,-.15,3.3],.045,silver);
  for(let j=0;j<8;j++){const t=j/8;rod(g,[-.45,2.7-2.6*t,1.76+1.44*t],[.45,2.7-2.6*t,1.76+1.44*t],.04,silver);}

  for(const x of [-.65,.65])add(g,new T.BoxGeometry(.65,.65,.06),windowMat,x,4.05,1.23);
  cyl(g,.32,.32,.5,5.9,silver);rod(g,[0,4.7,0],[1.4,6.5,0],.04);add(g,new T.SphereGeometry(.22,12,8),silver,1.4,6.5);
  for(let k=0;k<4;k++){const leg=new T.Group();g.add(leg);rod(leg,[1.5,1.8,0],[3.2,-.2,0],.1,gold);rod(leg,[1.5,.6,0],[3.2,-.2,0],.06,silver);cyl(leg,.45,.45,.12,-.25,gold,3.2);leg.rotation.y=k*Math.PI/2;legs.push(leg);}
 }else if(p.id==='sm'){
  cyl(g,2,2,5.4,4.3,silver);
  for(let k=0;k<6;k++){const a=k*Math.PI/3;const panel=add(g,new T.BoxGeometry(1.0,2.7,.055),white,2.025*Math.sin(a),3.7,2.025*Math.cos(a));panel.rotation.y=a;}
  engine(g,0,0,1.1,.9);
  for(let i=0;i<4;i++){const a=i*Math.PI/2;const x=2.08*Math.cos(a),z=2.08*Math.sin(a);add(g,new T.BoxGeometry(.6,.7,.6),black,x,4.8,z);rod(g,[x,4.8,z],[x*1.25,4.8,z*1.25],.14);}
  for(let i=0;i<8;i++){const a=i*Math.PI/4;rod(g,[2.01*Math.cos(a),2,2.01*Math.sin(a)],[2.01*Math.cos(a),6.7,2.01*Math.sin(a)],.04,white);}
 }else if(p.id==='cm'){
  cyl(g,.45,2,3.3,1.85,silver);cyl(g,2,1.85,.2,.1,black);add(g,new T.BoxGeometry(.55,.55,.08),windowMat,0,1.4,1.45);cyl(g,.4,.4,.3,3.45,silver);
 }else if(p.id==='les'){
  // Boost protective cover belongs to escape assembly, so separating reveals Columbia.
  const cover=add(g,new T.CylinderGeometry(.46,2.06,3.5,48,1,true),white,0,-1.75);cover.material.side=T.DoubleSide;
  for(const x of [-.7,.7])for(const z of [-.7,.7]){rod(g,[x,0,z],[x*.4,4,z*.4],.07,white);rod(g,[x,0,z],[-x*.4,4,z*.4],.04,white);}
  cyl(g,.4,.4,3.0,5.5,white);cyl(g,0,.4,1.1,7.55,white);for(let k=0;k<4;k++){const a=k*Math.PI/2;engine(g,.6*Math.cos(a),.6*Math.sin(a),4.1,.2);}
 }
 g.traverse(o=>{if(o.isMesh){o.userData.part=p.id;o.userData.baseEmissive=o.material.emissive.clone();}});
}

root.updateMatrixWorld(true);
return {root,groups,panels,legs};
}
