import { GuidelinesAddButton } from "@/features/guideline/toolbox/GuidelinesAddButton";
import { GuidelinesToggleButton } from "@/features/guideline/toolbox/GuidelinesToggleButton";
import { GuidelineToolBox } from "@/features/guideline/toolbox/GuidelineToolBox";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function GuidelinesToolBox() {
  return (
    <ToolBoxTabGrid>
      <GuidelinesToggleButton />
      <GuidelinesAddButton />
      <GuidelineToolBox />
    </ToolBoxTabGrid>
  );
}
