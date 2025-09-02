import { FRAMES_KEYS } from "@/features/frames/store/framesKeys";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IFrame, type IFrameStore } from "../types";

export function useFrameRemoveMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ frame }: { frame: IFrame }) => {
      const prevFrames = queryClient.getQueryData<IFrameStore>(
        FRAMES_KEYS.frames(presetId)
      );

      const frames = produce(prevFrames, (draftState: IFrameStore) => {
        draftState.frames = draftState.frames.filter(
          (frameId) => frameId !== frame.id
        );
      });

      queryClient.setQueryData(FRAMES_KEYS.frames(presetId), frames);
      queryClient.setQueryData(
        FRAMES_KEYS.frame(presetId, frame.id),
        undefined
      );

      localStorage.setItem(
        FRAMES_KEYS.frames(presetId).join("-"),
        JSON.stringify(frames)
      );

      localStorage.removeItem(FRAMES_KEYS.frame(presetId, frame.id).join("-"));

      return frames;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FRAMES_KEYS.frames(presetId),
      });
    },
  });
}
