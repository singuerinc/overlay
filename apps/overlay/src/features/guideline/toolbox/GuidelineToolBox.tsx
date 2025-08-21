import { ColorGuidelineButton } from "@/features/guideline/toolbox/ColorGuidelineButton";
import { LockGuidelineButton } from "@/features/guideline/toolbox/LockGuidelineButton";
import { RemoveGuidelineButton } from "@/features/guideline/toolbox/RemoveGuidelineButton";
import { RotateGuidelineButton } from "@/features/guideline/toolbox/RotateGuidelineButton";
import type { IGuideline } from "@/features/guideline/types";
import { useSelectedTool } from "@/features/tools/store/tools";
import { IconMinusVertical } from "@tabler/icons-react";

export function GuidelineToolBox() {
  const guideline = useSelectedTool<IGuideline>();
  if (!guideline) return null;

  return (
    <>
      <IconMinusVertical />
      <LockGuidelineButton id={guideline.id} />
      <ColorGuidelineButton id={guideline.id} />
      <RotateGuidelineButton id={guideline.id} />
      <RemoveGuidelineButton id={guideline.id} />
    </>
  );
}
