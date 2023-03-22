import * as THREE from 'three';
import { makeAutoObservable } from 'mobx';

import { IRootStore, ISceneStore } from '../interfaces/stores.interfaces';
import { EditToolTypes, TShape } from '../types';
import SquareShape from './shapes/SquareShape';
import TriangleShape from './shapes/TriangleShape';
import HexagonShape from './shapes/HexagonShape';
import { IShape, IShapeProps } from '../interfaces/scene.interfaces';

const DEFAULT_COLOR = '#eef4fc';

class SceneStore implements ISceneStore {
  // Scene props
  readonly camera: THREE.PerspectiveCamera;
  readonly mouse: THREE.Vector2;
  readonly scene: THREE.Scene;

  private renderer: THREE.WebGLRenderer;
  private raycaster: THREE.Raycaster;
  private marker?: THREE.Mesh;

  // Shape props
  private draggingOffset?: THREE.Vector3;
  private intersectPoint: THREE.Vector3 = new THREE.Vector3();
  private isShapeDragging: boolean;
  private selectedShape?: IShape;
  private shapes: IShape[];

  private rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    this.shapes = [];
    this.isShapeDragging = false;

    const container = document.getElementById('canvas-renderer');
    const width =
      container?.offsetWidth ||
      this.rootStore.canvasRef?.width ||
      window.innerWidth;
    const height =
      container?.offsetHeight ||
      this.rootStore.canvasRef?.height ||
      window.innerHeight;

    // Create a Scene and Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Create a Raycaster
    this.raycaster = new THREE.Raycaster();

    // Create a vector representing the mouse position
    this.mouse = new THREE.Vector2();

    // Create a Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.rootStore.canvasRef,
    });

    // Set renderer side depends on the container size
    this.renderer.setSize(width, height);
    // Apply the Renderer to the DOM
    container?.appendChild(this.renderer.domElement);

    // Set Camera position
    this.camera.position.z = 3;

    // Call animate to start rendering
    this.animate();
    // Subscribe to the browser events to handle mouse and resize.
    this.subscribeToBrowserEvents();

    makeAutoObservable(this, {}, { autoBind: true });
  }

  /** Static Methods */

  private static getShape(
    shapeType: TShape,
    color: string,
    size: number
  ): IShape | null {
    const shapeProps: IShapeProps = {
      color,
      width: size,
      height: size,
    };

    switch (shapeType) {
      case EditToolTypes.SQUARE:
        return new SquareShape(shapeProps);
      case EditToolTypes.TRIANGLE:
        return new TriangleShape(shapeProps);
      case EditToolTypes.HEXAGON:
        return new HexagonShape(shapeProps);
      default:
        console.warn(`${shapeType} is not supported yet!`);
        return null;
    }
  }

  private static getIntersection(x: number, y: number): THREE.Vector3 {
    return new THREE.Vector3(
      (x / window.innerWidth) * 2 - 1,
      -(y / window.innerHeight)
    );
  }

  /** Public Methods */

  public addShape(shapeType: TShape): void {
    const shape = SceneStore.getShape(shapeType, DEFAULT_COLOR, 1);

    if (!shape) return;

    const mesh: THREE.Mesh = shape.shape;

    this.scene.add(mesh);
    this.shapes.push(shape);
  }

  public getShapeById(id: string): IShape | undefined {
    return this.shapes.find((item: IShape) => item.shape.uuid === id);
  }

  public dispose() {
    this.unsubscribeFromMouseEvents();
  }

  /** Private Methods */

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    this.renderer.render(this.scene, this.camera);
  };

  private addMarker(): void {
    const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    this.marker = new THREE.Mesh(markerGeometry, markerMaterial);
    this.scene.add(this.marker);
  }

  // TODO: Move it to the Shape
  private handleClosestPoint(): void {
    if (!this.selectedShape) {
      return;
    }

    if (!this.marker) {
      this.addMarker();
    }

    // Find the intersection point of the ray with the shape
    const intersects = this.selectedShape.intersect(this.raycaster);
    if (intersects.length > 0) {
      // If the mouse is inside the shape, move the marker near the mouse
      this.intersectPoint.copy(intersects[0].point);
      this.marker?.position.copy(this.intersectPoint);
    } else {
      // get the closest point on the geometry to the intersection point
      const positions = (
        this.selectedShape.shape.geometry.getAttribute(
          'position'
        ) as THREE.BufferAttribute
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

  private getShapesIntersects(): THREE.Intersection<THREE.Object3D>[] {
    return this.shapes.reduce((curr, item) => {
      curr.push(...item.intersect(this.raycaster));

      return curr;
    }, [] as THREE.Intersection<THREE.Object3D>[]);
  }

  private handleDrag(event: MouseEvent): void {
    if (!this.selectedShape) {
      return;
    }

    this.setIsShapeDragging(true);
    this.draggingOffset = new THREE.Vector3();

    const intersection = SceneStore.getIntersection(
      event.clientX,
      event.clientY
    );

    if (intersection) {
      this.draggingOffset
        .copy(intersection)
        .sub(this.selectedShape?.shape.position);
    }
  }

  private handleSelect(): void {
    // Calculate the intersection between the ray and the shape
    const intersects = this.getShapesIntersects();

    // If the ray intersects with the shape, log the shape object to the console
    if (intersects.length > 0) {
      const objectId = intersects[0].object.uuid;
      const shape = this.getShapeById(objectId);

      if (shape) {
        this.setSelectedShape(shape);
      }
    } else {
      this.setSelectedShape(undefined);
    }
  }

  private normalizeMouse(event: MouseEvent): void {
    // Calculate the mouse position in normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the Raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);
  }

  private setSelectedShape(shape?: IShape): void {
    // Clear previous selected shape color
    if (this.selectedShape) {
      this.selectedShape.setColor(DEFAULT_COLOR);
    }

    if (shape) {
      // Highlight the selected shape
      shape.setColor('#8efc8f');
    }

    this.selectedShape = shape;
  }

  private setIsShapeDragging(isShapeDragging: boolean): void {
    this.isShapeDragging = isShapeDragging;
  }

  private subscribeToBrowserEvents(): void {
    if (!window || !document) return;

    window.addEventListener('resize', this.onResize.bind(this), false);
    document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    document.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    document.addEventListener('keydown', this.onKeyDown.bind(this), false);
  }

  private unsubscribeFromMouseEvents(): void {
    if (!window || !document) return;

    window.removeEventListener('resize', this.onResize.bind(this), false);
    document.removeEventListener(
      'mousemove',
      this.onMouseMove.bind(this),
      false
    );
    document.removeEventListener(
      'mousedown',
      this.onMouseDown.bind(this),
      false
    );
    document.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    document.removeEventListener('keydown', this.onKeyDown.bind(this), false);
  }

  /** Mouse Events */

  private onResize(): void {
    const container = document.getElementById('canvas-renderer');
    const width =
      container?.offsetWidth ||
      this.rootStore.canvasRef?.width ||
      window.innerWidth;
    const height =
      container?.offsetHeight ||
      this.rootStore.canvasRef?.height ||
      window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    // Change the Renderer size on screen resize
    this.renderer.setSize(width, height);
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.rootStore.editToolStore.selectedTool) {
      return;
    }

    this.normalizeMouse(event);

    switch (this.rootStore.editToolStore.selectedTool.type) {
      case EditToolTypes.MOVE:
        const intersection = SceneStore.getIntersection(
          event.clientX,
          event.clientY
        );
        if (intersection && this.selectedShape && this.draggingOffset) {
          this.selectedShape.setPosition(intersection.sub(this.draggingOffset));
        }
        break;
      case EditToolTypes.CLOSEST_POINT:
        this.handleClosestPoint();
        break;
      default:
        break;
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (
      this.rootStore.editToolStore.selectedTool?.type !== EditToolTypes.MOVE
    ) {
      return;
    }

    this.selectedShape?.onKeyDown(event);
  }

  private onMouseDown(event: MouseEvent): void {
    if (
      event.target !== this.rootStore.canvasRef || // The click originated outside the canvas
      !this.rootStore.editToolStore.selectedTool
    ) {
      return;
    }

    this.normalizeMouse(event);

    switch (this.rootStore.editToolStore.selectedTool.type) {
      case EditToolTypes.SELECT:
        this.handleSelect();
        break;
      case EditToolTypes.MOVE:
        this.handleDrag(event);
        break;
      default:
        break;
    }
  }

  private onMouseUp(): void {
    this.setIsShapeDragging(false);
    this.draggingOffset = undefined;
  }
}

export default SceneStore;
