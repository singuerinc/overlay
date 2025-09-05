import { OnionImageFilterButton } from "@/features/onion-image/components/OnionImageFilterButton";
import { OnionImageOpacityButton } from "@/features/onion-image/components/OnionImageOpacityButton";
import { OnionImageRemoveButton } from "@/features/onion-image/components/OnionImageRemoveButton";
import { OnionImageScaleButton } from "@/features/onion-image/components/OnionImageScaleButton";
import { isOnionImage } from "@/features/onion-image/utils/isOnionImage";
import { useSelectedTool } from "@/features/tools/store/tools";

export function OnionImageActions() {
  const selectedTool = useSelectedTool();

  if (!selectedTool || !isOnionImage(selectedTool)) {
    return null;
  }

  const onionImage = selectedTool;

  return (
    <div className="o:flex o:gap-1 o:items-center">
      <span className="o:text-xs o:text-neutral-200 o:px-1">Image</span>
      <OnionImageOpacityButton id={onionImage.id} />
      <OnionImageFilterButton id={onionImage.id} />
      <OnionImageScaleButton id={onionImage.id} />
      <OnionImageRemoveButton id={onionImage.id} />
    </div>
  );
}
