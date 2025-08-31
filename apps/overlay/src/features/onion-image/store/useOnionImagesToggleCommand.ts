import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useOnionImagesMutation } from "@/features/onion-image/store/useOnionImagesMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";

export function useOnionImagesToggleCommand() {
  const mutation = useOnionImagesMutation();
  const { execute: executeCommand } = useCommands();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        "Onion Images - Toggle visibility",
        () => {
          setSelectedTool(null);
          mutation.mutate({ visible });
        },
        () => {
          // no undo
        }
      );
      executeCommand(command);
    },
  };
}
