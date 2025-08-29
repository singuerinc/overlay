import type { ITool } from "@/features/tools/ITool";

export const ONION_IMAGE = "onion-image";

export const OnionImageFilter = ["none", "invert", "grayscale"] as const;
export type OnionImageFilterType = (typeof OnionImageFilter)[number];

export interface IOnionImage extends ITool<"onion-image"> {
  x: number;
  y: number;
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
