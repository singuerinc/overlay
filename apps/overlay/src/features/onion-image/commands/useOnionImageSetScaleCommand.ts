import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { type IOnionImage, type OnionImageScaleType } from "../types";

export function useOnionImageSetScaleCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useOnionImageMutation();

  return {
    execute: (onionImage: IOnionImage, scale: OnionImageScaleType) => {
      const prevScale = onionImage.scale;
      const command = new Command(
        "Onion Image - Change scale",
        () =>
          mutation.mutateAsync({
            id: onionImage.id,
            scale,
          }),
        () =>
          mutation.mutateAsync({
            id: onionImage.id,
            scale: prevScale,
          })
      );
      return executeCommand(command);
    },
  };
}
