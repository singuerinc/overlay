import { NormalizedPositionY } from "@/features/rulers/components/NormalizedPositionY";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useWindowSize } from "usehooks-ts";

const variantsWrapper = cva(
  [
    "absolute top-0 w-5",
    "flex h-full",
    "select-none text-neutral-400 text-[9px]",
  ],
  {
    variants: {
      position: {
        left: "left-0",
        right: "right-0",
      },
    },
  }
);

const variantsItem = cva(["h-[50px] w-full flex items-end shrink-0"], {
  variants: {
    position: {
      right: "flex-row-reverse",
      left: "flex-row",
    },
  },
});

export function VerticalRuler({ origin }: { origin: number }) {
  const position = "right";
  const windowSize = useWindowSize();
  const numList = Array.from({ length: windowSize.height / 50 }, (_, i) => i);
  return (
    <div className={cn(variantsWrapper({ position: position }))}>
      <div className="h-full w-full flex flex-col">
        <div
          className="w-full bg-neutral-200/50 shrink-0 grow-0 overflow-hidden"
          style={{ height: `${origin}px` }}
        >
          <ol className="flex flex-col-reverse w-full h-full items-end">
            {numList.map((num) => (
              <li
                key={num}
                className={cn(variantsItem({ position: position }))}
              >
                <div className="relative w-full h-full flex justify-center items-center -translate-y-1/2">
                  <div className="w-full" />
                  <span className="absolute -rotate-90">{-(num + 1) * 50}</span>
                </div>
                <span className="border-b border-neutral-300 h-px w-1.5 shrink-0 grow-0" />
              </li>
            ))}
          </ol>
        </div>
        <div className="w-full h-full bg-neutral-100/50 grow">
          <ol className="flex flex-col w-full h-full items-end select-none">
            {numList.map((num) => (
              <li
                key={num}
                className={cn(variantsItem({ position: position }))}
              >
                <div className="relative w-full h-full flex justify-center items-center -translate-y-1/2">
                  <div className="w-full" />
                  <span className="absolute -rotate-90">{num * 50}</span>
                </div>
                <span className="border-b border-neutral-300 h-px w-1.5 shrink-0 grow-0" />
              </li>
            ))}
          </ol>
        </div>
      </div>
      <NormalizedPositionY />
    </div>
  );
}
