import { GuideOrientation } from './GuideOrientation';
import { Color } from '../../utils/Color';

export interface IGuide {
  id: string;
  color: Color;
  orientation: GuideOrientation;
  x: number;
  y: number;
  locked: boolean;
}
