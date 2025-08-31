import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";
import { useGuidelineAddMutation } from "./useGuidelineAddMutation";
import { useGuidelineRemoveMutation } from "./useGuidelineRemoveMutation";

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
