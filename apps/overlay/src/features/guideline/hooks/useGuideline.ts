import { useGuidelineCycleColorCommand } from "@/features/guideline/commands/useGuidelineColorCommand";
import { useGuidelineLockCommand } from "@/features/guideline/commands/useGuidelineLockCommand";
import { useGuidelineMoveCommand } from "@/features/guideline/commands/useGuidelineMoveCommand";
import { useGuidelineRemoveCommand } from "@/features/guideline/commands/useGuidelineRemoveCommand";
import { useGuidelineRotateCommand } from "@/features/guideline/commands/useGuidelineRotateCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuideline() {
  const removeCmd = useGuidelineRemoveCommand();
  const rotateCmd = useGuidelineRotateCommand();
  const lockCmd = useGuidelineLockCommand();
  const moveCmd = useGuidelineMoveCommand();
  const cycleColorCmd = useGuidelineCycleColorCommand();

  return {
    cycleColor: (guideline: IGuideline) => {
      cycleColorCmd.execute(guideline);
    },
    move: (guideline: IGuideline, { x, y }: { x: number; y: number }) => {
      moveCmd.execute(guideline.id, { x, y });
    },
    toggleLock: (guideline: IGuideline) => {
      lockCmd.execute(guideline, !guideline.locked);
    },
    rotate: (guideline: IGuideline) => {
      rotateCmd.execute(guideline);
    },
    remove: (guideline: IGuideline) => {
      removeCmd.execute(guideline);
    },
  };
}
