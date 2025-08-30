import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import type { IOnionImage } from "@/features/onion-image/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import type { IPreset } from "@/features/preset/types";
import { useQuery } from "@tanstack/react-query";

function getOnionImage(
  presetId: IPreset["id"],
  id: IOnionImage["id"]
): Promise<IOnionImage> {
  return new Promise((resolve, reject) => {
    const maybeOnionImage = localStorage.getItem(
      ONION_IMAGES_KEYS.onionImage(presetId, id).join("-")
    );

    if (maybeOnionImage === null) {
      reject();
    } else {
      resolve(JSON.parse(maybeOnionImage));
    }
  });
}

export function useOnionImageByIdQuery(id: IOnionImage["id"]) {
  const presetId = usePresetActiveId();
  return useQuery({
    queryKey: ONION_IMAGES_KEYS.onionImage(presetId, id),
    queryFn: () => getOnionImage(presetId, id),
  });
}
