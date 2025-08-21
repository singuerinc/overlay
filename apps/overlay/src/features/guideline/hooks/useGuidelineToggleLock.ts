import { useGuidelineLockCommand } from "@/features/guideline/store/useGuidelineLockCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuidelineToggleLock() {
  const command = useGuidelineLockCommand();
  return {
    toggleLock: (guideline: IGuideline) => {
      command.execute(guideline, !guideline.locked);
    },
  };
}
