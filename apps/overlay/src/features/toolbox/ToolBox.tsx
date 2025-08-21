import { ColumnsToggleButton } from "@/features/columns/toolbox/ColumnsToggleButton";
import { CrosshairSettingsToolBox } from "@/features/crosshair/toolbox/CrosshairSettingsToolBox";
import { CrosshairToggleButton } from "@/features/crosshair/toolbox/CrosshairToggleButton";
import { isCrosshair } from "@/features/crosshair/utils/isCrosshair";
import { GridToggleButton } from "@/features/grid/toolbox/GridToggleButton";
import { GuidelinesToggleButton } from "@/features/guideline/toolbox/GuidelinesToggleButton";
import { GuidelinesToolBox } from "@/features/guideline/toolbox/GuidelinesToolBox";
import { GuidelineToolBox } from "@/features/guideline/toolbox/GuidelineToolBox";
import { isGuideline } from "@/features/guideline/utils/isGuideline";
import { RulerToggleButton } from "@/features/rulers/toolbox/RulerToggleButton";
import { useToolBoxMove } from "@/features/toolbox/hooks/useToolBoxMove";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import { useSelectedTool } from "@/features/tools/store/tools";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { type PropsWithChildren } from "react";

export function ToolBox() {
  const { data: toolBox } = useToolBoxQuery();
  const { move: toolBoxMove } = useToolBoxMove();
  const selectedTool = useSelectedTool();
  const isToolGuideline = isGuideline(selectedTool);
  const isToolCrosshair = isCrosshair(selectedTool);

  if (!toolBox) {
    return null;
  }

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        toolBoxMove(toolBox.x + delta.x, toolBox.y + delta.y);
      }}
      modifiers={[]}
    >
      <ToolBoxRoot x={toolBox.x} y={toolBox.y}>
        <ToolBoxGroup>
          <RulerToggleButton />
          <GridToggleButton />
          <ColumnsToggleButton />
          <CrosshairToggleButton />
        </ToolBoxGroup>
        <ToolBoxSeparator />
        <ToolBoxGroup>
          <GuidelinesToggleButton />
          <GuidelinesToolBox />
        </ToolBoxGroup>
        <ToolBoxGroup>
          {isToolGuideline && <GuidelineToolBox />}
          {isToolCrosshair && <CrosshairSettingsToolBox />}
        </ToolBoxGroup>
      </ToolBoxRoot>
    </DndContext>
  );
}

function ToolBoxGroup({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-x-1">{children}</div>;
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
        className="cursor-grab active:cursor-grabbing text-neutral-300"
        stroke={1}
      />
      <div className="flex gap-x-1 items-center">{children}</div>
    </div>
  );
}
