import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ColumnsGapSetInput } from "@/features/columns/toolbox/ColumnsGapSetInput";
import { ColumnsSetNumInput } from "@/features/columns/toolbox/ColumnsSetNumInput";
import { ColumnsSizeSetInput } from "@/features/columns/toolbox/ColumnsSizeSetInput";
import { ColumnsToggleButton } from "@/features/columns/toolbox/ColumnsToggleButton";

export function ColumnsToolBox() {
  const { data: columns } = useColumnsQuery();

  const isVisible = columns?.visible ?? false;

  return (
    <>
      <ColumnsToggleButton />
      {isVisible && <ColumnsSetNumInput />}
      {isVisible && <ColumnsGapSetInput />}
      {isVisible && <ColumnsSizeSetInput />}
    </>
  );
}
