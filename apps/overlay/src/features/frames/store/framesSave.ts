import { FRAMES_KEYS } from "@/features/frames/store/framesKeys";
import type { IFrameStore } from "@/features/frames/types";

export async function framesSave(presetId: string, frames: IFrameStore) {
  localStorage.setItem(
    FRAMES_KEYS.frames(presetId).join("-"),
    JSON.stringify(frames)
  );
}
