import type { IRuler } from "@/features/rulers/types";

export function createRuler(): IRuler {
  return {
    id: "ruler",
    type: "ruler",
    originX: 0,
    originY: 0,
    visible: true,
  };
}
