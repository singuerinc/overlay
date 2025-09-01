import { GuidelinesAddButton } from "@/features/guideline/toolbox/GuidelinesAddButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function GuidelinesToolBox() {
  return (
    <ToolBoxTabGrid>
      <GuidelinesAddButton />
    </ToolBoxTabGrid>
  );
}
