import { useRulerSetOrigin } from "@/features/rulers/hooks/useRulerSetOrigin";
import { ToolButton } from "@/ui/ToolButton";
import { IconFocusCentered } from "@tabler/icons-react";

export function RulerCenterOriginButton() {
  const { centerOrigin } = useRulerSetOrigin();

  const handleClick = () => {
    centerOrigin();
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconFocusCentered />}
      onClick={handleClick}
    />
  );
}
