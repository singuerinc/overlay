import { GUIDELINES_KEYS } from "@/features/guideline/store/guidelinesKeys";
import type { IGuidelineStore } from "@/features/guideline/types";

export async function guidelinesSave(
  presetId: string,
  guidelines: IGuidelineStore
) {
  localStorage.setItem(
    GUIDELINES_KEYS.guidelines(presetId).join("-"),
    JSON.stringify(guidelines)
  );
}
