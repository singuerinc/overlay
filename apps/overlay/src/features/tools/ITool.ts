export interface ITool<T extends string = string> {
  id: string;
  type: T;
}

export interface ILockableTool extends ITool {
  locked: boolean;
}
