import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export function criarCarregador(decoderPath = '../lib/draco/') {
 const draco = new DRACOLoader();
 draco.setDecoderPath(decoderPath);
 const loader = new GLTFLoader();
 loader.setDRACOLoader(draco);
 return { loader, dispose: () => draco.dispose() };
}

export async function carregarPreview(loader, item, progresso) {
 const gltf = await loader.loadAsync(item.arquivo, progresso);
 const model = new T.Group();
 gltf.scene.rotation.set(...item.rotacao);
 model.add(gltf.scene);
 model.updateMatrixWorld(true);
 const box = new T.Box3().setFromObject(model);
 const tamanho = box.getSize(new T.Vector3());
 const maior = Math.max(tamanho.x, tamanho.y, tamanho.z);
 if (!Number.isFinite(maior) || maior <= 0){liberarPreview(model);throw new Error('Modelo vazio');}
 gltf.scene.position.sub(box.getCenter(new T.Vector3()));
 model.scale.setScalar(3 / maior);
 model.updateMatrixWorld(true);
 return model;
}

export function iluminarPreview(scene) {
 scene.add(new T.HemisphereLight(0xd5e9ff, 0x34323b, 2.6));
 const key = new T.DirectionalLight(0xffffff, 3.4);
 key.position.set(3, 4, 5); scene.add(key);
 const rim = new T.DirectionalLight(0x94d5ff, 2);
 rim.position.set(-4, 1, -3); scene.add(rim);
}

export function enquadrarPreview(camera, model, aspect, { fitBox = false } = {}) {
 const box = new T.Box3().setFromObject(model);
 const radius = box.getBoundingSphere(new T.Sphere()).radius;
 const fov = T.MathUtils.degToRad(camera.fov);
 const limit = Math.min(fov / 2, Math.atan(Math.tan(fov / 2) * aspect));
 let distance = radius / Math.sin(limit) * 1.15;
 if (fitBox) {
  // Long booms need a fit to the projected box, rather than to its sphere.
  camera.position.set(3,2,4.5).normalize();camera.lookAt(0,0,0);
  const inverse=camera.quaternion.clone().invert(),tanV=Math.tan(fov/2),tanH=tanV*aspect;
  distance=0;
  // Actual vertices avoid empty corners of a bounding box around long antennas.
  const point=new T.Vector3();model.updateMatrixWorld(true);
  model.traverse(node=>{const positions=node.geometry?.getAttribute('position');if(!positions||!node.visible)return;
   for(let i=0;i<positions.count;i++){
    point.fromBufferAttribute(positions,i).applyMatrix4(node.matrixWorld).applyQuaternion(inverse);
    distance=Math.max(distance,Math.abs(point.x)/tanH+point.z,Math.abs(point.y)/tanV+point.z);
   }
  });
  distance*=1.12;
 }
 camera.position.copy(new T.Vector3(3, 2, 4.5).normalize().multiplyScalar(distance));
 camera.near = Math.max(.01, distance / 1000);
 camera.far = distance * 100;
 camera.aspect = aspect; camera.lookAt(0, 0, 0); camera.updateProjectionMatrix();
 return distance;
}

export function liberarPreview(model) {
 const textures = new Set(), materials = new Set(), geometries = new Set();
 model.traverse(node => {
  if (node.geometry) geometries.add(node.geometry);
  for (const material of node.material ? (Array.isArray(node.material) ? node.material : [node.material]) : []) {
   materials.add(material);
   for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
  }
 });
 textures.forEach(texture => texture.dispose());
 materials.forEach(material => material.dispose());
 geometries.forEach(geometry => geometry.dispose());
}
