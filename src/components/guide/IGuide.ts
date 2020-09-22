import { Color } from '../../utils/Color';
import { GuideOrientation } from './GuideOrientation';

export interface IGuide {
  id: string;
  color: Color;
  orientation: GuideOrientation;
  x: number;
  y: number;
  locked: boolean;
}
