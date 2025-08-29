import { ColumnsToolBox } from "@/features/columns/toolbox/ColumnsToolBox";
import { CrosshairToolBox } from "@/features/crosshair/toolbox/CrosshairToolBox";
import { GridToolBox } from "@/features/grid/toolbox/GridToolBox";
import { GuidelinesToolBox } from "@/features/guideline/toolbox/GuidelinesToolBox";
import { RulerToolBox } from "@/features/rulers/toolbox/RulerToolBox";
import {
  ToolBoxButtons,
  ToolBoxRoot,
  ToolBoxTab,
  ToolBoxTabGrid,
  ToolBoxTabs,
  ToolBoxTabTitle,
} from "@/features/toolbox/components/ToolBox";
import { useToolBoxMove } from "@/features/toolbox/hooks/useToolBoxMove";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import { ToolButton } from "@/ui/ToolButton";
import { DndContext } from "@dnd-kit/core";
import {
  IconColumns,
  IconCrosshair,
  IconGrid3x3,
  IconRuler,
  IconSettings,
  IconTable,
} from "@tabler/icons-react";
import { useLocalStorage } from "usehooks-ts";

export function OverlayToolBox() {
  const [activeTab, setActiveTab] = useLocalStorage<
    "ruler" | "grid" | "crosshair" | "columns" | "guidelines" | "settings"
  >("overlay-toolbox-active-tab", "ruler");
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
        <ToolBoxButtons>
          <ToolButton
            activated={activeTab === "ruler"}
            enabled={true}
            Icon={<IconRuler />}
            onClick={() => setActiveTab("ruler")}
          />
          <ToolButton
            activated={activeTab === "grid"}
            enabled={true}
            Icon={<IconGrid3x3 />}
            onClick={() => setActiveTab("grid")}
          />
          <ToolButton
            activated={activeTab === "crosshair"}
            enabled={true}
            Icon={<IconCrosshair />}
            onClick={() => setActiveTab("crosshair")}
          />
          <ToolButton
            activated={activeTab === "columns"}
            enabled={true}
            Icon={<IconColumns />}
            onClick={() => setActiveTab("columns")}
          />
          <ToolButton
            activated={activeTab === "guidelines"}
            enabled={true}
            Icon={<IconTable />}
            onClick={() => setActiveTab("guidelines")}
          />
          <ToolButton
            activated={activeTab === "settings"}
            enabled={true}
            Icon={<IconSettings />}
            onClick={() => setActiveTab("settings")}
          />
        </ToolBoxButtons>
        <ToolBoxTabs>
          {activeTab === "ruler" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Ruler</ToolBoxTabTitle>
              <RulerToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "grid" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Grid</ToolBoxTabTitle>
              <GridToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "crosshair" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Crosshair</ToolBoxTabTitle>
              <CrosshairToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "columns" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Columns</ToolBoxTabTitle>
              <ColumnsToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "guidelines" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Guidelines</ToolBoxTabTitle>
              <GuidelinesToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "settings" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Settings</ToolBoxTabTitle>
              <ToolBoxTabGrid>workspaces</ToolBoxTabGrid>
            </ToolBoxTab>
          )}
        </ToolBoxTabs>
      </ToolBoxRoot>
    </DndContext>
  );
}
