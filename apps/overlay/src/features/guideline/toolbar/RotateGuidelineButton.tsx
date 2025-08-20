import { useRotateGuidelineCommand } from "@/features/guideline/store/useRotateGuidelineCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconRotate } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function RotateGuidelineButton({
  guideline,
}: {
  guideline: IGuideline;
}) {
  const rotateGuidelineCommand = useRotateGuidelineCommand();

  const handleClick = () => {
    if (guideline) {
      rotateGuidelineCommand.execute(guideline);
    }
  };

  return (
    <ToolButton enabled={true} Icon={<IconRotate />} onClick={handleClick} />
  );
}
