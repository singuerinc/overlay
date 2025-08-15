import type { ITool } from "../../features/tools/ITool";

export interface IHorizontalGuideline extends ITool<"guideline-horizontal"> {
  y: number;
}

export interface IVerticalGuideline extends ITool<"guideline-vertical"> {
  x: number;
}

export type IGuideline = IHorizontalGuideline | IVerticalGuideline;

export interface IGuideLineStore {
  hGuidelines: IHorizontalGuideline[];
  vGuidelines: IVerticalGuideline[];
}
