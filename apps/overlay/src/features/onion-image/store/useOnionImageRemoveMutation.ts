import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IOnionImage, type IOnionImagesStore } from "../types";

export function useOnionImageRemoveMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ onionImage }: { onionImage: IOnionImage }) => {
      const prevOnionImages = queryClient.getQueryData<IOnionImagesStore>(
        ONION_IMAGES_KEYS.onionImages(presetId)
      );

      const onionImages = produce(
        prevOnionImages,
        (draftState: IOnionImagesStore) => {
          draftState.onionImages = draftState.onionImages.filter(
            (id) => id !== onionImage.id
          );
        }
      );

      localStorage.setItem(
        ONION_IMAGES_KEYS.onionImages(presetId).join("-"),
        JSON.stringify(onionImages)
      );

      localStorage.removeItem(
        ONION_IMAGES_KEYS.onionImage(presetId, onionImage.id).join("-")
      );

      queryClient.setQueryData(
        ONION_IMAGES_KEYS.onionImages(presetId),
        onionImages
      );
      queryClient.setQueryData(
        ONION_IMAGES_KEYS.onionImage(presetId, onionImage.id),
        undefined
      );

      return onionImages;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ONION_IMAGES_KEYS.onionImages(presetId),
      });
    },
  });
}
