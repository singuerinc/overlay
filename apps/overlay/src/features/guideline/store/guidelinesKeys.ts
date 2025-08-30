import type { IGuideline } from "@/features/guideline/types";
import type { IPreset } from "@/features/preset/types";

export const GUIDELINES_KEYS = {
  guidelines: (presetId: IPreset["id"]) => ["overlay", presetId, "guidelines"],
  guideline: (presetId: IPreset["id"], guidelineId: IGuideline["id"]) => [
    "overlay",
    presetId,
    "guidelines",
    guidelineId,
  ],
};
