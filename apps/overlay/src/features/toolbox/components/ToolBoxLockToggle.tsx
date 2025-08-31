import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";

export function ToolBoxLockToggle() {
  const { data: workspace } = useWorkspaceQuery();
  const { setLocked } = useWorkspace();

  return (
    <ToolButton
      activated={workspace?.locked}
      Icon={
        !workspace?.locked ? <IconLockOpen size={16} /> : <IconLock size={16} />
      }
      onClick={() => setLocked(!workspace?.locked)}
    />
  );
}
