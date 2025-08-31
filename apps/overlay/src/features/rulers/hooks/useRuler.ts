import { useRulerSetOriginCommand } from "@/features/rulers/commands/useRulerSetOriginCommand";
import { useRulerSetPositionCommand } from "@/features/rulers/commands/useRulerSetPositionCommand";
import { useRulerToggleCommand } from "@/features/rulers/commands/useRulerToggleCommand";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import type { IRuler } from "@/features/rulers/types";
import { useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

export function useRuler() {
  const { data: rulers } = useRulerQuery();
  const toggleCommand = useRulerToggleCommand();
  const setPositionRulerCommand = useRulerSetPositionCommand();
  const setOriginRulerCommand = useRulerSetOriginCommand();

  const windowSize = useWindowSize();
  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  const toggle = useCallback(() => {
    if (rulers) {
      toggleCommand.execute(!rulers.visible);
    }
  }, [rulers, toggleCommand]);

  const setPosition = useCallback(
    (position: IRuler["position"]) => {
      if (rulers) {
        setPositionRulerCommand.execute(position);
      }
    },
    [rulers, setPositionRulerCommand]
  );

  return {
    setPosition,
    resetOrigin: () => {
      setOriginRulerCommand.execute(0, 0);
    },
    centerOrigin: () => {
      setOriginRulerCommand.execute(centerX, centerY);
    },
    setOrigin: (x: number, y: number) => {
      setOriginRulerCommand.execute(x, y);
    },
    visible: rulers?.visible,
    toggle,
  };
}
