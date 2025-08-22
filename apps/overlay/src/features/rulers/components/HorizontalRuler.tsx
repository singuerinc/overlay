import { NormalizedPositionX } from "@/features/rulers/components/NormalizedPositionX";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { useRulerSetOriginCommand } from "@/features/rulers/store/useRulerSetOriginCommand";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

const variantsWrapper = cva(
  [
    "overlay:absolute overlay:left-0 overlay:h-5 overlay:pointer-events-auto overlay:overflow-hidden",
    "overlay:flex overlay:w-full",
    "overlay:select-none overlay:text-neutral-400 overlay:text-[9px]",
  ],
  {
    variants: {
      position: {
        "top-left": "overlay:top-0",
        "top-right": "overlay:top-0",
        "bottom-left": "overlay:bottom-0",
        "bottom-right": "overlay:bottom-0",
      },
    },
  }
);

const variantsItem = cva(
  ["overlay:w-[50px] overlay:flex overlay:items-start overlay:shrink-0"],
  {
    variants: {
      position: {
        "top-left": "overlay:flex-col",
        "top-right": "overlay:flex-col",
        "bottom-left": "overlay:flex-col-reverse",
        "bottom-right": "overlay:flex-col-reverse",
      },
    },
  }
);

export function HorizontalRuler({ origin }: { origin: number }) {
  const { data: ruler } = useRulerQuery();
  const setOriginRulerCommand = useRulerSetOriginCommand();
  const windowSize = useWindowSize();
  const numList = Array.from(
    { length: Math.floor(windowSize.width / 50) + 1 },
    (_, i) => i
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setOriginRulerCommand.execute(x, ruler?.originY ?? 0);
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
      <div
        className="overlay:absolute overlay:h-full overlay:w-fit overlay:bg-neutral-300/50 overlay:shrink-0 overlay:grow-0"
        style={{ transform: `translateX(calc(-100% + ${origin}px))` }}
      >
        <div
          className={cn(
            "overlay:absolute overlay:left-0 overlay:w-full overlay:h-1.5",
            {
              "overlay:bottom-0": ruler.position === "top-left",
              "overlay:top-0": ruler.position === "bottom-right",
            }
          )}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <ol className="overlay:flex overlay:flex-row-reverse overlay:w-full overlay:h-full">
          {numList.map((num) => (
            <li
              key={num}
              className={cn(variantsItem({ position: ruler.position }))}
            >
              <span className="overlay:-translate-x-1/2">
                {-(num + 1) * 50}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div
        className="overlay:absolute overlay:h-full overlay:w-fit overlay:bg-neutral-200/50 overlay:shrink-0 overlay:grow-0"
        style={{ transform: `translateX(${origin}px)` }}
      >
        <div
          className={cn(
            "overlay:absolute overlay:left-0 overlay:w-full overlay:h-1.5",
            {
              "overlay:bottom-0": ruler.position === "top-left",
              "overlay:top-0": ruler.position === "bottom-right",
            }
          )}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <ol className="overlay:flex overlay:w-full overlay:h-full">
          {numList.map((num) => (
            <li
              key={num}
              className={cn(variantsItem({ position: ruler.position }))}
            >
              <span className="overlay:-translate-x-1/2">{num * 50}</span>
            </li>
          ))}
        </ol>
      </div>
      <NormalizedPositionX />
    </div>
  );
}
