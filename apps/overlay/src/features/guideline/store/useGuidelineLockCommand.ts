import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useGuidelineLockCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline, locked: boolean) => {
      const prevLocked = guideline.locked;
      const command = new Command(
        "Guideline - Lock",
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
