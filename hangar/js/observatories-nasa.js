import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js?v=1';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js?v=1';

const NASA_REVISION='11ebb4ee043715aefbba6aeec8a61746fad67fa7';
const NASA_RAW=`https://raw.githubusercontent.com/nasa/NASA-3D-Resources/${NASA_REVISION}/3D%20Models`;
const FILES={
 hubble:`${NASA_RAW}/Hubble%20Space%20Telescope%20(A)/Hubble%20Space%20Telescope%20(A).glb`,
 jwst:`${NASA_RAW}/James%20Webb%20Space%20Telescope%20(A)/James%20Webb%20Space%20Telescope%20(A).glb`
};

export async function carregarObservatorioNASA(id,onProgress=()=>{}){
 const arquivo=FILES[id];
 if(!arquivo)throw new Error(`Observatório NASA desconhecido: ${id}`);
 const draco=new DRACOLoader();
 draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
 const loader=new GLTFLoader();loader.setDRACOLoader(draco);
 try{
  const gltf=await loader.loadAsync(arquivo,event=>onProgress(event.total?event.loaded/event.total:0));
  const root=gltf.scene;root.name=`NASA / ${id}`;root.userData.source='NASA-3D-Resources';
  // The source models use different authoring units and origins. Normalize only
  // their presentation transform; source geometry and materials stay intact.
  const box=new T.Box3().setFromObject(root),center=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3());
  const scale=3.35/Math.max(size.x,size.y,size.z);
  root.position.copy(center).multiplyScalar(-scale);root.scale.setScalar(scale);
  root.traverse(object=>{if(object.isMesh){object.castShadow=false;object.receiveShadow=false;if(object.material)object.material.side=T.DoubleSide;}});
  return root;
 }finally{draco.dispose();}
}
