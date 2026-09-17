import * as T from 'three';
import {criarModeloNASA} from './shuttle-nasa.js?v=3';
import {PARTES,posicaoParte} from './shuttle-data.js?v=4';

// NASA orbiter, doors and main engines; original animated payload/launch stack.
export function criarShuttle(){
 const root=new T.Group(),groups=new Map(),solar=[];
 const mat=(color,roughness=.65,metalness=.1)=>new T.MeshStandardMaterial({color,roughness,metalness,side:T.DoubleSide});
 const white=mat(0xe7e7df),dark=mat(0x192128),metal=mat(0xb7c5ca,.36,.65),orange=mat(0xc8813d),glass=mat(0x142d42,.14,.7),gold=mat(0xb99b61,.5,.4);
 function tex(draw,w=512,h=256){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}
 // Smooth paint and thermal blankets: fine detail belongs in the source maps.
 const foil=mat(0xc8ccce,.52,.32);
 orange.map=tex((c,w,h)=>{c.fillStyle='#d8ab7b';c.fillRect(0,0,w,h);for(let i=0;i<1600;i++){c.fillStyle='rgba(100,66,38,.035)';c.fillRect((i*73)%w,(i*47)%h,1,1);}});
 const solarMat=mat(0xffffff,.42,.55);solarMat.map=tex((c,w,h)=>{c.fillStyle='#dab967';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=0;x<w;x+=24){c.fillStyle='#625335';c.fillRect(x+1,y+1,22,14);c.fillStyle='#c4aa66';c.fillRect(x+2,y+7,20,1);}});
 function add(g,geo,m,x=0,y=0,z=0){const o=new T.Mesh(geo,m.clone());o.position.set(x,y,z);g.add(o);return o;}
 function cyl(g,rt,rb,h,y,m=white,x=0,z=0){return add(g,new T.CylinderGeometry(rt,rb,h,48),m,x,y,z);}
 function rod(g,a,b,r=.08,m=metal){const va=new T.Vector3(...a),vb=new T.Vector3(...b),d=vb.clone().sub(va);const o=cyl(g,r,r,d.length(),0,m);o.position.copy(va.add(vb).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o;}
 function bell(g,x,y,z,r){const p=[[r,-1.4],[r*.92,-1.05],[r*.65,-.5],[r*.33,.5],[r*.4,1.2]].map(([a,b])=>new T.Vector2(a,b));const o=add(g,new T.LatheGeometry(p,36),metal,x,y,z);o.userData.engine=true;for(let i=0;i<7;i++){const h=-1.25+i*.24;const ring=add(g,new T.TorusGeometry(r*(.97-i*.085),.025,6,32),dark,x,y+h,z);ring.rotation.x=Math.PI/2;}return o;}
 function words(g,text,x,y,z,w=2.8,h=.5){const map=tex((c,cw,ch)=>{c.fillStyle='#15222c';c.font='bold 64px Arial';c.textAlign='center';c.textBaseline='middle';c.fillText(text,cw/2,ch/2,cw-12);},1024,128);const m=mat(0xffffff);m.map=map;m.transparent=true;m.depthWrite=false;return add(g,new T.PlaneGeometry(w,h),m,x,y,z);}
 // Build all roots before adding meshes: selectable objects share one contract.
 for(const p of PARTES){const g=new T.Group();g.name=p.id;g.userData.part=p.id;groups.set(p.id,g);root.add(g);}
 const tank=groups.get('tank');
 const profile=[[0,0],[2.5,.8],[3.8,2.5],[4.2,4],[4.2,34],[4.0,38],[3.2,41],[2,44],[.5,46.5],[0,46.9]].map(([r,y])=>new T.Vector2(r,y));
 add(tank,new T.LatheGeometry(profile,64),orange);
 for(const y of [4,28,30,34])cyl(tank,4.23,4.23,.18,y,orange);
 for(let k=0;k<60;k++){const a=k*Math.PI/30;rod(tank,[4.21*Math.cos(a),28,4.21*Math.sin(a)],[4.21*Math.cos(a),30,4.21*Math.sin(a)],.035,orange);}
 rod(tank,[0,3,4.24],[0,35,4.24],.15,orange);
 for(const id of ['srb-left','srb-right']){const g=groups.get(id);cyl(g,1.85,1.85,37,21.5);cyl(g,0,1.85,5.45,42.72);cyl(g,1.85,2.05,2,2);bell(g,0,1.4,0,1.5);for(const y of [4,12,20,28,36,39]){cyl(g,1.9,1.9,.23,y,dark);cyl(g,1.94,1.94,.13,y+.22,white);}rod(g,[0,4,1.89],[0,39,1.89],.09,white);}
 const orb=groups.get('orbiter');orb.add(criarModeloNASA('orbiter'));
 // OMS engines stay with the orbiter; main engines are a separate assembly.
 for(const side of [-1,1])bell(orb,side*2.1,4.2,2.1,.55);
 // Individually selectable arm, with fixed-length links and a grapple head.
 const arm=groups.get('arm'),armLinks=[],armJoints=[];
 for(let i=0;i<2;i++){const link=new T.Group();arm.add(link);cyl(link,.19,.19,7.6,3.8,white);for(const y of [.3,7.3])cyl(link,.23,.23,.24,y,dark);words(link,i?'CANADA':'Canadarm',0,3.8,.205,1.65,.27);armLinks.push(link);}
 for(let i=0;i<3;i++){const joint=add(arm,new T.SphereGeometry(.30,20,12),dark);armJoints.push(joint);}
 const hand=new T.Group();hand.name='grapple-head';arm.add(hand);const ring=add(hand,new T.TorusGeometry(.27,.07,10,32),metal);ring.rotation.y=Math.PI/2;rod(hand,[-.4,0,0],[0,0,0],.20,white);
 const camera=add(hand,new T.BoxGeometry(.22,.3,.24),white,-.23,.36,0);add(camera,new T.SphereGeometry(.09,12,8),glass,.12,0,0);
 const shoulder=new T.Vector3(-2.45,26,.35),tip=new T.Vector3();
 function poseArm(grab,lift){tip.set(-2.45+.25*grab,10.802+5.698*grab,.35+.55*grab+11*lift);const direction=tip.clone().sub(shoulder),distance=direction.length();direction.normalize();const bend=new T.Vector3(0,0,1).addScaledVector(direction,-direction.z).normalize();const elbow=shoulder.clone().add(tip).multiplyScalar(.5).addScaledVector(bend,Math.sqrt(Math.max(0,7.6**2-(distance/2)**2)));const points=[shoulder,elbow,tip];armJoints.forEach((j,i)=>j.position.copy(points[i]));armLinks.forEach((l,i)=>{l.position.copy(points[i]);l.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),points[i+1].clone().sub(points[i]).normalize());});hand.position.copy(tip);}
 for(const id of ['door-left','door-right'])groups.get(id).add(criarModeloNASA(id));
 const engines=groups.get('engines');for(const [x,z]of [[0,1.2],[-1.45,-1],[1.45,-1]]){const engine=criarModeloNASA('engine');engine.position.set(x,2.3,z);engine.children[0].userData.engine=true;engines.add(engine);}
 const hubble=groups.get('hubble');cyl(hubble,2.05,2.05,4,2,foil);cyl(hubble,1.45,2.05,1,4.5,foil);add(hubble,new T.CylinderGeometry(1.45,1.45,7.8,64,1,true),foil,0,8.9,0);add(hubble,new T.CylinderGeometry(1.48,1.48,.3,64,1,true),dark,0,12.95,0);
 // Equipment doors, fasteners and foil seams around the instrument section.
 for(let k=0;k<8;k++){const a=k*Math.PI/4;const bay=add(hubble,new T.BoxGeometry(1.28,2.8,.07),foil,2.04*Math.sin(a),2,2.04*Math.cos(a));bay.rotation.y=a;for(const x of [-.55,.55])for(const y of [-1.27,1.27])add(bay,new T.SphereGeometry(.035,6,4),metal,x,y,.06);}
 rod(hubble,[-1.4,4.5,.9],[-2.2,4.5,.9],.09,gold);const grapple=add(hubble,new T.SphereGeometry(.14,16,8),metal,-2.2,4.5,.9);grapple.name='grapple-fixture';
 // Optical baffles, recessed primary and secondary mirror supports.
 cyl(hubble,1.35,1.35,.05,11.8,glass);for(const y of [12.1,12.4,12.7]){const baffle=add(hubble,new T.TorusGeometry(1.36,.05,8,48),dark,0,y,0);baffle.rotation.x=Math.PI/2;}cyl(hubble,.22,.22,.22,12.65,metal);for(let k=0;k<4;k++){const a=k*Math.PI/2;rod(hubble,[0,12.65,0],[1.35*Math.cos(a),12.65,1.35*Math.sin(a)],.02,dark);}
 const antennaRoots=[];for(const side of [-1,1]){const a=new T.Group();a.position.set(side*1.6,2.8,0);hubble.add(a);rod(a,[0,0,0],[side*1.8,0,0],.045,metal);const dish=add(a,new T.SphereGeometry(.63,24,12,0,Math.PI*2,0,.85),metal,side*1.8,0,0);dish.rotation.z=side*Math.PI/2;antennaRoots.push(a);}
 for(const y of [.2,3.8,5.1,10,12.8]){const r=y<5?2.056:1.456;cyl(hubble,r,r,.024,y,metal);}
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
