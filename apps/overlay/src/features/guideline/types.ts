import type { GuidelineColorType } from "@/features/guideline/GuidelineColor";
import type { ITool } from "@/features/tools/ITool";

export const GUIDELINE_HORIZONTAL = "guideline-horizontal";
export const GUIDELINE_VERTICAL = "guideline-vertical";

export interface IHorizontalGuideline extends ITool<"guideline-horizontal"> {
  x: number; // 0
  y: number;
  color: GuidelineColorType;
  locked: boolean;
}

export interface IVerticalGuideline extends ITool<"guideline-vertical"> {
  x: number;
  y: number; //0
  color: GuidelineColorType;
  locked: boolean;
}

export type IGuideline = IHorizontalGuideline | IVerticalGuideline;

export type IGuideLineStore = IGuideline[];
