import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { ONION_IMAGES_KEYS } from "@/features/onion-image/store/onionImagesKeys";
import type { IOnionImage } from "@/features/onion-image/types";
import { useQuery } from "@tanstack/react-query";

function getOnionImage(frameId: string, id: string): Promise<IOnionImage> {
  return new Promise((resolve, reject) => {
    const maybeOnionImage = localStorage.getItem(
      ONION_IMAGES_KEYS.onionImage(frameId, id).join("-")
    );

    if (maybeOnionImage === null) {
      reject();
    } else {
      resolve(JSON.parse(maybeOnionImage));
    }
  });
}

export function useOnionImageByIdQuery(id: string) {
  const frameId = useFrameActiveId();
  return useQuery({
    queryKey: ONION_IMAGES_KEYS.onionImage(frameId, id),
    queryFn: () => getOnionImage(frameId, id),
  });
}
