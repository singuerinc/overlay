import { IGrid } from './IGrid';
import { Color } from '../../utils/Color';
import * as uuid from 'uuid/v1';

const factory = (id: string): IGrid => ({
  id,
  size: 10,
  color: Color.CYAN,
  type: 'solid',
  opacity: 0.4
});

export const addGrid = () => ({
  grids: [factory(uuid())]
});

export const removeGrid = () => ({
  grids: []
});
