import { GridColorButton } from "@/features/grid/toolbox/GridColorButton";
import { GridCyclePatternButton } from "@/features/grid/toolbox/GridCyclePatternButton";
import { GridGapSetInput } from "@/features/grid/toolbox/GridGapSetInput";
import { GridOpacitySetInput } from "@/features/grid/toolbox/GridOpacitySetInput";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function GridToolBox() {
  return (
    <ToolBoxTabGrid>
      <GridColorButton />
      <GridCyclePatternButton />
      <GridGapSetInput />
      <GridOpacitySetInput />
    </ToolBoxTabGrid>
  );
}
