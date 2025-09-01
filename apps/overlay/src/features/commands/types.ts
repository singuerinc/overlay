export interface ICommand {
  name: string;
  execute: () => Promise<any>;
  undo: () => Promise<any>;
}
