import { ITool } from './tool.interfaces';

export interface IAction extends ITool {
  iconElement: JSX.Element | null;
  handler: () => void;
  selected?: boolean;
}
