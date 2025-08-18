import { useQuery } from "@tanstack/react-query";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

function getGuidelines(): Promise<IGuideLineStore> {
  return new Promise((resolve) => {
    const maybeGuidelines = localStorage.getItem("guidelines");

    if (maybeGuidelines === null) {
      resolve([]);
    } else {
      resolve(JSON.parse(maybeGuidelines));
    }
  });
}

export function useGetGuidelinesQuery() {
  return useQuery({
    queryKey: GUIDELINES_KEYS.guidelines,
    queryFn: getGuidelines,
  });
}
