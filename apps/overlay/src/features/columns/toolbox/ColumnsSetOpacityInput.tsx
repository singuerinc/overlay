import { useColumnsSetOpacity } from "@/features/columns/hooks/useColumnsSetOpacity";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";

export function ColumnsSetOpacityInput() {
  const { data: columns } = useColumnsQuery();
  const { set } = useColumnsSetOpacity();

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
      set={set}
    />
  );
}
