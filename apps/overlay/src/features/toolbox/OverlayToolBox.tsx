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
import { useToolBoxMove } from "@/features/toolbox/hooks/useToolBoxMove";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import { WorkspaceToolBox } from "@/features/workspace/toolbox/WorkspaceToolBox";
import { ToolButton } from "@/ui/ToolButton";
import { DndContext } from "@dnd-kit/core";
import {
  IconColumns,
  IconCrosshair,
  IconGridDots,
  IconNote,
  IconPhoto,
  IconRuler,
  IconTable,
  IconTools,
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
    | "workspace"
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
              Icon={<IconRuler />}
              onClick={() => setActiveTab("ruler")}
            />
            {activeTab === "ruler" && <ToolBoxTabTitle>Ruler</ToolBoxTabTitle>}
            <ToolButton
              activated={activeTab === "grid"}
              Icon={<IconGridDots stroke={1.5} />}
              onClick={() => setActiveTab("grid")}
            />
            {activeTab === "grid" && <ToolBoxTabTitle>Grid</ToolBoxTabTitle>}
            <ToolButton
              activated={activeTab === "crosshair"}
              Icon={<IconCrosshair />}
              onClick={() => setActiveTab("crosshair")}
            />
            {activeTab === "crosshair" && (
              <ToolBoxTabTitle>Crosshair</ToolBoxTabTitle>
            )}
            <ToolButton
              activated={activeTab === "columns"}
              Icon={<IconColumns />}
              onClick={() => setActiveTab("columns")}
            />
            {activeTab === "columns" && (
              <ToolBoxTabTitle>Columns</ToolBoxTabTitle>
            )}
            <ToolButton
              activated={activeTab === "guidelines"}
              Icon={<IconTable />}
              onClick={() => setActiveTab("guidelines")}
            />
            {activeTab === "guidelines" && (
              <ToolBoxTabTitle>Guidelines</ToolBoxTabTitle>
            )}
            <ToolButton
              activated={activeTab === "onion-images"}
              Icon={<IconPhoto />}
              onClick={() => setActiveTab("onion-images")}
            />
            {activeTab === "onion-images" && (
              <ToolBoxTabTitle>Images</ToolBoxTabTitle>
            )}
            <ToolButton
              activated={activeTab === "notes"}
              Icon={<IconNote />}
              onClick={() => setActiveTab("notes")}
            />
            {activeTab === "notes" && <ToolBoxTabTitle>Notes</ToolBoxTabTitle>}
            <ToolButton
              activated={activeTab === "workspace"}
              Icon={<IconTools />}
              onClick={() => setActiveTab("workspace")}
            />
            {activeTab === "workspace" && (
              <ToolBoxTabTitle>Workspace</ToolBoxTabTitle>
            )}
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
          {activeTab === "workspace" && (
            <ToolBoxTab>
              <WorkspaceToolBox />
            </ToolBoxTab>
          )}
        </ToolBoxTabs>
      </ToolBoxRoot>
    </DndContext>
  );
}
