import { CrosshairColors } from "@/features/crosshair/CrosshairColor";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import { useNormalizedPosition } from "@/features/rulers/useNormalizedPosition";
import { cva } from "class-variance-authority";
import { useCallback, useRef, useState } from "react";

const variantsWrapper = cva(
  [
    "o:absolute o:top-0 o:left-0 o:overflow-visible",
    "o:pointer-events-auto",
    "o:group o:hover:opacity-100 transition-colors",
    "o:h-full o:w-full",
    "o:justify-center o:items-center",
  ],
  {
    variants: {
      locked: {
        true: "o:cursor-not-allowed",
        false: "o:cursor-none",
      },
    },
    defaultVariants: {
      locked: false,
    },
  }
);

const variantsGuideline = cva(["o:absolute"], {
  variants: {
    isVertical: {
      true: "o:h-screen o:w-px o:border-l o:border-dashed",
      false: "o:w-screen o:h-px o:border-t o:border-dashed",
    },
    color: {
      cyan: "o:border-cyan-500",
      red: "o:border-red-500",
      green: "o:border-green-500",
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
  const [dragCoords, setDragCoords] = useState<{ x: number; y: number } | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGLineElement>(null);
  const measureSizeTxtRef = useRef<HTMLDivElement>(null);
  const measureSizeRef = useRef<SVGRectElement>(null);
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

        if (
          dragCoords &&
          containerRef.current &&
          measureRef.current &&
          measureSizeRef.current &&
          measureSizeTxtRef.current
        ) {
          const rectWidth = Math.abs(x - (dragCoords?.x ?? 0));
          const rectHeight = Math.abs(y - (dragCoords?.y ?? 0));

          // measureRef.current.style.setProperty("display", "block");
          measureRef.current.setAttribute("x2", String(x));
          measureRef.current.setAttribute("y2", String(y));
          if (dragCoords.x > x) {
            measureSizeRef.current.setAttribute("x", String(x));
          }
          if (dragCoords.y > y) {
            measureSizeRef.current.setAttribute("y", String(y));
          }
          measureSizeRef.current.setAttribute("width", String(rectWidth));
          measureSizeRef.current.setAttribute("height", String(rectHeight));
          measureSizeTxtRef.current.style.setProperty(
            "transform",
            `translate(${x + 4}px, ${y + 4}px)`
          );
          measureSizeTxtRef.current.textContent = `{x: ${x}, y: ${y}, width: ${rectWidth}, height: ${rectHeight}}`;

          // measureRef.current.style.setProperty("width", `${rectWidth}px`);
          // measureRef.current.style.setProperty("height", `${rectHeight}px`);
        }
      }
    },
    [calculateNormalizePosition, dragCoords, setRulerPosition]
  );

  // const handleClick = useCallback(
  //   (event: React.MouseEvent<HTMLDivElement>) => {
  //     const mouseX = event.clientX || 0;
  //     const mouseY = event.clientY || 0;

  //     const [x, y] = calculateNormalizePosition(mouseX, mouseY);
  //     navigator.clipboard.writeText(`{x: ${x}, y: ${y}}`);
  //     toast(`{x: ${x}, y: ${y}}`);
  //   },
  //   [calculateNormalizePosition]
  // );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        containerRef.current &&
        measureRef.current &&
        measureSizeRef.current
      ) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // measureRef.current.style.setProperty("display", "none");
        // measureRef.current.style.setProperty("width", "1");
        // measureRef.current.style.setProperty("height", "1");

        setDragCoords({ x, y });
        measureRef.current.setAttribute("x1", String(x));
        measureRef.current.setAttribute("y1", String(y));
        measureSizeRef.current.setAttribute("width", "0");
        measureSizeRef.current.setAttribute("height", "0");
        measureSizeRef.current.setAttribute("x", String(x));
        measureSizeRef.current.setAttribute("y", String(y));
        // measureRef.current.style.setProperty(
        //   "transform",
        //   `translateX(${x}px) translateY(${y}px)`
        // );
      }
    },
    []
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        containerRef.current &&
        measureRef.current &&
        measureSizeRef.current
      ) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rectWidth = Math.abs(x - (dragCoords?.x ?? 0));
        const rectHeight = Math.abs(y - (dragCoords?.y ?? 0));

        if (rectWidth === 0 && rectHeight === 0) {
          // measureRef.current.style.setProperty("display", "none");
        } else {
          measureRef.current.setAttribute("x2", String(x));
          measureRef.current.setAttribute("y2", String(y));
          // measureRef.current.style.setProperty("width", `${rectWidth}px`);
          // measureRef.current.style.setProperty("height", `${rectHeight}px`);
          measureSizeRef.current.setAttribute("width", String(rectWidth));
          measureSizeRef.current.setAttribute("height", String(rectHeight));
          // measureSizeRef.current.textContent = `{x: ${x}, y: ${y}, width: ${rectWidth}, height: ${rectHeight}}`;
        }
      }
      setDragCoords(null);
    },
    [dragCoords?.x, dragCoords?.y]
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
      // onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMove}
    >
      <div
        ref={measureSizeTxtRef}
        className="o:absolute o:bg-neutral-950 o:text-neutral-50 o:select-none"
      ></div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100% 100%"
        className="o:absolute o:pointer-events-none"
      >
        <line ref={measureRef} stroke="rgba(255, 0, 0, 1)" stroke-width="1" />
        <rect ref={measureSizeRef} fill="rgba(255, 0, 0, 0.2)" />
      </svg>
      <div
        ref={vNode}
        className={variantsGuideline({ ...variantsConfig, isVertical: true })}
      />
      <div
        ref={hNode}
        className={variantsGuideline({
          ...variantsConfig,
          isVertical: false,
        })}
      />
    </div>
  );
}
