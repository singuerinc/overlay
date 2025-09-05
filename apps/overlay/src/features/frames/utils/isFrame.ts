import type { IFrame } from "@/features/frames/types";
import type { ITool } from "@/features/tools/ITool";

export function isFrame(tool: ITool | null): tool is IFrame {
  if (!tool) return false;
  return tool && tool.type === "frame";
}
