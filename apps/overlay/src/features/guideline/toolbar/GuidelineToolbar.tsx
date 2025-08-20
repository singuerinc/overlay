import { ColorGuidelineButton } from "@/features/guideline/toolbar/ColorGuidelineButton";
import { LockGuidelineButton } from "@/features/guideline/toolbar/LockGuidelineButton";
import { RemoveGuidelineButton } from "@/features/guideline/toolbar/RemoveGuidelineButton";
import { RotateGuidelineButton } from "@/features/guideline/toolbar/RotateGuidelineButton";
import type { IGuideline } from "@/features/guideline/types";
import { useSelectedTool } from "@/features/tools/store/tools";
import { IconMinusVertical } from "@tabler/icons-react";

export function GuidelineToolbar() {
  const guideline = useSelectedTool<IGuideline>();
  if (!guideline) return null;

  return (
    <>
      <IconMinusVertical />
      <LockGuidelineButton guideline={guideline} />
      <ColorGuidelineButton guideline={guideline} />
      <RotateGuidelineButton guideline={guideline} />
      <RemoveGuidelineButton guideline={guideline} />
    </>
  );
}
