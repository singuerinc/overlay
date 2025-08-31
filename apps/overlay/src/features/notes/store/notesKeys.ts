import type { IPreset } from "@/features/preset/types";

export const NOTES_KEYS = {
  notes: (presetId: IPreset["id"]) => ["overlay", presetId, "notes"],
};
