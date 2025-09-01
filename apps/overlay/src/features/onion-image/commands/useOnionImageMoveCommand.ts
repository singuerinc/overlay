import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useQueryClient } from "@tanstack/react-query";
import type { IOnionImage } from "../types";

export function useOnionImageMoveCommand() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();
  const mutation = useOnionImageMutation();
  const { execute: executeCommand } = useCommands();

  return {
    execute: (id: IOnionImage["id"], position: { x: number; y: number }) => {
      const onionImage = queryClient.getQueryData<IOnionImage>(
        ONION_IMAGES_KEYS.onionImage(presetId, id)
      );

      const command = new Command(
        "Onion Image - Move",
        () =>
          mutation.mutateAsync({
            id,
            x: position.x,
            y: position.y,
          }),
        () => {
          return new Promise((resolve) => {
            if (onionImage) {
              const pItem = { ...onionImage, y: onionImage.y, x: onionImage.x };
              mutation
                .mutateAsync({
                  id: pItem.id,
                  x: pItem.x,
                  y: pItem.y,
                })
                .then(() => {
                  resolve();
                });
            }
          });
        }
      );

      return executeCommand(command);
    },
  };
}
