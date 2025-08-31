import { GridColorButton } from "@/features/grid/toolbox/GridColorButton";
import { GridCyclePatternButton } from "@/features/grid/toolbox/GridCyclePatternButton";
import { GridGapSetInput } from "@/features/grid/toolbox/GridGapSetInput";
import { GridOpacitySetInput } from "@/features/grid/toolbox/GridOpacitySetInput";
import { GridToggleButton } from "@/features/grid/toolbox/GridToggleButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function GridToolBox() {
  return (
    <ToolBoxTabGrid>
      <GridToggleButton />
      <GridColorButton />
      <GridCyclePatternButton />
      <GridGapSetInput />
      <GridOpacitySetInput />
    </ToolBoxTabGrid>
  );
}
