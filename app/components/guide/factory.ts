import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { GuideOrientation } from './GuideOrientation';
import { IGuide } from './IGuide';

export const DEFAULT_GUIDE_LOCKED: boolean = false;
export const DEFAULT_GUIDE_COLOR: Color = Color.RED;
export const DEFAULT_GUIDE_X: number = 0;
export const DEFAULT_GUIDE_Y: number = 0;
export const DEFAULT_GUIDE_ORIENTATION: GuideOrientation =
  GuideOrientation.HORIZONTAL;

const defaults = {
  color: DEFAULT_GUIDE_COLOR,
  locked: DEFAULT_GUIDE_LOCKED,
  orientation: GuideOrientation.HORIZONTAL,
  x: DEFAULT_GUIDE_X,
  y: DEFAULT_GUIDE_Y
};

export const factory = (props?): IGuide => ({
  id: uuid(),
  ...defaults,
  ...props
});
