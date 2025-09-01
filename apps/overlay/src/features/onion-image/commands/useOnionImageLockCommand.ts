import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { type IOnionImage } from "../types";

export function useOnionImageLockCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useOnionImageMutation();

  return {
    execute: (onionImage: IOnionImage, locked: boolean) => {
      const prevLocked = onionImage.locked;
      const command = new Command(
        "Onion Image - Lock",
        () =>
          mutation.mutateAsync({
            id: onionImage.id,
            locked,
          }),
        () =>
          mutation.mutateAsync({
            id: onionImage.id,
            locked: prevLocked,
          })
      );
      return executeCommand(command);
    },
  };
}
