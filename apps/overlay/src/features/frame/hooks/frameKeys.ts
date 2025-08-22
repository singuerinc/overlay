import type { IFrame } from "@/features/frame/types";

export const FRAME_KEYS = {
  frame: (workspaceId: string, id: IFrame["id"]) => [
    "overlay",
    workspaceId,
    "frame",
    id,
  ],
};
