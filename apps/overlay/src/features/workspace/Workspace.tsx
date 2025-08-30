import { Frame } from "@/features/frame/Frame";
import { useFrameByIdQuery } from "@/features/frame/hooks/useFrameByIdQuery";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { WorkspaceContextProvider } from "@/features/workspace/store/workspaceStore";

export function Workspace() {
  const { data: workspace } = useWorkspaceQuery();

  if (!workspace) {
    return null;
  }

  return (
    <WorkspaceContextProvider id={workspace.id}>
      <FrameLoader id={workspace.activeFrameId} />
    </WorkspaceContextProvider>
  );
}

function FrameLoader({ id }: { id: string }) {
  const { data: frame } = useFrameByIdQuery({ id });

  if (!frame) {
    return null;
  }

  return (
    <FrameContextProvider key={frame.id} activeFrameId={frame.id}>
      <Frame key={frame.id} id={frame.id} />
    </FrameContextProvider>
  );
}
