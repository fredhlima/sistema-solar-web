import * as T from 'three';
import {NASA_APOLLO} from './apollo-nasa-data.js?v=2';

function bytes(base64){return Uint8Array.from(atob(base64),c=>c.charCodeAt(0));}
function unpack(def){
 const positionQ=new Uint16Array(bytes(def.position).buffer);
 const normalQ=new Int16Array(bytes(def.normal).buffer);
 const uvQ=new Uint16Array(bytes(def.uv).buffer);
 const position=new Float32Array(positionQ.length),normal=new Float32Array(normalQ.length),uv=new Float32Array(uvQ.length);
 for(let i=0;i<positionQ.length;i++)position[i]=def.positionLow[i%3]+positionQ[i]/65535*def.positionSpan[i%3];
 for(let i=0;i<normalQ.length;i++)normal[i]=normalQ[i]/32767;
 for(let i=0;i<uvQ.length;i++)uv[i]=def.uvLow[i%2]+uvQ[i]/65535*def.uvSpan[i%2];
 const indexBytes=bytes(def.index);const index=def.indexType===16?new Uint16Array(indexBytes.buffer):new Uint32Array(indexBytes.buffer);
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(position,3));geometry.setAttribute('normal',new T.BufferAttribute(normal,3));geometry.setAttribute('uv',new T.BufferAttribute(uv,2));geometry.setIndex(new T.BufferAttribute(index,1));geometry.computeBoundingSphere();return geometry;
}
function materials(source,images=[],loadTexture=uri=>new T.TextureLoader().load(uri),saturn=false){
 const textures=images.map(uri=>{const texture=loadTexture(uri);texture.colorSpace=T.SRGBColorSpace;texture.flipY=false;texture.anisotropy=8;return texture;});
 return source.map((def,index)=>{
  let color=new T.Color().setRGB(...def.color);
  // The old full-rocket colour maps mix non-flight colours and later markings.
  // Preserve official geometry, but reconstruct Apollo 11's white/black/metal palette.
  if(saturn&&def.image!==undefined)color.setHex(0xe8e8df);
  if(saturn&&[0,7,12].includes(index))color.setHex(index===12?0x6c7072:0xaeb3b3);
  const metal=saturn&&[0,7,12].includes(index);
  const material=new T.MeshStandardMaterial({name:def.name,color,roughness:metal?.38:(def.roughness??.62),metalness:metal?.62:(def.metalness??0),side:T.DoubleSide});
  if(!saturn&&def.image!==undefined)material.map=textures[def.image];
  return material;
 });
}
function build(meshes,materialSet,name){
 const root=new T.Group();root.name=name;root.userData.source='NASA-3D-Resources';const nodes=new Map();
 for(const def of meshes){let parent=nodes.get(def.node);if(!parent){parent=new T.Group();parent.name=def.node;nodes.set(def.node,parent);root.add(parent);}const mesh=new T.Mesh(unpack(def),materialSet[def.material].clone());mesh.name=materialSet[def.material].name;mesh.userData.sourceMaterial=def.material;parent.add(mesh);if(def.engine)parent.userData.engine=true;}
 return root;
}
export function criarPecaSaturnoNASA(id){
 const meshes=NASA_APOLLO.saturn.parts[id];if(!meshes)throw new Error(`Peça Saturn V NASA desconhecida: ${id}`);
 const root=build(meshes,materials(NASA_APOLLO.saturn.materials,[],undefined,true),`NASA Saturn V / ${id}`);
 // The source model's legacy maps depict a generic display vehicle, including a
 // blue stage. Use its geometry with the neutral flight palette, then add SA-506
 // roll markings as flush paint geometry in saturno-v-model.js.
 root.traverse(object=>{if(object.isMesh){const metallic=id==='sm'||id==='cm';object.material.color.setHex(metallic?0xaeb4b7:0xe8e8df);object.material.roughness=metallic?.38:.72;object.material.metalness=metallic?.58:.03;}});
 if(id==='iu')root.traverse(object=>{if(object.isMesh){object.material.color.setHex(0x202427);object.material.roughness=.58;}});
 for(const node of root.children.filter(child=>child.userData.engine))node.traverse(object=>{if(object.isMesh){object.material.color.setHex(0x8e969a);object.material.metalness=.7;object.material.roughness=.34;}});
 return root;
}
export function criarModuloLunarNASA(loadTexture){
 return build(NASA_APOLLO.lunar.meshes,materials(NASA_APOLLO.lunar.materials,NASA_APOLLO.lunar.images,loadTexture), 'NASA Apollo Lunar Module');
}
