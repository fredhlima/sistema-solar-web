import * as T from 'three';

// Snapshots of the simplified models already used by motor3d.js. They are
// intentionally not redesigned here: these pages only expose existing work.
export function criarHubbleAtual(){
 const g=new T.Group(),prata=new T.MeshStandardMaterial({color:0xc8ccd4,metalness:.92,roughness:.26}),escuro=new T.MeshStandardMaterial({color:0x9aa0aa,metalness:.7,roughness:.4}),boomMat=new T.MeshStandardMaterial({color:0x888e98,metalness:.7,roughness:.5});
 const tubo=new T.Mesh(new T.CylinderGeometry(.34,.34,1.35,32),prata);tubo.rotation.z=Math.PI/2;g.add(tubo);
 const faixa=new T.Mesh(new T.CylinderGeometry(.352,.352,.26,32),new T.MeshStandardMaterial({color:0xcaa24a,metalness:.85,roughness:.35,emissive:0x2a1e08}));faixa.rotation.z=Math.PI/2;faixa.position.x=-.4;g.add(faixa);
 const rim=new T.Mesh(new T.CylinderGeometry(.36,.34,.14,32),escuro);rim.rotation.z=Math.PI/2;rim.position.x=.7;g.add(rim);
 const abertura=new T.Mesh(new T.CircleGeometry(.3,32),new T.MeshStandardMaterial({color:0x090b11,roughness:1,side:T.DoubleSide}));abertura.rotation.y=Math.PI/2;abertura.position.x=.775;g.add(abertura);
 const porta=new T.Mesh(new T.CircleGeometry(.33,32),new T.MeshStandardMaterial({color:0xd0d4dc,metalness:.8,roughness:.3,side:T.DoubleSide}));porta.position.set(.86,.36,0);porta.rotation.z=-.95;g.add(porta);
 const traseira=new T.Mesh(new T.SphereGeometry(.34,24,16,0,Math.PI*2,0,Math.PI/2),prata);traseira.rotation.z=-Math.PI/2;traseira.position.x=-.675;g.add(traseira);
 const painelMat=new T.MeshStandardMaterial({color:0x24305e,metalness:.5,roughness:.4,emissive:0x0a1436,side:T.DoubleSide});
 for(const lado of [-1,1]){const boom=new T.Mesh(new T.CylinderGeometry(.02,.02,.4,8),boomMat);boom.position.z=lado*.5;g.add(boom);const painel=new T.Mesh(new T.BoxGeometry(1.15,.02,.55),painelMat);painel.position.z=lado*.98;g.add(painel);}
 const braco=new T.Mesh(new T.CylinderGeometry(.015,.015,.34,8),boomMat);braco.position.set(-.15,-.42,0);g.add(braco);
 const prato=new T.Mesh(new T.SphereGeometry(.13,18,10,0,Math.PI*2,0,Math.PI/2.2),new T.MeshStandardMaterial({color:0xdadfe6,metalness:.6,roughness:.4,side:T.DoubleSide}));prato.position.set(-.15,-.6,0);g.add(prato);return g;
}

export function criarWebbAtual(){
 const g=new T.Group(),ouro=new T.MeshStandardMaterial({color:0xd9a938,metalness:.95,roughness:.2,emissive:0x2a1c04}),espelho=new T.Group(),geo=new T.CylinderGeometry(.155,.155,.05,6),passo=.172;
 for(let q=-2;q<=2;q++)for(let r=-2;r<=2;r++){const s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>2)continue;const hex=new T.Mesh(geo,ouro);hex.rotation.y=Math.PI/6;hex.position.set(passo*Math.sqrt(3)*(q+r/2),0,passo*1.5*r);espelho.add(hex);}espelho.position.y=.28;espelho.rotation.x=-.32;g.add(espelho);
 const boomMat=new T.MeshStandardMaterial({color:0x9a9a9a,metalness:.6,roughness:.5}),apice=new T.Vector3(0,.72,.62);
 for(const ang of [-.5,0,.5]){const base=new T.Vector3(Math.sin(ang)*.5,.28,Math.cos(ang)*.5-.1),dir=apice.clone().sub(base),perna=new T.Mesh(new T.CylinderGeometry(.014,.014,dir.length(),6),boomMat);perna.position.copy(base).addScaledVector(dir,.5);perna.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),dir.clone().normalize());g.add(perna);}
 const secundario=new T.Mesh(new T.CylinderGeometry(.11,.11,.03,24),ouro);secundario.position.copy(apice);secundario.rotation.x=Math.PI/2+.32;g.add(secundario);
 for(let i=0;i<5;i++){const mat=new T.MeshStandardMaterial({color:new T.Color().setHSL(.72,.28,.55-i/4*.12),metalness:.75,roughness:.32,side:T.DoubleSide,emissive:0x140f22}),camada=new T.Mesh(new T.PlaneGeometry(1.7-i*.06,1.05-i*.04),mat);camada.rotation.x=Math.PI/2;camada.rotation.z=Math.PI/4;camada.position.y=-.16-i*.05;g.add(camada);}
 const bus=new T.Mesh(new T.BoxGeometry(.34,.22,.34),new T.MeshStandardMaterial({color:0x3a3f4a,metalness:.6,roughness:.5}));bus.position.y=-.5;g.add(bus);return g;
}

export const MODELOS_FUTUROS={
 hubble:{id:'hubble',nome:'Hubble',missao:'OBSERVATÓRIO · 1990',estado:'Modelo simplificado atual',descricao:'Este é o modelo que já aparece no Sistema Solar. A futura versão do Hangar poderá detalhar instrumentos, manutenção e estrutura.',fonte:'https://science.nasa.gov/mission/hubble/observatory/design/',criar:criarHubbleAtual},
 jwst:{id:'jwst',nome:'James Webb',missao:'OBSERVATÓRIO · 2021',estado:'Modelo simplificado atual',descricao:'Este é o modelo que já aparece no Sistema Solar. A futura versão poderá explorar espelhos, escudo solar e instrumentos.',fonte:'https://science.nasa.gov/mission/webb/spacecraft-overview/',criar:criarWebbAtual}
};
