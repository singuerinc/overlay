import { useRulerToggle } from "@/features/rulers/hooks/useRulerToggle";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function RulerToggleButton() {
  const { visible, toggle } = useRulerToggle();

  const handleClick = () => {
    toggle();
  };

  return (
    <ToolBoxInputBoolean
      label="Visible"
      defaultValue={visible ?? false}
      onChange={handleClick}
    />
  );
}
