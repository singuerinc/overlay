import { useSetOriginRuler } from "@/features/rulers/hooks/useSetOriginRuler";
import { ToolButton } from "@/ui/ToolButton";
import { IconFocusCentered } from "@tabler/icons-react";

export function CenterOriginRulerButton() {
  const { centerOrigin } = useSetOriginRuler();

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
