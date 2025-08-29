import type { ITool } from "@/features/tools/ITool";

export const ONION_IMAGE = "onion-image";

export interface IOnionImage extends ITool<"onion-image"> {
  x: number;
  y: number;
  locked: boolean;
  data: string;
  width: number;
  height: number;
}

export type IOnionImagesStore = {
  onionImages: IOnionImage["id"][];
  visible: boolean;
  locked: boolean;
};
