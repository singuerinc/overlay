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
          <div className="o:flex o:gap-1">
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
              activated={activeTab === "onion-images"}
              enabled={true}
              Icon={<IconPhoto />}
              onClick={() => setActiveTab("onion-images")}
            />
            <ToolButton
              activated={activeTab === "notes"}
              enabled={true}
              Icon={<IconNote />}
              onClick={() => setActiveTab("notes")}
            />
            <ToolButton
              activated={activeTab === "settings"}
              enabled={true}
              Icon={<IconSettings />}
              onClick={() => setActiveTab("settings")}
            />
          </div>
          <div className="o:flex o:gap-1">
            <ToolBoxCommandHistory />
          </div>
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
          {activeTab === "onion-images" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Images</ToolBoxTabTitle>
              <OnionImagesToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "notes" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Notes</ToolBoxTabTitle>
              <NotesToolBox />
            </ToolBoxTab>
          )}
          {activeTab === "settings" && (
            <ToolBoxTab>
              <ToolBoxTabTitle>Settings</ToolBoxTabTitle>
              <WorkspaceToolBox />
            </ToolBoxTab>
          )}
        </ToolBoxTabs>
      </ToolBoxRoot>
    </DndContext>
  );
}
