import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IOnionImagesStore } from "../types";

export function useOnionImagesMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IOnionImagesStore, "id">>) => {
      const onionImages = queryClient.getQueryData<IOnionImagesStore>(
        ONION_IMAGES_KEYS.onionImages(presetId)
      );

      const newOnionImages = produce(
        onionImages,
        (draftState: IOnionImagesStore) => {
          Object.assign(draftState, props);
        }
      );

      localStorage.setItem(
        ONION_IMAGES_KEYS.onionImages(presetId).join("-"),
        JSON.stringify(newOnionImages)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ONION_IMAGES_KEYS.onionImages(presetId),
      });
    },
  });
}
