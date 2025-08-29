import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useQueryClient } from "@tanstack/react-query";
import type { IOnionImage } from "../types";

export function useOnionImageMoveCommand() {
  const frameId = useFrameActiveId();
  const queryClient = useQueryClient();
  const mutation = useOnionImageMutation();
  const executeCommand = useCommandExecute();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (id: string, position: { x: number; y: number }) => {
      const onionImage = queryClient.getQueryData<IOnionImage>(
        ONION_IMAGES_KEYS.onionImage(frameId, id)
      );

      const command = new Command(
        () => {
          if (onionImage) {
            mutation.mutate({
              id: onionImage.id,
              x: position.x,
              y: position.y,
            });
          }
        },
        () => {
          if (onionImage) {
            const pItem = { ...onionImage, y: onionImage.y, x: onionImage.x };
            mutation.mutate({
              id: pItem.id,
              x: pItem.x,
              y: pItem.y,
            });
            setSelectedTool(pItem);
          }
        }
      );

      executeCommand(command);
    },
  };
}
