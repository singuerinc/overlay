import { useGrid } from "@/features/grid/hooks/useGrid";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { cn } from "@/ui/cn";
import { IconCircle } from "@tabler/icons-react";

const fillByColor = {
  cyan: "o:fill-cyan-400",
  red: "o:fill-red-400",
  green: "o:fill-green-400",
  neutral: "o:fill-neutral-400",
} as Record<GuidelineColorType, string>;

export function GridColorButton() {
  const { data: grid } = useGridQuery();
  const { cycleColor } = useGrid();

  if (!grid) {
    return null;
  }

  return (
    <ToolBoxLabeledButton
      label="Color"
      Icon={
        <IconCircle
          className={cn(fillByColor[grid.color], "o:text-transparent")}
        />
      }
      onClick={() => cycleColor(grid)}
    />
  );
}
