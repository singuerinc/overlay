import { useRemoveGuidelineCommand } from "@/features/guideline/store/useRemoveGuidelineCommand";
import { useSelectedTool } from "@/features/tools/store/tools";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/packages/react-hotkeys-hook/dist/types";
import { GUIDELINE_VERTICAL, type IGuideline } from "./types";

const variantsGuideline = cva(["pointer-events-auto focus:outline-none"], {
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
      cyan: "border-cyan-500/40 hover:border-cyan-500/100",
      red: "border-red-500/40 hover:border-red-500/100",
      green: "border-green-500/40 hover:border-green-500/100",
      gray: "border-neutral-500/40 hover:border-neutral-500/100",
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
    x: number,
    y: number
  ) => void;
}) {
  const selectedTool = useSelectedTool();
  const isSelected = useMemo(
    () => selectedTool?.id === guideline.id,
    [selectedTool, guideline.id]
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const guidelineRef = useRef<HTMLDivElement>(null);

  const [isDrag, setDrag] = useState(false);

  const isVertical = guideline.type === GUIDELINE_VERTICAL ? true : false;

  useGuidelineKeyboardShortcuts({
    guideline,
    isSelected,
    isVertical,
    onGuidelinePositionChanged: (guideline, x, y) => {
      onGuidelinePositionChanged(guideline, x, y);
      onGuidelinePositionChangeEnded(guideline, x, y);
    },
  });

  const handleOnFocus = useCallback(() => {
    onGuidelineSelected(guideline);
  }, [guideline, onGuidelineSelected]);

  const handleDown = useCallback(() => {
    if (!guideline.locked && containerRef.current) {
      setDrag(true);

      onGuidelinePositionChanged(
        guideline,
        isVertical ? guideline.x : 0,
        isVertical ? 0 : guideline.y
      );
    }
  }, [guideline, isVertical, onGuidelinePositionChanged]);

  const handleUp = useCallback(
    (event: MouseEvent) => {
      if (isDrag && containerRef.current) {
        setDrag(false);

        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        onGuidelinePositionChangeEnded(
          guideline,
          isVertical ? x : 0,
          isVertical ? 0 : y
        );
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
  }, [guideline, isVertical]);

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
      <div
        ref={guidelineRef}
        tabIndex={0}
        onFocus={handleOnFocus}
        aria-disabled={guideline.locked}
        aria-orientation={isVertical ? "vertical" : "horizontal"}
        aria-selected={isSelected}
        className={variantsGuideline(variantsConfig)}
      />
    </div>
  );
}

function useGuidelineKeyboardShortcuts({
  guideline,
  isSelected,
  isVertical,
  onGuidelinePositionChanged,
}: {
  guideline: IGuideline;
  isSelected: boolean;
  isVertical: boolean;
  onGuidelinePositionChanged: (
    guideline: IGuideline,
    x: number,
    y: number
  ) => void;
}) {
  const removeGuidelineCommand = useRemoveGuidelineCommand();

  const left = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      const amount = hotkeysEvent.shift ? 10 : 1;
      onGuidelinePositionChanged(guideline, guideline.x - amount, guideline.y);
    },
    [guideline, onGuidelinePositionChanged]
  );

  const right = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      const amount = hotkeysEvent.shift ? 10 : 1;
      onGuidelinePositionChanged(guideline, guideline.x + amount, guideline.y);
    },
    [guideline, onGuidelinePositionChanged]
  );

  const down = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      const amount = hotkeysEvent.shift ? 10 : 1;
      onGuidelinePositionChanged(guideline, guideline.x, guideline.y + amount);
    },
    [guideline, onGuidelinePositionChanged]
  );

  const up = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      const amount = hotkeysEvent.shift ? 10 : 1;
      onGuidelinePositionChanged(guideline, guideline.x, guideline.y - amount);
    },
    [guideline, onGuidelinePositionChanged]
  );

  const handleRemoveGuideline = useCallback(() => {
    if (!isSelected) {
      return;
    }
    removeGuidelineCommand.execute(guideline);
  }, [guideline, isSelected, removeGuidelineCommand]);

  useHotkeys(["up", "shift+up"], up, {
    enabled: isSelected && !guideline.locked && !isVertical,
    preventDefault: true,
  });
  useHotkeys(["down", "shift+down"], down, {
    enabled: isSelected && !guideline.locked && !isVertical,
    preventDefault: true,
  });
  useHotkeys(["left", "shift+left"], left, {
    enabled: isSelected && !guideline.locked && isVertical,
    preventDefault: true,
  });
  useHotkeys(["right", "shift+right"], right, {
    enabled: isSelected && !guideline.locked && isVertical,
    preventDefault: true,
  });
  useHotkeys(["delete", "backspace"], handleRemoveGuideline, {
    enabled: isSelected && !guideline.locked,
    preventDefault: true,
  });
}
