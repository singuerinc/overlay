import type { ICommand } from "src/features/commands/types";
import { create } from "zustand";

type State = {
  _commands: ICommand[];
  actions: {
    execute: (command: ICommand) => void;
    undo: () => void;
  };
};

const useCommandStore = create<State>((set) => ({
  _commands: [],
  actions: {
    execute: (command: ICommand) => {
      command.execute();
      return set((state) => ({
        _commands: [...state._commands, command],
      }));
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

export function useCanUndoCommand() {
  return useCommandStore((state) => state._commands.length > 0);
}

export function useUndoCommand() {
  return useCommandStore((state) => state.actions.undo);
}

export function useExecuteCommand() {
  return useCommandStore((state) => state.actions.execute);
}
