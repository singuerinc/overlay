import { useColumnsSetGap } from "@/features/columns/hooks/useColumnsSetGap";
import { ToolButton } from "@/ui/ToolButton";
import { IconArrowBarBoth } from "@tabler/icons-react";

export function ColumnsGapDecreaseButton() {
  const { decrease } = useColumnsSetGap();

  const handleClick = () => {
    decrease(4);
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconArrowBarBoth />}
      onClick={handleClick}
    />
  );
}
