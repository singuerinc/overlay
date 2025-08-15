import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import type { ITool } from "@/features/tools/ITool";

export const CROSSHAIR = "crosshair";

export interface ICrosshair extends ITool<"crosshair"> {
  x: number;
  y: number;
  color: CrosshairColorType;
  visible: boolean;
  locked: boolean;
}

export type ICrosshairStore = ICrosshair[];
