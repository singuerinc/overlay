import { Guideline } from "@/features/guideline/Guideline";
import { GuidelineColors } from "@/features/guideline/GuidelineColor";
import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { createVerticalGuideline } from "@/features/guideline/store/createVerticalGuideline";
import {
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "@/features/guideline/types";
import {
  useRulerPositionX,
  useRulerPositionY,
} from "@/features/rulers/store/rulerStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useSetOriginRulerCommand } from "@/features/rulers/store/useSetOriginRulerCommand";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useState } from "react";

const variantsInfo = cva(
  [
    "absolute",
    "whitespace-nowrap text-xs tabular-nums",
    "select-none w-fit",
    "h-6 text-[10px]",
  ],
  {
    variants: {},
  }
);

export function Ruler() {
  const { data: ruler } = useGetRulerQuery();
  const setOriginCommand = useSetOriginRulerCommand();

  const [hGuideline] = useState<IGuideline>(
    createHorizontalGuideline({
      color: GuidelineColors[3],
    })
  );
  const [vGuideline] = useState<IGuideline>(
    createVerticalGuideline({
      color: GuidelineColors[3],
    })
  );

  useEffect(() => {
    if (ruler) {
      hGuideline.y = ruler.originY;
      vGuideline.x = ruler.originX;
    }
  }, [hGuideline, ruler, vGuideline]);

  const handleResetOrigin = useCallback(() => {
    setOriginCommand.execute(0, 0);
  }, [setOriginCommand]);

  const onGuidelinePositionChanged = useCallback(
    (guideline: IGuideline, x: number, y: number) => {
      guideline.x = x;
      guideline.y = y;
      const isVertical = guideline.type === GUIDELINE_VERTICAL;
      if (ruler) {
        setOriginCommand.execute(
          isVertical ? x : ruler.originX,
          isVertical ? ruler.originY : y
        );
      }
    },
    [ruler, setOriginCommand]
  );

  const onGuidelinePositionChangeEnded = useCallback(
    (guideline: IGuideline, position: { x: number; y: number }) => {
      guideline.x = position.x;
      guideline.y = position.y;
      const isVertical = guideline.type === GUIDELINE_VERTICAL;
      if (ruler) {
        setOriginCommand.execute(
          isVertical ? position.x : ruler.originX,
          isVertical ? ruler.originY : position.y
        );
      }
    },
    [ruler, setOriginCommand]
  );

  const onGuidelineSelected = useCallback((_: IGuideline) => {
    //
  }, []);

  if (!ruler || ruler.visible === false) {
    return null;
  }

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        width: `${ruler.width}`,
        height: `${ruler.height}`,
      }}
    >
      <div
        className="absolute top-0 left-0 w-6 h-6 bg-neutral-100 z-10 cursor-pointer"
        onClick={handleResetOrigin}
      />
      <VerticalRuler origin={ruler.originY} />
      <HorizontalRuler origin={ruler.originX} />
      <NormalizedPositionX />
      <NormalizedPositionY />
      <Guideline
        guideline={hGuideline}
        style="dashed"
        onGuidelineSelected={onGuidelineSelected}
        onGuidelinePositionChangeEnded={onGuidelinePositionChangeEnded}
        onGuidelinePositionChanged={onGuidelinePositionChanged}
      />
      <Guideline
        guideline={vGuideline}
        style="dashed"
        onGuidelineSelected={onGuidelineSelected}
        onGuidelinePositionChangeEnded={onGuidelinePositionChangeEnded}
        onGuidelinePositionChanged={onGuidelinePositionChanged}
      />
    </div>
  );
}

function HorizontalRuler({ origin }: { origin: number }) {
  // FIXME: the number of items should be calculated based on the width/height of the ruler
  const numList = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="absolute top-0 left-0 h-6 w-full flex text-neutral-400 text-[10px] select-none">
      <div
        className="h-full bg-neutral-200/50 shrink-0 grow-0"
        style={{ width: `${origin}px` }}
      >
        <ol className="flex flex-row-reverse w-full h-full items-end">
          {numList.map((num) => (
            <li
              key={num}
              className="w-[50px] flex flex-col items-start shrink-0"
            >
              <span className="-translate-x-1/2 text-neutral-300 h-[18px] flex flex-col justify-center">
                {-(num + 1) * 50}
              </span>
              <span className="border-l border-neutral-300 w-px h-1.5" />
            </li>
          ))}
        </ol>
      </div>
      <div className="h-full w-full grow bg-neutral-100/50">
        <ol className="flex w-full h-full items-end">
          {numList.map((num) => (
            <li
              key={num}
              className="w-[50px] flex flex-col items-start shrink-0"
            >
              <span className="-translate-x-1/2 h-[18px] flex flex-col justify-center">
                {num * 50}
              </span>
              <span className="border-l w-px h-1.5" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function VerticalRuler({ origin }: { origin: number }) {
  // FIXME: the number of items should be calculated based on the width/height of the ruler
  const numList = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="absolute w-6 top-0 h-full left-0 text-neutral-400 text-[10px]">
      <div className="relative top-0 left-0 h-full w-full flex flex-col">
        <div
          className="w-full bg-neutral-200/50 shrink-0 grow-0"
          style={{ height: `${origin}px` }}
        >
          <ol className="flex flex-col-reverse w-full h-full items-end select-none">
            {numList.map((num) => (
              <li
                key={num}
                className="h-[50px] w-full flex items-end gap-x-px shrink-0"
              >
                <div className="w-full relative">
                  <span className="-rotate-90 origin-top-left text-neutral-300 translate-y-[25px] h-4 absolute w-[50px] text-center">
                    {-num * 50}
                  </span>
                </div>
                <span className="border-b border-neutral-300 h-px w-2 shrink-0 grow-0" />
              </li>
            ))}
          </ol>
        </div>
        <div className="w-full h-full bg-neutral-100/50 grow">
          <ol className="flex flex-col w-full h-full items-end select-none">
            {numList.map((num) => (
              <li
                key={num}
                className="h-[50px] w-full flex items-end gap-x-px shrink-0"
              >
                <div className="w-full relative">
                  <span className="-rotate-90 origin-top-left translate-y-[25px] h-4 absolute w-[50px] text-center">
                    {(num + 1) * 50}
                  </span>
                </div>
                <span className="border-b h-px w-2 shrink-0 grow-0" />
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
      <span className="h-[18px] flex flex-col justify-center pl-1">
        {normalizedX}
      </span>
      <div className="absolute top-0 bg-gradient-to-r from-10% from-transparent via-neutral-100 to-90% to-transparent -z-10 -translate-x-14 h-6 left-0 w-32" />
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
      <div className="absolute top-0 bg-gradient-to-r from-10% from-transparent via-neutral-100 to-90% to-transparent -z-10 -translate-x-14 h-6 left-0 w-32" />
    </div>
  );
}
