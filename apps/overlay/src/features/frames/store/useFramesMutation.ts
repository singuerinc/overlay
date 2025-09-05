import { FRAMES_KEYS } from "@/features/frames/store/framesKeys";
import { framesSave } from "@/features/frames/store/framesSave";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IFrameStore } from "../types";

export function useFramesMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IFrameStore, "id">>) => {
      const frames = queryClient.getQueryData<IFrameStore>(
        FRAMES_KEYS.frames(presetId)
      );

      if (frames) {
        const newFrames = produce(frames, (draftState: IFrameStore) => {
          Object.assign(draftState, props);
        });

        await framesSave(presetId, newFrames);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FRAMES_KEYS.frames(presetId),
      });
    },
  });
}
