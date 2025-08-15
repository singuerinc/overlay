import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "../../features/tools/store/tools";
import type { IGuideline } from "./types";

const variantsWrapper = cva(
  [
    "absolute top-0 left-0",
    "flex",
    "group hover:opacity-100 hover:cursor-move",
  ],
  {
    variants: {
      isVertical: {
        true: "h-screen w-[9px] flex-row justify-center",
        false: "w-screen h-[9px] flex-col justify-center",
      },
      color: {
        cyan: "hover:bg-cyan-500/10",
        red: "hover:bg-red-500/10",
      },
      selected: {
        true: "opacity-100",
        false: "opacity-25",
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

export function Guideline<T extends IGuideline>(props: { tool: T }) {
  const { tool } = props;
  const setSelectedTool = useSetSelectedTool();
  const selectedTool = useSelectedTool();
  const isSelected = selectedTool?.id === tool.id;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tool.id,
  });

  const x =
    tool.type === "guideline-vertical"
      ? transform
        ? transform.x + tool.x
        : tool.x
      : 0;
  const y =
    tool.type === "guideline-vertical"
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

  return (
    <div
      className={variantsWrapper({
        selected: isSelected,
        isVertical: tool.type === "guideline-vertical",
      })}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => setSelectedTool(tool)}
    >
      <div
        className={variantsGuideline({
          selected: isSelected,
          isVertical: tool.type === "guideline-vertical",
        })}
      />
    </div>
  );
}
