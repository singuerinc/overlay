import { useCommandStore } from "@/features/commands/store/commands";

export function useCommands() {
  const execute = useCommandStore((state) => state.actions.execute);
  const undo = useCommandStore((state) => state.actions.undo);
  const reset = useCommandStore((state) => state.actions.reset);
  const list = useCommandStore((state) => state._commands);
  const hasCommands = list.length > 0;

  return {
    hasCommands,
    list,
    execute,
    undo,
    reset,
  };
}
