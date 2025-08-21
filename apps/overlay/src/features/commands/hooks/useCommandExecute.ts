import { useCommandStore } from "@/features/commands/store/commands";

export function useCommandExecute() {
  return useCommandStore((state) => state.actions.execute);
}
