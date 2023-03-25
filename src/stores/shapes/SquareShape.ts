import * as THREE from 'three';

import BaseShape from './BaseShape';
import { IShapeProps } from '../../interfaces/scene.interfaces';

class SquareShape extends BaseShape {
  constructor(props: IShapeProps, protected raycaster: THREE.Raycaster) {
    super(props, raycaster);

    const { color, width, height } = props;

    const shape = new THREE.Shape();

    // Define the square's geometry
    shape.moveTo(0, 0);
    shape.lineTo(width, 0);
    shape.lineTo(width, height);
    shape.lineTo(0, height);
    shape.lineTo(0, 0);

    // Set the autoClose property to ensure that the shape is closed when rendered
    shape.autoClose = true;

    const geometry = new THREE.ShapeGeometry(shape);

    this.material = new THREE.MeshBasicMaterial({ color });
    this.shape = new THREE.Mesh(geometry, this.material);
    this.shape.position.set(-100, 100, 0);
  }
}

export default SquareShape;
