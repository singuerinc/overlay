import * as uuid from 'uuid/v1';
import { Color } from '../../utils/Color';
import { GuideOrientation } from './GuideOrientation';
import { IGuide } from './IGuide';

export const factory = (id: string = uuid(), props = {}): IGuide => ({
  id,
  x: 0,
  y: 100,
  orientation: GuideOrientation.HORIZONTAL,
  color: Color.RED,
  locked: false,
  ...props
});
