import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { type IGridPattern } from "@/features/grid/types";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";

export function Grid() {
  const { data: grid } = useGridQuery();
  const { data: ruler } = useRulerQuery();

  if (!ruler || !grid || !grid.visible) {
    return null;
  }

  const styles = {
    dots: {
      backgroundImage:
        "radial-gradient(circle, rgba(255,0,0,0.3) 1px, transparent 1px)",
    },
    lines: {
      backgroundImage:
        "linear-gradient(to right, rgba(255,0,0,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,0,0.2) 1px, transparent 1px)",
    },
  } as Record<IGridPattern, React.CSSProperties>;

  return (
    <>
      <div
        data-overlay-grid-id={grid.id}
        className="o:absolute o:top-0 o:left-0 o:w-screen o:h-screen o:pointer-events-none"
        style={{
          backgroundPosition: `${ruler.originX + grid.gapX / 2}px ${ruler.originY + grid.gapY / 2}px`,
          backgroundSize: `${grid.gapX}px ${grid.gapY}px`,
          ...styles[grid.pattern],
        }}
      />
    </>
  );
}
