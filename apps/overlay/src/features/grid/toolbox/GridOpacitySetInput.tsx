import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function GridOpacitySetInput() {
  const { data: grid } = useGridQuery();
  const { setOpacity } = useGrid();

  if (!grid) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      label="Opacity"
      min={0}
      max={1}
      step={0.1}
      defaultValue={grid.opacity}
      set={setOpacity}
    />
  );
}
