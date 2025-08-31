import { OnionImageFilterButton } from "@/features/onion-image/components/OnionImageFilterButton";
import { OnionImageLockButton } from "@/features/onion-image/components/OnionImageLockButton";
import { OnionImageOpacityButton } from "@/features/onion-image/components/OnionImageOpacityButton";
import { OnionImageRemoveButton } from "@/features/onion-image/components/OnionImageRemoveButton";
import type { IOnionImage } from "@/features/onion-image/types";

export function OnionImageActions({ onionImage }: { onionImage: IOnionImage }) {
  return (
    <div className="o:bg-neutral-50 o:place-self-start">
      <OnionImageLockButton id={onionImage.id} />
      <OnionImageOpacityButton onionImage={onionImage} />
      <OnionImageFilterButton onionImage={onionImage} />
      <OnionImageRemoveButton id={onionImage.id} />
    </div>
  );
}
