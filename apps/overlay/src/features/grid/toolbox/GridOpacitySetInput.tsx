import { useGridSetOpacity } from "@/features/grid/hooks/useGridSetOpacity";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function GridOpacitySetInput() {
  const { data: grid } = useGridQuery();
  const { set } = useGridSetOpacity();

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
      set={set}
    />
  );
}
