import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { IRuler } from './IRuler';

export const DEFAULT_RULER_WIDTH: number = 400;
export const DEFAULT_RULER_HEIGHT: number = 400;
export const DEFAULT_RULER_OPACITY: number = 0.5;
export const DEFAULT_RULER_LOCKED: boolean = false;
export const DEFAULT_RULER_COLOR: Color = Color.RED;
export const DEFAULT_RULER_X: number = 0;
export const DEFAULT_RULER_Y: number = 0;

const defaults = {
  color: DEFAULT_RULER_COLOR,
  height: DEFAULT_RULER_HEIGHT,
  locked: DEFAULT_RULER_LOCKED,
  opacity: DEFAULT_RULER_OPACITY,
  width: DEFAULT_RULER_WIDTH,
  x: DEFAULT_RULER_X,
  y: DEFAULT_RULER_Y
};

const factory = (props?): IRuler => ({
  id: uuid(),
  ...defaults,
  ...props
});

export { factory };
