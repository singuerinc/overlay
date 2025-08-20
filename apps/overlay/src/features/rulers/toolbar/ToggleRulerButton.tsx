import { useToggleRuler } from "@/features/rulers/hooks/useToggleRuler";
import { ToolButton } from "@/ui/ToolButton";
import { IconRuler } from "@tabler/icons-react";

export function ToggleRulerButton() {
  const { visible, toggleRuler } = useToggleRuler();

  const handleClick = () => {
    toggleRuler();
  };

  return (
    <ToolButton
      activated={visible ?? false}
      enabled={true}
      Icon={<IconRuler />}
      onClick={handleClick}
    />
  );
}
