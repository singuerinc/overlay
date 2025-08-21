import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useUpdateGuidelineMutation } from "@/features/guideline/store/useUpdateGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useColorGuidelineCommand() {
  const executeCommand = useExecuteCommand();
  const updateGuideline = useUpdateGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline, color: GuidelineColorType) => {
      const prevColor = guideline.color;
      const command = new Command(
        () => {
          updateGuideline.mutate({
            id: guideline.id,
            color,
          });
        },
        () => {
          updateGuideline.mutate({
            id: guideline.id,
            color: prevColor,
          });
          setSelectedTool(guideline);
        }
      );
      executeCommand(command);
    },
  };
}
