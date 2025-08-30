import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function ColumnsSetOpacityInput() {
  const { data: columns } = useColumnsQuery();
  const { setOpacity } = useColumns();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      label="Opacity"
      max={1}
      min={0}
      step={0.1}
      defaultValue={columns.opacity}
      set={setOpacity}
    />
  );
}
