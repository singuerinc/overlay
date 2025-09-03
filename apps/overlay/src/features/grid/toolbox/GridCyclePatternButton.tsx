import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import type { IGridPattern } from "@/features/grid/types";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconGrid3x3, IconGrid4x4, IconGridDots } from "@tabler/icons-react";

export function GridCyclePatternButton() {
  const { data: grid } = useGridQuery();
  const { cyclePattern } = useGrid();

  const handleClick = () => {
    cyclePattern();
  };

  const iconsByPattern = {
    dots: <IconGridDots />,
    lines: <IconGrid3x3 />,
    both: <IconGrid4x4 />,
  } satisfies Record<IGridPattern, React.ReactNode>;

  if (!grid) {
    return null;
  }

  return (
    <ToolBoxLabeledButton
      className="o:flex-col-reverse"
      label="Pattern"
      Icon={iconsByPattern[grid.pattern]}
      onClick={handleClick}
    />
  );
}
