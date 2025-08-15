import { useLockGuidelineCommand } from "@/features/guideline/store/useLockGuidelineCommand";
import { useSelectedTool } from "@/features/tools/store/tools";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { useState } from "react";
import { type IGuideline } from "../types";

export function LockGuidelineButton() {
  const selectedTool = useSelectedTool<IGuideline>();
  const lockGuidelineCommand = useLockGuidelineCommand();

  const [locked, setLocked] = useState(selectedTool?.locked || false);

  const handleClick = () => {
    const guideline = { ...selectedTool } as IGuideline;
    const nextLocked = !locked;
    lockGuidelineCommand.execute(guideline, nextLocked);
    setLocked(nextLocked);
  };

  return (
    <ToolButton
      activated={locked}
      enabled={true}
      Icon={locked ? <IconLock size={16} /> : <IconLockOpen size={16} />}
      onClick={handleClick}
    />
  );
}
