import { useActiveFrameId } from "@/appStore";
import { createCrosshair } from "@/features/crosshair/store/createCrosshair";
import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import type { ICrosshairStore } from "@/features/crosshair/types";
import { useQuery } from "@tanstack/react-query";

function getCrosshair(frameId: string): Promise<ICrosshairStore> {
  return new Promise((resolve) => {
    const maybeCrosshair = localStorage.getItem(
      CROSSHAIR_KEYS.crosshair(frameId).join("-")
    );

    if (maybeCrosshair === null) {
      const crosshair = createCrosshair();
      localStorage.setItem(
        CROSSHAIR_KEYS.crosshair(frameId).join("-"),
        JSON.stringify(crosshair)
      );
      resolve(crosshair);
    } else {
      resolve(JSON.parse(maybeCrosshair));
    }
  });
}

export function useCrosshairQuery() {
  const frameId = useActiveFrameId();
  return useQuery({
    queryKey: CROSSHAIR_KEYS.crosshair(frameId),
    queryFn: () => getCrosshair(frameId),
  });
}
