import { createCrosshair } from "@/features/crosshair/store/createCrosshair";
import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import type { ICrosshairStore } from "@/features/crosshair/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";

function getCrosshair(presetId: IPreset["id"]): Promise<ICrosshairStore> {
  return new Promise((resolve) => {
    const maybeCrosshair = localStorage.getItem(
      CROSSHAIR_KEYS.crosshair(presetId).join("-")
    );

    if (maybeCrosshair === null) {
      const crosshair = createCrosshair();
      localStorage.setItem(
        CROSSHAIR_KEYS.crosshair(presetId).join("-"),
        JSON.stringify(crosshair)
      );
      resolve(crosshair);
    } else {
      resolve(JSON.parse(maybeCrosshair));
    }
  });
}

export function useCrosshairQuery() {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: CROSSHAIR_KEYS.crosshair(presetId),
    queryFn: () => getCrosshair(presetId),
  });
}
