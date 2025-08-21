import { useGetCrosshairQuery } from "@/features/crosshair/store/useGetCrosshairQuery";
import { useToggleCrosshairCommand } from "@/features/crosshair/store/useToggleCrosshairCommand";
import { useCallback } from "react";

export function useCrosshairToggle() {
  const { data: crosshair } = useGetCrosshairQuery();
  const toggleCommand = useToggleCrosshairCommand();

  const toggle = useCallback(() => {
    if (crosshair) {
      toggleCommand.execute(!crosshair.visible);
    }
  }, [crosshair, toggleCommand]);

  return { toggle };
}
