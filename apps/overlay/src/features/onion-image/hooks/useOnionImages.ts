import { useOnionImageAddCommand } from "@/features/onion-image/commands/useOnionImageAddCommand";
import { useOnionImagesToggleCommand } from "@/features/onion-image/commands/useOnionImagesToggleCommand";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { useCallback } from "react";

export function useOnionImages() {
  const { data: onionImages } = useOnionImagesQuery();
  const addCommand = useOnionImageAddCommand();
  const toggleCommand = useOnionImagesToggleCommand();

  const toggle = useCallback(() => {
    if (onionImages) {
      toggleCommand.execute(!onionImages.visible);
    }
  }, [onionImages, toggleCommand]);

  return { toggle, addImage: addCommand.execute };
}
