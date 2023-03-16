export interface IAction {
  title: string;
  iconElement: JSX.Element;
  handler: () => void;
}
