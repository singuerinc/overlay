import { GridColors } from "@/features/grid/GridColor";
import { useGridColorCommand } from "@/features/grid/store/useGridColorCommand";
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
  const colorGridCommand = useGridColorCommand();
  const color = grid?.color || GridColors[0];

  const handleClick = () => {
    const newColor =
      GridColors[(GridColors.indexOf(color) + 1) % GridColors.length];
    if (grid) {
      colorGridCommand.execute(grid, newColor);
    }
  };

  return (
    <ToolBoxLabeledButton
      label="Color"
      Icon={
        <IconCircle className={cn(fillByColor[color], "o:text-transparent")} />
      }
      onClick={handleClick}
    />
  );
}
