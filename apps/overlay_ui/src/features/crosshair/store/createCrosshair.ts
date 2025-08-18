import { CrosshairColors } from "@/features/crosshair/CrosshairColor";
import type { ICrosshair } from "@/features/crosshair/types";
import { v4 as uuidv4 } from "uuid";

export const createCrosshair = (): ICrosshair => ({
  id: uuidv4(),
  type: "crosshair",
  color: CrosshairColors[1],
  visible: false,
  locked: false,
  originX: 0,
  originY: 0,
});
