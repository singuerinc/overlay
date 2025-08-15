import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "../../features/tools/store/tools";
import type { IHorizontalGuideline } from "./types";

const variantsWrapper = cva(
  [
    "w-screen flex flex-col justify-center hover:cursor-move group top-0 left-0 absolute",
  ],
  {
    variants: {
      selected: {
        true: "",
        false: "",
      },
    },
  }
);

const variantsGuideline = cva(
  ["w-full h-px bg-red-500/25 group-hover:bg-red-500/100"],
  {
    variants: {
      selected: {
        true: "bg-red-500/100",
        false: "bg-red-500/25",
      },
    },
  }
);

export function HorizontalGuideline(tool: IHorizontalGuideline) {
  const setSelectedTool = useSetSelectedTool();
  const selectedTool = useSelectedTool();
  const isSelected = selectedTool?.id === tool.id;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tool.id,
  });

  const style = {
    height: "9px",
    transform: transform
      ? CSS.Translate.toString({
          x: 0,
          y: transform.y + tool.y - 4,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({ x: 0, y: tool.y - 4, scaleX: 1, scaleY: 1 }),
  };

  return (
    <div
      className={variantsWrapper({ selected: isSelected })}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => setSelectedTool(tool)}
    >
      <div className={variantsGuideline({ selected: isSelected })} />
    </div>
  );
}
