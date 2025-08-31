export interface ICommand {
  name: string;
  execute: () => void;
  undo: () => void;
}
