import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useGuidelineColorCommand() {
  const executeCommand = useExecuteCommand();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline, color: GuidelineColorType) => {
      const prevColor = guideline.color;
      const command = new Command(
        () => {
          mutation.mutate({
            id: guideline.id,
            color,
          });
        },
        () => {
          mutation.mutate({
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
