import type { ICommand } from "src/features/commands/types";
import { create } from "zustand";

type State = {
  _commands: ICommand[];
  actions: {
    execute: (command: ICommand, skipStack?: boolean) => Promise<any>;
    undo: () => Promise<any>;
    reset: () => Promise<any>;
  };
};

const UNDO_MAX_STACK = 25;

export const useCommandStore = create<State>((set) => ({
  _commands: [],
  actions: {
    reset: () =>
      new Promise((resolve) => {
        set({ _commands: [] });
        resolve(void 0);
      }),
    execute: (command: ICommand, skipStack: boolean = false) => {
      if (!skipStack) {
        return new Promise((resolve) => {
          set((state) => ({
            _commands: [...state._commands, command].slice(-UNDO_MAX_STACK),
          }));
          const result = command.execute();
          resolve(result);
        });
      } else {
        return command.execute();
      }
    },
    undo: () => {
      return new Promise((resolve) => {
        set((state: State) => {
          const lastCommand = state._commands.pop();
          lastCommand?.undo();
          return {
            _commands: [...state._commands],
          };
        });
        resolve(void 0);
      });
    },
  },
}));
