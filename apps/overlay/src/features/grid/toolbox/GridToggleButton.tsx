import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { useGridToggleCommand } from "@/features/grid/store/useGridToggleCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconGrid4x4, IconGridDots } from "@tabler/icons-react";

export function GridToggleButton() {
  const { data: grid } = useGridQuery();
  const toggleCommand = useGridToggleCommand();

  const handleClick = () => {
    if (grid) {
      toggleCommand.execute(!grid.visible);
    }
  };

  return (
    <ToolButton
      activated={grid?.visible}
      enabled={true}
      Icon={grid?.pattern === "dots" ? <IconGridDots /> : <IconGrid4x4 />}
      onClick={handleClick}
    />
  );
}
