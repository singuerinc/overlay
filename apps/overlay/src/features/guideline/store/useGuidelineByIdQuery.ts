import { useActiveFrameId } from "@/appStore";
import type { IGuideline } from "@/features/guideline/types";
import { useQuery } from "@tanstack/react-query";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

function getGuideline(frameId: string, id: string): Promise<IGuideline> {
  return new Promise((resolve, reject) => {
    const maybeGuideline = localStorage.getItem(
      GUIDELINES_KEYS.guideline(frameId, id).join("-")
    );

    if (maybeGuideline === null) {
      reject();
    } else {
      resolve(JSON.parse(maybeGuideline));
    }
  });
}

export function useGuidelineByIdQuery(id: string) {
  const frameId = useActiveFrameId();
  return useQuery({
    queryKey: GUIDELINES_KEYS.guideline(frameId, id),
    queryFn: () => getGuideline(frameId, id),
  });
}
