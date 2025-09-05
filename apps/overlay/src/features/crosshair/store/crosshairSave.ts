import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import type { ICrosshairStore } from "@/features/crosshair/types";

export async function crosshairSave(
  presetId: string,
  crosshair: ICrosshairStore
) {
  localStorage.setItem(
    CROSSHAIR_KEYS.crosshair(presetId).join("-"),
    JSON.stringify(crosshair)
  );
}
