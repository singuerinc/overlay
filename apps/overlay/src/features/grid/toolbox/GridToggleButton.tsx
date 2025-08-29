import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { useGridToggleCommand } from "@/features/grid/store/useGridToggleCommand";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function GridToggleButton() {
  const { data: grid } = useGridQuery();
  const toggleCommand = useGridToggleCommand();

  const handleClick = () => {
    if (grid) {
      toggleCommand.execute(!grid.visible);
    }
  };

  return (
    <ToolBoxInputBoolean
      label="Visible"
      defaultValue={grid?.visible ?? false}
      onChange={handleClick}
    />
  );
}
