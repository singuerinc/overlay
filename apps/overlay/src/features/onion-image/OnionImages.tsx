import { OnionImage } from "@/features/onion-image/components/OnionImage";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { zIndex } from "@/features/workspace/utils/zIndex";
import { cn } from "@/ui/cn";

export function OnionImages() {
  const { data: onionImages, isLoading, isError } = useOnionImagesQuery();

  if (isLoading || isError || !onionImages) {
    return null;
  }

  if (!onionImages.visible) {
    return null;
  }

  return (
    <div
      data-overlay-tool-type="onion-images"
      className={cn(
        "o:absolute o:top-0 o:left-0 o:w-full o:h-full",
        zIndex.onionImages
      )}
    >
      {onionImages.onionImages.map((imageId) => (
        <OnionImage key={imageId} id={imageId} />
      ))}
    </div>
  );
}
