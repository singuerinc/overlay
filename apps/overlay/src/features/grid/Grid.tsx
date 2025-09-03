import { GridColors } from "@/features/grid/GridColor";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { type IGridPattern } from "@/features/grid/types";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { zIndex } from "@/features/workspace/utils/zIndex";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";

const variantsGrid = cva([], {
  variants: {
    color: {
      cyan: "oklch(71.5% 0.143 215.221)",
      red: "oklch(63.7% 0.237 25.331)",
      green: "oklch(72.3% 0.219 149.579)",
      neutral: "oklch(70.8% 0 0)",
    },
  },
  defaultVariants: {
    color: GridColors[0],
  },
});

export function Grid() {
  const { data: grid } = useGridQuery();
  const { data: ruler } = useRulerQuery();

  if (!ruler || !grid || !grid.visible) {
    return null;
  }

  const { color, opacity } = grid;

  const colorClass = variantsGrid({ color });

  const styles = {
    dots: {
      backgroundImage: `radial-gradient(circle, ${colorClass} 1px, transparent 1px)`,
    },
    lines: {
      backgroundImage: `linear-gradient(to right, ${colorClass} 1px, transparent 1px), linear-gradient(to bottom, ${colorClass} 1px, transparent 1px)`,
    },
    both: {
      backgroundImage: `radial-gradient(circle, ${colorClass} 1px, transparent 1px), linear-gradient(to right, ${colorClass} 1px, transparent 1px), linear-gradient(to bottom, ${colorClass} 1px, transparent 1px)`,
    },
  } as Record<IGridPattern, React.CSSProperties>;

  return (
    <div
      data-overlay-grid-id={grid.id}
      className={cn(
        "o:absolute o:top-0 o:left-0 o:w-full o:h-full",
        zIndex.grid
      )}
      style={{
        opacity,
        backgroundPosition: `top ${ruler.originY + grid.gapY / 2}px left ${ruler.originX + grid.gapX / 2}px`,
        backgroundSize: `${grid.gapX}px ${grid.gapY}px`,
        ...styles[grid.pattern],
      }}
    />
  );
}
