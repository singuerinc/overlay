import { FRAMES_KEYS } from "@/features/frames/store/framesKeys";
import type { IFrame } from "@/features/frames/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";

export function getFrame(
  presetId: IPreset["id"],
  id: IFrame["id"]
): Promise<IFrame> {
  return new Promise((resolve, reject) => {
    const maybeFrame = localStorage.getItem(
      FRAMES_KEYS.frame(presetId, id).join("-")
    );

    if (maybeFrame === null) {
      reject();
    } else {
      resolve(JSON.parse(maybeFrame));
    }
  });
}

export function useFrameByIdQuery(id: IFrame["id"]) {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: FRAMES_KEYS.frame(presetId, id),
    queryFn: () => getFrame(presetId, id),
  });
}
