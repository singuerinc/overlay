import { useGridCyclePattern } from "@/features/grid/hooks/useGridCyclePattern";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconGrid4x4, IconGridDots } from "@tabler/icons-react";

export function GridCyclePatternButton() {
  const { data: grid } = useGridQuery();
  const { cycle } = useGridCyclePattern();

  const handleClick = () => {
    cycle();
  };

  return (
    <ToolBoxLabeledButton
      label="Pattern"
      Icon={grid?.pattern === "dots" ? <IconGridDots /> : <IconGrid4x4 />}
      onClick={handleClick}
    />
  );
}
