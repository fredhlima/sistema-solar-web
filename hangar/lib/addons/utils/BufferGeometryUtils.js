import {
 TriangleFanDrawMode,
 TriangleStripDrawMode,
 TrianglesDrawMode
} from 'three';

function toTrianglesDrawMode(geometry,drawMode){
 if(drawMode===TrianglesDrawMode)return geometry;
 if(geometry.index===null){
  const position=geometry.getAttribute('position'),indices=[];
  if(position!==undefined)for(let i=0;i<position.count;i++)indices.push(i);
  geometry.setIndex(indices);
 }
 const triangles=geometry.index.count-2,newIndices=[];
 if(drawMode===TriangleFanDrawMode){
  for(let i=1;i<=triangles;i++)newIndices.push(geometry.index.getX(0),geometry.index.getX(i),geometry.index.getX(i+1));
 }else if(drawMode===TriangleStripDrawMode){
  for(let i=0;i<triangles;i++){
   if(i%2===0)newIndices.push(geometry.index.getX(i),geometry.index.getX(i+1),geometry.index.getX(i+2));
   else newIndices.push(geometry.index.getX(i+2),geometry.index.getX(i+1),geometry.index.getX(i));
  }
 }else{
  console.error('THREE.BufferGeometryUtils.toTrianglesDrawMode(): Invalid draw mode.',drawMode);
  return geometry;
 }
 const converted=geometry.clone();
 converted.setIndex(newIndices);
 converted.clearGroups();
 return converted;
}
export {toTrianglesDrawMode};
