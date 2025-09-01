import { ONION_IMAGE, type IOnionImage } from "@/features/onion-image/types";
import { v4 as uuidv4 } from "uuid";

export const createOnionImage = (
  name: string,
  props?: Partial<Exclude<IOnionImage, "id" | "type" | "name">>
): IOnionImage => ({
  id: uuidv4(),
  type: ONION_IMAGE,
  x: 0,
  y: 0,
  name,
  scale: 1,
  visible: true,
  data: undefined as unknown as string,
  width: 0,
  height: 0,
  filter: "none",
  opacity: 0.5,
  locked: false,
  ...props,
});
