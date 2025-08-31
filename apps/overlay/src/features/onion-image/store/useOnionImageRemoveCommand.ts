import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useOnionImageAddMutation } from "@/features/onion-image/store/useOnionImageAddMutation";
import { useOnionImageRemoveMutation } from "@/features/onion-image/store/useOnionImageRemoveMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IOnionImage } from "../types";

export function useOnionImageRemoveCommand() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useCommandExecute();

  const addOnionImage = useOnionImageAddMutation();
  const removeOnionImage = useOnionImageRemoveMutation();

  return {
    execute: (onionImage: IOnionImage) => {
      const command = new Command(
        "Onion Image - Remove",
        () => {
          removeOnionImage.mutate({
            onionImage,
          });
          setSelectedTool(null);
        },
        () => {
          addOnionImage.mutate({
            onionImage,
          });
          setSelectedTool(onionImage);
        }
      );
      executeCommand(command);
    },
  };
}
