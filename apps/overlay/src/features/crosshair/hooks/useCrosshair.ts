import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useCrosshairToggleCommand } from "@/features/crosshair/store/useCrosshairToggleCommand";
import { useCallback } from "react";

export function useCrosshair() {
  const { data: crosshair } = useCrosshairQuery();
  const toggleCommand = useCrosshairToggleCommand();

  const toggle = useCallback(() => {
    if (crosshair) {
      toggleCommand.execute(crosshair, !crosshair.visible);
    }
  }, [crosshair, toggleCommand]);

  return { visible: crosshair?.visible ?? false, toggle };
}
