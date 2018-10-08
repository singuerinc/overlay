import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { IRuler } from './IRuler';

const factory = (id: string = uuid(), props = {}): IRuler => ({
  color: Color.RED,
  height: 400,
  id,
  locked: false,
  opacity: 0.5,
  width: 400,
  x: 250,
  y: 250,
  ...props
});

export { factory };
