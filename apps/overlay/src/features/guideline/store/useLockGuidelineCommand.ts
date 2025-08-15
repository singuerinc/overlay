import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useLockGuidelineMutation } from "@/features/guideline/store/useLockGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useLockGuidelineCommand() {
  const executeCommand = useExecuteCommand();
  const lockGuideline = useLockGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

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
          setSelectedTool(guideline);
        }
      );
      executeCommand(command);
    },
  };
}
