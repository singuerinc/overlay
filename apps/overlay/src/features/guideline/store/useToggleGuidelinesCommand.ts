import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useToggleGuidelinesMutation } from "@/features/guideline/store/useToggleGuidelinesMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useToggleGuidelinesCommand() {
  const toggleVisibility = useToggleGuidelinesMutation();
  const executeCommand = useExecuteCommand();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          setSelectedTool(null);
          toggleVisibility.mutate({ visible });
        },
        () => {
          // no undo
        }
      );
      executeCommand(command, true);
    },
  };
}
