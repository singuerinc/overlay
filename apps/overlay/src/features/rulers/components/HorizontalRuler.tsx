import { NormalizedPositionX } from "@/features/rulers/components/NormalizedPositionX";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { useRulerSetOriginCommand } from "@/features/rulers/store/useRulerSetOriginCommand";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

const variantsWrapper = cva(
  [
    "absolute left-0 h-5 pointer-events-auto overflow-hidden",
    "flex w-full",
    "select-none text-neutral-400 text-[9px]",
  ],
  {
    variants: {
      position: {
        "top-left": "top-0",
        "top-right": "top-0",
        "bottom-left": "bottom-0",
        "bottom-right": "bottom-0",
      },
    },
  }
);

const variantsItem = cva(["w-[50px] flex items-start shrink-0"], {
  variants: {
    position: {
      "top-left": "flex-col",
      "top-right": "flex-col",
      "bottom-left": "flex-col-reverse",
      "bottom-right": "flex-col-reverse",
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
        className="absolute h-full w-fit bg-neutral-300/50 shrink-0 grow-0"
        style={{ transform: `translateX(calc(-100% + ${origin}px))` }}
      >
        <div
          className={cn("absolute left-0 w-full h-1.5", {
            "bottom-0": ruler.position === "top-left",
            "top-0": ruler.position === "bottom-right",
          })}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <ol className="flex flex-row-reverse w-full h-full">
          {numList.map((num) => (
            <li
              key={num}
              className={cn(variantsItem({ position: ruler.position }))}
            >
              <span className="-translate-x-1/2">{-(num + 1) * 50}</span>
            </li>
          ))}
        </ol>
      </div>
      <div
        className="absolute h-full w-fit bg-neutral-200/50 shrink-0 grow-0"
        style={{ transform: `translateX(${origin}px)` }}
      >
        <div
          className={cn("absolute left-0 w-full h-1.5", {
            "bottom-0": ruler.position === "top-left",
            "top-0": ruler.position === "bottom-right",
          })}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <ol className="flex w-full h-full">
          {numList.map((num) => (
            <li
              key={num}
              className={cn(variantsItem({ position: ruler.position }))}
            >
              <span className="-translate-x-1/2">{num * 50}</span>
            </li>
          ))}
        </ol>
      </div>
      <NormalizedPositionX />
    </div>
  );
}
