import { CrosshairColorButton } from "@/features/crosshair/toolbox/CrosshairColorButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function CrosshairToolBox() {
  return (
    <ToolBoxTabGrid>
      <CrosshairColorButton />
    </ToolBoxTabGrid>
  );
}
