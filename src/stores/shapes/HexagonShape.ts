import * as THREE from 'three';

import { IShape } from '../../interfaces/scene.interfaces';

class HexagonShape implements IShape {
  readonly shape: THREE.Shape;
  readonly geometry: THREE.ShapeGeometry;
  readonly material: THREE.MeshBasicMaterial;

  public mesh: THREE.Mesh;

  constructor(color: string, width: number, height: number) {
    this.shape = new THREE.Shape();

    // Define the hexagon's geometry
    const radius = height / 2; // calculate the radius based on the height
    const vertices = 6;
    this.shape.moveTo(radius, 0);
    for (let i = 1; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      this.shape.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
    }
    this.shape.lineTo(radius, 0);

    // Create a new ShapeGeometry from the shape
    this.geometry = new THREE.ShapeGeometry(this.shape);

    // Scale the geometry to the desired width and height
    this.geometry.scale(width / height, 1, 1);

    // Center the geometry within the bounding box
    this.geometry.translate(-width / 2, -height / 2, 0);

    this.material = new THREE.MeshBasicMaterial({ color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}

export default HexagonShape;
