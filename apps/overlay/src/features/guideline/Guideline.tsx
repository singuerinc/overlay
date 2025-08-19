import { useSelectedTool } from "@/features/tools/store/tools";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useRef, useState } from "react";
import { GUIDELINE_VERTICAL, type IGuideline } from "./types";

const variantsGuideline = cva(["pointer-events-auto"], {
  variants: {
    locked: {
      true: "cursor-not-allowed",
      false: "cursor-move",
    },
    isDrag: {
      true: "",
      false: "",
    },
    isVertical: {
      true: "h-full w-px border-l",
      false: "w-full h-px border-t",
    },
    color: {
      cyan: "border-cyan-500/20 hover:border-cyan-500/100",
      red: "border-red-500/20 hover:border-red-500/100",
      green: "border-green-500/20 hover:border-green-500/100",
      gray: "border-neutral-500/20 hover:border-neutral-500/100",
    },
    selected: {
      true: "shadow",
      false: "",
    },
    style: {
      solid: "border-solid",
      dashed: "border-dashed",
    },
  },
  compoundVariants: [
    {
      isDrag: true,
      locked: false,
      className: "cursor-move",
    },
    {
      selected: true,
      color: "cyan",
      className: "border-cyan-500/100",
    },
    {
      selected: true,
      color: "red",
      className: "border-red-500/100",
    },
    {
      selected: true,
      color: "green",
      className: "border-green-500/100",
    },
    {
      selected: true,
      color: "gray",
      className: "border-neutral-500/100",
    },
  ],
  defaultVariants: {
    isVertical: true,
    color: "cyan",
    selected: false,
  },
});

export function Guideline({
  guideline,
  style,
  onGuidelineSelected,
  onGuidelinePositionChanged,
  onGuidelinePositionChangeEnded,
}: {
  guideline: IGuideline;
  style: "solid" | "dashed";
  onGuidelineSelected: (guideline: IGuideline) => void;
  onGuidelinePositionChanged: (
    guideline: IGuideline,
    x: number,
    y: number
  ) => void;
  onGuidelinePositionChangeEnded: (
    guideline: IGuideline,
    position: { x: number; y: number }
  ) => void;
}) {
  const selectedTool = useSelectedTool();
  const isSelected = selectedTool?.id === guideline.id;
  const containerRef = useRef<HTMLDivElement>(null);
  const guidelineRef = useRef<HTMLDivElement>(null);

  const [isDrag, setDrag] = useState(false);

  const isVertical = guideline.type === GUIDELINE_VERTICAL || false;

  const handleDown = useCallback(() => {
    onGuidelineSelected(guideline);
    if (!guideline.locked && containerRef.current) {
      setDrag(true);

      onGuidelinePositionChanged(
        guideline,
        isVertical ? guideline.x : 0,
        isVertical ? 0 : guideline.y
      );
    }
  }, [guideline, isVertical, onGuidelinePositionChanged, onGuidelineSelected]);

  const handleUp = useCallback(
    (event: MouseEvent) => {
      if (isDrag && containerRef.current) {
        setDrag(false);

        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const position = {
          x: isVertical ? x : 0,
          y: isVertical ? 0 : y,
        };
        onGuidelinePositionChangeEnded(guideline, position);
      }
    },
    [guideline, isDrag, isVertical, onGuidelinePositionChangeEnded]
  );

  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (isDrag) {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          guidelineRef.current?.style.setProperty(
            "transform",
            `translateX(${isVertical ? x : 0}px) translateY(${isVertical ? 0 : y}px)`
          );

          onGuidelinePositionChanged(
            guideline,
            isVertical ? x : 0,
            isVertical ? 0 : y
          );
        }
      }
    },
    [guideline, isDrag, isVertical, onGuidelinePositionChanged]
  );

  useEffect(() => {
    document.body.addEventListener("mouseup", handleUp);
    document.body.addEventListener("mousemove", handleMove);

    return () => {
      document.body.removeEventListener("mouseup", handleUp);
      document.body.removeEventListener("mousemove", handleMove);
    };
  }, [handleMove, handleUp]);

  useEffect(() => {
    guidelineRef.current?.style.setProperty(
      "transform",
      `translateX(${isVertical ? guideline?.x : 0}px) translateY(${isVertical ? 0 : guideline?.y}px)`
    );
  }, [guideline?.x, guideline?.y, isVertical]);

  if (!guideline) {
    return null;
  }

  const variantsConfig = {
    selected: isSelected,
    color: guideline.color,
    locked: guideline.locked,
    isVertical,
    isDrag,
    style,
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 h-screen w-screen pointer-events-none"
      onMouseDown={handleDown}
    >
      <div ref={guidelineRef} className={variantsGuideline(variantsConfig)} />
    </div>
  );
}
