import { CrosshairColors } from "@/features/crosshair/CrosshairColor";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { useNormalizedPosition } from "@/features/rulers/hooks/useNormalizedPosition";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useRef, useState } from "react";

const variantsWrapper = cva(
  [
    "o:absolute o:top-0 o:left-0 o:overflow-visible",
    "o:pointer-events-auto",
    "o:group o:hover:opacity-100 transition-colors",
    "o:h-full o:w-full",
    "o:justify-center o:items-center",
  ],
  {
    variants: {},
    defaultVariants: {},
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
      neutral: "o:border-neutral-400",
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
  const [isDrag, setIsDrag] = useState(false);
  const [dragRect, setDragRect] = useState<{
    origin: { x: number; y: number };
    point: { x: number; y: number };
    width: number;
    height: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const hNode = useRef<HTMLDivElement>(null);
  const vNode = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        setIsDrag(true);
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setDragRect({ origin: { x, y }, point: { x, y }, width: 0, height: 0 });
      }
    },
    []
  );

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (containerRef.current && dragRect) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hNode.current?.style.setProperty("transform", `translateY(${y}px)`);
        vNode.current?.style.setProperty("transform", `translateX(${x}px)`);

        const [normalizedX, normalizedY] = calculateNormalizePosition(x, y);
        setRulerPosition(normalizedX, normalizedY);

        const rectWidth = Math.abs(x - (dragRect.origin.x ?? 0));
        const rectHeight = Math.abs(y - (dragRect.origin.y ?? 0));

        setDragRect({
          origin: dragRect.origin,
          point: { x, y },
          width: rectWidth,
          height: rectHeight,
        });
      }
    },
    [calculateNormalizePosition, dragRect, setRulerPosition]
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setIsDrag(false);
      if (containerRef.current && dragRect) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rectWidth = Math.abs(x - (dragRect.origin.x ?? 0));
        const rectHeight = Math.abs(y - (dragRect.origin.y ?? 0));

        setDragRect({
          origin: dragRect.origin,
          point: { x, y },
          width: rectWidth,
          height: rectHeight,
        });
      }
    },
    [dragRect]
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
      {isDrag && <MeasureRuler dragRect={dragRect} />}

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

function MeasureRuler({
  dragRect,
}: {
  dragRect: {
    origin: { x: number; y: number };
    point: { x: number; y: number };
    width: number;
    height: number;
  } | null;
}) {
  const vNodeOrigin = useRef<HTMLDivElement>(null);
  const hNodeOrigin = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGLineElement>(null);
  const measureWidthRef = useRef<HTMLDivElement>(null);
  const measureWidthTxtRef = useRef<HTMLSpanElement>(null);
  const measureHeightRef = useRef<HTMLDivElement>(null);
  const measureHeightTxtRef = useRef<HTMLSpanElement>(null);
  const measureOriginTxtRef = useRef<HTMLDivElement>(null);
  const measureCoordsTxtRef = useRef<HTMLDivElement>(null);
  const measureSizeRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (
      hNodeOrigin.current &&
      vNodeOrigin.current &&
      measureRef.current &&
      measureSizeRef.current &&
      measureWidthRef.current &&
      measureWidthTxtRef.current &&
      measureHeightRef.current &&
      measureHeightTxtRef.current &&
      measureOriginTxtRef.current &&
      measureCoordsTxtRef.current &&
      dragRect
    ) {
      hNodeOrigin.current.style.setProperty(
        "transform",
        `translateY(${dragRect.origin.y}px)`
      );
      vNodeOrigin.current.style.setProperty(
        "transform",
        `translateX(${dragRect.origin.x}px)`
      );

      measureOriginTxtRef.current.style.setProperty(
        "transform",
        `translate(${dragRect.origin.x + 2}px, ${dragRect.origin.y - 18}px)`
      );
      measureCoordsTxtRef.current.style.setProperty(
        "transform",
        `translate(${dragRect.point.x + 4}px, ${dragRect.point.y + 4}px)`
      );

      measureRef.current.setAttribute("x1", String(dragRect.origin.x));
      measureRef.current.setAttribute("y1", String(dragRect.origin.y));

      measureSizeRef.current.setAttribute("x", String(dragRect.origin.x));
      measureSizeRef.current.setAttribute("y", String(dragRect.origin.y));

      measureRef.current.setAttribute("x2", String(dragRect.point.x));
      measureRef.current.setAttribute("y2", String(dragRect.point.y));
      if (dragRect.origin.x > dragRect.point.x) {
        measureSizeRef.current.setAttribute("x", String(dragRect.point.x));
      }
      if (dragRect.origin.y > dragRect.point.y) {
        measureSizeRef.current.setAttribute("y", String(dragRect.point.y));
      }
      measureSizeRef.current.setAttribute("width", String(dragRect.width));
      measureSizeRef.current.setAttribute("height", String(dragRect.height));
      measureWidthRef.current.style.setProperty(
        "transform",
        `translate(${Math.min(dragRect.point.x, dragRect.origin.x)}px, 0)`
      );
      measureWidthRef.current.style.setProperty("width", `${dragRect.width}px`);

      measureHeightRef.current.style.setProperty(
        "transform",
        `translate(0, ${Math.min(dragRect.point.y, dragRect.origin.y)}px)`
      );
      measureHeightRef.current.style.setProperty(
        "height",
        `${dragRect.height}px`
      );

      measureWidthTxtRef.current.textContent = `${dragRect.width}px`;
      measureHeightTxtRef.current.textContent = `${dragRect.height}px`;
      measureOriginTxtRef.current.textContent = `{x1: ${dragRect.origin.x}, y1: ${dragRect.origin.y}}`;
      measureCoordsTxtRef.current.textContent = `{x2: ${dragRect.point.x}, y2: ${dragRect.point.y}}`;
    }
  }, [dragRect]);

  return (
    <>
      <svg
        width="100%"
        height="100%"
        className="o:absolute o:pointer-events-none"
      >
        <line
          ref={measureRef}
          stroke="oklch(71.5% 0.143 215.221)"
          strokeWidth="1"
        />
        <rect ref={measureSizeRef} fill="rgba(255, 0, 0, 0)" />
      </svg>
      <div
        ref={vNodeOrigin}
        className={variantsGuideline({ color: "neutral", isVertical: true })}
      />
      <div
        ref={hNodeOrigin}
        className={variantsGuideline({
          color: "neutral",
          isVertical: false,
        })}
      />
      <div
        ref={measureWidthRef}
        className="o:absolute o:border-red-600 o:border-x o:bg-neutral-900/10 o:top-0 o:left-0 o:h-5 o:justify-center o:items-center o:w-6 o:flex o:font-mono o:text-xs o:text-neutral-500 o:select-none"
      >
        <div className="o:absolute o:w-full o:h-px o:bg-red-600" />
        <span
          ref={measureWidthTxtRef}
          className="o:bg-red-100 o:px-1 o:z-10 o:border o:rounded-sm o:border-red-600 o:text-red-600"
        ></span>
      </div>
      <div
        ref={measureHeightRef}
        className="o:absolute o:border-red-600 o:border-y o:bg-neutral-900/10 o:left-0 o:top-0 o:w-5 o:items-center o:justify-center o:h-6 o:flex o:font-mono o:text-xs o:text-neutral-500 o:select-none"
      >
        <div className="o:absolute o:h-full o:w-px o:bg-red-600" />
        <span
          ref={measureHeightTxtRef}
          className="o:-rotate-90 o:bg-neutral-100 o:px-1 o:z-10 o:border o:rounded-sm o:border-red-600 o:text-red-600"
        ></span>
      </div>
      <div
        ref={measureOriginTxtRef}
        className="o:absolute o:bg-neutral-950/30 o:font-mono o:text-xs o:text-neutral-50 o:select-none"
      />
      <div
        ref={measureCoordsTxtRef}
        className="o:absolute o:bg-neutral-950/30 o:font-mono o:text-xs o:text-neutral-50 o:select-none"
      />
    </>
  );
}
