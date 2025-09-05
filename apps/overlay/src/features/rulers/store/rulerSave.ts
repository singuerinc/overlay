import type { IPreset } from "@/features/preset/types";
import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRuler } from "@/features/rulers/types";

export async function rulerSave(presetId: IPreset["id"], ruler: IRuler) {
  localStorage.setItem(
    RULER_KEYS.ruler(presetId).join("-"),
    JSON.stringify(ruler)
  );
}
