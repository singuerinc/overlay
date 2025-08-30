import { createGuidelines } from "@/features/guideline/store/createGuidelines";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";
import type { IGuidelineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

function getGuidelines(presetId: IPreset["id"]): Promise<IGuidelineStore> {
  return new Promise((resolve) => {
    const maybeGuidelines = localStorage.getItem(
      GUIDELINES_KEYS.guidelines(presetId).join("-")
    );

    if (maybeGuidelines === null) {
      const guidelines = createGuidelines();
      localStorage.setItem(
        GUIDELINES_KEYS.guidelines(presetId).join("-"),
        JSON.stringify(guidelines)
      );
      resolve(guidelines);
    } else {
      resolve(JSON.parse(maybeGuidelines));
    }
  });
}

export function useGuidelinesQuery() {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: GUIDELINES_KEYS.guidelines(presetId),
    queryFn: () => getGuidelines(presetId),
  });
}
