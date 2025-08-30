import { OnionImageActions } from "@/features/onion-image/components/OnionImageActions";
import { useOnionImageMove } from "@/features/onion-image/hooks/useOnionImageMove";
import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { useOnionImageRemoveCommand } from "@/features/onion-image/store/useOnionImageRemoveCommand";
import type { IOnionImage } from "@/features/onion-image/types";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { cn } from "@/ui/cn";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { useCallback, useMemo } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/packages/react-hotkeys-hook/dist/types";

const variantsOnionImage = cva(
  ["o:absolute o:top-0 o:left-0 o:overflow-visible o:pointer-events-auto"],
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
        true: "o:active:opacity-50",
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

export function OnionImage({ id }: { id: IOnionImage["id"] }) {
  const { data: onionImage } = useOnionImageByIdQuery(id);
  const selectedTool = useSelectedTool();
  const setSelectedTool = useSetSelectedTool();
  const { move } = useOnionImageMove();
  const isSelected = useMemo(
    () => selectedTool?.id === onionImage?.id,
    [selectedTool, onionImage?.id]
  );

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
    <>
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
          className={cn({
            "o:opacity-100": onionImage.opacity === 1,
            "o:opacity-50": onionImage.opacity === 0.5,
            "o:invert": onionImage.filter === "invert",
            "o:grayscale": onionImage.filter === "grayscale",
          })}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
        {isSelected && <OnionImageActions onionImage={onionImage} />}
      </div>
    </>
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
  const removeCommand = useOnionImageRemoveCommand();

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
      removeCommand.execute(onionImage);
    }
  }, [onionImage, isSelected, removeCommand]);

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
