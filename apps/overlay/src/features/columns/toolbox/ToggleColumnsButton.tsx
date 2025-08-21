import { useToggleColumns } from "@/features/columns/hooks/useToggleColumns";
import { useGetColumnsQuery } from "@/features/columns/store/useGetColumnsQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconColumns3 } from "@tabler/icons-react";

export function ToggleColumnsButton() {
  const { data: columns } = useGetColumnsQuery();
  const { toggle } = useToggleColumns();

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
