import { useGetGridQuery } from "@/features/grid/store/useGetGridQuery";
import { useToggleGridCommand } from "@/features/grid/store/useToggleGridCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconGrid4x4, IconGridDots } from "@tabler/icons-react";

export function ToggleGridButton() {
  const { data: grid } = useGetGridQuery();
  const toggleGridCommand = useToggleGridCommand();

  const handleClick = () => {
    if (grid) {
      toggleGridCommand.execute(!grid.visible);
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
