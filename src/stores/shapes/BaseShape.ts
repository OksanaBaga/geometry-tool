import * as THREE from 'three';
import { BufferAttribute } from 'three/src/core/BufferAttribute';

import { IShape, IShapeProps } from '../../interfaces/scene.interfaces';

interface Point {
  x: number;
  y: number;
}

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

  showClosestPoint(mouse: THREE.Vector2): void {
    if (!this.marker) {
      this.addMarker();
    }

    // Find the intersection point of the ray with the shape
    const intersects = this.intersect();
    if (intersects.length > 0) {
      // If the mouse is inside the shape, move the marker near the mouse
      this.intersectPoint.copy(intersects[0].point);
      this.marker?.position.set(
        this.intersectPoint.x,
        this.intersectPoint.y,
        0
      );
    } else {
      const positions = (
        this.shape.geometry.getAttribute('position') as BufferAttribute
      ).array as number[];
      const vertices: Point[] = [];
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        vertices.push({ x, y });
      }
      const closestPoint = this.closestPointInPolygon(vertices, {
        x: mouse.x,
        y: mouse.y,
      });

      // console.log(closestPoint, mouse);

      // Update the position of the highlighted point to be at the closest point
      this.marker?.position.set(closestPoint.x, closestPoint.y, 0);
    }
  }

  closestPointInPolygon(poly: Point[], pos: Point): Point {
    let closestPoint: Point = poly[0];

    // Calculate the squared distance between two points
    function distanceSquared(p1: Point, p2: Point): number {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return dx * dx + dy * dy;
    }

    // Find the closest point to "pos" inside the polygon defined by "poly"
    for (let i = 0; i < poly.length; i++) {
      const p1 = poly[i];
      const p2 = poly[(i + 1) % poly.length];
      const v1 = { x: p2.x - p1.x, y: p2.y - p1.y };
      const v2 = { x: pos.x - p1.x, y: pos.y - p1.y };
      const dot = v1.x * v2.x + v1.y * v2.y;
      const len = v1.x * v1.x + v1.y * v1.y;
      const t = Math.max(0, Math.min(1, dot / len));
      const closest = {
        x: p1.x + t * v1.x,
        y: p1.y + t * v1.y,
      };
      if (distanceSquared(pos, closest) < distanceSquared(pos, closestPoint)) {
        closestPoint = closest;
      }
    }

    return closestPoint;
  }

  private addMarker(): void {
    const markerGeometry = new THREE.SphereGeometry(5, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    this.marker = new THREE.Mesh(markerGeometry, markerMaterial);
    this.shape.add(this.marker);
  }
}

export default BaseShape;
