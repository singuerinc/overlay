import { GUIDELINES_KEYS } from "@/features/guideline/store/guidelinesKeys";
import type { IGuideline } from "@/features/guideline/types";

export async function guidelineSave(presetId: string, guideline: IGuideline) {
  localStorage.setItem(
    GUIDELINES_KEYS.guideline(presetId, guideline.id).join("-"),
    JSON.stringify(guideline)
  );
}
