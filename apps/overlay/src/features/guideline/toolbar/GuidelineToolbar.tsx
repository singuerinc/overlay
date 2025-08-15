import { ColorGuidelineButton } from "@/features/guideline/toolbar/ColorGuidelineButton";
import { LockGuidelineButton } from "@/features/guideline/toolbar/LockGuidelineButton";
import { RemoveGuidelineButton } from "@/features/guideline/toolbar/RemoveGuidelineButton";

export function GuidelineToolbar() {
  return (
    <div className="flex items-center gap-x-1 bg-neutral-700 px-1 rounded-sm">
      <LockGuidelineButton />
      <ColorGuidelineButton />
      <RemoveGuidelineButton />
    </div>
  );
}
