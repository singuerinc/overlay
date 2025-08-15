import { type IGuideline } from "../types";

import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import { useAddGuideline } from "../../../features/guideline/store/useAddGuideline";
import { useRemoveGuideline } from "../../../features/guideline/store/useRemoveGuideline";
import { useSetSelectedTool } from "../../../features/tools/store/tools";

export function useAddGuidelineCommand() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useExecuteCommand();

  const addGuideline = useAddGuideline();
  const removeGuideline = useRemoveGuideline();

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
