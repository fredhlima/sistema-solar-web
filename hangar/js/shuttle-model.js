import * as T from 'three';
import {PARTES,posicaoParte} from './shuttle-data.js?v=4';

// Original procedural geometry and textures. Historical markings are educational.
export function criarShuttle(){
 const root=new T.Group(),groups=new Map(),solar=[];
 const mat=(color,roughness=.65,metalness=.1)=>new T.MeshStandardMaterial({color,roughness,metalness,side:T.DoubleSide});
 const white=mat(0xe7e7df),dark=mat(0x192128),metal=mat(0xb7c5ca,.36,.65),orange=mat(0xc8813d),glass=mat(0x142d42,.14,.7),gold=mat(0xb99b61,.5,.4);
 function tex(draw,w=512,h=256){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}
 const tileTex=tex((c,w,h)=>{c.fillStyle='#192127';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=0;x<w;x+=16){c.fillStyle=`rgb(${28+(x+y)%13},${32+(x+y)%13},${37+(x+y)%13})`;c.fillRect(x+1,y+1,14,14);}});
 dark.map=tileTex;tileTex.wrapS=tileTex.wrapT=T.RepeatWrapping;tileTex.repeat.set(3,5);
 dark.bumpMap=tileTex;dark.bumpScale=.025;
 white.map=tex((c,w,h)=>{c.fillStyle='#e9e6de';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=32)for(let x=0;x<w;x+=32){const v=215+(x*7+y*3)%24;c.fillStyle=`rgb(${v},${v},${v-3})`;c.fillRect(x+1,y+1,30,30);}});white.map.wrapS=white.map.wrapT=T.RepeatWrapping;white.map.repeat.set(2,3);white.bumpMap=white.map;white.bumpScale=.018;
 const foil=mat(0xd3cbb9,.36,.55);foil.map=tex((c,w,h)=>{c.fillStyle='#c6c4b9';c.fillRect(0,0,w,h);for(let i=0;i<1400;i++){const x=(i*73)%w,y=(i*47)%h;c.fillStyle=i%2?'rgba(255,255,255,.19)':'rgba(40,47,53,.12)';c.fillRect(x,y,2+i%12,1+i%3);}});foil.bumpMap=foil.map;foil.bumpScale=.06;
 orange.map=tex((c,w,h)=>{c.fillStyle='#ebc197';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=3)for(let x=0;x<w;x+=3){c.fillStyle=`rgba(82,43,14,${((x*17+y*11)%29)/220})`;c.fillRect(x,y,2,2);}});
 const solarMat=mat(0xffffff,.42,.55);solarMat.map=tex((c,w,h)=>{c.fillStyle='#dab967';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=0;x<w;x+=24){c.fillStyle='#625335';c.fillRect(x+1,y+1,22,14);c.fillStyle='#c4aa66';c.fillRect(x+2,y+7,20,1);}});
 function add(g,geo,m,x=0,y=0,z=0){const o=new T.Mesh(geo,m.clone());o.position.set(x,y,z);g.add(o);return o;}
 function cyl(g,rt,rb,h,y,m=white,x=0,z=0){return add(g,new T.CylinderGeometry(rt,rb,h,48),m,x,y,z);}
 function rod(g,a,b,r=.08,m=metal){const va=new T.Vector3(...a),vb=new T.Vector3(...b),d=vb.clone().sub(va);const o=cyl(g,r,r,d.length(),0,m);o.position.copy(va.add(vb).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o;}
 function outline(g,points,z,depth,m){const s=new T.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();return add(g,new T.ExtrudeGeometry(s,{depth,bevelEnabled:false}),m,0,0,z);}
 function bell(g,x,y,z,r){const p=[[r,-1.4],[r*.92,-1.05],[r*.65,-.5],[r*.33,.5],[r*.4,1.2]].map(([a,b])=>new T.Vector2(a,b));const o=add(g,new T.LatheGeometry(p,36),metal,x,y,z);o.userData.engine=true;for(let i=0;i<7;i++){const h=-1.25+i*.24;const ring=add(g,new T.TorusGeometry(r*(.97-i*.085),.025,6,32),dark,x,y+h,z);ring.rotation.x=Math.PI/2;}return o;}
 function words(g,text,x,y,z,w=2.8,h=.5){const map=tex((c,cw,ch)=>{c.fillStyle='#15222c';c.font='bold 64px Arial';c.textAlign='center';c.textBaseline='middle';c.fillText(text,cw/2,ch/2,cw-12);},1024,128);const m=mat(0xffffff);m.map=map;m.transparent=true;m.depthWrite=false;return add(g,new T.PlaneGeometry(w,h),m,x,y,z);}
 // The 1975 worm, reconstructed as an approximate historical marking.
 function worm(g,x,y,z,w=2.8){const map=tex((c)=>{c.strokeStyle='#df382d';c.lineWidth=15;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(22,104);c.lineTo(22,28);c.bezierCurveTo(22,13,36,13,44,27);c.lineTo(91,103);c.lineTo(91,21);c.moveTo(116,104);c.lineTo(143,27);c.bezierCurveTo(147,13,159,13,164,27);c.lineTo(191,104);c.moveTo(274,21);c.lineTo(232,21);c.bezierCurveTo(198,21,202,60,231,61);c.lineTo(249,61);c.bezierCurveTo(282,62,284,103,250,104);c.lineTo(208,104);c.moveTo(295,104);c.lineTo(323,27);c.bezierCurveTo(328,13,341,13,346,27);c.lineTo(373,104);c.stroke();},400,128);const m=mat(0xffffff);m.map=map;m.transparent=true;m.depthWrite=false;return add(g,new T.PlaneGeometry(w,w*.32),m,x,y,z);}
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
  // Three individually framed forward windows per side, above the loft surface.
  for(let k=0;k<3;k++){const frame=add(orb,new T.BoxGeometry(.67,1.15,.10),dark,sign*(.39+k*.62),31.2-k*.26,2.53-k*.30);frame.rotation.y=sign*(.16+k*.21);const pane=add(frame,new T.BoxGeometry(.53,.94,.03),glass,0,0,.069);pane.name='cockpit-window';}
  for(const y of [27.6,28.7]){const pane=add(orb,new T.BoxGeometry(.72,.6,.055),glass,sign*.58,y,2.85);pane.name='overhead-window';}
  const aftWindow=add(orb,new T.BoxGeometry(.72,.06,.63),glass,sign*.6,26.82,1.18);aftWindow.name='aft-window';
  // RCS clusters at the nose and on both aft OMS pods.
  for(const [y,z]of [[33.7,.8],[6.5,3.12],[7.2,3.03]])for(let k=0;k<3;k++){const nozzle=cyl(orb,.11,.18,.17,0,dark);nozzle.rotation.x=Math.PI/2;nozzle.position.set(sign*(y>30?.64:2.1)+k*.24,y,z);}
  const sideText=words(orb,'United States',sign*2.76,19,.1,4.8,.55);sideText.rotation.y=sign*Math.PI/2;sideText.rotation.z=Math.PI/2;
  const sideLogo=worm(orb,sign*2.78,23.1,.1,2.5);sideLogo.rotation.y=sign*Math.PI/2;sideLogo.rotation.z=Math.PI/2;
  for(let y=10;y<26;y+=1.1)add(orb,new T.BoxGeometry(.06,.48,.16),dark,sign*2.72,y,-.3);
  for(const y of [11,23.5]){const mount=add(orb,new T.BoxGeometry(.48,.65,.45),metal,sign*2.3,y,-.3);mount.name='payload-support';}
 }
 const tail=outline(orb,[[0,5],[0,14],[6.4,5.4],[6.4,3],[1.5,2]],-.12,.24,white);tail.rotation.y=-Math.PI/2;tail.position.z=2;
 rod(orb,[0,14,2],[0,5.4,8.4],.15,dark);
 const nose=add(orb,new T.SphereGeometry(.55,24,16),dark,0,36.5,0);nose.scale.set(1,1.3,.85);
 words(orb,'Discovery',0,33,1.91,1.8,.45);flag(orb,-6.1,7,-.34);words(orb,'USA',-6.1,5.5,-.33,2.4,.8);worm(orb,6.1,7,-.33,3.2);
 const hatch=add(orb,new T.TorusGeometry(.65,.075,8,40),metal,-2.56,29,.3);hatch.rotation.y=Math.PI/2;
 // Individually selectable arm, with fixed-length links and a grapple head.
 const arm=groups.get('arm'),armLinks=[],armJoints=[];
 for(let i=0;i<2;i++){const link=new T.Group();arm.add(link);cyl(link,.19,.19,7.6,3.8,white);for(const y of [.3,7.3])cyl(link,.23,.23,.24,y,dark);words(link,i?'CANADA':'Canadarm',0,3.8,.205,1.65,.27);armLinks.push(link);}
 for(let i=0;i<3;i++){const joint=add(arm,new T.SphereGeometry(.30,20,12),dark);armJoints.push(joint);}
 const hand=new T.Group();hand.name='grapple-head';arm.add(hand);const ring=add(hand,new T.TorusGeometry(.27,.07,10,32),metal);ring.rotation.y=Math.PI/2;rod(hand,[-.4,0,0],[0,0,0],.20,white);
 const camera=add(hand,new T.BoxGeometry(.22,.3,.24),white,-.23,.36,0);add(camera,new T.SphereGeometry(.09,12,8),glass,.12,0,0);
 const shoulder=new T.Vector3(-2.45,26,.35),tip=new T.Vector3();
 function poseArm(grab,lift){tip.set(-2.45+.25*grab,10.802+5.698*grab,.35+.55*grab+11*lift);const direction=tip.clone().sub(shoulder),distance=direction.length();direction.normalize();const bend=new T.Vector3(0,0,1).addScaledVector(direction,-direction.z).normalize();const elbow=shoulder.clone().add(tip).multiplyScalar(.5).addScaledVector(bend,Math.sqrt(Math.max(0,7.6**2-(distance/2)**2)));const points=[shoulder,elbow,tip];armJoints.forEach((j,i)=>j.position.copy(points[i]));armLinks.forEach((l,i)=>{l.position.copy(points[i]);l.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),points[i+1].clone().sub(points[i]).normalize());});hand.position.copy(tip);}
 for(const [id,side]of [['door-left',-1],['door-right',1]]){const door=groups.get(id),points=[],indices=[],n=24;for(let j=0;j<2;j++)for(let k=0;k<=n;k++){const a=(side===1?0:Math.PI/2)+k*Math.PI/(2*n);points.push(2.72*Math.cos(a),8.55+j*18.4,2.66*Math.sin(a));}for(let k=0;k<n;k++){const a=k,b=k+n+1;indices.push(a,b,b+1,a,b+1,a+1);}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(points,3));geo.setIndex(indices);geo.computeVertexNormals();add(door,geo,white);for(let y=10;y<27;y+=3)rod(door,[side*.18,y,2.66],[side*2.6,y,.7],.03,metal);}
 const engines=groups.get('engines');for(const [x,z]of [[0,1.2],[-1.45,-1],[1.45,-1]])bell(engines,x,1.35,z,1.08);
 // Inner door radiators follow the curved panels, with tubing and panel seams.
 for(const [id,side]of [['door-left',-1],['door-right',1]]){const g=groups.get(id);for(let j=0;j<4;j++)for(let k=0;k<7;k++){const angle=(side===1?0:Math.PI/2)+(k+.5)*Math.PI/14;const plate=add(g,new T.BoxGeometry(.53,4.15,.035),metal,2.69*Math.cos(angle),10.85+j*4.5,2.62*Math.sin(angle));plate.rotation.y=Math.PI/2-angle;}for(let y=9;y<27;y+=1.5)add(g,new T.BoxGeometry(.18,.16,.12),gold,side*2.67,y,.15);}
 const hubble=groups.get('hubble');cyl(hubble,2.05,2.05,4,2,foil);cyl(hubble,1.45,2.05,1,4.5,foil);add(hubble,new T.CylinderGeometry(1.45,1.45,7.8,64,1,true),foil,0,8.9,0);add(hubble,new T.CylinderGeometry(1.48,1.48,.3,64,1,true),dark,0,12.95,0);
 // Equipment doors, fasteners and foil seams around the instrument section.
 for(let k=0;k<8;k++){const a=k*Math.PI/4;const bay=add(hubble,new T.BoxGeometry(1.28,2.8,.07),foil,2.04*Math.sin(a),2,2.04*Math.cos(a));bay.rotation.y=a;for(const x of [-.55,.55])for(const y of [-1.27,1.27])add(bay,new T.SphereGeometry(.035,6,4),metal,x,y,.06);}
 for(let k=0;k<12;k++){const a=k*Math.PI/6;rod(hubble,[1.458*Math.sin(a),5.2,1.458*Math.cos(a)],[1.458*Math.sin(a),12.7,1.458*Math.cos(a)],.012,gold);}
 rod(hubble,[-1.4,4.5,.9],[-2.2,4.5,.9],.09,gold);const grapple=add(hubble,new T.SphereGeometry(.14,16,8),metal,-2.2,4.5,.9);grapple.name='grapple-fixture';
 // Optical baffles, recessed primary and secondary mirror supports.
 cyl(hubble,1.35,1.35,.05,11.8,glass);for(const y of [12.1,12.4,12.7]){const baffle=add(hubble,new T.TorusGeometry(1.36,.05,8,48),dark,0,y,0);baffle.rotation.x=Math.PI/2;}cyl(hubble,.22,.22,.22,12.65,metal);for(let k=0;k<4;k++){const a=k*Math.PI/2;rod(hubble,[0,12.65,0],[1.35*Math.cos(a),12.65,1.35*Math.sin(a)],.02,dark);}
 const antennaRoots=[];for(const side of [-1,1]){const a=new T.Group();a.position.set(side*1.6,2.8,0);hubble.add(a);rod(a,[0,0,0],[side*1.8,0,0],.045,metal);const dish=add(a,new T.SphereGeometry(.63,24,12,0,Math.PI*2,0,.85),metal,side*1.8,0,0);dish.rotation.z=side*Math.PI/2;antennaRoots.push(a);}
 for(const y of [.2,3.8,5.1,10,12.8]){const r=y<5?2.07:1.48;cyl(hubble,r,r,.09,y,gold);}
 // Aperture is closed for launch. Its cover hinges aside after extraction.
 const cover=new T.Group();cover.position.set(1.47,13.1,0);hubble.add(cover);cyl(cover,1.47,1.47,.13,0,metal,-1.47);
 for(const side of [-1,1]){const panel=new T.Group();panel.position.set(side*1.6,7,0);hubble.add(panel);add(panel,new T.BoxGeometry(6.5,2.4,.055),solarMat,side*3.25,0,0);rod(panel,[0,0,0],[side*6.5,0,0],.045,gold);solar.push(panel);}
 words(hubble,'HUBBLE',0,2.5,2.06,2.2,.55);
 const hinges=[];for(const [id,side]of [['door-left',-1],['door-right',1]]){const door=groups.get(id),hinge=new T.Group();hinge.position.x=side*2.72;for(const child of [...door.children]){child.position.x-=side*2.72;hinge.add(child);}door.add(hinge);hinges.push({hinge,side});}
 for(const [id,g]of groups)g.traverse(o=>{if(o.isMesh)o.userData.part=id;});
 let progress=0;
 const smooth=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
 function animate(state,alpha,dt){const target=state.exploded?1:0;progress=dt===undefined?progress+(target-progress)*alpha:progress+Math.sign(target-progress)*Math.min(Math.abs(target-progress),dt/5);if(Math.abs(progress-target)<.001)progress=target;
  const extract=smooth(.85,1,progress),lift=smooth(.35,.7,progress),doors=smooth(0,.2,progress),stack=smooth(0,1,progress);
  PARTES.forEach((p,i)=>{const a=posicaoParte(p,i,false),b=posicaoParte(p,i,true);let t=p.id==='hubble'?extract:p.id.startsWith('door')?doors:stack;const g=groups.get(p.id);g.position.set(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.z+(b.z-a.z)*t);
   // Cargo follows the orbiter while doors clear, then lifts out of its bay.
   if(p.id==='hubble'){g.position.y=a.y+(b.y-a.y)*extract;g.position.z=a.z+(16-7.5)*stack+(b.z-16)*lift;}
   g.visible=!state.isolated||state.selected===p.id;
  });
  poseArm(smooth(.2,.35,progress),lift);
  hinges.forEach(({hinge,side})=>hinge.rotation.y=side*2.15*doors);
  const deployed=smooth(.7,.85,progress);solar.forEach(p=>p.scale.x=.025+.975*deployed);antennaRoots.forEach(p=>p.scale.x=.12+.88*deployed);cover.rotation.z=-Math.PI*.75*deployed;
  root.updateMatrixWorld(true);return progress!==target;
 }
 animate({exploded:false,isolated:false},1);
 return {root,groups,panels:[],legs:[],animate};
}
