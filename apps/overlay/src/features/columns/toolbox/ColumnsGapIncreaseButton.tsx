import { useColumns } from "@/features/columns/hooks/useColumns";
import { ToolButton } from "@/ui/ToolButton";
import { IconArrowBarBoth } from "@tabler/icons-react";

export function ColumnsGapIncreaseButton() {
  const { increaseGap } = useColumns();

  const handleClick = () => {
    increaseGap(4);
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconArrowBarBoth />}
      onClick={handleClick}
    />
  );
}
