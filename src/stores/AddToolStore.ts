import { IRootStore } from '../interfaces/stores.interfaces';
import { getAddToolList } from '../utils/tools';
import BaseToolStore from './BaseToolStore';

class AddToolStore extends BaseToolStore {
  private rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    super(getAddToolList());

    this.rootStore = rootStore;
  }
}

export default AddToolStore;
