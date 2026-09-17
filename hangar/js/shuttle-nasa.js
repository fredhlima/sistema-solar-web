import * as T from 'three';
import {NASA_SHUTTLE} from './shuttle-nasa-data.js?v=3';

// Offline NASA source geometry, already converted from inches to metres.
// Texture injection lets geometry tests run without pretending to render pixels.
export function criarModeloNASA(id,loadTexture=uri=>new T.TextureLoader().load(uri)){
 const source=NASA_SHUTTLE[id];
 if(!source)throw new Error(`Modelo NASA desconhecido: ${id}`);
 const root=new T.Group();root.name=`NASA / ${id}`;root.userData.source='NASA-3D-Resources / Space Shuttle (D)';
 const textures=source.images.map(uri=>{const t=loadTexture(uri);t.colorSpace=T.SRGBColorSpace;t.flipY=false;t.anisotropy=8;return t;});
 const materials=source.materials.map(def=>{
  const isGlass=def.name==='shut-glass',isRadiator=def.name==='doors inside';
  const color=new T.Color().setRGB(...def.color);
  // Source normals and colour maps carry the detail; no raised grid/bump layer.
  if(isGlass)color.setHex(0x14212c);
  if(isRadiator)color.setHex(0xd8dbdb);
  const m=new T.MeshStandardMaterial({name:def.name,color,roughness:isGlass?.13:isRadiator?.58:.8,metalness:isGlass?.22:isRadiator?.12:.02,side:T.DoubleSide});
  if(def.image!==undefined)m.map=textures[def.image];
  return m;
 });
 function unpack(base64,ArrayType){const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));return new ArrayType(bytes.buffer);}
 for(const def of source.meshes){
  const geometry=new T.BufferGeometry();
  for(const [key,n]of [['position',3],['normal',3],['uv',2]])geometry.setAttribute(key,new T.BufferAttribute(unpack(def[key],Float32Array),n));
  geometry.setIndex(new T.BufferAttribute(unpack(def.index,Uint32Array),1));geometry.computeBoundingSphere();
  const mesh=new T.Mesh(geometry,materials[def.material].clone());mesh.name=source.materials[def.material].name;root.add(mesh);
 }
 return root;
}
