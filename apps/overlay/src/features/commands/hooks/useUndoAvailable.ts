import { useCommandStore } from "@/features/commands/store/commands";

export function useUndoAvailable() {
  return useCommandStore((state) => state._commands.length > 0);
}
