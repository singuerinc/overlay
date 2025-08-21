import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { useGuidelineColorCommand } from "@/features/guideline/store/useGuidelineColorCommand";
import { cn } from "@/ui/cn";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { type IGuideline } from "../types";

const colors: GuidelineColorType[] = ["cyan", "red", "green"];

const fillByColor = {
  cyan: "fill-cyan-400",
  red: "fill-red-400",
  green: "fill-green-400",
  gray: "fill-neutral-400",
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
      Icon={
        <IconCircle className={cn(fillByColor[color], "text-transparent")} />
      }
      onClick={handleClick}
    />
  );
}
