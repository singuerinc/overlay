import { useCommands } from "@/features/commands/hooks/useCommands";
import { ToolButton } from "@/ui/ToolButton";
import { IconArrowBackUp } from "@tabler/icons-react";

export function ToolBoxCommandHistory() {
  const { undo, hasCommands } = useCommands();

  return (
    <ToolButton
      enabled={hasCommands}
      Icon={<IconArrowBackUp size={16} />}
      onClick={() => undo()}
    />
  );
}
