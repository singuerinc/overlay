import { CROSSHAIR, type ICrosshair } from "@/features/crosshair/types";
import type { ITool } from "@/features/tools/ITool";

export function isCrosshair(tool: ITool | null): tool is ICrosshair {
  if (!tool) return false;
  return tool && tool.type === CROSSHAIR;
}
