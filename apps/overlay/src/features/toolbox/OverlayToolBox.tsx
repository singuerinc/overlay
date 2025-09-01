import { ColumnsToolBox } from "@/features/columns/toolbox/ColumnsToolBox";
import { GuidelinesToolBox } from "@/features/guideline/toolbox/GuidelinesToolBox";
import { OnionImagesToolBox } from "@/features/onion-image/toolbox/OnionImagesToolBox";
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
import { IconPhoto, IconTools } from "@tabler/icons-react";
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
              activated={activeTab === "onion-images"}
              Icon={<IconPhoto size={18} />}
              onClick={() => setActiveTab("onion-images")}
            />
            {activeTab === "onion-images" && (
              <ToolBoxTabTitle>Images</ToolBoxTabTitle>
            )}
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
