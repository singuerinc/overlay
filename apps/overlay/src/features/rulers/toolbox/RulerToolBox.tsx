import { RulerCenterOriginButton } from "@/features/rulers/toolbox/RulerCenterOriginButton";
import { RulerPositionButton } from "@/features/rulers/toolbox/RulerPositionButton";
import { RulerTopLeftOriginButton } from "@/features/rulers/toolbox/RulerTopLeftOriginButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function RulerToolBox() {
  return (
    <ToolBoxTabGrid>
      <RulerPositionButton />
      <RulerTopLeftOriginButton />
      <RulerCenterOriginButton />
    </ToolBoxTabGrid>
  );
}
