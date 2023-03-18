import { action, makeObservable, observable } from 'mobx';

import { IToolStore } from '../interfaces/stores.interfaces';
import { ITool } from '../interfaces/tool.interfaces';

class BaseToolStore implements IToolStore {
  public selectedTool?: ITool;
  public tools: ITool[];

  constructor(tools: ITool[]) {
    this.tools = tools;

    makeObservable(
      this,
      {
        selectedTool: observable,
        tools: observable,
        setSelectedTool: action,
      },
      { autoBind: true }
    );
  }

  public setSelectedTool(tool?: ITool) {
    this.selectedTool = tool;
  }
}

export default BaseToolStore;
