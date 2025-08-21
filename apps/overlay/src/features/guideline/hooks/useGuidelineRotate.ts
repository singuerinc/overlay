import { useRotateGuidelineCommand } from "@/features/guideline/store/useRotateGuidelineCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuidelineRotate() {
  const rotateCommand = useRotateGuidelineCommand();
  return {
    rotate: (guideline: IGuideline) => {
      rotateCommand.execute(guideline);
    },
  };
}
