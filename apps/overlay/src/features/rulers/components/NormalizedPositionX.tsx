import { useRulerPositionX } from "@/features/rulers/store/rulerStore";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { cn } from "@/ui/cn";

export function NormalizedPositionX() {
  const { data: ruler } = useRulerQuery();
  const x = useRulerPositionX();
  const normalizedX = x ?? 0;

  if (!ruler) {
    return null;
  }

  if (x === null) {
    return null;
  }

  return (
    <div
      style={{
        transform: `translateX(${normalizedX + (ruler.originX ?? 0)}px)`,
      }}
      className="o:absolute o:w-[75px] o:select-none o:text-[9px] o:h-full o:whitespace-nowrap o:tabular-nums"
    >
      <div className="o:absolute o:flex o:flex-col o:w-full o:h-full">
        <div
          className={cn("o:w-full o:z-10 o:h-full o:overflow-hidden o:flex", {
            "o:items-end": ruler.position === "bottom-right",
          })}
        >
          <span className="o:text-red-600 o:pl-2">{normalizedX}</span>
        </div>
      </div>
      <div className="o:-translate-x-1/2 o:bg-gradient-to-l o:from-transparent o:via-neutral-100 o:to-transparent o:h-full" />
    </div>
  );
}
