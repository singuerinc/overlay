import { ONION_IMAGE, type IOnionImage } from "@/features/onion-image/types";
import type { ITool } from "@/features/tools/ITool";

export function isOnionImage(tool: ITool | null): tool is IOnionImage {
  if (!tool) return false;
  return tool.type === ONION_IMAGE;
}
