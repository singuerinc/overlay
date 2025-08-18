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
    "whitespace-nowrap text-xs tabular-nums",
    "select-none w-fit",
    "h-8 flex flex-col",
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

export function Ruler() {
  const { data: ruler } = useGetRulerQuery();
  const setOriginCommand = useSetOriginRulerCommand();
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

  if (!ruler || ruler.visible === false) {
    return null;
  }

  return (
    <div
      className="absolute top-0 left-0 pointer-events-auto"
      style={{
        width: `${ruler.width}`,
        height: `${ruler.height}`,
      }}
      onClick={handleClick}
    >
      <HorizontalRuler origin={ruler.originX} />
      <VerticalRuler origin={ruler.originY} />
      <NormalizedPositionX />
      <NormalizedPositionY />
      <StaticHorizontalGuideline originX={ruler.originX} />
      <StaticVerticalGuideline originY={ruler.originY} />
    </div>
  );
}

function StaticVerticalGuideline({ originY }: { originY: number }) {
  return (
    <div
      className={variantsOriginGuideline({
        isVertical: false,
      })}
      style={{ transform: `translateY(${originY}px)` }}
    />
  );
}

function StaticHorizontalGuideline({ originX }: { originX: number }) {
  return (
    <div
      className={variantsOriginGuideline({
        isVertical: true,
      })}
      style={{ transform: `translateX(${originX}px)` }}
    />
  );
}

function HorizontalRuler({ origin }: { origin: number }) {
  // FIXME: the number of items should be calculated based on the width/height of the ruler
  const numList = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="absolute top-0 left-0 h-8 w-full flex">
      <div
        className="h-full bg-neutral-200/50 shrink-0 grow-0"
        style={{ width: `${origin}px` }}
      >
        <ol className="flex flex-row-reverse w-full h-full items-end text-neutral-300 text-xs select-none">
          {numList.map((num) => (
            <li
              key={num}
              className="w-[50px] flex flex-col items-start gap-y-1 shrink-0"
            >
              <span className="-translate-x-1/2">{(num + 1) * 50}</span>
              <span className="border-l w-px h-2" />
            </li>
          ))}
        </ol>
      </div>
      <div className="h-full w-full grow bg-neutral-100/50">
        <ol className="flex w-full h-full items-end text-neutral-300 text-xs select-none">
          {numList.map((num) => (
            <li
              key={num}
              className="w-[50px] flex flex-col items-start gap-y-1 shrink-0"
            >
              <span className="-translate-x-1/2">{num * 50}</span>
              <span className="border-l w-px h-2" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function VerticalRuler({ origin }: { origin: number }) {
  const numList = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="-rotate-90 origin-top-left rotate-45 top-0 left-0 absolute w-full">
      <div className="relative top-0 left-0 h-8 w-full flex">
        <div className="h-full w-full bg-neutral-100/50">
          <ol className="flex flex-row-reverse w-full h-full items-end text-neutral-300 text-xs select-none">
            {numList.map((num) => (
              <li
                key={num}
                className="w-[50px] flex flex-col items-start gap-y-1 shrink-0"
              >
                <span className="-translate-x-1/2">{num * 50}</span>
                <span className="border-l w-px h-2" />
              </li>
            ))}
          </ol>
        </div>
        <div
          className="h-full bg-red-500/50 shrink-0 grow-0"
          style={{ width: `${origin}px` }}
        >
          <ol className="flex w-full h-full items-end text-neutral-300 text-xs select-none">
            <li className="w-[50px] shrink-0"></li>
            {numList.map((num) => (
              <li
                key={num}
                className="w-[50px] flex flex-col items-start gap-y-1 shrink-0"
              >
                <span className="-translate-x-1/2">{(num + 1) * 50}</span>
                <span className="border-l w-px h-2" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function NormalizedPositionX() {
  const { data: ruler } = useGetRulerQuery();
  const x = useRulerPositionX();
  const normalizedX = (x ?? 0) - (ruler?.originX ?? 0);

  if (x === null) {
    return null;
  }

  return (
    <div
      className={cn(variantsInfo(), "")}
      style={{ transform: `translate(${x}px` }}
    >
      <span className="grow flex items-center pl-1">{normalizedX}</span>
      <div className="h-2" />
      {/* <div className="absolute bg-gradient-to-r from-10% from-transparent via-white to-90% to-transparent -z-10 -translate-x-14 h-6 left-0 w-32"></div> */}
    </div>
  );
}

function NormalizedPositionY() {
  const { data: ruler } = useGetRulerQuery();
  const y = useRulerPositionY();
  const normalizedY = (y ?? 0) - (ruler?.originY ?? 0);

  if (y === null) {
    return null;
  }

  return (
    <div
      className={cn(variantsInfo(), "top-2")}
      style={{
        transform: `translateY(${y}px) rotate(-90deg) translateX(-100%)`,
        transformOrigin: "top left",
      }}
    >
      <span>{normalizedY}</span>
    </div>
  );
}
