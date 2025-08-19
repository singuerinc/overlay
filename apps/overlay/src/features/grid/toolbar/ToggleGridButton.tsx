import { useActiveFrameId } from "@/appStore";
import { useGetGridQuery } from "@/features/grid/store/useGetGridQuery";
import { useToggleGridCommand } from "@/features/grid/store/useToggleGridCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconGrid4x4 } from "@tabler/icons-react";

export function ToggleGridButton() {
  const frameId = useActiveFrameId();
  const toggleGridCommand = useToggleGridCommand({ frameId });
  const { data: grid } = useGetGridQuery();

  const handleClick = () => {
    if (grid) {
      toggleGridCommand.execute(!grid.visible);
    }
  };

  return (
    <ToolButton
      activated={grid?.visible}
      enabled={true}
      Icon={<IconGrid4x4 />}
      onClick={handleClick}
    />
  );
}
