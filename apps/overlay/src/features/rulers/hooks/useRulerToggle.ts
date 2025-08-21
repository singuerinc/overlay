import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useToggleRulerCommand } from "@/features/rulers/store/useToggleRulerCommand";
import { useCallback } from "react";

export function useRulerToggle() {
  const { data: rulers } = useGetRulerQuery();
  const toggleCommand = useToggleRulerCommand();

  const toggle = useCallback(() => {
    if (rulers) {
      toggleCommand.execute(!rulers.visible);
    }
  }, [rulers, toggleCommand]);

  return { visible: rulers?.visible, toggle };
}
