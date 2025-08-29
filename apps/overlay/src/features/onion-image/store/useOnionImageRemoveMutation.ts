import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { type IOnionImage, type IOnionImagesStore } from "../types";

export function useOnionImageRemoveMutation() {
  const frameId = useFrameActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ onionImage }: { onionImage: IOnionImage }) => {
      const prevOnionImages = queryClient.getQueryData<IOnionImagesStore>(
        ONION_IMAGES_KEYS.onionImages(frameId)
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
        ONION_IMAGES_KEYS.onionImages(frameId).join("-"),
        JSON.stringify(onionImages)
      );

      localStorage.removeItem(
        ONION_IMAGES_KEYS.onionImage(frameId, onionImage.id).join("-")
      );

      queryClient.setQueryData(
        ONION_IMAGES_KEYS.onionImages(frameId),
        onionImages
      );
      queryClient.setQueryData(
        ONION_IMAGES_KEYS.onionImage(frameId, onionImage.id),
        undefined
      );

      return onionImages;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ONION_IMAGES_KEYS.onionImages(frameId),
      });
    },
  });
}
