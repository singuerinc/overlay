import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
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
  const executeCommand = useCommandExecute();
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
        () => {
          if (onionImage) {
            updateGrid.mutate({
              id: onionImage.id,
              filter: nextFilter,
            });
          }
        },
        () => {
          if (onionImage) {
            updateGrid.mutate({
              id: onionImage.id,
              filter: prevFilter,
            });
          }
        }
      );
      executeCommand(command);
    },
  };
}
