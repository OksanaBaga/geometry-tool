import * as THREE from 'three';

import { IShape } from '../../interfaces/scene.interfaces';

class TriangleShape implements IShape {
  readonly shape: THREE.Shape;
  readonly geometry: THREE.ShapeGeometry;
  readonly material: THREE.MeshBasicMaterial;

  public mesh: THREE.Mesh;

  constructor(color: string, width: number, height: number) {
    this.shape = new THREE.Shape();

    // Define the triangle's geometry
    this.shape.moveTo(0, 0);
    this.shape.lineTo(width, 0);
    this.shape.lineTo(width / 2, height);
    this.shape.lineTo(0, 0);

    this.geometry = new THREE.ShapeGeometry(this.shape);

    // Scale the geometry to the desired width and height
    this.geometry.scale(width / height, 1, 1);

    // Center the geometry within the bounding box
    this.geometry.translate(-width / 2 - 1, -height / 2 + 1, 0);

    this.material = new THREE.MeshBasicMaterial({ color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}

export default TriangleShape;
