import {
  GuidelineColors,
  type GuidelineColorType,
} from "@/features/guideline/GuidelineColor";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { useGuidelineColorCommand } from "@/features/guideline/store/useGuidelineColorCommand";
import { cn } from "@/ui/cn";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { type IGuideline } from "../types";

const fillByColor = {
  cyan: "o:fill-cyan-400",
  red: "o:fill-red-400",
  green: "o:fill-green-400",
  neutral: "o:fill-neutral-400",
} as Record<GuidelineColorType, string>;

export function GuidelineColorButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const colorGuidelineCommand = useGuidelineColorCommand();
  const color = guideline?.color || "cyan";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const newColor =
      GuidelineColors[
        (GuidelineColors.indexOf(color) + 1) % GuidelineColors.length
      ];
    if (guideline) {
      colorGuidelineCommand.execute(guideline, newColor);
    }
  };

  return (
    <ToolButton
      enabled={true}
      Icon={
        <IconCircle
          stroke={0}
          className={cn(fillByColor[color], "text-transparent")}
          size={16}
        />
      }
      onClick={handleClick}
    />
  );
}
