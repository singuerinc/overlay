import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useColorGuidelineMutation } from "@/features/guideline/store/useColorGuidelineMutation";
import { type IGuideline } from "../types";

export function useColorGuidelineCommand() {
  const executeCommand = useExecuteCommand();

  const colorGuideline = useColorGuidelineMutation();

  return {
    execute: (guideline: IGuideline, color: GuidelineColorType) => {
      const prevColor = guideline.color;
      const command = new Command(
        () => {
          colorGuideline.mutate({
            id: guideline.id,
            color,
          });
        },
        () => {
          colorGuideline.mutate({
            id: guideline.id,
            color: prevColor,
          });
        }
      );
      executeCommand(command);
    },
  };
}
