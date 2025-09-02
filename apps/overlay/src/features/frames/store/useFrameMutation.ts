import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { FRAMES_KEYS } from "../store/framesKeys";
import { type IFrame } from "../types";

export function useFrameMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: { id: IFrame["id"] } & Partial<IFrame>) => {
      const frame = queryClient.getQueryData<IFrame>(
        FRAMES_KEYS.frame(presetId, props.id)
      );
      if (frame) {
        const newFrame = produce(frame, (draftState: IFrame) => {
          Object.assign(draftState, props);
        });

        localStorage.setItem(
          FRAMES_KEYS.frame(presetId, props.id).join("-"),
          JSON.stringify(newFrame)
        );
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: FRAMES_KEYS.frame(presetId, id),
      });
    },
  });
}
