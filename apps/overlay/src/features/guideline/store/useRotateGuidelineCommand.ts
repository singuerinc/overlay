import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useRotateGuidelineMutation } from "@/features/guideline/store/useRotateGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useRotateGuidelineCommand() {
  const executeCommand = useExecuteCommand();
  const rotateGuideline = useRotateGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        () => {
          rotateGuideline.mutate({
            id: guideline.id,
          });
        },
        () => {
          rotateGuideline.mutate({
            id: guideline.id,
          });
          setSelectedTool(guideline);
        }
      );
      executeCommand(command);
    },
  };
}
