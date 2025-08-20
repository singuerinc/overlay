import { CrosshairSettingsToolbar } from "@/features/crosshair/toolbar/CrosshairSettingsToolbar";
import { ToggleCrosshairButton } from "@/features/crosshair/toolbar/ToggleCrosshairButton";
import { isCrosshair } from "@/features/crosshair/utils/isCrosshair";
import { ToggleGridButton } from "@/features/grid/toolbar/ToggleGridButton";
import { GuidelineToolbar } from "@/features/guideline/toolbar/GuidelineToolbar";
import { ToggleGuidelinesButton } from "@/features/guideline/toolbar/ToggleGuidelinesButton";
import { isGuideline } from "@/features/guideline/utils/isGuideline";
import { ToggleRulerButton } from "@/features/rulers/toolbar/ToggleRulerButton";
import { useSelectedTool } from "@/features/tools/store/tools";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { useState, type PropsWithChildren } from "react";

export function ToolBar({ initX, initY }: { initX: number; initY: number }) {
  const [{ x, y }, setCoords] = useState({ x: initX, y: initY });
  const selectedTool = useSelectedTool();

  const isToolGuideline = isGuideline(selectedTool);
  const isToolCrosshair = isCrosshair(selectedTool);

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        setCoords((prev) => ({ x: prev.x + delta.x, y: prev.y + delta.y }));
      }}
      modifiers={[]}
    >
      <ToolsElements x={x} y={y}>
        <div className="flex gap-x-1">
          <ToggleRulerButton />
          <ToggleGuidelinesButton />
          <ToggleGridButton />
          <ToggleCrosshairButton />
        </div>
        <div className="flex items-center gap-x-1">
          {isToolGuideline && <GuidelineToolbar />}
          {isToolCrosshair && <CrosshairSettingsToolbar />}
        </div>
      </ToolsElements>
    </DndContext>
  );
}

export function ToolsElements({
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
      id="toolbar"
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
      <div className="flex gap-x-1">{children}</div>
    </div>
  );
}
