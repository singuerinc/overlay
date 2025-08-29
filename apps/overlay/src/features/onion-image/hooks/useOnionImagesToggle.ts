import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { useOnionImagesToggleCommand } from "@/features/onion-image/store/useOnionImagesToggleCommand";
import { useCallback } from "react";

export function useOnionImagesToggle() {
  const { data: onionImages } = useOnionImagesQuery();
  const toggleCommand = useOnionImagesToggleCommand();

  const toggle = useCallback(() => {
    if (onionImages) {
      toggleCommand.execute(!onionImages.visible);
    }
  }, [onionImages, toggleCommand]);

  return { toggle };
}
