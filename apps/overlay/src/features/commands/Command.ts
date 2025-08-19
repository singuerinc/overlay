export class Command {
  doAction: () => void;
  undoAction: () => void;

  constructor(doAction: () => void, undoAction: () => void) {
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
