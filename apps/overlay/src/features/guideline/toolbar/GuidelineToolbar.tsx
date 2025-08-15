import { ColorGuidelineButton } from "@/features/guideline/toolbar/ColorGuidelineButton";
import { LockGuidelineButton } from "@/features/guideline/toolbar/LockGuidelineButton";
import { RemoveGuidelineButton } from "@/features/guideline/toolbar/RemoveGuidelineButton";

export function GuidelineToolbar() {
  return (
    <>
      <LockGuidelineButton />
      <ColorGuidelineButton />
      <RemoveGuidelineButton />
    </>
  );
}
