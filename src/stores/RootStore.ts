import { makeAutoObservable, when } from 'mobx';

import UiStore from './UiStore';
import {
  IAddToolStore,
  IEditToolStore,
  IRootStore,
  ISceneStore,
  IUiStore,
} from '../interfaces/stores.interfaces';
import EditToolStore from './EditToolStore';
import AddToolStore from './AddToolStore';
import SceneStore from './SceneStore';

class RootStore implements IRootStore {
  public addToolStore: IAddToolStore;
  public editToolStore: IEditToolStore;
  public sceneStore?: ISceneStore;
  public uiStore: IUiStore;

  public canvasRef?: HTMLCanvasElement;

  constructor() {
    this.addToolStore = new AddToolStore(this);
    this.editToolStore = new EditToolStore(this);
    this.uiStore = new UiStore(this);

    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.store = this;
    }

    makeAutoObservable(this);

    when(
      () => Boolean(this.canvasRef),
      () => {
        if (!this.sceneStore) {
          this.sceneStore = new SceneStore(this);
        }
      }
    );
  }

  public setCanvasRef = (canvasRef?: HTMLCanvasElement): void => {
    this.canvasRef = canvasRef;
  };
}

export default RootStore;
