import { type IGuideline } from "../types";

import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import { useNormalizedPosition } from "@/features/rulers/useNormalizedPosition";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import { useSetSelectedTool } from "../../../features/tools/store/tools";
import { useAddGuidelineMutation } from "./useAddGuidelineMutation";
import { useRemoveGuidelineMutation } from "./useRemoveGuidelineMutation";

export function useRemoveGuidelineCommand() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useExecuteCommand();

  const addGuideline = useAddGuidelineMutation();
  const removeGuideline = useRemoveGuidelineMutation();

  const rulerSetPosition = useRulerSetPosition();
  const { calculate: calculateNormalizedPosition } = useNormalizedPosition();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        () => {
          removeGuideline.mutate({
            guideline,
          });
          rulerSetPosition(null, null);
          setSelectedTool(null);
        },
        () => {
          addGuideline.mutate({
            guideline,
          });
          setSelectedTool(guideline);
          const [x, y] = calculateNormalizedPosition(guideline.x, guideline.y);
          rulerSetPosition(x, y);
        }
      );
      executeCommand(command);
    },
  };
}
