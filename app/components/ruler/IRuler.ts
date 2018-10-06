import { Color } from '../../utils/Color';

export interface IRuler {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  color: Color;
  locked: boolean;
}
