import { PRESETS_KEYS } from "@/features/preset/store/presetsKeys";
import type { IPreset } from "@/features/preset/types";
import type { IWorkspace } from "@/features/workspace/types";

export async function presetSave(
  workspaceId: IWorkspace["id"],
  preset: IPreset
) {
  return localStorage.setItem(
    PRESETS_KEYS.preset(workspaceId, preset.id).join("-"),
    JSON.stringify(preset)
  );
}
