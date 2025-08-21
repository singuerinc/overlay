import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { useToggleGuidelinesCommand } from "@/features/guideline/store/useToggleGuidelinesCommand";
import { useCallback } from "react";

export function useGuidelinesToggle() {
  const { data: guidelines } = useGetGuidelinesQuery();
  const toggleCommand = useToggleGuidelinesCommand();

  const toggle = useCallback(() => {
    if (guidelines) {
      toggleCommand.execute(!guidelines.visible);
    }
  }, [guidelines, toggleCommand]);

  return { toggle };
}
