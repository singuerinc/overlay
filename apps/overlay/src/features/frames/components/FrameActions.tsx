import { FrameLockButton } from "@/features/frames/components/FrameLockButton";
import { FrameRemoveButton } from "@/features/frames/components/FrameRemoveButton";
import type { IFrame } from "@/features/frames/types";
import { cn } from "@/ui/cn";

export function FrameActions({ frame }: { frame: IFrame }) {
  return (
    <div
      className={cn(
        "o:gap-1 o:absolute o:left-1/2 o:top-1/2 o:-translate-1/2 o:flex"
      )}
    >
      <FrameLockButton id={frame.id} />
      <FrameRemoveButton id={frame.id} />
    </div>
  );
}
