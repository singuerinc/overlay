import { OnionImage } from "@/features/onion-image/components/OnionImage";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";

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
      className="o:absolute o:top-0 o:left-0 o:z-40 o:w-full o:h-full"
    >
      {onionImages.onionImages.map((imageId) => (
        <OnionImage key={imageId} id={imageId} />
      ))}
    </div>
  );
}
