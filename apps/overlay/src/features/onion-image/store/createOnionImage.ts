import { ONION_IMAGE, type IOnionImage } from "@/features/onion-image/types";
import { v4 as uuidv4 } from "uuid";

export const createOnionImage = (
  props?: Partial<Exclude<IOnionImage, "id" | "type">>
): IOnionImage => ({
  id: uuidv4(),
  type: ONION_IMAGE,
  x: 0,
  y: 0,
  locked: false,
  ...props,
});
