import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { createRuler } from "@/features/rulers/store/createRuler";
import { RULER_KEYS } from "@/features/rulers/store/rulerKeys";
import type { IRulerStore } from "@/features/rulers/types";
import { useQuery } from "@tanstack/react-query";

export function getRuler(presetId: IPreset["id"]): Promise<IRulerStore> {
  return new Promise((resolve) => {
    const maybeRuler = localStorage.getItem(
      RULER_KEYS.ruler(presetId).join("-")
    );

    if (maybeRuler === null) {
      const ruler = createRuler("100%", "100%");
      localStorage.setItem(
        RULER_KEYS.ruler(presetId).join("-"),
        JSON.stringify(ruler)
      );
      resolve(ruler);
    } else {
      resolve(JSON.parse(maybeRuler));
    }
  });
}

export function useRulerQuery() {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: RULER_KEYS.ruler(presetId),
    queryFn: () => getRuler(presetId),
  });
}
