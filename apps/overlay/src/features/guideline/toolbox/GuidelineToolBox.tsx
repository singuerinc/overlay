import { GuidelineColorButton } from "@/features/guideline/toolbox/GuidelineColorButton";
import { GuidelineLockButton } from "@/features/guideline/toolbox/GuidelineLockButton";
import { GuidelineRemoveButton } from "@/features/guideline/toolbox/GuidelineRemoveButton";
import { GuidelineRotateButton } from "@/features/guideline/toolbox/GuidelineRotateButton";
import type { IGuideline } from "@/features/guideline/types";
import { useSelectedTool } from "@/features/tools/store/tools";
import { IconMinusVertical } from "@tabler/icons-react";

export function GuidelineToolBox() {
  const guideline = useSelectedTool<IGuideline>();
  if (!guideline) return null;

  return (
    <>
      <IconMinusVertical />
      <GuidelineLockButton id={guideline.id} />
      <GuidelineColorButton id={guideline.id} />
      <GuidelineRotateButton id={guideline.id} />
      <GuidelineRemoveButton id={guideline.id} />
    </>
  );
}
