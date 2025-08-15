import type { ITool } from "../../features/tools/ITool";

export interface IHorizontalGuideline extends ITool<"guideline-horizontal"> {
  x: number; // 0
  y: number;
  color: "cyan" | "red";
}

export interface IVerticalGuideline extends ITool<"guideline-vertical"> {
  x: number;
  y: number; //0
  color: "cyan" | "red";
}

export type IGuideline = IHorizontalGuideline | IVerticalGuideline;

export type IGuideLineStore = IGuideline[];
