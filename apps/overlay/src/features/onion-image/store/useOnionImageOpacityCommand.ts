import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { type IOnionImage } from "../types";

export function useOnionImageOpacityCommand() {
  const executeCommand = useCommandExecute();
  const mutation = useOnionImageMutation();

  return {
    execute: (onionImage: IOnionImage, opacity: number) => {
      const prevOpacity = onionImage.opacity;
      const command = new Command(
        "Onion Image - Change opacity",
        () => {
          mutation.mutate({
            id: onionImage.id,
            opacity,
          });
        },
        () => {
          mutation.mutate({
            id: onionImage.id,
            opacity: prevOpacity,
          });
        }
      );
      executeCommand(command);
    },
  };
}
