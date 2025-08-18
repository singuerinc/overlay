import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { useCallback, useState } from "react";
import { GUIDELINE_VERTICAL, type IGuideline } from "./types";

const variantsWrapper = cva(
  [
    "absolute top-0 left-0",
    "flex pointer-events-auto",
    "group hover:opacity-100 transition-colors",
  ],
  {
    variants: {
      locked: {
        true: "cursor-not-allowed",
        false: "cursor-move",
      },
      isVertical: {
        true: "h-screen w-[9px] flex-row justify-center",
        false: "w-screen h-[9px] flex-col justify-center",
      },
      color: {
        cyan: "hover:bg-cyan-500/10",
        red: "hover:bg-red-500/10",
        green: "hover:bg-green-500/10",
      },
      selected: {
        true: "opacity-100",
        false: "opacity-50",
      },
    },
    defaultVariants: {
      isVertical: true,
      color: "cyan",
      selected: false,
    },
  }
);

const variantsGuideline = cva([], {
  variants: {
    isVertical: {
      true: "h-full w-px",
      false: "w-full h-px",
    },
    color: {
      cyan: "bg-cyan-500",
      red: "bg-red-500",
      green: "bg-green-500",
    },
    selected: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    isVertical: true,
    color: "cyan",
    selected: false,
  },
});

const variantsInfo = cva(
  [
    "absolute whitespace-nowrap text-xs tabular-nums hidden group-hover:block bg-neutral-900/20 px-1",
  ],
  {
    variants: {
      isVertical: {
        true: ["top-1 left-3"],
        false: ["top-3 left-1"],
      },
    },
  }
);

export function Guideline<T extends IGuideline>(props: { tool: T }) {
  const { tool } = props;
  const setSelectedTool = useSetSelectedTool();
  const selectedTool = useSelectedTool();
  const isSelected = selectedTool?.id === tool.id;
  const { attributes, listeners, setNodeRef, transform, node } = useDraggable({
    id: tool.id,
    disabled: tool.locked,
  });

  const isVertical = tool.type === GUIDELINE_VERTICAL;

  const x = isVertical ? (transform ? transform.x + tool.x : tool.x) : 0;
  const y =
    tool.type === GUIDELINE_VERTICAL
      ? 0
      : transform
        ? transform.y + tool.y
        : tool.y;
  const style = {
    transform: transform
      ? CSS.Translate.toString({
          x,
          y,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({ x, y, scaleX: 1, scaleY: 1 }),
  };

  const variantsConfig = {
    selected: isSelected,
    color: tool.color,
    locked: tool.locked,
    isVertical: isVertical,
  };

  const [{ posX, posY }, setPos] = useState({ posX: x, posY: y });

  const handleMove = useCallback(() => {
    setPos({
      posX: node.current?.getBoundingClientRect().x || 0,
      posY: node.current?.getBoundingClientRect().y || 0,
    });
  }, [node]);

  return (
    <div
      className={variantsWrapper(variantsConfig)}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => setSelectedTool(tool)}
      onMouseMove={handleMove}
    >
      {
        <div className={variantsInfo(variantsConfig)}>
          {isVertical ? posX + 4 : posY + 4}
        </div>
      }
      <div className={variantsGuideline(variantsConfig)} />
    </div>
  );
}
