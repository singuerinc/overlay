import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useGuidelinesMutation } from "@/features/guideline/store/useGuidelinesMutation";

export function useGuidelinesToggleCommand() {
  const mutation = useGuidelinesMutation();
  const { execute: executeCommand } = useCommands();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        "Guidelines - Toggle visibility",
        () => mutation.mutateAsync({ visible }),
        () => mutation.mutateAsync({ visible: !visible })
      );
      return executeCommand(command);
    },
  };
}
