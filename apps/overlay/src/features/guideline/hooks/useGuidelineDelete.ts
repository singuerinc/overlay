import { useRemoveGuidelineCommand } from "@/features/guideline/store/useRemoveGuidelineCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useGuidelineDelete() {
  const command = useRemoveGuidelineCommand();
  return {
    delete: (guideline: IGuideline) => {
      command.execute(guideline);
    },
  };
}
