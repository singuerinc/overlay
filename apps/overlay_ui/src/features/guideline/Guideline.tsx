import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { useMoveGuidelineCommand } from "@/features/guideline/store/useMoveGuidelineCommand";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useRef, useState } from "react";
import { GUIDELINE_VERTICAL } from "./types";

const variantsGuideline = cva(["pointer-events-auto"], {
  variants: {
    isDrag: {
      true: "cursor-move",
      false: "cursor-move",
    },
    isVertical: {
      true: "h-full w-px",
      false: "w-full h-px",
    },
    color: {
      cyan: "bg-cyan-500/20 hover:bg-cyan-500/100",
      red: "bg-red-500/20 hover:bg-red-500/100",
      green: "bg-green-500/20 hover:bg-green-500/100",
    },
    selected: {
      true: "shadow",
      false: "",
    },
  },
  compoundVariants: [
    {
      selected: true,
      color: "cyan",
      className: "bg-cyan-500/100",
    },
    {
      selected: true,
      color: "red",
      className: "bg-red-500/100",
    },
    {
      selected: true,
      color: "green",
      className: "bg-green-500/100",
    },
  ],
  defaultVariants: {
    isVertical: true,
    color: "cyan",
    selected: false,
  },
});

export function Guideline({ id }: { id: string }) {
  const { data: guidelines } = useGetGuidelinesQuery();
  const guideline = guidelines?.find((g) => g.id === id);
  const setSelectedTool = useSetSelectedTool();
  const selectedTool = useSelectedTool();
  const isSelected = selectedTool?.id === guideline?.id;
  const ref = useRef<HTMLDivElement>(null);
  const moveGuidelineCommand = useMoveGuidelineCommand();
  const [isDrag, setDrag] = useState(false);
  const rulerSetPosition = useRulerSetPosition();

  const isVertical = guideline?.type === GUIDELINE_VERTICAL || false;

  const handleDown = useCallback(() => {
    setDrag(true);
    if (isVertical) {
      rulerSetPosition(guideline?.x ?? null, null);
    } else {
      rulerSetPosition(null, guideline?.y ?? null);
    }
  }, [guideline?.x, guideline?.y, isVertical, rulerSetPosition]);

  const handleUp = useCallback(
    (event: MouseEvent) => {
      if (isDrag) {
        setDrag(false);
        // console.log(event.clientX, event.clientY);

        const position = {
          x: isVertical ? event.clientX : 0,
          y: isVertical ? 0 : event.clientY,
        };

        if (guideline) {
          moveGuidelineCommand.execute(guideline.id, position);
        }
      }
    },
    [guideline, isDrag, isVertical, moveGuidelineCommand]
  );

  const handleClick = useCallback(() => {
    if (guideline) {
      setSelectedTool(guideline);
    }
  }, [guideline, setSelectedTool]);

  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (isDrag) {
        ref.current?.style.setProperty(
          "transform",
          `translateX(${isVertical ? event.clientX : 0}px) translateY(${isVertical ? 0 : event.clientY}px)`
        );

        rulerSetPosition(
          isVertical ? event.clientX : null,
          isVertical ? null : event.clientY
        );
      }
    },
    [isDrag, isVertical, rulerSetPosition]
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
    ref.current?.style.setProperty(
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
    isVertical: isVertical,
    isDrag,
  };

  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen pointer-events-none"
      onMouseDown={handleDown}
      onClick={handleClick}
    >
      <div ref={ref} className={variantsGuideline(variantsConfig)} />
    </div>
  );
}
