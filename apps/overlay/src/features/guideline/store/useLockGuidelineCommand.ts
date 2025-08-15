import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useLockGuidelineMutation } from "@/features/guideline/store/useLockGuidelineMutation";
import { type IGuideline } from "../types";

export function useLockGuidelineCommand() {
  const executeCommand = useExecuteCommand();
  const lockGuideline = useLockGuidelineMutation();

  return {
    execute: (guideline: IGuideline, locked: boolean) => {
      const prevLocked = guideline.locked;
      const command = new Command(
        () => {
          lockGuideline.mutate({
            id: guideline.id,
            locked,
          });
        },
        () => {
          lockGuideline.mutate({
            id: guideline.id,
            locked: prevLocked,
          });
        }
      );
      executeCommand(command);
    },
  };
}
