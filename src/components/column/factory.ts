import { v1 as uuid } from 'uuid';
import { Color } from '../../utils/Color';
import { IColumn } from './IColumn';

export const factory = (id: string = uuid(), props = {}): IColumn => ({
  color: Color.RED,
  height: 100,
  id,
  opacity: 0.1,
  width: 100,
  ...props
});
