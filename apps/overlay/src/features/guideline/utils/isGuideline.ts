import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "@/features/guideline/types";
import type { ITool } from "@/features/tools/ITool";

export function isGuideline(tool: ITool | null): tool is IGuideline {
  if (!tool) return false;
  return (
    tool &&
    (tool.type === GUIDELINE_HORIZONTAL || tool.type === GUIDELINE_VERTICAL)
  );
}
