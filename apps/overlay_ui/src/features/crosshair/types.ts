import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import type { ITool } from "@/features/tools/ITool";

export const CROSSHAIR = "crosshair";

export interface ICrosshair extends ITool<"crosshair"> {
  color: CrosshairColorType;
  visible: boolean;
  locked: boolean;
  originX: number;
  originY: number;
}

export type ICrosshairStore = ICrosshair;
