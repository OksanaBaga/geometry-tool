import { makeAutoObservable } from 'mobx';

import UiStore from './UiStore';
import {
  IAddToolStore,
  IEditToolStore,
  IRootStore,
  IUiStore,
} from '../interfaces/stores.interfaces';
import EditToolStore from './EditToolStore';
import AddToolStore from './AddToolStore';

class RootStore implements IRootStore {
  public addToolStore: IAddToolStore;
  public editToolStore: IEditToolStore;
  public uiStore: IUiStore;

  constructor() {
    this.addToolStore = new AddToolStore(this);
    this.editToolStore = new EditToolStore(this);
    this.uiStore = new UiStore(this);

    makeAutoObservable(this);
  }
}

export default RootStore;
