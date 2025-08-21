import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { useGuidelineRotateCommand } from "@/features/guideline/store/useGuidelineRotateCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconRotate } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function GuidelineRotateButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const rotateGuidelineCommand = useGuidelineRotateCommand();

  const handleClick = () => {
    if (guideline) {
      rotateGuidelineCommand.execute(guideline);
    }
  };

  return (
    <ToolButton enabled={true} Icon={<IconRotate />} onClick={handleClick} />
  );
}
