import { makeAutoObservable } from 'mobx';

import { IRootStore, IUiStore } from '../interfaces/stores.interfaces';

class UiStore implements IUiStore {
  public isLeftNavOpen: boolean;

  private rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    this.isLeftNavOpen = false;

    makeAutoObservable(this);
  }

  public setLeftNavOpen(isOpen: boolean): void {
    this.isLeftNavOpen = isOpen;
  }
}

export default UiStore;
