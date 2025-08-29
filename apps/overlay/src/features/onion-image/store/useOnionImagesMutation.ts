import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IOnionImagesStore } from "../types";

export function useOnionImagesMutation() {
  const frameId = useFrameActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IOnionImagesStore, "id">>) => {
      const onionImages = queryClient.getQueryData<IOnionImagesStore>(
        ONION_IMAGES_KEYS.onionImages(frameId)
      );

      const newOnionImages = produce(
        onionImages,
        (draftState: IOnionImagesStore) => {
          Object.assign(draftState, props);
        }
      );

      localStorage.setItem(
        ONION_IMAGES_KEYS.onionImages(frameId).join("-"),
        JSON.stringify(newOnionImages)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ONION_IMAGES_KEYS.onionImages(frameId),
      });
    },
  });
}
