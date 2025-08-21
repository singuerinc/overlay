import { useGridCyclePattern } from "@/features/grid/hooks/useGridCyclePattern";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconGrid4x4, IconGridDots } from "@tabler/icons-react";

export function GridCyclePatternButton() {
  const { data: grid } = useGridQuery();
  const { cycle } = useGridCyclePattern();

  const handleClick = () => {
    cycle();
  };

  return (
    <ToolButton
      enabled={true}
      Icon={grid?.pattern === "dots" ? <IconGridDots /> : <IconGrid4x4 />}
      onClick={handleClick}
    />
  );
}
