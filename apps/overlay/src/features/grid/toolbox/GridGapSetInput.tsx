import { useGridSetGap } from "@/features/grid/hooks/useGridSetGap";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";
import { IconSpacingHorizontal } from "@tabler/icons-react";

export function GridGapSetInput() {
  const { data: grid } = useGridQuery();
  const { set } = useGridSetGap();

  if (!grid) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      min={4}
      step={2}
      Icon={<IconSpacingHorizontal size={16} />}
      defaultValue={grid.gapX}
      set={set}
    />
  );
}
