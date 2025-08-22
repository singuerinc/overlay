import { NormalizedPositionY } from "@/features/rulers/components/NormalizedPositionY";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { useRulerSetOriginCommand } from "@/features/rulers/store/useRulerSetOriginCommand";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

const variantsWrapper = cva(
  [
    "overlay:absolute overlay:top-0 overlay:w-5 overlay:pointer-events-auto",
    "overlay:flex overlay:h-full",
    "overlay:select-none overlay:text-[9px] overlay:text-neutral-400",
  ],
  {
    variants: {
      position: {
        "top-left": "overlay:left-0",
        "top-right": "overlay:right-0",
        "bottom-left": "overlay:left-0",
        "bottom-right": "overlay:right-0",
      },
    },
  }
);

const variantsItem = cva(
  [
    "overlay:h-[50px] overlay:w-full overlay:flex overlay:items-end overlay:shrink-0",
  ],
  {
    variants: {
      position: {
        "top-right": "overlay:flex-row-reverse",
        "bottom-right": "overlay:flex-row-reverse",
        "top-left": "overlay:flex-row",
        "bottom-left": "overlay:flex-row",
      },
    },
  }
);

export function VerticalRuler({ origin }: { origin: number }) {
  const { data: ruler } = useRulerQuery();
  const setOriginRulerCommand = useRulerSetOriginCommand();
  const windowSize = useWindowSize();
  const numList = Array.from(
    { length: Math.floor(windowSize.height / 50) + 1 },
    (_, i) => i
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      setOriginRulerCommand.execute(ruler?.originX ?? 0, y);
    },
    [setOriginRulerCommand, ruler]
  );

  if (!ruler) {
    return null;
  }

  return (
    <div
      onClick={handleClick}
      className={cn(variantsWrapper({ position: ruler.position }))}
    >
      <div className="overlay:absolute overlay:h-fit overlay:w-full overlay:flex overlay:flex-col">
        <div
          className="overlay:w-full overlay:bg-neutral-300/50 overlay:shrink-0 overlay:grow-0 overlay:overflow-hidden"
          style={{ transform: `translateY(calc(-100% + ${origin}px))` }}
        >
          <div
            className={cn(
              "overlay:absolute overlay:top-0 overlay:h-full overlay:w-1.5",
              {
                "overlay:right-0": ruler.position === "top-left",
                "overlay:left-0": ruler.position === "bottom-right",
              }
            )}
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <ol className="overlay:flex overlay:flex-col-reverse overlay:w-full overlay:h-full overlay:items-end">
            {numList.map((num) => (
              <li
                key={num}
                className={cn(variantsItem({ position: ruler.position }))}
              >
                <div className="overlay:relative overlay:w-full overlay:h-full overlay:flex overlay:justify-baseline overlay:-translate-y-1/2">
                  <div className="overlay:w-full" />
                  <span className="overlay:absolute overlay:-rotate-90">
                    {-(num + 1) * 50}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div
          className="overlay:absolute overlay:w-full overlay:h-fit overlay:bg-neutral-100/50 overlay:grow"
          style={{ transform: `translateY(${origin}px)` }}
        >
          <div
            className={cn(
              "overlay:absolute overlay:top-0 overlay:h-full overlay:w-1.5",
              {
                "overlay:right-0": ruler.position === "top-left",
                "overlay:left-0": ruler.position === "bottom-right",
              }
            )}
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <ol className="overlay:flex overlay:flex-col overlay:w-full overlay:h-full overlay:items-end overlay:select-none">
            {numList.map((num) => (
              <li
                key={num}
                className={cn(variantsItem({ position: ruler.position }))}
              >
                <div className="overlay:relative overlay:w-full overlay:h-full overlay:flex overlay:items-center overlay:-translate-y-1/2">
                  <div className="overlay:w-full" />
                  <span className="overlay:absolute overlay:-rotate-90">
                    {num * 50}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <NormalizedPositionY />
    </div>
  );
}
