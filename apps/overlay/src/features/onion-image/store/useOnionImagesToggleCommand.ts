import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useOnionImagesMutation } from "@/features/onion-image/store/useOnionImagesMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useOnionImagesToggleCommand() {
  const mutation = useOnionImagesMutation();
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
