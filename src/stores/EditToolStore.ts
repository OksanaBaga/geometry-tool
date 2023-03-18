import { IRootStore } from '../interfaces/stores.interfaces';
import { getEditToolList } from '../utils/tools';
import BaseToolStore from './BaseToolStore';

class EditToolStore extends BaseToolStore {
  private rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    super(getEditToolList());

    this.rootStore = rootStore;
  }
}

export default EditToolStore;
