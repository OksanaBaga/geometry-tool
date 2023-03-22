import * as THREE from 'three';

import { IShape, IShapeProps } from '../../interfaces/scene.interfaces';

class BaseShape implements IShape {
  public material: THREE.MeshBasicMaterial;
  public shape: THREE.Mesh;

  private intersectPoint: THREE.Vector3 = new THREE.Vector3();
  private marker?: THREE.Mesh;

  constructor({ color }: IShapeProps, protected raycaster: THREE.Raycaster) {
    const shape = new THREE.Shape();

    // Create a new ShapeGeometry from the shape
    const geometry = new THREE.ShapeGeometry(shape);

    this.material = new THREE.MeshBasicMaterial({ color });
    this.shape = new THREE.Mesh(geometry, this.material);
  }

  intersect(): THREE.Intersection<THREE.Object3D>[] {
    return this.raycaster.intersectObject(this.shape);
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

  removeMarker(): void {
    if (!this.marker) return;

    this.shape.remove(this.marker);
    this.marker = undefined;
  }

  showClosestPoint(): void {
    if (!this.marker) {
      this.addMarker();
    }

    // Find the intersection point of the ray with the shape
    const intersects = this.intersect();
    if (intersects.length > 0) {
      // If the mouse is inside the shape, move the marker near the mouse
      this.intersectPoint.copy(intersects[0].point);
      this.marker?.position.copy(this.intersectPoint);
    } else {
      // get the closest point on the geometry to the intersection point
      const positions = (
        this.shape.geometry.getAttribute('position') as THREE.BufferAttribute
      ).array;
      const position = new THREE.Vector3();
      let closestDistance = Infinity;
      let closestIndex = -1;

      for (let i = 0; i < positions.length; i += 3) {
        position.set(positions[i], positions[i + 1], positions[i + 2]);
        const distance = this.intersectPoint.distanceTo(position);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      const closestPoint = new THREE.Vector3(
        positions[closestIndex],
        positions[closestIndex + 1],
        positions[closestIndex + 2]
      );

      // update the position of your marker object
      this.marker?.position.copy(closestPoint);
    }
  }

  private addMarker(): void {
    const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    this.marker = new THREE.Mesh(markerGeometry, markerMaterial);
    this.shape.add(this.marker);
  }
}

export default BaseShape;
