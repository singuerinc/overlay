import { ColorGuidelineButton } from "@/features/guideline/toolbar/ColorGuidelineButton";
import { LockGuidelineButton } from "@/features/guideline/toolbar/LockGuidelineButton";
import { RemoveGuidelineButton } from "@/features/guideline/toolbar/RemoveGuidelineButton";
import { RotateGuidelineButton } from "@/features/guideline/toolbar/RotateGuidelineButton";
import { IconMinusVertical } from "@tabler/icons-react";

export function GuidelineToolbar() {
  return (
    <>
      <IconMinusVertical />
      <LockGuidelineButton />
      <ColorGuidelineButton />
      <RotateGuidelineButton />
      <RemoveGuidelineButton />
    </>
  );
}
