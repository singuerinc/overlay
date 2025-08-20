import { CrosshairColors } from "@/features/crosshair/CrosshairColor";
import { useGetCrosshairQuery } from "@/features/crosshair/store/useGetCrosshairQuery";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import { useNormalizedPosition } from "@/features/rulers/useNormalizedPosition";
import { cva } from "class-variance-authority";
import { useCallback, useRef } from "react";
import { toast } from "sonner";

const variantsWrapper = cva(
  [
    "absolute top-0 left-0 overflow-hidden",
    "pointer-events-auto",
    "group hover:opacity-100 transition-colors",
    "h-screen w-screen",
    "justify-center items-center",
  ],
  {
    variants: {
      locked: {
        true: "cursor-not-allowed",
        false: "cursor-none",
      },
    },
    defaultVariants: {
      locked: false,
    },
  }
);

const variantsGuideline = cva(["absolute"], {
  variants: {
    isVertical: {
      true: "h-screen w-px border-l border-dashed",
      false: "w-screen h-px border-t border-dashed",
    },
    color: {
      cyan: "border-cyan-500/50",
      red: "border-red-500/50",
      green: "border-green-500/50",
    },
  },
  defaultVariants: {
    isVertical: true,
    color: CrosshairColors[1],
  },
});

export function Crosshair() {
  const { data: crosshair } = useGetCrosshairQuery();
  const { calculate: calculateNormalizePosition } = useNormalizedPosition();
  const setRulerPosition = useRulerSetPosition();

  const containerRef = useRef<HTMLDivElement>(null);
  const hNode = useRef<HTMLDivElement>(null);
  const vNode = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hNode.current?.style.setProperty("transform", `translateY(${y}px)`);
        vNode.current?.style.setProperty("transform", `translateX(${x}px)`);

        const [normalizedX, normalizedY] = calculateNormalizePosition(x, y);
        setRulerPosition(normalizedX, normalizedY);
      }
    },
    [calculateNormalizePosition, setRulerPosition]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const mouseX = event.clientX || 0;
      const mouseY = event.clientY || 0;

      const [x, y] = calculateNormalizePosition(mouseX, mouseY);
      //copy to clipboard
      navigator.clipboard.writeText(`${x}, ${y}`);
      toast(`Copied to clipboard - x:${x}, y:${y}`);
    },
    [calculateNormalizePosition]
  );

  if (!crosshair || !crosshair.visible) {
    return null;
  }

  const variantsConfig = {
    color: crosshair.color,
    locked: crosshair.locked,
  };

  return (
    <div
      id="crosshair-root"
      ref={containerRef}
      className={variantsWrapper(variantsConfig)}
      onClick={handleClick}
      onMouseMove={handleMove}
    >
      <div
        ref={vNode}
        className={variantsGuideline({ ...variantsConfig, isVertical: true })}
      ></div>
      <div
        ref={hNode}
        className={variantsGuideline({
          ...variantsConfig,
          isVertical: false,
        })}
      ></div>
    </div>
  );
}
