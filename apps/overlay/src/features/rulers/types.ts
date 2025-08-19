import type { ITool } from "@/features/tools/ITool";

export interface IRuler extends ITool {
  originX: number;
  originY: number;
  visible: boolean;
  width: string;
  height: string;
}

export type IRulerStore = IRuler;
