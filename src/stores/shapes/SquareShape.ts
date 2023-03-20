import * as THREE from 'three';

import { IShape } from '../../interfaces/scene.interfaces';

class SquareShape implements IShape {
  readonly shape: THREE.Shape;
  readonly geometry: THREE.ShapeGeometry;
  readonly material: THREE.MeshBasicMaterial;

  public mesh: THREE.Mesh;

  constructor(color: string, width: number, height: number) {
    this.shape = new THREE.Shape();

    // Define the square's geometry
    this.shape.moveTo(0, 0);
    this.shape.lineTo(width, 0);
    this.shape.lineTo(width, height);
    this.shape.lineTo(0, height);
    this.shape.lineTo(0, 0);

    // Set the autoClose property to ensure that the shape is closed when rendered
    this.shape.autoClose = true;

    this.geometry = new THREE.ShapeGeometry(this.shape);
    this.material = new THREE.MeshBasicMaterial({ color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}

export default SquareShape;
