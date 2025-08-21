import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { useRulerToggleCommand } from "@/features/rulers/store/useRulerToggleCommand";
import { useCallback } from "react";

export function useRulerToggle() {
  const { data: rulers } = useRulerQuery();
  const toggleCommand = useRulerToggleCommand();

  const toggle = useCallback(() => {
    if (rulers) {
      toggleCommand.execute(!rulers.visible);
    }
  }, [rulers, toggleCommand]);

  return { visible: rulers?.visible, toggle };
}
