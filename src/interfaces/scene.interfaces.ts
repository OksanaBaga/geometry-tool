import * as THREE from 'three';

export interface IShape {
  material: THREE.MeshBasicMaterial;
  shape: THREE.Mesh;

  intersect(): THREE.Intersection<THREE.Object3D>[];
  onKeyDown(event: KeyboardEvent): void;
  removeMarker(): void;
  setColor(color: string): void;
  setPosition(position: THREE.Vector3): void;
  showClosestPoint(): void;
}

export interface IShapeProps {
  color: string;
  width: number;
  height: number;
}
