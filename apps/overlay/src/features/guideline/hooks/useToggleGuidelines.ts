import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { useToggleGuidelinesCommand } from "@/features/guideline/store/useToggleGuidelinesCommand";
import { useCallback } from "react";

export function useToggleGuidelines() {
  const { data: guidelines } = useGetGuidelinesQuery();
  const toggleGuidelinesCommand = useToggleGuidelinesCommand();

  const toggleGuidelines = useCallback(() => {
    if (guidelines) {
      toggleGuidelinesCommand.execute(!guidelines.visible);
    }
  }, [guidelines, toggleGuidelinesCommand]);

  return { toggleGuidelines };
}
