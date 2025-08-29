import { useColumnsToggle } from "@/features/columns/hooks/useColumnsToggle";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function ColumnsToggleButton() {
  const { data: columns } = useColumnsQuery();
  const { toggle } = useColumnsToggle();

  const handleClick = () => {
    toggle();
  };

  return (
    <ToolBoxInputBoolean
      label="Visible"
      defaultValue={columns?.visible ?? false}
      onChange={handleClick}
    />
  );
}
