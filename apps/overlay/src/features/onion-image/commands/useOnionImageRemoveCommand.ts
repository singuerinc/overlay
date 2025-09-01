import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useOnionImageAddMutation } from "@/features/onion-image/store/useOnionImageAddMutation";
import { useOnionImageRemoveMutation } from "@/features/onion-image/store/useOnionImageRemoveMutation";
import { type IOnionImage } from "../types";

export function useOnionImageRemoveCommand() {
  const { execute: executeCommand } = useCommands();
  const addOnionImage = useOnionImageAddMutation();
  const removeOnionImage = useOnionImageRemoveMutation();

  return {
    execute: (onionImage: IOnionImage) => {
      const command = new Command(
        "Onion Image - Remove",
        () =>
          removeOnionImage.mutateAsync({
            onionImage,
          }),
        () =>
          addOnionImage.mutateAsync({
            onionImage,
          })
      );
      return executeCommand(command);
    },
  };
}
