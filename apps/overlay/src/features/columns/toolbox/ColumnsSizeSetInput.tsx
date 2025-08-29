import { useColumnsSetSize } from "@/features/columns/hooks/useColumnsSetSize";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";
import { IconRulerMeasure } from "@tabler/icons-react";

export function ColumnsSizeSetInput() {
  const { data: columns } = useColumnsQuery();
  const { set } = useColumnsSetSize();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      Icon={<IconRulerMeasure size={16} />}
      defaultValue={Number.parseInt(columns.size, 10)}
      set={(num: number) => set(`${num}px`)}
    />
  );
}
