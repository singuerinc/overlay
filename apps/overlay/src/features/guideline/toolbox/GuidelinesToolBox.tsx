import { GuidelinesAddButton } from "@/features/guideline/toolbox/GuidelinesAddButton";
import { GuidelinesSnapToGridButton } from "@/features/guideline/toolbox/GuidelinesSnapToGridButton";
import { GuidelinesToggleButton } from "@/features/guideline/toolbox/GuidelinesToggleButton";
import { GuidelineToolBox } from "@/features/guideline/toolbox/GuidelineToolBox";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function GuidelinesToolBox() {
  return (
    <ToolBoxTabGrid>
      <GuidelinesToggleButton />
      <GuidelinesSnapToGridButton />
      <div />
      <div />
      <GuidelinesAddButton />
      <div />
      <div />
      <div />
      <GuidelineToolBox />
    </ToolBoxTabGrid>
  );
}
