import { OnionImageFilterButton } from "@/features/onion-image/components/OnionImageFilterButton";
import { OnionImageOpacityButton } from "@/features/onion-image/components/OnionImageOpacityButton";
import { OnionImageRemoveButton } from "@/features/onion-image/components/OnionImageRemoveButton";
import { OnionImageScaleButton } from "@/features/onion-image/components/OnionImageScaleButton";
import type { IOnionImage } from "@/features/onion-image/types";

export function OnionImageActions({ onionImage }: { onionImage: IOnionImage }) {
  return (
    <div className="o:bg-neutral-50 o:absolute o:left-1/2 o:top-1/2 o:-translate-1/2">
      <OnionImageOpacityButton onionImage={onionImage} />
      <OnionImageFilterButton onionImage={onionImage} />
      <OnionImageScaleButton onionImage={onionImage} />
      <OnionImageRemoveButton id={onionImage.id} />
    </div>
  );
}
