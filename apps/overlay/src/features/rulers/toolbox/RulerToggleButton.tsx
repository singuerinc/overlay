import { useRulerToggle } from "@/features/rulers/hooks/useRulerToggle";
import { ToolButton } from "@/ui/ToolButton";
import { IconRuler } from "@tabler/icons-react";

export function RulerToggleButton() {
  const { visible, toggle } = useRulerToggle();

  const handleClick = () => {
    toggle();
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
