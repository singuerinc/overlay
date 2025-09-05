export type IToolBox = {
  id: string;
  type: "toolbox";
  visible: boolean;
  locked: boolean;
  x: number;
  y: number;
};

export const ToolBoxTabNames = [
  "ruler",
  "grid",
  "crosshair",
  "columns",
  "guidelines",
  "onion-images",
  "workspace",
] as const;

export type ToolBoxTabNameType = (typeof ToolBoxTabNames)[number];
