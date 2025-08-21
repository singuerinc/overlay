import { useColumnsSetGap } from "@/features/columns/hooks/useColumnsSetGap";
import { ToolButton } from "@/ui/ToolButton";
import { IconArrowBarBoth } from "@tabler/icons-react";

export function ColumnsGapIncreaseButton() {
  const { increase } = useColumnsSetGap();

  const handleClick = () => {
    increase(4);
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconArrowBarBoth />}
      onClick={handleClick}
    />
  );
}
