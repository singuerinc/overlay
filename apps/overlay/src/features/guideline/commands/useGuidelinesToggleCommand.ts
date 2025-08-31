import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useGuidelinesMutation } from "@/features/guideline/store/useGuidelinesMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useGuidelinesToggleCommand() {
  const mutation = useGuidelinesMutation();
  const { execute: executeCommand } = useCommands();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        "Guidelines - Toggle visibility",
        () => {
          setSelectedTool(null);
          mutation.mutate({ visible });
        },
        () => {
          mutation.mutate({ visible: !visible });
        }
      );
      executeCommand(command);
    },
  };
}
