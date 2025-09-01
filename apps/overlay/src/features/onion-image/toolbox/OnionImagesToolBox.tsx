import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { useOnionImagesQuery } from "@/features/onion-image/store/useOnionImagesQuery";
import { OnionImageLockButton } from "@/features/onion-image/toolbox/OnionImageLockButton";
import { OnionImageToggleVisibilityButton } from "@/features/onion-image/toolbox/OnionImageToggleVisibilityButton";

export function OnionImagesToolBox() {
  const { data: onionImages } = useOnionImagesQuery();
  return (
    <ul className="o:flex o:flex-col o:gap-1 o:divide-y o:divide-neutral-200">
      {onionImages?.onionImages?.map((imageId) => (
        <OnionImageItem key={imageId} imageId={imageId} />
      ))}
    </ul>
  );
}

function OnionImageItem({ imageId }: { imageId: string }) {
  const { data: onionImage } = useOnionImageByIdQuery(imageId);

  if (!onionImage) return null;

  return (
    <li className="o:flex o:justify-between o:items-center">
      <span>{onionImage.name}</span>
      <div>
        <OnionImageLockButton id={onionImage.id} />
        <OnionImageToggleVisibilityButton id={onionImage.id} />
      </div>
    </li>
  );
}
