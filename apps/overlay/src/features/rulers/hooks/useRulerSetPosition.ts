import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { useRulerSetPositionCommand } from "@/features/rulers/store/useRulerSetPositionCommand";
import type { IRuler } from "@/features/rulers/types";
import { useCallback } from "react";

export function useRulerSetPosition() {
  const { data: rulers } = useRulerQuery();
  const setPositionRulerCommand = useRulerSetPositionCommand();

  const setPositionRuler = useCallback(
    (position: IRuler["position"]) => {
      if (rulers) {
        setPositionRulerCommand.execute(position);
      }
    },
    [rulers, setPositionRulerCommand]
  );

  return { setPositionRuler };
}
