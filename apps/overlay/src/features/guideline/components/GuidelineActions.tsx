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
    <div className="o:flex">
      <GuidelineColorButton id={guideline.id} />
      <GuidelineLockButton id={guideline.id} />
      <GuidelineRotateButton id={guideline.id} />
      <GuidelineRemoveButton id={guideline.id} />
    </div>
  );
}
