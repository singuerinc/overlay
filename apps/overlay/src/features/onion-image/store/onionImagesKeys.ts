import type { IOnionImage } from "@/features/onion-image/types";
import type { IPreset } from "@/features/preset/types";

export const ONION_IMAGES_KEYS = {
  onionImages: (presetId: IPreset["id"]) => [
    "overlay",
    presetId,
    "onionImages",
  ],
  onionImage: (presetId: IPreset["id"], onionImageId: IOnionImage["id"]) => [
    "overlay",
    presetId,
    "onionImages",
    onionImageId,
  ],
};
