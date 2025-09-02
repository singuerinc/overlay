import type { IFrame } from "@/features/frames/types";
import { v4 as uuidv4 } from "uuid";

export const createFrame = (
  props?: Partial<Exclude<IFrame, "id" | "type">>
): IFrame => ({
  id: uuidv4(),
  type: "frame",
  x: 100,
  y: 100,
  width: 300,
  height: 200,
  locked: false,
  visible: true,
  ...props,
});
