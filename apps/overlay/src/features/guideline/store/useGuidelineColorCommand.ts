import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useGuidelineColorCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline, color: GuidelineColorType) => {
      const prevColor = guideline.color;
      const command = new Command(
        "Guideline - Change Color",
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
      return executeCommand(command);
    },
  };
}
