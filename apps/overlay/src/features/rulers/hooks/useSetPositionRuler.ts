import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useSetPositionRulerCommand } from "@/features/rulers/store/useSetPositionRulerCommand";
import type { IRuler } from "@/features/rulers/types";
import { useCallback } from "react";

export function useSetPositionRuler() {
  const { data: rulers } = useGetRulerQuery();
  const setPositionRulerCommand = useSetPositionRulerCommand();

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
