import type { IPreset } from "@/features/preset/types";
import { v4 as uuidv4 } from "uuid";

export const createPreset = (props?: Partial<IPreset>): IPreset => ({
  id: props?.id || uuidv4(),
  type: "preset",
  name: props?.name || "Preset 1",
  x: props?.x || 0,
  y: props?.y || 0,
  width: props?.width || `100%`,
  height: props?.height || `100%`,
});
