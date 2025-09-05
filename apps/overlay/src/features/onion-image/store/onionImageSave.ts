import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import type { IOnionImage } from "@/features/onion-image/types";

export async function onionImageSave(
  presetId: string,
  onionImage: IOnionImage
) {
  localStorage.setItem(
    ONION_IMAGES_KEYS.onionImage(presetId, onionImage.id).join("-"),
    JSON.stringify(onionImage)
  );
}
