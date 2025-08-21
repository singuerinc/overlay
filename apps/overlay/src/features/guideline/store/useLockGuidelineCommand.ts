import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useUpdateGuidelineMutation } from "@/features/guideline/store/useUpdateGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useLockGuidelineCommand() {
  const executeCommand = useExecuteCommand();
  const updateGuideline = useUpdateGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline, locked: boolean) => {
      const prevLocked = guideline.locked;
      const command = new Command(
        () => {
          updateGuideline.mutate({
            id: guideline.id,
            locked,
          });
        },
        () => {
          updateGuideline.mutate({
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
