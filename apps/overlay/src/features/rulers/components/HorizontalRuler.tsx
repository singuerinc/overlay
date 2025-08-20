import { NormalizedPositionX } from "@/features/rulers/components/NormalizedPositionX";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useWindowSize } from "usehooks-ts";

const variantsWrapper = cva(
  [
    "absolute left-0 h-5",
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
  const windowSize = useWindowSize();
  const numList = Array.from({ length: windowSize.width / 50 }, (_, i) => i);
  return (
    <div className={cn(variantsWrapper({ position: position }))}>
      <div
        className="h-full bg-neutral-200/50 shrink-0 grow-0 overflow-hidden"
        style={{ width: `${origin}px` }}
      >
        <ol className="flex flex-row-reverse w-full h-full items-end">
          {numList.map((num) => (
            <li key={num} className={cn(variantsItem({ position: position }))}>
              <span className="-translate-x-1/2 text-neutral-300 flex flex-col justify-center">
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
