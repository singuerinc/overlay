import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";
import { useGuidelineAddMutation } from "./useGuidelineAddMutation";
import { useGuidelineRemoveMutation } from "./useGuidelineRemoveMutation";

export function useGuidelineAddCommand() {
  const setSelectedTool = useSetSelectedTool();
  const { execute: executeCommand } = useCommands();
  const addGuideline = useGuidelineAddMutation();
  const removeGuideline = useGuidelineRemoveMutation();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        "Guidelines - Add one",
        () => {
          addGuideline.mutate({
            guideline,
          });
          setSelectedTool(guideline);
        },
        () => {
          removeGuideline.mutate({
            guideline,
          });
          setSelectedTool(null);
        }
      );
      executeCommand(command);
    },
  };
}
