import { useColumnsSetGap } from "@/features/columns/hooks/useColumnsSetGap";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function ColumnsGapSetInput() {
  const { data: columns } = useColumnsQuery();
  const { set } = useColumnsSetGap();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber label="Gap (px)" defaultValue={columns.gap} set={set} />
  );
}
