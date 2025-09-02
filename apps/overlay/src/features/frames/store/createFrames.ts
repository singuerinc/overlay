import type { IFrameStore } from "@/features/frames/types";

export function createFrames(): IFrameStore {
  return {
    frames: [],
    visible: true,
    locked: false,
  };
}
