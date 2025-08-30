import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";

export function WorkspaceToolBox() {
  const { data: workspace } = useWorkspaceQuery();
  const { addFrame, setActiveFrameId } = useWorkspace();

  return (
    <ToolBoxTabGrid>
      <button type="button" onClick={() => addFrame()}>
        Add Frame
      </button>
      <select
        onChange={(e) => {
          const selectedFrameId = e.target.value;
          setActiveFrameId(selectedFrameId);
        }}
      >
        {workspace?.frames.map((frameId) => (
          <option
            key={frameId}
            value={frameId}
            selected={workspace.activeFrameId === frameId}
          >
            {frameId}
          </option>
        ))}
      </select>
    </ToolBoxTabGrid>
  );
}
