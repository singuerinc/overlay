import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { IColumn } from './IColumn';

export const factory = (id: string = uuid(), props = {}): IColumn => ({
  id,
  width: 100,
  height: 100,
  color: Color.RED,
  opacity: 0.1,
  ...props
});
