import type { IPreset } from "@/features/preset/types";

export const PRESETS_KEYS = {
  preset: (workspaceId: string, id: IPreset["id"]) => [
    "overlay",
    workspaceId,
    "preset",
    id,
  ],
};
