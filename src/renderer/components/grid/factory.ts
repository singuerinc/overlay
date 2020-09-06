import { v1 as uuid } from 'uuid';
import { Color } from '../../utils/Color';
import { IGrid } from './IGrid';

export const factory = (id: string = uuid(), props = {}): IGrid => ({
  color: Color.CYAN,
  id,
  opacity: 0.4,
  size: 10,
  type: 'solid',
  ...props
});
