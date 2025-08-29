import { useOnionImageByIdQuery } from "@/features/onion-image/store/useOnionImageByIdQuery";
import type { IOnionImage } from "@/features/onion-image/types";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { useCallback, useMemo } from "react";

const variantsOnionImage = cva(
  [
    "o:absolute o:top-0 o:left-0 o:h-96 o:w-96 o:bg-amber-400 o:overflow-visible o:pointer-events-auto focus:o:outline-none",
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
        true: "o:border-cyan-500 o:bg-amber-700 o:border-2",
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
  // const { move } = useOnionImageMove();
  // const { toggleLock } = useOnionImageToggleLock();
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

  // const containerRef = useRef<HTMLDivElement>(null);
  // const onionImageRef = useRef<HTMLDivElement>(null);

  // const [isDrag, setDrag] = useState(false);

  // const onOnionImagePositionChangeEnded = useCallback(
  //   (onionImage: IOnionImage, x: number, y: number) => {
  //     move(onionImage, { x, y });
  //   },
  //   [move]
  // );

  const onOnionImageSelected = useCallback(
    (onionImage: IOnionImage) => {
      console.log("onionImage selected", onionImage);
      setSelectedTool(onionImage);
    },
    [setSelectedTool]
  );

  // useGuidelineKeyboardShortcuts({
  //   guideline,
  //   isSelected,
  //   isVertical,
  //   onGuidelinePositionChanged: (guideline, x, y) => {
  //     onGuidelinePositionChanged(guideline, x, y);
  //     onGuidelinePositionChangeEnded(guideline, x, y);
  //   },
  // });

  // const handleOnFocus = useCallback(() => {
  //   if (onionImage) {
  //     onOnionImageSelected(onionImage);
  //   }
  // }, [onionImage, onOnionImageSelected]);

  const handleClick = useCallback(() => {
    console.log("onionImage clicked", onionImage);
    if (onionImage) {
      onOnionImageSelected(onionImage);
    }
  }, [onionImage, onOnionImageSelected]);

  // const handleDown = useCallback(() => {
  //   if (onionImage && !onionImage.locked && containerRef.current) {
  //     setDrag(true);

  //     // onOnionImagePositionChanged(
  //     //   onionImage,
  //     //   onionImage.x,
  //     //   onionImage.y
  //     // );
  //   }
  // }, [onionImage]);

  // const handleDoubleClick = useCallback(() => {
  //   if (onionImage) {
  //     toggleLock(onionImage);
  //   }
  // }, [onionImage, toggleLock]);

  // const handleUp = useCallback(
  //   (event: MouseEvent) => {
  //     if (onionImage && isDrag && containerRef.current) {
  //       setDrag(false);

  //       const rect = containerRef.current.getBoundingClientRect();
  //       const x = event.clientX - rect.left;
  //       const y = event.clientY - rect.top;

  //       onOnionImagePositionChangeEnded(onionImage, x, y);
  //     }
  //   },
  //   [onionImage, isDrag, onOnionImagePositionChangeEnded]
  // );

  // const handleMove = useCallback(
  //   (event: MouseEvent) => {
  //     if (onionImage && isDrag && containerRef.current) {
  //       const rect = containerRef.current.getBoundingClientRect();
  //       const x = event.clientX - rect.left;
  //       const y = event.clientY - rect.top;
  //       // const x = event.clientX;
  //       // const y = event.clientY;

  //       containerRef.current.style.setProperty(
  //         "transform",
  //         `translateX(${x}px) translateY(${y}px)`
  //       );

  //       // onOnionImagePositionChanged(
  //       //   onionImage,
  //       //   x,
  //       //   y
  //       // );
  //     }
  //   },
  //   [onionImage, isDrag]
  // );

  // useEffect(() => {
  //   document.body.addEventListener("mouseup", handleUp);
  //   document.body.addEventListener("mousemove", handleMove);

  //   return () => {
  //     document.body.removeEventListener("mouseup", handleUp);
  //     document.body.removeEventListener("mousemove", handleMove);
  //   };
  // }, [handleMove, handleUp]);

  // useEffect(() => {
  //   containerRef.current?.style.setProperty(
  //     "transform",
  //     `translateX(${onionImage?.x}px) translateY(${onionImage?.y}px)`
  //   );
  // }, [onionImage]);

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
      className={variantsOnionImage(variantsConfig)}
      style={style}
      {...listeners}
      {...attributes}
      // onMouseDown={handleDown}
      onClick={handleClick}
      // onDoubleClick={handleDoubleClick}
      tabIndex={0}
      aria-disabled={onionImage.locked}
      aria-selected={isSelected}
    ></div>
  );
}
