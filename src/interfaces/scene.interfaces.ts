import * as THREE from 'three';

export interface IShape {
  readonly shape: THREE.Shape;
  readonly geometry: THREE.ShapeGeometry;
  readonly material: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
}
