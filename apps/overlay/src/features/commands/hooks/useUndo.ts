import { useCommandStore } from "@/features/commands/store/commands";

export function useUndo() {
  return useCommandStore((state) => state.actions.undo);
}
