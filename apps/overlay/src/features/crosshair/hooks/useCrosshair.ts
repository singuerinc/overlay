import { useCrosshairSetColorCommand } from "@/features/crosshair/commands/useCrosshairSetColorCommand";
import { useCrosshairToggleCommand } from "@/features/crosshair/commands/useCrosshairToggleCommand";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import type { ICrosshair } from "@/features/crosshair/types";

import { useCallback } from "react";

export function useCrosshair() {
  const { data: crosshair } = useCrosshairQuery();
  const toggleCommand = useCrosshairToggleCommand();
  const setColorCommand = useCrosshairSetColorCommand();

  const toggle = useCallback(() => {
    if (crosshair) {
      return toggleCommand.execute(crosshair, !crosshair.visible);
    }
  }, [crosshair, toggleCommand]);

  const setColor = useCallback(
    (color: ICrosshair["color"]) => {
      if (crosshair) {
        setColorCommand.execute(crosshair, color);
      }
    },
    [crosshair, setColorCommand]
  );

  return { visible: crosshair?.visible ?? false, toggle, setColor };
}
