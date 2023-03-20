import * as THREE from 'three';
import { makeAutoObservable, when } from 'mobx';

import { IRootStore, ISceneStore } from '../interfaces/stores.interfaces';

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

    this.addShape();

    // Set Camera position
    this.camera.position.z = 5;

    // Call animate to start rendering
    this.animate();
  }

  private animate(): void {
    if (!this.scene || !this.renderer || !this.camera) return;

    requestAnimationFrame(this.animate);

    // TODO: Add shape moving here.

    this.renderer.render(this.scene, this.camera);
  }
  line?: any;

  // TODO: Move to the proper place.
  private addShape(): void {
    const geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    const vertices = new Float32Array([
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
      1.0, -1.0, -1.0, 1.0,
    ]);

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: '#d8d7d7' });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene?.add(mesh);
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
