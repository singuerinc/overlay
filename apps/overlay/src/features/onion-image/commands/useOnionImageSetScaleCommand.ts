import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { type IOnionImage } from "../types";

export function useOnionImageSetScaleCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useOnionImageMutation();

  return {
    execute: (onionImage: IOnionImage, scale: number) => {
      const prevScale = onionImage.scale;
      const command = new Command(
        "Onion Image - Change scale",
        () => {
          console.log("Changing scale", onionImage.id, scale);
          mutation.mutate({
            id: onionImage.id,
            scale,
          });
        },
        () => {
          mutation.mutate({
            id: onionImage.id,
            scale: prevScale,
          });
        }
      );
      executeCommand(command);
    },
  };
}
