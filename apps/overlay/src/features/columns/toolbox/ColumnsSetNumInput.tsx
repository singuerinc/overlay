import { useColumnsSetNum } from "@/features/columns/hooks/useColumnsSetNum";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function ColumnsSetNumInput() {
  const { data: columns } = useColumnsQuery();
  const { set } = useColumnsSetNum();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      label="Columns"
      defaultValue={columns.numColumns}
      set={set}
    />
  );
}
