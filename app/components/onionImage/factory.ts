import { IOnionImage } from './IOnionImage';
import * as uuid from 'uuid/v1';

export const factory = (id: string = uuid(), props = {}): IOnionImage => ({
  id,
  src: '',
  x: 500,
  y: 100,
  width: 410,
  height: 410,
  opacity: 1,
  inverted: false,
  visible: true,
  locked: false,
  ...props
});
