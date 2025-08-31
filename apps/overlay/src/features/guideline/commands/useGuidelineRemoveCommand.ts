import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useGuidelineAddMutation } from "@/features/guideline/store/useGuidelineAddMutation";
import { useGuidelineRemoveMutation } from "@/features/guideline/store/useGuidelineRemoveMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useGuidelineRemoveCommand() {
  const setSelectedTool = useSetSelectedTool();
  const { execute: executeCommand } = useCommands();

  const addGuideline = useGuidelineAddMutation();
  const removeGuideline = useGuidelineRemoveMutation();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        "Guideline - Remove",
        () => {
          removeGuideline.mutate({
            guideline,
          });
          setSelectedTool(null);
        },
        () => {
          addGuideline.mutate({
            guideline,
          });
          setSelectedTool(guideline);
        }
      );
      executeCommand(command);
    },
  };
}
