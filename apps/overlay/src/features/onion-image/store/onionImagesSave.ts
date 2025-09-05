import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import type { IOnionImagesStore } from "@/features/onion-image/types";

export async function onionImagesSave(
  presetId: string,
  onionImages: IOnionImagesStore
) {
  localStorage.setItem(
    ONION_IMAGES_KEYS.onionImages(presetId).join("-"),
    JSON.stringify(onionImages)
  );
}
