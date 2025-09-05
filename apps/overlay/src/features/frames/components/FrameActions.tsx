import { FrameLockButton } from "@/features/frames/components/FrameLockButton";
import { FrameRemoveButton } from "@/features/frames/components/FrameRemoveButton";
import { isFrame } from "@/features/frames/utils/isFrame";
import { useSelectedTool } from "@/features/tools/store/tools";

export function FrameActions() {
  const selectedTool = useSelectedTool();

  if (!selectedTool || !isFrame(selectedTool)) {
    return null;
  }

  const frame = selectedTool;

  return (
    <div className="o:flex o:gap-1 o:items-center">
      <span className="o:text-xs o:text-neutral-200 o:px-1">Frame</span>
      <FrameLockButton id={frame.id} />
      <FrameRemoveButton id={frame.id} />
    </div>
  );
}
