import { useCoords } from "@/features/coords/hooks/useCoords";
import { OnionImageActions } from "@/features/onion-image/components/OnionImageActions";
import { useOnionImage } from "@/features/onion-image/hooks/useOnionImage";
import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import type { IOnionImage } from "@/features/onion-image/types";
import { useSizes } from "@/features/sizes/hooks/useSizes";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { cn } from "@/ui/cn";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useMemo } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/packages/react-hotkeys-hook/dist/types";

const variantsOnionImage = cva(["o:absolute o:top-0 o:left-0 o:outline-none"], {
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
      true: "o:active:opacity-50 o:ring-2 o:ring-offset-2 o:ring-blue-500",
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
});

export function OnionImage({ id }: { id: IOnionImage["id"] }) {
  const { setX, setY } = useCoords();
  const { setX0, setY0, setX1, setY1 } = useSizes();
  const { data: workspace } = useWorkspaceQuery();
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const selectedTool = useSelectedTool();
  const setSelectedTool = useSetSelectedTool();
  const { move } = useOnionImage();
  const isSelected = useMemo(
    () => selectedTool?.id === onionImage?.id,
    [selectedTool, onionImage?.id]
  );

  useEffect(() => {
    if (isSelected && onionImage) {
      setX(onionImage.x);
      setY(onionImage.y);
      setX0(onionImage.x);
      setY0(onionImage.y);
      setX1(onionImage.x + onionImage.width * onionImage.scale);
      setY1(onionImage.y + onionImage.height * onionImage.scale);
    }
  }, [isSelected, onionImage, setX, setY]);

  const onOnionImagePositionChangeEnded = useCallback(
    (onionImage: IOnionImage, x: number, y: number) => {
      move(onionImage.id, { x, y });
    },
    [move]
  );

  useOnionImageKeyboardShortcuts({
    onionImage,
    isSelected,
    onOnionImagePositionChanged: onOnionImagePositionChangeEnded,
  });

  const { listeners, setNodeRef, attributes, transform } = useDraggable({
    id,
    disabled: onionImage?.locked,
    data: {
      x: onionImage?.x ?? 0,
      y: onionImage?.y ?? 0,
    },
  });

  const style = {
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
      setX(onionImage.x);
      setY(onionImage.y);
    }
  }, [onionImage, setSelectedTool, setX, setY]);

  if (!onionImage) {
    return null;
  }

  if (onionImage.visible === false) {
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
      className={cn(variantsOnionImage(variantsConfig), {
        "o:pointer-events-auto": workspace?.locked === false,
      })}
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
        className={cn({
          "o:opacity-100": onionImage.opacity === 1,
          "o:opacity-50": onionImage.opacity === 0.5,
          "o:invert": onionImage.filter === "invert",
          "o:grayscale": onionImage.filter === "grayscale",
        })}
        width={onionImage.width * onionImage.scale}
        height={onionImage.height * onionImage.scale}
      />
      {isSelected && <OnionImageActions onionImage={onionImage} />}
    </div>
  );
}

function useOnionImageKeyboardShortcuts({
  onionImage,
  isSelected,
  onOnionImagePositionChanged,
}: {
  onionImage?: IOnionImage;
  isSelected: boolean;
  onOnionImagePositionChanged: (
    onionImage: IOnionImage,
    x: number,
    y: number
  ) => void;
}) {
  const { remove } = useOnionImage();

  const left = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (onionImage) {
        const amount = hotkeysEvent.shift ? 10 : 1;
        onOnionImagePositionChanged(
          onionImage,
          onionImage.x - amount,
          onionImage.y
        );
      }
    },
    [onionImage, onOnionImagePositionChanged]
  );

  const right = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (onionImage) {
        const amount = hotkeysEvent.shift ? 10 : 1;
        onOnionImagePositionChanged(
          onionImage,
          onionImage.x + amount,
          onionImage.y
        );
      }
    },
    [onionImage, onOnionImagePositionChanged]
  );

  const down = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (onionImage) {
        const amount = hotkeysEvent.shift ? 10 : 1;
        onOnionImagePositionChanged(
          onionImage,
          onionImage.x,
          onionImage.y + amount
        );
      }
    },
    [onionImage, onOnionImagePositionChanged]
  );

  const up = useCallback(
    (_: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (onionImage) {
        const amount = hotkeysEvent.shift ? 10 : 1;
        onOnionImagePositionChanged(
          onionImage,
          onionImage.x,
          onionImage.y - amount
        );
      }
    },
    [onionImage, onOnionImagePositionChanged]
  );

  const handleRemoveOnionImage = useCallback(() => {
    if (!isSelected) {
      return;
    }
    if (onionImage) {
      remove(onionImage);
    }
  }, [onionImage, isSelected, remove]);

  useHotkeys(["up", "shift+up"], up, {
    enabled: isSelected && onionImage && !onionImage.locked,
    preventDefault: true,
  });
  useHotkeys(["down", "shift+down"], down, {
    enabled: isSelected && onionImage && !onionImage.locked,
    preventDefault: true,
  });
  useHotkeys(["left", "shift+left"], left, {
    enabled: isSelected && onionImage && !onionImage.locked,
    preventDefault: true,
  });
  useHotkeys(["right", "shift+right"], right, {
    enabled: isSelected && onionImage && !onionImage.locked,
    preventDefault: true,
  });
  useHotkeys(["delete", "backspace"], handleRemoveOnionImage, {
    enabled: isSelected && onionImage && !onionImage.locked,
    preventDefault: true,
  });
}
