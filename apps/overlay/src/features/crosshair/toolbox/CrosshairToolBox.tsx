import { CrosshairColorButton } from "@/features/crosshair/toolbox/CrosshairColorButton";
import { CrosshairToggleButton } from "@/features/crosshair/toolbox/CrosshairToggleButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function CrosshairToolBox() {
  return (
    <ToolBoxTabGrid>
      <CrosshairToggleButton />
      <CrosshairColorButton />
    </ToolBoxTabGrid>
  );
}
