import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { useOnionImageMutation } from "@/features/onion-image/store/useOnionImageMutation";
import {
  OnionImageFilter,
  type IOnionImage,
  type OnionImageFilterType,
} from "@/features/onion-image/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useQueryClient } from "@tanstack/react-query";

export function useOnionImageCycleFilterCommand() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();
  const { execute: executeCommand } = useCommands();
  const updateGrid = useOnionImageMutation();

  return {
    execute: (id: IOnionImage["id"]) => {
      const onionImage = queryClient.getQueryData<IOnionImage>(
        ONION_IMAGES_KEYS.onionImage(presetId, id)
      );

      const prevFilter = onionImage?.filter ?? OnionImageFilter[0];
      const nextFilter = OnionImageFilter[
        (OnionImageFilter.indexOf(prevFilter) + 1) % OnionImageFilter.length
      ] as OnionImageFilterType;

      const command = new Command(
        "Onion Image - Change filter",
        () =>
          updateGrid.mutateAsync({
            id,
            filter: nextFilter,
          }),
        () => {
          return new Promise((resolve) => {
            if (onionImage) {
              updateGrid
                .mutateAsync({
                  id: onionImage.id,
                  filter: prevFilter,
                })
                .then(() => resolve());
            } else {
              resolve();
            }
          });
        }
      );
      return executeCommand(command);
    },
  };
}
