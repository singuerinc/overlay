import { useGuidelineRemoveCommand } from "@/features/guideline/store/useGuidelineRemoveCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuidelineDelete() {
  const command = useGuidelineRemoveCommand();
  return {
    delete: (guideline: IGuideline) => {
      command.execute(guideline);
    },
  };
}
