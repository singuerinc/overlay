import { useLockGuidelineCommand } from "@/features/guideline/store/useLockGuidelineCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useToggleLockGuideline() {
  const command = useLockGuidelineCommand();
  return {
    toggleLockGuideline: (guideline: IGuideline) => {
      command.execute(guideline, !guideline.locked);
    },
  };
}
