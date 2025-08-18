import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { useLockGuidelineCommand } from "@/features/guideline/store/useLockGuidelineCommand";
import { useSelectedTool } from "@/features/tools/store/tools";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function LockGuidelineButton() {
  const selectedTool = useSelectedTool<IGuideline>();
  const lockGuidelineCommand = useLockGuidelineCommand();
  const { data } = useGetGuidelinesQuery();
  const guideline = data?.find((g) => g.id === selectedTool.id);
  const locked = guideline?.locked || false;

  const handleClick = () => {
    lockGuidelineCommand.execute(guideline, !locked);
  };

  return (
    <ToolButton
      activated={locked}
      enabled={true}
      Icon={locked ? <IconLock /> : <IconLockOpen />}
      onClick={handleClick}
    />
  );
}
