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
import { useToolBox } from "@/features/toolbox/hooks/useToolBox";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import {
  ToolBoxTabNames,
  type ToolBoxTabNameType,
} from "@/features/toolbox/types";
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
  IconTools,
} from "@tabler/icons-react";
import { useLocalStorage } from "usehooks-ts";

export function OverlayToolBox() {
  const [activeTab, setActiveTab] = useLocalStorage<ToolBoxTabNameType>(
    "overlay-toolbox-active-tab",
    ToolBoxTabNames[0]
  );
  const { data: toolBox } = useToolBoxQuery();
  const { move: toolBoxMove } = useToolBox();

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
          <div className="o:flex o:gap-x-1">
            <ToolButton
              inTab={true}
              activated={activeTab === "ruler"}
              Icon={<IconRuler size={18} />}
              onClick={() => setActiveTab("ruler")}
            />
            {activeTab === "ruler" && <ToolBoxTabTitle>Ruler</ToolBoxTabTitle>}
            <ToolButton
              inTab={true}
              activated={activeTab === "grid"}
              Icon={<IconGridDots size={18} stroke={1.5} />}
              onClick={() => setActiveTab("grid")}
            />
            {activeTab === "grid" && <ToolBoxTabTitle>Grid</ToolBoxTabTitle>}
            <ToolButton
              inTab={true}
              activated={activeTab === "crosshair"}
              Icon={<IconCrosshair size={18} />}
              onClick={() => setActiveTab("crosshair")}
            />
            {activeTab === "crosshair" && (
              <ToolBoxTabTitle>Crosshair</ToolBoxTabTitle>
            )}
            <ToolButton
              inTab={true}
              activated={activeTab === "columns"}
              Icon={<IconColumns size={18} />}
              onClick={() => setActiveTab("columns")}
            />
            {activeTab === "columns" && (
              <ToolBoxTabTitle>Columns</ToolBoxTabTitle>
            )}
            <ToolButton
              inTab={true}
              activated={activeTab === "onion-images"}
              Icon={<IconPhoto size={18} />}
              onClick={() => setActiveTab("onion-images")}
            />
            {activeTab === "onion-images" && (
              <ToolBoxTabTitle>Images</ToolBoxTabTitle>
            )}
            <ToolButton
              inTab={true}
              activated={activeTab === "notes"}
              Icon={<IconNote size={18} />}
              onClick={() => setActiveTab("notes")}
            />
            {activeTab === "notes" && <ToolBoxTabTitle>Notes</ToolBoxTabTitle>}
            <ToolButton
              inTab={true}
              activated={activeTab === "workspace"}
              Icon={<IconTools size={18} />}
              onClick={() => setActiveTab("workspace")}
            />
            {activeTab === "workspace" && (
              <ToolBoxTabTitle>Workspace</ToolBoxTabTitle>
            )}
          </div>
        </ToolBoxButtons>
        <ToolBoxTabs activeTab={activeTab}>
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
