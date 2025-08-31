import type { IPreset } from "@/features/preset/types";
import { v4 as uuidv4 } from "uuid";

export const createPreset = (props?: Partial<IPreset>): IPreset => ({
  id: uuidv4(),
  type: "preset",
  name: "Preset 1",
  x: 0,
  y: 0,
  width: `100%`,
  height: `100%`,
  ...props,
});
