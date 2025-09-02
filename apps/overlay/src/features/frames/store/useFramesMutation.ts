import { FRAMES_KEYS } from "@/features/frames/store/framesKeys";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IFrame } from "../types";

export function useFramesMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IFrame, "id">>) => {
      const frames = queryClient.getQueryData<IFrame[]>(
        FRAMES_KEYS.frames(presetId)
      );

      const newFrames = produce(frames, (draftState: IFrame[]) => {
        Object.assign(draftState, props);
      });

      localStorage.setItem(
        FRAMES_KEYS.frames(presetId).join("-"),
        JSON.stringify(newFrames)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FRAMES_KEYS.frames(presetId),
      });
    },
  });
}
