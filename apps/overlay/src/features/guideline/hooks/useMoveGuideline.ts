import { useMoveGuidelineCommand } from "@/features/guideline/store/useMoveGuidelineCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useMoveGuideline() {
  const moveGuidelineCommand = useMoveGuidelineCommand();
  return {
    move: (guideline: IGuideline, { x, y }: { x: number; y: number }) => {
      moveGuidelineCommand.execute(guideline.id, { x, y });
    },
  };
}
