import { ITool } from './tool.interfaces';
import { TShape } from '../types';

export interface IUiStore {
  isLeftNavOpen: boolean;
  setLeftNavOpen(isOpen: boolean): void;
}

export interface IToolStore {
  selectedTool?: ITool;
  tools: ITool[];
  setSelectedTool(tool?: ITool): void;
}

export type IEditToolStore = IToolStore; // TODO: Extend later
export type IAddToolStore = IToolStore; // TODO: Extend later

export interface ISceneStore {
  addShape(shapeType: TShape): void;
}

export interface IRootStore {
  addToolStore: IAddToolStore;
  canvasRef?: HTMLCanvasElement;
  editToolStore: IEditToolStore;
  sceneStore?: ISceneStore;
  uiStore: IUiStore;

  setCanvasRef(canvasRef?: HTMLCanvasElement): void;
}
