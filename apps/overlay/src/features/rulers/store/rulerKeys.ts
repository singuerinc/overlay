import type { IPreset } from "@/features/preset/types";

export const RULER_KEYS = {
  ruler: (presetId: IPreset["id"]) => ["overlay", presetId, "ruler"],
};
