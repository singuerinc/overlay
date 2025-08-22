import type { IFrame } from "@/features/frame/types";

export interface IWorkspace {
  id: string;
  type: "workspace";
  frames: IFrame["id"][];
}
