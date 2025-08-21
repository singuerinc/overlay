import { useGuidelineRotateCommand } from "@/features/guideline/store/useGuidelineRotateCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuidelineRotate() {
  const rotateCommand = useGuidelineRotateCommand();
  return {
    rotate: (guideline: IGuideline) => {
      rotateCommand.execute(guideline);
    },
  };
}
