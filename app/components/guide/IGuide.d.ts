import { IGuideDirection } from './IGuideDirection';

export interface IGuide {
  color: string;
  type: IGuideDirection;
  x: number;
  y: number;
}
