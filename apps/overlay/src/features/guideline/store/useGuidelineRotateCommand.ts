import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "../types";

export function useGuidelineRotateCommand() {
  const executeCommand = useExecuteCommand();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        () => {
          mutation.mutate({
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
          mutation.mutate({
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
