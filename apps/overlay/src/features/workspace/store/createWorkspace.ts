import type { IFrame } from "@/features/frame/types";
import type { IWorkspace } from "@/features/workspace/types";
import { v4 as uuidv4 } from "uuid";

export const createWorkspace = ({ frame }: { frame: IFrame }): IWorkspace => ({
  id: uuidv4(),
  type: "workspace" as const,
  frames: [frame.id],
  activeFrameId: frame.id,
});
