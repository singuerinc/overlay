import { useColumns } from "@/features/columns/hooks/useColumns";
import { ToolButton } from "@/ui/ToolButton";
import { IconArrowBarBoth } from "@tabler/icons-react";

export function ColumnsGapDecreaseButton() {
  const { decreaseGap } = useColumns();

  const handleClick = () => {
    decreaseGap(4);
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconArrowBarBoth />}
      onClick={handleClick}
    />
  );
}
