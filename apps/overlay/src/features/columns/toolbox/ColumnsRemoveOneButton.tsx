import { useColumns } from "@/features/columns/hooks/useColumns";
import { ToolButton } from "@/ui/ToolButton";
import { IconColumnRemove } from "@tabler/icons-react";

export function ColumnsRemoveOneButton() {
  const { removeOneCol } = useColumns();

  const handleClick = () => {
    removeOneCol();
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconColumnRemove />}
      onClick={handleClick}
    />
  );
}
