import { useCoords } from "@/features/coords/hooks/useCoords";
import { useGridQuery } from "@/features/grid/store/useGridQuery";
import { useGuideline } from "@/features/guideline/hooks/useGuideline";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { cn } from "@/ui/cn";
import { cva } from "class-variance-authority";
import { useCallback, useMemo, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/packages/react-hotkeys-hook/dist/types";
import { Rnd } from "react-rnd";
import { useOnClickOutside } from "usehooks-ts";
import { GUIDELINE_VERTICAL, type IGuideline } from "./types";

const variantsGuideline = cva(["o:group o:focus:outline-none o:z-50"], {
  variants: {
    locked: {
      true: "o:cursor-not-allowed",
      false: "o:cursor-move",
    },
    isDrag: {
      true: "",
      false: "",
    },
    isVertical: {
      true: "o:h-full o:w-px o:border-l",
      false: "o:w-full o:h-px o:border-t",
    },
    color: {
      cyan: "o:border-cyan-500/40 hover:o:border-cyan-500/100",
      red: "o:border-red-500/40 hover:o:border-red-500/100",
      green: "o:border-green-500/40 hover:o:border-green-500/100",
      neutral: "o:border-neutral-500/40 hover:o:border-neutral-500/100",
    },
    selected: {
      true: "",
      false: "",
    },
    style: {
      solid: "o:border-solid",
      dashed: "o:border-dashed",
    },
  },
  compoundVariants: [
    {
      isDrag: true,
      locked: false,
      className: "o:cursor-move",
    },
    {
      selected: true,
      color: "cyan",
      className: "o:border-cyan-500/100",
    },
    {
      selected: true,
      color: "red",
      className: "o:border-red-500/100",
    },
    {
      selected: true,
      color: "green",
      className: "o:border-green-500/100",
    },
    {
      selected: true,
      color: "neutral",
      className: "o:border-neutral-500/100",
    },
  ],
  defaultVariants: {
    isVertical: true,
    color: "cyan",
    selected: false,
  },
});

export function Guideline({
  id,
  style,
}: {
  id: IGuideline["id"];
  style: "solid" | "dashed";
}) {
  const { data: workspace } = useWorkspaceQuery();
  const { data: grid } = useGridQuery();
  const { setX, setY } = useCoords();
  const { data: guideline } = useGuidelineByIdQuery(id);
  const selectedTool = useSelectedTool();
  const { move } = useGuideline();
  const setSelectedTool = useSetSelectedTool();
  const isSelected = useMemo(
    () => selectedTool?.id === guideline?.id,
    [selectedTool, guideline?.id]
  );
  const ref = useRef<HTMLDivElement>(null);

  const onGuidelinePositionChangeEnded = useCallback(
    (guideline: IGuideline, x: number, y: number) => {
      move(guideline, { x, y });
    },
    [move]
  );

  useOnClickOutside(ref, () => {
    if (selectedTool?.id === guideline?.id) {
      setSelectedTool(null);
    }
  });

  const isVertical = guideline?.type === GUIDELINE_VERTICAL ? true : false;

  useGuidelineKeyboardShortcuts({
    guideline,
    isSelected,
    isVertical,
    onGuidelinePositionChanged: (guideline, x, y) => {
      onGuidelinePositionChangeEnded(guideline, x, y);
    },
  });

  if (!guideline || !grid || !workspace) {
    return null;
  }

  const variantsConfig = {
    selected: isSelected,
    color: guideline.color,
    locked: guideline.locked,
    isVertical,
    style,
  };

  const shouldSnap = workspace.snapToGrid;
  const gridGap = grid.gapX;
  const snapGrid: [number, number] = shouldSnap ? [gridGap, gridGap] : [1, 1];

  return (
    <Rnd
      disableDragging={guideline.locked}
      dragAxis={isVertical ? "x" : "y"}
      enableResizing={false}
      size={{ width: isVertical ? 1 : "100%", height: isVertical ? "100%" : 1 }}
      dragGrid={snapGrid}
      position={{ x: guideline.x, y: guideline.y }}
      onDrag={(_e, d) => {
        if (isVertical) {
          setX(d.x);
        } else {
          setY(d.y);
        }
      }}
      onMouseDown={() => {
        setSelectedTool(guideline);
      }}
      // onDragStart={() => {
      //   setSelectedTool(guideline);
      // }}
      onDragStop={(_e, d) => {
        move(guideline, { x: d.x, y: d.y });
      }}
    >
      <div
        data-overlay-guideline-id={guideline.id}
        data-overlay-tool-type="guideline"
        ref={ref}
        className={cn(
          "o:absolute o:top-0 o:left-0 o:h-0 o:w-0 o:overflow-visible o:focus:outline-none",
          {
            "o:pointer-events-auto": workspace?.locked === false,
            "o:h-full": isVertical === true,
            "o:w-full": isVertical === false,
          }
        )}
      >
        <div
          tabIndex={0}
          aria-disabled={guideline.locked}
          aria-orientation={isVertical ? "vertical" : "horizontal"}
          aria-selected={isSelected}
          className={variantsGuideline(variantsConfig)}
        />
      </div>
    </Rnd>
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
  const { remove, rotate } = useGuideline();

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
    if (guideline) {
      remove(guideline);
    }
  }, [guideline, isSelected, remove]);

  const handleRotateGuideline = useCallback(() => {
    if (guideline) {
      rotate(guideline);
    }
  }, [guideline, isSelected, rotate]);

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
  useHotkeys(["r"], handleRotateGuideline, {
    enabled: isSelected && guideline && !guideline.locked,
    preventDefault: true,
  });
}
