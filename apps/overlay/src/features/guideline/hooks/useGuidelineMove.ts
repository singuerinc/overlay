import { useGuidelineMoveCommand } from "@/features/guideline/store/useGuidelineMoveCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuidelineMove() {
  const moveGuidelineCommand = useGuidelineMoveCommand();
  return {
    move: (guideline: IGuideline, { x, y }: { x: number; y: number }) => {
      moveGuidelineCommand.execute(guideline.id, { x, y });
    },
  };
}
