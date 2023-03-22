import * as THREE from 'three';

import BaseShape from './BaseShape';
import { IShapeProps } from '../../interfaces/scene.interfaces';

class HexagonShape extends BaseShape {
  constructor(props: IShapeProps) {
    super(props);

    const { color, width, height } = props;

    const shape = new THREE.Shape();

    // Define the hexagon's geometry
    const radius = height / 2; // calculate the radius based on the height
    const vertices = 6;
    shape.moveTo(radius, 0);
    for (let i = 1; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      shape.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
    }
    shape.lineTo(radius, 0);

    // Create a new ShapeGeometry from the shape
    const geometry = new THREE.ShapeGeometry(shape);

    // Scale the geometry to the desired width and height
    geometry.scale(width / height, 1, 1);

    // Center the geometry within the bounding box
    geometry.translate(-width / 2, -height / 2, 0);

    this.material = new THREE.MeshBasicMaterial({ color });
    this.shape = new THREE.Mesh(geometry, this.material);
  }
}

export default HexagonShape;
