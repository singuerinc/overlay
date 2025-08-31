import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function ColumnsGapSetInput() {
  const { data: columns } = useColumnsQuery();
  const { setGap } = useColumns();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber label="Gap" defaultValue={columns.gap} set={setGap} />
  );
}
