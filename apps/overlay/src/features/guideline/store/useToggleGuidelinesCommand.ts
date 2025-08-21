import { Command } from "@/features/commands/Command";
import { useExecuteCommand } from "@/features/commands/store/commands";
import { useUpdateGuidelinesMutation } from "@/features/guideline/store/useUpdateGuidelinesMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useToggleGuidelinesCommand() {
  const updateVisibility = useUpdateGuidelinesMutation();
  const executeCommand = useExecuteCommand();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          setSelectedTool(null);
          updateVisibility.mutate({ visible });
        },
        () => {
          // no undo
        }
      );
      executeCommand(command, true);
    },
  };
}
