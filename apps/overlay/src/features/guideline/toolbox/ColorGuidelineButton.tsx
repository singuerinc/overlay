import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useColorGuidelineCommand } from "@/features/guideline/store/useColorGuidelineCommand";
import { useGetGuidelineByIdQuery } from "@/features/guideline/store/useGetGuidelineByIdQuery";
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

export function ColorGuidelineButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGetGuidelineByIdQuery(id);
  const colorGuidelineCommand = useColorGuidelineCommand();
  const color = guideline?.color || "cyan";

  const handleClick = () => {
    const newColor = colors[(colors.indexOf(color) + 1) % colors.length];
    if (guideline) {
      colorGuidelineCommand.execute(guideline, newColor);
    }
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconCircle className={fillByColor[color]} />}
      onClick={handleClick}
    />
  );
}
