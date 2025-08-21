import { type IGuideline } from "../types";

import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import { useSetSelectedTool } from "../../../features/tools/store/tools";
import { useGuidelineAddMutation } from "./useGuidelineAddMutation";
import { useGuidelineRemoveMutation } from "./useGuidelineRemoveMutation";

export function useGuidelineAddCommand() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useExecuteCommand();
  const addGuideline = useGuidelineAddMutation();
  const removeGuideline = useGuidelineRemoveMutation();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
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
