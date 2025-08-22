import { useColumnsSetGap } from "@/features/columns/hooks/useColumnsSetGap";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";
import { IconSpacingHorizontal } from "@tabler/icons-react";

export function ColumnsGapSetInput() {
  const { data: columns } = useColumnsQuery();
  const { set } = useColumnsSetGap();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      Icon={<IconSpacingHorizontal size={16} />}
      defaultValue={columns.gap}
      set={set}
    />
  );
}
