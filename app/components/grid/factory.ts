import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { IGrid } from './IGrid';

export const factory = (id: string = uuid(), props = {}): IGrid => ({
  id,
  size: 10,
  color: Color.CYAN,
  type: 'solid',
  opacity: 0.4,
  ...props
});
