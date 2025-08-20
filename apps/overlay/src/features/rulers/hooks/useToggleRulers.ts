import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useToggleRulerCommand } from "@/features/rulers/store/useToggleRulerCommand";
import { useCallback } from "react";

export function useToggleRuler() {
  const { data: rulers } = useGetRulerQuery();
  const toggleRulerCommand = useToggleRulerCommand();

  const toggleRuler = useCallback(() => {
    if (rulers) {
      toggleRulerCommand.execute(!rulers.visible);
    }
  }, [rulers, toggleRulerCommand]);

  return { toggleRuler };
}
