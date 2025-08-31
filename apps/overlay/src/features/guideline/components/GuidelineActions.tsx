import { GuidelineColorButton } from "@/features/guideline/components/GuidelineColorButton";
import { GuidelineLockButton } from "@/features/guideline/components/GuidelineLockButton";
import { GuidelineRemoveButton } from "@/features/guideline/components/GuidelineRemoveButton";
import { GuidelineRotateButton } from "@/features/guideline/components/GuidelineRotateButton";
import {
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "@/features/guideline/types";
import { cn } from "@/ui/cn";

export function GuidelineActions({ guideline }: { guideline: IGuideline }) {
  const isVertical = guideline.type === GUIDELINE_VERTICAL;
  return (
    <div
      className={cn("o:bg-neutral-50 o:hidden o:group-hover:group-focus:flex", {
        "o:place-self-end o:group-focus:flex-row": !isVertical,
        "o:bottom-0 o:absolute o:group-focus:flex-col": isVertical,
      })}
    >
      <GuidelineColorButton id={guideline.id} />
      <GuidelineLockButton id={guideline.id} />
      <GuidelineRotateButton id={guideline.id} />
      <GuidelineRemoveButton id={guideline.id} />
    </div>
  );
}
