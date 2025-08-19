import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useColorGuidelineCommand } from "@/features/guideline/store/useColorGuidelineCommand";
import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { useSelectedTool } from "@/features/tools/store/tools";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { type IGuideline } from "../types";

const colors: GuidelineColorType[] = ["cyan", "red", "green"];

const fillByColor = {
  cyan: "text-cyan-400",
  red: "text-red-400",
  green: "text-green-400",
  gray: "text-neutral-400",
};

export function ColorGuidelineButton() {
  const selectedTool = useSelectedTool<IGuideline>();
  const colorGuidelineCommand = useColorGuidelineCommand();
  const { data } = useGetGuidelinesQuery();
  const guideline = data?.guidelines.find((g) => g.id === selectedTool?.id);
  const color = guideline?.color || "cyan";

  const handleClick = () => {
    const newColor = colors[(colors.indexOf(color) + 1) % colors.length];
    const guideline = { ...selectedTool } as IGuideline;
    colorGuidelineCommand.execute(guideline, newColor);
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconCircle className={fillByColor[color]} />}
      onClick={handleClick}
    />
  );
}
