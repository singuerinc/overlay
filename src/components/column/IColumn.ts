import { Color } from '../../utils/Color';

export interface IColumn {
  className?: string;
  id: string;
  color: Color;
  width: number;
  height: number;
  opacity: number;
}
