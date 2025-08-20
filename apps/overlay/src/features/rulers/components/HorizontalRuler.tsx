import { NormalizedPositionX } from "@/features/rulers/components/NormalizedPositionX";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useSetOriginRulerCommand } from "@/features/rulers/store/useSetOriginRulerCommand";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

const variantsWrapper = cva(
  [
    "absolute left-0 h-5 pointer-events-auto",
    "flex w-full",
    "select-none text-neutral-400 text-[9px]",
  ],
  {
    variants: {
      position: {
        top: "top-0",
        bottom: "bottom-0",
      },
    },
  }
);

const variantsItem = cva(["w-[50px] flex items-start shrink-0"], {
  variants: {
    position: {
      top: "flex-col",
      bottom: "flex-col-reverse",
    },
  },
});

export function HorizontalRuler({ origin }: { origin: number }) {
  const position = "bottom";
  const { data: ruler } = useGetRulerQuery();
  const setOriginRulerCommand = useSetOriginRulerCommand();
  const windowSize = useWindowSize();
  const numList = Array.from({ length: windowSize.width / 50 }, (_, i) => i);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setOriginRulerCommand.execute(x, ruler?.originY ?? 0);
    },
    [setOriginRulerCommand, ruler]
  );

  return (
    <div
      onClick={handleClick}
      className={cn(variantsWrapper({ position: position }))}
    >
      <div
        className="h-full bg-neutral-300/50 shrink-0 grow-0 overflow-hidden"
        style={{ width: `${origin}px` }}
      >
        <ol className="flex flex-row-reverse w-full h-full items-end">
          {numList.map((num) => (
            <li key={num} className={cn(variantsItem({ position: position }))}>
              <span className="-translate-x-1/2 flex flex-col justify-center">
                {-(num + 1) * 50}
              </span>
              <span className="border-l border-neutral-400 w-px h-1.5" />
            </li>
          ))}
        </ol>
      </div>
      <div className="h-full w-full grow bg-neutral-100/50">
        <ol className="flex w-full h-full items-end">
          {numList.map((num) => (
            <li key={num} className={cn(variantsItem({ position: position }))}>
              <span className="-translate-x-1/2 flex flex-col justify-center">
                {num * 50}
              </span>
              <span className="border-l w-px h-1.5" />
            </li>
          ))}
        </ol>
      </div>
      <NormalizedPositionX />
    </div>
  );
}
