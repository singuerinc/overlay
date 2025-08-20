import type { IHorizontalGuideline } from "@/features/guideline/types";
import { v4 as uuidv4 } from "uuid";

export const createHorizontalGuideline = (
  props?: Partial<Exclude<IHorizontalGuideline, "id" | "type">>
): IHorizontalGuideline => ({
  id: uuidv4(),
  type: "guideline-horizontal",
  x: 0,
  y: 0,
  color: "cyan",
  locked: false,
  ...props,
});
