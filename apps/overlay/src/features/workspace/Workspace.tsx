import { Frame } from "@/features/frame/Frame";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { WorkspaceContextProvider } from "@/features/workspace/store/workspaceStore";

export function Workspace() {
  const { data: workspace } = useWorkspaceQuery();

  if (!workspace) {
    return null;
  }

  return (
    <WorkspaceContextProvider id={workspace.id}>
      {workspace.frames.map((frameId) => (
        <Frame key={frameId} id={frameId} />
      ))}
    </WorkspaceContextProvider>
  );
}
