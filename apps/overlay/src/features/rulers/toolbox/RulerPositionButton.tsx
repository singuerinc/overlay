import { useRulerSetPosition } from "@/features/rulers/hooks/useRulerSetPosition";
import { RulerPosition } from "@/features/rulers/RulerPosition";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";

export function RulerPositionButton() {
  const { data: ruler } = useRulerQuery();
  const { setPositionRuler } = useRulerSetPosition();

  const handleClick = () => {
    const newPosition =
      RulerPosition[
        (RulerPosition.indexOf(ruler?.position ?? RulerPosition[0]) + 1) %
          RulerPosition.length
      ];
    setPositionRuler(newPosition);
  };

  return (
    <ToolBoxLabeledButton
      label="Position"
      Icon={<div>{ruler?.position}</div>}
      onClick={handleClick}
    />
  );
}
