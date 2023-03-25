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
  readonly camera: THREE.OrthographicCamera;
  readonly mouse: THREE.Vector2;
  readonly scene: THREE.Scene;

  private renderer: THREE.WebGLRenderer;
  private raycaster: THREE.Raycaster;
  private marker?: THREE.Mesh;
  private dot?: THREE.Mesh;

  // Shape props
  private draggingOffset?: THREE.Vector3;
  private isShapeDragging: boolean;
  private selectedShape?: IShape;
  private shapes: IShape[];

  private containerBounds: { width: number; height: number };

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
    this.containerBounds = { width, height };

    // Create a Scene and Camera
    this.scene = new THREE.Scene();

    // Create an orthographic camera with a visible range of 1 to 1000
    this.camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      1000
    );

    // Set the camera position
    this.camera.position.z = 10;

    // Create a Raycaster
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = this.camera.near;
    this.raycaster.far = this.camera.far;

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

    // Call animate to start rendering
    this.animate();
    // Subscribe to the browser events to handle mouse and resize.
    this.subscribeToBrowserEvents();

    makeAutoObservable(this, {}, { autoBind: true });
  }

  /** Static Methods */

  private static getIntersection(x: number, y: number): THREE.Vector3 {
    return new THREE.Vector3(
      (x / window.innerWidth) * 2 - 1,
      -(y / window.innerHeight)
    );
  }

  /** Public Methods */

  public addShape(shapeType: TShape): void {
    const shape = this.getShape(shapeType, DEFAULT_COLOR, 200);

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
    // Marker to highlight the mouse.
    const markerGeometry = new THREE.SphereGeometry(25, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: '#ffff00' });
    // Dot that follows mouse
    const dotGeometry = new THREE.SphereGeometry(5, 16, 16);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    this.marker = new THREE.Mesh(markerGeometry, markerMaterial);
    this.dot = new THREE.Mesh(dotGeometry, dotMaterial);
    this.scene.add(this.marker);
    this.scene.add(this.dot);
  }

  private setMarkerPosition(x: number, y: number): void {
    if (!this.marker || !this.dot) {
      this.addMarker();
    }

    this.marker?.position.set(this.mouse.x, this.mouse.y, 0);
    this.dot?.position.set(x, y, 0);
  }

  private getShape(
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
        return new SquareShape(shapeProps, this.raycaster);
      case EditToolTypes.TRIANGLE:
        return new TriangleShape(shapeProps, this.raycaster);
      case EditToolTypes.HEXAGON:
        return new HexagonShape(shapeProps, this.raycaster);
      default:
        console.warn(`${shapeType} is not supported yet!`);
        return null;
    }
  }

  private getShapesIntersects(): THREE.Intersection<THREE.Object3D>[] {
    return this.shapes.reduce((curr, item) => {
      curr.push(...item.intersect());

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

    console.log(111, intersects, this.mouse);

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
    const { width, height } = this.containerBounds;
    const bounds = this.renderer.domElement.getBoundingClientRect();
    // // Calculate the mouse position in normalized device coordinates
    const x = event.clientX - bounds.x - width / 2;
    const y = -(event.clientY - bounds.y - height / 2);

    // this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.mouse.set(x, y);

    console.log(1111, x, y, this.mouse);

    // Set the ray's origin and direction based on the mouse position and camera orientation
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Update the position of the points object to the leftmost top point of the cursor
    this.setMarkerPosition(this.mouse.x, this.mouse.y);
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
    document.body.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this),
      false
    );
    document.body.addEventListener(
      'mousedown',
      this.onMouseDown.bind(this),
      false
    );
    document.body.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    document.body.addEventListener('keydown', this.onKeyDown.bind(this), false);
  }

  private unsubscribeFromMouseEvents(): void {
    if (!window || !document) return;

    window.removeEventListener('resize', this.onResize.bind(this), false);
    document.body.removeEventListener(
      'mousemove',
      this.onMouseMove.bind(this),
      false
    );
    document.body.removeEventListener(
      'mousedown',
      this.onMouseDown.bind(this),
      false
    );
    document.body.removeEventListener(
      'mouseup',
      this.onMouseUp.bind(this),
      false
    );
    document.body.removeEventListener(
      'keydown',
      this.onKeyDown.bind(this),
      false
    );
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
    this.containerBounds = { width, height };

    this.camera.updateProjectionMatrix();
    // Change the Renderer size on screen resize
    this.renderer.setSize(width, height);
  }

  private clearMarkers(): void {
    this.shapes.forEach((shape) => {
      shape.removeMarker();
    });

    // Clear mouse markers
    this.marker && this.scene.remove(this.marker);
    this.dot && this.scene.remove(this.dot);
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.rootStore.editToolStore.selectedTool) {
      return;
    }

    this.normalizeMouse(event);

    switch (this.rootStore.editToolStore.selectedTool.type) {
      case EditToolTypes.MOVE:
        this.clearMarkers();

        const intersection = SceneStore.getIntersection(
          event.clientX,
          event.clientY
        );
        if (intersection && this.selectedShape && this.draggingOffset) {
          this.selectedShape.setPosition(intersection.sub(this.draggingOffset));
        }
        break;
      case EditToolTypes.CLOSEST_POINT:
        this.shapes.forEach((shape: IShape) => {
          shape.showClosestPoint(this.mouse);
        });
        break;
      default:
        this.clearMarkers();
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
