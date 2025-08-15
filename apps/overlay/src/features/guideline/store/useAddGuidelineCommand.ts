import { type IGuideline } from "../types";

import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import { useSetSelectedTool } from "../../../features/tools/store/tools";
import { useAddGuidelineMutation } from "./useAddGuidelineMutation";
import { useRemoveGuidelineMutation } from "./useRemoveGuidelineMutation";

export function useAddGuidelineCommand() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useExecuteCommand();

  const addGuideline = useAddGuidelineMutation();
  const removeGuideline = useRemoveGuidelineMutation();

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
