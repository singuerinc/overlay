import { useColumnsSetNum } from "@/features/columns/hooks/useColumnsSetNum";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputNumber } from "@/features/toolbox/components/ToolBoxInputNumber";
import { IconColumns3Filled } from "@tabler/icons-react";

export function ColumnsSetNumInput() {
  const { data: columns } = useColumnsQuery();
  const { set } = useColumnsSetNum();

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxInputNumber
      Icon={<IconColumns3Filled size={16} />}
      defaultValue={columns.numColumns}
      set={set}
    />
  );
}
