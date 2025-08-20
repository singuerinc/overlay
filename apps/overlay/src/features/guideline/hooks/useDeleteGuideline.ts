import { useRemoveGuidelineCommand } from "@/features/guideline/store/useRemoveGuidelineCommand";
import type { IGuideline } from "@/features/guideline/types";

export function useDeleteGuideline() {
  const command = useRemoveGuidelineCommand();
  return {
    deleteGuideline: (guideline: IGuideline) => {
      command.execute(guideline);
    },
  };
}
