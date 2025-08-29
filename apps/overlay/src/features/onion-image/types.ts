import type { ITool } from "@/features/tools/ITool";

export const ONION_IMAGE = "onion-image";

export interface IOnionImage extends ITool<"onion-image"> {
  x: number;
  y: number;
  locked: boolean;
}

export type IOnionImagesStore = {
  onionImages: IOnionImage["id"][];
  visible: boolean;
  locked: boolean;
};
