import { useCommandStore } from "@/features/commands/store/commands";

export function useCommandList() {
  return useCommandStore((state) => state._commands);
}
