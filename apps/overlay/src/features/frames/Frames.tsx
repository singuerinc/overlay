import { useCoords } from "@/features/coords/hooks/useCoords";
import { useFrame } from "@/features/frames/hooks/useFrame";
import { useFrameByIdQuery } from "@/features/frames/store/useFrameByIdQuery";
import { useFramesQuery } from "@/features/frames/store/useFramesQuery";
import type { IFrame } from "@/features/frames/types";
import { useSizes } from "@/features/sizes/hooks/useSizes";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "@/features/tools/store/tools";
import { cn } from "@/ui/cn";
import { DndContext, useDraggable, type DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useEffect, useMemo, useRef } from "react";

function Frame({ id }: { id: IFrame["id"] }) {
  const { setX, setY } = useCoords();
  const { setX0, setY0, setX1, setY1 } = useSizes();
  const { data: frame } = useFrameByIdQuery(id);
  const selectedTool = useSelectedTool();
  const setSelectedTool = useSetSelectedTool();
  const isSelected = useMemo(
    () => selectedTool?.id === frame?.id,
    [selectedTool, frame?.id]
  );

  useEffect(() => {
    if (isSelected && frame) {
      setX(frame.x);
      setY(frame.y);
      setX0(frame.x);
      setY0(frame.y);
      setX1(frame.x + frame.width);
      setY1(frame.y + frame.height);
    }
  }, [isSelected, frame, setX, setY]);

  const { listeners, setNodeRef, attributes, transform } = useDraggable({
    id,
    disabled: frame?.locked,
    data: {
      x: frame?.x ?? 0,
      y: frame?.y ?? 0,
    },
  });

  const handleDown = useCallback(() => {
    if (frame) {
      setSelectedTool(frame);
      setX(frame.x);
      setY(frame.y);
    }
  }, [frame, setSelectedTool, setX, setY]);

  if (!frame) {
    return null;
  }

  const style = {
    width: frame.width,
    height: frame.height,
    transform: transform
      ? CSS.Translate.toString({
          x: frame.x + transform.x,
          y: frame.y + transform.y,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({
          x: frame.x,
          y: frame.y,
          scaleX: 1,
          scaleY: 1,
        }),
  };

  return (
    <div
      className="o:bg-red-600 o:pointer-events-auto"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleDown}
    ></div>
  );
}

export function Frames() {
  const { data: frames } = useFramesQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const { move } = useFrame();
  const { setX, setY } = useCoords();

  // const handleDragMove = useCallback(
  //   (ev: DragEndEvent) => {
  //     setX(ev.active.rect.current.translated?.left ?? 0);
  //     setY(ev.active.rect.current.translated?.top ?? 0);
  //   },
  //   [frames]
  // );

  const handleDragEnd = useCallback(
    (ev: DragEndEvent) => {
      const frameId = frames?.frames.find((x) => x === ev.active.id);
      if (!frameId) return;

      move(frameId, {
        x: (ev.active.data.current?.x ?? 0) + ev.delta.x,
        y: (ev.active.data.current?.y ?? 0) + ev.delta.y,
      });
    },
    [frames]
  );

  if (!frames || !frames.visible) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "o:absolute o:pointer-events-none o:top-0 o:left-0 o:w-full o:h-full"
      )}
    >
      <DndContext onDragEnd={handleDragEnd}>
        {frames.frames.map((frameId) => (
          <Frame key={frameId} id={frameId} />
        ))}
      </DndContext>
    </div>
  );
}
