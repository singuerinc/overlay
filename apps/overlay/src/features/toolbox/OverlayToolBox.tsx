import { ColumnsToolBox } from "@/features/columns/toolbox/ColumnsToolBox";
import { CrosshairToolBox } from "@/features/crosshair/toolbox/CrosshairToolBox";
import { GridToolBox } from "@/features/grid/toolbox/GridToolBox";
import { GuidelinesToolBox } from "@/features/guideline/toolbox/GuidelinesToolBox";
import { NotesToolBox } from "@/features/notes/components/toolbox/NotesToolBox";
import { OnionImagesToolBox } from "@/features/onion-image/toolbox/OnionImagesToolBox";
import { RulerToolBox } from "@/features/rulers/toolbox/RulerToolBox";
import {
  ToolBoxButtons,
  ToolBoxRoot,
  ToolBoxTab,
  ToolBoxTabs,
  ToolBoxTabTitle,
} from "@/features/toolbox/components/ToolBox";
import { ToolBoxCommandHistory } from "@/features/toolbox/components/ToolBoxCommandHistory";
import { useToolBoxMove } from "@/features/toolbox/hooks/useToolBoxMove";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import { WorkspaceToolBox } from "@/features/workspace/toolbox/WorkspaceToolBox";
import { ToolButton } from "@/ui/ToolButton";
import { DndContext } from "@dnd-kit/core";
import {
  IconColumns,
  IconCrosshair,
  IconGrid3x3,
  IconNote,
  IconPhoto,
  IconRuler,
  IconSettings,
  IconTable,
} from "@tabler/icons-react";
import { useLocalStorage } from "usehooks-ts";

export function OverlayToolBox() {
  const [activeTab, setActiveTab] = useLocalStorage<
    | "ruler"
    | "grid"
    | "crosshair"
    | "columns"
    | "guidelines"
    | "onion-images"
    | "notes"
    | "settings"
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
          <div className="o:flex">
            <ToolButton
              activated={activeTab === "ruler"}
              enabled={true}
              Icon={<IconRuler />}
              onClick={() => setActiveTab("ruler")}
            />
            {activeTab === "ruler" && <ToolBoxTabTitle>Ruler</ToolBoxTabTitle>}
            <ToolButton
              activated={activeTab === "grid"}
              enabled={true}
              Icon={<IconGrid3x3 />}
              onClick={() => setActiveTab("grid")}
            />
            {activeTab === "grid" && <ToolBoxTabTitle>Grid</ToolBoxTabTitle>}
            <ToolButton
              activated={activeTab === "crosshair"}
              enabled={true}
              Icon={<IconCrosshair />}
              onClick={() => setActiveTab("crosshair")}
            />
            {activeTab === "crosshair" && (
              <ToolBoxTabTitle>Crosshair</ToolBoxTabTitle>
            )}
            <ToolButton
              activated={activeTab === "columns"}
              enabled={true}
              Icon={<IconColumns />}
              onClick={() => setActiveTab("columns")}
            />
            {activeTab === "columns" && (
              <ToolBoxTabTitle>Columns</ToolBoxTabTitle>
            )}
            <ToolButton
              activated={activeTab === "guidelines"}
              enabled={true}
              Icon={<IconTable />}
              onClick={() => setActiveTab("guidelines")}
            />
            {activeTab === "guidelines" && (
              <ToolBoxTabTitle>Guidelines</ToolBoxTabTitle>
            )}
            <ToolButton
              activated={activeTab === "onion-images"}
              enabled={true}
              Icon={<IconPhoto />}
              onClick={() => setActiveTab("onion-images")}
            />
            {activeTab === "onion-images" && (
              <ToolBoxTabTitle>Images</ToolBoxTabTitle>
            )}
            <ToolButton
              activated={activeTab === "notes"}
              enabled={true}
              Icon={<IconNote />}
              onClick={() => setActiveTab("notes")}
            />
            {activeTab === "notes" && <ToolBoxTabTitle>Notes</ToolBoxTabTitle>}
            <ToolButton
              activated={activeTab === "settings"}
              enabled={true}
              Icon={<IconSettings />}
              onClick={() => setActiveTab("settings")}
            />
            {activeTab === "settings" && (
              <ToolBoxTabTitle>Workspace</ToolBoxTabTitle>
            )}
          </div>
          <div className="o:flex o:gap-1">
            <ToolBoxCommandHistory />
          </div>
        </ToolBoxButtons>
        <ToolBoxTabs>
          {activeTab === "ruler" && (
            <ToolBoxTab>
              <RulerToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "grid" && (
            <ToolBoxTab>
              <GridToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "crosshair" && (
            <ToolBoxTab>
              <CrosshairToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "columns" && (
            <ToolBoxTab>
              <ColumnsToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "guidelines" && (
            <ToolBoxTab>
              <GuidelinesToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "onion-images" && (
            <ToolBoxTab>
              <OnionImagesToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "notes" && (
            <ToolBoxTab>
              <NotesToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "settings" && (
            <ToolBoxTab>
              <WorkspaceToolBox />
            </ToolBoxTab>
          )}
        </ToolBoxTabs>
      </ToolBoxRoot>
    </DndContext>
  );
}
