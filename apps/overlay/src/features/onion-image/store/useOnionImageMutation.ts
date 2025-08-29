import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IOnionImage } from "../types";

export function useOnionImageMutation() {
  const frameId = useFrameActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: { id: string } & Partial<IOnionImage>) => {
      const onionImage = queryClient.getQueryData<IOnionImage>(
        ONION_IMAGES_KEYS.onionImage(frameId, props.id)
      );

      if (onionImage) {
        // optimistic update
        queryClient.setQueryData<IOnionImage>(
          ONION_IMAGES_KEYS.onionImage(frameId, props.id),
          (prev) => {
            if (!prev) return prev;
            return produce(prev, (draftState: IOnionImage) => {
              Object.assign(draftState, props);
            });
          }
        );

        const newOnionImage = produce(onionImage, (draftState: IOnionImage) => {
          Object.assign(draftState, props);
        });

        localStorage.setItem(
          ONION_IMAGES_KEYS.onionImage(frameId, props.id).join("-"),
          JSON.stringify(newOnionImage)
        );
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ONION_IMAGES_KEYS.onionImage(frameId, id),
      });
    },
  });
}
