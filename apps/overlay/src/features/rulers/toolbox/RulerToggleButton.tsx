import { useRuler } from "@/features/rulers/hooks/useRuler";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function RulerToggleButton() {
  const { visible, toggle } = useRuler();

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
