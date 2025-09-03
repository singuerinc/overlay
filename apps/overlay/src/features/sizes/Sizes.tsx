import { useSizes } from "@/features/sizes/hooks/useSizes";
import { useSelectedTool } from "@/features/tools/store/tools";
import { cn } from "@/ui/cn";
import { useEffect } from "react";

export function Sizes() {
  const { x0, y0, x1, y1, setX0, setY0, setX1, setY1 } = useSizes();
  const selectedTool = useSelectedTool();

  useEffect(() => {
    if (!selectedTool) {
      setX0(null);
      setY0(null);
      setX1(null);
      setY1(null);
    }
  }, [selectedTool]);

  return (
    <div
      data-overlay-tool-type="sizes"
      className={cn("o:absolute o:left-0 o:top-0", "o:w-full o:h-full")}
    >
      {x0 !== null && x1 !== null && (
        <div
          className="o:absolute o:border-red-600 o:border-x o:top-0 o:left-0 o:h-5 o:justify-center o:items-center o:w-6 o:flex o:font-mono o:text-xs o:text-neutral-500 o:select-none"
          style={{
            transform: `translate(${Math.min(x0, x1)}px, 22px)`,
            width: `${Math.abs(x1 - x0)}px`,
          }}
        >
          <div className="o:absolute o:w-full o:h-px o:bg-red-600" />
          <span className="o:bg-red-100 o:px-1 o:z-10 o:border o:rounded-sm o:border-red-600 o:text-red-600">
            {Math.abs(x1 - x0)}px
          </span>
        </div>
      )}
      {y0 !== null && y1 !== null && (
        <div
          className="o:absolute o:border-red-600 o:border-y o:left-0 o:top-0 o:w-5 o:items-center o:justify-center o:h-6 o:flex o:font-mono o:text-xs o:text-neutral-500 o:select-none"
          style={{
            transform: `translate(22px, ${Math.min(y0, y1)}px)`,
            height: `${Math.abs(y1 - y0)}px`,
          }}
        >
          <div className="o:absolute o:h-full o:w-px o:bg-red-600" />
          <span className="o:-rotate-90 o:bg-neutral-100 o:px-1 o:z-10 o:border o:rounded-sm o:border-red-600 o:text-red-600">
            {Math.abs(y1 - y0)}px
          </span>
        </div>
      )}
    </div>
  );
}
