import { createFrames } from "@/features/frames/store/createFrames";
import { FRAMES_KEYS } from "@/features/frames/store/framesKeys";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";
import type { IFrameStore } from "../types";

export function getFrames(presetId: IPreset["id"]): Promise<IFrameStore> {
  return new Promise((resolve) => {
    const maybeFrames = localStorage.getItem(
      FRAMES_KEYS.frames(presetId).join("-")
    );

    if (maybeFrames === null) {
      const frames = createFrames();
      localStorage.setItem(
        FRAMES_KEYS.frames(presetId).join("-"),
        JSON.stringify(frames)
      );
      resolve(frames);
    } else {
      resolve(JSON.parse(maybeFrames));
    }
  });
}

export function useFramesQuery() {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: FRAMES_KEYS.frames(presetId),
    queryFn: () => getFrames(presetId),
  });
}
