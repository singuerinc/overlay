export type IHorizontalGuideline = {
  id: string;
  type: "horizontal";
  y: number;
};

export type IVerticalGuideline = {
  id: string;
  type: "vertical";
  x: number;
};

export type IGuideline = IHorizontalGuideline | IVerticalGuideline;

export type IGuideLineStore = {
  hGuidelines: IHorizontalGuideline[];
  vGuidelines: IVerticalGuideline[];
};
