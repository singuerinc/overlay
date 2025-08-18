import { createRuler } from "@/features/rulers/store/createRuler";
import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRulerStore } from "@/features/rulers/types";
import { useQuery } from "@tanstack/react-query";

function getRuler(): Promise<IRulerStore> {
  return new Promise((resolve) => {
    const maybeRuler = localStorage.getItem("ruler");

    if (maybeRuler === null) {
      const ruler = createRuler("100%", "100%");
      localStorage.setItem("ruler", JSON.stringify(ruler));
      resolve(ruler);
    } else {
      resolve(JSON.parse(maybeRuler));
    }
  });
}

export function useGetRulerQuery() {
  return useQuery({
    queryKey: RULER_KEYS.ruler,
    queryFn: getRuler,
  });
}
