import { NormalizedPositionX } from "@/features/rulers/components/NormalizedPositionX";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { useRulerSetOriginCommand } from "@/features/rulers/store/useRulerSetOriginCommand";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

const variantsWrapper = cva(
  [
    "o:absolute o:left-0 o:h-5 o:pointer-events-auto o:overflow-hidden",
    "o:flex o:w-full",
    "o:select-none o:text-neutral-400 o:text-[9px]",
  ],
  {
    variants: {
      position: {
        "top-left": "o:top-0",
        "top-right": "o:top-0",
        "bottom-left": "o:bottom-0",
        "bottom-right": "o:bottom-0",
      },
    },
  }
);

const variantsItem = cva(["o:w-[50px] o:flex o:items-start o:shrink-0"], {
  variants: {
    position: {
      "top-left": "o:flex-col",
      "top-right": "o:flex-col",
      "bottom-left": "o:flex-col-reverse",
      "bottom-right": "o:flex-col-reverse",
    },
  },
});

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
        className="o:absolute o:h-full o:w-fit o:bg-neutral-300/50 o:shrink-0 o:grow-0"
        style={{ transform: `translateX(calc(-100% + ${origin}px))` }}
      >
        <div
          className={cn("o:absolute o:left-0 o:w-full o:h-1.5", {
            "o:bottom-0": ruler.position === "top-left",
            "o:top-0": ruler.position === "bottom-right",
          })}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <ol className="o:flex o:flex-row-reverse o:w-full o:h-full">
          {numList.map((num) => (
            <li
              key={num}
              className={cn(variantsItem({ position: ruler.position }))}
            >
              <span className="o:-translate-x-1/2">{-(num + 1) * 50}</span>
            </li>
          ))}
        </ol>
      </div>
      <div
        className="o:absolute o:h-full o:w-fit o:bg-neutral-200/50 o:shrink-0 o:grow-0"
        style={{ transform: `translateX(${origin}px)` }}
      >
        <div
          className={cn("o:absolute o:left-0 o:w-full o:h-1.5", {
            "o:bottom-0": ruler.position === "top-left",
            "o:top-0": ruler.position === "bottom-right",
          })}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <ol className="o:flex o:w-full o:h-full">
          {numList.map((num) => (
            <li
              key={num}
              className={cn(variantsItem({ position: ruler.position }))}
            >
              <span className="o:-translate-x-1/2">{num * 50}</span>
            </li>
          ))}
        </ol>
      </div>
      <NormalizedPositionX />
    </div>
  );
}
