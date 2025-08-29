import { GuidelineColorButton } from "@/features/guideline/toolbox/GuidelineColorButton";
import { GuidelineLockButton } from "@/features/guideline/toolbox/GuidelineLockButton";
import { GuidelineRemoveButton } from "@/features/guideline/toolbox/GuidelineRemoveButton";
import { GuidelineRotateButton } from "@/features/guideline/toolbox/GuidelineRotateButton";
import type { IOnionImage } from "@/features/onion-image/types";
import { useSelectedTool } from "@/features/tools/store/tools";

export function OnionImageToolBox() {
  const onionImage = useSelectedTool<IOnionImage>();
  if (!onionImage) return null;

  return (
    <>
      <GuidelineLockButton id={onionImage.id} />
      <GuidelineColorButton id={onionImage.id} />
      <GuidelineRotateButton id={onionImage.id} />
      <GuidelineRemoveButton id={onionImage.id} />
    </>
  );
}
