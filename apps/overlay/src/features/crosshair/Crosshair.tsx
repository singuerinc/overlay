import { CrosshairColors } from "@/features/crosshair/CrosshairColor";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import { useNormalizedPosition } from "@/features/rulers/useNormalizedPosition";
import { cva } from "class-variance-authority";
import { useCallback, useRef } from "react";
import { toast } from "sonner";

const variantsWrapper = cva(
  [
    "overlay:absolute overlay:top-0 overlay:left-0 overlay:overflow-hidden",
    "overlay:pointer-events-auto",
    "overlay:group overlay:hover:opacity-100 transition-colors",
    "overlay:h-screen overlay:w-screen",
    "overlay:justify-center overlay:items-center",
  ],
  {
    variants: {
      locked: {
        true: "overlay:cursor-not-allowed",
        false: "overlay:cursor-none",
      },
    },
    defaultVariants: {
      locked: false,
    },
  }
);

const variantsGuideline = cva(["overlay:absolute"], {
  variants: {
    isVertical: {
      true: "overlay:h-screen overlay:w-px overlay:border-l overlay:border-dashed",
      false:
        "overlay:w-screen overlay:h-px overlay:border-t overlay:border-dashed",
    },
    color: {
      cyan: "overlay:border-cyan-500/50",
      red: "overlay:border-red-500/50",
      green: "overlay:border-green-500/50",
    },
  },
  defaultVariants: {
    isVertical: true,
    color: CrosshairColors[1],
  },
});

export function Crosshair() {
  const { data: crosshair } = useCrosshairQuery();
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
      navigator.clipboard.writeText(`{x: ${x}, y: ${y}}`);
      toast(`{x: ${x}, y: ${y}}`);
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
