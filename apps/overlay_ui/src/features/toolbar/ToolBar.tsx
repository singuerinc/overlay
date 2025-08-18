import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { useState, type PropsWithChildren } from "react";

export function ToolBar({
  gripSize = 24,
  children,
  initX,
  initY,
}: PropsWithChildren<{ initX: number; initY: number; gripSize?: number }>) {
  const [{ x, y }, setCoords] = useState({ x: initX, y: initY });

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        setCoords((prev) => ({ x: prev.x + delta.x, y: prev.y + delta.y }));
      }}
      modifiers={[]}
    >
      <ToolsElements x={x} y={y} gripSize={gripSize}>
        {children}
      </ToolsElements>
    </DndContext>
  );
}

export function ToolsElements({
  gripSize,
  children,
  x,
  y,
}: PropsWithChildren<{ x: number; y: number; gripSize: number }>) {
  const { listeners, setNodeRef, transform } = useDraggable({
    id: "tools",
  });

  const style = {
    transform: transform
      ? CSS.Translate.toString({
          x: transform.x + x,
          y: transform.y + y,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({ x, y, scaleX: 1, scaleY: 1 }),
  };
  return (
    <div
      className="flex items-center bg-neutral-100 p-1 z-50 absolute rounded-sm pointer-events-auto"
      ref={setNodeRef}
      style={style}
    >
      <IconGripVertical
        size={gripSize}
        {...listeners}
        // {...attributes}
        className="cursor-grab active:cursor-grabbing text-neutral-300"
        stroke={1}
      />
      <div className="flex">{children}</div>
    </div>
  );
}
