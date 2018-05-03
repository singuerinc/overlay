import { IGuideDirection } from './IGuideDirection';
import { Color } from '../../utils/Color';

export interface IGuide {
  id: string;
  color: Color;
  type: IGuideDirection;
  x: number;
  y: number;
  locked: boolean;
}
