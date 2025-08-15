import { createCrosshair } from "@/features/crosshair/store/createCrosshair";
import type { ICrosshairStore } from "@/features/crosshair/types";
import { useQuery } from "@tanstack/react-query";
import { CROSSHAIR_KEYS } from "./crosshairKeys";

function getCrosshair(): Promise<ICrosshairStore> {
  return new Promise((resolve) => {
    const maybeCrosshair = localStorage.getItem("crosshair");

    if (maybeCrosshair === null) {
      resolve([createCrosshair()]);
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
