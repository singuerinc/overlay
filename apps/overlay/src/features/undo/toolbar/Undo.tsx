import { IconArrowBackUp } from "@tabler/icons-react";
import {
  useCanUndoCommand,
  useUndoCommand,
} from "../../../features/commands/store/commands";
import { ToolButton } from "../../../ui/ToolButton";

export function Undo() {
  const undo = useUndoCommand();
  const canUndo = useCanUndoCommand();
  return (
    <div className="flex gap-x-1">
      <ToolButton
        enabled={canUndo}
        onClick={() => undo()}
        Icon={<IconArrowBackUp />}
      />
    </div>
  );
}
