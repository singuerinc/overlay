import type { ICommand } from "@/features/commands/types";

export class Command implements ICommand {
  name: string;
  doAction: () => void;
  undoAction: () => void;

  constructor(name: string, doAction: () => void, undoAction: () => void) {
    this.name = name;
    this.doAction = doAction;
    this.undoAction = undoAction;
  }

  execute() {
    this.doAction();
  }

  undo() {
    this.undoAction();
  }
}
