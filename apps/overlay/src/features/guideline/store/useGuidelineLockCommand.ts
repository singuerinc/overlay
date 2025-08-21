import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useGuidelineLockCommand() {
  const executeCommand = useExecuteCommand();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline, locked: boolean) => {
      const prevLocked = guideline.locked;
      const command = new Command(
        () => {
          mutation.mutate({
            id: guideline.id,
            locked,
          });
        },
        () => {
          mutation.mutate({
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
