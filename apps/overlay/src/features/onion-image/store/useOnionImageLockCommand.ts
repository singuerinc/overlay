import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IOnionImage } from "../types";

export function useOnionImageLockCommand() {
  const executeCommand = useCommandExecute();
  const mutation = useOnionImageMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (onionImage: IOnionImage, locked: boolean) => {
      const prevLocked = onionImage.locked;
      const command = new Command(
        "Onion Image - Lock",
        () => {
          mutation.mutate({
            id: onionImage.id,
            locked,
          });
        },
        () => {
          mutation.mutate({
            id: onionImage.id,
            locked: prevLocked,
          });
          setSelectedTool(onionImage);
        }
      );
      executeCommand(command);
    },
  };
}
