import * as THREE from 'three';

import { IShape, IShapeProps } from '../../interfaces/scene.interfaces';

class BaseShape implements IShape {
  public material: THREE.MeshBasicMaterial;
  public shape: THREE.Mesh;

  constructor({ color }: IShapeProps) {
    const shape = new THREE.Shape();

    // Create a new ShapeGeometry from the shape
    const geometry = new THREE.ShapeGeometry(shape);

    this.material = new THREE.MeshBasicMaterial({ color });
    this.shape = new THREE.Mesh(geometry, this.material);
  }

  intersect(raycaster: THREE.Raycaster): THREE.Intersection<THREE.Object3D>[] {
    return raycaster.intersectObject(this.shape);
  }

  onKeyDown(event: KeyboardEvent): void {
    const delta = 0.1; // adjust the movement distance as needed

    switch (event.code) {
      case 'ArrowUp':
        this.shape.position.y += delta;
        break;
      case 'ArrowDown':
        this.shape.position.y -= delta;
        break;
      case 'ArrowLeft':
        this.shape.position.x -= delta;
        break;
      case 'ArrowRight':
        this.shape.position.x += delta;
        break;
      default:
        break;
    }
  }

  setColor(color: string): void {
    this.material.color = new THREE.Color(color);
  }

  setPosition(position: THREE.Vector3): void {
    this.shape.position.copy(position);
  }
}

export default BaseShape;
