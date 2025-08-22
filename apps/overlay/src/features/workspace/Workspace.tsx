import { CommandMenu } from "@/features/command-menu/components/CommandMenu";
import { Frame } from "@/features/frame/Frame";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import { ShortcutsObserver } from "@/features/shortcuts/ShortcutsObserver";
import { ToolBox } from "@/features/toolbox/ToolBox";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { WorkspaceContextProvider } from "@/features/workspace/store/workspaceStore";

export function Workspace() {
  const { data: workspace } = useWorkspaceQuery();

  if (!workspace) {
    return null;
  }

  return (
    <WorkspaceContextProvider id={workspace.id}>
      {workspace.frameIds.map((frameId) => (
        <FrameContextProvider key={frameId} id={frameId}>
          <ToolBox />
          <Frame id={frameId} />
          <ShortcutsObserver />
          <CommandMenu />
        </FrameContextProvider>
      ))}
    </WorkspaceContextProvider>
  );
}
