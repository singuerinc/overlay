import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useGuideline } from "@/features/guideline/hooks/useGuideline";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { cn } from "@/ui/cn";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { useCallback } from "react";
import { type IGuideline } from "../types";

const fillByColor = {
  cyan: "o:fill-cyan-400",
  red: "o:fill-red-400",
  green: "o:fill-green-400",
  neutral: "o:fill-neutral-400",
} satisfies Record<GuidelineColorType, string>;

export function GuidelineColorButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const { cycleColor } = useGuideline();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (guideline) {
        cycleColor(guideline);
      }
    },
    [cycleColor, guideline]
  );

  if (!guideline) {
    return null;
  }

  return (
    <ToolButton
      enabled={true}
      Icon={
        <IconCircle
          stroke={0}
          className={cn(fillByColor[guideline.color], "text-transparent")}
          size={16}
        />
      }
      onClick={handleClick}
    />
  );
}
