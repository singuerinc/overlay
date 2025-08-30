import { useGuidelineRemoveCommand } from "@/features/guideline/store/useGuidelineRemoveCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuidelineRemove() {
  const command = useGuidelineRemoveCommand();
  return {
    remove: (guideline: IGuideline) => {
      command.execute(guideline);
    },
  };
}
