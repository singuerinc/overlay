import { useRulerPositionX } from "@/features/rulers/store/rulerStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { cn } from "@/ui/cn";

export function NormalizedPositionX() {
  const { data: ruler } = useGetRulerQuery();
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
      className="absolute w-[75px] select-none text-[9px] h-full whitespace-nowrap tabular-nums"
    >
      <div className="absolute flex flex-col w-full h-full">
        <div
          className={cn("w-full z-10 h-full overflow-hidden flex", {
            "items-end": ruler.position === "bottom-right",
          })}
        >
          <span className="text-red-600 pl-2">{normalizedX}</span>
        </div>
      </div>
      <div className="-translate-x-1/2 bg-gradient-to-l from-transparent via-neutral-100 to-transparent h-full" />
    </div>
  );
}
