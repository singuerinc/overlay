import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { useGuidelineColorCommand } from "@/features/guideline/store/useGuidelineColorCommand";
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

export function GuidelineColorButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const colorGuidelineCommand = useGuidelineColorCommand();
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
