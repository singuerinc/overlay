export const ONION_IMAGES_KEYS = {
  onionImages: (frameId: string) => ["overlay", frameId, "onionImages"],
  onionImage: (frameId: string, onionImageId: string) => [
    "overlay",
    frameId,
    "onionImages",
    onionImageId,
  ],
};
