import type { IFrame } from "@/features/frame/types";
import { v4 as uuidv4 } from "uuid";

export const createFrame = (): IFrame => ({
  id: uuidv4(),
  type: "frame",
  x: 0,
  y: 0,
  width: `80%`,
  height: `80%`,
});
