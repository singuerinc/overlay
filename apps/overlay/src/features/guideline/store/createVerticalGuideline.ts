import type { IVerticalGuideline } from "@/features/guideline/types";
import { v4 as uuidv4 } from "uuid";

export const createVerticalGuideline = (
  props?: Partial<Exclude<IVerticalGuideline, "id" | "type">>
): IVerticalGuideline => ({
  id: uuidv4(),
  type: "guideline-vertical",
  x: 0,
  y: 0,
  color: "cyan",
  locked: false,
  ...props,
});
