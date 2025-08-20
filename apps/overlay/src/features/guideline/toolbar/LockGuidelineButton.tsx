import { useToggleLockGuideline } from "@/features/guideline/hooks/useToggleLockGuideline";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function LockGuidelineButton({ guideline }: { guideline: IGuideline }) {
  const { toggleLockGuideline } = useToggleLockGuideline();

  const handleClick = () => {
    if (guideline) {
      toggleLockGuideline(guideline);
    }
  };

  return (
    <ToolButton
      activated={guideline.locked}
      enabled={true}
      Icon={guideline.locked ? <IconLock /> : <IconLockOpen />}
      onClick={handleClick}
    />
  );
}
