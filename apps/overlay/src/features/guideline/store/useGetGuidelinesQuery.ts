import { useActiveFrameId } from "@/appStore";
import { createGuidelines } from "@/features/guideline/store/createGuidelines";
import { useQuery } from "@tanstack/react-query";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

function getGuidelines(frameId: string): Promise<IGuideLineStore> {
  return new Promise((resolve) => {
    const maybeGuidelines = localStorage.getItem(
      GUIDELINES_KEYS.guidelines(frameId).join("-")
    );

    if (maybeGuidelines === null) {
      const guidelines = createGuidelines();
      localStorage.setItem(
        GUIDELINES_KEYS.guidelines(frameId).join("-"),
        JSON.stringify(guidelines)
      );
      resolve(guidelines);
    } else {
      resolve(JSON.parse(maybeGuidelines));
    }
  });
}

export function useGetGuidelinesQuery() {
  const frameId = useActiveFrameId();
  return useQuery({
    queryKey: GUIDELINES_KEYS.guidelines(frameId),
    queryFn: () => getGuidelines(frameId),
  });
}
