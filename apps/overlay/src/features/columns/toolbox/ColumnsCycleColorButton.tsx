import type { ColumnsColorType } from "@/features/columns/ColumnsColor";
import { useColumns } from "@/features/columns/hooks/useColumns";
import { useColumnsQuery } from "@/features/columns/store/useColumnsQuery";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { cn } from "@/ui/cn";
import { IconCircle } from "@tabler/icons-react";
import { useCallback } from "react";

const colors = {
  neutral: "o:fill-neutral-600",
  cyan: "o:fill-cyan-600",
  green: "o:fill-green-600",
  red: "o:fill-red-600",
} satisfies Record<ColumnsColorType, string>;

export function ColumnsCycleColorButton() {
  const { cycleColor } = useColumns();
  const { data: columns } = useColumnsQuery();

  const handleClick = useCallback(() => {
    if (columns) {
      cycleColor();
    }
  }, [columns]);

  if (!columns) {
    return null;
  }

  return (
    <ToolBoxLabeledButton
      label="Color"
      Icon={
        <IconCircle
          className={cn(colors[columns.color], "o:text-transparent")}
        />
      }
      onClick={handleClick}
    />
  );
}
