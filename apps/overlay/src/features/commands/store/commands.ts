import type { ICommand } from "src/features/commands/types";
import { create } from "zustand";

type State = {
  _commands: ICommand[];
  actions: {
    execute: (command: ICommand, skipStack?: boolean) => void;
    undo: () => void;
  };
};

export const useCommandStore = create<State>((set) => ({
  _commands: [],
  actions: {
    execute: (command: ICommand, skipStack: boolean = false) => {
      command.execute();
      if (!skipStack) {
        return set((state) => ({
          _commands: [...state._commands, command],
        }));
      }
    },
    undo: () => {
      return set((state) => {
        const lastCommand = state._commands.pop();
        lastCommand?.undo();
        return {
          _commands: [...state._commands],
        };
      });
    },
  },
}));
