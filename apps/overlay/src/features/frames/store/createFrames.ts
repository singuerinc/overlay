import type { IFrameStore } from "@/features/frames/types";

export function createFrames(props?: IFrameStore): IFrameStore {
  return {
    frames: [],
    visible: true,
    locked: false,
    ...props,
  };
}
