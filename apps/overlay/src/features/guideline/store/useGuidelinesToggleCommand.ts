import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useGuidelinesMutation } from "@/features/guideline/store/useGuidelinesMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useGuidelinesToggleCommand() {
  const mutation = useGuidelinesMutation();
  const executeCommand = useCommandExecute();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        () => {
          setSelectedTool(null);
          mutation.mutate({ visible });
        },
        () => {
          // no undo
        }
      );
      executeCommand(command, true);
    },
  };
}
