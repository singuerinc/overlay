import { useGuidelineToggleLock } from "@/features/guideline/hooks/useGuidelineToggleLock";
import { useGetGuidelineByIdQuery } from "@/features/guideline/store/useGetGuidelineByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function LockGuidelineButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGetGuidelineByIdQuery(id);
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
