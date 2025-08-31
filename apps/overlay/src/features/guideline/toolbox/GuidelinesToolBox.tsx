import { GuidelinesAddButton } from "@/features/guideline/toolbox/GuidelinesAddButton";
import { GuidelinesToggleButton } from "@/features/guideline/toolbox/GuidelinesToggleButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function GuidelinesToolBox() {
  return (
    <ToolBoxTabGrid>
      <GuidelinesToggleButton />
      <GuidelinesAddButton />
    </ToolBoxTabGrid>
  );
}
