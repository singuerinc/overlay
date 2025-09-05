import type { IOnionImagesStore } from "@/features/onion-image/types";

export function createOnionImages(props?: IOnionImagesStore) {
  return {
    onionImages: [],
    visible: true,
    locked: false,
    ...props,
  };
}
