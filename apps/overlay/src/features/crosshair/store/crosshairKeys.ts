import type { IPreset } from "@/features/preset/types";

export const CROSSHAIR_KEYS = {
  crosshair: (presetId: IPreset["id"]) => ["overlay", presetId, "crosshair"],
};
