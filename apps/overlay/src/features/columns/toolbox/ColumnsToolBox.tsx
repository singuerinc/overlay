import { ColumnsGapSetInput } from "@/features/columns/toolbox/ColumnsGapSetInput";
import { ColumnsSetNumInput } from "@/features/columns/toolbox/ColumnsSetNumInput";
import { ColumnsSetOpacityInput } from "@/features/columns/toolbox/ColumnsSetOpacityInput";
import { ColumnsSizeSetInput } from "@/features/columns/toolbox/ColumnsSizeSetInput";
import { ColumnsToggleButton } from "@/features/columns/toolbox/ColumnsToggleButton";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";

export function ColumnsToolBox() {
  return (
    <ToolBoxTabGrid>
      <ColumnsToggleButton />
      <ColumnsSetOpacityInput />
      <div />
      <div />
      <ColumnsSetNumInput />
      <ColumnsGapSetInput />
      <ColumnsSizeSetInput />
    </ToolBoxTabGrid>
  );
}
