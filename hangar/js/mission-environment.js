import * as T from 'three';
import {criarMaterialOceano} from './mission-water.js?v=2';

const KNOWN = new Set(['sky', 'earth', 'moon-orbit', 'moon-ground', 'ocean', 'mars-orbit', 'mars-ground','titan-orbit','titan-sky','titan-ground','saturn-orbit','saturn-sky','runway']);
const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function canvasTexture(draw, size = 1024) {
 const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size / 2;
 draw(canvas.getContext('2d'), canvas.width, canvas.height);
 const texture = new T.CanvasTexture(canvas);
 texture.colorSpace = T.SRGBColorSpace;
 texture.anisotropy = 4;
 return texture;
}

function cloudMap() {
 return canvasTexture((ctx,w,h)=>{
  ctx.clearRect(0,0,w,h);let seed=8157;
  const rand=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
  // Irregular clusters of overlapping billows, with wrapped edges for the globe.
  for(let c=0;c<42;c++){
   const cx=rand()*w,cy=h*(.24+rand()*.58),scale=14+rand()*34;
   for(let j=0;j<12;j++){
    const x=cx+(rand()-.5)*scale*3,y=cy+(rand()-.5)*scale*.85,r=scale*(.35+rand()*.55);
    for(const offset of [-w,0,w]){
     const g=ctx.createRadialGradient(x+offset,y-r*.18,0,x+offset,y,r);
     g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(.55,'rgba(235,243,250,.30)');g.addColorStop(1,'rgba(215,232,248,0)');
     ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x+offset,y,r,r*.68,0,0,Math.PI*2);ctx.fill();
    }
   }
  }
 },1024);
}

function rockyMap(kind) {
 const palette = kind === 'mars'
  ? ['#682e22', '#9c4930', '#c36b45', '#df9865', '#713c30']
  : ['#555b62', '#777c80', '#999c9b', '#b3b1a9', '#666a6d'];
 return canvasTexture((ctx, w, h) => {
  ctx.fillStyle = palette[0]; ctx.fillRect(0, 0, w, h);
  let seed = kind === 'mars' ? 9281 : 5137;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let i = 0; i < 1900; i++) {
   const x = rand() * w, y = rand() * h, r = 2 + rand() * 28;
   const c = palette[Math.floor(rand() * palette.length)];
   const g = ctx.createRadialGradient(x - r * .22, y - r * .22, r * .08, x, y, r);
   g.addColorStop(0, c); g.addColorStop(.68, c); g.addColorStop(1, kind === 'mars' ? 'rgba(35,18,15,.35)' : 'rgba(25,29,31,.34)');
   ctx.globalAlpha = .12 + rand() * .28; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
   if (i % 9 === 0) { ctx.globalAlpha = .12; ctx.strokeStyle = '#e5d5bd'; ctx.lineWidth = 1 + r * .06; ctx.beginPath(); ctx.arc(x, y, r * .75, .2, 2.8); ctx.stroke(); }
  }
  ctx.globalAlpha = 1;
 }, 1024);
}

function skyMaterial() {
 return new T.ShaderMaterial({
  side: T.BackSide, depthWrite: false,
  vertexShader: 'varying vec3 vLocal; void main(){ vLocal=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
  fragmentShader: `varying vec3 vLocal; void main(){ float h=normalize(vLocal).y; vec3 zenith=vec3(0.025,0.11,0.27); vec3 middle=vec3(0.14,0.43,0.70); vec3 horizon=vec3(0.72,0.79,0.81); vec3 c=mix(horizon,middle,smoothstep(-0.34,0.12,h)); c=mix(c,zenith,smoothstep(0.12,0.76,h)); gl_FragColor=vec4(c,1.0); }`
 });
}

function terrainGeometry(size, segments, floorY, style, flatRadius) {
 const geo=new T.PlaneGeometry(size,size,segments,segments);geo.rotateX(-Math.PI/2);
 const p=geo.attributes.position;let seed=4411;const rand=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
 const craters=Array.from({length:38},()=>[(rand()-.5)*size*.88,(rand()-.5)*size*.88,1.6+rand()*5,.18+rand()*.7]);
 const heightAt=(x,z)=>{
  const dist=Math.hypot(x,z);let y;
  if(style==='moon'){
   y=Math.sin(x*.15+z*.07)*.17+Math.cos(z*.21-x*.04)*.12;
   for(const [cx,cz,r,d] of craters){const t=Math.hypot(x-cx,z-cz)/r;y+=d*(.55*Math.exp(-((t-1)**2)/.035)-Math.exp(-t*t*3));}
  }else y=Math.sin(x*.10+z*.035)*.35+Math.cos(z*.14-x*.045)*.22+Math.sin(x*.3+z*.19)*.05;
  const fade=T.MathUtils.smoothstep(dist,flatRadius,flatRadius*2.2);
  return floorY+y*fade;
 };
 for(let i=0;i<p.count;i++)p.setY(i,heightAt(p.getX(i),p.getZ(i)));
 geo.userData.heightAt=heightAt;geo.computeVertexNormals();return geo;
}

function regolithMaterial(style) {
 const moon=style==='moon';
 const mat=new T.MeshStandardMaterial({color:0xffffff,roughness:1,metalness:0});
 mat.onBeforeCompile=shader=>{
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vRegolith;').replace('#include <begin_vertex>','#include <begin_vertex>\nvRegolith=position;');
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
   varying vec3 vRegolith;
   float rn(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
   float noiseR(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(rn(i),rn(i+vec2(1,0)),f.x),mix(rn(i+vec2(0,1)),rn(i+vec2(1,1)),f.x),f.y);}
  `).replace('#include <color_fragment>',`#include <color_fragment>
   vec2 p=vRegolith.xz;
   float n=noiseR(p*.18)*.52+noiseR(p*.63)*.28+noiseR(p*2.1)*.14+noiseR(p*12.0)*.06;
   vec3 soil=mix(vec3(${moon?'.11,.115,.12':'.17,.063,.028'}),vec3(${moon?'.29,.28,.26':'.43,.22,.105'}),n);
   diffuseColor.rgb*=soil;
  `);
 };
 mat.customProgramCacheKey=()=>`mission-regolith-${style}-1`;return mat;
}

function ridgeGeometry(radius,floorY,span){
 const g=new T.BufferGeometry(),p=[],idx=[],segments=144;
 for(let i=0;i<=segments;i++){
  const a=i/segments*Math.PI*2,h=span*(.12+.06*Math.sin(a*7)+.035*Math.cos(a*13));
  p.push(Math.cos(a)*radius,floorY-2,Math.sin(a)*radius,Math.cos(a)*radius,floorY+h,Math.sin(a)*radius);
  if(i<segments){const k=i*2;idx.push(k,k+1,k+2,k+1,k+3,k+2);}
 }
 g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return g;
}

export function criarAmbienteMissao({scene, root, camera, scenario, floorY: suppliedFloorY}) {
 if (!scene || !root || !camera) throw new TypeError('criarAmbienteMissao requer scene, root e camera.');
 const requested = typeof scenario === 'string' ? scenario : (scenario?.id || scenario?.environment || scenario?.cenario || 'sky');
 const key = KNOWN.has(requested) ? requested : 'sky';
 root.updateMatrixWorld(true);
 const bounds = new T.Box3();
 root.traverse(o=>{if(!o.isMesh)return;for(let a=o;a;a=a.parent)if(!a.visible)return;bounds.union(new T.Box3().setFromObject(o));});
 const size = bounds.isEmpty() ? new T.Vector3(5, 5, 5) : bounds.getSize(new T.Vector3());
 const center = bounds.isEmpty() ? new T.Vector3() : bounds.getCenter(new T.Vector3());
 const modelSpan = Math.max(size.x, size.y, size.z, 1);
 const floorY = Number.isFinite(suppliedFloorY)?suppliedFloorY:(bounds.isEmpty() ? -1 : bounds.min.y - Math.max(.03, modelSpan * .008));
 const env = new T.Group(); env.name = `ambiente-missao-${key}`; env.userData.environment = true;
 scene.add(env);
 const owned = new Set();
 const ownedObjects = new Set();
 const own = (obj) => { env.add(obj); return obj; };
 const material = (m) => { owned.add(m); return m; };
 const geometry = (g) => { owned.add(g); return g; };
 const texture = (t) => { if (t) owned.add(t); return t; };
 const gradient = own(new T.Mesh(geometry(new T.SphereGeometry(1, 32, 20)), material(skyMaterial())));
 gradient.scale.setScalar(1);
 if(['earth','moon-orbit','mars-orbit','titan-orbit','saturn-orbit','moon-ground'].includes(key)){gradient.visible=false;scene.background=new T.Color(0x030710);}
 if(key==='mars-ground')gradient.material.fragmentShader=gradient.material.fragmentShader.replace('0.025,0.11,0.27','0.24,0.12,0.08').replace('0.14,0.43,0.70','0.52,0.28,0.16').replace('0.72,0.79,0.81','0.77,0.51,0.33');
 if(key.startsWith('titan')&&key!=='titan-orbit')gradient.material.fragmentShader=gradient.material.fragmentShader.replace('0.025,0.11,0.27','0.20,0.12,0.055').replace('0.14,0.43,0.70','0.46,0.28,0.11').replace('0.72,0.79,0.81','0.68,0.48,0.25');
 if(key==='saturn-sky')gradient.material.fragmentShader=gradient.material.fragmentShader.replace('0.025,0.11,0.27','0.10,0.16,0.24').replace('0.14,0.43,0.70','0.37,0.49,0.57').replace('0.72,0.79,0.81','0.83,0.65,0.38');
 let cloudLayer = null, planet = null, saturnRings = null, terrain = null, haze = null, ocean = null, ridge = null;
 let earthBase = null, earthClouds = null, cloudTexture = null, planetTexture = null;

 const sphereRadius = Math.max(modelSpan * .68, .8);
 const light = own(new T.HemisphereLight(0xe1efff, key.includes('mars') ? 0x4c2920 : 0x3c424a, key.endsWith('-ground')?.35:1.5));
 const sun = own(new T.DirectionalLight(0xfff1d9, key.endsWith('-ground')?1.5:2.1)); sun.position.set(-1.7, 1.1, 1.4).normalize();
 const fitInfo = {bounds: bounds.isEmpty() ? null : {min: bounds.min.toArray(), max: bounds.max.toArray()}, modelSpan, floorY};

 if (key === 'sky' || key === 'titan-sky' || key === 'saturn-sky') {
  cloudTexture = texture(cloudMap());
  cloudLayer = own(new T.Mesh(geometry(new T.SphereGeometry(1.003, 48, 28)), material(new T.MeshBasicMaterial({map: cloudTexture, transparent: true, opacity: .68, side: T.BackSide, depthWrite: false, fog: false}))));
 } else if (key === 'earth' || key === 'moon-orbit' || key === 'mars-orbit' || key === 'titan-orbit' || key === 'saturn-orbit') {
  let radius = sphereRadius, cloudRadius = radius * 1.012;
  if (key === 'earth') {
   const fallback = material(new T.MeshStandardMaterial({color: 0x246eaa, roughness: .92, metalness: 0}));
   earthBase = own(new T.Mesh(geometry(new T.SphereGeometry(radius, 64, 48)), fallback));
   cloudTexture = texture(cloudMap());
   earthClouds = own(new T.Mesh(geometry(new T.SphereGeometry(cloudRadius, 64, 48)), material(new T.MeshStandardMaterial({map: cloudTexture, transparent: true, opacity: .34, alphaTest: .025, roughness: 1, depthWrite: false}))));
   // The original local project maps are used when available. The sphere remains usable with its procedural material offline if loading fails.
   const loader = new T.TextureLoader();
   loader.load(new URL('../../texturas/terra.jpg', import.meta.url).href, tex => { if (disposed) { tex.dispose(); return; } tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 8; texture(tex); earthBase.material.map = tex; earthBase.material.color.set(0xffffff); earthBase.material.needsUpdate = true; }, undefined, () => {});
  } else {
   const kind = key === 'saturn-orbit' ? 'saturn' : key === 'titan-orbit'?'titan':key === 'mars-orbit' ? 'mars' : 'moon';
   planetTexture = texture(rockyMap(kind));
   const planetMat = material(new T.MeshStandardMaterial({map: planetTexture, color: kind==='titan'?0xd2a769:0xffffff, roughness: .94, metalness: 0}));
   planet = own(new T.Mesh(geometry(new T.SphereGeometry(radius, 64, 48)), planetMat));
   planet.name = key === 'saturn-orbit' ? 'saturno-artistico' : '';
   new T.TextureLoader().load(new URL(`../../texturas/${kind==='saturn'?'saturno':kind==='titan'?'tita':kind==='mars'?'marte':'lua'}.jpg`,import.meta.url).href,tex=>{if(disposed){tex.dispose();return;}tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=8;texture(tex);planetMat.map=tex;planetMat.needsUpdate=true;},undefined,()=>{});
   if (key === 'saturn-orbit') {
    const ringTexture = texture(canvasTexture((ctx,w,h)=>{
     // RingGeometry UVs span a unit disc; compensate for the 2:1 canvas.
     ctx.clearRect(0,0,w,h);ctx.save();ctx.scale(1,h/w);
     const cx=w/2,cy=w/2,outer=w*.5;
     for(let i=0;i<70;i++){
      const fraction=.55+i*.45/69;
      const brightness=170+Math.sin(i*.9)*28+Math.cos(i*.37)*18;
      const opacity=fraction>.73&&fraction<.78?.15:.72;
      ctx.beginPath();ctx.arc(cx,cy,outer*fraction,0,Math.PI*2);
      ctx.strokeStyle=`rgba(${brightness+25},${brightness+4},${brightness-35},${opacity})`;
      ctx.lineWidth=outer*.008;ctx.stroke();
     }
     ctx.restore();
    },512));
    const ringMat=material(new T.MeshBasicMaterial({map:ringTexture,color:0xffffff,transparent:true,opacity:.84,side:T.DoubleSide,depthWrite:false}));
    saturnRings=own(new T.Mesh(geometry(new T.RingGeometry(radius*1.18,radius*2.15,128)),ringMat));
    saturnRings.rotation.x=Math.PI/2+.23;saturnRings.name='aneis-saturno-artistico';
   }
   if (kind === 'mars') { const atmos = own(new T.Mesh(geometry(new T.SphereGeometry(radius * 1.035, 48, 32)), material(new T.MeshBasicMaterial({color: 0xc76b4a, transparent: true, opacity: .075, side: T.BackSide, depthWrite: false})))); haze = atmos; }
  }
 } else if (key === 'moon-ground' || key === 'mars-ground' || key === 'titan-ground') {
  const style = key === 'moon-ground' ? 'moon' : 'mars';
  const extent=Math.max(modelSpan*24,120),flatRadius=Math.max(3,Math.min(modelSpan*.45,5));
  terrain=own(new T.Mesh(geometry(terrainGeometry(extent,96,floorY,style,flatRadius)),material(regolithMaterial(style))));
  terrain.name='terreno-artistico';
  ridge=own(new T.Mesh(geometry(ridgeGeometry(extent*.43,floorY,modelSpan)),material(new T.MeshStandardMaterial({color:style==='mars'?0x784b36:0x464646,roughness:1,side:T.DoubleSide}))));
  ridge.name='relevo-distante';
  const rockGeo=geometry(new T.DodecahedronGeometry(1,0)),rockMat=material(new T.MeshStandardMaterial({color:style==='mars'?0x674232:0x55534f,roughness:1}));
  const rocks=new T.InstancedMesh(rockGeo,rockMat,28),dummy=new T.Object3D();
  for(let i=0;i<28;i++){
   const a=i*2.39996,r=flatRadius*2+((i*17)%29),scale=.12+((i*7)%11)*.026;
   const x=Math.cos(a)*r,z=Math.sin(a)*r;dummy.position.set(x,terrain.geometry.userData.heightAt(x,z)+scale*.4,z);dummy.rotation.set(i*.81,i*.43,i*.29);dummy.scale.set(scale*1.5,scale*.7,scale);dummy.updateMatrix();rocks.setMatrixAt(i,dummy.matrix);
  }
  rocks.name='roches-eparses';ownedObjects.add(rocks);own(rocks);
  // Soft contact shading is an artistic cue, not a physical shadow simulation.
  const shadowTex=texture(canvasTexture((ctx,w,h)=>{const g=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,h/2);g.addColorStop(0,'rgba(0,0,0,.38)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);},128));
  const shadow=own(new T.Mesh(geometry(new T.PlaneGeometry(flatRadius*2,flatRadius*2)),material(new T.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false}))));shadow.rotation.x=-Math.PI/2;shadow.position.y=floorY+.012;shadow.name='ombre-contact-artistique';
 } else if (key === 'ocean') {
  const extent = Math.max(modelSpan * 30, 120);
  ocean=own(new T.Mesh(geometry(new T.PlaneGeometry(extent,extent,64,64)),material(criarMaterialOceano({extent}))));
  ocean.rotation.x=-Math.PI/2;ocean.position.set(0,floorY,0);ocean.name='oceano-artistico';
 } else if (key === 'runway') {
  // Artistic Kennedy-area landing scene for STS-61; this is not a historical reconstruction.
  const length=Math.max(modelSpan*34,260),width=Math.max(modelSpan*1.45,30),field=length*1.45;
  const grassMat=material(new T.MeshStandardMaterial({color:0x526b45,roughness:1}));
  const asphaltMat=material(new T.MeshStandardMaterial({color:0x555957,roughness:.94,metalness:0}));
  const markingMat=material(new T.MeshStandardMaterial({color:0xe9e6d8,roughness:.82}));
  const shoulderMat=material(new T.MeshStandardMaterial({color:0x85847b,roughness:.95}));
  const grass=own(new T.Mesh(geometry(new T.PlaneGeometry(field,field)),grassMat));
  grass.rotation.x=-Math.PI/2;grass.position.y=floorY-.035;grass.name='campo-costeiro-artistico';
  const runway=own(new T.Mesh(geometry(new T.PlaneGeometry(width,length)),asphaltMat));
  runway.rotation.x=-Math.PI/2;runway.position.y=floorY;runway.name='pista-kennedy-artistica';
  const shoulder=own(new T.Mesh(geometry(new T.PlaneGeometry(width*1.14,length)),shoulderMat));
  shoulder.rotation.x=-Math.PI/2;shoulder.position.y=floorY-.012;shoulder.name='acostamento-pista';
  // Markings are separate shallow planes to remain legible at the scene's model scale.
  const marking=(w,l,x,z,name)=>{
   const m=own(new T.Mesh(geometry(new T.PlaneGeometry(w,l)),markingMat));
   m.rotation.x=-Math.PI/2;m.position.set(x,floorY+.009,z);m.name=name;return m;
  };
  for(const side of [-1,1]){
   marking(.32,length*.94,side*width*.43,0,'linha-lateral-pista');
   for(const end of [-1,1]){
    const z=end*length*.43;
    for(let i=0;i<8;i++)marking(width*.055,2.8,(i-3.5)*width*.095,z,'faixa-de-cabeceira');
   }
  }
  for(let i=-5;i<=5;i++){
   const z=i*length*.047;
   // Leave a clear gap at the middle so the centerline reads as runway dashes.
   if(Math.abs(z)<length*.045)continue;
   const dash=own(new T.Mesh(geometry(new T.PlaneGeometry(.42,Math.max(2.4,length*.018))),markingMat));
   dash.rotation.x=-Math.PI/2;dash.position.set(0,floorY+.011,z);dash.name='traco-eixo-pista';
  }
  const edgeLights=material(new T.MeshStandardMaterial({color:0xf4df9b,emissive:0x9b7130,emissiveIntensity:.35,roughness:.45}));
  const lampGeo=geometry(new T.BoxGeometry(.32,.2,.32));
  for(const side of [-1,1])for(let i=0;i<38;i++){
   const lamp=own(new T.Mesh(lampGeo,edgeLights));lamp.position.set(side*width*.58,floorY+.1,-length*.46+i*length*.92/37);lamp.name='baliza-de-borda';
  }
  // Low distant service buildings suggest the coastal spaceport setting without copying a specific facility.
  const hangarMat=material(new T.MeshStandardMaterial({color:0x9b9b91,roughness:.9}));
  for(const [x,z,w,h,d] of [[-width*1.8,-length*.39,width*1.5,modelSpan*.42,width*.6],[width*2.1,-length*.34,width*1.1,modelSpan*.3,width*.7],[-width*2.4,length*.38,width*1.25,modelSpan*.34,width*.8]]){
   const building=own(new T.Mesh(geometry(new T.BoxGeometry(w,h,d)),hangarMat));building.position.set(x,floorY+h/2,z);building.name='edificio-distante';
  }

 }

 let disposed = false, elapsed = 0;
 const _forward = new T.Vector3(), _right = new T.Vector3(), _up = new T.Vector3(), _focus = new T.Vector3();
 function update(dt = 0) {
  if (disposed) return;
  const delta = Math.max(0, Math.min(Number(dt) || 0, .05));
  if (!reducedMotion()) elapsed += delta;
  camera.getWorldDirection(_forward); _right.crossVectors(_forward, camera.up).normalize(); _up.crossVectors(_right, _forward).normalize();
  if (key === 'sky' || key === 'earth' || key === 'moon-orbit' || key === 'mars-orbit' || key === 'titan-orbit' || key === 'saturn-orbit' || key === 'titan-sky' || key === 'saturn-sky') {
   const viewDist = Math.max(camera.position.distanceTo(center), modelSpan * 1.6, 8);
   const depth = Math.min(Math.max(viewDist * 3.2, modelSpan * 5, 45), 1800);
   const halfHeight = depth * Math.tan(T.MathUtils.degToRad(camera.fov * .5));
   env.position.copy(camera.position); env.quaternion.copy(camera.quaternion);
   gradient.scale.setScalar(Math.max(depth * 1.4, 100));
   if (cloudLayer) cloudLayer.scale.copy(gradient.scale).multiplyScalar(.995);
   if (key !== 'sky' && key !== 'titan-sky' && key !== 'saturn-sky') {
    const r = Math.max(modelSpan * .68, halfHeight * .31, .8);
    const globeOffset = _right.clone().multiplyScalar(halfHeight * Math.min(camera.aspect * .55, .63)).addScaledVector(_up, halfHeight * .17);
    const globeCenter = new T.Vector3(globeOffset.dot(_right), globeOffset.dot(_up), -depth);
    if (planet) { planet.position.copy(globeCenter); planet.scale.setScalar(r / sphereRadius); if (!reducedMotion()) planet.rotation.y = elapsed * .012; }
    if (saturnRings) { saturnRings.position.copy(globeCenter); saturnRings.scale.setScalar(r / sphereRadius); if (!reducedMotion()) saturnRings.rotation.y = elapsed * .012; }
    if (earthBase) { earthBase.position.copy(globeCenter); earthBase.scale.setScalar(r / sphereRadius); if (!reducedMotion()) earthBase.rotation.y = elapsed * .009; }
    if (earthClouds) { earthClouds.position.copy(globeCenter); earthClouds.scale.setScalar((r * 1.012) / (sphereRadius * 1.012)); if (!reducedMotion()) earthClouds.rotation.y = elapsed * .012; }
    if (haze && key === 'mars-orbit') { haze.position.copy(globeCenter); haze.scale.setScalar((r * 1.035) / sphereRadius); }
   }
   if (cloudLayer && !reducedMotion()) cloudLayer.rotation.y += delta * .0007;
  } else {
   gradient.position.copy(camera.position);gradient.scale.setScalar(2000);
   // Relief stays in world space, including while the user orbits the vehicle.

  }
  if (ocean && !reducedMotion()) ocean.material.uniforms.time.value = elapsed;
 }
 update(0);
 function dispose() {
  if (disposed) return; disposed = true;
  scene.remove(env);
  for (const object of ownedObjects) object.dispose?.();
  for (const item of owned) item.dispose?.();
  env.clear();
 }
 function inspect() {
  return {scenario: key, requestedScenario: requested, fallback: key !== requested, scale: {modelSpan, floorY, bounds: fitInfo.bounds}, objects: env.children.map(o => ({name: o.name || o.type, visible: o.visible})), motionReduced: reducedMotion()};
 }
 return {update, dispose, inspect};
}
