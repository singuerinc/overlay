import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";
import { useGuidelineAddMutation } from "./useGuidelineAddMutation";
import { useGuidelineRemoveMutation } from "./useGuidelineRemoveMutation";

export function useGuidelineRemoveCommand() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useCommandExecute();

  const addGuideline = useGuidelineAddMutation();
  const removeGuideline = useGuidelineRemoveMutation();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
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
