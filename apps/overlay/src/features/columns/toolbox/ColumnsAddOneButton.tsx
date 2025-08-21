import { useColumnsSetNum } from "@/features/columns/hooks/useColumnsSetNum";
import { ToolButton } from "@/ui/ToolButton";
import { IconColumnInsertRight } from "@tabler/icons-react";

export function ColumnsAddOneButton() {
  const { addOne } = useColumnsSetNum();

  const handleClick = () => {
    addOne();
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconColumnInsertRight />}
      onClick={handleClick}
    />
  );
}
