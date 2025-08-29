import { RulerCenterOriginButton } from "@/features/rulers/toolbox/RulerCenterOriginButton";
import { RulerPositionButton } from "@/features/rulers/toolbox/RulerPositionButton";
import { RulerToggleButton } from "@/features/rulers/toolbox/RulerToggleButton";
import { RulerTopLeftOriginButton } from "@/features/rulers/toolbox/RulerTopLeftOriginButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function RulerToolBox() {
  // const { data: ruler } = useRulerQuery();
  // const isVisible = ruler?.visible ?? false;

  return (
    <ToolBoxTabGrid>
      <RulerToggleButton />
      <RulerPositionButton />
      <RulerTopLeftOriginButton />
      <RulerCenterOriginButton />
    </ToolBoxTabGrid>
  );
}
