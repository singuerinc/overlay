import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function ColumnsSizeSetInput() {
  const { data: columns } = useColumnsQuery();
  const { setSize } = useColumns();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      label="Size (px)"
      defaultValue={Number.parseInt(columns.size, 10)}
      set={(num: number) => setSize(`${num}px`)}
    />
  );
}
