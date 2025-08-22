import { useUndo } from "@/features/commands/hooks/useUndo";
import { useUndoAvailable } from "@/features/commands/hooks/useUndoAvailable";
import { IconArrowBackUp } from "@tabler/icons-react";
import { ToolButton } from "../../../ui/ToolButton";

export function UndoButton() {
  const undo = useUndo();
  const isUndoAvailable = useUndoAvailable();
  return (
    <ToolButton
      enabled={isUndoAvailable}
      onClick={() => undo()}
      Icon={<IconArrowBackUp />}
    />
  );
}
