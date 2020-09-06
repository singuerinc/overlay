import { Color } from '../../utils/Color';

export interface IGrid {
  className?: string;
  id: string;
  color: Color;
  size: number;
  type: string;
  opacity: number;
}
