import { createOnionImages } from "@/features/onion-image/store/createOnionImages";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";
import type { IOnionImagesStore } from "../types";

function getOnionImages(presetId: IPreset["id"]): Promise<IOnionImagesStore> {
  return new Promise((resolve) => {
    const maybeOnionImages = localStorage.getItem(
      ONION_IMAGES_KEYS.onionImages(presetId).join("-")
    );

    if (maybeOnionImages === null) {
      const onionImages = createOnionImages();
      localStorage.setItem(
        ONION_IMAGES_KEYS.onionImages(presetId).join("-"),
        JSON.stringify(onionImages)
      );
      resolve(onionImages);
    } else {
      resolve(JSON.parse(maybeOnionImages));
    }
  });
}

export function useOnionImagesQuery() {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: ONION_IMAGES_KEYS.onionImages(presetId),
    queryFn: () => getOnionImages(presetId),
  });
}
