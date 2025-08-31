import { useCommands } from "@/features/commands/hooks/useCommands";
import { IconArrowBackUp } from "@tabler/icons-react";
import { ToolButton } from "../../../ui/ToolButton";

export function UndoButton() {
  const { undo, hasCommands } = useCommands();
  return (
    <ToolButton
      enabled={hasCommands}
      onClick={() => undo()}
      Icon={<IconArrowBackUp />}
    />
  );
}
