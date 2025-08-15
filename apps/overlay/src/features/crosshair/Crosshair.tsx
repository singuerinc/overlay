import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { cva } from "class-variance-authority";
import { useCallback, useRef, useState } from "react";
import { type ICrosshair } from "./types";

const variantsWrapper = cva(
  [
    "relative top-0 left-0 bg-transparent",
    "pointer-events-auto",
    "overflow-visible",
    "group hover:opacity-100 transition-colors",
    "h-screen w-screen",
    "justify-center items-center",
  ],
  {
    variants: {
      locked: {
        true: "cursor-not-allowed",
        false: "cursor-move",
      },
    },
    defaultVariants: {
      locked: false,
    },
  }
);

const variantsGuideline = cva(["absolute"], {
  variants: {
    isVertical: {
      true: "h-screen w-px border-l border-dashed",
      false: "w-screen h-px border-t border-dashed",
    },
    color: {
      cyan: "border-cyan-500",
      red: "border-red-500",
      green: "border-green-500",
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
    "absolute top-1 left-1",
    "px-1 py-0.5 rounded-sm",
    "bg-neutral-900/20 text-white",
    "whitespace-nowrap text-xs tabular-nums",
  ],
  {
    variants: {},
  }
);

export function Crosshair(props: { tool: ICrosshair }) {
  const { tool } = props;
  const setSelectedTool = useSetSelectedTool();
  const selectedTool = useSelectedTool();
  const isSelected = selectedTool?.id === tool.id;

  const hNode = useRef<HTMLDivElement>(null);
  const vNode = useRef<HTMLDivElement>(null);

  const variantsConfig = {
    selected: isSelected,
    color: tool.color,
    locked: tool.locked,
  };

  const [{ posX, posY }, setPos] = useState({ posX: 0, posY: 0 });

  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const mouseX = event.clientX || 0;
    const mouseY = event.clientY || 0;

    hNode.current?.style.setProperty("transform", `translateY(${mouseY}px)`);
    vNode.current?.style.setProperty("transform", `translateX(${mouseX}px)`);

    setPos({ posX: mouseX, posY: mouseY });
  }, []);

  return (
    <div
      className={variantsWrapper(variantsConfig)}
      onClick={() => setSelectedTool(tool)}
      onMouseMove={handleMove}
    >
      <div
        ref={vNode}
        className={variantsGuideline({ ...variantsConfig, isVertical: true })}
      >
        <div className={variantsInfo(variantsConfig)}>{posX}</div>
      </div>
      <div
        ref={hNode}
        className={variantsGuideline({ ...variantsConfig, isVertical: false })}
      >
        <div className={variantsInfo(variantsConfig)}>{posY}</div>
      </div>
    </div>
  );
}
