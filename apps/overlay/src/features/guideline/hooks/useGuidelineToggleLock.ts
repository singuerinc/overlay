import { useLockGuidelineCommand } from "@/features/guideline/store/useLockGuidelineCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuidelineToggleLock() {
  const command = useLockGuidelineCommand();
  return {
    toggleLock: (guideline: IGuideline) => {
      command.execute(guideline, !guideline.locked);
    },
  };
}
