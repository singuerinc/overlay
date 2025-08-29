import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { cn } from "@/ui/cn";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { useCallback, useMemo } from "react";

const variantsOnionImage = cva(
  [
    "o:absolute o:active:border-2  o:transition-shadow o:top-0 o:left-0 o:bg-amber-400 o:overflow-visible o:pointer-events-auto focus:o:outline-none",
  ],
  {
    variants: {
      locked: {
        true: "o:cursor-not-allowed",
        false: "o:cursor-move",
      },
      isDrag: {
        true: "",
        false: "",
      },
      selected: {
        true: "o:border-cyan-500 o:active:opacity-50 o:border-2",
        false: "",
      },
    },
    compoundVariants: [
      {
        isDrag: true,
        locked: false,
        className: "o:cursor-move",
      },
    ],
    defaultVariants: {
      selected: false,
    },
  }
);

export function OnionImage({ id }: { id: string }) {
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const selectedTool = useSelectedTool();
  const setSelectedTool = useSetSelectedTool();
  const isSelected = useMemo(
    () => selectedTool?.id === onionImage?.id,
    [selectedTool, onionImage?.id]
  );

  const { listeners, setNodeRef, attributes, transform } = useDraggable({
    id,
    data: {
      x: onionImage?.x ?? 0,
      y: onionImage?.y ?? 0,
    },
  });

  const style = {
    width: (onionImage?.width ?? 0) / 2,
    height: (onionImage?.height ?? 0) / 2,
    transform: transform
      ? CSS.Translate.toString({
          x: (onionImage?.x ?? 0) + transform.x,
          y: (onionImage?.y ?? 0) + transform.y,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({
          x: onionImage?.x ?? 0,
          y: onionImage?.y ?? 0,
          scaleX: 1,
          scaleY: 1,
        }),
  };

  const handleDown = useCallback(() => {
    if (onionImage) {
      setSelectedTool(onionImage);
    }
  }, [onionImage, setSelectedTool]);

  if (!onionImage) {
    return null;
  }

  const variantsConfig = {
    selected: isSelected,
    locked: onionImage.locked,
    isDrag: false,
  };

  return (
    <div
      data-overlay-onion-image-id={onionImage.id}
      data-overlay-tool-type="onion-image"
      ref={setNodeRef}
      className={cn(variantsOnionImage(variantsConfig))}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleDown}
      tabIndex={0}
      aria-disabled={onionImage.locked}
      aria-selected={isSelected}
    >
      <img
        src={onionImage.data}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
