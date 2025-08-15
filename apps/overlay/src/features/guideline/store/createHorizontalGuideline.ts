import type { IHorizontalGuideline } from "@/features/guideline/types";
import { v4 as uuidv4 } from "uuid";

export const createHorizontalGuideline = (): IHorizontalGuideline => ({
  id: uuidv4(),
  type: "guideline-horizontal",
  y: 100,
  x: 0,
  color: "cyan",
});
