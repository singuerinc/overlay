import { IGuideDirection } from './IGuideDirection';

export interface IGuide {
  id: string;
  color: string;
  type: IGuideDirection;
  x: number;
  y: number;
}
