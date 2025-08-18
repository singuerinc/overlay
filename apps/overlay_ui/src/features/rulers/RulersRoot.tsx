import {
  useRulerPositionX,
  useRulerPositionY,
} from "@/features/rulers/store/rulerStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useSetOriginRulerCommand } from "@/features/rulers/store/useSetOriginRulerCommand";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback } from "react";

const variantsInfo = cva(
  [
    "absolute top-1 left-1",
    "text-neutral-900",
    "whitespace-nowrap text-xs tabular-nums",
  ],
  {
    variants: {},
  }
);

const variantsOriginGuideline = cva(["absolute border-neutral-200"], {
  variants: {
    isVertical: {
      true: "h-full w-px border-l border-dashed",
      false: "w-full h-px border-t border-dashed",
    },
  },
  defaultVariants: {
    isVertical: true,
  },
});

export function RulersRoot() {
  const { data: ruler } = useGetRulerQuery();
  const setOriginCommand = useSetOriginRulerCommand();

  const x = useRulerPositionX();
  const y = useRulerPositionY();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!event.altKey) {
        return;
      }

      const mouseX = event.clientX || 0;
      const mouseY = event.clientY || 0;

      setOriginCommand.execute(mouseX, mouseY);
    },
    [setOriginCommand]
  );

  const variantsConfig = {
    locked: false,
  };

  if (!ruler) {
    return null;
  }

  const normalizedX = (x ?? 0) - (ruler.originX ?? 0);
  const normalizedY = (y ?? 0) - (ruler.originY ?? 0);

  if (ruler.visible === false) {
    return null;
  }

  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen pointer-events-auto"
      onClick={handleClick}
    >
      <div className="absolute top-0 left-0 h-8 w-full flex justify-center">
        <div
          className=" bg-neutral-200/50 grow-0 shrink-0"
          style={{ width: `${ruler.originX}px` }}
        />

        <div className="w-full bg-neutral-100/50" />
      </div>
      <div className="absolute top-0 left-0 w-8 h-full flex flex-col">
        <div
          className="bg-neutral-200/50 grow-0 shrink-0 w-full"
          style={{ height: `${ruler.originY}px` }}
        />

        <div className="h-full w-full grow bg-neutral-100/50" />
      </div>
      {x !== null && (
        <div
          className={cn(variantsInfo(), "left-2")}
          style={{ transform: `translate(${x}px` }}
        >
          <span>{normalizedX}</span>
        </div>
      )}
      {y !== null && (
        <div
          className={cn(variantsInfo(), "top-2")}
          style={{
            transform: `translateY(${y}px) rotate(-90deg) translateX(-100%)`,
            transformOrigin: "top left",
          }}
        >
          <span>{normalizedY}</span>
        </div>
      )}
      <div
        className={variantsOriginGuideline({
          ...variantsConfig,
          isVertical: true,
        })}
        style={{ transform: `translateX(${ruler.originX}px)` }}
      />
      <div
        className={variantsOriginGuideline({
          ...variantsConfig,
          isVertical: false,
        })}
        style={{ transform: `translateY(${ruler.originY}px)` }}
      />
    </div>
  );
}
