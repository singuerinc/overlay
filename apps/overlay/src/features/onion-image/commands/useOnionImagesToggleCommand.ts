import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { useOnionImagesMutation } from "@/features/onion-image/store/useOnionImagesMutation";
import type { IOnionImagesStore } from "@/features/onion-image/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useQueryClient } from "@tanstack/react-query";

export function useOnionImagesToggleCommand() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();
  const mutation = useOnionImagesMutation();
  const { execute: executeCommand } = useCommands();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (visible: boolean) => {
      const onionImages = queryClient.getQueryData<IOnionImagesStore>(
        ONION_IMAGES_KEYS.onionImages(presetId)
      );

      const prevVisible = onionImages?.visible;

      const command = new Command(
        "Onion Images - Toggle visibility",
        () => {
          setSelectedTool(null);
          return mutation.mutateAsync({ visible });
        },
        () => {
          return mutation.mutateAsync({ visible: prevVisible });
        }
      );
      return executeCommand(command);
    },
  };
}
