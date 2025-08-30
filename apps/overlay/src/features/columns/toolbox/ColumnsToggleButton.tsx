import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function ColumnsToggleButton() {
  const { data: columns } = useColumnsQuery();
  const { toggleVisibility } = useColumns();

  const handleClick = () => {
    toggleVisibility();
  };

  return (
    <ToolBoxInputBoolean
      label="Visible"
      defaultValue={columns?.visible ?? false}
      onChange={handleClick}
    />
  );
}
