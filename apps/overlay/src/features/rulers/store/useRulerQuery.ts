import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { createRuler } from "@/features/rulers/store/createRuler";
import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRulerStore } from "@/features/rulers/types";
import { useQuery } from "@tanstack/react-query";

function getRuler(frameId: string): Promise<IRulerStore> {
  return new Promise((resolve) => {
    const maybeRuler = localStorage.getItem(
      RULER_KEYS.ruler(frameId).join("-")
    );

    if (maybeRuler === null) {
      const ruler = createRuler("100%", "100%");
      localStorage.setItem(
        RULER_KEYS.ruler(frameId).join("-"),
        JSON.stringify(ruler)
      );
      resolve(ruler);
    } else {
      resolve(JSON.parse(maybeRuler));
    }
  });
}

export function useRulerQuery() {
  const frameId = useFrameActiveId();
  return useQuery({
    queryKey: RULER_KEYS.ruler(frameId),
    queryFn: () => getRuler(frameId),
  });
}
