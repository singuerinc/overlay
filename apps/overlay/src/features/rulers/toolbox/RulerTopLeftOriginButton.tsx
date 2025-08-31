import { useRuler } from "@/features/rulers/hooks/useRuler";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconBorderCornerSquare } from "@tabler/icons-react";

export function RulerTopLeftOriginButton() {
  const { resetOrigin } = useRuler();

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
