import { useFrameAddCommand } from "@/features/frames/commands/useFrameAddCommand";
import { useFramesToggleCommand } from "@/features/frames/commands/useFramesToggleCommand";
import { createFrame } from "@/features/frames/store/createFrame";
import { useFramesQuery } from "@/features/frames/store/useFramesQuery";
import type { IFrame } from "@/features/frames/types";

export function useFrames() {
  const { data: frames } = useFramesQuery();
  const addCmd = useFrameAddCommand();
  const toggleCmd = useFramesToggleCommand();

  return {
    toggle: () => toggleCmd.execute(!frames?.visible),
    add: (props: Partial<Exclude<IFrame, "id" | "type">>) =>
      addCmd.execute(createFrame(props)),
    visible: frames?.visible,
  };
}
