import type { IWorkspace } from "@/features/workspace/types";
import { v4 as uuidv4 } from "uuid";

export const createWorkspace = (): IWorkspace => ({
  id: uuidv4(),
  type: "workspace",
  frames: [],
});
