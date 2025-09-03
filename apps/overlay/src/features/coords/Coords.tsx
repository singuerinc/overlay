import { useCoords } from "@/features/coords/hooks/useCoords";
import { useSelectedTool } from "@/features/tools/store/tools";
import { zIndex } from "@/features/workspace/utils/zIndex";
import { cn } from "@/ui/cn";
import { useEffect, useRef } from "react";

export function Coords() {
  const offset = { x: 0, y: 0 };
  const { x, y, setX, setY } = useCoords();
  const selectedTool = useSelectedTool();

  useEffect(() => {
    if (!selectedTool) {
      setX(null);
      setY(null);
    }
  }, [selectedTool]);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      data-overlay-tool-type="coords"
      ref={ref}
      className={cn(
        "o:absolute o:left-0 o:top-0",
        "o:w-full o:h-full o:px-1",
        "o:text-neutral-950 o:text-[9px] o:tabular-nums",
        zIndex.coords
      )}
      style={{
        top: offset.y,
        left: offset.x,
      }}
    >
      {x !== null && (
        <div
          className={cn(
            "o:absolute o:w-12 o:h-5 o:flex o:justify-start o:border-l o:bg-gradient-to-r o:from-white o:to-transparent"
          )}
          style={{ left: x, top: 0 }}
        >
          <span className="o:absolute o:left-2">{x + window.scrollX}</span>
        </div>
      )}
      {y !== null && (
        <div
          className={cn(
            "o:absolute o:w-5 o:h-16 o:bg-gradient-to-b o:from-white o:to-transparent o:border-t o:inline-block",
            {
              "o:hidden": y === null,
            }
          )}
          style={{ left: 0, top: y }}
        >
          <span className="o:absolute o:top-2 o:w-5 o:h-5 o:pt-0.5 o:flex o:justify-end o:-rotate-90">
            {y + window.scrollY}
          </span>
        </div>
      )}
    </div>
  );
}
