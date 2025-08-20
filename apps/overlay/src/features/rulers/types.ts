import type { ITool } from "@/features/tools/ITool";

export interface IRuler extends ITool {
  originX: number;
  originY: number;
  visible: boolean;
  width: string;
  height: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export type IRulerStore = IRuler;
