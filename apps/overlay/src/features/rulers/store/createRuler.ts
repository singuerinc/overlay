import type { IRuler } from "@/features/rulers/types";

export function createRuler(props?: Partial<IRuler>): IRuler {
  return {
    id: "ruler",
    type: "ruler",
    originX: 0,
    originY: 0,
    visible: true,
    width: "100%",
    height: "100%",
    position: "top-left",
    ...props,
  };
}
