import { useRulerSetOrigin } from "@/features/rulers/hooks/useRulerSetOrigin";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconBorderInner } from "@tabler/icons-react";

export function RulerCenterOriginButton() {
  const { centerOrigin } = useRulerSetOrigin();

  const handleClick = () => {
    centerOrigin();
  };

  return (
    <ToolBoxLabeledButton
      label="50%,50%"
      onClick={handleClick}
      Icon={<IconBorderInner />}
    />
  );
}
