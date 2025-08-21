import { useGuidelineToggleLock } from "@/features/guideline/hooks/useGuidelineToggleLock";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function GuidelineLockButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const { toggleLock } = useGuidelineToggleLock();

  const handleClick = () => {
    if (guideline) {
      toggleLock(guideline);
    }
  };

  return (
    <ToolButton
      activated={guideline?.locked}
      enabled={true}
      Icon={guideline?.locked ? <IconLock /> : <IconLockOpen />}
      onClick={handleClick}
    />
  );
}
