import { GuidelineColorButton } from "@/features/guideline/toolbox/GuidelineColorButton";
import { GuidelineLockButton } from "@/features/guideline/toolbox/GuidelineLockButton";
import { GuidelineRemoveButton } from "@/features/guideline/toolbox/GuidelineRemoveButton";
import { GuidelineRotateButton } from "@/features/guideline/toolbox/GuidelineRotateButton";
import type { IGuideline } from "@/features/guideline/types";
import { useSelectedTool } from "@/features/tools/store/tools";

export function GuidelineToolBox() {
  const guideline = useSelectedTool<IGuideline>();
  if (!guideline) return null;

  return (
    <>
      <GuidelineLockButton id={guideline.id} />
      <GuidelineColorButton id={guideline.id} />
      <GuidelineRotateButton id={guideline.id} />
      <GuidelineRemoveButton id={guideline.id} />
    </>
  );
}
