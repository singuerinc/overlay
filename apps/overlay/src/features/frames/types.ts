import type { ITool } from "@/features/tools/ITool";

export interface IFrame extends ITool<"frame"> {
  visible: boolean;
  locked: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type IFrameStore = {
  frames: IFrame["id"][];
  visible: boolean;
  locked: boolean;
};
