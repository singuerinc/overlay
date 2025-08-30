import type { IGuideline } from "@/features/guideline/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

function getGuideline(
  presetId: IPreset["id"],
  id: IGuideline["id"]
): Promise<IGuideline> {
  return new Promise((resolve, reject) => {
    const maybeGuideline = localStorage.getItem(
      GUIDELINES_KEYS.guideline(presetId, id).join("-")
    );

    if (maybeGuideline === null) {
      reject();
    } else {
      resolve(JSON.parse(maybeGuideline));
    }
  });
}

export function useGuidelineByIdQuery(id: IGuideline["id"]) {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: GUIDELINES_KEYS.guideline(presetId, id),
    queryFn: () => getGuideline(presetId, id),
  });
}
