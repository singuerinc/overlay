import { onionImageSave } from "@/features/onion-image/store/onionImageSave";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IOnionImage } from "../types";

export function useOnionImageMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      props: { id: IOnionImage["id"] } & Partial<IOnionImage>
    ) => {
      const onionImage = queryClient.getQueryData<IOnionImage>(
        ONION_IMAGES_KEYS.onionImage(presetId, props.id)
      );

      if (onionImage) {
        // optimistic update
        queryClient.setQueryData<IOnionImage>(
          ONION_IMAGES_KEYS.onionImage(presetId, props.id),
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

        await onionImageSave(presetId, newOnionImage);
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ONION_IMAGES_KEYS.onionImage(presetId, id),
      });
    },
  });
}
