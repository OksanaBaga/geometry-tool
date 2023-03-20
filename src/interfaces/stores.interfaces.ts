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
  setCanvasRef(canvasRef?: HTMLCanvasElement): void;
  addShape(shapeType: TShape): void;
}

export interface IRootStore {
  uiStore: IUiStore;
  editToolStore: IEditToolStore;
  addToolStore: IAddToolStore;
  sceneStore: ISceneStore;
}
