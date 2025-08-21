import { useColumnsSetNum } from "@/features/columns/hooks/useColumnsSetNum";
import { ToolButton } from "@/ui/ToolButton";
import { IconColumnRemove } from "@tabler/icons-react";

export function ColumnsRemoveOneButton() {
  const { removeOne } = useColumnsSetNum();

  const handleClick = () => {
    removeOne();
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconColumnRemove />}
      onClick={handleClick}
    />
  );
}
