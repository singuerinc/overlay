import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { type IOnionImage } from "../types";

export function useOnionImageToggleVisibilityCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useOnionImageMutation();

  return {
    execute: (onionImage: IOnionImage, visible: boolean) => {
      const prevVisible = onionImage.visible;
      const command = new Command(
        "Onion Image - Change visibility",
        () => {
          console.log("Changing visibility", onionImage.id, visible);
          mutation.mutate({
            id: onionImage.id,
            visible,
          });
        },
        () => {
          mutation.mutate({
            id: onionImage.id,
            visible: prevVisible,
          });
        }
      );
      executeCommand(command);
    },
  };
}
