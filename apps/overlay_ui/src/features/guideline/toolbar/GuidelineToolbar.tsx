import { ColorGuidelineButton } from "@/features/guideline/toolbar/ColorGuidelineButton";
import { LockGuidelineButton } from "@/features/guideline/toolbar/LockGuidelineButton";
import { RemoveGuidelineButton } from "@/features/guideline/toolbar/RemoveGuidelineButton";
import { RotateGuidelineButton } from "@/features/guideline/toolbar/RotateGuidelineButton";

export function GuidelineToolbar() {
  return (
    <>
      <LockGuidelineButton />
      <ColorGuidelineButton />
      <RotateGuidelineButton />
      <RemoveGuidelineButton />
    </>
  );
}
