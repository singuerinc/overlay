import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function GridGapSetInput() {
  const { data: grid } = useGridQuery();
  const { setGap } = useGrid();

  if (!grid) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      label="Gap"
      min={4}
      step={2}
      defaultValue={grid.gapX}
      set={setGap}
    />
  );
}
