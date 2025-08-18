import { createCrosshair } from "@/features/crosshair/store/createCrosshair";
import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import type { ICrosshairStore } from "@/features/crosshair/types";
import { useQuery } from "@tanstack/react-query";

function getCrosshair(): Promise<ICrosshairStore> {
  return new Promise((resolve) => {
    const maybeCrosshair = localStorage.getItem("crosshair");

    if (maybeCrosshair === null) {
      const crosshair = createCrosshair();
      localStorage.setItem("crosshair", JSON.stringify(crosshair));
      resolve(crosshair);
    } else {
      resolve(JSON.parse(maybeCrosshair));
    }
  });
}

export function useGetCrosshairQuery() {
  return useQuery({
    queryKey: CROSSHAIR_KEYS.crosshair,
    queryFn: getCrosshair,
  });
}
