import { useRotateGuidelineCommand } from "@/features/guideline/store/useRotateGuidelineCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useRotateGuideline() {
  const rotateGuidelineCommand = useRotateGuidelineCommand();
  return {
    rotate: (guideline: IGuideline) => {
      rotateGuidelineCommand.execute(guideline);
    },
  };
}
