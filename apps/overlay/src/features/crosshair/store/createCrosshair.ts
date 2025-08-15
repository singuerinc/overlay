import type { ICrosshair } from "@/features/crosshair/types";
import { v4 as uuidv4 } from "uuid";

export const createCrosshair = (): ICrosshair => ({
  id: uuidv4(),
  type: "crosshair",
  y: 200,
  x: 800,
  color: "cyan",
  visible: false,
  locked: false,
});
