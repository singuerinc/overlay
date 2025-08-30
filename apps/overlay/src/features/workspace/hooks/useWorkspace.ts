import { createFrame } from "@/features/frame/store/createFrame";
import { useWorkspaceAddFrameCommand } from "@/features/workspace/store/useWorkspaceAddFrameCommand";
import { useWorkspaceSetActiveFrameIdCommand } from "@/features/workspace/store/useWorkspaceSetActiveFrameIdCommand";

export function useWorkspace() {
  const addFrameCmd = useWorkspaceAddFrameCommand();
  const setActiveFrameIdCmd = useWorkspaceSetActiveFrameIdCommand();

  return {
    setActiveFrameId: (id: string) => {
      setActiveFrameIdCmd.execute(id);
    },
    addFrame: () => {
      const frame = createFrame();
      addFrameCmd.execute(frame);
    },
  };
}
