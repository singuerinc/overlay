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
      className="overlay:absolute overlay:w-[75px] overlay:select-none overlay:text-[9px] overlay:h-full overlay:whitespace-nowrap overlay:tabular-nums"
    >
      <div className="overlay:absolute overlay:flex overlay:flex-col overlay:w-full overlay:h-full">
        <div
          className={cn(
            "overlay:w-full overlay:z-10 overlay:h-full overlay:overflow-hidden overlay:flex",
            {
              "overlay:items-end": ruler.position === "bottom-right",
            }
          )}
        >
          <span className="overlay:text-red-600 overlay:pl-2">
            {normalizedX}
          </span>
        </div>
      </div>
      <div className="overlay:-translate-x-1/2 overlay:bg-gradient-to-l overlay:from-transparent overlay:via-neutral-100 overlay:to-transparent overlay:h-full" />
    </div>
  );
}
