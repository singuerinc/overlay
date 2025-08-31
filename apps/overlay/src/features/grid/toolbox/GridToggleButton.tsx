import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function GridToggleButton() {
  const { data: grid } = useGridQuery();
  const { toggle } = useGrid();

  return (
    <ToolBoxInputBoolean
      label="Visible"
      defaultValue={grid?.visible ?? false}
      onChange={() => toggle()}
    />
  );
}
