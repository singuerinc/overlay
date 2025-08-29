import { useRulerSetOrigin } from "@/features/rulers/hooks/useRulerSetOrigin";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconBorderCornerSquare } from "@tabler/icons-react";

export function RulerTopLeftOriginButton() {
  const { resetOrigin } = useRulerSetOrigin();

  const handleClick = () => {
    resetOrigin();
  };

  return (
    <ToolBoxLabeledButton
      label="0,0"
      onClick={handleClick}
      Icon={<IconBorderCornerSquare />}
    />
  );
}
