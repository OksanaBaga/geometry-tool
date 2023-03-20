import * as THREE from 'three';
import { makeAutoObservable, when } from 'mobx';

import { IRootStore, ISceneStore } from '../interfaces/stores.interfaces';
import { EditToolTypes, TShape } from '../types';
import SquareShape from './shapes/SquareShape';
import TriangleShape from './shapes/TriangleShape';
import HexagonShape from './shapes/HexagonShape';

class SceneStore implements ISceneStore {
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private canvasRef?: HTMLCanvasElement;

  private rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize.bind(this), false);
    }

    makeAutoObservable(this, {}, { autoBind: true });

    when(
      () => Boolean(this.canvasRef),
      () => {
        if (!this.scene) {
          this.initScene();
        }
      }
    );
  }

  public addShape(shapeType: TShape): void {
    if (!this.scene) return;

    const color = '#eef4fc';

    let mesh: THREE.Mesh;

    switch (shapeType) {
      case EditToolTypes.SQUARE:
        mesh = new SquareShape(color, 1, 1).mesh;

        this.scene.add(mesh);
        break;
      case EditToolTypes.TRIANGLE:
        mesh = new TriangleShape(color, 1, 1).mesh;

        this.scene.add(mesh);
        break;
      case EditToolTypes.HEXAGON:
        mesh = new HexagonShape(color, 1, 1).mesh;

        this.scene.add(mesh);
        break;
      default:
        console.warn(`${shapeType} is not supported yet!`);
        break;
    }
  }

  public setCanvasRef(canvasRef?: HTMLCanvasElement): void {
    this.canvasRef = canvasRef;
  }

  private initScene(): void {
    if (!this.canvasRef) {
      throw new Error('Init without canvas');
    }

    const container = document.getElementById('canvas-renderer');
    const width = container?.offsetWidth || this.canvasRef.width;
    const height = container?.offsetHeight || this.canvasRef.height;

    // Create a Scene and Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Create a Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvasRef,
    });

    // Set renderer side depends on the container size
    this.renderer.setSize(width, height);
    // Apply the Renderer to the DOM
    container?.appendChild(this.renderer.domElement);

    // Set Camera position
    this.camera.position.z = 6;

    // Call animate to start rendering
    this.animate();
  }

  private animate(): void {
    if (!this.scene || !this.renderer || !this.camera) return;

    requestAnimationFrame(this.animate);

    // TODO: Add shape moving here.

    this.renderer.render(this.scene, this.camera);
  }

  private onResize(): void {
    if (!this.renderer || !this.camera || !this.canvasRef) return;

    const container = document.getElementById('canvas-renderer');
    const width = container?.offsetWidth || this.canvasRef.width;
    const height = container?.offsetHeight || this.canvasRef.height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    // Change the Renderer size on screen resize
    this.renderer.setSize(width, height);
  }
}

export default SceneStore;
