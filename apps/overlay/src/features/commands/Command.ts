import type { ICommand } from "@/features/commands/types";

export class Command<T> implements ICommand {
  name: string;
  doAction: () => Promise<T>;
  undoAction: () => Promise<T>;

  constructor(
    name: string,
    doAction: () => Promise<T>,
    undoAction: () => Promise<T>
  ) {
    this.name = name;
    this.doAction = doAction;
    this.undoAction = undoAction;
  }

  async execute() {
    return this.doAction();
  }

  async undo() {
    return this.undoAction();
  }
}
