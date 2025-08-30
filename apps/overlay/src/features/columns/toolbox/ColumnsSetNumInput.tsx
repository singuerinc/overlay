import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function ColumnsSetNumInput() {
  const { data: columns } = useColumnsQuery();
  const { setNumCols } = useColumns();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      label="Columns"
      defaultValue={columns.numColumns}
      set={setNumCols}
    />
  );
}
