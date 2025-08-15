import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { useState, type PropsWithChildren } from "react";

export function ToolBar({ children }: PropsWithChildren) {
  const [{ x, y }, setCoords] = useState({ x: 20, y: 20 });

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        setCoords((prev) => ({ x: prev.x + delta.x, y: prev.y + delta.y }));
      }}
      modifiers={[]}
    >
      <ToolsElements x={x} y={y}>
        {children}
      </ToolsElements>
    </DndContext>
  );
}

export function ToolsElements({
  children,
  x,
  y,
}: PropsWithChildren<{ x: number; y: number }>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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
      className="flex items-center bg-neutral-900 p-1 z-50 absolute rounded-sm text-neutral-600"
      ref={setNodeRef}
      style={style}
    >
      <IconGripVertical
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing"
      />
      <div className="flex gap-x-2">{children}</div>
    </div>
  );
}
