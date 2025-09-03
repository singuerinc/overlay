import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCoords } from "@/features/coords/hooks/useCoords";
import { useGuidelineAddMutation } from "@/features/guideline/store/useGuidelineAddMutation";
import { useGuidelineRemoveMutation } from "@/features/guideline/store/useGuidelineRemoveMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useGuidelineRemoveCommand() {
  const { setX, setY } = useCoords();
  const setSelectedTool = useSetSelectedTool();
  const { execute: executeCommand } = useCommands();

  const addGuideline = useGuidelineAddMutation();
  const removeGuideline = useGuidelineRemoveMutation();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        "Guideline - Remove",
        () =>
          removeGuideline
            .mutateAsync({
              guideline,
            })
            .then(() => {
              setX(null);
              setY(null);
              setSelectedTool(null);
            }),
        () =>
          addGuideline
            .mutateAsync({
              guideline,
            })
            .then(() => {
              setX(guideline.x);
              setY(guideline.y);
              setSelectedTool(guideline);
            })
      );
      return executeCommand(command);
    },
  };
}
