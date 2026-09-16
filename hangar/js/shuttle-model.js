import * as T from 'three';
import {PARTES,posicaoParte} from './shuttle-data.js?v=3';

// Original procedural illustration: no third-party model or NASA logo assets.
export function criarShuttle(){
 const root=new T.Group(),groups=new Map(),solar=[];
 const mat=(color,roughness=.65,metalness=.1)=>new T.MeshStandardMaterial({color,roughness,metalness,side:T.DoubleSide});
 const white=mat(0xe7e7df),dark=mat(0x192128),metal=mat(0xb7c5ca,.36,.65),orange=mat(0xc8813d),glass=mat(0x142d42,.14,.7),gold=mat(0xb99b61,.5,.4);
 function tex(draw,w=512,h=256){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}
 const tileTex=tex((c,w,h)=>{c.fillStyle='#192127';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=0;x<w;x+=16){c.fillStyle=`rgb(${28+(x+y)%13},${32+(x+y)%13},${37+(x+y)%13})`;c.fillRect(x+1,y+1,14,14);}});
 dark.map=tileTex;tileTex.wrapS=tileTex.wrapT=T.RepeatWrapping;tileTex.repeat.set(3,5);
 orange.map=tex((c,w,h)=>{c.fillStyle='#ebc197';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=3)for(let x=0;x<w;x+=3){c.fillStyle=`rgba(82,43,14,${((x*17+y*11)%29)/220})`;c.fillRect(x,y,2,2);}});
 const solarMat=mat(0xffffff,.42,.55);solarMat.map=tex((c,w,h)=>{c.fillStyle='#5b3c18';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=0;x<w;x+=24){c.fillStyle='#283d66';c.fillRect(x+1,y+1,22,14);c.fillStyle='#9b916c';c.fillRect(x+2,y+7,20,1);}});
 function add(g,geo,m,x=0,y=0,z=0){const o=new T.Mesh(geo,m.clone());o.position.set(x,y,z);g.add(o);return o;}
 function cyl(g,rt,rb,h,y,m=white,x=0,z=0){return add(g,new T.CylinderGeometry(rt,rb,h,48),m,x,y,z);}
 function rod(g,a,b,r=.08,m=metal){const va=new T.Vector3(...a),vb=new T.Vector3(...b),d=vb.clone().sub(va);const o=cyl(g,r,r,d.length(),0,m);o.position.copy(va.add(vb).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o;}
 function outline(g,points,z,depth,m){const s=new T.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();return add(g,new T.ExtrudeGeometry(s,{depth,bevelEnabled:false}),m,0,0,z);}
 function bell(g,x,y,z,r){const p=[[r,-1.4],[r*.92,-1.05],[r*.65,-.5],[r*.33,.5],[r*.4,1.2]].map(([a,b])=>new T.Vector2(a,b));const o=add(g,new T.LatheGeometry(p,36),metal,x,y,z);o.userData.engine=true;for(let i=0;i<7;i++){const h=-1.25+i*.24;const ring=add(g,new T.TorusGeometry(r*(.97-i*.085),.025,6,32),dark,x,y+h,z);ring.rotation.x=Math.PI/2;}return o;}
 function words(g,text,x,y,z,w=2.8,h=.5){const map=tex((c,cw,ch)=>{c.fillStyle='#15222c';c.font='bold 64px Arial';c.textAlign='center';c.textBaseline='middle';c.fillText(text,cw/2,ch/2);},512,100);const m=mat(0xffffff);m.map=map;m.transparent=true;return add(g,new T.PlaneGeometry(w,h),m,x,y,z);}
 function flag(g,x,y,z){const map=tex((c,w,h)=>{for(let i=0;i<13;i++){c.fillStyle=i%2?'#fff':'#ad2c37';c.fillRect(0,i*h/13,w,h/13+1);}c.fillStyle='#343b68';c.fillRect(0,0,w*.4,h*7/13);c.fillStyle='#fff';for(let r=0;r<9;r++)for(let k=0;k<(r%2?5:6);k++){c.font='10px Arial';c.fillText('★',9+k*32+(r%2?16:0),13+r*13);}});const m=mat(0xffffff);m.map=map;return add(g,new T.PlaneGeometry(1.6,.84),m,x,y,z);}
 // Build all roots before adding meshes: selectable objects share one contract.
 for(const p of PARTES){const g=new T.Group();g.name=p.id;g.userData.part=p.id;groups.set(p.id,g);root.add(g);}
 const tank=groups.get('tank');
 const profile=[[0,0],[2.5,.8],[3.8,2.5],[4.2,4],[4.2,34],[4.0,38],[3.2,41],[2,44],[.5,46.5],[0,46.9]].map(([r,y])=>new T.Vector2(r,y));
 add(tank,new T.LatheGeometry(profile,64),orange);
 for(const y of [4,28,30,34])cyl(tank,4.23,4.23,.18,y,orange);
 for(let k=0;k<60;k++){const a=k*Math.PI/30;rod(tank,[4.21*Math.cos(a),28,4.21*Math.sin(a)],[4.21*Math.cos(a),30,4.21*Math.sin(a)],.035,orange);}
 rod(tank,[0,3,4.24],[0,35,4.24],.15,orange);
 for(const id of ['srb-left','srb-right']){const g=groups.get(id);cyl(g,1.85,1.85,37,21.5);cyl(g,0,1.85,5.45,42.72);cyl(g,1.85,2.05,2,2);bell(g,0,1.4,0,1.5);for(const y of [4,12,20,28,36,39]){cyl(g,1.9,1.9,.23,y,dark);cyl(g,1.94,1.94,.13,y+.22,white);}rod(g,[0,4,1.89],[0,39,1.89],.09,white);}
 const orb=groups.get('orbiter');
 // Elliptic ring loft; dorsal bay is deliberately open (not a black painted box).
 const sections=[[2,2.7,1.8],[8.5,2.7,2.6],[27,2.7,2.6],[29,2.5,2.8],[31.5,1.9,2.2],[34.5,1.1,1.1],[36.7,.18,.22],[37,.02,.02]];
 function hull(upper){const vertices=[],uv=[];const n=24;for(let j=0;j<sections.length-1;j++){if(upper&&j===1)continue;for(let k=0;k<n;k++){const a=(upper?0:Math.PI)+k*Math.PI/n,b=a+Math.PI/n;const point=(s,t)=>[Math.cos(t)*s[1],s[0],Math.sin(t)*s[2]];const v=[point(sections[j],a),point(sections[j+1],a),point(sections[j+1],b),point(sections[j],b)];for(const i of [0,1,2,0,2,3]){vertices.push(...v[i]);uv.push((v[i][0]+3)/6,v[i][1]/37);}}}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.computeVertexNormals();return geo;}
 add(orb,hull(false),dark);add(orb,hull(true),white);
 add(orb,new T.BoxGeometry(5.3,.25,3.9),white,0,8.5,0);add(orb,new T.BoxGeometry(5.3,.25,3.9),white,0,27,0);
 for(const sign of [-1,1]){rod(orb,[sign*2.7,8.5,0],[sign*2.7,27,0],.13,metal);for(let y=10;y<27;y+=2.6)rod(orb,[-2.6,y,-.7],[2.6,y,-.7],.08,metal);
  const wing=[[sign*2.1,25],[sign*4.2,16],[sign*11.9,5],[sign*11.5,2.8],[sign*2.4,3.7]];
  outline(orb,wing,-1.0,.38,dark);outline(orb,wing,-.61,.25,white);
  rod(orb,[sign*2.1,25,-.58],[sign*4.2,16,-.58],.16,dark);rod(orb,[sign*4.2,16,-.58],[sign*11.9,5,-.58],.17,dark);
  rod(orb,[sign*3,5,-.32],[sign*10.5,4,-.32],.035,dark);
  const pod=add(orb,new T.SphereGeometry(1,24,16),white,sign*2.1,5.8,2.1);pod.scale.set(1,3.6,1.1);bell(orb,sign*2.1,2.3,2.1,.55);
  const win=outline(orb,[[sign*.12,30.2],[sign*1.8,29.9],[sign*1.55,31.4],[sign*.12,31.7]],2.45,.06,glass);win.rotation.x=-.12;
 }
 const tail=outline(orb,[[0,5],[0,14],[6.4,5.4],[6.4,3],[1.5,2]],-.12,.24,white);tail.rotation.y=-Math.PI/2;tail.position.z=2;
 rod(orb,[0,14,2],[0,5.4,8.4],.15,dark);
 const nose=add(orb,new T.SphereGeometry(.55,24,16),dark,0,36.5,0);nose.scale.set(1,1.3,.85);
 words(orb,'Discovery',0,32.4,2.06,2.2,.5);flag(orb,-6.1,7,-.34);words(orb,'USA',6.5,7,-.34,2.4,.9);
 // A stowed, schematic Canadarm remains attached to the port sill.
 rod(orb,[-2.3,10,.35],[-2.3,17,.35],.12,white);rod(orb,[-2.3,17,.35],[-2.3,24,.35],.12,white);
 for(const y of [10,17,24])add(orb,new T.SphereGeometry(.25,12,10),dark,-2.3,y,.35);
 for(const [id,side]of [['door-left',-1],['door-right',1]]){const door=groups.get(id),points=[],indices=[],n=24;for(let j=0;j<2;j++)for(let k=0;k<=n;k++){const a=(side===1?0:Math.PI/2)+k*Math.PI/(2*n);points.push(2.72*Math.cos(a),8.55+j*18.4,2.66*Math.sin(a));}for(let k=0;k<n;k++){const a=k,b=k+n+1;indices.push(a,b,b+1,a,b+1,a+1);}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(points,3));geo.setIndex(indices);geo.computeVertexNormals();add(door,geo,white);for(let y=10;y<27;y+=3)rod(door,[side*.18,y,2.66],[side*2.6,y,.7],.03,metal);}
 const engines=groups.get('engines');for(const [x,z]of [[0,1.2],[-1.45,-1],[1.45,-1]])bell(engines,x,1.35,z,1.08);
 const hubble=groups.get('hubble');cyl(hubble,2.05,2.05,4,2,metal);cyl(hubble,1.45,2.05,1,4.5,metal);cyl(hubble,1.45,1.45,7.8,8.9,metal);cyl(hubble,1.48,1.48,.3,12.95,dark);
 for(const y of [.2,3.8,5.1,10,12.8]){const r=y<5?2.07:1.48;cyl(hubble,r,r,.09,y,gold);}
 // Aperture is closed for launch. Its cover hinges aside after extraction.
 const cover=new T.Group();cover.position.set(1.47,13.1,0);hubble.add(cover);cyl(cover,1.47,1.47,.13,0,metal,-1.47);
 for(const side of [-1,1]){const panel=new T.Group();panel.position.set(side*1.6,7,0);hubble.add(panel);add(panel,new T.BoxGeometry(6.5,2.4,.055),solarMat,side*3.25,0,0);rod(panel,[0,0,0],[side*6.5,0,0],.045,gold);solar.push(panel);}
 words(hubble,'HUBBLE',0,2.5,2.06,2.2,.55);
 for(const [id,g]of groups)g.traverse(o=>{if(o.isMesh)o.userData.part=id;});
 let progress=0;
 const smooth=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
 function animate(state,alpha){const target=state.exploded?1:0;progress+=(target-progress)*alpha;if(Math.abs(progress-target)<.001)progress=target;
  const extract=smooth(.75,1,progress),lift=smooth(.35,.75,progress),doors=smooth(0,.35,progress),stack=smooth(0,1,progress);
  PARTES.forEach((p,i)=>{const a=posicaoParte(p,i,false),b=posicaoParte(p,i,true);let t=p.id==='hubble'?extract:p.id.startsWith('door')?doors:stack;const g=groups.get(p.id);g.position.set(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.z+(b.z-a.z)*t);
   // Cargo follows the orbiter while doors clear, then lifts out of its bay.
   if(p.id==='hubble'){g.position.y=a.y+(b.y-a.y)*extract;g.position.z=a.z+(16-7.5)*stack+(b.z-16)*lift;}
   g.visible=!state.isolated||state.selected===p.id;
  });
  const deployed=smooth(.78,1,progress);solar.forEach(p=>p.scale.x=.025+.975*deployed);cover.rotation.z=-Math.PI*.75*deployed;
  root.updateMatrixWorld(true);return progress!==target;
 }
 animate({exploded:false,isolated:false},1);
 return {root,groups,panels:[],legs:[],animate};
}
