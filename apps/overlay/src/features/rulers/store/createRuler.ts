import type { IRuler } from "@/features/rulers/types";

export function createRuler(width: string, height: string): IRuler {
  return {
    id: "ruler",
    type: "ruler",
    originX: 0,
    originY: 0,
    visible: true,
    width,
    height,
    position: "top-left",
  };
}
