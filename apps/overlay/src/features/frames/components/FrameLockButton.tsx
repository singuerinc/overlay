import { useFrame } from "@/features/frames/hooks/useFrame";
import { useFrameByIdQuery } from "@/features/frames/store/useFrameByIdQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { useCallback } from "react";
import { type IFrame } from "../types";

export function FrameLockButton({ id }: { id: IFrame["id"] }) {
  const { data: frame } = useFrameByIdQuery(id);
  const { toggleLock } = useFrame();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (frame) {
        toggleLock(frame);
      }
    },
    [frame, toggleLock]
  );

  return (
    <ToolButton
      activated={frame?.locked}
      enabled={true}
      Icon={frame?.locked ? <IconLock size={16} /> : <IconLockOpen size={16} />}
      onClick={handleClick}
    />
  );
}
