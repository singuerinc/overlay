import { ColumnsToolBox } from "@/features/columns/toolbox/ColumnsToolBox";
import { CrosshairToolBox } from "@/features/crosshair/toolbox/CrosshairToolBox";
import { GridToolBox } from "@/features/grid/toolbox/GridToolBox";
import { GuidelinesToolBox } from "@/features/guideline/toolbox/GuidelinesToolBox";
import { RulerToolBox } from "@/features/rulers/toolbox/RulerToolBox";
import { useToolBoxMove } from "@/features/toolbox/hooks/useToolBoxMove";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { type PropsWithChildren } from "react";

export function ToolBox() {
  const { data: toolBox } = useToolBoxQuery();
  const { move: toolBoxMove } = useToolBoxMove();

  if (!toolBox) {
    return null;
  }

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        toolBoxMove(toolBox.x + delta.x, toolBox.y + delta.y);
      }}
    >
      <ToolBoxRoot x={toolBox.x} y={toolBox.y}>
        <ToolBoxGroup>
          <RulerToolBox />
        </ToolBoxGroup>
        <ToolBoxSeparator />
        <ToolBoxGroup>
          <GridToolBox />
        </ToolBoxGroup>
        <ToolBoxSeparator />
        <ToolBoxGroup>
          <ColumnsToolBox />
        </ToolBoxGroup>
        <ToolBoxSeparator />
        <ToolBoxGroup>
          <CrosshairToolBox />
        </ToolBoxGroup>
        <ToolBoxSeparator />
        <ToolBoxGroup>
          <GuidelinesToolBox />
        </ToolBoxGroup>
      </ToolBoxRoot>
    </DndContext>
  );
}

function ToolBoxGroup({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-x-1 border border-white p-1 rounded-md">
      {children}
    </div>
  );
}

function ToolBoxSeparator() {
  return <div className="h-6 border-l border-neutral-300" />;
}

function ToolBoxRoot({
  children,
  x,
  y,
}: PropsWithChildren<{ x: number; y: number }>) {
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
      id="toolBox"
      className="flex items-center bg-neutral-200 p-1 z-50 absolute rounded-sm pointer-events-auto"
      ref={setNodeRef}
      style={style}
    >
      <IconGripVertical
        {...listeners}
        // {...attributes}
        className="cursor-grab active:cursor-grabbing text-neutral-400"
        stroke={1}
      />
      <div className="flex gap-x-1 items-center">{children}</div>
    </div>
  );
}
