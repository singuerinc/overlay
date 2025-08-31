import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export function ToolBoxVisibilityToggle() {
  const { data: workspace } = useWorkspaceQuery();
  const { setVisible } = useWorkspace();
  return (
    <ToolButton
      activated={workspace?.visible}
      Icon={
        !workspace?.visible ? <IconEyeOff size={16} /> : <IconEye size={16} />
      }
      onClick={() => setVisible(!workspace?.visible)}
    />
  );
}
