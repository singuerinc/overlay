export enum GuideDirection {
  VERTICAL = 'v',
  HORIZONTAL = 'h'
}

export type IGuideDirection =
  | GuideDirection.HORIZONTAL
  | GuideDirection.VERTICAL;
