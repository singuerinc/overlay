import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconGrid4x4, IconGridDots } from "@tabler/icons-react";

export function GridCyclePatternButton() {
  const { data: grid } = useGridQuery();
  const { cyclePattern } = useGrid();

  const handleClick = () => {
    cyclePattern();
  };

  return (
    <ToolBoxLabeledButton
      label="Pattern"
      Icon={grid?.pattern === "dots" ? <IconGridDots /> : <IconGrid4x4 />}
      onClick={handleClick}
    />
  );
}
