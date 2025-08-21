import { useColumnsToggle } from "@/features/columns/hooks/useColumnsToggle";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconColumns3 } from "@tabler/icons-react";

export function ColumnsToggleButton() {
  const { data: columns } = useColumnsQuery();
  const { toggle } = useColumnsToggle();

  const handleClick = () => {
    toggle();
  };

  return (
    <ToolButton
      activated={columns?.visible}
      enabled={true}
      Icon={<IconColumns3 />}
      onClick={handleClick}
    />
  );
}
