import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { GuidelineColors } from "@/features/guideline/GuidelineColor";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IGuideline } from "../types";

export function useGuidelineCycleColorCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline) => {
      const prevColor = guideline.color;

      const command = new Command(
        "Guideline - Change Color",
        () =>
          mutation.mutateAsync({
            id: guideline.id,
            color:
              GuidelineColors[
                (GuidelineColors.indexOf(prevColor) + 1) %
                  GuidelineColors.length
              ],
          }),
        () =>
          mutation
            .mutateAsync({
              id: guideline.id,
              color: prevColor,
            })
            .then(() => {
              setSelectedTool(guideline);
            })
      );
      return executeCommand(command);
    },
  };
}
