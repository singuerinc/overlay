import type { ITool } from "@/features/tools/ITool";

export const ONION_IMAGE = "onion-image";

export const OnionImageFilter = ["none", "invert", "grayscale"] as const;
export type OnionImageFilterType = (typeof OnionImageFilter)[number];

export const OnionImageScale = [0.5, 1] as const;
export type OnionImageScaleType = (typeof OnionImageScale)[number];

export interface IOnionImage extends ITool<"onion-image"> {
  x: number;
  y: number;
  scale: OnionImageScaleType;
  name: string;
  visible: boolean;
  locked: boolean;
  data: string;
  width: number;
  height: number;
  filter: OnionImageFilterType;
  opacity: number;
}

export type IOnionImagesStore = {
  onionImages: IOnionImage["id"][];
  visible: boolean;
  locked: boolean;
};
