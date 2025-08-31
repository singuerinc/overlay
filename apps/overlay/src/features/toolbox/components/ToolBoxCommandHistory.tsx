import { useUndo } from "@/features/commands/hooks/useUndo";
import { useUndoAvailable } from "@/features/commands/hooks/useUndoAvailable";
import { ToolButton } from "@/ui/ToolButton";
import { IconArrowBackUp } from "@tabler/icons-react";

export function ToolBoxCommandHistory() {
  const undo = useUndo();
  const canUndo = useUndoAvailable();
  return (
    <ToolButton
      enabled={canUndo}
      Icon={<IconArrowBackUp size={16} />}
      onClick={() => undo()}
    />
  );
}
