import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { useGuidelinesToggleCommand } from "@/features/guideline/store/useGuidelinesToggleCommand";
import { useCallback } from "react";

export function useGuidelinesToggle() {
  const { data: guidelines } = useGuidelinesQuery();
  const toggleCommand = useGuidelinesToggleCommand();

  const toggle = useCallback(() => {
    if (guidelines) {
      toggleCommand.execute(!guidelines.visible);
    }
  }, [guidelines, toggleCommand]);

  return { toggle };
}
