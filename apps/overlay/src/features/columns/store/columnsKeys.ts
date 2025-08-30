import type { IPreset } from "@/features/preset/types";

export const COLUMNS_KEYS = {
  horizontalColumns: (presetId: IPreset["id"]) => [
    "overlay",
    presetId,
    "horizontal-columns",
  ],
  verticalColumns: (presetId: IPreset["id"]) => [
    "overlay",
    presetId,
    "vertical-columns",
  ],
};
