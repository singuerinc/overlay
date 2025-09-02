import { useRuler } from "@/features/rulers/hooks/useRuler";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback } from "react";

const variantsWrapper = cva(
  [
    "o:absolute o:top-0 o:w-5",
    "o:flex o:h-full",
    "o:select-none o:text-[9px] o:text-neutral-400",
  ],
  {
    variants: {
      position: {
        "top-left": "o:left-0",
        "top-right": "o:right-0",
        "bottom-left": "o:left-0",
        "bottom-right": "o:right-0",
      },
    },
  }
);

const variantsItem = cva(
  ["o:h-[50px] o:w-full o:flex o:items-end o:shrink-0"],
  {
    variants: {
      position: {
        "top-right": "o:flex-row-reverse",
        "bottom-right": "o:flex-row-reverse",
        "top-left": "o:flex-row",
        "bottom-left": "o:flex-row",
      },
    },
  }
);

export function VerticalRuler({ origin }: { origin: number }) {
  const { data: workspace } = useWorkspaceQuery();
  const { data: ruler } = useRulerQuery();
  const { setOrigin } = useRuler();
  const numList = Array.from(
    { length: Math.floor(document.body.scrollHeight / 50) + 1 },
    (_, i) => i
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      setOrigin(ruler?.originX ?? 0, y);
    },
    [setOrigin, ruler]
  );

  if (!ruler) {
    return null;
  }

  return (
    <div
      // onClick={handleClick}
      className={cn(variantsWrapper({ position: ruler.position }), {
        "o:pointer-events-auto": workspace?.locked === false,
      })}
    >
      <div className="o:absolute o:h-fit o:w-full o:flex o:flex-col">
        <div
          className="o:w-full o:bg-neutral-300/50 o:shrink-0 o:grow-0 o:overflow-hidden"
          style={{ transform: `translateY(calc(-100% + ${origin}px))` }}
        >
          <div
            className={cn("o:absolute o:top-0 o:h-full o:w-1.5", {
              "o:right-0": ruler.position === "top-left",
              "o:left-0": ruler.position === "bottom-right",
            })}
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <ol className="o:flex o:flex-col-reverse o:w-full o:h-full o:items-end">
            {numList.map((num) => (
              <li
                key={num}
                className={cn(variantsItem({ position: ruler.position }))}
              >
                <div className="o:relative o:w-full o:h-full o:flex o:justify-baseline o:-translate-y-1/2">
                  <div className="o:w-full" />
                  <span className="o:absolute o:-rotate-90">
                    {-(num + 1) * 50}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div
          className="o:absolute o:w-full o:h-fit o:bg-neutral-100/50 o:grow"
          style={{ transform: `translateY(${origin}px)` }}
        >
          <div
            className={cn("o:absolute o:top-0 o:h-full o:w-1.5", {
              "o:right-0": ruler.position === "top-left",
              "o:left-0": ruler.position === "bottom-right",
            })}
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <ol className="o:flex o:flex-col o:w-full o:h-full o:items-end o:select-none">
            {numList.map((num) => (
              <li
                key={num}
                className={cn(variantsItem({ position: ruler.position }))}
              >
                <div className="o:relative o:w-full o:h-full o:flex o:items-center o:-translate-y-1/2">
                  <div className="o:w-full" />
                  <span className="o:absolute o:-rotate-90">{num * 50}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {/* <NormalizedPositionY /> */}
    </div>
  );
}
