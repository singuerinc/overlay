import { useGetCrosshairQuery } from "@/features/crosshair/store/useGetCrosshairQuery";
import { useToggleCrosshairCommand } from "@/features/crosshair/store/useToggleCrosshairCommand";
import { useCallback } from "react";

export function useToggleCrosshair() {
  const { data: crosshair } = useGetCrosshairQuery();
  const toggleCrosshairCommand = useToggleCrosshairCommand();

  const toggleCrosshair = useCallback(() => {
    if (crosshair) {
      toggleCrosshairCommand.execute(!crosshair.visible);
    }
  }, [crosshair, toggleCrosshairCommand]);

  return { toggleCrosshair };
}
