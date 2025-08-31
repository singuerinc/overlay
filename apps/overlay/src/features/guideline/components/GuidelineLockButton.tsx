import { useGuideline } from "@/features/guideline/hooks/useGuideline";
import { useGuidelineByIdQuery } from "@/features/guideline/store/useGuidelineByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { useCallback } from "react";
import { type IGuideline } from "../types";

export function GuidelineLockButton({ id }: { id: IGuideline["id"] }) {
  const { data: guideline } = useGuidelineByIdQuery(id);
  const { toggleLock } = useGuideline();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (guideline) {
        toggleLock(guideline);
      }
    },
    [guideline, toggleLock]
  );

  return (
    <ToolButton
      activated={guideline?.locked}
      enabled={true}
      Icon={
        guideline?.locked ? <IconLock size={16} /> : <IconLockOpen size={16} />
      }
      onClick={handleClick}
    />
  );
}
