import { useRulerSetOrigin } from "@/features/rulers/hooks/useRulerSetOrigin";
import { ToolButton } from "@/ui/ToolButton";
import { IconBorderCornerSquare } from "@tabler/icons-react";

export function RulerTopLeftOriginButton() {
  const { resetOrigin } = useRulerSetOrigin();

  const handleClick = () => {
    resetOrigin();
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconBorderCornerSquare />}
      onClick={handleClick}
    />
  );
}
