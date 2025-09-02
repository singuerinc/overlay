import type { IFrame } from "@/features/frames/types";
import type { IPreset } from "@/features/preset/types";

export const FRAMES_KEYS = {
  frames: (presetId: IPreset["id"]) => ["overlay", presetId, "frames"],
  frame: (presetId: IPreset["id"], frameId: IFrame["id"]) => [
    "overlay",
    presetId,
    "frames",
    frameId,
  ],
};
