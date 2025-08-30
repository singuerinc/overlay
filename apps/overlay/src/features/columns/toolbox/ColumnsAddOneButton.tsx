import { useColumns } from "@/features/columns/hooks/useColumns";
import { ToolButton } from "@/ui/ToolButton";
import { IconColumnInsertRight } from "@tabler/icons-react";

export function ColumnsAddOneButton() {
  const { addOneCol } = useColumns();

  const handleClick = () => {
    addOneCol();
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconColumnInsertRight />}
      onClick={handleClick}
    />
  );
}
