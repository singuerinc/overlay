import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { useRotateGuidelineCommand } from "@/features/guideline/store/useRotateGuidelineCommand";
import { useSelectedTool } from "@/features/tools/store/tools";
import { ToolButton } from "@/ui/ToolButton";
import { IconRotate } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function RotateGuidelineButton() {
  const selectedTool = useSelectedTool<IGuideline>();
  const rotateGuidelineCommand = useRotateGuidelineCommand();
  const { data } = useGetGuidelinesQuery();
  const guideline = data?.find((g) => g.id === selectedTool.id);

  const handleClick = () => {
    rotateGuidelineCommand.execute(guideline);
  };

  return (
    <ToolButton enabled={true} Icon={<IconRotate />} onClick={handleClick} />
  );
}
