import * as uuid from 'uuid/v1';
import { IOnionImage } from './IOnionImage';

export const factory = (id: string = uuid(), props = {}): IOnionImage => ({
  height: 410,
  id,
  inverted: false,
  locked: false,
  opacity: 1,
  scale: 1,
  src: '',
  visible: true,
  width: 410,
  x: 500,
  y: 100,
  ...props
});
