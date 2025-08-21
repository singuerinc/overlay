import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useUpdateGuidelineMutation } from "@/features/guideline/store/useUpdateGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "../types";

export function useRotateGuidelineCommand() {
  const executeCommand = useExecuteCommand();
  const updateGuideline = useUpdateGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        () => {
          updateGuideline.mutate({
            id: guideline.id,
            x: guideline.y,
            y: guideline.x,
            type:
              guideline.type === GUIDELINE_VERTICAL
                ? GUIDELINE_HORIZONTAL
                : GUIDELINE_VERTICAL,
          });
        },
        () => {
          updateGuideline.mutate({
            id: guideline.id,
            x: guideline.y,
            y: guideline.x,
            type:
              guideline.type === GUIDELINE_VERTICAL
                ? GUIDELINE_HORIZONTAL
                : GUIDELINE_VERTICAL,
          });
          setSelectedTool(guideline);
        }
      );
      executeCommand(command);
    },
  };
}
