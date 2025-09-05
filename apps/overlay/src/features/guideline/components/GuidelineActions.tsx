import { GuidelineColorButton } from "@/features/guideline/components/GuidelineColorButton";
import { GuidelineLockButton } from "@/features/guideline/components/GuidelineLockButton";
import { GuidelineRemoveButton } from "@/features/guideline/components/GuidelineRemoveButton";
import { GuidelineRotateButton } from "@/features/guideline/components/GuidelineRotateButton";
import { isGuideline } from "@/features/guideline/utils/isGuideline";
import { useSelectedTool } from "@/features/tools/store/tools";

export function GuidelineActions() {
  const selectedTool = useSelectedTool();

  if (!selectedTool || !isGuideline(selectedTool)) {
    return null;
  }

  const guideline = selectedTool;

  return (
    <div className="o:flex o:gap-1 o:items-center">
      <span className="o:text-xs o:text-neutral-200 o:px-1">Guideline</span>
      <GuidelineColorButton id={guideline.id} />
      <GuidelineLockButton id={guideline.id} />
      <GuidelineRotateButton id={guideline.id} />
      <GuidelineRemoveButton id={guideline.id} />
    </div>
  );
}
