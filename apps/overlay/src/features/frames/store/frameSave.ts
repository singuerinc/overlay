import { FRAMES_KEYS } from "@/features/frames/store/framesKeys";
import type { IFrame } from "@/features/frames/types";

export async function frameSave(presetId: string, frame: IFrame) {
  localStorage.setItem(
    FRAMES_KEYS.frame(presetId, frame.id).join("-"),
    JSON.stringify(frame)
  );
}
