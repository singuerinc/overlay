import type { IPreset } from "@/features/preset/types";

export const GRID_KEYS = {
  grid: (presetId: IPreset["id"]) => ["overlay", presetId, "grid"],
};
