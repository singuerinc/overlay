import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { type IOnionImage } from "../types";

export function useOnionImageOpacityCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useOnionImageMutation();

  return {
    execute: (onionImage: IOnionImage, opacity: number) => {
      const prevOpacity = onionImage.opacity;
      const command = new Command(
        "Onion Image - Change opacity",
        () =>
          mutation.mutateAsync({
            id: onionImage.id,
            opacity,
          }),
        () =>
          mutation.mutateAsync({
            id: onionImage.id,
            opacity: prevOpacity,
          })
      );
      return executeCommand(command);
    },
  };
}
