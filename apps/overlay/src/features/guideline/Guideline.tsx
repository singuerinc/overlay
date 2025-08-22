import { useGuidelineMove } from "@/features/guideline/hooks/useGuidelineMove";
import { useGuidelineToggleLock } from "@/features/guideline/hooks/useGuidelineToggleLock";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { useGuidelineRemoveCommand } from "@/features/guideline/store/useGuidelineRemoveCommand";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/packages/react-hotkeys-hook/dist/types";
import { GUIDELINE_VERTICAL, type IGuideline } from "./types";

const variantsGuideline = cva(
  ["overlay:pointer-events-auto focus:overlay:outline-none"],
  {
    variants: {
      locked: {
        true: "overlay:cursor-not-allowed",
        false: "overlay:cursor-move",
      },
      isDrag: {
        true: "",
        false: "",
      },
      isVertical: {
        true: "overlay:h-screen overlay:w-px overlay:border-l",
        false: "overlay:w-screen overlay:h-px overlay:border-t",
      },
      color: {
        cyan: "overlay:border-cyan-500/40 hover:overlay:border-cyan-500/100",
        red: "overlay:border-red-500/40 hover:overlay:border-red-500/100",
        green: "overlay:border-green-500/40 hover:overlay:border-green-500/100",
        gray: "overlay:border-neutral-500/40 hover:overlay:border-neutral-500/100",
      },
      selected: {
        true: "",
        false: "",
      },
      style: {
        solid: "overlay:border-solid",
        dashed: "overlay:border-dashed",
      },
    },
    compoundVariants: [
      {
        isDrag: true,
        locked: false,
        className: "overlay:cursor-move",
      },
      {
        selected: true,
        color: "cyan",
        className: "overlay:border-cyan-500/100",
      },
      {
        selected: true,
        color: "red",
        className: "overlay:border-red-500/100",
      },
      {
        selected: true,
        color: "green",
        className: "overlay:border-green-500/100",
      },
      {
        selected: true,
        color: "gray",
        className: "overlay:border-neutral-500/100",
      },
    ],
    defaultVariants: {
      isVertical: true,
      color: "cyan",
      selected: false,
    },
  }
);

export function Guideline({
  id,
  style,
  originX,
  originY,
}: {
  id: string;
  style: "solid" | "dashed";
  originX: number;
  originY: number;
}) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const selectedTool = useSelectedTool();
  const rulerSetPosition = useRulerSetPosition();
  const { move } = useGuidelineMove();
  const { toggleLock } = useGuidelineToggleLock();
  const setSelectedTool = useSetSelectedTool();
  const isSelected = useMemo(
    () => selectedTool?.id === guideline?.id,
    [selectedTool, guideline?.id]
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const guidelineRef = useRef<HTMLDivElement>(null);

  const [isDrag, setDrag] = useState(false);

  const onGuidelinePositionChanged = useCallback(
    (_: IGuideline, x: number | null, y: number | null) => {
      rulerSetPosition(x, y);
    },
    [rulerSetPosition]
  );

  const onGuidelinePositionChangeEnded = useCallback(
    (guideline: IGuideline, x: number, y: number) => {
      move(guideline, { x, y });
    },
    [move]
  );

  const onGuidelineSelected = useCallback(
    (guideline: IGuideline) => {
      setSelectedTool(guideline);
    },
    [setSelectedTool]
  );

  const isVertical = guideline?.type === GUIDELINE_VERTICAL ? true : false;

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
    if (guideline) {
      onGuidelineSelected(guideline);
    }
  }, [guideline, onGuidelineSelected]);

  const handleDown = useCallback(() => {
    if (guideline && !guideline.locked && containerRef.current) {
      setDrag(true);

      onGuidelinePositionChanged(
        guideline,
        isVertical ? guideline.x : null,
        isVertical ? null : guideline.y
      );
    }
  }, [guideline, isVertical, onGuidelinePositionChanged]);

  const handleDoubleClick = useCallback(() => {
    if (guideline) {
      toggleLock(guideline);
    }
  }, [guideline, toggleLock]);

  const handleUp = useCallback(
    (event: MouseEvent) => {
      if (guideline && isDrag && containerRef.current) {
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
      if (guideline && isDrag && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const normalizedX = event.clientX - rect.left;
        const normalizedY = event.clientY - rect.top;
        const x = isVertical ? normalizedX : -(originX ?? 0);
        const y = isVertical ? -(originY ?? 0) : normalizedY;
        // const snapX = Math.round(x / 10) * 10;
        // const snapY = Math.round(y / 10) * 10;

        guidelineRef.current?.style.setProperty(
          "transform",
          `translateX(${x}px) translateY(${y}px)`
        );

        onGuidelinePositionChanged(
          guideline,
          isVertical ? normalizedX : null,
          isVertical ? null : normalizedY
        );
      }
    },
    [
      guideline,
      isDrag,
      isVertical,
      onGuidelinePositionChanged,
      originX,
      originY,
    ]
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
      `translateX(${isVertical ? guideline?.x : -(originX ?? 0)}px) translateY(${isVertical ? -(originY ?? 0) : guideline?.y}px)`
    );
  }, [guideline, isVertical, originX, originY]);

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
      data-overlay-guideline-id={guideline.id}
      data-overlay-tool-type="guideline"
      ref={containerRef}
      className="overlay:absolute overlay:top-0 overlay:left-0 overlay:h-0 overlay:w-0 overlay:overflow-visible overlay:pointer-events-none"
      onMouseDown={handleDown}
      onDoubleClick={handleDoubleClick}
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
  guideline?: IGuideline;
  isSelected: boolean;
  isVertical: boolean;
  onGuidelinePositionChanged: (
    guideline: IGuideline,
    x: number,
    y: number
  ) => void;
}) {
  const removeGuidelineCommand = useGuidelineRemoveCommand();

  const left = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (guideline) {
        const amount = hotkeysEvent.shift ? 10 : 1;
        onGuidelinePositionChanged(
          guideline,
          guideline.x - amount,
          guideline.y
        );
      }
    },
    [guideline, onGuidelinePositionChanged]
  );

  const right = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (guideline) {
        const amount = hotkeysEvent.shift ? 10 : 1;
        onGuidelinePositionChanged(
          guideline,
          guideline.x + amount,
          guideline.y
        );
      }
    },
    [guideline, onGuidelinePositionChanged]
  );

  const down = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (guideline) {
        const amount = hotkeysEvent.shift ? 10 : 1;
        onGuidelinePositionChanged(
          guideline,
          guideline.x,
          guideline.y + amount
        );
      }
    },
    [guideline, onGuidelinePositionChanged]
  );

  const up = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (guideline) {
        const amount = hotkeysEvent.shift ? 10 : 1;
        onGuidelinePositionChanged(
          guideline,
          guideline.x,
          guideline.y - amount
        );
      }
    },
    [guideline, onGuidelinePositionChanged]
  );

  const handleRemoveGuideline = useCallback(() => {
    if (!isSelected) {
      return;
    }
    if (guideline) {
      removeGuidelineCommand.execute(guideline);
    }
  }, [guideline, isSelected, removeGuidelineCommand]);

  useHotkeys(["up", "shift+up"], up, {
    enabled: isSelected && guideline && !guideline.locked && !isVertical,
    preventDefault: true,
  });
  useHotkeys(["down", "shift+down"], down, {
    enabled: isSelected && guideline && !guideline.locked && !isVertical,
    preventDefault: true,
  });
  useHotkeys(["left", "shift+left"], left, {
    enabled: isSelected && guideline && !guideline.locked && isVertical,
    preventDefault: true,
  });
  useHotkeys(["right", "shift+right"], right, {
    enabled: isSelected && guideline && !guideline.locked && isVertical,
    preventDefault: true,
  });
  useHotkeys(["delete", "backspace"], handleRemoveGuideline, {
    enabled: isSelected && guideline && !guideline.locked,
    preventDefault: true,
  });
}
