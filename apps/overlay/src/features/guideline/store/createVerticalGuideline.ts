import type { IVerticalGuideline } from "@/features/guideline/types";
import { v4 as uuidv4 } from "uuid";

export const createVerticalGuideline = (): IVerticalGuideline => ({
  id: uuidv4(),
  type: "guideline-vertical",
  x: 100,
  y: 0,
  color: "cyan",
});
