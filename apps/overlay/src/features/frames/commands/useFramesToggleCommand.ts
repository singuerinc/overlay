import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useFramesMutation } from "@/features/frames/store/useFramesMutation";

export function useFramesToggleCommand() {
  const mutation = useFramesMutation();
  const { execute: executeCommand } = useCommands();

  return {
    execute: (visible: boolean) => {
      const command = new Command(
        "Frames - Toggle visibility",
        () => mutation.mutateAsync({ visible }),
        () => mutation.mutateAsync({ visible: !visible })
      );
      return executeCommand(command);
    },
  };
}
