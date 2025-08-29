import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { createOnionImages } from "@/features/onion-image/store/createOnionImages";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { useQuery } from "@tanstack/react-query";
import type { IOnionImagesStore } from "../types";

function getOnionImages(frameId: string): Promise<IOnionImagesStore> {
  return new Promise((resolve) => {
    const maybeOnionImages = localStorage.getItem(
      ONION_IMAGES_KEYS.onionImages(frameId).join("-")
    );

    if (maybeOnionImages === null) {
      const onionImages = createOnionImages();
      localStorage.setItem(
        ONION_IMAGES_KEYS.onionImages(frameId).join("-"),
        JSON.stringify(onionImages)
      );
      resolve(onionImages);
    } else {
      resolve(JSON.parse(maybeOnionImages));
    }
  });
}

export function useOnionImagesQuery() {
  const frameId = useFrameActiveId();
  return useQuery({
    queryKey: ONION_IMAGES_KEYS.onionImages(frameId),
    queryFn: () => getOnionImages(frameId),
  });
}
