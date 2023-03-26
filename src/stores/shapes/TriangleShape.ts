import * as THREE from 'three';

import BaseShape from './BaseShape';
import { IShapeProps } from '../../interfaces/scene.interfaces';

class TriangleShape extends BaseShape {
  constructor(props: IShapeProps, protected raycaster: THREE.Raycaster) {
    super(props, raycaster);

    const { color, width, height } = props;

    const shape = new THREE.Shape();

    // Define the triangle's geometry
    shape.moveTo(0, 0);
    shape.lineTo(width, 0);
    shape.lineTo(width / 2, height);
    shape.lineTo(0, 0);

    const geometry = new THREE.ShapeGeometry(shape);

    // Scale the geometry to the desired width and height
    geometry.scale(width / height, 1, 0);

    // Center the geometry within the bounding box
    geometry.translate(-width / 2 - 0.5, -height / 2 + 0.5, 0);

    this.material = new THREE.MeshBasicMaterial({ color });
    this.shape = new THREE.Mesh(geometry, this.material);
  }
}

export default TriangleShape;
