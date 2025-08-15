import type { IGuideline } from "@/features/guideline/types";
import { useSelectedTool } from "@/features/tools/store/tools";
import { useMemo } from "react";

export const useSelectedGuidelineColor = () => {
  const selectedTool = useSelectedTool<IGuideline>();
  const color = useMemo(() => selectedTool?.color, [selectedTool]);
  return color;
};
