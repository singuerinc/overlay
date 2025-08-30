import type { IFrame } from "@/features/frame/types";
import { v4 as uuidv4 } from "uuid";

export const createFrame = (props?: Partial<IFrame>): IFrame => ({
  id: props?.id || uuidv4(),
  type: "frame",
  name: props?.name || "Frame 1",
  x: props?.x || 0,
  y: props?.y || 0,
  width: props?.width || `100%`,
  height: props?.height || `100%`,
});
